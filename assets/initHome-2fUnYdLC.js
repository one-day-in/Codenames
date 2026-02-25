import{s as c,g as h}from"./url-DMe9pim_.js";import{D as b,L as _,t as w}from"./i18n-pkrfkOVn.js";async function v(){const{data:{user:n}}=await c.auth.getUser();return n}async function p(){const{error:n}=await c.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});n&&console.error("Auth error:",n)}async function A(){await c.auth.signOut()}async function k(n){const{data:t}=await c.from("rooms").select("id, guest_token, state").eq("owner_id",n).maybeSingle();if(t)return{id:t.id,guest_token:t.guest_token,hasActiveGame:!!t.state};const a=$(),{data:e}=await c.from("rooms").insert({id:a,owner_id:n}).select("id, guest_token").single();return{id:e.id,guest_token:e.guest_token,hasActiveGame:!1}}function $(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function y(n){const t=[...n];for(let a=t.length-1;a>0;a--){const e=Math.floor(Math.random()*(a+1));[t[a],t[e]]=[t[e],t[a]]}return t}function B(n,t){if(t>n.length)throw new Error(`Cannot pick ${t} from array of ${n.length}`);return y(n).slice(0,t)}function E(n){const t=n*n,a=Math.random()<.5?"resonant":"dissonant",e=Math.ceil(t/3),d=e-1,i=a==="resonant"?e:d,l=a==="dissonant"?e:d,o=1,r=t-i-l-o,u=[...Array(i).fill("resonant"),...Array(l).fill("dissonant"),...Array(r).fill("anomaly"),...Array(o).fill("nightmare")];return{roles:y(u),startsFirst:a}}const G=7;function L({size:n,words:t}){const{roles:a,startsFirst:e}=E(n);return{cells:B(t,n*n).map((i,l)=>({word:i,role:a[l],anomalyVariant:a[l]==="anomaly"?Math.ceil(Math.random()*G):null,revealed:!1})),startsFirst:e}}async function M(n="uk"){const{data:t,error:a}=await c.from("words").select("word").eq("language",n).eq("active",!0);if(a||!t||t.length<25)throw new Error(`Cannot load words (language: ${n})`);return t.map(e=>e.word)}function C(){try{return localStorage.getItem("nw_lang")||b}catch{return b}}function I(n){try{localStorage.setItem("nw_lang",n)}catch{}}async function O(n){let t=C(),a=null,e=null;const d=new URLSearchParams(window.location.search).get("dev")==="1"?"&dev=1":"";function i(){var r,u,g,m;const o=w(t);document.body.className="",n.innerHTML=`
            <div class="app">
                <div class="lang-toggle">
                    ${_.map(s=>`
                        <button class="lang-toggle__btn ${s.code===t?"lang-toggle__btn--active":""}"
                                data-lang="${s.code}">${s.label}</button>
                    `).join("")}
                </div>
                <div class="lobby-screen">
                    <h1 class="lobby__title">SleepWalkers</h1>
                    ${a?`
                        <div class="lobby-screen__actions">
                            ${e!=null&&e.hasActiveGame?`
                                <button class="lobby__btn lobby__btn--continue" id="continueBtn">
                                    ${o.continueGame}
                                </button>
                            `:""}
                            <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                                ${o.newGame}
                            </button>
                        </div>
                        <button class="sign-out-btn" id="signOutBtn">${a.email}</button>
                    `:`
                        <button class="lobby__btn lobby__btn--google" id="loginBtn">
                            <svg width="20" height="20" viewBox="0 0 48 48" style="margin-right:10px;vertical-align:middle">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            </svg>
                            ${o.signIn}
                        </button>
                    `}
                </div>
            </div>`,n.querySelectorAll(".lang-toggle__btn").forEach(s=>{s.addEventListener("click",()=>{t=s.dataset.lang,I(t),i()})}),(r=document.getElementById("loginBtn"))==null||r.addEventListener("click",p),(u=document.getElementById("signOutBtn"))==null||u.addEventListener("click",async()=>{await A(),a=null,e=null,i()}),(g=document.getElementById("continueBtn"))==null||g.addEventListener("click",()=>{window.location.href=`${h()}/game.html?room=${e.id}&token=${e.guest_token}${d}`}),(m=document.getElementById("newGameBtn"))==null||m.addEventListener("click",l)}async function l(){var f;const o=w(t);if(e!=null&&e.hasActiveGame&&!confirm(o.confirmNewGame))return;const r=document.getElementById("newGameBtn");r.disabled=!0,r.textContent=o.loading;const u=await M(t),{cells:g,startsFirst:m}=L({size:5,words:u}),s={gameId:((f=crypto.randomUUID)==null?void 0:f.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:g,turn:{team:m,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null};await c.from("rooms").update({state:s,language:t}).eq("id",e.id),window.location.href=`${h()}/game.html?room=${e.id}&token=${e.guest_token}${d}`}n.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">SleepWalkers</h1>
            </div>
        </div>`,a=await v(),a&&(e=await k(a.id)),i()}export{O as initHome};
