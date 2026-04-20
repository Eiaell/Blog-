'use client';

import { useEffect, useRef } from 'react';

const skills = [
  'Asistentes con IA',
  'Automatización',
  'Búsqueda inteligente',
  'Integración con WhatsApp',
  'Análisis de documentos',
  'Agentes autónomos',
  'Consultoría',
];

const ABOUT_TEXT =
  'Ayudo a equipos en Latinoamérica a pasar del chatbot genérico al asistente que realmente entiende su negocio: conectado a sus documentos, a sus sistemas y a sus procesos. No vendo magia — construyo herramientas que funcionan todos los días.';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Reveal on view
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '-80px', threshold: 0.05 },
    );
    io.observe(section);

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // Scroll-linked text reveal
    const el = textRef.current;
    if (!el) return;

    const text = el.textContent ?? '';
    el.innerHTML = text
      .split(' ')
      .map((word) =>
        word
          .split('')
          .map((c) => `<span class="scroll-char">${c}</span>`)
          .join(''),
      )
      .join(' ');

    const spans = el.querySelectorAll('.scroll-char');

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.8;
      const end = vh * 0.2;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      const p = Math.max(0, Math.min(1, traveled / total));
      const litCount = Math.floor(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle('lit', i < litCount));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="sobre" className="bg-black px-4 md:px-6 py-20 md:py-32">
      <div
        ref={sectionRef}
        className="bg-[#101010] rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto px-6 md:px-16 py-20 md:py-28 text-center relative overflow-hidden reveal-on-view"
      >
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="relative z-10">
          {/* Label */}
          <div className="fade-up text-primary text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-10">
            &middot; Sobre m&iacute; &middot;
          </div>

          {/* Headline with mixed typography */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9]"
            style={{ color: '#E1E0CC' }}
          >
            <HeadlineSegment text="Soy Engelbert Huber," className="font-normal" segmentIndex={0} />
            <HeadlineSegment text="un operador de IA autodidacta." className="italic font-serif" segmentIndex={1} />
            <HeadlineSegment text="Diseño asistentes inteligentes que leen tus documentos, toman decisiones y hacen el trabajo repetitivo por ti." className="font-normal" segmentIndex={2} />
          </h2>

          {/* Scroll-reveal paragraph */}
          <div className="mt-12 max-w-2xl mx-auto">
            <p
              ref={textRef}
              className="text-xs sm:text-sm md:text-base leading-relaxed"
              style={{ color: '#DEDBC8' }}
            >
              {ABOUT_TEXT}
            </p>
          </div>

          {/* Skill pills */}
          <div
            className="mt-10 flex flex-wrap justify-center gap-2 text-[10px] md:text-xs"
            style={{ color: 'rgba(225,224,204,0.55)' }}
          >
            {skills.map((skill, i) => (
              <span
                key={skill}
                className="fade-up border border-primary/15 rounded-full px-3 py-1 tracking-wider uppercase"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Splits text into animated word spans */
function HeadlineSegment({
  text,
  className,
  segmentIndex,
}: {
  text: string;
  className: string;
  segmentIndex: number;
}) {
  const words = text.split(' ');

  return (
    <span className="inline-flex flex-wrap justify-center" style={{ gap: '0.28em' }}>
      {words.map((word, i) => (
        <span key={`${segmentIndex}-${i}`} className="word-mask">
          <span
            className={`word ${className}`}
            style={{
              animationDelay: `${0.1 + segmentIndex * 0.1 + i * 0.06}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
