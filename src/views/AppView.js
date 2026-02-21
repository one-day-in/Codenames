// AppView.js
import { renderHeaderView } from './HeaderView.js';
import { renderGridView } from './GridView.js';

export function renderAppView({ root, store }) {
  root.innerHTML = `
    <div class="app">
      <div class="app__header"></div>
      <div class="app__grid"></div>
    </div>
  `;

  renderHeaderView({
    container: root.querySelector('.app__header'),
    store
  });

  renderGridView({
    container: root.querySelector('.app__grid'),
    store
  });
}