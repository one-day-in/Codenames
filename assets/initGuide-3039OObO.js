import{a as y,b as A}from"./renderCell-j9Yfrae9.js";import{o as C,e as G}from"./sanitize-s2klz6Q2.js";import{t as u,D as v}from"./url-oOUZ7you.js";import{i as H}from"./initGuestPage-BMHdV60b.js";const w=8;async function N(s){const l=await H(s,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${u(v).scanQr}</p>
        </div>`});if(!l)return;const{presence:$,store:a,team:r}=l;function b(i=v){s.innerHTML=`<div class="waiting-screen">
            <p>${u(i).waitingLobby}</p>
        </div>`}function _(i,o){const n=u(o),t=i.turn,g=t.team===r,m=t.guideLimit!==null,p=r.charAt(0).toUpperCase()+r.slice(1),f=g&&!m?`${p} ${n.guide} : ${n.yourTurn}`:`${p} ${n.guide}`,L=Array.from({length:w},(e,T)=>{const d=T+1,h=g&&!m&&!i.gameOver;return`
            <button
                class="guide__num-btn ${t.guideLimit===d?"guide__num-btn--chosen":""}"
                data-limit="${d}"
                ${h?"":"disabled"}
            >${d}</button>
        `}).join("");s.innerHTML=`
        <div class="guide guide--${r}">
            <div class="grid grid--5">
                ${i.cells.map(e=>`
                    <div class="${y(e)}">
                        <span class="cell__content">${G(e.word)}</span>
                    </div>
                `).join("")}
            </div>
        </div>

        <div class="guide__status">${f}</div>
        <div class="guide__btns">${L}</div>
    `,requestAnimationFrame(()=>{s.querySelectorAll(".cell").forEach(e=>A(e))}),s.querySelectorAll(".guide__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>a.setGuideLimit(parseInt(e.dataset.limit,10)))})}function c({state:i,language:o}={}){const n=i??a.getState(),t=o??a.getLanguage();if(!n||n.phase==="lobby"){b(t);return}_(n,t)}a.subscribe(c),$.onChange(()=>c()),C(()=>c())}export{N as initGuide};
