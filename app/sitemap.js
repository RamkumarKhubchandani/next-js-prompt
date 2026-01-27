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
            mentorRoutes.push({
                url: `${baseUrl}/mentors/${skill.id}-mentors-in-${location.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            });
        });
    });

    return [...routes, ...mentorRoutes];
}
