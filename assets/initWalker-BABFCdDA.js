import{i as h,o as E}from"./initGuestPage-CzVUp2FJ.js";import{b as G}from"./presence-C90QuL_b.js";import{t as o,D as m,b as B,g as C}from"./url-DqvqMluG.js";async function M(i){const _=await h(i,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${o(m).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!_)return;const{presence:k,store:t,team:l}=_;function p(n=m){i.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${o(n).waitingLobby}</p>
        </div>`}function g(n,r){const e=o(r),a=n.winner===l;i.innerHTML=`
            <div class="awake-screen awake-screen--${n.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${e.awake}</div>
                    <div class="awake-screen__awakening">${B(n.winner,r)}</div>
                    <div class="awake-screen__role">${a?"🏆":"💀"} ${l} ${e.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${e.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await t.resetGame(),window.location.href=C()+"/index.html"})}function $(n,r){var u;const e=o(r),a=n.turn,w=a.team===l,v=a.guideLimit!==null,c=w&&v&&!n.gameOver,b=v?a.guideLimit-a.dreamwalkerMoves:null,f=n.cells.filter(s=>s.role==="resonant"&&!s.revealed).length,L=n.cells.filter(s=>s.role==="dissonant"&&!s.revealed).length,y=w?v?`${b} ${e.movesLeft}`:e.waitingGuide:`${e.turn}: ${a.team.toUpperCase()}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${a.team}`),i.innerHTML=`
        <div class="walker walker--${l}">
            <div class="walker__status">
                <span class="walker__status-team">
                    ${l.toUpperCase()}
                </span>

                <span class="walker__status-moves ${c?"walker__status-moves--active":""}">
                    ${y}
                </span>

                <div class="walker__score">
                    <div class="walker__score-row">
                        <div class="walker__score-dot walker__score-dot--resonant"></div>
                        <span class="walker__score-count">${f}</span>
                        <span class="walker__score-label">RES</span>
                    </div>

                    <div class="walker__score-row">
                        <div class="walker__score-dot walker__score-dot--dissonant"></div>
                        <span class="walker__score-count">${L}</span>
                        <span class="walker__score-label">DIS</span>
                    </div>
                </div>
            </div>

            <div class="grid grid--5">
                ${n.cells.map((s,T)=>`
                    <div
                        class="${G(s)} ${c&&!s.revealed?"cell--clickable":""}"
                        data-index="${T}"
                    >
                        <span class="cell__content">${s.word}</span>
                    </div>
                `).join("")}
            </div>

            <button
                class="walker__end-turn"
                id="endTurnBtn"
                ${c?"":"disabled"}
            >
                ${c?e.endTurn:w?e.waitingGuide:`${e.turn}: ${a.team.toUpperCase()}`}
            </button>
        </div>
    `,i.querySelectorAll(".cell--clickable").forEach(s=>{s.addEventListener("click",()=>t.reveal(parseInt(s.dataset.index,10)))}),(u=document.getElementById("endTurnBtn"))==null||u.addEventListener("click",()=>{c&&t.endTurn()})}function d({state:n,language:r}={}){const e=n??t.getState(),a=r??t.getLanguage();if(!e||e.phase==="lobby"){p(a);return}if(e.gameOver){g(e,a);return}$(e,a)}t.subscribe(d),k.onChange(()=>d()),E(()=>d())}export{M as initWalker};
