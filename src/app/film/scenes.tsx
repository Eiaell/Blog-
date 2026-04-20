'use client';

/**
 * 7 escenas del film de E. Huber (48s).
 * Portado desde reference/video/scenes.jsx del handoff de Claude Design.
 *
 * Cada escena se activa en un rango de tiempo global dentro del Stage:
 *   Scene01 · 0.0–5.2s   · Silencio
 *   Scene02 · 5.2–12.5s  · Tension
 *   Scene03 · 12.5–19.7s · El nombre
 *   Scene04 · 19.7–26.7s · El escritorio (terminal)
 *   Scene05 · 26.7–38.0s · Tres capacidades (cards)
 *   Scene06 · 38.0–44.0s · Manifiesto
 *   Scene07 · 44.0–48.0s · Firma
 */

import React, { useMemo, type ReactNode } from 'react';
import { Easing, Sprite, clamp, useSprite, useTime } from './animations';

// ───────────── shared atoms ─────────────

const PALETTE = {
  bg: '#000000',
  cream: '#E1E0CC',
  warm: '#D4835A',
  gray: '#8A8A82',
} as const;

// Slow, always-present warm glow from the right edge
interface AmbientGlowProps {
  intensity?: number;
  side?: 'left' | 'right' | 'bottom';
}
function AmbientGlow({ intensity = 0.5, side = 'right' }: AmbientGlowProps) {
  const t = useTime();
  const breath = 0.85 + 0.15 * Math.sin(t * 0.8);
  const op = intensity * breath;
  const gradient =
    side === 'right'
      ? `radial-gradient(ellipse 70% 90% at 110% 50%, rgba(212,131,90,${0.35 * op}), transparent 60%)`
      : side === 'left'
        ? `radial-gradient(ellipse 70% 90% at -10% 50%, rgba(212,131,90,${0.35 * op}), transparent 60%)`
        : `radial-gradient(ellipse 80% 80% at 50% 80%, rgba(212,131,90,${0.25 * op}), transparent 65%)`;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: gradient,
        pointerEvents: 'none',
      }}
    />
  );
}

// Floating dust particles (deterministic positions)
interface DustFieldProps {
  count?: number;
  opacity?: number;
}
function DustField({ count = 40, opacity = 0.35 }: DustFieldProps) {
  const t = useTime();
  const particles = useMemo(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    };
    const r = rng(7);
    return Array.from({ length: count }, () => ({
      x: r() * 1920,
      y: r() * 1080,
      size: 1 + r() * 2,
      speed: 0.2 + r() * 0.6,
      amp: 20 + r() * 40,
      phase: r() * Math.PI * 2,
    }));
  }, [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {particles.map((p, i) => {
        const y = p.y + Math.sin(t * p.speed + p.phase) * p.amp;
        const x = p.x + Math.cos(t * p.speed * 0.5 + p.phase) * p.amp * 0.3;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: PALETTE.cream,
              opacity:
                opacity *
                (0.3 + 0.7 * (Math.sin(t * 2 + p.phase) * 0.5 + 0.5)),
              filter: 'blur(0.5px)',
              boxShadow: `0 0 ${p.size * 3}px rgba(225,224,204,0.4)`,
            }}
          />
        );
      })}
    </div>
  );
}

// Subtle grain overlay (SVG noise)
interface GrainProps {
  opacity?: number;
}
function Grain({ opacity = 0.08 }: GrainProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>")`,
        mixBlendMode: 'overlay',
      }}
    />
  );
}

