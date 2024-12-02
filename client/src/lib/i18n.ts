export const translations = {
  en: {
    score: 'Score',
    level: 'Level',
    lines: 'Lines',
    pause: 'Pause',
    resume: 'Resume',
    settings: 'Settings',
    sound: 'Sound',
    language: 'Language',
    gameOver: 'Game Over',
    newGame: 'New Game',
  },
  ru: {
    score: 'Очки',
    level: 'Уровень',
    lines: 'Линии',
    pause: 'Пауза',
    resume: 'Продолжить',
    settings: 'Настройки',
    sound: 'Звук',
    language: 'Язык',
    gameOver: 'Игра окончена',
    newGame: 'Новая игра',
  },
};

export type Language = keyof typeof translations;
