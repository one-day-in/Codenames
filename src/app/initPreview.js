// src/app/initPreview.js
// Dev-only: http://localhost:5173/sleepwalkers/preview.html

import { createBoard } from '../domain/boardFactory.js';
import { getGameCellClass, getGuideCellClass } from '../utils/renderCell.js';
import { fitTextAll } from '../utils/fitText.js';
import { ICONS } from '../utils/icons.js';

// ─── СТИЛІ ─────────────────────────────────────────────────────

const PREVIEW_CSS = `
/* NAV */
.preview-nav {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 9999;
    display: flex;
    gap: 4px;
    padding: 6px 8px;
    background: rgba(0,0,0,0.92);
    backdrop-filter: blur(12px);
    overflow-x: auto;
    border-top: 1px solid rgba(255,255,255,0.1);
    -webkit-overflow-scrolling: touch;
}
.preview-nav__btn {
    flex-shrink: 0;
    padding: 6px 11px;
    background: var(--game-btn-bg);
    color: var(--game-btn-color);
    border: var(--game-btn-border);
    border-radius: 8px;
    box-shadow: var(--game-btn-shadow);
    font-size: 11px;
    font-family: monospace;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s;
}
.preview-nav__btn--active {
    background: var(--game-btn-bg-active);
    border-color: var(--resonant-light);
    color: var(--text-main);
    box-shadow: 0 0 20px rgba(255, 223, 174, 0.34);
}
.preview-nav__btn:hover:not(.preview-nav__btn--active) {
    background: var(--game-btn-bg-hover);
    border-color: rgba(230,205,165,0.75);
    color: var(--game-btn-color-hover);
    box-shadow: var(--game-btn-shadow-hover);
}
.preview-nav__sep {
    width: 1px;
    background: rgba(255,255,255,0.15);
    flex-shrink: 0;
    margin: 4px 2px;
}
/* Всі клітинки клікабельні в preview */
.preview-clickable .cell {
    cursor: pointer;
    outline: none;
}
.preview-clickable .cell:hover {
    outline: 1px solid rgba(255,255,255,0.3);
    outline-offset: -1px;
}
`;

// ─── MOCK DATA ──────────────────────────────────────────────────

const MOCK_WORDS = [
    'МРІЯ', 'ТІНЬ', 'ХВИЛЯ', 'ЗІРКА', 'КРИЛО',
    'МІСЯЦЬ', 'ВОГОНЬ', 'ЛІХТАР', 'ДОРОГА', 'ПІСНЯ',
    'КАМІНЬ', 'ВІТЕР', 'ОЗЕРО', 'РАНОК', 'ЛИСТОК',
    'ТУМАН', 'БЕРЕГ', 'НЕБО', 'СТРУНА', 'КВІТКА',
    'ЖАРА', 'ДУМКА', 'СЛОВО', 'МОРЕ', 'КЛЮЧ',
];

const SCREENS = [
    { id: 'game',             label: 'Game' },
    { id: 'guide-resonant',  label: 'Guide R' },
    { id: 'guide-dissonant', label: 'Guide D' },
    { id: 'walker-resonant', label: 'Walker R' },
    { id: 'walker-dissonant',label: 'Walker D' },
    { id: 'home',            label: 'Home' },
];

function makePreviewQr(url, size = 190) {
    return `<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(url)}"
        width="${size}" height="${size}" />`;
}

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

// ─── РЕНДЕР ФУНКЦІЇ ─────────────────────────────────────────────

