export const SKILLS = [
    // Frontend - Core
    { id: 'javascript', name: 'JavaScript', keywords: ['js', 'es6', 'vanilla-js', 'ecmascript', 'frontend'] },
    { id: 'typescript', name: 'TypeScript', keywords: ['ts', 'type-script'] },
    { id: 'react', name: 'React', keywords: ['reactjs', 'react-js', 'react-native'] },
    { id: 'nextjs', name: 'Next.js', keywords: ['next-js', 'next', 'server-components', 'app-router'] },
    { id: 'vue', name: 'Vue.js', keywords: ['vuejs', 'vue-js', 'nuxt'] },
    { id: 'angular', name: 'Angular', keywords: ['angularjs', 'ng', 'rxJS'] },
    { id: 'svelte', name: 'Svelte', keywords: ['sveltejs', 'svelte-kit'] },
    { id: 'html-css', name: 'HTML & CSS', keywords: ['html', 'css', 'web-design', 'styling', 'sass', 'less'] },
    { id: 'tailwind', name: 'Tailwind CSS', keywords: ['tailwind', 'css-framework', 'utility-first'] },

    // Frontend - State & Libs
    { id: 'redux', name: 'Redux', keywords: ['state-management', 'redux-toolkit', 'rtk'] },
    { id: 'zustand', name: 'Zustand', keywords: ['state-management'] },
    { id: 'graphql', name: 'GraphQL', keywords: ['apollo', 'relay'] },
    { id: 'threejs', name: 'Three.js', keywords: ['3d', 'webgl', 'canvas'] },

    // Mobile
    { id: 'react-native', name: 'React Native', keywords: ['rn', 'ios', 'android', 'mobile-dev'] },
    { id: 'flutter', name: 'Flutter', keywords: ['dart', 'cross-platform'] },
    { id: 'swift', name: 'Swift', keywords: ['ios', 'cocoa'] },
    { id: 'kotlin', name: 'Kotlin', keywords: ['android', 'mobile'] },

    // Backend
    { id: 'node', name: 'Node.js', keywords: ['nodejs', 'back-end', 'express'] },
    { id: 'python', name: 'Python', keywords: ['py', 'django', 'flask', 'fastapi', 'selenium'] },
    { id: 'java', name: 'Java', keywords: ['springboot', 'spring-boot', 'jvm', 'jakarta'] },
    { id: 'csharp', name: 'C#', keywords: ['c-sharp', 'dotnet', '.net', 'asp.net', 'core'] },
    { id: 'go', name: 'Go', keywords: ['golang', 'systems'] },
    { id: 'rust', name: 'Rust', keywords: ['rs', 'systems'] },
    { id: 'php', name: 'PHP', keywords: ['laravel', 'wordpress', 'symfony'] },
    { id: 'ruby', name: 'Ruby', keywords: ['rails', 'ruby-on-rails'] },

    // Database
    { id: 'sql', name: 'SQL', keywords: ['mysql', 'postgresql', 'postgres', 'relational'] },
    { id: 'mongodb', name: 'MongoDB', keywords: ['mongo', 'nosql', 'mongoose'] },
    { id: 'redis', name: 'Redis', keywords: ['caching', 'kv-store'] },
    { id: 'supabase', name: 'Supabase', keywords: ['firebase', 'baas'] },

    // DevOps & Cloud
    { id: 'aws', name: 'AWS', keywords: ['cloud', 'amazon', 'ec2', 'lambda', 'serverless'] },
    { id: 'docker', name: 'Docker', keywords: ['containers', 'kubernetes', 'k8s'] },
    { id: 'ci-cd', name: 'CI/CD', keywords: ['jenkins', 'github-actions', 'gitlab-ci'] },
    { id: 'terraform', name: 'Terraform', keywords: ['iac', 'infrastructure'] },
    { id: 'kubernetes', name: 'Kubernetes', keywords: ['k8s', 'orchestration'] },

    // AI & Special
    { id: 'ai', name: 'AI & Machine Learning', keywords: ['ml', 'artificial-intelligence', 'llm', 'chatgpt', 'openai'] },
    { id: 'generative-ai', name: 'Generative AI', keywords: ['genai', 'stable-diffusion', 'midjourney', 'llms'] },
    { id: 'blockchain', name: 'Blockchain', keywords: ['web3', 'crypto', 'solidity', 'smart-contracts'] },
    { id: 'cybersecurity', name: 'Cybersecurity', keywords: ['infosec', 'penetration-testing', 'ethical-hacking'] },
    { id: 'data-science', name: 'Data Science', keywords: ['pandas', 'numpy', 'jupyter', 'analysis'] },

    // Testing & Automation
    { id: 'playwright', name: 'Playwright', keywords: ['e2e', 'automation', 'testing', 'qa-automation'] },
    { id: 'cypress', name: 'Cypress', keywords: ['e2e', 'automation'] },
    { id: 'selenium', name: 'Selenium', keywords: ['automation', 'webdriver'] },

    // High Intent & Specialized Services
    { id: 'frontend-engineering', name: 'Frontend Engineering', keywords: ['frontend', 'fe-it', 'frontend-developer', 'fe-developer', 'frontend-architecture', 'fe-engineer'] },
    { id: 'website-design', name: 'Website Design', keywords: ['web-design', 'website-development', 'ui-ux', 'responsive-design', 'landing-page-design', 'web-designer'] },
    { id: 'job-support', name: 'IT Job Support', keywords: ['job-support', 'it-job-support', 'project-support', 'sprint-support', 'on-the-job-support', 'daily-standup-support'] },
    { id: 'fullstack', name: 'Full Stack Development', keywords: ['full-stack', 'mern', 'mern-stack', 'mean', 'fullstack-developer'] },
    { id: 'aifrontend', name: 'AI Frontend Development', keywords: ['aifrontend', 'ai-frontend', 'ai-fe', 'genai-frontend', 'ai-front-end'] },
];

