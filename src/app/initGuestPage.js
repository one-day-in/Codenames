// src/app/initGuestPage.js
// Спільна логіка для гостьових сторінок (guide, walker):
//   1. Валідація URL-параметрів
//   2. Перевірка токена кімнати через Supabase
//   3. Перевірка чи роль зайнята + UI "forceRejoin"
//   4. presence.join + keepAlive + store.init
//
// Повертає { presence, store, team, roomId } або null при помилці.

import { supabase } from '../supabaseClient.js';
import { createPresence, ROLES } from '../utils/presence.js';
import { createGameStore } from '../store/gameStore.js';
import { keepAlive } from '../utils/keepAlive.js';
import { getParams } from '../utils/url.js';
import { t, DEFAULT_LANGUAGE } from '../utils/i18n.js';

function getPresenceRole(roleType, team) {
    if (roleType === 'guide') {
        return team === 'resonant' ? ROLES.GUIDE_RESONANT : ROLES.GUIDE_DISSONANT;
    }
    return team === 'resonant' ? ROLES.WALKER_RESONANT : ROLES.WALKER_DISSONANT;
}

function getTakenText(roleType, team, tr) {
    if (roleType === 'walker') {
        return `${team} ${tr.dreamwalker}<br>${tr.controllerTaken.replace('\n', '<br>')}`;
    }
    const key = team === 'resonant' ? 'miniTakenResonant' : 'miniTakenDissonant';
    return tr[key].replace('\n', '<br>');
}

export async function initGuestPage(root, { roleType, invalidParamsHtml }) {
    const { roomId, token, team } = getParams();

    if (!roomId || !token || !team || (team !== 'resonant' && team !== 'dissonant')) {
        root.innerHTML = invalidParamsHtml;
        return null;
    }

    const { data: room, error } = await supabase
        .from('rooms').select('id, guest_token')
        .eq('id', roomId).eq('guest_token', token).maybeSingle();

    if (!room || error) {
        const tr = t(DEFAULT_LANGUAGE);
        root.innerHTML = `<div class="waiting-screen">
            <p>${tr.wrongLink.replace('\n', '<br>')}</p>
        </div>`;
        return null;
    }

    const presenceRole = getPresenceRole(roleType, team);
    const presence     = createPresence(roomId);
    const taken        = await presence.isRoleTaken(presenceRole);

    if (taken) {
        const tr = t(DEFAULT_LANGUAGE);
        root.innerHTML = `
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${getTakenText(roleType, team, tr)}</p>
                    <button class="lobby__btn" id="forceJoinBtn">${tr.forceRejoin}</button>
                </div>
            </div>`;

        await new Promise(resolve => {
            document.getElementById('forceJoinBtn').addEventListener('click', resolve, { once: true });
        });
    }

    presence.join(presenceRole);
    keepAlive(presence, presenceRole);
    document.body.classList.add(`team-${team}`);

    const store = createGameStore(roomId);
    await store.init();

    return { presence, store, team, roomId };
}
