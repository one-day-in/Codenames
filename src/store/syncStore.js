// store/syncStore.js
import { createEmitter } from '../utils/emitter.js';

export function createSyncStore() {
    const STORAGE_KEY = 'codenames-game-state';
    const emitter = createEmitter();

    // Завантажуємо початковий стан з localStorage
    let state = null;
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            state = JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Failed to load state from localStorage', e);
    }

    // Оновлюємо стан і сповіщаємо всі підписники
    function setState(newState) {
        state = newState;

        // Зберігаємо в localStorage
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save state to localStorage', e);
        }

        // Сповіщаємо локальних підписників
        emitter.emit(state);
    }

    // Слухаємо зміни localStorage з інших вкладок/вікон
    window.addEventListener('storage', (event) => {
        if (event.key === STORAGE_KEY && event.newValue) {
            try {
                const newState = JSON.parse(event.newValue);
                state = newState;
                emitter.emit(state);
            } catch (e) {
                console.warn('Failed to parse state from storage event', e);
            }
        }
    });

    return {
        getState: () => state ? { ...state } : null,
        setState,
        subscribe: emitter.subscribe
    };
}