// Pull-up masked word reveal (for hero title)
interface PullUpWordProps {
  text: string;
  x: number;
  y: number;
  size: number;
  delay?: number;
  color?: string;
  anchor?: 'left' | 'center' | 'right';
  weight?: number;
  tracking?: string;
  italic?: boolean;
  font?: string;
}
function PullUpWord({
  text,
  x,
  y,
  size,
  delay = 0,
  color = PALETTE.cream,
  anchor = 'left',
  weight = 500,
  tracking = '-0.055em',
  italic = false,
  font = 'Almarai, sans-serif',
}: PullUpWordProps) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / 1.1, 0, 1);
  const eased = Easing.easeOutExpo(t);
  const ty = (1 - eased) * 100;
  const translateX =
    anchor === 'center' ? '-50%' : anchor === 'right' ? '-100%' : '0';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translateX(${translateX})`,
        overflow: 'hidden',
        lineHeight: 0.82,
        padding: `${size * 0.08}px 0`,
      }}
    >
      <div
        style={{
          fontFamily: italic ? '"Instrument Serif", serif' : font,
          fontStyle: italic ? 'italic' : 'normal',
          fontSize: size,
          fontWeight: weight,
          color,
          letterSpacing: tracking,
          transform: `translateY(${ty}%)`,
          opacity: eased,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 01 · 0:00 – 0:05 · "Silencio"
// ═══════════════════════════════════════════════════════════
export function Scene01() {
  return (
    <Sprite start={0} end={5.2}>
      <div style={{ position: 'absolute', inset: 0, background: PALETTE.bg }} />
      <AmbientGlow intensity={0.35} side="right" />
      <DustField count={50} opacity={0.25} />
      <Grain opacity={0.06} />

      <Sprite start={1.0} end={5.0}>
        {({ localTime }) => {
          const t = clamp(localTime / 1.2, 0, 1);
          const fadeOut = clamp((localTime - 3.0) / 1.0, 0, 1);
          const opacity =
            Easing.easeOutCubic(t) * (1 - Easing.easeInCubic(fadeOut));
          return (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontSize: 62,
                color: PALETTE.cream,
                letterSpacing: '-0.015em',
                opacity,
                whiteSpace: 'nowrap',
              }}
            >
              Todos hablan de inteligencia artificial.
            </div>
          );
        }}
      </Sprite>
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 02 · 0:05 – 0:12.5 · "Tension"
// ═══════════════════════════════════════════════════════════
interface FlashProps {
  start: number;
  end: number;
  children: ReactNode;
}
function Flash({ start, end, children }: FlashProps) {
  const parent = useSprite();
  const t = parent.localTime;
  if (t < start || t > end) return null;
  const dur = end - start;
  const lt = t - start;
  const inT = clamp(lt / 0.15, 0, 1);
  const outT = clamp((lt - (dur - 0.35)) / 0.35, 0, 1);
  const opacity =
    Easing.easeOutCubic(inT) * (1 - Easing.easeInCubic(outT)) * 0.95;
  const scale = 0.98 + 0.02 * inT;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `scale(${scale})`,
        filter: 'saturate(0.55)',
      }}
    >
      {children}
    </div>
  );
}

function FakeChatbot() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 720,
        background: '#1a1a1a',
        border: '1px solid #3a3a3a',
        borderRadius: 20,
        padding: 32,
        fontFamily: 'Almarai, sans-serif',
      }}
    >
      <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#555',
            }}
          />
        ))}
      </div>
      <div
        style={{
          color: '#cfcfcf',
          fontSize: 18,
          marginBottom: 20,
          padding: '12px 18px',
          background: '#262626',
          borderRadius: 14,
          display: 'inline-block',
        }}
      >
        ¿En qué te puedo ayudar hoy?
      </div>
      <div style={{ clear: 'both', height: 8 }} />
      <div
        style={{
          color: PALETTE.cream,
          fontSize: 18,
          marginTop: 20,
          padding: '12px 18px',
          background: '#2e2e2e',
          borderRadius: 14,
          marginLeft: 'auto',
          display: 'inline-block',
          float: 'right',
        }}
      >
        Lo siento, no puedo acceder a eso.
      </div>
    </div>
  );
}

function FakeLoader() {
  const t = useTime();
  const dots = Math.floor(t * 3) % 4;
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 28,
      }}
    >
      <div
        style={{
          width: 320,
          height: 8,
          background: '#2a2a2a',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${20 + ((t * 40) % 80)}%`,
            height: '100%',
            background: '#707070',
          }}
        />
      </div>
      <div
        style={{
          color: '#b0b0b0',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 18,
          letterSpacing: '0.2em',
        }}
      >
        PROCESANDO{'.'.repeat(dots)}
      </div>
    </div>
  );
}

