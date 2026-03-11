import{a as p,s as f}from"./url-NB_mxKzZ.js";import{k as T,c as _,R as o}from"./keepAlive-By6PPzHl.js";import{c as b}from"./sanitize-Dk4qHRqk.js";import{D as E,t as L,g as R}from"./icons-C5SiWFC8.js";function w(n,e){return n==="guide"?e==="resonant"?o.GUIDE_RESONANT:o.GUIDE_DISSONANT:e==="resonant"?o.WALKER_RESONANT:o.WALKER_DISSONANT}function A(n,e,s,t){return n==="walker"?`${R(e,t)} ${s.dreamwalker}<br>${s.controllerTaken.replace(`
`,"<br>")}`:s[e==="resonant"?"miniTakenResonant":"miniTakenDissonant"].replace(`
`,"<br>")}async function y(n,{roleType:e,invalidParamsHtml:s}){const{roomId:t,token:c,team:a}=p();if(!t||!c||!a||a!=="resonant"&&a!=="dissonant")return n.innerHTML=s,null;const{data:r,error:k}=await f.from("rooms").select("id, guest_token, language").eq("id",t).eq("guest_token",c).maybeSingle(),d=(r==null?void 0:r.language)||E,l=L(d);if(!r||k)return n.innerHTML=`<div class="waiting-screen">
            <p>${l.wrongLink.replace(`
`,"<br>")}</p>
        </div>`,null;const u=w(e,a),i=_(t);await i.isRoleTaken(u)&&(n.innerHTML=`
            <div class="waiting-screen">
                <div class="taken-screen">
                    <p class="taken-screen__icon">🔒</p>
                    <p class="taken-screen__text">${A(e,a,l,d)}</p>
                    <button class="lobby__btn" id="forceJoinBtn">${l.forceRejoin}</button>
                </div>
            </div>`,await new Promise(g=>{document.getElementById("forceJoinBtn").addEventListener("click",g,{once:!0})})),i.join(u),T(i,u),document.body.classList.add(`team-${a}`);const m=b(t);return await m.init(),{presence:i,store:m,team:a,roomId:t}}export{y as i};
