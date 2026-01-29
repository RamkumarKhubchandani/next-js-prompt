import BecomeMentorClient from './BecomeMentorClient';

export const metadata = {
    title: "Become a Mentor | Share Knowledge & Earn Money | JSPrompt",
    description: "Join our elite network of engineering mentors. Teach React, Node.js, and System Design to students worldwide. Set your own rates and work from anywhere.",
    keywords: "become a coding mentor, teach programming online, react mentor jobs, javascript tutor jobs, earn money coding, developer mentorship program",
    openGraph: {
        title: "Become a Coding Mentor - Earn Globally",
        description: "Share your engineering expertise with the next generation. Join JSPrompt's global mentor network.",
        images: ['/assets/mentor-hero.png'],
    }
};

export default function BecomeMentorPage() {
    // JobPosting Schema to attract mentors via Google Jobs / Search
    const jobSchema = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": "Senior Engineering Mentor (Remote)",
        "description": "We are looking for experienced software engineers to mentor students in React, Angular, Node.js, and System Design. You will conduct 1-on-1 sessions and code reviews.",
        "identifier": {
            "@type": "PropertyValue",
            "name": "JSPrompt",
            "value": "MENTOR-001"
        },
        "hiringOrganization": {
            "@type": "Organization",
            "name": "JSPrompt",
            "sameAs": "https://jsprompt.com"
        },
        "employmentType": "CONTRACTOR",
        "jobLocationType": "TELECOMMUTE",
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
        "applicantLocationRequirements": {
            "@type": "Country",
            "name": "Worldwide"
        }
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
