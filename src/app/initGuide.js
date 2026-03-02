// src/app/initGuide.js
import { fitTextToCell } from '../utils/fitText.js';
import { onOrientationChange } from '../utils/resize.js';
import { getGuideCellClass } from '../utils/renderCell.js';
import { t, DEFAULT_LANGUAGE } from '../utils/i18n.js';
import { escapeHtml } from '../utils/sanitize.js';
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

    function renderWaiting(lang = DEFAULT_LANGUAGE) {
        root.innerHTML = `<div class="waiting-screen">
            <p>${t(lang).waitingLobby}</p>
        </div>`;
    }

    function renderBoard(state, lang) {
        const tr = t(lang);
        const turn = state.turn;
        const isMyTurn = turn.team === team;
        const guideLocked = turn.guideLimit !== null;

        const teamLabel = team.charAt(0).toUpperCase() + team.slice(1);
        const statusText = (isMyTurn && !guideLocked)
            ? `${teamLabel} ${tr.guide} : ${tr.yourTurn}`
            : `${teamLabel} ${tr.guide}`;

        const btnHTML = Array.from({ length: MAX_HINT_BTNS }, (_, i) => {
            const n = i + 1;
            const active = isMyTurn && !guideLocked && !state.gameOver;
            const chosen = turn.guideLimit === n;

            return `
            <button
                class="guide__num-btn ${chosen ? 'guide__num-btn--chosen' : ''}"
                data-limit="${n}"
                ${!active ? 'disabled' : ''}
            >${n}</button>
        `;
        }).join('');

        root.innerHTML = `
        <div class="guide guide--${team}">
            <div class="grid grid--5">
                ${state.cells.map(cell => `
                    <div class="${getGuideCellClass(cell)}">
                        <span class="cell__content">${escapeHtml(cell.word)}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="guide__status">${statusText}</div>
        <div class="guide__btns">${btnHTML}</div>
    `;

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
