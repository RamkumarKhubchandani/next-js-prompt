import { Header } from './components/Header';
import { Hero } from './components/landing-page/Hero';
import { Features } from './components/landing-page/Features';
import { AiQuizCta } from './components/landing-page/AiQuizCta';
import { HowItWorks } from './components/landing-page/HowItWorks';
import { Pricing } from './components/landing-page/Pricing';
import { Testimonials } from './components/landing-page/Testimonials';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="bg-dark-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <AiQuizCta />
        <HowItWorks />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
