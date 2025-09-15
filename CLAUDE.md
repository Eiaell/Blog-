# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal landing page project for Engelbert Huber, designed to showcase him as an AI operator. The project is inspired by rowancheung.com and aims to highlight his AI stack, writing, interviews, and media tools.

## Project Status

**Fully Implemented**: Premium landing page built with Next.js 15, TypeScript, and Tailwind CSS. Features advanced content management system, responsive design, and EmailJS integration for newsletter subscriptions.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting (using ESLint with Next.js configuration)
npm run lint

# Type checking (manual TypeScript check)
npx tsc --noEmit
```

Note: No test suite is configured in this project.

## Technology Stack

- **Framework**: Next.js 15 with App Router and React 19
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with @tailwindcss/typography plugin
- **Animations**: Framer Motion for smooth page interactions
- **Icons**: Lucide React icon library
- **Forms**: React Hook Form with Zod validation and EmailJS integration
- **Content**: React Markdown with rehype-highlight for syntax highlighting
- **Date Handling**: date-fns for formatting
- **Utilities**: clsx and tailwind-merge for class name composition

## Architecture Overview

### App Router Structure

- `src/app/layout.tsx`: Root layout with Geist font configuration
- `src/app/page.tsx`: Main landing page with all sections
- `src/app/articles/[id]/page.tsx`: Dynamic article detail pages
- `src/app/globals.css`: Global styles and Tailwind imports

### Component Architecture

The application follows a component-per-section pattern:

- **Hero.tsx**: Animated landing section with social links
- **WritingSection.tsx**: Content display with featured articles filtering
- **StackSection.tsx**: Tabbed interface for AI, Media, and Development tools
- **TimelineSection.tsx**: Interactive career timeline with highlight states
- **NewsletterSection.tsx**: EmailJS-powered subscription form with dual email sending
- **Footer.tsx**: Social links and technical stack information
- **ContentManager.tsx**: Floating CMS for content upload and creation

### State Management Pattern

Uses local component state with React hooks. No global state management library. State flows:

1. **Content State**: Managed in main page component, passed to sections
2. **Form State**: React Hook Form for newsletter subscription
3. **UI State**: Local useState for modals, tabs, and animations

### Type System

Core TypeScript interfaces in `src/types/index.ts`:

- **ContentItem**: Articles with metadata (category: 'writing' | 'interviews')
- **TimelineItem**: Career milestones with optional highlight flags
- **StackItem**: Tools categorized as 'ai' | 'media' | 'development'
- **SocialLink**: External profile links with icon identifiers
- **NewsletterSubscription**: Email form validation schema

### Content Management

Built-in CMS accessible via floating action button:

- File upload support: TXT, Markdown, HTML
- Manual content creation with rich editor
- Auto-categorization based on content type
- Real-time content updates without page refresh
- Metadata management: tags, excerpts, publication dates

### Email Integration (EmailJS)

Newsletter subscription requires EmailJS configuration:

- **Service Setup**: Gmail/Outlook email service in EmailJS dashboard
- **Templates**: Admin notification + user welcome email templates
- **Environment Variables**: Service ID, template IDs, and public key
- **Error Handling**: Form validation with loading states and user feedback

See `EMAILJS_SETUP.md` for complete configuration guide.

## Content Structure

All content is in Spanish as per PRD requirements:

- `src/data/content.ts`: Sample content including extensive AI/ML articles
- Static data includes AI stack (Claude, ChatGPT, Gemini, etc.)
- Media tools (Midjourney, ElevenLabs, Kling, etc.)
- Development tools (Cursor, v0, LangChain, etc.)
- Career timeline from 2019-2025

### Article Formatting Standards

**IMPORTANT**: When adding new articles, follow the comprehensive formatting guide in `ARTICLE_FORMAT_GUIDE.md`. This ensures visual consistency and professional presentation.

Key requirements:
- Content should NOT include H1 titles (handled automatically)
- First paragraph must be configured for drop-cap styling
- Use `## **Subtitle**` format for section headers
- Avoid excessive bold formatting - only for section headers and key terms
- Follow the established structure for lists and content organization

## Styling System

Tailwind CSS v4 with custom configuration:

- **Grid Patterns**: Custom background utilities for visual effects
- **Typography**: Extended prose styles for article content
- **Responsive Design**: Mobile-first with touch-friendly interactions
- **Custom Utilities**: Grid backgrounds and enhanced typography

## Key Configuration Files

- `eslint.config.mjs`: Flat config using Next.js + TypeScript presets
- `tailwind.config.js`: Custom grid patterns and typography configuration
- `tsconfig.json`: Strict TypeScript with `@/*` path aliases to `./src/*`
- `next.config.ts`: Minimal Next.js configuration
- `postcss.config.mjs`: PostCSS setup for Tailwind processing

## Development Guidelines

1. **Content Language**: All user-facing content must be in Spanish
2. **Component Pattern**: One component per page section, no deep nesting
3. **Type Safety**: All props and state must be properly typed
4. **Responsive First**: Test mobile experience before desktop
5. **Animation Performance**: Use Framer Motion sparingly for key interactions
6. **Content Updates**: New content should be added through the CMS interface