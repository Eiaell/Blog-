import { ContentItem, TimelineItem, StackItem, SocialLink } from '@/types'

export const sampleContent: ContentItem[] = [
  {
    id: '1',
    title: 'El Futuro de la IA en la Política Latinoamericana',
    content: `# El Futuro de la IA en la Política Latinoamericana

La inteligencia artificial está transformando la manera en que entendemos y participamos en la política. En Latinoamérica, esta transformación presenta oportunidades únicas y desafíos particulares.

## Oportunidades Emergentes

1. **Análisis de Sentimiento Ciudadano**: Las herramientas de IA pueden procesar millones de comentarios en redes sociales para entender el pulso político real.

2. **Transparencia Gubernamental**: Los sistemas automatizados pueden auditar gastos públicos y detectar anomalías en tiempo real.

3. **Participación Ciudadana**: Chatbots especializados pueden facilitar la interacción entre ciudadanos y gobierno.

## Desafíos a Considerar

- **Sesgo Algorítmico**: Los modelos pueden perpetuar prejuicios existentes en los datos de entrenamiento.
- **Desinformación**: La misma tecnología que puede combatir las fake news también puede generarlas.
- **Brecha Digital**: No todos los ciudadanos tienen igual acceso a estas tecnologías.`,
    excerpt: 'Explorando cómo la inteligencia artificial está transformando el panorama político en Latinoamérica.',
    date: '2025-09-08',
    category: 'politics',
    tags: ['IA', 'Política', 'Latinoamérica', 'Tecnología'],
    featured: true
  },
  {
    id: '2',
    title: 'Mi Stack de IA para Creación de Contenido',
    content: `# Mi Stack de IA para Creación de Contenido

Después de experimentar con decenas de herramientas de IA, he consolidado mi stack personal para maximizar la productividad creativa.

## Herramientas Principales

### Claude
Mi asistente principal para escritura y análisis. Uso Claude para:
- Estructurar artículos complejos
- Análisis crítico de ideas
- Generación de código limpio

### Midjourney
Para visualizaciones conceptuales que acompañan mis artículos.

### Heygen
Creación de videos explicativos con avatares realistas.

## Flujo de Trabajo

1. **Ideación**: Brainstorming con Claude
2. **Investigación**: Análisis de fuentes con herramientas especializadas
3. **Creación**: Escritura y refinamiento iterativo
4. **Visualización**: Imágenes con Midjourney, videos con Heygen`,
    excerpt: 'Una mirada profunda a las herramientas de IA que uso diariamente para crear contenido de valor.',
    date: '2025-09-07',
    category: 'writing',
    tags: ['IA', 'Productividad', 'Herramientas', 'Creatividad'],
    featured: true
  }
]

export const timeline: TimelineItem[] = [
  {
    year: '2019',
    title: 'Inicio en Tecnología',
    description: 'Comenzé mi carrera explorando las intersecciones entre tecnología y sociedad.',
    highlight: false
  },
  {
    year: '2021',
    title: 'Especialización en IA',
    description: 'Me enfoqué en el desarrollo y aplicación práctica de sistemas de inteligencia artificial.',
    highlight: true
  },
  {
    year: '2023',
    title: 'Análisis Político-Tecnológico',
    description: 'Inicié mi trabajo analizando el impacto de la IA en sistemas políticos y sociales.',
    highlight: true
  },
  {
    year: '2025',
    title: 'Operador de IA',
    description: 'Actualmente trabajo como operador especializado, ayudando a organizaciones a implementar IA de manera responsable.',
    highlight: true
  }
]

export const aiStack: StackItem[] = [
  {
    name: 'Claude',
    description: 'Asistente de IA avanzado para análisis y creación de contenido',
    useCases: ['Análisis crítico de ideas', 'Estructuración de argumentos complejos', 'Generación de código limpio'],
    category: 'ai',
    url: 'https://claude.ai'
  },
  {
    name: 'ChatGPT',
    description: 'Modelo de lenguaje para brainstorming y exploración de ideas',
    useCases: ['Ideación inicial', 'Exploración de perspectivas múltiples', 'Generación rápida de contenido'],
    category: 'ai'
  },
  {
    name: 'Gemini',
    description: 'IA multimodal para análisis de datos complejos',
    useCases: ['Análisis de documentos extensos', 'Procesamiento multimodal', 'Investigación profunda'],
    category: 'ai'
  },
  {
    name: 'Deepseek',
    description: 'Modelo especializado en razonamiento lógico',
    useCases: ['Análisis lógico de argumentos', 'Verificación de consistencia', 'Razonamiento matemático'],
    category: 'ai'
  }
]

export const mediaStack: StackItem[] = [
  {
    name: 'Midjourney',
    description: 'Generación de imágenes conceptuales y artísticas',
    useCases: ['Visualización de ideas abstractas', 'Creación de thumbnails', 'Ilustraciones para artículos'],
    category: 'media'
  },
  {
    name: 'Heygen',
    description: 'Creación de videos con avatares realistas',
    useCases: ['Videos explicativos', 'Presentaciones personalizadas', 'Content multiidioma'],
    category: 'media'
  },
  {
    name: 'ElevenLabs',
    description: 'Síntesis de voz hiperrealista',
    useCases: ['Narración de artículos', 'Podcasts automatizados', 'Content en audio'],
    category: 'media'
  },
  {
    name: 'Kling',
    description: 'Generación de videos cortos y dinámicos',
    useCases: ['Videos para redes sociales', 'Animaciones conceptuales', 'Content viral'],
    category: 'media'
  }
]

export const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    url: 'https://x.com/EngelHuQ',
    icon: 'twitter'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/engelbert-huber-q-a95348298/',
    icon: 'linkedin'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Eiaell',
    icon: 'github'
  }
]