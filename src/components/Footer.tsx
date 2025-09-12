'use client'

import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github, Heart } from 'lucide-react'
import { socialLinks } from '@/data/content'

const iconMap = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
}

const techStack = [
  'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Claude Code'
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Engelbert Huber</h3>
            <p className="text-gray-400 leading-relaxed">
              Operador de IA especializado en construcción del futuro digital en Latinoamérica.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li><a href="#stack" className="hover:text-white transition-colors">Stack Tecnológico</a></li>
              <li><a href="#writing" className="hover:text-white transition-colors">Artículos de Interés</a></li>
              <li><a href="#timeline" className="hover:text-white transition-colors">Trayectoria</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Conecta conmigo</h4>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap]
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>
            <p className="text-sm text-gray-400">
              Abierto a colaboraciones, entrevistas y proyectos innovadores.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span>© {currentYear} Engelbert Huber. Hecho con</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>y tecnología.</span>
            </div>
            
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span>Stack:</span>
              {techStack.map((tech, index) => (
                <span key={tech} className="flex items-center">
                  {index > 0 && <span className="mx-1">•</span>}
                  <span className="hover:text-gray-300 transition-colors">{tech}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="md:hidden mt-4 text-center">
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
              <span>Stack:</span>
              {techStack.map((tech, index) => (
                <span key={tech} className="flex items-center">
                  {index > 0 && <span className="mx-1">•</span>}
                  <span className="hover:text-gray-300 transition-colors">{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}