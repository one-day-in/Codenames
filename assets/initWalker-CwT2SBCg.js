import{i as h,o as E}from"./initGuestPage-UYp77Mbw.js";import{b as G}from"./keepAlive-CwTVj7YU.js";import{t as c,D as p,g as B}from"./i18n-pkrfkOVn.js";import{g as C}from"./url-DMe9pim_.js";import"./presence-JaBJnldC.js";async function H(l){const m=await h(l,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${c(p).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!m)return;const{presence:w,store:r,team:a}=m;function g(n=p){l.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${c(n).waitingStart}</p>
        </div>`}function $(n,o){const e=c(o),s=n.winner===a;l.innerHTML=`
            <div class="awake-screen awake-screen--${n.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${e.awake}</div>
                    <div class="awake-screen__awakening">${B(n.winner,o)}</div>
                    <div class="awake-screen__role">${s?"🏆":"💀"} ${a} ${e.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${e.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await r.resetGame(),window.location.href=C()+"/index.html"})}function f(n,o){var u;const e=c(o),s=n.turn,_=s.team===a,v=s.guideLimit!==null,i=_&&v&&!n.gameOver,k=v?s.guideLimit-s.dreamwalkerMoves:null,L=n.cells.filter(t=>t.role==="resonant"&&!t.revealed).length,b=n.cells.filter(t=>t.role==="dissonant"&&!t.revealed).length,y=_?v?`${k} ${e.movesLeft}`:e.waitingGuide:`${e.turn}: ${s.team.toUpperCase()}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${s.team}`),l.innerHTML=`
            <div class="controller controller--${a}">
                <div class="controller__status">
                    <span class="controller__status-team controller__status-team--${a}">${a.toUpperCase()}</span>
                    <span class="controller__status-moves${i?" controller__status-moves--active":""}">${y}</span>
                    <div class="controller__score">
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--resonant"></div>
                            <span class="controller__score-count">${L}</span>
                            <span class="controller__score-label">RES</span>
                        </div>
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--dissonant"></div>
                            <span class="controller__score-count">${b}</span>
                            <span class="controller__score-label">DIS</span>
                        </div>
                    </div>
                </div>

                <div class="controller__grid">
                    ${n.cells.map((t,T)=>`
                        <div class="controller__cell ${G(t)}${i&&!t.revealed?" controller__cell--clickable":""}"
                             data-index="${T}">
                            <span>${t.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${i?"":"disabled"}>
                    ${i?e.endTurn:_?e.waitingGuide:`${e.turn}: ${s.team.toUpperCase()}`}
                </button>
            </div>`,l.querySelectorAll(".controller__cell--clickable").forEach(t=>{t.addEventListener("click",()=>r.reveal(parseInt(t.dataset.index,10)))}),(u=document.getElementById("endTurnBtn"))==null||u.addEventListener("click",()=>{i&&r.endTurn()})}function d({state:n,language:o}={}){const e=n??r.getState(),s=o??r.getLanguage();if(!e||e.phase==="lobby"){g(s);return}if(e.gameOver){$(e,s);return}f(e,s)}r.subscribe(d),w.onChange(()=>d()),E(()=>d())}export{H as initWalker};
