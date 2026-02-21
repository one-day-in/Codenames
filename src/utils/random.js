// utils/random.js
export function shuffle(array) {
    const result = [...array]; // Створюємо копію
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function pickRandom(array, count) {
    if (count > array.length) {
        throw new Error(`Cannot pick ${count} items from array of length ${array.length}`);
    }

    // Створюємо копію масиву і перемішуємо її
    const arrayCopy = [...array]; // ЯВНО створюємо копію
    const shuffled = shuffle(arrayCopy);
    return shuffled.slice(0, count);
}