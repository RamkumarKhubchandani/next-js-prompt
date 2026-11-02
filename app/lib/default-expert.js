/**
 * Default static profile for site owner (Ramkumar Khubchandani).
 * Static, never fetched from the database.
 * Used as the ultimate fallback in expert matching.
 */
export const DEFAULT_EXPERT = {
  slug: 'ramkumar-khubchandani',
  displayName: 'Ramkumar Khubchandani',
  photoUrl: 'https://ui-avatars.com/api/?name=Ramkumar+Khubchandani&background=0284c7&color=fff&size=256',
  roles: ['mentor', 'hire'],
  interviewedAt: '2026-01-01T00:00:00.000Z',
  interviewedByOutlineDev: true,
  approvedAt: '2026-01-01T00:00:00.000Z',
  skillIds: [
    'react',
    'nextjs',
    'javascript',
    'nodejs',
    'typescript',
    'mongodb',
    'html-css',
    'vue',
    'react-native',
    'redux',
    'angular',
    'fullstack',
  ],
  skills: [
    { id: 'react', name: 'React' },
    { id: 'nextjs', name: 'Next.js' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'nodejs', name: 'Node.js' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'mongodb', name: 'MongoDB' },
  ],
  location: {
    id: 'jamnagar',
    name: 'Jamnagar',
    country: 'India',
  },
  timezone: 'Asia/Kolkata',
  yearsExperience: 12,
  languages: ['English', 'Hindi', 'Gujarati'],
  links: {
    github: 'https://github.com/ramkumarkhub',
    linkedin: 'https://www.linkedin.com/in/ramkumar-khubchandani/',
  },
  projects: [
    {
      title: 'OutlineDev Platform',
      description: 'Engineering mentorship, real-time developer tools, and architecture guides.',
      url: 'https://www.outlinedev.com',
    },
  ],
  mentor: {
    headline: 'Staff Frontend Architect & Lead Mentor (12+ Yrs Exp)',
    summary:
      'With over 12 years of web engineering experience, I mentor developers through live 1-on-1 coding sessions, production debugging, and system architecture deep dives. I focus on core fundamentals in React, Next.js, and TypeScript, helping engineers advance from junior to senior roles with clarity. Every session is practical and centered on real problems: unblocking difficult PRs, untangling state race conditions, mastering server-side rendering, and preparing for senior FAANG and startup technical interviews. I do not teach theoretical trivia; we write, profile, and test real production code together.',
    rate: 30,
    topics: ['System Design', 'React Architecture', 'Next.js & Performance', 'Mock Interviews'],
    formats: ['1-on-1 Live Mentorship', 'Sprint & Job Support', 'Code Reviews'],
  },
  hire: {
    headline: 'Senior Full-Stack & Frontend Architect (React, Next.js, Node)',
    summary:
      'With over 12 years of web engineering experience, I collaborate with founders, small business owners, and agency teams to build high-performance React and Next.js applications, scalable Node.js backends, and maintainable TypeScript codebases with zero architectural shortcuts. My engagements range from rapid MVP development and custom booking flows to deep performance audits, Core Web Vitals remediation, and enterprise dashboard architecture. I operate with direct accountability, clean Git workflows, comprehensive test coverage, and transparent milestone communication, delivering resilient solutions that your internal team can easily maintain and scale.',
    rate: 30,
    availability: 'Available for freelance & consulting',
    engagementTypes: ['Fixed Scope / Milestones', 'Hourly Consulting', 'Dedicated Part-Time'],
  },
};

export default DEFAULT_EXPERT;
