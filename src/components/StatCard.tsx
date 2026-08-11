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
      className={`reveal stagger-${delay} flex flex-col items-center justify-center text-center py-6 px-4`}
    >
      <div className="font-display font-medium text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--color-ink)] mb-4 text-center leading-none">
        {count}<span className="text-[var(--color-accent)]">{suffix}</span>
      </div>
      <div className="text-[var(--color-mid)] text-xs font-sans font-medium tracking-[0.15em] uppercase text-center">
        {label}
      </div>
    </div>
  )
}
