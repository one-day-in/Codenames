import{o as E,g as S,e as G,r as H,f as I}from"./sanitize-CWtCII0P.js";import{t as m,D as f,d as O,b as $,g as x,f as M,I as g}from"./icons-87ROm5CI.js";import{i as N}from"./initGuestPage-CyJtaoEn.js";import"./keepAlive-BWq9KLr-.js";async function W(t){const v=await N(t,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${m(f).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!v)return;const{presence:b,store:l,team:d}=v;let o=!1,w=new Set;function h(e=f){o=!1,w=new Set,t.innerHTML=`<div class="waiting-screen">
            <p>${m(e).waitingLobby}</p>
        </div>`}function p(e,r){o=!1,w=new Set;const a=m(r),s=e.winner===d;t.innerHTML=`
            <div class="awake-screen awake-screen--${e.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${a.awake}</div>
                    <div class="awake-screen__awakening">${O(e.winner,r)}</div>
                    <div class="awake-screen__role">${s?"🏆":"💀"} ${$(d,r)} ${a.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${a.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await l.resetGame(),window.location.href=x()+"/index.html"})}function y(e,r){var k;const a=m(r),s=e.turn,L=s.team===d,T=s.guideLimit!==null,i=L&&T&&!e.gameOver&&!e.turnTransition,C=$(d,r),_=new Set(e.cells.map((n,c)=>n.revealed?c:-1).filter(n=>n>=0)),A=i?`${a.dreamwalker}: ${M(s.guideLimit,r)}`:`${a.dreamwalker}: ${g.eyeClosed}`,B=i?"walker__status walker__status--active":"walker__status walker__status--muted";document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${d}`),t.innerHTML=`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__header">
                    <div class="walker__title ${i?"walker__title--active":"walker__title--muted"}">${C}</div>
                    <div class="walker__meta">
                        <div class="${B}">${A}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${a.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${i?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${a.endTurn}" ${i?"":"disabled"}>${g.refreshCw}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${d}">
                    <div class="grid grid--5">
                        ${e.cells.map((n,c)=>`
                            <div
                                class="${S(n)} ${i&&!n.revealed?"cell--clickable":""}"
                                data-index="${c}"
                            >
                                <span class="cell__content">${G(n.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${H(e,r)}
        </div>
    `,t.querySelectorAll(".walker .grid .cell").forEach((n,c)=>{o&&(!_.has(c)||w.has(c)||n.classList.add("cell--reveal-anim"))}),w=_,o=!0,requestAnimationFrame(()=>I(t)),t.querySelectorAll(".cell--clickable").forEach(n=>{n.addEventListener("click",()=>l.reveal(parseInt(n.dataset.index,10)))}),(k=document.getElementById("refreshBtn"))==null||k.addEventListener("click",()=>{i&&l.endTurn()})}function u({state:e,language:r}={}){const a=e??l.getState(),s=r??l.getLanguage();if(!a||a.phase==="lobby"){h(s);return}if(a.gameOver){p(a,s);return}y(a,s)}l.subscribe(u),b.onChange(()=>u()),E(()=>u())}export{W as initWalker};
