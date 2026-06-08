import HeroSection from './_components/hero-section';
import FeaturesSection from './_components/features-section';
import PerfectForSection from './_components/perfect-for-section';
import TestimonialsSection from './_components/testimonials-section';
import Footer from './_components/footer';

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Recipe Generator",
    "url": "https://recipe-generator.rulkimi.com",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "All",
    "description": "An AI-powered recipe generator. Get personalized, easy meal ideas instantly. Search recipes by ingredients to find out what to do with ingredients you have in your fridge and reduce food waste.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col bg-background text-foreground min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <PerfectForSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </>
  );
}