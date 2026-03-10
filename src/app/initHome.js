// src/app/initHome.js — home screen (auth + game entry)
import { supabase } from '../supabaseClient.js';
import {
    getUser,
    signInWithGoogle,
    signOut,
    getOrCreateRoomForUser
} from '../utils/auth.js';

import {
    t,
    LANGUAGES,
    DEFAULT_LANGUAGE,
    GAME_NAME
} from '../utils/i18n.js';

import { createBoard } from '../domain/boardFactory.js';
import { loadWords } from '../utils/words.js';
import { getBaseUrl } from '../utils/url.js';
import { ICONS } from '../utils/icons.js';
import { withLoading } from '../utils/loader.js';

// ─── LANG STORAGE ───────────────────────────────────────────────

function getSavedLang() {
    try {
        return localStorage.getItem('nw_lang') || DEFAULT_LANGUAGE;
    } catch {
        return DEFAULT_LANGUAGE;
    }
}

function saveLang(lang) {
    try {
        localStorage.setItem('nw_lang', lang);
    } catch { }
}

// ─── INIT ────────────────────────────────────────────────────────

export async function initHome(root) {
    let lang = getSavedLang();
    let user = null;
    let room = null;
    let warmedLanguage = null;
    let introPlayed = true;
    let onFullscreenChange = null;
    function generateEyes(count = 16) {
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

        // Fisher-Yates shuffle for non-linear reading order.
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
    }

    const homeEyes = generateEyes(16);

    function confirmNewGameModal(tr) {
        return new Promise(resolve => {
            const modal = document.createElement('div');
            modal.className = 'confirm-modal';
            modal.innerHTML = `
                <div class="confirm-modal__backdrop" data-close="cancel"></div>
                <div class="confirm-modal__content" role="dialog" aria-modal="true">
                    <h2 class="confirm-modal__title">${tr.newGame}</h2>
                    <p class="confirm-modal__text">${tr.confirmNewGame}</p>
                    <div class="confirm-modal__actions">
                        <button class="lobby__btn confirm-modal__btn confirm-modal__btn--confirm" data-close="confirm">
                            ${tr.confirmNewGameAction}
                        </button>
                        <button class="lobby__btn confirm-modal__btn confirm-modal__btn--cancel" data-close="cancel">
                            ${tr.cancel}
                        </button>
                    </div>
                </div>
            `;

            const cleanup = (result) => {
                document.removeEventListener('keydown', onKeyDown);
                modal.remove();
                resolve(result);
            };

            const onKeyDown = (event) => {
                if (event.key === 'Escape') cleanup(false);
            };

            modal.addEventListener('click', (event) => {
                const action = event.target?.dataset?.close;
                if (action === 'confirm') cleanup(true);
                if (action === 'cancel') cleanup(false);
            });

            document.addEventListener('keydown', onKeyDown);
            document.body.appendChild(modal);
            modal.querySelector('.confirm-modal__btn--confirm')?.focus();
        });
    }

    function warmWordsCache(nextLang) {
        if (!user) return;
        if (warmedLanguage === nextLang) return;
        warmedLanguage = nextLang;
        loadWords(nextLang).catch(() => {
            warmedLanguage = null;
        });
    }

    async function render() {
        const tr = t(lang);
        const canManageGame = Boolean(user && room?.id);
        const canContinueCurrentGame = Boolean(
            room?.hasActiveGame && (room?.language ? room.language === lang : true)
        );
        document.body.className = '';

        root.innerHTML = `
            <div class="app ${introPlayed ? '' : 'app--intro'}">

                <div class="lang-toggle">
                    ${LANGUAGES.map(l => `
                        <button
                            class="lang-toggle__btn ${l.code === lang ? 'lang-toggle__btn--active' : ''}"
                            data-lang="${l.code}">
                            ${l.label}
                        </button>
                    `).join('')}
                </div>

                <div class="lobby-screen">
                    <div class="home-eyes" aria-hidden="true">
                        ${homeEyes.map(eye => `
                            <span class="home-eye"
                                style="--eye-size:${eye.size}px;--eye-left:${eye.left}%;--eye-top:${eye.top}%;--eye-period:${eye.period}s;--eye-delay:${eye.delay}s;--eye-alpha:${eye.alpha};">
                                <span class="home-eye__open">${ICONS.eye}</span>
                                <span class="home-eye__closed">${ICONS.eyeClosed}</span>
                            </span>
                        `).join('')}
                    </div>

                    <div class="lobby__title-wrap">
                        <h1 class="lobby__title">${GAME_NAME}</h1>
                    </div>

                    ${!canManageGame
                ? `
                            <button class="lobby__btn lobby__btn--google" id="loginBtn">
                                <span class="lobby__btn-text">${tr.signIn}</span>
                                <span class="lobby__btn-google-icon">${ICONS.google}</span>
                            </button>
                        `
                : `
                            <div class="lobby-screen__actions">
                                ${room?.hasActiveGame
                    && canContinueCurrentGame
                    ? `
                                        <button class="lobby__btn lobby__btn--continue" id="continueBtn">
                                            ${tr.continueGame}
                                        </button>
                                      `
                    : ''
                }
                                <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                                    ${tr.newGame}
                                </button>
                                <button class="lobby__btn lobby__btn--sandbox" id="sandboxBtn">
                                    ${tr.sandboxBoard}
                                </button>
                            </div>
                        `
            }

                </div>
            </div>

            ${user ? `<button class="btn-logout btn-icon" id="logoutBtn" title="${user.email}">${ICONS.user}</button>` : ''}
            <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${ICONS.maximize}</button>
        `;

        bindEvents(tr);
        warmWordsCache(lang);
        introPlayed = true;
    }

    function bindEvents(tr) {
        root.querySelectorAll('.lang-toggle__btn').forEach(btn => {
            btn.addEventListener('click', () => {
                lang = btn.dataset.lang;
                saveLang(lang);
                render();
            });
        });

        document.getElementById('loginBtn')
            ?.addEventListener('click', signInWithGoogle);

        document.getElementById('continueBtn')
            ?.addEventListener('click', () => {
                window.location.href =
                    `${getBaseUrl()}/game.html?room=${room.id}&token=${room.guest_token}`;
            });

        document.getElementById('newGameBtn')
            ?.addEventListener('click', handleNewGame);

        document.getElementById('sandboxBtn')
            ?.addEventListener('click', () => {
                if (!room?.id || !room?.guest_token) return;
                window.location.href =
                    `${getBaseUrl()}/sandbox.html?room=${room.id}&token=${room.guest_token}`;
            });

        document.getElementById('logoutBtn')
            ?.addEventListener('click', async () => {
                await withLoading(async () => {
                    if (room?.id) {
                        try {
                            await supabase
                                .from('rooms')
                                .update({ state: null })
                                .eq('id', room.id);
                        } catch (error) {
                            console.error('Failed to clear room on logout:', error);
                        }
                    }
                    await signOut();
                    user = null;
                    room = null;
                    render();
                });
            });

        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const syncFullscreenIcon = () => {
            if (!fullscreenBtn) return;
            fullscreenBtn.innerHTML = document.fullscreenElement ? ICONS.minimize : ICONS.maximize;
        };

        syncFullscreenIcon();

        if (onFullscreenChange) {
            document.removeEventListener('fullscreenchange', onFullscreenChange);
        }
        onFullscreenChange = () => syncFullscreenIcon();
        document.addEventListener('fullscreenchange', onFullscreenChange);

        fullscreenBtn?.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });
    }

    async function handleNewGame() {
        const tr = t(lang);
        const btn = document.getElementById('newGameBtn');
        if (!btn || !room?.id) return;

        if (room?.hasActiveGame) {
            const isConfirmed = await confirmNewGameModal(tr);
            if (!isConfirmed) return;
        }
        btn.disabled = true;
        try {
            await withLoading(async () => {
                const words = await loadWords(lang);
                const { cells, startsFirst } =
                    createBoard({ size: 5, words });

                const newState = {
                    gameId:
                        crypto.randomUUID?.()
                        || Math.random().toString(36).slice(2),

                    phase: 'lobby',
                    size: 5,
                    cells,

                    turn: {
                        team: startsFirst,
                        guideLimit: null,
                        dreamwalkerMoves: 0,
                    },

                    gameOver: false,
                    winner: null,
                };

                const { error } = await supabase
                    .from('rooms')
                    .update({ state: newState, language: lang })
                    .eq('id', room.id);

                if (error) throw error;

                window.location.href =
                    `${getBaseUrl()}/game.html?room=${room.id}&token=${room.guest_token}`;
            });
        } catch (error) {
            console.error('New game failed:', error);
            window.alert(tr.newGameFailed);
            btn.disabled = false;
        }
    }

    // ─── INIT LOAD ───────────────────────────────────────────────────
    // Перший рендер робимо тим самим шаблоном, що й основний екран,
    // щоб уникнути стрибка layout (верх -> центр).
    await render();

    user = await getUser();
    if (user) {
        room = await getOrCreateRoomForUser(user.id);
        await render();
    }
}
