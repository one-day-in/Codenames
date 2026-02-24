import{t as d,D as E,g as k}from"./i18n-BSQgICzt.js";import{k as q,c as y,a as N,A as h,g as A,R as v}from"./keepAlive-DqUUpVTB.js";import{f as S}from"./fitText-DhGiXhRH.js";function G(){const n=new URLSearchParams(window.location.search);return{roomId:n.get("room"),token:n.get("token")}}function m(){const{origin:n,pathname:s}=window.location;return n+s.split("?")[0].replace(/\/[^/]*$/,"")}function T(n,s=120){return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&color=8B7355&bgcolor=2a1f1a&data=${encodeURIComponent(n)}"
        width="${s}" height="${s}" />`}async function C(n){const{roomId:s,token:_}=G();if(!s||!_){window.location.href=m()+"/index.html";return}const u=y(s);u.listen(),q(u,null);const l=N(s);await l.init();function p(e,t){return`${m()}/${e}.html?room=${s}&token=${_}&team=${t}`}function $(){const e=document.createElement("button");return e.className="fullscreen-btn",e.innerHTML="⛶",e.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),document.addEventListener("fullscreenchange",()=>{e.innerHTML=document.fullscreenElement?"✕":"⛶"}),e}function f(){const e=document.createElement("footer");e.className="app-footer";const t=document.createElement("button");return t.className="sign-out-btn",t.textContent="← Home",t.addEventListener("click",()=>{window.location.href=m()+"/index.html"}),e.appendChild(t),e.appendChild($()),e}function w(e,t){const a=d(t);return`
            <div class="qr-panel">
                ${[{team:"dissonant",title:a.dissonant,cards:[{role:v.GUIDE_DISSONANT,url:p("mini","dissonant"),label:a.guide},{role:v.WALKER_DISSONANT,url:p("controller","dissonant"),label:a.dreamwalker}]},{team:"resonant",title:a.resonant,cards:[{role:v.GUIDE_RESONANT,url:p("mini","resonant"),label:a.guide},{role:v.WALKER_RESONANT,url:p("controller","resonant"),label:a.dreamwalker}]}].map(r=>`
                    <div class="qr-panel__group qr-panel__group--${r.team}">
                        <p class="qr-panel__group-title">${r.title}</p>
                        <div class="qr-panel__group-cards">
                            ${r.cards.map(c=>`
                                <div class="qr-panel__block ${e[c.role]?"qr-panel__block--connected":""}">
                                    <div class="qr-wrapper">${T(c.url,130)}</div>
                                    <p class="qr-panel__label">${c.label}</p>
                                    ${e[c.role]?'<div class="qr-panel__check">✓</div>':""}
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>`}function b(e,t){const a=d(t),i=h.filter(r=>e[r]).length;document.body.className="",n.innerHTML=`
            <div class="app">
                <div class="waiting-screen">
                    <h1 class="waiting-screen__title">NightWalkers</h1>
                    ${w(e,t)}
                    <p class="waiting-screen__hint">${i} / 4 ${a.waitingPlayers}</p>
                </div>
            </div>`,n.querySelector(".app").appendChild(f())}function L(e,t,a){var c;const i=d(a),r=e.turn;if(document.body.className=`team-${r.team}`,n.innerHTML=`
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
                        ${k(e.winner,a)}
                    </div>`:""}

                <div class="main-grid">
                    ${e.cells.map(o=>`
                        <div class="main-cell ${A(o)}">
                            <span>${o.word}</span>
                        </div>`).join("")}
                </div>
            </div>`,n.querySelector(".app").appendChild(f()),!h.every(o=>t[o])){const o=document.createElement("div");o.className="presence-overlay",o.innerHTML=w(t,a),n.querySelector(".app").appendChild(o)}(c=document.getElementById("newGameBtn"))==null||c.addEventListener("click",async()=>{const o=d(l.getLanguage());confirm(o.confirmNewGame)&&(await l.resetGame(),window.location.href=m()+"/index.html")}),requestAnimationFrame(()=>S(n))}function g(){const e=l.getState(),t=l.getLanguage(),a=u.getPresenceState(),i=h.every(r=>a[r]);if(!e){window.location.href=m()+"/index.html";return}if(e.phase==="lobby"){if(i){l.startGame();return}b(a,t);return}L(e,a,t)}n.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">NightWalkers</h1>
                <p class="waiting-screen__hint">${d(E).loading}</p>
            </div>
        </div>`,l.subscribe(g),u.onChange(g),g()}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&C(n)});
