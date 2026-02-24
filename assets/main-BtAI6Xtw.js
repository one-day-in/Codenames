import{s as g,D as k,k as T,t as u,A as y,L as B,g as M,a as U,R as b,c as O,b as H}from"./keepAlive-JCSCQkeA.js";import{f as R}from"./fitText-DhGiXhRH.js";async function D(){const{data:{user:a}}=await g.auth.getUser();return a}async function F(){const{error:a}=await g.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});a&&console.error("Auth error:",a)}async function W(){await g.auth.signOut()}async function x(a){const{data:d}=await g.from("rooms").select("id, guest_token").eq("owner_id",a).maybeSingle();if(d)return d;const p=j(),{data:s}=await g.from("rooms").insert({id:p,owner_id:a}).select("id, guest_token").single();return s}function j(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}async function P(a){let d=null,p=null,s=null,o=null;function A(){const{origin:e,pathname:n}=window.location;return e+n.split("?")[0].replace(/\/[^/]*$/,"")}function N(e,n=120){return`<img class="qr-image"
            src="https://api.qrserver.com/v1/create-qr-code/?size=${n}x${n}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(e)}"
            width="${n}" height="${n}" />`}function v(e,n){return`${A()}/${e}.html?room=${d}&token=${p}&team=${n}`}function q(){const e=document.createElement("button");return e.className="fullscreen-btn",e.innerHTML="⛶",e.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{e.innerHTML=document.fullscreenElement?"✕":"⛶"}),e}function _(e){const n=document.createElement("footer");if(n.className="app-footer",e){const t=document.createElement("button");t.className="sign-out-btn",t.textContent=e.email,t.addEventListener("click",async()=>{o==null||o.leave(),await W(),h()}),n.appendChild(t)}return n.appendChild(q()),n}function w(e){return`
            <div class="lang-toggle">
                ${B.map(n=>`
                    <button class="lang-toggle__btn ${n.code===e?"lang-toggle__btn--active":""}"
                            data-lang="${n.code}">${n.label}</button>
                `).join("")}
            </div>`}function $(e,n){const t=u(n);return`
            <div class="qr-panel">
                ${[{team:"dissonant",title:t.dissonant,cards:[{role:b.GUIDE_DISSONANT,url:v("mini","dissonant"),label:t.guide},{role:b.WALKER_DISSONANT,url:v("controller","dissonant"),label:t.dreamwalker}]},{team:"resonant",title:t.resonant,cards:[{role:b.GUIDE_RESONANT,url:v("mini","resonant"),label:t.guide},{role:b.WALKER_RESONANT,url:v("controller","resonant"),label:t.dreamwalker}]}].map(r=>`
                    <div class="qr-panel__group qr-panel__group--${r.team}">
                        <p class="qr-panel__group-title">${r.title}</p>
                        <div class="qr-panel__group-cards">
                            ${r.cards.map(l=>`
                                <div class="qr-panel__block ${e[l.role]?"qr-panel__block--connected":""}">
                                    <div class="qr-wrapper">${N(l.url,130)}</div>
                                    <p class="qr-panel__label">${l.label}</p>
                                    ${e[l.role]?'<div class="qr-panel__check">✓</div>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>`}function S(){document.body.className="",a.innerHTML=`
            <div class="app">
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>
                    <p class="waiting-screen__hint">${u(k).loading}</p>
                </div>
            </div>`}function h(e=k){const n=u(e);document.body.className="",a.innerHTML=`
            <div class="app">
                ${w(e)}
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>
                    <button class="lobby__btn lobby__btn--google" id="googleSignInBtn">
                        <svg width="20" height="20" viewBox="0 0 48 48" style="margin-right:10px;vertical-align:middle">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                        ${n.signIn}
                    </button>
                </div>
            </div>`,a.querySelectorAll(".lang-toggle__btn").forEach(t=>{t.addEventListener("click",()=>h(t.dataset.lang))}),document.getElementById("googleSignInBtn").addEventListener("click",F)}function G(e,n){const t=u(n);document.body.className="",a.innerHTML=`
            <div class="app">
                ${w(n)}
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>
                    <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                        ${t.newGame}
                    </button>
                </div>
            </div>`,a.querySelectorAll(".lang-toggle__btn").forEach(i=>{i.addEventListener("click",()=>s.setLanguage(i.dataset.lang))}),a.querySelector(".app").appendChild(_(e)),document.getElementById("newGameBtn").addEventListener("click",()=>s.createGame())}function C(e,n,t){const i=u(t),r=y.filter(l=>n[l]).length;document.body.className="",a.innerHTML=`
            <div class="app">
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">NightWalkers</h1>
                    ${$(n,t)}
                    <p class="waiting-screen__hint">${r} / 4 ${i.waitingPlayers}</p>
                </div>
            </div>`,a.querySelector(".app").appendChild(_(e))}function I(e,n,t,i){var E;const r=u(i),l=e.turn;if(document.body.className=`team-${l.team}`,a.innerHTML=`
            <div class="app">
                <header class="header">
                    <div class="header__center">
                        <span class="header__team-label">
                            ${l.team==="resonant"?r.resonant:r.dissonant}
                        </span>
                        ${l.guideLimit!==null?`<span class="header__moves">${l.guideLimit-l.dreamwalkerMoves} ${r.movesLeft}</span>`:`<span class="header__moves header__moves--waiting">${r.waitingGuide}</span>`}
                    </div>
                    <button class="header__new-game-btn" id="newGameBtn">${r.newGame}</button>
                </header>

                ${e.gameOver?`
                    <div class="gameover-banner gameover-banner--${e.winner}">
                        ${M(e.winner,i)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(c=>`
                        <div class="main-cell ${U(c)}">
                            <span>${c.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,a.querySelector(".app").appendChild(_(n)),!y.every(c=>t[c])){const c=document.createElement("div");c.className="presence-overlay",c.innerHTML=$(t,i),a.querySelector(".app").appendChild(c)}(E=document.getElementById("newGameBtn"))==null||E.addEventListener("click",()=>{confirm(r.confirmNewGame??"Скинути поточну гру?")&&s.createGame()}),requestAnimationFrame(()=>R(a))}function f(e){const n=s.getState(),t=s.getLanguage(),i=o.getPresenceState(),r=y.every(l=>i[l]);if(!n){G(e,t);return}if(n.phase==="lobby"){if(r){s.startGame();return}C(e,i,t);return}I(n,e,i,t)}S();const m=await D();if(!m){h();return}const L=await x(m.id);d=L.id,p=L.guest_token,o=O(d),o.listen(),T(o,null),s=H(d),await s.init(),s.subscribe(()=>f(m)),o.onChange(()=>f(m)),f(m)}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("#app");a&&P(a)});
