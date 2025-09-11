export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Engelbert Huber",
    "jobTitle": "AI Operator | RAG & Context Engineering",
    "description": "Especialista en RAG, Context Engineering e Inteligencia Artificial. Exploro sistemas de recuperación aumentada, optimización de contextos y las últimas tecnologías de IA.",
    "url": "https://blog-chi-ten-63.vercel.app",
    "sameAs": [
      "https://linkedin.com/in/engelbert-huber",
      "https://twitter.com/engelbert_huber",
      "https://github.com/engelbert-huber"
    ],
    "knowsAbout": [
      "RAG (Retrieval Augmented Generation)",
      "Context Engineering",
      "Inteligencia Artificial",
      "Machine Learning",
      "Vector Databases",
      "Prompt Engineering",
      "Claude AI",
      "ChatGPT",
      "LangChain"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance AI Consultant"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}