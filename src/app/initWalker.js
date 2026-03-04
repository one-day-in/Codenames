// src/app/initWalker.js
import { onOrientationChange } from '../utils/resize.js';
import { fitTextAll } from '../utils/fitText.js';
import { getGameCellClass } from '../utils/renderCell.js';
import { t, DEFAULT_LANGUAGE, getAwakeningName, getTeamName } from '../utils/i18n.js';
import { getBaseUrl } from '../utils/url.js';
import { escapeHtml } from '../utils/sanitize.js';
import { ICONS } from '../utils/icons.js';
import { initGuestPage } from './initGuestPage.js';

export async function initWalker(root) {
    const result = await initGuestPage(root, {
        roleType: 'walker',
        invalidParamsHtml: `<div class="error-screen">
            <p>${t(DEFAULT_LANGUAGE).wrongLink.replace('\n', '<br>')}</p>
        </div>`,
    });
    if (!result) return;

    const { presence, store, team } = result;

    function renderWaiting(lang = DEFAULT_LANGUAGE) {
        root.innerHTML = `<div class="waiting-screen">
            <p>${t(lang).waitingLobby}</p>
        </div>`;
    }

    function renderAwake(state, lang) {
        const tr = t(lang);
        const isWinner = state.winner === team;
        root.innerHTML = `
            <div class="awake-screen awake-screen--${state.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${tr.awake}</div>
                    <div class="awake-screen__awakening">${getAwakeningName(state.winner, lang)}</div>
                    <div class="awake-screen__role">${isWinner ? '🏆' : '💀'} ${getTeamName(team, lang)} ${tr.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${tr.newGame}</button>
                </div>
            </div>`;

        document.getElementById('newGameBtn').addEventListener('click', async () => {
            await store.resetGame();
            window.location.href = getBaseUrl() + '/index.html';
        });
    }

    function renderBoard(state, lang) {
        const tr = t(lang);
        const turn = state.turn;
        const isMyTurn = turn.team === team;
        const hasLimit = turn.guideLimit !== null;
        const canPlay = isMyTurn && hasLimit && !state.gameOver;

        const playerTitle = `${getTeamName(team, lang)} ${tr.dreamwalker}`;
        const turnInfoText = canPlay ? `${turn.guideLimit} ${tr.steps}` : '';
        const turnInfoClass = canPlay
            ? 'walker__turn-info walker__turn-info--active'
            : 'walker__turn-info walker__turn-info--muted';

        document.body.classList.remove('team-resonant', 'team-dissonant');
        document.body.classList.add(`team-${turn.team}`);

        root.innerHTML = `
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__header">
                    <div class="walker__title ${canPlay ? 'walker__title--active' : 'walker__title--muted'}">${playerTitle}</div>
                    <div class="walker__meta">
                        <div class="${turnInfoClass}">${turnInfoText}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${tr.end}</span>
                            <button class="walker__action-btn walker__refresh-btn ${canPlay ? 'walker__refresh-btn--active' : 'walker__refresh-btn--muted'}" id="refreshBtn" aria-label="${tr.endTurn}" ${!canPlay ? 'disabled' : ''}>${ICONS.refreshCw}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${team}">
                    <div class="grid grid--5">
                        ${state.cells.map((cell, i) => `
                            <div
                                class="${getGameCellClass(cell)} ${canPlay && !cell.revealed ? 'cell--clickable' : ''}"
                                data-index="${i}"
                            >
                                <span class="cell__content">${escapeHtml(cell.word)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
        </div>
    `;

        requestAnimationFrame(() => fitTextAll(root));

        root.querySelectorAll('.cell--clickable')
            .forEach(cell => {
                cell.addEventListener('click', () =>
                    store.reveal(parseInt(cell.dataset.index, 10))
                );
            });

        document.getElementById('refreshBtn')
            ?.addEventListener('click', () => {
                if (canPlay) store.endTurn();
            });
    }

    function rerender({ state, language } = {}) {
        const s = state ?? store.getState();
        const lang = language ?? store.getLanguage();
        if (!s || s.phase === 'lobby') { renderWaiting(lang); return; }
        if (s.gameOver) { renderAwake(s, lang); return; }
        renderBoard(s, lang);
    }

    store.subscribe(rerender);
    presence.onChange(() => rerender());
    onOrientationChange(() => rerender());
}
