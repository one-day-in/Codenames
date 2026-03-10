// src/app/initGuide.js
import { fitTextToCell } from '../utils/fitText.js';
import { onOrientationChange } from '../utils/resize.js';
import { getGuideCellClass } from '../utils/renderCell.js';
import { t, DEFAULT_LANGUAGE, getTeamName } from '../utils/i18n.js';
import { escapeHtml } from '../utils/sanitize.js';
import { ICONS } from '../utils/icons.js';
import { renderTurnTransitionOverlay } from '../utils/turnTransition.js';
import { initGuestPage } from './initGuestPage.js';

const MAX_HINT_BTNS = 8;

export async function initGuide(root) {
    const result = await initGuestPage(root, {
        roleType: 'guide',
        invalidParamsHtml: `<div class="waiting-screen">
            <p>${t(DEFAULT_LANGUAGE).scanQr}</p>
        </div>`,
    });
    if (!result) return;

    const { presence, store, team } = result;
    let hasRenderedBoard = false;
    let prevRevealed = new Set();

    function renderWaiting(lang = DEFAULT_LANGUAGE) {
        hasRenderedBoard = false;
        prevRevealed = new Set();
        root.innerHTML = `<div class="waiting-screen">
            <p>${t(lang).waitingLobby}</p>
        </div>`;
    }

    function renderBoard(state, lang) {
        const tr = t(lang);
        const turn = state.turn;
        const isMyTurn = turn.team === team;
        const guideLocked = turn.guideLimit !== null;
        const canAct = isMyTurn && !guideLocked && !state.gameOver && !state.turnTransition;

        document.body.classList.remove('team-resonant', 'team-dissonant');
        document.body.classList.add(`team-${team}`);

        const teamTitle = getTeamName(team, lang);
        const guideStatus = canAct
            ? `${tr.guide}: ${tr.chooseLimit}`
            : `${tr.guide}: ${ICONS.eyeClosed}`;

        const btnHTML = Array.from({ length: MAX_HINT_BTNS }, (_, i) => {
            const n = i + 1;
            const chosen = turn.guideLimit === n;

            return `
            <button
                class="guide__num-btn ${chosen ? 'guide__num-btn--chosen' : ''}"
                data-limit="${n}"
                ${!canAct ? 'disabled' : ''}
            >${n}</button>
        `;
        }).join('');

        const currentRevealed = new Set(
            state.cells
                .map((cell, idx) => (cell.revealed ? idx : -1))
                .filter(idx => idx >= 0)
        );

        root.innerHTML = `
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${canAct ? 'guide__title--active' : 'guide__title--muted'}">${teamTitle}</div>
                    <div class="guide__meta ${canAct ? 'guide__meta--active' : 'guide__meta--muted'}">${guideStatus}</div>
                    <div class="guide__btns ${canAct ? 'guide__btns--active' : 'guide__btns--muted'}">${btnHTML}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${team}">
                    <div class="grid grid--5">
                        ${state.cells.map((cell, i) => `
                            <div class="${getGuideCellClass(cell)}" data-index="${i}">
                                <span class="cell__content">${escapeHtml(cell.word)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${renderTurnTransitionOverlay(state, lang)}
        </div>
    `;

        root.querySelectorAll('.guide .grid .cell').forEach((el, idx) => {
            if (!hasRenderedBoard) return;
            if (!currentRevealed.has(idx) || prevRevealed.has(idx)) return;
            el.classList.add('cell--reveal-anim');
        });

        prevRevealed = currentRevealed;
        hasRenderedBoard = true;

        requestAnimationFrame(() => {
            root.querySelectorAll('.cell').forEach(cell => fitTextToCell(cell));
        });

        root.querySelectorAll('.guide__num-btn:not([disabled])')
            .forEach(btn => {
                btn.addEventListener('click', () =>
                    store.setGuideLimit(parseInt(btn.dataset.limit, 10))
                );
            });
    }

    function rerender({ state, language } = {}) {
        const s = state ?? store.getState();
        const lang = language ?? store.getLanguage();
        if (!s || s.phase === 'lobby') { renderWaiting(lang); return; }
        renderBoard(s, lang);
    }

    store.subscribe(rerender);
    presence.onChange(() => rerender());
    onOrientationChange(() => rerender());
}
