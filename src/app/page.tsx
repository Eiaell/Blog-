import HeroNew from '@/components/HeroNew';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import CTAFooter from '@/components/CTAFooter';

export default function Home() {
  return (
    <main className="bg-black">
      <HeroNew />
      <AboutSection />
      <ServicesSection />
      <CTAFooter />
    </main>
  );
}
