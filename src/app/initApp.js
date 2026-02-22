import { getOrCreateRoomId } from './room.js';
import { createGameStore } from '../store/gameStore.js';
import { fitTextAll } from '../utils/fitText.js';

export async function initApp(root) {
    const roomId = getOrCreateRoomId();
    const store = createGameStore(roomId);

    await store.init();

    function getBaseUrl() {
        return window.location.origin;
    }

    function makeQrImg(url, size = 120) {
        return `<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}" width="${size}" height="${size}" />`;
    }

    function renderQR() {
        const baseUrl = getBaseUrl();
        const miniUrl = `${baseUrl}/mini.html?room=${roomId}`;

        root.innerHTML = `
      <div class="waiting-screen">
        <div class="qr-container">
          <h1 class="waiting-screen__title">Scan to start game</h1>
          ${makeQrImg(miniUrl, 300)}
          <p class="qr-url">${miniUrl}</p>
        </div>
      </div>
    `;
    }

    function renderBoard(state) {
        const baseUrl = getBaseUrl();
        const redUrl = `${baseUrl}/controller.html?room=${roomId}&team=red`;
        const blueUrl = `${baseUrl}/controller.html?room=${roomId}&team=blue`;

        root.innerHTML = `
      <div class="app">
        <header class="header">
          <div class="header__team-container">
            <span class="header__team-label">TEAM</span>
            <div class="header__team header__team--${state.activeTeam}">
              ${state.activeTeam.toUpperCase()}
            </div>
          </div>
          <div class="header__controllers">
            <div class="header__controller-qr header__controller-qr--red">
              <span class="header__controller-label">RED</span>
              ${makeQrImg(redUrl, 80)}
            </div>
            <div class="header__controller-qr header__controller-qr--blue">
              <span class="header__controller-label">BLUE</span>
              ${makeQrImg(blueUrl, 80)}
            </div>
          </div>
        </header>

        ${state.gameOver ? `
          <div class="gameover-banner gameover-banner--${state.winner}">
            🏆 Перемагає ${state.winner.toUpperCase()}!
          </div>
        ` : ''}

        <div class="grid">
          ${state.cells.map((cell) => `
            <div class="grid__cell ${cell.revealed ? `grid__cell--${cell.role}` : 'grid__cell--hidden'}">
              <span>${cell.word}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

        requestAnimationFrame(() => fitTextAll(root));
    }

    store.subscribe((state) => {
        if (!state) { renderQR(); return; }
        renderBoard(state);
    });

    const current = store.getState();
    if (current) renderBoard(current);
    else renderQR();
}