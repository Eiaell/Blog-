import { useState, useEffect } from 'react'

export function useScrollSpy(selectors: string[], options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -80% 0%',
        threshold: 0.1,
        ...options
      }
    )

    const elements = selectors
      .map((selector) => document.querySelectorAll(selector))
      .flat()
      .filter(Boolean)

    elements.forEach((element) => {
      if (element instanceof Element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [selectors, options])

  return activeId
}