import{t as v,b,s as k,D as f,d as w}from"./url-BIkxZ66a.js";import{a as L,c as y,b as E,R as g}from"./sanitize-I6H9SzNB.js";function _(a){const t=v(a);let o=[];async function i(){var e;try{(e=screen.orientation)!=null&&e.lock&&await screen.orientation.lock("portrait")}catch{}}function d(){let e=document.getElementById("orientation-guard");return e||(e=document.createElement("div"),e.id="orientation-guard",e.className="orientation-guard",e.setAttribute("aria-live","polite"),e.innerHTML=`
                <div class="orientation-guard__content">
                    <p class="orientation-guard__title">${t.rotatePortraitTitle}</p>
                    <p class="orientation-guard__text">${t.rotatePortraitText}</p>
                </div>
            `,document.body.appendChild(e)),e}function n(){const e=d(),c=window.matchMedia("(orientation: landscape)").matches;e.classList.toggle("is-visible",c),document.body.classList.toggle("is-orientation-blocked",c)}const r=()=>{document.visibilityState==="visible"&&(i(),n())},l=()=>n(),s=()=>n();return i(),n(),document.addEventListener("visibilitychange",r),window.addEventListener("resize",l),window.addEventListener("orientationchange",s),o=[()=>document.removeEventListener("visibilitychange",r),()=>window.removeEventListener("resize",l),()=>window.removeEventListener("orientationchange",s)],()=>{o.forEach(e=>e())}}function T(a,t){return a==="guide"?t==="resonant"?g.GUIDE_RESONANT:g.GUIDE_DISSONANT:t==="resonant"?g.WALKER_RESONANT:g.WALKER_DISSONANT}function R(a,t,o,i){return a==="walker"?`${w(t,i)} ${o.dreamwalker}<br>${o.controllerTaken.replace(`
`,"<br>")}`:o[t==="resonant"?"miniTakenResonant":"miniTakenDissonant"].replace(`
`,"<br>")}async function A(a,{roleType:t,invalidParamsHtml:o}){const{roomId:i,token:d,team:n}=b();if(!i||!d||!n||n!=="resonant"&&n!=="dissonant")return a.innerHTML=o,null;const{data:r,error:l}=await k.from("rooms").select("id, guest_token, language").eq("id",i).eq("guest_token",d).maybeSingle(),s=(r==null?void 0:r.language)||f,e=v(s);if(!r||l)return a.innerHTML=`<div class="waiting-screen">
            <p>${e.wrongLink.replace(`
`,"<br>")}</p>
        </div>`,null;const c=T(t,n),u=y(i);await u.isRoleTaken(c)&&(a.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${R(t,n,e,s)}</p>
                    <button class="lobby__btn" id="forceJoinBtn">${e.forceRejoin}</button>
                </div>
            </div>`,await new Promise(p=>{document.getElementById("forceJoinBtn").addEventListener("click",p,{once:!0})})),u.join(c),_(s),document.body.classList.add(`team-${n}`);const m=E(i);return await m.init(),await L({presence:u,store:m,role:c}),{presence:u,store:m,team:n,roomId:i}}export{A as i};
