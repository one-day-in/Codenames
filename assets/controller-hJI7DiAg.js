import{b as f,a as u,o as $,c as L,f as T}from"./fullscreen-Bf1d3Yil.js";import{g as w}from"./renderCell-B3ZMaWK7.js";async function h(n){const r=new URLSearchParams(window.location.search).get("team"),d=f();if(!d||!r||r!=="red"&&r!=="blue"){n.innerHTML=`
      <div class="error-screen">
        <p>Невірне посилання.<br>Відскануй QR з головного екрану.</p>
      </div>
    `;return}document.body.classList.add(`team-${r}`),document.body.appendChild(u());const l=L(d);await l.init();function m(e){const t=e.cells.filter(a=>a.role==="red"&&!a.revealed).length,s=e.cells.filter(a=>a.role==="blue"&&!a.revealed).length;return{redLeft:t,blueLeft:s}}function i(){n.innerHTML=`
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
    `}function v(e){const t=e.activeTeam===r,{redLeft:s,blueLeft:a}=m(e);document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`),n.innerHTML=`
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

        <div class="controller__grid-wrapper">
          <div class="controller__grid">
            ${e.cells.map((o,b)=>{const g=!o.revealed&&t&&!e.gameOver;return`
                <div class="grid__cell ${w(o)} ${g?"grid__cell--clickable":""}"
                     data-index="${b}">
                  <span>${o.word}</span>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,requestAnimationFrame(()=>T(n)),n.querySelectorAll(".grid__cell--clickable").forEach(o=>{o.addEventListener("click",async()=>{await l.reveal(parseInt(o.dataset.index,10))})});const c=document.getElementById("endTurnBtn");c&&!c.disabled&&c.addEventListener("click",async()=>{await l.endTurn()})}function p(){const e=l.getState();if(!e){i();return}if(e.gameOver){_(e);return}v(e)}$(p),l.subscribe(e=>{if(!e){i();return}if(e.gameOver){_(e);return}v(e)})}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&(document.body.appendChild(u()),h(n))});