function renderGame(state) {
    document.body.className = `team-${state.turn.team}`;
    const { cells } = state;
    const rTotal = cells.filter(c => c.role === 'resonant').length;
    const dTotal = cells.filter(c => c.role === 'dissonant').length;
    const rDone = cells.filter(c => c.role === 'resonant' && c.revealed).length;
    const dDone = cells.filter(c => c.role === 'dissonant' && c.revealed).length;
    const links = {
        dissonantGuide: `${window.location.origin}/sleepwalkers/guide.html?team=dissonant`,
        dissonantWalker: `${window.location.origin}/sleepwalkers/walker.html?team=dissonant`,
        resonantGuide: `${window.location.origin}/sleepwalkers/guide.html?team=resonant`,
        resonantWalker: `${window.location.origin}/sleepwalkers/walker.html?team=resonant`,
    };

    return `
    <div class="game preview-clickable">
        <div class="grid grid--5">
            ${cells.map((cell, i) => `
                <div class="${getGameCellClass(cell)}" data-index="${i}">
                    <span class="cell__content">${cell.word}</span>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="game-qr-dock game-qr-dock--left">
        <div class="game-qr-dock__item game-qr-dock__item--dissonant">
            <button class="game-qr-dot" type="button" aria-label="dissonant guide">G</button>
            <div class="game-qr-popover">
                <p class="game-qr-popover__title">dissonant guide</p>
                <div class="game-qr-popover__image">${makePreviewQr(links.dissonantGuide)}</div>
            </div>
        </div>
        <div class="game-qr-dock__item game-qr-dock__item--dissonant">
            <button class="game-qr-dot" type="button" aria-label="dissonant walker">W</button>
            <div class="game-qr-popover">
                <p class="game-qr-popover__title">dissonant walker</p>
                <div class="game-qr-popover__image">${makePreviewQr(links.dissonantWalker)}</div>
            </div>
        </div>
    </div>

    <div class="game-qr-dock game-qr-dock--right">
        <div class="game-qr-dock__item game-qr-dock__item--resonant">
            <button class="game-qr-dot" type="button" aria-label="resonant guide">G</button>
            <div class="game-qr-popover">
                <p class="game-qr-popover__title">resonant guide</p>
                <div class="game-qr-popover__image">${makePreviewQr(links.resonantGuide)}</div>
            </div>
        </div>
        <div class="game-qr-dock__item game-qr-dock__item--resonant">
            <button class="game-qr-dot" type="button" aria-label="resonant walker">W</button>
            <div class="game-qr-popover">
                <p class="game-qr-popover__title">resonant walker</p>
                <div class="game-qr-popover__image">${makePreviewQr(links.resonantWalker)}</div>
            </div>
        </div>
    </div>

    <div class="game__score">
        <span class="game__score-item game__score-item--resonant">${rDone} / ${rTotal}</span>
        <span class="game__score-item game__score-item--dissonant">${dDone} / ${dTotal}</span>
    </div>

    <button class="btn-back btn-icon">${ICONS.arrowLeft}</button>
    <button class="btn-profile btn-icon">${ICONS.user}</button>
    <button class="fullscreen-btn btn-icon">${ICONS.maximize}</button>`;
}

function renderGuide(state, team) {
    document.body.className = '';
    const { guideLimit, team: turnTeam } = state.turn;
    const isMyTurn  = turnTeam === team;
    const guideLocked = guideLimit !== null;
    const teamLabel = team.charAt(0).toUpperCase() + team.slice(1);
    const statusText = (isMyTurn && !guideLocked)
        ? `${teamLabel} guide : your turn`
        : `${teamLabel} guide`;

    const btns = Array.from({ length: 8 }, (_, i) => {
        const n = i + 1;
        const active = isMyTurn && !guideLocked;
        const chosen = guideLimit === n;
        return `<button class="guide__num-btn ${chosen ? 'guide__num-btn--chosen' : ''}" ${!active ? 'disabled' : ''}>${n}</button>`;
    }).join('');

    return `
    <div class="guide guide--${team} preview-clickable">
        <div class="grid grid--5">
            ${state.cells.map((cell, i) => `
                <div class="${getGuideCellClass(cell)}" data-index="${i}">
                    <span class="cell__content">${cell.word}</span>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="guide__status">${statusText}</div>
    <div class="guide__btns">${btns}</div>`;
}

function renderWalker(state, team) {
    document.body.className = `team-${state.turn.team}`;
    const { team: turnTeam, guideLimit } = state.turn;
    const isMyTurn  = turnTeam === team;
    const canPlay   = isMyTurn && guideLimit !== null;
    const teamLabel = team.charAt(0).toUpperCase() + team.slice(1);
    const statusText = (isMyTurn && guideLimit !== null)
        ? `${teamLabel} walker : ${guideLimit} steps`
        : `${teamLabel} walker`;

    return `
    <div class="walker walker--${team} preview-clickable">
        <div class="grid grid--5">
            ${state.cells.map((cell, i) => `
                <div class="${getGameCellClass(cell)}" data-index="${i}">
                    <span class="cell__content">${cell.word}</span>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="walker__status">${statusText}</div>

    <button class="walker__end-turn" ${!canPlay ? 'disabled' : ''}>
        End Turn
    </button>`;
}

function renderHome() {
    document.body.className = '';
    return `
    <div class="app">
        <div class="lang-toggle">
            <button class="lang-toggle__btn lang-toggle__btn--active">UK</button>
            <button class="lang-toggle__btn">EN</button>
            <button class="lang-toggle__btn">RU</button>
        </div>
        <div class="lobby-screen">
            <h1 class="lobby__title">SleepWalkers</h1>
            <div class="lobby-screen__actions">
                <button class="lobby__btn lobby__btn--continue">Продовжити гру</button>
                <button class="lobby__btn lobby__btn--newgame">Нова гра</button>
            </div>
        </div>
    </div>
    <button class="btn-profile btn-icon">${ICONS.user}</button>
    <button class="fullscreen-btn btn-icon">${ICONS.maximize}</button>`;
}

// ─── MAIN ───────────────────────────────────────────────────────

export function initPreview(root) {
    // Вставляємо стилі (тільки для dev)
    const styleEl = document.createElement('style');
    styleEl.textContent = PREVIEW_CSS;
    document.head.appendChild(styleEl);

    // Один стан на всю сесію — спільний для всіх екранів
    const mockState = makeMockState();

    // ── навігація ──────────────────────────────────────────────
    function getScreen() {
        return new URLSearchParams(location.search).get('screen') || 'game';
    }

    function setScreen(id) {
        const url = new URL(location.href);
        url.searchParams.set('screen', id);
        history.pushState({}, '', url);
        render();
    }

    // ── керування станом клітинок ──────────────────────────────
    function toggleCell(index) {
        const cell = mockState.cells[index];
        if (!cell) return;
        cell.revealed = !cell.revealed;
        render();
    }

    function revealAll() {
        mockState.cells.forEach(c => (c.revealed = true));
        render();
    }

    function hideAll() {
        mockState.cells.forEach(c => (c.revealed = false));
        render();
    }

    // ── рендер ────────────────────────────────────────────────
    function render() {
        const screen = getScreen();

        let html = '';
        switch (screen) {
            case 'game':             html = renderGame(mockState);                break;
            case 'guide-resonant':   html = renderGuide(mockState, 'resonant');   break;
            case 'guide-dissonant':  html = renderGuide(mockState, 'dissonant');  break;
            case 'walker-resonant':  html = renderWalker(mockState, 'resonant');  break;
            case 'walker-dissonant': html = renderWalker(mockState, 'dissonant'); break;
            case 'home':             html = renderHome();                          break;
        }

        // Лічильник відкритих карток
        const revealedCount = mockState.cells.filter(c => c.revealed).length;
        const total = mockState.cells.length;

        const nav = `
        <nav class="preview-nav">
            ${SCREENS.map(s => `
                <button
                    class="preview-nav__btn ${s.id === screen ? 'preview-nav__btn--active' : ''}"
                    data-screen="${s.id}"
                >${s.label}</button>
            `).join('')}

            <div class="preview-nav__sep"></div>

            <button class="preview-nav__btn" data-action="hide-all">✕ All</button>
            <button class="preview-nav__btn" data-action="reveal-all">✓ All</button>

            <div class="preview-nav__sep"></div>

            <span class="preview-nav__btn" style="cursor:default; opacity:0.5;">
                ${revealedCount}/${total}
            </span>
        </nav>`;

        root.innerHTML = html + nav;

        // ── слухачі ──────────────────────────────────────────
        root.querySelectorAll('.preview-nav__btn[data-screen]').forEach(btn => {
            btn.addEventListener('click', () => setScreen(btn.dataset.screen));
        });

        root.querySelector('[data-action="reveal-all"]')
            ?.addEventListener('click', revealAll);

        root.querySelector('[data-action="hide-all"]')
            ?.addEventListener('click', hideAll);

        // Клік по клітинці — toggle revealed (делегування)
        root.querySelector('.grid')?.addEventListener('click', e => {
            const cell = e.target.closest('[data-index]');
            if (cell) toggleCell(Number(cell.dataset.index));
        });

        requestAnimationFrame(() => fitTextAll(root));
    }

    window.addEventListener('popstate', render);
    render();
}
