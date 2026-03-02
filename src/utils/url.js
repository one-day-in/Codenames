// src/utils/url.js — URL helpers (getBaseUrl, getParams)

export function getBaseUrl() {
    const { origin, pathname } = window.location;
    return origin + pathname.split('?')[0].replace(/\/[^/]*$/, '');
}

export function getParams() {
    const p = new URLSearchParams(window.location.search);
    return {
        roomId: p.get('room'),
        token:  p.get('token'),
        team:   p.get('team'),
    };
}
