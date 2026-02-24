import{o as y,D as d,b as k,a as h,t as v}from"./presence-DE4OY48f.js";import{g as C}from"./room-DjrEdXuX.js";import{a as E}from"./renderCell-BLtbsjKK.js";async function U(t){const r=new URLSearchParams(window.location.search).get("team"),l=C();if(!l||!r||r!=="red"&&r!=="blue"){t.innerHTML=`
      <div class="error-screen">
        <p>Невірне посилання.<br>Відскануй QR з головного екрану.</p>
      </div>
    `;return}const _=`controller-${r}`,u=k(l);if(await u.isRoleTaken(_)){t.innerHTML=`
      <div class="waiting-screen">
        <div class="taken-screen">
          <p class="taken-screen__icon">🔒</p>
          <p class="taken-screen__text">${r.toUpperCase()} controller<br>вже відкритий на іншому пристрої</p>
        </div>
      </div>
    `;return}u.join(_),document.body.classList.add(`team-${r}`);const c=h(l);await c.init();function b(e){const s=e.cells.filter(n=>n.role==="red"&&!n.revealed).length,o=e.cells.filter(n=>n.role==="blue"&&!n.revealed).length;return{redLeft:s,blueLeft:o}}function m(e=d){const s=v(e);t.innerHTML=`
      <div class="waiting-screen">
        <p class="waiting-screen__hint">${s.waitingStart}</p>
      </div>
    `}function p(e){const s=e.language||d,o=v(s),n=e.winner===r;t.innerHTML=`
      <div class="gameover-screen gameover-screen--${r}">
        <div class="gameover-screen__content">
          <div class="gameover-screen__result">${n?o.victory:o.defeat}</div>
          <div class="gameover-screen__team">${r.toUpperCase()}</div>
        </div>
      </div>
    `}function g(e){const s=e.language||d,o=v(s),n=e.activeTeam===r,{redLeft:$,blueLeft:L}=b(e);document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`),t.innerHTML=`
      <div class="controller controller--${r}">
        <header class="controller__header">
          <div class="controller__team-badge controller__team-badge--${r}">
            ${r.toUpperCase()}
          </div>
          <div class="controller__score">
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--red"></div>
              <span class="controller__score-count">${$}</span>
              <span class="controller__score-label">RED</span>
            </div>
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--blue"></div>
              <span class="controller__score-count">${L}</span>
              <span class="controller__score-label">BLUE</span>
            </div>
          </div>
          <div class="controller__actions">
            <span class="controller__turn-label ${n?"controller__turn-label--active":""}">
              ${n?o.yourTurn:`${o.turn} ${e.activeTeam.toUpperCase()}`}
            </span>
            <button
              class="controller__end-turn-btn"
              id="endTurnBtn"
              ${n?"":"disabled"}
            >${o.endTurn}</button>
          </div>
        </header>

        <div class="controller__grid">
          ${e.cells.map((a,T)=>{const w=!a.revealed&&n&&!e.gameOver;return`
              <div class="controller__cell ${E(a)} ${w?"controller__cell--clickable":""}"
                   data-index="${T}">
                <span>${a.word}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,t.querySelectorAll(".controller__cell--clickable").forEach(a=>{a.addEventListener("click",async()=>{await c.reveal(parseInt(a.dataset.index,10))})});const i=document.getElementById("endTurnBtn");i&&!i.disabled&&i.addEventListener("click",async()=>{await c.endTurn()})}function f(){const e=c.getState();if(!e){m();return}if(e.gameOver){p(e);return}g(e)}y(f),c.subscribe(e=>{if(!e){m();return}if(e.gameOver){p(e);return}g(e)})}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&U(t)});
