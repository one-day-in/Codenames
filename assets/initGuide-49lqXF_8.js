import{o as k,h as q,e as I,r as O,d as W,i as j}from"./syncIndicator-DNY5rdPG.js";import{t as f,D as p,n as F,d as R,I as x}from"./url-DrpWMjE3.js";import{i as D}from"./initGuestPage-SUa08BQ9.js";import"./entry-BfU77FDu.js";const P=8;async function V(a){const h=await D(a,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${f(p).scanQr}</p>
        </div>`});if(!h)return;const{presence:L,store:d,team:r}=h;let m=!1,g=new Set;function b(i=p){m=!1,g=new Set,a.innerHTML=`<div class="waiting-screen">
            <p>${f(i).waitingGame}</p>
        </div>`}function S(i,c){var T;const t=f(c),o=i.turn,w=o.team===r,C=o.guideLimit!==null,n=w&&!C&&!i.gameOver&&!i.turnTransition,l=F(i.teamEffects)[r],E=l.allowTwoWordClue,_=l.forcedGuideLimit,A=l.hideEnemyColors,B=l.hideNightmare;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${r}`);const G=R(r,c),H=n?`${t.guide}: ${t.chooseLimit}`:`${t.guide}: ${x.eyeClosed}`,$=[n&&_===1?t.guideForcedOneMove:null,n&&E?t.guideTwoWordClue:null,A?t.guideBlurActive:null,B?t.guideNightmareHidden:null].filter(Boolean),N=$.length?`<div class="guide__meta ${n?"guide__meta--active":"guide__meta--muted"}">${$.join(" • ")}</div>`:"",M=Array.from({length:P},(e,s)=>{const u=s+1;return`
            <button
                class="guide__num-btn ${o.guideLimit===u?"guide__num-btn--chosen":""}"
                data-limit="${u}"
                ${!n||_!==null&&u!==_?"disabled":""}
            >${u}</button>
        `}).join(""),y=new Set(i.cells.map((e,s)=>e.revealed?s:-1).filter(e=>e>=0));a.innerHTML=`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${n?"guide__title--active":"guide__title--muted"}">${G}</div>
                    <div class="guide__meta ${n?"guide__meta--active":"guide__meta--muted"}">${H}</div>
                    ${N}
                    <div class="guide__btns ${n?"guide__btns--active":"guide__btns--muted"}">${M}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${r}">
                    <div class="grid grid--5">
                        ${i.cells.map((e,s)=>`
                            <div class="${q(e,{team:r,effects:l})}" data-index="${s}">
                                <span class="cell__content">${I(e.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${O(d.getSyncStatus(),c)}
            ${W(i,c)}
        </div>
    `,a.querySelectorAll(".guide .grid .cell").forEach((e,s)=>{m&&(!y.has(s)||g.has(s)||e.classList.add("cell--reveal-anim"))}),g=y,m=!0,requestAnimationFrame(()=>{a.querySelectorAll(".cell").forEach(e=>j(e))}),a.querySelectorAll(".guide__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>d.setGuideLimit(parseInt(e.dataset.limit,10)))}),(T=a.querySelector(".turn-transition-overlay"))==null||T.addEventListener("click",()=>{d.dismissTurnTransition()})}function v({state:i,language:c}={}){const t=i??d.getState(),o=c??d.getLanguage();if(!t){b(o);return}S(t,o)}d.subscribe(v),L.onChange(()=>v()),k(()=>v())}export{V as initGuide};
