export interface Project {
  title: string
  sub: string
  year: string
  num: string
  col: string
  videoUrl: string
  category: string
  description?: string
  role?: string
  client?: string
}

export const projects: Project[] = [
  {
    title: 'Iman Gadzhi',
    sub: 'Моушн-дизайн & VFX',
    year: '2025',
    num: '01',
    col: '',
    videoUrl: '/videos/biz_2.mp4',
    category: 'YouTube Longs',
    description: 'Сделал заказчику вступление в стиле Имана Ганджи. Динамичный монтаж, 3D анимация с эффектом параллакса и яркий визуал. Вдохновлялся стилем и ритмом видео Имана, чтобы создать что-то в том же духе, по желанию заказчика.',
  },
  { 
    title: 'ВИДЕО ПРО ИИ', 
    sub: 'Видео туториал', 
    year: '2026', 
    num: '02', 
    col: '', 
    videoUrl: '/videos/gpt_test_2.mp4',
    category: 'YouTube Longs',
    description: '3D монтаж с эффектом параллакса. Видео про направления с применением ИИ.',
  },
  { 
    title: 'WB Маркетплейсы', 
    sub: 'Видеомонтаж', 
    year: '2026', 
    num: '03', 
    col: '', 
    videoUrl: '/videos/reklama.mp4',
    category: 'YouTube Longs',
    description: 'Игровой стиль. Вступление для разбора маркетплейсов с ярким визуалом и динамичным монтажом.',
  },
  { 
    title: 'Google Ads / Эдуард', 
    sub: 'Коммерческий YouTube', 
    year: '2026', 
    num: '04', 
    col: '', 
    videoUrl: '/videos/google ads eduard_2.mp4',
    category: 'YouTube Longs',
    description: 'Монтаж обучающего контента про рекламу и арбитраж с акцентной графикой.',
  },
  { 
    title: 'Клод & Кирилл', 
    sub: 'YouTube Long', 
    year: '2026', 
    num: '05', 
    col: '', 
    videoUrl: '/videos/claude_kiriill.mp4',
    category: 'YouTube Longs',
    description: 'Динамичный разговорный формат с моушн-вставками и графиками.',
  },
  {
    title: 'Rich / Финансы',
    sub: 'Финансовый разбор',
    year: '2026',
    num: '06',
    col: '',
    videoUrl: '/videos/rich.mp4',
    category: 'YouTube Longs',
    description: 'Разбор финансовых стратегий и инвестиций с экспертной графикой и ритмичной подачей.',
    role: 'Монтаж, Цветокоррекция',
  },
  {
    title: 'Олег / Reels',
    sub: 'Shorts & VFX',
    year: '2026',
    num: '07',
    col: '',
    videoUrl: '/videos/oleg_1_ds.mp4',
    category: 'Reels / Shorts',
    description: 'Динамичный Reels с глубоким моушн-дизайном, звуковыми триггерами и быстрым удержанием внимания.',
    role: 'Монтаж, Моушн-дизайн',
  },
  {
    title: '4 Рендер',
    sub: 'Reels & Эффекты',
    year: '2026',
    num: '08',
    col: '',
    videoUrl: '/videos/4_раз_рендер_господи_помоги_я_ненавижу_монтаж_.mp4',
    category: 'Reels / Shorts',
    description: 'Энергичный вертикальный контент с акцентной графикой и максимальной вовлеченностью зрителя.',
    role: 'Монтаж, VFX',
  },
  {
    title: 'Трейдинг / Reels',
    sub: 'Shorts & Продажи',
    year: '2026',
    num: '09',
    col: '',
    videoUrl: '/videos/trader.mp4',
    category: 'Reels / Shorts',
    description: 'Вертикальный промо-ролик для финансовой платформы с акцентной анимацией графиков.',
    role: 'Монтаж, Анимация',
  },
  {
    title: 'Воронка продаж',
    sub: 'Динамичный ролик',
    year: '2026',
    num: '10',
    col: '',
    videoUrl: '/videos/liam.mp4',
    category: 'Коммерция',
    description: 'Спокойный, но динамичный ролик с графиками и анимацией для финансового канала. Снова с параллакс эффектом и псевдо 3D анимацией.',
    role: 'Монтаж, Моушн-дизайн',
  },
  {
    title: 'Онлайн Бизнес',
    sub: 'Промо ролик',
    year: '2026',
    num: '11',
    col: '',
    videoUrl: '/videos/online-business.mp4',
    category: 'Коммерция',
    description: 'Промо ролик для образовательной платформы в сфере бизнеса.',
    role: 'Монтаж',
  },
]
