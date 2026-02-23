import{g as _,c as p,f as h}from"./fitText-D_iAn_DC.js";async function u(a){const n=_(),s=p(n);await s.init();function o(){const{origin:e,pathname:r}=window.location,d=r.split("?")[0].replace(/\/[^/]*$/,"")||"";return e+d}function t(e,r=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${r}x${r}&data=${encodeURIComponent(e)}" width="${r}" height="${r}" />`}function c(){document.body.classList.remove("team-red","team-blue");const r=`${o()}/mini.html?room=${n}`;a.innerHTML=`
      <div class="waiting-screen">
        <h1 class="waiting-screen__title">Codenames</h1>
        <div class="qr-container">
          <div class="qr-wrapper">
            ${t(r,280)}
          </div>
          <div class="qr-scan-hint">Scan to start</div>
          <p class="qr-url">${r}</p>
        </div>
      </div>
    `}function l(e){document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`);const r=o(),d=`${r}/controller.html?room=${n}&team=red`,v=`${r}/controller.html?room=${n}&team=blue`;a.innerHTML=`
      <div class="app">
        <header class="header">

          <!-- Лівий кут: QR red -->
          <div class="header__corner header__corner--left">
            <div class="header__controller-qr header__controller-qr--red">
              <span class="header__controller-label">RED</span>
              ${t(d,80)}
            </div>
          </div>

          <!-- Центр: активна команда -->
          <div class="header__center">
            <span class="header__team-label">TEAM</span>
            <div class="header__team">
              ${e.activeTeam.toUpperCase()}
            </div>
          </div>

          <!-- Правий кут: QR blue -->
          <div class="header__corner header__corner--right">
            <div class="header__controller-qr header__controller-qr--blue">
              <span class="header__controller-label">BLUE</span>
              ${t(v,80)}
            </div>
          </div>

        </header>

        ${e.gameOver?`
          <div class="gameover-banner gameover-banner--${e.winner}">
            🏆 Перемагає ${e.winner.toUpperCase()}!
          </div>
        `:""}

        <div class="grid">
          ${e.cells.map(i=>`
            <div class="grid__cell ${i.revealed?`grid__cell--${i.role}`:"grid__cell--hidden"}">
              <span>${i.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,requestAnimationFrame(()=>h(a))}s.subscribe(e=>{if(!e){c();return}l(e)});const m=s.getState();m?l(m):c()}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("#app");a&&u(a)});
