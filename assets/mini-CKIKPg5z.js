import{b,o as u,a as _}from"./fullscreen-BJFSDsQK.js";import{a as f}from"./fitText-DhGiXhRH.js";async function v(i){const r=b();if(!r){i.innerHTML=`
      <div class="waiting-screen">
        <p style="color:white;text-align:center;">Відскануй QR з головного екрану.</p>
      </div>
    `;return}const t=_(r);await t.init(),t.getState()||await t.createGame();function l(e){const a=e.role==="neutral"?"mini-cell--neutral":`mini-cell--${e.role}`;return e.revealed?`${a} mini-cell--revealed`:a}function o(e){const a=e.cells.filter(n=>n.role==="red"&&!n.revealed).length,s=e.cells.filter(n=>n.role==="blue"&&!n.revealed).length,d=a+s,c=Array.from({length:d},(n,m)=>`
            <button class="mini-board__num-btn">${m+1}</button>
        `).join("");i.innerHTML=`
      <div class="mini-board">
        <header class="mini-board__header">
          <div class="mini-board__score">
            <span class="mini-board__score-item mini-board__score-item--blue">
              BLUE: ${s}
            </span>
            <span class="mini-board__score-item mini-board__score-item--red">
              RED: ${a}
            </span>
          </div>

          <div class="mini-board__actions">
            ${c}
            <button class="mini-board__new-btn" id="newGameBtn">NEW GAME</button>
          </div>
        </header>

        <div class="mini-board__grid">
          ${e.cells.map(n=>`
            <div class="mini-cell ${l(n)}">
              <span>${n.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,requestAnimationFrame(()=>{i.querySelectorAll(".mini-cell").forEach(n=>f(n))}),document.getElementById("newGameBtn").addEventListener("click",async()=>{await t.createGame()})}t.subscribe(e=>{e&&o(e)}),u(()=>{const e=t.getState();e&&o(e)})}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i&&v(i)});
