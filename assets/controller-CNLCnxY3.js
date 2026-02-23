import{b as g,o as f,c as $,a as L,f as T}from"./footer-D3JG57G1.js";import{g as w}from"./renderCell-B3ZMaWK7.js";async function h(n){const r=new URLSearchParams(window.location.search).get("team"),i=g();if(!i||!r||r!=="red"&&r!=="blue"){n.innerHTML=`
      <div class="error-screen">
        <p>Невірне посилання.<br>Відскануй QR з головного екрану.</p>
      </div>
    `;return}document.body.classList.add(`team-${r}`);const o=$(i);await o.init();function u(e){const a=e.cells.filter(t=>t.role==="red"&&!t.revealed).length,s=e.cells.filter(t=>t.role==="blue"&&!t.revealed).length;return{redLeft:a,blueLeft:s}}function d(){n.innerHTML=`
      <div class="waiting-screen">
        <p class="waiting-screen__hint">Очікуємо початку гри...</p>
      </div>
    `}function _(e){const a=e.winner===r;n.innerHTML=`
      <div class="gameover-screen gameover-screen--${r}">
        <div class="gameover-screen__content">
          <div class="gameover-screen__result">${a?"🏆 Перемога!":"💀 Поразка"}</div>
          <div class="gameover-screen__team">${r.toUpperCase()}</div>
        </div>
      </div>
    `}function v(e){const a=e.activeTeam===r,{redLeft:s,blueLeft:t}=u(e);document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`),n.innerHTML=`
      <div class="controller controller--${r}">
        <header class="controller__header">
          <div class="controller__team-badge controller__team-badge--${r}">
            ${r.toUpperCase()}
          </div>
          <div class="controller__score">
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--red"></div>
              <span class="controller__score-count">${s}</span>
              <span class="controller__score-label">RED</span>
            </div>
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--blue"></div>
              <span class="controller__score-count">${t}</span>
              <span class="controller__score-label">BLUE</span>
            </div>
          </div>
          <div class="controller__actions">
            <span class="controller__turn-label ${a?"controller__turn-label--active":""}">
              ${a?"ВАШ ХІД":`ХІД ${e.activeTeam.toUpperCase()}`}
            </span>
            <button
              class="controller__end-turn-btn ${a?"":"controller__end-turn-btn--disabled"}"
              id="endTurnBtn"
              ${a?"":"disabled"}
            >
              END TURN
            </button>
          </div>
        </header>

        <div class="controller__grid-wrapper">
          <div class="controller__grid">
            ${e.cells.map((l,p)=>{const b=!l.revealed&&a&&!e.gameOver;return`
                <div class="grid__cell ${w(l)} ${b?"grid__cell--clickable":""}"
                     data-index="${p}">
                  <span>${l.word}</span>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,n.querySelector(".controller").appendChild(L()),requestAnimationFrame(()=>T(n)),n.querySelectorAll(".grid__cell--clickable").forEach(l=>{l.addEventListener("click",async()=>{await o.reveal(parseInt(l.dataset.index,10))})});const c=document.getElementById("endTurnBtn");c&&!c.disabled&&c.addEventListener("click",async()=>{await o.endTurn()})}function m(){const e=o.getState();if(!e){d();return}if(e.gameOver){_(e);return}v(e)}f(m),o.subscribe(e=>{if(!e){d();return}if(e.gameOver){_(e);return}v(e)})}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&h(n)});
