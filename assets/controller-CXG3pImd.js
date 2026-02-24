import{t as u,D as p,R as L,c as y,b as A,g as C,d as G}from"./presence-POag23zp.js";function H(a){let c=window.innerWidth,e=window.innerHeight;const l=new ResizeObserver(()=>{const d=window.innerWidth,v=window.innerHeight;(d!==c||v!==e)&&(c=d,e=v,a())});return l.observe(document.documentElement),()=>l.disconnect()}function M(){return new URLSearchParams(window.location.search).get("room")}function O(){return new URLSearchParams(window.location.search).get("team")}async function B(a){const c=M(),e=O();if(!c||!e||e!=="resonant"&&e!=="dissonant"){a.innerHTML=`<div class="error-screen">
            <p>${u(p).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const l=e==="resonant"?L.WALKER_RESONANT:L.WALKER_DISSONANT,d=y(c);if(await d.isRoleTaken(l)){a.innerHTML=`<div class="waiting-screen">
            <div class="taken-screen">
                <p class="taken-screen__icon">🔒</p>
                <p class="taken-screen__text">${e} Dreamwalker<br>${u(p).controllerTaken.replace(`
`,"<br>")}</p>
            </div>
        </div>`;return}d.join(l),document.body.classList.add(`team-${e}`);const o=A(c);await o.init();function k(t=p){a.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${u(t).waitingStart}</p>
        </div>`}function f(t,i){const n=u(i),r=t.winner===e;a.innerHTML=`
            <div class="awake-screen awake-screen--${t.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${n.awake}</div>
                    <div class="awake-screen__awakening">${C(t.winner,i)}</div>
                    <div class="awake-screen__role">${r?"🏆":"💀"} ${e} ${n.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${n.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",()=>o.createGame())}function b(t,i){var $;const n=u(i),r=t.turn,m=r.team===e,w=r.guideLimit!==null,_=m&&w&&!t.gameOver,h=w?r.guideLimit-r.dreamwalkerMoves:null,T=t.cells.filter(s=>s.role==="resonant"&&!s.revealed).length,E=t.cells.filter(s=>s.role==="dissonant"&&!s.revealed).length,S=m?w?`${h} ${n.movesLeft}`:n.waitingGuide:`${n.turn}: ${r.team.toUpperCase()}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${r.team}`),a.innerHTML=`
            <div class="controller controller--${e}">
                <div class="controller__status">
                    <span class="controller__status-team controller__status-team--${e}">${e.toUpperCase()}</span>
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
                    ${t.cells.map((s,R)=>`
                        <div class="controller__cell ${G(s)}${_&&!s.revealed?" controller__cell--clickable":""}"
                             data-index="${R}">
                            <span>${s.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${_?"":"disabled"}>
                    ${_?n.endTurn:m?n.waitingGuide:`${n.turn}: ${r.team.toUpperCase()}`}
                </button>
            </div>`,a.querySelectorAll(".controller__cell--clickable").forEach(s=>{s.addEventListener("click",()=>o.reveal(parseInt(s.dataset.index,10)))}),($=document.getElementById("endTurnBtn"))==null||$.addEventListener("click",()=>{_&&o.endTurn()})}function g({state:t,language:i}={}){const n=t??o.getState(),r=i??o.getLanguage();if(!n){k(r);return}if(n.gameOver){f(n,r);return}b(n,r)}o.subscribe(g),H(()=>g())}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("#app");a&&B(a)});
