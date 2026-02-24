const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/presence-BKNTbHni.js","assets/presence-Bs_83nby.css"])))=>i.map(i=>d[i]);
import{t as o,D as c,R as b,c as A,b as M,d as y}from"./presence-BKNTbHni.js";import{_ as D,o as I}from"./fullscreen-D1PshyVK.js";import{a as R}from"./fitText-DhGiXhRH.js";const G=8;function H(){const e=new URLSearchParams(window.location.search);return{roomId:e.get("room"),token:e.get("token"),team:e.get("team")}}async function N(e){const{roomId:r,token:m,team:t}=H();if(!r||!m||!t||t!=="resonant"&&t!=="dissonant"){e.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${o(c).scanQr}</p>
        </div>`;return}const{supabase:f}=await D(async()=>{const{supabase:n}=await import("./presence-BKNTbHni.js").then(a=>a.f);return{supabase:n}},__vite__mapDeps([0,1])),{data:v,error:L}=await f.from("rooms").select("id, guest_token").eq("id",r).eq("guest_token",m).maybeSingle();if(!v||L){e.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${o(c).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const _=t==="resonant"?b.GUIDE_RESONANT:b.GUIDE_DISSONANT,u=A(r);if(await u.isRoleTaken(_)){const n=t==="resonant"?"miniTakenResonant":"miniTakenDissonant";e.innerHTML=`<div class="waiting-screen">
            <div class="taken-screen">
                <p class="taken-screen__icon">🔒</p>
                <p class="taken-screen__text">${o(c)[n].replace(`
`,"<br>")}</p>
            </div>
        </div>`;return}u.join(_),document.body.classList.add(`team-${t}`);const s=M(r);await s.init();function g(n=c){e.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${o(n).waitingGame}</p>
        </div>`}function p(n,a){const d=n.turn,w=d.team===t,T=d.guideLimit!==null,k=n.cells.filter(i=>i.role==="resonant"&&!i.revealed).length,$=n.cells.filter(i=>i.role==="dissonant"&&!i.revealed).length,h=Array.from({length:G},(i,S)=>{const l=S+1,E=w&&!T&&!n.gameOver;return`<button
                class="mini-board__num-btn${d.guideLimit===l?" mini-board__num-btn--chosen":""}"
                data-limit="${l}"
                ${E?"":"disabled"}
            >${l}</button>`}).join("");e.innerHTML=`
            <div class="mini-board mini-board--${t}">
                <div class="mini-board__btns">${h}</div>
                <div class="mini-board__grid">
                    ${n.cells.map(i=>`
                        <div class="mini-cell ${y(i)}">
                            <span>${i.word}</span>
                        </div>`).join("")}
                </div>
                <footer class="mini-board__footer">
                    <span class="mini-board__score-item mini-board__score-item--dissonant">DIS: ${$}</span>
                    <span class="mini-board__score-item mini-board__score-item--resonant">RES: ${k}</span>
                </footer>
            </div>`,requestAnimationFrame(()=>{e.querySelectorAll(".mini-cell").forEach(i=>R(i))}),e.querySelectorAll(".mini-board__num-btn:not([disabled])").forEach(i=>{i.addEventListener("click",()=>s.setGuideLimit(parseInt(i.dataset.limit,10)))})}s.subscribe(({state:n,language:a})=>{if(!n){g(a);return}p(n)}),I(()=>{const n=s.getState(),a=s.getLanguage();if(!n){g(a);return}p(n)})}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#app");e&&N(e)});
