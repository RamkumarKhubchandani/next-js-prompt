export const SKILLS = [
    { id: 'javascript', name: 'JavaScript', keywords: ['js', 'es6', 'frontend'] },
    { id: 'react', name: 'React', keywords: ['reactjs', 'jsx', 'hooks'] },
    { id: 'nextjs', name: 'Next.js', keywords: ['next js', 'server components'] },
    { id: 'node', name: 'Node.js', keywords: ['backend', 'express'] },
    { id: 'python', name: 'Python', keywords: ['data science', 'django', 'flask'] },
    { id: 'java', name: 'Java', keywords: ['springboot', 'backend'] },
    { id: 'cpp', name: 'C++', keywords: ['cpp', 'c plus plus'] },
    { id: 'html-css', name: 'HTML & CSS', keywords: ['web design', 'styling'] },
    { id: 'fullstack', name: 'Full Stack', keywords: ['mern', 'mean'] },
    { id: 'ai', name: 'AI & Machine Learning', keywords: ['artificial intelligence', 'ml'] },
    { id: 'typescript', name: 'TypeScript', keywords: ['ts', 'types'] },
    { id: 'angular', name: 'Angular', keywords: ['angularjs'] },
    { id: 'vue', name: 'Vue.js', keywords: ['vuejs'] },
    { id: 'sql', name: 'SQL', keywords: ['database', 'mysql', 'postgres'] },
    { id: 'aws', name: 'AWS', keywords: ['cloud', 'amazon web services'] },
];

export const LOCATIONS = [
    { id: 'london', name: 'London', country: 'UK' },
    { id: 'new-york', name: 'New York', country: 'USA' },
    { id: 'san-francisco', name: 'San Francisco', country: 'USA' },
    { id: 'bangalore', name: 'Bangalore', country: 'India' },
    { id: 'pune', name: 'Pune', country: 'India' },
    { id: 'mumbai', name: 'Mumbai', country: 'India' },
    { id: 'delhi', name: 'Delhi', country: 'India' },
    { id: 'hyderabad', name: 'Hyderabad', country: 'India' },
    { id: 'chennai', name: 'Chennai', country: 'India' },
    { id: 'toronto', name: 'Toronto', country: 'Canada' },
    { id: 'vancouver', name: 'Vancouver', country: 'Canada' },
    { id: 'sydney', name: 'Sydney', country: 'Australia' },
    { id: 'melbourne', name: 'Melbourne', country: 'Australia' },
    { id: 'berlin', name: 'Berlin', country: 'Germany' },
    { id: 'paris', name: 'Paris', country: 'France' },
    { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands' },
    { id: 'singapore', name: 'Singapore', country: 'Singapore' },
    { id: 'dubai', name: 'Dubai', country: 'UAE' },
    { id: 'remote', name: 'Remote', country: 'Global' },
];

export const SUFFIXES = [
    'tutors',
    'mentors',
    'teachers',
    'experts',
    'coaches',
];

export function parseSeoSlug(slug) {
    // Expected formats: 
    // [skill]-tutors-in-[location]
    // [skill]-mentors-in-[location]
    // [skill]-teachers-in-[location]

    // Normalize
    const parts = slug.toLowerCase().split('-in-');

    if (parts.length !== 2) return null;

    const skillPart = parts[0]; // e.g., "javascript-tutors"
    const locationPart = parts[1]; // e.g., "london"

    // Extract skill
    // We need to find which suffix was used to strip it
    let foundSkill = null;
    let usedSuffix = '';

    for (const suffix of SUFFIXES) {
        if (skillPart.endsWith('-' + suffix)) {
            usedSuffix = suffix;
            const potentialSkillId = skillPart.replace('-' + suffix, '');
            foundSkill = SKILLS.find(s => s.id === potentialSkillId || s.name.toLowerCase().replace(/ /g, '-') === potentialSkillId);
            if (foundSkill) break;
        }
    }

    // Fallback: Check if the whole first part is just a skill (unlikely per pattern, but good for safety)
    if (!foundSkill) {
        foundSkill = SKILLS.find(s => s.id === skillPart);
    }

    // Extract location
    let foundLocation = LOCATIONS.find(l => l.id === locationPart);

    // AUTO-GENERATE location if not found
    // This supports ANY city/state/country dynamically! e.g. "california", "small-town", "mars"
    if (!foundLocation && locationPart.length > 2) {
        // Convert "new-jersey" -> "New Jersey"
        const niceName = locationPart.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        foundLocation = {
            id: locationPart,
            name: niceName,
            country: 'Global' // Generic fallback since we don't know the specifics
        };
    }

    if (!foundSkill || !foundLocation) return null;

    return {
        skill: foundSkill,
        location: foundLocation,
        suffix: usedSuffix || 'mentors'
    };
}
