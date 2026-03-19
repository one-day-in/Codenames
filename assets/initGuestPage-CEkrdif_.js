import{c as f,d as L,f as k,R as m}from"./revealedCells-Bi9BEOTE.js";import{t as g,d as w,D as b,b as E}from"./url-DAL9jQbt.js";import{a as y}from"./roomRepository-CD0Cuu1e.js";function G(i,n){var a;(a=i.querySelector(".turn-transition-overlay"))==null||a.addEventListener("click",()=>{n()})}function T(i){const n=g(i);let a=[];async function r(){var e;try{(e=screen.orientation)!=null&&e.lock&&await screen.orientation.lock("portrait")}catch{}}function d(){let e=document.getElementById("orientation-guard");return e||(e=document.createElement("div"),e.id="orientation-guard",e.className="orientation-guard",e.setAttribute("aria-live","polite"),e.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(e)),e}function t(){const e=d(),c=window.matchMedia("(orientation: landscape)").matches;e.classList.toggle("is-visible",c),document.body.classList.toggle("is-orientation-blocked",c)}const o=()=>{document.visibilityState==="visible"&&(r(),t())},l=()=>t(),s=()=>t();return r(),t(),document.addEventListener("visibilitychange",o),window.addEventListener("resize",l),window.addEventListener("orientationchange",s),a=[()=>document.removeEventListener("visibilitychange",o),()=>window.removeEventListener("resize",l),()=>window.removeEventListener("orientationchange",s)],()=>{a.forEach(e=>e())}}function _(i,n){return i==="guide"?n==="resonant"?m.GUIDE_RESONANT:m.GUIDE_DISSONANT:n==="resonant"?m.WALKER_RESONANT:m.WALKER_DISSONANT}function R(i,n,a,r){return i==="walker"?`${E(n,r)} ${a.dreamwalker}<br>${a.controllerTaken.replace(`
`,"<br>")}`:a[n==="resonant"?"miniTakenResonant":"miniTakenDissonant"].replace(`
`,"<br>")}async function $(i,{roleType:n,invalidParamsHtml:a}){const{roomId:r,token:d,team:t}=w();if(!r||!d||!t||t!=="resonant"&&t!=="dissonant")return i.innerHTML=a,null;const{room:o,error:l}=await y(r,d),s=(o==null?void 0:o.language)||b,e=g(s);if(!o||l)return i.innerHTML=`<div class="waiting-screen">
            <p>${e.wrongLink.replace(`
`,"<br>")}</p>
        </div>`,null;const c=_(n,t),u=L(r);await u.isRoleTaken(c)&&(i.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${R(n,t,e,s)}</p>
                    <button class="ui-btn" id="forceJoinBtn">${e.forceRejoin}</button>
                </div>
            </div>`,await new Promise(p=>{document.getElementById("forceJoinBtn").addEventListener("click",p,{once:!0})})),u.join(c),T(s),document.body.classList.add(`team-${t}`);const v=k(r);return await v.init(),await f({presence:u,store:v,role:c}),{presence:u,store:v,team:t,roomId:r}}export{G as b,$ as i};
