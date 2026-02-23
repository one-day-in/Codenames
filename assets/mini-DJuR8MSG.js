import{b as s,o as c,c as l,a as m,d as u}from"./footer-DJQNmvuE.js";async function v(i){const t=s();if(!t){i.innerHTML=`
      <div class="waiting-screen">
        <p style="color:white;text-align:center;">Відскануй QR з головного екрану.</p>
      </div>
    `;return}const a=l(t);await a.init(),a.getState()||await a.createGame();function o(e){const n=e.role==="neutral"?"mini-cell--neutral":`mini-cell--${e.role}`;return e.revealed?`${n} mini-cell--revealed`:n}function r(e){i.innerHTML=`
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
    `,i.querySelector(".mini-board").appendChild(m()),requestAnimationFrame(()=>{i.querySelectorAll(".mini-cell").forEach(n=>u(n))}),document.getElementById("newGameBtn").addEventListener("click",async()=>{await a.createGame()})}function d(){const e=a.getState();e&&r(e)}c(d),a.subscribe(e=>{e&&r(e)})}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i&&v(i)});
