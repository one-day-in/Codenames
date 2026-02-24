import{t as s,D as a,a as g,c as v}from"./presence-h-CyODlV.js";import{a as w}from"./fitText-DhGiXhRH.js";import{o as L}from"./fullscreen-DHe8HjSE.js";const $=8;function h(){return new URLSearchParams(window.location.search).get("room")}async function T(i){const o=h();if(!o){i.innerHTML=`
            <div class="waiting-screen">
                <p style="color:white;text-align:center;">${s(a).scanQr}</p>
            </div>`;return}const c=g(o);if(await c.isRoleTaken("mini")){i.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${s(a).miniTaken.replace(`
`,"<br>")}</p>
                </div>
            </div>`;return}c.join("mini");const t=v(o);await t.init();function m(e){const r=e.role==="neutral"?"mini-cell--neutral":`mini-cell--${e.role}`;return e.revealed?`${r} mini-cell--revealed`:r}function l(e=a){i.innerHTML=`
            <div class="waiting-screen">
                <p class="waiting-screen__hint">${s(e).waitingGame}</p>
            </div>`}function d(e){const r=e.language||a,u=s(r),_=e.cells.filter(n=>n.role==="red"&&!n.revealed).length,b=e.cells.filter(n=>n.role==="blue"&&!n.revealed).length,f=Array.from({length:$},(n,p)=>`<button class="mini-board__num-btn">${p+1}</button>`).join("");i.innerHTML=`
            <div class="mini-board">
                <header class="mini-board__header">
                    ${f}
                    <button class="mini-board__new-btn" id="newGameBtn">${u.newGame}</button>
                </header>
                <div class="mini-board__grid">
                    ${e.cells.map(n=>`
                        <div class="mini-cell ${m(n)}">
                            <span>${n.word}</span>
                        </div>`).join("")}
                </div>
                <footer class="mini-board__footer">
                    <span class="mini-board__score-item mini-board__score-item--blue">BLUE: ${b}</span>
                    <span class="mini-board__score-item mini-board__score-item--red">RED: ${_}</span>
                </footer>
            </div>`,requestAnimationFrame(()=>{i.querySelectorAll(".mini-cell").forEach(n=>w(n))}),document.getElementById("newGameBtn").addEventListener("click",()=>{t.createGame(r)})}t.subscribe(e=>{if(!e){l();return}d(e)}),L(()=>{const e=t.getState();if(!e){l();return}d(e)}),t.getState()||await t.createGame(a)}document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("#app");i&&T(i)});
