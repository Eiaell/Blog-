'use client'

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function WhatsAppButton() {
  const whatsappNumber = "+51930990396"
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}`
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="flex justify-end"
      >
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-green-500 hover:bg-green-600 text-white rounded-l-2xl shadow-lg cursor-pointer flex items-center justify-center transition-colors duration-300 ${
            isHovered ? 'flex-row' : 'flex-col'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={isHovered ? {
            width: 'auto',
            height: '56px',
            padding: '12px 16px'
          } : {
            width: '56px',
            height: 'auto',
            padding: '16px 12px'
          }}
          style={{ 
            transformOrigin: 'right center'
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
        <MessageCircle size={24} className="flex-shrink-0" />
        <motion.span 
          className="text-xs font-medium tracking-wide whitespace-nowrap select-none"
          style={{
            writingMode: isHovered ? 'horizontal-tb' : 'vertical-rl',
          }}
          animate={isHovered ? {
            marginTop: 0,
            marginLeft: 12
          } : {
            marginTop: 8,
            marginLeft: 0
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          CONTÁCTAME
        </motion.span>
        </motion.a>
      </motion.div>
    </div>
  )
}