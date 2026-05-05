// Личностный квиз «Какой ты обитатель Байкала?»

export type ArchetypeId =
  | 'nerpa'
  | 'omul'
  | 'golomyanka'
  | 'gammarus'
  | 'epishura'
  | 'osetr'
  | 'taimen'
  | 'gubka';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  goodAt: string[];
  fact: string;
  creatureSlug: string;
}

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  nerpa: {
    id: 'nerpa',
    name: 'Нерпа',
    emoji: '🦭',
    tagline: 'Любопытная и независимая',
    description:
      'Ты — байкальская нерпа. Тебе одинаково комфортно и в шумной компании на льду, и одной на глубине. Ты не любишь слушаться, но умеешь договариваться. Ты обживаешь места, где никто не ждёт, что ты появишься.',
    goodAt: ['адаптироваться к новым условиям', 'долго быть наедине с собой', 'находить выход'],
    fact: 'Никто точно не знает, как нерпа оказалась в Байкале. Возможно, она и сама не знает.',
    creatureSlug: 'nerpa',
  },
  omul: {
    id: 'omul',
    name: 'Омуль',
    emoji: '🐟',
    tagline: 'Свой среди своих',
    description:
      'Ты — байкальский омуль. Тебе хорошо в стае, ты ценишь традиции и привязан к месту, где вырос. Из тебя плохой одиночка, но отличный командный игрок. Тебя ценят за надёжность.',
    goodAt: ['командной работе', 'возвращении домой', 'постоянстве'],
    fact: 'Учёные различают пять «родов» омуля — каждый верен своей реке.',
    creatureSlug: 'omul',
  },
  golomyanka: {
    id: 'golomyanka',
    name: 'Голомянка',
    emoji: '✨',
    tagline: 'Прозрачная и нестандартная',
    description:
      'Ты — голомянка. Снаружи тебя как будто бы нет — ты прозрачен, тебя не сразу замечают в толпе. Но внутри ты состоишь из чего-то особенного. Ты двигаешься между средами и глубинами, не зацепляясь ни за одну.',
    goodAt: ['нестандартному мышлению', 'свободе от ярлыков', 'тонкой эмпатии'],
    fact: 'Голомянка может за минуты подняться с километровой глубины — и не лопнуть.',
    creatureSlug: 'golomyanka',
  },
  gammarus: {
    id: 'gammarus',
    name: 'Гаммарус',
    emoji: '🦐',
    tagline: 'Универсальный солдат',
    description:
      'Ты — байкальский гаммарус. Тебя 350 видов, и ты везде. Ты везунчик, выживальщик и многозадачник. Ты найдёшь себе работу и в свету, и во мраке, и в горячем источнике, и подо льдом.',
    goodAt: ['выживать в любых условиях', 'переключаться между задачами', 'импровизировать'],
    fact: 'На Байкале — самая большая в мире эволюционная радиация бокоплавов. 350 версий тебя.',
    creatureSlug: 'gammarus',
  },
  epishura: {
    id: 'epishura',
    name: 'Эпишура',
    emoji: '💧',
    tagline: 'Незаметный фундамент',
    description:
      'Ты — эпишура. Тебя никто не считает. Ты — полтора миллиметра, и о тебе никто не пишет в путеводителях. Но без тебя весь Байкал помутнел бы. Ты делаешь невидимую работу, на которой держится всё.',
    goodAt: ['систематической работе', 'поддерживать порядок', 'оставаться в тени'],
    fact: 'Эпишура фильтрует весь объём Байкала несколько раз в год.',
    creatureSlug: 'epishura',
  },
  osetr: {
    id: 'osetr',
    name: 'Осётр',
    emoji: '🐉',
    tagline: 'Долгожитель',
    description:
      'Ты — байкальский осётр. Ты не торопишься. Тебе нужно много лет, чтобы созреть, и ещё больше — чтобы решить, кто ты. Но если уж определился — ты остаёшься верен этому десятилетиями. Ты — реликт.',
    goodAt: ['долгосрочным проектам', 'сохранять традицию', 'не терять достоинства'],
    fact: 'Современники мамонтов. До сих пор плавают.',
    creatureSlug: 'osetr',
  },
  taimen: {
    id: 'taimen',
    name: 'Таймень',
    emoji: '🦈',
    tagline: 'Хищник-одиночка',
    description:
      'Ты — таймень. Ты предпочитаешь один большой кусок десяти мелким. Ты охотник по натуре, тебя интересуют большие цели и сильные противники. Ты не «общественный человек» — но если ты с кем-то рядом, это надолго.',
    goodAt: ['сосредотачиваться', 'идти к большой цели', 'охранять территорию'],
    fact: 'Таймень может утащить под воду пьющего из реки оленёнка.',
    creatureSlug: 'taimen',
  },
  gubka: {
    id: 'gubka',
    name: 'Байкальская губка',
    emoji: '🌿',
    tagline: 'Тихий философ',
    description:
      'Ты — байкальская губка. Ты не торопишься, не суетишься, не убегаешь. Ты разрастаешься медленно — и при этом строишь под водой целые леса. Ты ценишь стабильность и красоту повседневного.',
    goodAt: ['быть рядом', 'накапливать опыт', 'видеть красоту в простом'],
    fact: 'Колонии байкальских губок живут сотни лет.',
    creatureSlug: 'baikalogubki',
  },
};

