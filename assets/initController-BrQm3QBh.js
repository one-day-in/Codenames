import{C as j,r as ee,a as te,m as ne,n as re,g as oe,c as ve,p as D,d as ye,i as ke,o as we,f as he,q as ie,s as Y,j as $e,k as be,l as Te}from"./turnTransitionDismiss-3V0qw9kg.js";import{t as P,e as x,I as A,f as Le,h as Re,k as Ce,D as V,m as He,n as Se,o as Me}from"./roomRepository-OgTnR6o4.js";import{r as Pe}from"./entry-PdR0envO.js";function Be(e){const t=P(e);let o=[];function i(){const a=Math.min(window.innerWidth,window.innerHeight),n=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&a<=768&&n<=1024}async function d(){var a;if(i())try{(a=screen.orientation)!=null&&a.lock&&await screen.orientation.lock("portrait")}catch{}}function s(){let a=document.getElementById("orientation-guard");return a||(a=document.createElement("div"),a.id="orientation-guard",a.className="orientation-guard",a.setAttribute("aria-live","polite"),a.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${t.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${t.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(a)),a}function _(){const a=s(),n=window.matchMedia("(orientation: landscape)").matches,m=i()&&n;a.classList.toggle("is-visible",m),document.body.classList.toggle("is-orientation-blocked",m)}const u=()=>{document.visibilityState==="visible"&&(d(),_())},k=()=>_(),c=()=>_();return d(),_(),document.addEventListener("visibilitychange",u),window.addEventListener("resize",k),window.addEventListener("orientationchange",c),o=[()=>document.removeEventListener("visibilitychange",u),()=>window.removeEventListener("resize",k),()=>window.removeEventListener("orientationchange",c)],()=>{o.forEach(a=>a())}}function Ee(e,t){return e==="guide"?t.guide:t.dreamwalker}function Ie(e,t){return e==="guide"?t.controllerGuideHint:t.controllerWalkerHint}function Oe(e){return e==="guide"?A.book:A.eye}function Ge({language:e,presenceState:t,currentPresenceRole:o}){const i=P(e),d=j.filter(n=>t==null?void 0:t[n.presenceRole]).length,s=o===null&&d>0,_=s?i.newGame:i.controllerConnectEyebrow,u=s?i.controllerReconnectTitle:i.controllerConnectTitle,k=s?i.controllerReconnectText:i.controllerConnectText,c=["dissonant","resonant"];function a(n){const m=o===n.presenceRole,b=!!(t!=null&&t[n.presenceRole])&&!m,h=Ee(n.roleType,i),T=Ie(n.roleType,i),L=b?i.roleBusy:m?i.currentRole:i.chooseRoleAction,C=b?"controller-role-picker__state--busy":m?"controller-role-picker__state--current":"controller-role-picker__state--action";return`
            <button
                class="controller-role-picker__btn controller-role-picker__btn--${n.team} controller-role-picker__btn--${n.roleType} ${m?"is-current":""}"
                type="button"
                data-role-type="${n.roleType}"
                data-team="${n.team}"
                ${b?"disabled":""}
            >
                <span class="controller-role-picker__icon" aria-hidden="true">${Oe(n.roleType)}</span>
                <span class="controller-role-picker__role">${h}</span>
                <span class="controller-role-picker__hint">${T}</span>
                <span class="controller-role-picker__state ${C}">${L}</span>
            </button>
        `}return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${s?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${_}</div>
                <h2 class="controller-role-picker__title">${u}</h2>
                <p class="controller-role-picker__text">${k}</p>
                <p class="controller-role-picker__summary">${d} / ${j.length} ${i.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${c.map(n=>{const m=x(n,e),b=j.filter(h=>h.team===n);return`
                            <section class="controller-role-picker__team-column controller-role-picker__team-column--${n}">
                                <h3 class="controller-role-picker__team-title">${m}</h3>
                                <div class="controller-role-picker__team-stack">
                                    ${b.map(a).join("")}
                                </div>
                            </section>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function le({mode:e,title:t,titleMuted:o=!1,metaHtml:i="",boardClassName:d="",boardHtml:s="",footerHtml:_="",overlayHtml:u=""}){return`
        <div class="screen-layout player-screen-layout ${e}-layout">
            <header class="screen-header">
                <div class="player-screen__header">
                    <div class="player-screen__title ${o?"player-screen__title--muted":"player-screen__title--active"}">${t}</div>
                    <div class="player-screen__meta-wrap" aria-live="polite">${i}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="screen-board player-screen__board ${d}">
                    ${s}
                </div>
            </main>

            <footer class="screen-footer player-screen__footer ${e}__footer">
                <div class="player-screen__footer-content">${_}</div>
            </footer>
            ${u}
        </div>
    `}function ae({state:e,lang:t,team:o,maxHintButtons:i,teamEffects:d}){const s=P(t),_=e.turn,u=_.team===o,k=_.guideLimit!==null,c=u&&!k&&!e.gameOver&&!e.turnTransition,a=d.allowTwoWordClue,n=d.forcedGuideLimit,m=d.hideEnemyColors,b=d.hideNightmare,h=x(o,t),T=c?`${s.guide}: ${s.chooseLimit}`:`${s.guide}: ${A.eyeClosed}`,L=[c&&n===1?s.guideForcedOneMove:null,c&&a?s.guideTwoWordClue:null,m?s.guideBlurActive:null,b?s.guideNightmareHidden:null].filter(Boolean),C=L.length?`<div class="player__meta player__meta--detail ${c?"player__meta--active":"player__meta--muted"}">${L.join(" • ")}</div>`:"",E=Array.from({length:i},(H,S)=>{const $=S+1;return`
            <button
                class="guide__num-btn ${_.guideLimit===$?"guide__num-btn--chosen":""}"
                data-limit="${$}"
                ${!c||n!==null&&$!==n?"disabled":""}
            >${$}</button>
        `}).join("");return{teamTitle:h,titleMuted:!c,metaHtml:`
            <div class="player__meta ${c?"player__meta--active":"player__meta--muted"}">${T}</div>
            ${C}
        `,boardHtml:ne({cells:e.cells,getCellClass:H=>re(H,{team:o,effects:d})}),footerHtml:`<div class="guide__btns ${c?"guide__btns--active":"guide__btns--muted"}">${E}</div>`}}function Ae({state:e,lang:t,team:o,maxHintButtons:i,teamEffects:d,suppressedTransitionId:s,controllerRolePickerHtml:_=""}){const u=ae({state:e,lang:t,team:o,maxHintButtons:i,teamEffects:d});return le({mode:"guide",title:u.teamTitle,titleMuted:u.titleMuted,metaHtml:u.metaHtml,boardClassName:`guide guide--${o}`,boardHtml:u.boardHtml,footerHtml:u.footerHtml,overlayHtml:`
            ${ee(e,t,{suppressedTransitionId:s})}
            ${te({state:e,lang:t,team:o})}
            ${_}
        `})}function Ne(e,t){return e.revealed?e.word:`${e.word}, ${t.dreamwalker}`}function se({state:e,lang:t,team:o}){const i=P(t),d=e.turn,s=d.team===o,_=d.guideLimit!==null,u=s&&_&&!e.gameOver&&!e.turnTransition,k=_?Math.max((d.guideLimit??0)-(d.dreamwalkerMoves??0),0):0,c=x(o,t),a=u?`${i.dreamwalker}: <span class="walker__moves-value">${Le(k,t)}</span>`:`${i.dreamwalker}: ${A.eyeClosed}`;return{teamTitle:c,titleMuted:!u,metaHtml:`<div class="${u?"player__meta player__meta--active":"player__meta player__meta--muted"}">${a}</div>`,boardHtml:ne({cells:e.cells,getCellClass:m=>`${oe(m)}${u&&!m.revealed?" cell--clickable":""}`,getAction:m=>({className:u&&!m.revealed?"cell__action--clickable":"",ariaLabel:Ne(m,i),disabled:!u||m.revealed})}),footerHtml:`
            <div class="walker__actions">
                <button class="walker__action-btn walker__refresh-btn ${u?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${i.endTurn}" ${u?"":"disabled"}>
                    <span class="walker__action-label">${i.endTurn}</span>
                    <span class="walker__action-icon">${A.x}</span>
                </button>
            </div>
        `,canPlay:u}}function xe({state:e,lang:t,team:o,suppressedTransitionId:i,controllerRolePickerHtml:d=""}){const s=se({state:e,lang:t,team:o});return le({mode:"walker",title:s.teamTitle,titleMuted:s.titleMuted,metaHtml:s.metaHtml,boardClassName:`walker walker--${o}`,boardHtml:s.boardHtml,footerHtml:s.footerHtml,overlayHtml:`
            ${ee(e,t,{suppressedTransitionId:i})}
            ${te({state:e,lang:t,team:o})}
            ${d}
        `})}function qe(e,t){return!e||!t?!0:e.word!==t.word||e.revealed!==t.revealed||e.role!==t.role||e.imageVariant!==t.imageVariant}function We(e=[],t=[]){const o=Math.max(e.length,t.length),i=[];for(let d=0;d<o;d+=1)qe(e[d],t[d])&&i.push(d);return i}function je(e,t,o){!e||!(o!=null&&o.revealed)||t!=null&&t.revealed||(e.classList.add("cell--reveal-anim"),e.addEventListener("animationend",()=>{e.classList.remove("cell--reveal-anim")},{once:!0}))}function De({grid:e,prevCells:t=[],nextCells:o=[],getCellClass:i,getCellText:d=k=>k.word,shouldWriteIndex:s=!0,refreshAllClasses:_=!1,updateCellElement:u=null}){if(!e)return!1;const k=e.querySelectorAll(".cell");if(k.length!==o.length)return!1;const c=We(t,o);return(_?o.map((n,m)=>m):c).forEach(n=>{const m=k[n],b=t[n],h=o[n];if(!(!m||!h)){if(m.className=i(h,n),s?m.dataset.index=String(n):delete m.dataset.index,c.includes(n)){const T=m.querySelector(".cell__content");T&&(T.textContent=d(h,n))}u==null||u(m,h,n),je(m,b,h)}}),!0}const Z=8;function J(e){return`nw-controller-game:${e}`}function Ve(e){try{return sessionStorage.getItem(J(e))}catch{return null}}function z(e,t){try{t?sessionStorage.setItem(J(e),t):sessionStorage.removeItem(J(e))}catch{}}function ze({team:e,roleType:t}){return!e||e!=="resonant"&&e!=="dissonant"?null:t==="guide"||t==="walker"?ie(t,e):null}function Fe(e,t,o){if(!e)return t.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${x(e.team,o)} ${t.dreamwalker}<br>${t.controllerTaken.replace(`
`,"<br>")}`;const i=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return t[i].replace(`
`,"<br>")}function F(e,t=""){return`<div class="waiting-screen">
        ${t?"":`<p>${P(e).waitingGame}</p>`}
        ${t}
    </div>`}async function Qe(e){var Q,X;const{roomId:t,token:o,team:i,roleType:d}=Re();if(e.innerHTML=F(V),!t||!o){e.innerHTML=`<div class="waiting-screen">
            <p>${P(V).scanQr}</p>
        </div>`;return}const{room:s,error:_}=await Ce(t,o),u=(s==null?void 0:s.language)||V,k=P(u);if(!s||_){e.innerHTML=`<div class="waiting-screen">
            <p>${k.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}Be(u);const c=he(t);await c.init();const a=ve(t);let n=ze({team:i,roleType:d});const m=D(n);n&&await a.isRoleTaken(n)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${Fe(m,k,u)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${k.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(f=>{var l;(l=document.getElementById("forceJoinBtn"))==null||l.addEventListener("click",f,{once:!0})})),n?a.join(n):a.listen(),await ye({presence:a,store:c,role:()=>n});let b=!1,h=new Set,T=Ve(t),L=!n,C=!1,E=0,H=null,S=null,$=null,I=null,O=null;function ce(){C||(C=!0,He())}function G(){C&&(C=!1,Se())}ke(e,()=>{var r;return(r=c.getState())==null?void 0:r.turnTransition},async()=>{await c.forceCompleteTurnTransition()});function q(){b=!1,h=new Set,H=null,S=null,$=null,I=null,O=null}async function de(r){n=r??null,n?await a.setRole(n):await a.setRole(null)}async function U(r,{reopenPickerOnError:f=!1}={}){const l=++E,g=n;ce();try{await de(r)}catch(p){return n=g,f&&(L=!0),G(),Pe("controller:set-role",p),l===E&&M({force:!0}),!1}return l!==E?!1:(M({force:!0}),r||G(),!0)}function ue(r){const f=(r==null?void 0:r.gameId)??null;if(!f){T=null,z(t,null),L=!n;return}if(!n){L=!0;return}if(!T){T=f,z(t,f);return}f!==T&&!L&&(L=!0,q(),U(null,{reopenPickerOnError:!0}))}function W(){return Ge({language:c.getLanguage(),presenceState:a.getPresenceState(),currentPresenceRole:n})}function K(r,f,l){const g=Me(r.teamEffects)[l.team];if(l.roleType==="guide")return{roleType:"guide",viewModel:ae({state:r,lang:f,team:l.team,maxHintButtons:Z,teamEffects:g}),renderMarkup:({pickerHtml:v})=>Ae({state:r,lang:f,team:l.team,maxHintButtons:Z,teamEffects:g,controllerRolePickerHtml:v}),getCellClass:v=>re(v,{team:l.team,effects:g}),updateCellElement:null,animationSelector:".guide .grid .cell"};const p=se({state:r,lang:f,team:l.team});return{roleType:"walker",viewModel:p,renderMarkup:({pickerHtml:v})=>xe({state:r,lang:f,team:l.team,controllerRolePickerHtml:v}),getCellClass:v=>`${oe(v)}${p.canPlay&&!v.revealed?" cell--clickable":""}`,updateCellElement:(v,y,R)=>{const w=v.querySelector(".cell__action");if(!(w instanceof HTMLButtonElement))return;const B=p.canPlay&&!y.revealed;w.className=B?"cell__action cell__action--clickable":"cell__action",w.disabled=!B,w.dataset.index=String(R)},animationSelector:".walker .grid .cell"}}function me(r,f,l,g){return!$||g||r.turnTransition||$.turnTransition||r.gameOver||$.gameOver||S!==f||I!==l.roleType||O!==l.team?!1:Y($.cells)===Y(r.cells)}function fe(r,f,l){const g=e.querySelector(".player-screen__title"),p=e.querySelector(".player-screen__meta-wrap"),v=e.querySelector(".player-screen__footer-content"),y=e.querySelector(`.${l.roleType} .grid`);if(!g||!p||!v||!y)return!1;const R=K(r,f,l),{viewModel:w}=R;return g.textContent=w.teamTitle,g.classList.toggle("player-screen__title--muted",w.titleMuted),g.classList.toggle("player-screen__title--active",!w.titleMuted),p.innerHTML=w.metaHtml,v.innerHTML=w.footerHtml,De({grid:y,prevCells:$==null?void 0:$.cells,nextCells:r.cells,getCellClass:R.getCellClass,refreshAllClasses:!0,updateCellElement:R.updateCellElement})?($=r,H=(r==null?void 0:r.revision)??null,S=f,I=l.roleType,O=l.team,G(),!0):!1}function ge(r,f,l,g){const p=$e(r.cells),v=K(r,f,l);e.innerHTML=v.renderMarkup({pickerHtml:g}),be({root:e,selector:v.animationSelector,currentRevealed:p,prevRevealed:h,hasRenderedBoard:b}),h=p,b=!0,requestAnimationFrame(()=>{Te(e,".grid .cell")}),$=r,H=(r==null?void 0:r.revision)??null,S=f,I=l.roleType,O=l.team,G()}function _e(r,f){document.body.classList.remove("team-resonant","team-dissonant"),q(),G(),e.innerHTML=F(f,W())}function pe(r,f){ue(r);const l=D(n),g=L||!l;if(!l){_e(r,f);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${l.team}`);const p=g?W():"";me(r,f,l,g)&&fe(r,f,l)||ge(r,f,l,p)}function M({state:r,language:f,force:l=!1}={}){const g=r??c.getState(),p=f??c.getLanguage();if(!g){q(),e.innerHTML=F(p,n?"":W());return}const v=(g==null?void 0:g.revision)??null;!l&&H===v&&S===p||pe(g,p)}c.subscribe(r=>M(r)),a.onChange(()=>{(L||!n)&&M({force:!0})}),we(()=>{M({force:!0})}),(X=(Q=document.fonts)==null?void 0:Q.ready)==null||X.then(()=>{M({force:!0})}).catch(()=>{}),e.addEventListener("click",async r=>{if(r.target.closest("[data-transition-dismiss]")){r.preventDefault(),r.stopPropagation(),await c.forceCompleteTurnTransition();return}const l=r.target.closest("[data-controller-role-picker] button[data-role-type][data-team]");if(l){const y=l.dataset.roleType,R=l.dataset.team,w=ie(y,R),B=a.getPresenceState(),N=c.getState();if(B[w]&&n!==w)return;L=!1,T=(N==null?void 0:N.gameId)??null,z(t,T),await U(w,{reopenPickerOnError:!0});return}const g=r.target.closest(".guide__num-btn:not([disabled])");if(g){await c.setGuideLimit(parseInt(g.dataset.limit,10));return}const p=r.target.closest("[data-cell-action]");if(p&&!p.disabled){await c.reveal(parseInt(p.dataset.index,10));return}if(r.target.closest("#refreshBtn")){const y=c.getState(),R=D(n),w=R&&(y==null?void 0:y.turn.team)===R.team,B=(y==null?void 0:y.turn.guideLimit)!==null;!!(w&&B&&!(y!=null&&y.gameOver)&&!(y!=null&&y.turnTransition))&&await c.endTurn()}}),M({force:!0})}export{Qe as initController};
