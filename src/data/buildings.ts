// Высоты эталонных объектов (метры) — для линейки сравнения вдоль скролла.
export interface Building {
  id: string;
  name: string;
  height: number;
  note?: string;
}

export const BUILDINGS: Building[] = [
  { id: 'eiffel', name: 'Эйфелева башня', height: 330 },
  { id: 'empire', name: 'Empire State Building', height: 381 },
  { id: 'burj', name: 'Бурдж-Халифа', height: 828 },
  { id: 'avg', name: 'Средняя глубина Байкала', height: 730, note: 'avg' },
];

// Эверест — для финального твиста (показываем после 1642м).
export const EVEREST_HEIGHT = 8849;
