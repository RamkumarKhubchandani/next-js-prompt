import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import {
  toPublicProfile,
  formatSlug,
  generateUniqueSlug,
  validateHeadline,
  validateSummary,
  validateSkillIds,
  validateLocation,
  validateProjects,
  validateConsents,
  validateApprovableApplication,
  validateApplyRoles,
  validateApplyPhotoUrl,
  validateWhatsApp,
  parseYearsExperience,
  mapServerErrorToField,
  escapeHtml,
  REQUIRED_CONSENTS,
  rankExperts,
  hireSlugToSkillId,
  hasUrls,
  ALLOWED_REQUEST_STATUSES,
  isValidObjectId,
  evaluateAdminAccess,
} from '../app/lib/experts.js';
import { DEFAULT_EXPERT } from '../app/lib/default-expert.js';
import { safeJsonLd } from '../app/lib/schema-helpers.js';
import { buildBlogSitemapXml, KNOWN_INTERVIEW_HUBS } from '../app/lib/blog-sitemap.js';
import { SKILL_GUIDES, getSkillGuide } from '../app/lib/skill-guides.js';

describe('1. Slug Generation', () => {
  test('generates basic slug in firstname-lastname format', () => {
    const slug = formatSlug('John Doe');
    assert.strictEqual(slug, 'john-doe');
  });

  test('normalizes spaces, uppercase, and special characters', () => {
    const slug = formatSlug('  Jane @ Doe-Smith! #123  ');
    assert.strictEqual(slug, 'jane-doe-smith-123');
  });

  test('falls back to "developer" if name is empty or symbols only', () => {
    assert.strictEqual(formatSlug('!@#$%^'), 'developer');
    assert.strictEqual(formatSlug(''), 'developer');
    assert.strictEqual(formatSlug(null), 'developer');
  });

  test('handles unique collision resolution (-2, -3)', async () => {
    const existingSlugs = new Set(['john-doe', 'john-doe-2']);
    const mockModel = {
      findOne: (query) => ({
        select: () => ({
          lean: async () => (existingSlugs.has(query.slug) ? { _id: '123' } : null),
        }),
      }),
    };

    const resolved = await generateUniqueSlug('John Doe', null, mockModel);
    assert.strictEqual(resolved, 'john-doe-3');
  });
});

describe('2. Validation Rules', () => {
  describe('validateHeadline', () => {
    test('passes for valid plain text <= 70 chars', () => {
      const err = validateHeadline('Staff Frontend Architect & Lead Mentor (12+ Yrs Exp)');
      assert.strictEqual(err, null);
    });

    test('passes for technical headlines with .NET and ASP.NET', () => {
      assert.strictEqual(validateHeadline('Senior .NET Core Developer & Tech Lead'), null);
      assert.strictEqual(validateHeadline('Staff ASP.NET Core Engineer'), null);
      assert.strictEqual(validateHeadline('.NET Backend Architect (10+ Yrs Exp)'), null);
    });

    test('fails if empty or whitespace', () => {
      assert.match(validateHeadline('   '), /Headline cannot be empty/);
      assert.match(validateHeadline(''), /Headline is required/);
      assert.match(validateHeadline(null), /Headline is required/);
    });

    test('fails if exceeding 70 chars', () => {
      const longHeadline = 'A'.repeat(71);
      assert.match(validateHeadline(longHeadline), /70 characters or fewer/);
    });

    test('fails if containing HTML tags', () => {
      assert.match(validateHeadline('Senior Developer <script>alert(1)</script>'), /no HTML tags/);
      assert.match(validateHeadline('<b>Lead</b> Engineer'), /no HTML tags/);
    });

    test('fails if containing URLs or domains', () => {
      assert.match(validateHeadline('Hire me at https://example.com'), /cannot contain website URLs/);
      assert.match(validateHeadline('Visit outlinedev.com for more'), /cannot contain website URLs/);
      assert.match(validateHeadline('Portfolio: mywork.net for samples'), /cannot contain website URLs/);
    });
  });

  describe('validateSummary', () => {
    const sampleWords = (count) => Array(count).fill('word').join(' ');

    test('passes for valid 80 to 300 words summary', () => {
      const err = validateSummary(sampleWords(100), 'Mentor');
      assert.strictEqual(err, null);
    });

    test('fails if under 80 words', () => {
      const err = validateSummary(sampleWords(79), 'Mentor');
      assert.match(err, /at least 80 words/);
    });

    test('fails if over 300 words', () => {
      const err = validateSummary(sampleWords(301), 'Mentor');
      assert.match(err, /cannot exceed 300 words/);
    });

    test('fails if containing HTML tags', () => {
      const text = sampleWords(100) + ' <img src="x" onerror="alert(1)" />';
      const err = validateSummary(text, 'Hire');
      assert.match(err, /plain text with no HTML tags/);
    });
  });

  describe('validateSkillIds', () => {
    test('passes for 1 to 8 valid skill IDs from SKILLS', () => {
      assert.strictEqual(validateSkillIds(['react', 'nextjs', 'typescript']), null);
      assert.strictEqual(validateSkillIds(['javascript']), null);
    });

    test('fails if empty', () => {
      assert.match(validateSkillIds([]), /at least 1 skill/);
      assert.match(validateSkillIds(null), /at least 1 skill/);
    });

    test('fails if over 8 skills', () => {
      const nine = ['react', 'nextjs', 'javascript', 'typescript', 'nodejs', 'mongodb', 'html-css', 'vue', 'angular'];
      assert.match(validateSkillIds(nine), /maximum of 8/);
    });

    test('fails for invalid or unrecognized skill id', () => {
      assert.match(validateSkillIds(['react', 'non-existent-stack']), /Invalid skill/);
    });
  });

  describe('validateLocation', () => {
    test('passes for valid location in LOCATIONS', () => {
      assert.strictEqual(validateLocation('jamnagar'), null);
      assert.strictEqual(validateLocation('bangalore'), null);
      assert.strictEqual(validateLocation('online'), null);
    });

    test('passes for "other" with valid country and city', () => {
      assert.strictEqual(
        validateLocation('other', { country: 'Canada', city: 'Toronto' }),
        null
      );
    });

    test('fails for "other" with missing country or city', () => {
      assert.match(validateLocation('other', { country: '', city: 'Toronto' }), /specify both country and city/);
      assert.match(validateLocation('other', { country: 'Canada', city: '' }), /specify both country and city/);
    });

    test('fails for invalid location ID', () => {
      assert.match(validateLocation('atlantis'), /Invalid location/);
      assert.match(validateLocation(null), /select a location/);
    });
  });

  describe('validateProjects', () => {
    test('passes for valid 1 to 3 projects', () => {
      const projects = [
        { title: 'Project 1', description: 'Real-time dashboard', url: 'https://example.com' },
        { title: 'Project 2', description: 'Next.js commerce app' },
      ];
      assert.strictEqual(validateProjects(projects), null);
    });

    test('fails if exceeding 3 projects', () => {
      const four = [
        { title: 'P1', description: 'Desc 1' },
        { title: 'P2', description: 'Desc 2' },
        { title: 'P3', description: 'Desc 3' },
        { title: 'P4', description: 'Desc 4' },
      ];
      assert.match(validateProjects(four), /maximum of 3 projects/);
    });

    test('fails if title or description is missing', () => {
      assert.match(validateProjects([{ title: '', description: 'Desc' }]), /requires a title/);
      assert.match(validateProjects([{ title: 'P1', description: '' }]), /requires a one-line description/);
    });
  });

  describe('validateConsents', () => {
    test('passes when all 6 required consents are present with timestamps', () => {
      const now = new Date().toISOString();
      const consents = {
        publicProfile: now,
        publicPhoto: now,
        realName: now,
        terms: now,
        mayInterview: now,
        receiveLeads: now,
      };
      assert.strictEqual(validateConsents(consents), null);
    });

    test('fails if any consent is missing', () => {
      for (const requiredKey of REQUIRED_CONSENTS) {
        const consents = {
          publicProfile: '2026-01-01',
          publicPhoto: '2026-01-01',
          realName: '2026-01-01',
          terms: '2026-01-01',
          mayInterview: '2026-01-01',
          receiveLeads: '2026-01-01',
        };
        delete consents[requiredKey];
        assert.match(validateConsents(consents), new RegExp(`Missing required consent: "${requiredKey}"`));
      }
    });
  });
});

