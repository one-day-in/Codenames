// src/store/gameStore.js
import { supabase } from '../supabaseClient.js';
import { createEmitter } from '../utils/emitter.js';
import { revealCell, endTurn, setGuideLimit, checkWinner } from '../domain/gameRules.js';
import { DEFAULT_LANGUAGE } from '../utils/i18n.js';
import { loadWords } from '../utils/words.js';
import { pickRandom } from '../utils/random.js';
import { getAnomalyVariantKey } from '../utils/anomalyVariants.js';
import { TURN_TRANSITION_STATUS, TURN_TRANSITION_TIMINGS } from '../utils/turnTransition.js';

const oppositeTeam = {
    resonant: 'dissonant',
    dissonant: 'resonant',
};

export function createGameStore(roomId) {
    const emitter = createEmitter();
    let state    = null;
    let language = DEFAULT_LANGUAGE;
    let revealInProgress = false;

    function emit(nextState, nextLang) {
        if (nextState !== undefined) state    = nextState;
        if (nextLang  !== undefined) language = nextLang ?? DEFAULT_LANGUAGE;
        emitter.emit({ state, language });
    }

    function applyWinner(next) {
        const winner = checkWinner(next);
        return winner ? { ...next, gameOver: true, winner } : next;
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function replaceWords(nextState, words) {
        const picked = pickRandom(words, nextState.cells.length);
        return {
            ...nextState,
            cells: nextState.cells.map((cell, idx) => ({
                ...cell,
                word: picked[idx],
            })),
        };
    }

    async function applyAnomalyResetEffect(nextState) {
        try {
            const freshWords = await loadWords(language, { force: true });
            if (!Array.isArray(freshWords) || freshWords.length < nextState.cells.length) {
                return nextState;
            }

            // Try a few times to avoid identical word layout by chance.
            for (let i = 0; i < 4; i += 1) {
                const candidate = replaceWords(nextState, freshWords);
                const changed = candidate.cells.some((cell, idx) => cell.word !== nextState.cells[idx].word);
                if (changed) return candidate;
            }
        } catch {
            // Keep gameplay stable if words endpoint is temporarily unavailable.
        }

        return nextState;
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
            if (!state || state.gameOver || state.turnTransition) return;
            await updateState(setGuideLimit(state, limit));
        },

        reveal: async (index) => {
            if (revealInProgress) return;
            if (!state || state.gameOver || state.turnTransition) return;
            revealInProgress = true;

            try {
                const openedCell = state.cells[index];
                if (!openedCell || openedCell.revealed) return;

                const currentTeam = state.turn.team;
                const nextTeam = oppositeTeam[currentTeam];
                const anomalyKey = openedCell.role === 'anomaly'
                    ? getAnomalyVariantKey(openedCell)
                    : null;

                const base = revealCell(state, index);
                const isOwnTeam = openedCell.role === currentTeam;
                const limitReached = state.turn.guideLimit !== null
                    && (state.turn.dreamwalkerMoves + 1) >= state.turn.guideLimit;
                const needsTurnTransition = (
                    openedCell.role === 'nightmare'
                    || openedCell.role === 'anomaly'
                    || !isOwnTeam
                    || limitReached
                );

                if (!needsTurnTransition) {
                    await updateState(base);
                    return;
                }

                const transitionId = crypto.randomUUID?.() || Math.random().toString(36).slice(2);
                const transitionKind = openedCell.role === 'nightmare'
                    ? 'nightmare'
                    : (openedCell.role === 'anomaly' ? 'anomaly' : 'turn-pass');

                const pendingState = {
                    ...state,
                    cells: base.cells,
                    turnTransition: {
                        id: transitionId,
                        status: TURN_TRANSITION_STATUS.PENDING,
                        kind: transitionKind,
                        fromTeam: currentTeam,
                        toTeam: nextTeam,
                        anomalyKey,
                    },
                };

                await updateState(pendingState);

                if (state?.gameOver && openedCell.role !== 'nightmare') {
                    await updateState({ ...state, turnTransition: null });
                    return;
                }

                await wait(TURN_TRANSITION_TIMINGS.afterRevealMs);

                if (!state?.turnTransition || state.turnTransition.id !== transitionId) return;

                await updateState({
                    ...state,
                    turnTransition: {
                        ...state.turnTransition,
                        status: TURN_TRANSITION_STATUS.VISIBLE,
                    },
                });

                await wait(TURN_TRANSITION_TIMINGS.visibleMs);

                if (!state?.turnTransition || state.turnTransition.id !== transitionId) return;

                let finalState = { ...state };

                if (openedCell.role === 'anomaly' && anomalyKey === 'reset') {
                    finalState = await applyAnomalyResetEffect(finalState);
                }

                if (openedCell.role === 'nightmare') {
                    finalState = {
                        ...finalState,
                        gameOver: true,
                        winner: nextTeam,
                    };
                } else {
                    finalState = {
                        ...finalState,
                        turn: {
                            team: nextTeam,
                            guideLimit: null,
                            dreamwalkerMoves: 0,
                        },
                    };
                }

                await updateState({ ...finalState, turnTransition: null });
            } finally {
                revealInProgress = false;
            }
        },

        endTurn: async () => {
            if (!state || state.gameOver || state.turnTransition) return;
            await updateState(endTurn(state));
        },
    };
}
