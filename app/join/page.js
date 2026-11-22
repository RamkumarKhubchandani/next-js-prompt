import { safeJsonLd } from '@/app/lib/schema-helpers';
import JoinClient from './JoinClient';

export const metadata = {
    title: "Join as a Mentor or Developer | OutlineDev",
    description: "Join OutlineDev as a coding mentor or freelance developer. Create a profile, get approved, and receive student and client enquiries.",
    keywords: "become a coding mentor, teach programming online, react mentor, javascript tutor, developer mentorship program, freelance developer",
    alternates: {
        canonical: 'https://www.outlinedev.com/join',
    },
    openGraph: {
        title: "Join as a Mentor or Developer - OutlineDev",
        description: "Join OutlineDev as a coding mentor or freelance developer. Create a profile, get approved, and receive student and client enquiries.",
        images: ['/assets/mentor-hero.png'],
    }
};

export default function JoinPage() {
    // JobPosting Schema to attract mentors & freelance developers via Google Jobs / Search
    const jobSchema = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": "Engineering Mentor or Freelance Developer (Remote)",
        "description": "<p>We are looking for experienced software engineers to mentor students in React, Angular, Node.js, and System Design, as well as take on contract development projects. You will conduct 1-on-1 sessions, code reviews, and help clients ship products.</p><p><strong>Responsibilities:</strong></p><ul><li>Conduct 1-on-1 personalized mentorship sessions</li><li>Perform comprehensive code reviews and system architecture teardowns</li><li>Provide guidance on interview prep, live debugging, and career roadmaps</li><li>Collaborate with clients on freelance and contract engineering initiatives</li></ul><p><strong>Requirements:</strong></p><ul><li>Proven experience in frontend, backend, or fullstack development</li><li>Strong communication skills and passion for teaching or consulting</li><li>Ability to work remotely from anywhere in the world</li></ul>",
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
        "directApply": true,
        "url": "https://www.outlinedev.com/join"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: safeJsonLd(jobSchema) }}
            />
            <JoinClient />
        </>
    );
}
