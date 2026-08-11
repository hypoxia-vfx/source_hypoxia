import { useEffect, useRef } from 'react'

/**
 * 3 Horizontal Wave Lines for "Ритм. Цвет. Звук." section
 * Built with Canvas 2D (High DPR) for 100% silky smooth 60/120 FPS animation
 * Zero SVG scaling jitter, zero subpixel artifacts, soft ambient glow.
 */
export function CraftLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const lines = [
      { yRatio: 0.3, amp: 14, freq: 0.0035, speed: 0.015, color: 'rgba(237, 237, 237, 0.35)', lineWidth: 1.5 },
      { yRatio: 0.5, amp: 18, freq: 0.0025, speed: 0.020, color: 'rgba(255, 255, 255, 0.65)', lineWidth: 2.0 },
      { yRatio: 0.7, amp: 14, freq: 0.0030, speed: 0.012, color: 'rgba(237, 237, 237, 0.35)', lineWidth: 1.5 },
    ]

    let time = 0

    const render = () => {
      time += 1
      ctx.clearRect(0, 0, width, height)

      // Soft glow filter
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
      ctx.shadowBlur = 12

      lines.forEach((line) => {
        ctx.beginPath()
        ctx.strokeStyle = line.color
        ctx.lineWidth = line.lineWidth
        const baseY = height * line.yRatio

        for (let x = 0; x <= width; x += 5) {
          const y = baseY + Math.sin(x * line.freq + time * line.speed) * line.amp
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-75 flex items-center justify-center z-0">
      <canvas ref={canvasRef} className="w-full h-full min-h-[300px]" />
    </div>
  )
}
