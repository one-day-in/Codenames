import{i as $,s as w,g as G}from"./url-XkLgVFj3.js";import{D as I,G as R,L as J,t as k}from"./i18n-GZbblII2.js";import{c as K}from"./boardFactory-CFSUbiZD.js";import{I as h}from"./icons-BHowz3ql.js";async function Q(){if(!$)return null;const{data:{user:t}}=await w.auth.getUser();return t}async function V(){if(!$){window.alert("Google auth is not configured for this deployment yet.");return}const{error:t}=await w.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});t&&console.error("Auth error:",t)}async function Z(){$&&await w.auth.signOut()}async function ee(t){if(!$)throw new Error("Supabase is not configured.");const{data:n}=await w.from("rooms").select("id, guest_token, state, language").eq("owner_id",t).maybeSingle();if(n)return{id:n.id,guest_token:n.guest_token,hasActiveGame:!!n.state,language:n.language};const a=te(),{data:e}=await w.from("rooms").insert({id:a,owner_id:t}).select("id, guest_token").single();return{id:e.id,guest_token:e.guest_token,hasActiveGame:!1,language:null}}function te(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}const L=30*60*1e3,S=25,ne=350,oe=1e4,M=new Map;function A(t){return`nw_words_cache_${t}`}function ae(t){const n=M.get(t);if(n&&Date.now()-n.ts<L)return n.words;try{const a=localStorage.getItem(A(t));if(!a)return null;const e=JSON.parse(a);return!(e!=null&&e.ts)||!Array.isArray(e==null?void 0:e.words)||Date.now()-e.ts>=L?null:(M.set(t,{ts:e.ts,words:e.words}),e.words)}catch{return null}}function se(t,n){const a={ts:Date.now(),words:n};M.set(t,a);try{localStorage.setItem(A(t),JSON.stringify(a))}catch{}}function re(t,n){return Promise.race([t,new Promise((a,e)=>setTimeout(()=>e(new Error("Words request timeout")),n))])}async function B(t="uk",{force:n=!1}={}){if(!n){const u=ae(t);if(u&&u.length>=S)return u}const a=w.from("words").select("word").eq("language",t).eq("active",!0).limit(ne),{data:e,error:v}=await re(a,oe),y=(e||[]).map(u=>u.word).filter(Boolean);if(v||y.length<S)throw new Error(`Cannot load words (language: ${t})`);return se(t,y),y}function ce(){try{return localStorage.getItem("nw_lang")||I}catch{return I}}function ie(t){try{localStorage.setItem("nw_lang",t)}catch{}}async function fe(t){let n=ce(),a=null,e=null,v=null,y=!0,u=null;function C(s=16){const b=7.140000000000001,W=19*.34,_=[];for(let d=0;d<4;d+=1)for(let g=0;g<4;g+=1)_.push({r:d,c:g});for(let d=_.length-1;d>0;d-=1){const g=Math.floor(Math.random()*(d+1));[_[d],_[g]]=[_[g],_[d]]}return _.slice(0,s).map(({r:d,c:g},D)=>{const O=8+21*(g+.5),q=12+19*(d+.5),H=Math.round(O+(Math.random()*2-1)*b),z=Math.round(q+(Math.random()*2-1)*W),X=Math.round(24+Math.random()*56),Y=(3+Math.random()*2).toFixed(2),j=(Math.random()*2.5).toFixed(2),P=(.3+Math.random()*.5).toFixed(2);return{id:D,size:X,left:H,top:z,period:Y,delay:j,alpha:P}})}const N=C(16);function U(s){return new Promise(c=>{var f;const r=document.createElement("div");r.className="confirm-modal",r.innerHTML=`
                <div class="confirm-modal__backdrop" data-close="cancel"></div>
                <div class="confirm-modal__content" role="dialog" aria-modal="true">
                    <h2 class="confirm-modal__title">${s.newGame}</h2>
                    <p class="confirm-modal__text">${s.confirmNewGame}</p>
                    <div class="confirm-modal__actions">
                        <button class="lobby__btn confirm-modal__btn confirm-modal__btn--confirm" data-close="confirm">
                            ${s.confirmNewGameAction}
                        </button>
                        <button class="lobby__btn confirm-modal__btn confirm-modal__btn--cancel" data-close="cancel">
                            ${s.cancel}
                        </button>
                    </div>
                </div>
            `;const o=l=>{document.removeEventListener("keydown",m),r.remove(),c(l)},m=l=>{l.key==="Escape"&&o(!1)};r.addEventListener("click",l=>{var p,b;const i=(b=(p=l.target)==null?void 0:p.dataset)==null?void 0:b.close;i==="confirm"&&o(!0),i==="cancel"&&o(!1)}),document.addEventListener("keydown",m),document.body.appendChild(r),(f=r.querySelector(".confirm-modal__btn--confirm"))==null||f.focus()})}function x(s){a&&v!==s&&(v=s,B(s).catch(()=>{v=null}))}async function E(){const s=k(n),c=!!(a&&(e!=null&&e.id)),r=!!(e!=null&&e.hasActiveGame&&(!(e!=null&&e.language)||e.language===n));document.body.className="",t.innerHTML=`
            <div class="app ${y?"":"app--intro"}">

                <div class="lang-toggle">
                    ${J.map(o=>`
                        <button
                            class="lang-toggle__btn ${o.code===n?"lang-toggle__btn--active":""}"
                            data-lang="${o.code}">
                            ${o.label}
                        </button>
                    `).join("")}
                </div>

                <div class="lobby-screen">
                    <div class="home-eyes" aria-hidden="true">
                        ${N.map(o=>`
                            <span class="home-eye"
                                style="--eye-size:${o.size}px;--eye-left:${o.left}%;--eye-top:${o.top}%;--eye-period:${o.period}s;--eye-delay:${o.delay}s;--eye-alpha:${o.alpha};">
                                <span class="home-eye__open">${h.eye}</span>
                                <span class="home-eye__closed">${h.eyeClosed}</span>
                            </span>
                        `).join("")}
                    </div>

                    <div class="lobby__title-wrap">
                        <h1 class="lobby__title">${R}</h1>
                    </div>

                    ${c?`
                            <div class="lobby-screen__actions">
                                ${e!=null&&e.hasActiveGame&&r?`
                                        <button class="lobby__btn lobby__btn--continue" id="continueBtn">
                                            ${s.continueGame}
                                        </button>
                                      `:""}
                                <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                                    ${s.newGame}
                                </button>
                            </div>
                        `:`
                            <button class="lobby__btn lobby__btn--google" id="loginBtn">
                                <span class="lobby__btn-text">${s.signIn}</span>
                                <span class="lobby__btn-google-icon">${h.google}</span>
                            </button>
                        `}

                </div>
            </div>

            ${a?`<button class="btn-logout btn-icon" id="logoutBtn" title="${a.email}">${h.user}</button>`:""}
            <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${h.maximize}</button>
        `,F(),x(n),y=!0}function F(s){var o,m,f,l;t.querySelectorAll(".lang-toggle__btn").forEach(i=>{i.addEventListener("click",()=>{n=i.dataset.lang,ie(n),E()})}),(o=document.getElementById("loginBtn"))==null||o.addEventListener("click",V),(m=document.getElementById("continueBtn"))==null||m.addEventListener("click",()=>{window.location.href=`${G()}/game.html?room=${e.id}&token=${e.guest_token}`}),(f=document.getElementById("newGameBtn"))==null||f.addEventListener("click",T),(l=document.getElementById("logoutBtn"))==null||l.addEventListener("click",async()=>{if(e!=null&&e.id)try{await w.from("rooms").update({state:null}).eq("id",e.id)}catch(i){console.error("Failed to clear room on logout:",i)}await Z(),a=null,e=null,E()});const c=document.getElementById("fullscreenBtn"),r=()=>{c&&(c.innerHTML=document.fullscreenElement?h.minimize:h.maximize)};r(),u&&document.removeEventListener("fullscreenchange",u),u=()=>r(),document.addEventListener("fullscreenchange",u),c==null||c.addEventListener("click",()=>{var i,p,b;document.fullscreenElement?(b=document.exitFullscreen)==null||b.call(document):(p=(i=document.documentElement).requestFullscreen)==null||p.call(i)})}async function T(){var r;const s=k(n),c=document.getElementById("newGameBtn");if(!(!c||!(e!=null&&e.id))&&!(e!=null&&e.hasActiveGame&&!await U(s))){c.disabled=!0;try{const o=await B(n),{cells:m,startsFirst:f}=K({size:5,words:o}),l={gameId:((r=crypto.randomUUID)==null?void 0:r.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:m,turn:{team:f,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null},{error:i}=await w.from("rooms").update({state:l,language:n}).eq("id",e.id);if(i)throw i;window.location.href=`${G()}/game.html?room=${e.id}&token=${e.guest_token}`}catch(o){console.error("New game failed:",o),window.alert(s.newGameFailed),c.disabled=!1}}}await E(),a=await Q(),a&&(e=await ee(a.id),await E())}export{fe as initHome};
