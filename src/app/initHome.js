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
                        <button class="confirm-modal__btn confirm-modal__btn--cancel" data-close="cancel">
                            ${tr.cancel}
                        </button>
                        <button class="confirm-modal__btn confirm-modal__btn--confirm" data-close="confirm">
                            ${tr.confirmNewGameAction}
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

    async function render() {
        const tr = t(lang);
        document.body.className = '';

        root.innerHTML = `
            <div class="app">

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
                    <div class="lobby__title-wrap">
                        <h1 class="lobby__title">${GAME_NAME}</h1>
                    </div>

                    ${!user
                ? `
                            <button class="lobby__btn lobby__btn--google" id="loginBtn">
                                ${tr.signIn}
                            </button>
                        `
                : `
                            <div class="lobby-screen__actions">
                                ${room?.hasActiveGame
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
                            </div>
                        `
            }

                </div>
            </div>

            ${user ? `<button class="btn-profile btn-icon" id="profileBtn" title="${user.email}">${ICONS.user}</button>` : ''}
            <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${ICONS.maximize}</button>
        `;

        bindEvents(tr);
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

        document.getElementById('profileBtn')
            ?.addEventListener('click', async () => {
                await signOut();
                user = null;
                room = null;
                render();
            });

        document.getElementById('fullscreenBtn')
            ?.addEventListener('click', () => {
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
        btn.textContent = tr.loading;
        try {
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
        } catch (error) {
            console.error('New game failed:', error);
            window.alert(tr.newGameFailed);
            btn.disabled = false;
            btn.textContent = tr.newGame;
        }
    }

    // ─── INIT LOAD ───────────────────────────────────────────────────

    root.innerHTML = `
        <div class="app">
            <div class="lobby-screen">
                <div class="lobby__title-wrap">
                    <h1 class="lobby__title">${GAME_NAME}</h1>
                </div>
            </div>
        </div>
    `;

    user = await getUser();
    if (user) {
        room = await getOrCreateRoomForUser(user.id);
    }

    render();
}
