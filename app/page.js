"use client";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/landing-page/Hero';
import { Features } from './components/landing-page/Features';
import { DailyChallenges } from './components/landing-page/DailyChallenges';
import { FeaturedBlogs } from './components/landing-page/FeaturedBlogs';
import { AiQuizCta } from './components/landing-page/AiQuizCta';
import { CareerGoalPromo } from './components/landing-page/CareerGoalPromo';
import { HowItWorks } from './components/landing-page/HowItWorks';
import { CompleteCurriculumRoadmap } from './components/landing-page/CurriculumRoadmap';
import { Testimonials } from './components/landing-page/Testimonials';
import { Footer } from './components/Footer';
import LoginWall from './components/LoginWall';

export default function Home() {
  const { data: session, status } = useSession();
  const [showLoginWall, setShowLoginWall] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Check if user has already seen the login wall today
    const checkLoginWallStatus = () => {
      const loginWallData = localStorage.getItem('loginWallShown');
      if (loginWallData) {
        const { timestamp } = JSON.parse(loginWallData);
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        // If less than 24 hours have passed, don't show the wall
        if (now - timestamp < twentyFourHours) {
          return false;
        }
      }
      return true;
    };

    // Show login wall after user scrolls a bit (to let them see the content first)
    const handleScroll = () => {
      if (window.scrollY > 300 && !hasScrolled) {
        setHasScrolled(true);
        if (status === 'unauthenticated' && checkLoginWallStatus()) {
          setShowLoginWall(true);
        }
      }
    };

    // Also show after 5 seconds if they haven't scrolled
    const timer = setTimeout(() => {
      if (status === 'unauthenticated' && !showLoginWall && checkLoginWallStatus()) {
        setShowLoginWall(true);
      }
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [status, hasScrolled, showLoginWall]);

  const handleCloseLoginWall = () => {
    // Mark that user has seen the login wall
    localStorage.setItem('loginWallShown', JSON.stringify({
      timestamp: Date.now()
    }));
    setShowLoginWall(false);
  };

  return (
    <div className="bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
      <Header />
      <main className={showLoginWall && status === 'unauthenticated' ? 'blur-sm pointer-events-none' : ''}>
        <Hero />
        <Features />
        <CompleteCurriculumRoadmap />
        <DailyChallenges />
        <FeaturedBlogs />
        <AiQuizCta />
        <CareerGoalPromo />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />

      {/* Login Wall */}
      {showLoginWall && status === 'unauthenticated' && (
        <LoginWall onClose={handleCloseLoginWall} />
      )}
    </div>
  );
}
