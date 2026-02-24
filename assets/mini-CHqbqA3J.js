import{o as _,a as b,b as f}from"./presence-CGSlqPCM.js";import{g as p}from"./room-DjrEdXuX.js";import{a as v}from"./fitText-DhGiXhRH.js";const g=8;async function w(i){const a=p();if(!a){i.innerHTML=`
      <div class="waiting-screen">
        <p style="color:white;text-align:center;">Відскануй QR з головного екрану.</p>
      </div>
    `;return}const s=b(a);if(await s.isRoleTaken("mini")){i.innerHTML=`
      <div class="waiting-screen">
        <div class="taken-screen">
          <p class="taken-screen__icon">🔒</p>
          <p class="taken-screen__text">Міні-карта вже відкрита<br>на іншому пристрої</p>
        </div>
      </div>
    `;return}s.join("mini");const t=f(a);await t.init();function l(e){const r=e.role==="neutral"?"mini-cell--neutral":`mini-cell--${e.role}`;return e.revealed?`${r} mini-cell--revealed`:r}function o(e){const r=e.cells.filter(n=>n.role==="red"&&!n.revealed).length,d=e.cells.filter(n=>n.role==="blue"&&!n.revealed).length,m=Array.from({length:g},(n,u)=>`
            <button class="mini-board__num-btn">${u+1}</button>
        `).join("");i.innerHTML=`
      <div class="mini-board">
        <header class="mini-board__header">
          ${m}
          <button class="mini-board__new-btn" id="newGameBtn">NEW GAME</button>
        </header>
        <div class="mini-board__grid">
          ${e.cells.map(n=>`
            <div class="mini-cell ${l(n)}">
              <span>${n.word}</span>
            </div>
          `).join("")}
        </div>
        <footer class="mini-board__footer">
          <span class="mini-board__score-item mini-board__score-item--blue">BLUE: ${d}</span>
          <span class="mini-board__score-item mini-board__score-item--red">RED: ${r}</span>
        </footer>
      </div>
    `,requestAnimationFrame(()=>{i.querySelectorAll(".mini-cell").forEach(n=>v(n))}),document.getElementById("newGameBtn").addEventListener("click",async()=>{await t.createGame()})}function c(){i.innerHTML=`
      <div class="waiting-screen">
        <p class="waiting-screen__hint">Очікуємо на гру...</p>
      </div>
    `}t.subscribe(e=>{if(!e){c();return}o(e)}),_(()=>{const e=t.getState();if(!e){c();return}o(e)}),t.getState()||await t.createGame()}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i&&w(i)});
