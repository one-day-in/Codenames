import{k as A,c as M,g as G}from"./keepAlive-D36XChtQ.js";import{f as B}from"./fitText-DhGiXhRH.js";import{c as C,A as h,R as g}from"./presence-BUWGs17Q.js";import{t as c,g as T,D as x}from"./i18n-pkrfkOVn.js";import{a as I,g as d}from"./url-CeekiTZl.js";function R(s,i=130){return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${i}x${i}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(s)}"
        width="${i}" height="${i}" />`}async function F(s){const{roomId:i,token:f}=I();if(!i||!f){window.location.href=d()+"/index.html";return}s.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">NightWalkers</h1>
                <p class="waiting-screen__hint">${c(x).loading}</p>
            </div>
        </div>`;const m=C(i);m.listen(),A(m,null);const o=M(i);if(await o.init(),!o.getState()){window.location.href=d()+"/index.html";return}let v=!1;function p(e,t){return`${d()}/${e}.html?room=${i}&token=${f}&team=${t}`}function b(){const e=document.createElement("footer");e.className="app-footer";const t=document.createElement("button");t.className="sign-out-btn",t.textContent="← Home",t.addEventListener("click",()=>{window.location.href=d()+"/index.html"});const n=document.createElement("button");return n.className="fullscreen-btn",n.innerHTML="⛶",n.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{n.innerHTML=document.fullscreenElement?"✕":"⛶"}),e.appendChild(t),e.appendChild(n),e}function $(e,t){const n=c(t);return`
            <div class="qr-panel">
                ${[{team:"dissonant",title:n.dissonant,cards:[{role:g.GUIDE_DISSONANT,url:p("guide","dissonant"),label:n.guide},{role:g.WALKER_DISSONANT,url:p("walker","dissonant"),label:n.dreamwalker}]},{team:"resonant",title:n.resonant,cards:[{role:g.GUIDE_RESONANT,url:p("guide","resonant"),label:n.guide},{role:g.WALKER_RESONANT,url:p("walker","resonant"),label:n.dreamwalker}]}].map(a=>`
                    <div class="qr-panel__group qr-panel__group--${a.team}">
                        <p class="qr-panel__group-title">${a.title}</p>
                        <div class="qr-panel__group-cards">
                            ${a.cards.map(l=>`
                                <div class="qr-panel__block ${e[l.role]?"qr-panel__block--connected":""}">
                                    <div class="qr-wrapper">${R(l.url)}</div>
                                    <p class="qr-panel__label">${l.label}</p>
                                    ${e[l.role]?'<div class="qr-panel__check">✓</div>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>`}function w(){var l,u,L,E;(l=s.querySelector(".qr-modal"))==null||l.remove();const e=m.getPresenceState(),t=o.getLanguage(),n=h.filter(S=>e[S]).length,r=c(t),a=document.createElement("div");a.className="qr-modal",a.innerHTML=`
            <div class="qr-modal__backdrop"></div>
            <div class="qr-modal__content">
                <button class="qr-modal__close" id="qrModalClose">✕</button>
                ${$(e,t)}
                <p class="waiting-screen__hint">${n} / 4 ${r.waitingPlayers}</p>
            </div>`,(u=s.querySelector(".app"))==null||u.appendChild(a),(L=document.getElementById("qrModalClose"))==null||L.addEventListener("click",q),(E=a.querySelector(".qr-modal__backdrop"))==null||E.addEventListener("click",q)}function k(){v=!0,w()}function q(){var e;v=!1,(e=s.querySelector(".qr-modal"))==null||e.remove()}function y(e,t){const n=c(t),r=h.filter(a=>e[a]).length;document.body.className="",s.innerHTML=`
            <div class="app">
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">NightWalkers</h1>
                    ${$(e,t)}
                    <p class="waiting-screen__hint">${r} / 4 ${n.waitingPlayers}</p>
                </div>
            </div>`,s.querySelector(".app").appendChild(b())}function N(e,t){var a,l;const n=c(t),r=e.turn;document.body.className=`team-${r.team}`,s.innerHTML=`
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
                        ${T(e.winner,t)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(u=>`
                        <div class="main-cell ${G(u)}">
                            <span>${u.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,s.querySelector(".app").appendChild(b()),(a=document.getElementById("playersBtn"))==null||a.addEventListener("click",k),(l=document.getElementById("newGameBtn"))==null||l.addEventListener("click",async()=>{confirm(c(o.getLanguage()).confirmNewGame)&&(await o.resetGame(),window.location.href=d()+"/index.html")}),v&&w(),requestAnimationFrame(()=>B(s))}function _(){const e=o.getState(),t=o.getLanguage(),n=m.getPresenceState(),r=h.every(a=>n[a]);if(!e){window.location.href=d()+"/index.html";return}if(e.phase==="lobby"){if(r){o.startGame();return}y(n,t);return}N(e,t)}o.subscribe(_),m.onChange(_),_()}export{F as initGame};
