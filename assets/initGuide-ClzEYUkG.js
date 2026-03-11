import{o as E,a as H,e as G,r as M,b as N}from"./sanitize-CqNo1zKw.js";import{t as _,D as $,n as q,b as I,I as O}from"./icons-BEck-Lct.js";import{i as W}from"./initGuestPage-C1nmDDnf.js";import"./keepAlive-Ds5I9vyf.js";const B=8;async function F(s){const v=await W(s,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${_($).scanQr}</p>
        </div>`});if(!v)return;const{presence:b,store:o,team:r}=v;let l=!1,u=new Set;function h(i=$){l=!1,u=new Set,s.innerHTML=`<div class="waiting-screen">
            <p>${_(i).waitingLobby}</p>
        </div>`}function p(i,c){const t=_(c),d=i.turn,T=d.team===r,y=d.guideLimit!==null,a=T&&!y&&!i.gameOver&&!i.turnTransition,L=q(i.teamEffects)[r].allowTwoWordClue;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${r}`);const w=I(r,c),A=a?`${t.guide}: ${t.chooseLimit}`:`${t.guide}: ${O.eyeClosed}`,C=a&&L?`<div class="guide__meta ${a?"guide__meta--active":"guide__meta--muted"}">${t.guideTwoWordClue}</div>`:"",S=Array.from({length:B},(e,n)=>{const g=n+1;return`
            <button
                class="guide__num-btn ${d.guideLimit===g?"guide__num-btn--chosen":""}"
                data-limit="${g}"
                ${a?"":"disabled"}
            >${g}</button>
        `}).join(""),f=new Set(i.cells.map((e,n)=>e.revealed?n:-1).filter(e=>e>=0));s.innerHTML=`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${a?"guide__title--active":"guide__title--muted"}">${w}</div>
                    <div class="guide__meta ${a?"guide__meta--active":"guide__meta--muted"}">${A}</div>
                    ${C}
                    <div class="guide__btns ${a?"guide__btns--active":"guide__btns--muted"}">${S}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${r}">
                    <div class="grid grid--5">
                        ${i.cells.map((e,n)=>`
                            <div class="${H(e)}" data-index="${n}">
                                <span class="cell__content">${G(e.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${M(i,c)}
        </div>
    `,s.querySelectorAll(".guide .grid .cell").forEach((e,n)=>{l&&(!f.has(n)||u.has(n)||e.classList.add("cell--reveal-anim"))}),u=f,l=!0,requestAnimationFrame(()=>{s.querySelectorAll(".cell").forEach(e=>N(e))}),s.querySelectorAll(".guide__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>o.setGuideLimit(parseInt(e.dataset.limit,10)))})}function m({state:i,language:c}={}){const t=i??o.getState(),d=c??o.getLanguage();if(!t||t.phase==="lobby"){h(d);return}p(t,d)}o.subscribe(m),b.onChange(()=>m()),E(()=>m())}export{F as initGuide};
