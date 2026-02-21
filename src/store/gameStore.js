// store/gameStore.js
import { createBoard } from '../domain/boardFactory.js';
import { revealCell, endTurn, checkWinner } from '../domain/gameRules.js';
import { WORDS } from '../data/ru_nouns.js';
import { createEmitter } from '../utils/emitter.js';
import { createTurnModal } from '../views/TurnModal.js';
import { createSyncStore } from './syncStore.js';

export function createGameStore({ size }) {
    const syncStore = createSyncStore();
    let gameId = 0;

    function createNewGame() {
        gameId += 1;
        const { cells, startsFirst } = createBoard({ size, words: WORDS });
        
        return {
            gameId,
            size,
            cells,
            activeTeam: startsFirst,
            startingTeam: startsFirst,
            gameOver: false,
            winner: null
        };
    }

    // Ініціалізуємо стан
    let state = syncStore.getState() || createNewGame();
    
    const emitter = createEmitter();
    const turnModal = createTurnModal();
    let pendingState = null;

    function applyPendingState() {
        if (pendingState) {
            updateState(pendingState);
            pendingState = null;
        }
    }

    function updateState(newState) {
        const winner = checkWinner(newState);
        if (winner) {
            newState = {
                ...newState,
                gameOver: true,
                winner
            };
        }

        state = newState;
        
        // Оновлюємо синхронізований стор
        syncStore.setState(state);
        
        // Сповіщаємо локальних підписників
        emitter.emit(state);
    }

    // Підписуємось на зміни з інших вікон
    syncStore.subscribe((syncedState) => {
        if (JSON.stringify(state) !== JSON.stringify(syncedState)) {
            state = syncedState;
            emitter.emit(state);
        }
    });

    function handleReveal(index) {
        if (state.gameOver) return;

        const newState = revealCell(state, index);

        if (newState.activeTeam !== state.activeTeam) {
            pendingState = newState;
            turnModal.show(newState.activeTeam, applyPendingState);
        } else {
            updateState(newState);
        }
    }

    function handleEndTurn() {
        if (state.gameOver) return;
        pendingState = endTurn(state);
        turnModal.show(pendingState.activeTeam, applyPendingState);
    }

    function reset() {
        updateState(createNewGame());
    }

    return {
        getState: () => ({ ...state }),
        subscribe: emitter.subscribe,
        reveal: handleReveal,
        endTurn: handleEndTurn,
        reset
    };
}