import{a as g,s as p}from"./url-CeekiTZl.js";import{c as b,R as c}from"./presence-BUWGs17Q.js";import{k as _,c as T}from"./keepAlive-D36XChtQ.js";import{t as u,D as m}from"./i18n-pkrfkOVn.js";function S(t){let e=window.innerWidth,r=window.innerHeight;const i=new ResizeObserver(()=>{const s=window.innerWidth,n=window.innerHeight;(s!==e||n!==r)&&(e=s,r=n,t())});return i.observe(document.documentElement),()=>i.disconnect()}function E(t,e){return t==="guide"?e==="resonant"?c.GUIDE_RESONANT:c.GUIDE_DISSONANT:e==="resonant"?c.WALKER_RESONANT:c.WALKER_DISSONANT}function R(t,e,r){return t==="walker"?`${e} ${r.dreamwalker}<br>${r.controllerTaken.replace(`
`,"<br>")}`:r[e==="resonant"?"miniTakenResonant":"miniTakenDissonant"].replace(`
`,"<br>")}async function D(t,{roleType:e,invalidParamsHtml:r}){const{roomId:i,token:s,team:n}=g();if(!i||!s||!n||n!=="resonant"&&n!=="dissonant")return t.innerHTML=r,null;const{data:k,error:w}=await p.from("rooms").select("id, guest_token").eq("id",i).eq("guest_token",s).maybeSingle();if(!k||w){const a=u(m);return t.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${a.wrongLink.replace(`
`,"<br>")}</p>
        </div>`,null}const d=E(e,n),o=b(i);if(await o.isRoleTaken(d)){const a=u(m);t.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${R(e,n,a)}</p>
                    <button class="lobby__btn" id="forceJoinBtn">${a.forceRejoin}</button>
                </div>
            </div>`,await new Promise(f=>{document.getElementById("forceJoinBtn").addEventListener("click",f,{once:!0})})}o.join(d),_(o,d),document.body.classList.add(`team-${n}`);const l=T(i);return await l.init(),{presence:o,store:l,team:n,roomId:i}}export{D as i,S as o};
