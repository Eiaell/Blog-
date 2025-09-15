import { ContentItem, TimelineItem, StackItem, SocialLink } from '@/types'

export const sampleContent: ContentItem[] = [
  {
    id: '5',
    title: 'MCP: El Protocolo que Conecta a la IA con el Mundo Real',
    content: `En el vertiginoso mundo de la inteligencia artificial, ha surgido un nuevo estándar que promete revolucionar la forma en que los agentes de IA interactúan con el mundo digital: el Protocolo de Contexto del Modelo (MCP, por sus siglas en inglés). Este protocolo de código abierto, introducido por Anthropic en noviembre de 2024, busca estandarizar la manera en que los sistemas de IA, como los grandes modelos de lenguaje (LLM), se integran y comparten datos con herramientas, sistemas y fuentes de datos externas.

## **¿Qué es y cómo funciona el MCP?**

Piense en el MCP como un puerto USB-C para las aplicaciones de IA. Así como el USB-C proporciona una forma estandarizada de conectar dispositivos electrónicos, el MCP ofrece una manera uniforme para que las aplicaciones de IA se conecten a sistemas externos. Antes del MCP, cada conexión entre un agente de IA y una herramienta externa (como una base de datos, una API o un sistema de archivos) requería una integración a medida, lo que consumía tiempo y recursos de los desarrolladores.

El MCP funciona con una arquitectura cliente-servidor. Un "cliente" MCP (la aplicación de IA) se conecta a un "servidor" MCP, que actúa como un adaptador inteligente para una herramienta o aplicación. Este servidor traduce las solicitudes de la IA a comandos que la herramienta específica puede entender. Por ejemplo, un servidor MCP de GitHub podría convertir la solicitud "enumera mis 'pull requests' abiertos" en una llamada a la API de GitHub. De esta manera, los agentes de IA pueden realizar tareas complejas de varios pasos, como recuperar datos, resumir documentos o guardar archivos, sin necesidad de conocer los detalles de implementación de cada herramienta.

## **La Importancia de un Estándar Unificado**

La rápida adopción del MCP por parte de los principales actores de la IA, como OpenAI y Google DeepMind, subraya su importancia. Este protocolo es un gran avance en la forma en que operan los agentes de IA, permitiéndoles pasar de simplemente responder preguntas a realizar tareas útiles y complejas. Al proporcionar un lenguaje común para la comunicación, el MCP fomenta un ecosistema de herramientas y aplicaciones de IA interoperables, lo que acelera la innovación y amplía las capacidades de los agentes de IA.

Para los desarrolladores, el MCP reduce significativamente el tiempo y la complejidad del desarrollo al eliminar la necesidad de crear integraciones personalizadas. Para los usuarios finales, esto se traduce en aplicaciones de IA más capaces y personalizadas que pueden acceder a sus datos y actuar en su nombre de manera más eficaz. Por ejemplo, un agente de IA podría acceder a su Google Calendar y a Notion para actuar como un asistente personal más eficiente, o un chatbot empresarial podría conectarse a múltiples bases de datos de una organización para permitir a los usuarios analizar datos mediante el chat.

## **Componentes Clave y Aplicaciones**

La arquitectura del MCP se compone de varios elementos clave:

**Host MCP**: La aplicación impulsada por IA, como Claude Desktop u otra herramienta que actúa como agente.

**Servidores MCP**: Programas que exponen las capacidades de las herramientas y fuentes de datos a los agentes de IA. Estos pueden acceder a recursos locales (como un sistema de archivos) o remotos (como APIs o servicios en la nube).

**Protocolo formal y SDKs**: El MCP incluye una especificación formal del protocolo y kits de desarrollo de software (SDKs) para facilitar su implementación.

El MCP ya está demostrando su valor en una variedad de aplicaciones. Desempeña un papel crucial en los flujos de trabajo de agentes multi-herramienta, permitiendo que los sistemas de IA coordinen múltiples herramientas para realizar razonamientos complejos. También se está utilizando para cerrar la brecha entre los modelos de lenguaje y las bases de datos estructuradas, permitiendo consultas en lenguaje sencillo.

En resumen, el Protocolo de Contexto del Modelo es una pieza fundamental en la evolución de la inteligencia artificial, que la acerca un paso más a una integración perfecta y útil en nuestra vida digital cotidiana.`,
    excerpt: 'Descubre el MCP, el protocolo revolucionario de Anthropic que estandariza las conexiones entre agentes de IA y herramientas externas, transformando cómo interactuamos con sistemas inteligentes.',
    date: '2025-09-15',
    category: 'writing',
    tags: ['IA', 'MCP', 'Protocolos', 'Tecnología', 'Anthropic'],
    featured: true
  },
  {
    id: '4',
    title: '¿Qué es RAG? Un Vistazo a la Generación Aumentada por Recuperación',
    content: `La Generación Aumentada por Recuperación (RAG, por sus siglas en inglés) es una técnica de inteligencia artificial que perfecciona los resultados de los grandes modelos de lenguaje (LLM) al permitirles consultar una base de conocimientos externa antes de generar una respuesta. En esencia, RAG combina las capacidades de los modelos de lenguaje pre-entrenados con la recuperación de información de fuentes autorizadas y actualizadas.

Este enfoque innovador mejora la precisión, reduce las "alucinaciones" (información incorrecta o inventada) y amplía las capacidades del modelo en diversas aplicaciones.

## **¿Cómo funciona?**

El proceso de RAG generalmente sigue estos pasos:

**Recuperación**: Cuando un usuario realiza una consulta, el sistema RAG primero busca en una base de conocimientos externa (como una base de datos de documentos, una API o una web) para encontrar información relevante.

**Aumento**: La información recuperada se combina con la consulta original del usuario para crear un nuevo prompt más detallado y contextualizado.

**Generación**: Este prompt aumentado se envía al LLM, que luego genera una respuesta basada tanto en su conocimiento preexistente como en la información adicional y actualizada que se le ha proporcionado.

## **Evolución y últimas actualizaciones**

El término RAG fue introducido por primera vez en un artículo de investigación de 2020 de Meta (anteriormente Facebook AI Research). Desde entonces, la tecnología ha evolucionado significativamente, con investigaciones que exploran arquitecturas más sofisticadas. Los desarrollos recientes en RAG se pueden clasificar en tres paradigmas:

**RAG Básico (Naive RAG)**: La implementación inicial y más sencilla, donde el recuperador busca documentos basados en la consulta del usuario y los pasa al generador.

**RAG Avanzado (Advanced RAG)**: Introduce mejoras en el proceso de recuperación, utilizando técnicas como la expansión de consultas para comprender mejor la intención del usuario y la reranquinación de los resultados para priorizar la información más relevante.

**RAG Modular (Modular RAG)**: Es el enfoque más reciente y flexible, que concibe el sistema como un conjunto de módulos intercambiables. Esto permite a los investigadores y desarrolladores experimentar con diferentes componentes para la búsqueda, la gestión de la memoria y la adaptación a tareas específicas, creando sistemas RAG personalizados y altamente eficientes.

Investigaciones recientes también se han centrado en técnicas como el "Aprendizaje Contrastivo en Contexto" (Contrastive In-Context Learning) y la expansión de consultas para mejorar aún más la calidad de las respuestas.

## **RAG vs. Ajuste Fino (Fine-Tuning)**

Tanto RAG como el ajuste fino son técnicas para adaptar los LLM a dominios específicos, pero funcionan de manera diferente. El ajuste fino implica reentrenar un LLM con un nuevo conjunto de datos, lo que puede ser costoso y computacionalmente intensivo. RAG, por otro lado, no requiere reentrenamiento, lo que lo convierte en una opción más eficiente para incorporar conocimientos nuevos o actualizados.

Un estudio de 2024 demostró que las arquitecturas basadas en RAG pueden superar a los modelos de ajuste fino en términos de puntuaciones de similitud de coseno y métricas como ROUGE y BLEU, lo que indica una ventaja significativa en la reducción de alucinaciones.

## **Beneficios Clave de RAG**

**Respuestas más precisas y fiables**: Al basar las respuestas en información externa y verificable, RAG reduce la probabilidad de que el LLM genere información incorrecta.

**Acceso a conocimiento actualizado**: RAG permite que los LLM accedan a información en tiempo real, superando la limitación de su conocimiento estático y pre-entrenado.

**Mayor transparencia y confianza**: Los sistemas RAG pueden citar sus fuentes, lo que permite a los usuarios verificar la información y aumenta la confianza en la tecnología.

**Reducción de costos**: Evita la necesidad de reentrenar constantemente los modelos con datos nuevos, lo que ahorra tiempo y recursos computacionales.

En resumen, la Generación Aumentada por Recuperación es un avance crucial en el campo de la inteligencia artificial generativa, que permite a los modelos de lenguaje ser más precisos, fiables y útiles en una amplia gama de aplicaciones del mundo real.`,
    excerpt: 'Una explicación completa sobre RAG (Retrieval-Augmented Generation), sus beneficios, evolución y cómo está transformando la precisión de los modelos de lenguaje.',
    date: '2025-09-15',
    category: 'writing',
    tags: ['IA', 'RAG', 'LLM', 'Tecnología', 'Machine Learning'],
    featured: true
  },
  {
    id: '3',
    title: 'La Revolución de la IA en las Aulas: ¿Una Amenaza o la Mayor Oportunidad en la Educación?',
    content: `# **La Revolución de la IA en las Aulas: ¿Una Amenaza o la Mayor Oportunidad en la Educación?**

Durante más de cuatro décadas, la tecnología ha irrumpido en las aulas, prometiendo una y otra vez transformar la educación. Desde la llegada de los microprocesadores en los 80 hasta los primitivos "bulletin boards" que servían como vastos bancos de datos, cada ola tecnológica ha redefinido las fronteras del aprendizaje. Hoy, nos encontramos en el umbral de la siguiente y quizás más profunda revolución: la era de la inteligencia artificial generativa.

Potentes herramientas como ChatGPT, capaces de generar imágenes, componer música y redactar ensayos con una fluidez casi humana, ya no son ciencia ficción, sino una realidad en algunas escuelas de Australia y otras partes del mundo. Esta nueva "revolución industrial", como algunos la denominan, ha desatado un torbellino de entusiasmo y, a la vez, una considerable aprensión. La pregunta ya no es si los estudiantes están listos para la IA, porque la revolución ya está aquí.

## **Dos Caras de la Integración: De Melbourne a Mountain View**

En las afueras de Melbourne, la Westbourne Grammar School se ha sumergido de lleno en la era de la IA. Su director, Adrian Camm, ha llegado al punto de crear un "deepfake" de sí mismo, un avatar digital que recibe a los visitantes en la web de la escuela, respondiendo preguntas en múltiples idiomas. Lejos de prohibir herramientas como ChatGPT por miedo a las trampas, Westbourne ha optado por abrazar la tecnología. Su filosofía es clara: es crucial educar a los jóvenes en el uso seguro, eficaz y ético de estas herramientas, enseñándoles a aumentar su propia inteligencia.

En este colegio, los estudiantes utilizan la IA para recibir retroalimentación sobre sus discursos a través de audiencias virtuales, para crear videojuegos con simples comandos e incluso para dar vida a su imaginación generando arte digital.

Mientras tanto, en Nueva Gales del Sur, el sistema de educación pública está probando su propia herramienta de IA, conocida como EduChat. A diferencia de los modelos de lenguaje comerciales, EduChat está diseñado para operar dentro de los límites del plan de estudios estatal, proporcionando un entorno de aprendizaje más seguro. En el Plumpton High School, los alumnos de undécimo grado utilizan esta herramienta para analizar a Shakespeare, aprendiendo a formular preguntas que profundicen su comprensión. EduChat no les da las respuestas; si un estudiante le pide que escriba un ensayo, la herramienta se niega y en su lugar, le ofrece orientación para empezar. Los profesores han notado un "salto gigantesco" en las habilidades de redacción de sus alumnos, quienes ahora pueden generar textos más extensos y ricos en vocabulario en menos tiempo.

## **La Visión de Sal Khan: "Los Profesores Importan Más que Nunca"**

A pesar del avance de estas tecnologías, surge una pregunta fundamental: ¿estamos externalizando el pensamiento? Algunos estudios preliminares sugieren que la dependencia excesiva de la IA podría mermar la capacidad de retención de los estudiantes. Es en este punto donde la visión de Sal Khan, fundador de la Khan Academy, se vuelve crucial. En una reciente columna de opinión titulada "Creamos herramientas de aprendizaje basadas en IA para las aulas de EE.UU. Los profesores importan más que nunca", Khan argumenta que la tecnología por sí sola no es la panacea.[1]

Khan, cuyo trabajo con la Khan Academy ha sido pionero en el uso de la tecnología educativa, admite haber sido un tanto ingenuo en sus inicios, pensando que una herramienta atractiva era suficiente para garantizar el aprendizaje.[1] Sin embargo, la experiencia le ha demostrado que "no importa lo buena que sea la herramienta, tienes que asegurarte de que los estudiantes estén comprometidos con ella". Y el factor más poderoso para lograr ese compromiso, sostiene, es el profesor.[1]

Para Khan, la IA no debe reemplazar a los humanos, sino empoderarlos.[2] En su nuevo libro, "Brave New Words", expone cómo la IA puede actuar como un asistente para los profesores, liberándolos de tareas administrativas como la planificación de lecciones o la calificación, para que puedan centrarse en lo que realmente importa: la conexión humana.[3][4] "Los momentos que realmente recuerdo de conexión con un profesor", reflexiona Khan, "fueron cuando se fijaron en mí y tuvimos esa conexión humana".[2]

## **El Desafío de la Implementación y la Ética**

La implementación exitosa de la IA en la educación no consiste simplemente en "lanzar tecnología a un aula", sino en invertir en los "sistemas humanos".[1] Distritos escolares como el de Newark, en Nueva Jersey, están viendo resultados positivos al utilizar las herramientas de IA de Khan Academy no como un sustituto, sino como un complemento, celebrando a los profesores que logran un alto nivel de compromiso y trabajando para apoyar a los que se quedan atrás.[1]

El problema de las trampas, que tanto preocupa a los educadores, existía mucho antes de ChatGPT.[2] La IA, según Khan, simplemente ha hecho que hacer trampas sea más fácil. La solución no es la prohibición, sino repensar la forma en que evaluamos. Esto puede significar realizar más evaluaciones supervisadas en el aula y, al mismo tiempo, enseñar a los estudiantes a utilizar estas herramientas de manera productiva, una habilidad cada vez más demandada en el mundo laboral.[2]

Incluso las herramientas de IA diseñadas para la educación, como EduChat, no son perfectas. El propio departamento de educación de Nueva Gales del Sur admite que el sistema puede "alucinar", un término técnico para describir la generación de información incorrecta. La respuesta, una vez más, recae en el juicio humano: "Eso es lo que enseñamos a la gente a hacer, a comprobar los errores".

## **El Futuro es Humano, Aumentado por la IA**

La revolución de la IA en la educación ya no es una fantasía futurista. Desde avatares multilingües en Melbourne hasta asistentes de escritura socrática en Sídney y tutores personalizados de la Khan Academy, la tecnología está remodelando el panorama educativo.

Sin embargo, tanto los educadores en la primera línea como los visionarios tecnológicos coinciden en un punto fundamental: la tecnología debe servir al aprendizaje, y no al revés.[5] La IA puede ser una herramienta increíblemente poderosa para personalizar la educación, para ofrecer a cada estudiante un tutor personal y a cada profesor un asistente incansable.[6] Pero nunca podrá reemplazar la conexión humana, la empatía y la inspiración que un buen profesor puede proporcionar.

Como nos recuerda Isabelle McGloin, subdirectora de la escuela primaria de Chatswood, la IA "nunca sabrá si se han saltado el desayuno... nunca entenderá si han tenido una noche terrible". En una era de inteligencia artificial, nuestra mayor fortaleza, y la piedra angular de una educación verdaderamente eficaz, sigue siendo nuestra sabiduría y nuestra conexión humanas.`,
    excerpt: 'Un análisis profundo sobre cómo la IA está transformando la educación mundial, desde las aulas de Melbourne hasta las innovaciones de la Khan Academy.',
    date: '2025-09-09',
    category: 'writing',
    tags: ['IA', 'Educación', 'Tecnología', 'Futuro'],
    featured: true
  }
]

