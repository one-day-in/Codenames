// domain/boardFactory.js
import { pickRandom } from '../utils/random.js';
import { createRoleDistribution } from './rolesFactory.js';

export function createBoard({ size, words }) {
    const totalCells = size * size;

    // Вибираємо випадкові слова
    const selectedWords = pickRandom(words, totalCells);

    // Створюємо розподіл ролей - отримуємо ОБ'ЄКТ з roles та startsFirst
    const roleDistribution = createRoleDistribution(size);
    const roles = roleDistribution.roles;
    const startsFirst = roleDistribution.startsFirst;

    // Знаходимо всі нейтральні клітинки і нумеруємо їх
    let neutralCounter = 1;
    const neutralNumbers = {};

    // Спочатку визначаємо номери для нейтральних клітинок
    roles.forEach((role, index) => {
        if (role === 'neutral') {
            neutralNumbers[index] = neutralCounter++;
        }
    });

    // Створюємо клітинки з номерами нейтральних
    const cells = selectedWords.map((word, index) => ({
        word,
        row: Math.floor(index / size),
        col: index % size,
        role: roles[index],
        neutralNumber: neutralNumbers[index] || null, // Додаємо номер для нейтральних
        revealed: false
    }));

    return { cells, startsFirst };
}