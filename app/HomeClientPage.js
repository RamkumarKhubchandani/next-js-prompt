"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

import { Header } from './components/Header';
import { Hero } from './components/landing-page/Hero';

// Lazy load below-the-fold components
const Features = dynamic(() => import('./components/landing-page/Features').then(mod => ({ default: mod.Features })), { ssr: true, loading: () => <SectionSkeleton /> });
const DailyChallenges = dynamic(() => import('./components/landing-page/DailyChallenges').then(mod => ({ default: mod.DailyChallenges })), { ssr: true, loading: () => <SectionSkeleton /> });
const FeaturedBlogs = dynamic(() => import('./components/landing-page/FeaturedBlogs').then(mod => ({ default: mod.FeaturedBlogs })), { ssr: true, loading: () => <SectionSkeleton /> });
const AiQuizCta = dynamic(() => import('./components/landing-page/AiQuizCta').then(mod => ({ default: mod.AiQuizCta })), { ssr: true, loading: () => <SectionSkeleton /> });
const CareerGoalPromo = dynamic(() => import('./components/landing-page/CareerGoalPromo').then(mod => ({ default: mod.CareerGoalPromo })), { ssr: true, loading: () => <SectionSkeleton /> });
const HowItWorks = dynamic(() => import('./components/landing-page/HowItWorks').then(mod => ({ default: mod.HowItWorks })), { ssr: true, loading: () => <SectionSkeleton /> });
const CurriculumRoadmap = dynamic(() => import('./components/landing-page/CurriculumRoadmap').then(mod => ({ default: mod.CompleteCurriculumRoadmap })), { ssr: true, loading: () => <SectionSkeleton /> });
const Testimonials = dynamic(() => import('./components/landing-page/Testimonials').then(mod => ({ default: mod.Testimonials })), { ssr: true, loading: () => <SectionSkeleton /> });
const Footer = dynamic(() => import('./components/Footer').then(mod => ({ default: mod.Footer })), { ssr: true });
// Loading Skeleton
const SectionSkeleton = () => (
    <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl my-8 px-8" />
);

export default function HomeClientPage() {
    const { data: session, status } = useSession();

    return (
        <div className="bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
            <Header />
            <main>
                <Hero />
                <Features />
                <CurriculumRoadmap />
                <DailyChallenges />
                <FeaturedBlogs />
                <AiQuizCta />
                <CareerGoalPromo />
                <HowItWorks />
                <Testimonials />
            </main>
            <Footer />
        </div>
    );
}
