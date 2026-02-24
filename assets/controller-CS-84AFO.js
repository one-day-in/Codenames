const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/i18n-BSQgICzt.js","assets/i18n-Bs_83nby.css"])))=>i.map(i=>d[i]);
import{t as i,D as d,g as G}from"./i18n-BSQgICzt.js";import{_ as M}from"./preload-helper-Dg2ainw4.js";import{R as $,k as I,c as O,a as B,d as D}from"./keepAlive-DqUUpVTB.js";import{o as H}from"./fullscreen-DHe8HjSE.js";function N(){const t=new URLSearchParams(window.location.search);return{roomId:t.get("room"),token:t.get("token"),team:t.get("team")}}async function P(t){const{roomId:_,token:g,team:s}=N();if(!_||!g||!s||s!=="resonant"&&s!=="dissonant"){t.innerHTML=`<div class="error-screen">
            <p>${i(d).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const{supabase:L}=await M(async()=>{const{supabase:n}=await import("./i18n-BSQgICzt.js").then(o=>o.a);return{supabase:n}},__vite__mapDeps([0,1])),{data:f,error:b}=await L.from("rooms").select("id, guest_token").eq("id",_).eq("guest_token",g).maybeSingle();if(!f||b){t.innerHTML=`<div class="error-screen">
            <p>${i(d).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const u=s==="resonant"?$.WALKER_RESONANT:$.WALKER_DISSONANT,m=O(_);if(await m.isRoleTaken(u)){t.innerHTML=`<div class="waiting-screen">
            <div class="taken-screen">
                <p class="taken-screen__icon">🔒</p>
                <p class="taken-screen__text">${s} ${i(d).dreamwalker}<br>${i(d).controllerTaken.replace(`
`,"<br>")}</p>
            </div>
        </div>`;return}m.join(u),I(m,u),document.body.classList.add(`team-${s}`);const c=B(_);await c.init();function T(n=d){t.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${i(n).waitingStart}</p>
        </div>`}function E(n,o){const e=i(o),r=n.winner===s;t.innerHTML=`
            <div class="awake-screen awake-screen--${n.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${e.awake}</div>
                    <div class="awake-screen__awakening">${G(n.winner,o)}</div>
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
                        <div class="controller__cell ${D(a)}${l&&!a.revealed?" controller__cell--clickable":""}"
                             data-index="${R}">
                            <span>${a.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${l?"":"disabled"}>
                    ${l?e.endTurn:p?e.waitingGuide:`${e.turn}: ${r.team.toUpperCase()}`}
                </button>
            </div>`,t.querySelectorAll(".controller__cell--clickable").forEach(a=>{a.addEventListener("click",()=>c.reveal(parseInt(a.dataset.index,10)))}),(k=document.getElementById("endTurnBtn"))==null||k.addEventListener("click",()=>{l&&c.endTurn()})}function v({state:n,language:o}={}){const e=n??c.getState(),r=o??c.getLanguage();if(!e||e.phase==="lobby"){T(r);return}if(e.gameOver){E(e,r);return}y(e,r)}c.subscribe(v),m.onChange(()=>v()),H(()=>v())}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&P(t)});
