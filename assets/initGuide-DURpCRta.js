import{l as S,e as w,r as A,a as G,b as B,o as H,h as N,i as M,m as O,j as k}from"./turnTransitionDismiss-QwiMkGhE.js";import{b as E,I,t as f,D as y,n as x}from"./url-Qg2x4s1h.js";import{i as R}from"./initGuestPage-C4C-AsSG.js";import"./entry-D2mGTVD8.js";import"./roomRepository-DwKmHnBd.js";function j({state:i,lang:s,team:r,syncStatus:d,maxHintButtons:u,teamEffects:t}){const n=f(s),c=i.turn,_=c.team===r,m=c.guideLimit!==null,e=_&&!m&&!i.gameOver&&!i.turnTransition,g=t.allowTwoWordClue,a=t.forcedGuideLimit,o=t.hideEnemyColors,l=t.hideNightmare,T=E(r,s),b=e?`${n.guide}: ${n.chooseLimit}`:`${n.guide}: ${I.eyeClosed}`,p=[e&&a===1?n.guideForcedOneMove:null,e&&g?n.guideTwoWordClue:null,o?n.guideBlurActive:null,l?n.guideNightmareHidden:null].filter(Boolean),L=p.length?`<div class="guide__meta ${e?"guide__meta--active":"guide__meta--muted"}">${p.join(" • ")}</div>`:"",C=Array.from({length:u},($,h)=>{const v=h+1;return`
            <button
                class="guide__num-btn ${c.guideLimit===v?"guide__num-btn--chosen":""}"
                data-limit="${v}"
                ${!e||a!==null&&v!==a?"disabled":""}
            >${v}</button>
        `}).join("");return`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${e?"guide__title--active":"guide__title--muted"}">${T}</div>
                    <div class="guide__meta ${e?"guide__meta--active":"guide__meta--muted"}">${b}</div>
                    ${L}
                    <div class="guide__btns ${e?"guide__btns--active":"guide__btns--muted"}">${C}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${r}">
                    <div class="grid grid--5">
                        ${i.cells.map(($,h)=>`
                            <div class="${S($,{team:r,effects:t})}" data-index="${h}">
                                <span class="cell__content">${w($.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${A(d,s)}
            ${G(i,s)}
            ${B({state:i,lang:s,team:r})}
        </div>
    `}const W=8;async function X(i){const s=await R(i,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${f(y).scanQr}</p>
        </div>`});if(!s)return;const{presence:r,store:d,team:u}=s;let t=!1,n=new Set;function c(e=y){t=!1,n=new Set,i.innerHTML=`<div class="waiting-screen">
            <p>${f(e).waitingGame}</p>
        </div>`}function _(e,g){const a=x(e.teamEffects)[u];document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${u}`);const o=N(e.cells);i.innerHTML=j({state:e,lang:g,team:u,syncStatus:d.getSyncStatus(),maxHintButtons:W,teamEffects:a}),M({root:i,selector:".guide .grid .cell",currentRevealed:o,prevRevealed:n,hasRenderedBoard:t}),n=o,t=!0,requestAnimationFrame(()=>{i.querySelectorAll(".cell").forEach(l=>O(l))}),i.querySelectorAll(".guide__num-btn:not([disabled])").forEach(l=>{l.addEventListener("click",()=>d.setGuideLimit(parseInt(l.dataset.limit,10)))}),k(i,()=>d.dismissTurnTransition())}function m({state:e,language:g}={}){const a=e??d.getState(),o=g??d.getLanguage();if(!a){c(o);return}_(a,o)}d.subscribe(m),r.onChange(()=>m()),H(()=>m())}export{X as initGuide};
