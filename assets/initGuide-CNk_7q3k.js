import{a as T}from"./fitText-DhGiXhRH.js";import{i as y,o as A}from"./initGuestPage-DCAYmGnr.js";import{a as w}from"./presence-D0FYVyKi.js";import{t as m,D as u}from"./url-DqvqMluG.js";const E=8;async function q(s){const c=await y(s,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p class="waiting-screen__hint">${m(u).scanQr}</p>
        </div>`});if(!c)return;const{presence:_,store:t,team:l}=c;function b(i=u){s.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${m(i).waitingLobby}</p>
        </div>`}function g(i,d){const e=i.turn,r=e.team===l,f=e.guideLimit!==null,p=i.cells.filter(n=>n.role==="resonant"&&!n.revealed).length,v=i.cells.filter(n=>n.role==="dissonant"&&!n.revealed).length,L=Array.from({length:E},(n,h)=>{const o=h+1,$=r&&!f&&!i.gameOver;return`<button
                class="mini-board__num-btn${e.guideLimit===o?" mini-board__num-btn--chosen":""}"
                data-limit="${o}" ${$?"":"disabled"}
            >${o}</button>`}).join("");s.innerHTML=`
            <div class="mini-board mini-board--${l}">
                <div class="mini-board__btns">${L}</div>
                <div class="mini-board__grid">
                    ${i.cells.map(n=>`
                        <div class="mini-cell ${w(n)}">
                            <span>${n.word}</span>
                        </div>`).join("")}
                </div>
                <footer class="mini-board__footer">
                    <span class="mini-board__score-item mini-board__score-item--dissonant">DIS: ${v}</span>
                    <span class="mini-board__score-item mini-board__score-item--resonant">RES: ${p}</span>
                </footer>
            </div>`,requestAnimationFrame(()=>{s.querySelectorAll(".mini-cell").forEach(n=>T(n))}),s.querySelectorAll(".mini-board__num-btn:not([disabled])").forEach(n=>{n.addEventListener("click",()=>t.setGuideLimit(parseInt(n.dataset.limit,10)))})}function a({state:i,language:d}={}){const e=i??t.getState(),r=d??t.getLanguage();if(!e||e.phase==="lobby"){b(r);return}g(e)}t.subscribe(a),_.onChange(()=>a()),A(()=>a())}export{q as initGuide};
