// HeaderView.js
export function renderHeaderView({ container, store }) {
  container.innerHTML = `
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
  `;

  const teamEl = container.querySelector('.header__team');
  const newBtn = container.querySelector('.header__button--new');
  const turnBtn = container.querySelector('.header__button--turn');
  const menuBtn = container.querySelector('.header__button--menu');

  // Функція для відкриття модалки
  function openModal() {
    // Видаляємо попередню модалку якщо вона є
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
      existingModal.remove();
    }

    // Створюємо модалку
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    modalOverlay.innerHTML = `
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
    `;

    // Додаємо модалку в body
    document.body.appendChild(modalOverlay);

    // Анімація появи
    setTimeout(() => {
      modalOverlay.classList.add('active');
    }, 10);

    // Функція закриття модалки
    function closeModal() {
      modalOverlay.classList.remove('active');
      setTimeout(() => {
        modalOverlay.remove();
      }, 300);
    }

    // Обробники для закриття
    const closeBtn = modalOverlay.querySelector('.modal__close');
    const okBtn = modalOverlay.querySelector('.modal__button');

    closeBtn.addEventListener('click', closeModal);
    okBtn.addEventListener('click', closeModal);

    // Закриття по кліку на оверлей
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Закриття по Escape
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  function updateTeamDisplay(state) {
    if (!state) return;

    if (state.gameOver) {
      teamEl.textContent = `${state.winner?.toUpperCase()} WINS!`;
    } else {
      teamEl.textContent = state.activeTeam === 'red' ? 'RED' : 'BLUE';
    }

    // Вішаємо клас на body для CSS-стилізації
    document.body.classList.remove('team-red', 'team-blue');
    if (!state.gameOver && state.activeTeam) {
      document.body.classList.add(`team-${state.activeTeam}`);
    }
  }

  function handleStateChange(state) {
    updateTeamDisplay(state);
  }

  // New Game - створює нову гру з новими словами
  newBtn.addEventListener('click', () => {
    store.reset();
  });

  // End Turn - просто передає хід іншій команді
  turnBtn.addEventListener('click', () => {
    if (!store.getState().gameOver) {
      store.endTurn();
    }
  });

  // Menu - відкриває модалку
  menuBtn.addEventListener('click', openModal);

  // Початкове налаштування
  store.subscribe(handleStateChange);
  updateTeamDisplay(store.getState());
}