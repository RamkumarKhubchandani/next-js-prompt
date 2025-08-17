import { Features } from "./components/landing-page/Features";
import { Hero } from "./components/landing-page/Hero";
import { Pricing } from "./components/landing-page/Pricing";
import { HowItWorks } from "./components/landing-page/HowItWorks";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="bg-dark-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
