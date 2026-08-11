import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Tag, ArrowRight } from 'lucide-react'
import { VideoPlayer } from './ui/VideoPlayer'

interface ProjectDetailProps {
  project: {
    title: string
    sub: string
    year: string
    num: string
    videoUrl: string
    description?: string
    role?: string
    client?: string
  }
  onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: 30 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[var(--color-bg)] overflow-y-auto"
      data-lenis-prevent
    >
      {/* ── HEADER / CLOSE ── */}
      <nav className="sticky top-0 left-0 right-0 z-[110] flex items-center justify-between px-6 md:px-16 py-8 bg-gradient-to-b from-[var(--color-bg)] via-[var(--color-bg)] to-transparent">
        <div className="font-display font-black text-xl tracking-tighter text-[var(--color-text)]">
          HYP<span className="text-stroke text-stroke-sm">O</span>XIA
        </div>
        <button
          onClick={onClose}
          className="group flex items-center gap-4 text-xs tracking-[0.2em] uppercase font-sans font-medium text-[var(--color-mid)] hover:text-[var(--color-text)] transition-colors"
        >
          <span>Закрыть</span>
          <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:rotate-90 group-hover:border-[var(--color-text)] transition-all duration-500">
            <X size={16} />
          </div>
        </button>
      </nav>

      <div className="max-w-[1800px] mx-auto px-6 md:px-16 pt-12 pb-32">
        {/* ── HERO CONTENT ── */}
        <div className="grid md:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs tracking-[0.2em] font-medium font-sans uppercase text-[var(--color-mid)] mb-6"
            >
              — Кейс {project.num}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display font-medium leading-[1] mb-4 text-[var(--color-text)] uppercase"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              {project.title.split(' ')[0]}<br />
              <span className="italic text-[var(--color-mid)]">{project.title.split(' ').slice(1).join(' ')}</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-12 md:justify-end pb-4"
          >
            <div>
              <p className="text-[10px] tracking-widest uppercase font-sans font-medium text-[var(--color-mid)] mb-2">Год</p>
              <p className="text-base font-light text-[var(--color-text)]">{project.year}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase font-sans font-medium text-[var(--color-mid)] mb-2">Роль</p>
              <p className="text-base font-light text-[var(--color-text)]">{project.role || project.sub}</p>
            </div>
            {project.client && (
              <div>
                <p className="text-[10px] tracking-widest uppercase font-sans font-medium text-[var(--color-mid)] mb-2">Клиент</p>
                <p className="text-base font-light text-[var(--color-text)]">{project.client}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── VIDEO PLAYER ── */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.5, duration: 0.8 }}
           className="mb-24 border border-[var(--color-border)] overflow-hidden rounded-2xl"
        >
          <VideoPlayer src={project.videoUrl} autoPlay />
        </motion.div>

        {/* ── DESCRIPTION / DETAILS ── */}
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-7">
            <h2 className="font-display font-medium text-3xl tracking-tight mb-8 text-[var(--color-text)] uppercase">О проекте</h2>
            <div className="space-y-6 text-[var(--color-text)] font-light leading-relaxed text-lg md:text-xl max-w-2xl">
              <p>
                {project.description || `Этот проект был направлен на создание динамичного визуального контента, который удерживает внимание зрителя с первой секунды.`}
              </p>
              <p>
                {project.role ? `Моя роль включала в себя ${project.role.toLowerCase()}. Жду вашего заказа.` : `Я отвечал за весь процесс создания видео, от концепции до финального монтажа, что позволило мне полностью раскрыть потенциал материала и создать законченный продукт.`}
              </p>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <div className="border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Tag size={160} />
              </div>
              <h3 className="font-display font-medium text-2xl mb-8 relative z-10 text-[var(--color-text)] uppercase">Услуги</h3>
              <ul className="space-y-4 relative z-10 mb-12">
                {['Монтаж', 'Цветокоррекция', 'SFX', 'Графика'].map((tag, i) => (
                  <li key={i} className="flex items-center gap-4 text-base group">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] transition-colors" />
                    <span className="text-[var(--color-text)] transition-colors">{tag}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://t.me/hypoxia_editing"
                target="_blank"
                className="group flex items-center justify-between border-t border-[var(--color-border)] pt-8 text-xs tracking-[0.1em] uppercase font-sans font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
              >
                <span>Заказать похожее</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
