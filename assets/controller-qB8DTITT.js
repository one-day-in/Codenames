const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/keepAlive-JCSCQkeA.js","assets/keepAlive-Bs_83nby.css"])))=>i.map(i=>d[i]);
import{t as i,D as d,R as $,k as G,c as M,b as I,g as O,e as B}from"./keepAlive-JCSCQkeA.js";import{_ as D,o as H}from"./fullscreen-D1PshyVK.js";function N(){const t=new URLSearchParams(window.location.search);return{roomId:t.get("room"),token:t.get("token"),team:t.get("team")}}async function P(t){const{roomId:_,token:g,team:s}=N();if(!_||!g||!s||s!=="resonant"&&s!=="dissonant"){t.innerHTML=`<div class="error-screen">
            <p>${i(d).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const{supabase:L}=await D(async()=>{const{supabase:n}=await import("./keepAlive-JCSCQkeA.js").then(o=>o.f);return{supabase:n}},__vite__mapDeps([0,1])),{data:b,error:f}=await L.from("rooms").select("id, guest_token").eq("id",_).eq("guest_token",g).maybeSingle();if(!b||f){t.innerHTML=`<div class="error-screen">
            <p>${i(d).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const v=s==="resonant"?$.WALKER_RESONANT:$.WALKER_DISSONANT,u=M(_);if(await u.isRoleTaken(v)){t.innerHTML=`<div class="waiting-screen">
            <div class="taken-screen">
                <p class="taken-screen__icon">🔒</p>
                <p class="taken-screen__text">${s} ${i(d).dreamwalker}<br>${i(d).controllerTaken.replace(`
`,"<br>")}</p>
            </div>
        </div>`;return}u.join(v),G(u,v),document.body.classList.add(`team-${s}`);const c=I(_);await c.init();function T(n=d){t.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${i(n).waitingStart}</p>
        </div>`}function E(n,o){const e=i(o),r=n.winner===s;t.innerHTML=`
            <div class="awake-screen awake-screen--${n.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${e.awake}</div>
                    <div class="awake-screen__awakening">${O(n.winner,o)}</div>
                    <div class="awake-screen__role">${r?"🏆":"💀"} ${s} ${e.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${e.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",()=>c.createGame())}function y(n,o){var k;const e=i(o),r=n.turn,p=r.team===s,w=r.guideLimit!==null,l=p&&w&&!n.gameOver,S=w?r.guideLimit-r.dreamwalkerMoves:null,A=n.cells.filter(a=>a.role==="resonant"&&!a.revealed).length,h=n.cells.filter(a=>a.role==="dissonant"&&!a.revealed).length,C=p?w?`${S} ${e.movesLeft}`:e.waitingGuide:`${e.turn}: ${r.team.toUpperCase()}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${r.team}`),t.innerHTML=`
            <div class="controller controller--${s}">
                <div class="controller__status">
                    <span class="controller__status-team controller__status-team--${s}">${s.toUpperCase()}</span>
                    <span class="controller__status-moves${l?" controller__status-moves--active":""}">${C}</span>
                    <div class="controller__score">
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--resonant"></div>
                            <span class="controller__score-count">${A}</span>
                            <span class="controller__score-label">RES</span>
                        </div>
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--dissonant"></div>
                            <span class="controller__score-count">${h}</span>
                            <span class="controller__score-label">DIS</span>
                        </div>
                    </div>
                </div>

                <div class="controller__grid">
                    ${n.cells.map((a,R)=>`
                        <div class="controller__cell ${B(a)}${l&&!a.revealed?" controller__cell--clickable":""}"
                             data-index="${R}">
                            <span>${a.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${l?"":"disabled"}>
                    ${l?e.endTurn:p?e.waitingGuide:`${e.turn}: ${r.team.toUpperCase()}`}
                </button>
            </div>`,t.querySelectorAll(".controller__cell--clickable").forEach(a=>{a.addEventListener("click",()=>c.reveal(parseInt(a.dataset.index,10)))}),(k=document.getElementById("endTurnBtn"))==null||k.addEventListener("click",()=>{l&&c.endTurn()})}function m({state:n,language:o}={}){const e=n??c.getState(),r=o??c.getLanguage();if(!e||e.phase==="lobby"){T(r);return}if(e.gameOver){E(e,r);return}y(e,r)}c.subscribe(m),u.onChange(()=>m()),H(()=>m())}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&P(t)});
