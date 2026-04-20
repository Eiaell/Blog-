'use client';

/**
 * Film de E. Huber — 48s, 7 escenas animadas en Stage.
 * Se embebe en la landing via <iframe src="/film" />.
 */

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

export default function FilmPage() {
  return (
    <div className="fixed inset-0 bg-black">
      <Stage
        width={1920}
        height={1080}
        duration={48}
        background="#000000"
        persistKey="huber-film"
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
