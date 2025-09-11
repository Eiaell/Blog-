'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import WritingSection from '@/components/WritingSection'
import StackSection from '@/components/StackSection'
import TimelineSection from '@/components/TimelineSection'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'
import ContentManager from '@/components/ContentManager'
import { sampleContent } from '@/data/content'
import { ContentItem } from '@/types'

export default function Home() {
  const [content, setContent] = useState<ContentItem[]>(sampleContent)

  const handleAddContent = (newContent: ContentItem) => {
    setContent(prev => [newContent, ...prev])
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <StackSection />
      <WritingSection content={content} />
      <TimelineSection />
      <NewsletterSection />
      <Footer />
      
      <ContentManager onAddContent={handleAddContent} />
    </main>
  )
}