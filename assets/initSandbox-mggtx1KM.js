import{c as A,o as C,e as N,r as I}from"./sanitize-Dk4qHRqk.js";import{f as w,g as q}from"./renderCell-D2QPO2EK.js";import{I as v,g as E,t as $,f as O}from"./icons-C5SiWFC8.js";import{a as F,g as b}from"./url-NB_mxKzZ.js";const G=[1,2,3,4,5,6,7,8];function T(a,i,l){const r=$(l),c=i.turn.team===a,m=i.turn.guideLimit!==null,_=c&&!m&&!i.gameOver&&!i.turnTransition,f=c&&m&&!i.gameOver&&!i.turnTransition,g=E(a,l),u=f?`${r.dreamwalker}: ${O(i.turn.guideLimit,l)}`:`${r.dreamwalker}: ${v.eyeClosed}`;return`
        <section class="sandbox__team sandbox__team--${a} ${c?"is-active":"is-muted"}" data-team="${a}">
            <h3 class="sandbox__team-title">${g}</h3>
            <p class="sandbox__team-status">${u}</p>
            <div class="sandbox__limits">
                ${G.map(e=>`
                    <button
                        class="sandbox__limit-btn ${i.turn.guideLimit===e?"is-selected":""}"
                        data-action="limit"
                        data-team="${a}"
                        data-limit="${e}"
                        ${_?"":"disabled"}
                    >${e}</button>
                `).join("")}
            </div>
            <button
                class="sandbox__end-btn"
                data-action="end-turn"
                data-team="${a}"
                ${f?"":"disabled"}
            >${r.endTurn}</button>
        </section>
    `}async function j(a){const{roomId:i,token:l}=F();if(!i||!l){window.location.href=b()+"/index.html";return}const r=A(i);if(await r.init(),!r.getState()){window.location.href=b()+"/index.html";return}let c=!1,m=new Set;function _(e){const t=$(e);a.innerHTML=`
            <div class="waiting-screen">
                <p>${t.waitingLobby}</p>
            </div>
        `}function f(e){a.querySelectorAll('[data-action="limit"]:not([disabled])').forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.team,o=Number(t.dataset.limit);e.turn.team===s&&r.setGuideLimit(o)})}),a.querySelectorAll('[data-action="end-turn"]:not([disabled])').forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.team;e.turn.team===s&&r.endTurn()})}),a.querySelectorAll(".sandbox .grid .cell.cell--hidden").forEach(t=>{t.addEventListener("click",()=>{const s=r.getState();if(!s||s.gameOver||s.turnTransition||s.turn.guideLimit===null)return;const o=Number(t.dataset.index);Number.isNaN(o)||r.reveal(o)})})}function g(e,t){var x,p;const s=$(t),{cells:o}=e,y=o.filter(n=>n.role==="resonant").length,S=o.filter(n=>n.role==="dissonant").length,k=o.filter(n=>n.role==="resonant"&&n.revealed).length,B=o.filter(n=>n.role==="dissonant"&&n.revealed).length,h=new Set(o.map((n,d)=>n.revealed?d:-1).filter(n=>n>=0));a.innerHTML=`
            <div class="screen-layout sandbox-layout">
                <header class="screen-header sandbox__header">
                    <div class="sandbox__header-bar">
                        <button class="btn-back btn-icon" id="backBtn">${v.arrowLeft}</button>
                        <div class="sandbox__title">${s.gameName} / ${s.turn}: ${E(e.turn.team,t)}</div>
                        <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${document.fullscreenElement?v.minimize:v.maximize}</button>
                    </div>
                </header>

                <main class="screen-body">
                    <div class="sandbox">
                        <div class="grid grid--5">
                            ${o.map((n,d)=>`
                                <div class="${q(n)}" data-index="${d}">
                                    <span class="cell__content">${N(n.word)}</span>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </main>

                <footer class="screen-footer sandbox__footer">
                    ${T("resonant",e,t)}
                    <div class="sandbox__score">
                        <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active":""}">${k} / ${y}</span>
                        <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active":""}">${B} / ${S}</span>
                    </div>
                    ${T("dissonant",e,t)}
                </footer>

                ${I(e,t)}
            </div>
        `,a.querySelectorAll(".sandbox .grid .cell").forEach((n,d)=>{c&&(!h.has(d)||m.has(d)||n.classList.add("cell--reveal-anim"))}),m=h,c=!0,(x=document.getElementById("backBtn"))==null||x.addEventListener("click",()=>{window.location.href=b()+"/index.html"}),(p=document.getElementById("fullscreenBtn"))==null||p.addEventListener("click",()=>{var n,d,L;document.fullscreenElement?(L=document.exitFullscreen)==null||L.call(document):(d=(n=document.documentElement).requestFullscreen)==null||d.call(n)}),f(e),requestAnimationFrame(()=>w(a))}function u(){const e=r.getState(),t=r.getLanguage();if(!e){window.location.href=b()+"/index.html";return}if(e.phase==="lobby"){r.startGame().catch(s=>console.error("Failed to start game:",s)),_(t);return}g(e,t)}r.subscribe(u),C(()=>w(a)),document.addEventListener("fullscreenchange",u),u()}export{j as initSandbox};
