import{i as y,o as T}from"./initGuestPage-DxgKYrKW.js";import{g as h}from"./renderCell-C7h02id-.js";import{t as d,D as k,b as B,g as E}from"./url-oOUZ7you.js";import"./gameStore-BPAqR2vV.js";async function H(c){const m=await y(c,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${d(k).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!m)return;const{presence:$,store:t,team:i}=m;function p(n=k){c.innerHTML=`<div class="waiting-screen">
            <p>${d(n).waitingLobby}</p>
        </div>`}function b(n,s){const e=d(s),a=n.winner===i;c.innerHTML=`
            <div class="awake-screen awake-screen--${n.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${e.awake}</div>
                    <div class="awake-screen__awakening">${B(n.winner,s)}</div>
                    <div class="awake-screen__role">${a?"🏆":"💀"} ${i} ${e.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${e.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await t.resetGame(),window.location.href=E()+"/index.html"})}function L(n,s){var g;const e=d(s),a=n.turn,u=a.team===i,w=a.guideLimit!==null,o=u&&w&&!n.gameOver,v=i.charAt(0).toUpperCase()+i.slice(1),_=u&&w?`${v} ${e.dreamwalker} : ${a.guideLimit} ${e.steps}`:`${v} ${e.dreamwalker}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${a.team}`),c.innerHTML=`
        <div class="walker walker--${i}">
            <div class="grid grid--5">
                ${n.cells.map((r,f)=>`
                    <div
                        class="${h(r)} ${o&&!r.revealed?"cell--clickable":""}"
                        data-index="${f}"
                    >
                        <span class="cell__content">${r.word}</span>
                    </div>
                `).join("")}
            </div>
        </div>

        <div class="walker__status">${_}</div>

        <button
            class="walker__end-turn"
            id="endTurnBtn"
            ${o?"":"disabled"}
        >${e.endTurn}</button>
    `,c.querySelectorAll(".cell--clickable").forEach(r=>{r.addEventListener("click",()=>t.reveal(parseInt(r.dataset.index,10)))}),(g=document.getElementById("endTurnBtn"))==null||g.addEventListener("click",()=>{o&&t.endTurn()})}function l({state:n,language:s}={}){const e=n??t.getState(),a=s??t.getLanguage();if(!e||e.phase==="lobby"){p(a);return}if(e.gameOver){b(e,a);return}L(e,a)}t.subscribe(l),$.onChange(()=>l()),T(()=>l())}export{H as initWalker};
