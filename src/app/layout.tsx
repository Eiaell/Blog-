import type { Metadata } from "next";
import { Instrument_Serif, Almarai } from "next/font/google";
import StructuredData from "@/components/StructuredData";

import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const almarai = Almarai({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Engelbert Huber - AI Operator | RAG & MCP",
  description: "Especialista en RAG, MCP e Inteligencia Artificial. Exploro sistemas de recuperación aumentada, protocolos de comunicación de modelos y las últimas tecnologías de IA.",
  keywords: "RAG, MCP, AI, inteligencia artificial, Claude, ChatGPT, retrieval augmented generation, model communication protocol, machine learning, vector databases",
  authors: [{ name: "Engelbert Huber" }],
  creator: "Engelbert Huber",
  publisher: "Engelbert Huber",
  metadataBase: new URL('https://ehuber.lat'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://ehuber.lat',
    title: 'Engelbert Huber - AI Operator | RAG & MCP',
    description: 'Especialista en RAG, MCP e Inteligencia Artificial. Exploro sistemas de recuperación aumentada, protocolos de comunicación de modelos y las últimas tecnologías de IA.',
    siteName: 'Engelbert Huber',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Engelbert Huber - AI Operator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engelbert Huber - AI Operator | RAG & MCP',
    description: 'Especialista en RAG, MCP e Inteligencia Artificial. Sistemas de recuperación aumentada y protocolos de comunicación de modelos.',
    creator: '@engelbert_huber',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${almarai.variable} ${instrumentSerif.variable} bg-black text-[#E1E0CC] antialiased`}
      >
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
