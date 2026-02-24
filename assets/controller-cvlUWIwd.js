import{t as s,D as l,a as w,c as k}from"./presence-h-CyODlV.js";import{o as h}from"./fullscreen-DHe8HjSE.js";import{a as y}from"./renderCell-BLtbsjKK.js";function C(){return new URLSearchParams(window.location.search).get("room")}async function E(o){const r=new URLSearchParams(window.location.search).get("team"),i=C();if(!i||!r||r!=="red"&&r!=="blue"){o.innerHTML=`
            <div class="error-screen">
                <p>${s(l).wrongLink.replace(`
`,"<br>")}</p>
            </div>`;return}const _=`controller-${r}`,u=w(i);if(await u.isRoleTaken(_)){o.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${r.toUpperCase()} controller<br>${s(l).controllerTaken.replace(`
`,"<br>")}</p>
                </div>
            </div>`;return}u.join(_),document.body.classList.add(`team-${r}`);const t=k(i);await t.init();function m(e=l){o.innerHTML=`
            <div class="waiting-screen">
                <p class="waiting-screen__hint">${s(e).waitingStart}</p>
            </div>`}function p(e){const d=e.language||l,c=s(d),a=e.winner===r;o.innerHTML=`
            <div class="gameover-screen gameover-screen--${r}">
                <div class="gameover-screen__content">
                    <div class="gameover-screen__result">${a?c.victory:c.defeat}</div>
                    <div class="gameover-screen__team">${r.toUpperCase()}</div>
                </div>
            </div>`}function g(e){const d=e.language||l,c=s(d),a=e.activeTeam===r,$=e.cells.filter(n=>n.role==="red"&&!n.revealed).length,f=e.cells.filter(n=>n.role==="blue"&&!n.revealed).length;document.body.classList.remove("team-red","team-blue"),document.body.classList.add(`team-${e.activeTeam}`),o.innerHTML=`
            <div class="controller controller--${r}">
                <header class="controller__header">
                    <div class="controller__team-badge controller__team-badge--${r}">
                        ${r.toUpperCase()}
                    </div>
                    <div class="controller__score">
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--red"></div>
                            <span class="controller__score-count">${$}</span>
                            <span class="controller__score-label">RED</span>
                        </div>
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--blue"></div>
                            <span class="controller__score-count">${f}</span>
                            <span class="controller__score-label">BLUE</span>
                        </div>
                    </div>
                    <div class="controller__actions">
                        <span class="controller__turn-label ${a?"controller__turn-label--active":""}">
                            ${a?c.yourTurn:`${c.turn} ${e.activeTeam.toUpperCase()}`}
                        </span>
                        <button class="controller__end-turn-btn" id="endTurnBtn" ${a?"":"disabled"}>
                            ${c.endTurn}
                        </button>
                    </div>
                </header>

                <div class="controller__grid">
                    ${e.cells.map((n,L)=>{const T=!n.revealed&&a&&!e.gameOver;return`
                            <div class="controller__cell ${y(n)} ${T?"controller__cell--clickable":""}"
                                 data-index="${L}">
                                <span>${n.word}</span>
                            </div>`}).join("")}
                </div>
            </div>`,o.querySelectorAll(".controller__cell--clickable").forEach(n=>{n.addEventListener("click",()=>{t.reveal(parseInt(n.dataset.index,10))})});const v=document.getElementById("endTurnBtn");v&&!v.disabled&&v.addEventListener("click",()=>t.endTurn())}function b(){const e=t.getState();if(!e){m();return}if(e.gameOver){p(e);return}g(e)}h(b),t.subscribe(e=>{if(!e){m();return}if(e.gameOver){p(e);return}g(e)})}document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector("#app");o&&E(o)});
