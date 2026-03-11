import{a as p,s as f,D as T,t as b,b as _}from"./icons-87ROm5CI.js";import{k as E,c as L,R as o}from"./keepAlive-BWq9KLr-.js";import{c as R}from"./sanitize-CWtCII0P.js";function w(n,e){return n==="guide"?e==="resonant"?o.GUIDE_RESONANT:o.GUIDE_DISSONANT:e==="resonant"?o.WALKER_RESONANT:o.WALKER_DISSONANT}function A(n,e,s,t){return n==="walker"?`${_(e,t)} ${s.dreamwalker}<br>${s.controllerTaken.replace(`
`,"<br>")}`:s[e==="resonant"?"miniTakenResonant":"miniTakenDissonant"].replace(`
`,"<br>")}async function $(n,{roleType:e,invalidParamsHtml:s}){const{roomId:t,token:c,team:a}=p();if(!t||!c||!a||a!=="resonant"&&a!=="dissonant")return n.innerHTML=s,null;const{data:r,error:m}=await f.from("rooms").select("id, guest_token, language").eq("id",t).eq("guest_token",c).maybeSingle(),d=(r==null?void 0:r.language)||T,l=b(d);if(!r||m)return n.innerHTML=`<div class="waiting-screen">
            <p>${l.wrongLink.replace(`
`,"<br>")}</p>
        </div>`,null;const u=w(e,a),i=L(t);await i.isRoleTaken(u)&&(n.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${A(e,a,l,d)}</p>
                    <button class="lobby__btn" id="forceJoinBtn">${l.forceRejoin}</button>
                </div>
            </div>`,await new Promise(g=>{document.getElementById("forceJoinBtn").addEventListener("click",g,{once:!0})})),i.join(u),E(i,u),document.body.classList.add(`team-${a}`);const k=R(t);return await k.init(),{presence:i,store:k,team:a,roomId:t}}export{$ as i};
