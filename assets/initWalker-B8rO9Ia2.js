import{g as L,e as S,r as x,a as C,b as M,o as A,h as O,i as E,k as G,l as I,j as B}from"./turnTransitionDismiss-av7aOM0l.js";import{b as R,f as H,I as $,t as w,D as T}from"./url-Qg2x4s1h.js";import{i as P}from"./initGuestPage-qnMq8DCM.js";import"./entry-TbYj9kQI.js";import"./roomRepository-DwKmHnBd.js";function D({state:e,lang:s,team:d,syncStatus:r}){const n=w(s),t=e.turn,u=t.team===d,o=t.guideLimit!==null,i=u&&o&&!e.gameOver&&!e.turnTransition,k=o?Math.max((t.guideLimit??0)-(t.dreamwalkerMoves??0),0):0,v=R(d,s),a=i?`${n.dreamwalker}: <span class="walker__moves-value">${H(k,s)}</span>`:`${n.dreamwalker}: ${$.eyeClosed}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__title ${i?"walker__title--active":"walker__title--muted"}">${v}</div>
                <div class="walker__header">
                    <div class="walker__meta">
                        <div class="${i?"walker__status walker__status--active":"walker__status walker__status--muted"}">${a}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${n.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${i?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${n.endTurn}" ${i?"":"disabled"}>${$.x}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${d}">
                    <div class="grid grid--5">
                        ${e.cells.map((l,c)=>`
                            <div
                                class="${L(l)} ${i&&!l.revealed?"cell--clickable":""}"
                                data-index="${c}"
                            >
                                <span class="cell__content">${S(l.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${x(r,s)}
            ${C(e,s)}
            ${M({state:e,lang:s,team:d})}
        </div>
    `}async function U(e){const s=await P(e,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${w(T).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!s)return;const{presence:d,store:r,team:n}=s;let t=!1,u=new Set,o="";function i(a=T){t=!1,u=new Set,o="",e.innerHTML=`<div class="waiting-screen">
            <p>${w(a).waitingGame}</p>
        </div>`}function k(a,_,{forceFit:l=!1}={}){var g;const c=O(a.cells),m=a.turn,y=m.team===n,b=m.guideLimit!==null,h=y&&b&&!a.gameOver&&!a.turnTransition;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${n}`),e.innerHTML=D({state:a,lang:_,team:n,syncStatus:r.getSyncStatus()}),E({root:e,selector:".walker .grid .cell",currentRevealed:c,prevRevealed:u,hasRenderedBoard:t}),u=c,t=!0;const f=G(a.cells);(l||f!==o)&&(o=f,requestAnimationFrame(()=>I(e))),e.querySelectorAll(".cell--clickable").forEach(p=>{p.addEventListener("click",()=>r.reveal(parseInt(p.dataset.index,10)))}),(g=document.getElementById("refreshBtn"))==null||g.addEventListener("click",()=>{h&&r.endTurn()}),B(e,()=>r.dismissTurnTransition())}function v({state:a,language:_,forceFit:l=!1}={}){const c=a??r.getState(),m=_??r.getLanguage();if(!c){i(m);return}k(c,m,{forceFit:l})}r.subscribe(v),d.onChange(()=>{}),A(()=>v({forceFit:!0}))}export{U as initWalker};
