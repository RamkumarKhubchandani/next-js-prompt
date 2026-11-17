import React from 'react';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { safeJsonLd } from '@/app/lib/schema-helpers';
import { COURSE_INDIA, isSet, isTodo, getUpcomingBatches } from '@/app/lib/course-india';
import { COURSE_FAQS } from '@/app/lib/course-faq';
import { REAL_REVIEWS, GOOGLE_RATING, formatAsOfDate } from '@/app/lib/reviews';
import { VIDEOS } from '@/app/lib/videos';
import YouTubeFacade from '@/app/components/public/YouTubeFacade';
import CourseFaqAccordion from './CourseFaqAccordion';
import CourseEnquiryForm from './CourseEnquiryForm';
import {
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  ShieldCheck,
  Code2,
  Terminal,
  Database,
  Globe,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Star,
  Sparkles,
  HelpCircle,
  Laptop,
  Users,
} from 'lucide-react';

export const revalidate = 86400; // 24-hour ISR revalidation

export const metadata = {
  title: COURSE_INDIA.metaTitle,
  description: COURSE_INDIA.metaDescription,
  alternates: {
    canonical: COURSE_INDIA.canonical,
  },
  openGraph: {
    title: COURSE_INDIA.metaTitle,
    description: COURSE_INDIA.metaDescription,
    url: COURSE_INDIA.canonical,
    siteName: 'OutlineDev',
    locale: COURSE_INDIA.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: COURSE_INDIA.metaTitle,
    description: COURSE_INDIA.metaDescription,
  },
};

