import{i as E,s as g,g as M}from"./url-XkLgVFj3.js";import{D as k,G as P,L as R,t as I}from"./i18n-DXZvh-jR.js";import{c as J}from"./boardFactory-CFSUbiZD.js";import{I as $}from"./icons-Bcd_E9sO.js";async function K(){if(!E)return null;const{data:{user:t}}=await g.auth.getUser();return t}async function Q(){if(!E){window.alert("Google auth is not configured for this deployment yet.");return}const{error:t}=await g.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});t&&console.error("Auth error:",t)}async function V(){E&&await g.auth.signOut()}async function Z(t){if(!E)throw new Error("Supabase is not configured.");const{data:n}=await g.from("rooms").select("id, guest_token, state, language").eq("owner_id",t).maybeSingle();if(n)return{id:n.id,guest_token:n.guest_token,hasActiveGame:!!n.state,language:n.language};const a=ee(),{data:e}=await g.from("rooms").insert({id:a,owner_id:t}).select("id, guest_token").single();return{id:e.id,guest_token:e.guest_token,hasActiveGame:!1,language:null}}function ee(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}const B=30*60*1e3,S=25,te=350,ne=1e4,G=new Map;function L(t){return`nw_words_cache_${t}`}function oe(t){const n=G.get(t);if(n&&Date.now()-n.ts<B)return n.words;try{const a=localStorage.getItem(L(t));if(!a)return null;const e=JSON.parse(a);return!(e!=null&&e.ts)||!Array.isArray(e==null?void 0:e.words)||Date.now()-e.ts>=B?null:(G.set(t,{ts:e.ts,words:e.words}),e.words)}catch{return null}}function ae(t,n){const a={ts:Date.now(),words:n};G.set(t,a);try{localStorage.setItem(L(t),JSON.stringify(a))}catch{}}function se(t,n){return Promise.race([t,new Promise((a,e)=>setTimeout(()=>e(new Error("Words request timeout")),n))])}async function A(t="uk",{force:n=!1}={}){if(!n){const w=oe(t);if(w&&w.length>=S)return w}const a=g.from("words").select("word").eq("language",t).eq("active",!0).limit(te),{data:e,error:y}=await se(a,ne),b=(e||[]).map(w=>w.word).filter(Boolean);if(y||b.length<S)throw new Error(`Cannot load words (language: ${t})`);return ae(t,b),b}function re(){try{return localStorage.getItem("nw_lang")||k}catch{return k}}function ce(t){try{localStorage.setItem("nw_lang",t)}catch{}}async function me(t){let n=re(),a=null,e=null,y=null,b=!0;function w(s=16){const v=7.140000000000001,O=19*.34,_=[];for(let l=0;l<4;l+=1)for(let f=0;f<4;f+=1)_.push({r:l,c:f});for(let l=_.length-1;l>0;l-=1){const f=Math.floor(Math.random()*(l+1));[_[l],_[f]]=[_[f],_[l]]}return _.slice(0,s).map(({r:l,c:f},T)=>{const x=8+21*(f+.5),F=12+19*(l+.5),q=Math.round(x+(Math.random()*2-1)*v),H=Math.round(F+(Math.random()*2-1)*O),X=Math.round(24+Math.random()*56),Y=(3+Math.random()*2).toFixed(2),z=(Math.random()*2.5).toFixed(2),j=(.3+Math.random()*.5).toFixed(2);return{id:T,size:X,left:q,top:H,period:Y,delay:z,alpha:j}})}const C=w(16);function N(s){return new Promise(i=>{var m;const c=document.createElement("div");c.className="confirm-modal",c.innerHTML=`
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
            `;const o=r=>{document.removeEventListener("keydown",u),c.remove(),i(r)},u=r=>{r.key==="Escape"&&o(!1)};c.addEventListener("click",r=>{var h,v;const d=(v=(h=r.target)==null?void 0:h.dataset)==null?void 0:v.close;d==="confirm"&&o(!0),d==="cancel"&&o(!1)}),document.addEventListener("keydown",u),document.body.appendChild(c),(m=c.querySelector(".confirm-modal__btn--confirm"))==null||m.focus()})}function U(s){a&&y!==s&&(y=s,A(s).catch(()=>{y=null}))}async function p(){const s=I(n),i=!!(a&&(e!=null&&e.id)),c=!!(e!=null&&e.hasActiveGame&&(!(e!=null&&e.language)||e.language===n));document.body.className="",t.innerHTML=`
            <div class="app ${b?"":"app--intro"}">

                <div class="lang-toggle">
                    ${R.map(o=>`
                        <button
                            class="lang-toggle__btn ${o.code===n?"lang-toggle__btn--active":""}"
                            data-lang="${o.code}">
                            ${o.label}
                        </button>
                    `).join("")}
                </div>

                <div class="lobby-screen">
                    <div class="home-eyes" aria-hidden="true">
                        ${C.map(o=>`
                            <span class="home-eye"
                                style="--eye-size:${o.size}px;--eye-left:${o.left}%;--eye-top:${o.top}%;--eye-period:${o.period}s;--eye-delay:${o.delay}s;--eye-alpha:${o.alpha};">
                                <span class="home-eye__open">${$.eye}</span>
                                <span class="home-eye__closed">${$.eyeClosed}</span>
                            </span>
                        `).join("")}
                    </div>

                    <div class="lobby__title-wrap">
                        <h1 class="lobby__title">${P}</h1>
                    </div>

                    ${i?`
                            <div class="lobby-screen__actions">
                                ${e!=null&&e.hasActiveGame&&c?`
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
                                ${s.signIn}
                            </button>
                        `}

                </div>
            </div>

            ${a?`<button class="btn-logout btn-icon" id="logoutBtn" title="${a.email}">${$.user}</button>`:""}
            <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${$.maximize}</button>
        `,W(),U(n),b=!0}function W(s){var i,c,o,u,m;t.querySelectorAll(".lang-toggle__btn").forEach(r=>{r.addEventListener("click",()=>{n=r.dataset.lang,ce(n),p()})}),(i=document.getElementById("loginBtn"))==null||i.addEventListener("click",Q),(c=document.getElementById("continueBtn"))==null||c.addEventListener("click",()=>{window.location.href=`${M()}/game.html?room=${e.id}&token=${e.guest_token}`}),(o=document.getElementById("newGameBtn"))==null||o.addEventListener("click",D),(u=document.getElementById("logoutBtn"))==null||u.addEventListener("click",async()=>{if(e!=null&&e.id)try{await g.from("rooms").update({state:null}).eq("id",e.id)}catch(r){console.error("Failed to clear room on logout:",r)}await V(),a=null,e=null,p()}),(m=document.getElementById("fullscreenBtn"))==null||m.addEventListener("click",()=>{var r,d,h;document.fullscreenElement?(h=document.exitFullscreen)==null||h.call(document):(d=(r=document.documentElement).requestFullscreen)==null||d.call(r)})}async function D(){var c;const s=I(n),i=document.getElementById("newGameBtn");if(!(!i||!(e!=null&&e.id))&&!(e!=null&&e.hasActiveGame&&!await N(s))){i.disabled=!0;try{const o=await A(n),{cells:u,startsFirst:m}=J({size:5,words:o}),r={gameId:((c=crypto.randomUUID)==null?void 0:c.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:u,turn:{team:m,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null},{error:d}=await g.from("rooms").update({state:r,language:n}).eq("id",e.id);if(d)throw d;window.location.href=`${M()}/game.html?room=${e.id}&token=${e.guest_token}`}catch(o){console.error("New game failed:",o),window.alert(s.newGameFailed),i.disabled=!1}}}await p(),a=await K(),a&&(e=await Z(a.id),await p())}export{me as initHome};
