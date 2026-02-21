// GridView.js
import { getFontSize } from '../utils/fontAdapter.js';

export function renderGridView({ container, store }) {
  // Створюємо контейнер один раз
  const gridEl = document.createElement('div');
  gridEl.className = 'grid';
  container.innerHTML = '';
  container.appendChild(gridEl);

  // Мапа для зберігання посилань на кнопки
  const cellButtons = new Map();

  // Функція оновлення класів конкретної клітинки
  function updateCellClass(btn, cell) {
    const baseClass = 'grid__cell';
    let stateClass;

    if (!cell.revealed) {
      stateClass = 'grid__cell--hidden';
    } else {
      switch (cell.role) {
        case 'red':
          stateClass = 'grid__cell--red';
          break;
        case 'blue':
          stateClass = 'grid__cell--blue';
          break;
        case 'neutral':
          stateClass = 'grid__cell--neutral';
          break;
        case 'assassin':
          stateClass = 'grid__cell--assassin';
          break;
        default:
          stateClass = 'grid__cell--hidden';
      }
    }

    btn.className = `${baseClass} ${stateClass}`;
    btn.dataset.role = cell.role;

    // Додаємо окремий клас для номера нейтральної клітинки (якщо є)
    if (cell.role === 'neutral' && cell.neutralNumber && cell.revealed) {
      btn.classList.add(`grid__cell--neutral-${cell.neutralNumber}`);
    }

    btn.dataset.revealed = String(cell.revealed);
    btn.dataset.neutralNumber = cell.neutralNumber || '';

    // Оновлюємо розмір шрифту
    btn.style.fontSize = getFontSize(cell.word);
  }

  // Функція створення кнопки для клітинки
  function createCellButton(cell, index) {
    const btn = document.createElement('button');

    // Початковий клас - завжди прихований (бо revealed=false на старті)
    btn.className = 'grid__cell grid__cell--hidden';
    btn.dataset.index = index;
    btn.dataset.role = cell.role;
    btn.dataset.revealed = 'false';
    btn.dataset.neutralNumber = cell.neutralNumber || '';
    btn.textContent = cell.word;

    // Встановлюємо адаптивний розмір шрифту
    btn.style.fontSize = getFontSize(cell.word);
    btn.style.wordBreak = 'break-word';
    btn.style.hyphens = 'auto';

    btn.addEventListener('click', () => {
      store.reveal(index);
    });

    return btn;
  }

  // Повний ререндер (пересоздаємо всі кнопки) — тільки для New Game
  function initialRender(state) {
    gridEl.innerHTML = '';
    cellButtons.clear();

    state.cells.forEach((cell, i) => {
      const btn = createCellButton(cell, i);
      gridEl.appendChild(btn);
      cellButtons.set(i, btn);
    });
  }

  // Частковий апдейт — для reveal
  function patchRender(newState, oldState) {
    newState.cells.forEach((newCell, i) => {
      const oldCell = oldState.cells[i];
      const btn = cellButtons.get(i);
      if (!btn) return;

      // Під час гри зазвичай міняється тільки revealed, але лишимо перевірку ширшою
      const changed =
        oldCell.revealed !== newCell.revealed ||
        oldCell.neutralNumber !== newCell.neutralNumber ||
        oldCell.role !== newCell.role ||
        oldCell.word !== newCell.word;

      if (!changed) return;

      // Якщо раптом змінилось слово (наприклад, якщо колись зробиш “оновити слова без повного ререндеру”)
      if (oldCell.word !== newCell.word) {
        btn.textContent = newCell.word;
      }

      updateCellClass(btn, newCell);
    });
  }

  // Зберігаємо попередній стан
  let previousState = null;

  function handleStateChange(newState) {
    // Перший рендер
    if (!previousState) {
      initialRender(newState);
      previousState = newState;

      // Додаємо клас game-over якщо гра одразу закінчена (малоймовірно)
      if (newState.gameOver) {
        gridEl.classList.add('game-over');
      }
      return;
    }

    // NEW GAME: gameId змінився => робимо ПОВНИЙ ререндер
    if (newState.gameId !== previousState.gameId) {
      initialRender(newState);
      previousState = newState;

      // Оновлюємо клас game-over для нової гри
      if (newState.gameOver) {
        gridEl.classList.add('game-over');
      } else {
        gridEl.classList.remove('game-over');
      }
      return;
    }

    // Звичайний хід гри: частковий апдейт
    patchRender(newState, previousState);

    // Перевіряємо чи змінився стан gameOver
    if (newState.gameOver !== previousState.gameOver) {
      if (newState.gameOver) {
        gridEl.classList.add('game-over');
      } else {
        gridEl.classList.remove('game-over');
      }
    }

    previousState = newState;
  }

  // Підписка на зміни
  const unsubscribe = store.subscribe(handleStateChange);

  // Старт
  handleStateChange(store.getState());

  // Повертаємо функцію очищення
  return () => {
    unsubscribe();
    cellButtons.clear();
  };
}