import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useParallax } from '@/hooks/useParallax'
import { useCursor } from '@/hooks/useCursor'
import { StatCard } from '@/components/StatCard'
import { Hero } from '@/components/sections/Hero'
import { WorkSection } from '@/components/sections/WorkSection'
import { ServicesSection } from '@/components/sections/ServicesSection'

export default function App() {
  useIntersectionObserver()
  useParallax()
  useCursor()

  return (
    <div className="noise bg-[#0a0a0a] text-[#f5f5f0] min-h-screen">
      {/* Custom cursor */}
      <div className="cursor-dot hidden md:block" />
      <div className="cursor-ring hidden md:block" />

      {/* ── NAVIGATION ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, transparent 100%)' }}
      >
        <div className="font-display font-black text-xl tracking-tighter animate-fade-in">
          HYP<span className="text-stroke">O</span>XIA
        </div>
        <ul className="hidden md:flex gap-10 text-sm font-light tracking-widest uppercase animate-fade-in delay-200">
          <li><a href="#work" className="opacity-60 hover:opacity-100 transition-opacity duration-300">Работы</a></li>
          <li><a href="#services" className="opacity-60 hover:opacity-100 transition-opacity duration-300">Услуги</a></li>
          <li><a href="#about" className="opacity-60 hover:opacity-100 transition-opacity duration-300">Обо мне</a></li>
          <li><a href="#contact" className="opacity-60 hover:opacity-100 transition-opacity duration-300">Контакт</a></li>
        </ul>
        <a
          href="#contact"
          className="hover-invert border border-white/30 px-6 py-2.5 text-xs tracking-widest uppercase font-medium animate-fade-in delay-400 transition-all duration-300"
        >
          Начать проект
        </a>
      </nav>

      <Hero />

      {/* ── MARQUEE ── */}
      <section className="border-y border-white/10 py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(2).fill(['ДИЗАЙН', '✦', 'БРЕНДИНГ', '✦', 'WEB', '✦', 'МОУШН', '✦', 'СТРАТЕГИЯ', '✦', 'UI/UX', '✦', 'ИДЕНТИКА', '✦']).flat().map((item, i) => (
            <span key={i} className={`font-display font-black text-sm tracking-[0.2em] mr-8 ${item === '✦' ? 'text-white/30' : 'text-white/70'}`}>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-8 md:px-16 py-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value={15} suffix="+" label="Кейсов" delay="1" />
          <StatCard value={1} suffix=" год" label="Опыта" delay="2" />
          <StatCard value={100} suffix="%" label="Качество" delay="3" />
          <StatCard value={3} suffix="+" label="Ниши" delay="4" />
        </div>
      </section>

      <WorkSection />
      <ServicesSection />

      {/* ── ABOUT / MANIFESTO ── */}
      <section id="about" className="px-8 md:px-16 py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          data-parallax="0.1"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(245,245,240,0.8) 0%, transparent 50%)',
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="reveal text-xs tracking-[0.3em] uppercase text-white/40 mb-6">— Манифест</p>
              <h2 className="reveal delay-100 font-display font-black leading-tight mb-8" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                ДИЗАЙН — ЭТО НЕ УКРАШЕНИЕ.<br />
                <span className="text-stroke">ЭТО ЯЗЫК.</span>
              </h2>
              <p className="reveal delay-200 text-gray-400 leading-relaxed mb-6" style={{ fontSize: '1.05rem' }}>
                Мы верим, что форма следует за смыслом. Что каждая визуальная система должна быть системой ценностей. Что красота и функциональность — не противоположности, а союзники.
              </p>
              <p className="reveal delay-300 text-gray-500 leading-relaxed">
                За 1 год усердной работы я сделал не один проект. И каждый раз убеждались: когда визуальный язык совпадает с сутью бренда — происходит магия.
              </p>
            </div>
            <div className="reveal-right delay-200">
              <div className="relative">
                <div className="aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-white/10">
                  <div className="absolute inset-0 flex items-end p-10">
                    <div>
                      <div className="text-9xl font-display font-black text-stroke mb-4" style={{ lineHeight: 1 }}>H</div>
                      <div className="text-xs tracking-[0.4em] uppercase text-white/30">HYPOXIA PERSONAL — С 2024</div>
                    </div>
                  </div>
                  <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full animate-rotate-slow" />
                  <div className="absolute top-16 right-16 w-8 h-8 bg-white/5 rounded-full" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-white/10 rounded-xl" />
                <div className="absolute -top-4 -left-4 w-20 h-20 border border-white/10 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-8 md:px-16 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-white/40 mb-4">— Отзывы</p>
          <h2 className="reveal delay-100 font-display font-black mb-16" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            ГОВОРЯТ<br /><span className="text-stroke">КЛИЕНТЫ</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Видео набрало просмотров, о которых раньше я даже мечтать не мог ',
                author: 'demonenok work',
                role: 'CEO, TechNova',
              },
              {
                quote: 'Они думают иначе. Не просто рисуют красивые картинки — они строят системы, которые работают годами.',
                author: 'Мария Соколова',
                role: 'Основатель, Forma Studio',
              },
              {
                quote: 'Сотрудничество с командой HYPOXIA — это опыт на уровне лучших мировых студий. Рекомендуем без оговорок.',
                author: 'Дмитрий Кузнецов',
                role: 'CMO, Meridian Group',
              },
            ].map((t, i) => (
              <div key={i} className={`reveal stagger-${i + 1} card-dark rounded-2xl p-8 hover-lift`}>
                <div className="text-4xl font-display font-black text-white/10 mb-4">"</div>
                <p className="text-gray-300 leading-relaxed mb-6 font-light">{t.quote}</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-medium text-white text-sm">{t.author}</div>
                  <div className="text-gray-500 text-xs mt-1 font-light">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="px-8 md:px-16 py-32 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,245,240,0.04) 0%, transparent 70%)' }}
        />

        <div className="max-w-4xl mx-auto text-center relative">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-white/40 mb-6">— Начнём?</p>
          <h2 className="reveal delay-100 font-display font-black leading-none mb-8" style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}>
            ГОТОВЫ<br />РАБОТАТЬ
          </h2>
          <h2 className="reveal delay-200 font-display font-black leading-none mb-10 text-stroke" style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}>
            ВМЕСТЕ?
          </h2>
          <p className="reveal delay-300 text-gray-400 mb-12 font-light leading-relaxed max-w-md mx-auto">
            Расскажите о вашем проекте. Мы ответим в течение 24 часов и предложим первичную концепцию бесплатно.
          </p>
          <div className="reveal delay-400 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/hypoxia_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-invert border border-white px-12 py-5 font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 animate-pulse-border"
            >
              Написать в Telegram
            </a>
            <a
              href="mailto:hello@hypoxia.studio"
              className="px-12 py-5 font-display font-bold text-sm tracking-widest uppercase text-white/40 hover:text-white border border-transparent hover:border-white/20 transition-all duration-300"
            >
              hello@hypoxia.studio
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-8 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="font-display font-black text-2xl tracking-tighter mb-2">
                HYP<span className="text-stroke">O</span>XIA
              </div>
              <p className="text-gray-600 text-xs font-light">Специалист по визуальному дизайну</p>
            </div>
              <div className="flex gap-8 text-xs tracking-widest uppercase font-light text-gray-600">
                <a href="#work" className="hover:text-white transition-colors duration-300">Работы</a>
                <a href="#services" className="hover:text-white transition-colors duration-300">Услуги</a>
                <a href="#about" className="hover:text-white transition-colors duration-300">Обо мне</a>
                <a href="#contact" className="hover:text-white transition-colors duration-300">Контакт</a>
              </div>
            <div className="flex gap-6 text-xs tracking-widest uppercase font-light text-gray-600">
              <a href="https://t.me/hypoxia_studio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Telegram</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Behance</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
            </div>
          </div>
          <div className="section-line my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-700 font-light">
            <span>© 2024 HYPOXIA Studio. Все права защищены.</span>
            <span>Сделано с любовью к деталям</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
