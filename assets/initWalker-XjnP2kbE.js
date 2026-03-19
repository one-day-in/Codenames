import{g as y,e as T,r as h,a as L,b as C,o as S,h as M,i as A,j as O}from"./revealedCells-CJZlQrna.js";import{b as x,f as E,I as $,t as k,D as p}from"./url-DAL9jQbt.js";import{i as G,b as I}from"./initGuestPage-Bb-9fX9A.js";import"./entry-FFt7ZOJY.js";import"./roomRepository-CD0Cuu1e.js";function B({state:e,lang:r,team:d,syncStatus:s}){const t=k(r),i=e.turn,o=i.team===d,v=i.guideLimit!==null,l=o&&v&&!e.gameOver&&!e.turnTransition,u=v?Math.max((i.guideLimit??0)-(i.dreamwalkerMoves??0),0):0,a=x(d,r),m=l?`${t.dreamwalker}: ${E(u,r)}`:`${t.dreamwalker}: ${$.eyeClosed}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__header">
                    <div class="walker__title ${l?"walker__title--active":"walker__title--muted"}">${a}</div>
                    <div class="walker__meta">
                        <div class="${l?"walker__status walker__status--active":"walker__status walker__status--muted"}">${m}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${t.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${l?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${t.endTurn}" ${l?"":"disabled"}>${$.refreshCw}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${d}">
                    <div class="grid grid--5">
                        ${e.cells.map((n,_)=>`
                            <div
                                class="${y(n)} ${l&&!n.revealed?"cell--clickable":""}"
                                data-index="${_}"
                            >
                                <span class="cell__content">${T(n.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${h(s,r)}
            ${L(e,r)}
            ${C({state:e,lang:r,team:d})}
        </div>
    `}async function W(e){const r=await G(e,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${k(p).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!r)return;const{presence:d,store:s,team:t}=r;let i=!1,o=new Set;function v(a=p){i=!1,o=new Set,e.innerHTML=`<div class="waiting-screen">
            <p>${k(a).waitingGame}</p>
        </div>`}function l(a,m){var w;const c=M(a.cells),n=a.turn,_=n.team===t,g=n.guideLimit!==null,b=_&&g&&!a.gameOver&&!a.turnTransition;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${t}`),e.innerHTML=B({state:a,lang:m,team:t,syncStatus:s.getSyncStatus()}),A({root:e,selector:".walker .grid .cell",currentRevealed:c,prevRevealed:o,hasRenderedBoard:i}),o=c,i=!0,requestAnimationFrame(()=>O(e)),e.querySelectorAll(".cell--clickable").forEach(f=>{f.addEventListener("click",()=>s.reveal(parseInt(f.dataset.index,10)))}),(w=document.getElementById("refreshBtn"))==null||w.addEventListener("click",()=>{b&&s.endTurn()}),I(e,()=>s.dismissTurnTransition())}function u({state:a,language:m}={}){const c=a??s.getState(),n=m??s.getLanguage();if(!c){v(n);return}l(c,n)}s.subscribe(u),d.onChange(()=>u()),S(()=>u())}export{W as initWalker};
