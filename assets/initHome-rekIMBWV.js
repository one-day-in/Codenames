import{s as d,G as b,D as h,L as _,g as w,t as y}from"./url-DqvqMluG.js";async function v(){const{data:{user:n}}=await d.auth.getUser();return n}async function p(){const{error:n}=await d.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});n&&console.error("Auth error:",n)}async function A(){await d.auth.signOut()}async function E(n){const{data:t}=await d.from("rooms").select("id, guest_token, state").eq("owner_id",n).maybeSingle();if(t)return{id:t.id,guest_token:t.guest_token,hasActiveGame:!!t.state};const o=$(),{data:e}=await d.from("rooms").insert({id:o,owner_id:n}).select("id, guest_token").single();return{id:e.id,guest_token:e.guest_token,hasActiveGame:!1}}function $(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function m(n){const t=[...n];for(let o=t.length-1;o>0;o--){const e=Math.floor(Math.random()*(o+1));[t[o],t[e]]=[t[e],t[o]]}return t}function k(n,t){if(t>n.length)throw new Error(`Cannot pick ${t} from array of ${n.length}`);return m(n).slice(0,t)}function B(n){const t=n*n,o=Math.random()<.5?"resonant":"dissonant",e=Math.ceil(t/3),r=e-1,u=o==="resonant"?e:r,a=o==="dissonant"?e:r,i=1,s=t-u-a-i,l=[...Array(u).fill("resonant"),...Array(a).fill("dissonant"),...Array(s).fill("anomaly"),...Array(i).fill("nightmare")];return{roles:m(l),startsFirst:o}}const G={resonant:9,dissonant:9,anomaly:7,nightmare:1};function I(n){return m(Array.from({length:n},(t,o)=>o+1))}function M({size:n,words:t}){const{roles:o,startsFirst:e}=B(n),r=Object.fromEntries(Object.entries(G).map(([a,i])=>[a,I(i)]));return{cells:k(t,n*n).map((a,i)=>{const s=o[i],l=r[s].shift()??1;return{word:a,role:s,imageVariant:l,revealed:!1}}),startsFirst:e}}async function C(n="uk"){const{data:t,error:o}=await d.from("words").select("word").eq("language",n).eq("active",!0);if(o||!t||t.length<25)throw new Error(`Cannot load words (language: ${n})`);return t.map(e=>e.word)}function L(){try{return localStorage.getItem("nw_lang")||h}catch{return h}}function U(n){try{localStorage.setItem("nw_lang",n)}catch{}}async function O(n){let t=L(),o=null,e=null;function r(){var i,s,l,g;const a=y(t);document.body.className="",n.innerHTML=`
            <div class="app">
                <div class="lang-toggle">
                    ${_.map(c=>`
                        <button class="lang-toggle__btn ${c.code===t?"lang-toggle__btn--active":""}"
                                data-lang="${c.code}">${c.label}</button>
                    `).join("")}
                </div>
                <div class="lobby-screen">
                    <h1 class="lobby__title">${b}</h1>
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
            </div>`,n.querySelectorAll(".lang-toggle__btn").forEach(c=>{c.addEventListener("click",()=>{t=c.dataset.lang,U(t),r()})}),(i=document.getElementById("loginBtn"))==null||i.addEventListener("click",p),(s=document.getElementById("signOutBtn"))==null||s.addEventListener("click",async()=>{await A(),o=null,e=null,r()}),(l=document.getElementById("continueBtn"))==null||l.addEventListener("click",()=>{window.location.href=`${w()}/game.html?room=${e.id}&token=${e.guest_token}`}),(g=document.getElementById("newGameBtn"))==null||g.addEventListener("click",u)}async function u(){var f;const a=y(t);if(e!=null&&e.hasActiveGame&&!confirm(a.confirmNewGame))return;const i=document.getElementById("newGameBtn");i.disabled=!0,i.textContent=a.loading;const s=await C(t),{cells:l,startsFirst:g}=M({size:5,words:s}),c={gameId:((f=crypto.randomUUID)==null?void 0:f.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:l,turn:{team:g,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null};await d.from("rooms").update({state:c,language:t}).eq("id",e.id),window.location.href=`${w()}/game.html?room=${e.id}&token=${e.guest_token}`}n.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">${b}</h1>
            </div>
        </div>`,o=await v(),o&&(e=await E(o.id)),r()}export{O as initHome};
