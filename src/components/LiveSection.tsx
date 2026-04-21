'use client';

/**
 * LiveSection — transparencia radical: commits en vivo, stack real, meta-info.
 *
 * Pitch: este site se construye con IA frente a tus ojos.
 * Refresca cada minuto lo que trae /api/live (cached 5 min server-side).
 */

import { useEffect, useRef, useState } from 'react';
import type { LiveResponse } from '@/app/api/live/route';

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `hace ${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h}h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `hace ${d}d`;
  return new Date(iso).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'short',
  });
}

export default function LiveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<LiveResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());

  // Reveal on view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
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
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fetch + refresh every 60s
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/live');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: LiveResponse = await res.json();
        if (alive) {
          setData(json);
          setError(null);
        }
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : 'fetch failed');
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 60_000);
    const clockId = setInterval(() => setNow(new Date()), 1000);
    return () => {
      alive = false;
      clearInterval(id);
      clearInterval(clockId);
    };
  }, []);

  return (
    <section
      id="live"
      className="relative bg-black px-4 md:px-6 py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.12] pointer-events-none" />

      <div
        ref={sectionRef}
        className="relative max-w-6xl mx-auto reveal-on-view"
      >
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="fade-up flex items-center gap-2 text-primary/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4">
              <span className="relative flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </span>
              <span>· Live · transparencia radical ·</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95]"
              style={{ color: '#E1E0CC' }}
            >
              <span className="font-normal">Este site se </span>
              <span className="italic font-serif">construye</span>
              <span className="font-normal"> con IA.</span>
              <br />
              <span className="text-gray-500">Aquí está la prueba.</span>
            </h2>
          </div>

          <div
            className="hidden md:block text-right font-mono text-xs text-[#DEDBC8]/50 tabular-nums"
            suppressHydrationWarning
          >
            <div>{now.toLocaleTimeString('es-PE', { hour12: false })}</div>
            <div className="text-[10px] tracking-[0.2em] uppercase mt-1">
              · Lima, Peru ·
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Commits live feed */}
          <div
            className="lg:col-span-2 fade-up bg-[#0e0e0e] rounded-2xl border border-[#DEDBC8]/10 p-6 md:p-8"
            style={{ animationDelay: '0.05s' }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#DEDBC8]/50">
                · git log · live ·
              </div>
              <a
                href={`https://github.com/Eiaell/Blog-`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-wider text-primary/70 hover:text-primary transition"
              >
                github →
              </a>
            </div>

            {loading && !data && <CommitsSkeleton />}
            {error && !data && (
              <div className="text-xs text-red-400/70">
                No se pudo cargar git log. Reintenta en un rato.
              </div>
            )}

            {data && (
              <ul className="space-y-3">
                {data.commits.slice(0, 8).map((c, i) => (
                  <li
                    key={c.sha}
                    className="fade-up group flex items-start gap-3 py-2 border-b border-[#DEDBC8]/5 last:border-0"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 font-mono text-[11px] text-primary/70 hover:text-primary w-14 pt-0.5 transition"
                    >
                      {c.shortSha}
                    </a>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#E1E0CC] leading-snug truncate">
                        {c.message}
                      </div>
                      <div className="text-[10px] text-[#DEDBC8]/40 mt-0.5 tabular-nums">
                        {c.author} · {timeAgo(c.date)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Stats */}
          <div
            className="fade-up bg-[#0e0e0e] rounded-2xl border border-[#DEDBC8]/10 p-6 md:p-8 flex flex-col gap-5"
            style={{ animationDelay: '0.15s' }}
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#DEDBC8]/50">
              · stack · en produccion ·
            </div>

            <StatRow
              label="Framework"
              value="Next.js 15"
              meta="App Router · React 19"
            />
            <StatRow
              label="Deploy"
              value="Vercel"
              meta={
                data?.build.region
                  ? `region ${data.build.region}`
                  : 'edge global'
              }
            />
            <StatRow
              label="LLM"
              value="Claude Sonnet 4.5"
              meta="streaming · server-side"
            />
            <StatRow
              label="Motor de animacion"
              value="Custom"
              meta="react + rAF · 48s film"
            />

            {data && (
              <div className="mt-auto pt-4 border-t border-[#DEDBC8]/10">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#DEDBC8]/40 mb-2">
                  · lenguajes del repo ·
                </div>
                <div className="space-y-1.5">
                  {data.languages.map((l) => (
                    <div
                      key={l.name}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-[#E1E0CC]/80">{l.name}</span>
                      <span className="font-mono text-[#DEDBC8]/50 tabular-nums">
                        {l.pct.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom stats strip */}
        {data && (
          <div
            className="fade-up mt-3 grid grid-cols-2 md:grid-cols-4 gap-3"
            style={{ animationDelay: '0.25s' }}
          >
            <MetricCard
              value={data.commits.length > 0 ? timeAgo(data.commits[0].date) : '—'}
              label="ultimo commit"
            />
            <MetricCard
              value={`${data.repo.sizeKb.toLocaleString('es-PE')} KB`}
              label="tamano del repo"
            />
            <MetricCard
              value={data.repo.stars.toString()}
              label="stars en github"
            />
            <MetricCard
              value={data.meta.cachedFor + 's'}
              label="cache edge"
            />
          </div>
        )}

        {/* Footer note */}
        <div
          className="fade-up mt-10 text-center text-xs text-[#DEDBC8]/35 tracking-wide"
          style={{ animationDelay: '0.4s' }}
        >
          Sin humo, sin maquetas — código real, repo público, commits reales.
        </div>
      </div>
    </section>
  );
}

// ── Atoms ───────────────────────────────────────────────────────────────────

function StatRow({
  label,
  value,
  meta,
}: {
  label: string;
  value: string;
  meta?: string;
}) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.2em] uppercase text-[#DEDBC8]/40 mb-0.5">
        {label}
      </div>
      <div className="text-sm text-[#E1E0CC]">{value}</div>
      {meta && (
        <div className="text-[10px] text-[#DEDBC8]/40 mt-0.5 font-mono">
          {meta}
        </div>
      )}
    </div>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#0e0e0e] rounded-xl border border-[#DEDBC8]/10 p-4 text-center">
      <div
        className="text-lg md:text-xl text-[#E1E0CC] font-normal tabular-nums truncate"
        title={value}
      >
        {value}
      </div>
      <div className="text-[9px] tracking-[0.25em] uppercase text-[#DEDBC8]/40 mt-1">
        {label}
      </div>
    </div>
  );
}

function CommitsSkeleton() {
  return (
    <ul className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <li key={i} className="flex items-start gap-3 py-2 animate-pulse">
          <div className="w-14 h-3 bg-[#DEDBC8]/10 rounded" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 bg-[#DEDBC8]/10 rounded w-3/4" />
            <div className="h-2 bg-[#DEDBC8]/5 rounded w-1/3" />
          </div>
        </li>
      ))}
    </ul>
  );
}
