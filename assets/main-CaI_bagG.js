import"./main-CDrx-fi3.js";function b({size:r=5}={}){const a=localStorage.getItem("codenames-game");return{...a?JSON.parse(a):{words:generateInitialWords(r),colors:generateInitialColors(r),revealed:Array(r*r).fill(!1),currentTurn:"red",gameStarted:!1},startGame(){this.gameStarted=!0,this.saveToStorage()},revealCell(m){!this.gameStarted||this.revealed[m]||(this.revealed[m]=!0,this.saveToStorage())},saveToStorage(){localStorage.setItem("codenames-game",JSON.stringify({words:this.words,colors:this.colors,revealed:this.revealed,currentTurn:this.currentTurn,gameStarted:this.gameStarted}))}}}function p({container:r,store:a}){r.innerHTML=`
    <header class="header">
      <div class="header__left">
        <div class="header__team-container">
          <span class="header__team-label">TEAM</span>
          <div class="header__team"></div>
        </div>
      </div>
      <div class="header__right">
        <button class="header__button header__button--menu">QR</button>
        <button class="header__button header__button--turn">END TURN</button>
        <button class="header__button header__button--new">NEW GAME</button>
      </div>
    </header>
  `;const l=r.querySelector(".header__team"),u=r.querySelector(".header__button--new"),m=r.querySelector(".header__button--turn"),g=r.querySelector(".header__button--menu");function v(){const s=document.querySelector(".modal-overlay");s&&s.remove();const o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
      <div class="modal">
        <div class="modal__header">
          <h2 class="modal__title">MENU</h2>
          <button class="modal__close">✕</button>
        </div>
        <div class="modal__content">
          <p>⚡ Модалка-заглушка ⚡</p>
          <p>Тут буде меню гри</p>
        </div>
        <div class="modal__footer">
          <button class="modal__button modal__button--primary">OK</button>
        </div>
      </div>
    `,document.body.appendChild(o),setTimeout(()=>{o.classList.add("active")},10);function e(){o.classList.remove("active"),setTimeout(()=>{o.remove()},300)}const n=o.querySelector(".modal__close"),t=o.querySelector(".modal__button");n.addEventListener("click",e),t.addEventListener("click",e),o.addEventListener("click",c=>{c.target===o&&e()});const d=c=>{c.key==="Escape"&&(e(),document.removeEventListener("keydown",d))};document.addEventListener("keydown",d)}function _(s){var o;s&&(s.gameOver?l.textContent=`${(o=s.winner)==null?void 0:o.toUpperCase()} WINS!`:l.textContent=s.activeTeam==="red"?"RED":"BLUE",document.body.classList.remove("team-red","team-blue"),!s.gameOver&&s.activeTeam&&document.body.classList.add(`team-${s.activeTeam}`))}function i(s){_(s)}u.addEventListener("click",()=>{a.reset()}),m.addEventListener("click",()=>{a.getState().gameOver||a.endTurn()}),g.addEventListener("click",v),a.subscribe(i),_(a.getState())}function f(r){const a=r.length;return a<=4?"52px":a<=8?"44px":a<=10?"40px":a<=12?"36px":"28px"}function y({container:r,store:a}){const l=document.createElement("div");l.className="grid",r.innerHTML="",r.appendChild(l);const u=new Map;function m(e,n){const t="grid__cell";let d;if(!n.revealed)d="grid__cell--hidden";else switch(n.role){case"red":d="grid__cell--red";break;case"blue":d="grid__cell--blue";break;case"neutral":d="grid__cell--neutral";break;case"assassin":d="grid__cell--assassin";break;default:d="grid__cell--hidden"}e.className=`${t} ${d}`,e.dataset.role=n.role,n.role==="neutral"&&n.neutralNumber&&n.revealed&&e.classList.add(`grid__cell--neutral-${n.neutralNumber}`),e.dataset.revealed=String(n.revealed),e.dataset.neutralNumber=n.neutralNumber||"",e.style.fontSize=f(n.word)}function g(e,n){const t=document.createElement("button");return t.className="grid__cell grid__cell--hidden",t.dataset.index=n,t.dataset.role=e.role,t.dataset.revealed="false",t.dataset.neutralNumber=e.neutralNumber||"",t.textContent=e.word,t.style.fontSize=f(e.word),t.style.wordBreak="break-word",t.style.hyphens="auto",t.addEventListener("click",()=>{a.reveal(n)}),t}function v(e){l.innerHTML="",u.clear(),e.cells.forEach((n,t)=>{const d=g(n,t);l.appendChild(d),u.set(t,d)})}function _(e,n){e.cells.forEach((t,d)=>{const c=n.cells[d],h=u.get(d);!h||!(c.revealed!==t.revealed||c.neutralNumber!==t.neutralNumber||c.role!==t.role||c.word!==t.word)||(c.word!==t.word&&(h.textContent=t.word),m(h,t))})}let i=null;function s(e){if(!i){v(e),i=e,e.gameOver&&l.classList.add("game-over");return}if(e.gameId!==i.gameId){v(e),i=e,e.gameOver?l.classList.add("game-over"):l.classList.remove("game-over");return}_(e,i),e.gameOver!==i.gameOver&&(e.gameOver?l.classList.add("game-over"):l.classList.remove("game-over")),i=e}const o=a.subscribe(s);return s(a.getState()),()=>{o(),u.clear()}}function L({root:r,store:a}){r.innerHTML=`
    <div class="app">
      <div class="app__header"></div>
      <div class="app__grid"></div>
    </div>
  `,p({container:r.querySelector(".app__header"),store:a}),y({container:r.querySelector(".app__grid"),store:a})}document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector("#app");if(!r){console.error("Root element #app not found");return}const a=b({size:5});L({root:r,store:a})});
