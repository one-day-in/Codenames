import{c as h,g as u,a as _,f as $}from"./fullscreen-DcoBQGTX.js";import{g as b}from"./renderCell-B3ZMaWK7.js";function p(){const r=document.createElement("footer");return r.className="app-footer",r.appendChild(h()),r}async function g(r){const n=u(),t=_(n);await t.init();function c(){const{origin:e,pathname:a}=window.location,o=a.split("?")[0].replace(/\/[^/]*$/,"")||"";return e+o}function s(e,a=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${a}x${a}&data=${encodeURIComponent(e)}" width="${a}" height="${a}" />`}function d(){document.body.classList.remove("team-red","team-blue");const a=`${c()}/mini.html?room=${n}`;r.innerHTML=`
      <div class="app">
        <div class="waiting-screen">
          <h1 class="waiting-screen__title">Codenames</h1>
          <div class="qr-container">
            <div class="qr-wrapper">
              ${s(a,280)}
            </div>
            <div class="qr-scan-hint">Scan to start</div>
            <p class="qr-url">${a}</p>
          </div>
        </div>
      </div>
    `,r.querySelector(".app").appendChild(p())}function i(e){document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`);const a=c(),o=`${a}/controller.html?room=${n}&team=red`,v=`${a}/controller.html?room=${n}&team=blue`;r.innerHTML=`
      <div class="app">
        <header class="header">
          <div class="header__corner header__corner--left">
            <div class="header__controller-qr header__controller-qr--red">
              <span class="header__controller-label">RED</span>
              ${s(o,80)}
            </div>
          </div>
          <div class="header__center">
            <span class="header__team-label">TEAM</span>
            <div class="header__team">${e.activeTeam.toUpperCase()}</div>
          </div>
          <div class="header__corner header__corner--right">
            <div class="header__controller-qr header__controller-qr--blue">
              <span class="header__controller-label">BLUE</span>
              ${s(v,80)}
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
            <div class="grid__cell ${b(m)}">
              <span>${m.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,r.querySelector(".app").appendChild(p()),requestAnimationFrame(()=>$(r))}t.subscribe(e=>{if(!e){d();return}i(e)});const l=t.getState();l?i(l):d()}document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector("#app");r&&g(r)});
