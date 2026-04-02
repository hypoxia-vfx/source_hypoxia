import { useEffect, useRef, useState } from 'react'
import { useCountUp } from '../hooks/useCountUp'

interface StatCardProps {
  value: number
  suffix: string
  label: string
  delay: string
}

export function StatCard({ value, suffix, label, delay }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const count = useCountUp(value, 2000, started)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal stagger-${delay} card-dark rounded-2xl p-8 text-center hover-lift`}
    >
      <div className="font-display text-6xl font-black text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-400 text-sm font-light tracking-widest uppercase">
        {label}
      </div>
    </div>
  )
}
