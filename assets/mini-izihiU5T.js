import{b as c,o as d,a as l,d as m}from"./fullscreen-DOyVK33B.js";async function u(n){const a=c();if(!a){n.innerHTML=`
      <div class="waiting-screen">
        <p style="color:white;text-align:center;">Відскануй QR з головного екрану.</p>
      </div>
    `;return}const t=l(a);await t.init();function o(e){const i=e.role==="neutral"?"mini-cell--neutral":`mini-cell--${e.role}`;return e.revealed?`${i} mini-cell--revealed`:i}function r(e){n.innerHTML=`
      <div class="mini-board">
        <header class="mini-board__header">
          <div class="mini-board__status">
            ${e.gameOver?`🏆 ${e.winner.toUpperCase()} WINS`:`ХІД: <strong>${e.activeTeam.toUpperCase()}</strong>`}
          </div>
          <button class="mini-board__new-btn" id="newGameBtn">NEW GAME</button>
        </header>

        <div class="mini-board__grid">
          ${e.cells.map(i=>`
            <div class="mini-cell ${o(i)}">
              <span>${i.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,requestAnimationFrame(()=>{n.querySelectorAll(".mini-cell").forEach(i=>m(i))}),document.getElementById("newGameBtn").addEventListener("click",async()=>{await t.createGame()})}function s(){n.innerHTML=`
      <div class="waiting-screen">
        <p class="waiting-screen__hint">Очікуємо на гру...</p>
      </div>
    `}t.subscribe(e=>{if(!e){s();return}r(e)}),d(()=>{const e=t.getState();if(!e){s();return}r(e)}),t.getState()||await t.createGame()}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&u(n)});
