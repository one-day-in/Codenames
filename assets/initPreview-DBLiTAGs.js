import{c as W}from"./boardFactory-Cnw_na8s.js";import{b as z,f as D,g as S,a as P}from"./renderCell-D2QPO2EK.js";import{I as c,g as E,f as H,t as x,D as $}from"./icons-C5SiWFC8.js";const I=`
.preview-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    gap: 6px;
    padding: 8px;
    background: rgba(217, 28, 28, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    overflow-x: auto;
}
.preview-nav__btn {
    flex: 0 0 auto;
    min-height: 34px;
    padding: 6px 12px;
    border-radius: 8px;
     border 1px solid rgb(248, 240, 240);
    font-family: monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}
.preview-nav__btn--active {
    border-color: var(--pal-team-light);
    box-shadow: 0 0 16px rgba(255, 223, 174, 0.28);
}
.preview-clickable .cell {
    cursor: pointer;
}
.preview-clickable .cell:hover {
    outline: 1px solid rgba(255, 255, 255, 0.9);
    outline-offset: -1px;
}
`,B=[{id:"game",label:"Game"},{id:"guide-resonant",label:"Guide R"},{id:"guide-dissonant",label:"Guide D"},{id:"walker-resonant",label:"Walker R"},{id:"walker-dissonant",label:"Walker D"},{id:"home-guest",label:"Home Guest"},{id:"home-auth",label:"Home Auth"},{id:"home-confirm",label:"Home Confirm"}],X=["МРІЯ","ТІНЬ","ХВИЛЯ","ЗІРКА","КРИЛО","МІСЯЦЬ","ВОГОНЬ","ЛІХТАР","ДОРОГА","ПІСНЯ","КАМІНЬ","ВІТЕР","ОЗЕРО","РАНОК","ЛИСТОК","ТУМАН","БЕРЕГ","НЕБО","СТРУНА","КВІТКА","ЖАРА","ДУМКА","СЛОВО","МОРЕ","КЛЮЧ"];function Y(){const{cells:e,startsFirst:a}=W({size:5,words:X});return{phase:"game",size:5,cells:e,turn:{team:a,guideLimit:3,dreamwalkerMoves:1},gameOver:!1,winner:null}}function U(e,a=190,s="neutral"){const m={resonant:{color:"5A2E00",bg:"FFF3DE"},dissonant:{color:"0A3558",bg:"EAF6FF"},neutral:{color:"1E2A36",bg:"F2F6FB"}},{color:o,bg:b}=m[s]||m.neutral;return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${a}x${a}&color=${o}&bgcolor=${b}&data=${encodeURIComponent(e)}"
        width="${a}" height="${a}" />`}function O(e){const a=x($),s={"guide-dissonant":!1,"walker-dissonant":!0,"guide-resonant":!0,"walker-resonant":!1};document.body.className=`team-${e.turn.team}`;const{cells:m}=e,o=m.filter(t=>t.role==="resonant").length,b=m.filter(t=>t.role==="dissonant").length,g=m.filter(t=>t.role==="resonant"&&t.revealed).length,l=m.filter(t=>t.role==="dissonant"&&t.revealed).length,p=e.turn.guideLimit===null?a.turnRoleGuide:a.turnRoleWalker;return`
    <div class="screen-layout game-layout">
        <header class="screen-header game__header">
            <div class="game__header-bar">
                <button class="btn-back btn-icon">${c.arrowLeft}</button>
                <div class="game__qr-hub" aria-label="${a.qrHubLabel}">
                    <button class="game__qr-hit btn-flat" type="button" aria-label="${a.showQr}">
                        <span class="game__qr-caption">${a.connectControllers}</span>
                        <span class="game__qr-trigger" aria-hidden="true">${c.qrCode}</span>
                        <span class="game__eye-indicator" aria-hidden="true">
                            <span class="game__eye game__eye--closed">${c.eyeClosed}</span>
                            <span class="game__eye game__eye--open">${c.eye}</span>
                        </span>
                    </button>
                    <div class="game__qr-modal">
                        <div class="game__qr-modal-content">
                            <p class="game__qr-hint">${a.scanToControl}</p>
                            <div class="game__qr-columns">
                                ${["dissonant","resonant"].map(t=>`
                                    <section class="game__qr-team game__qr-team--${t}">
                                        <h3 class="game__qr-team-title">${E(t,$)}</h3>
                                        <div class="game__qr-cards">
                                            ${[{role:"guide",label:a.guide},{role:"walker",label:a.dreamwalker}].map(i=>`
                                                <article class="game__qr-card game__qr-card--${i.role}">
                                                    <div class="game__qr-code-wrap">${U(`${window.location.origin}/sleepwalkers/${i.role}.html?team=${t}`,130,t)}</div>
                                                    <p class="game__qr-role">
                                                        <span class="game__qr-role-eye ${s[`${i.role}-${t}`]?"is-connected":""}">
                                                            ${s[`${i.role}-${t}`]?c.eye:c.eyeClosed}
                                                        </span>
                                                        <span class="game__qr-role-text">${i.label}</span>
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
                    ${m.map((t,i)=>`
                        <div class="${S(t)}" data-index="${i}">
                            <span class="cell__content">${t.word}</span>
                        </div>
                    `).join("")}
                </div>
            </div>

        </main>

        <footer class="screen-footer game__footer">
            <div class="game__score">
                <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active game__score-item--expanded":""}">
                    <span class="game__score-main">${l} / ${b}</span>
                    ${e.turn.team==="dissonant"?`<span class="game__score-turn-inline">${p}</span>`:""}
                </span>
                <span class="game__score-center ">
                    <span class="game__score-arrow game__score-arrow--${e.turn.team}" aria-hidden="true">
                        ${e.turn.team==="dissonant"?c.arrowLeft:c.arrowRight}
                    </span>
                    <span class="game__score-center-text">${p}</span>
                </span>
                <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active game__score-item--expanded":""}">
                    <span class="game__score-main">${g} / ${o}</span>
                    ${e.turn.team==="resonant"?`<span class="game__score-turn-inline">${p}</span>`:""}
                </span>
            </div>
            <button class="fullscreen-btn btn-icon">${c.maximize}</button>
        </footer>
    </div>`}function L(e,a){const s=x($);document.body.className="";const{guideLimit:m,team:o}=e.turn,l=o===a&&!(m!==null),p=E(a,$),t=l?`${s.guide}: ${s.chooseLimit}`:`${s.guide}: ${c.eyeClosed}`,i=Array.from({length:8},(f,v)=>{const d=v+1;return`<button class="guide__num-btn ${m===d?"guide__num-btn--chosen":""}" ${l?"":"disabled"}>${d}</button>`}).join("");return`
    <div class="screen-layout guide-layout">
        <header class="screen-header">
            <div class="guide__header">
                <div class="guide__title ${l?"guide__title--active":"guide__title--muted"}">${p}</div>
                <div class="guide__meta ${l?"guide__meta--active":"guide__meta--muted"}">${t}</div>
                <div class="guide__btns ${l?"guide__btns--active":"guide__btns--muted"}">${i}</div>
            </div>
        </header>

        <main class="screen-body">
            <div class="guide guide--${a} preview-clickable">
                <div class="grid grid--5">
                    ${e.cells.map((f,v)=>`
                        <div class="${P(f)}" data-index="${v}">
                            <span class="cell__content">${f.word}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        </main>

        <footer class="screen-footer guide__footer"></footer>
    </div>`}function C(e,a){const s=x($);document.body.className=`team-${e.turn.team}`;const{team:m,guideLimit:o}=e.turn,g=m===a&&o!==null,l=E(a,$),p=g?`${s.dreamwalker}: ${H(o,$)}`:`${s.dreamwalker}: ${c.eyeClosed}`;return`
    <div class="screen-layout walker-layout">
        <header class="screen-header">
            <div class="walker__header">
                <div class="walker__title ${g?"walker__title--active":"walker__title--muted"}">${l}</div>
                <div class="walker__meta">
                    <div class="${g?"walker__status walker__status--active":"walker__status walker__status--muted"}">${p}</div>
                    <div class="walker__actions">
                        <span class="walker__end-hint">${s.endTurn}</span>
                        <button class="walker__action-btn walker__refresh-btn ${g?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" aria-label="${s.endTurn}" ${g?"":"disabled"}>${c.refreshCw}</button>
                    </div>
                </div>
        </div>
        </header>

        <main class="screen-body">
            <div class="walker walker--${a} preview-clickable">
                <div class="grid grid--5">
                    ${e.cells.map((i,f)=>`
                        <div class="${S(i)}" data-index="${f}">
                            <span class="cell__content">${i.word}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        </main>

        <footer class="screen-footer walker__footer"></footer>
    </div>`}function k({isGuest:e=!1,showConfirm:a=!1}={}){document.body.className="";const s=x($),o=((l=16)=>{const h=7.140000000000001,w=19*.34,r=[];for(let n=0;n<4;n+=1)for(let u=0;u<4;u+=1)r.push({r:n,c:u});for(let n=r.length-1;n>0;n-=1){const u=Math.floor(Math.random()*(n+1));[r[n],r[u]]=[r[u],r[n]]}return r.slice(0,l).map(({r:n,c:u},y)=>{const M=8+21*(u+.5),A=12+19*(n+.5),T=Math.round(M+(Math.random()*2-1)*h),F=Math.round(A+(Math.random()*2-1)*w),G=Math.round(24+Math.random()*56),N=(3+Math.random()*2).toFixed(2),R=(Math.random()*2.5).toFixed(2),j=(.3+Math.random()*.5).toFixed(2);return{id:y,size:G,left:T,top:F,period:N,delay:R,alpha:j}})})(16),b=e?`
            <button class="lobby__btn lobby__btn--google" id="loginBtn">
                <span class="lobby__btn-text">${s.signIn}</span>
                <span class="lobby__btn-google-icon">${c.google}</span>
            </button>
        `:`
            <div class="lobby-screen__actions">
                <button class="lobby__btn lobby__btn--continue">Continue Game</button>
                <button class="lobby__btn lobby__btn--newgame">New Game</button>
            </div>
        `,g=a?`
    <div class="confirm-modal">
        <div class="confirm-modal__backdrop"></div>
        <div class="confirm-modal__content" role="dialog" aria-modal="true">
            <h2 class="confirm-modal__title">${s.newGame}</h2>
            <p class="confirm-modal__text">${s.confirmNewGame}</p>
            <div class="confirm-modal__actions">
                <button class="lobby__btn confirm-modal__btn confirm-modal__btn--confirm">${s.confirmNewGameAction}</button>
                <button class="lobby__btn confirm-modal__btn confirm-modal__btn--cancel">${s.cancel}</button>
            </div>
        </div>
    </div>
    `:"";return`
    <div class="app">
        <div class="lang-toggle">
            <button class="lang-toggle__btn lang-toggle__btn--active">UK</button>
            <button class="lang-toggle__btn">EN</button>
        </div>
        <div class="lobby-screen">
            <div class="home-eyes" aria-hidden="true">
                ${o.map(l=>`
                    <span class="home-eye"
                        style="--eye-size:${l.size}px;--eye-left:${l.left}%;--eye-top:${l.top}%;--eye-period:${l.period}s;--eye-delay:${l.delay}s;--eye-alpha:${l.alpha};">
                        <span class="home-eye__open">${c.eye}</span>
                        <span class="home-eye__closed">${c.eyeClosed}</span>
                    </span>
                `).join("")}
            </div>
            <div class="lobby__title-wrap"><h1 class="lobby__title">SLEEPWALKERS</h1></div>
            ${b}
        </div>
    </div>
    ${e?"":`<button class="btn-logout btn-icon">${c.user}</button>`}
    <button class="fullscreen-btn btn-icon">${c.maximize}</button>
    ${g}`}function Q(){return new URLSearchParams(location.search).get("screen")||"home-guest"}function K(e){const a=new URL(location.href);a.searchParams.set("screen",e),history.pushState({},"",a)}function ee(e){const a=document.createElement("style");a.textContent=I,document.head.appendChild(a);const s=Y(),m=new Set(["game","guide-resonant","guide-dissonant","walker-resonant","walker-dissonant"]);let o=!1,b=!1,g=!1,l=!1,p=new Set;function t(){e.querySelectorAll(".fullscreen-btn").forEach(d=>{d.innerHTML=document.fullscreenElement?c.minimize:c.maximize})}function i(){const d=e.querySelector(".game__qr-hub");if(!d){o=!1,b=!1;return}const _=o||b;d.classList.toggle("is-open",_),d.classList.toggle("is-pinned",o)}function f(){o=!1,b=!1,i()}function v(){var w;const d=Q();let _="";switch(d){case"guide-resonant":_=L(s,"resonant");break;case"guide-dissonant":_=L(s,"dissonant");break;case"walker-resonant":_=C(s,"resonant");break;case"walker-dissonant":_=C(s,"dissonant");break;case"home":_=k();break;case"home-auth":_=k({isGuest:!1,showConfirm:!1});break;case"home-confirm":_=k({isGuest:!1,showConfirm:!0});break;case"home-guest":_=k({isGuest:!0,showConfirm:!1});break;case"game":default:_=O(s);break}const q=`
            <div class="preview-nav">
                ${B.map(r=>`
                    <button class="preview-nav__btn ${r.id===d?"preview-nav__btn--active":""}" data-screen="${r.id}">${r.label}</button>
                `).join("")}
            </div>`;if(e.innerHTML=`${_}${q}`,m.has(d)){const r=new Set(s.cells.map((n,u)=>n.revealed?u:-1).filter(n=>n>=0));e.querySelectorAll(".grid .cell[data-index]").forEach(n=>{const u=Number(n.dataset.index);l&&(!r.has(u)||p.has(u)||n.classList.add("cell--reveal-anim"))}),p=r,l=!0}else l=!1,p=new Set;i();const h=e.querySelector(".game__qr-hit");h==null||h.addEventListener("mouseenter",()=>{b=!0,i()}),h==null||h.addEventListener("mouseleave",()=>{b=!1,i()}),requestAnimationFrame(()=>{e.querySelectorAll(".cell").forEach(r=>z(r)),D(e)}),(w=e.querySelector(".preview-nav"))==null||w.addEventListener("click",r=>{const n=r.target.closest("[data-screen]");n&&(K(n.dataset.screen),v())}),e.querySelectorAll(".preview-clickable .cell").forEach(r=>{r.addEventListener("click",()=>{const n=Number(r.dataset.index);Number.isNaN(n)||(s.cells[n].revealed=!s.cells[n].revealed,v())})}),e.querySelectorAll(".fullscreen-btn").forEach(r=>{r.addEventListener("click",()=>{var n,u,y;document.fullscreenElement?(y=document.exitFullscreen)==null||y.call(document):(u=(n=document.documentElement).requestFullscreen)==null||u.call(n)})}),t()}e.addEventListener("click",d=>{if(d.target.closest(".game__qr-hit")){d.preventDefault(),o=!o,i();return}o&&(o=!1,i())}),document.addEventListener("keydown",d=>{d.key==="Escape"&&(o||b)&&f()}),g||(document.addEventListener("fullscreenchange",t),g=!0),window.addEventListener("popstate",v),v()}export{ee as initPreview};
