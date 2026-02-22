import{g as _,c as p,f as h}from"./fitText-BN2B8Vgz.js";async function $(a){const n=_(),s=p(n);await s.init();function l(){const{origin:e,pathname:r}=window.location,i=r.split("?")[0].replace(/\/[^/]*$/,"")||"";return e+i}function t(e,r=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${r}x${r}&data=${encodeURIComponent(e)}" width="${r}" height="${r}" />`}function c(){const r=`${l()}/mini.html?room=${n}`;a.innerHTML=`
      <div class="waiting-screen">
        <div class="qr-container">
          <h1 class="waiting-screen__title">Scan to start game</h1>
          ${t(r,300)}
          <p class="qr-url">${r}</p>
        </div>
      </div>
    `}function d(e){const r=l(),i=`${r}/controller.html?room=${n}&team=red`,v=`${r}/controller.html?room=${n}&team=blue`;a.innerHTML=`
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
              ${t(i,80)}
            </div>
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
          ${e.cells.map(o=>`
            <div class="grid__cell ${o.revealed?`grid__cell--${o.role}`:"grid__cell--hidden"}">
              <span>${o.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,requestAnimationFrame(()=>h(a))}s.subscribe(e=>{if(!e){c();return}d(e)});const m=s.getState();m?d(m):c()}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("#app");a&&$(a)});
