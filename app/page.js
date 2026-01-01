import { Header } from './components/Header';
import { Hero } from './components/landing-page/Hero';
import { Features } from './components/landing-page/Features';
import { DailyChallenges } from './components/landing-page/DailyChallenges';
import { FeaturedBlogs } from './components/landing-page/FeaturedBlogs';
import { AiQuizCta } from './components/landing-page/AiQuizCta';
import { HowItWorks } from './components/landing-page/HowItWorks';
import { Pricing } from './components/landing-page/Pricing';
import { Testimonials } from './components/landing-page/Testimonials';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
      <Header />
      <main>
        <Hero />
        <Features />
        <DailyChallenges />
        <FeaturedBlogs />
        <AiQuizCta />
        <HowItWorks />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
