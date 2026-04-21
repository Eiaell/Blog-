'use client';

/**
 * Wrapper cliente que carga el ChatClone dinamicamente con ssr:false.
 * Asi transformers.js no entra al bundle del server (serverless function).
 */

import dynamic from 'next/dynamic';

const ChatClone = dynamic(() => import('./ChatClone'), {
  ssr: false,
});

export default function ChatCloneLazy() {
  return <ChatClone />;
}
