import"./main-CDrx-fi3.js";function o(){const i=new Set;return{subscribe(e){return i.add(e),()=>i.delete(e)},emit(e){i.forEach(t=>{try{t(e)}catch(s){console.error("Listener error:",s)}})},clear(){i.clear()}}}function l(){const i="codenames-game-state",e=o();let t=null;try{const r=localStorage.getItem(i);r&&(t=JSON.parse(r))}catch(r){console.warn("Failed to load state from localStorage",r)}function s(r){t=r;try{localStorage.setItem(i,JSON.stringify(t))}catch(n){console.warn("Failed to save state to localStorage",n)}e.emit(t)}return window.addEventListener("storage",r=>{if(r.key===i&&r.newValue)try{t=JSON.parse(r.newValue),e.emit(t)}catch(n){console.warn("Failed to parse state from storage event",n)}}),{getState:()=>t?{...t}:null,setState:s,subscribe:e.subscribe}}class d{constructor(){this.syncStore=l(),this.boardElement=document.getElementById("board"),this.statusElement=document.getElementById("status"),this.titleElement=document.querySelector(".mini-board__title"),this.init()}init(){this.syncStore.subscribe(e=>this.render(e)),this.render(this.syncStore.getState()),window.addEventListener("resize",()=>{this.syncStore.getState()&&this.adjustGridSize(this.syncStore.getState().size)}),window.addEventListener("error",e=>{console.error("MiniBoard error:",e.error),this.statusElement&&(this.statusElement.innerHTML="❌ Loading error")})}render(e){if(!e){this.showEmptyState();return}try{this.renderBoard(e),this.renderStatus(e),this.adjustGridSize(e.size),this.titleElement&&(this.titleElement.textContent="Mini map")}catch(t){console.error("Render error:",t),this.statusElement&&(this.statusElement.innerHTML="❌ Display error")}}adjustGridSize(e){this.boardElement&&(this.boardElement.style.gridTemplateColumns=`repeat(${e}, 1fr)`)}renderBoard(e){this.boardElement&&(this.boardElement.innerHTML=e.cells.map((t,s)=>{const r=t.word||"",n=t.role||"unknown",a=t.revealed?"revealed":"";return`
            <div class="cell ${n} ${a}" 
                 title="${t.word||""}"
                 data-index="${s}"
                 data-role="${t.role}"
                 data-revealed="${t.revealed}">
                ${r}
            </div>
        `}).join(""))}renderStatus(e){if(!this.statusElement)return;if(e.gameOver){this.statusElement.innerHTML=`
                <div>🏆 <strong>Winner: ${this.getTeamName(e.winner)}</strong></div>
                <div style="margin-top: 8px; font-size: 0.9rem; opacity: 0.7;">
                    Game finished
                </div>
            `;return}const t=e.cells.filter(n=>n.role==="red"&&!n.revealed).length,s=e.cells.filter(n=>n.role==="blue"&&!n.revealed).length,r=e.activeTeam==="red"?"🔴":"🔵";this.statusElement.innerHTML=`
            <div>
                Turn: ${r} ${this.getTeamName(e.activeTeam)}
            </div>
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 8px;">
                <span style="color: #ff6b6b;">🔴 Left: ${t}</span>
                <span style="color: #6b9fff;">🔵 Left: ${s}</span>
            </div>
        `}showEmptyState(){!this.boardElement||!this.statusElement||(this.titleElement&&(this.titleElement.textContent="Mini map"),this.boardElement.innerHTML=`
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">🎮</div>
                <div style="font-size: 1.2rem; color: #888;">
                    ⏳ Waiting for game...
                </div>
                <div style="margin-top: 16px; color: #666; font-size: 0.9rem;">
                    Start the game in the main window
                </div>
            </div>
        `,this.statusElement.innerHTML="Mini-map in standby mode")}getTeamName(e){return e==="red"?"Red":"Blue"}}document.addEventListener("DOMContentLoaded",()=>{new d});
