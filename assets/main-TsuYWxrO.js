import{c as C,s as d,a as U}from"./fullscreen-mDCptqA1.js";import{f as L}from"./fitText-DhGiXhRH.js";import{g as q}from"./renderCell-BLtbsjKK.js";function u(){const e=document.createElement("footer");return e.className="app-footer",e.appendChild(C()),e}async function S(){const{data:{user:e}}=await d.auth.getUser();return e}async function M(){const{error:e}=await d.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});e&&console.error("Auth error:",e)}async function y(){await d.auth.signOut()}async function B(e){const{data:n}=await d.from("games").select("id").eq("owner_id",e).maybeSingle();if(n)return n.id;const o=I();return await d.from("games").insert({id:o,owner_id:e,state:null}),o}function I(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}async function E(e){let n=null,o=null;function h(){const{origin:t,pathname:a}=window.location,r=a.split("?")[0].replace(/\/[^/]*$/,"")||"";return t+r}function m(t,a=120,r="8B7355",c="2a1f1a"){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${a}x${a}&color=${r}&bgcolor=${c}&data=${encodeURIComponent(t)}" width="${a}" height="${a}" />`}function p(){document.body.classList.remove("team-red","team-blue"),e.innerHTML=`
      <div class="app">
        <div class="lobby-screen">
          <h1 class="lobby__title">Codenames</h1>
          <button class="lobby__btn lobby__btn--google" id="googleSignInBtn">
            <svg width="20" height="20" viewBox="0 0 48 48" style="margin-right:10px;vertical-align:middle">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Увійти через Google
          </button>
        </div>
      </div>
    `,e.querySelector(".app").appendChild(u()),document.getElementById("googleSignInBtn").addEventListener("click",async()=>{await M()})}function $(){document.body.classList.remove("team-red","team-blue"),e.innerHTML=`
      <div class="app">
        <div class="lobby-screen">
          <h1 class="lobby__title">Codenames</h1>
          <p class="waiting-screen__hint">Завантаження...</p>
        </div>
      </div>
    `}function v(t){document.body.classList.remove("team-red","team-blue");const r=`${h()}/mini.html?room=${n}`;e.innerHTML=`
      <div class="app">
        <div class="waiting-screen">
          <h1 class="waiting-screen__title">Codenames</h1>
          <div class="qr-container">
            <div class="qr-wrapper">
              ${m(r,280)}
            </div>
            <div class="qr-scan-hint">Scan to start</div>
            <p class="qr-url">${r}</p>
          </div>
        </div>
      </div>
    `;const c=u(),i=document.createElement("button");i.className="sign-out-btn",i.textContent=t.email,i.title="Вийти",i.addEventListener("click",async()=>{await y(),p()}),c.prepend(i),e.querySelector(".app").appendChild(c)}function g(t,a){document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${t.activeTeam}`);const r=h(),c=`${r}/controller.html?room=${n}&team=red`,i=`${r}/controller.html?room=${n}&team=blue`;e.innerHTML=`
      <div class="app">
        <header class="header">
          <div class="header__corner header__corner--left">
            <div class="header__controller-qr">
              ${m(c,80)}
              <span class="header__controller-hint">scan to open<br>red controller</span>
            </div>
          </div>
          <div class="header__center">
            <span class="header__team-label">TEAM</span>
            <div class="header__team">${t.activeTeam.toUpperCase()}</div>
          </div>
          <div class="header__corner header__corner--right">
            <div class="header__controller-qr">
              <span class="header__controller-hint">scan to open<br>blue controller</span>
              ${m(i,80)}
            </div>
          </div>
        </header>

        ${t.gameOver?`
          <div class="gameover-banner gameover-banner--${t.winner}">
            🏆 Перемагає ${t.winner.toUpperCase()}!
          </div>
        `:""}

        <div class="main-grid">
          ${t.cells.map(_=>`
            <div class="main-cell ${q(_)}">
              <span>${_.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;const w=u(),l=document.createElement("button");l.className="sign-out-btn",l.textContent=a.email,l.title="Вийти",l.addEventListener("click",async()=>{await y(),p()}),w.prepend(l),e.querySelector(".app").appendChild(w),requestAnimationFrame(()=>L(e))}$();const s=await S();if(!s){p();return}n=await B(s.id);const b=new URLSearchParams(window.location.search);b.set("room",n),window.history.replaceState({},"",window.location.pathname+"?"+b.toString()),o=U(n),await o.init(),o.subscribe(t=>{if(!t){v(s);return}g(t,s)});const f=o.getState();f?g(f,s):v(s)}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#app");e&&E(e)});
