import { notFound } from 'next/navigation';
import { MentorshipLanding } from '../../components/mentorship/MentorshipLanding';
import { parseSeoSlug, SKILLS, LOCATIONS, SUFFIXES } from '../../lib/seo-data'; // Adjust path if needed

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

export async function generateMetadata({ params }) {
    const { slug } = params;
    const data = parseSeoSlug(slug);

    if (!data) return {};

    const { skill, location, suffix, prefix } = data;

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

    const description = `Looking for ${prefix ? prefix.replace(/-/g, ' ') + ' ' : ''}${skill.name} ${suffix} in ${location.name}? Hire top-rated experts for 1:1 coding help, debugging, and career mentorship.`;

    return {
        title,
        description,
        keywords: [
            `${prefix ? prefix.replace(/-/g, ' ') + ' ' : 'best '}${skill.name} ${suffix} in ${location.name}`,
            `top ${skill.name} tutors ${location.name}`,
            `hire ${skill.name} mentor ${location.name}`,
            `one to one ${skill.name} teacher`,
            `${skill.name} coaching ${location.name}`
        ],
        openGraph: {
            title,
            description,
            images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'],
        },
        alternates: {
            canonical: `https://nextjsprompt.com/mentors/${slug}`,
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