export const LOCATIONS = [
    // Generic / Online
    { id: 'online', name: 'Online', country: 'Global' },
    { id: 'remote', name: 'Remote', country: 'Global' },
    { id: 'near-me', name: 'Near Me', country: 'Local' },

    // USA Tech Hubs
    { id: 'usa', name: 'USA', country: 'United States' },
    { id: 'san-francisco', name: 'San Francisco', country: 'USA' },
    { id: 'new-york', name: 'New York', country: 'USA' },
    { id: 'austin', name: 'Austin', country: 'USA' },
    { id: 'seattle', name: 'Seattle', country: 'USA' },
    { id: 'boston', name: 'Boston', country: 'USA' },
    { id: 'los-angeles', name: 'Los Angeles', country: 'USA' },
    { id: 'chicago', name: 'Chicago', country: 'USA' },
    { id: 'silicon-valley', name: 'Silicon Valley', country: 'USA' },

    // UK
    { id: 'london', name: 'London', country: 'UK' },
    { id: 'manchester', name: 'Manchester', country: 'UK' },
    { id: 'birmingham', name: 'Birmingham', country: 'UK' },
    { id: 'leeds', name: 'Leeds', country: 'UK' },
    { id: 'glasgow', name: 'Glasgow', country: 'UK' },
    { id: 'liverpool', name: 'Liverpool', country: 'UK' },
    { id: 'bristol', name: 'Bristol', country: 'UK' },
    { id: 'edinburgh', name: 'Edinburgh', country: 'UK' },
    { id: 'uk', name: 'UK', country: 'United Kingdom' },

    // India - Extensive Coverage
    { id: 'india', name: 'India', country: 'India' },
    { id: 'bangalore', name: 'Bangalore', country: 'India' },
    { id: 'hyderabad', name: 'Hyderabad', country: 'India' },
    { id: 'pune', name: 'Pune', country: 'India' },
    { id: 'gurgaon', name: 'Gurgaon', country: 'India' },
    { id: 'noida', name: 'Noida', country: 'India' },
    { id: 'chennai', name: 'Chennai', country: 'India' },
    { id: 'mumbai', name: 'Mumbai', country: 'India' },
    { id: 'ahmedabad', name: 'Ahmedabad', country: 'India' },
    { id: 'delhi', name: 'Delhi', country: 'India' },
    { id: 'kolkata', name: 'Kolkata', country: 'India' },
    { id: 'jaipur', name: 'Jaipur', country: 'India' },
    { id: 'surat', name: 'Surat', country: 'India' },
    { id: 'lucknow', name: 'Lucknow', country: 'India' },
    { id: 'kanpur', name: 'Kanpur', country: 'India' },
    { id: 'nagpur', name: 'Nagpur', country: 'India' },
    { id: 'indore', name: 'Indore', country: 'India' },
    { id: 'thane', name: 'Thane', country: 'India' },
    { id: 'bhopal', name: 'Bhopal', country: 'India' },
    { id: 'visakhapatnam', name: 'Visakhapatnam', country: 'India' },
    { id: 'patna', name: 'Patna', country: 'India' },
    { id: 'vadodara', name: 'Vadodara', country: 'India' },
    { id: 'ghaziabad', name: 'Ghaziabad', country: 'India' },
    { id: 'ludhiana', name: 'Ludhiana', country: 'India' },
    { id: 'agra', name: 'Agra', country: 'India' },
    { id: 'nashik', name: 'Nashik', country: 'India' },
    { id: 'faridabad', name: 'Faridabad', country: 'India' },
    { id: 'meerut', name: 'Meerut', country: 'India' },
    { id: 'rajkot', name: 'Rajkot', country: 'India' },
    { id: 'varanasi', name: 'Varanasi', country: 'India' },
    { id: 'srinagar', name: 'Srinagar', country: 'India' },
    { id: 'aurangabad', name: 'Aurangabad', country: 'India' },
    { id: 'dhanbad', name: 'Dhanbad', country: 'India' },
    { id: 'amritsar', name: 'Amritsar', country: 'India' },
    { id: 'navi-mumbai', name: 'Navi Mumbai', country: 'India' },
    { id: 'allahabad', name: 'Allahabad', country: 'India' },
    { id: 'ranchi', name: 'Ranchi', country: 'India' },
    { id: 'coimbatore', name: 'Coimbatore', country: 'India' },
    { id: 'jabalpur', name: 'Jabalpur', country: 'India' },
    { id: 'gwalior', name: 'Gwalior', country: 'India' },
    { id: 'vijayawada', name: 'Vijayawada', country: 'India' },
    { id: 'jodhpur', name: 'Jodhpur', country: 'India' },
    { id: 'madurai', name: 'Madurai', country: 'India' },
    { id: 'raipur', name: 'Raipur', country: 'India' },
    { id: 'chandigarh', name: 'Chandigarh', country: 'India' },
    { id: 'guwahati', name: 'Guwahati', country: 'India' },
    { id: 'mysore', name: 'Mysore', country: 'India' },
    { id: 'kochi', name: 'Kochi', country: 'India' },
    { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', country: 'India' },
    { id: 'bhubaneswar', name: 'Bhubaneswar', country: 'India' },
    { id: 'dehradun', name: 'Dehradun', country: 'India' },

    // Europe - Expanded
    { id: 'europe', name: 'Europe', country: 'Europe' },
    { id: 'berlin', name: 'Berlin', country: 'Germany' },
    { id: 'munich', name: 'Munich', country: 'Germany' },
    { id: 'hamburg', name: 'Hamburg', country: 'Germany' },
    { id: 'frankfurt', name: 'Frankfurt', country: 'Germany' },
    { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands' },
    { id: 'rotterdam', name: 'Rotterdam', country: 'Netherlands' },
    { id: 'stockholm', name: 'Stockholm', country: 'Sweden' },
    { id: 'paris', name: 'Paris', country: 'France' },
    { id: 'lyon', name: 'Lyon', country: 'France' },
    { id: 'dublin', name: 'Dublin', country: 'Ireland' },
    { id: 'zurich', name: 'Zurich', country: 'Switzerland' },
    { id: 'geneva', name: 'Geneva', country: 'Switzerland' },
    { id: 'london', name: 'London', country: 'UK' },
    { id: 'madrid', name: 'Madrid', country: 'Spain' },
    { id: 'barcelona', name: 'Barcelona', country: 'Spain' },
    { id: 'rome', name: 'Rome', country: 'Italy' },
    { id: 'milan', name: 'Milan', country: 'Italy' },
    { id: 'vienna', name: 'Vienna', country: 'Austria' },
    { id: 'brussels', name: 'Brussels', country: 'Belgium' },
    { id: 'lisbon', name: 'Lisbon', country: 'Portugal' },
    { id: 'warsaw', name: 'Warsaw', country: 'Poland' },
    { id: 'prague', name: 'Prague', country: 'Czech Republic' },
    { id: 'budapest', name: 'Budapest', country: 'Hungary' },
    { id: 'copenhagen', name: 'Copenhagen', country: 'Denmark' },
    { id: 'oslo', name: 'Oslo', country: 'Norway' },
    { id: 'helsinki', name: 'Helsinki', country: 'Finland' },

    // Canada & APAC - Expanded
    { id: 'canada', name: 'Canada', country: 'Canada' },
    { id: 'toronto', name: 'Toronto', country: 'Canada' },
    { id: 'vancouver', name: 'Vancouver', country: 'Canada' },
    { id: 'montreal', name: 'Montreal', country: 'Canada' },
    { id: 'calgary', name: 'Calgary', country: 'Canada' },
    { id: 'ottawa', name: 'Ottawa', country: 'Canada' },
    { id: 'edmonton', name: 'Edmonton', country: 'Canada' },
    // APAC
    { id: 'asia', name: 'Asia', country: 'Asia' },
    { id: 'singapore', name: 'Singapore', country: 'Singapore' },
    { id: 'australia', name: 'Australia', country: 'Australia' },
    { id: 'sydney', name: 'Sydney', country: 'Australia' },
    { id: 'melbourne', name: 'Melbourne', country: 'Australia' },
    { id: 'brisbane', name: 'Brisbane', country: 'Australia' },
    { id: 'perth', name: 'Perth', country: 'Australia' },
    { id: 'adelaide', name: 'Adelaide', country: 'Australia' },
    { id: 'auckland', name: 'Auckland', country: 'New Zealand' },
    { id: 'tokyo', name: 'Tokyo', country: 'Japan' },
    { id: 'hong-kong', name: 'Hong Kong', country: 'Hong Kong' },
    { id: 'bangkok', name: 'Bangkok', country: 'Thailand' },
    { id: 'kuala-lumpur', name: 'Kuala Lumpur', country: 'Malaysia' },
    { id: 'jakarta', name: 'Jakarta', country: 'Indonesia' },
    { id: 'manila', name: 'Manila', country: 'Philippines' },
    { id: 'seoul', name: 'Seoul', country: 'South Korea' },
    // Middle East / Africa
    { id: 'dubai', name: 'Dubai', country: 'UAE' },
    { id: 'abu-dhabi', name: 'Abu Dhabi', country: 'UAE' },
    { id: 'riyadh', name: 'Riyadh', country: 'Saudi Arabia' },
    { id: 'tel-aviv', name: 'Tel Aviv', country: 'Israel' },
    { id: 'jerusalem', name: 'Jerusalem', country: 'Israel' },
    { id: 'cairo', name: 'Cairo', country: 'Egypt' },
    { id: 'johannesburg', name: 'Johannesburg', country: 'South Africa' },
    { id: 'cape-town', name: 'Cape Town', country: 'South Africa' },
    { id: 'lagos', name: 'Lagos', country: 'Nigeria' },
    { id: 'nairobi', name: 'Nairobi', country: 'Kenya' },

    // South America
    { id: 'brazil', name: 'Brazil', country: 'Brazil' },
    { id: 'sao-paulo', name: 'Sao Paulo', country: 'Brazil' },
    { id: 'rio-de-janeiro', name: 'Rio de Janeiro', country: 'Brazil' },
    { id: 'buenos-aires', name: 'Buenos Aires', country: 'Argentina' },
    { id: 'bogota', name: 'Bogota', country: 'Colombia' },
    { id: 'mexico-city', name: 'Mexico City', country: 'Mexico' },
];

export const SUFFIXES = [
    // 1. Multi-word Compound Suffixes (Must match first before single-word suffixes)
    'interview-help',
    'debugging-help',
    'troubleshooting-help',
    'interview-prep',
    'mock-interviews',
    'job-support',
    'project-support',
    'project-help',
    'assignment-help',
    'homework-help',
    'exam-help',
    'coursework-help',
    'tutoring-help',
    'online-classes',
    'crash-course',
    'code-review',

    // 2. Hiring & Staffing (Plural & Singular)
    'developers',
    'developer',
    'engineers',
    'engineer',
    'programmers',
    'programmer',
    'coders',
    'coder',
    'freelancers',
    'freelancer',
    'consultants',
    'consultant',
    'contractors',
    'contractor',
    'architects',
    'architect',
    'experts',
    'expert',
    'specialists',
    'specialist',

    // 3. Mentorship & Coaching
    'mentors',
    'mentor',
    'tutors',
    'tutor',
    'teachers',
    'teacher',
    'coaches',
    'coach',
    'trainers',
    'trainer',
    'instructors',
    'instructor',
    'guide',

    // 4. Single-Word Problem Solving
    'troubleshooting',
    'debugging',
    'consulting',
    'support',
    'help',
];

export const PREFIXES = [
    // Service Type
    'hire',
    'find',
    'best',
    'top',
    'top-rated',
    'expert',
    'senior',
    'professional',
    'certified',

    // Engagement Model
    'freelance',
    'remote',
    'online',
    'part-time',
    'contract',
    'full-time',
    'one-to-one',
    '1-on-1',
    'private',
    'personal',

    // Urgency/Price
    'urgent',
    'instant',
    'cheap',
    'affordable',
    'premium',
];

export function parseSeoSlug(slug) {
    let normalizedSlug = slug.toLowerCase();

    // 1. Handle "near-me" queries
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

    // 4. Extract Skill by matching longest suffixes first
    let foundSkill = null;
    let usedSuffix = '';

    const sortedSuffixes = [...SUFFIXES].sort((a, b) => b.length - a.length);

    for (const suffix of sortedSuffixes) {
        if (skillPart.endsWith('-' + suffix)) {
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

            if (foundSkill) {
                usedSuffix = suffix;
                break;
            }
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
        prefix: usedPrefix
    };
}
