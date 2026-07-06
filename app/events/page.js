import React from 'react';
import EventsClient from './EventsClient';

export const metadata = {
    title: 'Free Coding Workshops & Masterclasses | React, Node.js, Angular, AI',
    description: 'Join our free, high-intensity coding workshops. Master React, Next.js, Angular, and System Design with 5-person agile squads and expert mentorship. Zero cost for top talent.',
    keywords: [
        'free coding workshop',
        'react masterclass',
        'angular training',
        'nextjs crash course',
        'system design bootcamps',
        'learn javascript free',
        'coding mentorship',
        'developer career accelerator'
    ],
    openGraph: {
        title: 'Free Coding Workshops | Accelerate Your Engineering Career',
        description: 'Expert-led workshops. Collaborative builds. Zero cost for top talent. Join 1000+ developers mastering the modern web stack.',
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
                "name": "JavaScript + React + Zustand Masterclass",
                "url": "https://www.outlinedev.com/events/js-react-workshop"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Enterprise Stack: JS + TS + Angular 21",
                "url": "https://www.outlinedev.com/events/js-ts-angular-workshop"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Full Stack: JS + Node.js + MongoDB",
                "url": "https://www.outlinedev.com/events/js-node-mongo-workshop"
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
