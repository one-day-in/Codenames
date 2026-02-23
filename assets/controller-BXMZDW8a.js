import{b as g,o as f,a as $,f as L}from"./fullscreen-3JFAUp60.js";import{g as T}from"./renderCell-B3ZMaWK7.js";async function w(n){const r=new URLSearchParams(window.location.search).get("team"),i=g();if(!i||!r||r!=="red"&&r!=="blue"){n.innerHTML=`
      <div class="error-screen">
        <p>Невірне посилання.<br>Відскануй QR з головного екрану.</p>
      </div>
    `;return}document.body.classList.add(`team-${r}`);const o=$(i);await o.init();function u(e){const t=e.cells.filter(a=>a.role==="red"&&!a.revealed).length,l=e.cells.filter(a=>a.role==="blue"&&!a.revealed).length;return{redLeft:t,blueLeft:l}}function d(){n.innerHTML=`
      <div class="waiting-screen">
        <p class="waiting-screen__hint">Очікуємо початку гри...</p>
      </div>
    `}function _(e){const t=e.winner===r;n.innerHTML=`
      <div class="gameover-screen gameover-screen--${r}">
        <div class="gameover-screen__content">
          <div class="gameover-screen__result">${t?"🏆 Перемога!":"💀 Поразка"}</div>
          <div class="gameover-screen__team">${r.toUpperCase()}</div>
        </div>
      </div>
    `}function v(e){const t=e.activeTeam===r,{redLeft:l,blueLeft:a}=u(e);document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`),n.innerHTML=`
      <div class="controller controller--${r}">
        <header class="controller__header">
          <div class="controller__team-badge controller__team-badge--${r}">
            ${r.toUpperCase()}
          </div>
          <div class="controller__score">
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--red"></div>
              <span class="controller__score-count">${l}</span>
              <span class="controller__score-label">RED</span>
            </div>
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--blue"></div>
              <span class="controller__score-count">${a}</span>
              <span class="controller__score-label">BLUE</span>
            </div>
          </div>
          <div class="controller__actions">
            <span class="controller__turn-label ${t?"controller__turn-label--active":""}">
              ${t?"ВАШ ХІД":`ХІД ${e.activeTeam.toUpperCase()}`}
            </span>
            <button
              class="controller__end-turn-btn ${t?"":"controller__end-turn-btn--disabled"}"
              id="endTurnBtn"
              ${t?"":"disabled"}
            >
              END TURN
            </button>
          </div>
        </header>

        <div class="controller__grid">
          ${e.cells.map((s,p)=>{const b=!s.revealed&&t&&!e.gameOver;return`
              <div class="grid__cell ${T(s)} ${b?"grid__cell--clickable":""}"
                   data-index="${p}">
                <span>${s.word}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,requestAnimationFrame(()=>L(n)),n.querySelectorAll(".grid__cell--clickable").forEach(s=>{s.addEventListener("click",async()=>{await o.reveal(parseInt(s.dataset.index,10))})});const c=document.getElementById("endTurnBtn");c&&!c.disabled&&c.addEventListener("click",async()=>{await o.endTurn()})}function m(){const e=o.getState();if(!e){d();return}if(e.gameOver){_(e);return}v(e)}f(m),o.subscribe(e=>{if(!e){d();return}if(e.gameOver){_(e);return}v(e)})}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&w(n)});
