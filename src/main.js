import './styles/main.css';
import { initApp } from './app/initApp.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  if (!root) return;

  initApp(root);
});