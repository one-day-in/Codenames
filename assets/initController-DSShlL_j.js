import{C as U,r as de,a as ue,m as xe,e as me,g as Ee,c as Ge,p as I,d as Oe,i as Ie,o as Me,f as Ne,n as fe,l as Ae,j as K,k as ae,q as se}from"./turnTransitionDismiss-BKYlVpEC.js";import{t as P,e as F,I as M,f as We,h as je,k as Fe,D as Q,m as qe,n as X,o as ze}from"./roomRepository-DP2sOvJL.js";import"./entry-BX8jnVgr.js";function De(t){const n=P(t);let u=[];function s(){const a=Math.min(window.innerWidth,window.innerHeight),l=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&a<=768&&l<=1024}async function g(){var a;if(s())try{(a=screen.orientation)!=null&&a.lock&&await screen.orientation.lock("portrait")}catch{}}function c(){let a=document.getElementById("orientation-guard");return a||(a=document.createElement("div"),a.id="orientation-guard",a.className="orientation-guard",a.setAttribute("aria-live","polite"),a.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(a)),a}function p(){const a=c(),l=window.matchMedia("(orientation: landscape)").matches,v=s()&&l;a.classList.toggle("is-visible",v),document.body.classList.toggle("is-orientation-blocked",v)}const f=()=>{document.visibilityState==="visible"&&(g(),p())},k=()=>p(),o=()=>p();return g(),p(),document.addEventListener("visibilitychange",f),window.addEventListener("resize",k),window.addEventListener("orientationchange",o),u=[()=>document.removeEventListener("visibilitychange",f),()=>window.removeEventListener("resize",k),()=>window.removeEventListener("orientationchange",o)],()=>{u.forEach(a=>a())}}function Ve(t,n){return t==="guide"?n.guide:n.dreamwalker}function Je(t,n){return t==="guide"?n.controllerGuideHint:n.controllerWalkerHint}function Ue(t){return t==="guide"?M.book:M.eye}function Ke({language:t,presenceState:n,currentPresenceRole:u}){const s=P(t),g=U.filter(l=>n==null?void 0:n[l.presenceRole]).length,c=u===null&&g>0,p=c?s.newGame:s.controllerConnectEyebrow,f=c?s.controllerReconnectTitle:s.controllerConnectTitle,k=c?s.controllerReconnectText:s.controllerConnectText,o=["dissonant","resonant"];function a(l){const v=u===l.presenceRole,y=!!(n!=null&&n[l.presenceRole])&&!v,w=Ve(l.roleType,s),h=Je(l.roleType,s),T=y?s.roleBusy:v?s.currentRole:s.chooseRoleAction,b=y?"controller-role-picker__state--busy":v?"controller-role-picker__state--current":"controller-role-picker__state--action";return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${l.team} controller-role-picker__btn--${l.roleType} ${v?"is-current":""}"
                type="button"
                data-role-type="${l.roleType}"
                data-team="${l.team}"
                ${y?"disabled":""}
            >
                <span class="controller-role-picker__icon" aria-hidden="true">${Ue(l.roleType)}</span>
                <span class="controller-role-picker__role">${w}</span>
                <span class="controller-role-picker__hint">${h}</span>
                <span class="controller-role-picker__state ${b}">${T}</span>
            </button>
        `}return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${c?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${p}</div>
                <h2 class="controller-role-picker__title">${f}</h2>
                <p class="controller-role-picker__text">${k}</p>
                <p class="controller-role-picker__summary">${g} / ${U.length} ${s.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${o.map(l=>{const v=F(l,t),y=U.filter(w=>w.team===l);return`
                            <section class="controller-role-picker__team-column controller-role-picker__team-column--${l}">
                                <h3 class="controller-role-picker__team-title">${v}</h3>
                                <div class="controller-role-picker__team-stack">
                                    ${y.map(a).join("")}
                                </div>
                            </section>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function ge({mode:t,title:n,titleMuted:u=!1,metaHtml:s="",boardClassName:g="",boardHtml:c="",footerHtml:p="",overlayHtml:f=""}){return`
        <div class="screen-layout screen-layout--fit-pending player-screen-layout ${t}-layout">
            <header class="screen-header">
                <div class="player-screen__header">
                    <div class="player-screen__title ${u?"player-screen__title--muted":"player-screen__title--active"}">${n}</div>
                    <div class="player-screen__meta-wrap">${s}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="screen-board player-screen__board ${g}">
                    ${c}
                </div>
            </main>

            <footer class="screen-footer player-screen__footer ${t}__footer">
                <div class="player-screen__footer-content">${p}</div>
            </footer>
            ${f}
        </div>
    `}function pe({state:t,lang:n,team:u,maxHintButtons:s,teamEffects:g}){const c=P(n),p=t.turn,f=p.team===u,k=p.guideLimit!==null,o=f&&!k&&!t.gameOver&&!t.turnTransition,a=g.allowTwoWordClue,l=g.forcedGuideLimit,v=g.hideEnemyColors,y=g.hideNightmare,w=F(u,n),h=o?`${c.guide}: ${c.chooseLimit}`:`${c.guide}: ${M.eyeClosed}`,T=[o&&l===1?c.guideForcedOneMove:null,o&&a?c.guideTwoWordClue:null,v?c.guideBlurActive:null,y?c.guideNightmareHidden:null].filter(Boolean),b=T.length?`<div class="player__meta ${o?"player__meta--active":"player__meta--muted"}">${T.join(" • ")}</div>`:"",B=Array.from({length:s},(H,C)=>{const S=C+1;return`
            <button
                class="guide__num-btn ${p.guideLimit===S?"guide__num-btn--chosen":""}"
                data-limit="${S}"
                ${!o||l!==null&&S!==l?"disabled":""}
            >${S}</button>
        `}).join("");return{teamTitle:w,titleMuted:!o,metaHtml:`
            <div class="player__meta ${o?"player__meta--active":"player__meta--muted"}">${h}</div>
            ${b}
        `,boardHtml:`
            <div class="grid grid--5">
                ${t.cells.map((H,C)=>`
                    <div class="${xe(H,{team:u,effects:g})}" data-index="${C}">
                        <span class="cell__content">${me(H.word)}</span>
                    </div>
                `).join("")}
            </div>
        `,footerHtml:`<div class="guide__btns ${o?"guide__btns--active":"guide__btns--muted"}">${B}</div>`}}function Qe({state:t,lang:n,team:u,maxHintButtons:s,teamEffects:g,suppressedTransitionId:c,controllerRolePickerHtml:p=""}){const f=pe({state:t,lang:n,team:u,maxHintButtons:s,teamEffects:g});return ge({mode:"guide",title:f.teamTitle,titleMuted:f.titleMuted,metaHtml:f.metaHtml,boardClassName:`guide guide--${u}`,boardHtml:f.boardHtml,footerHtml:f.footerHtml,overlayHtml:`
            ${de(t,n,{suppressedTransitionId:c})}
            ${ue({state:t,lang:n,team:u})}
            ${p}
        `})}function _e({state:t,lang:n,team:u}){const s=P(n),g=t.turn,c=g.team===u,p=g.guideLimit!==null,f=c&&p&&!t.gameOver&&!t.turnTransition,k=p?Math.max((g.guideLimit??0)-(g.dreamwalkerMoves??0),0):0,o=F(u,n),a=f?`${s.dreamwalker}: <span class="walker__moves-value">${We(k,n)}</span>`:`${s.dreamwalker}: ${M.eyeClosed}`;return{teamTitle:o,titleMuted:!f,metaHtml:`<div class="${f?"player__meta player__meta--active":"player__meta player__meta--muted"}">${a}</div>`,boardHtml:`
            <div class="grid grid--5">
                ${t.cells.map((v,y)=>`
                    <div
                        class="${Ee(v)} ${f&&!v.revealed?"cell--clickable":""}"
                        data-index="${y}"
                    >
                        <span class="cell__content">${me(v.word)}</span>
                    </div>
                `).join("")}
            </div>
        `,footerHtml:`
            <div class="walker__actions">
                <button class="walker__action-btn walker__refresh-btn ${f?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${s.endTurn}" ${f?"":"disabled"}>
                    <span class="walker__action-label">${s.endTurn}</span>
                    <span class="walker__action-icon">${M.x}</span>
                </button>
            </div>
        `,canPlay:f}}function Xe({state:t,lang:n,team:u,suppressedTransitionId:s,controllerRolePickerHtml:g=""}){const c=_e({state:t,lang:n,team:u});return ge({mode:"walker",title:c.teamTitle,titleMuted:c.titleMuted,metaHtml:c.metaHtml,boardClassName:`walker walker--${u}`,boardHtml:c.boardHtml,footerHtml:c.footerHtml,overlayHtml:`
            ${de(t,n,{suppressedTransitionId:s})}
            ${ue({state:t,lang:n,team:u})}
            ${g}
        `})}const ce=8;function ee(t){return`nw-controller-game:${t}`}function Ye(t){try{return sessionStorage.getItem(ee(t))}catch{return null}}function Y(t,n){try{n?sessionStorage.setItem(ee(t),n):sessionStorage.removeItem(ee(t))}catch{}}function Ze({team:t,roleType:n}){return!t||t!=="resonant"&&t!=="dissonant"?null:n==="guide"||n==="walker"?fe(n,t):null}function et(t,n,u){if(!t)return n.controllerTaken.replace(`
`,"<br>");if(t.roleType==="walker")return`${F(t.team,u)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const s=t.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[s].replace(`
`,"<br>")}function Z(t,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${P(t).waitingGame}</p>`}
        ${n}
    </div>`}async function it(t){var le,oe;const{roomId:n,token:u,team:s,roleType:g}=je();if(t.innerHTML=Z(Q),!n||!u){t.innerHTML=`<div class="waiting-screen">
            <p>${P(Q).scanQr}</p>
        </div>`;return}const{room:c,error:p}=await Fe(n,u),f=(c==null?void 0:c.language)||Q,k=P(f);if(!c||p){t.innerHTML=`<div class="waiting-screen">
            <p>${k.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}De(f);const o=Ne(n);await o.init();const a=Ge(n);let l=Ze({team:s,roleType:g});const v=I(l);l&&await a.isRoleTaken(l)&&(t.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${et(v,k,f)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${k.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(i=>{var r;(r=document.getElementById("forceJoinBtn"))==null||r.addEventListener("click",i,{once:!0})})),l?a.join(l):a.listen(),await Oe({presence:a,store:o,role:()=>l});let y=!1,w=new Set,h=null,T=Ye(n),b=!l,B=null,H=null,C=null,S=null,N=null,E=null,q=null,x=!0,A=!1;const G=Ae({root:t,getGrid:()=>t.querySelector(".grid"),onFitEnd:()=>{te()}});function ve(){return t.querySelector(".grid")}function ye(){A||(A=!0,qe())}function te(){A&&(A=!1,ze())}function ke(){const e=ve();return e?`${e.clientWidth}x${e.clientHeight}`:null}function ne(){G.observeGrid(()=>{x=!0,V(o.getState(),E)})}Ie(t,()=>{var e;return(e=o.getState())==null?void 0:e.turnTransition},async()=>{var i;const e=(i=o.getState())==null?void 0:i.turnTransition;e!=null&&e.id&&(h=e.id,R()),await o.forceCompleteTurnTransition()});function z(){y=!1,w=new Set,h=null,B=null,H=null,C=null,S=null,N=null,E=null,q=null,x=!0,G.reset()}async function re(e){l=e??null,l?await a.setRole(l):await a.setRole(null)}function $e(e){const i=(e==null?void 0:e.gameId)??null;if(!i){T=null,Y(n,null),b=!l;return}if(!l){b=!0;return}if(!T){T=i,Y(n,i);return}i!==T&&!b&&(b=!0,z(),re(null).then(()=>R()))}function D(){return Ke({language:o.getLanguage(),presenceState:a.getPresenceState(),currentPresenceRole:l})}function we(e=[]){return Array.from(K(e)).sort((i,r)=>i-r).join(",")}function he(e,i){return JSON.stringify(X(e)[i])}function ie(e,i){const r=[se(e.cells),we(e.cells)].join("|");return(i==null?void 0:i.roleType)==="guide"?`${r}|${he(e.teamEffects,i.team)}`:r}function Te(e,i,r,d){const m=r==null?void 0:r.roleType;return m!=="guide"&&m!=="walker"||d||e.turnTransition||e.gameOver||C!==m||S!==r.team||H!==i||!B||!t.querySelector(`.${m}-layout`)?!1:ie(B,r)===ie(e,r)}function be(e,i,r){const d=t.querySelectorAll(".walker .grid .cell");return d.length!==e.cells.length?!1:(e.cells.forEach((m,$)=>{const L=d[$];L&&(L.className=`${L.className.replace(/\s?cell--clickable/g,"")}${r&&!m.revealed?" cell--clickable":""}`,L.dataset.index=String($))}),!0)}function Le(e,i,r){return(r==null?void 0:r.roleType)==="guide"?pe({state:e,lang:i,team:r.team,maxHintButtons:ce,teamEffects:X(e.teamEffects)[r.team]}):_e({state:e,lang:i,team:r.team})}function Se(e,i,r){return(i==null?void 0:i.roleType)==="walker"?be(e,i,r.canPlay):!0}function Re(e,i,r){const d=Le(e,i,r),m=t.querySelector(".player-screen__title"),$=t.querySelector(".player-screen__meta-wrap"),L=t.querySelector(".player-screen__footer-content");return!m||!$||!L||(m.textContent=d.teamTitle,m.classList.toggle("player-screen__title--muted",d.titleMuted),m.classList.toggle("player-screen__title--active",!d.titleMuted),$.innerHTML=d.metaHtml,L.innerHTML=d.footerHtml,!Se(e,r,d))?!1:(B=e,H=i,C=r.roleType,S=r.team,!0)}function V(e,i){if(!e||!i)return;const r=se(e.cells),d=ke(),m=x||!y||N!==r||E!==i||q!==d;N=r,E=i,q=d,m&&(x=!1,G.scheduleFit())}function He(e,i,r,d){const m=X(e.teamEffects)[r.team],$=K(e.cells);t.innerHTML=Qe({state:e,lang:i,team:r.team,maxHintButtons:ce,teamEffects:m,suppressedTransitionId:h,controllerRolePickerHtml:d}),G.markPending(),ae({root:t,selector:".guide .grid .cell",currentRevealed:$,prevRevealed:w,hasRenderedBoard:y}),w=$,y=!0,ne(),V(e,"guide")}function Ce(e,i,r,d){const m=K(e.cells);t.innerHTML=Xe({state:e,lang:i,team:r.team,suppressedTransitionId:h,controllerRolePickerHtml:d}),G.markPending(),ae({root:t,selector:".walker .grid .cell",currentRevealed:m,prevRevealed:w,hasRenderedBoard:y}),w=m,y=!0,ne(),V(e,"walker")}function Be(e,i){document.body.classList.remove("team-resonant","team-dissonant"),z(),te(),t.innerHTML=Z(i,D())}function Pe(e,i){$e(e),(!e.turnTransition||e.turnTransition.id!==h)&&(h=null);const r=I(l),d=b||!r;if(!r){Be(e,i);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${r.team}`);const m=d?D():"";if(!(Te(e,i,r,d)&&Re(e,i,r))){if(r.roleType==="guide"){He(e,i,r,m);return}Ce(e,i,r,m)}}function R({state:e,language:i}={}){var m,$;const r=e??o.getState(),d=i??o.getLanguage();if(!r){z(),t.innerHTML=Z(d,l?"":D());return}Pe(r,d),B=r,H=d,C=((m=I(l))==null?void 0:m.roleType)??null,S=(($=I(l))==null?void 0:$.team)??null}o.subscribe(R),a.onChange(()=>{(b||!l)&&R()}),Me(()=>{x=!0,R()}),(oe=(le=document.fonts)==null?void 0:le.ready)==null||oe.then(()=>{x=!0,R()}).catch(()=>{}),t.addEventListener("click",async e=>{var L;if(e.target.closest("[data-transition-dismiss]")){const _=(L=o.getState())==null?void 0:L.turnTransition;_!=null&&_.id&&(h=_.id,R()),await o.forceCompleteTurnTransition();return}const r=e.target.closest("[data-controller-role-picker] button[data-role-type][data-team]");if(r){const _=r.dataset.roleType,W=r.dataset.team,O=fe(_,W),J=a.getPresenceState(),j=o.getState();if(J[O]&&l!==O)return;b=!1,ye(),T=(j==null?void 0:j.gameId)??null,Y(n,T),await re(O),R();return}const d=e.target.closest(".guide__num-btn:not([disabled])");if(d){await o.setGuideLimit(parseInt(d.dataset.limit,10));return}const m=e.target.closest(".cell--clickable");if(m){await o.reveal(parseInt(m.dataset.index,10));return}if(e.target.closest("#refreshBtn")){const _=o.getState(),W=I(l),O=W&&(_==null?void 0:_.turn.team)===W.team,J=(_==null?void 0:_.turn.guideLimit)!==null;!!(O&&J&&!(_!=null&&_.gameOver)&&!(_!=null&&_.turnTransition))&&await o.endTurn()}}),R()}export{it as initController};
