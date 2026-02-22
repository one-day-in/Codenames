import{g as _,c as p,f as h}from"./fitText-BN2B8Vgz.js";async function $(a){const n=_(),i=p(n);await i.init();function t(){return window.location.origin}function o(e,r=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${r}x${r}&data=${encodeURIComponent(e)}" width="${r}" height="${r}" />`}function l(){const r=`${t()}/mini.html?room=${n}`;a.innerHTML=`
      <div class="waiting-screen">
        <div class="qr-container">
          <h1 class="waiting-screen__title">Scan to start game</h1>
          ${o(r,300)}
          <p class="qr-url">${r}</p>
        </div>
      </div>
    `}function c(e){const r=t(),m=`${r}/controller.html?room=${n}&team=red`,v=`${r}/controller.html?room=${n}&team=blue`;a.innerHTML=`
      <div class="app">
        <header class="header">
          <div class="header__team-container">
            <span class="header__team-label">TEAM</span>
            <div class="header__team header__team--${e.activeTeam}">
              ${e.activeTeam.toUpperCase()}
            </div>
          </div>
          <div class="header__controllers">
            <div class="header__controller-qr header__controller-qr--red">
              <span class="header__controller-label">RED</span>
              ${o(m,80)}
            </div>
            <div class="header__controller-qr header__controller-qr--blue">
              <span class="header__controller-label">BLUE</span>
              ${o(v,80)}
            </div>
          </div>
        </header>

        ${e.gameOver?`
          <div class="gameover-banner gameover-banner--${e.winner}">
            🏆 Перемагає ${e.winner.toUpperCase()}!
          </div>
        `:""}

        <div class="grid">
          ${e.cells.map(s=>`
            <div class="grid__cell ${s.revealed?`grid__cell--${s.role}`:"grid__cell--hidden"}">
              <span>${s.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,requestAnimationFrame(()=>h(a))}i.subscribe(e=>{if(!e){l();return}c(e)});const d=i.getState();d?c(d):l()}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("#app");a&&$(a)});