export default function FullStackLiveCoursePage() {
  const upcomingBatches = getUpcomingBatches();
  const nextBatch = upcomingBatches[0];

  // 4 most relevant reviews for full-stack, React, and foundational instruction
  const highlightedReviews = [
    REAL_REVIEWS.find((r) => r.name === 'Nitin Jangra') || REAL_REVIEWS[1],
    REAL_REVIEWS.find((r) => r.name === 'vick') || REAL_REVIEWS[0],
    REAL_REVIEWS.find((r) => r.name === 'Khanak Tyagi') || REAL_REVIEWS[0],
    REAL_REVIEWS.find((r) => r.name === 'Komal Sharma') || REAL_REVIEWS[2],
  ].filter(Boolean);

  // Real student feedback videos (IDs from VIDEOS constant)
  const feedbackVideos = VIDEOS.slice(0, 2);

  // Structured Data (Course with CourseInstance per upcoming batch + FAQPage). Zero aggregateRating.
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${COURSE_INDIA.canonical}#course`,
        name: COURSE_INDIA.title,
        description: COURSE_INDIA.metaDescription,
        provider: {
          '@type': 'Organization',
          name: 'OutlineDev',
          url: 'https://www.outlinedev.com',
          logo: 'https://www.outlinedev.com/logo-outlinedev-icon.png',
          '@id': 'https://www.outlinedev.com/#organization',
        },
        instructor: {
          '@type': 'Person',
          name: COURSE_INDIA.instructor.name,
          jobTitle: COURSE_INDIA.instructor.title,
          sameAs: [
            COURSE_INDIA.instructor.links.linkedin,
            COURSE_INDIA.instructor.links.github,
          ],
        },
        hasCourseInstance: upcomingBatches.map((b) => ({
          '@type': 'CourseInstance',
          courseMode: 'online',
          startDate: b.startDate,
          instructor: {
            '@type': 'Person',
            name: COURSE_INDIA.instructor.name,
          },
          offers: {
            '@type': 'Offer',
            price: String(COURSE_INDIA.fee),
            priceCurrency: COURSE_INDIA.currency,
            category: 'Paid',
            availability: 'https://schema.org/InStock',
            url: COURSE_INDIA.canonical,
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${COURSE_INDIA.canonical}#faq`,
        mainEntity: COURSE_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
      <Header />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32 space-y-24">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO WITH FACTS BOX                                            */}
        {/* ========================================================================= */}
        <section aria-labelledby="hero-heading" className="space-y-10 pt-4">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cohort-Based Live Technical Coaching • India</span>
            </div>

            <h1
              id="hero-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]"
            >
              Full Stack Live Coding Course
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
              A hands-on, 40-hour live cohort taking you from fundamental HTML, CSS, and asynchronous JavaScript to building, persisting, and deploying full-stack web applications with React, Node.js, Express, and SQLite.
            </p>

            {/* Last updated and author byline linking /about */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
              <span>Last updated: {COURSE_INDIA.lastUpdated}</span>
              <span>•</span>
              <span>
                By {COURSE_INDIA.instructor.name} (
                <Link
                  href={COURSE_INDIA.instructor.aboutUrl}
                  prefetch={false}
                  className="text-emerald-400 hover:underline font-medium"
                >
                  About the instructor
                </Link>
                )
              </span>
            </div>
          </div>

          {/* Quick Facts Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Total Hours
              </span>
              <p className="text-lg font-black text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COURSE_INDIA.hours} Hours</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{COURSE_INDIA.sessions}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Course Fee
              </span>
              <p className="text-lg font-black text-emerald-400">
                {COURSE_INDIA.feeFormatted}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{COURSE_INDIA.feeNote}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Format
              </span>
              <p className="text-lg font-black text-white flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live Online</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">Interactive code-along</p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Next Cohort
              </span>
              <p className="text-lg font-black text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{nextBatch?.formattedDate || 'Upcoming'}</span>
              </p>
              <p className="text-xs text-emerald-400/90 font-medium mt-0.5">
                {nextBatch?.label || 'Pilot batch'}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Refund Policy
              </span>
              <p className="text-lg font-black text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full refund</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{COURSE_INDIA.refundWindow}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Lead Mentor
              </span>
              <p className="text-base font-bold text-white truncate">
                {COURSE_INDIA.instructor.name}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {COURSE_INDIA.instructor.title}
              </p>
            </div>

            {isSet(COURSE_INDIA.sessionTimings) && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Session Timings
                </span>
                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Morning or Evening</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">10 AM–12 PM or 5–7 PM IST</p>
              </div>
            )}
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#booking-form"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Book a free 15-minute call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#syllabus"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-sm transition inline-flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Explore 20-Day Syllabus</span>
            </a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: WHO IT IS FOR AND WHO IT IS NOT FOR                             */}
        {/* ========================================================================= */}
        <section aria-labelledby="target-audience-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="target-audience-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Who This Course Is For — And Who It Is NOT For
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              We value your time and financial commitment. We do not accept students indiscriminately. Review these two profiles carefully before applying.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Who It Is For */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <h3 className="text-lg font-bold text-white">This course is designed for:</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Beginners and self-taught learners</strong> who have tried watching random YouTube tutorials but struggle to connect the pieces into working full-stack applications.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>College students (BCA, MCA, B.Tech, BSc CS)</strong> who want portfolio-grade software on GitHub rather than textbook memorization.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Working professionals or QA engineers</strong> aiming to transition into web engineering with production-grade JavaScript, React, and Node.js competence.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Learners willing to put in the work</strong>: attending 4 live hours per week and dedicating 5 to 8 hours to solo coding exercises between sessions.</span>
                </li>
              </ul>
            </div>

            {/* Who It Is NOT For */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-red-500/30 space-y-4">
              <div className="flex items-center gap-2 text-red-400">
                <XCircle className="w-5 h-5 shrink-0" />
                <h3 className="text-lg font-bold text-white">This course is NOT for:</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✗</span>
                  <span><strong>Job guarantee seekers</strong>: We do not promise job placements, interviews, or salary packages. Anyone guaranteeing a 6-figure developer job after 40 hours is being dishonest.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✗</span>
                  <span><strong>Passive video watchers</strong>: If you plan to attend with your camera and keyboard off while scrolling on your phone, you will not gain the coding muscle memory required.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✗</span>
                  <span><strong>Accredited degree collectors</strong>: We issue a certificate of coursework completion from OutlineDev, not a government or university accredited academic degree.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✗</span>
                  <span><strong>Experienced mid/senior engineers</strong> who already build and deploy React, Express, and SQL apps in production daily. This course focuses on foundational and intermediate craftsmanship.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: WHAT YOU WILL BUILD                                            */}
        {/* ========================================================================= */}
        <section aria-labelledby="projects-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="projects-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What You Will Build (Real Proof of Work)
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              Employers hire developers who can show working code, clean commit histories, and thoughtful architecture. You will build and deploy three substantial projects from scratch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Project 1 • Module 1
              </span>
              <h3 className="text-lg font-bold text-white">
                Accessible Portfolio & Landing Page
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A mobile-first, semantic website featuring custom Flexbox navigation, CSS Grid responsive content cards, accessible form validation, and CSS Custom Properties for theme tokens.
              </p>
              <div className="pt-2 text-xs text-slate-400 font-mono space-y-1">
                <p><strong>Stack:</strong> Semantic HTML5, CSS3, Flexbox, Grid</p>
                <p><strong>Deployment:</strong> Live on GitHub Pages</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Project 2 • Module 2
              </span>
              <h3 className="text-lg font-bold text-white">
                GitHub API Search & Analytics Explorer
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                An asynchronous single-page explorer that interfaces with public APIs. Features real-time search debouncing, loading spinners, error state management, and localStorage caching.
              </p>
              <div className="pt-2 text-xs text-slate-400 font-mono space-y-1">
                <p><strong>Stack:</strong> Vanilla ES6+ JS, Fetch API, Async/Await</p>
                <p><strong>Deployment:</strong> GitHub Pages / Vercel</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-3 shadow-lg shadow-emerald-500/5">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Capstone Project • Modules 4 & 5
              </span>
              <h3 className="text-lg font-bold text-white">
                Full-Stack Task & Booking Management Portal
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A production-ready full-stack web application. Includes user registration, password hashing (bcrypt), token-based authentication (JWT), relational database schema with SQLite, Express REST API, and a reactive React frontend with multi-page routing.
              </p>
              <div className="pt-2 text-xs text-slate-400 font-mono space-y-1">
                <p><strong>Stack:</strong> React 18, Node.js, Express, SQLite, JWT</p>
                <p><strong>Deployment:</strong> Vercel (Client) + Render/Railway (API + Persistent Disk)</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: FULL DAY-BY-DAY SYLLABUS (ALL 20 DAYS)                         */}
        {/* ========================================================================= */}
        <section id="syllabus" className="scroll-mt-24 space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Full Day-by-Day Syllabus (20 Sessions / 40 Hours)
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              Every single session is 2 hours of live, interactive instruction and hands-on coding. No filler lectures. Here is the exact plan for all 20 days.
            </p>
          </div>

          <div className="space-y-10">
            {COURSE_INDIA.syllabus.map((module) => (
              <div key={module.moduleNumber} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Module {module.moduleNumber}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {module.moduleTitle}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono font-semibold">
                    {module.hours} Live Hours • {module.days.length} Sessions
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {module.days.map((day) => (
                    <div
                      key={day.day}
                      className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Day {day.day}
                          </span>
                          <span>{day.title}</span>
                        </h4>
                      </div>

                      <div className="text-xs sm:text-sm text-slate-300 space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Core Topics Covered:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-400 list-disc list-inside">
                          {day.topics.map((t, idx) => (
                            <li key={idx} className="leading-snug">{t}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800/60">
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                          <strong className="block text-emerald-400 mb-0.5">Hands-On Exercise:</strong>
                          <p className="text-slate-300">{day.exercise}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                          <strong className="block text-slate-200 mb-0.5">Session Outcome:</strong>
                          <p className="text-slate-400">{day.outcome}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: TOOLS AND WHY (EXPLAIN SQLITE CHOICE AND ITS LIMITS)             */}
        {/* ========================================================================= */}
        <section aria-labelledby="tools-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="tools-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tools We Use — And Why We Chose SQLite
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              Every tool in our stack was chosen intentionally to maximize learning speed, eliminate configuration headaches, and build transferable software engineering intuition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSE_INDIA.tools.map((tool) => (
              <div key={tool.name} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {tool.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {tool.description}
                </p>
                {tool.limits && (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-200 leading-relaxed mt-2">
                    <strong className="block text-amber-300 mb-0.5">Honest Limitations:</strong>
                    {tool.limits}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: WHAT IS NOT COVERED                                            */}
        {/* ========================================================================= */}
        <section aria-labelledby="not-covered-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="not-covered-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What Is Deliberately NOT Covered in This Course
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              A 40-hour foundational course that promises to teach 25 different frameworks is selling illusions. To achieve true mastery, we deliberately exclude the following tools:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSE_INDIA.notCovered.map((item) => (
              <div key={item.name} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: HOW A SESSION WORKS                                            */}
        {/* ========================================================================= */}
        <section aria-labelledby="session-flow-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="session-flow-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How a Live Session Works (2 Hours, Code-Along)
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              Forget passive lectures where a teacher reads from PowerPoint slides. Our pedagogical rhythm mirrors how senior software engineers mentor junior teammates in real tech companies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 block">01 • First 15 Mins</span>
              <h3 className="text-base font-bold text-white">Review & Unblocking</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We review common stumbling blocks from the previous day’s exercise. Students share their screens, and we debug errors together in real-time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 block">02 • Next 45 Mins</span>
              <h3 className="text-base font-bold text-white">Concept Live Coding</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The instructor introduces the day’s core topic by writing clean code in an empty editor window. You code along on your own machine.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 block">03 • Next 45 Mins</span>
              <h3 className="text-base font-bold text-white">Solo & Paired Exercises</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                You build a specific feature or solve a debugging challenge independently while the instructor stays live to answer questions and inspect code.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 block">04 • Final 15 Mins</span>
              <h3 className="text-base font-bold text-white">Git Commit & Progress</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                You commit your working code to your GitHub repo and push the branch. Code review on your capstone project (Day 14 and Day 19).
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: INSIDE A LIVE CLASS                                              */}
        {/* ========================================================================= */}
        <section aria-labelledby="inside-live-class-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="inside-live-class-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Inside a Live Class
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              Real sessions from our live batches. Shown with the students&apos; permission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <figure className="space-y-2">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <img
                  src="/course-proof/live-class-1.webp"
                  width={1310}
                  height={492}
                  loading="lazy"
                  decoding="async"
                  alt="Live full-stack class on a video call with students, led by Ramkumar Khubchandani"
                  className="w-full h-auto object-cover"
                />
              </div>
              <figcaption className="text-xs text-slate-400 text-center font-medium">
                Live batch session
              </figcaption>
            </figure>

            <figure className="space-y-2">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <img
                  src="/course-proof/live-class-2.webp"
                  width={1350}
                  height={508}
                  loading="lazy"
                  decoding="async"
                  alt="Mentor and students together in a live coding session"
                  className="w-full h-auto object-cover"
                />
              </div>
              <figcaption className="text-xs text-slate-400 text-center font-medium">
                Students and mentor
              </figcaption>
            </figure>

            <figure className="space-y-2">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <img
                  src="/course-proof/live-class-screenshare.webp"
                  width={1218}
                  height={684}
                  loading="lazy"
                  decoding="async"
                  alt="Mentor sharing his screen to explain code to a student during a live class"
                  className="w-full h-auto object-cover"
                />
              </div>
              <figcaption className="text-xs text-slate-400 text-center font-medium">
                Screen-share code walkthrough
              </figcaption>
            </figure>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <YouTubeFacade id="CBIWcozgDFM" title="Live session recording" />
              <p className="text-xs text-slate-400 text-center font-medium">
                Live session recording
              </p>
            </div>
            <div className="space-y-2">
              <YouTubeFacade id="cVMBc8hK3-8" title="Live session recording" />
              <p className="text-xs text-slate-400 text-center font-medium">
                Live session recording
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8: BATCH TABLE                                                    */}
        {/* ========================================================================= */}
        <section id="batches" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Upcoming Cohort Schedule (India)
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              We run focused cohorts with scheduled start dates. Below are all upcoming batches starting today or later. We never use fake countdown timers or fabricated seat scarcity.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">Start Date</th>
                  <th className="py-4 px-6">Cohort Type</th>
                  <th className="py-4 px-6">Format</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {upcomingBatches.map((batch) => (
                  <tr key={batch.startDate} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-6 font-bold text-white font-mono">
                      {batch.formattedDate}
                    </td>
                    <td className="py-4 px-6">
                      {batch.isPilot ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          <Sparkles className="w-3 h-3" />
                          <span>{batch.label}</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300">{batch.label}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-300">Live Online</td>
                    <td className="py-4 px-6 text-slate-400 text-xs">
                      20 Sessions (40h)
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a
                        href="#booking-form"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline"
                      >
                        <span>Select this batch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 9: HOW TO JOIN                                                    */}
        {/* ========================================================================= */}
        <section aria-labelledby="how-to-join-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="how-to-join-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How to Join (Step-by-Step Enrollment)
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              We do not accept payments directly on the website without a mutual conversation. We ensure every enrolled student has the right setup and realistic expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Book a Free 15-Min Call</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fill out the brief consultation form below. We schedule a quick 1-on-1 video call to understand your learning goals and answer any specific technical questions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Pay by UPI After the Call</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If both you and the mentor agree the course is a match, you complete your fee payment of ₹10,000 directly via UPI (Google Pay, PhonePe, Paytm, or BHIM).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Onboarding & Official Receipt</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                You immediately receive an official payment receipt, access to the cohort GitHub repository, calendar invites for all 20 sessions, and a pre-course setup guide.
              </p>
            </div>
          </div>

          {/* Direct Contact Block */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Have questions before booking?</h3>
              <p className="text-xs text-slate-400 mt-0.5">Reach out directly to discuss syllabus details, batch schedule, or prerequisites.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {isSet(COURSE_INDIA.whatsappNumber) && (
                <a
                  href="https://wa.me/918237320942?text=Hi%2C%20I%20want%20to%20join%20the%20Full%20Stack%20Live%20Course"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              )}
              {isSet(COURSE_INDIA.callNumber) && (
                <a
                  href={`tel:${COURSE_INDIA.callNumber}`}
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition"
                >
                  <span>Call us: {COURSE_INDIA.callNumberDisplay}</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 10: FEE AND REFUND                                                */}
        {/* ========================================================================= */}
        <section aria-labelledby="fee-refund-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="fee-refund-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Course Fee and Refund
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              Transparent, all-inclusive pricing with zero hidden charges.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Total Investment
                </span>
                <div className="text-4xl sm:text-5xl font-black text-emerald-400 mt-1">
                  {COURSE_INDIA.feeFormatted}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {COURSE_INDIA.feeNote} • All-inclusive for the entire 40-hour live course
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>20 live sessions (2 hours each, 40 total live hours)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Code review on your capstone project (Day 14 and Day 19)</span>
                </li>
                {isSet(COURSE_INDIA.recordings) && (
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{COURSE_INDIA.recordings}</span>
                  </li>
                )}
                {isSet(COURSE_INDIA.refundWindow) && (
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{COURSE_INDIA.refundWindow}</span>
                  </li>
                )}
                {isSet(COURSE_INDIA.sessionTimings) && (
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{COURSE_INDIA.sessionTimings}</span>
                  </li>
                )}
                {isSet(COURSE_INDIA.languageOfTeaching) && (
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Language of instruction: {COURSE_INDIA.languageOfTeaching}</span>
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lifetime access to course repos, boilerplates, and notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certificate of completion from OutlineDev</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-5 h-5" />
                <span>Full Refund Policy</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full refund until the end of Session 2. If you attend the initial sessions and feel that the instruction style, technical depth, or cohort pace is not right for you, you can request a full refund.
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Refunds are processed back to your originating UPI account with zero hassle. We only want students who genuinely benefit from our live coaching.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 11: INSTRUCTOR                                                    */}
        {/* ========================================================================= */}
        <section aria-labelledby="instructor-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="instructor-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Meet Your Lead Instructor
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              You learn directly from an active senior software engineer with over a decade of real production experience.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
              <img
                src="https://ui-avatars.com/api/?name=Ramkumar+Khubchandani&background=0284c7&color=fff&size=256"
                alt="Ramkumar Khubchandani"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-white">
                  {COURSE_INDIA.instructor.name}
                </h3>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {COURSE_INDIA.instructor.title}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {COURSE_INDIA.instructor.experience}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {COURSE_INDIA.instructor.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                <a
                  href={COURSE_INDIA.instructor.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-semibold"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={COURSE_INDIA.instructor.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold"
                >
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href={COURSE_INDIA.instructor.aboutUrl}
                  prefetch={false}
                  className="text-slate-400 hover:text-slate-200 underline"
                >
                  Read full engineering background
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 12: REVIEWS & SOCIAL PROOF                                        */}
        {/* ========================================================================= */}
        <section aria-labelledby="reviews-heading" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <h2 id="reviews-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Reviews from Google
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Real reviews from developers and students coached by Ramkumar Khubchandani.
              </p>
            </div>

            {/* Google Rating Line (No aggregateRating schema, purely visible text) */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-amber-400 flex items-center">
                ★★★★★
              </span>
              <a
                href={GOOGLE_RATING.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-emerald-400 transition"
              >
                Rated {GOOGLE_RATING.value} on Google ({GOOGLE_RATING.count} reviews)
              </a>
              <span className="text-slate-500 text-[11px]">
                as of {formatAsOfDate(GOOGLE_RATING.asOf)}
              </span>
            </div>
          </div>

          {/* 4 Most Relevant Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlightedReviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.img}
                      alt={rev.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full bg-slate-800"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">{rev.name}</h3>
                      <p className="text-[11px] text-slate-400">{rev.role || 'Developer'}</p>
                    </div>
                  </div>
                  <span className="text-xs text-amber-400 font-mono">★★★★★</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  Source: {rev.source}
                </div>
              </div>
            ))}
          </div>

          {/* Student Video Feedback Facades (No next/image, no autoplay) */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-white">Video Walkthroughs & Student Stories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {feedbackVideos.map((vid) => (
                <div key={vid.id} className="space-y-2">
                  <YouTubeFacade id={vid.id} title={vid.title} />
                  <p className="text-xs text-slate-400 text-center font-medium">
                    Verified student walkthrough with OutlineDev mentorship
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 13: HOW THIS COMPARES TABLE                                       */}
        {/* ========================================================================= */}
        <section aria-labelledby="comparison-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="comparison-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How This Compares With Other Learning Formats
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              An honest comparison across learning options. We do not name competitors or invent statistics.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5">Factor</th>
                  <th className="py-4 px-5 text-emerald-400 font-extrabold">OutlineDev Live Course</th>
                  <th className="py-4 px-5">Pre-Recorded Video Courses</th>
                  <th className="py-4 px-5">Self-Directed YouTube/Docs</th>
                  <th className="py-4 px-5">6-Month Full-Time Bootcamps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3.5 px-5 font-bold text-white">Live Feedback</td>
                  <td className="py-3.5 px-5 text-emerald-300 font-semibold">Immediate in-class debugging</td>
                  <td className="py-3.5 px-5 text-slate-400">None (Inactive forum/comments)</td>
                  <td className="py-3.5 px-5 text-slate-400">None (Solo StackOverflow searches)</td>
                  <td className="py-3.5 px-5">Yes (Often with junior teaching assistants)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-white">Code Review</td>
                  <td className="py-3.5 px-5 text-emerald-300 font-semibold">1-on-1 GitHub PR review by Principal Engineer</td>
                  <td className="py-3.5 px-5 text-slate-400">None</td>
                  <td className="py-3.5 px-5 text-slate-400">None</td>
                  <td className="py-3.5 px-5">Automated tests or peer reviews</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-white">Cost</td>
                  <td className="py-3.5 px-5 text-emerald-300 font-semibold">₹10,000 all-inclusive</td>
                  <td className="py-3.5 px-5">₹500 - ₹3,000</td>
                  <td className="py-3.5 px-5">Free</td>
                  <td className="py-3.5 px-5">₹1,50,000 - ₹3,00,000+</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-white">Time Commitment</td>
                  <td className="py-3.5 px-5 text-emerald-300 font-semibold">40 live hours (4h/week over 10 weeks)</td>
                  <td className="py-3.5 px-5">Self-paced (90%+ dropout rate)</td>
                  <td className="py-3.5 px-5">Unstructured (Easy to get lost in tutorial hell)</td>
                  <td className="py-3.5 px-5">40+ hours/week for 6 months</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-white">Database Philosophy</td>
                  <td className="py-3.5 px-5 text-emerald-300 font-semibold">Real SQL with SQLite (zero latency, zero cloud cost)</td>
                  <td className="py-3.5 px-5">Often abstracted behind complex ORMs</td>
                  <td className="py-3.5 px-5">Fragmented across tutorials</td>
                  <td className="py-3.5 px-5">Heavy MongoDB or PostgreSQL setup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 14: WHAT IS A FULL STACK DEVELOPER & SHORT ROADMAP                */}
        {/* ========================================================================= */}
        <section aria-labelledby="roadmap-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="roadmap-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What Is a Full Stack Developer — And the Roadmap Ahead
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              A full-stack developer is not someone who has memorized every tool. A full-stack developer understands the full lifecycle of a user action across client, server, and persistent database.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400">Tier 1 • Client Side</span>
                <h3 className="text-base font-bold text-white">Browser Presentation</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  HTML structure, responsive CSS layout, user interaction events, state management, and API calls via React and React Router.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400">Tier 2 • Server Side</span>
                <h3 className="text-base font-bold text-white">Business Logic & APIs</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Node.js runtime, Express routing, input validation, authentication tokens (JWT), password hashing (bcrypt), and error handling.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400">Tier 3 • Database</span>
                <h3 className="text-base font-bold text-white">Data Persistence</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Relational SQL schema, tables, foreign keys, prepared statements, and ACID-compliant transactional queries via SQLite.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
              <h4 className="font-bold text-white text-base">Your Learning Path Beyond the 40 Hours:</h4>
              <p>
                Once you finish this course and deploy your capstone application, you possess a firm conceptual foundation. From there, your next self-study steps become clear and manageable:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 pt-1">
                <li><strong>Add TypeScript</strong> to your existing React and Express codebase to catch compile-time type errors.</li>
                <li><strong>Explore Next.js</strong> once you already understand how client-side SPAs and raw Express REST APIs work under the hood.</li>
                <li><strong>Introduce PostgreSQL</strong> when your application scales to multi-server concurrent writer architecture.</li>
                <li><strong>Write Automated Tests</strong> with Playwright or Vitest to safeguard your critical business workflows.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 15: FAQ ACCORDION (20 FAQS)                                       */}
        {/* ========================================================================= */}
        <section aria-labelledby="faq-heading" className="space-y-8">
          <div className="space-y-2">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions (20 Detailed Answers)
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              Transparent, plain-English answers covering prerequisites, hardware, refund policies, curriculum choices, and career honesty.
            </p>
          </div>

          <CourseFaqAccordion />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 16: RELATED GUIDES                                                */}
        {/* ========================================================================= */}
        <section aria-labelledby="guides-heading" className="space-y-6 pt-4 border-t border-slate-800">
          <div className="space-y-1">
            <h2 id="guides-heading" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Related Engineering Guides & Free Tutorials
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Read our in-depth technical posts to see how we write code, explain trade-offs, and structure real-world applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/tutorials/javascript-array-crud-operations-methods-push-pop-slice-splice"
              prefetch={false}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition block space-y-2"
            >
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">JavaScript</span>
              <h3 className="text-sm font-bold text-white leading-snug">
                JavaScript Array CRUD Operations
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                Learn modern array methods like map, filter, reduce, slice, and splice with practical examples.
              </p>
            </Link>

            <Link
              href="/tutorials/mastering-useeffect"
              prefetch={false}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition block space-y-2"
            >
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">React</span>
              <h3 className="text-sm font-bold text-white leading-snug">
                Mastering useEffect in React
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                A definitive guide to component lifecycles, synchronization, dependency arrays, and cleanup.
              </p>
            </Link>

            <Link
              href="/tutorials/node-native-sqlite"
              prefetch={false}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition block space-y-2"
            >
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Node.js & SQLite</span>
              <h3 className="text-sm font-bold text-white leading-snug">
                Node.js Native SQLite Guide
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                Why SQLite is taking over lightweight production backends and how to use it safely in Node.
              </p>
            </Link>

            <Link
              href="/tutorials/nodejs-developer-vs-freelancer-vs-agency"
              prefetch={false}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition block space-y-2"
            >
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Career & Freelance</span>
              <h3 className="text-sm font-bold text-white leading-snug">
                Node.js Developer vs Freelancer vs Agency
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                An honest analysis of contract engineering models, expectations, and compensation factors.
              </p>
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CTA FORM SECTION (INTERACTIVE BOOKING FORM)                               */}
        {/* ========================================================================= */}
        <section aria-label="Book your free consultation call" className="pt-8">
          <CourseEnquiryForm defaultBatch={nextBatch?.startDate} />
        </section>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 shadow-2xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Next Batch: {nextBatch?.formattedDate || 'Upcoming'}</span>
            </span>
            <span className="text-xs text-slate-300 font-semibold hidden md:inline">
              {COURSE_INDIA.feeFormatted} ({COURSE_INDIA.feeNote}) • {COURSE_INDIA.refundWindow}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 text-xs font-bold">
            <a
              href="#booking-form"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold transition shadow-md shadow-emerald-500/20"
            >
              Book Free Call
            </a>
            {isSet(COURSE_INDIA.whatsappNumber) && (
              <a
                href="https://wa.me/918237320942?text=Hi%2C%20I%20want%20to%20join%20the%20Full%20Stack%20Live%20Course"
                target="_blank"
                rel="noopener"
                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition"
              >
                Chat on WhatsApp
              </a>
            )}
            {isSet(COURSE_INDIA.callNumber) && (
              <a
                href={`tel:${COURSE_INDIA.callNumber}`}
                rel="noopener"
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition"
              >
                Call us: {COURSE_INDIA.callNumberDisplay}
              </a>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
