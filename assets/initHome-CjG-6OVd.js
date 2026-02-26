import{s as $,G as w,D as y,L as p,t as _,g as v}from"./url-oOUZ7you.js";import{g as L,a as G,s as I,b as E}from"./auth-Cy9wPIq3.js";import{c as k}from"./boardFactory-CFSUbiZD.js";import{I as g}from"./icons-DY9imHO6.js";async function A(l="uk"){const{data:e,error:n}=await $.from("words").select("word").eq("language",l).eq("active",!0);if(n||!e||e.length<25)throw new Error(`Cannot load words (language: ${l})`);return e.map(t=>t.word)}function S(){try{return localStorage.getItem("nw_lang")||y}catch{return y}}function U(l){try{localStorage.setItem("nw_lang",l)}catch{}}async function F(l){let e=S(),n=null,t=null;async function c(){const o=_(e);document.body.className="",l.innerHTML=`
            <div class="app">

                <div class="lang-toggle">
                    ${p.map(a=>`
                        <button
                            class="lang-toggle__btn ${a.code===e?"lang-toggle__btn--active":""}"
                            data-lang="${a.code}">
                            ${a.label}
                        </button>
                    `).join("")}
                </div>

                <div class="lobby-screen">
                    <h1 class="lobby__title">${w}</h1>

                    ${n?`
                            <div class="lobby-screen__actions">
                                ${t!=null&&t.hasActiveGame?`
                                        <button class="lobby__btn lobby__btn--continue" id="continueBtn">
                                            ${o.continueGame}
                                        </button>
                                      `:""}
                                <button class="lobby__btn lobby__btn--newgame" id="newGameBtn">
                                    ${o.newGame}
                                </button>
                            </div>

                            <button
                                class="sign-out-btn btn-icon"
                                id="signOutBtn"
                                title="${n.email}"
                                aria-label="Logout">
                                ${g.arrowLeft}
                            </button>
                        `:`
                            <button class="lobby__btn lobby__btn--google" id="loginBtn">
                                ${o.signIn}
                            </button>
                        `}

                </div>
            </div>

            ${n?`<button class="btn-profile btn-icon" id="profileBtn" title="${n.email}">${g.user}</button>`:""}
            <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${g.maximize}</button>
        `,B()}function B(o){var a,r,d,u,m,i;l.querySelectorAll(".lang-toggle__btn").forEach(s=>{s.addEventListener("click",()=>{e=s.dataset.lang,U(e),c()})}),(a=document.getElementById("loginBtn"))==null||a.addEventListener("click",I),(r=document.getElementById("signOutBtn"))==null||r.addEventListener("click",async()=>{await E(),n=null,t=null,c()}),(d=document.getElementById("continueBtn"))==null||d.addEventListener("click",()=>{window.location.href=`${v()}/game.html?room=${t.id}&token=${t.guest_token}`}),(u=document.getElementById("newGameBtn"))==null||u.addEventListener("click",h),(m=document.getElementById("profileBtn"))==null||m.addEventListener("click",async()=>{await E(),n=null,t=null,c()}),(i=document.getElementById("fullscreenBtn"))==null||i.addEventListener("click",()=>{var s,b,f;document.fullscreenElement?(f=document.exitFullscreen)==null||f.call(document):(b=(s=document.documentElement).requestFullscreen)==null||b.call(s)})}async function h(){var i;const o=_(e);if(t!=null&&t.hasActiveGame&&!confirm(o.confirmNewGame))return;const a=document.getElementById("newGameBtn");a.disabled=!0,a.textContent=o.loading;const r=await A(e),{cells:d,startsFirst:u}=k({size:5,words:r}),m={gameId:((i=crypto.randomUUID)==null?void 0:i.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:d,turn:{team:u,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null};await $.from("rooms").update({state:m,language:e}).eq("id",t.id),window.location.href=`${v()}/game.html?room=${t.id}&token=${t.guest_token}`}l.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">${w}</h1>
            </div>
        </div>
    `,n=await L(),n&&(t=await G(n.id)),c()}export{F as initHome};
