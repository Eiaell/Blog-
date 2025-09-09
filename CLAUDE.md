# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal landing page project for Engelbert Huber, designed to showcase him as an AI operator. The project is inspired by rowancheung.com and aims to highlight his AI stack, writing, interviews, media tools, and political analysis.

## Project Status

**Fully Implemented**: Premium landing page built with Next.js 15, TypeScript, and Tailwind CSS. Features advanced content management system and responsive design.

## Project Requirements (from PRD)

The landing page should include:

- **Hero Section**: Photo, tagline, highlights, and social links
- **Writing Section**: Articles and newsletter content
- **Interviews Section**: Relevant interview highlights
- **Media Stack**: Midjourney, Veo3, Nanobanana, Heygen, Elevenlabs, Kling
- **AI Stack**: Gemini, Claude, ChatGPT, Codex, Grok, Deepseek (with use cases)
- **Politics Section**: Analysis and opinion articles
- **Timeline**: Life rundown (2019-2025)
- **Newsletter**: Email subscription form
- **Footer**: Copyright and technical stack

## Target Audience

- AI professionals
- Builders and constructors
- Educators
- Policy-makers
- Potential clients and partners

## Future Ideas (from PRD)

- Dynamic blog integration (Notion API or lightweight CMS)
- Video embeds with Heygen and Elevenlabs
- Live feeds from X or LinkedIn
- Comparative analysis between AI and politics

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom utilities
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React icon library
- **UI Components**: Custom component system with shadcn/ui patterns
- **Forms**: React Hook Form with Zod validation
- **Content**: Markdown support with syntax highlighting

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
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

## Architecture Overview

### Component Structure

- `src/components/`: Reusable UI components
  - `ui/`: Base UI components (Button, etc.)
  - `Hero.tsx`: Landing hero section with animations
  - `ContentManager.tsx`: Advanced CMS for uploading diverse text sources
  - `WritingSection.tsx`: Dynamic content display with featured articles
  - `StackSection.tsx`: AI and Media stack showcases
  - `PoliticsSection.tsx`: Political analysis content section
  - `TimelineSection.tsx`: Interactive career timeline
  - `NewsletterSection.tsx`: Email subscription with validation
  - `Footer.tsx`: Responsive footer with social links

### Content Management System

The built-in CMS allows uploading content from diverse sources:

- **File Upload**: Support for TXT, Markdown, HTML files
- **Manual Creation**: Rich text editor with Markdown support
- **Content Types**: Writing, Interviews, Politics categories
- **Metadata**: Tags, excerpts, publication dates
- **Dynamic Display**: Automatic categorization and featured content

### Data Structure

- `src/types/index.ts`: TypeScript interfaces for ContentItem, TimelineItem, StackItem, SocialLink
- `src/data/content.ts`: Sample Spanish content with real examples for politics, writing, and interviews
- `src/lib/utils.ts`: Utility functions for formatting and styling (including Tailwind class merging)
- **Path Aliases**: `@/*` maps to `./src/*` in tsconfig.json

## Content Upload Capabilities

The landing page includes a floating action button (FAB) that opens the content management system:

1. **Upload Files**: Drag and drop or select text files in various formats
2. **Create Content**: Manual content creation with rich editor
3. **Categorization**: Automatic sorting into Writing, Interviews, Politics
4. **Metadata Management**: Title, excerpt, tags, publication date, source URLs
5. **Real-time Updates**: Content appears immediately in relevant sections

## Responsive Design

- Mobile-first approach with breakpoints for tablet and desktop
- Touch-friendly interactions and navigation
- Optimized content layout for all screen sizes
- Custom scrollbar and smooth scrolling behaviors

## Development Notes

1. **Content Language**: All content is in Spanish as per PRD requirements
2. **ESLint Configuration**: Uses Next.js core-web-vitals and TypeScript rules via flat config (eslint.config.mjs)
3. **Styling System**: Tailwind CSS v4 with custom grid patterns and typography plugin
4. **Font System**: Uses Geist Sans and Geist Mono fonts from Google Fonts
5. **State Management**: Local component state with React hooks, no global state library
6. **Content Management**: Built-in CMS supports file upload (TXT, MD, HTML) and manual content creation

## Key Configuration Files

- `eslint.config.mjs`: ESLint flat config with Next.js and TypeScript rules
- `tailwind.config.js`: Custom Tailwind configuration with typography plugin and grid patterns
- `tsconfig.json`: TypeScript config with strict mode, Next.js plugin, and path aliases
- `next.config.ts`: Standard Next.js configuration (minimal setup)
- `postcss.config.mjs`: PostCSS config for Tailwind CSS processing