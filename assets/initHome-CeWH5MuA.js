import{i as p,s as y,G as C,I as f,L as N,g as G,w as E,l as B,c as S,a as x,b as H,d as O,D as $,t as U}from"./roomRepository-CIM5PE7W.js";import{r as v}from"./entry-BgKlsUjb.js";import{c as W,o as R}from"./rulesModal-Bjad2RoF.js";async function X(){if(!p)return null;const{data:{user:e}}=await y.auth.getUser();return e}async function Y(){if(!p){window.alert("Google auth is not configured for this deployment yet.");return}const{error:e}=await y.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});e&&v("auth.signInWithGoogle",e)}async function F(){p&&await y.auth.signOut()}function j(e=16){const m=7.140000000000001,g=19*.34,i=[];for(let s=0;s<4;s+=1)for(let d=0;d<4;d+=1)i.push({r:s,c:d});for(let s=i.length-1;s>0;s-=1){const d=Math.floor(Math.random()*(s+1));[i[s],i[d]]=[i[d],i[s]]}return i.slice(0,e).map(({r:s,c:d},h)=>{const w=8+21*(d+.5),_=12+19*(s+.5),b=Math.round(w+(Math.random()*2-1)*m),M=Math.round(_+(Math.random()*2-1)*g),k=Math.round(24+Math.random()*56),A=(3+Math.random()*2).toFixed(2),I=(Math.random()*2.5).toFixed(2),L=(.3+Math.random()*.5).toFixed(2);return{id:h,size:k,left:b,top:M,period:A,delay:I,alpha:L}})}function z({lang:e,tr:n,user:a,room:t,canManageGame:c,canContinueCurrentGame:l,introPlayed:r,homeEyes:u}){return`
        <div class="app ${r?"":"app--intro"}">
            <div class="lang-toggle">
                ${N.map(o=>`
                    <button
                        class="lang-toggle__btn ${o.code===e?"lang-toggle__btn--active":""}"
                        data-lang="${o.code}">
                        ${o.label}
                    </button>
                `).join("")}
            </div>

            <div class="home-screen">
                <div class="home-eyes" aria-hidden="true">
                    ${u.map(o=>`
                        <span class="home-eye"
                            style="--eye-size:${o.size}px;--eye-left:${o.left}%;--eye-top:${o.top}%;--eye-period:${o.period}s;--eye-delay:${o.delay}s;--eye-alpha:${o.alpha};">
                            <span class="home-eye__open">${f.eye}</span>
                            <span class="home-eye__closed">${f.eyeClosed}</span>
                        </span>
                    `).join("")}
                </div>

                <div class="home-screen__title-wrap">
                    <h1 class="home-screen__title">${C}</h1>
                </div>

                ${c?`
                        <div class="home-screen__actions">
                            ${t!=null&&t.hasActiveGame&&l?`
                                    <button class="ui-btn home__btn home__btn--continue" id="continueBtn">
                                        ${n.continueGame}
                                    </button>
                                `:""}
                            <button class="ui-btn home__btn home__btn--newgame" id="newGameBtn">
                                ${n.newGame}
                            </button>
                        </div>
                    `:`
                        <button class="ui-btn home__btn home__btn--google" id="loginBtn">
                            <span class="home__btn-text">${n.signIn}</span>
                            <span class="home__btn-google-icon">${f.google}</span>
                        </button>
                    `}
            </div>
        </div>

        ${a?`<button class="btn-logout btn-icon" id="logoutBtn" title="${a.email}">${f.user}</button>`:""}
        <button class="btn-rules btn-icon" id="rulesBtn" aria-label="${n.openRules}" title="${n.rules}">${f.book}</button>
    `}function T(e){return new Promise(n=>{var l;const a=document.createElement("div");a.className="confirm-modal",a.innerHTML=`
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
        `;const t=r=>{document.removeEventListener("keydown",c),a.remove(),n(r)},c=r=>{r.key==="Escape"&&t(!1)};a.addEventListener("click",r=>{var o,m;const u=(m=(o=r.target)==null?void 0:o.dataset)==null?void 0:m.close;u==="confirm"&&t(!0),u==="cancel"&&t(!1)}),document.addEventListener("keydown",c),document.body.appendChild(a),(l=a.querySelector(".confirm-modal__btn--confirm"))==null||l.focus()})}async function q(e,n){await E(async()=>{if(e!=null&&e.id)try{await H(e.id)}catch(a){v("home.logoutAndClearRoom",a)}await F(),await(n==null?void 0:n())})}async function P({room:e,lang:n,tr:a,askConfirm:t}){const c=document.getElementById("newGameBtn");if(!(!c||!(e!=null&&e.id))&&!(e.hasActiveGame&&!await t())){c.disabled=!0;try{await E(async()=>{var g;const l=await B(n),{cells:r,startsFirst:u}=W({size:5,words:l}),o=S({gameId:((g=crypto.randomUUID)==null?void 0:g.call(crypto))||Math.random().toString(36).slice(2),size:5,cells:r,startsFirst:u}),{error:m}=await x(e.id,o,n);if(m)throw m;window.location.href=`${G()}/game.html?room=${e.id}&token=${e.guest_token}`})}catch(l){v("home.createAndOpenNewGame",l),window.alert(a.newGameFailed),c.disabled=!1}}}function K(e){!(e!=null&&e.id)||!(e!=null&&e.guest_token)||(window.location.href=`${G()}/game.html?room=${e.id}&token=${e.guest_token}`)}function D(){try{return localStorage.getItem("nw_lang")||$}catch{return $}}function J(e){try{localStorage.setItem("nw_lang",e)}catch{}}async function ee(e){let n=D(),a=null,t=null,c=null,l=!0;const r=j(16);function u(i){a&&c!==i&&(c=i,B(i).catch(()=>{c=null}))}async function o(){const i=U(n),s=!!(a&&(t!=null&&t.id)),d=!!(t!=null&&t.hasActiveGame&&(!(t!=null&&t.language)||t.language===n));document.body.className="",e.innerHTML=z({lang:n,tr:i,user:a,room:t,canManageGame:s,canContinueCurrentGame:d,introPlayed:l,homeEyes:r}),m(i),u(n),l=!0}function m(i){var s,d,h,w,_;e.querySelectorAll(".lang-toggle__btn").forEach(b=>{b.addEventListener("click",()=>{n=b.dataset.lang,J(n),o()})}),(s=document.getElementById("loginBtn"))==null||s.addEventListener("click",Y),(d=document.getElementById("continueBtn"))==null||d.addEventListener("click",()=>K(t)),(h=document.getElementById("newGameBtn"))==null||h.addEventListener("click",()=>g(i)),(w=document.getElementById("logoutBtn"))==null||w.addEventListener("click",async()=>{await q(t,async()=>{a=null,t=null,await o()})}),(_=document.getElementById("rulesBtn"))==null||_.addEventListener("click",()=>R(n))}async function g(i){await P({room:t,lang:n,tr:i,askConfirm:()=>T(i)})}await o(),a=await X(),a&&(t=await O(a.id),await o())}export{ee as initHome};