function FakeDashboard() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 960,
        background: '#1a1a1a',
        border: '1px solid #3a3a3a',
        borderRadius: 20,
        padding: 32,
        fontFamily: 'Almarai, sans-serif',
      }}
    >
      <div
        style={{
          color: '#999',
          fontSize: 13,
          letterSpacing: '0.2em',
          marginBottom: 20,
        }}
      >
        DASHBOARD · SIN DATOS
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              background: '#242424',
              borderRadius: 12,
              padding: 20,
              height: 120,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: '#888',
                letterSpacing: '0.15em',
              }}
            >
              METRIC {i + 1}
            </div>
            <div style={{ fontSize: 32, color: '#666' }}>—</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Scene02() {
  return (
    <Sprite start={5.2} end={12.5}>
      <div style={{ position: 'absolute', inset: 0, background: PALETTE.bg }} />
      <Grain opacity={0.05} />

      <Flash start={0.0} end={1.3}>
        <FakeChatbot />
      </Flash>
      <Flash start={1.3} end={2.6}>
        <FakeLoader />
      </Flash>
      <Flash start={2.6} end={4.0}>
        <FakeDashboard />
      </Flash>

      <Sprite start={9.2} end={12.5}>
        {({ localTime, duration }) => {
          const t = clamp(localTime / 0.7, 0, 1);
          const fadeOut = clamp(
            (localTime - (duration - 0.6)) / 0.6,
            0,
            1,
          );
          const opacity =
            Easing.easeOutCubic(t) * (1 - Easing.easeInCubic(fadeOut));
          return (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontSize: 56,
                color: PALETTE.cream,
                letterSpacing: '-0.015em',
                opacity,
                textAlign: 'center',
              }}
            >
              Casi nadie la está poniendo a trabajar.
            </div>
          );
        }}
      </Sprite>
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 03 · 0:12.5 – 0:19.7 · "El nombre"
// ═══════════════════════════════════════════════════════════
export function Scene03() {
  return (
    <Sprite start={12.5} end={19.7}>
      <div style={{ position: 'absolute', inset: 0, background: PALETTE.bg }} />
      <AmbientGlow intensity={0.7} side="right" />
      <DustField count={60} opacity={0.3} />
      <Grain opacity={0.07} />

      <Sprite start={12.6} end={19.7}>
        <PullUpWord
          text="Engelbert"
          x={220}
          y={340}
          size={240}
          delay={0.1}
          weight={500}
        />
        <PullUpWord
          text="Huber"
          x={220}
          y={600}
          size={240}
          delay={0.35}
          weight={500}
        />
        <Sprite start={13.1} end={19.6}>
          {({ localTime }) => {
            const t = clamp(localTime / 0.8, 0, 1);
            return (
              <div
                style={{
                  position: 'absolute',
                  left: 220 + 560,
                  top: 600 + 10,
                  fontFamily: 'Almarai, sans-serif',
                  fontSize: 70,
                  color: PALETTE.cream,
                  opacity: Easing.easeOutCubic(t),
                  fontWeight: 400,
                }}
              >
                *
              </div>
            );
          }}
        </Sprite>
      </Sprite>

      <Sprite start={13.9} end={19.5}>
        {({ localTime }) => {
          const t = clamp(localTime / 0.8, 0, 1);
          return (
            <div
              style={{
                position: 'absolute',
                left: 232,
                top: 875,
                fontFamily: 'Almarai, sans-serif',
                fontSize: 18,
                letterSpacing: '0.35em',
                color: 'rgba(225,224,204,0.55)',
                opacity: Easing.easeOutCubic(t),
                textTransform: 'uppercase',
              }}
            >
              · AI OPERATOR &nbsp;·&nbsp; LIMA, PERÚ ·
            </div>
          );
        }}
      </Sprite>

      <Sprite start={12.8} end={19.5}>
        {({ localTime }) => {
          const t = clamp(localTime / 0.6, 0, 1);
          return (
            <div
              style={{
                position: 'absolute',
                right: 60,
                top: 60,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 14,
                letterSpacing: '0.3em',
                color: 'rgba(225,224,204,0.35)',
                opacity: Easing.easeOutCubic(t),
              }}
            >
              [ 2026 / FILM.001 ]
            </div>
          );
        }}
      </Sprite>

      <Sprite start={15.3} end={17.1}>
        {({ localTime, duration }) => {
          const inT = clamp(localTime / 0.4, 0, 1);
          const outT = clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
          const op = Easing.easeOutCubic(inT) * (1 - Easing.easeInCubic(outT));
          return (
            <div
              style={{
                position: 'absolute',
                right: 60,
                bottom: 60,
                fontFamily: 'Almarai, sans-serif',
                fontSize: 20,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(225,224,204,0.65)',
                opacity: op,
                textAlign: 'right',
              }}
            >
              Yo no vendo demos.
            </div>
          );
        }}
      </Sprite>
      <Sprite start={17.1} end={19.5}>
        {({ localTime, duration }) => {
          const inT = clamp(localTime / 0.4, 0, 1);
          const outT = clamp((localTime - (duration - 0.5)) / 0.5, 0, 1);
          const op = Easing.easeOutCubic(inT) * (1 - Easing.easeInCubic(outT));
          return (
            <div
              style={{
                position: 'absolute',
                right: 60,
                bottom: 60,
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontSize: 38,
                color: PALETTE.cream,
                opacity: op,
                textAlign: 'right',
              }}
            >
              Construyo sistemas que ejecutan.
            </div>
          );
        }}
      </Sprite>
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 04 · 0:19.7 – 0:26.7 · "El escritorio" (terminal)
// ═══════════════════════════════════════════════════════════
function TerminalTypedLines() {
  const { localTime } = useSprite();
  const lines: Array<{
    t: number;
    text: string;
    color: string;
    speed: number;
    italic?: boolean;
    blink?: boolean;
  }> = [
    { t: 0.8, text: '> whoami', color: PALETTE.gray, speed: 40 },
    {
      t: 1.6,
      text: 'engelbert huber — ai operator, lima',
      color: PALETTE.cream,
      speed: 45,
    },
    { t: 2.8, text: '> mission', color: PALETTE.gray, speed: 40 },
    {
      t: 3.6,
      text: 'diseñar asistentes que leen, deciden y ejecutan.',
      color: PALETTE.cream,
      speed: 45,
      italic: true,
    },
    { t: 5.0, text: '> ready', color: PALETTE.gray, speed: 40 },
    { t: 5.6, text: '_', color: PALETTE.warm, speed: 10, blink: true },
  ];

  return (
    <div style={{ fontSize: 22, lineHeight: 1.9 }}>
      {lines.map((line, i) => {
        const elapsed = localTime - line.t;
        if (elapsed < 0) return null;
        const chars = Math.floor(elapsed * line.speed);
        const visible = line.text.slice(0, chars);
        const showCursor = chars < line.text.length;
        return (
          <div
            key={i}
            style={{
              color: line.color,
              fontStyle: line.italic ? 'italic' : 'normal',
              letterSpacing: '0.02em',
            }}
          >
            {visible}
            {(showCursor || line.blink) && (
              <span
                style={{
                  display: 'inline-block',
                  width: '0.55em',
                  height: '1em',
                  background: line.color,
                  marginLeft: 2,
                  verticalAlign: 'text-bottom',
                  opacity: Math.floor(localTime * 2) % 2 === 0 ? 1 : 0,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Scene04() {
  return (
    <Sprite start={19.7} end={26.7}>
      <div style={{ position: 'absolute', inset: 0, background: '#050403' }} />
      <AmbientGlow intensity={0.8} side="left" />
      <DustField count={30} opacity={0.2} />
      <Grain opacity={0.09} />

      <Sprite start={19.9} end={26.7}>
        {({ localTime }) => {
          const inT = clamp(localTime / 0.8, 0, 1);
          const op = Easing.easeOutCubic(inT);
          const scale = 0.98 + 0.02 * inT;
          return (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%,-50%) scale(${scale})`,
                width: 1100,
                background: 'rgba(15,13,11,0.92)',
                border: '1px solid rgba(225,224,204,0.12)',
                borderRadius: 16,
                overflow: 'hidden',
                opacity: op,
                boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(225,224,204,0.08)',
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#3d2f28',
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#3d3528',
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#2f3d28',
                  }}
                />
                <div
                  style={{
                    marginLeft: 20,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 12,
                    color: 'rgba(225,224,204,0.4)',
                    letterSpacing: '0.1em',
                  }}
                >
                  engelbert@huber ~ %
                </div>
              </div>
              <div
                style={{
                  padding: '36px 40px',
                  minHeight: 340,
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                <TerminalTypedLines />
              </div>
            </div>
          );
        }}
      </Sprite>
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════
// Card visuals — Scene 05
// ═══════════════════════════════════════════════════════════
interface CardVisualProps {
  cardStart: number;
}

function CardVisual_Documents({ cardStart }: CardVisualProps) {
  const t = useTime();
  const localT = t - cardStart;
  const scanP = (localT % 3.2) / 3.2;
  const lines = [
    { w: 0.85, d: 0 },
    { w: 0.62, d: 0.1 },
    { w: 0.92, d: 0.2 },
    { w: 0.54, d: 0.3 },
    { w: 0.78, d: 0.4 },
    { w: 0.68, d: 0.5 },
    { w: 0.88, d: 0.6 },
    { w: 0.45, d: 0.7 },
  ];
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 220,
        overflow: 'hidden',
        borderRadius: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          padding: '20px 4px',
        }}
      >
        {lines.map((l, i) => {
          const linePos = (i + 0.5) / lines.length;
          const dist = Math.abs(scanP - linePos);
          const lit =
            dist < 0.08 ? 1 - dist / 0.08 : Math.max(0, 0.22 - dist * 0.15);
          return (
            <div
              key={i}
              style={{
                height: 3,
                width: `${l.w * 100}%`,
                background: `rgba(225,224,204,${0.15 + lit * 0.7})`,
                borderRadius: 2,
                boxShadow:
                  lit > 0.5
                    ? `0 0 12px rgba(225,224,204,${lit * 0.5})`
                    : 'none',
                transition: 'none',
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${scanP * 100}%`,
          height: 2,
          background:
            'linear-gradient(90deg, transparent, rgba(225,224,204,0.9), transparent)',
          boxShadow: '0 0 20px rgba(225,224,204,0.6)',
        }}
      />
    </div>
  );
}

function CardVisual_Connected({ cardStart }: CardVisualProps) {
  const t = useTime();
  const localT = t - cardStart;
  const nodes = [
    { x: 0.18, y: 0.3, label: 'DB' },
    { x: 0.82, y: 0.3, label: '@' },
    { x: 0.5, y: 0.85, label: '#' },
  ];
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 220,
        overflow: 'hidden',
        borderRadius: 12,
      }}
    >
      <svg
        viewBox="0 0 400 220"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
      >
        {nodes.map((n, i) => {
          const cx = 200;
          const cy = 110;
          const nx = n.x * 400;
          const ny = n.y * 220;
          const pulseT = ((localT + i * 0.45) % 1.8) / 1.8;
          const pulseX = cx + (nx - cx) * pulseT;
          const pulseY = cy + (ny - cy) * pulseT;
          const pulseVisible = pulseT < 0.95;
          return (
            <g key={i}>
              <line
                x1={cx}
                y1={cy}
                x2={nx}
                y2={ny}
                stroke="rgba(225,224,204,0.18)"
                strokeWidth="1"
              />
              {pulseVisible && (
                <circle
                  cx={pulseX}
                  cy={pulseY}
                  r="3"
                  fill="rgba(225,224,204,0.95)"
                  style={{
                    filter: 'drop-shadow(0 0 6px rgba(225,224,204,0.8))',
                  }}
                />
              )}
            </g>
          );
        })}
        {nodes.map((n, i) => (
          <g key={`n${i}`}>
            <circle
              cx={n.x * 400}
              cy={n.y * 220}
              r="18"
              fill="#151513"
              stroke="rgba(225,224,204,0.35)"
              strokeWidth="1"
            />
            <text
              x={n.x * 400}
              y={n.y * 220 + 4}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              fill="rgba(225,224,204,0.7)"
            >
              {n.label}
            </text>
          </g>
        ))}
        <circle
          cx={200}
          cy={110}
          r={14 + Math.sin(localT * 2.2) * 2}
          fill="rgba(225,224,204,0.9)"
          style={{ filter: 'drop-shadow(0 0 18px rgba(225,224,204,0.6))' }}
        />
        <circle
          cx={200}
          cy={110}
          r={26 + Math.sin(localT * 2.2) * 3}
          fill="none"
          stroke="rgba(225,224,204,0.25)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

function CardVisual_Agents({ cardStart }: CardVisualProps) {
  const t = useTime();
  const localT = t - cardStart;
  const cycle = 4.5;
  const phase = (localT % cycle) / cycle;
  const bubbles = [
    { side: 'left' as const, text: '¿Cuánto vendimos ayer?', appearAt: 0.02 },
    { side: 'right' as const, text: 'S/ 48,320 · 127 tickets', appearAt: 0.28 },
    { side: 'left' as const, text: '✓ gracias', appearAt: 0.56 },
  ];
  const onlinePulse = 0.5 + 0.5 * Math.sin(localT * 3);
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 220,
        overflow: 'hidden',
        borderRadius: 12,
        padding: '14px 4px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: 'rgba(225,224,204,0.5)',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#6FE3A7',
            boxShadow: `0 0 ${4 + onlinePulse * 8}px rgba(111,227,167,${0.5 + onlinePulse * 0.4})`,
          }}
        />
        24/7
      </div>
      {bubbles.map((b, i) => {
        const appeared = phase > b.appearAt;
        const appearT = Math.max(
          0,
          Math.min(1, (phase - b.appearAt) / 0.06),
        );
        const fadeT = phase > 0.93 ? (phase - 0.93) / 0.07 : 0;
        const op = Easing.easeOutExpo(appearT) * (1 - fadeT);
        const ty = (1 - Easing.easeOutExpo(appearT)) * 8;
        if (!appeared) return null;
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: b.side === 'right' ? 'flex-end' : 'flex-start',
              opacity: op,
              transform: `translateY(${ty}px)`,
            }}
          >
            <div
              style={{
                background:
                  b.side === 'right' ? 'rgba(225,224,204,0.92)' : '#1C1C1A',
                color: b.side === 'right' ? '#0A0907' : 'rgba(225,224,204,0.85)',
                fontFamily: 'Almarai, sans-serif',
                fontSize: 14,
                fontWeight: 400,
                padding: '10px 14px',
                borderRadius: 14,
                borderBottomRightRadius: b.side === 'right' ? 4 : 14,
                borderBottomLeftRadius: b.side === 'left' ? 4 : 14,
                maxWidth: '78%',
                border:
                  b.side === 'left'
                    ? '1px solid rgba(225,224,204,0.1)'
                    : 'none',
              }}
            >
              {b.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 05 · 0:26.7 – 0:38.0 · "Tres capacidades"
// ═══════════════════════════════════════════════════════════
export function Scene05() {
  const cards: Array<{
    idx: string;
    title: string;
    sub: string;
    Visual: React.ComponentType<CardVisualProps>;
  }> = [
    {
      idx: '01',
      title: 'Asistentes que conocen tu empresa.',
      sub: 'Leen tus documentos. Responden con lo que es real.',
      Visual: CardVisual_Documents,
    },
    {
      idx: '02',
      title: 'IA que actúa, no solo conversa.',
      sub: 'Conectada a tus herramientas. Opera con tu permiso.',
      Visual: CardVisual_Connected,
    },
    {
      idx: '03',
      title: 'Agentes que no duermen.',
      sub: 'En WhatsApp, en Slack, donde tu equipo trabaja.',
      Visual: CardVisual_Agents,
    },
  ];
  return (
    <Sprite start={26.7} end={38.0}>
      <div style={{ position: 'absolute', inset: 0, background: PALETTE.bg }} />
      <AmbientGlow intensity={0.3} side="bottom" />
      <DustField count={30} opacity={0.15} />
      <Grain opacity={0.06} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '0 120px',
        }}
      >
        {cards.map((c, i) => (
          <Sprite key={i} start={27.0 + i * 0.8} end={38.0}>
            {({ localTime }) => {
              const inT = clamp(localTime / 1.0, 0, 1);
              const eased = Easing.easeOutExpo(inT);
              const ty = (1 - eased) * 60;
              const op = eased;
              return (
                <div
                  style={{
                    width: 480,
                    height: 640,
                    background: '#0E0E0E',
                    borderRadius: 24,
                    padding: '56px 44px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: `translateY(${ty}px)`,
                    opacity: op,
                    boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 36,
                      left: 44,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: PALETTE.cream,
                      boxShadow: `0 0 16px ${PALETTE.cream}`,
                    }}
                  />
                  <div style={{ marginTop: 24 }}>
                    <c.Visual cardStart={27.0 + i * 0.8} />
                  </div>
                  <div style={{ flex: 1 }} />
                  <div>
                    <div
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 13,
                        letterSpacing: '0.3em',
                        color: 'rgba(225,224,204,0.4)',
                        marginBottom: 24,
                      }}
                    >
                      {c.idx}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Almarai, sans-serif',
                        fontSize: 36,
                        fontWeight: 500,
                        color: PALETTE.cream,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.08,
                        marginBottom: 20,
                      }}
                    >
                      {c.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Almarai, sans-serif',
                        fontSize: 18,
                        fontWeight: 300,
                        color: 'rgba(225,224,204,0.55)',
                        lineHeight: 1.4,
                      }}
                    >
                      {c.sub}
                    </div>
                  </div>
                </div>
              );
            }}
          </Sprite>
        ))}
      </div>
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 06 · 0:38.0 – 0:44.0 · "Manifiesto"
// ═══════════════════════════════════════════════════════════
export function Scene06() {
  return (
    <Sprite start={38.0} end={44.0}>
      <div style={{ position: 'absolute', inset: 0, background: PALETTE.bg }} />
      <AmbientGlow intensity={0.4} side="right" />
      <Grain opacity={0.05} />

      <Sprite start={38.5} end={44.0}>
        {({ localTime, duration }) => {
          const inT = clamp(localTime / 0.8, 0, 1);
          const outT = clamp((localTime - (duration - 0.8)) / 0.8, 0, 1);
          const op = Easing.easeOutCubic(inT) * (1 - Easing.easeInCubic(outT));
          return (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '40%',
                transform: 'translate(-50%,-50%)',
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontSize: 96,
                color: PALETTE.cream,
                letterSpacing: '-0.02em',
                opacity: op,
              }}
            >
              No vendo magia.
            </div>
          );
        }}
      </Sprite>
      <Sprite start={40.4} end={44.0}>
        {({ localTime, duration }) => {
          const inT = clamp(localTime / 1.0, 0, 1);
          const outT = clamp((localTime - (duration - 0.8)) / 0.8, 0, 1);
          const op = Easing.easeOutCubic(inT) * (1 - Easing.easeInCubic(outT));
          return (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '58%',
                transform: 'translate(-50%,-50%)',
                fontFamily: 'Almarai, sans-serif',
                fontWeight: 300,
                fontSize: 48,
                color: 'rgba(225,224,204,0.75)',
                letterSpacing: '-0.02em',
                opacity: op,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              Construyo herramientas que funcionan todos los días.
            </div>
          );
        }}
      </Sprite>
    </Sprite>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 07 · 0:44 – 0:48 · "Firma"
// ═══════════════════════════════════════════════════════════
export function Scene07() {
  return (
    <Sprite start={44.0} end={48.0}>
      <div style={{ position: 'absolute', inset: 0, background: PALETTE.bg }} />
      <AmbientGlow intensity={0.25} side="bottom" />
      <Grain opacity={0.05} />

      <Sprite start={44.3} end={47.8}>
        {({ localTime, duration }) => {
          const inT = clamp(localTime / 1.0, 0, 1);
          const outT = clamp((localTime - (duration - 0.6)) / 0.6, 0, 1);
          const op = Easing.easeOutCubic(inT) * (1 - Easing.easeInCubic(outT));
          return (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
                textAlign: 'center',
                opacity: op,
              }}
            >
              <div
                style={{
                  fontFamily: 'Almarai, sans-serif',
                  fontWeight: 500,
                  fontSize: 140,
                  color: PALETTE.cream,
                  letterSpacing: '-0.055em',
                  lineHeight: 0.9,
                }}
              >
                E. Huber
                <sup
                  style={{
                    fontSize: '0.3em',
                    fontWeight: 400,
                    verticalAlign: 'super',
                  }}
                >
                  *
                </sup>
              </div>
              <div
                style={{
                  marginTop: 32,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 16,
                  letterSpacing: '0.35em',
                  color: 'rgba(225,224,204,0.45)',
                  textTransform: 'uppercase',
                }}
              >
                ehuber.lat
              </div>
            </div>
          );
        }}
      </Sprite>
    </Sprite>
  );
}
