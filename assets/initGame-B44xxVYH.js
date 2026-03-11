import{k as I,o as O,c as x,a as N,g as D,e as H,r as M,f as T,R as U}from"./sanitize-BXJdSdwY.js";import{I as m,b as Q,g as b,d as j,t as k}from"./url-BRusC3Pl.js";import{r as K}from"./entry-LDTCPmAL.js";import{o as P}from"./rulesModal-D9jABPKW.js";function W(n,i=130,a="neutral"){const t={resonant:{color:"5A2E00",bg:"FFF3DE"},dissonant:{color:"0A3558",bg:"EAF6FF"},neutral:{color:"1E2A36",bg:"F2F6FB"}},{color:l,bg:o}=t[a]||t.neutral;return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${i}x${i}&color=${l}&bgcolor=${o}&data=${encodeURIComponent(n)}"
        width="${i}" height="${i}" />`}function z({tr:n,presenceState:i,guestUrl:a,roles:t}){const l=[{team:"dissonant",role:"guide",label:n.guide,presenceRole:t.GUIDE_DISSONANT},{team:"dissonant",role:"walker",label:n.dreamwalker,presenceRole:t.WALKER_DISSONANT},{team:"resonant",role:"guide",label:n.guide,presenceRole:t.GUIDE_RESONANT},{team:"resonant",role:"walker",label:n.dreamwalker,presenceRole:t.WALKER_RESONANT}];return`
        <div class="game__qr-hub" aria-label="${n.qrHubLabel}">
            <button class="game__qr-hit btn-flat" type="button" aria-label="${n.showQr}">
                <span class="game__qr-caption">${n.connectControllers}</span>
                <span class="game__qr-trigger" aria-hidden="true">${m.qrCode}</span>
                <span class="game__eye-indicator" aria-hidden="true">
                    <span class="game__eye game__eye--closed">${m.eyeClosed}</span>
                    <span class="game__eye game__eye--open">${m.eye}</span>
                </span>
            </button>
            <div class="game__qr-modal">
                <div class="game__qr-modal-content">
                    <p class="game__qr-hint">${n.scanToControl}</p>
                    <div class="game__qr-columns">
                        ${["dissonant","resonant"].map(o=>`
                            <section class="game__qr-team game__qr-team--${o}">
                                <h3 class="game__qr-team-title">${o==="dissonant"?n.dissonant:n.resonant}</h3>
                                <div class="game__qr-cards">
                                    ${l.filter(c=>c.team===o).map(c=>`
                                        <article class="game__qr-card game__qr-card--${c.role}">
                                            <div class="game__qr-code-wrap">${W(a(c.role,c.team),130,c.team)}</div>
                                            <p class="game__qr-role">
                                                <span class="game__qr-role-eye ${i[c.presenceRole]?"is-connected":""}">
                                                    ${i[c.presenceRole]?m.eye:m.eyeClosed}
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
    `}function J(n,i){let a=!1,t=!1;function l(){const r=n.querySelector(".game__qr-hub");if(!r){a=!1,t=!1;return}const d=a||t;r.classList.toggle("is-open",d),r.classList.toggle("is-pinned",a)}function o(){a=!1,t=!1,l()}function c(){const r=n.querySelector(".game__qr-hit");r==null||r.addEventListener("mouseenter",()=>{i()||(t=!0,l())}),r==null||r.addEventListener("mouseleave",()=>{i()||(t=!1,l())}),l()}function p(r){if(i())return;if(r.target.closest(".game__qr-hit")){r.preventDefault(),a=!a,l();return}a&&(a=!1,l())}function h(r){r.key==="Escape"&&(a||t)&&o()}return{bind:c,close:o,handleEscape:h,handleRootClick:p}}function V({sequenceMs:n,onChange:i}){let a=!1,t=[],l=null;function o(){t.forEach(clearTimeout),t=[]}function c(r){if(!r||l===r)return;l=r,o();let d=0;n.forEach(v=>{t.push(setTimeout(()=>{a=!0,i()},d)),d+=v.on,t.push(setTimeout(()=>{a=!1,i()},d)),d+=v.off})}function p(){return a}function h(){o()}return{dispose:h,isActive:p,trigger:c}}async function ne(n){const i=[{on:220,off:90},{on:340,off:120},{on:480,off:0}],{roomId:a,token:t}=Q();if(!a||!t){window.location.href=b()+"/index.html";return}const l=x(a);l.listen(),I(l);const o=N(a);if(await o.init(),!o.getState()){window.location.href=b()+"/index.html";return}function c(e,u){return`${b()}/${e}.html?room=${a}&token=${t}&team=${u}`}let p=!1,h=!1,r=new Set,d=!1;const v=J(n,()=>{var e;return!!((e=o.getState())!=null&&e.turnTransition)}),y=V({sequenceMs:i,onChange:()=>$()});function q(){const e=document.getElementById("fullscreenBtn");e&&(e.innerHTML=document.fullscreenElement?m.minimize:m.maximize)}function S(e){const u=k(e);document.body.className="",n.innerHTML=`
            <div class="app">
                <div class="waiting-screen">
                    <p>${u.preparingGame}</p>
                </div>
            </div>`}function C(e,u,E){const g=k(u),{cells:_}=e,A=_.filter(s=>s.role==="resonant").length,F=_.filter(s=>s.role==="dissonant").length,B=_.filter(s=>s.role==="resonant"&&s.revealed).length,G=_.filter(s=>s.role==="dissonant"&&s.revealed).length,L=e.turn.guideLimit===null?g.turnRoleGuide:g.turnRoleWalker;document.body.className=`team-${e.turn.team}`;const w=new Set(_.map((s,f)=>s.revealed?f:-1).filter(s=>s>=0));n.innerHTML=`
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <div class="game__header-actions">
                        <button class="btn-back btn-icon" id="backBtn">${m.arrowLeft}</button>
                        <button class="btn-rules btn-icon game__rules-btn" id="rulesBtn" aria-label="${g.openRules}" title="${g.rules}">${m.book}</button>
                    </div>
                    ${z({tr:g,presenceState:E,guestUrl:c,roles:U})}
                </div>
            </header>

            <main class="screen-body">
                <div class="game">
                    <div class="grid grid--5">
                        ${_.map(s=>`
                            <div class="${D(s,{forceReveal:y.isActive()})}">
                                <span class="cell__content">${H(s.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>

            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${G} / ${F}</span>
                        ${e.turn.team==="dissonant"?`<span class="game__score-turn-inline">${e.gameOver?g.gameFinished:L}</span>`:""}
                    </span>
                    <span class="game__score-center ${e.gameOver?"game__score-center--finished":""}">
                        <span class="game__score-arrow game__score-arrow--${e.turn.team}" aria-hidden="true">
                            ${e.turn.team==="dissonant"?m.arrowLeft:m.arrowRight}
                        </span>
                        <span class="game__score-center-text">${e.gameOver?g.gameFinished:j(e.turn.team,u)}</span>
                    </span>
                    <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${B} / ${A}</span>
                        ${e.turn.team==="resonant"?`<span class="game__score-turn-inline">${e.gameOver?g.gameFinished:L}</span>`:""}
                    </span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${m.maximize}</button>
            </footer>
            ${M(e,u)}
        </div>
        `,n.querySelectorAll(".game .grid .cell").forEach((s,f)=>{h&&(!w.has(f)||r.has(f)||s.classList.add("cell--reveal-anim"))}),r=w,h=!0,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=b()+"/index.html"}),document.getElementById("rulesBtn").addEventListener("click",()=>{P(u)}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var s,f,R;document.fullscreenElement?(R=document.exitFullscreen)==null||R.call(document):(f=(s=document.documentElement).requestFullscreen)==null||f.call(s)}),q(),v.bind(),requestAnimationFrame(()=>T(n))}function $(){var g;const e=o.getState(),u=o.getLanguage(),E=l.getPresenceState();if(((g=e==null?void 0:e.turnTransition)==null?void 0:g.kind)==="anomaly"&&e.turnTransition.anomalyKey==="glitch"&&y.trigger(e.turnTransition.id),!e){window.location.href=b()+"/index.html";return}if(e.phase==="lobby"){S(u),d||(d=!0,o.startGame().catch(_=>{K("game.startGame",_)}).finally(()=>{d=!1}));return}C(e,u,E)}o.subscribe($),l.onChange($),O(()=>T(n)),p||(document.addEventListener("fullscreenchange",q),p=!0),n.addEventListener("click",e=>{v.handleRootClick(e)}),document.addEventListener("keydown",e=>{v.handleEscape(e)}),$()}export{ne as initGame};
