// src/utils/i18n.js — єдине джерело істини для всіх текстів і назв

export const GAME_NAME = 'SleepWalkers';

export const TRANSLATIONS = {
    uk: {
        gameName: GAME_NAME,
        resonant: 'Резонантні Тригери',
        dissonant: 'Дисонантні Тригери',
        cardResonant: 'Резонантний Тригер',
        cardDissonant: 'Дисонантний Тригер',
        cardAnomaly: 'Аномалія',
        cardNightmare: 'Кошмар',
        guide: 'Провідник',
        dreamwalker: 'Блукач',
        yourTurn: 'Ваш хід',
        turn: 'Хід',
        endTurn: 'Завершити хід',
        end: 'Кінець',
        qrHubLabel: 'Панель QR-кодів',
        connectControllers: 'Підключити контролери',
        showQr: 'Показати QR',
        waitingGuide: 'Очікуємо провідника...',
        waitingLobby: 'Очікуємо початку гри...',
        movesLeft: 'ходів залишилось',
        steps: 'кроків',
        chooseLimit: 'Оберіть кількість ходів',
        harmonizedAwakening: '🌅 Гармонізоване Пробудження',
        fracturedAwakening: '🌪 Розколоте Пробудження',
        awake: 'AWAKE',
        connectGuideResonant: 'Провідник Резонантних',
        connectGuideDissonant: 'Провідник Дисонантних',
        connectWalkerResonant: 'Блукач Резонантних',
        connectWalkerDissonant: 'Блукач Дисонантних',
        waitingPlayers: 'гравців підключено',
        miniTakenResonant: 'Провідник Резонантних\nвже підключений',
        miniTakenDissonant: 'Провідник Дисонантних\nвже підключений',
        controllerTaken: 'вже підключений\nна іншому пристрої',
        waitingGame: 'Очікуємо на гру...',
        loading: 'Завантаження...',
        preparingGame: 'Готуємо нову гру...',
        scanToOpen: 'скануй, щоб відкрити',
        scanToControl: 'Скануй QR, щоб взяти керування',
        newGame: 'Нова гра',
        signIn: 'Увійти через',
        wrongLink: 'Невірне посилання.\nВідскануй QR з головного екрану.',
        scanQr: 'Відскануй QR з головного екрану.',
        confirmNewGame: 'Скинути поточну гру?',
        confirmNewGameAction: 'Почати нову гру',
        cancel: 'Скасувати',
        newGameFailed: 'Не вдалося створити нову гру. Спробуй ще раз.',
        continueGame: 'Продовжити гру',
        forceRejoin: 'Це я — перепідключитись',
        sandboxBoard: 'Тест-дошка',
        transitionIncoming: 'Подія',
        transitionTurnPass: 'Хід переходить до іншої команди',
        transitionAnomalyGeneric: 'Аномалія активована. Виконуємо ефект і передаємо хід',
        transitionAnomalyReset: 'Аномалія RESET: усі слова оновлено, відкриті карти залишаються відкритими',
        transitionNightmare: 'Кошмар активовано. Гру завершено',
    },

    en: {
        gameName: GAME_NAME,
        resonant: 'Resonant Triggers',
        dissonant: 'Dissonant Triggers',
        cardResonant: 'Resonant Trigger',
        cardDissonant: 'Dissonant Trigger',
        cardAnomaly: 'Anomaly',
        cardNightmare: 'Nightmare',
        guide: 'Guide',
        dreamwalker: 'Dreamwalker',
        yourTurn: 'Your turn',
        turn: 'Turn',
        endTurn: 'End Turn',
        end: 'End',
        qrHubLabel: 'QR hub',
        connectControllers: 'Connect controllers',
        showQr: 'Show QR',
        waitingGuide: 'Waiting for Guide...',
        waitingLobby: 'Waiting for game to start...',
        movesLeft: 'moves left',
        steps: 'steps',
        chooseLimit: 'Choose move limit',
        harmonizedAwakening: '🌅 Harmonized Awakening',
        fracturedAwakening: '🌪 Fractured Awakening',
        awake: 'AWAKE',
        connectGuideResonant: 'Guide Resonant',
        connectGuideDissonant: 'Guide Dissonant',
        connectWalkerResonant: 'Dreamwalker Resonant',
        connectWalkerDissonant: 'Dreamwalker Dissonant',
        waitingPlayers: 'players connected',
        miniTakenResonant: 'Guide Resonant\nalready connected',
        miniTakenDissonant: 'Guide Dissonant\nalready connected',
        controllerTaken: 'already connected\non another device',
        waitingGame: 'Waiting for game...',
        loading: 'Loading...',
        preparingGame: 'Preparing a new game...',
        scanToOpen: 'scan to open',
        scanToControl: 'Scan QR to take control',
        newGame: 'New game',
        signIn: 'Sign in with',
        wrongLink: 'Invalid link.\nScan QR from the main screen.',
        scanQr: 'Scan QR from the main screen.',
        confirmNewGame: 'Reset the current game?',
        confirmNewGameAction: 'Start new game',
        cancel: 'Cancel',
        newGameFailed: 'Failed to start a new game. Please try again.',
        continueGame: 'Continue game',
        forceRejoin: 'That\'s me — reconnect',
        sandboxBoard: 'Sandbox board',
        transitionIncoming: 'Event',
        transitionTurnPass: 'Turn passes to the other team',
        transitionAnomalyGeneric: 'Anomaly triggered. Applying effect, then passing the turn',
        transitionAnomalyReset: 'RESET anomaly: all words are refreshed, revealed cards stay revealed',
        transitionNightmare: 'Nightmare triggered. Game over',
    },

    ru: {
        gameName: GAME_NAME,
        resonant: 'Резонантные Триггеры',
        dissonant: 'Диссонантные Триггеры',
        cardResonant: 'Резонантный Триггер',
        cardDissonant: 'Диссонантный Триггер',
        cardAnomaly: 'Аномалия',
        cardNightmare: 'Кошмар',
        guide: 'Проводник',
        dreamwalker: 'Блуждатель',
        yourTurn: 'Ваш ход',
        turn: 'Ход',
        endTurn: 'Завершить ход',
        end: 'Конец',
        qrHubLabel: 'Панель QR-кодов',
        connectControllers: 'Подключить контроллеры',
        showQr: 'Показать QR',
        waitingGuide: 'Ожидаем проводника...',
        waitingLobby: 'Ожидаем начала игры...',
        movesLeft: 'ходов осталось',
        steps: 'шагов',
        chooseLimit: 'Выберите количество ходов',
        harmonizedAwakening: '🌅 Гармонизированное Пробуждение',
        fracturedAwakening: '🌪 Расколотое Пробуждение',
        awake: 'AWAKE',
        connectGuideResonant: 'Проводник Резонантных',
        connectGuideDissonant: 'Проводник Диссонантных',
        connectWalkerResonant: 'Блуждатель Резонантных',
        connectWalkerDissonant: 'Блуждатель Диссонантных',
        waitingPlayers: 'игроков подключено',
        miniTakenResonant: 'Проводник Резонантных\nуже подключён',
        miniTakenDissonant: 'Проводник Диссонантных\nуже подключён',
        controllerTaken: 'уже подключён\nна другом устройстве',
        waitingGame: 'Ожидаем игру...',
        loading: 'Загрузка...',
        preparingGame: 'Готовим новую игру...',
        scanToOpen: 'сканируй, чтобы открыть',
        scanToControl: 'Сканируй QR, чтобы взять управление',
        newGame: 'Новая игра',
        signIn: 'Войти через',
        wrongLink: 'Неверная ссылка.\nОтсканируй QR с главного экрана.',
        scanQr: 'Отсканируй QR с главного экрана.',
        confirmNewGame: 'Сбросить текущую игру?',
        confirmNewGameAction: 'Начать новую игру',
        cancel: 'Отмена',
        newGameFailed: 'Не удалось начать новую игру. Попробуй ещё раз.',
        continueGame: 'Продолжить игру',
        forceRejoin: 'Это я — переподключиться',
        sandboxBoard: 'Тест-доска',
        transitionIncoming: 'Событие',
        transitionTurnPass: 'Ход переходит к другой команде',
        transitionAnomalyGeneric: 'Аномалия активирована. Выполняем эффект и передаем ход',
        transitionAnomalyReset: 'Аномалия RESET: все слова обновлены, открытые карты остаются открытыми',
        transitionNightmare: 'Кошмар активирован. Игра завершена',
    }
};

export const LANGUAGES = [
    { code: 'uk', label: 'UK' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
];

export const DEFAULT_LANGUAGE = 'uk';

export function t(language) {
    return TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];
}

export function getAwakeningName(winner, language) {
    const tr = t(language);
    return winner === 'resonant' ? tr.harmonizedAwakening : tr.fracturedAwakening;
}

export function getTeamName(team, language) {
    const tr = t(language);
    return team === 'resonant' ? tr.resonant : tr.dissonant;
}

function pluralSlavic(n, one, few, many) {
    const abs = Math.abs(Number(n)) % 100;
    const last = abs % 10;
    if (abs > 10 && abs < 20) return many;
    if (last > 1 && last < 5) return few;
    if (last === 1) return one;
    return many;
}

export function formatCardCount(count, language) {
    const n = Number(count) || 0;
    if (language === 'en') return `${n} ${n === 1 ? 'card' : 'cards'}`;
    if (language === 'ru') return `${n} ${pluralSlavic(n, 'карта', 'карты', 'карт')}`;
    return `${n} ${pluralSlavic(n, 'карта', 'карти', 'карт')}`;
}
