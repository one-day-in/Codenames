// domain/createGameState.js
import { normalizeWords, uniqueWords, ensureEnoughWords } from '../utils/words.js';
import { createBoard } from './boardFactory.js';

export function createGameState({ size, words }) {
    const total = size * size;

    const dictionary = ensureEnoughWords(
        uniqueWords(normalizeWords(words)),
        total
    );

    const board = createBoard({ size, words: dictionary });

    return {
        size,
        cells: board.cells,
        startingTeam: board.startsFirst,
        activeTeam: board.startsFirst,
        gameOver: false
    };
}