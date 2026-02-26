import{o as y}from"./resize-Cd5pde_8.js";import{g as T,f as A}from"./renderCell-j9Yfrae9.js";import{t as d,D as k,b as h,g as B}from"./url-oOUZ7you.js";import{i as E}from"./initGuestPage-Dsuy32t7.js";async function M(t){const m=await E(t,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${d(k).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!m)return;const{presence:$,store:i,team:s}=m;function p(n=k){t.innerHTML=`<div class="waiting-screen">
            <p>${d(n).waitingLobby}</p>
        </div>`}function b(n,r){const e=d(r),a=n.winner===s;t.innerHTML=`
            <div class="awake-screen awake-screen--${n.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${e.awake}</div>
                    <div class="awake-screen__awakening">${h(n.winner,r)}</div>
                    <div class="awake-screen__role">${a?"🏆":"💀"} ${s} ${e.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${e.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await i.resetGame(),window.location.href=B()+"/index.html"})}function f(n,r){var g;const e=d(r),a=n.turn,u=a.team===s,w=a.guideLimit!==null,o=u&&w&&!n.gameOver,v=s.charAt(0).toUpperCase()+s.slice(1),L=u&&w?`${v} ${e.dreamwalker} : ${a.guideLimit} ${e.steps}`:`${v} ${e.dreamwalker}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${a.team}`),t.innerHTML=`
        <div class="walker walker--${s}">
            <div class="grid grid--5">
                ${n.cells.map((c,_)=>`
                    <div
                        class="${T(c)} ${o&&!c.revealed?"cell--clickable":""}"
                        data-index="${_}"
                    >
                        <span class="cell__content">${c.word}</span>
                    </div>
                `).join("")}
            </div>
        </div>

        <div class="walker__status">${L}</div>

        <button
            class="walker__end-turn"
            id="endTurnBtn"
            ${o?"":"disabled"}
        >${e.endTurn}</button>
    `,requestAnimationFrame(()=>A(t)),t.querySelectorAll(".cell--clickable").forEach(c=>{c.addEventListener("click",()=>i.reveal(parseInt(c.dataset.index,10)))}),(g=document.getElementById("endTurnBtn"))==null||g.addEventListener("click",()=>{o&&i.endTurn()})}function l({state:n,language:r}={}){const e=n??i.getState(),a=r??i.getLanguage();if(!e||e.phase==="lobby"){p(a);return}if(e.gameOver){b(e,a);return}f(e,a)}i.subscribe(l),$.onChange(()=>l()),y(()=>l())}export{M as initWalker};
