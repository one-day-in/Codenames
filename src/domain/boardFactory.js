// src/domain/boardFactory.js
import { shuffle, pickRandom } from '../utils/random.js';
import { createRoleDistribution } from './rolesFactory.js';

// Кількість варіантів зображень для кожного типу карти
const IMAGE_VARIANTS = {
    resonant:  9,
    dissonant: 9,
    anomaly:   7,
    nightmare: 1,
};

// Перемішаний пул індексів 1..count — гарантує унікальність на дошці
function makeVariantPool(count) {
    return shuffle(Array.from({ length: count }, (_, i) => i + 1));
}

export function createBoard({ size, words }) {
    const { roles, startsFirst } = createRoleDistribution(size);

    // Незалежний пул для кожного типу:
    // resonant/dissonant → 8 або 9 карт із 9 варіантів (1 запасний)
    // anomaly            → рівно 7 карт із 7 варіантів (всі використані)
    // nightmare          → рівно 1 карта, variant завжди 1
    const pools = Object.fromEntries(
        Object.entries(IMAGE_VARIANTS).map(([role, count]) => [role, makeVariantPool(count)])
    );

    const cells = pickRandom(words, size * size).map((word, index) => {
        const role = roles[index];
        const imageVariant = pools[role].shift() ?? 1;
        return { word, role, imageVariant, revealed: false };
    });

    return { cells, startsFirst };
}
