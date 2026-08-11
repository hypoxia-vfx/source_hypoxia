import { motion } from 'framer-motion'
import { projects, Project } from '@/data/projects'

interface WorkSectionProps {
  onSelectProject: (project: Project) => void
}

export function WorkSection({ onSelectProject }: WorkSectionProps) {
  return (
    <section id="work" className="px-6 md:px-16 py-40">
      <div className="max-w-[1800px] mx-auto">
        {/* Header - aligned and spacious */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-mid)] mb-8 font-sans font-medium">
              — Портфолио
            </p>
            <h2
              className="font-display font-medium leading-[0.9] uppercase text-[var(--color-ink)] text-[clamp(3.5rem,8vw,7rem)]"
            >
              Избранные
              <br />
              <span className="italic text-[var(--color-mid)]">работы</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-[var(--color-ink)] text-base md:text-xl max-w-sm leading-relaxed font-light"
          >
            Проекты, в которых форма подчинена содержанию, а каждый кадр работает на удержание.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 md:gap-y-48">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i % 2 === 0 ? 0 : 0.2, duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => onSelectProject(project)}
              data-cursor="play"
              className={`${project.col || ''} group overflow-hidden cursor-pointer block`}
            >
              {/* Media Container - pure boutique image block without borders */}
              <div className="relative aspect-[4/5] md:aspect-[3/4] bg-[var(--color-surface)] overflow-hidden">
                {/* ── VIDEO LAYER ── */}
                {project.videoUrl && (
                  <video
                    src={project.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000 scale-105 group-hover:scale-100 transition-transform"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
                
                {/* Fallback/Static state layout */}
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)] group-hover:opacity-0 transition-opacity duration-1000">
                  <span className="font-sans font-medium text-xs tracking-[0.2em] text-[var(--color-mid)] select-none uppercase">
                    Case {project.num}
                  </span>
                </div>
              </div>

              {/* Text info - clean and readable */}
              <div className="pt-8 flex flex-col gap-2">
                  <h3 className="font-display font-medium text-3xl tracking-tight uppercase text-[var(--color-ink)]">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[var(--color-mid)] text-sm font-sans uppercase tracking-[0.1em]">
                      {project.sub}
                    </p>
                    <span className="text-[var(--color-mid)] text-xs font-sans tracking-[0.2em]">
                      {project.year}
                    </span>
                  </div>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
