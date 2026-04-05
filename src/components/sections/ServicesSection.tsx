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
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  }

  return (
    <section
      id="services"
      className="px-8 md:px-16 py-24 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4"
        >
          — Что я делаю
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display font-black leading-none mb-20"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          МОИ
          <br />
          <span className="text-stroke">УСЛУГИ</span>
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-0"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center py-10 border-b border-white/10 cursor-pointer"
            >
              <span className="font-display font-black text-4xl text-stroke opacity-30 group-hover:opacity-100 transition-opacity duration-300 min-w-[4rem]">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
