import { getRoomId } from './room.js';
import { createGameStore } from '../store/gameStore.js';
import { fitTextAll } from '../utils/fitText.js';

export async function initController(root) {
    const params = new URLSearchParams(window.location.search);
    const team = params.get('team');
    const roomId = getRoomId();

    if (!roomId || !team || (team !== 'red' && team !== 'blue')) {
        root.innerHTML = `
      <div class="error-screen">
        <p>Невірне посилання.<br>Відскануй QR з головного екрану.</p>
      </div>
    `;
        return;
    }

    document.body.classList.add(`team-${team}`);

    const store = createGameStore(roomId);
    await store.init();

    function getScore(state) {
        const redLeft = state.cells.filter(c => c.role === 'red' && !c.revealed).length;
        const blueLeft = state.cells.filter(c => c.role === 'blue' && !c.revealed).length;
        return { redLeft, blueLeft };
    }

    function renderWaiting() {
        root.innerHTML = `
      <div class="waiting-screen">
        <p class="waiting-screen__hint">Очікуємо початку гри...</p>
      </div>
    `;
    }

    function renderGameOver(state) {
        const isWinner = state.winner === team;
        root.innerHTML = `
      <div class="gameover-screen gameover-screen--${team}">
        <div class="gameover-screen__content">
          <div class="gameover-screen__result">${isWinner ? '🏆 Перемога!' : '💀 Поразка'}</div>
          <div class="gameover-screen__team">${team.toUpperCase()}</div>
        </div>
      </div>
    `;
    }

    function renderBoard(state) {
        const isMyTurn = state.activeTeam === team;
        const { redLeft, blueLeft } = getScore(state);

        document.body.classList.remove('team-red', 'team-blue');
        document.body.classList.add(`team-${state.activeTeam}`);

        root.innerHTML = `
      <div class="controller controller--${team}">
        <header class="controller__header">
          <div class="controller__team-badge controller__team-badge--${team}">
            ${team.toUpperCase()}
          </div>
          <div class="controller__score">
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--red"></div>
              <span class="controller__score-count">${redLeft}</span>
              <span class="controller__score-label">RED</span>
            </div>
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--blue"></div>
              <span class="controller__score-count">${blueLeft}</span>
              <span class="controller__score-label">BLUE</span>
            </div>
          </div>
          <div class="controller__actions">
            <span class="controller__turn-label ${isMyTurn ? 'controller__turn-label--active' : ''}">
              ${isMyTurn ? 'ВАШ ХІД' : `ХІД ${state.activeTeam.toUpperCase()}`}
            </span>
            <button
              class="controller__end-turn-btn ${!isMyTurn ? 'controller__end-turn-btn--disabled' : ''}"
              id="endTurnBtn"
              ${!isMyTurn ? 'disabled' : ''}
            >
              END TURN
            </button>
          </div>
        </header>

        <div class="grid controller__grid">
          ${state.cells.map((cell, index) => {
            const isRevealed = cell.revealed;
            const roleClass = isRevealed ? `grid__cell--${cell.role}` : 'grid__cell--hidden';
            const clickable = !isRevealed && isMyTurn && !state.gameOver;
            return `
              <div class="grid__cell ${roleClass} ${clickable ? 'grid__cell--clickable' : ''}" data-index="${index}">
                <span>${cell.word}</span>
              </div>
            `;
        }).join('')}
        </div>
      </div>
    `;

        requestAnimationFrame(() => fitTextAll(root));

        root.querySelectorAll('.grid__cell--clickable').forEach(cell => {
            cell.addEventListener('click', async () => {
                await store.reveal(parseInt(cell.dataset.index, 10));
            });
        });

        const endTurnBtn = document.getElementById('endTurnBtn');
        if (endTurnBtn && !endTurnBtn.disabled) {
            endTurnBtn.addEventListener('click', async () => {
                await store.endTurn();
            });
        }
    }

    store.subscribe((state) => {
        if (!state) { renderWaiting(); return; }
        if (state.gameOver) { renderGameOver(state); return; }
        renderBoard(state);
    });
}