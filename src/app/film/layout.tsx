import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Un minuto con E. Huber · Film',
  description: 'Film de 48 segundos: asistentes que leen, deciden y ejecutan.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FilmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
