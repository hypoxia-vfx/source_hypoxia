import { useEffect } from 'react'

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax]')
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.3')
        el.style.transform = `translateY(${scrollY * speed}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}
