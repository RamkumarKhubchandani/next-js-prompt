import { eventsData } from '../../lib/eventsData';
import EventDetailPage from './ClientPage';
import { notFound } from 'next/navigation';

// Helper to find event based on slug keywords
function findEventBySlug(slug) {
    // 1. Exact match
    const exactMatch = eventsData.find(e => e.slug === slug);
    if (exactMatch) return exactMatch;

    // 2. Fuzzy match based on keywords
    const s = slug.toLowerCase();

    // React / JS
    if (s.includes('react') || s.includes('javascript') || s.includes('frontend') || s.includes('zustand') || s.includes('nextjs')) {
        return eventsData.find(e => e.id === 'js-react-workshop');
    }

    // Angular / TS
    if (s.includes('angular') || s.includes('typescript') || s.includes('enterprise')) {
        return eventsData.find(e => e.id === 'js-ts-angular-workshop');
    }

    // Node / Backend / Python / Java / Go
    if (s.includes('node') || s.includes('backend') || s.includes('mongo') || s.includes('fullstack') || s.includes('python') || s.includes('java') || s.includes('go') || s.includes('rust') || s.includes('php') || s.includes('sql') || s.includes('docker') || s.includes('aws')) {
        return eventsData.find(e => e.id === 'js-node-mongo-workshop');
    }

    // Frontend Others (Vue, Svelte, Tailwind, CSS)
    if (s.includes('vue') || s.includes('svelte') || s.includes('css') || s.includes('tailwind') || s.includes('html')) {
        return eventsData.find(e => e.id === 'js-react-workshop');
    }

    // Fallback: If we don't know the tech, show the "Full Stack" workshop as it covers everything broadly
    return eventsData.find(e => e.id === 'js-node-mongo-workshop');
}

// Helper to generate dynamic title from slug
function generateDynamicTitle(slug, event) {
    if (event.slug === slug) return `${event.title} | Free Mentorship`; // Default title for canonical URL

    // Convert "free-react-workshop-in-london" -> "Free React Workshop In London"
    const readableSlug = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return `${readableSlug} | Top Rated Training`;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const event = findEventBySlug(slug);

    if (!event) {
        return {
            title: 'Workshop Not Found',
        };
    }

    const dynamicTitle = generateDynamicTitle(slug, event);

    return {
        title: dynamicTitle,
        description: `Join our ${event.title}. Free 1-on-1 Mentorship, 5-Person Agile Squads, and Job Support. Join today for free.`,
        keywords: [`${event.title}`, "coding for kids", "senior developer training", "free coding bootcamp", "1 on 1 mentorship", "javascript masterclass", slug.replace(/-/g, ' ')],
        openGraph: {
            title: dynamicTitle,
            description: "Master React, Node.js & AI with our 5-person agile squads. Join today for free.",
            images: [event.image],
        },
        alternates: {
            canonical: `https://nextjsprompt.com/events/${slug}`,
        }
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    const event = findEventBySlug(slug);

    if (!event) {
        notFound();
    }

    // Customize the event title in the UI if it's a dynamic slug to match user intent
    // We create a shallow copy to avoid mutating the original data
    const displayEvent = {
        ...event,
        // Optional: We could override the title on the page too, but usually better to keep the official course title 
        // while the SEO metadata handles the "keywords".
        // However, if the user searched "Free React Class", seeing "Free React Class" as H1 is powerful.
        // Let's adhere to the core event title for consistency in curriculum specificities, 
        // but we could add a "sub-headline" or banner? For now let's stick to the core event data.
    };

    // Rich JSON-LD for SEO Lead Generation
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": displayEvent.title,
        "description": displayEvent.fullDescription,
        "provider": {
            "@type": "Organization",
            "name": "JSPrompt Mentorship",
            "sameAs": "https://jsprompt.com"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": displayEvent.rating || "4.9",
            "reviewCount": (displayEvent.reviewCount || "500").replace('+', '')
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "category": "Free"
        },
        "audience": [
            { "@type": "Audience", "audienceType": "Junior Developers" },
            { "@type": "Audience", "audienceType": "Senior Architects" },
            { "@type": "Audience", "audienceType": "Kids & Students" }
        ],
        "educationalLevel": "Beginner to Advanced",
        "teaches": ["Generative AI", "React", "Node.js", "System Design"],
        "isAccessibleForFree": true,
        "url": `https://nextjsprompt.com/events/${slug}`
    };

    // Event Schema for "Workshops"
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "EducationEvent",
        "name": generateDynamicTitle(slug, event), // Use the specific search term in the Event Schema name!
        "startDate": "2026-03-01",
        "endDate": "2026-03-30",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "location": {
            "@type": "VirtualLocation",
            "url": "https://jsprompt.com/events"
        },
        "image": [displayEvent.image],
        "description": `Free workshop for ${displayEvent.title}. Learn in 5-person squads.`,
        "organizer": {
            "@type": "Organization",
            "name": "JSPrompt",
            "url": "https://jsprompt.com"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
            />
            <EventDetailPage initialEvent={displayEvent} />
        </>
    );
}
