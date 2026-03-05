import{a as y,b as A}from"./renderCell-BOP4kpTI.js";import{o as G,e as H}from"./sanitize-D-eESqSO.js";import{t as u,D as m,g as w}from"./i18n-GZbblII2.js";import{i as C}from"./initGuestPage-CYJnKzwq.js";import"./url-XkLgVFj3.js";const E=8;async function k(s){const g=await C(s,{roleType:"guide",invalidParamsHtml:`<div class="waiting-screen">
            <p>${u(m).scanQr}</p>
        </div>`});if(!g)return;const{presence:_,store:a,team:r}=g;function v(i=m){s.innerHTML=`<div class="waiting-screen">
            <p>${u(i).waitingLobby}</p>
        </div>`}function p(i,d){const t=u(d),n=i.turn,b=n.team===r,f=n.guideLimit!==null,o=b&&!f&&!i.gameOver,$=`${w(r,d)} ${t.guide}`,h=t.chooseLimit,L=Array.from({length:E},(e,T)=>{const l=T+1;return`
            <button
                class="guide__num-btn ${n.guideLimit===l?"guide__num-btn--chosen":""}"
                data-limit="${l}"
                ${o?"":"disabled"}
            >${l}</button>
        `}).join("");s.innerHTML=`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${o?"guide__title--active":"guide__title--muted"}">${$}</div>
                    <div class="guide__hint">${h}</div>
                    <div class="guide__btns ${o?"guide__btns--active":"guide__btns--muted"}">${L}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${r}">
                    <div class="grid grid--5">
                        ${i.cells.map(e=>`
                            <div class="${y(e)}">
                                <span class="cell__content">${H(e.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
        </div>
    `,requestAnimationFrame(()=>{s.querySelectorAll(".cell").forEach(e=>A(e))}),s.querySelectorAll(".guide__num-btn:not([disabled])").forEach(e=>{e.addEventListener("click",()=>a.setGuideLimit(parseInt(e.dataset.limit,10)))})}function c({state:i,language:d}={}){const t=i??a.getState(),n=d??a.getLanguage();if(!t||t.phase==="lobby"){v(n);return}p(t,n)}a.subscribe(c),_.onChange(()=>c()),G(()=>c())}export{k as initGuide};
