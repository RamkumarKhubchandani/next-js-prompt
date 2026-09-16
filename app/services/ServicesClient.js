"use client";

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import ConnectOneToOneModal from '../components/public/ConnectOneToOneModal';
import { useSession } from 'next-auth/react';
import {
    Layout,
    Globe,
    Code2,
    Sparkles,
    CheckCircle,
    ArrowRight,
    MessageSquare,
    Zap,
    Shield,
    Layers,
    Gauge,
    Smartphone,
    Rocket,
    ChevronDown,
    Award
} from 'lucide-react';

const SERVICES = [
    {
        icon: Layout,
        title: "High-Converting Website & Landing Page Design",
        desc: "Stunning, responsive web design crafted with conversion-focused UX, modern typography, micro-animations, and mobile-first layouts.",
        deliverables: ["Custom UI/UX in Figma", "Next.js / Tailwind CSS build", "Sub-second load times", "100% SEO & schema optimized"]
    },
    {
        icon: Globe,
        title: "Full Stack SaaS & Web Application MVPs",
        desc: "End-to-end full stack web applications built with Next.js 15, React, Node.js, Express, MongoDB/PostgreSQL, Stripe billing, and OAuth security.",
        deliverables: ["Production-ready architecture", "Auth & RBAC systems", "Stripe / LemonSqueezy payments", "Admin dashboard & analytics"]
    },
    {
        icon: Gauge,
        title: "Performance Optimization & Core Web Vitals",
        desc: "Transform sluggish web apps into lightning-fast experiences. We optimize LCP, INP, CLS, reduce bundle bloat, and achieve 95+ Lighthouse scores.",
        deliverables: ["Comprehensive performance audit", "Code splitting & memoization", "Image & font optimization", "Edge CDN caching setup"]
    },
    {
        icon: Code2,
        title: "Dedicated Contract Frontend Engineering",
        desc: "Hire dedicated senior React, TypeScript, and Full Stack engineers to accelerate your roadmap, build complex UI components, and maintain high code quality.",
        deliverables: ["Senior staff engineering talent", "Daily async updates & standups", "Clean PRs with test coverage", "Flexible monthly contracts"]
    }
];

const WORKFLOW = [
    {
        step: "01",
        title: "Discovery & Architecture",
        desc: "We analyze your project requirements, user goals, and technical specifications to produce a crystal-clear roadmap."
    },
    {
        step: "02",
        title: "UI/UX & Interactive Prototype",
        desc: "We craft intuitive wireframes and interactive prototypes in Figma for your feedback before writing code."
    },
    {
        step: "03",
        title: "Clean Code & Agile Sprints",
        desc: "We develop features using Next.js, React, and Node.js with continuous preview deployments on staging servers."
    },
    {
        step: "04",
        title: "QA, CWV & Production Launch",
        desc: "Rigorous cross-browser testing, accessibility compliance (WCAG 2.1), SEO setup, and smooth zero-downtime launch."
    }
];

const FAQS = [
    {
        q: "What is your typical project delivery timeline?",
        a: "A custom high-converting marketing website or landing page typically takes 1 to 2 weeks. A full stack SaaS MVP or web application usually takes 3 to 6 weeks depending on feature complexity."
    },
    {
        q: "Do you build custom designs or use generic templates?",
        a: "Every project is designed from scratch tailored specifically to your brand, audience, and conversion objectives. We never use restrictive, bloated third-party themes."
    },
    {
        q: "Will my website be fast and SEO optimized?",
        a: "Yes! We specialize in Next.js Server-Side Rendering (SSR), static generation, automatic image optimization, and semantic Schema.org JSON-LD to ensure 95+ Lighthouse scores and top Google search discoverability."
    },
    {
        q: "Do you provide post-launch support and maintenance?",
        a: "Yes, we offer ongoing maintenance, feature expansion, server monitoring, and sprint support packages to keep your platform running smoothly."
    }
];

export default function ServicesClient() {
    const { data: session } = useSession();
    const [modalOpen, setModalOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);

    const openBooking = (note = '') => {
        setModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white selection:bg-brand-primary selection:text-slate-900">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/15 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <Sparkles size={14} />
                            Custom Web Engineering & UI/UX Design
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                            We Build Fast, Modern & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-emerald-300 to-teal-400">
                                High-Converting Websites
                            </span>
                        </h1>

                        <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
                            From conversion-driven marketing landing pages to full-scale SaaS applications. Engineered with React, Next.js 15, Node.js, and modern Design Systems.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => openBooking()}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-slate-900 bg-brand-primary hover:bg-emerald-400 shadow-xl shadow-brand-primary/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                            >
                                <Rocket size={20} />
                                Schedule Free Project Consultation
                            </button>

                            <a
                                href="https://wa.me/918237320942?text=Hi%2C%20I%20am%20interested%20in%20hiring%20OutlineDev%20for%20website%20development%20or%20design%20services."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-xl shadow-green-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                            >
                                <MessageSquare size={20} />
                                Discuss via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Our Core Development Services
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Engineered for high growth, enterprise performance, and maximum conversion rates.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {SERVICES.map((srv, idx) => {
                            const IconComp = srv.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-primary/50 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                                            <IconComp size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{srv.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">{srv.desc}</p>
                                    </div>

                                    <div className="space-y-2 border-t border-slate-800/80 pt-6">
                                        {srv.deliverables.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                                                <CheckCircle size={14} className="text-brand-primary shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="py-20 bg-slate-900 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Our 4-Step Engineering Process
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Transparent milestones, continuous staging updates, and reliable delivery.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {WORKFLOW.map((wf, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-slate-950 border border-slate-800 relative">
                                <div className="text-brand-primary font-mono text-2xl font-black mb-3">{wf.step}</div>
                                <h3 className="text-base font-bold text-white mb-2">{wf.title}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">{wf.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-slate-950 border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Common questions about our web development and design engagements.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq, idx) => {
                            const isOpen = activeFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden"
                                >
                                    <button
                                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-white hover:text-brand-primary transition-colors text-base"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown
                                            size={18}
                                            className={`transform transition-transform text-slate-400 ${
                                                isOpen ? 'rotate-180 text-brand-primary' : ''
                                            }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-6 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom Final CTA */}
            <section className="py-16 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-extrabold text-white">
                        Ready to Build Your Next Web Project?
                    </h2>
                    <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
                        Get a detailed technical estimate, architecture plan, and fixed quote within 24 hours.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => openBooking()}
                            className="px-8 py-4 rounded-xl font-extrabold text-slate-900 bg-brand-primary hover:bg-emerald-400 shadow-xl shadow-brand-primary/20 transition-all text-base"
                        >
                            Schedule Free Consultation
                        </button>
                        <a
                            href="https://wa.me/918237320942?text=Hi%2C%20I%20have%20a%20web%20development%20project%20I%20would%20like%20to%20discuss."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-xl font-extrabold text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-xl shadow-green-500/20 transition-all text-base flex items-center justify-center gap-2"
                        >
                            <MessageSquare size={18} />
                            WhatsApp Direct
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            <ConnectOneToOneModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                sessionUser={session?.user}
                headline="Discuss Your Web Project"
                subhead="Schedule a free technical discovery call with our engineering lead."
                ctaLabel="Request Project Estimate"
            />
        </div>
    );
}
