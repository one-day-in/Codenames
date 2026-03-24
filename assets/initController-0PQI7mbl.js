import{C as Q,r as pe,a as _e,m as Ie,e as ye,g as Ae,c as Me,p as A,d as Ne,i as We,o as Fe,f as je,n as ve,j as X,k as me,q as fe,l as qe}from"./turnTransitionDismiss-CQIJ7cZS.js";import{t as P,e as j,I as M,f as ze,h as De,k as Ve,D as Y,n as Z}from"./roomRepository-BzPr1MxX.js";import"./entry-CZHkbGAT.js";function Je(t){const n=P(t);let d=[];function s(){const a=Math.min(window.innerWidth,window.innerHeight),l=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&a<=768&&l<=1024}async function g(){var a;if(s())try{(a=screen.orientation)!=null&&a.lock&&await screen.orientation.lock("portrait")}catch{}}function c(){let a=document.getElementById("orientation-guard");return a||(a=document.createElement("div"),a.id="orientation-guard",a.className="orientation-guard",a.setAttribute("aria-live","polite"),a.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(a)),a}function p(){const a=c(),l=window.matchMedia("(orientation: landscape)").matches,y=s()&&l;a.classList.toggle("is-visible",y),document.body.classList.toggle("is-orientation-blocked",y)}const f=()=>{document.visibilityState==="visible"&&(g(),p())},$=()=>p(),o=()=>p();return g(),p(),document.addEventListener("visibilitychange",f),window.addEventListener("resize",$),window.addEventListener("orientationchange",o),d=[()=>document.removeEventListener("visibilitychange",f),()=>window.removeEventListener("resize",$),()=>window.removeEventListener("orientationchange",o)],()=>{d.forEach(a=>a())}}function Ue(t,n){return t==="guide"?n.guide:n.dreamwalker}function Ke(t,n){return t==="guide"?n.controllerGuideHint:n.controllerWalkerHint}function Qe(t){return t==="guide"?M.book:M.eye}function Xe({language:t,presenceState:n,currentPresenceRole:d}){const s=P(t),g=Q.filter(l=>n==null?void 0:n[l.presenceRole]).length,c=d===null&&g>0,p=c?s.newGame:s.controllerConnectEyebrow,f=c?s.controllerReconnectTitle:s.controllerConnectTitle,$=c?s.controllerReconnectText:s.controllerConnectText,o=["dissonant","resonant"];function a(l){const y=d===l.presenceRole,k=!!(n!=null&&n[l.presenceRole])&&!y,w=Ue(l.roleType,s),h=Ke(l.roleType,s),T=k?s.roleBusy:y?s.currentRole:s.chooseRoleAction,b=k?"controller-role-picker__state--busy":y?"controller-role-picker__state--current":"controller-role-picker__state--action";return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${l.team} controller-role-picker__btn--${l.roleType} ${y?"is-current":""}"
                type="button"
                data-role-type="${l.roleType}"
                data-team="${l.team}"
                ${k?"disabled":""}
            >
                <span class="controller-role-picker__icon" aria-hidden="true">${Qe(l.roleType)}</span>
                <span class="controller-role-picker__role">${w}</span>
                <span class="controller-role-picker__hint">${h}</span>
                <span class="controller-role-picker__state ${b}">${T}</span>
            </button>
        `}return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${c?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${p}</div>
                <h2 class="controller-role-picker__title">${f}</h2>
                <p class="controller-role-picker__text">${$}</p>
                <p class="controller-role-picker__summary">${g} / ${Q.length} ${s.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${o.map(l=>{const y=j(l,t),k=Q.filter(w=>w.team===l);return`
                            <section class="controller-role-picker__team-column controller-role-picker__team-column--${l}">
                                <h3 class="controller-role-picker__team-title">${y}</h3>
                                <div class="controller-role-picker__team-stack">
                                    ${k.map(a).join("")}
                                </div>
                            </section>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function ke({mode:t,title:n,titleMuted:d=!1,metaHtml:s="",boardClassName:g="",boardHtml:c="",footerHtml:p="",overlayHtml:f=""}){return`
        <div class="screen-layout screen-layout--fit-pending player-screen-layout ${t}-layout">
            <header class="screen-header">
                <div class="player-screen__header">
                    <div class="player-screen__title ${d?"player-screen__title--muted":"player-screen__title--active"}">${n}</div>
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
    `}function $e({state:t,lang:n,team:d,maxHintButtons:s,teamEffects:g}){const c=P(n),p=t.turn,f=p.team===d,$=p.guideLimit!==null,o=f&&!$&&!t.gameOver&&!t.turnTransition,a=g.allowTwoWordClue,l=g.forcedGuideLimit,y=g.hideEnemyColors,k=g.hideNightmare,w=j(d,n),h=o?`${c.guide}: ${c.chooseLimit}`:`${c.guide}: ${M.eyeClosed}`,T=[o&&l===1?c.guideForcedOneMove:null,o&&a?c.guideTwoWordClue:null,y?c.guideBlurActive:null,k?c.guideNightmareHidden:null].filter(Boolean),b=T.length?`<div class="player__meta ${o?"player__meta--active":"player__meta--muted"}">${T.join(" • ")}</div>`:"",B=Array.from({length:s},(H,C)=>{const S=C+1;return`
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
                    <div class="${Ie(H,{team:d,effects:g})}" data-index="${C}">
                        <span class="cell__content">${ye(H.word)}</span>
                    </div>
                `).join("")}
            </div>
        `,footerHtml:`<div class="guide__btns ${o?"guide__btns--active":"guide__btns--muted"}">${B}</div>`}}function Ye({state:t,lang:n,team:d,maxHintButtons:s,teamEffects:g,suppressedTransitionId:c,controllerRolePickerHtml:p=""}){const f=$e({state:t,lang:n,team:d,maxHintButtons:s,teamEffects:g});return ke({mode:"guide",title:f.teamTitle,titleMuted:f.titleMuted,metaHtml:f.metaHtml,boardClassName:`guide guide--${d}`,boardHtml:f.boardHtml,footerHtml:f.footerHtml,overlayHtml:`
            ${pe(t,n,{suppressedTransitionId:c})}
            ${_e({state:t,lang:n,team:d})}
            ${p}
        `})}function we({state:t,lang:n,team:d}){const s=P(n),g=t.turn,c=g.team===d,p=g.guideLimit!==null,f=c&&p&&!t.gameOver&&!t.turnTransition,$=p?Math.max((g.guideLimit??0)-(g.dreamwalkerMoves??0),0):0,o=j(d,n),a=f?`${s.dreamwalker}: <span class="walker__moves-value">${ze($,n)}</span>`:`${s.dreamwalker}: ${M.eyeClosed}`;return{teamTitle:o,titleMuted:!f,metaHtml:`<div class="${f?"player__meta player__meta--active":"player__meta player__meta--muted"}">${a}</div>`,boardHtml:`
            <div class="grid grid--5">
                ${t.cells.map((y,k)=>`
                    <div
                        class="${Ae(y)} ${f&&!y.revealed?"cell--clickable":""}"
                        data-index="${k}"
                    >
                        <span class="cell__content">${ye(y.word)}</span>
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
        `,canPlay:f}}function Ze({state:t,lang:n,team:d,suppressedTransitionId:s,controllerRolePickerHtml:g=""}){const c=we({state:t,lang:n,team:d});return ke({mode:"walker",title:c.teamTitle,titleMuted:c.titleMuted,metaHtml:c.metaHtml,boardClassName:`walker walker--${d}`,boardHtml:c.boardHtml,footerHtml:c.footerHtml,overlayHtml:`
            ${pe(t,n,{suppressedTransitionId:s})}
            ${_e({state:t,lang:n,team:d})}
            ${g}
        `})}const ge=8;function ne(t){return`nw-controller-game:${t}`}function et(t){try{return sessionStorage.getItem(ne(t))}catch{return null}}function ee(t,n){try{n?sessionStorage.setItem(ne(t),n):sessionStorage.removeItem(ne(t))}catch{}}function tt({team:t,roleType:n}){return!t||t!=="resonant"&&t!=="dissonant"?null:n==="guide"||n==="walker"?ve(n,t):null}function nt(t,n,d){if(!t)return n.controllerTaken.replace(`
`,"<br>");if(t.roleType==="walker")return`${j(t.team,d)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const s=t.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[s].replace(`
`,"<br>")}function te(t,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${P(t).waitingGame}</p>`}
        ${n}
    </div>`}async function ot(t){var ue,de;const{roomId:n,token:d,team:s,roleType:g}=De();if(t.innerHTML=te(Y),!n||!d){t.innerHTML=`<div class="waiting-screen">
            <p>${P(Y).scanQr}</p>
        </div>`;return}const{room:c,error:p}=await Ve(n,d),f=(c==null?void 0:c.language)||Y,$=P(f);if(!c||p){t.innerHTML=`<div class="waiting-screen">
            <p>${$.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}Je(f);const o=je(n);await o.init();const a=Me(n);let l=tt({team:s,roleType:g});const y=A(l);l&&await a.isRoleTaken(l)&&(t.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${nt(y,$,f)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${$.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(i=>{var r;(r=document.getElementById("forceJoinBtn"))==null||r.addEventListener("click",i,{once:!0})})),l?a.join(l):a.listen(),await Ne({presence:a,store:o,role:()=>l});let k=!1,w=new Set,h=null,T=et(n),b=!l,B=null,H=null,C=null,S=null,N=null,O=null,q=null,x=!0,E=0,G=null,z=null;function re(){E&&(cancelAnimationFrame(E),E=0)}function ie(){G==null||G.disconnect(),G=null,z=null}function D(){return t.querySelector(".grid")}function le(){return t.querySelector(".screen-layout")}function oe(){const e=le();e&&(e.classList.add("screen-layout--fit-pending"),e.classList.remove("screen-layout--fit-ready"))}function he(){const e=le();e&&(e.classList.remove("screen-layout--fit-pending"),e.classList.add("screen-layout--fit-ready"))}function Te(){const e=D();return e?`${e.clientWidth}x${e.clientHeight}`:null}function ae(){const e=D();!e||z===e||typeof ResizeObserver>"u"||(ie(),z=e,G=new ResizeObserver(()=>{x=!0,U(o.getState(),O)}),G.observe(e))}We(t,()=>{var e;return(e=o.getState())==null?void 0:e.turnTransition},async()=>{var i;const e=(i=o.getState())==null?void 0:i.turnTransition;e!=null&&e.id&&(h=e.id,R()),await o.forceCompleteTurnTransition()});function V(){k=!1,w=new Set,h=null,B=null,H=null,C=null,S=null,N=null,O=null,q=null,x=!0,re(),ie()}async function se(e){l=e??null,l?await a.setRole(l):await a.setRole(null)}function be(e){const i=(e==null?void 0:e.gameId)??null;if(!i){T=null,ee(n,null),b=!l;return}if(!l){b=!0;return}if(!T){T=i,ee(n,i);return}i!==T&&!b&&(b=!0,V(),se(null).then(()=>R()))}function J(){return Xe({language:o.getLanguage(),presenceState:a.getPresenceState(),currentPresenceRole:l})}function Le(e=[]){return Array.from(X(e)).sort((i,r)=>i-r).join(",")}function Se(e,i){return JSON.stringify(Z(e)[i])}function ce(e,i){const r=[fe(e.cells),Le(e.cells)].join("|");return(i==null?void 0:i.roleType)==="guide"?`${r}|${Se(e.teamEffects,i.team)}`:r}function Re(e,i,r,u){const m=r==null?void 0:r.roleType;return m!=="guide"&&m!=="walker"||u||e.turnTransition||e.gameOver||C!==m||S!==r.team||H!==i||!B||!t.querySelector(`.${m}-layout`)?!1:ce(B,r)===ce(e,r)}function He(e,i,r){const u=t.querySelectorAll(".walker .grid .cell");return u.length!==e.cells.length?!1:(e.cells.forEach((m,v)=>{const L=u[v];L&&(L.className=`${L.className.replace(/\s?cell--clickable/g,"")}${r&&!m.revealed?" cell--clickable":""}`,L.dataset.index=String(v))}),!0)}function Ce(e,i,r){return(r==null?void 0:r.roleType)==="guide"?$e({state:e,lang:i,team:r.team,maxHintButtons:ge,teamEffects:Z(e.teamEffects)[r.team]}):we({state:e,lang:i,team:r.team})}function Be(e,i,r){return(i==null?void 0:i.roleType)==="walker"?He(e,i,r.canPlay):!0}function xe(e,i,r){const u=Ce(e,i,r),m=t.querySelector(".player-screen__title"),v=t.querySelector(".player-screen__meta-wrap"),L=t.querySelector(".player-screen__footer-content");return!m||!v||!L||(m.textContent=u.teamTitle,m.classList.toggle("player-screen__title--muted",u.titleMuted),m.classList.toggle("player-screen__title--active",!u.titleMuted),v.innerHTML=u.metaHtml,L.innerHTML=u.footerHtml,!Be(e,r,u))?!1:(B=e,H=i,C=r.roleType,S=r.team,!0)}function U(e,i){if(!e||!i)return;const r=fe(e.cells),u=Te(),m=x||!k||N!==r||O!==i||q!==u;N=r,O=i,q=u,m&&(x=!1,re(),E=requestAnimationFrame(()=>{E=requestAnimationFrame(()=>{E=0;const v=D();if(!v||!v.clientWidth||!v.clientHeight){x=!0;return}qe(v,".cell"),he()})}))}function Pe(e,i,r,u){const m=Z(e.teamEffects)[r.team],v=X(e.cells);t.innerHTML=Ye({state:e,lang:i,team:r.team,maxHintButtons:ge,teamEffects:m,suppressedTransitionId:h,controllerRolePickerHtml:u}),oe(),me({root:t,selector:".guide .grid .cell",currentRevealed:v,prevRevealed:w,hasRenderedBoard:k}),w=v,k=!0,ae(),U(e,"guide")}function Ee(e,i,r,u){const m=X(e.cells);t.innerHTML=Ze({state:e,lang:i,team:r.team,suppressedTransitionId:h,controllerRolePickerHtml:u}),oe(),me({root:t,selector:".walker .grid .cell",currentRevealed:m,prevRevealed:w,hasRenderedBoard:k}),w=m,k=!0,ae(),U(e,"walker")}function Ge(e,i){document.body.classList.remove("team-resonant","team-dissonant"),V(),t.innerHTML=te(i,J())}function Oe(e,i){be(e),(!e.turnTransition||e.turnTransition.id!==h)&&(h=null);const r=A(l),u=b||!r;if(!r){Ge(e,i);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${r.team}`);const m=u?J():"";if(!(Re(e,i,r,u)&&xe(e,i,r))){if(r.roleType==="guide"){Pe(e,i,r,m);return}Ee(e,i,r,m)}}function R({state:e,language:i}={}){var m,v;const r=e??o.getState(),u=i??o.getLanguage();if(!r){V(),t.innerHTML=te(u,l?"":J());return}Oe(r,u),B=r,H=u,C=((m=A(l))==null?void 0:m.roleType)??null,S=((v=A(l))==null?void 0:v.team)??null}o.subscribe(R),a.onChange(()=>{(b||!l)&&R()}),Fe(()=>{x=!0,R()}),(de=(ue=document.fonts)==null?void 0:ue.ready)==null||de.then(()=>{x=!0,R()}).catch(()=>{}),t.addEventListener("click",async e=>{var L;if(e.target.closest("[data-transition-dismiss]")){const _=(L=o.getState())==null?void 0:L.turnTransition;_!=null&&_.id&&(h=_.id,R()),await o.forceCompleteTurnTransition();return}const r=e.target.closest("[data-controller-role-picker] button[data-role-type][data-team]");if(r){const _=r.dataset.roleType,W=r.dataset.team,I=ve(_,W),K=a.getPresenceState(),F=o.getState();if(K[I]&&l!==I)return;b=!1,T=(F==null?void 0:F.gameId)??null,ee(n,T),await se(I),R();return}const u=e.target.closest(".guide__num-btn:not([disabled])");if(u){await o.setGuideLimit(parseInt(u.dataset.limit,10));return}const m=e.target.closest(".cell--clickable");if(m){await o.reveal(parseInt(m.dataset.index,10));return}if(e.target.closest("#refreshBtn")){const _=o.getState(),W=A(l),I=W&&(_==null?void 0:_.turn.team)===W.team,K=(_==null?void 0:_.turn.guideLimit)!==null;!!(I&&K&&!(_!=null&&_.gameOver)&&!(_!=null&&_.turnTransition))&&await o.endTurn()}}),R()}export{ot as initController};
