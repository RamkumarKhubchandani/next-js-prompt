import { SKILLS, LOCATIONS } from './seo-data.js';
import MentorApplication from '../models/MentorApplication.js';
import DEFAULT_EXPERT from './default-expert.js';

export const HIRE_SLUG_TO_SKILL_ID = {
  'full-stack': 'fullstack',
  'nodejs': 'node',
  'vuejs': 'vue',
  'full-stack-developer': 'fullstack',
  'nodejs-developer': 'node',
  'vuejs-developer': 'vue',
};

export function hireSlugToSkillId(slug) {
  if (!slug || typeof slug !== 'string') return '';
  const clean = slug.trim();
  if (HIRE_SLUG_TO_SKILL_ID[clean]) {
    return HIRE_SLUG_TO_SKILL_ID[clean];
  }
  const stripped = clean.endsWith('-developer') ? clean.slice(0, -10) : clean;
  if (HIRE_SLUG_TO_SKILL_ID[stripped]) {
    return HIRE_SLUG_TO_SKILL_ID[stripped];
  }
  return stripped;
}

/**
 * Public profile field whitelist.
 * Explicitly protects private fields: email, phone, adminNotes, reviewedBy, consents, draft, photoPublicId.
 * Only returns data when doc has published content and status is not hidden or rejected.
 */
export function toPublicProfile(doc) {
  if (!doc) return null;
  const plain = typeof doc.toObject === 'function' ? doc.toObject() : doc;

  if (!plain.published || plain.status === 'hidden' || plain.status === 'rejected') {
    return null;
  }

  const pub = plain.published;
  const roles = Array.isArray(plain.roles) && plain.roles.length > 0 ? plain.roles : ['mentor'];

  // Resolve skill details
  const skillIds = Array.isArray(pub.skillIds) ? pub.skillIds : [];
  const resolvedSkills = skillIds
    .map((id) => {
      const match = SKILLS.find((s) => s.id === id);
      return match ? { id: match.id, name: match.name } : null;
    })
    .filter(Boolean);

  // Resolve location details
  let resolvedLocation = { id: pub.locationId || 'online', name: 'Online', country: 'Global' };
  if (pub.locationId === 'other') {
    resolvedLocation = {
      id: 'other',
      name: pub.locationOther?.city || 'Local',
      country: pub.locationOther?.country || 'International',
    };
  } else if (pub.locationId) {
    const locMatch = LOCATIONS.find((l) => l.id === pub.locationId);
    if (locMatch) {
      resolvedLocation = { id: locMatch.id, name: locMatch.name, country: locMatch.country };
    }
  }

  return {
    slug: plain.slug || '',
    displayName: plain.displayName || '',
    photoUrl: plain.photoUrl || '',
    roles,
    interviewedAt: plain.interviewedAt ? new Date(plain.interviewedAt).toISOString() : null,
    interviewedByOutlineDev: Boolean(plain.interviewedAt),
    approvedAt: plain.approvedAt ? new Date(plain.approvedAt).toISOString() : null,
    skillIds,
    skills: resolvedSkills,
    location: resolvedLocation,
    timezone: pub.timezone || '',
    yearsExperience: typeof pub.yearsExperience === 'number' ? pub.yearsExperience : 0,
    languages: Array.isArray(pub.languages) ? pub.languages : [],
    links: {
      github: pub.links?.github || '',
      linkedin: pub.links?.linkedin || '',
    },
    projects: Array.isArray(pub.projects)
      ? pub.projects.map((p) => ({
          title: p.title || '',
          description: p.description || '',
          url: p.url || '',
        }))
      : [],
    mentor:
      roles.includes('mentor') && pub.mentor
        ? {
            headline: pub.mentor.headline || '',
            summary: pub.mentor.summary || '',
            rate: typeof pub.mentor.rate === 'number' ? pub.mentor.rate : 0,
            topics: Array.isArray(pub.mentor.topics) ? pub.mentor.topics : [],
            formats: Array.isArray(pub.mentor.formats) ? pub.mentor.formats : [],
          }
        : null,
    hire:
      roles.includes('hire') && pub.hire
        ? {
            headline: pub.hire.headline || '',
            summary: pub.hire.summary || '',
            rate: typeof pub.hire.rate === 'number' ? pub.hire.rate : 0,
            availability: pub.hire.availability || '',
            engagementTypes: Array.isArray(pub.hire.engagementTypes) ? pub.hire.engagementTypes : [],
          }
        : null,
  };
}

