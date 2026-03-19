import{g as R,e as L,r as S,a as k,b as C,R as I,c as B,o as A,T as O,d as x,f as F,h as N,i as G,j as q}from"./revealedCells-DL8M-zIv.js";import{I as u,b as D,t as U,d as M,g as h}from"./url-eJ8LOI6Y.js";import{o as H,w as Q}from"./rulesModal-B8ZCauwc.js";import"./entry-CCYgLOf4.js";function j(e,l=130,t="neutral"){const s={resonant:{color:"5A2E00",bg:"FFF3DE"},dissonant:{color:"0A3558",bg:"EAF6FF"},neutral:{color:"1E2A36",bg:"F2F6FB"}},{color:i,bg:n}=s[t]||s.neutral;return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${l}x${l}&color=${i}&bgcolor=${n}&data=${encodeURIComponent(e)}"
        width="${l}" height="${l}" />`}function K({tr:e,presenceState:l,guestUrl:t,roles:s}){const i=[{team:"dissonant",role:"guide",label:e.guide,presenceRole:s.GUIDE_DISSONANT},{team:"dissonant",role:"walker",label:e.dreamwalker,presenceRole:s.WALKER_DISSONANT},{team:"resonant",role:"guide",label:e.guide,presenceRole:s.GUIDE_RESONANT},{team:"resonant",role:"walker",label:e.dreamwalker,presenceRole:s.WALKER_RESONANT}];return`
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
                        ${["dissonant","resonant"].map(n=>`
                            <section class="game__qr-team game__qr-team--${n}">
                                <h3 class="game__qr-team-title">${n==="dissonant"?e.dissonant:e.resonant}</h3>
                                <div class="game__qr-cards">
                                    ${i.filter(r=>r.team===n).map(r=>`
                                        <article class="game__qr-card game__qr-card--${r.role}">
                                            <div class="game__qr-code-wrap">${j(t(r.role,r.team),130,r.team)}</div>
                                            <p class="game__qr-role">
                                                <span class="game__qr-role-eye ${l[r.presenceRole]?"is-connected":""}">
                                                    ${l[r.presenceRole]?u.eye:u.eyeClosed}
                                                </span>
                                                <span class="game__qr-role-text">${r.label}</span>
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
    `}function P(e,l){let t=!1,s=!1;function i(){const o=e.querySelector(".game__qr-hub");if(!o){t=!1,s=!1;return}const d=t||s;o.classList.toggle("is-open",d),o.classList.toggle("is-pinned",t)}function n(){t=!1,s=!1,i()}function r(){const o=e.querySelector(".game__qr-hit");o==null||o.addEventListener("mouseenter",()=>{l()||(s=!0,i())}),o==null||o.addEventListener("mouseleave",()=>{l()||(s=!1,i())}),i()}function m(o){if(l())return;if(o.target.closest(".game__qr-hit")){o.preventDefault(),t=!t,i();return}t&&(t=!1,i())}function _(o){o.key==="Escape"&&(t||s)&&n()}return{bind:r,close:n,handleEscape:_,handleRootClick:m}}function W({sequenceMs:e,onChange:l}){let t=!1,s=[],i=null;function n(){s.forEach(clearTimeout),s=[]}function r(o){if(!o||i===o)return;i=o,n();let d=0;e.forEach(p=>{s.push(setTimeout(()=>{t=!0,l()},d)),d+=p.on,s.push(setTimeout(()=>{t=!1,l()},d)),d+=p.off})}function m(){return t}function _(){n()}return{dispose:_,isActive:m,trigger:r}}function z({state:e,lang:l,presenceState:t,guestUrl:s,forceReveal:i,syncStatus:n}){const r=U(l),{cells:m}=e,_=m.filter(c=>c.role==="resonant").length,o=m.filter(c=>c.role==="dissonant").length,d=m.filter(c=>c.role==="resonant"&&c.revealed).length,p=m.filter(c=>c.role==="dissonant"&&c.revealed).length,v=e.turn.guideLimit===null?r.turnRoleGuide:r.turnRoleWalker;return`
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <div class="game__header-actions">
                        <button class="btn-back btn-icon" id="backBtn">${u.arrowLeft}</button>
                        <button class="btn-rules btn-icon game__rules-btn" id="rulesBtn" aria-label="${r.openRules}" title="${r.rules}">${u.book}</button>
                    </div>
                    ${K({tr:r,presenceState:t,guestUrl:s,roles:I})}
                </div>
            </header>

            <main class="screen-body">
                <div class="game">
                    <div class="grid grid--5">
                        ${m.map(c=>`
                            <div class="${R(c,{forceReveal:i})}">
                                <span class="cell__content">${L(c.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${p} / ${o}</span>
                        ${e.turn.team==="dissonant"?`<span class="game__score-turn-inline">${e.gameOver?r.gameFinished:v}</span>`:""}
                    </span>
                    <span class="game__score-center ${e.gameOver?"game__score-center--finished":""}">
                        <span class="game__score-arrow game__score-arrow--${e.turn.team}" aria-hidden="true">
                            ${e.turn.team==="dissonant"?u.arrowLeft:u.arrowRight}
                        </span>
                        <span class="game__score-center-text">${e.gameOver?r.gameFinished:D(e.turn.team,l)}</span>
                    </span>
                    <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${d} / ${_}</span>
                        ${e.turn.team==="resonant"?`<span class="game__score-turn-inline">${e.gameOver?r.gameFinished:v}</span>`:""}
                    </span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${u.maximize}</button>
            </footer>
            ${S(n,l)}
            ${k(e,l)}
            ${C({state:e,lang:l,showRestart:!0})}
        </div>
    `}async function Z(e){const l=[{on:110,off:70},{on:260,off:110},{on:180,off:90},{on:420,off:140},{on:560,off:0}],{roomId:t,token:s}=M();if(!t||!s){window.location.href=h()+"/index.html";return}const i=x(t);i.listen();const n=F(t);if(await n.init(),await B({presence:i,store:n}),!n.getState()){window.location.href=h()+"/index.html";return}function r(a,g){return`${h()}/${a}.html?room=${t}&token=${s}&team=${g}`}let m=!1,_=!1,o=new Set;const d=P(e,()=>{var a;return!!((a=n.getState())!=null&&a.turnTransition)}),p=W({sequenceMs:l,onChange:()=>b()});function v(){const a=document.getElementById("fullscreenBtn");a&&(a.innerHTML=document.fullscreenElement?u.minimize:u.maximize)}function c(a,g,f){var y;document.body.className=`team-${a.turn.team}`;const $=N(a.cells);e.innerHTML=z({state:a,lang:g,presenceState:f,guestUrl:r,forceReveal:p.isActive(),syncStatus:n.getSyncStatus()}),G({root:e,selector:".game .grid .cell",currentRevealed:$,prevRevealed:o,hasRenderedBoard:_}),o=$,_=!0,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=h()+"/index.html"}),document.getElementById("rulesBtn").addEventListener("click",()=>{H(g)}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var E,w,T;document.fullscreenElement?(T=document.exitFullscreen)==null||T.call(document):(w=(E=document.documentElement).requestFullscreen)==null||w.call(E)}),(y=document.getElementById("gameOverNewGameBtn"))==null||y.addEventListener("click",async()=>{await Q(async()=>{await n.resetGame(),window.location.href=h()+"/index.html"})}),v(),d.bind(),requestAnimationFrame(()=>q(e))}function b(){var $;const a=n.getState(),g=n.getLanguage(),f=i.getPresenceState();if((($=a==null?void 0:a.turnTransition)==null?void 0:$.kind)==="anomaly"&&a.turnTransition.anomalyKey==="glitch"&&p.trigger(a.turnTransition.id),!a){window.location.href=h()+"/index.html";return}c(a,g,f)}n.subscribe(b),i.onChange(b),A(()=>q(e)),m||(document.addEventListener("fullscreenchange",v),m=!0),e.addEventListener("click",a=>{d.handleRootClick(a)}),document.addEventListener("keydown",async a=>{var g;if(a.key==="Escape"){const f=(g=n.getState())==null?void 0:g.turnTransition;if((f==null?void 0:f.status)===O.VISIBLE&&!f.dismissed){a.preventDefault(),await n.dismissTurnTransition();return}}d.handleEscape(a)}),b()}export{Z as initGame};
