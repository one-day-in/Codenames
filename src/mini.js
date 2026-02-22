import './styles/main.css';
import { initMini } from './app/initMini.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');
    if (!root) return;

    initMini(root);
});