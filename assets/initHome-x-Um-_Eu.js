import{i as $,s as h,D as B,G as j,I as y,L as T,t as L,g as k,l as M}from"./icons-wP800kuJ.js";import{w as I,c as P}from"./loader-rCguY_LR.js";async function K(){if(!$)return null;const{data:{user:i}}=await h.auth.getUser();return i}async function R(){if(!$){window.alert("Google auth is not configured for this deployment yet.");return}const{error:i}=await h.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});i&&console.error("Auth error:",i)}async function J(){$&&await h.auth.signOut()}async function Q(i){if(!$)throw new Error("Supabase is not configured.");const{data:o}=await h.from("rooms").select("id, guest_token, state, language").eq("owner_id",i).maybeSingle();if(o)return{id:o.id,guest_token:o.guest_token,hasActiveGame:!!o.state,language:o.language,state:o.state??null};const d=V(),{data:e}=await h.from("rooms").insert({id:d,owner_id:i}).select("id, guest_token").single();return{id:e.id,guest_token:e.guest_token,hasActiveGame:!1,language:null,state:null}}function V(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function Z(){try{return localStorage.getItem("nw_lang")||B}catch{return B}}function ee(i){try{localStorage.setItem("nw_lang",i)}catch{}}async function ae(i){let o=Z(),d=null,e=null,E=null,G=!0,w=null;function x(n=16){const f=7.140000000000001,v=19*.34,_=[];for(let r=0;r<4;r+=1)for(let b=0;b<4;b+=1)_.push({r,c:b});for(let r=_.length-1;r>0;r-=1){const b=Math.floor(Math.random()*(r+1));[_[r],_[b]]=[_[b],_[r]]}return _.slice(0,n).map(({r,c:b},N)=>{const z=8+21*(b+.5),H=12+19*(r+.5),W=Math.round(z+(Math.random()*2-1)*f),X=Math.round(H+(Math.random()*2-1)*v),Y=Math.round(24+Math.random()*56),q=(3+Math.random()*2).toFixed(2),D=(Math.random()*2.5).toFixed(2),O=(.3+Math.random()*.5).toFixed(2);return{id:N,size:Y,left:W,top:X,period:q,delay:D,alpha:O}})}const A=x(16);function S(n){return new Promise(s=>{var g;const a=document.createElement("div");a.className="confirm-modal",a.innerHTML=`
                <div class="confirm-modal__backdrop" data-close="cancel"></div>
                <div class="confirm-modal__content" role="dialog" aria-modal="true">
                    <h2 class="confirm-modal__title">${n.newGame}</h2>
                    <p class="confirm-modal__text">${n.confirmNewGame}</p>
                    <div class="confirm-modal__actions">
                        <button class="lobby__btn confirm-modal__btn confirm-modal__btn--confirm" data-close="confirm">
                            ${n.confirmNewGameAction}
                        </button>
                        <button class="lobby__btn confirm-modal__btn confirm-modal__btn--cancel" data-close="cancel">
                            ${n.cancel}
                        </button>
                    </div>
                </div>
            `;const t=l=>{document.removeEventListener("keydown",m),a.remove(),s(l)},m=l=>{l.key==="Escape"&&t(!1)};a.addEventListener("click",l=>{var c,f;const u=(f=(c=l.target)==null?void 0:c.dataset)==null?void 0:f.close;u==="confirm"&&t(!0),u==="cancel"&&t(!1)}),document.addEventListener("keydown",m),document.body.appendChild(a),(g=a.querySelector(".confirm-modal__btn--confirm"))==null||g.focus()})}function U(n){d&&E!==n&&(E=n,M(n).catch(()=>{E=null}))}async function p(){const n=L(o),s=!!(d&&(e!=null&&e.id)),a=!!(e!=null&&e.hasActiveGame&&(!(e!=null&&e.language)||e.language===o));document.body.className="",i.innerHTML=`
            <div class="app ${G?"":"app--intro"}">

                <div class="lang-toggle">
                    ${T.map(t=>`
                        <button
                            class="lang-toggle__btn ${t.code===o?"lang-toggle__btn--active":""}"
                            data-lang="${t.code}">
                            ${t.label}
                        </button>
                    `).join("")}
                </div>

                <div class="lobby-screen">
                    <div class="home-eyes" aria-hidden="true">
                        ${A.map(t=>`
                            <span class="home-eye"
                                style="--eye-size:${t.size}px;--eye-left:${t.left}%;--eye-top:${t.top}%;--eye-period:${t.period}s;--eye-delay:${t.delay}s;--eye-alpha:${t.alpha};">
                                <span class="home-eye__open">${y.eye}</span>
                                <span class="home-eye__closed">${y.eyeClosed}</span>
                            </span>
                        `).join("")}
                    </div>

                    <div class="lobby__title-wrap">
                        <h1 class="lobby__title">${j}</h1>
                    </div>

                    ${s?`
                            <div class="lobby-screen__actions">
                                ${e!=null&&e.hasActiveGame&&a?`
                                        <button class="lobby__btn lobby__btn--continue" id="continueBtn">
                                            ${n.continueGame}
                                        </button>
                                      `:""}
                                <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                                    ${n.newGame}
                                </button>
                                <button class="lobby__btn lobby__btn--sandbox" id="sandboxBtn">
                                    ${n.sandboxBoard}
                                </button>
                            </div>
                        `:`
                            <button class="lobby__btn lobby__btn--google" id="loginBtn">
                                <span class="lobby__btn-text">${n.signIn}</span>
                                <span class="lobby__btn-google-icon">${y.google}</span>
                            </button>
                        `}

                </div>
            </div>

            ${d?`<button class="btn-logout btn-icon" id="logoutBtn" title="${d.email}">${y.user}</button>`:""}
            <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${y.maximize}</button>
        `,F(),U(o),G=!0}function F(n){var t,m,g,l,u;i.querySelectorAll(".lang-toggle__btn").forEach(c=>{c.addEventListener("click",()=>{o=c.dataset.lang,ee(o),p()})}),(t=document.getElementById("loginBtn"))==null||t.addEventListener("click",R),(m=document.getElementById("continueBtn"))==null||m.addEventListener("click",()=>{window.location.href=`${k()}/game.html?room=${e.id}&token=${e.guest_token}`}),(g=document.getElementById("newGameBtn"))==null||g.addEventListener("click",C),(l=document.getElementById("sandboxBtn"))==null||l.addEventListener("click",()=>{!(e!=null&&e.id)||!(e!=null&&e.guest_token)||(window.location.href=`${k()}/sandbox.html?room=${e.id}&token=${e.guest_token}`)}),(u=document.getElementById("logoutBtn"))==null||u.addEventListener("click",async()=>{await I(async()=>{if(e!=null&&e.id)try{await h.from("rooms").update({state:null}).eq("id",e.id)}catch(c){console.error("Failed to clear room on logout:",c)}await J(),d=null,e=null,p()})});const s=document.getElementById("fullscreenBtn"),a=()=>{s&&(s.innerHTML=document.fullscreenElement?y.minimize:y.maximize)};a(),w&&document.removeEventListener("fullscreenchange",w),w=()=>a(),document.addEventListener("fullscreenchange",w),s==null||s.addEventListener("click",()=>{var c,f,v;document.fullscreenElement?(v=document.exitFullscreen)==null||v.call(document):(f=(c=document.documentElement).requestFullscreen)==null||f.call(c)})}async function C(){const n=L(o),s=document.getElementById("newGameBtn");if(!(!s||!(e!=null&&e.id))&&!(e!=null&&e.hasActiveGame&&!await S(n))){s.disabled=!0;try{await I(async()=>{var u;const a=await M(o),{cells:t,startsFirst:m}=P({size:5,words:a}),g={gameId:((u=crypto.randomUUID)==null?void 0:u.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:t,turn:{team:m,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null},{error:l}=await h.from("rooms").update({state:g,language:o}).eq("id",e.id);if(l)throw l;window.location.href=`${k()}/game.html?room=${e.id}&token=${e.guest_token}`})}catch(a){console.error("New game failed:",a),window.alert(n.newGameFailed),s.disabled=!1}}}await p(),d=await K(),d&&(e=await Q(d.id),await p())}export{ae as initHome};
