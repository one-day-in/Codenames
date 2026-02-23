import{b as s,o as c,c as l,d as m,a as u}from"./fullscreen-Bf1d3Yil.js";async function v(i){const a=s();if(!a){i.innerHTML=`
      <div class="waiting-screen">
        <p style="color:white;text-align:center;">Відскануй QR з головного екрану.</p>
      </div>
    `;return}const t=l(a);await t.init(),t.getState()||await t.createGame();function o(e){const n=e.role==="neutral"?"mini-cell--neutral":`mini-cell--${e.role}`;return e.revealed?`${n} mini-cell--revealed`:n}function r(e){i.innerHTML=`
      <div class="mini-board">
        <header class="mini-board__header">
          <div class="mini-board__status">
            ${e.gameOver?`🏆 ${e.winner.toUpperCase()} WINS`:`ХІД: <strong>${e.activeTeam.toUpperCase()}</strong>`}
          </div>
          <button class="mini-board__new-btn" id="newGameBtn">NEW GAME</button>
        </header>

        <div class="mini-board__grid-wrapper">
          <div class="mini-board__grid">
            ${e.cells.map(n=>`
              <div class="mini-cell ${o(n)}">
                <span>${n.word}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `,requestAnimationFrame(()=>{i.querySelectorAll(".mini-cell").forEach(n=>m(n))}),document.getElementById("newGameBtn").addEventListener("click",async()=>{await t.createGame()})}function d(){const e=t.getState();e&&r(e)}c(d),t.subscribe(e=>{e&&r(e)})}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i&&(document.body.appendChild(u()),v(i))});
