'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import { sampleContent } from '@/data/content'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = sampleContent.find(item => item.id === params.id)
  
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
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
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded"
          >
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
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