import{a as f,s as b,t as u,D as k}from"./url-DqvqMluG.js";import{k as p,c as _,a as T,R as c}from"./keepAlive-hefo0P0Z.js";function h(t){let e=window.innerWidth,s=window.innerHeight;const i=new ResizeObserver(()=>{const r=window.innerWidth,n=window.innerHeight;(r!==e||n!==s)&&(e=r,s=n,t())});return i.observe(document.documentElement),()=>i.disconnect()}function E(t,e){return t==="guide"?e==="resonant"?c.GUIDE_RESONANT:c.GUIDE_DISSONANT:e==="resonant"?c.WALKER_RESONANT:c.WALKER_DISSONANT}function R(t,e,s){return t==="walker"?`${e} ${s.dreamwalker}<br>${s.controllerTaken.replace(`
`,"<br>")}`:s[e==="resonant"?"miniTakenResonant":"miniTakenDissonant"].replace(`
`,"<br>")}async function N(t,{roleType:e,invalidParamsHtml:s}){const{roomId:i,token:r,team:n}=f();if(!i||!r||!n||n!=="resonant"&&n!=="dissonant")return t.innerHTML=s,null;const{data:m,error:w}=await b.from("rooms").select("id, guest_token").eq("id",i).eq("guest_token",r).maybeSingle();if(!m||w){const o=u(k);return t.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${o.wrongLink.replace(`
`,"<br>")}</p>
        </div>`,null}const d=E(e,n),a=_(i);if(await a.isRoleTaken(d)){const o=u(k);t.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${R(e,n,o)}</p>
                    <button class="lobby__btn" id="forceJoinBtn">${o.forceRejoin}</button>
                </div>
            </div>`,await new Promise(g=>{document.getElementById("forceJoinBtn").addEventListener("click",g,{once:!0})})}a.join(d),p(a,d),document.body.classList.add(`team-${n}`);const l=T(i);return await l.init(),{presence:a,store:l,team:n,roomId:i}}export{N as i,h as o};
