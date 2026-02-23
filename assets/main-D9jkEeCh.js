import{c as h,g as _,a as u,f as $}from"./fullscreen-Ds68ld_W.js";import{g as b}from"./renderCell-B3ZMaWK7.js";function m(){const r=document.createElement("footer");return r.className="app-footer",r.appendChild(h()),r}async function g(r){const n=_(),s=u(n);await s.init();function c(){const{origin:e,pathname:a}=window.location,o=a.split("?")[0].replace(/\/[^/]*$/,"")||"";return e+o}function t(e,a=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${a}x${a}&data=${encodeURIComponent(e)}" width="${a}" height="${a}" />`}function l(){document.body.classList.remove("team-red","team-blue");const a=`${c()}/mini.html?room=${n}`;r.innerHTML=`
      <div class="app">
        <div class="waiting-screen">
          <h1 class="waiting-screen__title">Codenames</h1>
          <div class="qr-container">
            <div class="qr-wrapper">
              ${t(a,280)}
            </div>
            <div class="qr-scan-hint">Scan to start</div>
            <p class="qr-url">${a}</p>
          </div>
        </div>
      </div>
    `,r.querySelector(".app").appendChild(m())}function d(e){document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`);const a=c(),o=`${a}/controller.html?room=${n}&team=red`,v=`${a}/controller.html?room=${n}&team=blue`;r.innerHTML=`
      <div class="app">
        <header class="header">
          <div class="header__corner header__corner--left">
            <div class="header__controller-qr header__controller-qr--red">
              <span class="header__controller-label">RED</span>
              ${t(o,80)}
              <span class="header__controller-hint">
  scan<br>
  to open<br>
  controller
</span>
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
              <span class="header__controller-hint">
  scan<br>
  to open<br>
  controller
</span>
            </div>
          </div>
        </header>

        ${e.gameOver?`
          <div class="gameover-banner gameover-banner--${e.winner}">
            🏆 Перемагає ${e.winner.toUpperCase()}!
          </div>
        `:""}

        <div class="grid">
          ${e.cells.map(p=>`
            <div class="grid__cell ${b(p)}">
              <span>${p.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,r.querySelector(".app").appendChild(m()),requestAnimationFrame(()=>$(r))}s.subscribe(e=>{if(!e){l();return}d(e)});const i=s.getState();i?d(i):l()}document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector("#app");r&&g(r)});
