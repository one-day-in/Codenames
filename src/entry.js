// src/entry.js — точка входу, роутинг по data-page
import './styles/main.css';

// ─── LOADER ────────────────────────────────────────────────────────
function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('is-hidden');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    setTimeout(() => loader.remove(), 800); // fallback якщо transition не спрацює
}

// readyState === 'complete' — якщо load вже стався до запуску модуля
if (document.readyState === 'complete') {
    hideLoader();
} else {
    window.addEventListener('load', hideLoader);
}
// ───────────────────────────────────────────────────────────────────

const pages = {
    home:    () => import('./app/initHome.js').then(m => m.initHome),
    game:    () => import('./app/initGame.js').then(m => m.initGame),
    guide:   () => import('./app/initGuide.js').then(m => m.initGuide),
    walker:  () => import('./app/initWalker.js').then(m => m.initWalker),
    preview: () => import('./app/initPreview.js').then(m => m.initPreview),
};

document.addEventListener('DOMContentLoaded', async () => {
    const root = document.querySelector('#app');
    if (!root) return;
    const getInit = pages[document.body.dataset.page];
    if (!getInit) return;
    const init = await getInit();
    init(root);
});
