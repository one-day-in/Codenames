import{_ as A}from"./entry-Ct80tB_C.js";import{k as R,c as T,g as B}from"./keepAlive-CwTVj7YU.js";import{f as G}from"./fitText-DhGiXhRH.js";import{R as c,c as M,A as f}from"./presence-JaBJnldC.js";import{t as d,g as C,D as I}from"./i18n-pkrfkOVn.js";import{a as O,g as m}from"./url-DMe9pim_.js";function x(s,l=130){return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${l}x${l}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(s)}"
        width="${l}" height="${l}" />`}async function W(s){const{roomId:l,token:h}=O();if(!l||!h){window.location.href=m()+"/index.html";return}s.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">NightWalkers</h1>
                <p class="waiting-screen__hint">${d(I).loading}</p>
            </div>
        </div>`;const u=M(l);u.listen(),R(u,null);const o=T(l);if(await o.init(),!o.getState()){window.location.href=m()+"/index.html";return}if(new URLSearchParams(window.location.search).get("dev")==="1"){const{supabase:e}=await A(async()=>{const{supabase:a}=await import("./url-DMe9pim_.js").then(n=>n.b);return{supabase:a}},[]);for(const a of[c.GUIDE_RESONANT,c.WALKER_RESONANT]){const n=e.channel("presence-"+l,{config:{presence:{key:a}}});n.subscribe(async r=>{r==="SUBSCRIBED"&&await n.track({role:a})})}}let _=!1;function g(e,a){return`${m()}/${e}.html?room=${l}&token=${h}&team=${a}`}function b(){const e=document.createElement("footer");e.className="app-footer";const a=document.createElement("button");a.className="sign-out-btn",a.textContent="← Home",a.addEventListener("click",()=>{window.location.href=m()+"/index.html"});const n=document.createElement("button");return n.className="fullscreen-btn",n.innerHTML="⛶",n.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{n.innerHTML=document.fullscreenElement?"✕":"⛶"}),e.appendChild(a),e.appendChild(n),e}function w(e,a){const n=d(a);return`
            <div class="qr-panel">
                ${[{team:"dissonant",title:n.dissonant,cards:[{role:c.GUIDE_DISSONANT,url:g("guide","dissonant"),label:n.guide},{role:c.WALKER_DISSONANT,url:g("walker","dissonant"),label:n.dreamwalker}]},{team:"resonant",title:n.resonant,cards:[{role:c.GUIDE_RESONANT,url:g("guide","resonant"),label:n.guide},{role:c.WALKER_RESONANT,url:g("walker","resonant"),label:n.dreamwalker}]}].map(t=>`
                    <div class="qr-panel__group qr-panel__group--${t.team}">
                        <p class="qr-panel__group-title">${t.title}</p>
                        <div class="qr-panel__group-cards">
                            ${t.cards.map(i=>`
                                <div class="qr-panel__block ${e[i.role]?"qr-panel__block--connected":""}">
                                    <div class="qr-wrapper">${x(i.url)}</div>
                                    <p class="qr-panel__label">${i.label}</p>
                                    ${e[i.role]?'<div class="qr-panel__check">✓</div>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>`}function $(){var i,p,q,L;(i=s.querySelector(".qr-modal"))==null||i.remove();const e=u.getPresenceState(),a=o.getLanguage(),n=f.filter(N=>e[N]).length,r=d(a),t=document.createElement("div");t.className="qr-modal",t.innerHTML=`
            <div class="qr-modal__backdrop"></div>
            <div class="qr-modal__content">
                <button class="qr-modal__close" id="qrModalClose">✕</button>
                ${w(e,a)}
                <p class="waiting-screen__hint">${n} / 4 ${r.waitingPlayers}</p>
            </div>`,(p=s.querySelector(".app"))==null||p.appendChild(t),(q=document.getElementById("qrModalClose"))==null||q.addEventListener("click",E),(L=t.querySelector(".qr-modal__backdrop"))==null||L.addEventListener("click",E)}function y(){_=!0,$()}function E(){var e;_=!1,(e=s.querySelector(".qr-modal"))==null||e.remove()}function k(e,a){const n=d(a),r=f.filter(t=>e[t]).length;document.body.className="",s.innerHTML=`
            <div class="app">
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">NightWalkers</h1>
                    ${w(e,a)}
                    <p class="waiting-screen__hint">${r} / 4 ${n.waitingPlayers}</p>
                </div>
            </div>`,s.querySelector(".app").appendChild(b())}function S(e,a){var t,i;const n=d(a),r=e.turn;document.body.className=`team-${r.team}`,s.innerHTML=`
            <div class="app">
                <header class="header">
                    <button class="header__players-btn" id="playersBtn">👥</button>
                    <div class="header__center">
                        <span class="header__team-label">
                            ${r.team==="resonant"?n.resonant:n.dissonant}
                        </span>
                        ${r.guideLimit!==null?`<span class="header__moves">${r.guideLimit-r.dreamwalkerMoves} ${n.movesLeft}</span>`:`<span class="header__moves header__moves--waiting">${n.waitingGuide}</span>`}
                    </div>
                    <button class="header__new-game-btn" id="newGameBtn">${n.newGame}</button>
                </header>

                ${e.gameOver?`
                    <div class="gameover-banner gameover-banner--${e.winner}">
                        ${C(e.winner,a)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(p=>`
                        <div class="main-cell ${B(p)}">
                            <span>${p.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,s.querySelector(".app").appendChild(b()),(t=document.getElementById("playersBtn"))==null||t.addEventListener("click",y),(i=document.getElementById("newGameBtn"))==null||i.addEventListener("click",async()=>{confirm(d(o.getLanguage()).confirmNewGame)&&(await o.resetGame(),window.location.href=m()+"/index.html")}),_&&$(),requestAnimationFrame(()=>G(s))}function v(){const e=o.getState(),a=o.getLanguage(),n=u.getPresenceState(),r=f.every(t=>n[t]);if(!e){window.location.href=m()+"/index.html";return}if(e.phase==="lobby"){if(r){o.startGame();return}k(n,a);return}S(e,a)}o.subscribe(v),u.onChange(v),v()}export{W as initGame};
