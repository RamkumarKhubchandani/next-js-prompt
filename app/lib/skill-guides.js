/**
 * SKILL_GUIDES maps a skill + suffix pair to a corresponding technical guide slug.
 * Key format: `${skillId}:${suffix}`
 */
export const SKILL_GUIDES = {
  // React
  'react:mentors': 'mastering-useeffect',
  'react:tutors': 'mastering-useeffect',
  'react:job-support': 'mastering-useeffect',
  'react:interview-prep': 'frontend-interview-prep-2026-ai-copilot-era',
  'react:interview-help': 'frontend-interview-prep-2026-ai-copilot-era',
  'react:mock-interviews': 'frontend-interview-prep-2026-ai-copilot-era',
  'react:developers': 'react-compiler-vs-usememo-usecallback-2026',

  // Next.js
  'nextjs:mentors': 'nextjs-15-app-router',
  'nextjs:tutors': 'nextjs-15-app-router',
  'nextjs:developers': 'nextjs-15-production-setup-guide',
  'nextjs:job-support': 'nextjs-15-production-setup-guide',
  'nextjs:freelancers': 'nextjs-15-client-website-tutorial-for-freelancers',
  'nextjs:project-support': 'nextjs-15-client-website-tutorial-for-freelancers',

  // TypeScript
  'typescript:mentors': 'typescript-advanced-patterns',
  'typescript:tutors': 'typescript-advanced-patterns',
  'typescript:interview-prep': 'typescript-performance',
  'typescript:interview-help': 'typescript-performance',
  'typescript:developers': 'typescript-strict-mode-migration-guide-legacy-javascript',

  // JavaScript
  'javascript:mentors': 'var-vs-let-vs-const-javascript',
  'javascript:tutors': 'private-javascript-tutor-guide',
  'javascript:tutor': 'private-javascript-tutor-guide',
  'javascript:interview-prep': 'javascript-array-crud-operations-methods-push-pop-slice-splice',
  'javascript:interview-help': 'javascript-array-crud-operations-methods-push-pop-slice-splice',
  'javascript:developers': 'how-to-hire-a-javascript-developer',
  'javascript:developer': 'how-to-hire-a-javascript-developer',
  'javascript:freelancers': 'how-to-hire-a-javascript-developer',

  // Angular
  'angular:mentors': 'zoneless-angular',
  'angular:tutors': 'zoneless-angular',
  'angular:interview-prep': 'zoneless-angular',
  'angular:interview-help': 'zoneless-angular',
  'angular:job-support': 'signal-store-mastery',
  'angular:developers': 'angular-client-dashboard-tutorial-for-freelancers',
  'angular:developer': 'angular-client-dashboard-tutorial-for-freelancers',
  'angular:freelancers': 'angular-client-dashboard-tutorial-for-freelancers',
  'angular:project-support': 'angular-client-dashboard-tutorial-for-freelancers',

  // Zustand / State
  'zustand:mentors': 'zustand-state-management',
  'zustand:tutors': 'zustand-state-management',

  // HTML / CSS
  'html-css:mentors': 'css-css3-complete-step-by-step-guide-beginners-to-advanced',
  'html-css:tutors': 'css-css3-complete-step-by-step-guide-beginners-to-advanced',

  // Node.js
  'node:mentors': 'node-security-first',
  'node:tutors': 'node-security-first',
  'node:job-support': 'node-bun-deno-showdown',
  'node:developers': 'nodejs-developer-vs-freelancer-vs-agency',
  'node:developer': 'nodejs-developer-vs-freelancer-vs-agency',
  'node:freelancers': 'nodejs-developer-vs-freelancer-vs-agency',

  // Vue
  'vue:developers': 'how-to-hire-a-vuejs-consultant',
  'vue:developer': 'how-to-hire-a-vuejs-consultant',
  'vue:consultants': 'how-to-hire-a-vuejs-consultant',
  'vue:consultant': 'how-to-hire-a-vuejs-consultant',
  'vue:freelancers': 'vue-3-client-project-tutorial-for-freelancers',
  'vue:project-support': 'vue-3-client-project-tutorial-for-freelancers',

  // Svelte
  'svelte:mentors': 'svelte-5-interview-questions',
  'svelte:tutors': 'svelte-5-interview-questions',
  'svelte:interview-prep': 'svelte-5-interview-questions',
  'svelte:interview-help': 'svelte-5-interview-questions',
  'svelte:mock-interviews': 'svelte-5-interview-questions',

  // Full Stack
  'fullstack:mentors': 'mern-stack-roadmap-2026',
  'fullstack:tutors': 'mern-stack-roadmap-2026',
};

/**
 * Returns the guide slug for a given skill and suffix, or null if not mapped.
 * @param {string|object} skill - skill ID, skill name or skill object
 * @param {string} suffix - suffix string
 * @returns {string|null} - blog slug or null
 */
export function getSkillGuide(skill, suffix) {
  if (!skill || !suffix) return null;
  const skillKey = typeof skill === 'string'
    ? skill.toLowerCase().trim()
    : (skill.id || skill.name || '').toLowerCase().trim();
  const suffixKey = String(suffix).toLowerCase().trim();

  return (
    SKILL_GUIDES[`${skillKey}:${suffixKey}`] ||
    SKILL_GUIDES[`${skillKey}+${suffixKey}`] ||
    null
  );
}
