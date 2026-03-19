import{k as S,e as w,r as A,a as G,b as B,o as H,h as N,i as k,l as M}from"./revealedCells-CJZlQrna.js";import{b as O,I as E,t as f,D as y,n as I}from"./url-DAL9jQbt.js";import{i as x,b as R}from"./initGuestPage-Bb-9fX9A.js";import"./entry-FFt7ZOJY.js";import"./roomRepository-CD0Cuu1e.js";function W({state:i,lang:s,team:r,syncStatus:d,maxHintButtons:u,teamEffects:t}){const n=f(s),c=i.turn,_=c.team===r,m=c.guideLimit!==null,e=_&&!m&&!i.gameOver&&!i.turnTransition,g=t.allowTwoWordClue,a=t.forcedGuideLimit,o=t.hideEnemyColors,l=t.hideNightmare,T=O(r,s),b=e?`${n.guide}: ${n.chooseLimit}`:`${n.guide}: ${E.eyeClosed}`,p=[e&&a===1?n.guideForcedOneMove:null,e&&g?n.guideTwoWordClue:null,o?n.guideBlurActive:null,l?n.guideNightmareHidden:null].filter(Boolean),L=p.length?`<div class="guide__meta ${e?"guide__meta--active":"guide__meta--muted"}">${p.join(" • ")}</div>`:"",C=Array.from({length:u},($,h)=>{const v=h+1;return`
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
    `}const j=8;async function X(i){const s=await x(i,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${f(y).scanQr}</p>
        </div>`});if(!s)return;const{presence:r,store:d,team:u}=s;let t=!1,n=new Set;function c(e=y){t=!1,n=new Set,i.innerHTML=`<div class="waiting-screen">
            <p>${f(e).waitingGame}</p>
        </div>`}function _(e,g){const a=I(e.teamEffects)[u];document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${u}`);const o=N(e.cells);i.innerHTML=W({state:e,lang:g,team:u,syncStatus:d.getSyncStatus(),maxHintButtons:j,teamEffects:a}),k({root:i,selector:".guide .grid .cell",currentRevealed:o,prevRevealed:n,hasRenderedBoard:t}),n=o,t=!0,requestAnimationFrame(()=>{i.querySelectorAll(".cell").forEach(l=>M(l))}),i.querySelectorAll(".guide__num-btn:not([disabled])").forEach(l=>{l.addEventListener("click",()=>d.setGuideLimit(parseInt(l.dataset.limit,10)))}),R(i,()=>d.dismissTurnTransition())}function m({state:e,language:g}={}){const a=e??d.getState(),o=g??d.getLanguage();if(!a){c(o);return}_(a,o)}d.subscribe(m),r.onChange(()=>m()),H(()=>m())}export{X as initGuide};
