import{o as C,c as N,g as D,e as G,r as M,f as k}from"./sanitize-CqNo1zKw.js";import{k as U,c as H,R as v}from"./keepAlive-Ds5I9vyf.js";import{a as P,g as f,I as t,b as Q,t as j}from"./icons-BEck-Lct.js";function W(o,c=130,h="neutral"){const m={resonant:{color:"5A2E00",bg:"FFF3DE"},dissonant:{color:"0A3558",bg:"EAF6FF"},neutral:{color:"1E2A36",bg:"F2F6FB"}},{color:r,bg:$}=m[h]||m.neutral;return`<img class="qr-image"
        src="https://api.qrserver.com/v1/create-qr-code/?size=${c}x${c}&color=${r}&bgcolor=${$}&data=${encodeURIComponent(o)}"
        width="${c}" height="${c}" />`}async function V(o){const{roomId:c,token:h}=P();if(!c||!h){window.location.href=f()+"/index.html";return}const m=H(c);m.listen(),U(m);const r=N(c);if(await r.init(),!r.getState()){window.location.href=f()+"/index.html";return}function $(e,l){return`${f()}/${e}.html?room=${c}&token=${h}&team=${l}`}let i=!1,g=!1,q=!1,y=!1,E=new Set;function w(){const e=document.getElementById("fullscreenBtn");e&&(e.innerHTML=document.fullscreenElement?t.minimize:t.maximize)}function u(){const e=o.querySelector(".game__qr-hub");if(!e){i=!1,g=!1;return}const l=i||g;e.classList.toggle("is-open",l),e.classList.toggle("is-pinned",i)}function F(){i=!1,g=!1,u()}function T(e,l,d){const n=j(l),{cells:_}=e,A=_.filter(a=>a.role==="resonant").length,B=_.filter(a=>a.role==="dissonant").length,I=_.filter(a=>a.role==="resonant"&&a.revealed).length,x=_.filter(a=>a.role==="dissonant"&&a.revealed).length,L=e.turn.guideLimit===null?n.turnRoleGuide:n.turnRoleWalker,O=[{team:"dissonant",role:"guide",label:n.guide,presenceRole:v.GUIDE_DISSONANT},{team:"dissonant",role:"walker",label:n.dreamwalker,presenceRole:v.WALKER_DISSONANT},{team:"resonant",role:"guide",label:n.guide,presenceRole:v.GUIDE_RESONANT},{team:"resonant",role:"walker",label:n.dreamwalker,presenceRole:v.WALKER_RESONANT}];document.body.className=`team-${e.turn.team}`;const S=new Set(_.map((a,s)=>a.revealed?s:-1).filter(a=>a>=0));o.innerHTML=`
        <div class="screen-layout game-layout">
            <header class="screen-header game__header">
                <div class="game__header-bar">
                    <button class="btn-back btn-icon" id="backBtn">${t.arrowLeft}</button>
                    <div class="game__qr-hub" aria-label="${n.qrHubLabel}">
                        <button class="game__qr-hit btn-flat" type="button" aria-label="${n.showQr}">
                            <span class="game__qr-caption">${n.connectControllers}</span>
                            <span class="game__qr-trigger" aria-hidden="true">${t.qrCode}</span>
                            <span class="game__eye-indicator" aria-hidden="true">
                                <span class="game__eye game__eye--closed">${t.eyeClosed}</span>
                                <span class="game__eye game__eye--open">${t.eye}</span>
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
                                                ${O.filter(s=>s.team===a).map(s=>`
                                                    <article class="game__qr-card game__qr-card--${s.role}">
                                                        <div class="game__qr-code-wrap">${W($(s.role,s.team),130,s.team)}</div>
                                                        <p class="game__qr-role">
                                                            <span class="game__qr-role-eye ${d[s.presenceRole]?"is-connected":""}">
                                                                ${d[s.presenceRole]?t.eye:t.eyeClosed}
                                                            </span>
                                                            <span class="game__qr-role-text">${s.label}</span>
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
                        ${_.map(a=>`
                            <div class="${D(a)}">
                                <span class="cell__content">${G(a.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>

            </main>

            <footer class="screen-footer game__footer">
                <div class="game__score">
                    <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${x} / ${B}</span>
                        ${e.turn.team==="dissonant"?`<span class="game__score-turn-inline">${e.gameOver?n.gameFinished:L}</span>`:""}
                    </span>
                    <span class="game__score-center ${e.gameOver?"game__score-center--finished":""}">
                        <span class="game__score-arrow game__score-arrow--${e.turn.team}" aria-hidden="true">
                            ${e.turn.team==="dissonant"?t.arrowLeft:t.arrowRight}
                        </span>
                        <span class="game__score-center-text">${e.gameOver?n.gameFinished:Q(e.turn.team,l)}</span>
                    </span>
                    <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active game__score-item--expanded":""}">
                        <span class="game__score-main">${I} / ${A}</span>
                        ${e.turn.team==="resonant"?`<span class="game__score-turn-inline">${e.gameOver?n.gameFinished:L}</span>`:""}
                    </span>
                </div>
                <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${t.maximize}</button>
            </footer>
            ${M(e,l)}
        </div>
        `,o.querySelectorAll(".game .grid .cell").forEach((a,s)=>{y&&(!S.has(s)||E.has(s)||a.classList.add("cell--reveal-anim"))}),E=S,y=!0,document.getElementById("backBtn").addEventListener("click",()=>{window.location.href=f()+"/index.html"}),document.getElementById("fullscreenBtn").addEventListener("click",()=>{var a,s,R;document.fullscreenElement?(R=document.exitFullscreen)==null||R.call(document):(s=(a=document.documentElement).requestFullscreen)==null||s.call(a)}),w();const p=o.querySelector(".game__qr-hit");p==null||p.addEventListener("mouseenter",()=>{var a;(a=r.getState())!=null&&a.turnTransition||(g=!0,u())}),p==null||p.addEventListener("mouseleave",()=>{var a;(a=r.getState())!=null&&a.turnTransition||(g=!1,u())}),u(),requestAnimationFrame(()=>k(o))}function b(){const e=r.getState(),l=r.getLanguage(),d=m.getPresenceState();if(!e){window.location.href=f()+"/index.html";return}if(e.phase==="lobby"){r.startGame().catch(n=>{console.error("Failed to start game:",n)});return}T(e,l,d)}r.subscribe(b),m.onChange(b),C(()=>k(o)),q||(document.addEventListener("fullscreenchange",w),q=!0),o.addEventListener("click",e=>{var d;if((d=r.getState())!=null&&d.turnTransition)return;if(e.target.closest(".game__qr-hit")){e.preventDefault(),i=!i,u();return}i&&(i=!1,u())}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(i||g)&&F()}),b()}export{V as initGame};
