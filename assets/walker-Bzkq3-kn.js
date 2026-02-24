const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/i18n-BwlAWuOW.js","assets/i18n-AohV0cxf.css"])))=>i.map(i=>d[i]);
import{t as l,D as m,g as C}from"./i18n-BwlAWuOW.js";import{_ as G,o as I}from"./fullscreen-D1PshyVK.js";import{R as $,k as M,c as O,a as P,d as U}from"./keepAlive-D1x8_-Il.js";function D(){const n=new URLSearchParams(window.location.search);return{roomId:n.get("room"),token:n.get("token"),team:n.get("team")}}function H(){const{origin:n,pathname:i}=window.location;return n+i.split("?")[0].replace(/\/[^/]*$/,"")}async function N(n){const{roomId:i,token:g,team:a}=D();if(!i||!g||!a||a!=="resonant"&&a!=="dissonant"){n.innerHTML=`<div class="error-screen">
            <p>${l(m).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const{supabase:L}=await G(async()=>{const{supabase:e}=await import("./i18n-BwlAWuOW.js").then(o=>o.a);return{supabase:e}},__vite__mapDeps([0,1])),{data:b,error:f}=await L.from("rooms").select("id, guest_token").eq("id",i).eq("guest_token",g).maybeSingle();if(!b||f){n.innerHTML=`<div class="error-screen">
            <p>${l(m).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const u=a==="resonant"?$.WALKER_RESONANT:$.WALKER_DISSONANT,_=O(i);if(await _.isRoleTaken(u)){const e=l(m);n.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${a} ${e.dreamwalker}<br>${e.controllerTaken.replace(`
`,"<br>")}</p>
                    <button class="lobby__btn" id="forceJoinBtn">${e.forceRejoin}</button>
                </div>
            </div>`,await new Promise(o=>{document.getElementById("forceJoinBtn").addEventListener("click",o,{once:!0})})}_.join(u),M(_,u),document.body.classList.add(`team-${a}`);const c=P(i);await c.init();function E(e=m){n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${l(e).waitingStart}</p>
        </div>`}function T(e,o){const t=l(o),r=e.winner===a;n.innerHTML=`
            <div class="awake-screen awake-screen--${e.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${t.awake}</div>
                    <div class="awake-screen__awakening">${C(e.winner,o)}</div>
                    <div class="awake-screen__role">${r?"🏆":"💀"} ${a} ${t.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${t.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await c.resetGame(),window.location.href=H()+"/index.html"})}function y(e,o){var k;const t=l(o),r=e.turn,p=r.team===a,w=r.guideLimit!==null,d=p&&w&&!e.gameOver,h=w?r.guideLimit-r.dreamwalkerMoves:null,S=e.cells.filter(s=>s.role==="resonant"&&!s.revealed).length,A=e.cells.filter(s=>s.role==="dissonant"&&!s.revealed).length,B=p?w?`${h} ${t.movesLeft}`:t.waitingGuide:`${t.turn}: ${r.team.toUpperCase()}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${r.team}`),n.innerHTML=`
            <div class="controller controller--${a}">
                <div class="controller__status">
                    <span class="controller__status-team controller__status-team--${a}">${a.toUpperCase()}</span>
                    <span class="controller__status-moves${d?" controller__status-moves--active":""}">${B}</span>
                    <div class="controller__score">
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--resonant"></div>
                            <span class="controller__score-count">${S}</span>
                            <span class="controller__score-label">RES</span>
                        </div>
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--dissonant"></div>
                            <span class="controller__score-count">${A}</span>
                            <span class="controller__score-label">DIS</span>
                        </div>
                    </div>
                </div>

                <div class="controller__grid">
                    ${e.cells.map((s,R)=>`
                        <div class="controller__cell ${U(s)}${d&&!s.revealed?" controller__cell--clickable":""}"
                             data-index="${R}">
                            <span>${s.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${d?"":"disabled"}>
                    ${d?t.endTurn:p?t.waitingGuide:`${t.turn}: ${r.team.toUpperCase()}`}
                </button>
            </div>`,n.querySelectorAll(".controller__cell--clickable").forEach(s=>{s.addEventListener("click",()=>c.reveal(parseInt(s.dataset.index,10)))}),(k=document.getElementById("endTurnBtn"))==null||k.addEventListener("click",()=>{d&&c.endTurn()})}function v({state:e,language:o}={}){const t=e??c.getState(),r=o??c.getLanguage();if(!t||t.phase==="lobby"){E(r);return}if(t.gameOver){T(t,r);return}y(t,r)}c.subscribe(v),_.onChange(()=>v()),I(()=>v())}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&N(n)});
