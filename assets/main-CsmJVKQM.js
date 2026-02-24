import{s as p,t as m,D as g,A,g as C,a as G,L as I,R as v,c as T,b as B}from"./presence-DELJsw60.js";function M(t,l=.85,i=.45){const r=t.querySelector("span");if(!r)return;r.style.whiteSpace="nowrap";const _=t.clientWidth*l;let u=t.clientHeight*i;for(r.style.fontSize=u+"px";r.scrollWidth>_&&u>6;)u-=.5,r.style.fontSize=u+"px"}function U(t){t.querySelectorAll(".main-cell, .controller__cell, .mini-cell").forEach(l=>M(l))}async function O(){const{data:{user:t}}=await p.auth.getUser();return t}async function W(){const{error:t}=await p.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});t&&console.error("Auth error:",t)}async function R(){await p.auth.signOut()}async function x(t){const{data:l}=await p.from("games").select("id").eq("owner_id",t).maybeSingle();if(l)return l.id;const i=D();return await p.from("games").insert({id:i,owner_id:t,state:null}),i}function D(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}async function F(t){let l=null,i=null,r=null;function _(){const{origin:e,pathname:n}=window.location;return e+n.split("?")[0].replace(/\/[^/]*$/,"")}function u(e,n=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${n}x${n}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(e)}" width="${n}" height="${n}" />`}function S(){const e=document.createElement("button");return e.className="fullscreen-btn",e.innerHTML="⛶",e.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{e.innerHTML=document.fullscreenElement?"✕":"⛶"}),e}function $(e){const n=document.createElement("footer");if(n.className="app-footer",e){const a=document.createElement("button");a.className="sign-out-btn",a.textContent=e.email,a.addEventListener("click",async()=>{r==null||r.leave(),await R(),E()}),n.appendChild(a)}return n.appendChild(S()),n}function y(e){return`
            <div class="lang-toggle">
                ${I.map(n=>`
                    <button class="lang-toggle__btn ${n.code===e?"lang-toggle__btn--active":""}"
                            data-lang="${n.code}">${n.label}</button>
                `).join("")}
            </div>`}function w(e){e.querySelectorAll(".lang-toggle__btn").forEach(n=>{n.addEventListener("click",()=>i==null?void 0:i.setLanguage(n.dataset.lang))})}function L(e,n){const a=m(n),s=_();return`
            <div class="qr-panel">
                ${[{role:v.WALKER_DISSONANT,url:`${s}/controller.html?room=${l}&team=dissonant`,label:a.connectWalkerDissonant,cls:"qr-panel__block--dissonant"},{role:v.GUIDE_DISSONANT,url:`${s}/mini.html?room=${l}&team=dissonant`,label:a.connectGuideDissonant,cls:"qr-panel__block--dissonant"},{role:v.GUIDE_RESONANT,url:`${s}/mini.html?room=${l}&team=resonant`,label:a.connectGuideResonant,cls:"qr-panel__block--resonant"},{role:v.WALKER_RESONANT,url:`${s}/controller.html?room=${l}&team=resonant`,label:a.connectWalkerResonant,cls:"qr-panel__block--resonant"}].map(o=>`
                    <div class="qr-panel__block ${o.cls} ${e[o.role]?"qr-panel__block--connected":""}">
                        <div class="qr-wrapper">${u(o.url,140)}</div>
                        <p class="qr-panel__label">${o.label}</p>
                        ${e[o.role]?'<div class="qr-panel__check">✓</div>':""}
                    </div>
                `).join("")}
            </div>`}function N(){document.body.className="",t.innerHTML=`
            <div class="app">
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>
                    <p class="waiting-screen__hint">${m(g).loading}</p>
                </div>
            </div>`}function E(){document.body.className="",t.innerHTML=`
            <div class="app">
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>
                    <button class="lobby__btn lobby__btn--google" id="googleSignInBtn">
                        <svg width="20" height="20" viewBox="0 0 48 48" style="margin-right:10px;vertical-align:middle">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                        ${m(g).signIn}
                    </button>
                </div>
            </div>`,document.getElementById("googleSignInBtn").addEventListener("click",W)}function k(e,n,a=g){var o;const s=m(a),c=A.every(h=>n[h]);document.body.className="",t.innerHTML=`
            <div class="app">
                ${y(a)}
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">NightWalkers</h1>
                    ${L(n,a)}
                    <button class="lobby__btn lobby__btn--newgame ${c?"":"lobby__btn--disabled"}"
                            id="newGameBtn" ${c?"":"disabled"}>
                        ${s.newGame}
                    </button>
                </div>
            </div>`,w(t),t.querySelector(".app").appendChild($(e)),(o=document.getElementById("newGameBtn"))==null||o.addEventListener("click",()=>{i.createGame(a)})}function q(e,n,a){var h;const s=e.language||g,c=m(s),o=e.turn;if(document.body.className=`team-${o.team}`,t.innerHTML=`
            <div class="app">
                ${y(s)}
                <header class="header">
                    <div class="header__center">
                        <span class="header__team-label">${o.team==="resonant"?c.resonant:c.dissonant}</span>
                        ${o.guideLimit!==null?`<span class="header__moves">${o.guideLimit-o.dreamwalkerMoves} ${c.movesLeft}</span>`:`<span class="header__moves header__moves--waiting">${c.waitingGuide}</span>`}
                    </div>
                    <button class="header__new-game-btn" id="newGameBtn">${c.newGame}</button>
                </header>

                ${e.gameOver?`
                    <div class="gameover-banner gameover-banner--${e.winner}">
                        ${C(e.winner,s)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(d=>`
                        <div class="main-cell ${G(d)}">
                            <span>${d.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,w(t),t.querySelector(".app").appendChild($(n)),!A.every(d=>a[d])){const d=document.createElement("div");d.className="presence-overlay",d.innerHTML=L(a,s),t.querySelector(".app").appendChild(d)}(h=document.getElementById("newGameBtn"))==null||h.addEventListener("click",()=>{i.createGame(s)}),requestAnimationFrame(()=>U(t))}N();const b=await O();if(!b){E();return}l=await x(b.id),r=T(l),r.listen(),i=B(l),await i.init();function f(){const e=i.getState(),n=r.getPresenceState(),a=(e==null?void 0:e.language)||g;if(!e){k(b,n,a);return}q(e,b,n)}r.onChange(()=>f()),i.subscribe(()=>f()),f()}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&F(t)});
