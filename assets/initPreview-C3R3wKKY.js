import{c as N}from"./boardFactory-CFSUbiZD.js";import{b as A,f as j,g as y,a as G}from"./renderCell-BOP4kpTI.js";import{I as u}from"./icons-Bcd_E9sO.js";import{g as f,t as $,D as p}from"./i18n-DXZvh-jR.js";const D=`
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
`,F=[{id:"game",label:"Game"},{id:"guide-resonant",label:"Guide R"},{id:"guide-dissonant",label:"Guide D"},{id:"walker-resonant",label:"Walker R"},{id:"walker-dissonant",label:"Walker D"},{id:"home",label:"Home"}],I=["МРІЯ","ТІНЬ","ХВИЛЯ","ЗІРКА","КРИЛО","МІСЯЦЬ","ВОГОНЬ","ЛІХТАР","ДОРОГА","ПІСНЯ","КАМІНЬ","ВІТЕР","ОЗЕРО","РАНОК","ЛИСТОК","ТУМАН","БЕРЕГ","НЕБО","СТРУНА","КВІТКА","ЖАРА","ДУМКА","СЛОВО","МОРЕ","КЛЮЧ"];function P(){const{cells:t,startsFirst:a}=N({size:5,words:I});return{phase:"game",size:5,cells:t,turn:{team:a,guideLimit:3,dreamwalkerMoves:1},gameOver:!1,winner:null}}function R(t,a=190){return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${a}x${a}&color=1D2433&bgcolor=FAF8F2&data=${encodeURIComponent(t)}"
        width="${a}" height="${a}" />`}function W(t){const a=$(p),s={"guide-dissonant":!1,"walker-dissonant":!0,"guide-resonant":!0,"walker-resonant":!1};document.body.className=`team-${t.turn.team}`;const{cells:r}=t,i=r.filter(e=>e.role==="resonant").length,_=r.filter(e=>e.role==="dissonant").length,m=r.filter(e=>e.role==="resonant"&&e.revealed).length,d=r.filter(e=>e.role==="dissonant"&&e.revealed).length;return`
    <div class="screen-layout game-layout">
        <header class="screen-header game__header">
            <div class="game__header-bar">
                <button class="btn-back btn-icon">${u.arrowLeft}</button>
                <div class="game__qr-hub" aria-label="${a.qrHubLabel}">
                    <button class="game__qr-trigger btn-icon" type="button" aria-label="${a.showQr}">${u.qrCode}</button>
                    <span class="game__qr-caption">${a.connectControllers}</span>
                    <span class="game__eye-indicator" aria-hidden="true">
                        <span class="game__eye game__eye--closed">${u.eyeClosed}</span>
                        <span class="game__eye game__eye--open">${u.eye}</span>
                    </span>
                    <div class="game__qr-modal">
                        <div class="game__qr-modal-content">
                            <p class="game__qr-hint">${a.scanToControl}</p>
                            <div class="game__qr-columns">
                                ${["dissonant","resonant"].map(e=>`
                                    <section class="game__qr-team game__qr-team--${e}">
                                        <h3 class="game__qr-team-title">${f(e,p)}</h3>
                                        <div class="game__qr-cards">
                                            ${[{role:"guide",label:a.guide},{role:"walker",label:a.dreamwalker}].map(n=>`
                                                <article class="game__qr-card game__qr-card--${n.role}">
                                                    <div class="game__qr-code-wrap">${R(`${window.location.origin}/sleepwalkers/${n.role}.html?team=${e}`,130)}</div>
                                                    <p class="game__qr-role">
                                                        <span class="game__qr-role-eye ${s[`${n.role}-${e}`]?"is-connected":""}">
                                                            ${s[`${n.role}-${e}`]?u.eye:u.eyeClosed}
                                                        </span>
                                                        <span class="game__qr-role-text">${n.label}</span>
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
                    ${r.map((e,n)=>`
                        <div class="${y(e)}" data-index="${n}">
                            <span class="cell__content">${e.word}</span>
                        </div>
                    `).join("")}
                </div>
            </div>

        </main>

        <footer class="screen-footer game__footer">
            <div class="game__score">
                <span class="game__score-item game__score-item--resonant ${t.turn.team==="resonant"?"game__score-item--active":""}">${m} / ${i}</span>
                <span class="game__score-item game__score-item--dissonant ${t.turn.team==="dissonant"?"game__score-item--active":""}">${d} / ${_}</span>
            </div>
            <button class="fullscreen-btn btn-icon">${u.maximize}</button>
        </footer>
    </div>`}function h(t,a){const s=$(p);document.body.className="";const{guideLimit:r,team:i}=t.turn,d=i===a&&!(r!==null),e=`${f(a,p)} ${s.guide}`,n=s.chooseLimit,v=Array.from({length:8},(c,g)=>{const o=g+1;return`<button class="guide__num-btn ${r===o?"guide__num-btn--chosen":""}" ${d?"":"disabled"}>${o}</button>`}).join("");return`
    <div class="screen-layout guide-layout">
        <header class="screen-header">
            <div class="guide__header">
                <div class="guide__title ${d?"guide__title--active":"guide__title--muted"}">${e}</div>
                <div class="guide__hint">${n}</div>
                <div class="guide__btns ${d?"guide__btns--active":"guide__btns--muted"}">${v}</div>
            </div>
        </header>

        <main class="screen-body">
            <div class="guide guide--${a} preview-clickable">
                <div class="grid grid--5">
                    ${t.cells.map((c,g)=>`
                        <div class="${G(c)}" data-index="${g}">
                            <span class="cell__content">${c.word}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        </main>

        <footer class="screen-footer guide__footer"></footer>
    </div>`}function w(t,a){const s=$(p);document.body.className=`team-${t.turn.team}`;const{team:r,guideLimit:i}=t.turn,m=r===a&&i!==null,d=`${f(a,p)} ${s.dreamwalker}`,e=m?`${i} ${s.steps}`:"";return`
    <div class="screen-layout walker-layout">
        <header class="screen-header">
            <div class="walker__header">
                <div class="walker__title ${m?"walker__title--active":"walker__title--muted"}">${d}</div>
                <div class="walker__meta">
                    <div class="${m?"walker__turn-info walker__turn-info--active":"walker__turn-info walker__turn-info--muted"}">${e}</div>
                    <div class="walker__actions">
                        <span class="walker__end-hint">${s.end}</span>
                        <button class="walker__action-btn walker__refresh-btn ${m?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" aria-label="${s.endTurn}" ${m?"":"disabled"}>${u.refreshCw}</button>
                    </div>
                </div>
        </div>
        </header>

        <main class="screen-body">
            <div class="walker walker--${a} preview-clickable">
                <div class="grid grid--5">
                    ${t.cells.map((v,c)=>`
                        <div class="${y(v)}" data-index="${c}">
                            <span class="cell__content">${v.word}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        </main>

        <footer class="screen-footer walker__footer"></footer>
    </div>`}function H(){return document.body.className="",`
    <div class="app">
        <div class="lang-toggle">
            <button class="lang-toggle__btn lang-toggle__btn--active">UK</button>
            <button class="lang-toggle__btn">EN</button>
        </div>
        <div class="lobby-screen">
            <div class="home-eyes" aria-hidden="true">
                ${((s=16)=>{const c=7.140000000000001,g=19*.34,o=[];for(let l=0;l<4;l+=1)for(let b=0;b<4;b+=1)o.push({r:l,c:b});for(let l=o.length-1;l>0;l-=1){const b=Math.floor(Math.random()*(l+1));[o[l],o[b]]=[o[b],o[l]]}return o.slice(0,s).map(({r:l,c:b},k)=>{const x=8+21*(b+.5),q=12+19*(l+.5),E=Math.round(x+(Math.random()*2-1)*c),L=Math.round(q+(Math.random()*2-1)*g),M=Math.round(24+Math.random()*56),C=(3+Math.random()*2).toFixed(2),S=(Math.random()*2.5).toFixed(2),T=(.3+Math.random()*.5).toFixed(2);return{id:k,size:M,left:E,top:L,period:C,delay:S,alpha:T}})})(16).map(s=>`
                    <span class="home-eye"
                        style="--eye-size:${s.size}px;--eye-left:${s.left}%;--eye-top:${s.top}%;--eye-period:${s.period}s;--eye-delay:${s.delay}s;--eye-alpha:${s.alpha};">
                        <span class="home-eye__open">${u.eye}</span>
                        <span class="home-eye__closed">${u.eyeClosed}</span>
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
    <button class="btn-logout btn-icon">${u.user}</button>
    <button class="fullscreen-btn btn-icon">${u.maximize}</button>`}function z(){return new URLSearchParams(location.search).get("screen")||"game"}function X(t){const a=new URL(location.href);a.searchParams.set("screen",t),history.pushState({},"",a)}function K(t){const a=document.createElement("style");a.textContent=D,document.head.appendChild(a);const s=P();let r=!1,i=!1;function _(){const e=t.querySelector(".game__qr-hub");if(!e){r=!1,i=!1;return}const n=r||i;e.classList.toggle("is-open",n),e.classList.toggle("is-pinned",r)}function m(){r=!1,i=!1,_()}function d(){var g;const e=z();let n="";switch(e){case"guide-resonant":n=h(s,"resonant");break;case"guide-dissonant":n=h(s,"dissonant");break;case"walker-resonant":n=w(s,"resonant");break;case"walker-dissonant":n=w(s,"dissonant");break;case"home":n=H();break;case"game":default:n=W(s);break}const v=`
            <div class="preview-nav">
                ${F.map(o=>`
                    <button class="preview-nav__btn ${o.id===e?"preview-nav__btn--active":""}" data-screen="${o.id}">${o.label}</button>
                `).join("")}
            </div>`;t.innerHTML=`${n}${v}`,_();const c=t.querySelector(".game__qr-trigger");c==null||c.addEventListener("mouseenter",()=>{i=!0,_()}),c==null||c.addEventListener("mouseleave",()=>{i=!1,_()}),requestAnimationFrame(()=>{t.querySelectorAll(".cell").forEach(o=>A(o)),j(t)}),(g=t.querySelector(".preview-nav"))==null||g.addEventListener("click",o=>{const l=o.target.closest("[data-screen]");l&&(X(l.dataset.screen),d())}),t.querySelectorAll(".preview-clickable .cell").forEach(o=>{o.addEventListener("click",()=>{const l=Number(o.dataset.index);Number.isNaN(l)||(s.cells[l].revealed=!s.cells[l].revealed,d())})})}t.addEventListener("click",e=>{if(e.target.closest(".game__qr-trigger")){e.preventDefault(),r=!r,_();return}r&&(r=!1,_())}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(r||i)&&m()}),window.addEventListener("popstate",d),d()}export{K as initPreview};