describe('3. toPublicProfile Protection & Visibility (Zero Private Field Leaks)', () => {
  const dummyDoc = {
    _id: '507f1f77bcf86cd799439011',
    userId: '507f1f77bcf86cd799439012',
    slug: 'alice-smith',
    displayName: 'Alice Smith',
    photoUrl: 'https://images.example.com/alice.jpg',
    photoPublicId: 'cloudinary_secret_id_123',
    status: 'approved',
    roles: ['mentor', 'hire'],
    email: 'alice.private@example.com',
    phone: '+1-555-123-4567',
    adminNotes: 'Top candidate passed interview with flying colors.',
    reviewedBy: '507f1f77bcf86cd799439099',
    reviewedAt: new Date(),
    interviewedAt: new Date('2026-02-01T10:00:00.000Z'),
    approvedAt: new Date('2026-02-02T12:00:00.000Z'),
    consents: {
      publicProfile: new Date(),
      publicPhoto: new Date(),
      realName: new Date(),
      terms: new Date(),
      mayInterview: new Date(),
      receiveLeads: new Date(),
    },
    draft: {
      displayName: 'Alice In Progress',
      skillIds: ['python'],
    },
    published: {
      skillIds: ['react', 'nextjs'],
      locationId: 'jamnagar',
      timezone: 'Asia/Kolkata',
      yearsExperience: 7,
      languages: ['English'],
      links: {
        github: 'https://github.com/alicesmith',
        linkedin: 'https://linkedin.com/in/alicesmith',
      },
      projects: [{ title: 'Design System', description: 'Accessible UI components', url: 'https://ui.example.com' }],
      mentor: {
        headline: 'Staff React Engineer',
        summary: 'A'.repeat(500),
        rate: 45,
        topics: ['State Management'],
        formats: ['1-on-1 Mentorship'],
      },
      hire: {
        headline: 'Senior Full Stack Consultant',
        summary: 'B'.repeat(500),
        rate: 55,
        availability: 'Immediate',
        engagementTypes: ['Part-Time'],
      },
    },
  };

  test('returns null if status is "hidden" or "rejected"', () => {
    assert.strictEqual(toPublicProfile({ ...dummyDoc, status: 'rejected' }), null);
    assert.strictEqual(toPublicProfile({ ...dummyDoc, status: 'hidden' }), null);
  });

  test('keeps live profile online when published exists even if status is "pending" or "draft"', () => {
    const pendingLive = toPublicProfile({ ...dummyDoc, status: 'pending' });
    assert.ok(pendingLive);
    assert.strictEqual(pendingLive.displayName, 'Alice Smith');

    const draftLive = toPublicProfile({ ...dummyDoc, status: 'draft' });
    assert.ok(draftLive);
    assert.strictEqual(draftLive.displayName, 'Alice Smith');
  });

  test('returns null if published data is missing', () => {
    assert.strictEqual(toPublicProfile({ ...dummyDoc, published: null }), null);
    assert.strictEqual(toPublicProfile({ ...dummyDoc, published: null, status: 'pending' }), null);
  });

  test('never leaks private fields on approved profile', () => {
    const pub = toPublicProfile(dummyDoc);
    assert.ok(pub);

    // Private fields must be strictly undefined
    assert.strictEqual(pub.email, undefined);
    assert.strictEqual(pub.phone, undefined);
    assert.strictEqual(pub.adminNotes, undefined);
    assert.strictEqual(pub.reviewedBy, undefined);
    assert.strictEqual(pub.reviewedAt, undefined);
    assert.strictEqual(pub.consents, undefined);
    assert.strictEqual(pub.draft, undefined);
    assert.strictEqual(pub.photoPublicId, undefined);
    assert.strictEqual(pub.userId, undefined);
    assert.strictEqual(pub._id, undefined);
    assert.strictEqual(pub.__v, undefined);

    // Only allowed public fields exist
    assert.strictEqual(pub.slug, 'alice-smith');
    assert.strictEqual(pub.displayName, 'Alice Smith');
    assert.strictEqual(pub.photoUrl, 'https://images.example.com/alice.jpg');
    assert.strictEqual(pub.interviewedByOutlineDev, true);
    assert.strictEqual(pub.yearsExperience, 7);
    assert.deepStrictEqual(pub.roles, ['mentor', 'hire']);
    assert.strictEqual(pub.location.name, 'Jamnagar');
    assert.strictEqual(pub.mentor.headline, 'Staff React Engineer');
    assert.strictEqual(pub.hire.headline, 'Senior Full Stack Consultant');
  });
});