export const timeline: TimelineItem[] = [
  {
    year: '2019',
    title: 'Inicio en Tecnología',
    description: 'Comencé mi carrera explorando la tecnología en la agricultura mediante la hidroponía y la automatización de sistemas de cultivo.',
    highlight: false
  },
  {
    year: '2022',
    title: 'Especialización en IA',
    description: 'Inicié mi especialización en inteligencia artificial, enfocándome en el desarrollo y aplicación práctica de sistemas de IA.',
    highlight: true
  },
  {
    year: '2023',
    title: 'Vibecoding y Prompt Engineering',
    description: 'Empecé a profundizar en vibecoding y prompt engineering, desarrollando habilidades avanzadas en interacción con modelos de lenguaje.',
    highlight: true
  },
  {
    year: '2025',
    title: 'Operador de IA',
    description: 'Actualmente trabajo como operador especializado, ayudando a organizaciones a implementar IA de manera responsable con enfoque en Spec Driven Development.',
    highlight: true
  }
]

export const aiStack: StackItem[] = [
  {
    name: 'Claude',
    description: 'Asistente de IA avanzado para análisis y creación de contenido',
    useCases: ['Análisis crítico de ideas', 'Estructuración de argumentos complejos', 'Generación de código limpio'],
    category: 'ai',
    logo: '/logos/claude.png',
    url: 'https://claude.ai'
  },
  {
    name: 'ChatGPT',
    description: 'Modelo de lenguaje para brainstorming y exploración de ideas',
    useCases: ['Ideación inicial', 'Exploración de perspectivas múltiples', 'Generación rápida de contenido'],
    category: 'ai',
    logo: '/logos/openai.png',
    url: 'https://chat.openai.com'
  },
  {
    name: 'Gemini',
    description: 'IA multimodal para análisis de datos complejos',
    useCases: ['Análisis de documentos extensos', 'Procesamiento multimodal', 'Investigación profunda'],
    category: 'ai',
    logo: '/logos/gemini.png',
    url: 'https://gemini.google.com'
  },
  {
    name: 'Deepseek',
    description: 'Modelo especializado en razonamiento lógico',
    useCases: ['Análisis lógico de argumentos', 'Verificación de consistencia', 'Razonamiento matemático'],
    category: 'ai',
    logo: '/logos/deepseek.png',
    url: 'https://www.deepseek.com'
  },
  {
    name: 'Grok',
    description: 'IA conversacional con acceso a información en tiempo real',
    useCases: ['Consultas en tiempo real', 'Análisis de tendencias actuales', 'Búsqueda contextual avanzada'],
    category: 'ai',
    logo: '/logos/grok.png',
    url: 'https://grok.x.ai'
  },
  {
    name: 'Perplexity',
    description: 'Motor de búsqueda potenciado por IA con fuentes en tiempo real',
    useCases: ['Investigación con fuentes citadas', 'Búsquedas complejas especializadas', 'Análisis de tendencias actuales'],
    category: 'ai',
    logo: '/logos/perplexity.png',
    url: 'https://www.perplexity.ai'
  },
  {
    name: 'Groq',
    description: 'Inferencia ultrarrápida de modelos de lenguaje',
    useCases: ['Procesamiento de alta velocidad', 'Aplicaciones en tiempo real', 'Prototipado rápido'],
    category: 'ai',
    logo: '/logos/groq.png',
    url: 'https://groq.com'
  },
  {
    name: 'Ollama',
    description: 'Ejecutor local de modelos de IA de código abierto',
    useCases: ['Modelos privados locales', 'Experimentación sin conexión', 'Control total de datos'],
    category: 'ai',
    logo: '/logos/ollama.png',
    url: 'https://ollama.com'
  }
]

