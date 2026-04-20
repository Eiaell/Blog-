'use client';

/**
 * Film de E. Huber — 48s, 7 escenas animadas en Stage.
 * Se embebe en la landing via <iframe src="/film" />.
 *
 * IMPORTANTE: limpiamos el playhead persistido ANTES de montar Stage,
 * para que cada visita empiece siempre desde 0 (ver animations.tsx:248-256).
 */

import { useEffect, useState } from 'react';
import { Stage } from './animations';
import {
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
} from './scenes';

const PERSIST_KEY = 'huber-film';

export default function FilmPage() {
  const [ready, setReady] = useState(false);

  // Borra el playhead guardado ANTES de montar Stage, asi su lazy-init
  // lee localStorage vacio y arranca en t=0 en cada entrada a /film.
  useEffect(() => {
    try {
      localStorage.removeItem(`${PERSIST_KEY}:t`);
    } catch {
      /* ignore: SSR / privado / storage bloqueado */
    }
    setReady(true);
  }, []);

  if (!ready) return <div className="fixed inset-0 bg-black" />;

  return (
    <div className="fixed inset-0 bg-black">
      <Stage
        width={1920}
        height={1080}
        duration={48}
        background="#000000"
        persistKey={PERSIST_KEY}
        showControls={false}
        loop
        autoplay
      >
        <Scene01 />
        <Scene02 />
        <Scene03 />
        <Scene04 />
        <Scene05 />
        <Scene06 />
        <Scene07 />
      </Stage>
    </div>
  );
}
