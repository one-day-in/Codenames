const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/i18n-oKl8HJk8.js","assets/i18n-EydkaueC.css"])))=>i.map(i=>d[i]);
import{t as d,D as l}from"./i18n-oKl8HJk8.js";import{_ as A,o as I}from"./fullscreen-D1PshyVK.js";import{R as p,k as M,c as R,a as D,b as G}from"./keepAlive-CpoPdX36.js";import{a as H}from"./fitText-DhGiXhRH.js";const N=8;function O(){const n=new URLSearchParams(window.location.search);return{roomId:n.get("room"),token:n.get("token"),team:n.get("team")}}async function q(n){const{roomId:r,token:g,team:a}=O();if(!r||!g||!a||a!=="resonant"&&a!=="dissonant"){n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${d(l).scanQr}</p>
        </div>`;return}const{supabase:f}=await A(async()=>{const{supabase:e}=await import("./i18n-oKl8HJk8.js").then(s=>s.a);return{supabase:e}},__vite__mapDeps([0,1])),{data:v,error:L}=await f.from("rooms").select("id, guest_token").eq("id",r).eq("guest_token",g).maybeSingle();if(!v||L){n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${d(l).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const m=a==="resonant"?p.GUIDE_RESONANT:p.GUIDE_DISSONANT,c=R(r);if(await c.isRoleTaken(m)){const e=d(l),s=a==="resonant"?"miniTakenResonant":"miniTakenDissonant";n.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${e[s].replace(`
`,"<br>")}</p>
                    <button class="lobby__btn" id="forceJoinBtn">${e.forceRejoin}</button>
                </div>
            </div>`,await new Promise(i=>{document.getElementById("forceJoinBtn").addEventListener("click",i,{once:!0})})}c.join(m),M(c,m),document.body.classList.add(`team-${a}`);const o=D(r);await o.init();function k(e=l){n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${d(e).waitingGame}</p>
        </div>`}function w(e,s){const i=e.turn,u=i.team===a,T=i.guideLimit!==null,h=e.cells.filter(t=>t.role==="resonant"&&!t.revealed).length,$=e.cells.filter(t=>t.role==="dissonant"&&!t.revealed).length,E=Array.from({length:N},(t,S)=>{const b=S+1,y=u&&!T&&!e.gameOver;return`<button
                class="mini-board__num-btn${i.guideLimit===b?" mini-board__num-btn--chosen":""}"
                data-limit="${b}" ${y?"":"disabled"}
            >${b}</button>`}).join("");n.innerHTML=`
            <div class="mini-board mini-board--${a}">
                <div class="mini-board__btns">${E}</div>
                <div class="mini-board__grid">
                    ${e.cells.map(t=>`
                        <div class="mini-cell ${G(t)}">
                            <span>${t.word}</span>
                        </div>`).join("")}
                </div>
                <footer class="mini-board__footer">
                    <span class="mini-board__score-item mini-board__score-item--dissonant">DIS: ${$}</span>
                    <span class="mini-board__score-item mini-board__score-item--resonant">RES: ${h}</span>
                </footer>
            </div>`,requestAnimationFrame(()=>{n.querySelectorAll(".mini-cell").forEach(t=>H(t))}),n.querySelectorAll(".mini-board__num-btn:not([disabled])").forEach(t=>{t.addEventListener("click",()=>o.setGuideLimit(parseInt(t.dataset.limit,10)))})}function _({state:e,language:s}={}){const i=e??o.getState(),u=s??o.getLanguage();if(!i||i.phase==="lobby"){k(u);return}w(i)}o.subscribe(_),c.onChange(()=>_()),I(()=>_())}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app");n&&q(n)});
