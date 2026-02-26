import{s as v,G as b,D as f,L as h,t as _,g as w}from"./url-oOUZ7you.js";import{g as B,a as p,s as G,b as L}from"./auth-Cy9wPIq3.js";import{c as I}from"./boardFactory-CFSUbiZD.js";import{I as y}from"./icons-DY9imHO6.js";async function k(o="uk"){const{data:t,error:n}=await v.from("words").select("word").eq("language",o).eq("active",!0);if(n||!t||t.length<25)throw new Error(`Cannot load words (language: ${o})`);return t.map(e=>e.word)}function A(){try{return localStorage.getItem("nw_lang")||f}catch{return f}}function S(o){try{localStorage.setItem("nw_lang",o)}catch{}}async function F(o){let t=A(),n=null,e=null;async function u(){const s=_(t);document.body.className="",o.innerHTML=`
            <div class="app">

                <div class="lang-toggle">
                    ${h.map(a=>`
                        <button
                            class="lang-toggle__btn ${a.code===t?"lang-toggle__btn--active":""}"
                            data-lang="${a.code}">
                            ${a.label}
                        </button>
                    `).join("")}
                </div>

                <div class="lobby-screen">
                    <h1 class="lobby__title">${b}</h1>

                    ${n?`
                            <div class="lobby-screen__actions">
                                ${e!=null&&e.hasActiveGame?`
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

            ${n?`<button class="btn-profile btn-icon" id="profileBtn" title="${n.email}">${y.user}</button>`:""}
            <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${y.maximize}</button>
        `,E()}function E(s){var a,i,c,r,d;o.querySelectorAll(".lang-toggle__btn").forEach(l=>{l.addEventListener("click",()=>{t=l.dataset.lang,S(t),u()})}),(a=document.getElementById("loginBtn"))==null||a.addEventListener("click",G),(i=document.getElementById("continueBtn"))==null||i.addEventListener("click",()=>{window.location.href=`${w()}/game.html?room=${e.id}&token=${e.guest_token}`}),(c=document.getElementById("newGameBtn"))==null||c.addEventListener("click",$),(r=document.getElementById("profileBtn"))==null||r.addEventListener("click",async()=>{await L(),n=null,e=null,u()}),(d=document.getElementById("fullscreenBtn"))==null||d.addEventListener("click",()=>{var l,m,g;document.fullscreenElement?(g=document.exitFullscreen)==null||g.call(document):(m=(l=document.documentElement).requestFullscreen)==null||m.call(l)})}async function $(){var l;const s=_(t);if(e!=null&&e.hasActiveGame&&!confirm(s.confirmNewGame))return;const a=document.getElementById("newGameBtn");a.disabled=!0,a.textContent=s.loading;const i=await k(t),{cells:c,startsFirst:r}=I({size:5,words:i}),d={gameId:((l=crypto.randomUUID)==null?void 0:l.call(crypto))||Math.random().toString(36).slice(2),phase:"lobby",size:5,cells:c,turn:{team:r,guideLimit:null,dreamwalkerMoves:0},gameOver:!1,winner:null};await v.from("rooms").update({state:d,language:t}).eq("id",e.id),window.location.href=`${w()}/game.html?room=${e.id}&token=${e.guest_token}`}o.innerHTML=`
        <div class="app">
            <div class="lobby-screen">
                <h1 class="lobby__title">${b}</h1>
            </div>
        </div>
    `,n=await B(),n&&(e=await p(n.id)),u()}export{F as initHome};
