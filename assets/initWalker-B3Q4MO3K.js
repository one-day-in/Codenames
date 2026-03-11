import{o as E,e as S,r as G}from"./sanitize-Dk4qHRqk.js";import{g as H,f as I}from"./renderCell-D2QPO2EK.js";import{t as w,D as f,a as O,g as $,f as x,I as g}from"./icons-C5SiWFC8.js";import{g as M}from"./url-NB_mxKzZ.js";import{i as N}from"./initGuestPage-nTvTMdD9.js";import"./keepAlive-By6PPzHl.js";async function F(t){const v=await N(t,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${w(f).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!v)return;const{presence:p,store:l,team:c}=v;let o=!1,m=new Set;function b(e=f){o=!1,m=new Set,t.innerHTML=`<div class="waiting-screen">
            <p>${w(e).waitingLobby}</p>
        </div>`}function h(e,r){o=!1,m=new Set;const a=w(r),s=e.winner===c;t.innerHTML=`
            <div class="awake-screen awake-screen--${e.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${a.awake}</div>
                    <div class="awake-screen__awakening">${O(e.winner,r)}</div>
                    <div class="awake-screen__role">${s?"🏆":"💀"} ${$(c,r)} ${a.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${a.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await l.resetGame(),window.location.href=M()+"/index.html"})}function y(e,r){var k;const a=w(r),s=e.turn,L=s.team===c,T=s.guideLimit!==null,i=L&&T&&!e.gameOver&&!e.turnTransition,C=$(c,r),_=new Set(e.cells.map((n,d)=>n.revealed?d:-1).filter(n=>n>=0)),A=i?`${a.dreamwalker}: ${x(s.guideLimit,r)}`:`${a.dreamwalker}: ${g.eyeClosed}`,B=i?"walker__status walker__status--active":"walker__status walker__status--muted";document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${c}`),t.innerHTML=`
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
                <div class="walker walker--${c}">
                    <div class="grid grid--5">
                        ${e.cells.map((n,d)=>`
                            <div
                                class="${H(n)} ${i&&!n.revealed?"cell--clickable":""}"
                                data-index="${d}"
                            >
                                <span class="cell__content">${S(n.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${G(e,r)}
        </div>
    `,t.querySelectorAll(".walker .grid .cell").forEach((n,d)=>{o&&(!_.has(d)||m.has(d)||n.classList.add("cell--reveal-anim"))}),m=_,o=!0,requestAnimationFrame(()=>I(t)),t.querySelectorAll(".cell--clickable").forEach(n=>{n.addEventListener("click",()=>l.reveal(parseInt(n.dataset.index,10)))}),(k=document.getElementById("refreshBtn"))==null||k.addEventListener("click",()=>{i&&l.endTurn()})}function u({state:e,language:r}={}){const a=e??l.getState(),s=r??l.getLanguage();if(!a||a.phase==="lobby"){b(s);return}if(a.gameOver){h(a,s);return}y(a,s)}l.subscribe(u),p.onChange(()=>u()),E(()=>u())}export{F as initWalker};
