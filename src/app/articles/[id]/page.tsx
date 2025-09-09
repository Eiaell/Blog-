'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import { sampleContent } from '@/data/content'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { use } from 'react'

interface ArticlePageProps {
  params: Promise<{
    id: string
  }>
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = use(params)
  const article = sampleContent.find(item => item.id === resolvedParams.id)
  
  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al inicio
          </Link>
        </div>
      </nav>

      {/* Article Content */}
      <article className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Article Header */}
          <header className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {article.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-gray-600 mb-8"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <time dateTime={article.date}>
                  {formatDate(article.date)}
                </time>
              </div>
              
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-5 w-5" />
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {article.excerpt && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-gray-600 leading-relaxed font-light"
              >
                {article.excerpt}
              </motion.p>
            )}
          </header>

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-xl max-w-none 
              prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-8 prose-h1:leading-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-900 prose-h2:font-bold prose-h2:border-b prose-h2:border-blue-100 prose-h2:pb-3
              prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-gray-800 prose-h3:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-6 prose-li:my-2 prose-li:text-gray-700 prose-li:text-lg
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-6 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-blue-800
              prose-code:text-blue-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
          >
            <ReactMarkdown 
              rehypePlugins={[rehypeHighlight]}
              components={{
                p: ({ children, ...props }) => {
                  const text = typeof children === 'string' ? children : (Array.isArray(children) ? children.join('') : String(children))
                  const isDropCapParagraph = 
                    text.startsWith('Durante más de cuatro décadas') ||
                    text.startsWith('En las afueras de Melbourne') ||
                    text.startsWith('A pesar del avance de estas tecnologías') ||
                    text.startsWith('La implementación exitosa de la IA') ||
                    text.startsWith('La revolución de la IA en la educación')
                  
                  return (
                    <p {...props} className={isDropCapParagraph ? 'drop-cap' : ''}>
                      {children}
                    </p>
                  )
                }
              }}
            >
              {article.content}
            </ReactMarkdown>
          </motion.div>

          {/* Back to Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <Link 
              href="/#writing" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-lg font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Ver más artículos
            </Link>
          </motion.div>
        </motion.div>
      </article>
    </div>
  )
}