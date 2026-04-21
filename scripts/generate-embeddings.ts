/**
 * Pre-computa embeddings semanticos de los articulos + bio de Engelbert.
 *
 * Corre localmente (o en prebuild) con:
 *   npx tsx scripts/generate-embeddings.ts
 *
 * Modelo: all-MiniLM-L6-v2 (23MB, 384 dims). Compacto, multilingual-ok.
 * Output: public/article-embeddings.json — el cliente lo fetchea y hace
 * busqueda semantica 100% in-browser (zero backend, zero costo).
 */

import { pipeline } from '@huggingface/transformers';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { sampleContent } from '../src/data/content.js';
import { BIO } from '../src/data/bio.js';

type Doc = {
  id: string;
  kind: 'article' | 'bio';
  title: string;
  excerpt: string;
  body: string;
  url?: string;
  tags?: string[];
  embedding?: number[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('→ cargando modelo Xenova/all-MiniLM-L6-v2 (23MB, 1ra vez se descarga)…');
  const extractor = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2',
  );
  console.log('✓ modelo listo');

  const docs: Doc[] = [];

  // 1. Articulos
  for (const a of sampleContent) {
    docs.push({
      id: `article:${a.id}`,
      kind: 'article',
      title: a.title,
      excerpt: a.excerpt ?? '',
      body: a.content,
      url: `/articles/${a.id}`,
      tags: a.tags,
    });
  }

  // 2. Bio chunks — divididos para granularidad
  docs.push({
    id: 'bio:pitch',
    kind: 'bio',
    title: 'Que hago',
    excerpt: BIO.pitch,
    body: `${BIO.pitch} ${BIO.headline} Habilidades: ${BIO.skills.join(', ')}.`,
  });

  for (const [i, s] of BIO.services.entries()) {
    docs.push({
      id: `bio:service-${i}`,
      kind: 'bio',
      title: s.title,
      excerpt: s.features[0],
      body: `${s.title}. ${s.features.join(' ')}`,
    });
  }

  docs.push({
    id: 'bio:stack',
    kind: 'bio',
    title: 'Mi stack de IA',
    excerpt: `Uso ${BIO.stack.ai.slice(0, 4).join(', ')} y otros.`,
    body: `IA: ${BIO.stack.ai.join(', ')}. Media: ${BIO.stack.media.join(
      ', ',
    )}. Desarrollo: ${BIO.stack.dev.join(', ')}.`,
  });

  docs.push({
    id: 'bio:contact',
    kind: 'bio',
    title: 'Contacto',
    excerpt: `WhatsApp ${BIO.contact.whatsapp}`,
    body: `Escribeme por WhatsApp al ${BIO.contact.whatsapp}. Twitter ${BIO.contact.twitter}. LinkedIn ${BIO.contact.linkedin}.`,
  });

  console.log(`→ generando embeddings para ${docs.length} docs…`);

  for (const doc of docs) {
    // Texto para embeddear: titulo + excerpt + primeros 500 chars del body
    // (MiniLM tiene ventana pequena, no tiene sentido embeddear 5000 chars)
    const text = `${doc.title}. ${doc.excerpt} ${doc.body.slice(0, 500)}`.trim();

    const output = await extractor(text, {
      pooling: 'mean',
      normalize: true,
    });

    // output.data es Float32Array — convertir a number[] para JSON
    doc.embedding = Array.from(output.data as Float32Array);
  }

  // Payload cliente: solo lo esencial para mostrar + matchear
  const payload = {
    model: 'Xenova/all-MiniLM-L6-v2',
    dimension: docs[0].embedding!.length,
    generatedAt: new Date().toISOString(),
    docs: docs.map((d) => ({
      id: d.id,
      kind: d.kind,
      title: d.title,
      excerpt: d.excerpt,
      url: d.url,
      tags: d.tags,
      embedding: d.embedding,
    })),
  };

  const outPath = path.join(__dirname, '..', 'public', 'article-embeddings.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload));

  const sizeKb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(
    `✓ escritas ${docs.length} embeddings (${payload.dimension} dims) → public/article-embeddings.json (${sizeKb} KB)`,
  );
}

main().catch((err) => {
  console.error('✗ error generando embeddings:', err);
  process.exit(1);
});
