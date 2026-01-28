export const SKILLS = [
    // Frontend
    { id: 'javascript', name: 'JavaScript', keywords: ['js', 'es6', 'vanilla-js', 'ecmascript'] },
    { id: 'typescript', name: 'TypeScript', keywords: ['ts', 'type-script'] },
    { id: 'react', name: 'React', keywords: ['reactjs', 'react-js', 'react-native'] },
    { id: 'nextjs', name: 'Next.js', keywords: ['next-js', 'next', 'server-components'] },
    { id: 'angular', name: 'Angular', keywords: ['angularjs', 'ng'] },
    { id: 'vue', name: 'Vue.js', keywords: ['vuejs', 'vue-js', 'nuxt'] },
    { id: 'svelte', name: 'Svelte', keywords: ['sveltejs', 'svelte-kit'] },
    { id: 'html-css', name: 'HTML & CSS', keywords: ['html', 'css', 'web-design', 'styling', 'tailwind'] },
    { id: 'tailwind', name: 'Tailwind CSS', keywords: ['tailwind', 'css-framework'] },
    { id: 'redux', name: 'Redux', keywords: ['state-management', 'redux-toolkit', 'rtk'] },
    { id: 'zustand', name: 'Zustand', keywords: ['state-management'] },
    { id: 'frontend', name: 'Frontend', keywords: ['front-end', 'ui-engineering'] },

    // Backend & Fullstack
    { id: 'node', name: 'Node.js', keywords: ['nodejs', 'node-js', 'express'] },
    { id: 'python', name: 'Python', keywords: ['py', 'django', 'flask', 'fastapi'] },
    { id: 'java', name: 'Java', keywords: ['springboot', 'spring-boot', 'jvm'] },
    { id: 'csharp', name: 'C#', keywords: ['c-sharp', 'dotnet', '.net'] },
    { id: 'go', name: 'Go', keywords: ['golang'] },
    { id: 'rust', name: 'Rust', keywords: ['rs'] },
    { id: 'fullstack', name: 'Full Stack', keywords: ['full-stack', 'mern', 'mean'] },

    // Database
    { id: 'sql', name: 'SQL', keywords: ['mysql', 'postgresql', 'postgres', 'database'] },
    { id: 'mongodb', name: 'MongoDB', keywords: ['mongo', 'nosql', 'mongoose'] },

    // Testing & DevOps
    { id: 'playwright', name: 'Playwright', keywords: ['e2e', 'testing', 'automation', 'playwright-automation'] },
    { id: 'cypress', name: 'Cypress', keywords: ['e2e', 'testing'] },
    { id: 'aws', name: 'AWS', keywords: ['cloud', 'amazon-web-services', 'ec2', 'lambda'] },
    { id: 'docker', name: 'Docker', keywords: ['containers', 'kubernetes'] },
    { id: 'devops', name: 'DevOps', keywords: ['ci-cd', 'jenkins', 'github-actions'] },

    // Advanced & Special
    { id: 'ai', name: 'AI & Machine Learning', keywords: ['ml', 'artificial-intelligence', 'llm', 'chatgpt'] },
    { id: 'system-design', name: 'System Design', keywords: ['architecture', 'scalability'] },
    { id: 'dsa', name: 'Data Structures', keywords: ['algorithms', 'leetcode', 'interview-prep'] },
];

