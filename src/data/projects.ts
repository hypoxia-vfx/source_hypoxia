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
    title: 'БИЗНЕС РОЛИК',
    sub: 'Моушн-дизайн & VFX',
    year: '2025',
    num: '01',
    col: 'md:col-span-2',
    videoUrl: '/videos/biz_2.mp4',
    description: 'Создание профессионального рекламного ролика для бизнеса с акцентом на динамику и современные визуальные эффекты. Полный цикл производства от идеи до саунд-дизайна. Мы использовали псевдо-3D графику и сложные маски для создания бесшовных переходов.',
    role: 'Режиссер монтажа, Моушн-дизайнер',
    client: 'Business Corp',
  },
  { 
    title: 'ИИ ТУТОРИАЛ', 
    sub: 'Видео туториал', 
    year: '2026', 
    num: '02', 
    col: '', 
    videoUrl: '/videos/gpt_test_2.mp4',
    description: 'Образовательный контент нового поколения. Использование ИИ-инструментов для создания наглядных и понятных туториалов. В проекте интегрированы анимированные UI-элементы и инфографика.',
    role: 'Монтаж, Графика',
    client: 'Tech Academy',
  },
  { 
    title: 'РЕКЛАМНЫЙ ПРОЕКТ', 
    sub: 'Видеомонтаж', 
    year: '2026', 
    num: '03', 
    col: '', 
    videoUrl: '/videos/reklama.mp4',
    description: 'Рекламная кампания для бренда одежды. Фокус на цветокоррекции и ритмичном монтаже под бит. Атмосфера проекта вдохновлена современным европейским стилем.',
    role: 'Цветокоррекция, Монтаж',
    client: 'Fashion House',
  },
  {
    title: 'ПРИНИМАТЬ РЕШЕНИЯ',
    sub: 'Динамичный ролик',
    year: '2025',
    num: '04',
    col: 'md:col-span-2',
    videoUrl: '/videos/rich.mp4',
    description: 'Мотивационный ролик с быстрой нарезкой и агрессивным саунд-дизайном. Работа с архивами и стоковым футажом для создания эпического повествования.',
    role: 'Саунд-дизайн, Монтаж',
    client: 'Personal Project',
  },
]
