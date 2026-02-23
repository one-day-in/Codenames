import{g as p,c as _,f as h,a as u}from"./fullscreen-Bf1d3Yil.js";import{g as $}from"./renderCell-B3ZMaWK7.js";async function b(a){const n=p(),s=_(n);await s.init();function c(){const{origin:e,pathname:r}=window.location,o=r.split("?")[0].replace(/\/[^/]*$/,"")||"";return e+o}function t(e,r=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${r}x${r}&data=${encodeURIComponent(e)}" width="${r}" height="${r}" />`}function d(){document.body.classList.remove("team-red","team-blue");const r=`${c()}/mini.html?room=${n}`;a.innerHTML=`
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
    `}function i(e){document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`);const r=c(),o=`${r}/controller.html?room=${n}&team=red`,v=`${r}/controller.html?room=${n}&team=blue`;a.innerHTML=`
      <div class="app">
        <header class="header">
          <div class="header__corner header__corner--left">
            <div class="header__controller-qr header__controller-qr--red">
              <span class="header__controller-label">RED</span>
              ${t(o,80)}
            </div>
          </div>
          <div class="header__center">
            <span class="header__team-label">TEAM</span>
            <div class="header__team">${e.activeTeam.toUpperCase()}</div>
          </div>
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
          ${e.cells.map(m=>`
            <div class="grid__cell ${$(m)}">
              <span>${m.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,requestAnimationFrame(()=>h(a))}s.subscribe(e=>{if(!e){d();return}i(e)});const l=s.getState();l?i(l):d()}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("#app");a&&(document.body.appendChild(u()),b(a))});