/**
 * Normalizes display name into firstname-lastname format.
 */
export function formatSlug(displayName) {
  if (!displayName || typeof displayName !== 'string') {
    return 'developer';
  }
  let baseSlug = displayName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return baseSlug || 'developer';
}

/**
 * Generates an immutable, unique slug in firstname-lastname format.
 * Adds -2, -3 etc. on clash.
 */
export async function generateUniqueSlug(displayName, currentDocId = null, model = MentorApplication) {
  const baseSlug = formatSlug(displayName);
  let candidate = baseSlug;
  let counter = 1;

  while (true) {
    const query = { slug: candidate };
    if (currentDocId) {
      query._id = { $ne: currentDocId };
    }
    const existing = model && typeof model.findOne === 'function'
      ? await model.findOne(query).select('_id').lean()
      : null;

    if (!existing) {
      return candidate;
    }
    counter += 1;
    candidate = `${baseSlug}-${counter}`;
  }
}

/**
 * Text validation helpers
 */
export function hasHtmlTags(str) {
  return /<[^>]*>/g.test(str || '');
}

export function hasUrls(str) {
  if (!str) return false;
  // Allow .NET and ASP.NET mentions in headlines without false-positive URL detection
  const stripped = str
    .replace(/\b(?:asp|vb)\.net\b/gi, '')
    .replace(/(^|[^a-zA-Z0-9])\.net\b/gi, '$1');
  return /https?:\/\/|www\.|\.(?:com|org|net|io|dev|co|app|ai|me)\b/i.test(stripped);
}

export function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Validates Headline: max 70 chars, plain text only, no HTML, no URLs.
 */
export function validateHeadline(headline) {
  if (!headline || typeof headline !== 'string') {
    return 'Headline is required.';
  }
  const clean = headline.trim();
  if (clean.length === 0) {
    return 'Headline cannot be empty.';
  }
  if (clean.length > 70) {
    return `Headline must be 70 characters or fewer (currently ${clean.length} characters).`;
  }
  if (hasHtmlTags(clean)) {
    return 'Headline must be plain text with no HTML tags.';
  }
  if (hasUrls(clean)) {
    return 'Headline cannot contain website URLs or domain links.';
  }
  return null;
}

/**
 * Validates Summary: 80 - 300 words, plain text only, no HTML.
 */
export function validateSummary(summary, roleName = 'Role') {
  if (!summary || typeof summary !== 'string') {
    return `${roleName} summary is required.`;
  }
  const clean = summary.trim();
  if (hasHtmlTags(clean)) {
    return `${roleName} summary must be plain text with no HTML tags.`;
  }
  const words = countWords(clean);
  if (words < 80) {
    return `${roleName} summary must be at least 80 words (currently ${words} words).`;
  }
  if (words > 300) {
    return `${roleName} summary cannot exceed 300 words (currently ${words} words).`;
  }
  return null;
}

/**
 * Validates Skill IDs: must exist in SKILLS list, max 8.
 */
export function validateSkillIds(skillIds) {
  if (!Array.isArray(skillIds) || skillIds.length === 0) {
    return 'Please select at least 1 skill.';
  }
  if (skillIds.length > 8) {
    return 'You may select a maximum of 8 primary skills.';
  }
  const validIds = new Set(SKILLS.map((s) => s.id));
  for (const id of skillIds) {
    if (!validIds.has(id)) {
      return `Invalid skill selected: "${id}".`;
    }
  }
  return null;
}