export const LOCATIONS = [
    // Special
    { id: 'near-me', name: 'Near You', country: 'Your Local Area' },
    { id: 'online', name: 'Online', country: 'Global' },
    { id: 'remote', name: 'Remote', country: 'Global' },

    // UK
    { id: 'uk', name: 'UK', country: 'United Kingdom' },
    { id: 'london', name: 'London', country: 'UK' },
    { id: 'manchester', name: 'Manchester', country: 'UK' },
    { id: 'birmingham', name: 'Birmingham', country: 'UK' },
    { id: 'leeds', name: 'Leeds', country: 'UK' },
    { id: 'glasgow', name: 'Glasgow', country: 'UK' },
    { id: 'liverpool', name: 'Liverpool', country: 'UK' },
    { id: 'bristol', name: 'Bristol', country: 'UK' },
    { id: 'edinburgh', name: 'Edinburgh', country: 'UK' },

    // USA
    { id: 'usa', name: 'USA', country: 'United States' },
    { id: 'new-york', name: 'New York', country: 'USA' },
    { id: 'san-francisco', name: 'San Francisco', country: 'USA' },
    { id: 'los-angeles', name: 'Los Angeles', country: 'USA' },
    { id: 'chicago', name: 'Chicago', country: 'USA' },
    { id: 'austin', name: 'Austin', country: 'USA' },
    { id: 'seattle', name: 'Seattle', country: 'USA' },
    { id: 'boston', name: 'Boston', country: 'USA' },
    { id: 'houston', name: 'Houston', country: 'USA' },
    { id: 'miami', name: 'Miami', country: 'USA' },

    // India
    { id: 'india', name: 'India', country: 'India' },
    { id: 'bangalore', name: 'Bangalore', country: 'India' },
    { id: 'pune', name: 'Pune', country: 'India' },
    { id: 'mumbai', name: 'Mumbai', country: 'India' },
    { id: 'delhi', name: 'Delhi', country: 'India' },
    { id: 'hyderabad', name: 'Hyderabad', country: 'India' },
    { id: 'chennai', name: 'Chennai', country: 'India' },
    { id: 'gurgaon', name: 'Gurgaon', country: 'India' },
    { id: 'noida', name: 'Noida', country: 'India' },
    { id: 'ahmedabad', name: 'Ahmedabad', country: 'India' },

    // Canada
    { id: 'canada', name: 'Canada', country: 'Canada' },
    { id: 'toronto', name: 'Toronto', country: 'Canada' },
    { id: 'vancouver', name: 'Vancouver', country: 'Canada' },
    { id: 'montreal', name: 'Montreal', country: 'Canada' },

    // Australia
    { id: 'australia', name: 'Australia', country: 'Australia' },
    { id: 'sydney', name: 'Sydney', country: 'Australia' },
    { id: 'melbourne', name: 'Melbourne', country: 'Australia' },

    // Europe
    { id: 'berlin', name: 'Berlin', country: 'Germany' },
    { id: 'munich', name: 'Munich', country: 'Germany' },
    { id: 'paris', name: 'Paris', country: 'France' },
    { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands' },
    { id: 'dublin', name: 'Dublin', country: 'Ireland' },
    { id: 'stockholm', name: 'Stockholm', country: 'Sweden' },
    { id: 'zurich', name: 'Zurich', country: 'Switzerland' },

    // Middle East & Asia
    { id: 'dubai', name: 'Dubai', country: 'UAE' },
    { id: 'singapore', name: 'Singapore', country: 'Singapore' },
    { id: 'tokyo', name: 'Tokyo', country: 'Japan' },
];

export const SUFFIXES = [
    // Student / Assignment Intent
    'assignment-help',
    'homework-help',
    'project-support',
    'project-help',
    'tutoring-help',
    'coursework-help',

    // Plural
    'tutors',
    'mentors',
    'teachers',
    'experts',
    'coaches',
    'consultants',
    'trainers',
    'instructors',
    // Singular (for "Find a Javascript Tutor")
    'tutor',
    'mentor',
    'teacher',
    'expert',
    'coach',
    'consultant',
    'trainer',
    'instructor',
];

export const PREFIXES = [
    'one-to-one',
    '1-on-1',
    'private',
    'online',
    'personal',
    'best',
    'top',
    'professional',
    'senior',
    'hire',
    'find',
];

export function parseSeoSlug(slug) {
    // Expected formats: 
    // [prefix]-[skill]-tutors-in-[location]
    // [skill]-tutor-near-me
    // [skill]-teachers-in-[location]
    // one-to-one-[skill]-teacher-in-[location]

    let normalizedSlug = slug.toLowerCase();

    // 1. Handle "near-me" queries by converting them to the "in-near-me" format our parser expects
    // e.g. "javascript-tutor-near-me" -> "javascript-tutor-in-near-me"
    if (normalizedSlug.endsWith('-near-me') && !normalizedSlug.includes('-in-')) {
        normalizedSlug = normalizedSlug.replace('-near-me', '-in-near-me');
    }

    // 2. Normalize typical structure
    const parts = normalizedSlug.split('-in-');

    if (parts.length !== 2) return null;

    let skillPart = parts[0]; // e.g., "one-to-one-javascript-tutors"
    const locationPart = parts[1]; // e.g., "london"

    // 3. Extract PREFIX (e.g. "one-to-one")
    let usedPrefix = '';
    for (const prefix of PREFIXES) {
        if (skillPart.startsWith(prefix + '-')) {
            usedPrefix = prefix;
            skillPart = skillPart.replace(prefix + '-', ''); // Remove prefix to find skill
            break;
        }
    }

    // 4. Extract Skill
    let foundSkill = null;
    let usedSuffix = '';

    // Try finding suffix first
    for (const suffix of SUFFIXES) {
        if (skillPart.endsWith('-' + suffix)) {
            usedSuffix = suffix;
            const potentialSkillId = skillPart.replace('-' + suffix, '');

            // Try exact ID match
            foundSkill = SKILLS.find(s => s.id === potentialSkillId);

            // Try Name match (normalized)
            if (!foundSkill) {
                foundSkill = SKILLS.find(s => s.name.toLowerCase().replace(/[ .&]/g, '-') === potentialSkillId);
            }

            // Try Keyword match
            if (!foundSkill) {
                foundSkill = SKILLS.find(s => s.keywords.some(k => k === potentialSkillId));
            }

            if (foundSkill) break;
        }
    }

    // Fallback: Check if the whole first part is just a skill
    if (!foundSkill) {
        foundSkill = SKILLS.find(s => s.id === skillPart || s.keywords.includes(skillPart));
    }

    // 5. Extract Location
    let foundLocation = LOCATIONS.find(l => l.id === locationPart);

    // AUTO-GENERATE location if not found (Infinite Locations Feature)
    if (!foundLocation && locationPart.length > 1) {
        const niceName = locationPart.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        foundLocation = {
            id: locationPart,
            name: niceName,
            country: 'Global'
        };
    }

    if (!foundSkill || !foundLocation) return null;

    return {
        skill: foundSkill,
        location: foundLocation,
        suffix: usedSuffix || 'mentors',
        prefix: usedPrefix // Pass this back so we can use it in titles
    };
}
