import { motion } from 'framer-motion'

export function ServicesSection() {
  const services = [
    {
      num: '01',
      title: 'Видеомонтаж',
      desc: 'Создаю динамичные ролики для YouTube, Reels и TikTok. Соблюдаю ритм, удерживаю внимание и делаю так, чтобы каждый кадр работал на результат.',
      tags: ['Premiere Pro', 'Sapphire FX'],
    },
    {
      num: '02',
      title: 'Моушн-дизайн',
      desc: 'Оживляю статику. Создаю 2D и Псевдо 3D анимации, заставки, плашки и типографику, которые добавляют проектам современный и стильный вид.',
      tags: ['2D Анимация', 'After Effects'],
    },
    {
      num: '03',
      title: 'Цветокоррекция',
      desc: 'Профессиональный грейдинг видео. Подчеркиваю атмосферу, выравниваю кадры и создаю тот самый «киношный» вид.',
      tags: ['Грейдинг', 'Color Correction'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  }

  return (
    <section
      id="services"
      className="px-6 md:px-16 py-40 border-t border-[var(--color-border)]"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.2em] uppercase text-[var(--color-mid)] mb-8 font-sans font-medium"
        >
          — Что я делаю
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium leading-none mb-32 uppercase text-[var(--color-ink)] text-[clamp(3rem,7vw,6rem)]"
        >
          Мои
          <br />
          <span className="italic text-[var(--color-mid)]">услуги</span>
        </motion.h2>

        {/* Services List - Editorial hairlines */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col border-t border-[var(--color-border)]"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center py-16 border-b border-[var(--color-border)] transition-colors duration-300 hover:bg-[var(--color-surface)] -mx-6 px-6 md:-mx-16 md:px-16"
            >
              {/* Number */}
              <span className="font-sans font-medium text-lg text-[var(--color-mid)] group-hover:text-[var(--color-ink)] transition-colors duration-300 min-w-[3rem]">
                {service.num}
              </span>

              {/* Title */}
              <h3 className="font-display font-medium text-2xl md:text-3xl tracking-tight text-[var(--color-ink)] transition-colors duration-300 min-w-[280px] uppercase">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--color-ink)] opacity-70 font-light leading-relaxed flex-1 transition-colors duration-300 text-base md:text-lg">
                {service.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 min-w-[240px]">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.1em] font-sans font-medium border border-[var(--color-border)] px-4 py-2 text-[var(--color-ink)] group-hover:border-[var(--color-ink)] transition-colors duration-300 rounded-full uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
