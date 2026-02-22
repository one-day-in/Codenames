import{a as o,c as s,b as d}from"./fitText-DBVXKaUP.js";async function c(i){const a=o();if(!a){i.innerHTML=`
      <div class="waiting-screen">
        <p style="color:white;">Невірне посилання — немає roomId.<br>Відскануй QR з головного екрану.</p>
      </div>
    `;return}const r=s(a);await r.init(),r.getState()||await r.createGame();function t(e){i.innerHTML=`
      <div class="mini-board">
        <header class="mini-board__header">
          <div class="mini-board__status">
            ${e.gameOver?`🏆 ${e.winner.toUpperCase()} WINS`:`ХІД: <strong>${e.activeTeam.toUpperCase()}</strong>`}
          </div>
          <button class="mini-board__new-btn" id="newGameBtn">NEW GAME</button>
        </header>

        <div class="mini-board__grid">
          ${e.cells.map(n=>`<div class="mini-cell ${n.revealed?`mini-cell--${n.role} mini-cell--revealed`:`mini-cell--${n.role}`}"><span>${n.word}</span></div>`).join("")}
        </div>
      </div>
    `,requestAnimationFrame(()=>{i.querySelectorAll(".mini-cell").forEach(n=>d(n))}),document.getElementById("newGameBtn").addEventListener("click",async()=>{await r.createGame()})}r.subscribe(e=>{e&&t(e)})}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i&&c(i)});
