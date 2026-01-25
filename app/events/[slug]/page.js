import { eventsData } from '../../lib/eventsData';
import EventDetailPage from './ClientPage';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const event = eventsData.find(e => e.slug === slug);

    if (!event) {
        return {
            title: 'Workshop Not Found',
        };
    }

    return {
        title: `${event.title} | #1 Free Mentorship (Kids to Seniors)`,
        description: `Join the ${event.title} Workshop. Free 1-on-1 Mentorship, 5-Person Agile Squads, and Job Support. Suitable for Juniors, Seniors, and Kids (10+). Rated 4.9/5 by 800+ Students.`,
        keywords: [`${event.title}`, "coding for kids", "senior developer training", "free coding bootcamp", "1 on 1 mentorship", "javascript masterclass"],
        openGraph: {
            title: `${event.title} | Free 1-on-1 & Group Training`,
            description: "Master React, Node.js & AI with our 5-person agile squads. Join today for free.",
            images: [event.image],
        },
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    const event = eventsData.find(e => e.slug === slug);

    if (!event) {
        notFound();
    }

    // Rich JSON-LD for SEO Lead Generation
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": event.title,
        "description": event.fullDescription,
        "provider": {
            "@type": "Organization",
            "name": "JSPrompt Mentorship",
            "sameAs": "https://jsprompt.com"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": event.rating || "4.9",
            "reviewCount": (event.reviewCount || "500").replace('+', '')
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
        "isAccessibleForFree": true
    };

    // Event Schema for "Workshops"
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "EducationEvent",
        "name": event.title,
        "startDate": "2026-03-01",
        "endDate": "2026-03-30",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "location": {
            "@type": "VirtualLocation",
            "url": "https://jsprompt.com/events"
        },
        "image": [event.image],
        "description": `Free workshop for ${event.title}. Learn in 5-person squads.`,
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
            <EventDetailPage params={params} />
        </>
    );
}
