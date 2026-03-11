import{o as H,c as U,g as P,e as Q,r as j,f as F}from"./sanitize-CWtCII0P.js";import{k as K,c as W,R as b}from"./keepAlive-BWq9KLr-.js";import{a as z,g as $,I as s,b as J,t as V}from"./icons-87ROm5CI.js";function X(o,p=130,d="neutral"){const h={resonant:{color:"5A2E00",bg:"FFF3DE"},dissonant:{color:"0A3558",bg:"EAF6FF"},neutral:{color:"1E2A36",bg:"F2F6FB"}},{color:u,bg:r}=h[d]||h.neutral;return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${p}x${p}&color=${u}&bgcolor=${r}&data=${encodeURIComponent(o)}"
        width="${p}" height="${p}" />`}async function ae(o){const{roomId:d,token:h}=z();if(!d||!h){window.location.href=$()+"/index.html";return}const u=W(d);u.listen(),K(u);const r=U(d);if(await r.init(),!r.getState()){window.location.href=$()+"/index.html";return}function C(e,l){return`${$()}/${e}.html?room=${d}&token=${h}&team=${l}`}let c=!1,g=!1,L=!1,E=!1,w=new Set,q=!1,y=null,T=null;function S(){const e=document.getElementById("fullscreenBtn");e&&(e.innerHTML=document.fullscreenElement?s.minimize:s.maximize)}function _(){const e=o.querySelector(".game__qr-hub");if(!e){c=!1,g=!1;return}const l=c||g;e.classList.toggle("is-open",l),e.classList.toggle("is-pinned",c)}function I(){c=!1,g=!1,_()}function O(e){!e||T===e||(T=e,q=!0,y&&clearTimeout(y),v(),y=setTimeout(()=>{q=!1,v()},280))}function B(e,l,m){const n=V(l),{cells:i}=e,x=i.filter(a=>a.role==="resonant").length,G=i.filter(a=>a.role==="dissonant").length,N=i.filter(a=>a.role==="resonant"&&a.revealed).length,D=i.filter(a=>a.role==="dissonant"&&a.revealed).length,R=e.turn.guideLimit===null?n.turnRoleGuide:n.turnRoleWalker,M=[{team:"dissonant",role:"guide",label:n.guide,presenceRole:b.GUIDE_DISSONANT},{team:"dissonant",role:"walker",label:n.dreamwalker,presenceRole:b.WALKER_DISSONANT},{team:"resonant",role:"guide",label:n.guide,presenceRole:b.GUIDE_RESONANT},{team:"resonant",role:"walker",label:n.dreamwalker,presenceRole:b.WALKER_RESONANT}];document.body.className=`team-${e.turn.team}`;const k=new Set(i.map((a,t)=>a.revealed?t:-1).filter(a=>a>=0));o.innerHTML=`
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <button class="btn-back btn-icon" id="backBtn">${s.arrowLeft}</button>
                    <div class="game__qr-hub" aria-label="${n.qrHubLabel}">
                        <button class="game__qr-hit btn-flat" type="button" aria-label="${n.showQr}">
                            <span class="game__qr-caption">${n.connectControllers}</span>
                            <span class="game__qr-trigger" aria-hidden="true">${s.qrCode}</span>
                            <span class="game__eye-indicator" aria-hidden="true">
                                <span class="game__eye game__eye--closed">${s.eyeClosed}</span>
                                <span class="game__eye game__eye--open">${s.eye}</span>
                            </span>
                        </button>
                        <div class="game__qr-modal">
                            <div class="game__qr-modal-content">
                                <p class="game__qr-hint">${n.scanToControl}</p>
                                <div class="game__qr-columns">
                                    ${["dissonant","resonant"].map(a=>`
                                        <section class="game__qr-team game__qr-team--${a}">
                                            <h3 class="game__qr-team-title">${a==="dissonant"?n.dissonant:n.resonant}</h3>
                                            <div class="game__qr-cards">
                                                ${M.filter(t=>t.team===a).map(t=>`
                                                    <article class="game__qr-card game__qr-card--${t.role}">
                                                        <div class="game__qr-code-wrap">${X(C(t.role,t.team),130,t.team)}</div>
                                                        <p class="game__qr-role">
                                                            <span class="game__qr-role-eye ${m[t.presenceRole]?"is-connected":""}">
                                                                ${m[t.presenceRole]?s.eye:s.eyeClosed}
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
                        ${i.map(a=>`
                            <div class="${P(a,{forceReveal:q})}">
                                <span class="cell__content">${Q(a.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>

            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${D} / ${G}</span>
                        ${e.turn.team==="dissonant"?`<span class="game__score-turn-inline">${e.gameOver?n.gameFinished:R}</span>`:""}
                    </span>
                    <span class="game__score-center ${e.gameOver?"game__score-center--finished":""}">
                        <span class="game__score-arrow game__score-arrow--${e.turn.team}" aria-hidden="true">
                            ${e.turn.team==="dissonant"?s.arrowLeft:s.arrowRight}
                        </span>
                        <span class="game__score-center-text">${e.gameOver?n.gameFinished:J(e.turn.team,l)}</span>
                    </span>
                    <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${N} / ${x}</span>
                        ${e.turn.team==="resonant"?`<span class="game__score-turn-inline">${e.gameOver?n.gameFinished:R}</span>`:""}
                    </span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${s.maximize}</button>
            </footer>
            ${j(e,l)}
        </div>
        `,o.querySelectorAll(".game .grid .cell").forEach((a,t)=>{E&&(!k.has(t)||w.has(t)||a.classList.add("cell--reveal-anim"))}),w=k,E=!0,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=$()+"/index.html"}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var a,t,A;document.fullscreenElement?(A=document.exitFullscreen)==null||A.call(document):(t=(a=document.documentElement).requestFullscreen)==null||t.call(a)}),S();const f=o.querySelector(".game__qr-hit");f==null||f.addEventListener("mouseenter",()=>{var a;(a=r.getState())!=null&&a.turnTransition||(g=!0,_())}),f==null||f.addEventListener("mouseleave",()=>{var a;(a=r.getState())!=null&&a.turnTransition||(g=!1,_())}),_(),requestAnimationFrame(()=>F(o))}function v(){var n;const e=r.getState(),l=r.getLanguage(),m=u.getPresenceState();if(((n=e==null?void 0:e.turnTransition)==null?void 0:n.kind)==="anomaly"&&e.turnTransition.anomalyKey==="glitch"&&O(e.turnTransition.id),!e){window.location.href=$()+"/index.html";return}if(e.phase==="lobby"){r.startGame().catch(i=>{console.error("Failed to start game:",i)});return}B(e,l,m)}r.subscribe(v),u.onChange(v),H(()=>F(o)),L||(document.addEventListener("fullscreenchange",S),L=!0),o.addEventListener("click",e=>{var m;if((m=r.getState())!=null&&m.turnTransition)return;if(e.target.closest(".game__qr-hit")){e.preventDefault(),c=!c,_();return}c&&(c=!1,_())}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(c||g)&&I()}),v()}export{ae as initGame};
