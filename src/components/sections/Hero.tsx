import { motion } from 'framer-motion'

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-16 pt-32 pb-24 overflow-hidden">
      {/* ── MAIN CONTENT ── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col items-center text-center"
      >
        {/* Eyebrow - omitted per Anti-Slop / Eyebrow Restraint rules, keeping it ultra clean */}
        
        {/* Main heading - Huge typography, centered, lots of air */}
        <h1 className="font-display font-medium leading-[1] tracking-tight mb-12 select-none w-full text-[var(--color-ink)]">
          <span className="block overflow-hidden py-2">
            <motion.span
              variants={itemVariants}
              className="block text-[clamp(3.5rem,12vw,10rem)] uppercase"
            >
              Я создаю
            </motion.span>
          </span>
          <span className="block overflow-hidden py-2">
            <motion.span
              variants={itemVariants}
              className="block text-[clamp(3.5rem,12vw,10rem)] italic text-[var(--color-mid)]"
            >
              не видео,
            </motion.span>
          </span>
          <span className="block overflow-hidden py-2">
            <motion.span
              variants={itemVariants}
              className="block text-[clamp(3.5rem,12vw,10rem)] uppercase"
            >
              а истории
            </motion.span>
          </span>
        </h1>

        {/* Description & CTAs - Centered layout */}
        <div className="flex flex-col items-center gap-10 max-w-2xl mt-4">
          <motion.p
            variants={itemVariants}
            className="text-[var(--color-mid)] font-light leading-relaxed text-lg md:text-2xl"
          >
            Фокус на ритме, структуре и удержании внимания. Создаю видеоконтент, который досматривают до конца.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 justify-center items-center mt-4">
            <a 
              href="#work" 
              className="hover-invert border border-[var(--color-ink)] px-10 py-4 font-sans font-medium text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded-full bg-transparent text-[var(--color-ink)]"
            >
              Смотреть работы
            </a>
            <a 
              href="#contact" 
              className="px-10 py-4 font-sans font-medium text-xs tracking-[0.15em] uppercase text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors duration-300 border border-transparent hover:border-[var(--color-border)] rounded-full"
            >
              Связаться
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-mid)] font-sans font-medium">
          Скролл
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0], transformOrigin: ["top", "top", "bottom"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-[var(--color-border)]"
        />
      </motion.div>
    </section>
  )
}
