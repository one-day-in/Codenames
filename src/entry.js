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

function waitForWindowLoad() {
    if (document.readyState === 'complete') return Promise.resolve();
    return new Promise(resolve => {
        const onLoad = () => resolve();
        window.addEventListener('load', onLoad, { once: true });
        // Не тримаємо loader безкінечно, якщо браузер не віддасть load.
        setTimeout(resolve, 6000);
    });
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
        await waitForWindowLoad();
        hideLoader();
    }
});
