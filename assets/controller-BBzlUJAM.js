import{a as $,c as f,f as L}from"./fitText-D8vKGhni.js";async function T(s){const r=new URLSearchParams(window.location.search).get("team"),i=$();if(!i||!r||r!=="red"&&r!=="blue"){s.innerHTML=`
      <div class="error-screen">
        <p>Невірне посилання.<br>Відскануй QR з головного екрану.</p>
      </div>
    `;return}document.body.classList.add(`team-${r}`);const a=f(i);await a.init();function _(e){const n=e.cells.filter(l=>l.role==="red"&&!l.revealed).length,o=e.cells.filter(l=>l.role==="blue"&&!l.revealed).length;return{redLeft:n,blueLeft:o}}function v(){s.innerHTML=`
      <div class="waiting-screen">
        <p class="waiting-screen__hint">Очікуємо початку гри...</p>
      </div>
    `}function u(e){const n=e.winner===r;s.innerHTML=`
      <div class="gameover-screen gameover-screen--${r}">
        <div class="gameover-screen__content">
          <div class="gameover-screen__result">${n?"🏆 Перемога!":"💀 Поразка"}</div>
          <div class="gameover-screen__team">${r.toUpperCase()}</div>
        </div>
      </div>
    `}function m(e){const n=e.activeTeam===r,{redLeft:o,blueLeft:l}=_(e);document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`),s.innerHTML=`
      <div class="controller controller--${r}">
        <header class="controller__header">
          <div class="controller__team-badge controller__team-badge--${r}">
            ${r.toUpperCase()}
          </div>
          <div class="controller__score">
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--red"></div>
              <span class="controller__score-count">${o}</span>
              <span class="controller__score-label">RED</span>
            </div>
            <div class="controller__score-row">
              <div class="controller__score-dot controller__score-dot--blue"></div>
              <span class="controller__score-count">${l}</span>
              <span class="controller__score-label">BLUE</span>
            </div>
          </div>
          <div class="controller__actions">
            <span class="controller__turn-label ${n?"controller__turn-label--active":""}">
              ${n?"ВАШ ХІД":`ХІД ${e.activeTeam.toUpperCase()}`}
            </span>
            <button
              class="controller__end-turn-btn ${n?"":"controller__end-turn-btn--disabled"}"
              id="endTurnBtn"
              ${n?"":"disabled"}
            >
              END TURN
            </button>
          </div>
        </header>

        <div class="grid controller__grid">
          ${e.cells.map((c,p)=>{const d=c.revealed,b=d?`grid__cell--${c.role}`:"grid__cell--hidden",g=!d&&n&&!e.gameOver;return`
              <div class="grid__cell ${b} ${g?"grid__cell--clickable":""}" data-index="${p}">
                <span>${c.word}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,requestAnimationFrame(()=>L(s)),s.querySelectorAll(".grid__cell--clickable").forEach(c=>{c.addEventListener("click",async()=>{await a.reveal(parseInt(c.dataset.index,10))})});const t=document.getElementById("endTurnBtn");t&&!t.disabled&&t.addEventListener("click",async()=>{await a.endTurn()})}a.subscribe(e=>{if(!e){v();return}if(e.gameOver){u(e);return}m(e)})}const w=document.querySelector("#app");T(w);
