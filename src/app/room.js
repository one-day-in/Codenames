function generateId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID().slice(0, 8);
    }
    return Math.random().toString(36).slice(2, 10);
}

// Тільки для index.html — генерує новий roomId якщо нема
export function getOrCreateRoomId() {
    const params = new URLSearchParams(window.location.search);
    let roomId = params.get('room');

    if (!roomId) {
        roomId = generateId();
        params.set('room', roomId);
        window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
    }

    return roomId;
}

// Для mini.html і controller.html — тільки читає з URL, не генерує
export function getRoomId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('room') || null;
}