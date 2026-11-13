import { getAllTutorials } from '../lib/tutorials/index.js';
import { buildBlogSitemapXml, KNOWN_INTERVIEW_HUBS } from '../lib/blog-sitemap.js';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const tutorials = await getAllTutorials();

  // Discover any additional interview hubs from the file system if available
  let interviewHubs = [...KNOWN_INTERVIEW_HUBS];
  try {
    const fs = await import('fs');
    const path = await import('path');
    const interviewDir = path.join(process.cwd(), 'app', 'interview');
    if (fs.existsSync(interviewDir)) {
      const entries = fs.readdirSync(interviewDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const hubPath = `/interview/${entry.name}`;
          if (!interviewHubs.includes(hubPath)) {
            interviewHubs.push(hubPath);
          }
        }
      }
    }
  } catch {
    // Fall back to KNOWN_INTERVIEW_HUBS
  }

  const xml = buildBlogSitemapXml({ tutorials, interviewHubs });

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
