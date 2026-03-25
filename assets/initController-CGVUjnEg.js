import{C as U,r as ae,a as se,q as ce,s as de,g as ue,c as He,p as O,d as Be,i as Pe,o as Ee,f as xe,t as me,n as Me,l as I,k as Ge,m as Oe,j as Ie}from"./gridPatch-EZ_FNO_C.js";import{t as B,e as z,I as A,f as Ae,h as Ne,k as We,D as K,m as qe,n as Fe,o as ie}from"./roomRepository-CIM5PE7W.js";import{r as je}from"./entry-C4SZgIq7.js";function ze(e){const n=B(e);let m=[];function o(){const a=Math.min(window.innerWidth,window.innerHeight),l=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&a<=768&&l<=1024}async function p(){var a;if(o())try{(a=screen.orientation)!=null&&a.lock&&await screen.orientation.lock("portrait")}catch{}}function s(){let a=document.getElementById("orientation-guard");return a||(a=document.createElement("div"),a.id="orientation-guard",a.className="orientation-guard",a.setAttribute("aria-live","polite"),a.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(a)),a}function v(){const a=s(),l=window.matchMedia("(orientation: landscape)").matches,y=o()&&l;a.classList.toggle("is-visible",y),document.body.classList.toggle("is-orientation-blocked",y)}const d=()=>{document.visibilityState==="visible"&&(p(),v())},$=()=>v(),c=()=>v();return p(),v(),document.addEventListener("visibilitychange",d),window.addEventListener("resize",$),window.addEventListener("orientationchange",c),m=[()=>document.removeEventListener("visibilitychange",d),()=>window.removeEventListener("resize",$),()=>window.removeEventListener("orientationchange",c)],()=>{m.forEach(a=>a())}}function De(e,n){return e==="guide"?n.guide:n.dreamwalker}function Ve(e,n){return e==="guide"?n.controllerGuideHint:n.controllerWalkerHint}function Je(e){return e==="guide"?A.book:A.eye}function Ue({language:e,presenceState:n,currentPresenceRole:m}){const o=B(e),p=U.filter(l=>n==null?void 0:n[l.presenceRole]).length,s=m===null&&p>0,v=s?o.newGame:o.controllerConnectEyebrow,d=s?o.controllerReconnectTitle:o.controllerConnectTitle,$=s?o.controllerReconnectText:o.controllerConnectText,c=["dissonant","resonant"];function a(l){const y=m===l.presenceRole,w=!!(n!=null&&n[l.presenceRole])&&!y,C=De(l.roleType,o),T=Ve(l.roleType,o),b=w?o.roleBusy:y?o.currentRole:o.chooseRoleAction,h=w?"controller-role-picker__state--busy":y?"controller-role-picker__state--current":"controller-role-picker__state--action";return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${l.team} controller-role-picker__btn--${l.roleType} ${y?"is-current":""}"
                type="button"
                data-role-type="${l.roleType}"
                data-team="${l.team}"
                ${w?"disabled":""}
            >
                <span class="controller-role-picker__icon" aria-hidden="true">${Je(l.roleType)}</span>
                <span class="controller-role-picker__role">${C}</span>
                <span class="controller-role-picker__hint">${T}</span>
                <span class="controller-role-picker__state ${h}">${b}</span>
            </button>
        `}return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${s?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${v}</div>
                <h2 class="controller-role-picker__title">${d}</h2>
                <p class="controller-role-picker__text">${$}</p>
                <p class="controller-role-picker__summary">${p} / ${U.length} ${o.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${c.map(l=>{const y=z(l,e),w=U.filter(C=>C.team===l);return`
                            <section class="controller-role-picker__team-column controller-role-picker__team-column--${l}">
                                <h3 class="controller-role-picker__team-title">${y}</h3>
                                <div class="controller-role-picker__team-stack">
                                    ${w.map(a).join("")}
                                </div>
                            </section>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function fe({mode:e,title:n,titleMuted:m=!1,metaHtml:o="",boardClassName:p="",boardHtml:s="",footerHtml:v="",overlayHtml:d=""}){return`
        <div class="screen-layout screen-layout--fit-pending player-screen-layout ${e}-layout">
            <header class="screen-header">
                <div class="player-screen__header">
                    <div class="player-screen__title ${m?"player-screen__title--muted":"player-screen__title--active"}">${n}</div>
                    <div class="player-screen__meta-wrap" aria-live="polite">${o}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="screen-board player-screen__board ${p}">
                    ${s}
                </div>
            </main>

            <footer class="screen-footer player-screen__footer ${e}__footer">
                <div class="player-screen__footer-content">${v}</div>
            </footer>
            ${d}
        </div>
    `}function ge({state:e,lang:n,team:m,maxHintButtons:o,teamEffects:p}){const s=B(n),v=e.turn,d=v.team===m,$=v.guideLimit!==null,c=d&&!$&&!e.gameOver&&!e.turnTransition,a=p.allowTwoWordClue,l=p.forcedGuideLimit,y=p.hideEnemyColors,w=p.hideNightmare,C=z(m,n),T=c?`${s.guide}: ${s.chooseLimit}`:`${s.guide}: ${A.eyeClosed}`,b=[c&&l===1?s.guideForcedOneMove:null,c&&a?s.guideTwoWordClue:null,y?s.guideBlurActive:null,w?s.guideNightmareHidden:null].filter(Boolean),h=b.length?`<div class="player__meta player__meta--detail ${c?"player__meta--active":"player__meta--muted"}">${b.join(" • ")}</div>`:"",P=Array.from({length:o},(R,E)=>{const L=E+1;return`
            <button
                class="guide__num-btn ${v.guideLimit===L?"guide__num-btn--chosen":""}"
                data-limit="${L}"
                ${!c||l!==null&&L!==l?"disabled":""}
            >${L}</button>
        `}).join("");return{teamTitle:C,titleMuted:!c,metaHtml:`
            <div class="player__meta ${c?"player__meta--active":"player__meta--muted"}">${T}</div>
            ${h}
        `,boardHtml:ce({cells:e.cells,getCellClass:R=>de(R,{team:m,effects:p})}),footerHtml:`<div class="guide__btns ${c?"guide__btns--active":"guide__btns--muted"}">${P}</div>`}}function Ke({state:e,lang:n,team:m,maxHintButtons:o,teamEffects:p,suppressedTransitionId:s,controllerRolePickerHtml:v=""}){const d=ge({state:e,lang:n,team:m,maxHintButtons:o,teamEffects:p});return fe({mode:"guide",title:d.teamTitle,titleMuted:d.titleMuted,metaHtml:d.metaHtml,boardClassName:`guide guide--${m}`,boardHtml:d.boardHtml,footerHtml:d.footerHtml,overlayHtml:`
            ${ae(e,n,{suppressedTransitionId:s})}
            ${se({state:e,lang:n,team:m})}
            ${v}
        `})}function Qe(e,n){return e.revealed?e.word:`${e.word}, ${n.dreamwalker}`}function pe({state:e,lang:n,team:m}){const o=B(n),p=e.turn,s=p.team===m,v=p.guideLimit!==null,d=s&&v&&!e.gameOver&&!e.turnTransition,$=v?Math.max((p.guideLimit??0)-(p.dreamwalkerMoves??0),0):0,c=z(m,n),a=d?`${o.dreamwalker}: <span class="walker__moves-value">${Ae($,n)}</span>`:`${o.dreamwalker}: ${A.eyeClosed}`;return{teamTitle:c,titleMuted:!d,metaHtml:`<div class="${d?"player__meta player__meta--active":"player__meta player__meta--muted"}">${a}</div>`,boardHtml:ce({cells:e.cells,getCellClass:y=>`${ue(y)}${d&&!y.revealed?" cell--clickable":""}`,getAction:y=>({className:d&&!y.revealed?"cell__action--clickable":"",ariaLabel:Qe(y,o),disabled:!d||y.revealed})}),footerHtml:`
            <div class="walker__actions">
                <button class="walker__action-btn walker__refresh-btn ${d?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${o.endTurn}" ${d?"":"disabled"}>
                    <span class="walker__action-label">${o.endTurn}</span>
                    <span class="walker__action-icon">${A.x}</span>
                </button>
            </div>
        `,canPlay:d}}function Xe({state:e,lang:n,team:m,suppressedTransitionId:o,controllerRolePickerHtml:p=""}){const s=pe({state:e,lang:n,team:m});return fe({mode:"walker",title:s.teamTitle,titleMuted:s.titleMuted,metaHtml:s.metaHtml,boardClassName:`walker walker--${m}`,boardHtml:s.boardHtml,footerHtml:s.footerHtml,overlayHtml:`
            ${ae(e,n,{suppressedTransitionId:o})}
            ${se({state:e,lang:n,team:m})}
            ${p}
        `})}const oe=8;function Y(e){return`nw-controller-game:${e}`}function Ye(e){try{return sessionStorage.getItem(Y(e))}catch{return null}}function Q(e,n){try{n?sessionStorage.setItem(Y(e),n):sessionStorage.removeItem(Y(e))}catch{}}function Ze({team:e,roleType:n}){return!e||e!=="resonant"&&e!=="dissonant"?null:n==="guide"||n==="walker"?me(n,e):null}function et(e,n,m){if(!e)return n.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${z(e.team,m)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const o=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[o].replace(`
`,"<br>")}function X(e,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${B(e).waitingGame}</p>`}
        ${n}
    </div>`}async function lt(e){var re,le;const{roomId:n,token:m,team:o,roleType:p}=Ne();if(e.innerHTML=X(K),!n||!m){e.innerHTML=`<div class="waiting-screen">
            <p>${B(K).scanQr}</p>
        </div>`;return}const{room:s,error:v}=await We(n,m),d=(s==null?void 0:s.language)||K,$=B(d);if(!s||v){e.innerHTML=`<div class="waiting-screen">
            <p>${$.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}ze(d);const c=xe(n);await c.init();const a=He(n);let l=Ze({team:o,roleType:p});const y=O(l);l&&await a.isRoleTaken(l)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${et(y,$,d)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${$.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(i=>{var r;(r=document.getElementById("forceJoinBtn"))==null||r.addEventListener("click",i,{once:!0})})),l?a.join(l):a.listen(),await Be({presence:a,store:c,role:()=>l});let w=!1,C=new Set,T=Ye(n),b=!l,h=null,P=null,R=null,E=null,L=null,x=null,N=null,M=!0,W=!1,D=0;const q=Me({root:e,getGrid:()=>e.querySelector(".grid"),onFitEnd:()=>{F()}});function _e(){return e.querySelector(".grid")}function ye(){W||(W=!0,qe())}function F(){W&&(W=!1,Fe())}function ve(){const t=_e();return t?`${t.clientWidth}x${t.clientHeight}`:null}function ke(){q.observeGrid(()=>{M=!0,ne(c.getState(),x)})}Pe(e,()=>{var t;return(t=c.getState())==null?void 0:t.turnTransition},async()=>{await c.forceCompleteTurnTransition()});function V(){w=!1,C=new Set,h=null,P=null,R=null,E=null,L=null,x=null,N=null,M=!0,q.reset()}async function we(t){l=t??null,l?await a.setRole(l):await a.setRole(null)}async function Z(t,{reopenPickerOnError:i=!1}={}){const r=++D,f=l;ye();try{await we(t)}catch(u){return l=f,i&&(b=!0),F(),je("controller:set-role",u),r===D&&H(),!1}return r!==D?!1:(H(),t||F(),!0)}function be(t){const i=(t==null?void 0:t.gameId)??null;if(!i){T=null,Q(n,null),b=!l;return}if(!l){b=!0;return}if(!T){T=i,Q(n,i);return}i!==T&&!b&&(b=!0,V(),Z(null,{reopenPickerOnError:!0}))}function J(){return Ue({language:c.getLanguage(),presenceState:a.getPresenceState(),currentPresenceRole:l})}function $e(t,i){return JSON.stringify(ie(t)[i])}function ee(t,i){const r=I(t.cells);return(i==null?void 0:i.roleType)==="guide"?`${r}|${$e(t.teamEffects,i.team)}`:r}function he(t,i,r,f){const u=r==null?void 0:r.roleType;return u!=="guide"&&u!=="walker"||f||t.turnTransition||t.gameOver||R!==u||E!==r.team||P!==i||!h||!e.querySelector(`.${u}-layout`)?!1:u==="walker"?I(h.cells)===I(t.cells):ee(h,r)===ee(t,r)}function te(t,i,r){const f=ie(t.teamEffects)[r.team];if(r.roleType==="guide")return{roleType:"guide",viewModel:ge({state:t,lang:i,team:r.team,maxHintButtons:oe,teamEffects:f}),renderMarkup:({pickerHtml:g})=>Ke({state:t,lang:i,team:r.team,maxHintButtons:oe,teamEffects:f,controllerRolePickerHtml:g}),getCellClass:g=>de(g,{team:r.team,effects:f}),updateCellElement:null,refreshAllClasses:!1,animationSelector:".guide .grid .cell"};const u=pe({state:t,lang:i,team:r.team});return{roleType:"walker",viewModel:u,renderMarkup:({pickerHtml:g})=>Xe({state:t,lang:i,team:r.team,controllerRolePickerHtml:g}),getCellClass:g=>`${ue(g)}${u.canPlay&&!g.revealed?" cell--clickable":""}`,updateCellElement:(g,_,S)=>{const k=g.querySelector(".cell__action");if(!(k instanceof HTMLButtonElement))return;const G=u.canPlay&&!_.revealed;k.type="button",k.className=G?"cell__action cell__action--clickable":"cell__action",k.disabled=!G,k.setAttribute("aria-label",_.word),k.dataset.index=String(S)},refreshAllClasses:!0,animationSelector:".walker .grid .cell"}}function Te(t,i,r){const f=e.querySelector(`.${r.roleType} .grid`);return f?Ie({grid:f,prevCells:i==null?void 0:i.cells,nextCells:t.cells,getCellClass:r.getCellClass,refreshAllClasses:r.refreshAllClasses,updateCellElement:r.updateCellElement}):!1}function Ce(t,i,r){const f=h,u=te(t,i,r),{viewModel:g}=u,_=e.querySelector(".player-screen__title"),S=e.querySelector(".player-screen__meta-wrap"),k=e.querySelector(".player-screen__footer-content");return!_||!S||!k||(_.textContent=g.teamTitle,_.classList.toggle("player-screen__title--muted",g.titleMuted),_.classList.toggle("player-screen__title--active",!g.titleMuted),S.innerHTML=g.metaHtml,k.innerHTML=g.footerHtml,!Te(t,f,u))?!1:(h=t,P=i,R=r.roleType,E=r.team,!0)}function ne(t,i){if(!t||!i)return;const r=I(t.cells),f=ve(),u=M||!w||L!==r||x!==i||N!==f;L=r,x=i,N=f,u&&(M=!1,q.scheduleFit())}function Le(t,i,r,f){const u=Ge(t.cells),g=te(t,i,r),_=!w||L!==I(t.cells)||x!==g.roleType;e.innerHTML=g.renderMarkup({pickerHtml:f}),_&&q.markPending(),Oe({root:e,selector:g.animationSelector,currentRevealed:u,prevRevealed:C,hasRenderedBoard:w}),C=u,w=!0,ke(),ne(t,g.roleType)}function Se(t,i){document.body.classList.remove("team-resonant","team-dissonant"),V(),F(),e.innerHTML=X(i,J())}function Re(t,i){be(t);const r=O(l),f=b||!r;if(!r){Se(t,i);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${r.team}`);const u=f?J():"";he(t,i,r,f)&&Ce(t,i,r)||Le(t,i,r,u)}function H({state:t,language:i}={}){var u,g;const r=t??c.getState(),f=i??c.getLanguage();if(!r){V(),e.innerHTML=X(f,l?"":J());return}Re(r,f),h=r,P=f,R=((u=O(l))==null?void 0:u.roleType)??null,E=((g=O(l))==null?void 0:g.team)??null}c.subscribe(H),a.onChange(()=>{(b||!l)&&H()}),Ee(()=>{M=!0,H()}),(le=(re=document.fonts)==null?void 0:re.ready)==null||le.then(()=>{M=!0,H()}).catch(()=>{}),e.addEventListener("click",async t=>{if(t.target.closest("[data-transition-dismiss]")){t.preventDefault(),t.stopPropagation(),await c.forceCompleteTurnTransition();return}const r=t.target.closest("[data-controller-role-picker] button[data-role-type][data-team]");if(r){const _=r.dataset.roleType,S=r.dataset.team,k=me(_,S),G=a.getPresenceState(),j=c.getState();if(G[k]&&l!==k)return;b=!1,T=(j==null?void 0:j.gameId)??null,Q(n,T),await Z(k,{reopenPickerOnError:!0});return}const f=t.target.closest(".guide__num-btn:not([disabled])");if(f){await c.setGuideLimit(parseInt(f.dataset.limit,10));return}const u=t.target.closest("[data-cell-action]");if(u&&!u.disabled){await c.reveal(parseInt(u.dataset.index,10));return}if(t.target.closest("#refreshBtn")){const _=c.getState(),S=O(l),k=S&&(_==null?void 0:_.turn.team)===S.team,G=(_==null?void 0:_.turn.guideLimit)!==null;!!(k&&G&&!(_!=null&&_.gameOver)&&!(_!=null&&_.turnTransition))&&await c.endTurn()}}),H()}export{lt as initController};
