import { createGameStore } from '../store/gameStore.js';
import { fitTextAll } from '../utils/fitText.js';
import { onOrientationChange } from '../utils/resize.js';
import { getGameCellClass } from '../utils/renderCell.js';
import { t, formatCardCount, getTeamName } from '../utils/i18n.js';
import { getBaseUrl, getParams } from '../utils/url.js';
import { ICONS } from '../utils/icons.js';
import { escapeHtml } from '../utils/sanitize.js';
import { renderTurnTransitionOverlay } from '../utils/turnTransition.js';

const LIMIT_VALUES = [1, 2, 3, 4, 5, 6, 7, 8];

function renderTeamPanel(team, state, lang) {
    const tr = t(lang);
    const isTurn = state.turn.team === team;
    const hasLimit = state.turn.guideLimit !== null;
    const canChoose = isTurn && !hasLimit && !state.gameOver && !state.turnTransition;
    const canPlay = isTurn && hasLimit && !state.gameOver && !state.turnTransition;
    const teamTitle = getTeamName(team, lang);
    const status = canPlay
        ? `${tr.dreamwalker}: ${formatCardCount(state.turn.guideLimit, lang)}`
        : `${tr.dreamwalker}: ${ICONS.eyeClosed}`;

    return `
        <section class="sandbox__team sandbox__team--${team} ${isTurn ? 'is-active' : 'is-muted'}" data-team="${team}">
            <h3 class="sandbox__team-title">${teamTitle}</h3>
            <p class="sandbox__team-status">${status}</p>
            <div class="sandbox__limits">
                ${LIMIT_VALUES.map(limit => `
                    <button
                        class="sandbox__limit-btn ${state.turn.guideLimit === limit ? 'is-selected' : ''}"
                        data-action="limit"
                        data-team="${team}"
                        data-limit="${limit}"
                        ${!canChoose ? 'disabled' : ''}
                    >${limit}</button>
                `).join('')}
            </div>
            <button
                class="sandbox__end-btn"
                data-action="end-turn"
                data-team="${team}"
                ${!canPlay ? 'disabled' : ''}
            >${tr.endTurn}</button>
        </section>
    `;
}

export async function initSandbox(root) {
    const { roomId, token } = getParams();
    if (!roomId || !token) {
        window.location.href = getBaseUrl() + '/index.html';
        return;
    }

    const store = createGameStore(roomId);
    await store.init();

    if (!store.getState()) {
        window.location.href = getBaseUrl() + '/index.html';
        return;
    }

    let hasRenderedBoard = false;
    let prevRevealed = new Set();

    function renderWaiting(lang) {
        const tr = t(lang);
        root.innerHTML = `
            <div class="waiting-screen">
                <p>${tr.waitingLobby}</p>
            </div>
        `;
    }

    function bindActions(state) {
        root.querySelectorAll('[data-action="limit"]:not([disabled])').forEach(btn => {
            btn.addEventListener('click', () => {
                const team = btn.dataset.team;
                const limit = Number(btn.dataset.limit);
                if (state.turn.team !== team) return;
                store.setGuideLimit(limit);
            });
        });

        root.querySelectorAll('[data-action="end-turn"]:not([disabled])').forEach(btn => {
            btn.addEventListener('click', () => {
                const team = btn.dataset.team;
                if (state.turn.team !== team) return;
                store.endTurn();
            });
        });

        root.querySelectorAll('.sandbox .grid .cell.cell--hidden').forEach(cell => {
            cell.addEventListener('click', () => {
                const current = store.getState();
                if (!current || current.gameOver || current.turnTransition) return;
                if (current.turn.guideLimit === null) return;
                const idx = Number(cell.dataset.index);
                if (Number.isNaN(idx)) return;
                store.reveal(idx);
            });
        });
    }

    function renderBoard(state, lang) {
        const tr = t(lang);
        const { cells } = state;
        const rTotal = cells.filter(c => c.role === 'resonant').length;
        const dTotal = cells.filter(c => c.role === 'dissonant').length;
        const rDone = cells.filter(c => c.role === 'resonant' && c.revealed).length;
        const dDone = cells.filter(c => c.role === 'dissonant' && c.revealed).length;
        const currentRevealed = new Set(
            cells.map((cell, idx) => (cell.revealed ? idx : -1)).filter(idx => idx >= 0)
        );

        root.innerHTML = `
            <div class="screen-layout sandbox-layout">
                <header class="screen-header sandbox__header">
                    <div class="sandbox__header-bar">
                        <button class="btn-back btn-icon" id="backBtn">${ICONS.arrowLeft}</button>
                        <div class="sandbox__title">${tr.gameName} / ${tr.turn}: ${getTeamName(state.turn.team, lang)}</div>
                        <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${document.fullscreenElement ? ICONS.minimize : ICONS.maximize}</button>
                    </div>
                </header>

                <main class="screen-body">
                    <div class="sandbox">
                        <div class="grid grid--5">
                            ${cells.map((cell, i) => `
                                <div class="${getGameCellClass(cell)}" data-index="${i}">
                                    <span class="cell__content">${escapeHtml(cell.word)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </main>

                <footer class="screen-footer sandbox__footer">
                    ${renderTeamPanel('resonant', state, lang)}
                    <div class="sandbox__score">
                        <span class="game__score-item game__score-item--resonant ${state.turn.team === 'resonant' ? 'game__score-item--active' : ''}">${rDone} / ${rTotal}</span>
                        <span class="game__score-item game__score-item--dissonant ${state.turn.team === 'dissonant' ? 'game__score-item--active' : ''}">${dDone} / ${dTotal}</span>
                    </div>
                    ${renderTeamPanel('dissonant', state, lang)}
                </footer>

                ${renderTurnTransitionOverlay(state, lang)}
            </div>
        `;

        root.querySelectorAll('.sandbox .grid .cell').forEach((el, idx) => {
            if (!hasRenderedBoard) return;
            if (!currentRevealed.has(idx) || prevRevealed.has(idx)) return;
            el.classList.add('cell--reveal-anim');
        });

        prevRevealed = currentRevealed;
        hasRenderedBoard = true;

        document.getElementById('backBtn')?.addEventListener('click', () => {
            window.location.href = getBaseUrl() + '/index.html';
        });

        document.getElementById('fullscreenBtn')?.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });

        bindActions(state);
        requestAnimationFrame(() => fitTextAll(root));
    }

    function rerender() {
        const state = store.getState();
        const lang = store.getLanguage();
        if (!state) {
            window.location.href = getBaseUrl() + '/index.html';
            return;
        }
        if (state.phase === 'lobby') {
            store.startGame().catch((error) => console.error('Failed to start game:', error));
            renderWaiting(lang);
            return;
        }
        renderBoard(state, lang);
    }

    store.subscribe(rerender);
    onOrientationChange(() => fitTextAll(root));
    document.addEventListener('fullscreenchange', rerender);
    rerender();
}
