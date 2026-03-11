import{o as B,g as G,e as H,r as I,f as O}from"./sanitize-AsY1W7ob.js";import{t as m,D as $,e as q,d as g,g as x,f as M,I as b}from"./url-BRusC3Pl.js";import{i as N}from"./initGuestPage-as3TKHJv.js";import"./entry-gDyjN3FI.js";async function D(t){const v=await N(t,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${m($).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!v)return;const{presence:h,store:i,team:d}=v;let o=!1,w=new Set;function p(e=$){o=!1,w=new Set,t.innerHTML=`<div class="waiting-screen">
            <p>${m(e).waitingLobby}</p>
        </div>`}function y(e,r){o=!1,w=new Set;const a=m(r),s=e.winner===d;t.innerHTML=`
            <div class="awake-screen awake-screen--${e.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${a.awake}</div>
                    <div class="awake-screen__awakening">${q(e.winner,r)}</div>
                    <div class="awake-screen__role">${s?"🏆":"💀"} ${g(d,r)} ${a.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${a.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await i.resetGame(),window.location.href=x()+"/index.html"})}function L(e,r){var k,f;const a=m(r),s=e.turn,T=s.team===d,C=s.guideLimit!==null,l=T&&C&&!e.gameOver&&!e.turnTransition,E=g(d,r),_=new Set(e.cells.map((n,c)=>n.revealed?c:-1).filter(n=>n>=0)),S=l?`${a.dreamwalker}: ${M(s.guideLimit,r)}`:`${a.dreamwalker}: ${b.eyeClosed}`,A=l?"walker__status walker__status--active":"walker__status walker__status--muted";document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${d}`),t.innerHTML=`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__header">
                    <div class="walker__title ${l?"walker__title--active":"walker__title--muted"}">${E}</div>
                    <div class="walker__meta">
                        <div class="${A}">${S}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${a.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${l?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${a.endTurn}" ${l?"":"disabled"}>${b.refreshCw}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${d}">
                    <div class="grid grid--5">
                        ${e.cells.map((n,c)=>`
                            <div
                                class="${G(n)} ${l&&!n.revealed?"cell--clickable":""}"
                                data-index="${c}"
                            >
                                <span class="cell__content">${H(n.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${I(e,r)}
        </div>
    `,t.querySelectorAll(".walker .grid .cell").forEach((n,c)=>{o&&(!_.has(c)||w.has(c)||n.classList.add("cell--reveal-anim"))}),w=_,o=!0,requestAnimationFrame(()=>O(t)),t.querySelectorAll(".cell--clickable").forEach(n=>{n.addEventListener("click",()=>i.reveal(parseInt(n.dataset.index,10)))}),(k=document.getElementById("refreshBtn"))==null||k.addEventListener("click",()=>{l&&i.endTurn()}),(f=t.querySelector(".turn-transition-overlay"))==null||f.addEventListener("click",()=>{i.dismissTurnTransition()})}function u({state:e,language:r}={}){const a=e??i.getState(),s=r??i.getLanguage();if(!a||a.phase==="lobby"){p(s);return}if(a.gameOver){y(a,s);return}L(a,s)}i.subscribe(u),h.onChange(()=>u()),B(()=>u())}export{D as initWalker};
