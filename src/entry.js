// src/entry.js — точка входу, роутинг по data-page
import './styles/main.css';
import { preloadVisualImages } from './utils/preloadImages.js';

// ─── LOADER ────────────────────────────────────────────────────────
let loaderPending = 1; // initial page bootstrap
const LOADER_EXIT_GLITCH_MS = 380;

function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    if (loader.classList.contains('is-hidden') || loader.classList.contains('is-exiting')) return;
    loader.classList.add('is-exiting');
    setTimeout(() => {
        loader.classList.remove('is-exiting');
        loader.classList.add('is-hidden');
    }, LOADER_EXIT_GLITCH_MS);
}

function showLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.remove('is-hidden');
}

function beginLoading() {
    loaderPending += 1;
    showLoader();
}

function endLoading() {
    loaderPending = Math.max(0, loaderPending - 1);
    if (loaderPending === 0) hideLoader();
}

async function withLoading(task) {
    beginLoading();
    try {
        return await task();
    } finally {
        endLoading();
    }
}

function exposeLoaderApi() {
    window.__nwLoader = {
        begin: beginLoading,
        end: endLoading,
        wrap: withLoading,
        isActive: () => loaderPending > 0,
    };
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
    sandbox: () => import('./app/initSandbox.js').then(m => m.initSandbox),
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
    `;
    document.body.appendChild(fog);
}

document.addEventListener('DOMContentLoaded', async () => {
    ensureGlobalFog();
    exposeLoaderApi();

    const root = document.querySelector('#app');
    if (!root) {
        endLoading();
        return;
    }

    const getInit = pages[document.body.dataset.page];
    if (!getInit) {
        endLoading();
        return;
    }

    try {
        const init = await getInit();
        await init(root);
    } catch (error) {
        console.error('Page init failed:', error);
    } finally {
        await waitForAppReady(root);
        endLoading();
    }
});
