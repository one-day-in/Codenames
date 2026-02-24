import{s as g,t as m,D as u,A as L,g as S,a as C,L as I,R as v,c as B,b as T}from"./presence-i8yqKOzs.js";import{f as M}from"./fitText-DhGiXhRH.js";async function U(){const{data:{user:t}}=await g.auth.getUser();return t}async function O(){const{error:t}=await g.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});t&&console.error("Auth error:",t)}async function R(){await g.auth.signOut()}async function D(t){const{data:o}=await g.from("games").select("id").eq("owner_id",t).maybeSingle();if(o)return o.id;const i=W();return await g.from("games").insert({id:i,owner_id:t,state:null}),i}function W(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}async function F(t){let o=null,i=null,d=null;function E(){const{origin:e,pathname:n}=window.location;return e+n.split("?")[0].replace(/\/[^/]*$/,"")}function A(e,n=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${n}x${n}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(e)}" width="${n}" height="${n}" />`}function N(){const e=document.createElement("button");return e.className="fullscreen-btn",e.innerHTML="⛶",e.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{e.innerHTML=document.fullscreenElement?"✕":"⛶"}),e}function h(e){const n=document.createElement("footer");if(n.className="app-footer",e){const a=document.createElement("button");a.className="sign-out-btn",a.textContent=e.email,a.addEventListener("click",async()=>{d==null||d.leave(),await R(),y()}),n.appendChild(a)}return n.appendChild(N()),n}function f(e){return`
            <div class="lang-toggle">
                ${I.map(n=>`
                    <button class="lang-toggle__btn ${n.code===e?"lang-toggle__btn--active":""}"
                            data-lang="${n.code}">${n.label}</button>
                `).join("")}
            </div>`}function $(e){e.querySelectorAll(".lang-toggle__btn").forEach(n=>{n.addEventListener("click",()=>i==null?void 0:i.setLanguage(n.dataset.lang))})}function w(e,n){const a=m(n),r=E();return`
            <div class="qr-panel">
                ${[{role:v.WALKER_DISSONANT,url:`${r}/controller.html?room=${o}&team=dissonant`,label:a.connectWalkerDissonant,cls:"qr-panel__block--dissonant"},{role:v.GUIDE_DISSONANT,url:`${r}/mini.html?room=${o}&team=dissonant`,label:a.connectGuideDissonant,cls:"qr-panel__block--dissonant"},{role:v.GUIDE_RESONANT,url:`${r}/mini.html?room=${o}&team=resonant`,label:a.connectGuideResonant,cls:"qr-panel__block--resonant"},{role:v.WALKER_RESONANT,url:`${r}/controller.html?room=${o}&team=resonant`,label:a.connectWalkerResonant,cls:"qr-panel__block--resonant"}].map(l=>`
                    <div class="qr-panel__block ${l.cls} ${e[l.role]?"qr-panel__block--connected":""}">
                        <div class="qr-wrapper">${A(l.url,140)}</div>
                        <p class="qr-panel__label">${l.label}</p>
                        ${e[l.role]?'<div class="qr-panel__check">✓</div>':""}
                    </div>
                `).join("")}
            </div>`}function k(){document.body.className="",t.innerHTML=`
            <div class="app">
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>
                    <p class="waiting-screen__hint">${m(u).loading}</p>
                </div>
            </div>`}function y(){document.body.className="",t.innerHTML=`
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
                        ${m(u).signIn}
                    </button>
                </div>
            </div>`,document.getElementById("googleSignInBtn").addEventListener("click",O)}function q(e,n,a=u){var l;const r=m(a),s=L.every(b=>n[b]);document.body.className="",t.innerHTML=`
            <div class="app">
                ${f(a)}
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">NightWalkers</h1>
                    ${w(n,a)}
                    <button class="lobby__btn lobby__btn--newgame ${s?"":"lobby__btn--disabled"}"
                            id="newGameBtn" ${s?"":"disabled"}>
                        ${r.newGame}
                    </button>
                </div>
            </div>`,$(t),t.querySelector(".app").appendChild(h(e)),(l=document.getElementById("newGameBtn"))==null||l.addEventListener("click",()=>{i.createGame(a)})}function G(e,n,a){var b;const r=e.language||u,s=m(r),l=e.turn;if(document.body.className=`team-${l.team}`,t.innerHTML=`
            <div class="app">
                ${f(r)}
                <header class="header">
                    <div class="header__center">
                        <span class="header__team-label">${l.team==="resonant"?s.resonant:s.dissonant}</span>
                        ${l.guideLimit!==null?`<span class="header__moves">${l.guideLimit-l.dreamwalkerMoves} ${s.movesLeft}</span>`:`<span class="header__moves header__moves--waiting">${s.waitingGuide}</span>`}
                    </div>
                    <button class="header__new-game-btn" id="newGameBtn">${s.newGame}</button>
                </header>

                ${e.gameOver?`
                    <div class="gameover-banner gameover-banner--${e.winner}">
                        ${S(e.winner,r)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(c=>`
                        <div class="main-cell ${C(c)}">
                            <span>${c.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,$(t),t.querySelector(".app").appendChild(h(n)),!L.every(c=>a[c])){const c=document.createElement("div");c.className="presence-overlay",c.innerHTML=w(a,r),t.querySelector(".app").appendChild(c)}(b=document.getElementById("newGameBtn"))==null||b.addEventListener("click",()=>{i.createGame(r)}),requestAnimationFrame(()=>M(t))}k();const p=await U();if(!p){y();return}o=await D(p.id),d=B(o),d.listen(),i=T(o),await i.init();function _(){const e=i.getState(),n=d.getPresenceState(),a=(e==null?void 0:e.language)||u;if(!e){q(p,n,a);return}G(e,p,n)}d.onChange(()=>_()),i.subscribe(()=>_()),_()}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&F(t)});
