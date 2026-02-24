import{s as v,c as F,D as p,t as g,L as H,a as k}from"./presence-h-CyODlV.js";import{f as x}from"./fitText-DhGiXhRH.js";import{g as O}from"./renderCell-BLtbsjKK.js";async function D(){const{data:{user:t}}=await v.auth.getUser();return t}async function G(){const{error:t}=await v.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});t&&console.error("Auth error:",t)}async function N(){await v.auth.signOut()}async function R(t){const{data:l}=await v.from("games").select("id").eq("owner_id",t).maybeSingle();if(l)return l.id;const r=j();return await v.from("games").insert({id:r,owner_id:t,state:null}),r}function j(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}async function P(t){let l=null,r=null,o=null;function _(){const{origin:e,pathname:n}=window.location,a=n.split("?")[0].replace(/\/[^/]*$/,"")||"";return e+a}function i(e,n=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${n}x${n}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(e)}" width="${n}" height="${n}" />`}function A(){const e=document.createElement("button");return e.className="fullscreen-btn",e.innerHTML="⛶",e.title="Fullscreen",e.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{e.innerHTML=document.fullscreenElement?"✕":"⛶"}),e}function B(e){const n=document.createElement("button");return n.className="sign-out-btn",n.textContent=e.email,n.addEventListener("click",async()=>{o==null||o.leave(),await N(),C()}),n}function y(e){const n=document.createElement("footer");return n.className="app-footer",e&&n.appendChild(B(e)),n.appendChild(A()),n}function w(e){return`
            <div class="lang-toggle">
                ${H.map(n=>`
                    <button class="lang-toggle__btn ${n.code===e?"lang-toggle__btn--active":""}"
                            data-lang="${n.code}">${n.label}</button>
                `).join("")}
            </div>
        `}function L(e){e.querySelectorAll(".lang-toggle__btn").forEach(n=>{n.addEventListener("click",()=>r.setLanguage(n.dataset.lang))})}function q(e,n){var M,T;(M=t.querySelector(".presence-modal"))==null||M.remove();const a=g(n),c=_(),{mini:s,"controller-red":b,"controller-blue":h}=e;if(s&&b&&h)return;let m="";if(s){const u=[];if(!b){const $=`${c}/controller.html?room=${l}&team=red`;u.push(`
                    <div class="presence-modal__qr-block">
                        <div class="qr-wrapper">${i($,140)}</div>
                        <p class="presence-modal__label presence-modal__label--red">RED ${a.redController}</p>
                    </div>`)}if(!h){const $=`${c}/controller.html?room=${l}&team=blue`;u.push(`
                    <div class="presence-modal__qr-block">
                        <div class="qr-wrapper">${i($,140)}</div>
                        <p class="presence-modal__label presence-modal__label--blue">BLUE ${a.blueController}</p>
                    </div>`)}m=`
                <p class="presence-modal__title">${a.connectControllers}</p>
                <div class="presence-modal__qrs">${u.join("")}</div>`}else{const u=`${c}/mini.html?room=${l}`;m=`
                <div class="presence-modal__qr-block">
                    <div class="qr-wrapper">${i(u,180)}</div>
                    <p class="presence-modal__label">${a.connectMini}</p>
                </div>`}const f=document.createElement("div");f.className="presence-modal",f.innerHTML=`<div class="presence-modal__box">${m}</div>`,(T=t.querySelector(".app"))==null||T.appendChild(f)}function I(){document.body.classList.remove("team-red","team-blue"),t.innerHTML=`
            <div class="app">
                <div class="lobby-screen">
                    <h1 class="lobby__title">Codenames</h1>
                    <p class="waiting-screen__hint">${g(p).loading}</p>
                </div>
            </div>`}function C(){document.body.classList.remove("team-red","team-blue"),t.innerHTML=`
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
                        ${g(p).signIn}
                    </button>
                </div>
            </div>`,document.getElementById("googleSignInBtn").addEventListener("click",G)}function U(e,n=p){const a=g(n),s=`${_()}/mini.html?room=${l}`;document.body.classList.remove("team-red","team-blue"),t.innerHTML=`
            <div class="app">
                ${w(n)}
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">Codenames</h1>
                    <div class="qr-container">
                        <div class="qr-wrapper">${i(s,280)}</div>
                        <div class="qr-scan-hint">${a.scanToStart}</div>
                        <p class="qr-url">${s}</p>
                    </div>
                </div>
            </div>`,L(t),t.querySelector(".app").appendChild(y(e))}function E(e,n){const a=e.language||p,c=g(a),s=_(),b=`${s}/controller.html?room=${l}&team=red`,h=`${s}/controller.html?room=${l}&team=blue`;document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`),t.innerHTML=`
            <div class="app">
                ${w(a)}
                <header class="header">
                    <div class="header__corner header__corner--left">
                        <div class="header__controller-qr">
                            ${i(b,80)}
                            <span class="header__controller-hint">${c.scanHint}<br>${c.redController}</span>
                        </div>
                    </div>
                    <div class="header__center">
                        <span class="header__team-label">${c.team}</span>
                        <div class="header__team">${e.activeTeam.toUpperCase()}</div>
                    </div>
                    <div class="header__corner header__corner--right">
                        <div class="header__controller-qr">
                            <span class="header__controller-hint">${c.scanHint}<br>${c.blueController}</span>
                            ${i(h,80)}
                        </div>
                    </div>
                </header>

                ${e.gameOver?`
                    <div class="gameover-banner gameover-banner--${e.winner}">
                        ${c.wins} ${e.winner.toUpperCase()}!
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(m=>`
                        <div class="main-cell ${O(m)}">
                            <span>${m.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,L(t),t.querySelector(".app").appendChild(y(n)),o&&q(o.getPresenceState(),a),requestAnimationFrame(()=>x(t))}I();const d=await D();if(!d){C();return}l=await R(d.id),o=k(l),o.listen(),o.onChange(e=>{var a;const n=((a=r==null?void 0:r.getState())==null?void 0:a.language)||p;t.querySelector(".app")&&(r!=null&&r.getState())&&q(e,n)}),r=F(l),await r.init(),r.subscribe(e=>{if(!e){U(d);return}E(e,d)});const S=r.getState();S?E(S,d):U(d)}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&P(t)});
