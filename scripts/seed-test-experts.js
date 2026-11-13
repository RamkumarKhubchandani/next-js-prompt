/**
 * Seed script for test experts.
 * Creates 3 test users and approved expert profiles:
 *  1. Marcus Mentor (mentor only)
 *  2. Hannah Hire (hire only)
 *  3. Brooke Both (both mentor and hire)
 *
 * MUST REFUSE TO RUN UNLESS SEED_ALLOW=1.
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import mongoose from 'mongoose';
import User from '../app/models/User.js';
import MentorApplication from '../app/models/MentorApplication.js';

// Strict safety check
if (process.env.SEED_ALLOW !== '1') {
  console.error('\n❌ ERROR: Refusing to run seed-test-experts.js without SEED_ALLOW=1');
  console.error('Usage: SEED_ALLOW=1 node scripts/seed-test-experts.js\n');
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is missing.');
  process.exit(1);
}

const TEST_EXPERTS = [
  {
    user: {
      email: 'test.mentor.only@outlinedev.com',
      name: 'Marcus Mentor',
      role: 'user',
      image: 'https://ui-avatars.com/api/?name=Marcus+Mentor&background=6366f1&color=fff',
    },
    application: {
      slug: 'marcus-mentor',
      displayName: 'Marcus Mentor',
      photoUrl: 'https://ui-avatars.com/api/?name=Marcus+Mentor&background=6366f1&color=fff',
      status: 'approved',
      roles: ['mentor'],
      interviewedAt: new Date('2026-02-10T10:00:00Z'),
      approvedAt: new Date('2026-02-12T12:00:00Z'),
      consents: {
        publicProfile: new Date('2026-02-09T08:00:00Z'),
        publicPhoto: new Date('2026-02-09T08:00:00Z'),
        realName: new Date('2026-02-09T08:00:00Z'),
        terms: new Date('2026-02-09T08:00:00Z'),
        mayInterview: new Date('2026-02-09T08:00:00Z'),
        receiveLeads: new Date('2026-02-09T08:00:00Z'),
      },
      published: {
        skillIds: ['react', 'nextjs', 'typescript'],
        locationId: 'jamnagar',
        timezone: 'Asia/Kolkata',
        yearsExperience: 8,
        languages: ['English', 'Hindi'],
        links: {
          github: 'https://github.com/marcusmentor',
          linkedin: 'https://linkedin.com/in/marcusmentor',
        },
        projects: [
          {
            title: 'React Devtools Deep Dive',
            description: 'Open source profiling and memory leak detection guide.',
            url: 'https://github.com/marcusmentor/profiler',
          },
        ],
        mentor: {
          headline: 'Senior React & Next.js Mentor specializing in System Architecture',
          summary:
            'With over 8 years of production web development experience, I help developers master advanced React patterns, Next.js server components, and clean state management. My mentorship is tailored for engineers preparing for senior technical interviews and developers navigating tricky production bugs. We focus on real codebases, profiling bottlenecks, untangling complex async flows, and building deep architectural clarity that accelerates career growth and engineering confidence.',
          rate: 35,
          topics: ['Next.js Architecture', 'React State Management', 'System Design', 'Code Reviews'],
          formats: ['1-on-1 Live Mentorship', 'Sprint & PR Support', 'Mock Interviews'],
        },
        hire: null,
      },
    },
  },
  {
    user: {
      email: 'test.hire.only@outlinedev.com',
      name: 'Hannah Hire',
      role: 'user',
      image: 'https://ui-avatars.com/api/?name=Hannah+Hire&background=10b981&color=fff',
    },
    application: {
      slug: 'hannah-hire',
      displayName: 'Hannah Hire',
      photoUrl: 'https://ui-avatars.com/api/?name=Hannah+Hire&background=10b981&color=fff',
      status: 'approved',
      roles: ['hire'],
      interviewedAt: null, // Tests profile without interviewed badge
      approvedAt: new Date('2026-02-14T15:00:00Z'),
      consents: {
        publicProfile: new Date('2026-02-11T09:00:00Z'),
        publicPhoto: new Date('2026-02-11T09:00:00Z'),
        realName: new Date('2026-02-11T09:00:00Z'),
        terms: new Date('2026-02-11T09:00:00Z'),
        mayInterview: new Date('2026-02-11T09:00:00Z'),
        receiveLeads: new Date('2026-02-11T09:00:00Z'),
      },
      published: {
        skillIds: ['nodejs', 'mongodb', 'javascript'],
        locationId: 'bangalore',
        timezone: 'Asia/Kolkata',
        yearsExperience: 6,
        languages: ['English'],
        links: {
          github: 'https://github.com/hannahhire',
          linkedin: 'https://linkedin.com/in/hannahhire',
        },
        projects: [
          {
            title: 'High-Throughput Node API',
            description: 'Microservices backend processing millions of events daily.',
            url: 'https://github.com/hannahhire/api-gateway',
          },
        ],
        mentor: null,
        hire: {
          headline: 'Full-Stack Node.js & MongoDB Specialist for Startups',
          summary:
            'I collaborate with engineering teams and startup founders to design, build, and optimize backend architectures using Node.js, Express, and MongoDB Atlas. My engagements range from rapid prototype execution and RESTful API integrations to database indexing audits and performance remediation. I work with high ownership, clean test-driven workflows, and transparent weekly deliverables, ensuring your system scales smoothly under increasing user demand.',
          rate: 40,
          availability: 'Part-Time Contract (20 hrs/week)',
          engagementTypes: ['Fixed Scope / Milestones', 'Hourly Consulting', 'Dedicated Part-Time'],
        },
      },
    },
  },
  {
    user: {
      email: 'test.both.roles@outlinedev.com',
      name: 'Brooke Both',
      role: 'user',
      image: 'https://ui-avatars.com/api/?name=Brooke+Both&background=f59e0b&color=fff',
    },
    application: {
      slug: 'brooke-both',
      displayName: 'Brooke Both',
      photoUrl: 'https://ui-avatars.com/api/?name=Brooke+Both&background=f59e0b&color=fff',
      status: 'approved',
      roles: ['mentor', 'hire'],
      interviewedAt: new Date('2026-02-15T11:00:00Z'),
      approvedAt: new Date('2026-02-16T14:00:00Z'),
      consents: {
        publicProfile: new Date('2026-02-12T10:00:00Z'),
        publicPhoto: new Date('2026-02-12T10:00:00Z'),
        realName: new Date('2026-02-12T10:00:00Z'),
        terms: new Date('2026-02-12T10:00:00Z'),
        mayInterview: new Date('2026-02-12T10:00:00Z'),
        receiveLeads: new Date('2026-02-12T10:00:00Z'),
      },
      published: {
        skillIds: ['react', 'nextjs', 'nodejs', 'typescript'],
        locationId: 'jamnagar',
        timezone: 'Asia/Kolkata',
        yearsExperience: 9,
        languages: ['English', 'Hindi', 'Gujarati'],
        links: {
          github: 'https://github.com/brookeboth',
          linkedin: 'https://linkedin.com/in/brookeboth',
        },
        projects: [
          {
            title: 'Enterprise Booking Engine',
            description: 'Scalable scheduling workflow with Next.js App Router.',
            url: 'https://github.com/brookeboth/booking-engine',
          },
        ],
        mentor: {
          headline: 'Full-Stack Mentor: React, Next.js, and Cloud Infrastructure',
          summary:
            'With nearly a decade of software engineering leadership, I guide working developers through real-world frontend and backend engineering. My sessions demystify modern TypeScript patterns, full-stack Next.js applications, server actions, and cloud deployment pipelines. Whether you are stepping into a tech lead role or preparing for tough technical evaluations, I provide structured feedback and practical hands-on pair programming sessions.',
          rate: 50,
          topics: ['Full-Stack Next.js', 'TypeScript Mastery', 'Career Transition', 'Architecture Review'],
          formats: ['1-on-1 Live Mentorship', 'Live Code Pairing', 'Mock Interviews'],
        },
        hire: {
          headline: 'Principal Full-Stack Architect & Senior Contract Developer',
          summary:
            'I help product organizations and ambitious teams build fast, accessible, and maintainable web applications using Next.js, React, Node.js, and TypeScript. With a focus on frontend performance and resilient backend design, I take projects from concept to production with zero unnecessary complexity. Available for high-impact advisory, milestone-driven sprints, or ongoing technical consulting.',
          rate: 55,
          availability: 'Available immediately for contract projects',
          engagementTypes: ['Fixed Scope / Milestones', 'Hourly Consulting', 'Full-Stack Architecture'],
        },
      },
    },
  },
];

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to database.');

  for (const item of TEST_EXPERTS) {
    // 1. Upsert User
    const user = await User.findOneAndUpdate(
      { email: item.user.email },
      { $set: item.user },
      { upsert: true, new: true }
    );
    console.log(`✓ User saved: ${user.email} (${user._id})`);

    // 2. Upsert MentorApplication
    const appData = {
      ...item.application,
      userId: user._id,
      draft: item.application.published, // Synchronize draft with published
    };

    const application = await MentorApplication.findOneAndUpdate(
      { slug: item.application.slug },
      { $set: appData },
      { upsert: true, new: true }
    );
    console.log(`✓ MentorApplication saved: /experts/${application.slug} [Roles: ${application.roles.join(', ')}]`);
  }

  console.log('\n✅ Successfully seeded 3 test experts:');
  console.log('  1. Marcus Mentor  -> /experts/marcus-mentor  (mentor only)');
  console.log('  2. Hannah Hire    -> /experts/hannah-hire    (hire only)');
  console.log('  3. Brooke Both    -> /experts/brooke-both    (both roles)');

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB. Done.\n');
}

seed().catch((err) => {
  console.error('❌ Seeding failed with error:', err);
  process.exit(1);
});
