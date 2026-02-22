import { supabase } from '../supabaseClient.js';
import { createEmitter } from '../utils/emitter.js';
import { createBoard } from '../domain/boardFactory.js';
import { revealCell, endTurn, checkWinner } from '../domain/gameRules.js';
import { WORDS } from '../data/ru_nouns.js';

function generateUUID() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function createGameStore(roomId) {
    const emitter = createEmitter();
    let state = null;

    function emit(next) {
        state = next;
        emitter.emit(state);
    }

    function applyWinner(next) {
        const winner = checkWinner(next);
        return winner ? { ...next, gameOver: true, winner } : next;
    }

    function createNewGame() {
        const { cells, startsFirst } = createBoard({ size: 5, words: WORDS });
        return {
            gameId: generateUUID(),
            size: 5,
            cells,
            activeTeam: startsFirst,
            startingTeam: startsFirst,
            gameOver: false,
            winner: null
        };
    }

    async function loadInitialState() {
        const { data, error } = await supabase
            .from('games')
            .select('state')
            .eq('id', roomId)
            .maybeSingle(); // ← замість .single(), не кидає 404

        if (error || !data) return null;

        emit(data.state);
        return data.state;
    }

    async function updateState(next) {
        const updated = applyWinner(next);
        await supabase
            .from('games')
            .update({ state: updated })
            .eq('id', roomId);
    }

    function subscribeRealtime() {
        const channel = supabase
            .channel('room-' + roomId)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'games',
                    filter: `id=eq.${roomId}`
                },
                (payload) => {
                    console.log('🔥 Realtime payload:', payload);
                    emit(payload.new.state);
                }
            )
            .subscribe((status) => {
                console.log('📡 Realtime status:', status);
            });
    }

    async function init() {
        subscribeRealtime();
        await loadInitialState();
    }

    return {
        init,
        subscribe: emitter.subscribe,
        getState: () => state,

        createGame: async () => {
            const newGame = createNewGame();
            await supabase.from('games').upsert({
                id: roomId,
                state: newGame
            });
        },

        reveal: async (index) => {
            if (!state || state.gameOver) return;
            const next = revealCell(state, index);
            await updateState(next);
        },

        endTurn: async () => {
            if (!state || state.gameOver) return;
            const next = endTurn(state);
            await updateState(next);
        }
    };
}