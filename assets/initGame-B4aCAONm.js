import{g as R,e as C,r as x,a as I,b as B,R as O,c as A,o as F,T as N,d as G,f as M,h as D,i as U,j as H,k as Q,l as j}from"./turnTransitionDismiss-av7aOM0l.js";import{I as u,f as L,b as P,t as W,d as K,g as b}from"./url-Qg2x4s1h.js";import{o as z,w as V}from"./rulesModal-Bhja84lI.js";import"./entry-TbYj9kQI.js";function J(e,s=130,t="neutral"){const r={resonant:{color:"5A2E00",bg:"FFF3DE"},dissonant:{color:"0A3558",bg:"EAF6FF"},neutral:{color:"1E2A36",bg:"F2F6FB"}},{color:l,bg:a}=r[t]||r.neutral;return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&color=${l}&bgcolor=${a}&data=${encodeURIComponent(e)}"
        width="${s}" height="${s}" />`}function X({tr:e,presenceState:s,guestUrl:t,roles:r}){const l=[{team:"dissonant",role:"guide",label:e.guide,presenceRole:r.GUIDE_DISSONANT},{team:"dissonant",role:"walker",label:e.dreamwalker,presenceRole:r.WALKER_DISSONANT},{team:"resonant",role:"guide",label:e.guide,presenceRole:r.GUIDE_RESONANT},{team:"resonant",role:"walker",label:e.dreamwalker,presenceRole:r.WALKER_RESONANT}];return`
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
                                            <div class="game__qr-code-wrap">${J(t(o.role,o.team),130,o.team)}</div>
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
    `}function Y(e,s){let t=!1,r=!1;function l(){const i=e.querySelector(".game__qr-hub");if(!i){t=!1,r=!1;return}const d=t||r;i.classList.toggle("is-open",d),i.classList.toggle("is-pinned",t)}function a(){t=!1,r=!1,l()}function o(){const i=e.querySelector(".game__qr-hit");i==null||i.addEventListener("mouseenter",()=>{s()||(r=!0,l())}),i==null||i.addEventListener("mouseleave",()=>{s()||(r=!1,l())}),l()}function m(i){if(s())return;if(i.target.closest(".game__qr-hit")){i.preventDefault(),t=!t,l();return}t&&(t=!1,l())}function g(i){i.key==="Escape"&&(t||r)&&a()}return{bind:o,close:a,handleEscape:g,handleRootClick:m}}function Z({sequenceMs:e,onChange:s}){let t=!1,r=[],l=null;function a(){r.forEach(clearTimeout),r=[]}function o(i){if(!i||l===i)return;l=i,a();let d=0;e.forEach(_=>{r.push(setTimeout(()=>{t=!0,s()},d)),d+=_.on,r.push(setTimeout(()=>{t=!1,s()},d)),d+=_.off})}function m(){return t}function g(){a()}return{dispose:g,isActive:m,trigger:o}}function ee({state:e,lang:s,presenceState:t,guestUrl:r,forceReveal:l,syncStatus:a}){const o=W(s),{cells:m}=e,g=m.filter(n=>n.role==="resonant").length,i=m.filter(n=>n.role==="dissonant").length,d=m.filter(n=>n.role==="resonant"&&n.revealed).length,_=m.filter(n=>n.role==="dissonant"&&n.revealed).length,h=e.turn.guideLimit===null?o.turnRoleGuide:o.turnRoleWalker,v=e.turn.guideLimit!==null&&!e.gameOver,y=v?Math.max((e.turn.guideLimit??0)-(e.turn.dreamwalkerMoves??0),0):0,p=v&&e.turn.team==="dissonant"?`<span class="game__score-moves game__score-moves--dissonant">${L(y,s)}</span>`:"",c=v&&e.turn.team==="resonant"?`<span class="game__score-moves game__score-moves--resonant">${L(y,s)}</span>`:"";return`
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <div class="game__header-actions">
                        <button class="btn-back btn-icon" id="backBtn">${u.arrowLeft}</button>
                        <button class="btn-rules btn-icon game__rules-btn" id="rulesBtn" aria-label="${o.openRules}" title="${o.rules}">${u.book}</button>
                    </div>
                    ${X({tr:o,presenceState:t,guestUrl:r,roles:O})}
                </div>
            </header>

            <main class="screen-body">
                <div class="game">
                    <div class="grid grid--5">
                        ${m.map(n=>`
                            <div class="${R(n,{forceReveal:l})}">
                                <span class="cell__content">${C(n.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-side game__score-side--dissonant">
                        <span class="game__score-pocket game__score-pocket--dissonant">
                            ${p}
                            <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active game__score-item--expanded":""}">
                                <span class="game__score-main">${_} / ${i}</span>
                                ${e.turn.team==="dissonant"?`<span class="game__score-turn-inline">${e.gameOver?o.gameFinished:h}</span>`:""}
                            </span>
                        </span>
                    </span>
                    <span class="game__score-center ${e.gameOver?"game__score-center--finished":""}">
                        <span class="game__score-arrow game__score-arrow--${e.turn.team}" aria-hidden="true">
                            ${e.turn.team==="dissonant"?u.arrowLeft:u.arrowRight}
                        </span>
                        <span class="game__score-center-text">${e.gameOver?o.gameFinished:P(e.turn.team,s)}</span>
                    </span>
                    <span class="game__score-side game__score-side--resonant">
                        <span class="game__score-pocket game__score-pocket--resonant">
                            <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active game__score-item--expanded":""}">
                                <span class="game__score-main">${d} / ${g}</span>
                                ${e.turn.team==="resonant"?`<span class="game__score-turn-inline">${e.gameOver?o.gameFinished:h}</span>`:""}
                            </span>
                            ${c}
                        </span>
                    </span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${u.maximize}</button>
            </footer>
            ${x(a,s)}
            ${I(e,s)}
            ${B({state:e,lang:s,showRestart:!0})}
        </div>
    `}async function re(e){const s=[{on:110,off:70},{on:260,off:110},{on:180,off:90},{on:420,off:140},{on:560,off:0}],{roomId:t,token:r}=K();if(!t||!r){window.location.href=b()+"/index.html";return}const l=G(t);l.listen();const a=M(t);if(await a.init(),await A({presence:l,store:a}),!a.getState()){window.location.href=b()+"/index.html";return}function o(c,n){return`${b()}/${c}.html?room=${t}&token=${r}&team=${n}`}let m=!1,g=!1,i=new Set,d="";const _=Y(e,()=>{var c;return!!((c=a.getState())!=null&&c.turnTransition)}),h=Z({sequenceMs:s,onChange:()=>p()});function v(){const c=document.getElementById("fullscreenBtn");c&&(c.innerHTML=document.fullscreenElement?u.minimize:u.maximize)}function y(c,n,f,{forceFit:T=!1}={}){var w;document.body.className=`team-${c.turn.team}`;const $=D(c.cells);e.innerHTML=ee({state:c,lang:n,presenceState:f,guestUrl:o,forceReveal:h.isActive(),syncStatus:a.getSyncStatus()}),U({root:e,selector:".game .grid .cell",currentRevealed:$,prevRevealed:i,hasRenderedBoard:g}),i=$,g=!0,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=b()+"/index.html"}),document.getElementById("rulesBtn").addEventListener("click",()=>{z(n)}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var k,S,q;document.fullscreenElement?(q=document.exitFullscreen)==null||q.call(document):(S=(k=document.documentElement).requestFullscreen)==null||S.call(k)}),(w=document.getElementById("gameOverNewGameBtn"))==null||w.addEventListener("click",async()=>{await V(async()=>{await a.resetGame()})}),H(e,()=>a.dismissTurnTransition()),v(),_.bind();const E=Q(c.cells);(T||E!==d)&&(d=E,requestAnimationFrame(()=>j(e)))}function p({forceFit:c=!1}={}){var $;const n=a.getState(),f=a.getLanguage(),T=l.getPresenceState();if((($=n==null?void 0:n.turnTransition)==null?void 0:$.kind)==="anomaly"&&n.turnTransition.anomalyKey==="glitch"&&h.trigger(n.turnTransition.id),!n){window.location.href=b()+"/index.html";return}y(n,f,T,{forceFit:c})}a.subscribe(p),l.onChange(p),F(()=>p({forceFit:!0})),m||(document.addEventListener("fullscreenchange",v),m=!0),e.addEventListener("click",c=>{_.handleRootClick(c)}),document.addEventListener("keydown",async c=>{var n;if(c.key==="Escape"){const f=(n=a.getState())==null?void 0:n.turnTransition;if((f==null?void 0:f.status)===N.VISIBLE&&!f.dismissed){c.preventDefault(),await a.dismissTurnTransition();return}}_.handleEscape(c)}),p()}export{re as initGame};
