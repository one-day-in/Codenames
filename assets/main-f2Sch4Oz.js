import{s as m,t as u,A as L,g as T,a as B,L as M,R as _,D as E,c as U,b as O}from"./presence-BKNTbHni.js";import{f as R}from"./fitText-DhGiXhRH.js";async function D(){const{data:{user:a}}=await m.auth.getUser();return a}async function F(){const{error:a}=await m.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});a&&console.error("Auth error:",a)}async function H(){await m.auth.signOut()}async function x(a){const{data:o}=await m.from("rooms").select("id, guest_token").eq("owner_id",a).maybeSingle();if(o)return o;const g=W(),{data:l}=await m.from("rooms").insert({id:g,owner_id:a}).select("id, guest_token").single();return l}function W(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}async function j(a){let o=null,g=null,l=null,c=null;function A(){const{origin:e,pathname:n}=window.location;return e+n.split("?")[0].replace(/\/[^/]*$/,"")}function k(e,n=120){return`<img class="qr-image"
            src="https://api.qrserver.com/v1/create-qr-code/?size=${n}x${n}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(e)}"
            width="${n}" height="${n}" />`}function p(e,n){return`${A()}/${e}.html?room=${o}&token=${g}&team=${n}`}function N(){const e=document.createElement("button");return e.className="fullscreen-btn",e.innerHTML="⛶",e.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{e.innerHTML=document.fullscreenElement?"✕":"⛶"}),e}function f(e){const n=document.createElement("footer");if(n.className="app-footer",e){const t=document.createElement("button");t.className="sign-out-btn",t.textContent=e.email,t.addEventListener("click",async()=>{c==null||c.leave(),await H(),w()}),n.appendChild(t)}return n.appendChild(N()),n}function q(e){return`
            <div class="lang-toggle">
                ${M.map(n=>`
                    <button class="lang-toggle__btn ${n.code===e?"lang-toggle__btn--active":""}"
                            data-lang="${n.code}">${n.label}</button>
                `).join("")}
            </div>`}function S(e){e.querySelectorAll(".lang-toggle__btn").forEach(n=>{n.addEventListener("click",()=>l.setLanguage(n.dataset.lang))})}function $(e,n){const t=u(n);return`
            <div class="qr-panel">
                ${[{team:"dissonant",title:t.dissonant,cards:[{role:_.GUIDE_DISSONANT,url:p("mini","dissonant"),label:t.guide},{role:_.WALKER_DISSONANT,url:p("controller","dissonant"),label:t.dreamwalker}]},{team:"resonant",title:t.resonant,cards:[{role:_.GUIDE_RESONANT,url:p("mini","resonant"),label:t.guide},{role:_.WALKER_RESONANT,url:p("controller","resonant"),label:t.dreamwalker}]}].map(i=>`
                    <div class="qr-panel__group qr-panel__group--${i.team}">
                        <p class="qr-panel__group-title">${i.title}</p>
                        <div class="qr-panel__group-cards">
                            ${i.cards.map(r=>`
                                <div class="qr-panel__block ${e[r.role]?"qr-panel__block--connected":""}">
                                    <div class="qr-wrapper">${k(r.url,130)}</div>
                                    <p class="qr-panel__label">${r.label}</p>
                                    ${e[r.role]?'<div class="qr-panel__check">✓</div>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>`}function C(){document.body.className="",a.innerHTML=`
            <div class="app">
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>
                    <p class="waiting-screen__hint">${u(E).loading}</p>
                </div>
            </div>`}function w(){document.body.className="",a.innerHTML=`
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
                        ${u(E).signIn}
                    </button>
                </div>
            </div>`,document.getElementById("googleSignInBtn").addEventListener("click",F)}function G(e,n,t){var r;const d=u(t),i=L.every(v=>n[v]);document.body.className="",a.innerHTML=`
            <div class="app">
                ${q(t)}
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">NightWalkers</h1>
                    ${$(n,t)}
                    <button class="lobby__btn lobby__btn--newgame ${i?"":"lobby__btn--disabled"}"
                            id="newGameBtn" ${i?"":"disabled"}>
                        ${d.newGame}
                    </button>
                </div>
            </div>`,S(a),a.querySelector(".app").appendChild(f(e)),(r=document.getElementById("newGameBtn"))==null||r.addEventListener("click",()=>l.createGame())}function I(e,n,t,d){var v;const i=u(d),r=e.turn;if(document.body.className=`team-${r.team}`,a.innerHTML=`
            <div class="app">
                <header class="header">
                    <div class="header__center">
                        <span class="header__team-label">
                            ${r.team==="resonant"?i.resonant:i.dissonant}
                        </span>
                        ${r.guideLimit!==null?`<span class="header__moves">${r.guideLimit-r.dreamwalkerMoves} ${i.movesLeft}</span>`:`<span class="header__moves header__moves--waiting">${i.waitingGuide}</span>`}
                    </div>
                    <button class="header__new-game-btn" id="newGameBtn">${i.newGame}</button>
                </header>

                ${e.gameOver?`
                    <div class="gameover-banner gameover-banner--${e.winner}">
                        ${T(e.winner,d)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(s=>`
                        <div class="main-cell ${B(s)}">
                            <span>${s.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,a.querySelector(".app").appendChild(f(n)),!L.every(s=>t[s])){const s=document.createElement("div");s.className="presence-overlay",s.innerHTML=$(t,d),a.querySelector(".app").appendChild(s)}(v=document.getElementById("newGameBtn"))==null||v.addEventListener("click",()=>l.createGame()),requestAnimationFrame(()=>R(a))}C();const b=await D();if(!b){w();return}const y=await x(b.id);o=y.id,g=y.guest_token,c=U(o),c.listen(),l=O(o),await l.init();function h(){const e=l.getState(),n=l.getLanguage(),t=c.getPresenceState();if(!e){G(b,t,n);return}I(e,b,t,n)}l.subscribe(h),c.onChange(h),h()}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("#app");a&&j(a)});
