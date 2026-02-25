import{i as h,o as E}from"./initGuestPage-DV4Hb3A9.js";import{d as G}from"./keepAlive-hefo0P0Z.js";import{t as i,D as p,b as B,g as C}from"./url-DqvqMluG.js";async function M(l){const u=await h(l,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${i(p).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!u)return;const{presence:w,store:r,team:a}=u;function g(n=p){l.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${i(n).waitingLobby}</p>
        </div>`}function $(n,o){const e=i(o),s=n.winner===a;l.innerHTML=`
            <div class="awake-screen awake-screen--${n.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${e.awake}</div>
                    <div class="awake-screen__awakening">${B(n.winner,o)}</div>
                    <div class="awake-screen__role">${s?"🏆":"💀"} ${a} ${e.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${e.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await r.resetGame(),window.location.href=C()+"/index.html"})}function k(n,o){var m;const e=i(o),s=n.turn,_=s.team===a,v=s.guideLimit!==null,c=_&&v&&!n.gameOver,b=v?s.guideLimit-s.dreamwalkerMoves:null,f=n.cells.filter(t=>t.role==="resonant"&&!t.revealed).length,L=n.cells.filter(t=>t.role==="dissonant"&&!t.revealed).length,y=_?v?`${b} ${e.movesLeft}`:e.waitingGuide:`${e.turn}: ${s.team.toUpperCase()}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${s.team}`),l.innerHTML=`
            <div class="controller controller--${a}">
                <div class="controller__status">
                    <span class="controller__status-team controller__status-team--${a}">${a.toUpperCase()}</span>
                    <span class="controller__status-moves${c?" controller__status-moves--active":""}">${y}</span>
                    <div class="controller__score">
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--resonant"></div>
                            <span class="controller__score-count">${f}</span>
                            <span class="controller__score-label">RES</span>
                        </div>
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--dissonant"></div>
                            <span class="controller__score-count">${L}</span>
                            <span class="controller__score-label">DIS</span>
                        </div>
                    </div>
                </div>

                <div class="controller__grid">
                    ${n.cells.map((t,T)=>`
                        <div class="controller__cell ${G(t)}${c&&!t.revealed?" controller__cell--clickable":""}"
                             data-index="${T}">
                            <span>${t.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${c?"":"disabled"}>
                    ${c?e.endTurn:_?e.waitingGuide:`${e.turn}: ${s.team.toUpperCase()}`}
                </button>
            </div>`,l.querySelectorAll(".controller__cell--clickable").forEach(t=>{t.addEventListener("click",()=>r.reveal(parseInt(t.dataset.index,10)))}),(m=document.getElementById("endTurnBtn"))==null||m.addEventListener("click",()=>{c&&r.endTurn()})}function d({state:n,language:o}={}){const e=n??r.getState(),s=o??r.getLanguage();if(!e||e.phase==="lobby"){g(s);return}if(e.gameOver){$(e,s);return}k(e,s)}r.subscribe(d),w.onChange(()=>d()),E(()=>d())}export{M as initWalker};
