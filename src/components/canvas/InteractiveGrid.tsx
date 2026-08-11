import { useEffect, useRef } from 'react'

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    
    // Mouse coords relative to canvas
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width
      canvas.height = height
    }

    resize()
    window.addEventListener('resize', resize)

    // Configuration
    const gap = 48 // Spacing between grid intersections
    const influenceRadius = 180 // Mouse hover radius
    const attractionForce = 0.25 // How much dots move towards the mouse

    interface GridPoint {
      x: number // original X
      y: number // original Y
      curX: number // current X
      curY: number // current Y
    }

    let points: GridPoint[] = []

    const initPoints = () => {
      points = []
      const cols = Math.ceil(width / gap) + 1
      const rows = Math.ceil(height / gap) + 1

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * gap
          const y = r * gap
          points.push({
            x,
            y,
            curX: x,
            curY: y,
          })
        }
      }
    }

    initPoints()

    // Re-initialize points when resized
    const observer = new ResizeObserver(() => {
      resize()
      initPoints()
    })
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.targetX = e.clientX - rect.left
      mouse.targetY = e.clientY - rect.top
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.targetX = -1000
      mouse.targetY = -1000
      mouse.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Smooth mouse movement
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1
        mouse.y += (mouse.targetY - mouse.y) * 0.1
      } else {
        mouse.x += (-1000 - mouse.x) * 0.1
        mouse.y += (-1000 - mouse.y) * 0.1
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'

      for (let i = 0; i < points.length; i++) {
        const p = points[i]

        // Calculate distance to mouse
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        let targetX = p.x
        let targetY = p.y
        let alpha = 0.05

        if (dist < influenceRadius) {
          // Calculate force based on distance
          const force = (1 - dist / influenceRadius) * attractionForce
          targetX = p.x + dx * force
          targetY = p.y + dy * force
          // Increase opacity near mouse
          alpha = 0.05 + (1 - dist / influenceRadius) * 0.22
        }

        // Smooth spring physics for point movement
        p.curX += (targetX - p.curX) * 0.12
        p.curY += (targetY - p.curY) * 0.12

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        
        // Draw a tiny dot (1.5px radius)
        ctx.beginPath()
        ctx.arc(p.curX, p.curY, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  )
}
