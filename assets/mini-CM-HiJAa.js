import{b as u,o as b,a as _}from"./fullscreen-NoGo44pM.js";import{a as f}from"./fitText-DhGiXhRH.js";const v=8;async function g(i){const a=u();if(!a){i.innerHTML=`
      <div class="waiting-screen">
        <p style="color:white;text-align:center;">Відскануй QR з головного екрану.</p>
      </div>
    `;return}const t=_(a);await t.init();function l(e){const r=e.role==="neutral"?"mini-cell--neutral":`mini-cell--${e.role}`;return e.revealed?`${r} mini-cell--revealed`:r}function o(e){const r=e.cells.filter(n=>n.role==="red"&&!n.revealed).length,c=e.cells.filter(n=>n.role==="blue"&&!n.revealed).length,d=Array.from({length:v},(n,m)=>`
            <button class="mini-board__num-btn">${m+1}</button>
        `).join("");i.innerHTML=`
      <div class="mini-board">

        <header class="mini-board__header">
          ${d}
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
          <span class="mini-board__score-item mini-board__score-item--blue">BLUE: ${c}</span>
          <span class="mini-board__score-item mini-board__score-item--red">RED: ${r}</span>
        </footer>

      </div>
    `,requestAnimationFrame(()=>{i.querySelectorAll(".mini-cell").forEach(n=>f(n))}),document.getElementById("newGameBtn").addEventListener("click",async()=>{await t.createGame()})}function s(){i.innerHTML=`
      <div class="waiting-screen">
        <p class="waiting-screen__hint">Очікуємо на гру...</p>
      </div>
    `}t.subscribe(e=>{if(!e){s();return}o(e)}),b(()=>{const e=t.getState();if(!e){s();return}o(e)}),t.getState()||await t.createGame()}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i&&g(i)});