export const mediaStack: StackItem[] = [
  {
    name: 'Midjourney',
    description: 'Generación de imágenes conceptuales y artísticas',
    useCases: ['Visualización de ideas abstractas', 'Creación de thumbnails', 'Ilustraciones para artículos'],
    category: 'media',
    logo: '/logos/midjourney.png',
    url: 'https://midjourney.com'
  },
  {
    name: 'Kling',
    description: 'Generación de videos cortos y dinámicos',
    useCases: ['Videos para redes sociales', 'Animaciones conceptuales', 'Content viral'],
    category: 'media',
    logo: '/logos/kling.png',
    url: 'https://klingai.com'
  },
  {
    name: 'ElevenLabs',
    description: 'Síntesis de voz hiperrealista',
    useCases: ['Narración de artículos', 'Podcasts automatizados', 'Content en audio'],
    category: 'media',
    logo: '/logos/elevenlabs.png',
    url: 'https://elevenlabs.io'
  },
  {
    name: 'Ideogram',
    description: 'Generación de imágenes con texto integrado',
    useCases: ['Logotipos con texto', 'Infografías automáticas', 'Diseño gráfico especializado'],
    category: 'media',
    logo: '/logos/ideogram.png',
    url: 'https://ideogram.ai'
  },
  {
    name: 'Pika',
    description: 'Creación de videos a partir de imágenes y texto',
    useCases: ['Animación de imágenes estáticas', 'Videos promocionales', 'Content dinámico'],
    category: 'media',
    logo: '/logos/pika.png',
    url: 'https://pika.art'
  },
  {
    name: 'Luma',
    description: 'Generación de videos 3D realistas',
    useCases: ['Modelado 3D automático', 'Videos cinematográficos', 'Visualización de productos'],
    category: 'media',
    logo: '/logos/luma.png',
    url: 'https://lumalabs.ai'
  },
  {
    name: 'Hailuo',
    description: 'Generación avanzada de videos con IA',
    useCases: ['Videos de alta calidad', 'Animaciones complejas', 'Contenido visual profesional'],
    category: 'media',
    logo: '/logos/hailuo.png',
    url: 'https://hailuoai.com'
  },
  {
    name: 'NotebookLM',
    description: 'Herramienta de Google para análisis y síntesis de documentos con IA',
    useCases: ['Análisis de documentos extensos', 'Generación de podcasts', 'Síntesis de información compleja'],
    category: 'media',
    logo: '/logos/notebooklm.png',
    url: 'https://notebooklm.google.com'
  }
]

