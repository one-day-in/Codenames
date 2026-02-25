import{s as c,G as y,D as h,L as v,t as w,g as _}from"./url-DqvqMluG.js";async function p(){const{data:{user:n}}=await c.auth.getUser();return n}async function k(){const{error:n}=await c.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});n&&console.error("Auth error:",n)}async function A(){await c.auth.signOut()}async function $(n){const{data:t}=await c.from("rooms").select("id, guest_token, state").eq("owner_id",n).maybeSingle();if(t)return{id:t.id,guest_token:t.guest_token,hasActiveGame:!!t.state};const o=E(),{data:e}=await c.from("rooms").insert({id:o,owner_id:n}).select("id, guest_token").single();return{id:e.id,guest_token:e.guest_token,hasActiveGame:!1}}function E(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID().slice(0,8):Math.random().toString(36).slice(2,10)}function f(n){const t=[...n];for(let o=t.length-1;o>0;o--){const e=Math.floor(Math.random()*(o+1));[t[o],t[e]]=[t[e],t[o]]}return t}function G(n,t){if(t>n.length)throw new Error(`Cannot pick ${t} from array of ${n.length}`);return f(n).slice(0,t)}function B(n){const t=n*n,o=Math.random()<.5?"resonant":"dissonant",e=Math.ceil(t/3),i=e-1,d=o==="resonant"?e:i,r=o==="dissonant"?e:i,a=1,s=t-d-r-a,l=[...Array(d).fill("resonant"),...Array(r).fill("dissonant"),...Array(s).fill("anomaly"),...Array(a).fill("nightmare")];return{roles:f(l),startsFirst:o}}const I={resonant:9,dissonant:9,anomaly:7,nightmare:1};function L(n){return f(Array.from({length:n},(t,o)=>o+1))}function M({size:n,words:t}){const{roles:o,startsFirst:e}=B(n),i=Object.fromEntries(Object.entries(I).map(([r,a])=>[r,L(a)]));return{cells:G(t,n*n).map((r,a)=>{const s=o[a],l=i[s].shift()??1;return{word:r,role:s,imageVariant:l,revealed:!1}}),startsFirst:e}}async function U(n="uk"){const{data:t,error:o}=await c.from("words").select("word").eq("language",n).eq("active",!0);if(o||!t||t.length<25)throw new Error(`Cannot load words (language: ${n})`);return t.map(e=>e.word)}function C(){try{return localStorage.getItem("nw_lang")||h}catch{return h}}function S(n){try{localStorage.setItem("nw_lang",n)}catch{}}async function x(n){let t=C(),o=null,e=null;async function i(){const a=w(t);document.body.className="",n.innerHTML=`
            <div class="app">

                <div class="lang-toggle">
                    ${v.map(s=>`
                        <button
                            class="lang-toggle__btn ${s.code===t?"lang-toggle__btn--active":""}"
                            data-lang="${s.code}">
                            ${s.label}
                        </button>
                    `).join("")}
                </div>

                <div class="lobby-screen">
                    <h1 class="lobby__title">${y}</h1>

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

                            <button
                                class="sign-out-btn"
                                id="signOutBtn"
                                title="${o.email}"
                                aria-label="Logout">
                                ${O()}
                            </button>
                        `:`
                            <button class="lobby__btn lobby__btn--google" id="loginBtn">
                                ${a.signIn}
                            </button>
                        `}

                </div>
            </div>
        `,d()}function d(a){var s,l,u,g;n.querySelectorAll(".lang-toggle__btn").forEach(m=>{m.addEventListener("click",()=>{t=m.dataset.lang,S(t),i()})}),(s=document.getElementById("loginBtn"))==null||s.addEventListener("click",k),(l=document.getElementById("signOutBtn"))==null||l.addEventListener("click",async()=>{await A(),o=null,e=null,i()}),(u=document.getElementById("continueBtn"))==null||u.addEventListener("click",()=>{window.location.href=`${_()}/game.html?room=${e.id}&token=${e.guest_token}`}),(g=document.getElementById("newGameBtn"))==null||g.addEventListener("click",r)}async function r(){var b;const a=w(t);if(e!=null&&e.hasActiveGame&&!confirm(a.confirmNewGame))return;const s=document.getElementById("newGameBtn");s.disabled=!0,s.textContent=a.loading;const l=await U(t),{cells:u,startsFirst:g}=M({size:5,words:l}),m={gameId:((b=crypto.randomUUID)==null?void 0:b.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:u,turn:{team:g,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null};await c.from("rooms").update({state:m,language:t}).eq("id",e.id),window.location.href=`${_()}/game.html?room=${e.id}&token=${e.guest_token}`}n.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">${y}</h1>
            </div>
        </div>
    `,o=await p(),o&&(e=await $(o.id)),i()}function O(){return`
        <svg viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
    `}export{x as initHome};
