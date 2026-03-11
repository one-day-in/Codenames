import{i as G,s as b,G as S,I as g,L as x,a as M,p as F,g as L,l as C,c as N,D as k,t as U}from"./url-CX8tVYqQ.js";import{r as A}from"./entry-Ci5P1YcK.js";async function O(){if(!G)return null;const{data:{user:e}}=await b.auth.getUser();return e}async function H(){if(!G){window.alert("Google auth is not configured for this deployment yet.");return}const{error:e}=await b.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});e&&A("auth.signInWithGoogle",e)}async function W(){G&&await b.auth.signOut()}async function j(e){if(!G)throw new Error("Supabase is not configured.");const{data:t}=await b.from("rooms").select("id, guest_token, state, language").eq("owner_id",e).maybeSingle();if(t)return{id:t.id,guest_token:t.guest_token,hasActiveGame:!!t.state,language:t.language,state:t.state??null};const a=R(),{data:n}=await b.from("rooms").insert({id:a,owner_id:e}).select("id, guest_token").single();return{id:n.id,guest_token:n.guest_token,hasActiveGame:!1,language:null,state:null}}function R(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function T(e=16){const d=7.140000000000001,y=19*.34,m=[];for(let s=0;s<4;s+=1)for(let u=0;u<4;u+=1)m.push({r:s,c:u});for(let s=m.length-1;s>0;s-=1){const u=Math.floor(Math.random()*(s+1));[m[s],m[u]]=[m[u],m[s]]}return m.slice(0,e).map(({r:s,c:u},w)=>{const _=8+21*(u+.5),h=12+19*(s+.5),p=Math.round(_+(Math.random()*2-1)*d),v=Math.round(h+(Math.random()*2-1)*y),f=Math.round(24+Math.random()*56),E=(3+Math.random()*2).toFixed(2),$=(Math.random()*2.5).toFixed(2),I=(.3+Math.random()*.5).toFixed(2);return{id:w,size:f,left:p,top:v,period:E,delay:$,alpha:I}})}function X({lang:e,tr:t,user:a,room:n,canManageGame:c,canContinueCurrentGame:l,introPlayed:i,homeEyes:r}){return`
        <div class="app ${i?"":"app--intro"}">
            <div class="lang-toggle">
                ${x.map(o=>`
                    <button
                        class="lang-toggle__btn ${o.code===e?"lang-toggle__btn--active":""}"
                        data-lang="${o.code}">
                        ${o.label}
                    </button>
                `).join("")}
            </div>

            <div class="lobby-screen">
                <div class="home-eyes" aria-hidden="true">
                    ${r.map(o=>`
                        <span class="home-eye"
                            style="--eye-size:${o.size}px;--eye-left:${o.left}%;--eye-top:${o.top}%;--eye-period:${o.period}s;--eye-delay:${o.delay}s;--eye-alpha:${o.alpha};">
                            <span class="home-eye__open">${g.eye}</span>
                            <span class="home-eye__closed">${g.eyeClosed}</span>
                        </span>
                    `).join("")}
                </div>

                <div class="lobby__title-wrap">
                    <h1 class="lobby__title">${S}</h1>
                </div>

                ${c?`
                        <div class="lobby-screen__actions">
                            ${n!=null&&n.hasActiveGame&&l?`
                                    <button class="lobby__btn lobby__btn--continue" id="continueBtn">
                                        ${t.continueGame}
                                    </button>
                                `:""}
                            <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                                ${t.newGame}
                            </button>
                        </div>
                    `:`
                        <button class="lobby__btn lobby__btn--google" id="loginBtn">
                            <span class="lobby__btn-text">${t.signIn}</span>
                            <span class="lobby__btn-google-icon">${g.google}</span>
                        </button>
                    `}
            </div>
        </div>

        ${a?`<button class="btn-logout btn-icon" id="logoutBtn" title="${a.email}">${g.user}</button>`:""}
        <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${g.maximize}</button>
    `}function Y(e){return new Promise(t=>{var l;const a=document.createElement("div");a.className="confirm-modal",a.innerHTML=`
            <div class="confirm-modal__backdrop" data-close="cancel"></div>
            <div class="confirm-modal__content" role="dialog" aria-modal="true">
                <h2 class="confirm-modal__title">${e.newGame}</h2>
                <p class="confirm-modal__text">${e.confirmNewGame}</p>
                <div class="confirm-modal__actions">
                    <button class="lobby__btn confirm-modal__btn confirm-modal__btn--confirm" data-close="confirm">
                        ${e.confirmNewGameAction}
                    </button>
                    <button class="lobby__btn confirm-modal__btn confirm-modal__btn--cancel" data-close="cancel">
                        ${e.cancel}
                    </button>
                </div>
            </div>
        `;const n=i=>{document.removeEventListener("keydown",c),a.remove(),t(i)},c=i=>{i.key==="Escape"&&n(!1)};a.addEventListener("click",i=>{var o,d;const r=(d=(o=i.target)==null?void 0:o.dataset)==null?void 0:d.close;r==="confirm"&&n(!0),r==="cancel"&&n(!1)}),document.addEventListener("keydown",c),document.body.appendChild(a),(l=a.querySelector(".confirm-modal__btn--confirm"))==null||l.focus()})}function q(){return window.__nwLoader||null}async function B(e){const t=q();return t!=null&&t.wrap?await t.wrap(e):await e()}function z(e){const t=e*e,a=Math.random()<.5?"resonant":"dissonant",n=Math.ceil(t/3),c=n-1,l=a==="resonant"?n:c,i=a==="dissonant"?n:c,r=1,o=t-l-i-r,d=[...Array(l).fill("resonant"),...Array(i).fill("dissonant"),...Array(o).fill("anomaly"),...Array(r).fill("nightmare")];return{roles:M(d),startsFirst:a}}const D={resonant:9,dissonant:9,anomaly:7,nightmare:1};function P(e){return M(Array.from({length:e},(t,a)=>a+1))}function V({size:e,words:t}){const{roles:a,startsFirst:n}=z(e),c=Object.fromEntries(Object.entries(D).map(([i,r])=>[i,P(r)]));return{cells:F(t,e*e).map((i,r)=>{const o=a[r],d=c[o].shift()??1;return{word:i,role:o,imageVariant:d,revealed:!1}}),startsFirst:n}}async function K(e){e&&await b.from("rooms").update({state:null}).eq("id",e)}async function J(e,t){await B(async()=>{if(e!=null&&e.id)try{await K(e.id)}catch(a){A("home.logoutAndClearRoom",a)}await W(),await(t==null?void 0:t())})}async function Q({room:e,lang:t,tr:a,askConfirm:n}){const c=document.getElementById("newGameBtn");if(!(!c||!(e!=null&&e.id))&&!(e.hasActiveGame&&!await n())){c.disabled=!0;try{await B(async()=>{var y;const l=await C(t),{cells:i,startsFirst:r}=V({size:5,words:l}),o={gameId:((y=crypto.randomUUID)==null?void 0:y.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:i,turn:{team:r,guideLimit:null,dreamwalkerMoves:0},teamEffects:N(),gameOver:!1,winner:null},{error:d}=await b.from("rooms").update({state:o,language:t}).eq("id",e.id);if(d)throw d;window.location.href=`${L()}/game.html?room=${e.id}&token=${e.guest_token}`})}catch(l){A("home.createAndOpenNewGame",l),window.alert(a.newGameFailed),c.disabled=!1}}}function Z(e){!(e!=null&&e.id)||!(e!=null&&e.guest_token)||(window.location.href=`${L()}/game.html?room=${e.id}&token=${e.guest_token}`)}function ee(){try{return localStorage.getItem("nw_lang")||k}catch{return k}}function te(e){try{localStorage.setItem("nw_lang",e)}catch{}}async function oe(e){let t=ee(),a=null,n=null,c=null,l=!0,i=null;const r=T(16);function o(s){a&&c!==s&&(c=s,C(s).catch(()=>{c=null}))}async function d(){const s=U(t),u=!!(a&&(n!=null&&n.id)),w=!!(n!=null&&n.hasActiveGame&&(!(n!=null&&n.language)||n.language===t));document.body.className="",e.innerHTML=X({lang:t,tr:s,user:a,room:n,canManageGame:u,canContinueCurrentGame:w,introPlayed:l,homeEyes:r}),y(s),o(t),l=!0}function y(s){var _,h,p,v;e.querySelectorAll(".lang-toggle__btn").forEach(f=>{f.addEventListener("click",()=>{t=f.dataset.lang,te(t),d()})}),(_=document.getElementById("loginBtn"))==null||_.addEventListener("click",H),(h=document.getElementById("continueBtn"))==null||h.addEventListener("click",()=>Z(n)),(p=document.getElementById("newGameBtn"))==null||p.addEventListener("click",()=>m(s)),(v=document.getElementById("logoutBtn"))==null||v.addEventListener("click",async()=>{await J(n,async()=>{a=null,n=null,await d()})});const u=document.getElementById("fullscreenBtn"),w=()=>{u&&(u.innerHTML=document.fullscreenElement?g.minimize:g.maximize)};w(),i&&document.removeEventListener("fullscreenchange",i),i=()=>w(),document.addEventListener("fullscreenchange",i),u==null||u.addEventListener("click",()=>{var f,E,$;document.fullscreenElement?($=document.exitFullscreen)==null||$.call(document):(E=(f=document.documentElement).requestFullscreen)==null||E.call(f)})}async function m(s){await Q({room:n,lang:t,tr:s,askConfirm:()=>Y(s)})}await d(),a=await O(),a&&(n=await j(a.id),await d())}export{oe as initHome};
