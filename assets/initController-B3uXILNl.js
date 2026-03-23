import{C as Z,m as ee,e as U,r as V,a as K,g as ne,c as te,p as q,d as ie,i as re,o as ae,f as se,n as M,j as F,k as z,q as oe,l as le}from"./turnTransitionDismiss-B1Bb-vQf.js";import{t as R,e as x,I as H,f as ce,h as de,k as ue,D,n as me}from"./roomRepository-CR-8Ocs6.js";import"./entry-Bz3QOVsC.js";function ge(e){const n=R(e);let o=[];function u(){const r=Math.min(window.innerWidth,window.innerHeight),i=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&r<=768&&i<=1024}async function l(){var r;if(u())try{(r=screen.orientation)!=null&&r.lock&&await screen.orientation.lock("portrait")}catch{}}function m(){let r=document.getElementById("orientation-guard");return r||(r=document.createElement("div"),r.id="orientation-guard",r.className="orientation-guard",r.setAttribute("aria-live","polite"),r.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(r)),r}function g(){const r=m(),i=window.matchMedia("(orientation: landscape)").matches,h=u()&&i;r.classList.toggle("is-visible",h),document.body.classList.toggle("is-orientation-blocked",h)}const d=()=>{document.visibilityState==="visible"&&(l(),g())},v=()=>g(),s=()=>g();return l(),g(),document.addEventListener("visibilitychange",d),window.addEventListener("resize",v),window.addEventListener("orientationchange",s),o=[()=>document.removeEventListener("visibilitychange",d),()=>window.removeEventListener("resize",v),()=>window.removeEventListener("orientationchange",s)],()=>{o.forEach(r=>r())}}function ve(e,n){return e==="guide"?n.guide:n.dreamwalker}function _e({language:e,presenceState:n,currentPresenceRole:o}){const u=R(e);return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel">
                <div class="controller-role-picker__eyebrow">${u.newGame}</div>
                <h2 class="controller-role-picker__title">${u.chooseControllerRole}</h2>
                <div class="controller-role-picker__grid">
                    ${Z.map(l=>{const m=o===l.presenceRole,g=!!(n!=null&&n[l.presenceRole])&&!m,d=x(l.team,e),v=ve(l.roleType,u);return`
                            <button
                                class="controller-role-picker__btn controller-role-picker__btn--${l.team} ${m?"is-current":""}"
                                type="button"
                                data-role-type="${l.roleType}"
                                data-team="${l.team}"
                                ${g?"disabled":""}
                            >
                                <span class="controller-role-picker__team">${d}</span>
                                <span class="controller-role-picker__role">${v}</span>
                                <span class="controller-role-picker__state">${g?u.roleBusy:m?u.currentRole:u.chooseRoleAction}</span>
                            </button>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function fe({state:e,lang:n,team:o,maxHintButtons:u,teamEffects:l,suppressedTransitionId:m,controllerRolePickerHtml:g=""}){const d=R(n),v=e.turn,s=v.team===o,r=v.guideLimit!==null,i=s&&!r&&!e.gameOver&&!e.turnTransition,h=l.allowTwoWordClue,k=l.forcedGuideLimit,_=l.hideEnemyColors,p=l.hideNightmare,y=x(o,n),$=i?`${d.guide}: ${d.chooseLimit}`:`${d.guide}: ${H.eyeClosed}`,S=[i&&k===1?d.guideForcedOneMove:null,i&&h?d.guideTwoWordClue:null,_?d.guideBlurActive:null,p?d.guideNightmareHidden:null].filter(Boolean),B=S.length?`<div class="guide__meta ${i?"guide__meta--active":"guide__meta--muted"}">${S.join(" • ")}</div>`:"",A=Array.from({length:u},(b,T)=>{const C=T+1;return`
            <button
                class="guide__num-btn ${v.guideLimit===C?"guide__num-btn--chosen":""}"
                data-limit="${C}"
                ${!i||k!==null&&C!==k?"disabled":""}
            >${C}</button>
        `}).join("");return`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${i?"guide__title--active":"guide__title--muted"}">${y}</div>
                    <div class="guide__meta ${i?"guide__meta--active":"guide__meta--muted"}">${$}</div>
                    ${B}
                    <div class="guide__btns ${i?"guide__btns--active":"guide__btns--muted"}">${A}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${o}">
                    <div class="grid grid--5">
                        ${e.cells.map((b,T)=>`
                            <div class="${ee(b,{team:o,effects:l})}" data-index="${T}">
                                <span class="cell__content">${U(b.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${V(e,n,{suppressedTransitionId:m})}
            ${K({state:e,lang:n,team:o})}
            ${g}
        </div>
    `}function ke({state:e,lang:n,team:o,suppressedTransitionId:u,controllerRolePickerHtml:l=""}){const m=R(n),g=e.turn,d=g.team===o,v=g.guideLimit!==null,s=d&&v&&!e.gameOver&&!e.turnTransition,r=v?Math.max((g.guideLimit??0)-(g.dreamwalkerMoves??0),0):0,i=x(o,n),h=s?`${m.dreamwalker}: <span class="walker__moves-value">${ce(r,n)}</span>`:`${m.dreamwalker}: ${H.eyeClosed}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__title ${s?"walker__title--active":"walker__title--muted"}">${i}</div>
                <div class="walker__header">
                    <div class="walker__meta">
                        <div class="${s?"walker__status walker__status--active":"walker__status walker__status--muted"}">${h}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${m.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${s?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${m.endTurn}" ${s?"":"disabled"}>${H.x}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${o}">
                    <div class="grid grid--5">
                        ${e.cells.map((_,p)=>`
                            <div
                                class="${ne(_)} ${s&&!_.revealed?"cell--clickable":""}"
                                data-index="${p}"
                            >
                                <span class="cell__content">${U(_.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${V(e,n,{suppressedTransitionId:u})}
            ${K({state:e,lang:n,team:o})}
            ${l}
        </div>
    `}const pe=8;function I(e){return`nw-controller-game:${e}`}function we(e){try{return sessionStorage.getItem(I(e))}catch{return null}}function G(e,n){try{n?sessionStorage.setItem(I(e),n):sessionStorage.removeItem(I(e))}catch{}}function he({team:e,roleType:n}){if(!e||e!=="resonant"&&e!=="dissonant")return null;if(n==="guide"||n==="walker")return M(n,e);const o=window.location.pathname.split("/").pop();return o==="guide.html"?M("guide",e):o==="walker.html"?M("walker",e):null}function $e(e,n,o){if(!e)return n.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${x(e.team,o)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const u=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[u].replace(`
`,"<br>")}function J(e,n=""){return`<div class="waiting-screen">
        <p>${R(e).waitingGame}</p>
        ${n}
    </div>`}async function Le(e){const{roomId:n,token:o,team:u,roleType:l}=de();if(!n||!o){e.innerHTML=`<div class="waiting-screen">
            <p>${R(D).scanQr}</p>
        </div>`;return}const{room:m,error:g}=await ue(n,o),d=(m==null?void 0:m.language)||D,v=R(d);if(!m||g){e.innerHTML=`<div class="waiting-screen">
            <p>${v.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}ge(d);const s=se(n);await s.init();const r=te(n);let i=he({team:u,roleType:l});const h=q(i);i&&await r.isRoleTaken(i)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${$e(h,v,d)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${v.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(a=>{var c;(c=document.getElementById("forceJoinBtn"))==null||c.addEventListener("click",a,{once:!0})})),i?r.join(i):r.listen(),await ie({presence:r,store:s,role:()=>i});let k=!1,_=new Set,p=null,y=we(n),$=!i;re(e,()=>{var t;return(t=s.getState())==null?void 0:t.turnTransition},async()=>{var a;const t=(a=s.getState())==null?void 0:a.turnTransition;t!=null&&t.id&&(p=t.id,L()),await s.dismissTurnTransition()});function S(){k=!1,_=new Set,p=null}async function B(t){i=t??null,i?await r.setRole(i):await r.setRole(null)}function A(t){const a=(t==null?void 0:t.gameId)??null;if(!a){y=null,G(n,null),$=!i;return}if(!i){$=!0;return}if(!y){y=a,G(n,a);return}a!==y&&!$&&($=!0,S(),B(null).then(()=>L()))}function b(){return _e({language:s.getLanguage(),presenceState:r.getPresenceState(),currentPresenceRole:i})}function T(t){e.querySelectorAll("[data-controller-role-picker] button[data-role-type][data-team]").forEach(a=>{a.addEventListener("click",async()=>{const c=a.dataset.roleType,w=a.dataset.team,f=M(c,w);r.getPresenceState()[f]&&i!==f||($=!1,y=(t==null?void 0:t.gameId)??null,G(n,y),await B(f),L())})})}function C(t,a,c,w){const f=me(t.teamEffects)[c.team],P=F(t.cells);e.innerHTML=fe({state:t,lang:a,team:c.team,maxHintButtons:pe,teamEffects:f,suppressedTransitionId:p,controllerRolePickerHtml:w}),z({root:e,selector:".guide .grid .cell",currentRevealed:P,prevRevealed:_,hasRenderedBoard:k}),_=P,k=!0,requestAnimationFrame(()=>{e.querySelectorAll(".cell").forEach(E=>oe(E))}),e.querySelectorAll(".guide__num-btn:not([disabled])").forEach(E=>{E.addEventListener("click",()=>s.setGuideLimit(parseInt(E.dataset.limit,10)))}),T(t)}function O(t,a,c,w){var j;const f=F(t.cells),P=t.turn,E=P.team===c.team,X=P.guideLimit!==null,Y=E&&X&&!t.gameOver&&!t.turnTransition;e.innerHTML=ke({state:t,lang:a,team:c.team,suppressedTransitionId:p,controllerRolePickerHtml:w}),z({root:e,selector:".walker .grid .cell",currentRevealed:f,prevRevealed:_,hasRenderedBoard:k}),_=f,k=!0,requestAnimationFrame(()=>le(e)),e.querySelectorAll(".cell--clickable").forEach(W=>{W.addEventListener("click",()=>s.reveal(parseInt(W.dataset.index,10)))}),(j=document.getElementById("refreshBtn"))==null||j.addEventListener("click",()=>{Y&&s.endTurn()}),T(t)}function N(t,a){document.body.classList.remove("team-resonant","team-dissonant"),S(),e.innerHTML=J(a,b()),T(t)}function Q(t,a){A(t),(!t.turnTransition||t.turnTransition.id!==p)&&(p=null);const c=q(i),w=$||!c;if(!c){N(t,a);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${c.team}`);const f=w?b():"";if(c.roleType==="guide"){C(t,a,c,f);return}O(t,a,c,f)}function L({state:t,language:a}={}){const c=t??s.getState(),w=a??s.getLanguage();if(!c){S(),e.innerHTML=J(w,i?"":b()),i||T(null);return}Q(c,w)}s.subscribe(L),r.onChange(()=>{($||!i)&&L()}),ae(()=>L()),L()}export{Le as initController};
