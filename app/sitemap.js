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
            // Standard: javascript-mentors-in-london
            mentorRoutes.push({
                url: `${baseUrl}/mentors/${skill.id}-mentors-in-${location.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            });

            // High Intent: one-to-one-javascript-teacher-in-london
            // We'll generate these for all valid locations to capture the "private/1:1" market
            mentorRoutes.push({
                url: `${baseUrl}/mentors/one-to-one-${skill.id}-teacher-in-${location.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9, // Higher priority as these are high-conversion keywords
            });

            // Student/Assignment Intent: playwright-assignment-help-in-london
            mentorRoutes.push({
                url: `${baseUrl}/mentors/${skill.id}-assignment-help-in-${location.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.85,
            });
        });
    });

    return [...routes, ...mentorRoutes];
}
