import{i as p,s as y,G as C,I as f,L as N,g as G,w as E,l as B,c as x,a as H,b as O,d as U,D as $,t as W}from"./roomRepository-OgTnR6o4.js";import{r as v}from"./entry-PdR0envO.js";import{c as R,o as X}from"./rulesModal-B6nQEhZR.js";function A(){return!1}async function Y(){if(!p)return null;const{data:{user:e}}=await y.auth.getUser();return e}async function F(){if(A()){if(!p){window.alert("Supabase is not configured for dev auth.");return}const{error:n}=await y.auth.signInAnonymously();if(n){v("auth.signInAnonymously",n),window.alert("Dev sign in failed. Enable Anonymous Auth in Supabase or use Google auth.");return}window.location.reload();return}if(!p){window.alert("Google auth is not configured for this deployment yet.");return}const{error:e}=await y.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin+window.location.pathname}});e&&v("auth.signInWithGoogle",e)}async function j(){p&&await y.auth.signOut()}function z(e=16){const o=7.140000000000001,g=19*.34,i=[];for(let s=0;s<4;s+=1)for(let d=0;d<4;d+=1)i.push({r:s,c:d});for(let s=i.length-1;s>0;s-=1){const d=Math.floor(Math.random()*(s+1));[i[s],i[d]]=[i[d],i[s]]}return i.slice(0,e).map(({r:s,c:d},h)=>{const w=8+21*(d+.5),b=12+19*(s+.5),_=Math.round(w+(Math.random()*2-1)*o),I=Math.round(b+(Math.random()*2-1)*g),M=Math.round(24+Math.random()*56),k=(3+Math.random()*2).toFixed(2),L=(Math.random()*2.5).toFixed(2),S=(.3+Math.random()*.5).toFixed(2);return{id:h,size:M,left:_,top:I,period:k,delay:L,alpha:S}})}function T({lang:e,tr:n,user:a,room:t,canManageGame:c,canContinueCurrentGame:l,introPlayed:u,homeEyes:m,devAuthEnabled:r=!1}){return`
        <div class="app ${u?"":"app--intro"}">
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
                    ${m.map(o=>`
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
                            <span class="home__btn-text">${r?n.devSignIn:n.signIn}</span>
                            <span class="home__btn-google-icon">${r?f.eye:f.google}</span>
                        </button>
                    `}
            </div>
        </div>

        ${a?`<button class="btn-logout btn-icon" id="logoutBtn" title="${a.email}">${f.user}</button>`:""}
        <button class="btn-rules btn-icon" id="rulesBtn" aria-label="${n.openRules}" title="${n.rules}">${f.book}</button>
    `}function q(e){return new Promise(n=>{var l;const a=document.createElement("div");a.className="confirm-modal",a.innerHTML=`
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
        `;const t=u=>{document.removeEventListener("keydown",c),a.remove(),n(u)},c=u=>{u.key==="Escape"&&t(!1)};a.addEventListener("click",u=>{var r,o;const m=(o=(r=u.target)==null?void 0:r.dataset)==null?void 0:o.close;m==="confirm"&&t(!0),m==="cancel"&&t(!1)}),document.addEventListener("keydown",c),document.body.appendChild(a),(l=a.querySelector(".confirm-modal__btn--confirm"))==null||l.focus()})}async function D(e,n){await E(async()=>{if(e!=null&&e.id)try{await O(e.id)}catch(a){v("home.logoutAndClearRoom",a)}await j(),await(n==null?void 0:n())})}async function P({room:e,lang:n,tr:a,askConfirm:t}){const c=document.getElementById("newGameBtn");if(!(!c||!(e!=null&&e.id))&&!(e.hasActiveGame&&!await t())){c.disabled=!0;try{await E(async()=>{var g;const l=await B(n),{cells:u,startsFirst:m}=R({size:5,words:l}),r=x({gameId:((g=crypto.randomUUID)==null?void 0:g.call(crypto))||Math.random().toString(36).slice(2),size:5,cells:u,startsFirst:m}),{error:o}=await H(e.id,r,n);if(o)throw o;window.location.href=`${G()}/game.html?room=${e.id}&token=${e.guest_token}`})}catch(l){v("home.createAndOpenNewGame",l),window.alert(a.newGameFailed),c.disabled=!1}}}function K(e){!(e!=null&&e.id)||!(e!=null&&e.guest_token)||(window.location.href=`${G()}/game.html?room=${e.id}&token=${e.guest_token}`)}function J(){try{return localStorage.getItem("nw_lang")||$}catch{return $}}function Q(e){try{localStorage.setItem("nw_lang",e)}catch{}}async function ne(e){let n=J(),a=null,t=null,c=null,l=!0;const u=z(16);function m(i){a&&c!==i&&(c=i,B(i).catch(()=>{c=null}))}async function r(){const i=W(n),s=!!(a&&(t!=null&&t.id)),d=!!(t!=null&&t.hasActiveGame&&(!(t!=null&&t.language)||t.language===n));document.body.className="",e.innerHTML=T({lang:n,tr:i,user:a,room:t,canManageGame:s,canContinueCurrentGame:d,introPlayed:l,homeEyes:u,devAuthEnabled:A()}),o(i),m(n),l=!0}function o(i){var s,d,h,w,b;e.querySelectorAll(".lang-toggle__btn").forEach(_=>{_.addEventListener("click",()=>{n=_.dataset.lang,Q(n),r()})}),(s=document.getElementById("loginBtn"))==null||s.addEventListener("click",F),(d=document.getElementById("continueBtn"))==null||d.addEventListener("click",()=>K(t)),(h=document.getElementById("newGameBtn"))==null||h.addEventListener("click",()=>g(i)),(w=document.getElementById("logoutBtn"))==null||w.addEventListener("click",async()=>{await D(t,async()=>{a=null,t=null,await r()})}),(b=document.getElementById("rulesBtn"))==null||b.addEventListener("click",()=>X(n))}async function g(i){await P({room:t,lang:n,tr:i,askConfirm:()=>q(i)})}await r(),a=await Y(),a&&(t=await U(a.id),await r())}export{ne as initHome};
