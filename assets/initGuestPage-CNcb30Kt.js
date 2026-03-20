import{c as f,d as h,f as k,b as g}from"./turnTransitionDismiss-phu5bpkv.js";import{t as p,d as L,D as b,b as E}from"./url-Qg2x4s1h.js";import{a as y}from"./roomRepository-DwKmHnBd.js";function T(i){const n=p(i);let r=[];function t(){const e=Math.min(window.innerWidth,window.innerHeight),s=Math.max(window.innerWidth,window.innerHeight);return window.matchMedia("(pointer: coarse)").matches&&e<=768&&s<=1024}async function c(){var e;if(t())try{(e=screen.orientation)!=null&&e.lock&&await screen.orientation.lock("portrait")}catch{}}function o(){let e=document.getElementById("orientation-guard");return e||(e=document.createElement("div"),e.id="orientation-guard",e.className="orientation-guard",e.setAttribute("aria-live","polite"),e.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${n.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${n.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(e)),e}function a(){const e=o(),s=window.matchMedia("(orientation: landscape)").matches,m=t()&&s;e.classList.toggle("is-visible",m),document.body.classList.toggle("is-orientation-blocked",m)}const u=()=>{document.visibilityState==="visible"&&(c(),a())},d=()=>a(),l=()=>a();return c(),a(),document.addEventListener("visibilitychange",u),window.addEventListener("resize",d),window.addEventListener("orientationchange",l),r=[()=>document.removeEventListener("visibilitychange",u),()=>window.removeEventListener("resize",d),()=>window.removeEventListener("orientationchange",l)],()=>{r.forEach(e=>e())}}function _(i,n){return i==="guide"?n==="resonant"?g.GUIDE_RESONANT:g.GUIDE_DISSONANT:n==="resonant"?g.WALKER_RESONANT:g.WALKER_DISSONANT}function R(i,n,r,t){return i==="walker"?`${E(n,t)} ${r.dreamwalker}<br>${r.controllerTaken.replace(`
`,"<br>")}`:r[n==="resonant"?"miniTakenResonant":"miniTakenDissonant"].replace(`
`,"<br>")}async function P(i,{roleType:n,invalidParamsHtml:r}){const{roomId:t,token:c,team:o}=L();if(!t||!c||!o||o!=="resonant"&&o!=="dissonant")return i.innerHTML=r,null;const{room:a,error:u}=await y(t,c),d=(a==null?void 0:a.language)||b,l=p(d);if(!a||u)return i.innerHTML=`<div class="waiting-screen">
            <p>${l.wrongLink.replace(`
`,"<br>")}</p>
        </div>`,null;const e=_(n,o),s=h(t);await s.isRoleTaken(e)&&(i.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${R(n,o,l,d)}</p>
                    <button class="ui-btn" id="forceJoinBtn">${l.forceRejoin}</button>
                </div>
            </div>`,await new Promise(v=>{document.getElementById("forceJoinBtn").addEventListener("click",v,{once:!0})})),s.join(e),T(d),document.body.classList.add(`team-${o}`);const w=k(t);return await w.init(),await f({presence:s,store:w,role:e}),{presence:s,store:w,team:o,roomId:t}}export{P as i};
