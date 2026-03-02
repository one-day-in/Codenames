// src/utils/keepAlive.js
// Три рівні захисту від відключення на мобільних

async function requestWakeLock() {
    if (!('wakeLock' in navigator)) return null;
    try {
        return await navigator.wakeLock.request('screen');
    } catch {
        return null;
    }
}

export async function keepAlive(presence, role) {
    // Рівень 1: Wake Lock — не дає екрану вимикатись
    let wakeLock = await requestWakeLock();

    document.addEventListener('visibilitychange', async () => {
        if (document.visibilityState === 'visible') {
            // Перезапитуємо Wake Lock якщо впав
            if (wakeLock?.released) {
                wakeLock = await requestWakeLock();
            }

            // Рівень 2: Reconnect після повернення з фону
            if (role) {
                try {
                    presence.leave();
                    presence.join(role);
                } catch { /* тихо */ }
            }
        }
    });

    // Рівень 3: Reconnect після відновлення мережі
    window.addEventListener('online', () => {
        if (role) {
            try {
                presence.leave();
                presence.join(role);
            } catch { /* тихо */ }
        }
    });
}