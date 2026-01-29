import { SKILLS, LOCATIONS } from './lib/seo-data';

export default function sitemap() {
    const baseUrl = 'https://nextjsprompt.com'; // Replace with actual production URL

    // Base routes
    const routes = [
        '',
        '/mentorship',
        '/mentors',
        '/login',
        '/register',
        '/pricing',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
    }));

    // Dynamic SEO routes
    // We don't want to generate millions of URLs in one go if Vercel limits it, 
    // but let's generate the top tier (e.g. all skills x all locations)
    // SKILLS (15) * LOCATIONS (19) = ~285 URLs. This is totally fine.

    const mentorRoutes = [];

    SKILLS.forEach(skill => {
        LOCATIONS.forEach(location => {
            // 1. Standard: javascript-mentors-in-london (Volume)
            mentorRoutes.push({
                url: `${baseUrl}/mentors/${skill.id}-mentors-in-${location.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            });

            // 2. High Intent: one-to-one-javascript-teacher-in-london (Conversion)
            mentorRoutes.push({
                url: `${baseUrl}/mentors/one-to-one-${skill.id}-tutors-in-${location.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            });

            // 3. Hiring & Freelancing: hire-react-developers-in-san-francisco (Commercial)
            // Only strictly generate these for "hiring" type prefixes/suffixes to avoid spam
            if (['react', 'node', 'python', 'java', 'devops', 'aws'].includes(skill.id)) {
                mentorRoutes.push({
                    url: `${baseUrl}/mentors/hire-${skill.id}-developers-in-${location.id}`,
                    lastModified: new Date(),
                    changeFrequency: 'daily',
                    priority: 1.0,
                });

                mentorRoutes.push({
                    url: `${baseUrl}/mentors/freelance-${skill.id}-experts-in-${location.id}`,
                    lastModified: new Date(),
                    changeFrequency: 'daily',
                    priority: 0.95,
                });
            }

            // 4. Problem Specific: react-debugging-help-in-london (Niche)
            mentorRoutes.push({
                url: `${baseUrl}/mentors/${skill.id}-debugging-help-in-${location.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.85,
            });

            // 5. Job Support: job-support-for-java-in-bangalore (Indian Market Specific)
            if (location.country === 'India' || location.id === 'online') {
                mentorRoutes.push({
                    url: `${baseUrl}/mentors/${skill.id}-job-support-in-${location.id}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.9,
                });
            }
        });
    });

    return [...routes, ...mentorRoutes];
}
