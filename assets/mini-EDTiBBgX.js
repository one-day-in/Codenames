import{D as s,o as p,b as v,a as w,t as d}from"./presence-DE4OY48f.js";import{g as L}from"./room-DjrEdXuX.js";import{a as $}from"./fitText-DhGiXhRH.js";const h=8;async function T(i){const r=L();if(!r){i.innerHTML=`
      <div class="waiting-screen">
        <p style="color:white;text-align:center;">Відскануй QR з головного екрану.</p>
      </div>
    `;return}const o=v(r);if(await o.isRoleTaken("mini")){i.innerHTML=`
      <div class="waiting-screen">
        <div class="taken-screen">
          <p class="taken-screen__icon">🔒</p>
          <p class="taken-screen__text">Міні-карта вже відкрита<br>на іншому пристрої</p>
        </div>
      </div>
    `;return}o.join("mini");const a=w(r);await a.init();function m(e){const t=e.role==="neutral"?"mini-cell--neutral":`mini-cell--${e.role}`;return e.revealed?`${t} mini-cell--revealed`:t}function c(e){const t=e.language||s,u=d(t),_=e.cells.filter(n=>n.role==="red"&&!n.revealed).length,b=e.cells.filter(n=>n.role==="blue"&&!n.revealed).length,f=Array.from({length:h},(n,g)=>`
            <button class="mini-board__num-btn">${g+1}</button>
        `).join("");i.innerHTML=`
      <div class="mini-board">
        <header class="mini-board__header">
          ${f}
          <button class="mini-board__new-btn" id="newGameBtn">${u.newGame}</button>
        </header>
        <div class="mini-board__grid">
          ${e.cells.map(n=>`
            <div class="mini-cell ${m(n)}">
              <span>${n.word}</span>
            </div>
          `).join("")}
        </div>
        <footer class="mini-board__footer">
          <span class="mini-board__score-item mini-board__score-item--blue">BLUE: ${b}</span>
          <span class="mini-board__score-item mini-board__score-item--red">RED: ${_}</span>
        </footer>
      </div>
    `,requestAnimationFrame(()=>{i.querySelectorAll(".mini-cell").forEach(n=>$(n))}),document.getElementById("newGameBtn").addEventListener("click",async()=>{await a.createGame(t)})}function l(e=s){const t=d(e);i.innerHTML=`
      <div class="waiting-screen">
        <p class="waiting-screen__hint">${t.waitingGame}</p>
      </div>
    `}a.subscribe(e=>{if(!e){l();return}c(e)}),p(()=>{const e=a.getState();if(!e){l();return}c(e)}),a.getState()||await a.createGame(s)}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i&&T(i)});
