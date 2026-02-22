import { getRoomId } from './room.js';
import { createGameStore } from '../store/gameStore.js';
import { fitTextToCell } from '../utils/fitText.js';

export async function initMini(root) {
    const roomId = getRoomId();

    if (!roomId) {
        root.innerHTML = `
      <div class="waiting-screen">
        <p style="color:white;">Невірне посилання — немає roomId.<br>Відскануй QR з головного екрану.</p>
      </div>
    `;
        return;
    }

    const store = createGameStore(roomId);
    await store.init();

    if (!store.getState()) {
        await store.createGame();
    }

    function renderBoard(state) {
        root.innerHTML = `
      <div class="mini-board">
        <header class="mini-board__header">
          <div class="mini-board__status">
            ${state.gameOver
                ? `🏆 ${state.winner.toUpperCase()} WINS`
                : `ХІД: <strong>${state.activeTeam.toUpperCase()}</strong>`
            }
          </div>
          <button class="mini-board__new-btn" id="newGameBtn">NEW GAME</button>
        </header>

        <div class="mini-board__grid">
          ${state.cells.map((cell) => {
            const roleClass = cell.revealed
                ? `mini-cell--${cell.role} mini-cell--revealed`
                : `mini-cell--${cell.role}`;
            return `<div class="mini-cell ${roleClass}"><span>${cell.word}</span></div>`;
        }).join('')}
        </div>
      </div>
    `;

        requestAnimationFrame(() => {
            root.querySelectorAll('.mini-cell').forEach(cell => fitTextToCell(cell));
        });

        document.getElementById('newGameBtn').addEventListener('click', async () => {
            await store.createGame();
        });
    }

    store.subscribe((state) => {
        if (!state) return;
        renderBoard(state);
    });
}