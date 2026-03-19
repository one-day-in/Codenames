import{g as y,e as T,r as h,a as L,b as C,o as S,h as A,i as O,j as E}from"./revealedCells-DL8M-zIv.js";import{b as G,f as I,I as f,t as _,D as $}from"./url-eJ8LOI6Y.js";import{i as x,b as B}from"./initGuestPage-BgsnjN7V.js";import"./entry-CCYgLOf4.js";import"./roomRepository-DaxW6Bbk.js";function M({state:e,lang:r,team:c,syncStatus:s}){const t=_(r),l=e.turn,o=l.team===c,v=l.guideLimit!==null,i=o&&v&&!e.gameOver&&!e.turnTransition,u=G(c,r),a=i?`${t.dreamwalker}: ${I(l.guideLimit,r)}`:`${t.dreamwalker}: ${f.eyeClosed}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__header">
                    <div class="walker__title ${i?"walker__title--active":"walker__title--muted"}">${u}</div>
                    <div class="walker__meta">
                        <div class="${i?"walker__status walker__status--active":"walker__status walker__status--muted"}">${a}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${t.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${i?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${t.endTurn}" ${i?"":"disabled"}>${f.refreshCw}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${c}">
                    <div class="grid grid--5">
                        ${e.cells.map((n,d)=>`
                            <div
                                class="${y(n)} ${i&&!n.revealed?"cell--clickable":""}"
                                data-index="${d}"
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
            ${C({state:e,lang:r,team:c})}
        </div>
    `}async function W(e){const r=await x(e,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${_($).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!r)return;const{presence:c,store:s,team:t}=r;let l=!1,o=new Set;function v(a=$){l=!1,o=new Set,e.innerHTML=`<div class="waiting-screen">
            <p>${_(a).waitingGame}</p>
        </div>`}function i(a,m){var k;const n=A(a.cells),d=a.turn,p=d.team===t,g=d.guideLimit!==null,b=p&&g&&!a.gameOver&&!a.turnTransition;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${t}`),e.innerHTML=M({state:a,lang:m,team:t,syncStatus:s.getSyncStatus()}),O({root:e,selector:".walker .grid .cell",currentRevealed:n,prevRevealed:o,hasRenderedBoard:l}),o=n,l=!0,requestAnimationFrame(()=>E(e)),e.querySelectorAll(".cell--clickable").forEach(w=>{w.addEventListener("click",()=>s.reveal(parseInt(w.dataset.index,10)))}),(k=document.getElementById("refreshBtn"))==null||k.addEventListener("click",()=>{b&&s.endTurn()}),B(e,()=>s.dismissTurnTransition())}function u({state:a,language:m}={}){const n=a??s.getState(),d=m??s.getLanguage();if(!n){v(d);return}i(n,d)}s.subscribe(u),c.onChange(()=>u()),S(()=>u())}export{W as initWalker};
