import{i as k,s as b,G as S,I as f,L as x,a as L,p as F,g as B,l as C,c as N,D as M,t as U}from"./url-BRusC3Pl.js";import{r as A}from"./entry-LDTCPmAL.js";import{o as O}from"./rulesModal-D9jABPKW.js";async function H(){if(!k)return null;const{data:{user:e}}=await b.auth.getUser();return e}async function R(){if(!k){window.alert("Google auth is not configured for this deployment yet.");return}const{error:e}=await b.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});e&&A("auth.signInWithGoogle",e)}async function W(){k&&await b.auth.signOut()}async function j(e){if(!k)throw new Error("Supabase is not configured.");const{data:t}=await b.from("rooms").select("id, guest_token, state, language").eq("owner_id",e).maybeSingle();if(t)return{id:t.id,guest_token:t.guest_token,hasActiveGame:!!t.state,language:t.language,state:t.state??null};const a=T(),{data:n}=await b.from("rooms").insert({id:a,owner_id:e}).select("id, guest_token").single();return{id:n.id,guest_token:n.guest_token,hasActiveGame:!1,language:null,state:null}}function T(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function X(e=16){const d=7.140000000000001,y=19*.34,m=[];for(let s=0;s<4;s+=1)for(let u=0;u<4;u+=1)m.push({r:s,c:u});for(let s=m.length-1;s>0;s-=1){const u=Math.floor(Math.random()*(s+1));[m[s],m[u]]=[m[u],m[s]]}return m.slice(0,e).map(({r:s,c:u},w)=>{const _=8+21*(u+.5),h=12+19*(s+.5),p=Math.round(_+(Math.random()*2-1)*d),v=Math.round(h+(Math.random()*2-1)*y),E=Math.round(24+Math.random()*56),g=(3+Math.random()*2).toFixed(2),$=(Math.random()*2.5).toFixed(2),G=(.3+Math.random()*.5).toFixed(2);return{id:w,size:E,left:p,top:v,period:g,delay:$,alpha:G}})}function Y({lang:e,tr:t,user:a,room:n,canManageGame:l,canContinueCurrentGame:c,introPlayed:i,homeEyes:r}){return`
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
                            <span class="home-eye__open">${f.eye}</span>
                            <span class="home-eye__closed">${f.eyeClosed}</span>
                        </span>
                    `).join("")}
                </div>

                <div class="lobby__title-wrap">
                    <h1 class="lobby__title">${S}</h1>
                </div>

                ${l?`
                        <div class="lobby-screen__actions">
                            ${n!=null&&n.hasActiveGame&&c?`
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
                            <span class="lobby__btn-google-icon">${f.google}</span>
                        </button>
                    `}
            </div>
        </div>

        ${a?`<button class="btn-logout btn-icon" id="logoutBtn" title="${a.email}">${f.user}</button>`:""}
        <button class="btn-rules btn-icon" id="rulesBtn" aria-label="${t.openRules}" title="${t.rules}">${f.book}</button>
        <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${f.maximize}</button>
    `}function q(e){return new Promise(t=>{var c;const a=document.createElement("div");a.className="confirm-modal",a.innerHTML=`
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
        `;const n=i=>{document.removeEventListener("keydown",l),a.remove(),t(i)},l=i=>{i.key==="Escape"&&n(!1)};a.addEventListener("click",i=>{var o,d;const r=(d=(o=i.target)==null?void 0:o.dataset)==null?void 0:d.close;r==="confirm"&&n(!0),r==="cancel"&&n(!1)}),document.addEventListener("keydown",l),document.body.appendChild(a),(c=a.querySelector(".confirm-modal__btn--confirm"))==null||c.focus()})}function z(){return window.__nwLoader||null}async function I(e){const t=z();return t!=null&&t.wrap?await t.wrap(e):await e()}function D(e){const t=e*e,a=Math.random()<.5?"resonant":"dissonant",n=Math.ceil(t/3),l=n-1,c=a==="resonant"?n:l,i=a==="dissonant"?n:l,r=1,o=t-c-i-r,d=[...Array(c).fill("resonant"),...Array(i).fill("dissonant"),...Array(o).fill("anomaly"),...Array(r).fill("nightmare")];return{roles:L(d),startsFirst:a}}const P={resonant:9,dissonant:9,anomaly:7,nightmare:1};function V(e){return L(Array.from({length:e},(t,a)=>a+1))}function K({size:e,words:t}){const{roles:a,startsFirst:n}=D(e),l=Object.fromEntries(Object.entries(P).map(([i,r])=>[i,V(r)]));return{cells:F(t,e*e).map((i,r)=>{const o=a[r],d=l[o].shift()??1;return{word:i,role:o,imageVariant:d,revealed:!1}}),startsFirst:n}}async function J(e){e&&await b.from("rooms").update({state:null}).eq("id",e)}async function Q(e,t){await I(async()=>{if(e!=null&&e.id)try{await J(e.id)}catch(a){A("home.logoutAndClearRoom",a)}await W(),await(t==null?void 0:t())})}async function Z({room:e,lang:t,tr:a,askConfirm:n}){const l=document.getElementById("newGameBtn");if(!(!l||!(e!=null&&e.id))&&!(e.hasActiveGame&&!await n())){l.disabled=!0;try{await I(async()=>{var y;const c=await C(t),{cells:i,startsFirst:r}=K({size:5,words:c}),o={gameId:((y=crypto.randomUUID)==null?void 0:y.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:i,turn:{team:r,guideLimit:null,dreamwalkerMoves:0},teamEffects:N(),gameOver:!1,winner:null},{error:d}=await b.from("rooms").update({state:o,language:t}).eq("id",e.id);if(d)throw d;window.location.href=`${B()}/game.html?room=${e.id}&token=${e.guest_token}`})}catch(c){A("home.createAndOpenNewGame",c),window.alert(a.newGameFailed),l.disabled=!1}}}function ee(e){!(e!=null&&e.id)||!(e!=null&&e.guest_token)||(window.location.href=`${B()}/game.html?room=${e.id}&token=${e.guest_token}`)}function te(){try{return localStorage.getItem("nw_lang")||M}catch{return M}}function ne(e){try{localStorage.setItem("nw_lang",e)}catch{}}async function ie(e){let t=te(),a=null,n=null,l=null,c=!0,i=null;const r=X(16);function o(s){a&&l!==s&&(l=s,C(s).catch(()=>{l=null}))}async function d(){const s=U(t),u=!!(a&&(n!=null&&n.id)),w=!!(n!=null&&n.hasActiveGame&&(!(n!=null&&n.language)||n.language===t));document.body.className="",e.innerHTML=Y({lang:t,tr:s,user:a,room:n,canManageGame:u,canContinueCurrentGame:w,introPlayed:c,homeEyes:r}),y(s),o(t),c=!0}function y(s){var _,h,p,v,E;e.querySelectorAll(".lang-toggle__btn").forEach(g=>{g.addEventListener("click",()=>{t=g.dataset.lang,ne(t),d()})}),(_=document.getElementById("loginBtn"))==null||_.addEventListener("click",R),(h=document.getElementById("continueBtn"))==null||h.addEventListener("click",()=>ee(n)),(p=document.getElementById("newGameBtn"))==null||p.addEventListener("click",()=>m(s)),(v=document.getElementById("logoutBtn"))==null||v.addEventListener("click",async()=>{await Q(n,async()=>{a=null,n=null,await d()})}),(E=document.getElementById("rulesBtn"))==null||E.addEventListener("click",()=>O(t));const u=document.getElementById("fullscreenBtn"),w=()=>{u&&(u.innerHTML=document.fullscreenElement?f.minimize:f.maximize)};w(),i&&document.removeEventListener("fullscreenchange",i),i=()=>w(),document.addEventListener("fullscreenchange",i),u==null||u.addEventListener("click",()=>{var g,$,G;document.fullscreenElement?(G=document.exitFullscreen)==null||G.call(document):($=(g=document.documentElement).requestFullscreen)==null||$.call(g)})}async function m(s){await Z({room:n,lang:t,tr:s,askConfirm:()=>q(s)})}await d(),a=await H(),a&&(n=await j(a.id),await d())}export{ie as initHome};
