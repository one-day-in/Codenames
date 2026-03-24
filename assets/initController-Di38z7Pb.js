import{C as F,r as ee,a as ne,m as ce,e as te,g as de,c as ue,p as W,d as me,i as ge,o as _e,f as pe,n as re,j as Y,k as Z,q as fe,l as ve}from"./turnTransitionDismiss-BTuT9RxI.js";import{t as H,e as O,I as M,f as ke,h as ye,k as $e,D,n as we}from"./roomRepository-BzPr1MxX.js";import"./entry-DmbfYHEX.js";function he(e){const n=H(e);let c=[];function a(){const i=Math.min(window.innerWidth,window.innerHeight),t=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&i<=768&&t<=1024}async function g(){var i;if(a())try{(i=screen.orientation)!=null&&i.lock&&await screen.orientation.lock("portrait")}catch{}}function d(){let i=document.getElementById("orientation-guard");return i||(i=document.createElement("div"),i.id="orientation-guard",i.className="orientation-guard",i.setAttribute("aria-live","polite"),i.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(i)),i}function _(){const i=d(),t=window.matchMedia("(orientation: landscape)").matches,f=a()&&t;i.classList.toggle("is-visible",f),document.body.classList.toggle("is-orientation-blocked",f)}const u=()=>{document.visibilityState==="visible"&&(g(),_())},v=()=>_(),o=()=>_();return g(),_(),document.addEventListener("visibilitychange",u),window.addEventListener("resize",v),window.addEventListener("orientationchange",o),c=[()=>document.removeEventListener("visibilitychange",u),()=>window.removeEventListener("resize",v),()=>window.removeEventListener("orientationchange",o)],()=>{c.forEach(i=>i())}}function Te(e,n){return e==="guide"?n.guide:n.dreamwalker}function be(e,n){return e==="guide"?n.controllerGuideHint:n.controllerWalkerHint}function Le(e){return e==="guide"?M.book:M.eye}function Re({language:e,presenceState:n,currentPresenceRole:c}){const a=H(e),g=F.filter(t=>n==null?void 0:n[t.presenceRole]).length,d=c===null&&g>0,_=d?a.newGame:a.controllerConnectEyebrow,u=d?a.controllerReconnectTitle:a.controllerConnectTitle,v=d?a.controllerReconnectText:a.controllerConnectText,o=["dissonant","resonant"];function i(t){const f=c===t.presenceRole,p=!!(n!=null&&n[t.presenceRole])&&!f,k=Te(t.roleType,a),y=be(t.roleType,a),h=p?a.roleBusy:f?a.currentRole:a.chooseRoleAction,w=p?"controller-role-picker__state--busy":f?"controller-role-picker__state--current":"controller-role-picker__state--action";return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${t.team} controller-role-picker__btn--${t.roleType} ${f?"is-current":""}"
                type="button"
                data-role-type="${t.roleType}"
                data-team="${t.team}"
                ${p?"disabled":""}
            >
                <span class="controller-role-picker__icon" aria-hidden="true">${Le(t.roleType)}</span>
                <span class="controller-role-picker__role">${k}</span>
                <span class="controller-role-picker__hint">${y}</span>
                <span class="controller-role-picker__state ${w}">${h}</span>
            </button>
        `}return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${d?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${_}</div>
                <h2 class="controller-role-picker__title">${u}</h2>
                <p class="controller-role-picker__text">${v}</p>
                <p class="controller-role-picker__summary">${g} / ${F.length} ${a.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${o.map(t=>{const f=O(t,e),p=F.filter(k=>k.team===t);return`
                            <section class="controller-role-picker__team-column controller-role-picker__team-column--${t}">
                                <h3 class="controller-role-picker__team-title">${f}</h3>
                                <div class="controller-role-picker__team-stack">
                                    ${p.map(i).join("")}
                                </div>
                            </section>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function ie({mode:e,title:n,titleMuted:c=!1,metaHtml:a="",boardClassName:g="",boardHtml:d="",footerHtml:_="",overlayHtml:u=""}){return`
        <div class="screen-layout player-screen-layout ${e}-layout">
            <header class="screen-header">
                <div class="player-screen__header">
                    <div class="player-screen__title ${c?"player-screen__title--muted":"player-screen__title--active"}">${n}</div>
                    ${a}
                </div>
            </header>

            <main class="screen-body">
                <div class="${g}">
                    ${d}
                </div>
            </main>

            <footer class="screen-footer player-screen__footer ${e}__footer">
                ${_}
            </footer>
            ${u}
        </div>
    `}function Ce({state:e,lang:n,team:c,maxHintButtons:a,teamEffects:g,suppressedTransitionId:d,controllerRolePickerHtml:_=""}){const u=H(n),v=e.turn,o=v.team===c,i=v.guideLimit!==null,t=o&&!i&&!e.gameOver&&!e.turnTransition,f=g.allowTwoWordClue,p=g.forcedGuideLimit,k=g.hideEnemyColors,y=g.hideNightmare,h=O(c,n),w=t?`${u.guide}: ${u.chooseLimit}`:`${u.guide}: ${M.eyeClosed}`,B=[t&&p===1?u.guideForcedOneMove:null,t&&f?u.guideTwoWordClue:null,k?u.guideBlurActive:null,y?u.guideNightmareHidden:null].filter(Boolean),P=B.length?`<div class="player__meta ${t?"player__meta--active":"player__meta--muted"}">${B.join(" • ")}</div>`:"",C=Array.from({length:a},(T,S)=>{const R=S+1;return`
            <button
                class="guide__num-btn ${v.guideLimit===R?"guide__num-btn--chosen":""}"
                data-limit="${R}"
                ${!t||p!==null&&R!==p?"disabled":""}
            >${R}</button>
        `}).join("");return ie({mode:"guide",title:h,titleMuted:!t,metaHtml:`
            <div class="player__meta ${t?"player__meta--active":"player__meta--muted"}">${w}</div>
            ${P}
        `,boardClassName:`guide guide--${c}`,boardHtml:`
            <div class="grid grid--5">
                ${e.cells.map((T,S)=>`
                    <div class="${ce(T,{team:c,effects:g})}" data-index="${S}">
                        <span class="cell__content">${te(T.word)}</span>
                    </div>
                `).join("")}
            </div>
        `,footerHtml:`<div class="guide__btns ${t?"guide__btns--active":"guide__btns--muted"}">${C}</div>`,overlayHtml:`
            ${ee(e,n,{suppressedTransitionId:d})}
            ${ne({state:e,lang:n,team:c})}
            ${_}
        `})}function He({state:e,lang:n,team:c,suppressedTransitionId:a,controllerRolePickerHtml:g=""}){const d=H(n),_=e.turn,u=_.team===c,v=_.guideLimit!==null,o=u&&v&&!e.gameOver&&!e.turnTransition,i=v?Math.max((_.guideLimit??0)-(_.dreamwalkerMoves??0),0):0,t=O(c,n),f=o?`${d.dreamwalker}: <span class="walker__moves-value">${ke(i,n)}</span>`:`${d.dreamwalker}: ${M.eyeClosed}`;return ie({mode:"walker",title:t,titleMuted:!o,metaHtml:`<div class="${o?"player__meta player__meta--active":"player__meta player__meta--muted"}">${f}</div>`,boardClassName:`walker walker--${c}`,boardHtml:`
            <div class="grid grid--5">
                ${e.cells.map((k,y)=>`
                    <div
                        class="${de(k)} ${o&&!k.revealed?"cell--clickable":""}"
                        data-index="${y}"
                    >
                        <span class="cell__content">${te(k.word)}</span>
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
            ${ee(e,n,{suppressedTransitionId:a})}
            ${ne({state:e,lang:n,team:c})}
            ${g}
        `})}const Be=8;function J(e){return`nw-controller-game:${e}`}function Se(e){try{return sessionStorage.getItem(J(e))}catch{return null}}function z(e,n){try{n?sessionStorage.setItem(J(e),n):sessionStorage.removeItem(J(e))}catch{}}function Pe({team:e,roleType:n}){return!e||e!=="resonant"&&e!=="dissonant"?null:n==="guide"||n==="walker"?re(n,e):null}function xe(e,n,c){if(!e)return n.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${O(e.team,c)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const a=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[a].replace(`
`,"<br>")}function q(e,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${H(e).waitingGame}</p>`}
        ${n}
    </div>`}async function Oe(e){var K,Q;const{roomId:n,token:c,team:a,roleType:g}=ye();if(e.innerHTML=q(D),!n||!c){e.innerHTML=`<div class="waiting-screen">
            <p>${H(D).scanQr}</p>
        </div>`;return}const{room:d,error:_}=await $e(n,c),u=(d==null?void 0:d.language)||D,v=H(u);if(!d||_){e.innerHTML=`<div class="waiting-screen">
            <p>${v.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}he(u);const o=pe(n);await o.init();const i=ue(n);let t=Pe({team:a,roleType:g});const f=W(t);t&&await i.isRoleTaken(t)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${xe(f,v,u)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${v.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(l=>{var s;(s=document.getElementById("forceJoinBtn"))==null||s.addEventListener("click",l,{once:!0})})),t?i.join(t):i.listen(),await me({presence:i,store:o,role:()=>t});let p=!1,k=new Set,y=null,h=Se(n),w=!t,B=null,P=null,C=!0,T=0;function S(){T&&(cancelAnimationFrame(T),T=0)}ge(e,()=>{var r;return(r=o.getState())==null?void 0:r.turnTransition},async()=>{var l;const r=(l=o.getState())==null?void 0:l.turnTransition;r!=null&&r.id&&(y=r.id,L()),await o.forceCompleteTurnTransition()});function R(){p=!1,k=new Set,y=null,B=null,P=null,C=!0,S()}async function E(r){t=r??null,t?await i.setRole(t):await i.setRole(null)}function U(r){const l=(r==null?void 0:r.gameId)??null;if(!l){h=null,z(n,null),w=!t;return}if(!t){w=!0;return}if(!h){h=l,z(n,l);return}l!==h&&!w&&(w=!0,R(),E(null).then(()=>L()))}function A(){return Re({language:o.getLanguage(),presenceState:i.getPresenceState(),currentPresenceRole:t})}function V(r,l){const s=fe(r.cells),$=C||!p||B!==s||P!==l;B=s,P=l,$&&(C=!1,S(),T=requestAnimationFrame(()=>{T=requestAnimationFrame(()=>{T=0,ve(e)})}))}function oe(r,l,s,$){const b=we(r.teamEffects)[s.team],N=Y(r.cells);e.innerHTML=Ce({state:r,lang:l,team:s.team,maxHintButtons:Be,teamEffects:b,suppressedTransitionId:y,controllerRolePickerHtml:$}),Z({root:e,selector:".guide .grid .cell",currentRevealed:N,prevRevealed:k,hasRenderedBoard:p}),k=N,p=!0,V(r,"guide")}function ae(r,l,s,$){const b=Y(r.cells);e.innerHTML=He({state:r,lang:l,team:s.team,suppressedTransitionId:y,controllerRolePickerHtml:$}),Z({root:e,selector:".walker .grid .cell",currentRevealed:b,prevRevealed:k,hasRenderedBoard:p}),k=b,p=!0,V(r,"walker")}function le(r,l){document.body.classList.remove("team-resonant","team-dissonant"),R(),e.innerHTML=q(l,A())}function se(r,l){U(r),(!r.turnTransition||r.turnTransition.id!==y)&&(y=null);const s=W(t),$=w||!s;if(!s){le(r,l);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${s.team}`);const b=$?A():"";if(s.roleType==="guide"){oe(r,l,s,b);return}ae(r,l,s,b)}function L({state:r,language:l}={}){const s=r??o.getState(),$=l??o.getLanguage();if(!s){R(),e.innerHTML=q($,t?"":A());return}se(s,$)}o.subscribe(L),i.onChange(()=>{(w||!t)&&L()}),_e(()=>{C=!0,L()}),(Q=(K=document.fonts)==null?void 0:K.ready)==null||Q.then(()=>{C=!0,L()}).catch(()=>{}),e.addEventListener("click",async r=>{var X;if(r.target.closest("[data-transition-dismiss]")){const m=(X=o.getState())==null?void 0:X.turnTransition;m!=null&&m.id&&(y=m.id,L()),await o.forceCompleteTurnTransition();return}const s=r.target.closest("[data-controller-role-picker] button[data-role-type][data-team]");if(s){const m=s.dataset.roleType,G=s.dataset.team,x=re(m,G),j=i.getPresenceState(),I=o.getState();if(j[x]&&t!==x)return;w=!1,h=(I==null?void 0:I.gameId)??null,z(n,h),await E(x),L();return}const $=r.target.closest(".guide__num-btn:not([disabled])");if($){await o.setGuideLimit(parseInt($.dataset.limit,10));return}const b=r.target.closest(".cell--clickable");if(b){await o.reveal(parseInt(b.dataset.index,10));return}if(r.target.closest("#refreshBtn")){const m=o.getState(),G=W(t),x=G&&(m==null?void 0:m.turn.team)===G.team,j=(m==null?void 0:m.turn.guideLimit)!==null;!!(x&&j&&!(m!=null&&m.gameOver)&&!(m!=null&&m.turnTransition))&&await o.endTurn()}}),L()}export{Oe as initController};
