// src/app/initGame.js — ігровий хост (game.html)

import { createGameStore } from '../store/gameStore.js';
import { fitTextAll } from '../utils/fitText.js';
import { getGameCellClass } from '../utils/renderCell.js';
import { createPresence, ROLES, ALL_ROLES } from '../utils/presence.js';
import { keepAlive } from '../utils/keepAlive.js';
import { t } from '../utils/i18n.js';
import { getBaseUrl, getParams } from '../utils/url.js';
import { ICONS } from '../utils/icons.js';
import { onOrientationChange } from '../utils/resize.js';
import { escapeHtml } from '../utils/sanitize.js';
import { renderTurnTransitionOverlay } from '../utils/turnTransition.js';

function makeQrImg(url, size = 130, team = 'neutral') {
    const palette = {
        resonant: { color: '5A2E00', bg: 'FFF3DE' },
        dissonant: { color: '0A3558', bg: 'EAF6FF' },
        neutral: { color: '1E2A36', bg: 'F2F6FB' },
    };
    const { color, bg } = palette[team] || palette.neutral;
    return `<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=${color}&bgcolor=${bg}&data=${encodeURIComponent(url)}"
        width="${size}" height="${size}" />`;
}

export async function initGame(root) {
    const { roomId, token } = getParams();

    if (!roomId || !token) {
        window.location.href = getBaseUrl() + '/index.html';
        return;
    }

    const presence = createPresence(roomId);
    presence.listen();
    keepAlive(presence);

    const store = createGameStore(roomId);
    await store.init();

    if (!store.getState()) {
        window.location.href = getBaseUrl() + '/index.html';
        return;
    }

    function guestUrl(page, team) {
        return `${getBaseUrl()}/${page}.html?room=${roomId}&token=${token}&team=${team}`;
    }

    let qrModalPinned = false;
    let qrModalHover = false;
    let fullscreenBound = false;
    let hasRenderedBoard = false;
    let prevRevealed = new Set();

    function syncFullscreenIcon() {
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (!fullscreenBtn) return;
        fullscreenBtn.innerHTML = document.fullscreenElement ? ICONS.minimize : ICONS.maximize;
    }

    function syncQrModalState() {
        const hub = root.querySelector('.game__qr-hub');
        if (!hub) {
            qrModalPinned = false;
            qrModalHover = false;
            return;
        }
        const isOpen = qrModalPinned || qrModalHover;
        hub.classList.toggle('is-open', isOpen);
        hub.classList.toggle('is-pinned', qrModalPinned);
    }

    function closeQrModal() {
        qrModalPinned = false;
        qrModalHover = false;
        syncQrModalState();
    }

    function renderQrPanel(presenceState, lang) {
        const tr = t(lang);
        const groups = [
            {
                team: 'dissonant', title: tr.dissonant,
                cards: [
                    { role: ROLES.GUIDE_DISSONANT, url: guestUrl('guide', 'dissonant'), label: tr.guide },
                    { role: ROLES.WALKER_DISSONANT, url: guestUrl('walker', 'dissonant'), label: tr.dreamwalker },
                ],
            },
            {
                team: 'resonant', title: tr.resonant,
                cards: [
                    { role: ROLES.GUIDE_RESONANT, url: guestUrl('guide', 'resonant'), label: tr.guide },
                    { role: ROLES.WALKER_RESONANT, url: guestUrl('walker', 'resonant'), label: tr.dreamwalker },
                ],
            },
        ];

        return `
            <div class="qr-panel">
                ${groups.map(g => `
                    <div class="qr-panel__group qr-panel__group--${g.team}">
                        <p class="qr-panel__group-title">${g.title}</p>
                        <div class="qr-panel__group-cards">
                            ${g.cards.map(c => `
                                <div class="qr-panel__block ${presenceState[c.role] ? 'qr-panel__block--connected' : ''}">
                                    <div class="qr-wrapper">${makeQrImg(c.url, 130, g.team)}</div>
                                    <p class="qr-panel__label">${c.label}</p>
                                    ${presenceState[c.role] ? '<div class="qr-panel__check">✓</div>' : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>`;
    }

    function renderLobby(presenceState, lang) {
        const tr = t(lang);
        const count = ALL_ROLES.filter(r => presenceState[r]).length;
        document.body.className = '';

        root.innerHTML = `
            <div class="app">
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">${GAME_NAME}</h1>
                    ${renderQrPanel(presenceState, lang)}
                    <p>${count} / 4 ${tr.waitingPlayers}</p>
                </div>
            </div>`;
    }

    function renderBoard(state, lang, presenceState) {
        const tr = t(lang);
        const { cells } = state;
        const rTotal = cells.filter(c => c.role === 'resonant').length;
        const dTotal = cells.filter(c => c.role === 'dissonant').length;
        const rDone  = cells.filter(c => c.role === 'resonant'  && c.revealed).length;
        const dDone  = cells.filter(c => c.role === 'dissonant' && c.revealed).length;
        const qrItems = [
            { team: 'dissonant', role: 'guide', label: tr.guide, presenceRole: ROLES.GUIDE_DISSONANT },
            { team: 'dissonant', role: 'walker', label: tr.dreamwalker, presenceRole: ROLES.WALKER_DISSONANT },
            { team: 'resonant', role: 'guide', label: tr.guide, presenceRole: ROLES.GUIDE_RESONANT },
            { team: 'resonant', role: 'walker', label: tr.dreamwalker, presenceRole: ROLES.WALKER_RESONANT },
        ];

        document.body.className = `team-${state.turn.team}`;

        const currentRevealed = new Set(
            cells
                .map((cell, idx) => (cell.revealed ? idx : -1))
                .filter(idx => idx >= 0)
        );

        root.innerHTML = `
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <button class="btn-back btn-icon" id="backBtn">${ICONS.arrowLeft}</button>
                    <div class="game__qr-hub" aria-label="${tr.qrHubLabel}">
                        <button class="game__qr-hit btn-flat" type="button" aria-label="${tr.showQr}">
                            <span class="game__qr-caption">${tr.connectControllers}</span>
                            <span class="game__qr-trigger" aria-hidden="true">${ICONS.qrCode}</span>
                            <span class="game__eye-indicator" aria-hidden="true">
                                <span class="game__eye game__eye--closed">${ICONS.eyeClosed}</span>
                                <span class="game__eye game__eye--open">${ICONS.eye}</span>
                            </span>
                        </button>
                        <div class="game__qr-modal">
                            <div class="game__qr-modal-content">
                                <p class="game__qr-hint">${tr.scanToControl}</p>
                                <div class="game__qr-columns">
                                    ${['dissonant', 'resonant'].map(team => `
                                        <section class="game__qr-team game__qr-team--${team}">
                                            <h3 class="game__qr-team-title">${team === 'dissonant' ? tr.dissonant : tr.resonant}</h3>
                                            <div class="game__qr-cards">
                                                ${qrItems.filter(item => item.team === team).map(item => `
                                                    <article class="game__qr-card game__qr-card--${item.role}">
                                                        <div class="game__qr-code-wrap">${makeQrImg(guestUrl(item.role, item.team), 130, item.team)}</div>
                                                        <p class="game__qr-role">
                                                            <span class="game__qr-role-eye ${presenceState[item.presenceRole] ? 'is-connected' : ''}">
                                                                ${presenceState[item.presenceRole] ? ICONS.eye : ICONS.eyeClosed}
                                                            </span>
                                                            <span class="game__qr-role-text">${item.label}</span>
                                                        </p>
                                                    </article>
                                                `).join('')}
                                            </div>
                                        </section>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="game">
                    <div class="grid grid--5">
                        ${cells.map(cell => `
                            <div class="${getGameCellClass(cell)}">
                                <span class="cell__content">${escapeHtml(cell.word)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-item game__score-item--resonant ${state.turn.team === 'resonant' ? 'game__score-item--active' : ''}">${rDone} / ${rTotal}</span>
                    <span class="game__score-item game__score-item--dissonant ${state.turn.team === 'dissonant' ? 'game__score-item--active' : ''}">${dDone} / ${dTotal}</span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${ICONS.maximize}</button>
            </footer>
            ${renderTurnTransitionOverlay(state, lang)}
        </div>
        `;

        root.querySelectorAll('.game .grid .cell').forEach((el, idx) => {
            if (!hasRenderedBoard) return;
            if (!currentRevealed.has(idx) || prevRevealed.has(idx)) return;
            el.classList.add('cell--reveal-anim');
        });

        prevRevealed = currentRevealed;
        hasRenderedBoard = true;

        document.getElementById('backBtn').addEventListener('click', () => {
            window.location.href = getBaseUrl() + '/index.html';
        });

        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });

        syncFullscreenIcon();

        const qrHit = root.querySelector('.game__qr-hit');
        qrHit?.addEventListener('mouseenter', () => {
            if (store.getState()?.turnTransition) return;
            qrModalHover = true;
            syncQrModalState();
        });
        qrHit?.addEventListener('mouseleave', () => {
            if (store.getState()?.turnTransition) return;
            qrModalHover = false;
            syncQrModalState();
        });

        syncQrModalState();
        requestAnimationFrame(() => fitTextAll(root));
    }

    function rerender() {
        const state = store.getState();
        const lang = store.getLanguage();
        const presenceState = presence.getPresenceState();

        if (!state) {
            window.location.href = getBaseUrl() + '/index.html';
            return;
        }

        // [PRESENCE DISABLED] — одразу активуємо, без очікування гравців
        if (state.phase === 'lobby') {
            store.startGame().catch((error) => {
                console.error('Failed to start game:', error);
            });
            return;
        }

        renderBoard(state, lang, presenceState);
    }

    store.subscribe(rerender);
    presence.onChange(rerender);
    onOrientationChange(() => fitTextAll(root));

    if (!fullscreenBound) {
        document.addEventListener('fullscreenchange', syncFullscreenIcon);
        fullscreenBound = true;
    }

    root.addEventListener('click', (event) => {
        if (store.getState()?.turnTransition) return;

        const hubHit = event.target.closest('.game__qr-hit');
        if (hubHit) {
            event.preventDefault();
            qrModalPinned = !qrModalPinned;
            syncQrModalState();
            return;
        }

        if (qrModalPinned) {
            qrModalPinned = false;
            syncQrModalState();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && (qrModalPinned || qrModalHover)) {
            closeQrModal();
        }
    });

    rerender();
}
