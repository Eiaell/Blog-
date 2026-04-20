'use client';

import { useEffect, useRef } from 'react';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

const navLinks = [
  { label: 'Inicio', href: '#' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Sobre mí', href: '#sobre' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: 'https://wa.me/51930990396' },
];

export default function HeroNew() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Safety fallback: if animations are throttled, show content immediately
    const timer = setTimeout(() => {
      const anims = document.getAnimations?.() ?? [];
      const advancing = anims.some(
        (a) => a.currentTime != null && (a.currentTime as number) > 100,
      );
      if (!advancing) document.body.classList.add('no-anim');
    }, 1200);

    const onVisible = () => {
      if (!document.hidden) document.body.classList.remove('no-anim');
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return (
    <section className="h-screen w-full p-4 md:p-6 relative bg-black">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden hero-bg">
        {/* Background video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          onError={(e) => {
            (e.currentTarget as HTMLVideoElement).style.display = 'none';
          }}
          src={HERO_VIDEO_URL}
        />

        {/* Animated orbs (fallback behind video) */}
        <div
          className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(222,219,200,0.18), transparent 60%)',
            animation: 'orb1 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(180,110,70,0.22), transparent 60%)',
            animation: 'orb2 22s ease-in-out infinite',
          }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 scan-lines opacity-40 pointer-events-none" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 md:py-3 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-[10px] sm:text-xs md:text-sm tracking-wide"
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Corner labels */}
        <div
          className="absolute top-6 left-6 md:top-8 md:left-10 z-10 flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] uppercase"
          style={{ color: 'rgba(225,224,204,0.6)' }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
            style={{ animation: 'pulse1 1.8s ease-in-out infinite' }}
          />
          AI Operator &middot; Lima, Per&uacute;
        </div>
        <div
          className="absolute top-6 right-6 md:top-8 md:right-10 z-10 text-[10px] md:text-xs tracking-[0.2em] uppercase"
          style={{ color: 'rgba(225,224,204,0.6)' }}
        >
          [ 2026 / port.001 ]
        </div>

        {/* Hero content — bottom-aligned */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-6 md:pb-10 z-10">
          <div className="grid grid-cols-12 gap-6 items-end">
            {/* Name */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium tracking-[-0.07em] leading-[0.82]"
                style={{ color: '#E1E0CC', marginTop: '-2px' }}
              >
                <span className="block overflow-hidden pb-[0.35em]">
                  <span
                    className="word text-[8.5vw] sm:text-[8vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[5vw] 2xl:text-[5.5vw]"
                    style={{ animationDelay: '0.1s' }}
                  >
                    Engelbert
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span
                    className="word text-[8.5vw] sm:text-[8vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[5vw] 2xl:text-[5.5vw]"
                    style={{ animationDelay: '0.25s' }}
                  >
                    Huber
                  </span>
                </span>
              </h1>
            </div>

            {/* Tagline + CTA */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 pb-2">
              <p
                className="fade-up text-xs sm:text-sm md:text-base text-primary/70"
                style={{ lineHeight: 1.2, animationDelay: '0.5s' }}
              >
                Ayudo a empresas a usar la inteligencia artificial para algo
                m&aacute;s que responder preguntas: construyo asistentes que
                buscan en tus documentos, ejecutan tareas y se conectan con las
                herramientas que ya usas.
              </p>
              <a
                href="https://wa.me/51930990396"
                target="_blank"
                rel="noreferrer"
                className="fade-up group bg-primary rounded-full pl-5 pr-1 py-1 inline-flex items-center gap-2 hover:gap-3 transition-all w-fit text-black font-medium text-sm sm:text-base cta-pill"
                style={{ animationDelay: '0.7s' }}
              >
                <span>Cont&aacute;ctame</span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cta-circle">
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
        </div>
      </div>
    </section>
  );
}
