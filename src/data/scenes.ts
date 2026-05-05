// Сценарий главного скролла. Каждая сцена = одна глубинная отметка.
export type SceneKind = 'intro' | 'fact' | 'creature' | 'building' | 'milestone' | 'twist' | 'finale';

export interface Scene {
  id: string;
  depth: number; // метры под поверхностью
  kind: SceneKind;
  title: string;
  text: string;
  illustration?: string;
  creatureSlug?: string;
  achievement?: { id: string; emoji: string; title: string; subtitle: string };
  shareLine?: string;
}

export const SCENES: Scene[] = [
  {
    id: 'surface',
    depth: 0,
    kind: 'intro',
    title: 'Поверхность Байкала',
    text:
      'Самое глубокое озеро планеты лежит на 456 метрах над уровнем моря. Прокручивай — и ты уйдёшь под воду.',
    illustration: 'surface',
  },
  {
    id: 'epishura',
    depth: 5,
    kind: 'creature',
    title: 'Эпишура',
    text:
      'Полтора миллиметра жизни. Эпишура — рачок, фильтрующий весь Байкал и причина его легендарной прозрачности.',
    creatureSlug: 'epishura',
    illustration: 'epishura',
  },
  {
    id: 'visibility',
    depth: 40,
    kind: 'fact',
    title: 'Граница глаза',
    text:
      'До 40 метров вода Байкала почти прозрачна — рекорд среди пресных озёр. Дальше глаз начинает терять различимость.',
  },
  {
    id: 'omul',
    depth: 70,
    kind: 'creature',
    title: 'Байкальский омуль',
    text:
      'Главная промысловая рыба Байкала. С 2017 года его лов запрещён — популяция восстанавливается. Эндемик.',
    creatureSlug: 'omul',
    illustration: 'omul',
  },
  {
    id: 'big-ben',
    depth: 96,
    kind: 'building',
    title: 'Биг-Бен',
    text: 'Ты уже глубже самой известной башни Лондона.',
    achievement: {
      id: 'bigben',
      emoji: '🕰',
      title: 'Глубже Биг-Бена',
      subtitle: '96 метров под поверхностью',
    },
    shareLine: 'Я глубже Биг-Бена',
  },
  {
    id: 'nerpa',
    depth: 150,
    kind: 'creature',
    title: 'Байкальская нерпа',
    text:
      'Единственный пресноводный тюлень мира. Нырять умеет до 400 м, задерживать дыхание до 70 минут. Никто не знает наверняка, как она оказалась в Байкале.',
    creatureSlug: 'nerpa',
    illustration: 'nerpa',
  },
  {
    id: 'twilight',
    depth: 200,
    kind: 'milestone',
    title: 'Зона сумерек',
    text: 'Свет почти не доходит. Цвета гаснут, остаются только синие тона.',
  },
  {
    id: 'darkness',
    depth: 250,
    kind: 'milestone',
    title: 'Темнота',
    text:
      'Свет сюда уже не доходит. Дальше — только биолюминесценция и отражённые лучи приборов глубоководных аппаратов.',
    achievement: {
      id: 'darkness',
      emoji: '🌑',
      title: 'В абсолютной темноте',
      subtitle: '250 метров под поверхностью',
    },
  },
  {
    id: 'gabr',
    depth: 332,
    kind: 'milestone',
    title: 'Глубже любого аквалангиста',
    text:
      'Здесь — мировой рекорд погружения с аквалангом, поставленный Ахмедом Габром в 2014 году. Никто не нырял глубже на одном баллоне.',
    shareLine: 'Я ниже мирового рекорда дайвинга',
  },
  {
    id: 'empire',
    depth: 381,
    kind: 'building',
    title: 'Empire State Building',
    text: 'Ты опустился глубже, чем высота Empire State Building.',
  },
  {
    id: 'golomyanka',
    depth: 500,
    kind: 'creature',
    title: 'Голомянка',
    text:
      'Полупрозрачная, без чешуи, на треть состоит из жира. Единственная живородящая рыба Байкала и одна из самых необычных в мире.',
    creatureSlug: 'golomyanka',
    illustration: 'golomyanka',
  },
  {
    id: 'avg-depth',
    depth: 730,
    kind: 'milestone',
    title: 'Средняя глубина',
    text:
      'Это средняя глубина озера. Большая часть его дна — глубже отметки, которую ты только что прошёл.',
  },
  {
    id: 'burj',
    depth: 828,
    kind: 'building',
    title: 'Бурдж-Халифа',
    text: 'Самое высокое здание мира. Целиком умещается в Байкале — и над тобой ещё его макушка.',
    achievement: {
      id: 'burj',
      emoji: '🏙',
      title: 'Глубже Бурдж-Халифы',
      subtitle: '828 метров под поверхностью',
    },
    shareLine: 'Я глубже самого высокого здания мира',
  },
  {
    id: 'km',
    depth: 1000,
    kind: 'milestone',
    title: 'Километр',
    text: 'Один километр под зеркалом озера. Давление здесь — 100 атмосфер.',
    achievement: {
      id: 'km',
      emoji: '⚓',
      title: 'Километр-клуб',
      subtitle: '1000 метров под поверхностью',
    },
  },
  {
    id: 'mir',
    depth: 1200,
    kind: 'creature',
    title: '«Мир-1» и «Мир-2»',
    text:
      'Те же глубоководные аппараты, что снимали «Титаник» Кэмерона, в 2008 году опустились на дно Байкала. Без них мы бы и сегодня знали озеро только до 1637 метров.',
    creatureSlug: 'mir',
    illustration: 'mir',
  },
  {
    id: 'hydrothermal',
    depth: 1400,
    kind: 'creature',
    title: 'Гидротермы',
    text:
      'На дне бьют горячие источники. Вокруг них живут бактерии и рачки, которым не нужен солнечный свет — целая экосистема на хемосинтезе.',
    creatureSlug: 'bakteriomat',
    illustration: 'bakteriomat',
  },
  {
    id: 'bottom',
    depth: 1642,
    kind: 'milestone',
    title: 'Дно',
    text:
      'Самая глубокая точка Байкала. 1 642 метра. Самое глубокое озеро на Земле. Кажется, всё.',
    achievement: {
      id: 'bottom',
      emoji: '🪨',
      title: 'Достиг дна',
      subtitle: '1642 метра — рекорд озера',
    },
    shareLine: 'Я добрался до самой глубокой точки Байкала',
  },
  {
    id: 'sediment',
    depth: 4000,
    kind: 'twist',
    title: 'А теперь правда',
    text:
      'То, что ты только что назвал дном, — это вершина осадков. Под ним ещё несколько километров песка, ила и спрессованных останков 25 миллионов лет жизни. До настоящего тектонического дна — ещё далеко.',
  },
  {
    id: 'real-bottom',
    depth: 8500,
    kind: 'twist',
    title: 'Настоящее дно',
    text:
      'Если бы Байкал был «пустым» — глубина впадины была бы сравнима с Эверестом. Это самый глубокий континентальный рифт планеты, и он медленно, но непрерывно расходится.',
    achievement: {
      id: 'real-bottom',
      emoji: '🌋',
      title: 'Глубже Эвереста',
      subtitle: 'Тектоническое дно — около 8,5 км',
    },
    shareLine: 'Я нашёл настоящее дно Байкала — 8,5 км',
  },
  {
    id: 'finale',
    depth: 9000,
    kind: 'finale',
    title: 'Ты прошёл Байкал',
    text: 'А Байкал, тем временем, до сих пор растёт. Каждый год его берега расходятся на несколько миллиметров.',
  },
];

export const MAX_LAKE_DEPTH = 1642;
export const MAX_SCROLL_DEPTH = 9000;
