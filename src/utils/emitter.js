// BehaviorSubject — зберігає останнє значення
// і одразу віддає його новому підписнику
export function createEmitter() {
    const listeners = new Set();
    let lastValue = undefined;

    return {
        subscribe(listener) {
            listeners.add(listener);

            // Якщо вже є значення — одразу віддаємо його
            if (lastValue !== undefined) {
                try { listener(lastValue); } catch (e) { console.error(e); }
            }

            return () => listeners.delete(listener);
        },

        emit(data) {
            lastValue = data;
            listeners.forEach(listener => {
                try { listener(data); } catch (e) { console.error(e); }
            });
        },

        clear() {
            listeners.clear();
            lastValue = undefined;
        }
    };
}