import{c as h,g as _,a as u,f as b}from"./fullscreen-D-U6Dlgg.js";import{g as $}from"./renderCell-B3ZMaWK7.js";function m(){const r=document.createElement("footer");return r.className="app-footer",r.appendChild(h()),r}async function g(r){const n=_(),s=u(n);await s.init();function l(){const{origin:e,pathname:a}=window.location,o=a.split("?")[0].replace(/\/[^/]*$/,"")||"";return e+o}function t(e,a=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${a}x${a}&data=${encodeURIComponent(e)}" width="${a}" height="${a}" />`}function c(){document.body.classList.remove("team-red","team-blue");const a=`${l()}/mini.html?room=${n}`;r.innerHTML=`
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
    `,r.querySelector(".app").appendChild(m())}function d(e){document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`);const a=l(),o=`${a}/controller.html?room=${n}&team=red`,v=`${a}/controller.html?room=${n}&team=blue`;r.innerHTML=`
      <div class="app">
        <header class="header">

          <div class="header__corner header__corner--left">
            <span class="header__controller-label header__controller-label--red">RED</span>
            <div class="header__controller-qr">
              ${t(o,80)}
              <span class="header__controller-hint">scan<br>to open<br>controller</span>
            </div>
          </div>

          <div class="header__center">
            <span class="header__team-label">TEAM</span>
            <div class="header__team">${e.activeTeam.toUpperCase()}</div>
          </div>

          <div class="header__corner header__corner--right">
            <span class="header__controller-label header__controller-label--blue">BLUE</span>
            <div class="header__controller-qr">
              <span class="header__controller-hint">scan<br>to open<br>controller</span>
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
          ${e.cells.map(p=>`
            <div class="grid__cell ${$(p)}">
              <span>${p.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,r.querySelector(".app").appendChild(m()),requestAnimationFrame(()=>b(r))}s.subscribe(e=>{if(!e){c();return}d(e)});const i=s.getState();i?d(i):c()}document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector("#app");r&&g(r)});