/**
 * Validates Location: must exist in LOCATIONS or be 'other' with country + city.
 */
export function validateLocation(locationId, locationOther) {
  if (!locationId) return 'Please select a location.';
  if (locationId === 'other') {
    if (!locationOther?.country?.trim() || !locationOther?.city?.trim()) {
      return 'For "Other" location, please specify both country and city.';
    }
    return null;
  }
  const validLoc = LOCATIONS.some((l) => l.id === locationId);
  if (!validLoc) {
    return `Invalid location selected: "${locationId}".`;
  }
  return null;
}

/**
 * Validates Projects: max 3 (title, one-line description, optional url).
 */
export function validateProjects(projects) {
  if (!projects) return null;
  if (!Array.isArray(projects)) return 'Projects must be an array.';
  if (projects.length > 3) {
    return 'A maximum of 3 projects may be showcased.';
  }
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    if (!p.title || !p.title.trim()) {
      return `Project #${i + 1} requires a title.`;
    }
    if (!p.description || !p.description.trim()) {
      return `Project #${i + 1} requires a one-line description.`;
    }
    if (p.url && hasHtmlTags(p.url)) {
      return `Project #${i + 1} has an invalid URL.`;
    }
  }
  return null;
}

/**
 * Validates Mandatory Consents: all 6 must have valid timestamps.
 */
export const REQUIRED_CONSENTS = [
  'publicProfile',
  'publicPhoto',
  'realName',
  'terms',
  'mayInterview',
  'receiveLeads',
];

export function validateConsents(consents) {
  if (!consents || typeof consents !== 'object') {
    return 'All mandatory consent declarations are required before submitting.';
  }
  for (const key of REQUIRED_CONSENTS) {
    if (!consents[key]) {
      return `Missing required consent: "${key}". You must accept all terms and consents to submit.`;
    }
  }
  return null;
}

/**
 * Deterministically ranks candidates according to the 4 matching priority rules:
 * (1) same skill + same city
 * (2) same skill + same country
 * (3) same skill anywhere
 * (4) always the default profile for the site owner from app/lib/default-expert.js
 *
 * Returns up to 3 cards.
 */
