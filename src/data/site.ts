export const SITE = {
  url: 'https://glubinabaikala.ru',
  title: 'Глубина Байкала — прокрути до самого дна',
  shortTitle: 'Глубина Байкала',
  description:
    'Самое глубокое озеро планеты — 1 642 метра. Прокрути до дна, встреть эндемиков, узнай легенды и увидь, что на самом деле скрыто под осадками.',
  ogImage: '/og-default.png',
  themeColor: '#03060f',
  locale: 'ru-RU',
  twitterHandle: '',
} as const;

export const NAV = [
  { href: '/', label: 'Скролл' },
  { href: '/obitateli/', label: 'Обитатели' },
  { href: '/legendy/', label: 'Легенды' },
  { href: '/test/', label: 'Тест' },
] as const;
