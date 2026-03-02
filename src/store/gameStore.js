// src/store/gameStore.js
import { supabase } from '../supabaseClient.js';
import { createEmitter } from '../utils/emitter.js';
import { revealCell, endTurn, setGuideLimit, checkWinner } from '../domain/gameRules.js';
import { DEFAULT_LANGUAGE } from '../utils/i18n.js';

export function createGameStore(roomId) {
    const emitter = createEmitter();
    let state    = null;
    let language = DEFAULT_LANGUAGE;

    function emit(nextState, nextLang) {
        if (nextState !== undefined) state    = nextState;
        if (nextLang  !== undefined) language = nextLang ?? DEFAULT_LANGUAGE;
        emitter.emit({ state, language });
    }

    function applyWinner(next) {
        const winner = checkWinner(next);
        return winner ? { ...next, gameOver: true, winner } : next;
    }

    async function updateState(next) {
        const updated = applyWinner(next);
        await supabase.from('rooms').update({ state: updated }).eq('id', roomId);
    }

    async function init() {
        supabase
            .channel('room-' + roomId)
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` },
                payload => emit(payload.new.state, payload.new.language)
            )
            .subscribe();

        const { data } = await supabase
            .from('rooms')
            .select('state, language')
            .eq('id', roomId)
            .maybeSingle();

        if (data) emit(data.state, data.language);
    }

    return {
        init,
        subscribe:   emitter.subscribe,
        getState:    () => state,
        getLanguage: () => language,

        // Переводить гру з lobby → active (викликається хостом коли всі підключились)
        startGame: async () => {
            if (!state || state.phase !== 'lobby') return;
            const previous = state;
            const updated = { ...state, phase: 'active' };
            // Локально перемикаємо фазу одразу, щоб хост не "зависав" на loading.
            emit(updated, language);
            const { error } = await supabase.from('rooms').update({ state: updated }).eq('id', roomId);
            if (error) {
                // Повертаємо попередній стан, якщо апдейт не пройшов.
                emit(previous, language);
                throw error;
            }
        },

        // Скидає стан (викликається перед новою грою з index.html)
        resetGame: async () => {
            await supabase.from('rooms').update({ state: null }).eq('id', roomId);
        },

        setGuideLimit: async (limit) => {
            if (!state || state.gameOver) return;
            await updateState(setGuideLimit(state, limit));
        },

        reveal: async (index) => {
            if (!state || state.gameOver) return;
            await updateState(revealCell(state, index));
        },

        endTurn: async () => {
            if (!state || state.gameOver) return;
            await updateState(endTurn(state));
        },
    };
}
