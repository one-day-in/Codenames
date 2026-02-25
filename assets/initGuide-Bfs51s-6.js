import{a as T}from"./fitText-DhGiXhRH.js";import{i as A,o as w}from"./initGuestPage-UYp77Mbw.js";import{a as y}from"./keepAlive-CwTVj7YU.js";import{t as m,D as u}from"./i18n-pkrfkOVn.js";import"./url-DMe9pim_.js";import"./presence-JaBJnldC.js";const E=8;async function I(t){const c=await A(t,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p class="waiting-screen__hint">${m(u).scanQr}</p>
        </div>`});if(!c)return;const{presence:_,store:s,team:l}=c;function g(i=u){t.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${m(i).waitingGame}</p>
        </div>`}function b(i,d){const e=i.turn,r=e.team===l,p=e.guideLimit!==null,f=i.cells.filter(n=>n.role==="resonant"&&!n.revealed).length,v=i.cells.filter(n=>n.role==="dissonant"&&!n.revealed).length,h=Array.from({length:E},(n,L)=>{const o=L+1,$=r&&!p&&!i.gameOver;return`<button
                class="mini-board__num-btn${e.guideLimit===o?" mini-board__num-btn--chosen":""}"
                data-limit="${o}" ${$?"":"disabled"}
            >${o}</button>`}).join("");t.innerHTML=`
            <div class="mini-board mini-board--${l}">
                <div class="mini-board__btns">${h}</div>
                <div class="mini-board__grid">
                    ${i.cells.map(n=>`
                        <div class="mini-cell ${y(n)}">
                            <span>${n.word}</span>
                        </div>`).join("")}
                </div>
                <footer class="mini-board__footer">
                    <span class="mini-board__score-item mini-board__score-item--dissonant">DIS: ${v}</span>
                    <span class="mini-board__score-item mini-board__score-item--resonant">RES: ${f}</span>
                </footer>
            </div>`,requestAnimationFrame(()=>{t.querySelectorAll(".mini-cell").forEach(n=>T(n))}),t.querySelectorAll(".mini-board__num-btn:not([disabled])").forEach(n=>{n.addEventListener("click",()=>s.setGuideLimit(parseInt(n.dataset.limit,10)))})}function a({state:i,language:d}={}){const e=i??s.getState(),r=d??s.getLanguage();if(!e||e.phase==="lobby"){g(r);return}b(e)}s.subscribe(a),_.onChange(()=>a()),w(()=>a())}export{I as initGuide};
