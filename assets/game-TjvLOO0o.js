import{t as m,D as L,g as E}from"./i18n-oKl8HJk8.js";import{k,c as q,a as y,A as h,g as N,R as g}from"./keepAlive-CpoPdX36.js";import{f as A}from"./fitText-DhGiXhRH.js";function S(){const t=new URLSearchParams(window.location.search);return{roomId:t.get("room"),token:t.get("token")}}function d(){const{origin:t,pathname:s}=window.location;return t+s.split("?")[0].replace(/\/[^/]*$/,"")}function G(t,s=130){return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(t)}"
        width="${s}" height="${s}" />`}async function T(t){const{roomId:s,token:f}=S();if(!s||!f){window.location.href=d()+"/index.html";return}t.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">NightWalkers</h1>
                <p class="waiting-screen__hint">${m(L).loading}</p>
            </div>
        </div>`;const u=q(s);u.listen(),k(u,null);const o=y(s);if(await o.init(),!o.getState()){window.location.href=d()+"/index.html";return}function p(e,a){return`${d()}/${e}.html?room=${s}&token=${f}&team=${a}`}function _(){const e=document.createElement("footer");e.className="app-footer";const a=document.createElement("button");a.className="sign-out-btn",a.textContent="← Home",a.addEventListener("click",()=>{window.location.href=d()+"/index.html"});const n=document.createElement("button");return n.className="fullscreen-btn",n.innerHTML="⛶",n.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{n.innerHTML=document.fullscreenElement?"✕":"⛶"}),e.appendChild(a),e.appendChild(n),e}function w(e,a){const n=m(a);return`
            <div class="qr-panel">
                ${[{team:"dissonant",title:n.dissonant,cards:[{role:g.GUIDE_DISSONANT,url:p("guide","dissonant"),label:n.guide},{role:g.WALKER_DISSONANT,url:p("walker","dissonant"),label:n.dreamwalker}]},{team:"resonant",title:n.resonant,cards:[{role:g.GUIDE_RESONANT,url:p("guide","resonant"),label:n.guide},{role:g.WALKER_RESONANT,url:p("walker","resonant"),label:n.dreamwalker}]}].map(r=>`
                    <div class="qr-panel__group qr-panel__group--${r.team}">
                        <p class="qr-panel__group-title">${r.title}</p>
                        <div class="qr-panel__group-cards">
                            ${r.cards.map(c=>`
                                <div class="qr-panel__block ${e[c.role]?"qr-panel__block--connected":""}">
                                    <div class="qr-wrapper">${G(c.url)}</div>
                                    <p class="qr-panel__label">${c.label}</p>
                                    ${e[c.role]?'<div class="qr-panel__check">✓</div>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>`}function $(e,a){const n=m(a),i=h.filter(r=>e[r]).length;document.body.className="",t.innerHTML=`
            <div class="app">
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">NightWalkers</h1>
                    ${w(e,a)}
                    <p class="waiting-screen__hint">${i} / 4 ${n.waitingPlayers}</p>
                </div>
            </div>`,t.querySelector(".app").appendChild(_())}function b(e,a,n){var c;const i=m(n),r=e.turn;if(document.body.className=`team-${r.team}`,t.innerHTML=`
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
                        ${E(e.winner,n)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(l=>`
                        <div class="main-cell ${N(l)}">
                            <span>${l.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,t.querySelector(".app").appendChild(_()),!h.every(l=>a[l])){const l=document.createElement("div");l.className="presence-overlay",l.innerHTML=w(a,n),t.querySelector(".app").appendChild(l)}(c=document.getElementById("newGameBtn"))==null||c.addEventListener("click",async()=>{confirm(m(o.getLanguage()).confirmNewGame)&&(await o.resetGame(),window.location.href=d()+"/index.html")}),requestAnimationFrame(()=>A(t))}function v(){const e=o.getState(),a=o.getLanguage(),n=u.getPresenceState(),i=h.every(r=>n[r]);if(!e){window.location.href=d()+"/index.html";return}if(e.phase==="lobby"){if(i){o.startGame();return}$(n,a);return}b(e,n,a)}o.subscribe(v),u.onChange(v),v()}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&T(t)});
