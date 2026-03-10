// src/app/initPreview.js
// Dev-only: http://localhost:5173/sleepwalkers/preview.html?screen=game

import { createBoard } from '../domain/boardFactory.js';
import { getGameCellClass, getGuideCellClass } from '../utils/renderCell.js';
import { fitTextAll, fitTextToCell } from '../utils/fitText.js';
import { ICONS } from '../utils/icons.js';
import { t, DEFAULT_LANGUAGE, getTeamName, formatCardCount } from '../utils/i18n.js';

const PREVIEW_NAV_CSS = `
.preview-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    gap: 6px;
    padding: 8px;
    background: rgba(217, 28, 28, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    overflow-x: auto;
}
.preview-nav__btn {
    flex: 0 0 auto;
    min-height: 34px;
    padding: 6px 12px;
    border-radius: 8px;
     border 1px solid rgb(248, 240, 240);
    font-family: monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}
.preview-nav__btn--active {
    border-color: var(--pal-team-light);
    box-shadow: 0 0 16px rgba(255, 223, 174, 0.28);
}
.preview-clickable .cell {
    cursor: pointer;
}
.preview-clickable .cell:hover {
    outline: 1px solid rgba(255, 255, 255, 0.9);
    outline-offset: -1px;
}
`;

const SCREENS = [
    { id: 'game', label: 'Game' },
    { id: 'guide-resonant', label: 'Guide R' },
    { id: 'guide-dissonant', label: 'Guide D' },
    { id: 'walker-resonant', label: 'Walker R' },
    { id: 'walker-dissonant', label: 'Walker D' },
    { id: 'home-guest', label: 'Home Guest' },
    { id: 'home-auth', label: 'Home Auth' },
    { id: 'home-confirm', label: 'Home Confirm' },
];

const MOCK_WORDS = [
    'МРІЯ', 'ТІНЬ', 'ХВИЛЯ', 'ЗІРКА', 'КРИЛО',
    'МІСЯЦЬ', 'ВОГОНЬ', 'ЛІХТАР', 'ДОРОГА', 'ПІСНЯ',
    'КАМІНЬ', 'ВІТЕР', 'ОЗЕРО', 'РАНОК', 'ЛИСТОК',
    'ТУМАН', 'БЕРЕГ', 'НЕБО', 'СТРУНА', 'КВІТКА',
    'ЖАРА', 'ДУМКА', 'СЛОВО', 'МОРЕ', 'КЛЮЧ',
];

function makeMockState() {
    const { cells, startsFirst } = createBoard({ size: 5, words: MOCK_WORDS });
    return {
        phase: 'game',
        size: 5,
        cells,
        turn: { team: startsFirst, guideLimit: 3, dreamwalkerMoves: 1 },
        gameOver: false,
        winner: null,
    };
}

