'use client';

import { useEffect, useRef } from 'react';

const SERVICES_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4';

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

interface ServiceCard {
  number: string;
  title: string;
  icon: React.ReactNode;
  features: string[];
}

const services: ServiceCard[] = [
  {
    number: '01',
    title: 'Asistentes que conocen tu empresa.',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3l1.8 4.8L18.6 9.6 13.8 11.4 12 16.2 10.2 11.4 5.4 9.6 10.2 7.8z" />
      </svg>
    ),
    features: [
      'Leen tus PDFs, manuales, webs y bases de datos internas.',
      'Responden con información real de tu negocio, no inventada.',
      'Se actualizan solos cuando agregas documentos nuevos.',
      'Disponibles 24/7 para tu equipo o tus clientes.',
    ],
  },
  {
    number: '02',
    title: 'IA conectada a tus herramientas.',
    icon: <span className="font-bold text-lg">&lceil;</span>,
    features: [
      'Conecto la IA con tu CRM, tu ERP, tu correo o tus hojas de cálculo.',
      'Accesos controlados: la IA solo hace lo que tú autorizas.',
      'Funciona con ChatGPT, Claude, Cursor y otros.',
    ],
  },
  {
    number: '03',
    title: 'Agentes que hacen el trabajo.',
    icon: <span className="font-bold text-lg">&#x25C8;</span>,
    features: [
      'Procesos de varios pasos automatizados de principio a fin.',
      'Recuerdan conversaciones y contexto entre sesiones.',
      'Operables desde WhatsApp, Slack o donde ya trabaje tu equipo.',
    ],
  },
];

function HeadlineWords({
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
    <span
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={{ gap: '0.28em' }}
    >
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

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    [sectionRef.current, cardsRef.current, ctaRef.current].forEach((el) => {
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section
      id="servicios"
      className="min-h-screen bg-black relative px-4 md:px-6 py-20 md:py-32"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={sectionRef} className="text-center mb-14 md:mb-20 reveal-on-view">
          <div className="fade-up text-primary/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-6">
            &middot; Servicios &middot;
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal max-w-4xl mx-auto leading-tight">
            <HeadlineWords
              text="Inteligencia artificial que entiende tu negocio y ejecuta tareas reales."
              className="text-primary"
              segmentIndex={0}
            />
            <HeadlineWords
              text="Menos demos bonitas. Más trabajo hecho."
              className="text-gray-500 block mt-2"
              segmentIndex={1}
            />
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 reveal-on-view"
        >
          {/* Card 1: Visual / project teaser */}
          <div
            className="fade-up rounded-2xl overflow-hidden relative h-[360px] lg:h-[480px] grad-card"
            style={{ animationDelay: '0s' }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLVideoElement).style.display = 'none';
              }}
              src={SERVICES_VIDEO_URL}
            />
            <div className="absolute inset-0 noise-overlay opacity-50 mix-blend-overlay" />
            <div className="absolute inset-0 scan-lines opacity-30" />

            {/* Pulsing rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-32 h-32 mix-blend-screen opacity-60">
                <div
                  className="absolute inset-0 rounded-full border border-primary"
                  style={{ animation: 'pulse1 2.5s ease-out infinite' }}
                />
                <div
                  className="absolute inset-0 rounded-full border border-primary"
                  style={{
                    animation: 'pulse1 2.5s ease-out infinite',
                    animationDelay: '0.8s',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-3 h-3 rounded-full bg-primary"
                    style={{
                      boxShadow: '0 0 40px rgba(222,219,200,0.5)',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
            <div className="absolute bottom-6 left-6 right-6">
              <div
                className="text-[10px] tracking-[0.3em] uppercase mb-2"
                style={{ color: 'rgba(225,224,204,0.5)' }}
              >
                &middot; proyecto &middot;
              </div>
              <div className="text-xl md:text-2xl" style={{ color: '#E1E0CC' }}>
                Tu pr&oacute;ximo asistente que s&iacute; trabaja.
              </div>
            </div>
          </div>

          {/* Service cards */}
          {services.map((service, idx) => (
            <div
              key={service.number}
              className="fade-up bg-[#212121] rounded-2xl p-6 md:p-7 flex flex-col h-full lg:h-[480px] relative overflow-hidden"
              style={{ animationDelay: `${(idx + 1) * 0.15}s` }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-5 img-placeholder flex items-center justify-center text-primary">
                {service.icon}
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary/50 mb-2">
                {service.number}
              </div>
              <h3 className="text-primary text-xl md:text-2xl font-normal mb-5 leading-tight">
                {service.title}
              </h3>
              <ul className="space-y-3 flex-1">
                {service.features.map((feature, fi) => (
                  <li
                    key={fi}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400 leading-relaxed"
                  >
                    <span className="text-primary mt-0.5 flex-shrink-0">
                      <CheckIcon />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-primary text-xs md:text-sm group"
              >
                <span>Ver m&aacute;s</span>
                <span className="inline-block arrow-diag">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-20 md:mt-32 text-center reveal-on-view">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-[0.95]"
            style={{ color: '#E1E0CC' }}
          >
            <HeadlineWords text="¿Listo para" className="font-normal" segmentIndex={0} />
            <HeadlineWords text="automatizar" className="italic font-serif" segmentIndex={1} />
            <HeadlineWords text="de verdad?" className="font-normal" segmentIndex={2} />
          </h2>
          <a
            href="https://wa.me/51930990396"
            target="_blank"
            rel="noreferrer"
            className="fade-up group mt-10 bg-primary rounded-full pl-6 pr-1.5 py-1.5 inline-flex items-center gap-2 hover:gap-3 transition-all text-black font-medium text-sm sm:text-base cta-pill"
          >
            <span>Escr&iacute;beme por WhatsApp</span>
            <span className="bg-black rounded-full w-10 h-10 flex items-center justify-center cta-circle">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#DEDBC8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
