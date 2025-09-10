'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Zap, Palette, Code } from 'lucide-react'
import { StackItem } from '@/types'
import { aiStack, mediaStack, developmentStack } from '@/data/content'
import Image from 'next/image'

const categoryIcons = {
  ai: Zap,
  media: Palette,
  development: Code
}

const categoryColors = {
  ai: 'from-blue-500 to-purple-600',
  media: 'from-pink-500 to-orange-500',
  development: 'from-green-500 to-teal-600'
}

const categoryTitles = {
  ai: 'Stack de IA',
  media: 'Stack de Media',
  development: 'Stack de Desarrollo'
}

interface StackSectionProps {
  category: 'ai' | 'media' | 'development'
  items: StackItem[]
}

function StackGrid({ category, items }: StackSectionProps) {
  const Icon = categoryIcons[category]
  const colorGradient = categoryColors[category]
  const title = categoryTitles[category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${colorGradient} text-white px-6 py-3 rounded-full mb-4`}>
          <Icon className="h-6 w-6" />
          <span className="font-bold text-lg">{title}</span>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {category === 'ai' 
            ? 'Herramientas de inteligencia artificial que uso para análisis, creación y automatización'
            : category === 'media'
            ? 'Plataformas creativas para generar contenido visual, audio y multimedia de alta calidad'
            : 'Herramientas de desarrollo y plataformas que potencian mi flujo de trabajo técnico'
          }
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:shadow-lg hover:border-gray-300 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${item.logo ? 
                  // Special handling for white/transparent logos that need dark background
                  ['grok', 'groq', 'ollama', 'chatgpt', 'midjourney', 'elevenlabs', 'ideogram', 'pika', 'cursor', 'v0', 'ai studio', 'manus', 'notebooklm'].includes(item.name.toLowerCase()) 
                    ? 'bg-gray-900 border border-gray-700' 
                    : 'bg-white border border-gray-200'
                  : `bg-gradient-to-br ${colorGradient} text-white`}`}>
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={`${item.name} logo`}
                      width={24}
                      height={24}
                      className={`w-6 h-6 object-contain ${
                        ['grok', 'groq', 'ollama', 'chatgpt', 'midjourney', 'elevenlabs', 'ideogram', 'pika', 'cursor', 'v0', 'ai studio', 'manus', 'notebooklm'].includes(item.name.toLowerCase()) 
                          ? 'filter brightness-0 invert' 
                          : ''
                      }`}
                    />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.name}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {item.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Casos de uso:</h4>
                <ul className="space-y-1">
                  {item.useCases.slice(0, 3).map((useCase, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colorGradient} mt-2 mr-2 flex-shrink-0`} />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function StackSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mi Stack Tecnológico
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Las herramientas que uso diariamente para crear, analizar y construir el futuro
          </p>
        </motion.div>

        <StackGrid category="ai" items={aiStack} />
        <StackGrid category="media" items={mediaStack} />
        <StackGrid category="development" items={developmentStack} />
      </div>
    </section>
  )
}