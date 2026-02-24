import{c as b,g as _,a as u}from"./fullscreen-BSi55ZNB.js";import{f as $}from"./fitText-DhGiXhRH.js";import{g as f}from"./renderCell-BLtbsjKK.js";function d(){const a=document.createElement("footer");return a.className="app-footer",a.appendChild(b()),a}async function g(a){let n=null,t=null;function m(){const{origin:e,pathname:r}=window.location,o=r.split("?")[0].replace(/\/[^/]*$/,"")||"";return e+o}function c(e,r=120,o="8B7355",l="2a1f1a"){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${r}x${r}&color=${o}&bgcolor=${l}&data=${encodeURIComponent(e)}" width="${r}" height="${r}" />`}function h(){document.body.classList.remove("team-red","team-blue"),a.innerHTML=`
      <div class="app">
        <div class="lobby-screen">
          <h1 class="lobby__title">Codenames</h1>
          <button class="lobby__btn" id="createRoomBtn">Створити кімнату</button>
        </div>
      </div>
    `,a.querySelector(".app").appendChild(d()),document.getElementById("createRoomBtn").addEventListener("click",async()=>{n=_(),t=u(n),await t.init(),t.subscribe(e=>{if(!e){s();return}i(e)}),s()})}function s(){document.body.classList.remove("team-red","team-blue");const r=`${m()}/mini.html?room=${n}`;a.innerHTML=`
      <div class="app">
        <div class="waiting-screen">
          <h1 class="waiting-screen__title">Codenames</h1>
          <div class="qr-container">
            <div class="qr-wrapper">
              ${c(r,280)}
            </div>
            <div class="qr-scan-hint">Scan to start</div>
            <p class="qr-url">${r}</p>
          </div>
        </div>
      </div>
    `,a.querySelector(".app").appendChild(d())}function i(e){document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`);const r=m(),o=`${r}/controller.html?room=${n}&team=red`,l=`${r}/controller.html?room=${n}&team=blue`;a.innerHTML=`
      <div class="app">
        <header class="header">
          <div class="header__corner header__corner--left">
            <div class="header__controller-qr">
              ${c(o,80)}
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
              ${c(l,80)}
            </div>
          </div>
        </header>

        ${e.gameOver?`
          <div class="gameover-banner gameover-banner--${e.winner}">
            🏆 Перемагає ${e.winner.toUpperCase()}!
          </div>
        `:""}

        <div class="main-grid">
          ${e.cells.map(v=>`
            <div class="main-cell ${f(v)}">
              <span>${v.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,a.querySelector(".app").appendChild(d()),requestAnimationFrame(()=>$(a))}const p=new URLSearchParams(window.location.search).get("room");if(p){n=p,t=u(n),await t.init(),t.subscribe(r=>{if(!r){s();return}i(r)});const e=t.getState();e?i(e):s()}else h()}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("#app");a&&g(a)});
