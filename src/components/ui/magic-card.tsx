import React, { useRef } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

interface MagicCardProps {
  children?: React.ReactNode
  className?: string
  mode?: "gradient" | "orb"
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  glowFrom?: string
  glowTo?: string
  glowAngle?: number
  glowSize?: number
  glowBlur?: number
  glowOpacity?: number
}

export function MagicCard({
  children,
  className = "",
  mode = "gradient",
  gradientSize = 220,
  gradientColor = "#262626",
  gradientOpacity = 0.9,
  gradientFrom = "#C17767",
  gradientTo = "#ffffff",
  glowFrom = "#ee4f27",
  glowTo = "#6b21ef",
  glowAngle = 90,
  glowSize = 420,
  glowBlur = 60,
  glowOpacity = 0.9,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const { left, top } = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const handleMouseLeave = () => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-block overflow-hidden rounded-full p-[2px] bg-white/10 transition-colors duration-300 ${className}`}
    >
      {/* Interactive Border & Background Gradient Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, transparent 80%)
          `,
        }}
      />
      {/* Content Container */}
      <div className="relative z-10 w-full h-full rounded-full bg-[var(--color-bg)] flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
