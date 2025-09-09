export interface ContentItem {
  id: string
  title: string
  content: string
  excerpt?: string
  date: string
  category: 'writing' | 'interviews' | 'politics'
  tags?: string[]
  featured?: boolean
  author?: string
  source?: string
  url?: string
}

export interface TimelineItem {
  year: string
  title: string
  description: string
  highlight?: boolean
}

export interface StackItem {
  name: string
  description: string
  useCases: string[]
  category: 'ai' | 'media'
  icon?: string
  url?: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface NewsletterSubscription {
  email: string
}