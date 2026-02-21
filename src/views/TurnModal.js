// components/TurnModal.js
export function createTurnModal() {
    const modal = document.createElement('div');
    modal.className = 'turn-modal';
    modal.innerHTML = `
    <div class="turn-modal__content">
      <div class="turn-modal__text">Ooups! Get ready</div>
      <div class="turn-modal__team"></div>
      <div class="turn-modal__timer">3</div>
      <div class="turn-modal__text">Good luck!!</div>
    </div>
  `;

    document.body.appendChild(modal);

    let timeoutId = null;
    let intervalId = null;

    function show(team, onComplete) {
        const contentEl = modal.querySelector('.turn-modal__content');
        const teamEl = modal.querySelector('.turn-modal__team');
        const timerEl = modal.querySelector('.turn-modal__timer');

        // Видаляємо старі класи
        contentEl.classList.remove('turn-modal__content--red', 'turn-modal__content--blue');
        teamEl.classList.remove('turn-modal__team--red', 'turn-modal__team--blue');

        // Додаємо нові класи відповідно до команди
        contentEl.classList.add(`turn-modal__content--${team}`);
        teamEl.classList.add(`turn-modal__team--${team}`);
        teamEl.textContent = team === 'red' ? 'RED' : 'BLUE';

        // Показуємо модалку
        modal.classList.add('turn-modal--visible');

        // Таймер
        let seconds = 3;
        timerEl.textContent = seconds;

        // Очищаємо попередні таймери
        if (intervalId) clearInterval(intervalId);
        if (timeoutId) clearTimeout(timeoutId);

        // Запускаємо зворотній відлік
        intervalId = setInterval(() => {
            seconds -= 1;
            timerEl.textContent = seconds;
        }, 1000);

        // Ховаємо модалку через 3 секунди
        timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            modal.classList.remove('turn-modal--visible');
            if (onComplete) onComplete();
        }, 3000);
    }

    return { show };
}