import{b as g,o as f,a as $}from"./fullscreen-BVWN89gb.js";import{a as L}from"./renderCell-BLtbsjKK.js";async function T(n){const r=new URLSearchParams(window.location.search).get("team"),i=g();if(!i||!r||r!=="red"&&r!=="blue"){n.innerHTML=`
      <div class="error-screen">
        <p>Невірне посилання.<br>Відскануй QR з головного екрану.</p>
      </div>
    `;return}document.body.classList.add(`team-${r}`);const a=$(i);await a.init();function u(e){const o=e.cells.filter(l=>l.role==="red"&&!l.revealed).length,c=e.cells.filter(l=>l.role==="blue"&&!l.revealed).length;return{redLeft:o,blueLeft:c}}function d(){n.innerHTML=`
      <div class="waiting-screen">
        <p class="waiting-screen__hint">Очікуємо початку гри...</p>
      </div>
    `}function v(e){const o=e.winner===r;n.innerHTML=`
      <div class="gameover-screen gameover-screen--${r}">
        <div class="gameover-screen__content">
          <div class="gameover-screen__result">${o?"🏆 Перемога!":"💀 Поразка"}</div>
          <div class="gameover-screen__team">${r.toUpperCase()}</div>
        </div>
      </div>
    `}function _(e){const o=e.activeTeam===r,{redLeft:c,blueLeft:l}=u(e);document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`),n.innerHTML=`
      <div class="controller controller--${r}">
        <header class="controller__header">
          <div class="controller__team-badge controller__team-badge--${r}">
            ${r.toUpperCase()}
          </div>
          <div class="controller__score">
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--red"></div>
              <span class="controller__score-count">${c}</span>
              <span class="controller__score-label">RED</span>
            </div>
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--blue"></div>
              <span class="controller__score-count">${l}</span>
              <span class="controller__score-label">BLUE</span>
            </div>
          </div>
          <div class="controller__actions">
            <span class="controller__turn-label ${o?"controller__turn-label--active":""}">
              ${o?"ВАШ ХІД":`ХІД ${e.activeTeam.toUpperCase()}`}
            </span>
            <button
              class="controller__end-turn-btn"
              id="endTurnBtn"
              ${o?"":"disabled"}
            >END TURN</button>
          </div>
        </header>

        <div class="controller__grid">
          ${e.cells.map((t,p)=>{const b=!t.revealed&&o&&!e.gameOver;return`
              <div class="controller__cell ${L(t)} ${b?"controller__cell--clickable":""}"
                   data-index="${p}">
                <span>${t.word}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,n.querySelectorAll(".controller__cell--clickable").forEach(t=>{t.addEventListener("click",async()=>{await a.reveal(parseInt(t.dataset.index,10))})});const s=document.getElementById("endTurnBtn");s&&!s.disabled&&s.addEventListener("click",async()=>{await a.endTurn()})}function m(){const e=a.getState();if(!e){d();return}if(e.gameOver){v(e);return}_(e)}f(m),a.subscribe(e=>{if(!e){d();return}if(e.gameOver){v(e);return}_(e)})}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&T(n)});
