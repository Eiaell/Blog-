/**
 * Seccion Film en la landing.
 * Embebe /film via iframe aislado — sin impacto en el bundle principal,
 * lazy-load natural cuando el usuario scrollea a la seccion.
 */

export default function FilmEmbed() {
  return (
    <section id="film" className="relative w-full bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-[#E1E0CC]/55">
              · Film ·
            </div>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl text-[#E1E0CC]"
              style={{
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
              }}
            >
              Un minuto con{' '}
              <span
                className="italic"
                style={{
                  fontFamily: 'var(--font-serif), "Instrument Serif", serif',
                }}
              >
                E. Huber.
              </span>
            </h2>
          </div>
          <div className="hidden items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-[#E1E0CC]/40 md:flex">
            <span>· 00:48 ·</span>
          </div>
        </div>

        {/* Visor */}
        <div className="relative w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-[#E1E0CC]/10 bg-[#0a0a0a]">
          <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
            <iframe
              src="/film"
              loading="lazy"
              title="Un minuto con E. Huber"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
