import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from '@/hooks/useLenis'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { projects } from '@/data/projects'
import { ProjectDetail } from './components/ProjectDetail'
import { InteractiveHero } from '@/components/InteractiveHero'
import { CraftLines } from '@/components/CraftLines'
import { ProjectCard } from '@/components/ProjectCard'

export default function App() {
  useLenis()
  useIntersectionObserver()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  
  // Interactive Showcase State
  const categories = Array.from(new Set(projects.map(p => p.category)))
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    if (!activeCategory) return []
    return projects.filter(p => p.category === activeCategory)
  }, [activeCategory])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (isMenuOpen || selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen, selectedProject])

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]">
      {/* ── HEADER ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-8 mix-blend-difference text-white pointer-events-none">
        <div className="font-display font-black text-xl tracking-tighter uppercase select-none pointer-events-auto">
          HYP<span className="text-stroke text-stroke-sm">O</span>XIA
        </div>
        
        <button
          onClick={() => setIsMenuOpen(true)}
          className="group flex items-center gap-4 text-xs tracking-[0.2em] uppercase font-sans font-medium hover:opacity-70 transition-opacity pointer-events-auto"
        >
          <span>Меню</span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-4 h-[2px] bg-white relative">
              <div className="absolute top-[-4px] left-0 w-4 h-[2px] bg-white transition-transform group-hover:translate-y-[2px]" />
              <div className="absolute bottom-[-4px] left-0 w-4 h-[2px] bg-white transition-transform group-hover:-translate-y-[2px]" />
            </div>
          </div>
        </button>
      </nav>

      {/* ── FULLSCREEN MENU ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[var(--color-surface)] flex flex-col justify-between px-6 md:px-16 py-8"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between">
              <div className="font-display font-black text-xl tracking-tighter uppercase text-[var(--color-text)]">
                HYP<span className="text-stroke text-stroke-sm">O</span>XIA
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center gap-4 text-xs tracking-[0.2em] uppercase font-sans font-medium text-[var(--color-mid)] hover:text-[var(--color-text)] transition-colors"
              >
                <span>Закрыть</span>
                <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:rotate-90 group-hover:border-[var(--color-text)] transition-all duration-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
              </button>
            </div>

            <div className="flex flex-col gap-8 md:gap-12 max-w-[1400px] mx-auto w-full py-20">
              <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-mid)] font-sans font-medium">— Навигация</p>
              <div className="flex flex-col gap-4 md:gap-8">
                {['Манифест', 'Шоукейс', 'Контакты'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${['manifesto', 'showcase', 'contact'][i]}`}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-medium text-[clamp(3rem,8vw,6rem)] uppercase text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors leading-none"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs font-sans tracking-[0.1em] uppercase text-[var(--color-mid)] border-t border-[var(--color-border)] pt-8">
              <span>Специалист по монтажу и моушн-дизайну</span>
              <div className="flex gap-8 mt-4 md:mt-0">
                <a href="https://t.me/hypoxia_editing" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text)] transition-colors">Telegram</a>
                <a href="mailto:hello@hypoxia.studio" className="hover:text-[var(--color-text)] transition-colors">hello@hypoxia.studio</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO (THE HOOK) ── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-16 overflow-hidden">
        
        {/* 3D Background */}
        <InteractiveHero />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full z-10 pointer-events-none"
        >
          <h1 
            className="font-display font-medium leading-[0.9] tracking-tight uppercase select-none w-full flex flex-col items-center"
            style={{ filter: "drop-shadow(0 12px 40px rgba(0, 0, 0, 0.95)) drop-shadow(0 2px 10px rgba(0, 0, 0, 0.8))" }}
          >
            <span className="block text-[clamp(4rem,15vw,12rem)] text-[var(--color-text)]">ВИДЕТЬ.</span>
            <span className="block text-[clamp(4rem,15vw,12rem)] text-stroke italic opacity-70">ЧУВСТВОВАТЬ.</span>
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="absolute bottom-12 text-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-mid)] font-sans">Погружение</span>
        </motion.div>
      </section>

      {/* ── MANIFESTO (THE PROBLEM) ── */}
      <section id="manifesto" className="px-6 md:px-16 py-40 md:py-60 border-t border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-[var(--color-mid)] mb-12 font-sans font-medium">— Мой подход</p>
          <h2 className="reveal stagger-1 font-display font-medium leading-[1.2] uppercase text-[var(--color-text)] text-[clamp(2rem,6vw,4.5rem)] mb-16">
            Ваше видео пропустят.<br/>
            <span className="text-[var(--color-mid)] italic">Если только я его не смонтирую.</span>
          </h2>
          <p className="reveal stagger-2 text-[var(--color-mid)] font-light leading-relaxed max-w-3xl mx-auto text-lg md:text-2xl">
            В эпоху бесконечного скролла внимание стоит дороже золота. Большинство роликов — это визуальный шум. Я не просто склеиваю кадры. Я конструирую визуальные триггеры, которые заставляют зрителя остановиться. Это не просто монтаж — это мой способ управлять вниманием вашей аудитории.
          </p>
        </div>
      </section>

      {/* ── THE CRAFT ── */}
      <section className="relative px-6 md:px-16 py-40 border-y border-[var(--color-border)] overflow-hidden">
        {/* Crisp Horizontal Vector Waves */}
        <CraftLines />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-16 md:gap-24 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-4xl md:text-6xl text-[var(--color-text)] mb-6">РИТМ.</h3>
              <p className="text-[var(--color-mid)] font-light text-lg">Динамика, которая не отпускает ни на секунду.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-4xl md:text-6xl text-[var(--color-text)] mb-6">ЦВЕТ.</h3>
              <p className="text-[var(--color-mid)] font-light text-lg">Кинематографичная атмосфера и сочность каждого кадра.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-4xl md:text-6xl text-[var(--color-text)] mb-6">ЗВУК.</h3>
              <p className="text-[var(--color-mid)] font-light text-lg">Саунд-дизайн, который пробирает до мурашек.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SHOWCASE (INTERACTIVE EXHIBITION) ── */}
      <section id="showcase" className="px-6 md:px-16 py-40 min-h-screen flex flex-col">
        <div className="max-w-[1800px] mx-auto w-full flex-1 flex flex-col">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-mid)] mb-12 font-sans font-medium">— Мои работы</p>

          {/* Top Layout: Theme list aligned on the LEFT */}
          <div className="flex flex-col gap-6 mb-16 max-w-2xl">
            {categories.map((cat) => {
              const isActive = activeCategory === cat

              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(isActive ? null : cat)}
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  animate={{
                    scale: isActive ? 1.05 : (hoveredCategory === cat ? 1.02 : 1),
                    x: isActive ? 15 : (hoveredCategory === cat ? 8 : 0),
                    color: isActive || hoveredCategory === cat ? 'var(--color-accent)' : 'var(--color-text)',
                    opacity: activeCategory && !isActive ? 0.35 : 1
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-left font-display uppercase tracking-tight origin-left transition-colors cursor-pointer ${
                    isActive ? 'text-5xl md:text-7xl font-bold' : 'text-3xl md:text-5xl font-medium'
                  }`}
                >
                  {cat}
                </motion.button>
              )
            })}
          </div>

          {/* Bottom Layout: Video Grid appearing BELOW the themes */}
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
                  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
                }}
                className="border-t border-[var(--color-border)]/40 pt-16"
              >
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-display text-2xl uppercase tracking-wider text-[var(--color-text)]">
                    {activeCategory} <span className="text-xs font-sans text-[var(--color-mid)] tracking-widest text-normal">({filteredProjects.length})</span>
                  </h3>
                </div>

                <div className={`grid gap-8 ${
                  activeCategory === 'Reels / Shorts' 
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      onSelect={setSelectedProject}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA (IMPACT) ── */}
      <section id="contact" className="px-6 md:px-16 py-40 md:py-60 relative overflow-hidden border-t border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-[var(--color-mid)] mb-12 font-sans font-medium">— Финал</p>
          <h2 className="reveal stagger-1 font-display font-medium leading-[1] mb-20 uppercase text-[var(--color-text)] text-[clamp(3rem,8vw,7rem)]">
            Ваш проект заслуживает<br/>
            <span className="italic text-[var(--color-mid)]">быть увиденным.</span>
          </h2>
          
          <div className="reveal stagger-2 flex justify-center">
            <a
              href="https://t.me/hypoxia_editing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-16 py-6 font-sans font-medium text-sm tracking-[0.2em] uppercase transition-all duration-300 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90"
            >
              Начать работу
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--color-border)] px-6 md:px-16 py-12">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--color-mid)]">
          <span>© 2026 Hypoxia Studio</span>
          <span>Видеть. Чувствовать.</span>
        </div>
      </footer>

      {/* Modal case study detail */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
