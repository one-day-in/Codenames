import{c as N,o as F,f as $,g as O,e as q,r as A}from"./sanitize-CCtgZlBF.js";import{a as R,g as l,b as z,I as c,t as y,l as C,s as G}from"./icons-wP800kuJ.js";import{w as M,c as D}from"./loader-rCguY_LR.js";async function j(i){const{roomId:m,token:L}=R();if(!m||!L){window.location.href=l()+"/index.html";return}const r=N(m);if(await r.init(),!r.getState()){window.location.href=l()+"/index.html";return}let _=!1,f=new Set;async function B(e){await M(async()=>{var d;const a=await C(e),{cells:t,startsFirst:o}=D({size:5,words:a}),g={gameId:((d=crypto.randomUUID)==null?void 0:d.call(crypto))||Math.random().toString(36).slice(2),phase:"active",size:5,cells:t,turn:{team:o,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null,turnTransition:null};await G.from("rooms").update({state:g,language:e}).eq("id",m)})}function E(e){const a=y(e);i.innerHTML=`
            <div class="waiting-screen">
                <p>${a.waitingLobby}</p>
            </div>
        `}function S(){i.querySelectorAll(".sandbox .grid .cell.cell--hidden").forEach(e=>{e.addEventListener("click",()=>{const a=r.getState();if(!a||a.gameOver||a.turnTransition)return;const t=Number(e.dataset.index);Number.isNaN(t)||r.reveal(t)})})}function k(e,a){var p,h,w;const t=y(a),{cells:o}=e,g=o.filter(n=>n.role==="resonant").length,d=o.filter(n=>n.role==="dissonant").length,T=o.filter(n=>n.role==="resonant"&&n.revealed).length,I=o.filter(n=>n.role==="dissonant"&&n.revealed).length,b=z(e.turn.team,a),v=new Set(o.map((n,s)=>n.revealed?s:-1).filter(n=>n>=0));i.innerHTML=`
            <div class="screen-layout sandbox-layout">
                <header class="screen-header sandbox__header">
                    <div class="sandbox__header-bar">
                        <button class="btn-back btn-icon" id="backBtn">${c.arrowLeft}</button>
                        <div class="sandbox__title">${t.gameName} / ${b}</div>
                        <div class="sandbox__header-actions">
                            <button class="sandbox__reset-btn" id="resetBtn">${t.sandboxReset}</button>
                            <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${document.fullscreenElement?c.minimize:c.maximize}</button>
                        </div>
                    </div>
                </header>

                <main class="screen-body">
                    <div class="sandbox">
                        <div class="grid grid--5">
                            ${o.map((n,s)=>`
                                <div class="${O(n)}" data-index="${s}">
                                    <span class="cell__content">${q(n.word)}</span>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </main>

                <footer class="screen-footer sandbox__footer">
                    <div class="game__score sandbox__score">
                        <span class="game__score-item game__score-item--dissonant ${e.turn.team==="dissonant"?"game__score-item--active game__score-item--expanded":""}">
                            <span class="game__score-main">${I} / ${d}</span>
                            ${e.turn.team==="dissonant"?`<span class="game__score-turn-inline">${t.dreamwalker}</span>`:""}
                        </span>
                        <span class="game__score-center ${e.gameOver?"game__score-center--finished":""}">
                            <span class="game__score-arrow game__score-arrow--${e.turn.team}" aria-hidden="true">
                                ${e.turn.team==="dissonant"?c.arrowLeft:c.arrowRight}
                            </span>
                            <span class="game__score-center-text">${e.gameOver?t.gameFinished:b}</span>
                        </span>
                        <span class="game__score-item game__score-item--resonant ${e.turn.team==="resonant"?"game__score-item--active game__score-item--expanded":""}">
                            <span class="game__score-main">${T} / ${g}</span>
                            ${e.turn.team==="resonant"?`<span class="game__score-turn-inline">${t.dreamwalker}</span>`:""}
                        </span>
                    </div>
                </footer>

                ${A(e,a)}
            </div>
        `,i.querySelectorAll(".sandbox .grid .cell").forEach((n,s)=>{_&&(!v.has(s)||f.has(s)||n.classList.add("cell--reveal-anim"))}),f=v,_=!0,(p=document.getElementById("backBtn"))==null||p.addEventListener("click",()=>{window.location.href=l()+"/index.html"}),(h=document.getElementById("fullscreenBtn"))==null||h.addEventListener("click",()=>{var n,s,x;document.fullscreenElement?(x=document.exitFullscreen)==null||x.call(document):(s=(n=document.documentElement).requestFullscreen)==null||s.call(n)}),(w=document.getElementById("resetBtn"))==null||w.addEventListener("click",()=>{B(a).catch(n=>{console.error("Failed to reset sandbox game:",n)})}),S(),requestAnimationFrame(()=>$(i))}function u(){const e=r.getState(),a=r.getLanguage();if(!e){window.location.href=l()+"/index.html";return}if(e.phase==="lobby"){r.startGame().catch(t=>console.error("Failed to start game:",t)),E(a);return}k(e,a)}r.subscribe(u),F(()=>$(i)),document.addEventListener("fullscreenchange",u),u()}export{j as initSandbox};
