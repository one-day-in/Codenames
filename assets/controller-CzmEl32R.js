const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/presence-BKNTbHni.js","assets/presence-Bs_83nby.css"])))=>i.map(i=>d[i]);
import{t as i,D as d,R as k,c as G,b as M,g as I,e as O}from"./presence-BKNTbHni.js";import{_ as B,o as D}from"./fullscreen-D1PshyVK.js";function H(){const t=new URLSearchParams(window.location.search);return{roomId:t.get("room"),token:t.get("token"),team:t.get("team")}}async function N(t){const{roomId:_,token:v,team:s}=H();if(!_||!v||!s||s!=="resonant"&&s!=="dissonant"){t.innerHTML=`<div class="error-screen">
            <p>${i(d).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const{supabase:L}=await B(async()=>{const{supabase:e}=await import("./presence-BKNTbHni.js").then(o=>o.f);return{supabase:e}},__vite__mapDeps([0,1])),{data:f,error:b}=await L.from("rooms").select("id, guest_token").eq("id",_).eq("guest_token",v).maybeSingle();if(!f||b){t.innerHTML=`<div class="error-screen">
            <p>${i(d).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const p=s==="resonant"?k.WALKER_RESONANT:k.WALKER_DISSONANT,w=G(_);if(await w.isRoleTaken(p)){t.innerHTML=`<div class="waiting-screen">
            <div class="taken-screen">
                <p class="taken-screen__icon">🔒</p>
                <p class="taken-screen__text">${s} ${i(d).dreamwalker}<br>${i(d).controllerTaken.replace(`
`,"<br>")}</p>
            </div>
        </div>`;return}w.join(p),document.body.classList.add(`team-${s}`);const c=M(_);await c.init();function T(e=d){t.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${i(e).waitingStart}</p>
        </div>`}function E(e,o){const n=i(o),r=e.winner===s;t.innerHTML=`
            <div class="awake-screen awake-screen--${e.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${n.awake}</div>
                    <div class="awake-screen__awakening">${I(e.winner,o)}</div>
                    <div class="awake-screen__role">${r?"🏆":"💀"} ${s} ${n.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${n.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",()=>c.createGame())}function S(e,o){var $;const n=i(o),r=e.turn,u=r.team===s,m=r.guideLimit!==null,l=u&&m&&!e.gameOver,y=m?r.guideLimit-r.dreamwalkerMoves:null,A=e.cells.filter(a=>a.role==="resonant"&&!a.revealed).length,R=e.cells.filter(a=>a.role==="dissonant"&&!a.revealed).length,h=u?m?`${y} ${n.movesLeft}`:n.waitingGuide:`${n.turn}: ${r.team.toUpperCase()}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${r.team}`),t.innerHTML=`
            <div class="controller controller--${s}">
                <div class="controller__status">
                    <span class="controller__status-team controller__status-team--${s}">${s.toUpperCase()}</span>
                    <span class="controller__status-moves${l?" controller__status-moves--active":""}">${h}</span>
                    <div class="controller__score">
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--resonant"></div>
                            <span class="controller__score-count">${A}</span>
                            <span class="controller__score-label">RES</span>
                        </div>
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--dissonant"></div>
                            <span class="controller__score-count">${R}</span>
                            <span class="controller__score-label">DIS</span>
                        </div>
                    </div>
                </div>

                <div class="controller__grid">
                    ${e.cells.map((a,C)=>`
                        <div class="controller__cell ${O(a)}${l&&!a.revealed?" controller__cell--clickable":""}"
                             data-index="${C}">
                            <span>${a.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${l?"":"disabled"}>
                    ${l?n.endTurn:u?n.waitingGuide:`${n.turn}: ${r.team.toUpperCase()}`}
                </button>
            </div>`,t.querySelectorAll(".controller__cell--clickable").forEach(a=>{a.addEventListener("click",()=>c.reveal(parseInt(a.dataset.index,10)))}),($=document.getElementById("endTurnBtn"))==null||$.addEventListener("click",()=>{l&&c.endTurn()})}function g({state:e,language:o}={}){const n=e??c.getState(),r=o??c.getLanguage();if(!n){T(r);return}if(n.gameOver){E(n,r);return}S(n,r)}c.subscribe(g),D(()=>g())}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&N(t)});
