/**
 * Seed script for test expert profiles.
 * Creates 6 approved test profiles across different skills and locations:
 *  - 2 with multiple locations (Aarav Sharma: pune/bangalore/mumbai, Priya Patel: london/manchester)
 *  - 1 online-only (Rohan Verma: online)
 *  - 3 others with single/varied locations (Dev Kapoor: pune, Ananya Iyer: bangalore, Marcus Vance: san-francisco)
 *
 * Guarded: Refuses to run if NODE_ENV=production or MONGODB_URI does not contain 'test'.
 * Supports --clean flag to delete only records with slugs prefixed 'test-'.
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import mongoose from 'mongoose';
import User from '../app/models/User.js';
import MentorApplication from '../app/models/MentorApplication.js';

// Guard: Refuse to run in production
if (process.env.NODE_ENV === 'production') {
  console.error('\n❌ ERROR: Refusing to run seed-test-experts.mjs in production environment (NODE_ENV === "production").');
  process.exit(1);
}

// Guard: MONGODB_URI must contain "test"
const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI || !MONGODB_URI.toLowerCase().includes('test')) {
  console.error('\n❌ ERROR: Refusing to run seed-test-experts.mjs: MONGODB_URI must contain "test" (e.g., mongodb+srv://.../outlinedev_test).');
  console.error(`Current MONGODB_URI: "${MONGODB_URI ? '[MASKED: ' + MONGODB_URI.split('@').pop() + ']' : '(empty)'}"\n`);
  process.exit(1);
}

const isClean = process.argv.includes('--clean');

const TEST_PROFILES = [
  {
    user: {
      email: 'test-expert-aarav@outlinedev-test.local',
      name: 'Aarav Sharma',
      role: 'user',
      image: 'https://ui-avatars.com/api/?name=Aarav+Sharma&background=0284c7&color=fff',
    },
    application: {
      slug: 'test-aarav-sharma',
      displayName: 'Aarav Sharma',
      photoUrl: 'https://ui-avatars.com/api/?name=Aarav+Sharma&background=0284c7&color=fff',
      status: 'approved',
      roles: ['mentor', 'hire'],
      interviewedAt: new Date('2026-02-10T10:00:00Z'),
      approvedAt: new Date('2026-02-12T12:00:00Z'),
      whatsapp: '+919876543210',
      consents: {
        publicProfile: new Date('2026-02-09T08:00:00Z'),
        publicPhoto: new Date('2026-02-09T08:00:00Z'),
        realName: new Date('2026-02-09T08:00:00Z'),
        terms: new Date('2026-02-09T08:00:00Z'),
        mayInterview: new Date('2026-02-09T08:00:00Z'),
        receiveLeads: new Date('2026-02-09T08:00:00Z'),
      },
      published: {
        displayName: 'Aarav Sharma',
        photoUrl: 'https://ui-avatars.com/api/?name=Aarav+Sharma&background=0284c7&color=fff',
        roles: ['mentor', 'hire'],
        skillIds: ['react', 'nextjs', 'typescript', 'javascript'],
        locationId: 'pune',
        locationIds: ['pune', 'bangalore', 'mumbai'],
        overlapZones: ['IST', 'GST'],
        timezone: 'Asia/Kolkata',
        yearsExperience: 8,
        languages: ['English', 'Hindi'],
        links: {
          github: 'https://github.com/test-aarav',
          linkedin: 'https://linkedin.com/in/test-aarav',
        },
        projects: [
          {
            title: 'NextGen Analytics Platform',
            description: 'Scalable analytics platform built with Next.js App Router and React Server Components.',
            url: 'https://github.com/test-aarav/nextgen-analytics',
          },
        ],
        mentor: {
          headline: 'Senior React & Next.js Architect | 8+ Years Production Experience',
          summary:
            'I specialize in mentoring frontend engineers transitioning to senior or staff-level roles. Our sessions focus on mastering Next.js App Router, modern state architecture, and profiling complex React applications for speed and resilience. I bring real production battle-scars to the table, walking through architectural blueprints and hands-on pair programming sessions.',
          rate: 1500,
          topics: ['Next.js Architecture', 'React Performance Profiling', 'Design Systems', 'Mock Interviews'],
          formats: ['1-on-1 Live Mentorship', 'Code Reviews', 'Interview Prep'],
        },
        hire: {
          headline: 'Full-Stack React & Node.js Engineer for High-Growth Startups',
          summary:
            'I build scalable web apps, clean REST/GraphQL APIs, and robust frontend design systems. With high ownership and pragmatic engineering discipline, I help startups ship production MVPs on time and optimize existing applications for massive user traffic. Available for milestone contracts or dedicated monthly retainers.',
          rate: 3000,
          availability: 'Full-time / Contract (30+ hrs/week)',
          engagementTypes: ['Fixed Scope / Milestones', 'Hourly Consulting', 'Dedicated Part-Time'],
        },
      },
    },
  },
  {
    user: {
      email: 'test-expert-priya@outlinedev-test.local',
      name: 'Priya Patel',
      role: 'user',
      image: 'https://ui-avatars.com/api/?name=Priya+Patel&background=10b981&color=fff',
    },
    application: {
      slug: 'test-priya-patel',
      displayName: 'Priya Patel',
      photoUrl: 'https://ui-avatars.com/api/?name=Priya+Patel&background=10b981&color=fff',
      status: 'approved',
      roles: ['mentor', 'hire'],
      interviewedAt: new Date('2026-02-15T11:00:00Z'),
      approvedAt: new Date('2026-02-16T14:00:00Z'),
      whatsapp: '+447911123456',
      consents: {
        publicProfile: new Date('2026-02-11T09:00:00Z'),
        publicPhoto: new Date('2026-02-11T09:00:00Z'),
        realName: new Date('2026-02-11T09:00:00Z'),
        terms: new Date('2026-02-11T09:00:00Z'),
        mayInterview: new Date('2026-02-11T09:00:00Z'),
        receiveLeads: new Date('2026-02-11T09:00:00Z'),
      },
      published: {
        displayName: 'Priya Patel',
        photoUrl: 'https://ui-avatars.com/api/?name=Priya+Patel&background=10b981&color=fff',
        roles: ['mentor', 'hire'],
        skillIds: ['react', 'node', 'fullstack', 'mongodb'],
        locationId: 'london',
        locationIds: ['london', 'manchester'],
        overlapZones: ['EU', 'IST'],
        timezone: 'Europe/London',
        yearsExperience: 7,
        languages: ['English', 'Gujarati'],
        links: {
          github: 'https://github.com/test-priya',
          linkedin: 'https://linkedin.com/in/test-priya',
        },
        projects: [
          {
            title: 'Fintech Microservices Gateway',
            description: 'Event-driven payment processing platform handling thousands of transactions per minute.',
            url: 'https://github.com/test-priya/fintech-gateway',
          },
        ],
        mentor: {
          headline: 'Full-Stack Node & React Specialist | Microservices & API Engineering',
          summary:
            'I mentor developers seeking deep mastery of backend microservices, Node.js event loops, and full-stack React applications. From database indexing in MongoDB to resilient distributed system design, I guide mentees through real challenges so they can confidently build high-availability backends.',
          rate: 2000,
          topics: ['Node.js Event Loop', 'Microservices Architecture', 'Database Optimization', 'Career Growth'],
          formats: ['1-on-1 Live Mentorship', 'System Design Review'],
        },
        hire: {
          headline: 'Senior Backend & Full-Stack Contractor | Node.js, React, Mongo',
          summary:
            'Experienced contractor building enterprise-grade Node.js APIs and full-stack web platforms. I collaborate closely with engineering teams to refactor legacy bottlenecks, build scalable backend services, and establish modern CI/CD deployment pipelines.',
          rate: 4500,
          availability: 'Contract (20-30 hrs/week)',
          engagementTypes: ['Milestone Delivery', 'Hourly Consulting'],
        },
      },
    },
  },
  {
    user: {
      email: 'test-expert-rohan@outlinedev-test.local',
      name: 'Rohan Verma',
      role: 'user',
      image: 'https://ui-avatars.com/api/?name=Rohan+Verma&background=f59e0b&color=fff',
    },
    application: {
      slug: 'test-rohan-verma',
      displayName: 'Rohan Verma',
      photoUrl: 'https://ui-avatars.com/api/?name=Rohan+Verma&background=f59e0b&color=fff',
      status: 'approved',
      roles: ['mentor', 'hire'],
      interviewedAt: null,
      approvedAt: new Date('2026-02-14T15:00:00Z'),
      whatsapp: '+919123456789',
      consents: {
        publicProfile: new Date('2026-02-12T10:00:00Z'),
        publicPhoto: new Date('2026-02-12T10:00:00Z'),
        realName: new Date('2026-02-12T10:00:00Z'),
        terms: new Date('2026-02-12T10:00:00Z'),
        mayInterview: new Date('2026-02-12T10:00:00Z'),
        receiveLeads: new Date('2026-02-12T10:00:00Z'),
      },
      published: {
        displayName: 'Rohan Verma',
        photoUrl: 'https://ui-avatars.com/api/?name=Rohan+Verma&background=f59e0b&color=fff',
        roles: ['mentor', 'hire'],
        skillIds: ['react', 'vue', 'javascript', 'tailwind'],
        locationId: 'online',
        locationIds: ['online'],
        overlapZones: ['IST', 'APAC'],
        timezone: 'Asia/Kolkata',
        yearsExperience: 5,
        languages: ['English', 'Hindi'],
        links: {
          github: 'https://github.com/test-rohan',
          linkedin: 'https://linkedin.com/in/test-rohan',
        },
        projects: [
          {
            title: 'Design System & Component Library',
            description: 'Zero-runtime CSS component library with accessible primitive widgets and full dark mode.',
            url: 'https://github.com/test-rohan/ui-primitives',
          },
        ],
        mentor: {
          headline: 'Modern UI/UX Engineer & Frontend Mentor | React, Vue & CSS',
          summary:
            'Passionate about UI craft, accessibility, and modern component systems. I help mentees build clean, accessible, and delight-inducing user interfaces using React, Vue, and Tailwind CSS. We will refine your frontend craft, build polished portfolio projects, and prep for technical UI screens.',
          rate: 1200,
          topics: ['Frontend Architecture', 'Tailwind CSS Mastery', 'Design Tokens', 'Accessibility (a11y)'],
          formats: ['1-on-1 Mentorship', 'Portfolio Reviews'],
        },
        hire: {
          headline: 'Remote Frontend Developer | Pixel-Perfect Web Applications',
          summary:
            'I turn Figma mockups into responsive, fluid, and production-ready React and Vue interfaces. Deep expertise with Tailwind CSS, state management, and accessible interactions. Dedicated remote contributor ready to boost your frontend velocity.',
          rate: 2500,
          availability: 'Part-Time / Full-Time Remote',
          engagementTypes: ['Hourly Consulting', 'Dedicated Part-Time'],
        },
      },
    },
  },
  {
    user: {
      email: 'test-expert-dev@outlinedev-test.local',
      name: 'Dev Kapoor',
      role: 'user',
      image: 'https://ui-avatars.com/api/?name=Dev+Kapoor&background=8b5cf6&color=fff',
    },
    application: {
      slug: 'test-dev-kapoor',
      displayName: 'Dev Kapoor',
      photoUrl: 'https://ui-avatars.com/api/?name=Dev+Kapoor&background=8b5cf6&color=fff',
      status: 'approved',
      roles: ['mentor', 'hire'],
      interviewedAt: null,
      approvedAt: new Date('2026-02-18T10:00:00Z'),
      whatsapp: '+919988776655',
      consents: {
        publicProfile: new Date('2026-02-14T08:00:00Z'),
        publicPhoto: new Date('2026-02-14T08:00:00Z'),
        realName: new Date('2026-02-14T08:00:00Z'),
        terms: new Date('2026-02-14T08:00:00Z'),
        mayInterview: new Date('2026-02-14T08:00:00Z'),
        receiveLeads: new Date('2026-02-14T08:00:00Z'),
      },
      published: {
        displayName: 'Dev Kapoor',
        photoUrl: 'https://ui-avatars.com/api/?name=Dev+Kapoor&background=8b5cf6&color=fff',
        roles: ['mentor', 'hire'],
        skillIds: ['react', 'node', 'aws', 'docker'],
        locationId: 'pune',
        locationIds: ['pune'],
        overlapZones: ['IST'],
        timezone: 'Asia/Kolkata',
        yearsExperience: 6,
        languages: ['English', 'Marathi'],
        links: {
          github: 'https://github.com/test-dev',
          linkedin: 'https://linkedin.com/in/test-dev',
        },
        projects: [
          {
            title: 'Containerized CI/CD Deployment Harness',
            description: 'Automated multi-stage Docker deployment pipeline with zero downtime deployment on AWS ECS.',
            url: 'https://github.com/test-dev/cloud-deploy',
          },
        ],
        mentor: {
          headline: 'Full-Stack & Cloud DevOps Mentor | Pune | AWS & Node.js',
          summary:
            'I bridge the gap between application code and cloud infrastructure. I guide engineers through containerization with Docker, deploying resilient Node.js services on AWS, and architecting fault-tolerant full-stack applications.',
          rate: 1400,
          topics: ['Cloud Deployment (AWS)', 'Docker & Containers', 'Node.js Backend', 'CI/CD Pipelines'],
          formats: ['1-on-1 Mentorship', 'Live Architecture Pairing'],
        },
        hire: {
          headline: 'DevOps & Full-Stack Engineer | Docker, Node & AWS',
          summary:
            'Freelance engineer available for cloud migration, infrastructure containerization, and backend API engineering. Reliable and proactive partner for teams aiming to deploy with confidence.',
          rate: 2800,
          availability: 'Flexible (15-25 hrs/week)',
          engagementTypes: ['Fixed Scope / Milestones', 'Hourly Consulting'],
        },
      },
    },
  },
  {
    user: {
      email: 'test-expert-ananya@outlinedev-test.local',
      name: 'Ananya Iyer',
      role: 'user',
      image: 'https://ui-avatars.com/api/?name=Ananya+Iyer&background=ec4899&color=fff',
    },
    application: {
      slug: 'test-ananya-iyer',
      displayName: 'Ananya Iyer',
      photoUrl: 'https://ui-avatars.com/api/?name=Ananya+Iyer&background=ec4899&color=fff',
      status: 'approved',
      roles: ['mentor'],
      interviewedAt: new Date('2026-02-20T12:00:00Z'),
      approvedAt: new Date('2026-02-21T09:00:00Z'),
      whatsapp: '+919871122334',
      consents: {
        publicProfile: new Date('2026-02-15T09:00:00Z'),
        publicPhoto: new Date('2026-02-15T09:00:00Z'),
        realName: new Date('2026-02-15T09:00:00Z'),
        terms: new Date('2026-02-15T09:00:00Z'),
        mayInterview: new Date('2026-02-15T09:00:00Z'),
        receiveLeads: new Date('2026-02-15T09:00:00Z'),
      },
      published: {
        displayName: 'Ananya Iyer',
        photoUrl: 'https://ui-avatars.com/api/?name=Ananya+Iyer&background=ec4899&color=fff',
        roles: ['mentor'],
        skillIds: ['python', 'ai', 'sql'],
        locationId: 'bangalore',
        locationIds: ['bangalore'],
        overlapZones: ['IST', 'US-WEST'],
        timezone: 'Asia/Kolkata',
        yearsExperience: 9,
        languages: ['English', 'Tamil'],
        links: {
          github: 'https://github.com/test-ananya',
          linkedin: 'https://linkedin.com/in/test-ananya',
        },
        projects: [
          {
            title: 'LLM Document Parsing Engine',
            description: 'High-accuracy RAG pipeline with vector indexing and semantic chunking using Python and PostgreSQL.',
            url: 'https://github.com/test-ananya/rag-pipeline',
          },
        ],
        mentor: {
          headline: 'Python & AI Engineer | Machine Learning & LLM Systems Mentor',
          summary:
            'I help developers break into AI engineering and production Python development. From crafting robust retrieval-augmented generation (RAG) pipelines to tuning SQL database queries, I offer focused mentorship tailored to practical software engineering and machine learning workflows.',
          rate: 2200,
          topics: ['Python Mastery', 'Generative AI & LLMs', 'SQL & Vector Search', 'RAG Systems'],
          formats: ['1-on-1 Mentorship', 'Hands-on Pairing'],
        },
        hire: null,
      },
    },
  },
  {
    user: {
      email: 'test-expert-marcus@outlinedev-test.local',
      name: 'Marcus Vance',
      role: 'user',
      image: 'https://ui-avatars.com/api/?name=Marcus+Vance&background=14b8a6&color=fff',
    },
    application: {
      slug: 'test-marcus-vance',
      displayName: 'Marcus Vance',
      photoUrl: 'https://ui-avatars.com/api/?name=Marcus+Vance&background=14b8a6&color=fff',
      status: 'approved',
      roles: ['hire'],
      interviewedAt: null,
      approvedAt: new Date('2026-02-22T14:00:00Z'),
      whatsapp: '+14155552671',
      consents: {
        publicProfile: new Date('2026-02-18T10:00:00Z'),
        publicPhoto: new Date('2026-02-18T10:00:00Z'),
        realName: new Date('2026-02-18T10:00:00Z'),
        terms: new Date('2026-02-18T10:00:00Z'),
        mayInterview: new Date('2026-02-18T10:00:00Z'),
        receiveLeads: new Date('2026-02-18T10:00:00Z'),
      },
      published: {
        displayName: 'Marcus Vance',
        photoUrl: 'https://ui-avatars.com/api/?name=Marcus+Vance&background=14b8a6&color=fff',
        roles: ['hire'],
        skillIds: ['node', 'go', 'kubernetes', 'aws'],
        locationId: 'san-francisco',
        locationIds: ['san-francisco'],
        overlapZones: ['US-WEST', 'US-EAST'],
        timezone: 'America/Los_Angeles',
        yearsExperience: 10,
        languages: ['English'],
        links: {
          github: 'https://github.com/test-marcus-v',
          linkedin: 'https://linkedin.com/in/test-marcus-v',
        },
        projects: [
          {
            title: 'Distributed Kubernetes Service Mesh',
            description: 'Zero-trust networking layer connecting distributed Go microservices with mutual TLS.',
            url: 'https://github.com/test-marcus-v/k8s-mesh',
          },
        ],
        mentor: null,
        hire: {
          headline: 'Principal Backend & Distributed Systems Contractor | Go, Node, K8s',
          summary:
            'I design and implement resilient distributed systems, high-throughput microservices, and cloud-native infrastructure on AWS and Kubernetes. Available for technical architecture audits, system redesigns, and high-impact advisory contracts.',
          rate: 6500,
          availability: 'Contract & Advisory (10-20 hrs/week)',
          engagementTypes: ['Architecture Advisory', 'Milestone Delivery'],
        },
      },
    },
  },
];

async function main() {
  console.log('Connecting to MongoDB test database...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected successfully.');

  if (isClean) {
    console.log('\n🧹 Cleaning seeded test profiles (slug matching /^test-/)...');
    const delApps = await MentorApplication.deleteMany({ slug: /^test-/ });
    const delUsers = await User.deleteMany({ email: /^test-expert-.*@outlinedev-test\.local$/ });
    console.log(`✓ Deleted ${delApps.deletedCount} test MentorApplication records.`);
    console.log(`✓ Deleted ${delUsers.deletedCount} test User records.`);
    console.log('✨ Cleanup complete.\n');
    await mongoose.disconnect();
    return;
  }

  console.log('\n🌱 Seeding 6 approved test expert profiles...');

  for (const item of TEST_PROFILES) {
    const user = await User.findOneAndUpdate(
      { email: item.user.email },
      { $set: item.user },
      { upsert: true, new: true }
    );

    const appData = {
      ...item.application,
      userId: user._id,
      draft: item.application.published,
    };

    const application = await MentorApplication.findOneAndUpdate(
      { slug: item.application.slug },
      { $set: appData },
      { upsert: true, new: true }
    );

    console.log(
      `✓ Seeded /experts/${application.slug} [Roles: ${application.roles.join(', ')} | Locations: ${application.published.locationIds.join(', ')}]`
    );
  }

  console.log('\n✅ Successfully seeded 6 test expert profiles:');
  console.log('  1. Aarav Sharma  -> /experts/test-aarav-sharma  (pune, bangalore, mumbai - Multi-location)');
  console.log('  2. Priya Patel   -> /experts/test-priya-patel   (london, manchester - Multi-location)');
  console.log('  3. Rohan Verma   -> /experts/test-rohan-verma   (online - Online only)');
  console.log('  4. Dev Kapoor    -> /experts/test-dev-kapoor    (pune)');
  console.log('  5. Ananya Iyer   -> /experts/test-ananya-iyer   (bangalore - Mentor only)');
  console.log('  6. Marcus Vance  -> /experts/test-marcus-vance  (san-francisco - Hire only)');
  console.log('\nRun with --clean flag to remove all seeded test records.');

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB.\n');
}

main().catch((err) => {
  console.error('❌ Error executing script:', err);
  process.exit(1);
});
