const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/boardFactory-B-8M8XMO.js","assets/i18n-BSQgICzt.js","assets/i18n-Bs_83nby.css"])))=>i.map(i=>d[i]);
import{s,D as y,L as v,t as g}from"./i18n-BSQgICzt.js";import{_ as p}from"./preload-helper-Dg2ainw4.js";async function L(){const{data:{user:t}}=await s.auth.getUser();return t}async function k(){const{error:t}=await s.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});t&&console.error("Auth error:",t)}async function B(){await s.auth.signOut()}async function E(t){const{data:e}=await s.from("rooms").select("id, guest_token, state").eq("owner_id",t).maybeSingle();if(e)return{id:e.id,guest_token:e.guest_token,hasActiveGame:!!e.state};const a=A(),{data:i}=await s.from("rooms").insert({id:a,owner_id:t}).select("id, guest_token").single();return{id:i.id,guest_token:i.guest_token,hasActiveGame:!1}}function A(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function G(){const{origin:t,pathname:e}=window.location;return t+e.split("?")[0].replace(/\/[^/]*$/,"")}function I(){return localStorage.getItem("nw_lang")||y}function U(t){localStorage.setItem("nw_lang",t)}async function $(t){let e=I(),a=null;function i(){var o,l,c;const r=g(e);document.body.className="",t.innerHTML=`
            <div class="app">
                <div class="lang-toggle">
                    ${v.map(n=>`
                        <button class="lang-toggle__btn ${n.code===e?"lang-toggle__btn--active":""}"
                                data-lang="${n.code}">${n.label}</button>
                    `).join("")}
                </div>
                <div class="lobby-screen">
                    <h1 class="lobby__title">NightWalkers</h1>

                    ${a?`
                        <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                            ${r.newGame}
                        </button>
                        <button class="sign-out-btn" id="signOutBtn">${a.email}</button>
                    `:`
                        <button class="lobby__btn lobby__btn--google" id="loginBtn">
                            <svg width="20" height="20" viewBox="0 0 48 48" style="margin-right:10px;vertical-align:middle">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            </svg>
                            ${r.signIn}
                        </button>
                    `}
                </div>
            </div>`,t.querySelectorAll(".lang-toggle__btn").forEach(n=>{n.addEventListener("click",()=>{e=n.dataset.lang,U(e),i()})}),(o=document.getElementById("loginBtn"))==null||o.addEventListener("click",()=>{k()}),(l=document.getElementById("signOutBtn"))==null||l.addEventListener("click",async()=>{await B(),a=null,i()}),(c=document.getElementById("newGameBtn"))==null||c.addEventListener("click",async()=>{await u()})}async function u(){var d;const r=g(e),o=await E(a.id);if(o.hasActiveGame&&!confirm(r.confirmNewGame))return;const{createBoard:l,loadWords:c}=await p(async()=>{const{createBoard:f,loadWords:h}=await import("./boardFactory-B-8M8XMO.js");return{createBoard:f,loadWords:h}},__vite__mapDeps([0,1,2])),n=await c(e),{cells:m,startsFirst:b}=l({size:5,words:n}),_={gameId:((d=crypto.randomUUID)==null?void 0:d.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:m,turn:{team:b,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null};await s.from("rooms").update({state:_,language:e}).eq("id",o.id);const w=G();window.location.href=`${w}/game.html?room=${o.id}&token=${o.guest_token}`}t.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">NightWalkers</h1>
            </div>
        </div>`,a=await L(),i()}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");t&&$(t)});
