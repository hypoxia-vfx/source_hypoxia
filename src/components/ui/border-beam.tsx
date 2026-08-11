import React from "react"
import { motion, Transition } from "framer-motion"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  transition?: Transition
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
  borderWidth?: number
}

export function BorderBeam({
  className = "",
  size = 120,
  duration = 6,
  delay = 0,
  colorFrom = "#C17767",
  colorTo = "#ffffff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}: BorderBeamProps) {
  const gradientId = `beam-gradient-${Math.random().toString(36).substring(2, 9)}`

  return (
    <div
      style={style}
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full rounded-[inherit]"
        style={{ overflow: "hidden" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorFrom} stopOpacity="1" />
            <stop offset="50%" stopColor={colorTo} stopOpacity="1" />
            <stop offset="100%" stopColor={colorFrom} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="9999"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={borderWidth}
          pathLength={1}
          strokeDasharray="0.3 0.7"
          initial={{ strokeDashoffset: reverse ? 0 : 1 }}
          animate={{ strokeDashoffset: reverse ? 1 : 0 }}
          transition={
            transition || {
              repeat: Infinity,
              ease: "linear",
              duration,
              delay,
            }
          }
        />
      </svg>
    </div>
  )
}
