import{a as T}from"./fitText-DhGiXhRH.js";import{i as y,o as A}from"./initGuestPage-CzVUp2FJ.js";import{a as w}from"./presence-C90QuL_b.js";import{t as u,D as g}from"./url-DqvqMluG.js";const E=8;async function q(s){const c=await y(s,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p class="waiting-screen__hint">${u(g).scanQr}</p>
        </div>`});if(!c)return;const{presence:m,store:t,team:l}=c;function _(n=g){s.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${u(n).waitingLobby}</p>
        </div>`}function f(n,d){const i=n.turn,r=i.team===l,p=i.guideLimit!==null,v=n.cells.filter(e=>e.role==="resonant"&&!e.revealed).length,b=n.cells.filter(e=>e.role==="dissonant"&&!e.revealed).length,L=Array.from({length:E},(e,h)=>{const o=h+1,$=r&&!p&&!n.gameOver;return`
            <button
                class="guide__num-btn ${i.guideLimit===o?"guide__num-btn--chosen":""}"
                data-limit="${o}"
                ${$?"":"disabled"}
            >${o}</button>
        `}).join("");s.innerHTML=`
        <div class="guide guide--${l}">
            <div class="guide__btns">${L}</div>

            <div class="grid grid--5">
                ${n.cells.map(e=>`
                    <div class="${w(e)}">
                        <span class="cell__content">${e.word}</span>
                    </div>
                `).join("")}
            </div>

            <footer class="guide__footer">
                <span class="guide__score-item guide__score-item--dissonant">
                    DIS: ${b}
                </span>
                <span class="guide__score-item guide__score-item--resonant">
                    RES: ${v}
                </span>
            </footer>
        </div>
    `,requestAnimationFrame(()=>{s.querySelectorAll(".cell").forEach(e=>T(e))}),s.querySelectorAll(".guide__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>t.setGuideLimit(parseInt(e.dataset.limit,10)))})}function a({state:n,language:d}={}){const i=n??t.getState(),r=d??t.getLanguage();if(!i||i.phase==="lobby"){_(r);return}f(i)}t.subscribe(a),m.onChange(()=>a()),A(()=>a())}export{q as initGuide};
