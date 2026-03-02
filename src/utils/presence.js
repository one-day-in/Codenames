// src/utils/presence.js — Supabase Realtime presence
import { supabase } from '../supabaseClient.js';

const DISCONNECT_GRACE_MS = 30_000; // 30 секунд

export const ROLES = {
    GUIDE_RESONANT:   'guide-resonant',
    GUIDE_DISSONANT:  'guide-dissonant',
    WALKER_RESONANT:  'walker-resonant',
    WALKER_DISSONANT: 'walker-dissonant',
};

export const ALL_ROLES = Object.values(ROLES);

export function createPresence(roomId) {
    let channel     = null;
    let listeners   = {};
    let graceTimers = {};
    let trackedRole = null;

    function emptyState() {
        return {
            [ROLES.GUIDE_RESONANT]:   false,
            [ROLES.GUIDE_DISSONANT]:  false,
            [ROLES.WALKER_RESONANT]:  false,
            [ROLES.WALKER_DISSONANT]: false,
        };
    }

    function getPresenceState() {
        if (!channel) return emptyState();
        const raw    = channel.presenceState();
        const result = emptyState();
        Object.values(raw).forEach(presences =>
            presences.forEach(p => {
                if (p.role in result) result[p.role] = true;
            })
        );
        return result;
    }

    function notify() {
        const state = getPresenceState();
        listeners.onChange?.(state, ALL_ROLES.every(r => state[r]));
    }

    function connect(role) {
        // Якщо канал вже є, просто дотрекуємо роль (коли переходимо з listen → join).
        if (channel) {
            if (role && trackedRole !== role) {
                trackedRole = role;
                channel.track({ role }).then(notify).catch(() => {});
            }
            return;
        }

        channel = supabase.channel('presence-' + roomId, {
            config: { presence: { key: role || 'host' } }
        });

        channel
            .on('presence', { event: 'sync' }, () => {
                notify();
                listeners.onSync?.();
            })
            .on('presence', { event: 'join' }, ({ key }) => {
                if (graceTimers[key]) {
                    clearTimeout(graceTimers[key]);
                    delete graceTimers[key];
                }
                notify();
            })
            .on('presence', { event: 'leave' }, ({ key }) => {
                graceTimers[key] = setTimeout(() => {
                    delete graceTimers[key];
                    notify();
                }, DISCONNECT_GRACE_MS);
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED' && role) {
                    trackedRole = role;
                    await channel.track({ role });
                    notify();
                }
            });
    }

    // Перевіряємо роль у ТОМУ ж presence-topic кімнати.
    // Важливо: канал з іншим topic не бачить присутність цієї кімнати.
    async function isRoleTaken(role) {
        return new Promise(resolve => {
            let done      = false;
            connect(null);

            function finish(taken) {
                if (done) return;
                done = true;
                listeners.onSync = undefined;
                resolve(taken);
            }

            listeners.onSync = () => {
                const taken = Object.values(channel.presenceState())
                    .some(p => p.some(x => x.role === role));
                finish(taken);
            };

            // 5 секунд таймаут — якщо sync не прийшов, вважаємо вільним
            setTimeout(() => finish(false), 5000);
        });
    }

    function leave() {
        if (channel) {
            channel.untrack();
            supabase.removeChannel(channel);
            channel = null;
            trackedRole = null;
        }
        Object.values(graceTimers).forEach(clearTimeout);
        graceTimers = {};
    }

    return {
        listen:          () => connect(null),
        join:            (role) => connect(role),
        leave,
        onChange:        (cb) => { listeners.onChange = cb; },
        getPresenceState,
        allConnected:    () => ALL_ROLES.every(r => getPresenceState()[r]),
        isRoleTaken,
    };
}
