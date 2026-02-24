import{t as i,D as d,R as k,c as h,b as y,g as A,e as G}from"./presence-i8yqKOzs.js";import{o as C}from"./fullscreen-DHe8HjSE.js";function M(){return new URLSearchParams(window.location.search).get("room")}function O(){return new URLSearchParams(window.location.search).get("team")}async function B(s){const _=M(),n=O();if(!_||!n||n!=="resonant"&&n!=="dissonant"){s.innerHTML=`
            <div class="error-screen">
                <p>${i(d).wrongLink.replace(`
`,"<br>")}</p>
            </div>`;return}const m=n==="resonant"?k.WALKER_RESONANT:k.WALKER_DISSONANT,w=h(_);if(await w.isRoleTaken(m)){s.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${n} Dreamwalker<br>${i(d).controllerTaken.replace(`
`,"<br>")}</p>
                </div>
            </div>`;return}w.join(m),document.body.classList.add(`team-${n}`);const o=y(_);await o.init();function g(e=d){s.innerHTML=`
            <div class="waiting-screen">
                <p class="waiting-screen__hint">${i(e).waitingStart}</p>
            </div>`}function p(e){const c=e.language||d,t=i(c),a=e.winner===n;s.innerHTML=`
            <div class="awake-screen awake-screen--${e.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${t.awake}</div>
                    <div class="awake-screen__awakening">${A(e.winner,c)}</div>
                    <div class="awake-screen__role">${a?"🏆":"💀"} ${n} ${t.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${t.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",()=>{o.createGame(c)})}function $(e){var L;const c=e.language||d,t=i(c),a=e.turn,u=a.team===n,v=a.guideLimit!==null,l=u&&v&&!e.gameOver,b=v?a.guideLimit-a.dreamwalkerMoves:null,T=e.cells.filter(r=>r.role==="resonant"&&!r.revealed).length,E=e.cells.filter(r=>r.role==="dissonant"&&!r.revealed).length,S=u?v?`${b} ${t.movesLeft}`:t.waitingGuide:`${t.turn}: ${a.team}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${a.team}`),s.innerHTML=`
            <div class="controller controller--${n}">
                <div class="controller__status">
                    <span class="controller__status-team controller__status-team--${n}">${n.toUpperCase()}</span>
                    <span class="controller__status-moves${l?" controller__status-moves--active":""}">${S}</span>
                    <div class="controller__score">
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--resonant"></div>
                            <span class="controller__score-count">${T}</span>
                            <span class="controller__score-label">RES</span>
                        </div>
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--dissonant"></div>
                            <span class="controller__score-count">${E}</span>
                            <span class="controller__score-label">DIS</span>
                        </div>
                    </div>
                </div>

                <div class="controller__grid">
                    ${e.cells.map((r,R)=>`
                        <div class="controller__cell ${G(r)}${l&&!r.revealed?" controller__cell--clickable":""}"
                             data-index="${R}">
                            <span>${r.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${l?"":"disabled"}>
                    ${l?t.endTurn:u?t.waitingGuide:`${t.turn}: ${a.team.toUpperCase()}`}
                </button>
            </div>`,s.querySelectorAll(".controller__cell--clickable").forEach(r=>{r.addEventListener("click",()=>o.reveal(parseInt(r.dataset.index,10)))}),(L=document.getElementById("endTurnBtn"))==null||L.addEventListener("click",()=>{l&&o.endTurn()})}function f(){const e=o.getState();if(!e){g();return}if(e.gameOver){p(e);return}$(e)}C(f),o.subscribe(e=>{if(!e){g();return}if(e.gameOver){p(e);return}$(e)})}document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector("#app");s&&B(s)});
