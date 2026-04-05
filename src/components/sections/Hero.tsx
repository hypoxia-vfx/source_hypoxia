import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Subtler spring for smoother, less "jumpy" movement
  const springConfig = { damping: 30, stiffness: 120 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Subtler parallax ranges (reduced by ~50%)
  const textX = useTransform(x, [-500, 500], [15, -15])
  const textY = useTransform(y, [-500, 500], [15, -15])
  
  const circleX = useTransform(x, [-500, 500], [30, -30])
  const circleY = useTransform(y, [-500, 500], [30, -30])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const moveX = clientX - window.innerWidth / 2
      const moveY = clientY - window.innerHeight / 2
      mouseX.set(moveX)
      mouseY.set(moveY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 }, // Subtler entrance (reduced from 30)
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
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-32 pb-20 overflow-hidden bg-transparent">
      {/* ── BACKGROUND LAYERS ── */}
      
      {/* 1. Large "МОУШН" Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none select-none z-0 overflow-hidden">
        <motion.div
          style={{ x: textX, y: textY, fontSize: 'clamp(6rem, 20vw, 18rem)', opacity: 0.15 }}
          className="text-stroke-sm font-display font-black whitespace-nowrap"
        >
          МОУШЕН
        </motion.div>
      </div>

      {/* 2. Decorative Circles (Separated parallax from rotation to prevent conflicts) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Right Circle */}
        <motion.div 
          style={{ x: circleX, y: circleY }}
          className="absolute top-[15%] right-[10%] w-96 h-96 hidden md:block"
        >
          <div className="w-full h-full rounded-full border border-white/20 animate-rotate-slow" />
        </motion.div>

        {/* Bottom Left Circle */}
        <motion.div 
          style={{ 
            x: useTransform(x, [-500, 500], [-20, 20]), 
            y: useTransform(y, [-500, 500], [-20, 20]) 
          }}
          className="absolute bottom-[15%] left-[5%] w-64 h-64 hidden md:block"
        >
          <div className="w-full h-full rounded-full border border-white/10 animate-rotate-slow delay-500" />
        </motion.div>
      </div>

      {/* 3. Background Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(#f5f5f0 1px, transparent 1px), linear-gradient(90deg, #f5f5f0 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* 4. Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto w-full"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "circOut", delay: 0.5 }}
            className="w-12 h-px bg-white/40 origin-left" 
          />
          <span className="text-xs tracking-[0.3em] uppercase text-white/40 font-light">
            Моушн-дизайн & Видеомонтаж — 2026
          </span>
        </motion.div>

        {/* Main heading */}
        <h1 className="font-display font-black leading-[0.9] mb-8 max-w-5xl">
          <span className="block overflow-hidden">
            <motion.span
              variants={itemVariants}
              className="block"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 9rem)' }}
            >
              <span className="text-stroke">Я</span> СОЗДАЮ
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={itemVariants}
              className="block"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 9rem)' }}
            >
              НЕ <span className="text-stroke">ВИДЕО</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={itemVariants}
              className="block"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 9rem)' }}
            >
              <span className="text-stroke">А</span> ИСТОРИИ
            </motion.span>
          </span>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <motion.p
            variants={itemVariants}
            className="text-gray-400 font-light leading-relaxed max-w-md"
            style={{ fontSize: '1.15rem' }}
          >
            Фокус на ритме, структуре и подаче — чтобы видео не просто выглядело, а работало.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-4">
            <a href="#work" className="hover-invert glow-button group border border-white px-10 py-4 font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10">Смотреть работы</span>
            </a>
            <a href="#contact" className="glow-text px-10 py-4 font-display font-bold text-sm tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300">
              → Контакт
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* 5. Scroll indicator (Topmost) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-white/30">
          Скролл
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
