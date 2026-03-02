// src/app/initGame.js — ігровий хост (game.html)

import { createGameStore } from '../store/gameStore.js';
import { fitTextAll } from '../utils/fitText.js';
import { getGameCellClass } from '../utils/renderCell.js';
import { createPresence, ROLES, ALL_ROLES } from '../utils/presence.js';
import { keepAlive } from '../utils/keepAlive.js';
import { t, DEFAULT_LANGUAGE, GAME_NAME } from '../utils/i18n.js';
import { getBaseUrl, getParams } from '../utils/url.js';
import { signOut } from '../utils/auth.js';
import { ICONS } from '../utils/icons.js';
import { onOrientationChange } from '../utils/resize.js';
import { escapeHtml } from '../utils/sanitize.js';

function makeQrImg(url, size = 130) {
    return `<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(url)}"
        width="${size}" height="${size}" />`;
}

export async function initGame(root) {
    const { roomId, token } = getParams();

    if (!roomId || !token) {
        window.location.href = getBaseUrl() + '/index.html';
        return;
    }

    // Лоадер поки ініціалізується
    root.innerHTML = `
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">${GAME_NAME}</h1>
                <p>${t(DEFAULT_LANGUAGE).loading}</p>
            </div>
        </div>`;

    // [PRESENCE DISABLED] createPresence(roomId), presence.listen(), keepAlive

    const store = createGameStore(roomId);
    await store.init();

    if (!store.getState()) {
        window.location.href = getBaseUrl() + '/index.html';
        return;
    }

    function guestUrl(page, team) {
        return `${getBaseUrl()}/${page}.html?room=${roomId}&token=${token}&team=${team}`;
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
                                    <div class="qr-wrapper">${makeQrImg(c.url)}</div>
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

    function renderBoard(state, lang) {
        const tr = t(lang);
        const { cells } = state;
        const rTotal = cells.filter(c => c.role === 'resonant').length;
        const dTotal = cells.filter(c => c.role === 'dissonant').length;
        const rDone  = cells.filter(c => c.role === 'resonant'  && c.revealed).length;
        const dDone  = cells.filter(c => c.role === 'dissonant' && c.revealed).length;
        const qrItems = [
            { team: 'dissonant', role: 'guide', label: tr.guide, marker: 'G', side: 'left' },
            { team: 'dissonant', role: 'walker', label: tr.dreamwalker, marker: 'W', side: 'left' },
            { team: 'resonant', role: 'guide', label: tr.guide, marker: 'G', side: 'right' },
            { team: 'resonant', role: 'walker', label: tr.dreamwalker, marker: 'W', side: 'right' },
        ];

        document.body.className = `team-${state.turn.team}`;

        root.innerHTML = `
        <div class="game">
            <div class="grid grid--5">
                ${cells.map(cell => `
                    <div class="${getGameCellClass(cell)}">
                        <span class="cell__content">${escapeHtml(cell.word)}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="game-qr-dock game-qr-dock--left">
            ${qrItems.filter(item => item.side === 'left').map(item => `
                <div class="game-qr-dock__item game-qr-dock__item--${item.team}">
                    <button
                        class="game-qr-dot"
                        type="button"
                        aria-label="${item.team} ${item.label}"
                        title="${item.team} ${item.label}"
                    >${item.marker}</button>
                    <div class="game-qr-popover">
                        <p class="game-qr-popover__title">${item.team} ${item.label}</p>
                        <div class="game-qr-popover__image">
                            ${makeQrImg(guestUrl(item.role, item.team), 190)}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="game-qr-dock game-qr-dock--right">
            ${qrItems.filter(item => item.side === 'right').map(item => `
                <div class="game-qr-dock__item game-qr-dock__item--${item.team}">
                    <button
                        class="game-qr-dot"
                        type="button"
                        aria-label="${item.team} ${item.label}"
                        title="${item.team} ${item.label}"
                    >${item.marker}</button>
                    <div class="game-qr-popover">
                        <p class="game-qr-popover__title">${item.team} ${item.label}</p>
                        <div class="game-qr-popover__image">
                            ${makeQrImg(guestUrl(item.role, item.team), 190)}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="game__score">
            <span class="game__score-item game__score-item--resonant">${rDone} / ${rTotal}</span>
            <span class="game__score-item game__score-item--dissonant">${dDone} / ${dTotal}</span>
        </div>

        <button class="btn-back btn-icon" id="backBtn">${ICONS.arrowLeft}</button>
        <button class="btn-profile btn-icon" id="profileBtn">${ICONS.user}</button>
        <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${ICONS.maximize}</button>
        `;

        document.getElementById('backBtn').addEventListener('click', () => {
            window.location.href = getBaseUrl() + '/index.html';
        });

        document.getElementById('profileBtn').addEventListener('click', async () => {
            await signOut();
            window.location.href = getBaseUrl() + '/index.html';
        });

        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });

        requestAnimationFrame(() => fitTextAll(root));
    }

    function rerender() {
        const state = store.getState();
        const lang = store.getLanguage();

        if (!state) {
            window.location.href = getBaseUrl() + '/index.html';
            return;
        }

        // [PRESENCE DISABLED] — одразу активуємо, без очікування гравців
        if (state.phase === 'lobby') {
            store.startGame();
            return;
        }

        renderBoard(state, lang);
    }

    store.subscribe(rerender);
    // [PRESENCE DISABLED] presence.onChange(rerender);
    onOrientationChange(() => fitTextAll(root));
    rerender();
}