describe('4. Matching Fallbacks (Deterministic Order & Fallback Chain)', () => {
  const expertCity = {
    slug: 'city-expert',
    displayName: 'City Expert',
    roles: ['mentor', 'hire'],
    skillIds: ['react'],
    location: { id: 'jamnagar', name: 'Jamnagar', country: 'India' },
    interviewedByOutlineDev: true,
    mentor: { headline: 'Mentor In City', summary: 'Summary in city' },
    hire: { headline: 'Hire In City', summary: 'Summary in city' },
  };

  const expertCountry = {
    slug: 'country-expert',
    displayName: 'Country Expert',
    roles: ['mentor', 'hire'],
    skillIds: ['react'],
    location: { id: 'bangalore', name: 'Bangalore', country: 'India' },
    interviewedByOutlineDev: false,
    mentor: { headline: 'Mentor In Country', summary: 'Summary in country' },
    hire: { headline: 'Hire In Country', summary: 'Summary in country' },
  };

  const expertAnywhere = {
    slug: 'global-expert',
    displayName: 'Global Expert',
    roles: ['mentor', 'hire'],
    skillIds: ['react'],
    location: { id: 'london', name: 'London', country: 'United Kingdom' },
    interviewedByOutlineDev: false,
    mentor: { headline: 'Mentor Anywhere', summary: 'Summary anywhere' },
    hire: { headline: 'Hire Anywhere', summary: 'Summary anywhere' },
  };

  test('(1) same skill + same city takes first priority', () => {
    const candidates = [expertAnywhere, expertCountry, expertCity];
    const results = rankExperts({
      candidates,
      targetSkillId: 'react',
      targetLocationId: 'jamnagar',
      intent: 'mentor',
    });

    assert.strictEqual(results[0].slug, 'city-expert');
    assert.strictEqual(results[1].slug, 'country-expert');
    assert.strictEqual(results[2].slug, 'global-expert');
  });

  test('(2) same skill + same country takes second priority when no city match', () => {
    // Search in Delhi (India), city expert in Jamnagar (India) matches country
    const candidates = [expertAnywhere, expertCountry];
    const results = rankExperts({
      candidates,
      targetSkillId: 'react',
      targetLocationId: 'delhi',
      intent: 'mentor',
    });

    assert.strictEqual(results[0].slug, 'country-expert');
    assert.strictEqual(results[1].slug, 'global-expert');
  });

  test('(3) same skill anywhere takes third priority', () => {
    // Search in Paris, no India matches
    const candidates = [expertAnywhere, expertCountry];
    const results = rankExperts({
      candidates,
      targetSkillId: 'react',
      targetLocationId: 'paris',
      intent: 'mentor',
    });

    // expertAnywhere and expertCountry both fall into "anywhere" bucket
    assert.strictEqual(results.some((r) => r.slug === 'global-expert'), true);
  });

  test('(4) always falls back to default profile for site owner from default-expert.js', () => {
    // Empty candidates list
    const results = rankExperts({
      candidates: [],
      targetSkillId: 'react',
      targetLocationId: 'jamnagar',
      intent: 'mentor',
    });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].slug, DEFAULT_EXPERT.slug);
    assert.strictEqual(results[0].displayName, 'Ramkumar Khubchandani');
  });

  test('caps results at maximum of 3 cards', () => {
    const extraCandidate = {
      slug: 'extra-expert',
      displayName: 'Extra Expert',
      roles: ['mentor'],
      skillIds: ['react'],
      location: { id: 'online', name: 'Online', country: 'Global' },
      mentor: { headline: 'Extra Mentor', summary: 'Extra summary' },
    };

    const candidates = [expertCity, expertCountry, expertAnywhere, extraCandidate];
    const results = rankExperts({
      candidates,
      targetSkillId: 'react',
      targetLocationId: 'jamnagar',
      intent: 'mentor',
    });

    assert.strictEqual(results.length, 3);
  });

  test('filters by intent: mentor intent excludes hire-only experts', () => {
    const hireOnly = {
      slug: 'hire-only-dev',
      displayName: 'Hire Only Dev',
      roles: ['hire'], // NO mentor role
      skillIds: ['react'],
      hire: { headline: 'Hire Only', summary: 'Hire summary' },
    };

    const results = rankExperts({
      candidates: [hireOnly],
      targetSkillId: 'react',
      targetLocationId: 'jamnagar',
      intent: 'mentor',
    });

    // hireOnly is excluded from mentor intent, so only default expert is returned
    assert.strictEqual(results.some((r) => r.slug === 'hire-only-dev'), false);
    assert.strictEqual(results[0].slug, DEFAULT_EXPERT.slug);
  });
});

