import{b as s,o as d,a as c,d as l}from"./fullscreen-CctTKBtY.js";async function m(i){const a=s();if(!a){i.innerHTML=`
      <div class="waiting-screen">
        <p style="color:white;text-align:center;">Відскануй QR з головного екрану.</p>
      </div>
    `;return}const t=c(a);await t.init(),t.getState()||await t.createGame();function o(e){const n=e.role==="neutral"?"mini-cell--neutral":`mini-cell--${e.role}`;return e.revealed?`${n} mini-cell--revealed`:n}function r(e){i.innerHTML=`
      <div class="mini-board">
        <header class="mini-board__header">
          <div class="mini-board__status">
            ${e.gameOver?`🏆 ${e.winner.toUpperCase()} WINS`:`ХІД: <strong>${e.activeTeam.toUpperCase()}</strong>`}
          </div>
          <button class="mini-board__new-btn" id="newGameBtn">NEW GAME</button>
        </header>

        <div class="mini-board__grid">
          ${e.cells.map(n=>`
            <div class="mini-cell ${o(n)}">
              <span>${n.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,requestAnimationFrame(()=>{i.querySelectorAll(".mini-cell").forEach(n=>l(n))}),document.getElementById("newGameBtn").addEventListener("click",async()=>{await t.createGame()})}d(()=>{const e=t.getState();e&&r(e)}),t.subscribe(e=>{e&&r(e)})}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i&&m(i)});
