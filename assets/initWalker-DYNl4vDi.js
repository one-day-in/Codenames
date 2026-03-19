import{g as T,e as h,r as y,a as L,b as C,o as S,h as M,i as x,j as A}from"./revealedCells-DKT6lswF.js";import{b as O,f as E,I as p,t as k,D as $}from"./url-BHlpuSFz.js";import{i as G,b as I}from"./initGuestPage-DI-kg4SI.js";import"./entry-GcncORAd.js";import"./roomRepository-CqK91rp1.js";function B({state:e,lang:s,team:d,syncStatus:r}){const t=k(s),i=e.turn,o=i.team===d,v=i.guideLimit!==null,l=o&&v&&!e.gameOver&&!e.turnTransition,u=v?Math.max((i.guideLimit??0)-(i.dreamwalkerMoves??0),0):0,a=O(d,s),m=l?`${t.dreamwalker}: <span class="walker__moves-value">${E(u,s)}</span>`:`${t.dreamwalker}: ${p.x}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__header">
                    <div class="walker__title ${l?"walker__title--active":"walker__title--muted"}">${a}</div>
                    <div class="walker__meta">
                        <div class="${l?"walker__status walker__status--active":"walker__status walker__status--muted"}">${m}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${t.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${l?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${t.endTurn}" ${l?"":"disabled"}>${p.refreshCw}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${d}">
                    <div class="grid grid--5">
                        ${e.cells.map((n,_)=>`
                            <div
                                class="${T(n)} ${l&&!n.revealed?"cell--clickable":""}"
                                data-index="${_}"
                            >
                                <span class="cell__content">${h(n.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${y(r,s)}
            ${L(e,s)}
            ${C({state:e,lang:s,team:d})}
        </div>
    `}async function W(e){const s=await G(e,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${k($).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!s)return;const{presence:d,store:r,team:t}=s;let i=!1,o=new Set;function v(a=$){i=!1,o=new Set,e.innerHTML=`<div class="waiting-screen">
            <p>${k(a).waitingGame}</p>
        </div>`}function l(a,m){var w;const c=M(a.cells),n=a.turn,_=n.team===t,g=n.guideLimit!==null,b=_&&g&&!a.gameOver&&!a.turnTransition;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${t}`),e.innerHTML=B({state:a,lang:m,team:t,syncStatus:r.getSyncStatus()}),x({root:e,selector:".walker .grid .cell",currentRevealed:c,prevRevealed:o,hasRenderedBoard:i}),o=c,i=!0,requestAnimationFrame(()=>A(e)),e.querySelectorAll(".cell--clickable").forEach(f=>{f.addEventListener("click",()=>r.reveal(parseInt(f.dataset.index,10)))}),(w=document.getElementById("refreshBtn"))==null||w.addEventListener("click",()=>{b&&r.endTurn()}),I(e,()=>r.dismissTurnTransition())}function u({state:a,language:m}={}){const c=a??r.getState(),n=m??r.getLanguage();if(!c){v(n);return}l(c,n)}r.subscribe(u),d.onChange(()=>u()),S(()=>u())}export{W as initWalker};
