import HeroNew from '@/components/HeroNew';
import FilmEmbed from '@/components/FilmEmbed';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import LiveSection from '@/components/LiveSection';
import CTAFooter from '@/components/CTAFooter';
import ChatClone from '@/components/ChatClone';

export default function Home() {
  return (
    <main className="bg-black">
      <HeroNew />
      <FilmEmbed />
      <AboutSection />
      <ServicesSection />
      <LiveSection />
      <CTAFooter />
      <ChatClone />
    </main>
  );
}
