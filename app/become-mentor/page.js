import BecomeMentorClient from './BecomeMentorClient';

export const metadata = {
    title: "Become a Mentor | Share Knowledge & Earn Money | OutlineDev",
    description: "Join our elite network of engineering mentors. Teach React, Node.js, and System Design to students worldwide. Set your own rates and work from anywhere.",
    keywords: "become a coding mentor, teach programming online, react mentor jobs, javascript tutor jobs, earn money coding, developer mentorship program",
    alternates: {
        canonical: 'https://www.outlinedev.com/become-mentor',
    },
    openGraph: {
        title: "Become a Coding Mentor - Earn Globally",
        description: "Share your engineering expertise with the next generation. Join OutlineDev's global mentor network.",
        images: ['/assets/mentor-hero.png'],
    }
};

export default function BecomeMentorPage() {
    // JobPosting Schema to attract mentors via Google Jobs / Search
    const jobSchema = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": "Senior Engineering Mentor (Remote)",
        "description": "<p>We are looking for experienced software engineers to mentor students in React, Angular, Node.js, and System Design. You will conduct 1-on-1 sessions and code reviews.</p><p><strong>Responsibilities:</strong></p><ul><li>Conduct 1-on-1 personalized mentorship sessions</li><li>Perform comprehensive code reviews and system architecture teardowns</li><li>Provide guidance on interview prep, live debugging, and career roadmaps</li></ul><p><strong>Requirements:</strong></p><ul><li>Proven experience in frontend, backend, or fullstack development</li><li>Strong communication skills and passion for teaching</li><li>Ability to work remotely from anywhere in the world</li></ul>",
        "identifier": {
            "@type": "PropertyValue",
            "name": "OutlineDev",
            "value": "MENTOR-001"
        },
        "datePosted": "2026-01-01T00:00:00Z",
        "validThrough": "2027-12-31T23:59:59Z",
        "hiringOrganization": {
            "@type": "Organization",
            "name": "OutlineDev",
            "sameAs": "https://www.outlinedev.com",
            "logo": "https://www.outlinedev.com/icon.png"
        },
        "employmentType": ["CONTRACTOR", "PART_TIME"],
        "jobLocationType": "TELECOMMUTE",
        "applicantLocationRequirements": {
            "@type": "Country",
            "name": "Worldwide"
        },
        "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": {
                "@type": "QuantitativeValue",
                "minValue": 50,
                "maxValue": 200,
                "unitText": "HOUR"
            }
        },
        "directApply": true,
        "url": "https://www.outlinedev.com/become-mentor"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
            />
            <BecomeMentorClient />
        </>
    );
}
