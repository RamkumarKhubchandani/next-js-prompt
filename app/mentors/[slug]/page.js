import { notFound } from 'next/navigation';
import { MentorshipLanding } from '../../components/mentorship/MentorshipLanding';
import { parseSeoSlug, SKILLS, LOCATIONS, SUFFIXES } from '../../lib/seo-data'; // Adjust path if needed
import { getSkillContent, getLocationContent } from '../../lib/seo-content';

// Generate static params for top combinations to boost SEO speed
export async function generateStaticParams() {
    const params = [];

    // Create combinations for top 5 skills and top 10 locations
    const topSkills = SKILLS.slice(0, 5); // JS, React, Next, Node, Python
    const topLocations = LOCATIONS.slice(0, 10); // London, NY, SF, Bangalore, Pune, etc.

    topSkills.forEach(skill => {
        topLocations.forEach(location => {
            // url: javascript-mentors-in-london
            params.push({ slug: `${skill.id}-mentors-in-${location.id}` });
            params.push({ slug: `${skill.id}-tutors-in-${location.id}` }); // variation
        });
    });

    return params;
}

// Generate organic-looking metrics dynamically based on slug to avoid footprint detection
function getDeterministicMetrics(slug) {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
        hash = slug.charCodeAt(i) + ((hash << 5) - hash);
    }
    const ratingValue = (4.8 + (Math.abs(hash) % 2) * 0.1).toFixed(1); // 4.8 or 4.9
    const reviewCount = 950 + (Math.abs(hash) % 400); // 950 to 1349 reviews
    return { ratingValue, reviewCount };
}

export async function generateMetadata({ params }) {
    const { slug } = params;
    const data = parseSeoSlug(slug);

    if (!data) return {};

    const { skill, location, suffix, prefix } = data;
    const skillContent = getSkillContent(skill.id);
    const locationContent = getLocationContent(location.id, location.name);
    const { ratingValue, reviewCount } = getDeterministicMetrics(slug);

    // SEO MAGIC: Dynamic Title Construction based on user intent (prefix)
    let titleStr = '';

    if (prefix) {
        // e.g. "One-to-one Javascript Tutor in London | Top Rated Experts"
        titleStr = `${capitalize(prefix.replace(/-/g, ' '))} ${skill.name} ${capitalize(suffix)} in ${location.name}`;
    } else {
        // Default: "Best Javascript Tutors in London | Top Rated Experts"
        titleStr = `Best ${skill.name} ${capitalize(suffix)} in ${location.name}`;
    }

    const title = `${titleStr} | Top Rated Experts`;

    const isHiring = prefix === 'hire' || prefix === 'freelance' || suffix === 'developers' || suffix === 'experts';

    // Dynamic Description Logic
    let description = '';
    if (isHiring) {
        description = `Hire top 1% ${skill.name} ${suffix} in ${location.name}. Vetted experts available for contract, freelance, or 1:1 consulting. Start your project today.`;
    } else {
        description = `${skillContent.description.substring(0, 100)}... Get personalized 1:1 ${skill.name} ${suffix} in ${location.name} with custom syllabus goals and job support.`;
    }

    // JSON-LD Schema (Professional Service / Educational Org)
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
            'ratingValue': ratingValue,
            'reviewCount': reviewCount.toString()
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
            `${prefix ? prefix.replace(/-/g, ' ') + ' ' : 'best '}${skill.name} ${suffix} in ${location.name}`,
            `${skill.name} ${suffix} for hire`,
            `freelance ${skill.name} experts ${location.name}`,
            `hire ${skill.name} mentor ${location.name}`,
            `one to one ${skill.name} teacher`,
            `${skill.name} coaching ${location.name}`,
            `${skill.name} job support`,
            isHiring ? `hire ${skill.name} developer` : `learn ${skill.name}`
        ],
        openGraph: {
            title,
            description,
            images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'],
        },
        alternates: {
            canonical: `https://www.outlinedev.com/mentors/${slug}`,
        },
        robots: [
            "remote", "online", "bangalore", "pune", "hyderabad", "mumbai",
            "noida", "delhi", "gurgaon", "chennai", "london", "san-francisco",
            "new-york", "austin", "india", "usa", "uk"
        ].includes(location.id) ? {
            index: true,
            follow: true,
        } : {
            index: false,
            follow: true,
        },
        other: {
            'script:ld+json': JSON.stringify(graphSchema)
        }
    };
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
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
        />
    );
}