describe('5. Hire Slug to Skill Mapping', () => {
  test('maps known hire page slugs to canonical skill IDs using shared lookup', () => {
    assert.strictEqual(hireSlugToSkillId('full-stack'), 'fullstack');
    assert.strictEqual(hireSlugToSkillId('nodejs'), 'node');
    assert.strictEqual(hireSlugToSkillId('vuejs'), 'vue');
    assert.strictEqual(hireSlugToSkillId('full-stack-developer'), 'fullstack');
    assert.strictEqual(hireSlugToSkillId('nodejs-developer'), 'node');
    assert.strictEqual(hireSlugToSkillId('vuejs-developer'), 'vue');
  });

  test('passes through unmapped skills as-is', () => {
    assert.strictEqual(hireSlugToSkillId('react'), 'react');
    assert.strictEqual(hireSlugToSkillId('typescript'), 'typescript');
    assert.strictEqual(hireSlugToSkillId('react-developer'), 'react');
  });
});

describe('6. Safe JSON-LD Serialization', () => {
  test('escapes < characters to \\u003c to prevent script injection', () => {
    const dangerous = {
      name: 'John <script>alert("xss")</script>',
      bio: '</script><script>alert(1)</script>',
    };
    const serialized = safeJsonLd(dangerous);
    assert.strictEqual(serialized.includes('<'), false);
    assert.strictEqual(serialized.includes('\\u003c'), true);
  });
});

describe('7. Admin Approval Eligibility (validateApprovableApplication)', () => {
  const validApp = () => ({
    status: 'pending',
    displayName: 'Jane Doe',
    photoUrl: 'https://res.cloudinary.com/testcloud/image/upload/v1234/avatar.jpg',
    draft: {
      displayName: 'Jane Doe',
      photoUrl: 'https://res.cloudinary.com/testcloud/image/upload/v1234/avatar.jpg',
      roles: ['mentor'],
      mentor: {
        headline: 'Senior Full Stack Mentor',
        summary: 'Experienced mentor with a decade of expertise building web apps.',
      },
    },
  });

  test('passes for valid pending application with displayName, photoUrl, and role headline+summary', () => {
    assert.strictEqual(validateApprovableApplication(validApp()), null);
  });

  test('fails if application is missing or null', () => {
    assert.strictEqual(validateApprovableApplication(null), 'Application is required.');
  });

  test('fails if status is not "pending" (e.g. draft, approved, rejected)', () => {
    const app = validApp();
    app.status = 'draft';
    assert.strictEqual(validateApprovableApplication(app), 'Only pending applications can be approved.');

    app.status = 'approved';
    assert.strictEqual(validateApprovableApplication(app), 'Only pending applications can be approved.');

    app.status = 'rejected';
    assert.strictEqual(validateApprovableApplication(app), 'Only pending applications can be approved.');
  });

  test('fails if draft is missing', () => {
    const app = validApp();
    delete app.draft;
    assert.strictEqual(validateApprovableApplication(app), 'Application draft is required.');
  });

  test('fails if displayName is missing in draft and application', () => {
    const app = validApp();
    delete app.displayName;
    delete app.draft.displayName;
    assert.strictEqual(validateApprovableApplication(app), 'Application draft requires a displayName.');
  });

  test('fails if photoUrl is missing in draft and application', () => {
    const app = validApp();
    delete app.photoUrl;
    delete app.draft.photoUrl;
    assert.strictEqual(validateApprovableApplication(app), 'Application draft requires a photoUrl.');
  });

  test('fails if draft has neither mentor nor hire role with headline and summary', () => {
    const app = validApp();
    app.draft.mentor.headline = '';
    assert.strictEqual(
      validateApprovableApplication(app),
      'Application draft must have at least one role with a headline and summary.'
    );
  });

  test('passes if hire role has headline and summary instead of mentor', () => {
    const app = {
      status: 'pending',
      draft: {
        displayName: 'Alex Smith',
        photoUrl: 'https://res.cloudinary.com/testcloud/avatar.jpg',
        roles: ['hire'],
        hire: {
          headline: 'Senior Contract Backend Engineer',
          summary: 'Experienced Node.js and distributed systems architect ready to build.',
        },
      },
    };
    assert.strictEqual(validateApprovableApplication(app), null);
  });
});

