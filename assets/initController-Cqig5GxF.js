import{C as N,r as K,a as Q,m as X,n as le,g as se,c as ce,p as W,d as de,i as ue,o as me,f as ge,q as Y,j as pe,k as _e,l as fe}from"./turnTransitionDismiss-DW6YTxZm.js";import{t as C,e as x,I as B,f as ve,h as ke,k as ye,D as j,m as we,n as $e,o as be}from"./roomRepository-CIM5PE7W.js";import{r as he}from"./entry-BgKlsUjb.js";function Te(e){const t=C(e);let c=[];function o(){const i=Math.min(window.innerWidth,window.innerHeight),n=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&i<=768&&n<=1024}async function u(){var i;if(o())try{(i=screen.orientation)!=null&&i.lock&&await screen.orientation.lock("portrait")}catch{}}function a(){let i=document.getElementById("orientation-guard");return i||(i=document.createElement("div"),i.id="orientation-guard",i.className="orientation-guard",i.setAttribute("aria-live","polite"),i.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${t.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${t.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(i)),i}function p(){const i=a(),n=window.matchMedia("(orientation: landscape)").matches,g=o()&&n;i.classList.toggle("is-visible",g),document.body.classList.toggle("is-orientation-blocked",g)}const s=()=>{document.visibilityState==="visible"&&(u(),p())},k=()=>p(),l=()=>p();return u(),p(),document.addEventListener("visibilitychange",s),window.addEventListener("resize",k),window.addEventListener("orientationchange",l),c=[()=>document.removeEventListener("visibilitychange",s),()=>window.removeEventListener("resize",k),()=>window.removeEventListener("orientationchange",l)],()=>{c.forEach(i=>i())}}function Le(e,t){return e==="guide"?t.guide:t.dreamwalker}function Re(e,t){return e==="guide"?t.controllerGuideHint:t.controllerWalkerHint}function Ce(e){return e==="guide"?B.book:B.eye}function He({language:e,presenceState:t,currentPresenceRole:c}){const o=C(e),u=N.filter(n=>t==null?void 0:t[n.presenceRole]).length,a=c===null&&u>0,p=a?o.newGame:o.controllerConnectEyebrow,s=a?o.controllerReconnectTitle:o.controllerConnectTitle,k=a?o.controllerReconnectText:o.controllerConnectText,l=["dissonant","resonant"];function i(n){const g=c===n.presenceRole,y=!!(t!=null&&t[n.presenceRole])&&!g,b=Le(n.roleType,o),$=Re(n.roleType,o),v=y?o.roleBusy:g?o.currentRole:o.chooseRoleAction,h=y?"controller-role-picker__state--busy":g?"controller-role-picker__state--current":"controller-role-picker__state--action";return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${n.team} controller-role-picker__btn--${n.roleType} ${g?"is-current":""}"
                type="button"
                data-role-type="${n.roleType}"
                data-team="${n.team}"
                ${y?"disabled":""}
            >
                <span class="controller-role-picker__icon" aria-hidden="true">${Ce(n.roleType)}</span>
                <span class="controller-role-picker__role">${b}</span>
                <span class="controller-role-picker__hint">${$}</span>
                <span class="controller-role-picker__state ${h}">${v}</span>
            </button>
        `}return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${a?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${p}</div>
                <h2 class="controller-role-picker__title">${s}</h2>
                <p class="controller-role-picker__text">${k}</p>
                <p class="controller-role-picker__summary">${u} / ${N.length} ${o.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${l.map(n=>{const g=x(n,e),y=N.filter(b=>b.team===n);return`
                            <section class="controller-role-picker__team-column controller-role-picker__team-column--${n}">
                                <h3 class="controller-role-picker__team-title">${g}</h3>
                                <div class="controller-role-picker__team-stack">
                                    ${y.map(i).join("")}
                                </div>
                            </section>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function Z({mode:e,title:t,titleMuted:c=!1,metaHtml:o="",boardClassName:u="",boardHtml:a="",footerHtml:p="",overlayHtml:s=""}){return`
        <div class="screen-layout player-screen-layout ${e}-layout">
            <header class="screen-header">
                <div class="player-screen__header">
                    <div class="player-screen__title ${c?"player-screen__title--muted":"player-screen__title--active"}">${t}</div>
                    <div class="player-screen__meta-wrap" aria-live="polite">${o}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="screen-board player-screen__board ${u}">
                    ${a}
                </div>
            </main>

            <footer class="screen-footer player-screen__footer ${e}__footer">
                <div class="player-screen__footer-content">${p}</div>
            </footer>
            ${s}
        </div>
    `}function ee({state:e,lang:t,team:c,maxHintButtons:o,teamEffects:u}){const a=C(t),p=e.turn,s=p.team===c,k=p.guideLimit!==null,l=s&&!k&&!e.gameOver&&!e.turnTransition,i=u.allowTwoWordClue,n=u.forcedGuideLimit,g=u.hideEnemyColors,y=u.hideNightmare,b=x(c,t),$=l?`${a.guide}: ${a.chooseLimit}`:`${a.guide}: ${B.eyeClosed}`,v=[l&&n===1?a.guideForcedOneMove:null,l&&i?a.guideTwoWordClue:null,g?a.guideBlurActive:null,y?a.guideNightmareHidden:null].filter(Boolean),h=v.length?`<div class="player__meta player__meta--detail ${l?"player__meta--active":"player__meta--muted"}">${v.join(" • ")}</div>`:"",M=Array.from({length:o},(P,H)=>{const T=H+1;return`
            <button
                class="guide__num-btn ${p.guideLimit===T?"guide__num-btn--chosen":""}"
                data-limit="${T}"
                ${!l||n!==null&&T!==n?"disabled":""}
            >${T}</button>
        `}).join("");return{teamTitle:b,titleMuted:!l,metaHtml:`
            <div class="player__meta ${l?"player__meta--active":"player__meta--muted"}">${$}</div>
            ${h}
        `,boardHtml:X({cells:e.cells,getCellClass:P=>le(P,{team:c,effects:u})}),footerHtml:`<div class="guide__btns ${l?"guide__btns--active":"guide__btns--muted"}">${M}</div>`}}function Me({state:e,lang:t,team:c,maxHintButtons:o,teamEffects:u,suppressedTransitionId:a,controllerRolePickerHtml:p=""}){const s=ee({state:e,lang:t,team:c,maxHintButtons:o,teamEffects:u});return Z({mode:"guide",title:s.teamTitle,titleMuted:s.titleMuted,metaHtml:s.metaHtml,boardClassName:`guide guide--${c}`,boardHtml:s.boardHtml,footerHtml:s.footerHtml,overlayHtml:`
            ${K(e,t,{suppressedTransitionId:a})}
            ${Q({state:e,lang:t,team:c})}
            ${p}
        `})}function Se(e,t){return e.revealed?e.word:`${e.word}, ${t.dreamwalker}`}function te({state:e,lang:t,team:c}){const o=C(t),u=e.turn,a=u.team===c,p=u.guideLimit!==null,s=a&&p&&!e.gameOver&&!e.turnTransition,k=p?Math.max((u.guideLimit??0)-(u.dreamwalkerMoves??0),0):0,l=x(c,t),i=s?`${o.dreamwalker}: <span class="walker__moves-value">${ve(k,t)}</span>`:`${o.dreamwalker}: ${B.eyeClosed}`;return{teamTitle:l,titleMuted:!s,metaHtml:`<div class="${s?"player__meta player__meta--active":"player__meta player__meta--muted"}">${i}</div>`,boardHtml:X({cells:e.cells,getCellClass:g=>`${se(g)}${s&&!g.revealed?" cell--clickable":""}`,getAction:g=>({className:s&&!g.revealed?"cell__action--clickable":"",ariaLabel:Se(g,o),disabled:!s||g.revealed})}),footerHtml:`
            <div class="walker__actions">
                <button class="walker__action-btn walker__refresh-btn ${s?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${o.endTurn}" ${s?"":"disabled"}>
                    <span class="walker__action-label">${o.endTurn}</span>
                    <span class="walker__action-icon">${B.x}</span>
                </button>
            </div>
        `,canPlay:s}}function Be({state:e,lang:t,team:c,suppressedTransitionId:o,controllerRolePickerHtml:u=""}){const a=te({state:e,lang:t,team:c});return Z({mode:"walker",title:a.teamTitle,titleMuted:a.titleMuted,metaHtml:a.metaHtml,boardClassName:`walker walker--${c}`,boardHtml:a.boardHtml,footerHtml:a.footerHtml,overlayHtml:`
            ${K(e,t,{suppressedTransitionId:o})}
            ${Q({state:e,lang:t,team:c})}
            ${u}
        `})}const U=8;function z(e){return`nw-controller-game:${e}`}function Pe(e){try{return sessionStorage.getItem(z(e))}catch{return null}}function D(e,t){try{t?sessionStorage.setItem(z(e),t):sessionStorage.removeItem(z(e))}catch{}}function Ge({team:e,roleType:t}){return!e||e!=="resonant"&&e!=="dissonant"?null:t==="guide"||t==="walker"?Y(t,e):null}function Oe(e,t,c){if(!e)return t.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${x(e.team,c)} ${t.dreamwalker}<br>${t.controllerTaken.replace(`
`,"<br>")}`;const o=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return t[o].replace(`
`,"<br>")}function q(e,t=""){return`<div class="waiting-screen">
        ${t?"":`<p>${C(e).waitingGame}</p>`}
        ${t}
    </div>`}async function Ae(e){var V,J;const{roomId:t,token:c,team:o,roleType:u}=ke();if(e.innerHTML=q(j),!t||!c){e.innerHTML=`<div class="waiting-screen">
            <p>${C(j).scanQr}</p>
        </div>`;return}const{room:a,error:p}=await ye(t,c),s=(a==null?void 0:a.language)||j,k=C(s);if(!a||p){e.innerHTML=`<div class="waiting-screen">
            <p>${k.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}Te(s);const l=ge(t);await l.init();const i=ce(t);let n=Ge({team:o,roleType:u});const g=W(n);n&&await i.isRoleTaken(n)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${Oe(g,k,s)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${k.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(m=>{var d;(d=document.getElementById("forceJoinBtn"))==null||d.addEventListener("click",m,{once:!0})})),n?i.join(n):i.listen(),await de({presence:i,store:l,role:()=>n});let y=!1,b=new Set,$=Pe(t),v=!n,h=!1,M=0;function P(){h||(h=!0,we())}function H(){h&&(h=!1,$e())}ue(e,()=>{var r;return(r=l.getState())==null?void 0:r.turnTransition},async()=>{await l.forceCompleteTurnTransition()});function T(){y=!1,b=new Set}async function F(r){n=r??null,n?await i.setRole(n):await i.setRole(null)}async function E(r,{reopenPickerOnError:m=!1}={}){const d=++M,_=n;P();try{await F(r)}catch(w){return n=_,m&&(v=!0),H(),he("controller:set-role",w),d===M&&L(),!1}return d!==M?!1:(L(),r||H(),!0)}function ne(r){const m=(r==null?void 0:r.gameId)??null;if(!m){$=null,D(t,null),v=!n;return}if(!n){v=!0;return}if(!$){$=m,D(t,m);return}m!==$&&!v&&(v=!0,T(),E(null,{reopenPickerOnError:!0}))}function I(){return He({language:l.getLanguage(),presenceState:i.getPresenceState(),currentPresenceRole:n})}function re(r,m,d){const _=be(r.teamEffects)[d.team];return d.roleType==="guide"?{roleType:"guide",viewModel:ee({state:r,lang:m,team:d.team,maxHintButtons:U,teamEffects:_}),renderMarkup:({pickerHtml:R})=>Me({state:r,lang:m,team:d.team,maxHintButtons:U,teamEffects:_,controllerRolePickerHtml:R}),animationSelector:".guide .grid .cell"}:{roleType:"walker",viewModel:te({state:r,lang:m,team:d.team}),renderMarkup:({pickerHtml:R})=>Be({state:r,lang:m,team:d.team,controllerRolePickerHtml:R}),animationSelector:".walker .grid .cell"}}function oe(r,m,d,_){const w=pe(r.cells),R=re(r,m,d);e.innerHTML=R.renderMarkup({pickerHtml:_}),_e({root:e,selector:R.animationSelector,currentRevealed:w,prevRevealed:b,hasRenderedBoard:y}),b=w,y=!0,requestAnimationFrame(()=>{fe(e,".grid .cell")}),H()}function ie(r,m){document.body.classList.remove("team-resonant","team-dissonant"),T(),H(),e.innerHTML=q(m,I())}function ae(r,m){ne(r);const d=W(n),_=v||!d;if(!d){ie(r,m);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${d.team}`);const w=_?I():"";oe(r,m,d,w)}function L({state:r,language:m}={}){const d=r??l.getState(),_=m??l.getLanguage();if(!d){T(),e.innerHTML=q(_,n?"":I());return}ae(d,_)}l.subscribe(L),i.onChange(()=>{(v||!n)&&L()}),me(()=>{L()}),(J=(V=document.fonts)==null?void 0:V.ready)==null||J.then(()=>{L()}).catch(()=>{}),e.addEventListener("click",async r=>{if(r.target.closest("[data-transition-dismiss]")){r.preventDefault(),r.stopPropagation(),await l.forceCompleteTurnTransition();return}const d=r.target.closest("[data-controller-role-picker] button[data-role-type][data-team]");if(d){const f=d.dataset.roleType,G=d.dataset.team,S=Y(f,G),A=i.getPresenceState(),O=l.getState();if(A[S]&&n!==S)return;v=!1,$=(O==null?void 0:O.gameId)??null,D(t,$),await E(S,{reopenPickerOnError:!0});return}const _=r.target.closest(".guide__num-btn:not([disabled])");if(_){await l.setGuideLimit(parseInt(_.dataset.limit,10));return}const w=r.target.closest("[data-cell-action]");if(w&&!w.disabled){await l.reveal(parseInt(w.dataset.index,10));return}if(r.target.closest("#refreshBtn")){const f=l.getState(),G=W(n),S=G&&(f==null?void 0:f.turn.team)===G.team,A=(f==null?void 0:f.turn.guideLimit)!==null;!!(S&&A&&!(f!=null&&f.gameOver)&&!(f!=null&&f.turnTransition))&&await l.endTurn()}}),L()}export{Ae as initController};
