import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const HIRE_SERVICES = [
  {
    title: 'React Developer',
    href: '/hire/react-developer',
    description: 'Booking flows, scheduling interfaces, component architecture, and accessibility-first web applications.'
  },
  {
    title: 'Next.js Developer',
    href: '/hire/nextjs-developer',
    description: 'Fast, search-friendly websites with App Router, SSR/ISR caching strategies, and clean technical SEO.'
  },
  {
    title: 'Full Stack Developer',
    href: '/hire/full-stack-developer',
    description: 'End-to-end web products uniting React or Next.js frontends with robust Node.js and MongoDB backends.'
  },
  {
    title: 'TypeScript Developer',
    href: '/hire/typescript-developer',
    description: 'Strongly typed, maintainable codebases across React, Next.js, and Node.js, plus safe JS-to-TS migrations.'
  },
  {
    title: 'Node.js Developer',
    href: '/hire/nodejs-developer',
    description: 'High-performance REST and GraphQL APIs, backend architecture, background queues, and database tuning.'
  },
  {
    title: 'Vue.js Developer',
    href: '/hire/vuejs-developer',
    description: 'Reactive single-page apps with Vue 3, Composition API, Pinia state management, and Nuxt 3 portals.'
  },
  {
    title: 'React Native Developer',
    href: '/hire/react-native-developer',
    description: 'Cross-platform iOS and Android mobile apps built with Expo or React Native CLI and native integrations.'
  },
  {
    title: 'Redux Developer',
    href: '/hire/redux-developer',
    description: 'Predictable state architectures using Redux Toolkit (RTK), RTK Query caching, and legacy Redux refactoring.'
  }
];

export default function HomeHireSection() {
  return (
    <section className="py-20 bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-dark-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-900 dark:text-light-100 tracking-tight">
            Hire a Freelance Developer
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            I'm Ramkumar Khubchandani, a software engineer with 12+ years of industry experience. I take on freelance development and technical consulting across React, Next.js, Node.js, Vue, React Native, Redux, TypeScript, and full-stack systems. Rates start from $30/hr, with fixed-price quotes provided for clearly defined deliverables after an intro call. All invoices and payment terms are arranged directly with me — no payments, platform fees, or contracts are processed through this site.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HIRE_SERVICES.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              prefetch={false}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-gray-50 dark:bg-dark-800/60 border border-gray-200/80 dark:border-dark-700 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-dark-900 dark:text-light-100 group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <ArrowUpRight size={18} className="text-gray-400 group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-200/60 dark:border-dark-700/60 flex items-center text-xs font-semibold text-brand-primary">
                <span>View scope & rates</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
