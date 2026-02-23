import{c as b,f as _,g as $,a as v}from"./fullscreen-DOyVK33B.js";import{g}from"./renderCell-B3ZMaWK7.js";function l(){const a=document.createElement("footer");return a.className="app-footer",a.appendChild(b()),a}async function f(a){let n=null,t=null;function d(){const{origin:e,pathname:r}=window.location,i=r.split("?")[0].replace(/\/[^/]*$/,"")||"";return e+i}function o(e,r=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${r}x${r}&data=${encodeURIComponent(e)}" width="${r}" height="${r}" />`}function u(){document.body.classList.remove("team-red","team-blue"),a.innerHTML=`
      <div class="app">
        <div class="lobby-screen">
          <h1 class="lobby__title">Codenames</h1>
          <button class="lobby__btn" id="createRoomBtn">Створити кімнату</button>
        </div>
      </div>
    `,a.querySelector(".app").appendChild(l()),document.getElementById("createRoomBtn").addEventListener("click",async()=>{n=$(),t=v(n),await t.init(),t.subscribe(e=>{if(!e){s();return}c(e)}),s()})}function s(){document.body.classList.remove("team-red","team-blue");const r=`${d()}/mini.html?room=${n}`;a.innerHTML=`
      <div class="app">
        <div class="waiting-screen">
          <h1 class="waiting-screen__title">Codenames</h1>
          <div class="qr-container">
            <div class="qr-wrapper">
              ${o(r,280)}
            </div>
            <div class="qr-scan-hint">Scan to start</div>
            <p class="qr-url">${r}</p>
          </div>
        </div>
      </div>
    `,a.querySelector(".app").appendChild(l())}function c(e){document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`);const r=d(),i=`${r}/controller.html?room=${n}&team=red`,h=`${r}/controller.html?room=${n}&team=blue`;a.innerHTML=`
      <div class="app">
        <header class="header">

          <div class="header__corner header__corner--left">
            <div class="header__controller-qr">
              ${o(i,80)}
              <span class="header__controller-hint">scan to open<br>red controller</span>
            </div>
          </div>

          <div class="header__center">
            <span class="header__team-label">TEAM</span>
            <div class="header__team">${e.activeTeam.toUpperCase()}</div>
          </div>

          <div class="header__corner header__corner--right">
            <div class="header__controller-qr">
              <span class="header__controller-hint">scan to open<br>blue controller</span>
              ${o(h,80)}
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
            <div class="grid__cell ${g(p)}">
              <span>${p.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,a.querySelector(".app").appendChild(l()),requestAnimationFrame(()=>_(a))}const m=new URLSearchParams(window.location.search).get("room");if(m){n=m,t=v(n),await t.init(),t.subscribe(r=>{if(!r){s();return}c(r)});const e=t.getState();e?c(e):s()}else u()}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("#app");a&&f(a)});
