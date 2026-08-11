import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isReel = project.category === 'Reels / Shorts'

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, y: -30, filter: 'blur(10px)' }
      }}
      onClick={() => onSelect(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer flex flex-col gap-4"
    >
      <div 
        className={`relative bg-[var(--color-surface)] overflow-hidden rounded-xl border border-[var(--color-border)] group-hover:border-[var(--color-text)]/40 transition-colors ${
          isReel ? 'aspect-[9/16] max-w-[320px] mx-auto w-full' : 'aspect-video w-full'
        }`}
      >
        {project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform"
            loop
            muted
            playsInline
            preload="metadata"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-white">▶ Смотреть</span>
        </div>
      </div>
      <div className="flex justify-between items-baseline px-1">
        <h4 className="font-display text-lg uppercase tracking-wide group-hover:text-[var(--color-accent)] transition-colors">{project.title}</h4>
        <p className="text-[10px] font-sans text-[var(--color-mid)] tracking-widest uppercase">{project.year}</p>
      </div>
    </motion.div>
  )
}
