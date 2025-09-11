'use client'

import { useEffect, useRef } from 'react'

export function useSmoothScroll() {
  const scrollTargetRef = useRef(0)
  const currentScrollRef = useRef(0)
  const isScrollingRef = useRef(false)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    // Interpolación suave
    const lerp = (start: number, end: number, factor: number): number => {
      return start + (end - start) * factor
    }

    // Animación del scroll
    const smoothScrollAnimation = () => {
      const diff = scrollTargetRef.current - currentScrollRef.current
      
      if (Math.abs(diff) > 0.1) {
        // Factor de suavidad (más bajo = más suave, como volar)
        const smoothFactor = 0.08
        currentScrollRef.current = lerp(
          currentScrollRef.current, 
          scrollTargetRef.current, 
          smoothFactor
        )
        
        window.scrollTo(0, currentScrollRef.current)
        animationFrameRef.current = requestAnimationFrame(smoothScrollAnimation)
      } else {
        isScrollingRef.current = false
        currentScrollRef.current = scrollTargetRef.current
        window.scrollTo(0, scrollTargetRef.current)
      }
    }

    // Manejador del scroll wheel
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      // Sensibilidad del scroll (ajustable)
      const sensitivity = 1.5
      const delta = e.deltaY * sensitivity
      
      scrollTargetRef.current += delta
      
      // Limitar el scroll
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollTargetRef.current = Math.max(0, Math.min(scrollTargetRef.current, maxScroll))
      
      if (!isScrollingRef.current) {
        isScrollingRef.current = true
        currentScrollRef.current = window.scrollY
        smoothScrollAnimation()
      }
    }

    // Inicializar posición
    scrollTargetRef.current = window.scrollY
    currentScrollRef.current = window.scrollY

    // Event listeners
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return null
}