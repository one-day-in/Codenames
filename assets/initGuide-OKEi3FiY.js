import{m as C,e as w,r as A,a as G,o as S,h as B,i as x,k as H,n as N,j as k}from"./turnTransitionDismiss-phu5bpkv.js";import{b as M,I as O,t as b,D as y,n as E}from"./url-Qg2x4s1h.js";import{i as I}from"./initGuestPage-CNcb30Kt.js";import"./entry-BFgYRsjs.js";import"./roomRepository-DwKmHnBd.js";function R({state:e,lang:d,team:a,maxHintButtons:r,teamEffects:s}){const n=b(d),l=e.turn,g=l.team===a,T=l.guideLimit!==null,t=g&&!T&&!e.gameOver&&!e.turnTransition,f=s.allowTwoWordClue,i=s.forcedGuideLimit,m=s.hideEnemyColors,v=s.hideNightmare,u=M(a,d),o=t?`${n.guide}: ${n.chooseLimit}`:`${n.guide}: ${O.eyeClosed}`,_=[t&&i===1?n.guideForcedOneMove:null,t&&f?n.guideTwoWordClue:null,m?n.guideBlurActive:null,v?n.guideNightmareHidden:null].filter(Boolean),c=_.length?`<div class="guide__meta ${t?"guide__meta--active":"guide__meta--muted"}">${_.join(" • ")}</div>`:"",L=Array.from({length:r},(h,p)=>{const $=p+1;return`
            <button
                class="guide__num-btn ${l.guideLimit===$?"guide__num-btn--chosen":""}"
                data-limit="${$}"
                ${!t||i!==null&&$!==i?"disabled":""}
            >${$}</button>
        `}).join("");return`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${t?"guide__title--active":"guide__title--muted"}">${u}</div>
                    <div class="guide__meta ${t?"guide__meta--active":"guide__meta--muted"}">${o}</div>
                    ${c}
                    <div class="guide__btns ${t?"guide__btns--active":"guide__btns--muted"}">${L}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${a}">
                    <div class="grid grid--5">
                        ${e.cells.map((h,p)=>`
                            <div class="${C(h,{team:a,effects:s})}" data-index="${p}">
                                <span class="cell__content">${w(h.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${A(e,d)}
            ${G({state:e,lang:d,team:a})}
        </div>
    `}const j=8;async function Q(e){const d=await I(e,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${b(y).scanQr}</p>
        </div>`});if(!d)return;const{presence:a,store:r,team:s}=d;let n=!1,l=new Set,g="";function T(i=y){n=!1,l=new Set,g="",e.innerHTML=`<div class="waiting-screen">
            <p>${b(i).waitingGame}</p>
        </div>`}function t(i,m,{forceFit:v=!1}={}){const u=E(i.teamEffects)[s];document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${s}`);const o=B(i.cells);e.innerHTML=R({state:i,lang:m,team:s,maxHintButtons:j,teamEffects:u}),x({root:e,selector:".guide .grid .cell",currentRevealed:o,prevRevealed:l,hasRenderedBoard:n}),l=o,n=!0;const _=H(i.cells);(v||_!==g)&&(g=_,requestAnimationFrame(()=>{e.querySelectorAll(".cell").forEach(c=>N(c))})),e.querySelectorAll(".guide__num-btn:not([disabled])").forEach(c=>{c.addEventListener("click",()=>r.setGuideLimit(parseInt(c.dataset.limit,10)))}),k(e,()=>r.dismissTurnTransition())}function f({state:i,language:m,forceFit:v=!1}={}){const u=i??r.getState(),o=m??r.getLanguage();if(!u){T(o);return}t(u,o,{forceFit:v})}r.subscribe(f),a.onChange(()=>{}),S(()=>f({forceFit:!0}))}export{Q as initGuide};
