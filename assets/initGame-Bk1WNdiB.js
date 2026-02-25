import{k as M,c as G,a as B,A as h,g as C,R as g}from"./keepAlive-Ces2sVWx.js";import{f as T}from"./fitText-DhGiXhRH.js";import{a as x,g as c,G as y,t as d,b as I,D as R}from"./url-DqvqMluG.js";function O(s,i=130){return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${i}x${i}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(s)}"
        width="${i}" height="${i}" />`}async function D(s){const{roomId:i,token:f}=x();if(!i||!f){window.location.href=c()+"/index.html";return}s.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">${y}</h1>
                <p class="waiting-screen__hint">${d(R).loading}</p>
            </div>
        </div>`;const m=G(i);m.listen(),M(m,null);const o=B(i);if(await o.init(),!o.getState()){window.location.href=c()+"/index.html";return}let v=!1;function p(e,a){return`${c()}/${e}.html?room=${i}&token=${f}&team=${a}`}function $(){const e=document.createElement("footer");e.className="app-footer";const a=document.createElement("button");a.className="sign-out-btn",a.textContent="← Home",a.addEventListener("click",()=>{window.location.href=c()+"/index.html"});const n=document.createElement("button");return n.className="fullscreen-btn",n.innerHTML="⛶",n.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{n.innerHTML=document.fullscreenElement?"✕":"⛶"}),e.appendChild(a),e.appendChild(n),e}function b(e,a){const n=d(a);return`
            <div class="qr-panel">
                ${[{team:"dissonant",title:n.dissonant,cards:[{role:g.GUIDE_DISSONANT,url:p("guide","dissonant"),label:n.guide},{role:g.WALKER_DISSONANT,url:p("walker","dissonant"),label:n.dreamwalker}]},{team:"resonant",title:n.resonant,cards:[{role:g.GUIDE_RESONANT,url:p("guide","resonant"),label:n.guide},{role:g.WALKER_RESONANT,url:p("walker","resonant"),label:n.dreamwalker}]}].map(t=>`
                    <div class="qr-panel__group qr-panel__group--${t.team}">
                        <p class="qr-panel__group-title">${t.title}</p>
                        <div class="qr-panel__group-cards">
                            ${t.cards.map(l=>`
                                <div class="qr-panel__block ${e[l.role]?"qr-panel__block--connected":""}">
                                    <div class="qr-wrapper">${O(l.url)}</div>
                                    <p class="qr-panel__label">${l.label}</p>
                                    ${e[l.role]?'<div class="qr-panel__check">✓</div>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>`}function w(){var l,u,E,L;(l=s.querySelector(".qr-modal"))==null||l.remove();const e=m.getPresenceState(),a=o.getLanguage(),n=h.filter(A=>e[A]).length,r=d(a),t=document.createElement("div");t.className="qr-modal",t.innerHTML=`
            <div class="qr-modal__backdrop"></div>
            <div class="qr-modal__content">
                <button class="qr-modal__close" id="qrModalClose">✕</button>
                ${b(e,a)}
                <p class="waiting-screen__hint">${n} / 4 ${r.waitingPlayers}</p>
            </div>`,(u=s.querySelector(".app"))==null||u.appendChild(t),(E=document.getElementById("qrModalClose"))==null||E.addEventListener("click",q),(L=t.querySelector(".qr-modal__backdrop"))==null||L.addEventListener("click",q)}function k(){v=!0,w()}function q(){var e;v=!1,(e=s.querySelector(".qr-modal"))==null||e.remove()}function S(e,a){const n=d(a),r=h.filter(t=>e[t]).length;document.body.className="",s.innerHTML=`
            <div class="app">
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">${y}</h1>
                    ${b(e,a)}
                    <p class="waiting-screen__hint">${r} / 4 ${n.waitingPlayers}</p>
                </div>
            </div>`,s.querySelector(".app").appendChild($())}function N(e,a){var t,l;const n=d(a),r=e.turn;document.body.className=`team-${r.team}`,s.innerHTML=`
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
                        ${I(e.winner,a)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(u=>`
                        <div class="main-cell ${C(u)}">
                            <span>${u.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,s.querySelector(".app").appendChild($()),(t=document.getElementById("playersBtn"))==null||t.addEventListener("click",k),(l=document.getElementById("newGameBtn"))==null||l.addEventListener("click",async()=>{confirm(d(o.getLanguage()).confirmNewGame)&&(await o.resetGame(),window.location.href=c()+"/index.html")}),v&&w(),requestAnimationFrame(()=>T(s))}function _(){const e=o.getState(),a=o.getLanguage(),n=m.getPresenceState(),r=h.every(t=>n[t]);if(!e){window.location.href=c()+"/index.html";return}if(e.phase==="lobby"){if(r){o.startGame();return}S(n,a);return}N(e,a)}o.subscribe(_),m.onChange(_),_()}export{D as initGame};