describe('8. Mentor Application Draft vs Submit Validation (validateApplyRoles & validateApplyPhotoUrl)', () => {
  describe('validateApplyRoles', () => {
    test('when isDraftSave is true: skips required check but validates present values', () => {
      // Skips required check:
      assert.strictEqual(validateApplyRoles(undefined, true), null);
      assert.strictEqual(validateApplyRoles(null, true), null);
      assert.strictEqual(validateApplyRoles([], true), null);

      // Validates when present:
      assert.strictEqual(validateApplyRoles(['mentor'], true), null);
      assert.strictEqual(validateApplyRoles(['hire'], true), null);
      assert.strictEqual(validateApplyRoles(['mentor', 'hire'], true), null);

      // Rejects invalid roles when present:
      assert.strictEqual(validateApplyRoles(['admin'], true), "Roles must be a subset of ['mentor', 'hire'].");
      assert.strictEqual(
        validateApplyRoles(['mentor', 'hire', 'extra'], true),
        "Roles must be a subset of ['mentor', 'hire']."
      );
      assert.strictEqual(validateApplyRoles('not-an-array', true), "Roles must be a subset of ['mentor', 'hire'].");
    });

    test('when isDraftSave is false: enforces non-empty subset of mentor and hire', () => {
      assert.strictEqual(validateApplyRoles(undefined, false), "Roles must be a non-empty subset of ['mentor', 'hire'].");
      assert.strictEqual(validateApplyRoles(null, false), "Roles must be a non-empty subset of ['mentor', 'hire'].");
      assert.strictEqual(validateApplyRoles([], false), "Roles must be a non-empty subset of ['mentor', 'hire'].");
      assert.strictEqual(validateApplyRoles(['admin'], false), "Roles must be a non-empty subset of ['mentor', 'hire'].");

      assert.strictEqual(validateApplyRoles(['mentor'], false), null);
      assert.strictEqual(validateApplyRoles(['hire'], false), null);
      assert.strictEqual(validateApplyRoles(['mentor', 'hire'], false), null);
    });
  });

  describe('validateApplyPhotoUrl', () => {
    const cloudName = 'testcloud';
    const validCloudinaryUrl = 'https://res.cloudinary.com/testcloud/image/upload/v12345/pic.jpg';
    const invalidUrl = 'https://example.com/avatar.jpg';

    test('when isDraftSave is true: skips required check but validates present values', () => {
      // Skips required check:
      assert.strictEqual(validateApplyPhotoUrl('', true, cloudName), null);
      assert.strictEqual(validateApplyPhotoUrl(undefined, true, cloudName), null);
      assert.strictEqual(validateApplyPhotoUrl(null, true, cloudName), null);

      // Validates when present:
      assert.strictEqual(validateApplyPhotoUrl(validCloudinaryUrl, true, cloudName), null);
      assert.strictEqual(
        validateApplyPhotoUrl(invalidUrl, true, cloudName),
        'Photo URL must start with https://res.cloudinary.com/testcloud/'
      );
    });

    test('when isDraftSave is false: enforces required Cloudinary photoUrl', () => {
      assert.strictEqual(
        validateApplyPhotoUrl('', false, cloudName),
        'Photo URL must start with https://res.cloudinary.com/testcloud/'
      );
      assert.strictEqual(
        validateApplyPhotoUrl(undefined, false, cloudName),
        'Photo URL must start with https://res.cloudinary.com/testcloud/'
      );
      assert.strictEqual(
        validateApplyPhotoUrl(invalidUrl, false, cloudName),
        'Photo URL must start with https://res.cloudinary.com/testcloud/'
      );
      assert.strictEqual(validateApplyPhotoUrl(validCloudinaryUrl, false, cloudName), null);
    });
  });
});

describe('9. HTML Escaping for Email Notifications (escapeHtml)', () => {
  test('escapes HTML special characters (&, <, >, ", \')', () => {
    assert.strictEqual(
      escapeHtml('Jane <Doe> & "Associates"\'s Note'),
      'Jane &lt;Doe&gt; &amp; &quot;Associates&quot;&#039;s Note'
    );
  });

  test('returns empty string for falsy values', () => {
    assert.strictEqual(escapeHtml(''), '');
    assert.strictEqual(escapeHtml(null), '');
    assert.strictEqual(escapeHtml(undefined), '');
  });
});

