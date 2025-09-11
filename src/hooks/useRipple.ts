import { useState } from 'react'

interface RippleState {
  id: number
  x: number
  y: number
}

export function useRipple() {
  const [ripples, setRipples] = useState<RippleState[]>([])

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const newRipple: RippleState = {
      id: Date.now(),
      x,
      y
    }

    setRipples(prevRipples => [...prevRipples, newRipple])

    setTimeout(() => {
      setRipples(prevRipples => 
        prevRipples.filter(ripple => ripple.id !== newRipple.id)
      )
    }, 600)
  }

  return { ripples, createRipple }
}