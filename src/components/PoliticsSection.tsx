'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, TrendingUp } from 'lucide-react'
import { ContentItem } from '@/types'
import { formatDate } from '@/lib/utils'
import { Button } from './ui/Button'

interface PoliticsSectionProps {
  content: ContentItem[]
}

export default function PoliticsSection({ content }: PoliticsSectionProps) {
  const politicsContent = content.filter(item => item.category === 'politics')
  const featuredContent = politicsContent.filter(item => item.featured).slice(0, 2)
  const recentContent = politicsContent.slice(0, 4)

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            <span>Análisis Político</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Política
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Análisis crítico sobre la intersección entre tecnología, IA y política en Latinoamérica. 
            Perspectivas sobre el futuro del poder en la era digital.
          </p>
        </motion.div>

        {politicsContent.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Próximamente</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Esta sección estará llena de análisis profundos sobre política y tecnología. 
              Mantente atento para contenido revolucionario.
            </p>
          </motion.div>
        ) : (
          <>
            {featuredContent.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Análisis Destacados</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredContent.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="bg-white rounded-lg p-8 h-full shadow-lg hover:shadow-xl transition-all border-l-4 border-red-500">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(item.date)}</span>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            Política
                          </span>
                        </div>
                        
                        <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h4>
                        
                        {item.excerpt && (
                          <p className="text-gray-600 mb-6 line-clamp-3">
                            {item.excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center text-red-600 font-medium group-hover:gap-2 transition-all">
                          <span>Leer análisis completo</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Análisis Recientes</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recentContent.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden border-t-4 border-red-500"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      
                      {item.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                          {item.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center text-red-600 font-medium text-sm group-hover:gap-2 transition-all">
                        <span>Leer más</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button variant="outline" size="lg" className="border-red-500 text-red-600 hover:bg-red-50">
                Ver todos los análisis políticos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}