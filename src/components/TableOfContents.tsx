'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const items: TOCItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()

      items.push({
        id,
        text,
        level
      })
    }

    setTocItems(items)
  }, [content])

  useEffect(() => {
    // Add IDs to headings first
    const addHeadingIds = () => {
      tocItems.forEach((item) => {
        const headings = Array.from(document.querySelectorAll(`h${item.level}`))
        const heading = headings.find(el => {
          const text = el.textContent?.trim() || ''
          return text.includes(item.text) || item.text.includes(text)
        })

        if (heading && !heading.id) {
          heading.id = item.id
        }
      })
    }

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-10% 0% -70% 0%',
        threshold: 0.1
      }
    )

    // Add IDs and observe headings
    setTimeout(() => {
      addHeadingIds()

      tocItems.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.observe(element)
        }
      })
    }, 500)

    return () => {
      observer.disconnect()
    }
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <ChevronRight className="h-5 w-5 mr-2 text-blue-600" />
          Contenido
        </h3>

        <nav>
          <ul className="space-y-2">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`
                    text-left w-full py-2 px-3 rounded-md transition-all duration-200 hover:bg-blue-50
                    ${item.level === 1 ? 'text-base font-semibold' : ''}
                    ${item.level === 2 ? 'text-sm font-medium ml-4' : ''}
                    ${item.level === 3 ? 'text-sm ml-8' : ''}
                    ${item.level >= 4 ? 'text-xs ml-12' : ''}
                    ${activeId === item.id
                      ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="block truncate">{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  )
}