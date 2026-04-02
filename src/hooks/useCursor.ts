import { useEffect } from 'react'

export function useCursor() {
  useEffect(() => {
    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    const ring = document.querySelector<HTMLElement>('.cursor-ring')

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) {
        dot.style.left = `${mouseX - 4}px`
        dot.style.top = `${mouseY - 4}px`
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) {
        ring.style.left = `${ringX - 20}px`
        ring.style.top = `${ringY - 20}px`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const animationFrame = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])
}
