import{o as B,g as G,e as I,r as H,d as O,f as q}from"./syncIndicator-DNY5rdPG.js";import{t as m,D as $,e as x,d as g,g as M,f as N,I as h}from"./url-DrpWMjE3.js";import{i as P}from"./initGuestPage-SUa08BQ9.js";import"./entry-BfU77FDu.js";async function F(s){const v=await P(s,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${m($).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!v)return;const{presence:p,store:i,team:d}=v;let o=!1,w=new Set;function y(e=$){o=!1,w=new Set,s.innerHTML=`<div class="waiting-screen">
            <p>${m(e).waitingGame}</p>
        </div>`}function b(e,r){o=!1,w=new Set;const a=m(r),t=e.winner===d;s.innerHTML=`
            <div class="awake-screen awake-screen--${e.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${a.awake}</div>
                    <div class="awake-screen__awakening">${x(e.winner,r)}</div>
                    <div class="awake-screen__role">${t?"🏆":"💀"} ${g(d,r)} ${a.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${a.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await i.resetGame(),window.location.href=M()+"/index.html"})}function L(e,r){var k,f;const a=m(r),t=e.turn,T=t.team===d,S=t.guideLimit!==null,l=T&&S&&!e.gameOver&&!e.turnTransition,C=g(d,r),_=new Set(e.cells.map((n,c)=>n.revealed?c:-1).filter(n=>n>=0)),E=l?`${a.dreamwalker}: ${N(t.guideLimit,r)}`:`${a.dreamwalker}: ${h.eyeClosed}`,A=l?"walker__status walker__status--active":"walker__status walker__status--muted";document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${d}`),s.innerHTML=`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__header">
                    <div class="walker__title ${l?"walker__title--active":"walker__title--muted"}">${C}</div>
                    <div class="walker__meta">
                        <div class="${A}">${E}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${a.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${l?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${a.endTurn}" ${l?"":"disabled"}>${h.refreshCw}</button>
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
                                <span class="cell__content">${I(n.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${H(i.getSyncStatus(),r)}
            ${O(e,r)}
        </div>
    `,s.querySelectorAll(".walker .grid .cell").forEach((n,c)=>{o&&(!_.has(c)||w.has(c)||n.classList.add("cell--reveal-anim"))}),w=_,o=!0,requestAnimationFrame(()=>q(s)),s.querySelectorAll(".cell--clickable").forEach(n=>{n.addEventListener("click",()=>i.reveal(parseInt(n.dataset.index,10)))}),(k=document.getElementById("refreshBtn"))==null||k.addEventListener("click",()=>{l&&i.endTurn()}),(f=s.querySelector(".turn-transition-overlay"))==null||f.addEventListener("click",()=>{i.dismissTurnTransition()})}function u({state:e,language:r}={}){const a=e??i.getState(),t=r??i.getLanguage();if(!a){y(t);return}if(a.gameOver){b(a,t);return}L(a,t)}i.subscribe(u),p.onChange(()=>u()),B(()=>u())}export{F as initWalker};
