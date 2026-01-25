import React from 'react';
import MentorshipClient from './MentorshipClient';

export const metadata = {
    title: 'Find a 1:1 Coding Tutor | Best JavaScript, Python & React Mentors',
    description: 'Get instant 1:1 coding help from vetted experts. Find the best JavaScript tutor, Python mentor, or React coach. We connect you in 60 minutes. Global 24/7 support.',
    keywords: ['1:1 coding tutor', 'javascript mentor', 'python tutor', 'react mentorship', 'find coding teacher', 'best java tutor', 'coding help for kids'],
    alternates: {
        canonical: 'https://example.com/mentorship',
    },
    openGraph: {
        title: 'Find Your Perfect Coding Mentor | 1:1 Help',
        description: 'Stop struggling alone. Connect with a senior engineer from Google, Meta, or Amazon for 1:1 help.',
        images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'],
    }
};

export default function MentorshipPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Next.js Mentorship Platform",
        "description": "Global 1:1 coding mentorship platform connecting students with expert developers.",
        "url": "https://example.com/mentorship",
        "sameAs": [
            "https://twitter.com/example",
            "https://linkedin.com/company/example"
        ],
        "makesOffer": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "1:1 JavaScript Mentorship",
                    "description": "Personalized JavaScript tutoring sessions."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "1:1 Python Mentorship",
                    "description": "Personalized Python tutoring sessions."
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Coding for Kids",
                    "description": "Scratch and Roblox customized lessons."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <MentorshipClient />
        </>
    );
}
