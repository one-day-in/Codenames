import { t, getTeamName } from './i18n.js';

export const TURN_TRANSITION_STATUS = {
    PENDING: 'pending',
    VISIBLE: 'visible',
};

export const TURN_TRANSITION_TIMINGS = {
    afterRevealMs: 1200,
    visibleMs: 1700,
};

function getTransitionMessage(transition, language) {
    const tr = t(language);
    const fromTeam = getTeamName(transition.fromTeam, language);
    const toTeam = getTeamName(transition.toTeam, language);

    if (transition.kind === 'nightmare') {
        return tr.transitionNightmare;
    }
    if (transition.kind === 'anomaly') {
        if (transition.anomalyKey === 'reset') {
            return tr.transitionAnomalyReset;
        }
        return tr.transitionAnomalyGeneric;
    }
    return `${tr.transitionTurnPass}: ${fromTeam} -> ${toTeam}`;
}

export function renderTurnTransitionOverlay(state, language) {
    const transition = state?.turnTransition;
    if (!transition || transition.status !== TURN_TRANSITION_STATUS.VISIBLE) {
        return '';
    }

    const tr = t(language);
    return `
        <div class="turn-transition-overlay" aria-live="polite" role="status">
            <div class="turn-transition-overlay__backdrop"></div>
            <div class="turn-transition-overlay__panel">
                <p class="turn-transition-overlay__label">${tr.transitionIncoming}</p>
                <p class="turn-transition-overlay__message">${getTransitionMessage(transition, language)}</p>
            </div>
        </div>
    `;
}
