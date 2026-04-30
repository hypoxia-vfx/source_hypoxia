export interface Project {
  title: string
  sub: string
  year: string
  num: string
  col: string
  videoUrl: string
  description?: string
  role?: string
  client?: string
}

export const projects: Project[] = [
  {
    title: 'Iman Gandzhi',
    sub: 'Моушн-дизайн & VFX',
    year: '2025',
    num: '01',
    col: 'md:col-span-2',
    videoUrl: '/videos/biz_2.mp4',
    description: 'Сделал заказчику вступление в стиле Имана Ганджи. Динамичный монтаж, 3D анимация с эффектом параллакса и яркий визуал. Вдохновлялся стилем и ритмом видео Имана, чтобы создать что-то в том же духе, по желанию заказчика.',
    role: 'Моушн-дизайн, VFX, 3D анимация',
    //client: '',
  },
  {
    title: 'ВИДЕО ПРО ИИ',
    sub: 'Видео туториал',
    year: '2026',
    num: '02',
    col: '',
    videoUrl: '/videos/gpt_test_2.mp4',
    description: '3d монтаж с эффектом параллакса. Видео про нарпавления с применением ИИ',
    role: 'Монтаж, 3D параллакс, Цветокоррекция',
    //client: 'Tech Academy',
  },
  {
    title: 'WB',
    sub: 'Видеомонтаж',
    year: '2026',
    num: '03',
    col: '',
    videoUrl: '/videos/reklama.mp4',
    description: 'Игровой стиль. Вступление для разбора маркетплейсов с ярким визуалом и динамичным монтажом.',
    role: 'Видеомонтаж, Саунд-дизайн, Графика',
    //client: 'Fashion House',
  },
  {
    title: 'ФИНАНСОВАЯ ГРАМОТНОСТЬ',
    sub: 'Динамичный ролик',
    year: '2026',
    num: '04',
    col: 'md:col-span-2',
    videoUrl: '/videos/rich.mp4',
    description: 'Спокойный, но динамичный ролик с графиками и анимацией для финансового канала. Снова с параллакс эффектом и псевдо 3d анимацией.',
    role: 'Саунд-дизайн, Монтаж',
    //client: 'Personal Project',
  },
]
