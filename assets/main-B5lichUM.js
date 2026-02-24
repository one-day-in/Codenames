import{c as M,s as v,a as B,b as I}from"./presence-CGSlqPCM.js";import{f as T}from"./fitText-DhGiXhRH.js";import{g as A}from"./renderCell-BLtbsjKK.js";function $(){const e=document.createElement("footer");return e.className="app-footer",e.appendChild(M()),e}async function x(){const{data:{user:e}}=await v.auth.getUser();return e}async function O(){const{error:e}=await v.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});e&&console.error("Auth error:",e)}async function S(){await v.auth.signOut()}async function k(e){const{data:a}=await v.from("games").select("id").eq("owner_id",e).maybeSingle();if(a)return a.id;const s=F();return await v.from("games").insert({id:s,owner_id:e,state:null}),s}function F(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}async function H(e){let a=null,s=null,l=null;function h(){const{origin:n,pathname:t}=window.location,r=t.split("?")[0].replace(/\/[^/]*$/,"")||"";return n+r}function d(n,t=120,r="8B7355",o="2a1f1a"){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${t}x${t}&color=${r}&bgcolor=${o}&data=${encodeURIComponent(n)}" width="${t}" height="${t}" />`}function y(n,t){var U,L;(U=e.querySelector(".presence-modal"))==null||U.remove();const r=`${t}/mini.html?room=${a}`,o=`${t}/controller.html?room=${a}&team=red`,i=`${t}/controller.html?room=${a}&team=blue`,{mini:p,"controller-red":c,"controller-blue":u}=n;if(p&&c&&u)return;let g="";if(!p)g=`
                <div class="presence-modal__qr-block">
                    <div class="qr-wrapper">${d(r,180)}</div>
                    <p class="presence-modal__label">Підключи міні-карту</p>
                </div>
            `;else{const f=[];c||f.push(`
                <div class="presence-modal__qr-block">
                    <div class="qr-wrapper">${d(o,140)}</div>
                    <p class="presence-modal__label presence-modal__label--red">RED controller</p>
                </div>
            `),u||f.push(`
                <div class="presence-modal__qr-block">
                    <div class="qr-wrapper">${d(i,140)}</div>
                    <p class="presence-modal__label presence-modal__label--blue">BLUE controller</p>
                </div>
            `),g=`
                <p class="presence-modal__title">Підключи контролери</p>
                <div class="presence-modal__qrs">${f.join("")}</div>
            `}const _=document.createElement("div");_.className="presence-modal",_.innerHTML=`<div class="presence-modal__box">${g}</div>`,(L=e.querySelector(".app"))==null||L.appendChild(_)}function b(){document.body.classList.remove("team-red","team-blue"),e.innerHTML=`
      <div class="app">
        <div class="lobby-screen">
          <h1 class="lobby__title">Codenames</h1>
          <button class="lobby__btn lobby__btn--google" id="googleSignInBtn">
            <svg width="20" height="20" viewBox="0 0 48 48" style="margin-right:10px;vertical-align:middle">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Увійти через Google
          </button>
        </div>
      </div>
    `,e.querySelector(".app").appendChild($()),document.getElementById("googleSignInBtn").addEventListener("click",O)}function E(){document.body.classList.remove("team-red","team-blue"),e.innerHTML=`
      <div class="app">
        <div class="lobby-screen">
          <h1 class="lobby__title">Codenames</h1>
          <p class="waiting-screen__hint">Завантаження...</p>
        </div>
      </div>
    `}function w(n,t){document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${n.activeTeam}`);const r=h(),o=`${r}/controller.html?room=${a}&team=red`,i=`${r}/controller.html?room=${a}&team=blue`;e.innerHTML=`
      <div class="app">
        <header class="header">
          <div class="header__corner header__corner--left">
            <div class="header__controller-qr">
              ${d(o,80)}
              <span class="header__controller-hint">scan to open<br>red controller</span>
            </div>
          </div>
          <div class="header__center">
            <span class="header__team-label">TEAM</span>
            <div class="header__team">${n.activeTeam.toUpperCase()}</div>
          </div>
          <div class="header__corner header__corner--right">
            <div class="header__controller-qr">
              <span class="header__controller-hint">scan to open<br>blue controller</span>
              ${d(i,80)}
            </div>
          </div>
        </header>

        ${n.gameOver?`
          <div class="gameover-banner gameover-banner--${n.winner}">
            🏆 Перемагає ${n.winner.toUpperCase()}!
          </div>
        `:""}

        <div class="main-grid">
          ${n.cells.map(u=>`
            <div class="main-cell ${A(u)}">
              <span>${u.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;const p=$(),c=document.createElement("button");c.className="sign-out-btn",c.textContent=t.email,c.addEventListener("click",async()=>{l==null||l.leave(),await S(),b()}),p.prepend(c),e.querySelector(".app").appendChild(p),l&&y(l.getPresenceState(),r),requestAnimationFrame(()=>T(e))}function q(n){document.body.classList.remove("team-red","team-blue");const r=`${h()}/mini.html?room=${a}`;e.innerHTML=`
      <div class="app">
        <div class="waiting-screen">
          <h1 class="waiting-screen__title">Codenames</h1>
          <div class="qr-container">
            <div class="qr-wrapper">${d(r,280)}</div>
            <div class="qr-scan-hint">Scan to start</div>
            <p class="qr-url">${r}</p>
          </div>
        </div>
      </div>
    `;const o=$(),i=document.createElement("button");i.className="sign-out-btn",i.textContent=n.email,i.addEventListener("click",async()=>{l==null||l.leave(),await S(),b()}),o.prepend(i),e.querySelector(".app").appendChild(o)}E();const m=await x();if(!m){b();return}a=await k(m.id),l=B(a),l.listen(),l.onChange(n=>{var o;const t=h();(o=e.querySelector(".presence-modal"))==null||o.remove(),e.querySelector(".app")&&(s!=null&&s.getState())&&y(n,t)}),s=I(a),await s.init(),s.subscribe(n=>{if(!n){q(m);return}w(n,m)});const C=s.getState();C?w(C,m):q(m)}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#app");e&&H(e)});
