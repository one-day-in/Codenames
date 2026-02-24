const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/i18n-BSQgICzt.js","assets/i18n-Bs_83nby.css"])))=>i.map(i=>d[i]);
import{t as d,D as l}from"./i18n-BSQgICzt.js";import{_ as y}from"./preload-helper-Dg2ainw4.js";import{R as b,k as M,c as D,a as I,b as R}from"./keepAlive-DqUUpVTB.js";import{a as G}from"./fitText-DhGiXhRH.js";import{o as H}from"./fullscreen-DHe8HjSE.js";const N=8;function O(){const n=new URLSearchParams(window.location.search);return{roomId:n.get("room"),token:n.get("token"),team:n.get("team")}}async function q(n){const{roomId:r,token:g,team:t}=O();if(!r||!g||!t||t!=="resonant"&&t!=="dissonant"){n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${d(l).scanQr}</p>
        </div>`;return}const{supabase:f}=await y(async()=>{const{supabase:i}=await import("./i18n-BSQgICzt.js").then(c=>c.a);return{supabase:i}},__vite__mapDeps([0,1])),{data:v,error:L}=await f.from("rooms").select("id, guest_token").eq("id",r).eq("guest_token",g).maybeSingle();if(!v||L){n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${d(l).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const m=t==="resonant"?b.GUIDE_RESONANT:b.GUIDE_DISSONANT,o=D(r);if(await o.isRoleTaken(m)){const i=t==="resonant"?"miniTakenResonant":"miniTakenDissonant";n.innerHTML=`<div class="waiting-screen">
            <div class="taken-screen">
                <p class="taken-screen__icon">🔒</p>
                <p class="taken-screen__text">${d(l)[i].replace(`
`,"<br>")}</p>
            </div>
        </div>`;return}o.join(m),M(o,m),document.body.classList.add(`team-${t}`);const s=I(r);await s.init();function k(i=l){n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${d(i).waitingGame}</p>
        </div>`}function w(i,c){const a=i.turn,u=a.team===t,T=a.guideLimit!==null,h=i.cells.filter(e=>e.role==="resonant"&&!e.revealed).length,$=i.cells.filter(e=>e.role==="dissonant"&&!e.revealed).length,S=Array.from({length:N},(e,E)=>{const p=E+1,A=u&&!T&&!i.gameOver;return`<button
                class="mini-board__num-btn${a.guideLimit===p?" mini-board__num-btn--chosen":""}"
                data-limit="${p}" ${A?"":"disabled"}
            >${p}</button>`}).join("");n.innerHTML=`
            <div class="mini-board mini-board--${t}">
                <div class="mini-board__btns">${S}</div>
                <div class="mini-board__grid">
                    ${i.cells.map(e=>`
                        <div class="mini-cell ${R(e)}">
                            <span>${e.word}</span>
                        </div>`).join("")}
                </div>
                <footer class="mini-board__footer">
                    <span class="mini-board__score-item mini-board__score-item--dissonant">DIS: ${$}</span>
                    <span class="mini-board__score-item mini-board__score-item--resonant">RES: ${h}</span>
                </footer>
            </div>`,requestAnimationFrame(()=>{n.querySelectorAll(".mini-cell").forEach(e=>G(e))}),n.querySelectorAll(".mini-board__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>s.setGuideLimit(parseInt(e.dataset.limit,10)))})}function _({state:i,language:c}={}){const a=i??s.getState(),u=c??s.getLanguage();if(!a||a.phase==="lobby"){k(u);return}w(a)}s.subscribe(_),o.onChange(()=>_()),H(()=>_())}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&q(n)});
