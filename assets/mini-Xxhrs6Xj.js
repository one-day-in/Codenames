import{t as d,D as a,R as b,c as $,b as S,d as E}from"./presence-i8yqKOzs.js";import{a as M}from"./fitText-DhGiXhRH.js";import{o as k}from"./fullscreen-DHe8HjSE.js";const A=8;function R(){return new URLSearchParams(window.location.search).get("room")}function D(){return new URLSearchParams(window.location.search).get("team")}async function I(i){const r=R(),t=D();if(!r||!t||t!=="resonant"&&t!=="dissonant"){i.innerHTML=`
            <div class="waiting-screen">
                <p class="waiting-screen__hint">${d(a).scanQr}</p>
            </div>`;return}const l=t==="resonant"?b.GUIDE_RESONANT:b.GUIDE_DISSONANT,m=$(r);if(await m.isRoleTaken(l)){const n=d(a)[t==="resonant"?"miniTakenResonant":"miniTakenDissonant"];i.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${n.replace(`
`,"<br>")}</p>
                </div>
            </div>`;return}m.join(l),document.body.classList.add(`team-${t}`);const s=S(r);await s.init();function u(n=a){i.innerHTML=`
            <div class="waiting-screen">
                <p class="waiting-screen__hint">${d(n).waitingGame}</p>
            </div>`}function _(n){n.language||a;const o=n.turn,g=o.team===t,f=o.guideLimit!==null,p=n.cells.filter(e=>e.role==="resonant"&&!e.revealed).length,v=n.cells.filter(e=>e.role==="dissonant"&&!e.revealed).length,L=Array.from({length:A},(e,h)=>{const c=h+1,w=g&&!f&&!n.gameOver;return`<button
                class="mini-board__num-btn${o.guideLimit===c?" mini-board__num-btn--chosen":""}"
                data-limit="${c}"
                ${w?"":"disabled"}
            >${c}</button>`}).join(""),T=n.cells.map(e=>`
            <div class="mini-cell ${E(e)}">
                <span>${e.word}</span>
            </div>`).join("");i.innerHTML=`
            <div class="mini-board mini-board--${t}">
                <div class="mini-board__btns">${L}</div>
                <div class="mini-board__grid">${T}</div>
                <footer class="mini-board__footer">
                    <span class="mini-board__score-item mini-board__score-item--dissonant">DIS: ${v}</span>
                    <span class="mini-board__score-item mini-board__score-item--resonant">RES: ${p}</span>
                </footer>
            </div>`,requestAnimationFrame(()=>{i.querySelectorAll(".mini-cell").forEach(e=>M(e))}),i.querySelectorAll(".mini-board__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>{s.setGuideLimit(parseInt(e.dataset.limit,10))})})}s.subscribe(n=>{if(!n){u();return}_(n)}),k(()=>{const n=s.getState();if(!n){u();return}_(n)})}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i&&I(i)});
