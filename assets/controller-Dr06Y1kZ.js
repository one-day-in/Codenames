import{t as u,D as v,R as f,c as y,b as A,g as G,d as O}from"./presence-DELJsw60.js";function C(r){let o=window.innerWidth,n=window.innerHeight;const i=new ResizeObserver(()=>{const l=window.innerWidth,m=window.innerHeight;(l!==o||m!==n)&&(o=l,n=m,r())});return i.observe(document.documentElement),()=>i.disconnect()}function H(){return new URLSearchParams(window.location.search).get("room")}function M(){return new URLSearchParams(window.location.search).get("team")}async function B(r){const o=H(),n=M();if(!o||!n||n!=="resonant"&&n!=="dissonant"){r.innerHTML=`
            <div class="error-screen">
                <p>${u(v).wrongLink.replace(`
`,"<br>")}</p>
            </div>`;return}const i=n==="resonant"?f.WALKER_RESONANT:f.WALKER_DISSONANT,l=y(o);if(await l.isRoleTaken(i)){r.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${n} Dreamwalker<br>${u(v).controllerTaken.replace(`
`,"<br>")}</p>
                </div>
            </div>`;return}l.join(i),document.body.classList.add(`team-${n}`);const c=A(o);await c.init();function p(e=v){r.innerHTML=`
            <div class="waiting-screen">
                <p class="waiting-screen__hint">${u(e).waitingStart}</p>
            </div>`}function $(e){const d=e.language||v,s=u(d),a=e.winner===n;r.innerHTML=`
            <div class="awake-screen awake-screen--${e.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${s.awake}</div>
                    <div class="awake-screen__awakening">${G(e.winner,d)}</div>
                    <div class="awake-screen__role">${a?"🏆":"💀"} ${n} ${s.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${s.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",()=>{c.createGame(d)})}function L(e){var k;const d=e.language||v,s=u(d),a=e.turn,w=a.team===n,g=a.guideLimit!==null,_=w&&g&&!e.gameOver,h=g?a.guideLimit-a.dreamwalkerMoves:null,T=e.cells.filter(t=>t.role==="resonant"&&!t.revealed).length,E=e.cells.filter(t=>t.role==="dissonant"&&!t.revealed).length,S=w?g?`${h} ${s.movesLeft}`:s.waitingGuide:`${s.turn}: ${a.team}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${a.team}`),r.innerHTML=`
            <div class="controller controller--${n}">
                <div class="controller__status">
                    <span class="controller__status-team controller__status-team--${n}">${n.toUpperCase()}</span>
                    <span class="controller__status-moves${_?" controller__status-moves--active":""}">${S}</span>
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
                    ${e.cells.map((t,R)=>`
                        <div class="controller__cell ${O(t)}${_&&!t.revealed?" controller__cell--clickable":""}"
                             data-index="${R}">
                            <span>${t.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${_?"":"disabled"}>
                    ${_?s.endTurn:w?s.waitingGuide:`${s.turn}: ${a.team.toUpperCase()}`}
                </button>
            </div>`,r.querySelectorAll(".controller__cell--clickable").forEach(t=>{t.addEventListener("click",()=>c.reveal(parseInt(t.dataset.index,10)))}),(k=document.getElementById("endTurnBtn"))==null||k.addEventListener("click",()=>{_&&c.endTurn()})}function b(){const e=c.getState();if(!e){p();return}if(e.gameOver){$(e);return}L(e)}C(b),c.subscribe(e=>{if(!e){p();return}if(e.gameOver){$(e);return}L(e)})}document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector("#app");r&&B(r)});
