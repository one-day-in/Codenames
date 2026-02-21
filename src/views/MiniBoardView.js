// src/views/MiniBoardView.js
import { createSyncStore } from '../store/syncStore.js';

class MiniBoard {
    constructor() {
        this.syncStore = createSyncStore();
        this.boardElement = document.getElementById('board');
        this.statusElement = document.getElementById('status');
        this.titleElement = document.querySelector('.mini-board__title');

        this.init();
    }

    init() {
        this.syncStore.subscribe((state) => this.render(state));
        this.render(this.syncStore.getState());

        window.addEventListener('resize', () => {
            if (this.syncStore.getState()) {
                this.adjustGridSize(this.syncStore.getState().size);
            }
        });

        window.addEventListener('error', (e) => {
            console.error('MiniBoard error:', e.error);
            if (this.statusElement) {
                this.statusElement.innerHTML = '❌ Loading error';
            }
        });
    }

    render(state) {
        if (!state) {
            this.showEmptyState();
            return;
        }

        try {
            this.renderBoard(state);
            this.renderStatus(state);
            this.adjustGridSize(state.size);

            if (this.titleElement) {
                this.titleElement.textContent = 'Mini map';
            }
        } catch (error) {
            console.error('Render error:', error);
            if (this.statusElement) {
                this.statusElement.innerHTML = '❌ Display error';
            }
        }
    }

    adjustGridSize(size) {
        if (this.boardElement) {
            this.boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        }
    }

    renderBoard(state) {
        if (!this.boardElement) return;

        this.boardElement.innerHTML = state.cells.map((cell, index) => {
            // Показуємо повне слово, а не тільки 3 літери
            const wordDisplay = cell.word || '';
            const roleClass = cell.role || 'unknown';
            const revealedClass = cell.revealed ? 'revealed' : '';

            return `
            <div class="cell ${roleClass} ${revealedClass}" 
                 title="${cell.word || ''}"
                 data-index="${index}"
                 data-role="${cell.role}"
                 data-revealed="${cell.revealed}">
                ${wordDisplay}
            </div>
        `;
        }).join('');
    }

    renderStatus(state) {
        if (!this.statusElement) return;

        if (state.gameOver) {
            this.statusElement.innerHTML = `
                <div>🏆 <strong>Winner: ${this.getTeamName(state.winner)}</strong></div>
                <div style="margin-top: 8px; font-size: 0.9rem; opacity: 0.7;">
                    Game finished
                </div>
            `;
            return;
        }

        const redLeft = state.cells.filter(c => c.role === 'red' && !c.revealed).length;
        const blueLeft = state.cells.filter(c => c.role === 'blue' && !c.revealed).length;
        const activeTeam = state.activeTeam === 'red' ? '🔴' : '🔵';

        this.statusElement.innerHTML = `
            <div>
                Turn: ${activeTeam} ${this.getTeamName(state.activeTeam)}
            </div>
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 8px;">
                <span style="color: #ff6b6b;">🔴 Left: ${redLeft}</span>
                <span style="color: #6b9fff;">🔵 Left: ${blueLeft}</span>
            </div>
        `;
    }

    showEmptyState() {
        if (!this.boardElement || !this.statusElement) return;

        if (this.titleElement) {
            this.titleElement.textContent = 'Mini map';
        }

        this.boardElement.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">🎮</div>
                <div style="font-size: 1.2rem; color: #888;">
                    ⏳ Waiting for game...
                </div>
                <div style="margin-top: 16px; color: #666; font-size: 0.9rem;">
                    Start the game in the main window
                </div>
            </div>
        `;
        this.statusElement.innerHTML = 'Mini-map in standby mode';
    }

    getTeamName(team) {
        return team === 'red' ? 'Red' : 'Blue';
    }
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MiniBoard();
});