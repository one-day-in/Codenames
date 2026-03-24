import{C as j,r as Y,a as Z,m as le,e as ee,g as se,c as ce,p as F,d as de,i as ue,o as me,f as ge,n as ne,j as Q,k as X,q as _e,l as pe}from"./turnTransitionDismiss-D1fMc9dr.js";import{t as H,e as O,I as M,f as fe,h as ve,k as ke,D as W,n as ye}from"./roomRepository-DDSKDQUG.js";import"./entry-CUTrjLss.js";function $e(e){const n=H(e);let s=[];function l(){const i=Math.min(window.innerWidth,window.innerHeight),t=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&i<=768&&t<=1024}async function m(){var i;if(l())try{(i=screen.orientation)!=null&&i.lock&&await screen.orientation.lock("portrait")}catch{}}function d(){let i=document.getElementById("orientation-guard");return i||(i=document.createElement("div"),i.id="orientation-guard",i.className="orientation-guard",i.setAttribute("aria-live","polite"),i.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(i)),i}function g(){const i=d(),t=window.matchMedia("(orientation: landscape)").matches,f=l()&&t;i.classList.toggle("is-visible",f),document.body.classList.toggle("is-orientation-blocked",f)}const u=()=>{document.visibilityState==="visible"&&(m(),g())},v=()=>g(),o=()=>g();return m(),g(),document.addEventListener("visibilitychange",u),window.addEventListener("resize",v),window.addEventListener("orientationchange",o),s=[()=>document.removeEventListener("visibilitychange",u),()=>window.removeEventListener("resize",v),()=>window.removeEventListener("orientationchange",o)],()=>{s.forEach(i=>i())}}function we(e,n){return e==="guide"?n.guide:n.dreamwalker}function he(e,n){return e==="guide"?n.controllerGuideHint:n.controllerWalkerHint}function be(e){return e==="guide"?M.book:M.eye}function Te({language:e,presenceState:n,currentPresenceRole:s}){const l=H(e),m=j.filter(t=>n==null?void 0:n[t.presenceRole]).length,d=s===null&&m>0,g=d?l.newGame:l.controllerConnectEyebrow,u=d?l.controllerReconnectTitle:l.controllerConnectTitle,v=d?l.controllerReconnectText:l.controllerConnectText,o=["dissonant","resonant"];function i(t){const f=s===t.presenceRole,_=!!(n!=null&&n[t.presenceRole])&&!f,k=we(t.roleType,l),$=he(t.roleType,l),h=_?l.roleBusy:f?l.currentRole:l.chooseRoleAction,w=_?"controller-role-picker__state--busy":f?"controller-role-picker__state--current":"controller-role-picker__state--action";return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${t.team} controller-role-picker__btn--${t.roleType} ${f?"is-current":""}"
                type="button"
                data-role-type="${t.roleType}"
                data-team="${t.team}"
                ${_?"disabled":""}
            >
                <span class="controller-role-picker__icon" aria-hidden="true">${be(t.roleType)}</span>
                <span class="controller-role-picker__role">${k}</span>
                <span class="controller-role-picker__hint">${$}</span>
                <span class="controller-role-picker__state ${w}">${h}</span>
            </button>
        `}return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${d?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${g}</div>
                <h2 class="controller-role-picker__title">${u}</h2>
                <p class="controller-role-picker__text">${v}</p>
                <p class="controller-role-picker__summary">${m} / ${j.length} ${l.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${o.map(t=>{const f=O(t,e),_=j.filter(k=>k.team===t);return`
                            <section class="controller-role-picker__team-column controller-role-picker__team-column--${t}">
                                <h3 class="controller-role-picker__team-title">${f}</h3>
                                <div class="controller-role-picker__team-stack">
                                    ${_.map(i).join("")}
                                </div>
                            </section>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function te({mode:e,title:n,titleMuted:s=!1,metaHtml:l="",boardClassName:m="",boardHtml:d="",footerHtml:g="",overlayHtml:u=""}){return`
        <div class="screen-layout player-screen-layout ${e}-layout">
            <header class="screen-header">
                <div class="player-screen__header">
                    <div class="player-screen__title ${s?"player-screen__title--muted":"player-screen__title--active"}">${n}</div>
                    ${l}
                </div>
            </header>

            <main class="screen-body">
                <div class="${m}">
                    ${d}
                </div>
            </main>

            <footer class="screen-footer player-screen__footer ${e}__footer">
                ${g}
            </footer>
            ${u}
        </div>
    `}function Le({state:e,lang:n,team:s,maxHintButtons:l,teamEffects:m,suppressedTransitionId:d,controllerRolePickerHtml:g=""}){const u=H(n),v=e.turn,o=v.team===s,i=v.guideLimit!==null,t=o&&!i&&!e.gameOver&&!e.turnTransition,f=m.allowTwoWordClue,_=m.forcedGuideLimit,k=m.hideEnemyColors,$=m.hideNightmare,h=O(s,n),w=t?`${u.guide}: ${u.chooseLimit}`:`${u.guide}: ${M.eyeClosed}`,B=[t&&_===1?u.guideForcedOneMove:null,t&&f?u.guideTwoWordClue:null,k?u.guideBlurActive:null,$?u.guideNightmareHidden:null].filter(Boolean),P=B.length?`<div class="player__meta ${t?"player__meta--active":"player__meta--muted"}">${B.join(" • ")}</div>`:"",C=Array.from({length:l},(b,S)=>{const T=S+1;return`
            <button
                class="guide__num-btn ${v.guideLimit===T?"guide__num-btn--chosen":""}"
                data-limit="${T}"
                ${!t||_!==null&&T!==_?"disabled":""}
            >${T}</button>
        `}).join("");return te({mode:"guide",title:h,titleMuted:!t,metaHtml:`
            <div class="player__meta ${t?"player__meta--active":"player__meta--muted"}">${w}</div>
            ${P}
        `,boardClassName:`guide guide--${s}`,boardHtml:`
            <div class="grid grid--5">
                ${e.cells.map((b,S)=>`
                    <div class="${le(b,{team:s,effects:m})}" data-index="${S}">
                        <span class="cell__content">${ee(b.word)}</span>
                    </div>
                `).join("")}
            </div>
        `,footerHtml:`<div class="guide__btns ${t?"guide__btns--active":"guide__btns--muted"}">${C}</div>`,overlayHtml:`
            ${Y(e,n,{suppressedTransitionId:d})}
            ${Z({state:e,lang:n,team:s})}
            ${g}
        `})}function Re({state:e,lang:n,team:s,suppressedTransitionId:l,controllerRolePickerHtml:m=""}){const d=H(n),g=e.turn,u=g.team===s,v=g.guideLimit!==null,o=u&&v&&!e.gameOver&&!e.turnTransition,i=v?Math.max((g.guideLimit??0)-(g.dreamwalkerMoves??0),0):0,t=O(s,n),f=o?`${d.dreamwalker}: <span class="walker__moves-value">${fe(i,n)}</span>`:`${d.dreamwalker}: ${M.eyeClosed}`;return te({mode:"walker",title:t,titleMuted:!o,metaHtml:`<div class="${o?"player__meta player__meta--active":"player__meta player__meta--muted"}">${f}</div>`,boardClassName:`walker walker--${s}`,boardHtml:`
            <div class="grid grid--5">
                ${e.cells.map((k,$)=>`
                    <div
                        class="${se(k)} ${o&&!k.revealed?"cell--clickable":""}"
                        data-index="${$}"
                    >
                        <span class="cell__content">${ee(k.word)}</span>
                    </div>
                `).join("")}
            </div>
        `,footerHtml:`
            <div class="walker__actions">
                <button class="walker__action-btn walker__refresh-btn ${o?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${d.endTurn}" ${o?"":"disabled"}>
                    <span class="walker__action-label">${d.endTurn}</span>
                    <span class="walker__action-icon">${M.x}</span>
                </button>
            </div>
        `,overlayHtml:`
            ${Y(e,n,{suppressedTransitionId:l})}
            ${Z({state:e,lang:n,team:s})}
            ${m}
        `})}const Ce=8;function q(e){return`nw-controller-game:${e}`}function He(e){try{return sessionStorage.getItem(q(e))}catch{return null}}function z(e,n){try{n?sessionStorage.setItem(q(e),n):sessionStorage.removeItem(q(e))}catch{}}function Be({team:e,roleType:n}){return!e||e!=="resonant"&&e!=="dissonant"?null:n==="guide"||n==="walker"?ne(n,e):null}function Se(e,n,s){if(!e)return n.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${O(e.team,s)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const l=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[l].replace(`
`,"<br>")}function D(e,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${H(e).waitingGame}</p>`}
        ${n}
    </div>`}async function Ge(e){var V,K;const{roomId:n,token:s,team:l,roleType:m}=ve();if(e.innerHTML=D(W),!n||!s){e.innerHTML=`<div class="waiting-screen">
            <p>${H(W).scanQr}</p>
        </div>`;return}const{room:d,error:g}=await ke(n,s),u=(d==null?void 0:d.language)||W,v=H(u);if(!d||g){e.innerHTML=`<div class="waiting-screen">
            <p>${v.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}$e(u);const o=ge(n);await o.init();const i=ce(n);let t=Be({team:l,roleType:m});const f=F(t);t&&await i.isRoleTaken(t)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${Se(f,v,u)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${v.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(a=>{var c;(c=document.getElementById("forceJoinBtn"))==null||c.addEventListener("click",a,{once:!0})})),t?i.join(t):i.listen(),await de({presence:i,store:o,role:()=>t});let _=!1,k=new Set,$=null,h=He(n),w=!t,B=null,P=null,C=!0,b=0;function S(){b&&(cancelAnimationFrame(b),b=0)}ue(e,()=>{var r;return(r=o.getState())==null?void 0:r.turnTransition},async()=>{var a;const r=(a=o.getState())==null?void 0:a.turnTransition;r!=null&&r.id&&($=r.id,L()),await o.dismissTurnTransition()});function T(){_=!1,k=new Set,$=null,B=null,P=null,C=!0,S()}async function E(r){t=r??null,t?await i.setRole(t):await i.setRole(null)}function J(r){const a=(r==null?void 0:r.gameId)??null;if(!a){h=null,z(n,null),w=!t;return}if(!t){w=!0;return}if(!h){h=a,z(n,a);return}a!==h&&!w&&(w=!0,T(),E(null).then(()=>L()))}function A(){return Te({language:o.getLanguage(),presenceState:i.getPresenceState(),currentPresenceRole:t})}function U(r,a){const c=_e(r.cells),y=C||!_||B!==c||P!==a;B=c,P=a,y&&(C=!1,S(),b=requestAnimationFrame(()=>{b=requestAnimationFrame(()=>{b=0,pe(e)})}))}function re(r,a,c,y){const R=ye(r.teamEffects)[c.team],p=Q(r.cells);e.innerHTML=Le({state:r,lang:a,team:c.team,maxHintButtons:Ce,teamEffects:R,suppressedTransitionId:$,controllerRolePickerHtml:y}),X({root:e,selector:".guide .grid .cell",currentRevealed:p,prevRevealed:k,hasRenderedBoard:_}),k=p,_=!0,U(r,"guide")}function ie(r,a,c,y){const R=Q(r.cells);e.innerHTML=Re({state:r,lang:a,team:c.team,suppressedTransitionId:$,controllerRolePickerHtml:y}),X({root:e,selector:".walker .grid .cell",currentRevealed:R,prevRevealed:k,hasRenderedBoard:_}),k=R,_=!0,U(r,"walker")}function oe(r,a){document.body.classList.remove("team-resonant","team-dissonant"),T(),e.innerHTML=D(a,A())}function ae(r,a){J(r),(!r.turnTransition||r.turnTransition.id!==$)&&($=null);const c=F(t),y=w||!c;if(!c){oe(r,a);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${c.team}`);const R=y?A():"";if(c.roleType==="guide"){re(r,a,c,R);return}ie(r,a,c,R)}function L({state:r,language:a}={}){const c=r??o.getState(),y=a??o.getLanguage();if(!c){T(),e.innerHTML=D(y,t?"":A());return}ae(c,y)}o.subscribe(L),i.onChange(()=>{(w||!t)&&L()}),me(()=>{C=!0,L()}),(K=(V=document.fonts)==null?void 0:V.ready)==null||K.then(()=>{C=!0,L()}).catch(()=>{}),e.addEventListener("click",async r=>{const a=r.target.closest("[data-controller-role-picker] button[data-role-type][data-team]");if(a){const p=a.dataset.roleType,G=a.dataset.team,x=ne(p,G),N=i.getPresenceState(),I=o.getState();if(N[x]&&t!==x)return;w=!1,h=(I==null?void 0:I.gameId)??null,z(n,h),await E(x),L();return}const c=r.target.closest(".guide__num-btn:not([disabled])");if(c){await o.setGuideLimit(parseInt(c.dataset.limit,10));return}const y=r.target.closest(".cell--clickable");if(y){await o.reveal(parseInt(y.dataset.index,10));return}if(r.target.closest("#refreshBtn")){const p=o.getState(),G=F(t),x=G&&(p==null?void 0:p.turn.team)===G.team,N=(p==null?void 0:p.turn.guideLimit)!==null;!!(x&&N&&!(p!=null&&p.gameOver)&&!(p!=null&&p.turnTransition))&&await o.endTurn()}}),L()}export{Ge as initController};
