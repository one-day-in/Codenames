import{c as x,s as h,D as b,a as H,t as _,L as O,b as F}from"./presence-DE4OY48f.js";import{f as D}from"./fitText-DhGiXhRH.js";import{g as G}from"./renderCell-BLtbsjKK.js";function C(){const e=document.createElement("footer");return e.className="app-footer",e.appendChild(x()),e}async function N(){const{data:{user:e}}=await h.auth.getUser();return e}async function R(){const{error:e}=await h.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});e&&console.error("Auth error:",e)}async function I(){await h.auth.signOut()}async function j(e){const{data:o}=await h.from("games").select("id").eq("owner_id",e).maybeSingle();if(o)return o.id;const l=P();return await h.from("games").insert({id:l,owner_id:e,state:null}),l}function P(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}async function z(e){let o=null,l=null,s=null;function $(){const{origin:n,pathname:t}=window.location,a=t.split("?")[0].replace(/\/[^/]*$/,"")||"";return n+a}function m(n,t=120,a="8B7355",r="2a1f1a"){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${t}x${t}&color=${a}&bgcolor=${r}&data=${encodeURIComponent(n)}" width="${t}" height="${t}" />`}function L(n){return`
            <div class="lang-toggle">
                ${O.map(t=>`
                    <button
                        class="lang-toggle__btn ${t.code===n?"lang-toggle__btn--active":""}"
                        data-lang="${t.code}"
                    >${t.label}</button>
                `).join("")}
            </div>
        `}function U(n){n.querySelectorAll(".lang-toggle__btn").forEach(t=>{t.addEventListener("click",async()=>{const a=t.dataset.lang;await l.setLanguage(a)})})}function S(n,t){var B,T;(B=e.querySelector(".presence-modal"))==null||B.remove();const a=_(t),r=$(),c=`${r}/mini.html?room=${o}`,u=`${r}/controller.html?room=${o}&team=red`,i=`${r}/controller.html?room=${o}&team=blue`,{mini:g,"controller-red":d,"controller-blue":v}=n;if(g&&d&&v)return;let y="";if(!g)y=`
                <div class="presence-modal__qr-block">
                    <div class="qr-wrapper">${m(c,180)}</div>
                    <p class="presence-modal__label">${a.connectMini}</p>
                </div>
            `;else{const q=[];d||q.push(`
                <div class="presence-modal__qr-block">
                    <div class="qr-wrapper">${m(u,140)}</div>
                    <p class="presence-modal__label presence-modal__label--red">RED ${a.redController}</p>
                </div>
            `),v||q.push(`
                <div class="presence-modal__qr-block">
                    <div class="qr-wrapper">${m(i,140)}</div>
                    <p class="presence-modal__label presence-modal__label--blue">BLUE ${a.blueController}</p>
                </div>
            `),y=`
                <p class="presence-modal__title">${a.connectControllers}</p>
                <div class="presence-modal__qrs">${q.join("")}</div>
            `}const w=document.createElement("div");w.className="presence-modal",w.innerHTML=`<div class="presence-modal__box">${y}</div>`,(T=e.querySelector(".app"))==null||T.appendChild(w)}function f(n=b){const t=_(n);document.body.classList.remove("team-red","team-blue"),e.innerHTML=`
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
            ${t.signIn}
          </button>
        </div>
      </div>
    `,e.querySelector(".app").appendChild(C()),document.getElementById("googleSignInBtn").addEventListener("click",R)}function k(n=b){const t=_(n);document.body.classList.remove("team-red","team-blue"),e.innerHTML=`
      <div class="app">
        <div class="lobby-screen">
          <h1 class="lobby__title">Codenames</h1>
          <p class="waiting-screen__hint">${t.loading}</p>
        </div>
      </div>
    `}function E(n,t=b){const a=_(t);document.body.classList.remove("team-red","team-blue");const c=`${$()}/mini.html?room=${o}`;e.innerHTML=`
      <div class="app">
        ${L(t)}
        <div class="waiting-screen">
          <h1 class="waiting-screen__title">Codenames</h1>
          <div class="qr-container">
            <div class="qr-wrapper">${m(c,280)}</div>
            <div class="qr-scan-hint">${a.scanToStart}</div>
            <p class="qr-url">${c}</p>
          </div>
        </div>
      </div>
    `,U(e);const u=C(),i=document.createElement("button");i.className="sign-out-btn",i.textContent=n.email,i.addEventListener("click",async()=>{s==null||s.leave(),await I(),f()}),u.prepend(i),e.querySelector(".app").appendChild(u)}function A(n,t){const a=n.language||b,r=_(a);document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${n.activeTeam}`);const c=$(),u=`${c}/controller.html?room=${o}&team=red`,i=`${c}/controller.html?room=${o}&team=blue`;e.innerHTML=`
      <div class="app">
        ${L(a)}
        <header class="header">
          <div class="header__corner header__corner--left">
            <div class="header__controller-qr">
              ${m(u,80)}
              <span class="header__controller-hint">${r.scanHint}<br>${r.redController}</span>
            </div>
          </div>
          <div class="header__center">
            <span class="header__team-label">${r.team}</span>
            <div class="header__team">${n.activeTeam.toUpperCase()}</div>
          </div>
          <div class="header__corner header__corner--right">
            <div class="header__controller-qr">
              <span class="header__controller-hint">${r.scanHint}<br>${r.blueController}</span>
              ${m(i,80)}
            </div>
          </div>
        </header>

        ${n.gameOver?`
          <div class="gameover-banner gameover-banner--${n.winner}">
            ${r.wins} ${n.winner.toUpperCase()}!
          </div>
        `:""}

        <div class="main-grid">
          ${n.cells.map(v=>`
            <div class="main-cell ${G(v)}">
              <span>${v.word}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `,U(e);const g=C(),d=document.createElement("button");d.className="sign-out-btn",d.textContent=t.email,d.addEventListener("click",async()=>{s==null||s.leave(),await I(),f()}),g.prepend(d),e.querySelector(".app").appendChild(g),s&&S(s.getPresenceState(),a),requestAnimationFrame(()=>D(e))}k();const p=await N();if(!p){f();return}o=await j(p.id),s=F(o),s.listen(),s.onChange(n=>{var a,r;const t=((a=l==null?void 0:l.getState())==null?void 0:a.language)||b;(r=e.querySelector(".presence-modal"))==null||r.remove(),e.querySelector(".app")&&(l!=null&&l.getState())&&S(n,t)}),l=H(o),await l.init(),l.subscribe(n=>{if(!n){E(p);return}A(n,p)});const M=l.getState();M?A(M,p):E(p)}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#app");e&&z(e)});
