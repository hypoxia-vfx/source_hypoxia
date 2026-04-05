import { useEffect } from 'react'

export function useCursor() {
  useEffect(() => {
    const dot = document.querySelector<HTMLElement>('.cursor-dot')
   

    let mouseX = 0, mouseY = 0


    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) {
        dot.style.left = `${Math.round(mouseX - 10)}px`
        dot.style.top = `${Math.round(mouseY - 10)}px`
      }
    }

    const handleHover = (e: MouseEvent) => {
      // Ничего не делаем - курсор не меняется при наведении
    }

    const animate = () => {
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleHover)
    const animationFrame = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleHover)
      cancelAnimationFrame(animationFrame)
    }
  }, [])
}
