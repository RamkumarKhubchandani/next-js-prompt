import React from 'react';
import EventsClient from './EventsClient';

export const metadata = {
    title: 'Free Coding Workshops & Masterclasses | React, Node.js, TypeScript, Playwright & AI',
    description: 'Join our free, high-intensity weekend coding workshops. Master Node.js, React 19, TypeScript, Playwright, Next.js, and MongoDB with expert mentorship and hands-on builds.',
    keywords: [
        'nodejs workshops',
        'node free workshops',
        'react free workshop',
        'javascript free workshops',
        'free coding workshop',
        'react masterclass',
        'typescript workshop free',
        'playwright automation workshop',
        'angular training',
        'nextjs crash course',
        'system design bootcamps',
        'learn javascript free',
        'coding mentorship',
        'developer career accelerator'
    ],
    openGraph: {
        title: 'Free Coding Workshops & Masterclasses | Accelerate Your Engineering Career',
        description: 'Expert-led workshops in React, Node.js, Playwright, and AI. Collaborative builds. Zero cost for top talent.',
        images: ['https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop'],
    },
    alternates: {
        canonical: 'https://www.outlinedev.com/events',
    }
};

export default function EventsPage() {
    // JSON-LD for Event Listing
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Full Stack: JS + Node.js + MongoDB Masterclass",
                "url": "https://www.outlinedev.com/events/js-node-mongo-workshop"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "JavaScript + React + Zustand Masterclass",
                "url": "https://www.outlinedev.com/events/js-react-workshop"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Full Stack Architecture: JS + React + Next.js 15",
                "url": "https://www.outlinedev.com/events/js-react-nextjs-workshop"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Automation Architect: JS + Playwright Masterclass",
                "url": "https://www.outlinedev.com/events/js-playwright-workshop"
            },
            {
                "@type": "ListItem",
                "position": 5,
                "name": "Enterprise Stack: JS + TS + Angular 21",
                "url": "https://www.outlinedev.com/events/js-ts-angular-workshop"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <EventsClient />
        </>
    );
}
