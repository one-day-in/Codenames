import{i as $,s as y,g as G,l as B}from"./url-NB_mxKzZ.js";import{D as L,G as j,I as w,L as T,t as M}from"./icons-C5SiWFC8.js";import{c as P}from"./boardFactory-Cnw_na8s.js";async function K(){if(!$)return null;const{data:{user:i}}=await y.auth.getUser();return i}async function R(){if(!$){window.alert("Google auth is not configured for this deployment yet.");return}const{error:i}=await y.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});i&&console.error("Auth error:",i)}async function J(){$&&await y.auth.signOut()}async function Q(i){if(!$)throw new Error("Supabase is not configured.");const{data:t}=await y.from("rooms").select("id, guest_token, state, language").eq("owner_id",i).maybeSingle();if(t)return{id:t.id,guest_token:t.guest_token,hasActiveGame:!!t.state,language:t.language,state:t.state??null};const d=V(),{data:e}=await y.from("rooms").insert({id:d,owner_id:i}).select("id, guest_token").single();return{id:e.id,guest_token:e.guest_token,hasActiveGame:!1,language:null,state:null}}function V(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function Z(){return window.__nwLoader||null}async function I(i){const t=Z();return t!=null&&t.wrap?await t.wrap(i):await i()}function ee(){try{return localStorage.getItem("nw_lang")||L}catch{return L}}function te(i){try{localStorage.setItem("nw_lang",i)}catch{}}async function ie(i){let t=ee(),d=null,e=null,E=null,k=!0,h=null;function x(a=16){const b=7.140000000000001,v=19*.34,_=[];for(let r=0;r<4;r+=1)for(let f=0;f<4;f+=1)_.push({r,c:f});for(let r=_.length-1;r>0;r-=1){const f=Math.floor(Math.random()*(r+1));[_[r],_[f]]=[_[f],_[r]]}return _.slice(0,a).map(({r,c:f},N)=>{const z=8+21*(f+.5),H=12+19*(r+.5),W=Math.round(z+(Math.random()*2-1)*b),X=Math.round(H+(Math.random()*2-1)*v),Y=Math.round(24+Math.random()*56),q=(3+Math.random()*2).toFixed(2),D=(Math.random()*2.5).toFixed(2),O=(.3+Math.random()*.5).toFixed(2);return{id:N,size:Y,left:W,top:X,period:q,delay:D,alpha:O}})}const A=x(16);function S(a){return new Promise(s=>{var g;const o=document.createElement("div");o.className="confirm-modal",o.innerHTML=`
                <div class="confirm-modal__backdrop" data-close="cancel"></div>
                <div class="confirm-modal__content" role="dialog" aria-modal="true">
                    <h2 class="confirm-modal__title">${a.newGame}</h2>
                    <p class="confirm-modal__text">${a.confirmNewGame}</p>
                    <div class="confirm-modal__actions">
                        <button class="lobby__btn confirm-modal__btn confirm-modal__btn--confirm" data-close="confirm">
                            ${a.confirmNewGameAction}
                        </button>
                        <button class="lobby__btn confirm-modal__btn confirm-modal__btn--cancel" data-close="cancel">
                            ${a.cancel}
                        </button>
                    </div>
                </div>
            `;const n=l=>{document.removeEventListener("keydown",m),o.remove(),s(l)},m=l=>{l.key==="Escape"&&n(!1)};o.addEventListener("click",l=>{var c,b;const u=(b=(c=l.target)==null?void 0:c.dataset)==null?void 0:b.close;u==="confirm"&&n(!0),u==="cancel"&&n(!1)}),document.addEventListener("keydown",m),document.body.appendChild(o),(g=o.querySelector(".confirm-modal__btn--confirm"))==null||g.focus()})}function U(a){d&&E!==a&&(E=a,B(a).catch(()=>{E=null}))}async function p(){const a=M(t),s=!!(d&&(e!=null&&e.id)),o=!!(e!=null&&e.hasActiveGame&&(!(e!=null&&e.language)||e.language===t));document.body.className="",i.innerHTML=`
            <div class="app ${k?"":"app--intro"}">

                <div class="lang-toggle">
                    ${T.map(n=>`
                        <button
                            class="lang-toggle__btn ${n.code===t?"lang-toggle__btn--active":""}"
                            data-lang="${n.code}">
                            ${n.label}
                        </button>
                    `).join("")}
                </div>

                <div class="lobby-screen">
                    <div class="home-eyes" aria-hidden="true">
                        ${A.map(n=>`
                            <span class="home-eye"
                                style="--eye-size:${n.size}px;--eye-left:${n.left}%;--eye-top:${n.top}%;--eye-period:${n.period}s;--eye-delay:${n.delay}s;--eye-alpha:${n.alpha};">
                                <span class="home-eye__open">${w.eye}</span>
                                <span class="home-eye__closed">${w.eyeClosed}</span>
                            </span>
                        `).join("")}
                    </div>

                    <div class="lobby__title-wrap">
                        <h1 class="lobby__title">${j}</h1>
                    </div>

                    ${s?`
                            <div class="lobby-screen__actions">
                                ${e!=null&&e.hasActiveGame&&o?`
                                        <button class="lobby__btn lobby__btn--continue" id="continueBtn">
                                            ${a.continueGame}
                                        </button>
                                      `:""}
                                <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                                    ${a.newGame}
                                </button>
                                <button class="lobby__btn lobby__btn--sandbox" id="sandboxBtn">
                                    ${a.sandboxBoard}
                                </button>
                            </div>
                        `:`
                            <button class="lobby__btn lobby__btn--google" id="loginBtn">
                                <span class="lobby__btn-text">${a.signIn}</span>
                                <span class="lobby__btn-google-icon">${w.google}</span>
                            </button>
                        `}

                </div>
            </div>

            ${d?`<button class="btn-logout btn-icon" id="logoutBtn" title="${d.email}">${w.user}</button>`:""}
            <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${w.maximize}</button>
        `,F(),U(t),k=!0}function F(a){var n,m,g,l,u;i.querySelectorAll(".lang-toggle__btn").forEach(c=>{c.addEventListener("click",()=>{t=c.dataset.lang,te(t),p()})}),(n=document.getElementById("loginBtn"))==null||n.addEventListener("click",R),(m=document.getElementById("continueBtn"))==null||m.addEventListener("click",()=>{window.location.href=`${G()}/game.html?room=${e.id}&token=${e.guest_token}`}),(g=document.getElementById("newGameBtn"))==null||g.addEventListener("click",C),(l=document.getElementById("sandboxBtn"))==null||l.addEventListener("click",()=>{!(e!=null&&e.id)||!(e!=null&&e.guest_token)||(window.location.href=`${G()}/sandbox.html?room=${e.id}&token=${e.guest_token}`)}),(u=document.getElementById("logoutBtn"))==null||u.addEventListener("click",async()=>{await I(async()=>{if(e!=null&&e.id)try{await y.from("rooms").update({state:null}).eq("id",e.id)}catch(c){console.error("Failed to clear room on logout:",c)}await J(),d=null,e=null,p()})});const s=document.getElementById("fullscreenBtn"),o=()=>{s&&(s.innerHTML=document.fullscreenElement?w.minimize:w.maximize)};o(),h&&document.removeEventListener("fullscreenchange",h),h=()=>o(),document.addEventListener("fullscreenchange",h),s==null||s.addEventListener("click",()=>{var c,b,v;document.fullscreenElement?(v=document.exitFullscreen)==null||v.call(document):(b=(c=document.documentElement).requestFullscreen)==null||b.call(c)})}async function C(){const a=M(t),s=document.getElementById("newGameBtn");if(!(!s||!(e!=null&&e.id))&&!(e!=null&&e.hasActiveGame&&!await S(a))){s.disabled=!0;try{await I(async()=>{var u;const o=await B(t),{cells:n,startsFirst:m}=P({size:5,words:o}),g={gameId:((u=crypto.randomUUID)==null?void 0:u.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:n,turn:{team:m,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null},{error:l}=await y.from("rooms").update({state:g,language:t}).eq("id",e.id);if(l)throw l;window.location.href=`${G()}/game.html?room=${e.id}&token=${e.guest_token}`})}catch(o){console.error("New game failed:",o),window.alert(a.newGameFailed),s.disabled=!1}}}await p(),d=await K(),d&&(e=await Q(d.id),await p())}export{ie as initHome};
