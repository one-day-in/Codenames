import{s as p,t as g,A as E,g as I,a as B,L as M,R as h,D as A,c as U,b as O}from"./presence-XfPQPMfI.js";function x(t,o=.85,d=.45){const l=t.querySelector("span");if(!l)return;l.style.whiteSpace="nowrap";const s=t.clientWidth*o;let u=t.clientHeight*d;for(l.style.fontSize=u+"px";l.scrollWidth>s&&u>6;)u-=.5,l.style.fontSize=u+"px"}function R(t){t.querySelectorAll(".main-cell, .controller__cell, .mini-cell").forEach(o=>x(o))}async function W(){const{data:{user:t}}=await p.auth.getUser();return t}async function D(){const{error:t}=await p.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});t&&console.error("Auth error:",t)}async function F(){await p.auth.signOut()}async function H(t){const{data:o}=await p.from("rooms").select("id, guest_token").eq("owner_id",t).maybeSingle();if(o)return o;const d=z(),{data:l}=await p.from("rooms").insert({id:d,owner_id:t}).select("id, guest_token").single();return l}function z(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}async function j(t){let o=null,d=null,l=null,s=null;function u(){const{origin:e,pathname:n}=window.location;return e+n.split("?")[0].replace(/\/[^/]*$/,"")}function S(e,n=120){return`<img class="qr-image"
            src="https://api.qrserver.com/v1/create-qr-code/?size=${n}x${n}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(e)}"
            width="${n}" height="${n}" />`}function b(e,n){return`${u()}/${e}.html?room=${o}&token=${d}&team=${n}`}function q(){const e=document.createElement("button");return e.className="fullscreen-btn",e.innerHTML="⛶",e.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{e.innerHTML=document.fullscreenElement?"✕":"⛶"}),e}function y(e){const n=document.createElement("footer");if(n.className="app-footer",e){const a=document.createElement("button");a.className="sign-out-btn",a.textContent=e.email,a.addEventListener("click",async()=>{s==null||s.leave(),await F(),$()}),n.appendChild(a)}return n.appendChild(q()),n}function k(e){return`
            <div class="lang-toggle">
                ${M.map(n=>`
                    <button class="lang-toggle__btn ${n.code===e?"lang-toggle__btn--active":""}"
                            data-lang="${n.code}">${n.label}</button>
                `).join("")}
            </div>`}function N(e){e.querySelectorAll(".lang-toggle__btn").forEach(n=>{n.addEventListener("click",()=>l.setLanguage(n.dataset.lang))})}function w(e,n){const a=g(n);return`
            <div class="qr-panel">
                ${[{team:"dissonant",title:a.dissonant,cards:[{role:h.GUIDE_DISSONANT,url:b("mini","dissonant"),label:a.guide},{role:h.WALKER_DISSONANT,url:b("controller","dissonant"),label:a.dreamwalker}]},{team:"resonant",title:a.resonant,cards:[{role:h.GUIDE_RESONANT,url:b("mini","resonant"),label:a.guide},{role:h.WALKER_RESONANT,url:b("controller","resonant"),label:a.dreamwalker}]}].map(r=>`
                    <div class="qr-panel__group qr-panel__group--${r.team}">
                        <p class="qr-panel__group-title">${r.title}</p>
                        <div class="qr-panel__group-cards">
                            ${r.cards.map(i=>`
                                <div class="qr-panel__block ${e[i.role]?"qr-panel__block--connected":""}">
                                    <div class="qr-wrapper">${S(i.url,130)}</div>
                                    <p class="qr-panel__label">${i.label}</p>
                                    ${e[i.role]?'<div class="qr-panel__check">✓</div>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>`}function C(){document.body.className="",t.innerHTML=`
            <div class="app">
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>
                    <p class="waiting-screen__hint">${g(A).loading}</p>
                </div>
            </div>`}function $(){document.body.className="",t.innerHTML=`
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
                        ${g(A).signIn}
                    </button>
                </div>
            </div>`,document.getElementById("googleSignInBtn").addEventListener("click",D)}function T(e,n,a){var i;const m=g(a),r=E.every(_=>n[_]);document.body.className="",t.innerHTML=`
            <div class="app">
                ${k(a)}
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">NightWalkers</h1>
                    ${w(n,a)}
                    <button class="lobby__btn lobby__btn--newgame ${r?"":"lobby__btn--disabled"}"
                            id="newGameBtn" ${r?"":"disabled"}>
                        ${m.newGame}
                    </button>
                </div>
            </div>`,N(t),t.querySelector(".app").appendChild(y(e)),(i=document.getElementById("newGameBtn"))==null||i.addEventListener("click",()=>l.createGame())}function G(e,n,a,m){var _;const r=g(m),i=e.turn;if(document.body.className=`team-${i.team}`,t.innerHTML=`
            <div class="app">
                <header class="header">
                    <div class="header__center">
                        <span class="header__team-label">
                            ${i.team==="resonant"?r.resonant:r.dissonant}
                        </span>
                        ${i.guideLimit!==null?`<span class="header__moves">${i.guideLimit-i.dreamwalkerMoves} ${r.movesLeft}</span>`:`<span class="header__moves header__moves--waiting">${r.waitingGuide}</span>`}
                    </div>
                    <button class="header__new-game-btn" id="newGameBtn">${r.newGame}</button>
                </header>

                ${e.gameOver?`
                    <div class="gameover-banner gameover-banner--${e.winner}">
                        ${I(e.winner,m)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(c=>`
                        <div class="main-cell ${B(c)}">
                            <span>${c.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,t.querySelector(".app").appendChild(y(n)),!E.every(c=>a[c])){const c=document.createElement("div");c.className="presence-overlay",c.innerHTML=w(a,m),t.querySelector(".app").appendChild(c)}(_=document.getElementById("newGameBtn"))==null||_.addEventListener("click",()=>l.createGame()),requestAnimationFrame(()=>R(t))}C();const v=await W();if(!v){$();return}const L=await H(v.id);o=L.id,d=L.guest_token,s=U(o),s.listen(),l=O(o),await l.init();function f(){const e=l.getState(),n=l.getLanguage(),a=s.getPresenceState();if(!e){T(v,a,n);return}G(e,v,a,n)}l.subscribe(f),s.onChange(f),f()}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&j(t)});
