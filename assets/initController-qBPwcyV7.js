import{C as G,m as ee,e as V,r as K,a as Q,g as ne,c as te,p as F,d as ie,i as re,o as ae,f as oe,n as B,j as z,k as D,q as se,l as le}from"./turnTransitionDismiss-BTI9Gczb.js";import{t as R,e as M,I as H,f as ce,h as de,k as ue,D as J,n as me}from"./roomRepository-Bf7V19CF.js";import"./entry-CdN95i17.js";function ge(e){const n=R(e);let s=[];function l(){const r=Math.min(window.innerWidth,window.innerHeight),i=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&r<=768&&i<=1024}async function m(){var r;if(l())try{(r=screen.orientation)!=null&&r.lock&&await screen.orientation.lock("portrait")}catch{}}function d(){let r=document.getElementById("orientation-guard");return r||(r=document.createElement("div"),r.id="orientation-guard",r.className="orientation-guard",r.setAttribute("aria-live","polite"),r.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(r)),r}function g(){const r=d(),i=window.matchMedia("(orientation: landscape)").matches,k=l()&&i;r.classList.toggle("is-visible",k),document.body.classList.toggle("is-orientation-blocked",k)}const u=()=>{document.visibilityState==="visible"&&(m(),g())},v=()=>g(),a=()=>g();return m(),g(),document.addEventListener("visibilitychange",u),window.addEventListener("resize",v),window.addEventListener("orientationchange",a),s=[()=>document.removeEventListener("visibilitychange",u),()=>window.removeEventListener("resize",v),()=>window.removeEventListener("orientationchange",a)],()=>{s.forEach(r=>r())}}function ve(e,n){return e==="guide"?n.guide:n.dreamwalker}function _e({language:e,presenceState:n,currentPresenceRole:s}){const l=R(e),m=G.filter(a=>n==null?void 0:n[a.presenceRole]).length,d=s===null&&m>0,g=d?l.newGame:l.controllerConnectEyebrow,u=d?l.controllerReconnectTitle:l.controllerConnectTitle,v=d?l.controllerReconnectText:l.controllerConnectText;return`
        <div class="controller-role-picker" data-controller-role-picker>
            <div class="controller-role-picker__panel ${d?"controller-role-picker__panel--reconnect":""}">
                <div class="controller-role-picker__eyebrow">${g}</div>
                <h2 class="controller-role-picker__title">${u}</h2>
                <p class="controller-role-picker__text">${v}</p>
                <p class="controller-role-picker__summary">${m} / ${G.length} ${l.waitingPlayers}</p>
                <div class="controller-role-picker__grid">
                    ${G.map(a=>{const r=s===a.presenceRole,i=!!(n!=null&&n[a.presenceRole])&&!r,k=M(a.team,e),_=ve(a.roleType,l);return`
                            <button
                                class="controller-role-picker__btn controller-role-picker__btn--${a.team} ${r?"is-current":""}"
                                type="button"
                                data-role-type="${a.roleType}"
                                data-team="${a.team}"
                                ${i?"disabled":""}
                            >
                                <span class="controller-role-picker__team">${k}</span>
                                <span class="controller-role-picker__role">${_}</span>
                                <span class="controller-role-picker__state">${i?l.roleBusy:r?l.currentRole:l.chooseRoleAction}</span>
                            </button>
                        `}).join("")}
                </div>
            </div>
        </div>
    `}function ke({state:e,lang:n,team:s,maxHintButtons:l,teamEffects:m,suppressedTransitionId:d,controllerRolePickerHtml:g=""}){const u=R(n),v=e.turn,a=v.team===s,r=v.guideLimit!==null,i=a&&!r&&!e.gameOver&&!e.turnTransition,k=m.allowTwoWordClue,_=m.forcedGuideLimit,f=m.hideEnemyColors,w=m.hideNightmare,y=M(s,n),h=i?`${u.guide}: ${u.chooseLimit}`:`${u.guide}: ${H.eyeClosed}`,C=[i&&_===1?u.guideForcedOneMove:null,i&&k?u.guideTwoWordClue:null,f?u.guideBlurActive:null,w?u.guideNightmareHidden:null].filter(Boolean),x=C.length?`<div class="guide__meta ${i?"guide__meta--active":"guide__meta--muted"}">${C.join(" • ")}</div>`:"",A=Array.from({length:l},(b,T)=>{const S=T+1;return`
            <button
                class="guide__num-btn ${v.guideLimit===S?"guide__num-btn--chosen":""}"
                data-limit="${S}"
                ${!i||_!==null&&S!==_?"disabled":""}
            >${S}</button>
        `}).join("");return`
        <div class="screen-layout guide-layout">
            <header class="screen-header">
                <div class="guide__header">
                    <div class="guide__title ${i?"guide__title--active":"guide__title--muted"}">${y}</div>
                    <div class="guide__meta ${i?"guide__meta--active":"guide__meta--muted"}">${h}</div>
                    ${x}
                    <div class="guide__btns ${i?"guide__btns--active":"guide__btns--muted"}">${A}</div>
                </div>
            </header>

            <main class="screen-body">
                <div class="guide guide--${s}">
                    <div class="grid grid--5">
                        ${e.cells.map((b,T)=>`
                            <div class="${ee(b,{team:s,effects:m})}" data-index="${T}">
                                <span class="cell__content">${V(b.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer guide__footer"></footer>
            ${K(e,n,{suppressedTransitionId:d})}
            ${Q({state:e,lang:n,team:s})}
            ${g}
        </div>
    `}function fe({state:e,lang:n,team:s,suppressedTransitionId:l,controllerRolePickerHtml:m=""}){const d=R(n),g=e.turn,u=g.team===s,v=g.guideLimit!==null,a=u&&v&&!e.gameOver&&!e.turnTransition,r=v?Math.max((g.guideLimit??0)-(g.dreamwalkerMoves??0),0):0,i=M(s,n),k=a?`${d.dreamwalker}: <span class="walker__moves-value">${ce(r,n)}</span>`:`${d.dreamwalker}: ${H.eyeClosed}`;return`
        <div class="screen-layout walker-layout">
            <header class="screen-header">
                <div class="walker__title ${a?"walker__title--active":"walker__title--muted"}">${i}</div>
                <div class="walker__header">
                    <div class="walker__meta">
                        <div class="${a?"walker__status walker__status--active":"walker__status walker__status--muted"}">${k}</div>
                        <div class="walker__actions">
                            <span class="walker__end-hint">${d.endTurn}</span>
                            <button class="walker__action-btn walker__refresh-btn ${a?"walker__refresh-btn--active":"walker__refresh-btn--muted"}" id="refreshBtn" aria-label="${d.endTurn}" ${a?"":"disabled"}>${H.x}</button>
                        </div>
                    </div>
                </div>
            </header>

            <main class="screen-body">
                <div class="walker walker--${s}">
                    <div class="grid grid--5">
                        ${e.cells.map((f,w)=>`
                            <div
                                class="${ne(f)} ${a&&!f.revealed?"cell--clickable":""}"
                                data-index="${w}"
                            >
                                <span class="cell__content">${V(f.word)}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </main>

            <footer class="screen-footer walker__footer"></footer>
            ${K(e,n,{suppressedTransitionId:l})}
            ${Q({state:e,lang:n,team:s})}
            ${m}
        </div>
    `}const pe=8;function O(e){return`nw-controller-game:${e}`}function we(e){try{return sessionStorage.getItem(O(e))}catch{return null}}function I(e,n){try{n?sessionStorage.setItem(O(e),n):sessionStorage.removeItem(O(e))}catch{}}function $e({team:e,roleType:n}){if(!e||e!=="resonant"&&e!=="dissonant")return null;if(n==="guide"||n==="walker")return B(n,e);const s=window.location.pathname.split("/").pop();return s==="guide.html"?B("guide",e):s==="walker.html"?B("walker",e):null}function he(e,n,s){if(!e)return n.controllerTaken.replace(`
`,"<br>");if(e.roleType==="walker")return`${M(e.team,s)} ${n.dreamwalker}<br>${n.controllerTaken.replace(`
`,"<br>")}`;const l=e.team==="resonant"?"miniTakenResonant":"miniTakenDissonant";return n[l].replace(`
`,"<br>")}function U(e,n=""){return`<div class="waiting-screen">
        ${n?"":`<p>${R(e).waitingGame}</p>`}
        ${n}
    </div>`}async function Le(e){const{roomId:n,token:s,team:l,roleType:m}=de();if(!n||!s){e.innerHTML=`<div class="waiting-screen">
            <p>${R(J).scanQr}</p>
        </div>`;return}const{room:d,error:g}=await ue(n,s),u=(d==null?void 0:d.language)||J,v=R(u);if(!d||g){e.innerHTML=`<div class="waiting-screen">
            <p>${v.wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}ge(u);const a=oe(n);await a.init();const r=te(n);let i=$e({team:l,roleType:m});const k=F(i);i&&await r.isRoleTaken(i)&&(e.innerHTML=`
                <div class="waiting-screen">
                    <div class="taken-screen">
                        <p class="taken-screen__icon">🔒</p>
                        <p class="taken-screen__text">${he(k,v,u)}</p>
                        <button class="ui-btn" id="forceJoinBtn">${v.forceRejoin}</button>
                    </div>
                </div>`,await new Promise(o=>{var c;(c=document.getElementById("forceJoinBtn"))==null||c.addEventListener("click",o,{once:!0})})),i?r.join(i):r.listen(),await ie({presence:r,store:a,role:()=>i});let _=!1,f=new Set,w=null,y=we(n),h=!i;re(e,()=>{var t;return(t=a.getState())==null?void 0:t.turnTransition},async()=>{var o;const t=(o=a.getState())==null?void 0:o.turnTransition;t!=null&&t.id&&(w=t.id,L()),await a.dismissTurnTransition()});function C(){_=!1,f=new Set,w=null}async function x(t){i=t??null,i?await r.setRole(i):await r.setRole(null)}function A(t){const o=(t==null?void 0:t.gameId)??null;if(!o){y=null,I(n,null),h=!i;return}if(!i){h=!0;return}if(!y){y=o,I(n,o);return}o!==y&&!h&&(h=!0,C(),x(null).then(()=>L()))}function b(){return _e({language:a.getLanguage(),presenceState:r.getPresenceState(),currentPresenceRole:i})}function T(t){e.querySelectorAll("[data-controller-role-picker] button[data-role-type][data-team]").forEach(o=>{o.addEventListener("click",async()=>{const c=o.dataset.roleType,$=o.dataset.team,p=B(c,$);r.getPresenceState()[p]&&i!==p||(h=!1,y=(t==null?void 0:t.gameId)??null,I(n,y),await x(p),L())})})}function S(t,o,c,$){const p=me(t.teamEffects)[c.team],E=z(t.cells);e.innerHTML=ke({state:t,lang:o,team:c.team,maxHintButtons:pe,teamEffects:p,suppressedTransitionId:w,controllerRolePickerHtml:$}),D({root:e,selector:".guide .grid .cell",currentRevealed:E,prevRevealed:f,hasRenderedBoard:_}),f=E,_=!0,requestAnimationFrame(()=>{e.querySelectorAll(".cell").forEach(P=>se(P))}),e.querySelectorAll(".guide__num-btn:not([disabled])").forEach(P=>{P.addEventListener("click",()=>a.setGuideLimit(parseInt(P.dataset.limit,10)))}),T(t)}function N(t,o,c,$){var W;const p=z(t.cells),E=t.turn,P=E.team===c.team,Y=E.guideLimit!==null,Z=P&&Y&&!t.gameOver&&!t.turnTransition;e.innerHTML=fe({state:t,lang:o,team:c.team,suppressedTransitionId:w,controllerRolePickerHtml:$}),D({root:e,selector:".walker .grid .cell",currentRevealed:p,prevRevealed:f,hasRenderedBoard:_}),f=p,_=!0,requestAnimationFrame(()=>le(e)),e.querySelectorAll(".cell--clickable").forEach(q=>{q.addEventListener("click",()=>a.reveal(parseInt(q.dataset.index,10)))}),(W=document.getElementById("refreshBtn"))==null||W.addEventListener("click",()=>{Z&&a.endTurn()}),T(t)}function j(t,o){document.body.classList.remove("team-resonant","team-dissonant"),C(),e.innerHTML=U(o,b()),T(t)}function X(t,o){A(t),(!t.turnTransition||t.turnTransition.id!==w)&&(w=null);const c=F(i),$=h||!c;if(!c){j(t,o);return}document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${c.team}`);const p=$?b():"";if(c.roleType==="guide"){S(t,o,c,p);return}N(t,o,c,p)}function L({state:t,language:o}={}){const c=t??a.getState(),$=o??a.getLanguage();if(!c){C(),e.innerHTML=U($,i?"":b()),i||T(null);return}X(c,$)}a.subscribe(L),r.onChange(()=>{(h||!i)&&L()}),ae(()=>L()),L()}export{Le as initController};
