'use client';

/**
 * ChatClone — clon conversacional 100% client-side.
 *
 * UI flotante esquina inferior izquierda (bottom-left) para no chocar con el
 * boton WhatsApp (right side). Panel modal con glass effect.
 *
 * Stack: transformers.js + embeddings pre-computados.
 * Zero backend, zero API keys, zero costo.
 */

import { AnimatePresence, motion } from 'framer-motion';
import { Send, Sparkles, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  buildResponse,
  prewarm,
  semanticSearch,
  type SearchResult,
} from '@/lib/semantic-search';

const SUGGESTIONS = [
  '¿Que exactamente haces?',
  '¿Cuanto cuesta un asistente para mi empresa?',
  '¿Como empiezo si nunca use IA en mi negocio?',
  '¿Que diferencia tienes de una agencia normal?',
];

const STORAGE_KEY = 'chat-clone-opened-once';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: SearchResult[];
};

let msgId = 0;
const nextId = () => `m-${++msgId}-${Date.now()}`;

export default function ChatClone() {
  const [open, setOpen] = useState(false);
  const [hasPulse, setHasPulse] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hide pulse after first open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY) === '1') setHasPulse(false);
  }, []);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, thinking]);

  // Focus input when opening + prewarm model
  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 200);
    if (!modelReady) {
      setLoadingModel(true);
      prewarm()
        .then(() => {
          setModelReady(true);
          setLoadingModel(false);
        })
        .catch((e) => {
          console.error('prewarm failed', e);
          setLoadingModel(false);
          setError('No pude cargar el modelo. Revisa tu conexion.');
        });
    }
  }, [open, modelReady]);

  const toggle = () => {
    setOpen((v) => !v);
    if (hasPulse) {
      setHasPulse(false);
      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
    }
  };

  const submit = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || thinking) return;

      const userMsg: Message = {
        id: nextId(),
        role: 'user',
        text: trimmed,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setThinking(true);
      setError(null);

      try {
        const results = await semanticSearch(trimmed, 3);
        const { text: replyText, sources, confident } = buildResponse(results);

        const assistantMsg: Message = {
          id: nextId(),
          role: 'assistant',
          text: replyText,
          sources: confident ? sources : undefined,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (e) {
        console.error('semantic search failed', e);
        setError(e instanceof Error ? e.message : 'Algo fallo.');
      } finally {
        setThinking(false);
      }
    },
    [thinking],
  );

  const disabled = thinking || loadingModel;

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Cerrar chat' : 'Preguntarle a Engelbert'}
        className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-[60] group"
      >
        <div className="relative">
          {/* Pulse ring (first-time visitors only) */}
          {hasPulse && !open && (
            <>
              <span className="absolute inset-0 rounded-full bg-[#DEDBC8]/30 animate-ping" />
              <span
                className="absolute inset-0 rounded-full bg-[#DEDBC8]/20"
                style={{
                  animation: 'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
                  animationDelay: '0.8s',
                }}
              />
            </>
          )}

          <div
            className="relative flex items-center gap-2.5 rounded-full bg-[#DEDBC8] text-black pl-4 pr-5 py-2.5 shadow-[0_8px_32px_rgba(222,219,200,0.25)] transition-all group-hover:pr-6"
            style={{ fontFamily: 'var(--font-sans), system-ui' }}
          >
            {open ? (
              <X size={16} strokeWidth={2.2} />
            ) : (
              <Sparkles size={16} strokeWidth={2.2} />
            )}
            <span className="text-xs md:text-sm font-medium tracking-wide">
              {open ? 'Cerrar' : 'Preguntame'}
            </span>
          </div>
        </div>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-3 right-3 md:bottom-28 md:left-8 md:right-auto md:w-[420px] z-[55] max-h-[calc(100vh-7rem)] md:max-h-[600px]"
          >
            <div
              className="relative flex flex-col h-[70vh] md:h-[560px] rounded-2xl border border-[#DEDBC8]/15 bg-[#0a0a0a]/95 backdrop-blur-xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
              style={{ fontFamily: 'var(--font-sans), system-ui' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#DEDBC8]/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-[#DEDBC8] flex items-center justify-center text-black text-xs font-semibold">
                      EH
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0a0a0a]" />
                  </div>
                  <div>
                    <div className="text-[#E1E0CC] text-sm font-medium leading-tight">
                      Engelbert (clon)
                    </div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-[#DEDBC8]/50">
                      {loadingModel
                        ? '· cargando modelo en tu browser ·'
                        : '· IA · 100% client-side ·'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggle}
                  className="p-1.5 rounded-full text-[#DEDBC8]/60 hover:text-[#DEDBC8] hover:bg-white/5 transition"
                  aria-label="Cerrar"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scroll-smooth"
              >
                {messages.length === 0 && (
                  <div className="space-y-5">
                    <div className="text-[#DEDBC8]/80 text-sm leading-relaxed">
                      Soy el clon de Engelbert. Busco en mi knowledge base
                      directamente en tu browser — sin backend, sin costo.
                      Pregúntame sobre mis servicios, mi stack o como arrancar.
                    </div>
                    <div className="space-y-2">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[#DEDBC8]/40">
                        · sugerencias ·
                      </div>
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => submit(s)}
                          disabled={disabled}
                          className="block w-full text-left text-xs md:text-sm text-[#E1E0CC] bg-white/[0.04] hover:bg-white/[0.08] border border-[#DEDBC8]/10 hover:border-[#DEDBC8]/25 rounded-xl px-3.5 py-2.5 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m) => (
                  <MessageBubble key={m.id} message={m} />
                ))}

                {thinking && (
                  <div className="flex items-center gap-1.5 pl-1 text-[#DEDBC8]/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DEDBC8]/60 animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#DEDBC8]/60 animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#DEDBC8]/60 animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                )}

                {error && (
                  <div className="text-xs text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-xl px-3.5 py-2.5">
                    {error}
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(input);
                }}
                className="border-t border-[#DEDBC8]/10 px-4 py-3.5 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={disabled}
                  placeholder={
                    loadingModel
                      ? 'Cargando modelo (1ra vez)…'
                      : 'Escribeme lo que sea…'
                  }
                  className="flex-1 bg-transparent text-[#E1E0CC] text-sm placeholder:text-[#DEDBC8]/35 outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={disabled || !input.trim()}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#DEDBC8] text-black disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition"
                  aria-label="Enviar"
                >
                  <Send size={14} strokeWidth={2.2} />
                </button>
              </form>

              {/* Disclaimer */}
              <div className="px-5 pb-2.5 text-[9px] tracking-wider text-[#DEDBC8]/30 uppercase">
                · busqueda semantica · no es el Engelbert real ·
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Message bubble ──────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-[#DEDBC8] text-black rounded-br-md'
            : 'bg-white/[0.04] text-[#E1E0CC] border border-[#DEDBC8]/10 rounded-bl-md'
        }`}
      >
        {message.text}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2.5 pt-2.5 border-t border-[#DEDBC8]/10 flex flex-wrap gap-1.5">
            {message.sources.map((s) => (
              <SourceChip key={s.doc.id} result={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SourceChip({ result }: { result: SearchResult }) {
  const pct = Math.round(result.score * 100);
  const content = (
    <>
      <span className="text-[#DEDBC8]/70 truncate max-w-[180px]">
        {result.doc.title}
      </span>
      <span className="font-mono tabular-nums text-[#DEDBC8]/40">{pct}%</span>
    </>
  );
  const cls =
    'inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full bg-white/[0.03] border border-[#DEDBC8]/10 hover:border-[#DEDBC8]/25 transition';

  if (result.doc.url) {
    return (
      <a href={result.doc.url} className={cls}>
        {content}
      </a>
    );
  }
  return <span className={cls}>{content}</span>;
}
