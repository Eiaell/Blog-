'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { ContentItem } from '@/types'
import { formatDate } from '@/lib/utils'
import { Button } from './ui/Button'
import Link from 'next/link'

interface WritingSectionProps {
  content: ContentItem[]
}

export default function WritingSection({ content }: WritingSectionProps) {
  const writingContent = content.filter(item => item.category === 'writing')
  const featuredContent = writingContent.filter(item => item.featured)

  return (
    <section id="writing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Artículos de Interés sobre IA Generativa
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ideas, análisis y perspectivas sobre el futuro de la tecnología y su impacto social
          </p>
        </motion.div>

        {featuredContent.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Destacados</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredContent.map((item, index) => (
                <Link key={item.id} href={`/articles/${item.id}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(item.date)}</span>
                      {item.tags && item.tags.length > 0 && (
                        <>
                          <span className="mx-2">•</span>
                          <div className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            <span>{item.tags[0]}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    
                    {item.excerpt && (
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {item.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                      <span>Leer más</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {featuredContent.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg">
              Ver todos los artículos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}