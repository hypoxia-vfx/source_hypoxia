export function ServicesSection() {
  const services = [
    {
      num: '01',
      title: 'Брендинг & Идентика',
      desc: 'Создаю мощные визуальные системы, которые запоминаются. Логотипы, типографика, цветовые системы и полное руководство по стилю.',
      tags: ['Логотип', 'Гайдлайн', 'Упаковка'],
    },
    {
      num: '02',
      title: 'Веб-дизайн & Разработка',
      desc: 'Цифровые продукты с характером. От концепции до живого сайта — каждый пиксель работает на вашу цель.',
      tags: ['UI/UX', 'Анимации', 'Разработка'],
    },
    {
      num: '03',
      title: 'Моушн & Видео',
      desc: 'Движение рассказывает истории. Создаю анимации, видеоролики и моушн-контент, который невозможно игнорировать.',
      tags: ['Анимация', '3D', 'Видео'],
    },
    {
      num: '04',
      title: 'Стратегия & Консалтинг',
      desc: 'Прежде чем рисовать — думаю. Помогаю брендам найти свой голос, аудиторию и место на рынке.',
      tags: ['Стратегия', 'Позиционирование', 'Аудит'],
    },
  ]

  return (
    <section
      id="services"
      className="px-8 md:px-16 py-24 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
          — Что я делаю
        </p>
        <h2
          className="reveal delay-100 font-display font-black leading-none mb-20"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          МОИ
          <br />
          <span className="text-stroke">УСЛУГИ</span>
        </h2>

        <div className="space-y-0">
          {services.map((service, i) => (
            <div
              key={i}
              className={`reveal stagger-${i + 1} group flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center py-10 border-b border-white/10 cursor-pointer`}
            >
              <span className="font-display font-black text-4xl text-stroke opacity-30 group-hover:opacity-100 transition-opacity duration-300 min-w-[3rem]">
                {service.num}
              </span>
              <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight group-hover:text-white transition-colors duration-300 min-w-[260px]">
                {service.title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed flex-1 group-hover:text-gray-300 transition-colors duration-300">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2 min-w-[200px]">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-white/20 px-3 py-1 font-light tracking-wider group-hover:border-white/50 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-2xl text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
