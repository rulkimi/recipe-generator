import HeroSection from './_components/hero-section';
import FeaturesSection from './_components/features-section';
import PerfectForSection from './_components/perfect-for-section';
import TestimonialsSection from './_components/testimonials-section';
import Footer from './_components/footer';

export default function LandingPage() {
  return (
    <main className="flex flex-col bg-background text-foreground min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PerfectForSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}