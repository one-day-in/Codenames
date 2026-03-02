// src/utils/resize.js — orientation change listener

// Викликає callback при зміні розміру/орієнтації екрану
export function onOrientationChange(callback) {
    let lastWidth  = window.innerWidth;
    let lastHeight = window.innerHeight;

    const observer = new ResizeObserver(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (w !== lastWidth || h !== lastHeight) {
            lastWidth  = w;
            lastHeight = h;
            callback();
        }
    });

    observer.observe(document.documentElement);
    return () => observer.disconnect();
}