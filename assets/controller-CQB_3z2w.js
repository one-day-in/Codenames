const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/presence-pGOuE7Vi.js","assets/presence-Bs_83nby.css"])))=>i.map(i=>d[i]);
import{t as p,D as k,R as S,c as G,b as H,g as U,d as B}from"./presence-pGOuE7Vi.js";const I="modulepreload",W=function(e){return"/nightwalkers/"+e},T={},q=function(d,u,n){let v=Promise.resolve();if(u&&u.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),a=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));v=Promise.allSettled(u.map(i=>{if(i=W(i),i in T)return;T[i]=!0;const g=i.endsWith(".css"),m=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${m}`))return;const l=document.createElement("link");if(l.rel=g?"stylesheet":I,g||(l.as="script"),l.crossOrigin="",l.href=i,a&&l.setAttribute("nonce",a),document.head.appendChild(l),g)return new Promise(($,L)=>{l.addEventListener("load",$),l.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${i}`)))})}))}function w(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return v.then(s=>{for(const a of s||[])a.status==="rejected"&&w(a.reason);return d().catch(w)})};function D(e){let d=window.innerWidth,u=window.innerHeight;const n=new ResizeObserver(()=>{const v=window.innerWidth,w=window.innerHeight;(v!==d||w!==u)&&(d=v,u=w,e())});return n.observe(document.documentElement),()=>n.disconnect()}function M(){const e=new URLSearchParams(window.location.search);return{roomId:e.get("room"),token:e.get("token"),team:e.get("team")}}async function N(e){const{roomId:d,token:u,team:n}=M();if(!d||!u||!n||n!=="resonant"&&n!=="dissonant"){e.innerHTML=`<div class="error-screen">
            <p>${p(k).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const{supabase:v}=await q(async()=>{const{supabase:t}=await import("./presence-pGOuE7Vi.js").then(_=>_.e);return{supabase:t}},__vite__mapDeps([0,1])),{data:w,error:s}=await v.from("rooms").select("id, guest_token").eq("id",d).eq("guest_token",u).maybeSingle();if(!w||s){e.innerHTML=`<div class="error-screen">
            <p>${p(k).wrongLink.replace(`
`,"<br>")}</p>
        </div>`;return}const a=n==="resonant"?S.WALKER_RESONANT:S.WALKER_DISSONANT,i=G(d);if(await i.isRoleTaken(a)){e.innerHTML=`<div class="waiting-screen">
            <div class="taken-screen">
                <p class="taken-screen__icon">🔒</p>
                <p class="taken-screen__text">${n} ${p(k).dreamwalker}<br>${p(k).controllerTaken.replace(`
`,"<br>")}</p>
            </div>
        </div>`;return}i.join(a),document.body.classList.add(`team-${n}`);const m=H(d);await m.init();function l(t=k){e.innerHTML=`<div class="waiting-screen">
            <p class="waiting-screen__hint">${p(t).waitingStart}</p>
        </div>`}function $(t,_){const r=p(_),o=t.winner===n;e.innerHTML=`
            <div class="awake-screen awake-screen--${t.winner}">
                <div class="awake-screen__content">
                    <div class="awake-screen__title">${r.awake}</div>
                    <div class="awake-screen__awakening">${U(t.winner,_)}</div>
                    <div class="awake-screen__role">${o?"🏆":"💀"} ${n} ${r.dreamwalker}</div>
                    <button class="awake-screen__new-game-btn" id="newGameBtn">${r.newGame}</button>
                </div>
            </div>`,document.getElementById("newGameBtn").addEventListener("click",()=>m.createGame())}function L(t,_){var y;const r=p(_),o=t.turn,b=o.team===n,h=o.guideLimit!==null,f=b&&h&&!t.gameOver,A=h?o.guideLimit-o.dreamwalkerMoves:null,R=t.cells.filter(c=>c.role==="resonant"&&!c.revealed).length,C=t.cells.filter(c=>c.role==="dissonant"&&!c.revealed).length,P=b?h?`${A} ${r.movesLeft}`:r.waitingGuide:`${r.turn}: ${o.team.toUpperCase()}`;document.body.classList.remove("team-resonant","team-dissonant"),document.body.classList.add(`team-${o.team}`),e.innerHTML=`
            <div class="controller controller--${n}">
                <div class="controller__status">
                    <span class="controller__status-team controller__status-team--${n}">${n.toUpperCase()}</span>
                    <span class="controller__status-moves${f?" controller__status-moves--active":""}">${P}</span>
                    <div class="controller__score">
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--resonant"></div>
                            <span class="controller__score-count">${R}</span>
                            <span class="controller__score-label">RES</span>
                        </div>
                        <div class="controller__score-row">
                            <div class="controller__score-dot controller__score-dot--dissonant"></div>
                            <span class="controller__score-count">${C}</span>
                            <span class="controller__score-label">DIS</span>
                        </div>
                    </div>
                </div>

                <div class="controller__grid">
                    ${t.cells.map((c,O)=>`
                        <div class="controller__cell ${B(c)}${f&&!c.revealed?" controller__cell--clickable":""}"
                             data-index="${O}">
                            <span>${c.word}</span>
                        </div>`).join("")}
                </div>

                <button class="controller__end-turn" id="endTurnBtn" ${f?"":"disabled"}>
                    ${f?r.endTurn:b?r.waitingGuide:`${r.turn}: ${o.team.toUpperCase()}`}
                </button>
            </div>`,e.querySelectorAll(".controller__cell--clickable").forEach(c=>{c.addEventListener("click",()=>m.reveal(parseInt(c.dataset.index,10)))}),(y=document.getElementById("endTurnBtn"))==null||y.addEventListener("click",()=>{f&&m.endTurn()})}function E({state:t,language:_}={}){const r=t??m.getState(),o=_??m.getLanguage();if(!r){l(o);return}if(r.gameOver){$(r,o);return}L(r,o)}m.subscribe(E),D(()=>E())}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#app");e&&N(e)});
