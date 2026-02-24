const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/i18n-BSQgICzt.js","assets/i18n-Bs_83nby.css"])))=>i.map(i=>d[i]);
import{t as i,D as _,g as G}from"./i18n-BSQgICzt.js";import{_ as M,o as I}from"./fullscreen-D1PshyVK.js";import{R as $,k as O,c as B,a as D,d as H}from"./keepAlive-DqUUpVTB.js";function N(){const t=new URLSearchParams(window.location.search);return{roomId:t.get("room"),token:t.get("token"),team:t.get("team")}}async function P(t){const{roomId:m,token:g,team:s}=N();if(!m||!g||!s||s!=="resonant"&&s!=="dissonant"){t.innerHTML=`<div class="error-screen">
            <p>${i(_).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const{supabase:L}=await M(async()=>{const{supabase:n}=await import("./i18n-BSQgICzt.js").then(o=>o.a);return{supabase:n}},__vite__mapDeps([0,1])),{data:b,error:f}=await L.from("rooms").select("id, guest_token").eq("id",m).eq("guest_token",g).maybeSingle();if(!b||f){t.innerHTML=`<div class="error-screen">
            <p>${i(_).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const v=s==="resonant"?$.WALKER_RESONANT:$.WALKER_DISSONANT,u=B(m);if(await u.isRoleTaken(v)){t.innerHTML=`<div class="waiting-screen">
            <div class="taken-screen">
                <p class="taken-screen__icon">🔒</p>
                <p class="taken-screen__text">${s} ${i(_).dreamwalker}<br>${i(_).controllerTaken.replace(`
`,"<br>")}</p>
            </div>
        </div>`;return}u.join(v),O(u,v),document.body.classList.add(`team-${s}`);const c=D(m);await c.init();function T(n=_){t.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${i(n).waitingStart}</p>
        </div>`}function E(n,o){const e=i(o),a=n.winner===s;t.innerHTML=`
            <div class="awake-screen awake-screen--${n.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${e.awake}</div>
                    <div class="awake-screen__awakening">${G(n.winner,o)}</div>
                    <div class="awake-screen__role">${a?"🏆":"💀"} ${s} ${e.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${e.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await c.resetGame();const l=window.location.origin+window.location.pathname.split("/").slice(0,-1).join("/");window.location.href=l+"/index.html"})}function h(n,o){var k;const e=i(o),a=n.turn,l=a.team===s,w=a.guideLimit!==null,d=l&&w&&!n.gameOver,y=w?a.guideLimit-a.dreamwalkerMoves:null,S=n.cells.filter(r=>r.role==="resonant"&&!r.revealed).length,A=n.cells.filter(r=>r.role==="dissonant"&&!r.revealed).length,R=l?w?`${y} ${e.movesLeft}`:e.waitingGuide:`${e.turn}: ${a.team.toUpperCase()}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${a.team}`),t.innerHTML=`
            <div class="controller controller--${s}">
                <div class="controller__status">
                    <span class="controller__status-team controller__status-team--${s}">${s.toUpperCase()}</span>
                    <span class="controller__status-moves${d?" controller__status-moves--active":""}">${R}</span>
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
                    ${n.cells.map((r,C)=>`
                        <div class="controller__cell ${H(r)}${d&&!r.revealed?" controller__cell--clickable":""}"
                             data-index="${C}">
                            <span>${r.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${d?"":"disabled"}>
                    ${d?e.endTurn:l?e.waitingGuide:`${e.turn}: ${a.team.toUpperCase()}`}
                </button>
            </div>`,t.querySelectorAll(".controller__cell--clickable").forEach(r=>{r.addEventListener("click",()=>c.reveal(parseInt(r.dataset.index,10)))}),(k=document.getElementById("endTurnBtn"))==null||k.addEventListener("click",()=>{d&&c.endTurn()})}function p({state:n,language:o}={}){const e=n??c.getState(),a=o??c.getLanguage();if(!e||e.phase==="lobby"){T(a);return}if(e.gameOver){E(e,a);return}h(e,a)}c.subscribe(p),u.onChange(()=>p()),I(()=>p())}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&P(t)});
