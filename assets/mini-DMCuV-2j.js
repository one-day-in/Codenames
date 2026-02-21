import{c as o}from"./syncStore-z24yTO_l.js";class a{constructor(){this.syncStore=o(),this.boardElement=document.getElementById("board"),this.statusElement=document.getElementById("status"),this.titleElement=document.querySelector(".mini-board__title"),this.init()}init(){this.syncStore.subscribe(e=>this.render(e)),this.render(this.syncStore.getState()),window.addEventListener("resize",()=>{this.syncStore.getState()&&this.adjustGridSize(this.syncStore.getState().size)}),window.addEventListener("error",e=>{console.error("MiniBoard error:",e.error),this.statusElement&&(this.statusElement.innerHTML="❌ Loading error")})}render(e){if(!e){this.showEmptyState();return}try{this.renderBoard(e),this.renderStatus(e),this.adjustGridSize(e.size),this.titleElement&&(this.titleElement.textContent="Mini map")}catch(t){console.error("Render error:",t),this.statusElement&&(this.statusElement.innerHTML="❌ Display error")}}adjustGridSize(e){this.boardElement&&(this.boardElement.style.gridTemplateColumns=`repeat(${e}, 1fr)`)}renderBoard(e){this.boardElement&&(this.boardElement.innerHTML=e.cells.map((t,r)=>{const n=t.word||"",i=t.role||"unknown",s=t.revealed?"revealed":"";return`
            <div class="cell ${i} ${s}" 
                 title="${t.word||""}"
                 data-index="${r}"
                 data-role="${t.role}"
                 data-revealed="${t.revealed}">
                ${n}
            </div>
        `}).join(""))}renderStatus(e){if(!this.statusElement)return;if(e.gameOver){this.statusElement.innerHTML=`
                <div>🏆 <strong>Winner: ${this.getTeamName(e.winner)}</strong></div>
                <div style="margin-top: 8px; font-size: 0.9rem; opacity: 0.7;">
                    Game finished
                </div>
            `;return}const t=e.cells.filter(i=>i.role==="red"&&!i.revealed).length,r=e.cells.filter(i=>i.role==="blue"&&!i.revealed).length,n=e.activeTeam==="red"?"🔴":"🔵";this.statusElement.innerHTML=`
            <div>
                Turn: ${n} ${this.getTeamName(e.activeTeam)}
            </div>
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 8px;">
                <span style="color: #ff6b6b;">🔴 Left: ${t}</span>
                <span style="color: #6b9fff;">🔵 Left: ${r}</span>
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
        `,this.statusElement.innerHTML="Mini-map in standby mode")}getTeamName(e){return e==="red"?"Red":"Blue"}}document.addEventListener("DOMContentLoaded",()=>{new a});
