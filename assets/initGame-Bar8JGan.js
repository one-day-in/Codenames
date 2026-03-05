import{k as C,o as A,c as N,a as D,R as v,e as F}from"./sanitize-D-eESqSO.js";import{g as O,f as E}from"./renderCell-BOP4kpTI.js";import{t as T}from"./i18n-GZbblII2.js";import{a as G,g as u}from"./url-XkLgVFj3.js";import{I as o}from"./icons-BHowz3ql.js";function M(l,s=130){return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&color=1D2433&bgcolor=FAF8F2&data=${encodeURIComponent(l)}"
        width="${s}" height="${s}" />`}async function K(l){const{roomId:s,token:b}=G();if(!s||!b){window.location.href=u()+"/index.html";return}const f=N(s);f.listen(),C(f);const i=D(s);if(await i.init(),!i.getState()){window.location.href=u()+"/index.html";return}function w(e,c){return`${u()}/${e}.html?room=${s}&token=${b}&team=${c}`}let r=!1,d=!1,h=!1;function q(){const e=document.getElementById("fullscreenBtn");e&&(e.innerHTML=document.fullscreenElement?o.minimize:o.maximize)}function m(){const e=l.querySelector(".game__qr-hub");if(!e){r=!1,d=!1;return}const c=r||d;e.classList.toggle("is-open",c),e.classList.toggle("is-pinned",r)}function k(){r=!1,d=!1,m()}function L(e,c,p){const a=T(c),{cells:_}=e,S=_.filter(n=>n.role==="resonant").length,I=_.filter(n=>n.role==="dissonant").length,R=_.filter(n=>n.role==="resonant"&&n.revealed).length,B=_.filter(n=>n.role==="dissonant"&&n.revealed).length,x=[{team:"dissonant",role:"guide",label:a.guide,presenceRole:v.GUIDE_DISSONANT},{team:"dissonant",role:"walker",label:a.dreamwalker,presenceRole:v.WALKER_DISSONANT},{team:"resonant",role:"guide",label:a.guide,presenceRole:v.GUIDE_RESONANT},{team:"resonant",role:"walker",label:a.dreamwalker,presenceRole:v.WALKER_RESONANT}];document.body.className=`team-${e.turn.team}`,l.innerHTML=`
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <button class="btn-back btn-icon" id="backBtn">${o.arrowLeft}</button>
                    <div class="game__qr-hub" aria-label="${a.qrHubLabel}">
                        <button class="game__qr-trigger btn-icon" type="button" aria-label="${a.showQr}">${o.qrCode}</button>
                        <span class="game__qr-caption">${a.connectControllers}</span>
                        <span class="game__eye-indicator" aria-hidden="true">
                            <span class="game__eye game__eye--closed">${o.eyeClosed}</span>
                            <span class="game__eye game__eye--open">${o.eye}</span>
                        </span>
                        <div class="game__qr-modal">
                            <div class="game__qr-modal-content">
                                <p class="game__qr-hint">${a.scanToControl}</p>
                                <div class="game__qr-columns">
                                    ${["dissonant","resonant"].map(n=>`
                                        <section class="game__qr-team game__qr-team--${n}">
                                            <h3 class="game__qr-team-title">${n==="dissonant"?a.dissonant:a.resonant}</h3>
                                            <div class="game__qr-cards">
                                                ${x.filter(t=>t.team===n).map(t=>`
                                                    <article class="game__qr-card game__qr-card--${t.role}">
                                                        <div class="game__qr-code-wrap">${M(w(t.role,t.team),130)}</div>
                                                        <p class="game__qr-role">
                                                            <span class="game__qr-role-eye ${p[t.presenceRole]?"is-connected":""}">
                                                                ${p[t.presenceRole]?o.eye:o.eyeClosed}
                                                            </span>
                                                            <span class="game__qr-role-text">${t.label}</span>
                                                        </p>
                                                    </article>
                                                `).join("")}
                                            </div>
                                        </section>
                                    `).join("")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="game">
                    <div class="grid grid--5">
                        ${_.map(n=>`
                            <div class="${O(n)}">
                                <span class="cell__content">${F(n.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>

            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active":""}">${R} / ${S}</span>
                    <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active":""}">${B} / ${I}</span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${o.maximize}</button>
            </footer>
        </div>
        `,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=u()+"/index.html"}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var n,t,y;document.fullscreenElement?(y=document.exitFullscreen)==null||y.call(document):(t=(n=document.documentElement).requestFullscreen)==null||t.call(n)}),q();const g=l.querySelector(".game__qr-trigger");g==null||g.addEventListener("mouseenter",()=>{d=!0,m()}),g==null||g.addEventListener("mouseleave",()=>{d=!1,m()}),m(),requestAnimationFrame(()=>E(l))}function $(){const e=i.getState(),c=i.getLanguage(),p=f.getPresenceState();if(!e){window.location.href=u()+"/index.html";return}if(e.phase==="lobby"){i.startGame().catch(a=>{console.error("Failed to start game:",a)});return}L(e,c,p)}i.subscribe($),f.onChange($),A(()=>E(l)),h||(document.addEventListener("fullscreenchange",q),h=!0),l.addEventListener("click",e=>{if(e.target.closest(".game__qr-trigger")){e.preventDefault(),r=!r,m();return}r&&(r=!1,m())}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(r||d)&&k()}),$()}export{K as initGame};
