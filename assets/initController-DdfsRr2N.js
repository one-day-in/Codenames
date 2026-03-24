import{C as j,m as te,e as V,r as K,a as Q,g as re,c as ie,p as W,d as oe,i as ae,o as le,f as se,n as X,j as D,k as q,q as ce,l as de}from"./turnTransitionDismiss-Cd-j77RX.js";import{t as R,e as E,I as H,f as ue,h as me,k as _e,D as J,n as ge}from"./roomRepository-DDSKDQUG.js";import"./entry-Dv3nfTjy.js";function pe(e){const n=R(e);let c=[];function l(){const i=Math.min(window.innerWidth,window.innerHeight),t=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&i<=768&&t<=1024}async function p(){var i;if(l())try{(i=screen.orientation)!=null&&i.lock&&await screen.orientation.lock("portrait")}catch{}}function d(){let i=document.getElementById("orientation-guard");return i||(i=document.createElement("div"),i.id="orientation-guard",i.className="orientation-guard",i.setAttribute("aria-live","polite"),i.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(i)),i}function v(){const i=d(),t=window.matchMedia("(orientation: landscape)").matches,g=l()&&t;i.classList.toggle("is-visible",g),document.body.classList.toggle("is-orientation-blocked",g)}const u=()=>{document.visibilityState==="visible"&&(p(),v())},f=()=>v(),o=()=>v();return p(),v(),document.addEventListener("visibilitychange",u),window.addEventListener("resize",f),window.addEventListener("orientationchange",o),c=[()=>document.removeEventListener("visibilitychange",u),()=>window.removeEventListener("resize",f),()=>window.removeEventListener("orientationchange",o)],()=>{c.forEach(i=>i())}}function ve(e,n){return e==="guide"?n.guide:n.dreamwalker}function fe(e,n){return e==="guide"?n.controllerGuideHint:n.controllerWalkerHint}function ke(e){return e==="guide"?H.book:H.eye}function we({language:e,presenceState:n,currentPresenceRole:c}){const l=R(e),p=j.filter(t=>n==null?void 0:n[t.presenceRole]).length,d=c===null&&p>0,v=d?l.newGame:l.controllerConnectEyebrow,u=d?l.controllerReconnectTitle:l.controllerConnectTitle,f=d?l.controllerReconnectText:l.controllerConnectText,o=["dissonant","resonant"];function i(t){const g=c===t.presenceRole,m=!!(n!=null&&n[t.presenceRole])&&!g,k=ve(t.roleType,l),$=fe(t.roleType,l),h=m?l.roleBusy:g?l.currentRole:l.chooseRoleAction,y=m?"controller-role-picker__state--busy":g?"controller-role-picker__state--current":"controller-role-picker__state--action";return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${t.team} controller-role-picker__btn--${t.roleType} ${g?"is-current":""}"
                type="button"
                data-role-type="${t.roleType}"
                data-team="${t.team}"
                ${m?"disabled":""}
            >
                <span class="controller-role-picker__icon" aria-hidden="true">${ke(t.roleType)}</span>
                <span class="controller-role-picker__role">${k}</span>
                <span class="controller-role-picker__hint">${$}</span>
                <span class="controller-role-picker__state ${y}">${h}</span>
            </button>
        `}return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${d?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${v}</div>
                <h2 class="controller-role-picker__title">${u}</h2>
                <p class="controller-role-picker__text">${f}</p>
                <p class="controller-role-picker__summary">${p} / ${j.length} ${l.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${o.map(t=>{const g=E(t,e),m=j.filter(k=>k.team===t);return`
                            <section class="controller-role-picker__team-column controller-role-picker__team-column--${t}">
                                <h3 class="controller-role-picker__team-title">${g}</h3>
                                <div class="controller-role-picker__team-stack">
                                    ${m.map(i).join("")}
                                </div>
                            </section>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function $e({state:e,lang:n,team:c,maxHintButtons:l,teamEffects:p,suppressedTransitionId:d,controllerRolePickerHtml:v=""}){const u=R(n),f=e.turn,o=f.team===c,i=f.guideLimit!==null,t=o&&!i&&!e.gameOver&&!e.turnTransition,g=p.allowTwoWordClue,m=p.forcedGuideLimit,k=p.hideEnemyColors,$=p.hideNightmare,h=E(c,n),y=t?`${u.guide}: ${u.chooseLimit}`:`${u.guide}: ${H.eyeClosed}`,C=[t&&m===1?u.guideForcedOneMove:null,t&&g?u.guideTwoWordClue:null,k?u.guideBlurActive:null,$?u.guideNightmareHidden:null].filter(Boolean),S=C.length?`<div class="player__meta ${t?"player__meta--active":"player__meta--muted"}">${C.join(" • ")}</div>`:"",B=Array.from({length:l},(b,x)=>{const P=x+1;return`
            <button
                class="guide__num-btn ${f.guideLimit===P?"guide__num-btn--chosen":""}"
                data-limit="${P}"
                ${!t||m!==null&&P!==m?"disabled":""}
            >${P}</button>
        `}).join("");return`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${t?"guide__title--active":"guide__title--muted"}">${h}</div>
                    <div class="player__meta ${t?"player__meta--active":"player__meta--muted"}">${y}</div>
                    ${S}
                    <div class="guide__btns ${t?"guide__btns--active":"guide__btns--muted"}">${B}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${c}">
                    <div class="grid grid--5">
                        ${e.cells.map((b,x)=>`
                            <div class="${te(b,{team:c,effects:p})}" data-index="${x}">
                                <span class="cell__content">${V(b.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${K(e,n,{suppressedTransitionId:d})}
            ${Q({state:e,lang:n,team:c})}
            ${v}
        </div>
    `}function ye({state:e,lang:n,team:c,suppressedTransitionId:l,controllerRolePickerHtml:p=""}){const d=R(n),v=e.turn,u=v.team===c,f=v.guideLimit!==null,o=u&&f&&!e.gameOver&&!e.turnTransition,i=f?Math.max((v.guideLimit??0)-(v.dreamwalkerMoves??0),0):0,t=E(c,n),g=o?`${d.dreamwalker}: <span class="walker__moves-value">${ue(i,n)}</span>`:`${d.dreamwalker}: ${H.eyeClosed}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__header">
                    <div class="walker__title ${o?"walker__title--active":"walker__title--muted"}">${t}</div>
                    <div class="${o?"player__meta player__meta--active":"player__meta player__meta--muted"}">${g}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${c}">
                    <div class="grid grid--5">
                        ${e.cells.map((k,$)=>`
                            <div
                                class="${re(k)} ${o&&!k.revealed?"cell--clickable":""}"
                                data-index="${$}"
                            >
                                <span class="cell__content">${V(k.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer">
                <div class="walker__actions">
                    <button class="walker__action-btn walker__refresh-btn ${o?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${d.endTurn}" ${o?"":"disabled"}>
                        <span class="walker__action-label">${d.endTurn}</span>
                        <span class="walker__action-icon">${H.x}</span>
                    </button>
                </div>
            </footer>
            ${K(e,n,{suppressedTransitionId:l})}
            ${Q({state:e,lang:n,team:c})}
            ${p}
        </div>
    `}const he=8;function z(e){return`nw-controller-game:${e}`}function Te(e){try{return sessionStorage.getItem(z(e))}catch{return null}}function F(e,n){try{n?sessionStorage.setItem(z(e),n):sessionStorage.removeItem(z(e))}catch{}}function be({team:e,roleType:n}){return!e||e!=="resonant"&&e!=="dissonant"?null:n==="guide"||n==="walker"?X(n,e):null}function Le(e,n,c){if(!e)return n.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${E(e.team,c)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const l=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[l].replace(`
`,"<br>")}function U(e,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${R(e).waitingGame}</p>`}
        ${n}
    </div>`}async function xe(e){const{roomId:n,token:c,team:l,roleType:p}=me();if(!n||!c){e.innerHTML=`<div class="waiting-screen">
            <p>${R(J).scanQr}</p>
        </div>`;return}const{room:d,error:v}=await _e(n,c),u=(d==null?void 0:d.language)||J,f=R(u);if(!d||v){e.innerHTML=`<div class="waiting-screen">
            <p>${f.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}pe(u);const o=se(n);await o.init();const i=ie(n);let t=be({team:l,roleType:p});const g=W(t);t&&await i.isRoleTaken(t)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${Le(g,f,u)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${f.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(a=>{var s;(s=document.getElementById("forceJoinBtn"))==null||s.addEventListener("click",a,{once:!0})})),t?i.join(t):i.listen(),await oe({presence:i,store:o,role:()=>t});let m=!1,k=new Set,$=null,h=Te(n),y=!t,C=null,S=null,B=!0;ae(e,()=>{var r;return(r=o.getState())==null?void 0:r.turnTransition},async()=>{var a;const r=(a=o.getState())==null?void 0:a.turnTransition;r!=null&&r.id&&($=r.id,L()),await o.dismissTurnTransition()});function b(){m=!1,k=new Set,$=null,C=null,S=null,B=!0}async function x(r){t=r??null,t?await i.setRole(t):await i.setRole(null)}function P(r){const a=(r==null?void 0:r.gameId)??null;if(!a){h=null,F(n,null),y=!t;return}if(!t){y=!0;return}if(!h){h=a,F(n,a);return}a!==h&&!y&&(y=!0,b(),x(null).then(()=>L()))}function G(){return we({language:o.getLanguage(),presenceState:i.getPresenceState(),currentPresenceRole:t})}function A(r,a){const s=ce(r.cells),w=B||!m||C!==s||S!==a;C=s,S=a,w&&(B=!1,requestAnimationFrame(()=>de(e)))}function Y(r,a,s,w){const T=ge(r.teamEffects)[s.team],_=D(r.cells);e.innerHTML=$e({state:r,lang:a,team:s.team,maxHintButtons:he,teamEffects:T,suppressedTransitionId:$,controllerRolePickerHtml:w}),q({root:e,selector:".guide .grid .cell",currentRevealed:_,prevRevealed:k,hasRenderedBoard:m}),k=_,m=!0,A(r,"guide")}function Z(r,a,s,w){const T=D(r.cells);e.innerHTML=ye({state:r,lang:a,team:s.team,suppressedTransitionId:$,controllerRolePickerHtml:w}),q({root:e,selector:".walker .grid .cell",currentRevealed:T,prevRevealed:k,hasRenderedBoard:m}),k=T,m=!0,A(r,"walker")}function ee(r,a){document.body.classList.remove("team-resonant","team-dissonant"),b(),e.innerHTML=U(a,G())}function ne(r,a){P(r),(!r.turnTransition||r.turnTransition.id!==$)&&($=null);const s=W(t),w=y||!s;if(!s){ee(r,a);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${s.team}`);const T=w?G():"";if(s.roleType==="guide"){Y(r,a,s,T);return}Z(r,a,s,T)}function L({state:r,language:a}={}){const s=r??o.getState(),w=a??o.getLanguage();if(!s){b(),e.innerHTML=U(w,t?"":G());return}ne(s,w)}o.subscribe(L),i.onChange(()=>{(y||!t)&&L()}),le(()=>{B=!0,L()}),e.addEventListener("click",async r=>{const a=r.target.closest("[data-controller-role-picker] button[data-role-type][data-team]");if(a){const _=a.dataset.roleType,I=a.dataset.team,M=X(_,I),N=i.getPresenceState(),O=o.getState();if(N[M]&&t!==M)return;y=!1,h=(O==null?void 0:O.gameId)??null,F(n,h),await x(M),L();return}const s=r.target.closest(".guide__num-btn:not([disabled])");if(s){await o.setGuideLimit(parseInt(s.dataset.limit,10));return}const w=r.target.closest(".cell--clickable");if(w){await o.reveal(parseInt(w.dataset.index,10));return}if(r.target.closest("#refreshBtn")){const _=o.getState(),I=W(t),M=I&&(_==null?void 0:_.turn.team)===I.team,N=(_==null?void 0:_.turn.guideLimit)!==null;!!(M&&N&&!(_!=null&&_.gameOver)&&!(_!=null&&_.turnTransition))&&await o.endTurn()}}),L()}export{xe as initController};