export function rankExperts({
  candidates = [],
  targetSkillId,
  targetLocationId,
  intent = 'mentor',
  defaultExpert = DEFAULT_EXPERT,
}) {
  // Resolve target location
  let targetCity = null;
  let targetCountry = null;
  if (targetLocationId) {
    const locMatch = LOCATIONS.find((l) => l.id === targetLocationId);
    if (locMatch) {
      targetCity = locMatch.name.toLowerCase();
      targetCountry = locMatch.country.toLowerCase();
    } else if (targetLocationId === 'online' || targetLocationId === 'remote') {
      targetCity = 'online';
      targetCountry = 'global';
    }
  }

  // Filter candidates who have target skill, support this intent, and have role details
  const eligible = candidates.filter((c) => {
    if (!c) return false;
    const roles = Array.isArray(c.roles) ? c.roles : [];
    if (!roles.includes(intent)) return false;
    const skillIds = Array.isArray(c.skillIds) ? c.skillIds : [];
    if (!skillIds.includes(targetSkillId)) return false;
    if (intent === 'mentor' && !c.mentor) return false;
    if (intent === 'hire' && !c.hire) return false;
    return true;
  });

  const bucket1 = []; // same city
  const bucket2 = []; // same country
  const bucket3 = []; // same skill anywhere

  const isPhysicalTarget =
    targetCity &&
    targetCity !== 'online' &&
    targetCity !== 'remote' &&
    targetCountry !== 'global' &&
    targetCountry !== 'local';

  for (const c of eligible) {
    const candCity = c.location?.name?.toLowerCase() || '';
    const candCountry = c.location?.country?.toLowerCase() || '';
    const candLocId = c.location?.id || '';

    if (isPhysicalTarget && (candLocId === targetLocationId || (candCity && candCity === targetCity))) {
      bucket1.push(c);
    } else if (isPhysicalTarget && candCountry && candCountry === targetCountry) {
      bucket2.push(c);
    } else {
      bucket3.push(c);
    }
  }

  // Deterministic tie-breaking sort inside each bucket
  const deterministicSort = (a, b) => {
    // 1. Interviewed badge first
    const aInterviewed = Boolean(a.interviewedByOutlineDev || a.interviewedAt);
    const bInterviewed = Boolean(b.interviewedByOutlineDev || b.interviewedAt);
    if (aInterviewed !== bInterviewed) {
      return aInterviewed ? -1 : 1;
    }
    // 2. Alphabetical display name
    const nameDiff = (a.displayName || '').localeCompare(b.displayName || '');
    if (nameDiff !== 0) return nameDiff;
    // 3. Stable slug tiebreak
    return (a.slug || '').localeCompare(b.slug || '');
  };

  bucket1.sort(deterministicSort);
  bucket2.sort(deterministicSort);
  bucket3.sort(deterministicSort);

  // Combine buckets 1-3 with deduplication
  const combined = [];
  const seenSlugs = new Set();

  for (const c of [...bucket1, ...bucket2, ...bucket3]) {
    if (c.slug && !seenSlugs.has(c.slug)) {
      seenSlugs.add(c.slug);
      combined.push(c);
    }
  }

  // Fallback (4): always append default profile for site owner from app/lib/default-expert.js
  if (defaultExpert && defaultExpert.slug && !seenSlugs.has(defaultExpert.slug)) {
    combined.push(defaultExpert);
    seenSlugs.add(defaultExpert.slug);
  }

  // Cap at 3 cards
  return combined.slice(0, 3);
}

/**
 * Cached expert matching query.
 * Controlled by EXPERTS_MATCHING_ENABLED environment variable (default false).
 * With the flag off, returns [] so rendered HTML is byte-for-byte unchanged.
 */
export async function getExpertsFor({ skillId, locationId, intent = 'mentor' }) {
  const isEnabled = process.env.EXPERTS_MATCHING_ENABLED === 'true' || process.env.EXPERTS_MATCHING_ENABLED === '1';
  if (!isEnabled) {
    return [];
  }

  const queryAndRank = async () => {
    try {
      const dbConnectModule = await import('./mongodb.js');
      const dbConnect = dbConnectModule.default || dbConnectModule;
      await dbConnect();

      const docs = await MentorApplication.find({
        status: { $nin: ['hidden', 'rejected'] },
        published: { $ne: null },
        roles: intent,
        'published.skillIds': skillId,
      }).lean();

      const publicCandidates = docs.map(toPublicProfile).filter(Boolean);

      return rankExperts({
        candidates: publicCandidates,
        targetSkillId: skillId,
        targetLocationId: locationId,
        intent,
        defaultExpert: DEFAULT_EXPERT,
      });
    } catch (err) {
      console.error('getExpertsFor database query error:', err);
      return rankExperts({
        candidates: [],
        targetSkillId: skillId,
        targetLocationId: locationId,
        intent,
        defaultExpert: DEFAULT_EXPERT,
      });
    }
  };

  // Attempt Next.js unstable_cache if available in this runtime
  try {
    const nextCache = await import('next/cache');
    if (nextCache && typeof nextCache.unstable_cache === 'function') {
      const cachedFn = nextCache.unstable_cache(
        queryAndRank,
        [`experts-match-${skillId}-${locationId || 'any'}-${intent}`],
        {
          tags: [`experts:skill:${skillId}`],
          revalidate: 86400,
        }
      );
      return await cachedFn();
    }
  } catch {
    // Fall back to direct execution if not inside Next.js cache environment
  }

  return await queryAndRank();
}
