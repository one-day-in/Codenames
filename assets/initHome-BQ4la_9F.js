import{i as G,s as B,G as C,I as f,L as x,g as k,l as I,c as N,a as S,b as F,d as H,D as M,t as z}from"./roomRepository-B6shp1eI.js";import{r as L}from"./entry-SQoFu-ga.js";import{w as A,c as O,o as U}from"./rulesModal-DaUWV22k.js";async function W(){if(!G)return null;const{data:{user:e}}=await B.auth.getUser();return e}async function R(){if(!G){window.alert("Google auth is not configured for this deployment yet.");return}const{error:e}=await B.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});e&&L("auth.signInWithGoogle",e)}async function X(){G&&await B.auth.signOut()}function Y(e=16){const d=7.140000000000001,h=19*.34,m=[];for(let a=0;a<4;a+=1)for(let i=0;i<4;i+=1)m.push({r:a,c:i});for(let a=m.length-1;a>0;a-=1){const i=Math.floor(Math.random()*(a+1));[m[a],m[i]]=[m[i],m[a]]}return m.slice(0,e).map(({r:a,c:i},w)=>{const b=8+21*(i+.5),_=12+19*(a+.5),p=Math.round(b+(Math.random()*2-1)*d),y=Math.round(_+(Math.random()*2-1)*h),v=Math.round(24+Math.random()*56),g=(3+Math.random()*2).toFixed(2),$=(Math.random()*2.5).toFixed(2),E=(.3+Math.random()*.5).toFixed(2);return{id:w,size:v,left:p,top:y,period:g,delay:$,alpha:E}})}function j({lang:e,tr:t,user:o,room:n,canManageGame:l,canContinueCurrentGame:r,introPlayed:s,homeEyes:u}){return`
        <div class="app ${s?"":"app--intro"}">
            <div class="lang-toggle">
                ${x.map(c=>`
                    <button
                        class="lang-toggle__btn ${c.code===e?"lang-toggle__btn--active":""}"
                        data-lang="${c.code}">
                        ${c.label}
                    </button>
                `).join("")}
            </div>

            <div class="home-screen">
                <div class="home-eyes" aria-hidden="true">
                    ${u.map(c=>`
                        <span class="home-eye"
                            style="--eye-size:${c.size}px;--eye-left:${c.left}%;--eye-top:${c.top}%;--eye-period:${c.period}s;--eye-delay:${c.delay}s;--eye-alpha:${c.alpha};">
                            <span class="home-eye__open">${f.eye}</span>
                            <span class="home-eye__closed">${f.eyeClosed}</span>
                        </span>
                    `).join("")}
                </div>

                <div class="home-screen__title-wrap">
                    <h1 class="home-screen__title">${C}</h1>
                </div>

                ${l?`
                        <div class="home-screen__actions">
                            ${n!=null&&n.hasActiveGame&&r?`
                                    <button class="ui-btn home__btn home__btn--continue" id="continueBtn">
                                        ${t.continueGame}
                                    </button>
                                `:""}
                            <button class="ui-btn home__btn home__btn--newgame" id="newGameBtn">
                                ${t.newGame}
                            </button>
                        </div>
                    `:`
                        <button class="ui-btn home__btn home__btn--google" id="loginBtn">
                            <span class="home__btn-text">${t.signIn}</span>
                            <span class="home__btn-google-icon">${f.google}</span>
                        </button>
                    `}
            </div>
        </div>

        ${o?`<button class="btn-logout btn-icon" id="logoutBtn" title="${o.email}">${f.user}</button>`:""}
        <button class="btn-rules btn-icon" id="rulesBtn" aria-label="${t.openRules}" title="${t.rules}">${f.book}</button>
        <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${f.maximize}</button>
    `}function T(e){return new Promise(t=>{var r;const o=document.createElement("div");o.className="confirm-modal",o.innerHTML=`
            <div class="confirm-modal__backdrop" data-close="cancel"></div>
            <div class="confirm-modal__content" role="dialog" aria-modal="true">
                <h2 class="confirm-modal__title">${e.newGame}</h2>
                <p class="confirm-modal__text">${e.confirmNewGame}</p>
                <div class="confirm-modal__actions">
                    <button class="ui-btn confirm-modal__btn confirm-modal__btn--confirm" data-close="confirm">
                        ${e.confirmNewGameAction}
                    </button>
                    <button class="ui-btn confirm-modal__btn confirm-modal__btn--cancel" data-close="cancel">
                        ${e.cancel}
                    </button>
                </div>
            </div>
        `;const n=s=>{document.removeEventListener("keydown",l),o.remove(),t(s)},l=s=>{s.key==="Escape"&&n(!1)};o.addEventListener("click",s=>{var c,d;const u=(d=(c=s.target)==null?void 0:c.dataset)==null?void 0:d.close;u==="confirm"&&n(!0),u==="cancel"&&n(!1)}),document.addEventListener("keydown",l),document.body.appendChild(o),(r=o.querySelector(".confirm-modal__btn--confirm"))==null||r.focus()})}async function q(e,t){await A(async()=>{if(e!=null&&e.id)try{await F(e.id)}catch(o){L("home.logoutAndClearRoom",o)}await X(),await(t==null?void 0:t())})}async function P({room:e,lang:t,tr:o,askConfirm:n}){const l=document.getElementById("newGameBtn");if(!(!l||!(e!=null&&e.id))&&!(e.hasActiveGame&&!await n())){l.disabled=!0;try{await A(async()=>{var h;const r=await I(t),{cells:s,startsFirst:u}=O({size:5,words:r}),c=N({gameId:((h=crypto.randomUUID)==null?void 0:h.call(crypto))||Math.random().toString(36).slice(2),size:5,cells:s,startsFirst:u}),{error:d}=await S(e.id,c,t);if(d)throw d;window.location.href=`${k()}/game.html?room=${e.id}&token=${e.guest_token}`})}catch(r){L("home.createAndOpenNewGame",r),window.alert(o.newGameFailed),l.disabled=!1}}}function K(e){!(e!=null&&e.id)||!(e!=null&&e.guest_token)||(window.location.href=`${k()}/game.html?room=${e.id}&token=${e.guest_token}`)}function D(){try{return localStorage.getItem("nw_lang")||M}catch{return M}}function J(e){try{localStorage.setItem("nw_lang",e)}catch{}}async function ee(e){let t=D(),o=null,n=null,l=null,r=!0,s=null;const u=Y(16);function c(a){o&&l!==a&&(l=a,I(a).catch(()=>{l=null}))}async function d(){const a=z(t),i=!!(o&&(n!=null&&n.id)),w=!!(n!=null&&n.hasActiveGame&&(!(n!=null&&n.language)||n.language===t));document.body.className="",e.innerHTML=j({lang:t,tr:a,user:o,room:n,canManageGame:i,canContinueCurrentGame:w,introPlayed:r,homeEyes:u}),h(a),c(t),r=!0}function h(a){var b,_,p,y,v;e.querySelectorAll(".lang-toggle__btn").forEach(g=>{g.addEventListener("click",()=>{t=g.dataset.lang,J(t),d()})}),(b=document.getElementById("loginBtn"))==null||b.addEventListener("click",R),(_=document.getElementById("continueBtn"))==null||_.addEventListener("click",()=>K(n)),(p=document.getElementById("newGameBtn"))==null||p.addEventListener("click",()=>m(a)),(y=document.getElementById("logoutBtn"))==null||y.addEventListener("click",async()=>{await q(n,async()=>{o=null,n=null,await d()})}),(v=document.getElementById("rulesBtn"))==null||v.addEventListener("click",()=>U(t));const i=document.getElementById("fullscreenBtn"),w=()=>{i&&(i.innerHTML=document.fullscreenElement?f.minimize:f.maximize)};w(),s&&document.removeEventListener("fullscreenchange",s),s=()=>w(),document.addEventListener("fullscreenchange",s),i==null||i.addEventListener("click",()=>{var g,$,E;document.fullscreenElement?(E=document.exitFullscreen)==null||E.call(document):($=(g=document.documentElement).requestFullscreen)==null||$.call(g)})}async function m(a){await P({room:n,lang:t,tr:a,askConfirm:()=>T(a)})}await d(),o=await W(),o&&(n=await H(o.id),await d())}export{ee as initHome};
