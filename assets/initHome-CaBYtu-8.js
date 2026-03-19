import{i as G,s as A,G as N,I as f,L as S,a as k,p as x,g as C,l as I,c as F,D as B,t as O}from"./url-DAL9jQbt.js";import{r as M}from"./entry-BDlMYCOj.js";import{w as L,o as R}from"./rulesModal-CDT7f8Qq.js";import{c as H,s as U,g as W}from"./roomRepository-CD0Cuu1e.js";async function j(){if(!G)return null;const{data:{user:e}}=await A.auth.getUser();return e}async function X(){if(!G){window.alert("Google auth is not configured for this deployment yet.");return}const{error:e}=await A.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});e&&M("auth.signInWithGoogle",e)}async function Y(){G&&await A.auth.signOut()}function T(e=16){const d=7.140000000000001,h=19*.34,m=[];for(let s=0;s<4;s+=1)for(let u=0;u<4;u+=1)m.push({r:s,c:u});for(let s=m.length-1;s>0;s-=1){const u=Math.floor(Math.random()*(s+1));[m[s],m[u]]=[m[u],m[s]]}return m.slice(0,e).map(({r:s,c:u},b)=>{const p=8+21*(u+.5),w=12+19*(s+.5),_=Math.round(p+(Math.random()*2-1)*d),y=Math.round(w+(Math.random()*2-1)*h),v=Math.round(24+Math.random()*56),g=(3+Math.random()*2).toFixed(2),$=(Math.random()*2.5).toFixed(2),E=(.3+Math.random()*.5).toFixed(2);return{id:b,size:v,left:_,top:y,period:g,delay:$,alpha:E}})}function z({lang:e,tr:t,user:a,room:n,canManageGame:c,canContinueCurrentGame:l,introPlayed:i,homeEyes:r}){return`
        <div class="app ${i?"":"app--intro"}">
            <div class="lang-toggle">
                ${S.map(o=>`
                    <button
                        class="lang-toggle__btn ${o.code===e?"lang-toggle__btn--active":""}"
                        data-lang="${o.code}">
                        ${o.label}
                    </button>
                `).join("")}
            </div>

            <div class="home-screen">
                <div class="home-eyes" aria-hidden="true">
                    ${r.map(o=>`
                        <span class="home-eye"
                            style="--eye-size:${o.size}px;--eye-left:${o.left}%;--eye-top:${o.top}%;--eye-period:${o.period}s;--eye-delay:${o.delay}s;--eye-alpha:${o.alpha};">
                            <span class="home-eye__open">${f.eye}</span>
                            <span class="home-eye__closed">${f.eyeClosed}</span>
                        </span>
                    `).join("")}
                </div>

                <div class="home-screen__title-wrap">
                    <h1 class="home-screen__title">${N}</h1>
                </div>

                ${c?`
                        <div class="home-screen__actions">
                            ${n!=null&&n.hasActiveGame&&l?`
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

        ${a?`<button class="btn-logout btn-icon" id="logoutBtn" title="${a.email}">${f.user}</button>`:""}
        <button class="btn-rules btn-icon" id="rulesBtn" aria-label="${t.openRules}" title="${t.rules}">${f.book}</button>
        <button class="fullscreen-btn btn-icon" id="fullscreenBtn">${f.maximize}</button>
    `}function q(e){return new Promise(t=>{var l;const a=document.createElement("div");a.className="confirm-modal",a.innerHTML=`
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
        `;const n=i=>{document.removeEventListener("keydown",c),a.remove(),t(i)},c=i=>{i.key==="Escape"&&n(!1)};a.addEventListener("click",i=>{var o,d;const r=(d=(o=i.target)==null?void 0:o.dataset)==null?void 0:d.close;r==="confirm"&&n(!0),r==="cancel"&&n(!1)}),document.addEventListener("keydown",c),document.body.appendChild(a),(l=a.querySelector(".confirm-modal__btn--confirm"))==null||l.focus()})}function P(e){const t=e*e,a=Math.random()<.5?"resonant":"dissonant",n=Math.ceil(t/3),c=n-1,l=a==="resonant"?n:c,i=a==="dissonant"?n:c,r=1,o=t-l-i-r,d=[...Array(l).fill("resonant"),...Array(i).fill("dissonant"),...Array(o).fill("anomaly"),...Array(r).fill("nightmare")];return{roles:k(d),startsFirst:a}}const V={resonant:9,dissonant:9,anomaly:7,nightmare:1};function D(e){return k(Array.from({length:e},(t,a)=>a+1))}function K({size:e,words:t}){const{roles:a,startsFirst:n}=P(e),c=Object.fromEntries(Object.entries(V).map(([i,r])=>[i,D(r)]));return{cells:x(t,e*e).map((i,r)=>{const o=a[r],d=c[o].shift()??1;return{word:i,role:o,imageVariant:d,revealed:!1}}),startsFirst:n}}async function J(e,t){await L(async()=>{if(e!=null&&e.id)try{await H(e.id)}catch(a){M("home.logoutAndClearRoom",a)}await Y(),await(t==null?void 0:t())})}async function Q({room:e,lang:t,tr:a,askConfirm:n}){const c=document.getElementById("newGameBtn");if(!(!c||!(e!=null&&e.id))&&!(e.hasActiveGame&&!await n())){c.disabled=!0;try{await L(async()=>{var h;const l=await I(t),{cells:i,startsFirst:r}=K({size:5,words:l}),o=F({gameId:((h=crypto.randomUUID)==null?void 0:h.call(crypto))||Math.random().toString(36).slice(2),size:5,cells:i,startsFirst:r}),{error:d}=await U(e.id,o,t);if(d)throw d;window.location.href=`${C()}/game.html?room=${e.id}&token=${e.guest_token}`})}catch(l){M("home.createAndOpenNewGame",l),window.alert(a.newGameFailed),c.disabled=!1}}}function Z(e){!(e!=null&&e.id)||!(e!=null&&e.guest_token)||(window.location.href=`${C()}/game.html?room=${e.id}&token=${e.guest_token}`)}function ee(){try{return localStorage.getItem("nw_lang")||B}catch{return B}}function ne(e){try{localStorage.setItem("nw_lang",e)}catch{}}async function ie(e){let t=ee(),a=null,n=null,c=null,l=!0,i=null;const r=T(16);function o(s){a&&c!==s&&(c=s,I(s).catch(()=>{c=null}))}async function d(){const s=O(t),u=!!(a&&(n!=null&&n.id)),b=!!(n!=null&&n.hasActiveGame&&(!(n!=null&&n.language)||n.language===t));document.body.className="",e.innerHTML=z({lang:t,tr:s,user:a,room:n,canManageGame:u,canContinueCurrentGame:b,introPlayed:l,homeEyes:r}),h(s),o(t),l=!0}function h(s){var p,w,_,y,v;e.querySelectorAll(".lang-toggle__btn").forEach(g=>{g.addEventListener("click",()=>{t=g.dataset.lang,ne(t),d()})}),(p=document.getElementById("loginBtn"))==null||p.addEventListener("click",X),(w=document.getElementById("continueBtn"))==null||w.addEventListener("click",()=>Z(n)),(_=document.getElementById("newGameBtn"))==null||_.addEventListener("click",()=>m(s)),(y=document.getElementById("logoutBtn"))==null||y.addEventListener("click",async()=>{await J(n,async()=>{a=null,n=null,await d()})}),(v=document.getElementById("rulesBtn"))==null||v.addEventListener("click",()=>R(t));const u=document.getElementById("fullscreenBtn"),b=()=>{u&&(u.innerHTML=document.fullscreenElement?f.minimize:f.maximize)};b(),i&&document.removeEventListener("fullscreenchange",i),i=()=>b(),document.addEventListener("fullscreenchange",i),u==null||u.addEventListener("click",()=>{var g,$,E;document.fullscreenElement?(E=document.exitFullscreen)==null||E.call(document):($=(g=document.documentElement).requestFullscreen)==null||$.call(g)})}async function m(s){await Q({room:n,lang:t,tr:s,askConfirm:()=>q(s)})}await d(),a=await j(),a&&(n=await W(a.id),await d())}export{ie as initHome};