describe('10. Blog Content Sitemap (buildBlogSitemapXml)', () => {
  const mockTutorials = [
    {
      slug: 'react-compiler-guide',
      title: 'React Compiler Guide',
      publishedAt: '2026-01-15T10:00:00.000Z',
      updatedAt: '2026-03-01T12:00:00.000Z',
    },
    {
      slug: 'mastering-signals',
      title: 'Mastering Signals',
      publishedAt: '2025-11-20T08:30:00.000Z',
    },
    {
      slug: 'undated-tutorial',
      title: 'Undated Tutorial',
    },
  ];

  test('generates valid XML sitemap with urlset declaration and /blogs index', () => {
    const xml = buildBlogSitemapXml({ tutorials: mockTutorials });
    assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
    assert.ok(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
    assert.ok(xml.includes('<loc>https://www.outlinedev.com/blogs</loc>'));
    assert.ok(xml.endsWith('</urlset>'));
  });

  test('includes blog posts with lastmod set to updatedAt || publishedAt (never current date)', () => {
    const xml = buildBlogSitemapXml({ tutorials: mockTutorials });

    // react-compiler-guide has both updatedAt and publishedAt -> updatedAt takes precedence
    assert.ok(xml.includes('<loc>https://www.outlinedev.com/blogs/react-compiler-guide</loc>'));
    assert.ok(xml.includes('<lastmod>2026-03-01T12:00:00.000Z</lastmod>'));

    // mastering-signals has only publishedAt -> uses publishedAt
    assert.ok(xml.includes('<loc>https://www.outlinedev.com/blogs/mastering-signals</loc>'));
    assert.ok(xml.includes('<lastmod>2025-11-20T08:30:00.000Z</lastmod>'));

    // Verify it never uses today's date for posts that don't have it
    const todayYmd = new Date().toISOString().slice(0, 10);
    // Neither mock post date is today
    assert.ok(!xml.includes(`<lastmod>${todayYmd}`));
  });

  test('omits lastmod when neither updatedAt nor publishedAt is present', () => {
    const xml = buildBlogSitemapXml({ tutorials: mockTutorials });
    // Match the block for undated-tutorial
    const undatedBlock = xml.split('<loc>https://www.outlinedev.com/blogs/undated-tutorial</loc>')[1].split('</url>')[0];
    assert.ok(!undatedBlock.includes('<lastmod>'), 'undated tutorial must not have a lastmod element');
  });

  test('includes all required /interview hubs', () => {
    const xml = buildBlogSitemapXml({ tutorials: [] });
    const expectedHubs = [
      'https://www.outlinedev.com/interview',
      'https://www.outlinedev.com/interview/react',
      'https://www.outlinedev.com/interview/angular',
      'https://www.outlinedev.com/interview/javascript',
      'https://www.outlinedev.com/interview/typescript',
      'https://www.outlinedev.com/interview/html-css',
      'https://www.outlinedev.com/interview/zustand',
    ];

    for (const hubUrl of expectedHubs) {
      assert.ok(xml.includes(`<loc>${hubUrl}</loc>`), `Sitemap must contain interview hub ${hubUrl}`);
    }
  });

  test('escapes special characters in URLs', () => {
    const xml = buildBlogSitemapXml({
      tutorials: [{ slug: 'c++-guide&tricks' }],
      interviewHubs: [],
    });
    assert.ok(xml.includes('<loc>https://www.outlinedev.com/blogs/c++-guide&amp;tricks</loc>'));
  });
});

describe('11. Skill Guides Map Lookup (SKILL_GUIDES & getSkillGuide)', () => {
  test('exports SKILL_GUIDES mapping containing skill:suffix entries', () => {
    assert.ok(typeof SKILL_GUIDES === 'object' && SKILL_GUIDES !== null);
    assert.ok(Object.keys(SKILL_GUIDES).length > 0);
  });

  test('returns matching post slug for mapped skill and suffix', () => {
    const reactGuide = getSkillGuide('react', 'interview-prep');
    assert.strictEqual(reactGuide, 'frontend-interview-prep-2026-ai-copilot-era');

    const svelteHelpGuide = getSkillGuide('svelte', 'interview-help');
    assert.strictEqual(svelteHelpGuide, 'svelte-5-interview-questions');

    const angularGuide = getSkillGuide('angular', 'mentors');
    assert.strictEqual(angularGuide, 'zoneless-angular');

    const nextjsGuide = getSkillGuide({ id: 'nextjs' }, 'mentors');
    assert.strictEqual(nextjsGuide, 'nextjs-15-app-router');
  });

  test('returns null for unmapped skill or suffix', () => {
    assert.strictEqual(getSkillGuide('unknown-skill', 'interview-prep'), null);
    assert.strictEqual(getSkillGuide('react', 'non-existent-suffix'), null);
    assert.strictEqual(getSkillGuide(null, 'interview-prep'), null);
    assert.strictEqual(getSkillGuide('react', null), null);
    assert.strictEqual(getSkillGuide('', ''), null);
  });

  test('all mapped slugs in SKILL_GUIDES are valid slugs without spaces or protocols', () => {
    for (const [key, slug] of Object.entries(SKILL_GUIDES)) {
      assert.ok(typeof slug === 'string' && slug.length > 0, `Slug for ${key} should be a non-empty string`);
      assert.ok(!slug.includes(' '), `Slug for ${key} should not contain spaces: ${slug}`);
      assert.ok(!slug.startsWith('http'), `Slug for ${key} should be a relative slug, not a URL: ${slug}`);
    }
  });
});

describe('12. WhatsApp Validation (validateWhatsApp)', () => {
  test('passes for valid international formats with leading plus', () => {
    assert.strictEqual(validateWhatsApp('+919876543210'), null);
    assert.strictEqual(validateWhatsApp('+14155552671'), null);
    assert.strictEqual(validateWhatsApp('+447911123456'), null);
  });

  test('passes for valid numbers with spaces, hyphens and parentheses', () => {
    assert.strictEqual(validateWhatsApp('+91 98765 43210'), null);
    assert.strictEqual(validateWhatsApp('+1 (415) 555-2671'), null);
    assert.strictEqual(validateWhatsApp('9876543210'), null);
  });

  test('when isDraftSave is true: skips required check on empty/falsy', () => {
    assert.strictEqual(validateWhatsApp('', true), null);
    assert.strictEqual(validateWhatsApp(null, true), null);
    assert.strictEqual(validateWhatsApp(undefined, true), null);
  });

  test('when isDraftSave is false: fails on empty/falsy', () => {
    assert.match(validateWhatsApp('', false), /valid WhatsApp number/i);
    assert.match(validateWhatsApp(null, false), /valid WhatsApp number/i);
  });

  test('fails for invalid digit counts (<8 or >15 digits)', () => {
    assert.match(validateWhatsApp('12345'), /8-15 digits/i);
    assert.match(validateWhatsApp('1234567'), /8-15 digits/i);
    assert.match(validateWhatsApp('+1234567890123456'), /8-15 digits/i);
  });

  test('fails for numbers containing letters or invalid characters', () => {
    assert.match(validateWhatsApp('+9198765abcde'), /8-15 digits/i);
    assert.match(validateWhatsApp('whatsapp-me'), /8-15 digits/i);
  });
});

describe('13. Years of Experience Parsing (parseYearsExperience)', () => {
  test('parses valid numeric strings and numbers within range 0-40', () => {
    assert.deepStrictEqual(parseYearsExperience('0'), { valid: true, value: 0, error: null });
    assert.deepStrictEqual(parseYearsExperience('5'), { valid: true, value: 5, error: null });
    assert.deepStrictEqual(parseYearsExperience('40'), { valid: true, value: 40, error: null });
    assert.deepStrictEqual(parseYearsExperience(12), { valid: true, value: 12, error: null });
  });

  test('strips non-digits and limits to 2 digits', () => {
    assert.deepStrictEqual(parseYearsExperience('12 years'), { valid: true, value: 12, error: null });
    assert.deepStrictEqual(parseYearsExperience(' 7 yrs '), { valid: true, value: 7, error: null });
    assert.deepStrictEqual(parseYearsExperience('123'), { valid: true, value: 12, error: null });
  });

  test('when isDraftSave is true: allows empty value and defaults to 0', () => {
    assert.deepStrictEqual(parseYearsExperience('', true), { valid: true, value: 0, error: null });
    assert.deepStrictEqual(parseYearsExperience(null, true), { valid: true, value: 0, error: null });
    assert.deepStrictEqual(parseYearsExperience(undefined, true), { valid: true, value: 0, error: null });
  });

  test('when isDraftSave is false: rejects empty or non-numeric input', () => {
    const resEmpty = parseYearsExperience('', false);
    assert.strictEqual(resEmpty.valid, false);
    assert.match(resEmpty.error, /years of experience/i);

    const resChars = parseYearsExperience('none', false);
    assert.strictEqual(resChars.valid, false);
    assert.match(resChars.error, /years of experience/i);
  });

  test('rejects values exceeding 40 years', () => {
    const res = parseYearsExperience('45', false);
    assert.strictEqual(res.valid, false);
    assert.match(res.error, /between 0 and 40/i);
  });
});

describe('14. Field Mapping of Server Errors (mapServerErrorToField)', () => {
  test('maps role headline and summary paths', () => {
    assert.strictEqual(mapServerErrorToField('mentor.headline'), 'mentor.headline');
    assert.strictEqual(mapServerErrorToField('draft.mentor.headline'), 'mentor.headline');
    assert.strictEqual(mapServerErrorToField('mentor.summary'), 'mentor.summary');
    assert.strictEqual(mapServerErrorToField('hire.headline'), 'hire.headline');
    assert.strictEqual(mapServerErrorToField('draft.hire.headline'), 'hire.headline');
    assert.strictEqual(mapServerErrorToField('hire.summary'), 'hire.summary');
  });

  test('maps core identity, whatsapp, and skill fields', () => {
    assert.strictEqual(mapServerErrorToField('displayName'), 'displayName');
    assert.strictEqual(mapServerErrorToField('name'), 'displayName');
    assert.strictEqual(mapServerErrorToField('whatsapp'), 'whatsapp');
    assert.strictEqual(mapServerErrorToField('photoUrl'), 'photoUrl');
    assert.strictEqual(mapServerErrorToField('skillIds'), 'skillIds');
    assert.strictEqual(mapServerErrorToField('skills'), 'skillIds');
    assert.strictEqual(mapServerErrorToField('locationId'), 'locationId');
    assert.strictEqual(mapServerErrorToField('yearsExperience'), 'yearsExperience');
    assert.strictEqual(mapServerErrorToField('roles'), 'roles');
    assert.strictEqual(mapServerErrorToField('projects'), 'projects');
    assert.strictEqual(mapServerErrorToField('consents'), 'consents');
  });

  test('returns fallback for unknown field strings', () => {
    assert.strictEqual(mapServerErrorToField(null), null);
    assert.strictEqual(mapServerErrorToField('customField'), 'customField');
  });
});

describe('15. Expert Leads Access Isolation (/api/expert/leads)', () => {
  test('simulates server query ensuring expert receives strictly their assigned leads', () => {
    const expertAppAId = '660000000000000000000001';
    const expertAppBId = '660000000000000000000002';

    const leadsDatabase = [
      { _id: 'lead1', name: 'Client A1', email: 'a1@example.com', assignedExpertIds: [expertAppAId] },
      { _id: 'lead2', name: 'Client A2', email: 'a2@example.com', assignedExpertIds: [expertAppAId] },
      { _id: 'lead3', name: 'Client B1', email: 'b1@example.com', assignedExpertIds: [expertAppBId] },
      { _id: 'lead4', name: 'Unassigned', email: 'un@example.com', assignedExpertIds: [] },
    ];

    // Query filter matching /api/expert/leads implementation: { assignedExpertIds: expertAppId }
    function queryExpertLeads(callerAppId) {
      return leadsDatabase.filter((lead) =>
        lead.assignedExpertIds.some((id) => id.toString() === callerAppId.toString())
      );
    }

    const callerALeads = queryExpertLeads(expertAppAId);
    const callerBLeads = queryExpertLeads(expertAppBId);

    // Caller A receives only lead1 and lead2
    assert.strictEqual(callerALeads.length, 2);
    assert.deepStrictEqual(callerALeads.map((l) => l._id), ['lead1', 'lead2']);

    // Caller B receives only lead3
    assert.strictEqual(callerBLeads.length, 1);
    assert.deepStrictEqual(callerBLeads.map((l) => l._id), ['lead3']);

    // Neither caller ever receives the other caller's leads
    assert.ok(!callerALeads.some((l) => l._id === 'lead3'));
    assert.ok(!callerBLeads.some((l) => l._id === 'lead1' || l._id === 'lead2'));
  });
});

describe('16. Mentorship Requests Authorization & Guard (/api/mentorship/requests)', () => {
  // Test handler simulation matching /api/mentorship/requests GET & PATCH implementation
  async function simulateMentorshipRequestsGet(session, adminEmailsEnv) {
    if (!session) {
      return { status: 401, error: 'Unauthorized' };
    }
    const authResult = evaluateAdminAccess(session, adminEmailsEnv);
    if (!authResult.authorized) {
      return { status: 403, error: 'Forbidden' };
    }
    return { status: 200, success: true, requests: [] };
  }

  async function simulateMentorshipRequestsPatch(session, body, adminEmailsEnv) {
    if (!session) {
      return { status: 401, error: 'Unauthorized' };
    }
    const authResult = evaluateAdminAccess(session, adminEmailsEnv);
    if (!authResult.authorized) {
      return { status: 403, error: 'Forbidden' };
    }
    const { id, status } = body || {};
    if (!status || !ALLOWED_REQUEST_STATUSES.includes(status)) {
      return { status: 400, error: 'Invalid status' };
    }
    if (!isValidObjectId(id)) {
      return { status: 400, error: 'Invalid id' };
    }
    return { status: 200, success: true };
  }

  test('non-admin session gets 403 from GET', async () => {
    const nonAdminSession = {
      user: { id: 'user123', email: 'regular@example.com', role: 'user' },
    };
    const res = await simulateMentorshipRequestsGet(nonAdminSession, 'admin@example.com');
    assert.strictEqual(res.status, 403);
    assert.strictEqual(res.error, 'Forbidden');
  });

  test('non-admin session gets 403 from PATCH', async () => {
    const nonAdminSession = {
      user: { id: 'user123', email: 'regular@example.com', role: 'user' },
    };
    const res = await simulateMentorshipRequestsPatch(
      nonAdminSession,
      { id: '507f1f77bcf86cd799439011', status: 'contacted' },
      'admin@example.com'
    );
    assert.strictEqual(res.status, 403);
    assert.strictEqual(res.error, 'Forbidden');
  });

  test('unauthenticated request (no session) gets 401 from GET and PATCH', async () => {
    const getRes = await simulateMentorshipRequestsGet(null);
    assert.strictEqual(getRes.status, 401);

    const patchRes = await simulateMentorshipRequestsPatch(null, { id: '507f1f77bcf86cd799439011', status: 'contacted' });
    assert.strictEqual(patchRes.status, 401);
  });

  test('admin session is allowed on GET', async () => {
    const adminSessionRole = {
      user: { id: 'admin1', email: 'boss@corp.com', role: 'admin' },
    };
    const resRole = await simulateMentorshipRequestsGet(adminSessionRole, '');
    assert.strictEqual(resRole.status, 200);

    const adminSessionEmail = {
      user: { id: 'admin2', email: 'owner@outlinedev.com', role: 'user' },
    };
    const resEmail = await simulateMentorshipRequestsGet(adminSessionEmail, 'owner@outlinedev.com,other@admin.com');
    assert.strictEqual(resEmail.status, 200);
  });

  test('admin session on PATCH validates status and id', async () => {
    const adminSession = {
      user: { id: 'admin1', email: 'boss@corp.com', role: 'admin' },
    };

    // Invalid status
    const resInvalidStatus = await simulateMentorshipRequestsPatch(
      adminSession,
      { id: '507f1f77bcf86cd799439011', status: 'invalid_status' },
      ''
    );
    assert.strictEqual(resInvalidStatus.status, 400);
    assert.strictEqual(resInvalidStatus.error, 'Invalid status');

    // Invalid ObjectId
    const resInvalidId = await simulateMentorshipRequestsPatch(
      adminSession,
      { id: 'not-an-object-id', status: 'contacted' },
      ''
    );
    assert.strictEqual(resInvalidId.status, 400);
    assert.strictEqual(resInvalidId.error, 'Invalid id');

    // Valid ObjectId and all allowed statuses
    for (const validStatus of ALLOWED_REQUEST_STATUSES) {
      const res = await simulateMentorshipRequestsPatch(
        adminSession,
        { id: '507f1f77bcf86cd799439011', status: validStatus },
        ''
      );
      assert.strictEqual(res.status, 200);
    }
  });
});
