export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-32 pb-20 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#f5f5f0 1px, transparent 1px), linear-gradient(90deg, #f5f5f0 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Large background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-stroke-sm font-display font-black select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: 'clamp(6rem, 20vw, 18rem)', opacity: 0.06 }}
        data-parallax="0.15"
      >
        ДИЗАЙН
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-8 animate-fade-up">
          <div className="w-12 h-px bg-white/40 animate-line-grow" />
          <span className="text-xs tracking-[0.3em] uppercase text-white/40 font-light">
            Моушн-дизайн & Визуал — 2024
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-display font-black leading-[0.9] mb-8 max-w-5xl">
          <span className="block overflow-hidden">
            <span
              className="block animate-fade-up"
              style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
            >
              Я СОЗДАЮ
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="block animate-fade-up delay-100"
              style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
            >
              ВИЗУАЛЬНЫЕ
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="block animate-fade-up delay-200 text-stroke"
              style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
            >
              ШЕДЕВРЫ
            </span>
          </span>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <p
            className="text-gray-400 font-light leading-relaxed max-w-md animate-fade-up delay-400"
            style={{ fontSize: '1.1rem' }}
          >
            Трансформирую бренды через силу визуального языка. Каждый пиксель —
            это намерение. Каждая линия — это история.
          </p>
          <div className="flex gap-4 animate-fade-up delay-500">
            <a href="#work" className="hover-invert group border border-white px-10 py-4 font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10">Смотреть работы</span>
            </a>
            <a href="#contact" className="px-10 py-4 font-display font-bold text-sm tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300">
              → Контакт
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in delay-1200">
        <span className="text-xs tracking-[0.3em] uppercase text-white/30">
          Скролл
        </span>
        <div
          className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent"
          style={{ animation: 'fadeUp 1.5s ease infinite alternate' }}
        />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-white/5 animate-rotate-slow hidden md:block" />
      <div
        className="absolute top-20 right-20 w-48 h-48 rounded-full border border-white/5 hidden md:block"
        style={{
          animation: 'rotateSlow 15s linear infinite reverse',
          top: '6rem',
          right: '6rem',
          margin: '2rem',
        }}
      />
    </section>
  )
}
