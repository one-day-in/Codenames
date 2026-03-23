import{C as M,m as ee,e as U,r as V,a as K,g as ne,c as te,p as q,d as re,i as ie,o as oe,f as ae,n as Q,j as F,k as z,q as le,l as se}from"./turnTransitionDismiss-CXktg3ZR.js";import{t as C,e as x,I as B,f as ce,h as de,k as ue,D,n as me}from"./roomRepository-DF5mcqIV.js";import"./entry-B1uTVFIt.js";function _e(e){const n=C(e);let s=[];function l(){const i=Math.min(window.innerWidth,window.innerHeight),t=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&i<=768&&t<=1024}async function _(){var i;if(l())try{(i=screen.orientation)!=null&&i.lock&&await screen.orientation.lock("portrait")}catch{}}function d(){let i=document.getElementById("orientation-guard");return i||(i=document.createElement("div"),i.id="orientation-guard",i.className="orientation-guard",i.setAttribute("aria-live","polite"),i.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(i)),i}function g(){const i=d(),t=window.matchMedia("(orientation: landscape)").matches,m=l()&&t;i.classList.toggle("is-visible",m),document.body.classList.toggle("is-orientation-blocked",m)}const u=()=>{document.visibilityState==="visible"&&(_(),g())},v=()=>g(),o=()=>g();return _(),g(),document.addEventListener("visibilitychange",u),window.addEventListener("resize",v),window.addEventListener("orientationchange",o),s=[()=>document.removeEventListener("visibilitychange",u),()=>window.removeEventListener("resize",v),()=>window.removeEventListener("orientationchange",o)],()=>{s.forEach(i=>i())}}function ge(e,n){return e==="guide"?n.guide:n.dreamwalker}function ve(e,n){return e==="guide"?n.controllerGuideHint:n.controllerWalkerHint}function ke(e,n){return e==="guide"?n.controllerGuideTag:n.controllerWalkerTag}function pe(e){return e==="guide"?B.book:B.eye}function fe({language:e,presenceState:n,currentPresenceRole:s}){const l=C(e),_=M.filter(t=>n==null?void 0:n[t.presenceRole]).length,d=s===null&&_>0,g=d?l.newGame:l.controllerConnectEyebrow,u=d?l.controllerReconnectTitle:l.controllerConnectTitle,v=d?l.controllerReconnectText:l.controllerConnectText,o=["dissonant","resonant"];function i(t){const m=s===t.presenceRole,k=!!(n!=null&&n[t.presenceRole])&&!m,p=x(t.team,e),f=ge(t.roleType,l),h=ve(t.roleType,l),w=ke(t.roleType,l),T=k?l.roleBusy:m?l.currentRole:l.chooseRoleAction;return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${t.team} controller-role-picker__btn--${t.roleType} ${m?"is-current":""}"
                type="button"
                data-role-type="${t.roleType}"
                data-team="${t.team}"
                ${k?"disabled":""}
            >
                <span class="controller-role-picker__tag">${w}</span>
                <span class="controller-role-picker__icon" aria-hidden="true">${pe(t.roleType)}</span>
                <span class="controller-role-picker__team">${p}</span>
                <span class="controller-role-picker__role">${f}</span>
                <span class="controller-role-picker__hint">${h}</span>
                <span class="controller-role-picker__state ${m?"controller-role-picker__state--current":""}">${T}</span>
            </button>
        `}return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${d?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${g}</div>
                <h2 class="controller-role-picker__title">${u}</h2>
                <p class="controller-role-picker__text">${v}</p>
                <p class="controller-role-picker__summary">${_} / ${M.length} ${l.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${o.map(t=>{const m=x(t,e),k=M.filter(p=>p.team===t);return`
                            <section class="controller-role-picker__team-column controller-role-picker__team-column--${t}">
                                <h3 class="controller-role-picker__team-title">${m}</h3>
                                <div class="controller-role-picker__team-stack">
                                    ${k.map(i).join("")}
                                </div>
                            </section>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function we({state:e,lang:n,team:s,maxHintButtons:l,teamEffects:_,suppressedTransitionId:d,controllerRolePickerHtml:g=""}){const u=C(n),v=e.turn,o=v.team===s,i=v.guideLimit!==null,t=o&&!i&&!e.gameOver&&!e.turnTransition,m=_.allowTwoWordClue,k=_.forcedGuideLimit,p=_.hideEnemyColors,f=_.hideNightmare,h=x(s,n),w=t?`${u.guide}: ${u.chooseLimit}`:`${u.guide}: ${B.eyeClosed}`,T=[t&&k===1?u.guideForcedOneMove:null,t&&m?u.guideTwoWordClue:null,p?u.guideBlurActive:null,f?u.guideNightmareHidden:null].filter(Boolean),H=T.length?`<div class="guide__meta ${t?"guide__meta--active":"guide__meta--muted"}">${T.join(" • ")}</div>`:"",G=Array.from({length:l},(L,b)=>{const S=b+1;return`
            <button
                class="guide__num-btn ${v.guideLimit===S?"guide__num-btn--chosen":""}"
                data-limit="${S}"
                ${!t||k!==null&&S!==k?"disabled":""}
            >${S}</button>
        `}).join("");return`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${t?"guide__title--active":"guide__title--muted"}">${h}</div>
                    <div class="guide__meta ${t?"guide__meta--active":"guide__meta--muted"}">${w}</div>
                    ${H}
                    <div class="guide__btns ${t?"guide__btns--active":"guide__btns--muted"}">${G}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${s}">
                    <div class="grid grid--5">
                        ${e.cells.map((L,b)=>`
                            <div class="${ee(L,{team:s,effects:_})}" data-index="${b}">
                                <span class="cell__content">${U(L.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${V(e,n,{suppressedTransitionId:d})}
            ${K({state:e,lang:n,team:s})}
            ${g}
        </div>
    `}function $e({state:e,lang:n,team:s,suppressedTransitionId:l,controllerRolePickerHtml:_=""}){const d=C(n),g=e.turn,u=g.team===s,v=g.guideLimit!==null,o=u&&v&&!e.gameOver&&!e.turnTransition,i=v?Math.max((g.guideLimit??0)-(g.dreamwalkerMoves??0),0):0,t=x(s,n),m=o?`${d.dreamwalker}: <span class="walker__moves-value">${ce(i,n)}</span>`:`${d.dreamwalker}: ${B.eyeClosed}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__title ${o?"walker__title--active":"walker__title--muted"}">${t}</div>
                <div class="walker__header">
                    <div class="walker__meta">
                        <div class="${o?"walker__status walker__status--active":"walker__status walker__status--muted"}">${m}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${d.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${o?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${d.endTurn}" ${o?"":"disabled"}>${B.x}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${s}">
                    <div class="grid grid--5">
                        ${e.cells.map((p,f)=>`
                            <div
                                class="${ne(p)} ${o&&!p.revealed?"cell--clickable":""}"
                                data-index="${f}"
                            >
                                <span class="cell__content">${U(p.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${V(e,n,{suppressedTransitionId:l})}
            ${K({state:e,lang:n,team:s})}
            ${_}
        </div>
    `}const he=8;function A(e){return`nw-controller-game:${e}`}function ye(e){try{return sessionStorage.getItem(A(e))}catch{return null}}function I(e,n){try{n?sessionStorage.setItem(A(e),n):sessionStorage.removeItem(A(e))}catch{}}function Te({team:e,roleType:n}){return!e||e!=="resonant"&&e!=="dissonant"?null:n==="guide"||n==="walker"?Q(n,e):null}function be(e,n,s){if(!e)return n.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${x(e.team,s)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const l=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[l].replace(`
`,"<br>")}function J(e,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${C(e).waitingGame}</p>`}
        ${n}
    </div>`}async function Se(e){const{roomId:n,token:s,team:l,roleType:_}=de();if(!n||!s){e.innerHTML=`<div class="waiting-screen">
            <p>${C(D).scanQr}</p>
        </div>`;return}const{room:d,error:g}=await ue(n,s),u=(d==null?void 0:d.language)||D,v=C(u);if(!d||g){e.innerHTML=`<div class="waiting-screen">
            <p>${v.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}_e(u);const o=ae(n);await o.init();const i=te(n);let t=Te({team:l,roleType:_});const m=q(t);t&&await i.isRoleTaken(t)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${be(m,v,u)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${v.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(a=>{var c;(c=document.getElementById("forceJoinBtn"))==null||c.addEventListener("click",a,{once:!0})})),t?i.join(t):i.listen(),await re({presence:i,store:o,role:()=>t});let k=!1,p=new Set,f=null,h=ye(n),w=!t;ie(e,()=>{var r;return(r=o.getState())==null?void 0:r.turnTransition},async()=>{var a;const r=(a=o.getState())==null?void 0:a.turnTransition;r!=null&&r.id&&(f=r.id,R()),await o.dismissTurnTransition()});function T(){k=!1,p=new Set,f=null}async function H(r){t=r??null,t?await i.setRole(t):await i.setRole(null)}function G(r){const a=(r==null?void 0:r.gameId)??null;if(!a){h=null,I(n,null),w=!t;return}if(!t){w=!0;return}if(!h){h=a,I(n,a);return}a!==h&&!w&&(w=!0,T(),H(null).then(()=>R()))}function L(){return fe({language:o.getLanguage(),presenceState:i.getPresenceState(),currentPresenceRole:t})}function b(r){e.querySelectorAll("[data-controller-role-picker] button[data-role-type][data-team]").forEach(a=>{a.addEventListener("click",async()=>{const c=a.dataset.roleType,y=a.dataset.team,$=Q(c,y);i.getPresenceState()[$]&&t!==$||(w=!1,h=(r==null?void 0:r.gameId)??null,I(n,h),await H($),R())})})}function S(r,a,c,y){const $=me(r.teamEffects)[c.team],E=F(r.cells);e.innerHTML=we({state:r,lang:a,team:c.team,maxHintButtons:he,teamEffects:$,suppressedTransitionId:f,controllerRolePickerHtml:y}),z({root:e,selector:".guide .grid .cell",currentRevealed:E,prevRevealed:p,hasRenderedBoard:k}),p=E,k=!0,requestAnimationFrame(()=>{e.querySelectorAll(".cell").forEach(P=>le(P))}),e.querySelectorAll(".guide__num-btn:not([disabled])").forEach(P=>{P.addEventListener("click",()=>o.setGuideLimit(parseInt(P.dataset.limit,10)))}),b(r)}function O(r,a,c,y){var W;const $=F(r.cells),E=r.turn,P=E.team===c.team,Y=E.guideLimit!==null,Z=P&&Y&&!r.gameOver&&!r.turnTransition;e.innerHTML=$e({state:r,lang:a,team:c.team,suppressedTransitionId:f,controllerRolePickerHtml:y}),z({root:e,selector:".walker .grid .cell",currentRevealed:$,prevRevealed:p,hasRenderedBoard:k}),p=$,k=!0,requestAnimationFrame(()=>se(e)),e.querySelectorAll(".cell--clickable").forEach(j=>{j.addEventListener("click",()=>o.reveal(parseInt(j.dataset.index,10)))}),(W=document.getElementById("refreshBtn"))==null||W.addEventListener("click",()=>{Z&&o.endTurn()}),b(r)}function N(r,a){document.body.classList.remove("team-resonant","team-dissonant"),T(),e.innerHTML=J(a,L()),b(r)}function X(r,a){G(r),(!r.turnTransition||r.turnTransition.id!==f)&&(f=null);const c=q(t),y=w||!c;if(!c){N(r,a);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${c.team}`);const $=y?L():"";if(c.roleType==="guide"){S(r,a,c,$);return}O(r,a,c,$)}function R({state:r,language:a}={}){const c=r??o.getState(),y=a??o.getLanguage();if(!c){T(),e.innerHTML=J(y,t?"":L()),t||b(null);return}X(c,y)}o.subscribe(R),i.onChange(()=>{(w||!t)&&R()}),oe(()=>R()),R()}export{Se as initController};
