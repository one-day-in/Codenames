import{a as v,s as b,t as u,D as w}from"./url-DqvqMluG.js";import{d as L,c as _,R as c}from"./presence-D0FYVyKi.js";async function k(){if(!("wakeLock"in navigator))return null;try{return await navigator.wakeLock.request("screen")}catch{return null}}async function y(n,e){let t=await k();document.addEventListener("visibilitychange",async()=>{if(document.visibilityState==="visible"&&(t!=null&&t.released&&(t=await k()),e))try{n.leave(),n.join(e)}catch{}}),window.addEventListener("online",()=>{if(e)try{n.leave(),n.join(e)}catch{}})}function A(n){let e=window.innerWidth,t=window.innerHeight;const a=new ResizeObserver(()=>{const r=window.innerWidth,i=window.innerHeight;(r!==e||i!==t)&&(e=r,t=i,n())});return a.observe(document.documentElement),()=>a.disconnect()}function E(n,e){return n==="guide"?e==="resonant"?c.GUIDE_RESONANT:c.GUIDE_DISSONANT:e==="resonant"?c.WALKER_RESONANT:c.WALKER_DISSONANT}function h(n,e,t){return n==="walker"?`${e} ${t.dreamwalker}<br>${t.controllerTaken.replace(`
`,"<br>")}`:t[e==="resonant"?"miniTakenResonant":"miniTakenDissonant"].replace(`
`,"<br>")}async function S(n,{roleType:e,invalidParamsHtml:t}){const{roomId:a,token:r,team:i}=v();if(!a||!r||!i||i!=="resonant"&&i!=="dissonant")return n.innerHTML=t,null;const{data:f,error:m}=await b.from("rooms").select("id, guest_token").eq("id",a).eq("guest_token",r).maybeSingle();if(!f||m){const o=u(w);return n.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${o.wrongLink.replace(`
`,"<br>")}</p>
        </div>`,null}const d=E(e,i),s=L(a);if(await s.isRoleTaken(d)){const o=u(w);n.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${h(e,i,o)}</p>
                    <button class="lobby__btn" id="forceJoinBtn">${o.forceRejoin}</button>
                </div>
            </div>`,await new Promise(g=>{document.getElementById("forceJoinBtn").addEventListener("click",g,{once:!0})})}s.join(d),y(s,d),document.body.classList.add(`team-${i}`);const l=_(a);return await l.init(),{presence:s,store:l,team:i,roomId:a}}export{S as i,A as o};
