import{o as T,e as A}from"./sanitize-D_lm_NtF.js";import{g as B,f as E}from"./renderCell-BOP4kpTI.js";import{t as d,D as _,a as G,g as v}from"./i18n-DXZvh-jR.js";import{g as C}from"./url-XkLgVFj3.js";import{I}from"./icons-Bcd_E9sO.js";import{i as x}from"./initGuestPage-DXA1m72i.js";async function U(s){const m=await x(s,{roleType:"walker",invalidParamsHtml:`<div class="error-screen">
            <p>${d(_).wrongLink.replace(`
`,"<br>")}</p>
        </div>`});if(!m)return;const{presence:u,store:i,team:c}=m;function k(a=_){s.innerHTML=`<div class="waiting-screen">
            <p>${d(a).waitingLobby}</p>
        </div>`}function f(a,r){const e=d(r),n=a.winner===c;s.innerHTML=`
            <div class="awake-screen awake-screen--${a.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${e.awake}</div>
                    <div class="awake-screen__awakening">${G(a.winner,r)}</div>
                    <div class="awake-screen__role">${n?"🏆":"💀"} ${v(c,r)} ${e.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${e.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",async()=>{await i.resetGame(),window.location.href=C()+"/index.html"})}function $(a,r){var w;const e=d(r),n=a.turn,g=n.team===c,p=n.guideLimit!==null,t=g&&p&&!a.gameOver,b=`${v(c,r)} ${e.dreamwalker}`,h=t?`${n.guideLimit} ${e.steps}`:"",y=t?"walker__turn-info walker__turn-info--active":"walker__turn-info walker__turn-info--muted";document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${n.team}`),s.innerHTML=`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__header">
                    <div class="walker__title ${t?"walker__title--active":"walker__title--muted"}">${b}</div>
                    <div class="walker__meta">
                        <div class="${y}">${h}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${e.end}</span>
                            <button class="walker__action-btn walker__refresh-btn ${t?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${e.endTurn}" ${t?"":"disabled"}>${I.refreshCw}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${c}">
                    <div class="grid grid--5">
                        ${a.cells.map((l,L)=>`
                            <div
                                class="${B(l)} ${t&&!l.revealed?"cell--clickable":""}"
                                data-index="${L}"
                            >
                                <span class="cell__content">${A(l.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
        </div>
    `,requestAnimationFrame(()=>E(s)),s.querySelectorAll(".cell--clickable").forEach(l=>{l.addEventListener("click",()=>i.reveal(parseInt(l.dataset.index,10)))}),(w=document.getElementById("refreshBtn"))==null||w.addEventListener("click",()=>{t&&i.endTurn()})}function o({state:a,language:r}={}){const e=a??i.getState(),n=r??i.getLanguage();if(!e||e.phase==="lobby"){k(n);return}if(e.gameOver){f(e,n);return}$(e,n)}i.subscribe(o),u.onChange(()=>o()),T(()=>o())}export{U as initWalker};
