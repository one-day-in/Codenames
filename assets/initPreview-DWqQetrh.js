import{c as N}from"./boardFactory-CFSUbiZD.js";import{b as A,f as F,g as q,a as j}from"./renderCell-BOP4kpTI.js";import{I as _}from"./icons-BHowz3ql.js";import{g as w,t as y,D as f}from"./i18n-GZbblII2.js";const G=`
.preview-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    gap: 6px;
    padding: 8px;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    overflow-x: auto;
}
.preview-nav__btn {
    flex: 0 0 auto;
    min-height: 34px;
    padding: 6px 12px;
    border-radius: 8px;
    font-family: monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}
.preview-nav__btn--active {
    border-color: var(--resonant-light);
    box-shadow: 0 0 16px rgba(255, 223, 174, 0.28);
}
.preview-clickable .cell {
    cursor: pointer;
}
.preview-clickable .cell:hover {
    outline: 1px solid rgba(255, 255, 255, 0.3);
    outline-offset: -1px;
}
`,I=[{id:"game",label:"Game"},{id:"guide-resonant",label:"Guide R"},{id:"guide-dissonant",label:"Guide D"},{id:"walker-resonant",label:"Walker R"},{id:"walker-dissonant",label:"Walker D"},{id:"home",label:"Home"}],z=["МРІЯ","ТІНЬ","ХВИЛЯ","ЗІРКА","КРИЛО","МІСЯЦЬ","ВОГОНЬ","ЛІХТАР","ДОРОГА","ПІСНЯ","КАМІНЬ","ВІТЕР","ОЗЕРО","РАНОК","ЛИСТОК","ТУМАН","БЕРЕГ","НЕБО","СТРУНА","КВІТКА","ЖАРА","ДУМКА","СЛОВО","МОРЕ","КЛЮЧ"];function D(){const{cells:e,startsFirst:a}=N({size:5,words:z});return{phase:"game",size:5,cells:e,turn:{team:a,guideLimit:3,dreamwalkerMoves:1},gameOver:!1,winner:null}}function H(e,a=190){return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${a}x${a}&color=1D2433&bgcolor=FAF8F2&data=${encodeURIComponent(e)}"
        width="${a}" height="${a}" />`}function P(e){const a=y(f),n={"guide-dissonant":!1,"walker-dissonant":!0,"guide-resonant":!0,"walker-resonant":!1};document.body.className=`team-${e.turn.team}`;const{cells:s}=e,m=s.filter(t=>t.role==="resonant").length,v=s.filter(t=>t.role==="dissonant").length,g=s.filter(t=>t.role==="resonant"&&t.revealed).length,d=s.filter(t=>t.role==="dissonant"&&t.revealed).length;return`
    <div class="screen-layout game-layout">
        <header class="screen-header game__header">
            <div class="game__header-bar">
                <button class="btn-back btn-icon">${_.arrowLeft}</button>
                <div class="game__qr-hub" aria-label="${a.qrHubLabel}">
                    <button class="game__qr-trigger btn-icon" type="button" aria-label="${a.showQr}">${_.qrCode}</button>
                    <span class="game__qr-caption">${a.connectControllers}</span>
                    <span class="game__eye-indicator" aria-hidden="true">
                        <span class="game__eye game__eye--closed">${_.eyeClosed}</span>
                        <span class="game__eye game__eye--open">${_.eye}</span>
                    </span>
                    <div class="game__qr-modal">
                        <div class="game__qr-modal-content">
                            <p class="game__qr-hint">${a.scanToControl}</p>
                            <div class="game__qr-columns">
                                ${["dissonant","resonant"].map(t=>`
                                    <section class="game__qr-team game__qr-team--${t}">
                                        <h3 class="game__qr-team-title">${w(t,f)}</h3>
                                        <div class="game__qr-cards">
                                            ${[{role:"guide",label:a.guide},{role:"walker",label:a.dreamwalker}].map(c=>`
                                                <article class="game__qr-card game__qr-card--${c.role}">
                                                    <div class="game__qr-code-wrap">${H(`${window.location.origin}/sleepwalkers/${c.role}.html?team=${t}`,130)}</div>
                                                    <p class="game__qr-role">
                                                        <span class="game__qr-role-eye ${n[`${c.role}-${t}`]?"is-connected":""}">
                                                            ${n[`${c.role}-${t}`]?_.eye:_.eyeClosed}
                                                        </span>
                                                        <span class="game__qr-role-text">${c.label}</span>
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
                    ${s.map((t,c)=>`
                        <div class="${q(t)}" data-index="${c}">
                            <span class="cell__content">${t.word}</span>
                        </div>
                    `).join("")}
                </div>
            </div>

        </main>

        <footer class="screen-footer game__footer">
            <div class="game__score">
                <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active":""}">${g} / ${m}</span>
                <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active":""}">${d} / ${v}</span>
            </div>
            <button class="fullscreen-btn btn-icon">${_.maximize}</button>
        </footer>
    </div>`}function k(e,a){const n=y(f);document.body.className="";const{guideLimit:s,team:m}=e.turn,d=m===a&&!(s!==null),t=`${w(a,f)} ${n.guide}`,c=n.chooseLimit,l=Array.from({length:8},(o,p)=>{const i=p+1;return`<button class="guide__num-btn ${s===i?"guide__num-btn--chosen":""}" ${d?"":"disabled"}>${i}</button>`}).join("");return`
    <div class="screen-layout guide-layout">
        <header class="screen-header">
            <div class="guide__header">
                <div class="guide__title ${d?"guide__title--active":"guide__title--muted"}">${t}</div>
                <div class="guide__hint">${c}</div>
                <div class="guide__btns ${d?"guide__btns--active":"guide__btns--muted"}">${l}</div>
            </div>
        </header>

        <main class="screen-body">
            <div class="guide guide--${a} preview-clickable">
                <div class="grid grid--5">
                    ${e.cells.map((o,p)=>`
                        <div class="${j(o)}" data-index="${p}">
                            <span class="cell__content">${o.word}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        </main>

        <footer class="screen-footer guide__footer"></footer>
    </div>`}function x(e,a){const n=y(f);document.body.className=`team-${e.turn.team}`;const{team:s,guideLimit:m}=e.turn,g=s===a&&m!==null,d=`${w(a,f)} ${n.dreamwalker}`,t=g?`${m} ${n.steps}`:"";return`
    <div class="screen-layout walker-layout">
        <header class="screen-header">
            <div class="walker__header">
                <div class="walker__title ${g?"walker__title--active":"walker__title--muted"}">${d}</div>
                <div class="walker__meta">
                    <div class="${g?"walker__turn-info walker__turn-info--active":"walker__turn-info walker__turn-info--muted"}">${t}</div>
                    <div class="walker__actions">
                        <span class="walker__end-hint">${n.end}</span>
                        <button class="walker__action-btn walker__refresh-btn ${g?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" aria-label="${n.endTurn}" ${g?"":"disabled"}>${_.refreshCw}</button>
                    </div>
                </div>
        </div>
        </header>

        <main class="screen-body">
            <div class="walker walker--${a} preview-clickable">
                <div class="grid grid--5">
                    ${e.cells.map((l,o)=>`
                        <div class="${q(l)}" data-index="${o}">
                            <span class="cell__content">${l.word}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        </main>

        <footer class="screen-footer walker__footer"></footer>
    </div>`}function R(){return document.body.className="",`
    <div class="app">
        <div class="lang-toggle">
            <button class="lang-toggle__btn lang-toggle__btn--active">UK</button>
            <button class="lang-toggle__btn">EN</button>
        </div>
        <div class="lobby-screen">
            <div class="home-eyes" aria-hidden="true">
                ${((n=16)=>{const o=7.140000000000001,p=19*.34,i=[];for(let u=0;u<4;u+=1)for(let r=0;r<4;r+=1)i.push({r:u,c:r});for(let u=i.length-1;u>0;u-=1){const r=Math.floor(Math.random()*(u+1));[i[u],i[r]]=[i[r],i[u]]}return i.slice(0,n).map(({r:u,c:r},b)=>{const $=8+21*(r+.5),h=12+19*(u+.5),E=Math.round($+(Math.random()*2-1)*o),L=Math.round(h+(Math.random()*2-1)*p),M=Math.round(24+Math.random()*56),C=(3+Math.random()*2).toFixed(2),S=(Math.random()*2.5).toFixed(2),T=(.3+Math.random()*.5).toFixed(2);return{id:b,size:M,left:E,top:L,period:C,delay:S,alpha:T}})})(16).map(n=>`
                    <span class="home-eye"
                        style="--eye-size:${n.size}px;--eye-left:${n.left}%;--eye-top:${n.top}%;--eye-period:${n.period}s;--eye-delay:${n.delay}s;--eye-alpha:${n.alpha};">
                        <span class="home-eye__open">${_.eye}</span>
                        <span class="home-eye__closed">${_.eyeClosed}</span>
                    </span>
                `).join("")}
            </div>
            <div class="lobby__title-wrap"><h1 class="lobby__title">SLEEPWALKERS</h1></div>
            <div class="lobby-screen__actions">
                <button class="lobby__btn lobby__btn--continue">Continue Game</button>
                <button class="lobby__btn lobby__btn--newgame">New Game</button>
            </div>
        </div>
    </div>
    <button class="btn-logout btn-icon">${_.user}</button>
    <button class="fullscreen-btn btn-icon">${_.maximize}</button>`}function W(){return new URLSearchParams(location.search).get("screen")||"game"}function X(e){const a=new URL(location.href);a.searchParams.set("screen",e),history.pushState({},"",a)}function K(e){const a=document.createElement("style");a.textContent=G,document.head.appendChild(a);const n=D();let s=!1,m=!1,v=!1;function g(){e.querySelectorAll(".fullscreen-btn").forEach(l=>{l.innerHTML=document.fullscreenElement?_.minimize:_.maximize})}function d(){const l=e.querySelector(".game__qr-hub");if(!l){s=!1,m=!1;return}const o=s||m;l.classList.toggle("is-open",o),l.classList.toggle("is-pinned",s)}function t(){s=!1,m=!1,d()}function c(){var u;const l=W();let o="";switch(l){case"guide-resonant":o=k(n,"resonant");break;case"guide-dissonant":o=k(n,"dissonant");break;case"walker-resonant":o=x(n,"resonant");break;case"walker-dissonant":o=x(n,"dissonant");break;case"home":o=R();break;case"game":default:o=P(n);break}const p=`
            <div class="preview-nav">
                ${I.map(r=>`
                    <button class="preview-nav__btn ${r.id===l?"preview-nav__btn--active":""}" data-screen="${r.id}">${r.label}</button>
                `).join("")}
            </div>`;e.innerHTML=`${o}${p}`,d();const i=e.querySelector(".game__qr-trigger");i==null||i.addEventListener("mouseenter",()=>{m=!0,d()}),i==null||i.addEventListener("mouseleave",()=>{m=!1,d()}),requestAnimationFrame(()=>{e.querySelectorAll(".cell").forEach(r=>A(r)),F(e)}),(u=e.querySelector(".preview-nav"))==null||u.addEventListener("click",r=>{const b=r.target.closest("[data-screen]");b&&(X(b.dataset.screen),c())}),e.querySelectorAll(".preview-clickable .cell").forEach(r=>{r.addEventListener("click",()=>{const b=Number(r.dataset.index);Number.isNaN(b)||(n.cells[b].revealed=!n.cells[b].revealed,c())})}),e.querySelectorAll(".fullscreen-btn").forEach(r=>{r.addEventListener("click",()=>{var b,$,h;document.fullscreenElement?(h=document.exitFullscreen)==null||h.call(document):($=(b=document.documentElement).requestFullscreen)==null||$.call(b)})}),g()}e.addEventListener("click",l=>{if(l.target.closest(".game__qr-trigger")){l.preventDefault(),s=!s,d();return}s&&(s=!1,d())}),document.addEventListener("keydown",l=>{l.key==="Escape"&&(s||m)&&t()}),v||(document.addEventListener("fullscreenchange",g),v=!0),window.addEventListener("popstate",c),c()}export{K as initPreview};
