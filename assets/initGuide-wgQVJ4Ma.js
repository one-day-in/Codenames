import{m as C,e as w,r as A,a as G,b as B,o as x,h as H,i as N,k,n as M,j as O}from"./turnTransitionDismiss-av7aOM0l.js";import{b as E,I,t as y,D as b,n as R}from"./url-Qg2x4s1h.js";import{i as j}from"./initGuestPage-qnMq8DCM.js";import"./entry-TbYj9kQI.js";import"./roomRepository-DwKmHnBd.js";function F({state:e,lang:d,team:r,syncStatus:a,maxHintButtons:m,teamEffects:s}){const i=y(d),o=e.turn,f=o.team===r,T=o.guideLimit!==null,t=f&&!T&&!e.gameOver&&!e.turnTransition,n=s.allowTwoWordClue,l=s.forcedGuideLimit,v=s.hideEnemyColors,g=s.hideNightmare,u=E(r,d),_=t?`${i.guide}: ${i.chooseLimit}`:`${i.guide}: ${I.eyeClosed}`,c=[t&&l===1?i.guideForcedOneMove:null,t&&n?i.guideTwoWordClue:null,v?i.guideBlurActive:null,g?i.guideNightmareHidden:null].filter(Boolean),L=c.length?`<div class="guide__meta ${t?"guide__meta--active":"guide__meta--muted"}">${c.join(" • ")}</div>`:"",S=Array.from({length:m},(h,p)=>{const $=p+1;return`
            <button
                class="guide__num-btn ${o.guideLimit===$?"guide__num-btn--chosen":""}"
                data-limit="${$}"
                ${!t||l!==null&&$!==l?"disabled":""}
            >${$}</button>
        `}).join("");return`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${t?"guide__title--active":"guide__title--muted"}">${u}</div>
                    <div class="guide__meta ${t?"guide__meta--active":"guide__meta--muted"}">${_}</div>
                    ${L}
                    <div class="guide__btns ${t?"guide__btns--active":"guide__btns--muted"}">${S}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${r}">
                    <div class="grid grid--5">
                        ${e.cells.map((h,p)=>`
                            <div class="${C(h,{team:r,effects:s})}" data-index="${p}">
                                <span class="cell__content">${w(h.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${A(a,d)}
            ${G(e,d)}
            ${B({state:e,lang:d,team:r})}
        </div>
    `}const W=8;async function J(e){const d=await j(e,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${y(b).scanQr}</p>
        </div>`});if(!d)return;const{presence:r,store:a,team:m}=d;let s=!1,i=new Set,o="";function f(n=b){s=!1,i=new Set,o="",e.innerHTML=`<div class="waiting-screen">
            <p>${y(n).waitingGame}</p>
        </div>`}function T(n,l,{forceFit:v=!1}={}){const g=R(n.teamEffects)[m];document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${m}`);const u=H(n.cells);e.innerHTML=F({state:n,lang:l,team:m,syncStatus:a.getSyncStatus(),maxHintButtons:W,teamEffects:g}),N({root:e,selector:".guide .grid .cell",currentRevealed:u,prevRevealed:i,hasRenderedBoard:s}),i=u,s=!0;const _=k(n.cells);(v||_!==o)&&(o=_,requestAnimationFrame(()=>{e.querySelectorAll(".cell").forEach(c=>M(c))})),e.querySelectorAll(".guide__num-btn:not([disabled])").forEach(c=>{c.addEventListener("click",()=>a.setGuideLimit(parseInt(c.dataset.limit,10)))}),O(e,()=>a.dismissTurnTransition())}function t({state:n,language:l,forceFit:v=!1}={}){const g=n??a.getState(),u=l??a.getLanguage();if(!g){f(u);return}T(g,u,{forceFit:v})}a.subscribe(t),r.onChange(()=>{}),x(()=>t({forceFit:!0}))}export{J as initGuide};
