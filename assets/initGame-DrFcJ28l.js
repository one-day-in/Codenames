import{k as C,o as x,c as A,a as N,R as v,e as B}from"./sanitize-D_lm_NtF.js";import{g as D,f as q}from"./renderCell-BOP4kpTI.js";import{t as O}from"./i18n-DXZvh-jR.js";import{a as F,g as u}from"./url-XkLgVFj3.js";import{I as c}from"./icons-Bcd_E9sO.js";function G(o,s=130){return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&color=1D2433&bgcolor=FAF8F2&data=${encodeURIComponent(o)}"
        width="${s}" height="${s}" />`}async function Q(o){const{roomId:s,token:b}=F();if(!s||!b){window.location.href=u()+"/index.html";return}const p=A(s);p.listen(),C(p);const i=N(s);if(await i.init(),!i.getState()){window.location.href=u()+"/index.html";return}function y(e,l){return`${u()}/${e}.html?room=${s}&token=${b}&team=${l}`}let r=!1,d=!1;function m(){const e=o.querySelector(".game__qr-hub");if(!e){r=!1,d=!1;return}const l=r||d;e.classList.toggle("is-open",l),e.classList.toggle("is-pinned",r)}function w(){r=!1,d=!1,m()}function E(e,l,f){const n=O(l),{cells:_}=e,k=_.filter(a=>a.role==="resonant").length,L=_.filter(a=>a.role==="dissonant").length,S=_.filter(a=>a.role==="resonant"&&a.revealed).length,R=_.filter(a=>a.role==="dissonant"&&a.revealed).length,I=[{team:"dissonant",role:"guide",label:n.guide,presenceRole:v.GUIDE_DISSONANT},{team:"dissonant",role:"walker",label:n.dreamwalker,presenceRole:v.WALKER_DISSONANT},{team:"resonant",role:"guide",label:n.guide,presenceRole:v.GUIDE_RESONANT},{team:"resonant",role:"walker",label:n.dreamwalker,presenceRole:v.WALKER_RESONANT}];document.body.className=`team-${e.turn.team}`,o.innerHTML=`
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <button class="btn-back btn-icon" id="backBtn">${c.arrowLeft}</button>
                    <div class="game__qr-hub" aria-label="${n.qrHubLabel}">
                        <button class="game__qr-trigger btn-icon" type="button" aria-label="${n.showQr}">${c.qrCode}</button>
                        <span class="game__qr-caption">${n.connectControllers}</span>
                        <span class="game__eye-indicator" aria-hidden="true">
                            <span class="game__eye game__eye--closed">${c.eyeClosed}</span>
                            <span class="game__eye game__eye--open">${c.eye}</span>
                        </span>
                        <div class="game__qr-modal">
                            <div class="game__qr-modal-content">
                                <p class="game__qr-hint">${n.scanToControl}</p>
                                <div class="game__qr-columns">
                                    ${["dissonant","resonant"].map(a=>`
                                        <section class="game__qr-team game__qr-team--${a}">
                                            <h3 class="game__qr-team-title">${a==="dissonant"?n.dissonant:n.resonant}</h3>
                                            <div class="game__qr-cards">
                                                ${I.filter(t=>t.team===a).map(t=>`
                                                    <article class="game__qr-card game__qr-card--${t.role}">
                                                        <div class="game__qr-code-wrap">${G(y(t.role,t.team),130)}</div>
                                                        <p class="game__qr-role">
                                                            <span class="game__qr-role-eye ${f[t.presenceRole]?"is-connected":""}">
                                                                ${f[t.presenceRole]?c.eye:c.eyeClosed}
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
                        ${_.map(a=>`
                            <div class="${D(a)}">
                                <span class="cell__content">${B(a.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>

            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active":""}">${S} / ${k}</span>
                    <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active":""}">${R} / ${L}</span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${c.maximize}</button>
            </footer>
        </div>
        `,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=u()+"/index.html"}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var a,t,h;document.fullscreenElement?(h=document.exitFullscreen)==null||h.call(document):(t=(a=document.documentElement).requestFullscreen)==null||t.call(a)});const g=o.querySelector(".game__qr-trigger");g==null||g.addEventListener("mouseenter",()=>{d=!0,m()}),g==null||g.addEventListener("mouseleave",()=>{d=!1,m()}),m(),requestAnimationFrame(()=>q(o))}function $(){const e=i.getState(),l=i.getLanguage(),f=p.getPresenceState();if(!e){window.location.href=u()+"/index.html";return}if(e.phase==="lobby"){i.startGame().catch(n=>{console.error("Failed to start game:",n)});return}E(e,l,f)}i.subscribe($),p.onChange($),x(()=>q(o)),o.addEventListener("click",e=>{if(e.target.closest(".game__qr-trigger")){e.preventDefault(),r=!r,m();return}r&&(r=!1,m())}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(r||d)&&w()}),$()}export{Q as initGame};
