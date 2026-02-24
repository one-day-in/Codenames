import{s as l,D as g,L as w,t as m}from"./i18n-BwlAWuOW.js";async function y(){const{data:{user:t}}=await l.auth.getUser();return t}async function b(){const{error:t}=await l.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});t&&console.error("Auth error:",t)}async function v(){await l.auth.signOut()}async function _(t){const{data:n}=await l.from("rooms").select("id, guest_token, state").eq("owner_id",t).maybeSingle();if(n)return{id:n.id,guest_token:n.guest_token,hasActiveGame:!!n.state};const e=p(),{data:o}=await l.from("rooms").insert({id:e,owner_id:t}).select("id, guest_token").single();return{id:o.id,guest_token:o.guest_token,hasActiveGame:!1}}function p(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function f(t){const n=[...t];for(let e=n.length-1;e>0;e--){const o=Math.floor(Math.random()*(e+1));[n[e],n[o]]=[n[o],n[e]]}return n}function A(t,n){if(n>t.length)throw new Error(`Cannot pick ${n} from array of ${t.length}`);return f(t).slice(0,n)}function k(t){const n=t*t,e=Math.random()<.5?"resonant":"dissonant",o=Math.ceil(n/3),d=o-1,i=e==="resonant"?o:d,a=e==="dissonant"?o:d,s=1,c=n-i-a-s,r=[...Array(i).fill("resonant"),...Array(a).fill("dissonant"),...Array(c).fill("anomaly"),...Array(s).fill("nightmare")];return{roles:f(r),startsFirst:e}}const B=7;async function E(t="uk"){const{data:n,error:e}=await l.from("words").select("word").eq("language",t).eq("active",!0);if(e||!n||n.length<25)throw new Error(`Cannot load words (language: ${t})`);return n.map(o=>o.word)}function M({size:t,words:n}){const{roles:e,startsFirst:o}=k(t);return{cells:A(n,t*t).map((i,a)=>({word:i,role:e[a],anomalyVariant:e[a]==="anomaly"?Math.ceil(Math.random()*B):null,revealed:!1})),startsFirst:o}}function C(){const{origin:t,pathname:n}=window.location;return t+n.split("?")[0].replace(/\/[^/]*$/,"")}function L(){try{return localStorage.getItem("nw_lang")||g}catch{return g}}function G(t){try{localStorage.setItem("nw_lang",t)}catch{}}async function I(t){let n=L(),e=null;function o(){var a,s,c;const i=m(n);document.body.className="",t.innerHTML=`
            <div class="app">
                <div class="lang-toggle">
                    ${w.map(r=>`
                        <button class="lang-toggle__btn ${r.code===n?"lang-toggle__btn--active":""}"
                                data-lang="${r.code}">${r.label}</button>
                    `).join("")}
                </div>
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>
                    ${e?`
                        <div class="lobby-screen__actions">
                            <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                                ${i.newGame}
                            </button>
                        </div>
                        <button class="sign-out-btn" id="signOutBtn">${e.email}</button>
                    `:`
                        <button class="lobby__btn lobby__btn--google" id="loginBtn">
                            <svg width="20" height="20" viewBox="0 0 48 48" style="margin-right:10px;vertical-align:middle">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            </svg>
                            ${i.signIn}
                        </button>
                    `}
                </div>
            </div>`,t.querySelectorAll(".lang-toggle__btn").forEach(r=>{r.addEventListener("click",()=>{n=r.dataset.lang,G(n),o()})}),(a=document.getElementById("loginBtn"))==null||a.addEventListener("click",b),(s=document.getElementById("signOutBtn"))==null||s.addEventListener("click",async()=>{await v(),e=null,o()}),(c=document.getElementById("newGameBtn"))==null||c.addEventListener("click",d)}async function d(){var u;const i=m(n),a=await _(e.id);if(a.hasActiveGame&&!confirm(i.confirmNewGame))return;document.getElementById("newGameBtn").disabled=!0,document.getElementById("newGameBtn").textContent=i.loading;const s=await E(n),{cells:c,startsFirst:r}=M({size:5,words:s}),h={gameId:((u=crypto.randomUUID)==null?void 0:u.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:c,turn:{team:r,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null};await l.from("rooms").update({state:h,language:n}).eq("id",a.id),window.location.href=`${C()}/game.html?room=${a.id}&token=${a.guest_token}`}t.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">NightWalkers</h1>
            </div>
        </div>`,e=await y(),o()}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&I(t)});
