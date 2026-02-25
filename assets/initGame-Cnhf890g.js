import{c as y,g as N,A as S,R as p}from"./presence-C90QuL_b.js";import{f as A}from"./fitText-DhGiXhRH.js";import{a as G,g as c,G as M,t as m,b as B,D as T}from"./url-DqvqMluG.js";function x(l,o=130){return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${o}x${o}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(l)}"
        width="${o}" height="${o}" />`}async function R(l){const{roomId:o,token:_}=G();if(!o||!_){window.location.href=c()+"/index.html";return}l.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">${M}</h1>
                <p class="waiting-screen__hint">${m(T).loading}</p>
            </div>
        </div>`;const s=y(o);if(await s.init(),!s.getState()){window.location.href=c()+"/index.html";return}let g=!1;function u(e,a){return`${c()}/${e}.html?room=${o}&token=${_}&team=${a}`}function w(){const e=document.createElement("footer");e.className="app-footer";const a=document.createElement("button");a.className="sign-out-btn",a.textContent="← Home",a.addEventListener("click",()=>{window.location.href=c()+"/index.html"});const n=document.createElement("button");return n.className="fullscreen-btn",n.innerHTML="⛶",n.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{n.innerHTML=document.fullscreenElement?"✕":"⛶"}),e.appendChild(a),e.appendChild(n),e}function q(e,a){const n=m(a);return`
            <div class="qr-panel">
                ${[{team:"dissonant",title:n.dissonant,cards:[{role:p.GUIDE_DISSONANT,url:u("guide","dissonant"),label:n.guide},{role:p.WALKER_DISSONANT,url:u("walker","dissonant"),label:n.dreamwalker}]},{team:"resonant",title:n.resonant,cards:[{role:p.GUIDE_RESONANT,url:u("guide","resonant"),label:n.guide},{role:p.WALKER_RESONANT,url:u("walker","resonant"),label:n.dreamwalker}]}].map(t=>`
                    <div class="qr-panel__group qr-panel__group--${t.team}">
                        <p class="qr-panel__group-title">${t.title}</p>
                        <div class="qr-panel__group-cards">
                            ${t.cards.map(r=>`
                                <div class="qr-panel__block ${e[r.role]?"qr-panel__block--connected":""}">
                                    <div class="qr-wrapper">${x(r.url)}</div>
                                    <p class="qr-panel__label">${r.label}</p>
                                    ${e[r.role]?'<div class="qr-panel__check">✓</div>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>`}function v(){var r,d,b,$;(r=l.querySelector(".qr-modal"))==null||r.remove();const e=presence.getPresenceState(),a=s.getLanguage(),n=S.filter(k=>e[k]).length,i=m(a),t=document.createElement("div");t.className="qr-modal",t.innerHTML=`
            <div class="qr-modal__backdrop"></div>
            <div class="qr-modal__content">
                <button class="qr-modal__close" id="qrModalClose">✕</button>
                ${q(e,a)}
                <p class="waiting-screen__hint">${n} / 4 ${i.waitingPlayers}</p>
            </div>`,(d=l.querySelector(".app"))==null||d.appendChild(t),(b=document.getElementById("qrModalClose"))==null||b.addEventListener("click",f),($=t.querySelector(".qr-modal__backdrop"))==null||$.addEventListener("click",f)}function E(){g=!0,v()}function f(){var e;g=!1,(e=l.querySelector(".qr-modal"))==null||e.remove()}function L(e,a){var t,r;const n=m(a),i=e.turn;document.body.className=`team-${i.team}`,l.innerHTML=`
        <div class="game">
            <header class="header">
                <button class="header__players-btn" id="playersBtn">👥</button>
                <div class="header__center">
                    <span class="header__team-label">
                        ${i.team==="resonant"?n.resonant:n.dissonant}
                    </span>
                    ${i.guideLimit!==null?`<span class="header__moves">
                                 ${i.guideLimit-i.dreamwalkerMoves} ${n.movesLeft}
                               </span>`:`<span class="header__moves header__moves--waiting">
                                 ${n.waitingGuide}
                               </span>`}
                </div>
                <button class="header__new-game-btn" id="newGameBtn">
                    ${n.newGame}
                </button>
            </header>

            ${e.gameOver?`<div class="gameover-banner gameover-banner--${e.winner}">
                         ${B(e.winner,a)}
                       </div>`:""}

            <div class="grid grid--5">
                ${e.cells.map(d=>`
                    <div class="${N(d)}">
                        <span class="cell__content">${d.word}</span>
                    </div>
                `).join("")}
            </div>
        </div>
    `,l.querySelector(".game").appendChild(w()),(t=document.getElementById("playersBtn"))==null||t.addEventListener("click",E),(r=document.getElementById("newGameBtn"))==null||r.addEventListener("click",async()=>{confirm(m(s.getLanguage()).confirmNewGame)&&(await s.resetGame(),window.location.href=c()+"/index.html")}),g&&v(),requestAnimationFrame(()=>A(l))}function h(){const e=s.getState(),a=s.getLanguage();if(!e){window.location.href=c()+"/index.html";return}if(e.phase==="lobby"){s.startGame();return}L(e,a)}s.subscribe(h),h()}export{R as initGame};