export const developmentStack: StackItem[] = [
  {
    name: 'Cursor',
    description: 'Editor de código potenciado por IA para desarrollo ágil',
    useCases: ['Autocompletado inteligente', 'Refactoring automático', 'Debugging asistido'],
    category: 'development',
    logo: '/logos/cursor.png',
    url: 'https://cursor.sh'
  },
  {
    name: 'v0',
    description: 'Generación de interfaces UI con IA de Vercel',
    useCases: ['Prototipado rápido de UI', 'Componentes React automáticos', 'Diseño responsive'],
    category: 'development',
    logo: '/logos/v0.png',
    url: 'https://v0.dev'
  },
  {
    name: 'Lovable',
    description: 'Plataforma para crear aplicaciones web completas con IA',
    useCases: ['Desarrollo full-stack', 'Aplicaciones desde cero', 'Integración de APIs'],
    category: 'development',
    logo: '/logos/lovable.png',
    url: 'https://lovable.dev'
  },
  {
    name: 'LangChain',
    description: 'Framework para aplicaciones potenciadas por LLM',
    useCases: ['Desarrollo de agentes IA', 'Pipelines de procesamiento', 'Integración de modelos'],
    category: 'development',
    logo: '/logos/langchain.png',
    url: 'https://langchain.com'
  },
  {
    name: 'Google Colab',
    description: 'Entorno de notebooks en la nube para ML e IA',
    useCases: ['Experimentación con modelos', 'Análisis de datos', 'Prototipado de IA'],
    category: 'development',
    logo: '/logos/colab.png',
    url: 'https://colab.research.google.com'
  },
  {
    name: 'AI Studio',
    description: 'Plataforma de Google para desarrollo con Gemini',
    useCases: ['Integración de Gemini', 'Aplicaciones multimodales', 'APIs de Google AI'],
    category: 'development',
    logo: '/logos/aistudio.png',
    url: 'https://aistudio.google.com'
  },
  {
    name: 'Hugging Face',
    description: 'Hub de modelos de IA y herramientas de ML',
    useCases: ['Modelos open source', 'Espacios colaborativos', 'Datasets especializados'],
    category: 'development',
    logo: '/logos/huggingface.png',
    url: 'https://huggingface.co'
  },
  {
    name: 'Manus',
    description: 'Herramienta especializada para desarrollo eficiente',
    useCases: ['Automatización de tareas', 'Flujos de trabajo optimizados', 'Integración de herramientas'],
    category: 'development',
    logo: '/logos/manus.png',
    url: 'https://manus.app'
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