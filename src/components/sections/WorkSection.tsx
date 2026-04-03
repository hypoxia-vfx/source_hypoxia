export function WorkSection() {
  const projects = [
    {
      title: 'БИЗНЕС РОЛИК',
      sub: 'Моушн-дизайн & VFX',
      year: '2025',
      num: '01',
      col: 'md:col-span-2',
      videoUrl: '/videos/biz_2.mp4',
    },
    { title: 'ИИ ТУТОРИАЛ', sub: 'Видео туториал', year: '2026', num: '02', col: '', videoUrl: '/videos/gpt_test_2.mp4' },
    { title: 'РЕКЛАМНЫЙ ПРОЕКТ', sub: 'Видеомонтаж', year: '2026', num: '03', col: '', videoUrl: '/videos/reklama.mp4' },
    {
      title: 'ПРИНИМАТЬ РЕШЕНИЯ',
      sub: 'Динамичный ролик',
      year: '2025',
      num: '04',
      col: 'md:col-span-2',
      videoUrl: '/videos/rich.mp4',
    },
  ]

  return (
    <section id="work" className="px-8 md:px-16 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="reveal text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
              — Мои работы
            </p>
            <h2
              className="reveal delay-100 font-display font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              МОИ
              <br />
              <span className="text-stroke">ПРОЕКТЫ</span>
            </h2>
          </div>
          <p className="reveal delay-200 hidden md:block text-gray-500 text-sm max-w-xs leading-relaxed">
            Избранная подборка моей работы — от моушена к полноценным видео
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal stagger-${i + 1} ${project.col} group card-dark rounded-2xl overflow-hidden cursor-pointer block`}
            >
              <div className="relative aspect-[16/9] bg-[#0f0f0f] overflow-hidden">
                {/* ── VIDEO LAYER ── */}
                {project.videoUrl && (
                  <video
                    src={project.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110 group-hover:scale-100 transition-transform duration-1000"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}

                {/* ── NUMBER LAYER ── */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="number-label group-hover:opacity-10 transition-opacity duration-500">
                    {project.num}
                  </div>
                </div>

                {/* ── HOVER OVERLAY ── */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="border border-white/50 bg-black/20 backdrop-blur-sm px-8 py-3 font-display font-bold text-sm tracking-widest uppercase text-white hover:bg-white hover:text-black transition-colors duration-300">
                    Смотреть полностью →
                  </div>
                </div>
                {/* Animated lines */}
                <div className="absolute left-0 bottom-0 w-0 h-px bg-white group-hover:w-full transition-all duration-700" />
                <div className="absolute right-0 top-0 w-px h-0 bg-white group-hover:h-full transition-all duration-700 delay-100" />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-xl tracking-tighter mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-light">
                    {project.sub}
                  </p>
                </div>
                <span className="text-gray-600 text-sm font-light">
                  {project.year}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
