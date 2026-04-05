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
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] overflow-y-auto"
      data-lenis-prevent
    >
      {/* ── HEADER / CLOSE ── */}
      <nav className="sticky top-0 left-0 right-0 z-[110] flex items-center justify-between px-8 md:px-16 py-8 bg-gradient-to-b from-[#0a0a0a] to-transparent">
        <div className="font-display font-black text-xl tracking-tighter text-white">
          HYP<span className="text-stroke">O</span>XIA
        </div>
        <button
          onClick={onClose}
          className="group flex items-center gap-4 text-xs tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors"
        >
          <span>Закрыть</span>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
            <X size={16} />
          </div>
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-0 pb-32">
        {/* ── HERO CONTENT ── */}
        <div className="grid md:grid-cols-2 gap-10 mb-12 items-end">
          <div>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4"
             >
               — Кейс {project.num}
             </motion.p>
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="font-display font-black leading-[0.9] mb-4 text-white"
               style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
             >
               {project.title.split(' ')[0]}<br />
               <span className="text-stroke">{project.title.split(' ').slice(1).join(' ')}</span>
             </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-8 border-t border-white/5 pt-6"
          >
            <div>
               <p className="text-[10px] tracking-widest uppercase text-white/20 mb-1">Год</p>
               <p className="text-sm font-light text-white/70">{project.year}</p>
            </div>
            <div>
               <p className="text-[10px] tracking-widest uppercase text-white/20 mb-1">Роль</p>
               <p className="text-sm font-light text-white/70">{project.role || project.sub}</p>
            </div>
            <div>
               <p className="text-[10px] tracking-widest uppercase text-white/20 mb-1">Клиент</p>
               <p className="text-sm font-light text-white/70">{project.client || 'Конфиденциально'}</p>
            </div>
          </motion.div>
        </div>

        {/* ── VIDEO PLAYER ── */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.5, duration: 0.8 }}
           className="mb-20 shadow-2xl shadow-white/5 overflow-hidden rounded-2xl"
        >
          <VideoPlayer src={project.videoUrl} autoPlay />
        </motion.div>

        {/* ── DESCRIPTION / DETAILS ── */}
        <div className="grid md:grid-cols-12 gap-16">
           <div className="md:col-span-7">
              <h2 className="font-display font-black text-2xl tracking-tight mb-8 text-white">О ПРОЕКТЕ</h2>
              <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
                 <p>
                    {project.description || `Этот проект был направлен на создание динамичного визуального контента, который удерживает внимание зрителя с первой секунды.`}
                 </p>
                 <p>
                    В этом проекте мы сфокусировались на ритме и визуальной гармонии, чтобы создать незабываемый пользовательский опыт.
                 </p>
              </div>
           </div>
           
           <div className="md:col-span-4 md:col-start-9">
              <div className="card-dark rounded-2xl p-10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                    <Tag size={120} />
                 </div>
                 <h3 className="font-display font-bold text-xl mb-8 relative z-10 text-white">УСЛУГИ</h3>
                 <ul className="space-y-4 relative z-10">
                    {['Монтаж', 'Цветокоррекция', 'SFX', 'Графика'].map((tag, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm group">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                        <span className="text-gray-400 group-hover:text-white transition-colors">{tag}</span>
                      </li>
                    ))}
                 </ul>
                 
                 <a 
                   href="https://t.me/hypoxia_editing" 
                   target="_blank" 
                   className="mt-12 group flex items-center justify-between border-t border-white/10 pt-8 text-xs tracking-widest uppercase font-bold hover:text-white transition-colors text-white/60"
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
