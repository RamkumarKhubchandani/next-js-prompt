import React from 'react';
import JobSupportClient from './JobSupportClient';

export const metadata = {
    title: 'IT Job Support & Live Sprint Debugging | 1-on-1 Screen Share Help',
    description: 'Stuck on a Jira ticket or production bug? Get instant 1-on-1 IT job support from Senior Staff Engineers. Live screen-share debugging for React, Node.js, TypeScript, Angular, Next.js, Playwright, and MongoDB.',
    keywords: [
        'it job support',
        'react job support',
        'frontend job support',
        'nodejs job support',
        'typescript on the job help',
        'urgent code debugging',
        'live screen share tutor',
        'jira ticket help',
        'sprint task assistance',
        'full stack job support usa india uk'
    ],
    alternates: {
        canonical: 'https://www.outlinedev.com/job-support',
    },
    openGraph: {
        title: 'IT Job Support & Live Sprint Debugging | OutlineDev',
        description: 'Get live 1-on-1 pair programming support to unblock challenging tickets and debug production issues in under 30 minutes.',
        images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'],
    }
};

export default function JobSupportPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": "On-The-Job IT Support & Live Debugging",
                "provider": {
                    "@type": "EducationalOrganization",
                    "name": "OutlineDev",
                    "url": "https://www.outlinedev.com"
                },
                "serviceType": "Technical Consulting & IT Job Support",
                "areaServed": "Global",
                "description": "Live 1-on-1 screen-sharing and pair-programming support for software engineers working on modern frontend and full stack applications."
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How does 1-on-1 IT Job Support work?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Whenever you encounter a challenging sprint ticket, complex bug, or architecture question at your job, you connect with a senior engineer via live screen share (Google Meet / Zoom). We analyze the requirements, write clean solutions, and ensure you understand every line."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What tech stacks do you support?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We provide dedicated support for React, TypeScript, Next.js, Node.js, Express, Angular, Vue, Svelte, Playwright, Cypress, MongoDB, PostgreSQL, Python, and AWS/DevOps."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How quickly can I get connected to a mentor?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "For urgent production blockers, our mentors connect in under 30 minutes via WhatsApp or direct booking."
                        }
                    }
                ]
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <JobSupportClient />
        </>
    );
}
