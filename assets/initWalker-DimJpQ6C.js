import{g as L,e as x,r as C,a as M,o as S,h as A,i as O,k as E,l as G,j as B}from"./turnTransitionDismiss-phu5bpkv.js";import{b as I,f as R,I as $,t as w,D as T}from"./url-Qg2x4s1h.js";import{i as H}from"./initGuestPage-CNcb30Kt.js";import"./entry-BFgYRsjs.js";import"./roomRepository-DwKmHnBd.js";function P({state:e,lang:n,team:l}){const a=w(n),t=e.turn,c=t.team===l,d=t.guideLimit!==null,r=c&&d&&!e.gameOver&&!e.turnTransition,_=d?Math.max((t.guideLimit??0)-(t.dreamwalkerMoves??0),0):0,k=I(l,n),v=r?`${a.dreamwalker}: <span class="walker__moves-value">${R(_,n)}</span>`:`${a.dreamwalker}: ${$.eyeClosed}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__title ${r?"walker__title--active":"walker__title--muted"}">${k}</div>
                <div class="walker__header">
                    <div class="walker__meta">
                        <div class="${r?"walker__status walker__status--active":"walker__status walker__status--muted"}">${v}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${a.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${r?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${a.endTurn}" ${r?"":"disabled"}>${$.x}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${l}">
                    <div class="grid grid--5">
                        ${e.cells.map((i,o)=>`
                            <div
                                class="${L(i)} ${r&&!i.revealed?"cell--clickable":""}"
                                data-index="${o}"
                            >
                                <span class="cell__content">${x(i.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${C(e,n)}
            ${M({state:e,lang:n,team:l})}
        </div>
    `}async function q(e){const n=await H(e,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${w(T).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!n)return;const{presence:l,store:a,team:t}=n;let c=!1,d=new Set,r="";function _(s=T){c=!1,d=new Set,r="",e.innerHTML=`<div class="waiting-screen">
            <p>${w(s).waitingGame}</p>
        </div>`}function k(s,i,{forceFit:o=!1}={}){var g;const u=A(s.cells),m=s.turn,b=m.team===t,h=m.guideLimit!==null,y=b&&h&&!s.gameOver&&!s.turnTransition;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${t}`),e.innerHTML=P({state:s,lang:i,team:t}),O({root:e,selector:".walker .grid .cell",currentRevealed:u,prevRevealed:d,hasRenderedBoard:c}),d=u,c=!0;const f=E(s.cells);(o||f!==r)&&(r=f,requestAnimationFrame(()=>G(e))),e.querySelectorAll(".cell--clickable").forEach(p=>{p.addEventListener("click",()=>a.reveal(parseInt(p.dataset.index,10)))}),(g=document.getElementById("refreshBtn"))==null||g.addEventListener("click",()=>{y&&a.endTurn()}),B(e,()=>a.dismissTurnTransition())}function v({state:s,language:i,forceFit:o=!1}={}){const u=s??a.getState(),m=i??a.getLanguage();if(!u){_(m);return}k(u,m,{forceFit:o})}a.subscribe(v),l.onChange(()=>{}),S(()=>v({forceFit:!0}))}export{q as initWalker};
