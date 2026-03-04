// src/app/initPreview.js
// Dev-only: http://localhost:5173/sleepwalkers/preview.html?screen=game

import { createBoard } from '../domain/boardFactory.js';
import { getGameCellClass, getGuideCellClass } from '../utils/renderCell.js';
import { fitTextAll, fitTextToCell } from '../utils/fitText.js';
import { ICONS } from '../utils/icons.js';
import { t, DEFAULT_LANGUAGE, getTeamName } from '../utils/i18n.js';

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
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    overflow-x: auto;
}
.preview-nav__btn {
    flex: 0 0 auto;
    min-height: 34px;
    padding: 6px 12px;
    border-radius: 8px;
    font-family: monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}
.preview-nav__btn--active {
    border-color: var(--resonant-light);
    box-shadow: 0 0 16px rgba(255, 223, 174, 0.28);
}
.preview-clickable .cell {
    cursor: pointer;
}
.preview-clickable .cell:hover {
    outline: 1px solid rgba(255, 255, 255, 0.3);
    outline-offset: -1px;
}
`;

const SCREENS = [
    { id: 'game', label: 'Game' },
    { id: 'guide-resonant', label: 'Guide R' },
    { id: 'guide-dissonant', label: 'Guide D' },
    { id: 'walker-resonant', label: 'Walker R' },
    { id: 'walker-dissonant', label: 'Walker D' },
    { id: 'home', label: 'Home' },
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

function makePreviewQr(url, size = 190) {
    return `<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=1D2433&bgcolor=FAF8F2&data=${encodeURIComponent(url)}"
        width="${size}" height="${size}" />`;
}

function renderGame(state) {
    const tr = t(DEFAULT_LANGUAGE);
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
                    <span class="game__eye-indicator" aria-hidden="true">
                        <span class="game__eye game__eye--closed">${ICONS.eyeClosed}</span>
                        <span class="game__eye game__eye--open">${ICONS.eye}</span>
                    </span>
                    <button class="game__qr-trigger btn-icon" type="button" aria-label="${tr.showQr}">${ICONS.qrCode}</button>
                    <div class="game__qr-modal">
                        <div class="game__qr-modal-content">
                            <p class="game__qr-hint">${tr.scanToControl}</p>
                            <div class="qr-panel">
                                ${['dissonant', 'resonant'].map(team => `
                                    <div class="qr-panel__group qr-panel__group--${team}">
                                        <p class="qr-panel__group-title">${getTeamName(team, DEFAULT_LANGUAGE)}</p>
                                        <div class="qr-panel__group-cards">
                                            ${[
                                                { role: 'guide', label: tr.guide },
                                                { role: 'walker', label: tr.dreamwalker },
                                            ].map(item => `
                                                <div class="qr-panel__block">
                                                    <div class="qr-wrapper">${makePreviewQr(`${window.location.origin}/sleepwalkers/${item.role}.html?team=${team}`, 130)}</div>
                                                    <p class="qr-panel__label">${item.label}</p>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <main class="screen-body">
            <div class="game preview-clickable">
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
    const playerTitle = `${getTeamName(team, DEFAULT_LANGUAGE)} ${tr.guide}`;
    const hintText = tr.chooseLimit;

    const btns = Array.from({ length: 8 }, (_, i) => {
        const n = i + 1;
        const chosen = guideLimit === n;
        return `<button class="guide__num-btn ${chosen ? 'guide__num-btn--chosen' : ''}" ${!canAct ? 'disabled' : ''}>${n}</button>`;
    }).join('');

    return `
    <div class="screen-layout guide-layout">
        <header class="screen-header">
            <div class="guide__header">
                <div class="guide__title ${canAct ? 'guide__title--active' : 'guide__title--muted'}">${playerTitle}</div>
                <div class="guide__hint">${hintText}</div>
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
    const playerTitle = `${getTeamName(team, DEFAULT_LANGUAGE)} ${tr.dreamwalker}`;
    const turnInfoText = canPlay ? `${guideLimit} ${tr.steps}` : '';
    const turnInfoClass = canPlay
        ? 'walker__turn-info walker__turn-info--active'
        : 'walker__turn-info walker__turn-info--muted';

    return `
    <div class="screen-layout walker-layout">
        <header class="screen-header">
            <div class="walker__header">
                <div class="walker__title ${canPlay ? 'walker__title--active' : 'walker__title--muted'}">${playerTitle}</div>
                <div class="walker__meta">
                    <div class="${turnInfoClass}">${turnInfoText}</div>
                    <div class="walker__actions">
                        <span class="walker__end-hint">${tr.end}</span>
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

function renderHome() {
    document.body.className = '';
    return `
    <div class="app">
        <div class="lang-toggle">
            <button class="lang-toggle__btn lang-toggle__btn--active">UK</button>
            <button class="lang-toggle__btn">EN</button>
        </div>
        <div class="lobby-screen">
            <div class="lobby__title-wrap"><h1 class="lobby__title">SLEEPWALKERS</h1></div>
            <div class="lobby-screen__actions">
                <button class="lobby__btn lobby__btn--continue">Continue Game</button>
                <button class="lobby__btn lobby__btn--newgame">New Game</button>
            </div>
        </div>
    </div>
    <button class="btn-profile btn-icon">${ICONS.user}</button>
    <button class="fullscreen-btn btn-icon">${ICONS.maximize}</button>`;
}

function getScreenId() {
    return new URLSearchParams(location.search).get('screen') || 'game';
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
    }

    window.addEventListener('popstate', render);
    render();
}
