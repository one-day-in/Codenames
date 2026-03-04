// src/entry.js — точка входу, роутинг по data-page
import './styles/main.css';
import { preloadVisualImages } from './utils/preloadImages.js';

// ─── LOADER ────────────────────────────────────────────────────────
function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    if (loader.classList.contains('is-hidden')) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const glitchDuration = reduceMotion ? 0 : 420;

    if (!reduceMotion) {
        loader.classList.add('is-glitch');
    }

    setTimeout(() => {
        loader.classList.add('is-hidden');
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
        setTimeout(() => loader.remove(), 900); // fallback якщо transition не спрацює
    }, glitchDuration);
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForWindowLoad() {
    if (document.readyState === 'complete') return Promise.resolve();
    return new Promise(resolve => {
        const onLoad = () => resolve();
        window.addEventListener('load', onLoad, { once: true });
        // Страховка: не тримаємо loader безкінечно.
        setTimeout(resolve, 12000);
    });
}

async function waitForFontsReady() {
    if (!document.fonts?.ready) return;
    await Promise.race([
        document.fonts.ready.catch(() => {}),
        wait(8000),
    ]);
}

async function waitForImagesReady(root) {
    await preloadVisualImages(root);
}

function nextPaint() {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

async function waitForAppReady(root) {
    await waitForWindowLoad();
    await Promise.all([
        waitForFontsReady(),
        waitForImagesReady(root),
    ]);
    // Даємо браузеру завершити layout/paint перед fade-out loader.
    await nextPaint();
    await nextPaint();
}
// ───────────────────────────────────────────────────────────────────

const pages = {
    home:    () => import('./app/initHome.js').then(m => m.initHome),
    game:    () => import('./app/initGame.js').then(m => m.initGame),
    guide:   () => import('./app/initGuide.js').then(m => m.initGuide),
    walker:  () => import('./app/initWalker.js').then(m => m.initWalker),
    preview: () => import('./app/initPreview.js').then(m => m.initPreview),
};

function ensureGlobalFog() {
    if (document.getElementById('global-fog')) return;
    const fog = document.createElement('div');
    fog.id = 'global-fog';
    fog.setAttribute('aria-hidden', 'true');
    fog.innerHTML = `
        <span class="global-fog__layer global-fog__layer--1"></span>
        <span class="global-fog__layer global-fog__layer--2"></span>
        <span class="global-fog__layer global-fog__layer--3"></span>
        <span class="global-fog__layer global-fog__layer--4"></span>
        <span class="global-fog__grain"></span>
    `;
    document.body.appendChild(fog);
}

document.addEventListener('DOMContentLoaded', async () => {
    ensureGlobalFog();

    const root = document.querySelector('#app');
    if (!root) {
        hideLoader();
        return;
    }

    const getInit = pages[document.body.dataset.page];
    if (!getInit) {
        hideLoader();
        return;
    }

    try {
        const init = await getInit();
        await init(root);
    } catch (error) {
        console.error('Page init failed:', error);
    } finally {
        await waitForAppReady(root);
        hideLoader();
    }
});
