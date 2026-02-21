// store/gameStore.js
import { createBoard } from '../domain/boardFactory.js';
import { revealCell, endTurn, checkWinner } from '../domain/gameRules.js';
import { WORDS } from '../data/ru_nouns.js';
import { createEmitter } from '../utils/emitter.js';
import { createTurnModal } from '../views/TurnModal.js';
import { createSyncStore } from './syncStore.js';

export function createGameStore({ size = 5 } = {}) {
  // Спробуйте завантажити збережену гру
  const savedGame = localStorage.getItem('codenames-game');
  const initialState = savedGame ? JSON.parse(savedGame) : {
    words: generateInitialWords(size),
    colors: generateInitialColors(size),
    revealed: Array(size * size).fill(false),
    currentTurn: 'red',
    gameStarted: false
  };

  const store = {
    ...initialState,

    startGame() {
      this.gameStarted = true;
      this.saveToStorage();
    },

    revealCell(index) {
      if (!this.gameStarted || this.revealed[index]) return;
      this.revealed[index] = true;
      this.saveToStorage();
    },

    saveToStorage() {
      localStorage.setItem('codenames-game', JSON.stringify({
        words: this.words,
        colors: this.colors,
        revealed: this.revealed,
        currentTurn: this.currentTurn,
        gameStarted: this.gameStarted
      }));
    }
  };

  return store;
}