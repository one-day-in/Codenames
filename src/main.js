import './styles/main.css';
import { createGameStore } from './store/gameStore.js';
import { renderAppView } from './views/AppView.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  
  if (!root) {
    console.error('Root element #app not found');
    return;
  }

  const store = createGameStore({ size: 5 });
  renderAppView({ root, store });
});