import { notFound } from 'next/navigation';
import { MentorshipLanding } from '../../components/mentorship/MentorshipLanding';
import { parseSeoSlug, SKILLS, LOCATIONS, SUFFIXES } from '../../lib/seo-data';
import { getSkillContent, getLocationContent } from '../../lib/seo-content';

const REAL_RATING = {
    ratingValue: "4.9",
    reviewCount: "16"
};

export const revalidate = 604800;

// Generate static params for top combinations to boost SEO speed
export async function generateStaticParams() {
    const params = [];

    // Top skills and top hubs pre-rendered at build time
    const topSkills = SKILLS.slice(0, 8);
    const topLocations = LOCATIONS.slice(0, 15);

    topSkills.forEach(skill => {
        topLocations.forEach(location => {
            params.push({ slug: `one-to-one-${skill.id}-tutors-in-${location.id}` });
            params.push({ slug: `${skill.id}-mentors-in-${location.id}` });
            params.push({ slug: `${skill.id}-job-support-in-${location.id}` });
        });
    });

    return params;
}

function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function generateMetadata({ params }) {
    const { slug } = params;
    const data = parseSeoSlug(slug);

    if (!data) return {};

    const { skill, location, suffix, prefix } = data;
    const skillContent = getSkillContent(skill.id);
    const locationContent = getLocationContent(location.id, location.name);
    const hasRealContent = !skillContent.isFallback && !locationContent.isFallback;

    const isHiring = prefix === 'hire' || prefix === 'freelance' || suffix === 'developers' || suffix === 'experts';
    const isJobSupport = suffix === 'job-support' || suffix === 'project-support';
    const isInterview = suffix === 'interview-help' || suffix === 'interview-prep' || suffix === 'mock-interviews';
    const isOneToOne = prefix === 'one-to-one' || prefix === '1-on-1' || suffix === 'tutors' || suffix === 'tutor';

    // SEO Title Construction targeting high-volume singular + plural queries
    let titleStr = '';
    if (isOneToOne) {
        titleStr = `1-on-1 ${skill.name} Tutor & Mentorship in ${location.name}`;
    } else if (isJobSupport) {
        titleStr = `${skill.name} Job Support & Sprint Assistance in ${location.name}`;
    } else if (isInterview) {
        titleStr = `${skill.name} Interview Prep & Mock Interviews in ${location.name}`;
    } else if (isHiring) {
        titleStr = `Hire ${skill.name} Developers & Freelance Experts in ${location.name}`;
    } else if (prefix) {
        titleStr = `${capitalize(prefix.replace(/-/g, ' '))} ${skill.name} ${capitalize(suffix)} in ${location.name}`;
    } else {
        titleStr = `Best ${skill.name} Mentors & Tutors in ${location.name}`;
    }

    const title = `${titleStr} | Top Rated Experts`;

    // Dynamic Description Logic covering both singular & plural intents
    let description = '';
    if (isHiring) {
        description = `Hire vetted top 1% ${skill.name} developers and freelance consultants in ${location.name}. Fast matching, 1:1 sprint consulting, and guaranteed quality.`;
    } else if (isJobSupport) {
        description = `Get dedicated 1-on-1 ${skill.name} job support and on-the-job sprint assistance in ${location.name}. Daily standup guidance, bug troubleshooting, and code reviews.`;
    } else if (isInterview) {
        description = `Crack your next ${skill.name} tech interview in ${location.name}. 1-on-1 mock interviews, system design whiteboarding, and senior staff engineer feedback.`;
    } else {
        description = `Find expert 1-on-1 ${skill.name} tutors and mentors in ${location.name}. Get personalized coding sessions, live pair programming, and career fast-track guidance.`;
    }

    // JSON-LD Schema (Professional Service / Educational Org / Course)
    const mainSchema = {
        '@type': isHiring ? 'ProfessionalService' : 'EducationalOrganization',
        '@id': `https://www.outlinedev.com/mentors/${slug}#org`,
        'name': titleStr,
        'description': description,
        'url': `https://www.outlinedev.com/mentors/${slug}`,
        'image': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200',
        'address': {
            '@type': 'PostalAddress',
            'addressCountry': location.country,
            'addressLocality': location.name === 'Online' ? 'Global' : location.name
        },
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': REAL_RATING.ratingValue,
            'reviewCount': REAL_RATING.reviewCount
        },
        'priceRange': '$$'
    };

    // FAQ Schema representing the dynamic interview Q&A
    const faqSchema = {
        '@type': 'FAQPage',
        'mainEntity': [
            {
                '@type': 'Question',
                'name': skillContent.faq.question,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': skillContent.faq.answer
                }
            },
            {
                '@type': 'Question',
                'name': `How does 1-on-1 ${skill.name} mentorship in ${location.name} work?`,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': `You are paired directly with a vetted Senior ${skill.name} Engineer. You receive personalized live coding sessions, code reviews, debugging support, and job interview preparation tailored to your career goals.`
                }
            }
        ]
    };

    const graphSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            mainSchema,
            faqSchema
        ]
    };

    return {
        title,
        description,
        keywords: [
            `1 on 1 ${skill.name.toLowerCase()} tutor in ${location.name.toLowerCase()}`,
            `one to one ${skill.name.toLowerCase()} tutor in ${location.name.toLowerCase()}`,
            `one to one ${skill.name.toLowerCase()} tutors in ${location.name.toLowerCase()}`,
            `${skill.name.toLowerCase()} tutor ${location.name.toLowerCase()}`,
            `${skill.name.toLowerCase()} mentors in ${location.name.toLowerCase()}`,
            `hire ${skill.name.toLowerCase()} developer in ${location.name.toLowerCase()}`,
            `${skill.name.toLowerCase()} job support in ${location.name.toLowerCase()}`,
            `freelance ${skill.name.toLowerCase()} expert ${location.name.toLowerCase()}`,
            `learn ${skill.name.toLowerCase()} online`
        ],
        openGraph: {
            title,
            description,
            images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'],
        },
        alternates: {
            canonical: `https://www.outlinedev.com/mentors/${slug}`,
        },
        robots: hasRealContent ? {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        } : {
            index: false,
            follow: true,
        },
        other: {
            'script:ld+json': JSON.stringify(graphSchema)
        }
    };
}

export default function MentorSeoPage({ params }) {
    const { slug } = params;
    const data = parseSeoSlug(slug);

    if (!data) {
        notFound();
    }

    return (
        <MentorshipLanding
            skill={data.skill}
            location={data.location}
            suffix={data.suffix}
            prefix={data.prefix}
            currentSlug={slug}
        />
    );
}
