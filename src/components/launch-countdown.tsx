 'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

type Props = {
  heroRef?: React.RefObject<HTMLElement | null>
}

export default function LaunchCountdown({ heroRef }: Props) {
  const [time, setTime] = useState({ days: '00', hours: '00', mins: '00', secs: '00', ended: false })
  const containerRef = useRef<HTMLDivElement | null>(null)
  const bannerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const launch = new Date('2026-01-06T00:00:00Z').getTime()

    function update() {
      const now = Date.now()
      let diff = launch - now
      if (diff <= 0) {
        setTime({ days: '00', hours: '00', mins: '00', secs: '00', ended: true })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      diff -= days * (1000 * 60 * 60 * 24)
      const hours = Math.floor(diff / (1000 * 60 * 60))
      diff -= hours * (1000 * 60 * 60)
      const mins = Math.floor(diff / (1000 * 60))
      diff -= mins * (1000 * 60)
      const secs = Math.floor(diff / 1000)

      setTime({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        mins: String(mins).padStart(2, '0'),
        secs: String(secs).padStart(2, '0'),
        ended: false,
      })
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const banner = bannerRef.current
    const sourceEl = (heroRef && heroRef.current) || containerRef.current
    if (!sourceEl || !banner) return

    function onMove(e: MouseEvent) {
      const { clientX, clientY } = e
      const { left, top, width, height } = sourceEl.getBoundingClientRect()
      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      // Inverted movement compared to hero: negate multipliers
      gsap.to(banner, {
        x: -x * 30,
        y: -y * 20,
        rotationY: -x * 5,
        rotationX: y * 5,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    function onLeave() {
      gsap.to(banner, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power2.out' })
    }

    sourceEl.addEventListener('mousemove', onMove)
    sourceEl.addEventListener('mouseleave', onLeave)

    return () => {
      sourceEl.removeEventListener('mousemove', onMove)
      sourceEl.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (time.ended) {
    return (
      <div ref={containerRef} className="mx-auto mb-6 max-w-2xl">
        <div ref={bannerRef} className="launch-banner bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-4 py-2 text-black font-semibold text-center flex items-center justify-center gap-6 shadow-lg">
          🚀 Lançamento disponível!
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="mx-auto mb-6 max-w-2xl">
      <div ref={bannerRef} className="launch-banner bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-4 py-2 text-black font-semibold text-center flex items-center justify-center gap-6 shadow-lg">
        <span className="hidden sm:inline text-2xl font-bold">🚀 Lançamento em</span>
        <div className="flex items-center gap-4 text-sm sm:text-base">
          <div className="text-center">
            <span className="block text-lg font-bold">{time.days}</span>
            <span className="block text-xs text-black/70">dias</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold">{time.hours}</span>
            <span className="block text-xs text-black/70">horas</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold">{time.mins}</span>
            <span className="block text-xs text-black/70">min</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold">{time.secs}</span>
            <span className="block text-xs text-black/70">s</span>
          </div>
        </div>
      </div>
    </div>
  )
}
