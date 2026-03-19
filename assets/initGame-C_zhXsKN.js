import{g as L,e as R,r as S,a as C,b as I,R as B,c as O,o as A,T as x,d as F,f as N,h as G,i as M,j as k}from"./revealedCells-BCfXMqrn.js";import{I as u,f as q,b as D,t as U,d as H,g as b}from"./url-BkcSOkL6.js";import{o as Q,w as j}from"./rulesModal-CCEcyYHc.js";import"./entry-DmNdFHtW.js";function P(e,s=130,t="neutral"){const r={resonant:{color:"5A2E00",bg:"FFF3DE"},dissonant:{color:"0A3558",bg:"EAF6FF"},neutral:{color:"1E2A36",bg:"F2F6FB"}},{color:l,bg:a}=r[t]||r.neutral;return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&color=${l}&bgcolor=${a}&data=${encodeURIComponent(e)}"
        width="${s}" height="${s}" />`}function W({tr:e,presenceState:s,guestUrl:t,roles:r}){const l=[{team:"dissonant",role:"guide",label:e.guide,presenceRole:r.GUIDE_DISSONANT},{team:"dissonant",role:"walker",label:e.dreamwalker,presenceRole:r.WALKER_DISSONANT},{team:"resonant",role:"guide",label:e.guide,presenceRole:r.GUIDE_RESONANT},{team:"resonant",role:"walker",label:e.dreamwalker,presenceRole:r.WALKER_RESONANT}];return`
        <div class="game__qr-hub" aria-label="${e.qrHubLabel}">
            <button class="game__qr-hit btn-flat" type="button" aria-label="${e.showQr}">
                <span class="game__qr-caption">${e.connectControllers}</span>
                <span class="game__qr-trigger" aria-hidden="true">${u.qrCode}</span>
                <span class="game__eye-indicator" aria-hidden="true">
                    <span class="game__eye game__eye--closed">${u.eyeClosed}</span>
                    <span class="game__eye game__eye--open">${u.eye}</span>
                </span>
            </button>
            <div class="game__qr-modal">
                <div class="game__qr-modal-content">
                    <p class="game__qr-hint">${e.scanToControl}</p>
                    <div class="game__qr-columns">
                        ${["dissonant","resonant"].map(a=>`
                            <section class="game__qr-team game__qr-team--${a}">
                                <h3 class="game__qr-team-title">${a==="dissonant"?e.dissonant:e.resonant}</h3>
                                <div class="game__qr-cards">
                                    ${l.filter(o=>o.team===a).map(o=>`
                                        <article class="game__qr-card game__qr-card--${o.role}">
                                            <div class="game__qr-code-wrap">${P(t(o.role,o.team),130,o.team)}</div>
                                            <p class="game__qr-role">
                                                <span class="game__qr-role-eye ${s[o.presenceRole]?"is-connected":""}">
                                                    ${s[o.presenceRole]?u.eye:u.eyeClosed}
                                                </span>
                                                <span class="game__qr-role-text">${o.label}</span>
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
    `}function K(e,s){let t=!1,r=!1;function l(){const c=e.querySelector(".game__qr-hub");if(!c){t=!1,r=!1;return}const m=t||r;c.classList.toggle("is-open",m),c.classList.toggle("is-pinned",t)}function a(){t=!1,r=!1,l()}function o(){const c=e.querySelector(".game__qr-hit");c==null||c.addEventListener("mouseenter",()=>{s()||(r=!0,l())}),c==null||c.addEventListener("mouseleave",()=>{s()||(r=!1,l())}),l()}function d(c){if(s())return;if(c.target.closest(".game__qr-hit")){c.preventDefault(),t=!t,l();return}t&&(t=!1,l())}function g(c){c.key==="Escape"&&(t||r)&&a()}return{bind:o,close:a,handleEscape:g,handleRootClick:d}}function z({sequenceMs:e,onChange:s}){let t=!1,r=[],l=null;function a(){r.forEach(clearTimeout),r=[]}function o(c){if(!c||l===c)return;l=c,a();let m=0;e.forEach(p=>{r.push(setTimeout(()=>{t=!0,s()},m)),m+=p.on,r.push(setTimeout(()=>{t=!1,s()},m)),m+=p.off})}function d(){return t}function g(){a()}return{dispose:g,isActive:d,trigger:o}}function V({state:e,lang:s,presenceState:t,guestUrl:r,forceReveal:l,syncStatus:a}){const o=U(s),{cells:d}=e,g=d.filter(i=>i.role==="resonant").length,c=d.filter(i=>i.role==="dissonant").length,m=d.filter(i=>i.role==="resonant"&&i.revealed).length,p=d.filter(i=>i.role==="dissonant"&&i.revealed).length,v=e.turn.guideLimit===null?o.turnRoleGuide:o.turnRoleWalker,h=e.turn.guideLimit!==null&&!e.gameOver,f=h?Math.max((e.turn.guideLimit??0)-(e.turn.dreamwalkerMoves??0),0):0,n=h&&e.turn.team==="dissonant"?`<span class="game__score-moves game__score-moves--dissonant">${q(f,s)}</span>`:"",_=h&&e.turn.team==="resonant"?`<span class="game__score-moves game__score-moves--resonant">${q(f,s)}</span>`:"";return`
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <div class="game__header-actions">
                        <button class="btn-back btn-icon" id="backBtn">${u.arrowLeft}</button>
                        <button class="btn-rules btn-icon game__rules-btn" id="rulesBtn" aria-label="${o.openRules}" title="${o.rules}">${u.book}</button>
                    </div>
                    ${W({tr:o,presenceState:t,guestUrl:r,roles:B})}
                </div>
            </header>

            <main class="screen-body">
                <div class="game">
                    <div class="grid grid--5">
                        ${d.map(i=>`
                            <div class="${L(i,{forceReveal:l})}">
                                <span class="cell__content">${R(i.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-side game__score-side--dissonant">
                        <span class="game__score-pocket game__score-pocket--dissonant">
                            ${n}
                            <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active game__score-item--expanded":""}">
                                <span class="game__score-main">${p} / ${c}</span>
                                ${e.turn.team==="dissonant"?`<span class="game__score-turn-inline">${e.gameOver?o.gameFinished:v}</span>`:""}
                            </span>
                        </span>
                    </span>
                    <span class="game__score-center ${e.gameOver?"game__score-center--finished":""}">
                        <span class="game__score-arrow game__score-arrow--${e.turn.team}" aria-hidden="true">
                            ${e.turn.team==="dissonant"?u.arrowLeft:u.arrowRight}
                        </span>
                        <span class="game__score-center-text">${e.gameOver?o.gameFinished:D(e.turn.team,s)}</span>
                    </span>
                    <span class="game__score-side game__score-side--resonant">
                        <span class="game__score-pocket game__score-pocket--resonant">
                            <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active game__score-item--expanded":""}">
                                <span class="game__score-main">${m} / ${g}</span>
                                ${e.turn.team==="resonant"?`<span class="game__score-turn-inline">${e.gameOver?o.gameFinished:v}</span>`:""}
                            </span>
                            ${_}
                        </span>
                    </span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${u.maximize}</button>
            </footer>
            ${S(a,s)}
            ${C(e,s)}
            ${I({state:e,lang:s,showRestart:!0})}
        </div>
    `}async function ee(e){const s=[{on:110,off:70},{on:260,off:110},{on:180,off:90},{on:420,off:140},{on:560,off:0}],{roomId:t,token:r}=H();if(!t||!r){window.location.href=b()+"/index.html";return}const l=F(t);l.listen();const a=N(t);if(await a.init(),await O({presence:l,store:a}),!a.getState()){window.location.href=b()+"/index.html";return}function o(n,_){return`${b()}/${n}.html?room=${t}&token=${r}&team=${_}`}let d=!1,g=!1,c=new Set;const m=K(e,()=>{var n;return!!((n=a.getState())!=null&&n.turnTransition)}),p=z({sequenceMs:s,onChange:()=>f()});function v(){const n=document.getElementById("fullscreenBtn");n&&(n.innerHTML=document.fullscreenElement?u.minimize:u.maximize)}function h(n,_,i){var y;document.body.className=`team-${n.turn.team}`;const $=G(n.cells);e.innerHTML=V({state:n,lang:_,presenceState:i,guestUrl:o,forceReveal:p.isActive(),syncStatus:a.getSyncStatus()}),M({root:e,selector:".game .grid .cell",currentRevealed:$,prevRevealed:c,hasRenderedBoard:g}),c=$,g=!0,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=b()+"/index.html"}),document.getElementById("rulesBtn").addEventListener("click",()=>{Q(_)}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var E,w,T;document.fullscreenElement?(T=document.exitFullscreen)==null||T.call(document):(w=(E=document.documentElement).requestFullscreen)==null||w.call(E)}),(y=document.getElementById("gameOverNewGameBtn"))==null||y.addEventListener("click",async()=>{await j(async()=>{await a.resetGame()})}),v(),m.bind(),requestAnimationFrame(()=>k(e))}function f(){var $;const n=a.getState(),_=a.getLanguage(),i=l.getPresenceState();if((($=n==null?void 0:n.turnTransition)==null?void 0:$.kind)==="anomaly"&&n.turnTransition.anomalyKey==="glitch"&&p.trigger(n.turnTransition.id),!n){window.location.href=b()+"/index.html";return}h(n,_,i)}a.subscribe(f),l.onChange(f),A(()=>k(e)),d||(document.addEventListener("fullscreenchange",v),d=!0),e.addEventListener("click",n=>{m.handleRootClick(n)}),document.addEventListener("keydown",async n=>{var _;if(n.key==="Escape"){const i=(_=a.getState())==null?void 0:_.turnTransition;if((i==null?void 0:i.status)===x.VISIBLE&&!i.dismissed){n.preventDefault(),await a.dismissTurnTransition();return}}m.handleEscape(n)}),f()}export{ee as initGame};
