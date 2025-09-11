'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from './ui/Button'
import emailjs from '@emailjs/browser'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    console.log('EmailJS Public Key:', publicKey ? 'Found' : 'Missing')
    console.log('EmailJS Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? 'Found' : 'Missing')
    console.log('EmailJS Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? 'Found' : 'Missing')
    
    if (publicKey) {
      emailjs.init(publicKey)
      console.log('EmailJS initialized successfully')
    } else {
      console.error('EmailJS public key not found in environment variables')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const notificationTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const welcomeTemplateId = process.env.NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID
      
      if (!serviceId || !notificationTemplateId || !welcomeTemplateId) {
        throw new Error('EmailJS configuration missing')
      }

      // Extract user name from email (part before @)
      const userName = email.split('@')[0]
      
      // Email 1: Notification to you (admin)
      const notificationParams = {
        user_email: email,
        to_name: 'Engelbert Huber',
        from_name: userName,
        message: `Nueva suscripción al newsletter de ${email}`,
        reply_to: email
      }

      console.log('Sending notification email:', {
        serviceId,
        templateId: notificationTemplateId,
        params: notificationParams
      })

      const notificationResult = await emailjs.send(
        serviceId,
        notificationTemplateId,
        notificationParams
      )

      // Email 2: Welcome email to user
      const welcomeParams = {
        user_name: userName,
        user_email: email,
        to_email: email
      }

      console.log('Sending welcome email:', {
        serviceId,
        templateId: welcomeTemplateId,
        params: welcomeParams
      })

      const welcomeResult = await emailjs.send(
        serviceId,
        welcomeTemplateId,
        welcomeParams
      )
      
      console.log('Notification result:', notificationResult)
      console.log('Welcome result:', welcomeResult)

      if (notificationResult.status === 200 && welcomeResult.status === 200) {
        setIsSubmitted(true)
        setEmail('')
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        throw new Error('One or both emails failed to send')
      }
    } catch (err) {
      console.error('EmailJS error details:')
      console.error('Error object:', err)
      console.error('Error message:', err instanceof Error ? err.message : 'Unknown error')
      console.error('Error stack:', err instanceof Error ? err.stack : 'No stack trace')
      console.error('Full error JSON:', JSON.stringify(err, null, 2))
      
      setError('Hubo un error al procesar tu suscripción. Por favor intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="newsletter-section" className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Mantente al día
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Recibe insights semanales sobre IA, análisis político-tecnológico y las tendencias 
              que están moldeando nuestro futuro digital.
            </motion.p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-3 bg-red-500/20 text-red-100 px-6 py-3 rounded-lg border border-red-400/30">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              </motion.div>
            )}

            {!isSubmitted ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('') // Clear error when user types
                    }}
                    placeholder="tu@email.com"
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border ${
                      error ? 'border-red-400' : 'border-white/30'
                    } text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all`}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="bg-white text-blue-900 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-900" />
                  ) : (
                    <>
                      Suscribirme
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-3 bg-green-500/20 text-green-100 px-6 py-3 rounded-lg border border-green-400/30">
                  <CheckCircle className="h-6 w-6" />
                  <span className="font-medium">¡Gracias por suscribirte! Revisa tu email para la confirmación.</span>
                </div>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-sm text-blue-200 mt-6"
            >
              Sin spam. Solo contenido de valor. Puedes cancelar tu suscripción en cualquier momento.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}