import{i as A,s as b,G as S,I as f,L as x,a as B,p as F,g as L,l as I,c as N,D as M,t as U}from"./url-DrpWMjE3.js";import{r as k}from"./entry-BfU77FDu.js";import{o as H}from"./rulesModal-DZB5mEI0.js";async function O(){if(!A)return null;const{data:{user:t}}=await b.auth.getUser();return t}async function R(){if(!A){window.alert("Google auth is not configured for this deployment yet.");return}const{error:t}=await b.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});t&&k("auth.signInWithGoogle",t)}async function W(){A&&await b.auth.signOut()}async function j(t){if(!A)throw new Error("Supabase is not configured.");const{data:n}=await b.from("rooms").select("id, guest_token, state, language").eq("owner_id",t).maybeSingle();if(n)return{id:n.id,guest_token:n.guest_token,hasActiveGame:!!n.state,language:n.language,state:n.state??null};const a=X(),{data:e}=await b.from("rooms").insert({id:a,owner_id:t}).select("id, guest_token").single();return{id:e.id,guest_token:e.guest_token,hasActiveGame:!1,language:null,state:null}}function X(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function Y(t=16){const d=7.140000000000001,y=19*.34,m=[];for(let s=0;s<4;s+=1)for(let u=0;u<4;u+=1)m.push({r:s,c:u});for(let s=m.length-1;s>0;s-=1){const u=Math.floor(Math.random()*(s+1));[m[s],m[u]]=[m[u],m[s]]}return m.slice(0,t).map(({r:s,c:u},_)=>{const h=8+21*(u+.5),w=12+19*(s+.5),p=Math.round(h+(Math.random()*2-1)*d),v=Math.round(w+(Math.random()*2-1)*y),$=Math.round(24+Math.random()*56),g=(3+Math.random()*2).toFixed(2),E=(Math.random()*2.5).toFixed(2),G=(.3+Math.random()*.5).toFixed(2);return{id:_,size:$,left:p,top:v,period:g,delay:E,alpha:G}})}function q({lang:t,tr:n,user:a,room:e,canManageGame:c,canContinueCurrentGame:l,introPlayed:i,homeEyes:r}){return`
        <div class="app ${i?"":"app--intro"}">
            <div class="lang-toggle">
                ${x.map(o=>`
                    <button
                        class="lang-toggle__btn ${o.code===t?"lang-toggle__btn--active":""}"
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
                            <span class="home-eye__open">${f.eye}</span>
                            <span class="home-eye__closed">${f.eyeClosed}</span>
                        </span>
                    `).join("")}
                </div>

                <div class="lobby__title-wrap">
                    <h1 class="lobby__title">${S}</h1>
                </div>

                ${c?`
                        <div class="lobby-screen__actions">
                            ${e!=null&&e.hasActiveGame&&l?`
                                    <button class="lobby__btn lobby__btn--continue" id="continueBtn">
                                        ${n.continueGame}
                                    </button>
                                `:""}
                            <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                                ${n.newGame}
                            </button>
                        </div>
                    `:`
                        <button class="lobby__btn lobby__btn--google" id="loginBtn">
                            <span class="lobby__btn-text">${n.signIn}</span>
                            <span class="lobby__btn-google-icon">${f.google}</span>
                        </button>
                    `}
            </div>
        </div>

        ${a?`<button class="btn-logout btn-icon" id="logoutBtn" title="${a.email}">${f.user}</button>`:""}
        <button class="btn-rules btn-icon" id="rulesBtn" aria-label="${n.openRules}" title="${n.rules}">${f.book}</button>
        <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${f.maximize}</button>
    `}function T(t){return new Promise(n=>{var l;const a=document.createElement("div");a.className="confirm-modal",a.innerHTML=`
            <div class="confirm-modal__backdrop" data-close="cancel"></div>
            <div class="confirm-modal__content" role="dialog" aria-modal="true">
                <h2 class="confirm-modal__title">${t.newGame}</h2>
                <p class="confirm-modal__text">${t.confirmNewGame}</p>
                <div class="confirm-modal__actions">
                    <button class="lobby__btn confirm-modal__btn confirm-modal__btn--confirm" data-close="confirm">
                        ${t.confirmNewGameAction}
                    </button>
                    <button class="lobby__btn confirm-modal__btn confirm-modal__btn--cancel" data-close="cancel">
                        ${t.cancel}
                    </button>
                </div>
            </div>
        `;const e=i=>{document.removeEventListener("keydown",c),a.remove(),n(i)},c=i=>{i.key==="Escape"&&e(!1)};a.addEventListener("click",i=>{var o,d;const r=(d=(o=i.target)==null?void 0:o.dataset)==null?void 0:d.close;r==="confirm"&&e(!0),r==="cancel"&&e(!1)}),document.addEventListener("keydown",c),document.body.appendChild(a),(l=a.querySelector(".confirm-modal__btn--confirm"))==null||l.focus()})}function z(){return window.__nwLoader||null}async function C(t){const n=z();return n!=null&&n.wrap?await n.wrap(t):await t()}function D(t){const n=t*t,a=Math.random()<.5?"resonant":"dissonant",e=Math.ceil(n/3),c=e-1,l=a==="resonant"?e:c,i=a==="dissonant"?e:c,r=1,o=n-l-i-r,d=[...Array(l).fill("resonant"),...Array(i).fill("dissonant"),...Array(o).fill("anomaly"),...Array(r).fill("nightmare")];return{roles:B(d),startsFirst:a}}const P={resonant:9,dissonant:9,anomaly:7,nightmare:1};function V(t){return B(Array.from({length:t},(n,a)=>a+1))}function K({size:t,words:n}){const{roles:a,startsFirst:e}=D(t),c=Object.fromEntries(Object.entries(P).map(([i,r])=>[i,V(r)]));return{cells:F(n,t*t).map((i,r)=>{const o=a[r],d=c[o].shift()??1;return{word:i,role:o,imageVariant:d,revealed:!1}}),startsFirst:e}}async function J(t){t&&await b.from("rooms").update({state:null}).eq("id",t)}async function Q(t,n){await C(async()=>{if(t!=null&&t.id)try{await J(t.id)}catch(a){k("home.logoutAndClearRoom",a)}await W(),await(n==null?void 0:n())})}async function Z({room:t,lang:n,tr:a,askConfirm:e}){const c=document.getElementById("newGameBtn");if(!(!c||!(t!=null&&t.id))&&!(t.hasActiveGame&&!await e())){c.disabled=!0;try{await C(async()=>{var y;const l=await I(n),{cells:i,startsFirst:r}=K({size:5,words:l}),o=N({gameId:((y=crypto.randomUUID)==null?void 0:y.call(crypto))||Math.random().toString(36).slice(2),size:5,cells:i,startsFirst:r}),{error:d}=await b.from("rooms").update({state:o,language:n}).eq("id",t.id);if(d)throw d;window.location.href=`${L()}/game.html?room=${t.id}&token=${t.guest_token}`})}catch(l){k("home.createAndOpenNewGame",l),window.alert(a.newGameFailed),c.disabled=!1}}}function tt(t){!(t!=null&&t.id)||!(t!=null&&t.guest_token)||(window.location.href=`${L()}/game.html?room=${t.id}&token=${t.guest_token}`)}function nt(){try{return localStorage.getItem("nw_lang")||M}catch{return M}}function et(t){try{localStorage.setItem("nw_lang",t)}catch{}}async function it(t){let n=nt(),a=null,e=null,c=null,l=!0,i=null;const r=Y(16);function o(s){a&&c!==s&&(c=s,I(s).catch(()=>{c=null}))}async function d(){const s=U(n),u=!!(a&&(e!=null&&e.id)),_=!!(e!=null&&e.hasActiveGame&&(!(e!=null&&e.language)||e.language===n));document.body.className="",t.innerHTML=q({lang:n,tr:s,user:a,room:e,canManageGame:u,canContinueCurrentGame:_,introPlayed:l,homeEyes:r}),y(s),o(n),l=!0}function y(s){var h,w,p,v,$;t.querySelectorAll(".lang-toggle__btn").forEach(g=>{g.addEventListener("click",()=>{n=g.dataset.lang,et(n),d()})}),(h=document.getElementById("loginBtn"))==null||h.addEventListener("click",R),(w=document.getElementById("continueBtn"))==null||w.addEventListener("click",()=>tt(e)),(p=document.getElementById("newGameBtn"))==null||p.addEventListener("click",()=>m(s)),(v=document.getElementById("logoutBtn"))==null||v.addEventListener("click",async()=>{await Q(e,async()=>{a=null,e=null,await d()})}),($=document.getElementById("rulesBtn"))==null||$.addEventListener("click",()=>H(n));const u=document.getElementById("fullscreenBtn"),_=()=>{u&&(u.innerHTML=document.fullscreenElement?f.minimize:f.maximize)};_(),i&&document.removeEventListener("fullscreenchange",i),i=()=>_(),document.addEventListener("fullscreenchange",i),u==null||u.addEventListener("click",()=>{var g,E,G;document.fullscreenElement?(G=document.exitFullscreen)==null||G.call(document):(E=(g=document.documentElement).requestFullscreen)==null||E.call(g)})}async function m(s){await Z({room:e,lang:n,tr:s,askConfirm:()=>T(s)})}await d(),a=await O(),a&&(e=await j(a.id),await d())}export{it as initHome};
