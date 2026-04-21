/**
 * Busqueda semantica 100% client-side.
 *
 * Estrategia:
 *   1. Cargar modelo MiniLM via transformers.js (23MB, cache en IndexedDB)
 *   2. Cargar embeddings pre-computados de /article-embeddings.json
 *   3. Embeddear query en el browser
 *   4. Cosine similarity (embeddings ya vienen normalizados)
 *   5. Top-K matches con score
 *
 * Zero backend. Zero costo para el site owner.
 */

export interface SearchDoc {
  id: string;
  kind: 'article' | 'bio';
  title: string;
  excerpt: string;
  url?: string;
  tags?: string[];
  embedding: number[];
}

export interface SearchResult {
  doc: SearchDoc;
  score: number;
}

export interface EmbeddingsPayload {
  model: string;
  dimension: number;
  generatedAt: string;
  docs: SearchDoc[];
}

// Singletons — se cargan una sola vez por sesion de browser
type Extractor = (
  text: string,
  opts?: { pooling?: 'mean'; normalize?: boolean },
) => Promise<{ data: Float32Array | number[] }>;

let modelPromise: Promise<Extractor> | null = null;
let docsPromise: Promise<SearchDoc[]> | null = null;

async function loadModel(): Promise<Extractor> {
  if (modelPromise) return modelPromise;
  modelPromise = (async () => {
    const { pipeline, env } = await import('@huggingface/transformers');
    // Forzar cache en IndexedDB (default en browser), permitir CDN jsdelivr
    env.allowLocalModels = false;
    env.useBrowserCache = true;
    const extractor = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2',
    );
    return extractor as unknown as Extractor;
  })();
  return modelPromise;
}

async function loadDocs(): Promise<SearchDoc[]> {
  if (docsPromise) return docsPromise;
  docsPromise = fetch('/article-embeddings.json')
    .then((r) => {
      if (!r.ok) throw new Error(`embeddings fetch failed: ${r.status}`);
      return r.json();
    })
    .then((json: EmbeddingsPayload) => json.docs);
  return docsPromise;
}

/** Pre-calienta modelo y docs en paralelo. Util para llamar en idle. */
export function prewarm(): Promise<void> {
  return Promise.all([loadModel(), loadDocs()]).then(() => undefined);
}

function cosineSim(a: number[], b: number[]): number {
  // embeddings ya normalizados → dot product = cosine similarity
  let dot = 0;
  const len = a.length;
  for (let i = 0; i < len; i++) dot += a[i] * b[i];
  return dot;
}

export async function semanticSearch(
  query: string,
  topK = 3,
): Promise<SearchResult[]> {
  const [model, docs] = await Promise.all([loadModel(), loadDocs()]);

  const output = await model(query, { pooling: 'mean', normalize: true });
  const qEmb = Array.from(output.data as Float32Array);

  return docs
    .map((doc) => ({ doc, score: cosineSim(qEmb, doc.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * Construye respuesta en lenguaje natural desde los resultados.
 * No es generacion — solo orquestacion inteligente de excerpts.
 */
export function buildResponse(results: SearchResult[]): {
  text: string;
  sources: SearchResult[];
  confident: boolean;
} {
  const best = results[0];
  const MIN_SCORE = 0.35;

  if (!best || best.score < MIN_SCORE) {
    return {
      text:
        'No tengo info clara sobre eso en mi knowledge base. Si quieres conversar de verdad, escríbeme al WhatsApp +51 930 990 396 y lo vemos.',
      sources: [],
      confident: false,
    };
  }

  const related = results.slice(1).filter((r) => r.score > 0.45);

  if (best.doc.kind === 'bio') {
    let text = best.doc.excerpt;
    if (related.length > 0 && related[0].doc.kind === 'article') {
      text += `\n\nAdemás, escribí sobre esto en "${related[0].doc.title}".`;
    }
    return { text, sources: [best, ...related], confident: true };
  }

  // article
  let text = `Sobre eso escribí: "${best.doc.title}".\n\n${best.doc.excerpt}`;
  if (best.doc.url) text += `\n\nArtículo completo: ${best.doc.url}`;
  if (related.length > 0) {
    text +=
      `\n\nTambién relacionado: ` +
      related.map((r) => `"${r.doc.title}"`).join(', ') +
      '.';
  }
  return { text, sources: [best, ...related], confident: true };
}
