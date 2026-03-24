import{C as j,m as ae,e as Y,r as Z,a as ee,g as le,c as se,p as F,d as ce,i as de,o as ue,f as me,n as ne,j as Q,k as X,q as _e,l as ge}from"./turnTransitionDismiss-DJcEsnFk.js";import{t as B,e as O,I as H,f as pe,h as ve,k as fe,D as W,n as ke}from"./roomRepository-DDSKDQUG.js";import"./entry-TlQHja4J.js";function we(e){const n=B(e);let c=[];function l(){const i=Math.min(window.innerWidth,window.innerHeight),t=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&i<=768&&t<=1024}async function p(){var i;if(l())try{(i=screen.orientation)!=null&&i.lock&&await screen.orientation.lock("portrait")}catch{}}function d(){let i=document.getElementById("orientation-guard");return i||(i=document.createElement("div"),i.id="orientation-guard",i.className="orientation-guard",i.setAttribute("aria-live","polite"),i.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(i)),i}function v(){const i=d(),t=window.matchMedia("(orientation: landscape)").matches,g=l()&&t;i.classList.toggle("is-visible",g),document.body.classList.toggle("is-orientation-blocked",g)}const u=()=>{document.visibilityState==="visible"&&(p(),v())},f=()=>v(),o=()=>v();return p(),v(),document.addEventListener("visibilitychange",u),window.addEventListener("resize",f),window.addEventListener("orientationchange",o),c=[()=>document.removeEventListener("visibilitychange",u),()=>window.removeEventListener("resize",f),()=>window.removeEventListener("orientationchange",o)],()=>{c.forEach(i=>i())}}function $e(e,n){return e==="guide"?n.guide:n.dreamwalker}function ye(e,n){return e==="guide"?n.controllerGuideHint:n.controllerWalkerHint}function he(e){return e==="guide"?H.book:H.eye}function Te({language:e,presenceState:n,currentPresenceRole:c}){const l=B(e),p=j.filter(t=>n==null?void 0:n[t.presenceRole]).length,d=c===null&&p>0,v=d?l.newGame:l.controllerConnectEyebrow,u=d?l.controllerReconnectTitle:l.controllerConnectTitle,f=d?l.controllerReconnectText:l.controllerConnectText,o=["dissonant","resonant"];function i(t){const g=c===t.presenceRole,m=!!(n!=null&&n[t.presenceRole])&&!g,k=$e(t.roleType,l),$=ye(t.roleType,l),h=m?l.roleBusy:g?l.currentRole:l.chooseRoleAction,y=m?"controller-role-picker__state--busy":g?"controller-role-picker__state--current":"controller-role-picker__state--action";return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${t.team} controller-role-picker__btn--${t.roleType} ${g?"is-current":""}"
                type="button"
                data-role-type="${t.roleType}"
                data-team="${t.team}"
                ${m?"disabled":""}
            >
                <span class="controller-role-picker__icon" aria-hidden="true">${he(t.roleType)}</span>
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
                    ${o.map(t=>{const g=O(t,e),m=j.filter(k=>k.team===t);return`
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
    `}function be({state:e,lang:n,team:c,maxHintButtons:l,teamEffects:p,suppressedTransitionId:d,controllerRolePickerHtml:v=""}){const u=B(n),f=e.turn,o=f.team===c,i=f.guideLimit!==null,t=o&&!i&&!e.gameOver&&!e.turnTransition,g=p.allowTwoWordClue,m=p.forcedGuideLimit,k=p.hideEnemyColors,$=p.hideNightmare,h=O(c,n),y=t?`${u.guide}: ${u.chooseLimit}`:`${u.guide}: ${H.eyeClosed}`,S=[t&&m===1?u.guideForcedOneMove:null,t&&g?u.guideTwoWordClue:null,k?u.guideBlurActive:null,$?u.guideNightmareHidden:null].filter(Boolean),P=S.length?`<div class="player__meta ${t?"player__meta--active":"player__meta--muted"}">${S.join(" • ")}</div>`:"",C=Array.from({length:l},(T,x)=>{const b=x+1;return`
            <button
                class="guide__num-btn ${f.guideLimit===b?"guide__num-btn--chosen":""}"
                data-limit="${b}"
                ${!t||m!==null&&b!==m?"disabled":""}
            >${b}</button>
        `}).join("");return`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${t?"guide__title--active":"guide__title--muted"}">${h}</div>
                    <div class="player__meta ${t?"player__meta--active":"player__meta--muted"}">${y}</div>
                    ${P}
                    <div class="guide__btns ${t?"guide__btns--active":"guide__btns--muted"}">${C}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${c}">
                    <div class="grid grid--5">
                        ${e.cells.map((T,x)=>`
                            <div class="${ae(T,{team:c,effects:p})}" data-index="${x}">
                                <span class="cell__content">${Y(T.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${Z(e,n,{suppressedTransitionId:d})}
            ${ee({state:e,lang:n,team:c})}
            ${v}
        </div>
    `}function Le({state:e,lang:n,team:c,suppressedTransitionId:l,controllerRolePickerHtml:p=""}){const d=B(n),v=e.turn,u=v.team===c,f=v.guideLimit!==null,o=u&&f&&!e.gameOver&&!e.turnTransition,i=f?Math.max((v.guideLimit??0)-(v.dreamwalkerMoves??0),0):0,t=O(c,n),g=o?`${d.dreamwalker}: <span class="walker__moves-value">${pe(i,n)}</span>`:`${d.dreamwalker}: ${H.eyeClosed}`;return`
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
                                class="${le(k)} ${o&&!k.revealed?"cell--clickable":""}"
                                data-index="${$}"
                            >
                                <span class="cell__content">${Y(k.word)}</span>
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
            ${Z(e,n,{suppressedTransitionId:l})}
            ${ee({state:e,lang:n,team:c})}
            ${p}
        </div>
    `}const Re=8;function q(e){return`nw-controller-game:${e}`}function Ce(e){try{return sessionStorage.getItem(q(e))}catch{return null}}function z(e,n){try{n?sessionStorage.setItem(q(e),n):sessionStorage.removeItem(q(e))}catch{}}function Be({team:e,roleType:n}){return!e||e!=="resonant"&&e!=="dissonant"?null:n==="guide"||n==="walker"?ne(n,e):null}function Se(e,n,c){if(!e)return n.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${O(e.team,c)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const l=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[l].replace(`
`,"<br>")}function D(e,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${B(e).waitingGame}</p>`}
        ${n}
    </div>`}async function He(e){var V,K;const{roomId:n,token:c,team:l,roleType:p}=ve();if(e.innerHTML=D(W),!n||!c){e.innerHTML=`<div class="waiting-screen">
            <p>${B(W).scanQr}</p>
        </div>`;return}const{room:d,error:v}=await fe(n,c),u=(d==null?void 0:d.language)||W,f=B(u);if(!d||v){e.innerHTML=`<div class="waiting-screen">
            <p>${f.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}we(u);const o=me(n);await o.init();const i=se(n);let t=Be({team:l,roleType:p});const g=F(t);t&&await i.isRoleTaken(t)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${Se(g,f,u)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${f.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(a=>{var s;(s=document.getElementById("forceJoinBtn"))==null||s.addEventListener("click",a,{once:!0})})),t?i.join(t):i.listen(),await ce({presence:i,store:o,role:()=>t});let m=!1,k=new Set,$=null,h=Ce(n),y=!t,S=null,P=null,C=!0,T=0;function x(){T&&(cancelAnimationFrame(T),T=0)}de(e,()=>{var r;return(r=o.getState())==null?void 0:r.turnTransition},async()=>{var a;const r=(a=o.getState())==null?void 0:a.turnTransition;r!=null&&r.id&&($=r.id,L()),await o.dismissTurnTransition()});function b(){m=!1,k=new Set,$=null,S=null,P=null,C=!0,x()}async function E(r){t=r??null,t?await i.setRole(t):await i.setRole(null)}function J(r){const a=(r==null?void 0:r.gameId)??null;if(!a){h=null,z(n,null),y=!t;return}if(!t){y=!0;return}if(!h){h=a,z(n,a);return}a!==h&&!y&&(y=!0,b(),E(null).then(()=>L()))}function A(){return Te({language:o.getLanguage(),presenceState:i.getPresenceState(),currentPresenceRole:t})}function U(r,a){const s=_e(r.cells),w=C||!m||S!==s||P!==a;S=s,P=a,w&&(C=!1,x(),T=requestAnimationFrame(()=>{T=requestAnimationFrame(()=>{T=0,ge(e)})}))}function te(r,a,s,w){const R=ke(r.teamEffects)[s.team],_=Q(r.cells);e.innerHTML=be({state:r,lang:a,team:s.team,maxHintButtons:Re,teamEffects:R,suppressedTransitionId:$,controllerRolePickerHtml:w}),X({root:e,selector:".guide .grid .cell",currentRevealed:_,prevRevealed:k,hasRenderedBoard:m}),k=_,m=!0,U(r,"guide")}function re(r,a,s,w){const R=Q(r.cells);e.innerHTML=Le({state:r,lang:a,team:s.team,suppressedTransitionId:$,controllerRolePickerHtml:w}),X({root:e,selector:".walker .grid .cell",currentRevealed:R,prevRevealed:k,hasRenderedBoard:m}),k=R,m=!0,U(r,"walker")}function ie(r,a){document.body.classList.remove("team-resonant","team-dissonant"),b(),e.innerHTML=D(a,A())}function oe(r,a){J(r),(!r.turnTransition||r.turnTransition.id!==$)&&($=null);const s=F(t),w=y||!s;if(!s){ie(r,a);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${s.team}`);const R=w?A():"";if(s.roleType==="guide"){te(r,a,s,R);return}re(r,a,s,R)}function L({state:r,language:a}={}){const s=r??o.getState(),w=a??o.getLanguage();if(!s){b(),e.innerHTML=D(w,t?"":A());return}oe(s,w)}o.subscribe(L),i.onChange(()=>{(y||!t)&&L()}),ue(()=>{C=!0,L()}),(K=(V=document.fonts)==null?void 0:V.ready)==null||K.then(()=>{C=!0,L()}).catch(()=>{}),e.addEventListener("click",async r=>{const a=r.target.closest("[data-controller-role-picker] button[data-role-type][data-team]");if(a){const _=a.dataset.roleType,G=a.dataset.team,M=ne(_,G),N=i.getPresenceState(),I=o.getState();if(N[M]&&t!==M)return;y=!1,h=(I==null?void 0:I.gameId)??null,z(n,h),await E(M),L();return}const s=r.target.closest(".guide__num-btn:not([disabled])");if(s){await o.setGuideLimit(parseInt(s.dataset.limit,10));return}const w=r.target.closest(".cell--clickable");if(w){await o.reveal(parseInt(w.dataset.index,10));return}if(r.target.closest("#refreshBtn")){const _=o.getState(),G=F(t),M=G&&(_==null?void 0:_.turn.team)===G.team,N=(_==null?void 0:_.turn.guideLimit)!==null;!!(M&&N&&!(_!=null&&_.gameOver)&&!(_!=null&&_.turnTransition))&&await o.endTurn()}}),L()}export{He as initController};
