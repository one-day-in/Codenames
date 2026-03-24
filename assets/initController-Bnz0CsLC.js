import{C as G,m as ee,e as U,r as V,a as K,g as ne,c as te,p as q,d as re,i as ie,o as oe,f as ae,n as Q,j as F,k as z,q as le,l as se}from"./turnTransitionDismiss-BZ8GIKX7.js";import{t as R,e as H,I as x,f as ce,h as de,k as ue,D,n as me}from"./roomRepository-DF5mcqIV.js";import"./entry-9MrwrIeB.js";function _e(e){const n=R(e);let s=[];function l(){const i=Math.min(window.innerWidth,window.innerHeight),t=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&i<=768&&t<=1024}async function g(){var i;if(l())try{(i=screen.orientation)!=null&&i.lock&&await screen.orientation.lock("portrait")}catch{}}function d(){let i=document.getElementById("orientation-guard");return i||(i=document.createElement("div"),i.id="orientation-guard",i.className="orientation-guard",i.setAttribute("aria-live","polite"),i.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(i)),i}function v(){const i=d(),t=window.matchMedia("(orientation: landscape)").matches,m=l()&&t;i.classList.toggle("is-visible",m),document.body.classList.toggle("is-orientation-blocked",m)}const u=()=>{document.visibilityState==="visible"&&(g(),v())},p=()=>v(),o=()=>v();return g(),v(),document.addEventListener("visibilitychange",u),window.addEventListener("resize",p),window.addEventListener("orientationchange",o),s=[()=>document.removeEventListener("visibilitychange",u),()=>window.removeEventListener("resize",p),()=>window.removeEventListener("orientationchange",o)],()=>{s.forEach(i=>i())}}function ge(e,n){return e==="guide"?n.guide:n.dreamwalker}function ve(e,n){return e==="guide"?n.controllerGuideHint:n.controllerWalkerHint}function pe(e){return e==="guide"?x.book:x.eye}function ke({language:e,presenceState:n,currentPresenceRole:s}){const l=R(e),g=G.filter(t=>n==null?void 0:n[t.presenceRole]).length,d=s===null&&g>0,v=d?l.newGame:l.controllerConnectEyebrow,u=d?l.controllerReconnectTitle:l.controllerConnectTitle,p=d?l.controllerReconnectText:l.controllerConnectText,o=["dissonant","resonant"];function i(t){const m=s===t.presenceRole,_=!!(n!=null&&n[t.presenceRole])&&!m,k=ge(t.roleType,l),f=ve(t.roleType,l),w=_?l.roleBusy:m?l.currentRole:l.chooseRoleAction,y=_?"controller-role-picker__state--busy":m?"controller-role-picker__state--current":"controller-role-picker__state--action";return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${t.team} controller-role-picker__btn--${t.roleType} ${m?"is-current":""}"
                type="button"
                data-role-type="${t.roleType}"
                data-team="${t.team}"
                ${_?"disabled":""}
            >
                <span class="controller-role-picker__icon" aria-hidden="true">${pe(t.roleType)}</span>
                <span class="controller-role-picker__role">${k}</span>
                <span class="controller-role-picker__hint">${f}</span>
                <span class="controller-role-picker__state ${y}">${w}</span>
            </button>
        `}return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${d?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${v}</div>
                <h2 class="controller-role-picker__title">${u}</h2>
                <p class="controller-role-picker__text">${p}</p>
                <p class="controller-role-picker__summary">${g} / ${G.length} ${l.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${o.map(t=>{const m=H(t,e),_=G.filter(k=>k.team===t);return`
                            <section class="controller-role-picker__team-column controller-role-picker__team-column--${t}">
                                <h3 class="controller-role-picker__team-title">${m}</h3>
                                <div class="controller-role-picker__team-stack">
                                    ${_.map(i).join("")}
                                </div>
                            </section>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function fe({state:e,lang:n,team:s,maxHintButtons:l,teamEffects:g,suppressedTransitionId:d,controllerRolePickerHtml:v=""}){const u=R(n),p=e.turn,o=p.team===s,i=p.guideLimit!==null,t=o&&!i&&!e.gameOver&&!e.turnTransition,m=g.allowTwoWordClue,_=g.forcedGuideLimit,k=g.hideEnemyColors,f=g.hideNightmare,w=H(s,n),y=t?`${u.guide}: ${u.chooseLimit}`:`${u.guide}: ${x.eyeClosed}`,C=[t&&_===1?u.guideForcedOneMove:null,t&&m?u.guideTwoWordClue:null,k?u.guideBlurActive:null,f?u.guideNightmareHidden:null].filter(Boolean),B=C.length?`<div class="player__meta ${t?"player__meta--active":"player__meta--muted"}">${C.join(" • ")}</div>`:"",M=Array.from({length:l},(b,T)=>{const S=T+1;return`
            <button
                class="guide__num-btn ${p.guideLimit===S?"guide__num-btn--chosen":""}"
                data-limit="${S}"
                ${!t||_!==null&&S!==_?"disabled":""}
            >${S}</button>
        `}).join("");return`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${t?"guide__title--active":"guide__title--muted"}">${w}</div>
                    <div class="player__meta ${t?"player__meta--active":"player__meta--muted"}">${y}</div>
                    ${B}
                    <div class="guide__btns ${t?"guide__btns--active":"guide__btns--muted"}">${M}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${s}">
                    <div class="grid grid--5">
                        ${e.cells.map((b,T)=>`
                            <div class="${ee(b,{team:s,effects:g})}" data-index="${T}">
                                <span class="cell__content">${U(b.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${V(e,n,{suppressedTransitionId:d})}
            ${K({state:e,lang:n,team:s})}
            ${v}
        </div>
    `}function ye({state:e,lang:n,team:s,suppressedTransitionId:l,controllerRolePickerHtml:g=""}){const d=R(n),v=e.turn,u=v.team===s,p=v.guideLimit!==null,o=u&&p&&!e.gameOver&&!e.turnTransition,i=p?Math.max((v.guideLimit??0)-(v.dreamwalkerMoves??0),0):0,t=H(s,n),m=o?`${d.dreamwalker}: <span class="walker__moves-value">${ce(i,n)}</span>`:`${d.dreamwalker}: ${x.eyeClosed}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__header">
                    <div class="walker__title ${o?"walker__title--active":"walker__title--muted"}">${t}</div>
                    <div class="${o?"player__meta player__meta--active":"player__meta player__meta--muted"}">${m}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${s}">
                    <div class="grid grid--5">
                        ${e.cells.map((k,f)=>`
                            <div
                                class="${ne(k)} ${o&&!k.revealed?"cell--clickable":""}"
                                data-index="${f}"
                            >
                                <span class="cell__content">${U(k.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer">
                <div class="walker__actions">
                    <button class="walker__action-btn walker__refresh-btn ${o?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${d.endTurn}" ${o?"":"disabled"}>
                        <span class="walker__action-label">${d.endTurn}</span>
                        <span class="walker__action-icon">${x.x}</span>
                    </button>
                </div>
            </footer>
            ${V(e,n,{suppressedTransitionId:l})}
            ${K({state:e,lang:n,team:s})}
            ${g}
        </div>
    `}const $e=8;function A(e){return`nw-controller-game:${e}`}function we(e){try{return sessionStorage.getItem(A(e))}catch{return null}}function I(e,n){try{n?sessionStorage.setItem(A(e),n):sessionStorage.removeItem(A(e))}catch{}}function he({team:e,roleType:n}){return!e||e!=="resonant"&&e!=="dissonant"?null:n==="guide"||n==="walker"?Q(n,e):null}function Te(e,n,s){if(!e)return n.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${H(e.team,s)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const l=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[l].replace(`
`,"<br>")}function J(e,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${R(e).waitingGame}</p>`}
        ${n}
    </div>`}async function Ce(e){const{roomId:n,token:s,team:l,roleType:g}=de();if(!n||!s){e.innerHTML=`<div class="waiting-screen">
            <p>${R(D).scanQr}</p>
        </div>`;return}const{room:d,error:v}=await ue(n,s),u=(d==null?void 0:d.language)||D,p=R(u);if(!d||v){e.innerHTML=`<div class="waiting-screen">
            <p>${p.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}_e(u);const o=ae(n);await o.init();const i=te(n);let t=he({team:l,roleType:g});const m=q(t);t&&await i.isRoleTaken(t)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${Te(m,p,u)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${p.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(a=>{var c;(c=document.getElementById("forceJoinBtn"))==null||c.addEventListener("click",a,{once:!0})})),t?i.join(t):i.listen(),await re({presence:i,store:o,role:()=>t});let _=!1,k=new Set,f=null,w=we(n),y=!t;ie(e,()=>{var r;return(r=o.getState())==null?void 0:r.turnTransition},async()=>{var a;const r=(a=o.getState())==null?void 0:a.turnTransition;r!=null&&r.id&&(f=r.id,L()),await o.dismissTurnTransition()});function C(){_=!1,k=new Set,f=null}async function B(r){t=r??null,t?await i.setRole(t):await i.setRole(null)}function M(r){const a=(r==null?void 0:r.gameId)??null;if(!a){w=null,I(n,null),y=!t;return}if(!t){y=!0;return}if(!w){w=a,I(n,a);return}a!==w&&!y&&(y=!0,C(),B(null).then(()=>L()))}function b(){return ke({language:o.getLanguage(),presenceState:i.getPresenceState(),currentPresenceRole:t})}function T(r){e.querySelectorAll("[data-controller-role-picker] button[data-role-type][data-team]").forEach(a=>{a.addEventListener("click",async()=>{const c=a.dataset.roleType,h=a.dataset.team,$=Q(c,h);i.getPresenceState()[$]&&t!==$||(y=!1,w=(r==null?void 0:r.gameId)??null,I(n,w),await B($),L())})})}function S(r,a,c,h){const $=me(r.teamEffects)[c.team],E=F(r.cells);e.innerHTML=fe({state:r,lang:a,team:c.team,maxHintButtons:$e,teamEffects:$,suppressedTransitionId:f,controllerRolePickerHtml:h}),z({root:e,selector:".guide .grid .cell",currentRevealed:E,prevRevealed:k,hasRenderedBoard:_}),k=E,_=!0,requestAnimationFrame(()=>{e.querySelectorAll(".cell").forEach(P=>le(P))}),e.querySelectorAll(".guide__num-btn:not([disabled])").forEach(P=>{P.addEventListener("click",()=>o.setGuideLimit(parseInt(P.dataset.limit,10)))}),T(r)}function O(r,a,c,h){var j;const $=F(r.cells),E=r.turn,P=E.team===c.team,Y=E.guideLimit!==null,Z=P&&Y&&!r.gameOver&&!r.turnTransition;e.innerHTML=ye({state:r,lang:a,team:c.team,suppressedTransitionId:f,controllerRolePickerHtml:h}),z({root:e,selector:".walker .grid .cell",currentRevealed:$,prevRevealed:k,hasRenderedBoard:_}),k=$,_=!0,requestAnimationFrame(()=>se(e)),e.querySelectorAll(".cell--clickable").forEach(W=>{W.addEventListener("click",()=>o.reveal(parseInt(W.dataset.index,10)))}),(j=document.getElementById("refreshBtn"))==null||j.addEventListener("click",()=>{Z&&o.endTurn()}),T(r)}function N(r,a){document.body.classList.remove("team-resonant","team-dissonant"),C(),e.innerHTML=J(a,b()),T(r)}function X(r,a){M(r),(!r.turnTransition||r.turnTransition.id!==f)&&(f=null);const c=q(t),h=y||!c;if(!c){N(r,a);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${c.team}`);const $=h?b():"";if(c.roleType==="guide"){S(r,a,c,$);return}O(r,a,c,$)}function L({state:r,language:a}={}){const c=r??o.getState(),h=a??o.getLanguage();if(!c){C(),e.innerHTML=J(h,t?"":b()),t||T(null);return}X(c,h)}o.subscribe(L),i.onChange(()=>{(y||!t)&&L()}),oe(()=>L()),L()}export{Ce as initController};