function makePreviewQr(url, size = 190, team = 'neutral') {
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

function renderGame(state) {
    const tr = t(DEFAULT_LANGUAGE);
    const previewPresence = {
        'guide-dissonant': false,
        'walker-dissonant': true,
        'guide-resonant': true,
        'walker-resonant': false,
    };
    document.body.className = `team-${state.turn.team}`;
    const { cells } = state;
    const rTotal = cells.filter(c => c.role === 'resonant').length;
    const dTotal = cells.filter(c => c.role === 'dissonant').length;
    const rDone = cells.filter(c => c.role === 'resonant' && c.revealed).length;
    const dDone = cells.filter(c => c.role === 'dissonant' && c.revealed).length;
    return `
    <div class="screen-layout game-layout">
        <header class="screen-header game__header">
            <div class="game__header-bar">
                <button class="btn-back btn-icon">${ICONS.arrowLeft}</button>
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
                                        <h3 class="game__qr-team-title">${getTeamName(team, DEFAULT_LANGUAGE)}</h3>
                                        <div class="game__qr-cards">
                                            ${[
                                                { role: 'guide', label: tr.guide },
                                                { role: 'walker', label: tr.dreamwalker },
                                            ].map(item => `
                                                <article class="game__qr-card game__qr-card--${item.role}">
                                                    <div class="game__qr-code-wrap">${makePreviewQr(`${window.location.origin}/sleepwalkers/${item.role}.html?team=${team}`, 130, team)}</div>
                                                    <p class="game__qr-role">
                                                        <span class="game__qr-role-eye ${previewPresence[`${item.role}-${team}`] ? 'is-connected' : ''}">
                                                            ${previewPresence[`${item.role}-${team}`] ? ICONS.eye : ICONS.eyeClosed}
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
                    ${cells.map((cell, i) => `
                        <div class="${getGameCellClass(cell)}" data-index="${i}">
                            <span class="cell__content">${cell.word}</span>
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
            <button class="fullscreen-btn btn-icon">${ICONS.maximize}</button>
        </footer>
    </div>`;
}

function renderGuide(state, team) {
    const tr = t(DEFAULT_LANGUAGE);
    document.body.className = '';
    const { guideLimit, team: turnTeam } = state.turn;
    const isMyTurn = turnTeam === team;
    const guideLocked = guideLimit !== null;
    const canAct = isMyTurn && !guideLocked;
    const teamTitle = getTeamName(team, DEFAULT_LANGUAGE);
    const guideStatus = canAct
        ? `${tr.guide}: ${tr.chooseLimit}`
        : `${tr.guide}: ${ICONS.eyeClosed}`;

    const btns = Array.from({ length: 8 }, (_, i) => {
        const n = i + 1;
        const chosen = guideLimit === n;
        return `<button class="guide__num-btn ${chosen ? 'guide__num-btn--chosen' : ''}" ${!canAct ? 'disabled' : ''}>${n}</button>`;
    }).join('');

    return `
    <div class="screen-layout guide-layout">
        <header class="screen-header">
            <div class="guide__header">
                <div class="guide__title ${canAct ? 'guide__title--active' : 'guide__title--muted'}">${teamTitle}</div>
                <div class="guide__meta ${canAct ? 'guide__meta--active' : 'guide__meta--muted'}">${guideStatus}</div>
                <div class="guide__btns ${canAct ? 'guide__btns--active' : 'guide__btns--muted'}">${btns}</div>
            </div>
        </header>

        <main class="screen-body">
            <div class="guide guide--${team} preview-clickable">
                <div class="grid grid--5">
                    ${state.cells.map((cell, i) => `
                        <div class="${getGuideCellClass(cell)}" data-index="${i}">
                            <span class="cell__content">${cell.word}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </main>

        <footer class="screen-footer guide__footer"></footer>
    </div>`;
}

function renderWalker(state, team) {
    const tr = t(DEFAULT_LANGUAGE);
    document.body.className = `team-${state.turn.team}`;
    const { team: turnTeam, guideLimit } = state.turn;
    const isMyTurn = turnTeam === team;
    const canPlay = isMyTurn && guideLimit !== null;
    const teamTitle = getTeamName(team, DEFAULT_LANGUAGE);
    const walkerStatus = canPlay
        ? `${tr.dreamwalker}: ${formatCardCount(guideLimit, DEFAULT_LANGUAGE)}`
        : `${tr.dreamwalker}: ${ICONS.eyeClosed}`;
    const statusClass = canPlay
        ? 'walker__status walker__status--active'
        : 'walker__status walker__status--muted';

    return `
    <div class="screen-layout walker-layout">
        <header class="screen-header">
            <div class="walker__header">
                <div class="walker__title ${canPlay ? 'walker__title--active' : 'walker__title--muted'}">${teamTitle}</div>
                <div class="walker__meta">
                    <div class="${statusClass}">${walkerStatus}</div>
                    <div class="walker__actions">
                        <span class="walker__end-hint">${tr.endTurn}</span>
                        <button class="walker__action-btn walker__refresh-btn ${canPlay ? 'walker__refresh-btn--active' : 'walker__refresh-btn--muted'}" aria-label="${tr.endTurn}" ${!canPlay ? 'disabled' : ''}>${ICONS.refreshCw}</button>
                    </div>
                </div>
        </div>
        </header>

        <main class="screen-body">
            <div class="walker walker--${team} preview-clickable">
                <div class="grid grid--5">
                    ${state.cells.map((cell, i) => `
                        <div class="${getGameCellClass(cell)}" data-index="${i}">
                            <span class="cell__content">${cell.word}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </main>

        <footer class="screen-footer walker__footer"></footer>
    </div>`;
}

function renderHome({ isGuest = false, showConfirm = false } = {}) {
    document.body.className = '';
    const tr = t(DEFAULT_LANGUAGE);
    const generateEyes = (count = 16) => {
        const cols = 4;
        const rows = 4;
        const minX = 8;
        const maxX = 92;
        const minY = 12;
        const maxY = 88;
        const cellW = (maxX - minX) / cols;
        const cellH = (maxY - minY) / rows;
        const jitterX = cellW * 0.34;
        const jitterY = cellH * 0.34;

        const cells = [];
        for (let r = 0; r < rows; r += 1) {
            for (let c = 0; c < cols; c += 1) {
                cells.push({ r, c });
            }
        }

        for (let i = cells.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [cells[i], cells[j]] = [cells[j], cells[i]];
        }

        return cells.slice(0, count).map(({ r, c }, i) => {
            const baseX = minX + cellW * (c + 0.5);
            const baseY = minY + cellH * (r + 0.5);
            const left = Math.round(baseX + (Math.random() * 2 - 1) * jitterX);
            const top = Math.round(baseY + (Math.random() * 2 - 1) * jitterY);
            const size = Math.round(24 + Math.random() * 56);
            const period = (3 + Math.random() * 2).toFixed(2);
            const delay = (Math.random() * 2.5).toFixed(2);
            const alpha = (0.3 + Math.random() * 0.5).toFixed(2);
            return { id: i, size, left, top, period, delay, alpha };
        });
    };
    const previewEyes = generateEyes(16);

    const authBlock = isGuest
        ? `
            <button class="lobby__btn lobby__btn--google" id="loginBtn">
                <span class="lobby__btn-text">${tr.signIn}</span>
                <span class="lobby__btn-google-icon">${ICONS.google}</span>
            </button>
        `
        : `
            <div class="lobby-screen__actions">
                <button class="lobby__btn lobby__btn--continue">Continue Game</button>
                <button class="lobby__btn lobby__btn--newgame">New Game</button>
            </div>
        `;

    const confirmBlock = showConfirm
        ? `
    <div class="confirm-modal">
        <div class="confirm-modal__backdrop"></div>
        <div class="confirm-modal__content" role="dialog" aria-modal="true">
            <h2 class="confirm-modal__title">${tr.newGame}</h2>
            <p class="confirm-modal__text">${tr.confirmNewGame}</p>
            <div class="confirm-modal__actions">
                <button class="lobby__btn confirm-modal__btn confirm-modal__btn--confirm">${tr.confirmNewGameAction}</button>
                <button class="lobby__btn confirm-modal__btn confirm-modal__btn--cancel">${tr.cancel}</button>
            </div>
        </div>
    </div>
    `
        : '';

    return `
    <div class="app">
        <div class="lang-toggle">
            <button class="lang-toggle__btn lang-toggle__btn--active">UK</button>
            <button class="lang-toggle__btn">EN</button>
        </div>
        <div class="lobby-screen">
            <div class="home-eyes" aria-hidden="true">
                ${previewEyes.map(eye => `
                    <span class="home-eye"
                        style="--eye-size:${eye.size}px;--eye-left:${eye.left}%;--eye-top:${eye.top}%;--eye-period:${eye.period}s;--eye-delay:${eye.delay}s;--eye-alpha:${eye.alpha};">
                        <span class="home-eye__open">${ICONS.eye}</span>
                        <span class="home-eye__closed">${ICONS.eyeClosed}</span>
                    </span>
                `).join('')}
            </div>
            <div class="lobby__title-wrap"><h1 class="lobby__title">SLEEPWALKERS</h1></div>
            ${authBlock}
        </div>
    </div>
    ${isGuest ? '' : `<button class="btn-logout btn-icon">${ICONS.user}</button>`}
    <button class="fullscreen-btn btn-icon">${ICONS.maximize}</button>
    ${confirmBlock}`;
}

function getScreenId() {
    return new URLSearchParams(location.search).get('screen') || 'home-guest';
}

function setScreenId(id) {
    const url = new URL(location.href);
    url.searchParams.set('screen', id);
    history.pushState({}, '', url);
}

export function initPreview(root) {
    const styleEl = document.createElement('style');
    styleEl.textContent = PREVIEW_NAV_CSS;
    document.head.appendChild(styleEl);

    const state = makeMockState();
    const boardScreens = new Set(['game', 'guide-resonant', 'guide-dissonant', 'walker-resonant', 'walker-dissonant']);
    let qrModalPinned = false;
    let qrModalHover = false;
    let fullscreenBound = false;
    let hasRenderedBoard = false;
    let prevRevealed = new Set();

    function syncFullscreenIcon() {
        root.querySelectorAll('.fullscreen-btn').forEach(btn => {
            btn.innerHTML = document.fullscreenElement ? ICONS.minimize : ICONS.maximize;
        });
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

    function render() {
        const id = getScreenId();
        let html = '';

        switch (id) {
            case 'guide-resonant':
                html = renderGuide(state, 'resonant');
                break;
            case 'guide-dissonant':
                html = renderGuide(state, 'dissonant');
                break;
            case 'walker-resonant':
                html = renderWalker(state, 'resonant');
                break;
            case 'walker-dissonant':
                html = renderWalker(state, 'dissonant');
                break;
            case 'home':
                html = renderHome();
                break;
            case 'home-auth':
                html = renderHome({ isGuest: false, showConfirm: false });
                break;
            case 'home-confirm':
                html = renderHome({ isGuest: false, showConfirm: true });
                break;
            case 'home-guest':
                html = renderHome({ isGuest: true, showConfirm: false });
                break;
            case 'game':
            default:
                html = renderGame(state);
                break;
        }

        const nav = `
            <div class="preview-nav">
                ${SCREENS.map(s => `
                    <button class="preview-nav__btn ${s.id === id ? 'preview-nav__btn--active' : ''}" data-screen="${s.id}">${s.label}</button>
                `).join('')}
            </div>`;

        root.innerHTML = `${html}${nav}`;

        if (boardScreens.has(id)) {
            const currentRevealed = new Set(
                state.cells
                    .map((cell, idx) => (cell.revealed ? idx : -1))
                    .filter(idx => idx >= 0)
            );

            root.querySelectorAll('.grid .cell[data-index]').forEach((el) => {
                const idx = Number(el.dataset.index);
                if (!hasRenderedBoard) return;
                if (!currentRevealed.has(idx) || prevRevealed.has(idx)) return;
                el.classList.add('cell--reveal-anim');
            });

            prevRevealed = currentRevealed;
            hasRenderedBoard = true;
        } else {
            hasRenderedBoard = false;
            prevRevealed = new Set();
        }

        syncQrModalState();

        const qrHit = root.querySelector('.game__qr-hit');
        qrHit?.addEventListener('mouseenter', () => {
            qrModalHover = true;
            syncQrModalState();
        });
        qrHit?.addEventListener('mouseleave', () => {
            qrModalHover = false;
            syncQrModalState();
        });

        requestAnimationFrame(() => {
            root.querySelectorAll('.cell').forEach(cell => fitTextToCell(cell));
            fitTextAll(root);
        });

        root.querySelector('.preview-nav')?.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-screen]');
            if (!btn) return;
            setScreenId(btn.dataset.screen);
            render();
        });

        root.querySelectorAll('.preview-clickable .cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const idx = Number(cell.dataset.index);
                if (Number.isNaN(idx)) return;
                state.cells[idx].revealed = !state.cells[idx].revealed;
                render();
            });
        });

        root.querySelectorAll('.fullscreen-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen?.();
                } else {
                    document.exitFullscreen?.();
                }
            });
        });

        syncFullscreenIcon();
    }

    root.addEventListener('click', (event) => {
        const hit = event.target.closest('.game__qr-hit');
        if (hit) {
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

    if (!fullscreenBound) {
        document.addEventListener('fullscreenchange', syncFullscreenIcon);
        fullscreenBound = true;
    }

    window.addEventListener('popstate', render);
    render();
}
