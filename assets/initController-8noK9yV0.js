import{C as I,m as ee,e as V,r as K,a as Q,g as ne,c as te,p as F,d as re,i as ie,o as oe,f as ae,n as B,j as z,k as D,q as le,l as se}from"./turnTransitionDismiss-CzzeG6WE.js";import{t as R,e as G,I as x,f as ce,h as de,k as ue,D as J,n as me}from"./roomRepository-B6shp1eI.js";import"./entry-SQoFu-ga.js";function ge(e){const n=R(e);let l=[];function s(){const i=Math.min(window.innerWidth,window.innerHeight),o=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&i<=768&&o<=1024}async function m(){var i;if(s())try{(i=screen.orientation)!=null&&i.lock&&await screen.orientation.lock("portrait")}catch{}}function d(){let i=document.getElementById("orientation-guard");return i||(i=document.createElement("div"),i.id="orientation-guard",i.className="orientation-guard",i.setAttribute("aria-live","polite"),i.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(i)),i}function g(){const i=d(),o=window.matchMedia("(orientation: landscape)").matches,f=s()&&o;i.classList.toggle("is-visible",f),document.body.classList.toggle("is-orientation-blocked",f)}const u=()=>{document.visibilityState==="visible"&&(m(),g())},_=()=>g(),r=()=>g();return m(),g(),document.addEventListener("visibilitychange",u),window.addEventListener("resize",_),window.addEventListener("orientationchange",r),l=[()=>document.removeEventListener("visibilitychange",u),()=>window.removeEventListener("resize",_),()=>window.removeEventListener("orientationchange",r)],()=>{l.forEach(i=>i())}}function _e(e,n){return e==="guide"?n.guide:n.dreamwalker}function ve(e,n){return e==="guide"?n.controllerGuideHint:n.controllerWalkerHint}function ke(e,n){return e==="guide"?n.controllerGuideTag:n.controllerWalkerTag}function pe(e){return e==="guide"?x.book:x.eye}function fe({language:e,presenceState:n,currentPresenceRole:l}){const s=R(e),m=I.filter(r=>n==null?void 0:n[r.presenceRole]).length,d=l===null&&m>0,g=d?s.newGame:s.controllerConnectEyebrow,u=d?s.controllerReconnectTitle:s.controllerConnectTitle,_=d?s.controllerReconnectText:s.controllerConnectText;return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${d?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${g}</div>
                <h2 class="controller-role-picker__title">${u}</h2>
                <p class="controller-role-picker__text">${_}</p>
                <p class="controller-role-picker__summary">${m} / ${I.length} ${s.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${I.map(r=>{const i=l===r.presenceRole,o=!!(n!=null&&n[r.presenceRole])&&!i,f=G(r.team,e),k=_e(r.roleType,s),v=ve(r.roleType,s),p=ke(r.roleType,s),$=o?s.roleBusy:i?s.currentRole:s.chooseRoleAction;return`
                            <button
                                class="controller-role-picker__btn controller-role-picker__btn--${r.team} controller-role-picker__btn--${r.roleType} ${i?"is-current":""}"
                                type="button"
                                data-role-type="${r.roleType}"
                                data-team="${r.team}"
                                ${o?"disabled":""}
                            >
                                <span class="controller-role-picker__tag">${p}</span>
                                <span class="controller-role-picker__icon" aria-hidden="true">${pe(r.roleType)}</span>
                                <span class="controller-role-picker__team">${f}</span>
                                <span class="controller-role-picker__role">${k}</span>
                                <span class="controller-role-picker__hint">${v}</span>
                                <span class="controller-role-picker__state ${i?"controller-role-picker__state--current":""}">${$}</span>
                            </button>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function we({state:e,lang:n,team:l,maxHintButtons:s,teamEffects:m,suppressedTransitionId:d,controllerRolePickerHtml:g=""}){const u=R(n),_=e.turn,r=_.team===l,i=_.guideLimit!==null,o=r&&!i&&!e.gameOver&&!e.turnTransition,f=m.allowTwoWordClue,k=m.forcedGuideLimit,v=m.hideEnemyColors,p=m.hideNightmare,$=G(l,n),y=o?`${u.guide}: ${u.chooseLimit}`:`${u.guide}: ${x.eyeClosed}`,C=[o&&k===1?u.guideForcedOneMove:null,o&&f?u.guideTwoWordClue:null,v?u.guideBlurActive:null,p?u.guideNightmareHidden:null].filter(Boolean),H=C.length?`<div class="guide__meta ${o?"guide__meta--active":"guide__meta--muted"}">${C.join(" • ")}</div>`:"",M=Array.from({length:s},(b,T)=>{const S=T+1;return`
            <button
                class="guide__num-btn ${_.guideLimit===S?"guide__num-btn--chosen":""}"
                data-limit="${S}"
                ${!o||k!==null&&S!==k?"disabled":""}
            >${S}</button>
        `}).join("");return`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${o?"guide__title--active":"guide__title--muted"}">${$}</div>
                    <div class="guide__meta ${o?"guide__meta--active":"guide__meta--muted"}">${y}</div>
                    ${H}
                    <div class="guide__btns ${o?"guide__btns--active":"guide__btns--muted"}">${M}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${l}">
                    <div class="grid grid--5">
                        ${e.cells.map((b,T)=>`
                            <div class="${ee(b,{team:l,effects:m})}" data-index="${T}">
                                <span class="cell__content">${V(b.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${K(e,n,{suppressedTransitionId:d})}
            ${Q({state:e,lang:n,team:l})}
            ${g}
        </div>
    `}function $e({state:e,lang:n,team:l,suppressedTransitionId:s,controllerRolePickerHtml:m=""}){const d=R(n),g=e.turn,u=g.team===l,_=g.guideLimit!==null,r=u&&_&&!e.gameOver&&!e.turnTransition,i=_?Math.max((g.guideLimit??0)-(g.dreamwalkerMoves??0),0):0,o=G(l,n),f=r?`${d.dreamwalker}: <span class="walker__moves-value">${ce(i,n)}</span>`:`${d.dreamwalker}: ${x.eyeClosed}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__title ${r?"walker__title--active":"walker__title--muted"}">${o}</div>
                <div class="walker__header">
                    <div class="walker__meta">
                        <div class="${r?"walker__status walker__status--active":"walker__status walker__status--muted"}">${f}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${d.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${r?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${d.endTurn}" ${r?"":"disabled"}>${x.x}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${l}">
                    <div class="grid grid--5">
                        ${e.cells.map((v,p)=>`
                            <div
                                class="${ne(v)} ${r&&!v.revealed?"cell--clickable":""}"
                                data-index="${p}"
                            >
                                <span class="cell__content">${V(v.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${K(e,n,{suppressedTransitionId:s})}
            ${Q({state:e,lang:n,team:l})}
            ${m}
        </div>
    `}const he=8;function O(e){return`nw-controller-game:${e}`}function ye(e){try{return sessionStorage.getItem(O(e))}catch{return null}}function A(e,n){try{n?sessionStorage.setItem(O(e),n):sessionStorage.removeItem(O(e))}catch{}}function Te({team:e,roleType:n}){if(!e||e!=="resonant"&&e!=="dissonant")return null;if(n==="guide"||n==="walker")return B(n,e);const l=window.location.pathname.split("/").pop();return l==="guide.html"?B("guide",e):l==="walker.html"?B("walker",e):null}function be(e,n,l){if(!e)return n.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${G(e.team,l)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const s=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[s].replace(`
`,"<br>")}function U(e,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${R(e).waitingGame}</p>`}
        ${n}
    </div>`}async function Se(e){const{roomId:n,token:l,team:s,roleType:m}=de();if(!n||!l){e.innerHTML=`<div class="waiting-screen">
            <p>${R(J).scanQr}</p>
        </div>`;return}const{room:d,error:g}=await ue(n,l),u=(d==null?void 0:d.language)||J,_=R(u);if(!d||g){e.innerHTML=`<div class="waiting-screen">
            <p>${_.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}ge(u);const r=ae(n);await r.init();const i=te(n);let o=Te({team:s,roleType:m});const f=F(o);o&&await i.isRoleTaken(o)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${be(f,_,u)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${_.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(a=>{var c;(c=document.getElementById("forceJoinBtn"))==null||c.addEventListener("click",a,{once:!0})})),o?i.join(o):i.listen(),await re({presence:i,store:r,role:()=>o});let k=!1,v=new Set,p=null,$=ye(n),y=!o;ie(e,()=>{var t;return(t=r.getState())==null?void 0:t.turnTransition},async()=>{var a;const t=(a=r.getState())==null?void 0:a.turnTransition;t!=null&&t.id&&(p=t.id,L()),await r.dismissTurnTransition()});function C(){k=!1,v=new Set,p=null}async function H(t){o=t??null,o?await i.setRole(o):await i.setRole(null)}function M(t){const a=(t==null?void 0:t.gameId)??null;if(!a){$=null,A(n,null),y=!o;return}if(!o){y=!0;return}if(!$){$=a,A(n,a);return}a!==$&&!y&&(y=!0,C(),H(null).then(()=>L()))}function b(){return fe({language:r.getLanguage(),presenceState:i.getPresenceState(),currentPresenceRole:o})}function T(t){e.querySelectorAll("[data-controller-role-picker] button[data-role-type][data-team]").forEach(a=>{a.addEventListener("click",async()=>{const c=a.dataset.roleType,h=a.dataset.team,w=B(c,h);i.getPresenceState()[w]&&o!==w||(y=!1,$=(t==null?void 0:t.gameId)??null,A(n,$),await H(w),L())})})}function S(t,a,c,h){const w=me(t.teamEffects)[c.team],E=z(t.cells);e.innerHTML=we({state:t,lang:a,team:c.team,maxHintButtons:he,teamEffects:w,suppressedTransitionId:p,controllerRolePickerHtml:h}),D({root:e,selector:".guide .grid .cell",currentRevealed:E,prevRevealed:v,hasRenderedBoard:k}),v=E,k=!0,requestAnimationFrame(()=>{e.querySelectorAll(".cell").forEach(P=>le(P))}),e.querySelectorAll(".guide__num-btn:not([disabled])").forEach(P=>{P.addEventListener("click",()=>r.setGuideLimit(parseInt(P.dataset.limit,10)))}),T(t)}function N(t,a,c,h){var j;const w=z(t.cells),E=t.turn,P=E.team===c.team,Y=E.guideLimit!==null,Z=P&&Y&&!t.gameOver&&!t.turnTransition;e.innerHTML=$e({state:t,lang:a,team:c.team,suppressedTransitionId:p,controllerRolePickerHtml:h}),D({root:e,selector:".walker .grid .cell",currentRevealed:w,prevRevealed:v,hasRenderedBoard:k}),v=w,k=!0,requestAnimationFrame(()=>se(e)),e.querySelectorAll(".cell--clickable").forEach(q=>{q.addEventListener("click",()=>r.reveal(parseInt(q.dataset.index,10)))}),(j=document.getElementById("refreshBtn"))==null||j.addEventListener("click",()=>{Z&&r.endTurn()}),T(t)}function W(t,a){document.body.classList.remove("team-resonant","team-dissonant"),C(),e.innerHTML=U(a,b()),T(t)}function X(t,a){M(t),(!t.turnTransition||t.turnTransition.id!==p)&&(p=null);const c=F(o),h=y||!c;if(!c){W(t,a);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${c.team}`);const w=h?b():"";if(c.roleType==="guide"){S(t,a,c,w);return}N(t,a,c,w)}function L({state:t,language:a}={}){const c=t??r.getState(),h=a??r.getLanguage();if(!c){C(),e.innerHTML=U(h,o?"":b()),o||T(null);return}X(c,h)}r.subscribe(L),i.onChange(()=>{(y||!o)&&L()}),oe(()=>L()),L()}export{Se as initController};
