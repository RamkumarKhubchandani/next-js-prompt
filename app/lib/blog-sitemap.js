export const BASE_URL = 'https://www.outlinedev.com';

export const KNOWN_INTERVIEW_HUBS = [
  '/interview',
  '/interview/react',
  '/interview/angular',
  '/interview/javascript',
  '/interview/typescript',
  '/interview/html-css',
  '/interview/zustand',
  '/interview/mock',
];

export function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function formatIsoDate(dateVal) {
  if (!dateVal) return null;
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
  } catch {
    return null;
  }
}

export function buildBlogSitemapXml({ tutorials = [], interviewHubs = KNOWN_INTERVIEW_HUBS, baseUrl = BASE_URL } = {}) {
  const urls = [];

  // 1. /blogs index
  urls.push({
    loc: `${baseUrl}/blogs`,
    changefreq: 'daily',
    priority: '0.9',
  });

  // 2. Every blog post (lastmod = updatedAt || publishedAt, never the current date)
  for (const t of tutorials) {
    if (!t || !t.slug) continue;
    const rawDate = t.updatedAt || t.publishedAt || (t.type === 'dynamic' ? t.createdAt : null);
    const lastmod = formatIsoDate(rawDate);
    urls.push({
      loc: `${baseUrl}/blogs/${t.slug}`,
      ...(lastmod ? { lastmod } : {}),
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  // 3. Interview hubs
  for (const hub of interviewHubs) {
    urls.push({
      loc: `${baseUrl}${hub}`,
      changefreq: 'weekly',
      priority: '0.8',
    });
  }

  const xmlEntries = urls
    .map((u) => {
      let entry = `  <url>\n    <loc>${escapeXml(u.loc)}</loc>`;
      if (u.lastmod) {
        entry += `\n    <lastmod>${u.lastmod}</lastmod>`;
      }
      if (u.changefreq) {
        entry += `\n    <changefreq>${u.changefreq}</changefreq>`;
      }
      if (u.priority) {
        entry += `\n    <priority>${u.priority}</priority>`;
      }
      entry += `\n  </url>`;
      return entry;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries}\n</urlset>`;
}
