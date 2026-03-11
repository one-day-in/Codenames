import{o as k,b as q,e as O,r as I,d as W}from"./sanitize-AsY1W7ob.js";import{t as f,D as T,n as j,d as F,I as R}from"./url-BRusC3Pl.js";import{i as x}from"./initGuestPage-as3TKHJv.js";import"./entry-gDyjN3FI.js";const D=8;async function K(a){const h=await x(a,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${f(T).scanQr}</p>
        </div>`});if(!h)return;const{presence:p,store:l,team:d}=h;let m=!1,g=new Set;function L(i=T){m=!1,g=new Set,a.innerHTML=`<div class="waiting-screen">
            <p>${f(i).waitingLobby}</p>
        </div>`}function w(i,o){var y;const t=f(o),r=i.turn,C=r.team===d,E=r.guideLimit!==null,n=C&&!E&&!i.gameOver&&!i.turnTransition,c=j(i.teamEffects)[d],A=c.allowTwoWordClue,_=c.forcedGuideLimit,S=c.hideEnemyColors,B=c.hideNightmare;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${d}`);const H=F(d,o),G=n?`${t.guide}: ${t.chooseLimit}`:`${t.guide}: ${R.eyeClosed}`,$=[n&&_===1?t.guideForcedOneMove:null,n&&A?t.guideTwoWordClue:null,S?t.guideBlurActive:null,B?t.guideNightmareHidden:null].filter(Boolean),N=$.length?`<div class="guide__meta ${n?"guide__meta--active":"guide__meta--muted"}">${$.join(" • ")}</div>`:"",M=Array.from({length:D},(e,s)=>{const u=s+1;return`
            <button
                class="guide__num-btn ${r.guideLimit===u?"guide__num-btn--chosen":""}"
                data-limit="${u}"
                ${!n||_!==null&&u!==_?"disabled":""}
            >${u}</button>
        `}).join(""),b=new Set(i.cells.map((e,s)=>e.revealed?s:-1).filter(e=>e>=0));a.innerHTML=`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${n?"guide__title--active":"guide__title--muted"}">${H}</div>
                    <div class="guide__meta ${n?"guide__meta--active":"guide__meta--muted"}">${G}</div>
                    ${N}
                    <div class="guide__btns ${n?"guide__btns--active":"guide__btns--muted"}">${M}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${d}">
                    <div class="grid grid--5">
                        ${i.cells.map((e,s)=>`
                            <div class="${q(e,{team:d,effects:c})}" data-index="${s}">
                                <span class="cell__content">${O(e.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${I(i,o)}
        </div>
    `,a.querySelectorAll(".guide .grid .cell").forEach((e,s)=>{m&&(!b.has(s)||g.has(s)||e.classList.add("cell--reveal-anim"))}),g=b,m=!0,requestAnimationFrame(()=>{a.querySelectorAll(".cell").forEach(e=>W(e))}),a.querySelectorAll(".guide__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>l.setGuideLimit(parseInt(e.dataset.limit,10)))}),(y=a.querySelector(".turn-transition-overlay"))==null||y.addEventListener("click",()=>{l.dismissTurnTransition()})}function v({state:i,language:o}={}){const t=i??l.getState(),r=o??l.getLanguage();if(!t||t.phase==="lobby"){L(r);return}w(t,r)}l.subscribe(v),p.onChange(()=>v()),k(()=>v())}export{K as initGuide};
