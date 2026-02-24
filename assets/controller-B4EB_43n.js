import{o as $,a as L,b as T}from"./presence-CGSlqPCM.js";import{g as w}from"./room-DjrEdXuX.js";import{a as k}from"./renderCell-BLtbsjKK.js";async function h(n){const r=new URLSearchParams(window.location.search).get("team"),a=w();if(!a||!r||r!=="red"&&r!=="blue"){n.innerHTML=`
      <div class="error-screen">
        <p>Невірне посилання.<br>Відскануй QR з головного екрану.</p>
      </div>
    `;return}const d=`controller-${r}`,v=L(a);if(await v.isRoleTaken(d)){n.innerHTML=`
      <div class="waiting-screen">
        <div class="taken-screen">
          <p class="taken-screen__icon">🔒</p>
          <p class="taken-screen__text">${r.toUpperCase()} controller<br>вже відкритий на іншому пристрої</p>
        </div>
      </div>
    `;return}v.join(d),document.body.classList.add(`team-${r}`);const c=T(a);await c.init();function p(e){const s=e.cells.filter(o=>o.role==="red"&&!o.revealed).length,l=e.cells.filter(o=>o.role==="blue"&&!o.revealed).length;return{redLeft:s,blueLeft:l}}function _(){n.innerHTML=`
      <div class="waiting-screen">
        <p class="waiting-screen__hint">Очікуємо початку гри...</p>
      </div>
    `}function u(e){const s=e.winner===r;n.innerHTML=`
      <div class="gameover-screen gameover-screen--${r}">
        <div class="gameover-screen__content">
          <div class="gameover-screen__result">${s?"🏆 Перемога!":"💀 Поразка"}</div>
          <div class="gameover-screen__team">${r.toUpperCase()}</div>
        </div>
      </div>
    `}function m(e){const s=e.activeTeam===r,{redLeft:l,blueLeft:o}=p(e);document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`),n.innerHTML=`
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
              <span class="controller__score-count">${o}</span>
              <span class="controller__score-label">BLUE</span>
            </div>
          </div>
          <div class="controller__actions">
            <span class="controller__turn-label ${s?"controller__turn-label--active":""}">
              ${s?"ВАШ ХІД":`ХІД ${e.activeTeam.toUpperCase()}`}
            </span>
            <button
              class="controller__end-turn-btn"
              id="endTurnBtn"
              ${s?"":"disabled"}
            >END TURN</button>
          </div>
        </header>

        <div class="controller__grid">
          ${e.cells.map((t,g)=>{const f=!t.revealed&&s&&!e.gameOver;return`
              <div class="controller__cell ${k(t)} ${f?"controller__cell--clickable":""}"
                   data-index="${g}">
                <span>${t.word}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,n.querySelectorAll(".controller__cell--clickable").forEach(t=>{t.addEventListener("click",async()=>{await c.reveal(parseInt(t.dataset.index,10))})});const i=document.getElementById("endTurnBtn");i&&!i.disabled&&i.addEventListener("click",async()=>{await c.endTurn()})}function b(){const e=c.getState();if(!e){_();return}if(e.gameOver){u(e);return}m(e)}$(b),c.subscribe(e=>{if(!e){_();return}if(e.gameOver){u(e);return}m(e)})}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&h(n)});
