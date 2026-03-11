import{a as w,b as C}from"./renderCell-D2QPO2EK.js";import{o as E,e as G,r as H}from"./sanitize-Dk4qHRqk.js";import{t as _,D as $,g as M,I as N}from"./icons-C5SiWFC8.js";import{i as q}from"./initGuestPage-nTvTMdD9.js";import"./url-NB_mxKzZ.js";import"./keepAlive-By6PPzHl.js";const I=8;async function F(s){const v=await q(s,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${_($).scanQr}</p>
        </div>`});if(!v)return;const{presence:p,store:c,team:o}=v;let l=!1,u=new Set;function b(i=$){l=!1,u=new Set,s.innerHTML=`<div class="waiting-screen">
            <p>${_(i).waitingLobby}</p>
        </div>`}function h(i,d){const n=_(d),a=i.turn,y=a.team===o,L=a.guideLimit!==null,r=y&&!L&&!i.gameOver&&!i.turnTransition;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${o}`);const T=M(o,d),A=r?`${n.guide}: ${n.chooseLimit}`:`${n.guide}: ${N.eyeClosed}`,S=Array.from({length:I},(e,t)=>{const g=t+1;return`
            <button
                class="guide__num-btn ${a.guideLimit===g?"guide__num-btn--chosen":""}"
                data-limit="${g}"
                ${r?"":"disabled"}
            >${g}</button>
        `}).join(""),f=new Set(i.cells.map((e,t)=>e.revealed?t:-1).filter(e=>e>=0));s.innerHTML=`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${r?"guide__title--active":"guide__title--muted"}">${T}</div>
                    <div class="guide__meta ${r?"guide__meta--active":"guide__meta--muted"}">${A}</div>
                    <div class="guide__btns ${r?"guide__btns--active":"guide__btns--muted"}">${S}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${o}">
                    <div class="grid grid--5">
                        ${i.cells.map((e,t)=>`
                            <div class="${w(e)}" data-index="${t}">
                                <span class="cell__content">${G(e.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${H(i,d)}
        </div>
    `,s.querySelectorAll(".guide .grid .cell").forEach((e,t)=>{l&&(!f.has(t)||u.has(t)||e.classList.add("cell--reveal-anim"))}),u=f,l=!0,requestAnimationFrame(()=>{s.querySelectorAll(".cell").forEach(e=>C(e))}),s.querySelectorAll(".guide__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>c.setGuideLimit(parseInt(e.dataset.limit,10)))})}function m({state:i,language:d}={}){const n=i??c.getState(),a=d??c.getLanguage();if(!n||n.phase==="lobby"){b(a);return}h(n,a)}c.subscribe(m),p.onChange(()=>m()),E(()=>m())}export{F as initGuide};
