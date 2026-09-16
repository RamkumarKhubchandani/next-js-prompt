import React from 'react';
import ServicesClient from './ServicesClient';

export const metadata = {
    title: 'Website Development & Web Design Services | Hire React & Full Stack Engineers',
    description: 'Custom website development, modern UI/UX design, Next.js web applications, and full stack engineering. Hire vetted senior engineers for your startup MVP or enterprise redesign.',
    keywords: [
        'website development services',
        'web design agency',
        'hire react developer',
        'hire nextjs developer',
        'full stack web development',
        'custom frontend engineering',
        'ui ux design services',
        'hire nodejs expert',
        'react contract engineer',
        'outlinedev web development'
    ],
    alternates: {
        canonical: 'https://www.outlinedev.com/services',
    },
    openGraph: {
        title: 'Website Development & Web Design Services | OutlineDev',
        description: 'Build fast, high-converting, modern web applications with expert React, Next.js, and Full Stack engineers.',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'],
    }
};

export default function ServicesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": "Custom Web Development & Design Services",
                "provider": {
                    "@type": "Organization",
                    "name": "OutlineDev",
                    "url": "https://www.outlinedev.com"
                },
                "serviceType": "Software Development & Web Design",
                "areaServed": "Global",
                "description": "High-performance website development, custom web applications, UI/UX design, and full-stack software engineering."
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What kind of web development projects do you build?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We build high-converting marketing websites, modern SaaS web applications, custom e-commerce platforms, and interactive client dashboards using Next.js, React, Node.js, and Tailwind CSS."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How do you ensure fast website performance and high SEO ranking?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We engineer every website for 95+ Core Web Vitals scores, implementing server-side rendering (SSR), optimized responsive images, semantic HTML5, and Schema.org structured data."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I hire a dedicated developer for contract engineering?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, we offer both fixed-price project delivery and dedicated monthly contract engineering in React, TypeScript, Next.js, Node.js, and Full Stack."
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
            <ServicesClient />
        </>
    );
}
