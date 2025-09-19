import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Engelbert Huber - AI Operator | RAG & MCP",
  description: "Especialista en RAG, MCP e Inteligencia Artificial. Exploro sistemas de recuperación aumentada, protocolos de comunicación de modelos y las últimas tecnologías de IA.",
  keywords: "RAG, MCP, AI, inteligencia artificial, Claude, ChatGPT, retrieval augmented generation, model communication protocol, machine learning, vector databases",
  authors: [{ name: "Engelbert Huber" }],
  creator: "Engelbert Huber",
  publisher: "Engelbert Huber",
  metadataBase: new URL('https://ehuber.lat'),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
