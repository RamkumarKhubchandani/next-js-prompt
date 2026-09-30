import React from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { HIRE_SHARED, HIRE_PAGES } from '@/app/lib/hire-data';
import HireInquiryForm from '@/app/components/hire/HireInquiryForm';

export const dynamicParams = false;

export async function generateStaticParams() {
    return Object.keys(HIRE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const page = HIRE_PAGES[slug];
    if (!page) return {};

    return {
        title: page.title,
        description: page.description,
        alternates: {
            canonical: `https://www.outlinedev.com/hire/${slug}`,
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: page.title,
            description: page.description,
            url: `https://www.outlinedev.com/hire/${slug}`,
            type: 'website',
        },
    };
}

export default async function HireDeveloperPage({ params }) {
    const { slug } = await params;
    const page = HIRE_PAGES[slug];

    if (!page) {
        notFound();
    }

    const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

    // Service JSON-LD Schema (no ratings, no reviews, no worksFor)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": page.h1,
        "serviceType": page.skill,
        "description": page.description,
        "url": `https://www.outlinedev.com/hire/${slug}`,
        "provider": {
            "@type": "Person",
            "name": HIRE_SHARED.name,
            "sameAs": [
                "https://www.linkedin.com/in/ramkumar-khubchandani-b7097a81/"
            ]
        },
        "areaServed": "Worldwide"
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-primary selection:text-slate-950">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />

            <main className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <header className="border-b border-slate-200 dark:border-slate-800 pb-12 pt-6">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                        {HIRE_SHARED.name} • {HIRE_SHARED.experience}
                    </p>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-6">
                        {page.h1}
                    </h1>

                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                        {page.intro}
                    </p>

                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-8">
                        💰 <strong className="text-slate-900 dark:text-white">Rate:</strong> {HIRE_SHARED.rate}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        {bookingUrl && (
                            <a
                                href={bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-brand-primary hover:bg-emerald-400 transition-colors"
                            >
                                Book a 20-minute call
                            </a>
                        )}
                        <a
                            href="#inquiry-form"
                            className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        >
                            Send an inquiry
                        </a>
                    </div>
                </header>

                {/* What I Build */}
                <section className="py-12 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        What I Build
                    </h2>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-base">
                        {page.whatIBuild.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="text-brand-primary font-bold mt-0.5">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Selected Projects */}
                <section className="py-12 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        Selected Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {page.projects.map((projKey) => {
                            const proj = HIRE_SHARED[projKey];
                            if (!proj) return null;
                            // Strip // TODO note from the rendered description
                            const cleanDescription = proj.description.split('// TODO')[0].trim();

                            return (
                                <article
                                    key={projKey}
                                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                            {proj.type}
                                        </span>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-3 mb-2">
                                            {proj.name}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                            {cleanDescription}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        {proj.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                {/* Testimonial */}
                <section className="py-12 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        Client Feedback
                    </h2>
                    <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-4xl text-slate-400 dark:text-slate-600 font-serif leading-none select-none block mb-2">
                            “
                        </span>
                        <blockquote className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-normal leading-relaxed mb-6 italic">
                            "{HIRE_SHARED.testimonial.quote}"
                        </blockquote>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">
                                {HIRE_SHARED.testimonial.author}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {HIRE_SHARED.testimonial.role}
                            </p>
                        </div>
                    </div>
                </section>

                {/* How it Works (Process) */}
                <section className="py-12 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        How It Works
                    </h2>
                    <ol className="space-y-3">
                        {HIRE_SHARED.process.map((step, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                            >
                                <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold flex items-center justify-center shrink-0 text-sm">
                                    {idx + 1}
                                </span>
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
                                    {step}
                                </p>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Frequently Asked Questions */}
                <section className="py-12 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                        {page.faq.map((item, idx) => (
                            <details
                                key={idx}
                                className="group p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                            >
                                <summary className="font-bold text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between text-sm sm:text-base">
                                    <span>{item.q}</span>
                                    <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">
                                        ▼
                                    </span>
                                </summary>
                                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-100 dark:border-slate-800">
                                    {item.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Persistent Contact & Inquiry Section */}
                <section id="inquiry-form" className="pt-12 scroll-mt-24">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            Start a Conversation
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Fill out the form below with your project goals or reach out directly on WhatsApp.
                        </p>
                    </div>

                    <HireInquiryForm skill={page.skill} bookingUrl={bookingUrl} />
                </section>
            </main>

            <Footer />
        </div>
    );
}
