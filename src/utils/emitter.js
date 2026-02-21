export function createEmitter() {
    const listeners = new Set();

    return {
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },

        emit(data) {
            listeners.forEach(listener => {
                try {
                    listener(data);
                } catch (error) {
                    console.error('Listener error:', error);
                }
            });
        },

        clear() {
            listeners.clear();
        }
    };
}