export interface QuizOption {
  text: string;
  weights: Partial<Record<ArchetypeId, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'company',
    question: 'Идеальные выходные — это…',
    options: [
      { text: 'Большая компания, шум, тосты', weights: { omul: 2, gammarus: 1 } },
      { text: 'Двое-трое близких, костёр у воды', weights: { nerpa: 2, gubka: 1 } },
      { text: 'В одиночку, в палатке у реки', weights: { taimen: 2, osetr: 1 } },
      { text: 'Дома, тихо, с книгой', weights: { gubka: 2, epishura: 1, golomyanka: 1 } },
    ],
  },
  {
    id: 'work',
    question: 'Когда тебе дают задачу, ты…',
    options: [
      { text: 'Сразу включаешься и тащишь', weights: { gammarus: 2, omul: 1 } },
      { text: 'Долго думаешь, потом делаешь основательно', weights: { osetr: 2, gubka: 1 } },
      { text: 'Делаешь, как никто бы не додумался', weights: { golomyanka: 2, taimen: 1 } },
      { text: 'Молча делаешь и не показываешь', weights: { epishura: 2, gubka: 1 } },
    ],
  },
  {
    id: 'depth',
    question: 'Где тебе комфортнее всего?',
    options: [
      { text: 'У берега, на солнце, со всеми', weights: { omul: 2, gammarus: 1 } },
      { text: 'На глубине, где тихо', weights: { golomyanka: 2, nerpa: 1 } },
      { text: 'В тёплом подводном источнике, среди своих', weights: { gammarus: 1, gubka: 2 } },
      { text: 'У самого дна, где никого нет', weights: { osetr: 2, taimen: 1 } },
    ],
  },
  {
    id: 'fear',
    question: 'Когда страшно, ты…',
    options: [
      { text: 'Сжимаешься и не двигаешься', weights: { gubka: 2, epishura: 1 } },
      { text: 'Ныряешь как можно глубже', weights: { golomyanka: 2, nerpa: 1 } },
      { text: 'Идёшь напрямую к источнику страха', weights: { taimen: 2, osetr: 1 } },
      { text: 'Бежишь к своим, кто бы они ни были', weights: { omul: 2, gammarus: 1 } },
    ],
  },
  {
    id: 'tradition',
    question: 'Семейные традиции для тебя — это…',
    options: [
      { text: 'Святое, я их храню', weights: { osetr: 2, omul: 1 } },
      { text: 'Хорошо, когда есть, но не обязательно', weights: { nerpa: 1, gammarus: 1, gubka: 1 } },
      { text: 'Я их сам выдумываю по ходу', weights: { golomyanka: 2, taimen: 1 } },
      { text: 'Я не очень про традиции, я про дело', weights: { epishura: 2, gammarus: 1 } },
    ],
  },
  {
    id: 'praise',
    question: 'Тебя чаще хвалят за…',
    options: [
      { text: 'Надёжность и постоянство', weights: { omul: 2, osetr: 1 } },
      { text: 'Самостоятельность', weights: { taimen: 2, nerpa: 1 } },
      { text: 'Странный взгляд на вещи', weights: { golomyanka: 2 } },
      { text: 'То, что ты всё успеваешь', weights: { gammarus: 2, epishura: 1 } },
      { text: 'То, что с тобой просто хорошо', weights: { gubka: 2, nerpa: 1 } },
    ],
  },
  {
    id: 'adventure',
    question: 'Если бы ты мог уйти из дома навсегда — ты бы…',
    options: [
      { text: 'Никуда бы не ушёл, мне и тут хорошо', weights: { gubka: 2, omul: 1 } },
      { text: 'Ушёл бы один в дикие места', weights: { taimen: 2, nerpa: 1 } },
      { text: 'Ушёл бы туда, где никто не был', weights: { golomyanka: 2, osetr: 1 } },
      { text: 'Ушёл бы туда, где много людей и движения', weights: { gammarus: 2, omul: 1 } },
      { text: 'Ушёл бы просто чтобы помочь кому-то', weights: { epishura: 2, gubka: 1 } },
    ],
  },
];
