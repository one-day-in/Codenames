import{s as r,G as f,D as h,L as _,g as b,t as w}from"./url-DqvqMluG.js";async function v(){const{data:{user:n}}=await r.auth.getUser();return n}async function p(){const{error:n}=await r.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});n&&console.error("Auth error:",n)}async function A(){await r.auth.signOut()}async function $(n){const{data:t}=await r.from("rooms").select("id, guest_token, state").eq("owner_id",n).maybeSingle();if(t)return{id:t.id,guest_token:t.guest_token,hasActiveGame:!!t.state};const o=k(),{data:e}=await r.from("rooms").insert({id:o,owner_id:n}).select("id, guest_token").single();return{id:e.id,guest_token:e.guest_token,hasActiveGame:!1}}function k(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function y(n){const t=[...n];for(let o=t.length-1;o>0;o--){const e=Math.floor(Math.random()*(o+1));[t[o],t[e]]=[t[e],t[o]]}return t}function B(n,t){if(t>n.length)throw new Error(`Cannot pick ${t} from array of ${n.length}`);return y(n).slice(0,t)}function E(n){const t=n*n,o=Math.random()<.5?"resonant":"dissonant",e=Math.ceil(t/3),l=e-1,c=o==="resonant"?e:l,a=o==="dissonant"?e:l,i=1,d=t-c-a-i,u=[...Array(c).fill("resonant"),...Array(a).fill("dissonant"),...Array(d).fill("anomaly"),...Array(i).fill("nightmare")];return{roles:y(u),startsFirst:o}}const G=7;function M({size:n,words:t}){const{roles:o,startsFirst:e}=E(n);return{cells:B(t,n*n).map((c,a)=>({word:c,role:o[a],anomalyVariant:o[a]==="anomaly"?Math.ceil(Math.random()*G):null,revealed:!1})),startsFirst:e}}async function C(n="uk"){const{data:t,error:o}=await r.from("words").select("word").eq("language",n).eq("active",!0);if(o||!t||t.length<25)throw new Error(`Cannot load words (language: ${n})`);return t.map(e=>e.word)}function I(){try{return localStorage.getItem("nw_lang")||h}catch{return h}}function L(n){try{localStorage.setItem("nw_lang",n)}catch{}}async function S(n){let t=I(),o=null,e=null;function l(){var i,d,u,g;const a=w(t);document.body.className="",n.innerHTML=`
            <div class="app">
                <div class="lang-toggle">
                    ${_.map(s=>`
                        <button class="lang-toggle__btn ${s.code===t?"lang-toggle__btn--active":""}"
                                data-lang="${s.code}">${s.label}</button>
                    `).join("")}
                </div>
                <div class="lobby-screen">
                    <h1 class="lobby__title">${f}</h1>
                    ${o?`
                        <div class="lobby-screen__actions">
                            ${e!=null&&e.hasActiveGame?`
                                <button class="lobby__btn lobby__btn--continue" id="continueBtn">
                                    ${a.continueGame}
                                </button>
                            `:""}
                            <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                                ${a.newGame}
                            </button>
                        </div>
                        <button class="sign-out-btn" id="signOutBtn">${o.email}</button>
                    `:`
                        <button class="lobby__btn lobby__btn--google" id="loginBtn">
                            <svg width="20" height="20" viewBox="0 0 48 48" style="margin-right:10px;vertical-align:middle">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            </svg>
                            ${a.signIn}
                        </button>
                    `}
                </div>
            </div>`,n.querySelectorAll(".lang-toggle__btn").forEach(s=>{s.addEventListener("click",()=>{t=s.dataset.lang,L(t),l()})}),(i=document.getElementById("loginBtn"))==null||i.addEventListener("click",p),(d=document.getElementById("signOutBtn"))==null||d.addEventListener("click",async()=>{await A(),o=null,e=null,l()}),(u=document.getElementById("continueBtn"))==null||u.addEventListener("click",()=>{window.location.href=`${b()}/game.html?room=${e.id}&token=${e.guest_token}`}),(g=document.getElementById("newGameBtn"))==null||g.addEventListener("click",c)}async function c(){var m;const a=w(t);if(e!=null&&e.hasActiveGame&&!confirm(a.confirmNewGame))return;const i=document.getElementById("newGameBtn");i.disabled=!0,i.textContent=a.loading;const d=await C(t),{cells:u,startsFirst:g}=M({size:5,words:d}),s={gameId:((m=crypto.randomUUID)==null?void 0:m.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:u,turn:{team:g,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null};await r.from("rooms").update({state:s,language:t}).eq("id",e.id),window.location.href=`${b()}/game.html?room=${e.id}&token=${e.guest_token}`}n.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">${f}</h1>
            </div>
        </div>`,o=await v(),o&&(e=await $(o.id)),l()}export{S as initHome};
