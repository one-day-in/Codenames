import{k as I,o as x,c as B,a as N,g as D,e as H,r as M,f as R,R as U}from"./sanitize-B8EG6lxC.js";import{I as m,b as Q,g as v,d as j,t as C}from"./url-CX8tVYqQ.js";import{r as K}from"./entry-Ci5P1YcK.js";function P(n,i=130,r="neutral"){const a={resonant:{color:"5A2E00",bg:"FFF3DE"},dissonant:{color:"0A3558",bg:"EAF6FF"},neutral:{color:"1E2A36",bg:"F2F6FB"}},{color:s,bg:l}=a[r]||a.neutral;return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${i}x${i}&color=${s}&bgcolor=${l}&data=${encodeURIComponent(n)}"
        width="${i}" height="${i}" />`}function W({tr:n,presenceState:i,guestUrl:r,roles:a}){const s=[{team:"dissonant",role:"guide",label:n.guide,presenceRole:a.GUIDE_DISSONANT},{team:"dissonant",role:"walker",label:n.dreamwalker,presenceRole:a.WALKER_DISSONANT},{team:"resonant",role:"guide",label:n.guide,presenceRole:a.GUIDE_RESONANT},{team:"resonant",role:"walker",label:n.dreamwalker,presenceRole:a.WALKER_RESONANT}];return`
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
                        ${["dissonant","resonant"].map(l=>`
                            <section class="game__qr-team game__qr-team--${l}">
                                <h3 class="game__qr-team-title">${l==="dissonant"?n.dissonant:n.resonant}</h3>
                                <div class="game__qr-cards">
                                    ${s.filter(c=>c.team===l).map(c=>`
                                        <article class="game__qr-card game__qr-card--${c.role}">
                                            <div class="game__qr-code-wrap">${P(r(c.role,c.team),130,c.team)}</div>
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
    `}function z(n,i){let r=!1,a=!1;function s(){const o=n.querySelector(".game__qr-hub");if(!o){r=!1,a=!1;return}const h=r||a;o.classList.toggle("is-open",h),o.classList.toggle("is-pinned",r)}function l(){r=!1,a=!1,s()}function c(){const o=n.querySelector(".game__qr-hit");o==null||o.addEventListener("mouseenter",()=>{i()||(a=!0,s())}),o==null||o.addEventListener("mouseleave",()=>{i()||(a=!1,s())}),s()}function p(o){if(i())return;if(o.target.closest(".game__qr-hit")){o.preventDefault(),r=!r,s();return}r&&(r=!1,s())}function g(o){o.key==="Escape"&&(r||a)&&l()}return{bind:c,close:l,handleEscape:g,handleRootClick:p}}function J({durationMs:n,onChange:i}){let r=!1,a=null,s=null;function l(g){!g||s===g||(s=g,r=!0,a&&clearTimeout(a),i(),a=setTimeout(()=>{r=!1,i()},n))}function c(){return r}function p(){a&&(clearTimeout(a),a=null)}return{dispose:p,isActive:c,trigger:l}}async function Z(n){const{roomId:r,token:a}=Q();if(!r||!a){window.location.href=v()+"/index.html";return}const s=B(r);s.listen(),I(s);const l=N(r);if(await l.init(),!l.getState()){window.location.href=v()+"/index.html";return}function c(e,d){return`${v()}/${e}.html?room=${r}&token=${a}&team=${d}`}let p=!1,g=!1,o=new Set,h=!1;const b=z(n,()=>{var e;return!!((e=l.getState())!=null&&e.turnTransition)}),q=J({durationMs:280,onChange:()=>$()});function E(){const e=document.getElementById("fullscreenBtn");e&&(e.innerHTML=document.fullscreenElement?m.minimize:m.maximize)}function S(e){const d=C(e);document.body.className="",n.innerHTML=`
            <div class="app">
                <div class="waiting-screen">
                    <p>${d.preparingGame}</p>
                </div>
            </div>`}function k(e,d,y){const u=C(d),{cells:_}=e,A=_.filter(t=>t.role==="resonant").length,F=_.filter(t=>t.role==="dissonant").length,G=_.filter(t=>t.role==="resonant"&&t.revealed).length,O=_.filter(t=>t.role==="dissonant"&&t.revealed).length,L=e.turn.guideLimit===null?u.turnRoleGuide:u.turnRoleWalker;document.body.className=`team-${e.turn.team}`;const w=new Set(_.map((t,f)=>t.revealed?f:-1).filter(t=>t>=0));n.innerHTML=`
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <button class="btn-back btn-icon" id="backBtn">${m.arrowLeft}</button>
                    ${W({tr:u,presenceState:y,guestUrl:c,roles:U})}
                </div>
            </header>

            <main class="screen-body">
                <div class="game">
                    <div class="grid grid--5">
                        ${_.map(t=>`
                            <div class="${D(t,{forceReveal:q.isActive()})}">
                                <span class="cell__content">${H(t.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>

            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${O} / ${F}</span>
                        ${e.turn.team==="dissonant"?`<span class="game__score-turn-inline">${e.gameOver?u.gameFinished:L}</span>`:""}
                    </span>
                    <span class="game__score-center ${e.gameOver?"game__score-center--finished":""}">
                        <span class="game__score-arrow game__score-arrow--${e.turn.team}" aria-hidden="true">
                            ${e.turn.team==="dissonant"?m.arrowLeft:m.arrowRight}
                        </span>
                        <span class="game__score-center-text">${e.gameOver?u.gameFinished:j(e.turn.team,d)}</span>
                    </span>
                    <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${G} / ${A}</span>
                        ${e.turn.team==="resonant"?`<span class="game__score-turn-inline">${e.gameOver?u.gameFinished:L}</span>`:""}
                    </span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${m.maximize}</button>
            </footer>
            ${M(e,d)}
        </div>
        `,n.querySelectorAll(".game .grid .cell").forEach((t,f)=>{g&&(!w.has(f)||o.has(f)||t.classList.add("cell--reveal-anim"))}),o=w,g=!0,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=v()+"/index.html"}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var t,f,T;document.fullscreenElement?(T=document.exitFullscreen)==null||T.call(document):(f=(t=document.documentElement).requestFullscreen)==null||f.call(t)}),E(),b.bind(),requestAnimationFrame(()=>R(n))}function $(){var u;const e=l.getState(),d=l.getLanguage(),y=s.getPresenceState();if(((u=e==null?void 0:e.turnTransition)==null?void 0:u.kind)==="anomaly"&&e.turnTransition.anomalyKey==="glitch"&&q.trigger(e.turnTransition.id),!e){window.location.href=v()+"/index.html";return}if(e.phase==="lobby"){S(d),h||(h=!0,l.startGame().catch(_=>{K("game.startGame",_)}).finally(()=>{h=!1}));return}k(e,d,y)}l.subscribe($),s.onChange($),x(()=>R(n)),p||(document.addEventListener("fullscreenchange",E),p=!0),n.addEventListener("click",e=>{b.handleRootClick(e)}),document.addEventListener("keydown",e=>{b.handleEscape(e)}),$()}export{Z as initGame};
