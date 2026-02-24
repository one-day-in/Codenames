import{s as p,t as g,A as w,g as I,a as T,L as k,R as v,D as L,c as G,b as B}from"./presence-POag23zp.js";function M(t,l=.85,r=.45){const i=t.querySelector("span");if(!i)return;i.style.whiteSpace="nowrap";const h=t.clientWidth*l;let m=t.clientHeight*r;for(i.style.fontSize=m+"px";i.scrollWidth>h&&m>6;)m-=.5,i.style.fontSize=m+"px"}function U(t){t.querySelectorAll(".main-cell, .controller__cell, .mini-cell").forEach(l=>M(l))}async function O(){const{data:{user:t}}=await p.auth.getUser();return t}async function x(){const{error:t}=await p.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});t&&console.error("Auth error:",t)}async function R(){await p.auth.signOut()}async function W(t){const{data:l}=await p.from("games").select("id").eq("owner_id",t).maybeSingle();if(l)return l.id;const r=D();return await p.from("games").insert({id:r,owner_id:t,state:null}),r}function D(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}async function F(t){let l=null,r=null,i=null;function h(){const{origin:e,pathname:n}=window.location;return e+n.split("?")[0].replace(/\/[^/]*$/,"")}function m(e,n=120){return`<img class="qr-image" src="https://api.qrserver.com/v1/create-qr-code/?size=${n}x${n}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(e)}" width="${n}" height="${n}" />`}function E(){const e=document.createElement("button");return e.className="fullscreen-btn",e.innerHTML="⛶",e.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{e.innerHTML=document.fullscreenElement?"✕":"⛶"}),e}function f(e){const n=document.createElement("footer");if(n.className="app-footer",e){const a=document.createElement("button");a.className="sign-out-btn",a.textContent=e.email,a.addEventListener("click",async()=>{i==null||i.leave(),await R(),y()}),n.appendChild(a)}return n.appendChild(E()),n}function A(e){return`
            <div class="lang-toggle">
                ${k.map(n=>`
                    <button class="lang-toggle__btn ${n.code===e?"lang-toggle__btn--active":""}"
                            data-lang="${n.code}">${n.label}</button>
                `).join("")}
            </div>`}function S(e){e.querySelectorAll(".lang-toggle__btn").forEach(n=>{n.addEventListener("click",()=>r.setLanguage(n.dataset.lang))})}function $(e,n){const a=g(n),s=h();return`
            <div class="qr-panel">
                ${[{team:"dissonant",title:a.dissonant,cards:[{role:v.GUIDE_DISSONANT,url:`${s}/mini.html?room=${l}&team=dissonant`,label:a.guide},{role:v.WALKER_DISSONANT,url:`${s}/controller.html?room=${l}&team=dissonant`,label:a.dreamwalker}]},{team:"resonant",title:a.resonant,cards:[{role:v.GUIDE_RESONANT,url:`${s}/mini.html?room=${l}&team=resonant`,label:a.guide},{role:v.WALKER_RESONANT,url:`${s}/controller.html?room=${l}&team=resonant`,label:a.dreamwalker}]}].map(o=>`
                    <div class="qr-panel__group qr-panel__group--${o.team}">
                        <p class="qr-panel__group-title">${o.title}</p>
                        <div class="qr-panel__group-cards">
                            ${o.cards.map(d=>`
                                <div class="qr-panel__block ${e[d.role]?"qr-panel__block--connected":""}">
                                    <div class="qr-wrapper">${m(d.url,130)}</div>
                                    <p class="qr-panel__label">${d.label}</p>
                                    ${e[d.role]?'<div class="qr-panel__check">✓</div>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>`}function q(){document.body.className="",t.innerHTML=`
            <div class="app">
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>
                    <p class="waiting-screen__hint">${g(L).loading}</p>
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
                        ${g(L).signIn}
                    </button>
                </div>
            </div>`,document.getElementById("googleSignInBtn").addEventListener("click",x)}function N(e,n,a){var o;const s=g(a),c=w.every(d=>n[d]);document.body.className="",t.innerHTML=`
            <div class="app">
                ${A(a)}
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">NightWalkers</h1>
                    ${$(n,a)}
                    <button class="lobby__btn lobby__btn--newgame ${c?"":"lobby__btn--disabled"}"
                            id="newGameBtn" ${c?"":"disabled"}>
                        ${s.newGame}
                    </button>
                </div>
            </div>`,S(t),t.querySelector(".app").appendChild(f(e)),(o=document.getElementById("newGameBtn"))==null||o.addEventListener("click",()=>r.createGame())}function C(e,n,a,s){var d;const c=g(s),o=e.turn;if(document.body.className=`team-${o.team}`,t.innerHTML=`
            <div class="app">
                <header class="header">
                    <div class="header__center">
                        <span class="header__team-label">
                            ${o.team==="resonant"?c.resonant:c.dissonant}
                        </span>
                        ${o.guideLimit!==null?`<span class="header__moves">${o.guideLimit-o.dreamwalkerMoves} ${c.movesLeft}</span>`:`<span class="header__moves header__moves--waiting">${c.waitingGuide}</span>`}
                    </div>
                    <button class="header__new-game-btn" id="newGameBtn">${c.newGame}</button>
                </header>

                ${e.gameOver?`
                    <div class="gameover-banner gameover-banner--${e.winner}">
                        ${I(e.winner,s)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(u=>`
                        <div class="main-cell ${T(u)}">
                            <span>${u.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,t.querySelector(".app").appendChild(f(n)),!w.every(u=>a[u])){const u=document.createElement("div");u.className="presence-overlay",u.innerHTML=$(a,s),t.querySelector(".app").appendChild(u)}(d=document.getElementById("newGameBtn"))==null||d.addEventListener("click",()=>r.createGame()),requestAnimationFrame(()=>U(t))}q();const b=await O();if(!b){y();return}l=await W(b.id),i=G(l),i.listen(),r=B(l),await r.init();function _(){const e=r.getState(),n=r.getLanguage(),a=i.getPresenceState();if(!e){N(b,a,n);return}C(e,b,a,n)}r.subscribe(_),i.onChange(_),_()}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&F(t)});
