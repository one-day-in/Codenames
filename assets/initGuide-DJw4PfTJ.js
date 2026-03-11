import{o as M,a as O,e as k,r as q,b as I}from"./sanitize-CWtCII0P.js";import{t as f,D as y,n as W,b as j,I as F}from"./icons-87ROm5CI.js";import{i as R}from"./initGuestPage-CyJtaoEn.js";import"./keepAlive-BWq9KLr-.js";const x=8;async function J(a){const h=await R(a,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${f(y).scanQr}</p>
        </div>`});if(!h)return;const{presence:p,store:c,team:d}=h;let m=!1,g=new Set;function T(i=y){m=!1,g=new Set,a.innerHTML=`<div class="waiting-screen">
            <p>${f(i).waitingLobby}</p>
        </div>`}function L(i,o){const t=f(o),r=i.turn,w=r.team===d,C=r.guideLimit!==null,n=w&&!C&&!i.gameOver&&!i.turnTransition,l=W(i.teamEffects)[d],A=l.allowTwoWordClue,v=l.forcedGuideLimit,E=l.hideEnemyColors,S=l.hideNightmare;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${d}`);const B=j(d,o),H=n?`${t.guide}: ${t.chooseLimit}`:`${t.guide}: ${F.eyeClosed}`,$=[n&&v===1?t.guideForcedOneMove:null,n&&A?t.guideTwoWordClue:null,E?t.guideBlurActive:null,S?t.guideNightmareHidden:null].filter(Boolean),G=$.length?`<div class="guide__meta ${n?"guide__meta--active":"guide__meta--muted"}">${$.join(" • ")}</div>`:"",N=Array.from({length:x},(e,s)=>{const u=s+1;return`
            <button
                class="guide__num-btn ${r.guideLimit===u?"guide__num-btn--chosen":""}"
                data-limit="${u}"
                ${!n||v!==null&&u!==v?"disabled":""}
            >${u}</button>
        `}).join(""),b=new Set(i.cells.map((e,s)=>e.revealed?s:-1).filter(e=>e>=0));a.innerHTML=`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${n?"guide__title--active":"guide__title--muted"}">${B}</div>
                    <div class="guide__meta ${n?"guide__meta--active":"guide__meta--muted"}">${H}</div>
                    ${G}
                    <div class="guide__btns ${n?"guide__btns--active":"guide__btns--muted"}">${N}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${d}">
                    <div class="grid grid--5">
                        ${i.cells.map((e,s)=>`
                            <div class="${O(e,{team:d,effects:l})}" data-index="${s}">
                                <span class="cell__content">${k(e.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${q(i,o)}
        </div>
    `,a.querySelectorAll(".guide .grid .cell").forEach((e,s)=>{m&&(!b.has(s)||g.has(s)||e.classList.add("cell--reveal-anim"))}),g=b,m=!0,requestAnimationFrame(()=>{a.querySelectorAll(".cell").forEach(e=>I(e))}),a.querySelectorAll(".guide__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>c.setGuideLimit(parseInt(e.dataset.limit,10)))})}function _({state:i,language:o}={}){const t=i??c.getState(),r=o??c.getLanguage();if(!t||t.phase==="lobby"){T(r);return}L(t,r)}c.subscribe(_),p.onChange(()=>_()),M(()=>_())}export{J as initGuide};
