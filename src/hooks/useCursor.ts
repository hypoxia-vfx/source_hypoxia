import { useEffect } from 'react'

export function useCursor() {
  useEffect(() => {
    // Only apply on non-touch devices
    if (window.matchMedia('(max-width: 768px)').matches) return

    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    if (!dot) return

    let mouseX = -100
    let mouseY = -100
    let curX = -100
    let curY = -100
    let isAnimated = false

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      // Instantly position on first move
      if (!isAnimated) {
        curX = mouseX
        curY = mouseY
        isAnimated = true
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="play"]')) {
        dot.classList.add('cursor-play')
      } else {
        dot.classList.remove('cursor-play')
      }
    }

    const animate = () => {
      if (isAnimated) {
        // Interpolate for premium organic lag feeling
        curX += (mouseX - curX) * 0.18
        curY += (mouseY - curY) * 0.18
        dot.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    const animationFrame = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animationFrame)
    }
  }, [])
}
