const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/keepAlive-JCSCQkeA.js","assets/keepAlive-Bs_83nby.css"])))=>i.map(i=>d[i]);
import{t as d,D as l,R as b,k as y,c as M,b as D,d as I}from"./keepAlive-JCSCQkeA.js";import{_ as R,o as G}from"./fullscreen-D1PshyVK.js";import{a as H}from"./fitText-DhGiXhRH.js";const N=8;function O(){const n=new URLSearchParams(window.location.search);return{roomId:n.get("room"),token:n.get("token"),team:n.get("team")}}async function q(n){const{roomId:r,token:p,team:t}=O();if(!r||!p||!t||t!=="resonant"&&t!=="dissonant"){n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${d(l).scanQr}</p>
        </div>`;return}const{supabase:v}=await R(async()=>{const{supabase:i}=await import("./keepAlive-JCSCQkeA.js").then(c=>c.f);return{supabase:i}},__vite__mapDeps([0,1])),{data:f,error:L}=await v.from("rooms").select("id, guest_token").eq("id",r).eq("guest_token",p).maybeSingle();if(!f||L){n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${d(l).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const m=t==="resonant"?b.GUIDE_RESONANT:b.GUIDE_DISSONANT,o=M(r);if(await o.isRoleTaken(m)){const i=t==="resonant"?"miniTakenResonant":"miniTakenDissonant";n.innerHTML=`<div class="waiting-screen">
            <div class="taken-screen">
                <p class="taken-screen__icon">🔒</p>
                <p class="taken-screen__text">${d(l)[i].replace(`
`,"<br>")}</p>
            </div>
        </div>`;return}o.join(m),y(o,m),document.body.classList.add(`team-${t}`);const a=D(r);await a.init();function k(i=l){n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${d(i).waitingGame}</p>
        </div>`}function w(i,c){const s=i.turn,u=s.team===t,T=s.guideLimit!==null,h=i.cells.filter(e=>e.role==="resonant"&&!e.revealed).length,$=i.cells.filter(e=>e.role==="dissonant"&&!e.revealed).length,S=Array.from({length:N},(e,E)=>{const g=E+1,A=u&&!T&&!i.gameOver;return`<button
                class="mini-board__num-btn${s.guideLimit===g?" mini-board__num-btn--chosen":""}"
                data-limit="${g}" ${A?"":"disabled"}
            >${g}</button>`}).join("");n.innerHTML=`
            <div class="mini-board mini-board--${t}">
                <div class="mini-board__btns">${S}</div>
                <div class="mini-board__grid">
                    ${i.cells.map(e=>`
                        <div class="mini-cell ${I(e)}">
                            <span>${e.word}</span>
                        </div>`).join("")}
                </div>
                <footer class="mini-board__footer">
                    <span class="mini-board__score-item mini-board__score-item--dissonant">DIS: ${$}</span>
                    <span class="mini-board__score-item mini-board__score-item--resonant">RES: ${h}</span>
                </footer>
            </div>`,requestAnimationFrame(()=>{n.querySelectorAll(".mini-cell").forEach(e=>H(e))}),n.querySelectorAll(".mini-board__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>a.setGuideLimit(parseInt(e.dataset.limit,10)))})}function _({state:i,language:c}={}){const s=i??a.getState(),u=c??a.getLanguage();if(!s||s.phase==="lobby"){k(u);return}w(s)}a.subscribe(_),o.onChange(()=>_()),G(()=>_())}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&q(n)});
