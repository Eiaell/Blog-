'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'
import { timeline } from '@/data/content'

export default function TimelineSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mi Trayectoria
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un recorrido por los momentos clave que han definido mi camino en tecnología y análisis
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="relative flex items-start mb-12 last:mb-0"
              >
                <div className="relative z-10 mr-6">
                  <div className={`
                    flex items-center justify-center w-16 h-16 rounded-full border-4 
                    ${item.highlight 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-white shadow-lg' 
                      : 'bg-white border-gray-200'
                    }
                  `}>
                    {item.highlight ? (
                      <CheckCircle className="h-8 w-8 text-white" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`
                        text-2xl font-bold px-3 py-1 rounded-full text-white bg-gradient-to-r
                        ${item.highlight 
                          ? 'from-blue-500 to-purple-600' 
                          : 'from-gray-400 to-gray-500'
                        }
                      `}>
                        {item.year}
                      </span>
                      {item.highlight && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                          Hito clave
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}