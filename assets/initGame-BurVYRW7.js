import{a as B,o as F,c as O,b as x,g as I,e as N,r as G,f as R,R as D}from"./sanitize-ByXQ1tx5.js";import{I as d,b as U,g as $,d as H,t as M}from"./url-BIkxZ66a.js";import{o as Q}from"./rulesModal-DD81orhZ.js";import"./entry-D3DfpbZN.js";function j(n,c=130,a="neutral"){const t={resonant:{color:"5A2E00",bg:"FFF3DE"},dissonant:{color:"0A3558",bg:"EAF6FF"},neutral:{color:"1E2A36",bg:"F2F6FB"}},{color:l,bg:o}=t[a]||t.neutral;return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${c}x${c}&color=${l}&bgcolor=${o}&data=${encodeURIComponent(n)}"
        width="${c}" height="${c}" />`}function K({tr:n,presenceState:c,guestUrl:a,roles:t}){const l=[{team:"dissonant",role:"guide",label:n.guide,presenceRole:t.GUIDE_DISSONANT},{team:"dissonant",role:"walker",label:n.dreamwalker,presenceRole:t.WALKER_DISSONANT},{team:"resonant",role:"guide",label:n.guide,presenceRole:t.GUIDE_RESONANT},{team:"resonant",role:"walker",label:n.dreamwalker,presenceRole:t.WALKER_RESONANT}];return`
        <div class="game__qr-hub" aria-label="${n.qrHubLabel}">
            <button class="game__qr-hit btn-flat" type="button" aria-label="${n.showQr}">
                <span class="game__qr-caption">${n.connectControllers}</span>
                <span class="game__qr-trigger" aria-hidden="true">${d.qrCode}</span>
                <span class="game__eye-indicator" aria-hidden="true">
                    <span class="game__eye game__eye--closed">${d.eyeClosed}</span>
                    <span class="game__eye game__eye--open">${d.eye}</span>
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
                                    ${l.filter(i=>i.team===o).map(i=>`
                                        <article class="game__qr-card game__qr-card--${i.role}">
                                            <div class="game__qr-code-wrap">${j(a(i.role,i.team),130,i.team)}</div>
                                            <p class="game__qr-role">
                                                <span class="game__qr-role-eye ${c[i.presenceRole]?"is-connected":""}">
                                                    ${c[i.presenceRole]?d.eye:d.eyeClosed}
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
    `}function P(n,c){let a=!1,t=!1;function l(){const s=n.querySelector(".game__qr-hub");if(!s){a=!1,t=!1;return}const m=a||t;s.classList.toggle("is-open",m),s.classList.toggle("is-pinned",a)}function o(){a=!1,t=!1,l()}function i(){const s=n.querySelector(".game__qr-hit");s==null||s.addEventListener("mouseenter",()=>{c()||(t=!0,l())}),s==null||s.addEventListener("mouseleave",()=>{c()||(t=!1,l())}),l()}function f(s){if(c())return;if(s.target.closest(".game__qr-hit")){s.preventDefault(),a=!a,l();return}a&&(a=!1,l())}function p(s){s.key==="Escape"&&(a||t)&&o()}return{bind:i,close:o,handleEscape:p,handleRootClick:f}}function W({sequenceMs:n,onChange:c}){let a=!1,t=[],l=null;function o(){t.forEach(clearTimeout),t=[]}function i(s){if(!s||l===s)return;l=s,o();let m=0;n.forEach(v=>{t.push(setTimeout(()=>{a=!0,c()},m)),m+=v.on,t.push(setTimeout(()=>{a=!1,c()},m)),m+=v.off})}function f(){return a}function p(){o()}return{dispose:p,isActive:f,trigger:i}}async function Y(n){const c=[{on:110,off:70},{on:260,off:110},{on:180,off:90},{on:420,off:140},{on:560,off:0}],{roomId:a,token:t}=U();if(!a||!t){window.location.href=$()+"/index.html";return}const l=O(a);l.listen();const o=x(a);if(await o.init(),await B({presence:l,store:o}),!o.getState()){window.location.href=$()+"/index.html";return}function i(e,g){return`${$()}/${e}.html?room=${a}&token=${t}&team=${g}`}let f=!1,p=!1,s=new Set;const m=P(n,()=>{var e;return!!((e=o.getState())!=null&&e.turnTransition)}),v=W({sequenceMs:c,onChange:()=>b()});function y(){const e=document.getElementById("fullscreenBtn");e&&(e.innerHTML=document.fullscreenElement?d.minimize:d.maximize)}function T(e,g,E){const u=M(g),{cells:h}=e,S=h.filter(r=>r.role==="resonant").length,C=h.filter(r=>r.role==="dissonant").length,k=h.filter(r=>r.role==="resonant"&&r.revealed).length,A=h.filter(r=>r.role==="dissonant"&&r.revealed).length,q=e.turn.guideLimit===null?u.turnRoleGuide:u.turnRoleWalker;document.body.className=`team-${e.turn.team}`;const w=new Set(h.map((r,_)=>r.revealed?_:-1).filter(r=>r>=0));n.innerHTML=`
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <div class="game__header-actions">
                        <button class="btn-back btn-icon" id="backBtn">${d.arrowLeft}</button>
                        <button class="btn-rules btn-icon game__rules-btn" id="rulesBtn" aria-label="${u.openRules}" title="${u.rules}">${d.book}</button>
                    </div>
                    ${K({tr:u,presenceState:E,guestUrl:i,roles:D})}
                </div>
            </header>

            <main class="screen-body">
                <div class="game">
                    <div class="grid grid--5">
                        ${h.map(r=>`
                            <div class="${I(r,{forceReveal:v.isActive()})}">
                                <span class="cell__content">${N(r.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>

            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${A} / ${C}</span>
                        ${e.turn.team==="dissonant"?`<span class="game__score-turn-inline">${e.gameOver?u.gameFinished:q}</span>`:""}
                    </span>
                    <span class="game__score-center ${e.gameOver?"game__score-center--finished":""}">
                        <span class="game__score-arrow game__score-arrow--${e.turn.team}" aria-hidden="true">
                            ${e.turn.team==="dissonant"?d.arrowLeft:d.arrowRight}
                        </span>
                        <span class="game__score-center-text">${e.gameOver?u.gameFinished:H(e.turn.team,g)}</span>
                    </span>
                    <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${k} / ${S}</span>
                        ${e.turn.team==="resonant"?`<span class="game__score-turn-inline">${e.gameOver?u.gameFinished:q}</span>`:""}
                    </span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${d.maximize}</button>
            </footer>
            ${G(e,g)}
        </div>
        `,n.querySelectorAll(".game .grid .cell").forEach((r,_)=>{p&&(!w.has(_)||s.has(_)||r.classList.add("cell--reveal-anim"))}),s=w,p=!0,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=$()+"/index.html"}),document.getElementById("rulesBtn").addEventListener("click",()=>{Q(g)}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var r,_,L;document.fullscreenElement?(L=document.exitFullscreen)==null||L.call(document):(_=(r=document.documentElement).requestFullscreen)==null||_.call(r)}),y(),m.bind(),requestAnimationFrame(()=>R(n))}function b(){var u;const e=o.getState(),g=o.getLanguage(),E=l.getPresenceState();if(((u=e==null?void 0:e.turnTransition)==null?void 0:u.kind)==="anomaly"&&e.turnTransition.anomalyKey==="glitch"&&v.trigger(e.turnTransition.id),!e){window.location.href=$()+"/index.html";return}T(e,g,E)}o.subscribe(b),l.onChange(b),F(()=>R(n)),f||(document.addEventListener("fullscreenchange",y),f=!0),n.addEventListener("click",e=>{m.handleRootClick(e)}),document.addEventListener("keydown",e=>{m.handleEscape(e)}),b()}export{Y as initGame};
