# OutlineDev SEO & GEO Audit Report

This document records the baseline SEO, structured data, crawler policies, image quality, and Core Web Vitals audit for OutlineDev (outlinedev.com).

---

## 1. Indexable Routes & Metadata Status

The following matrix documents the metadata status of all routes:

| Route Path | Unique Title | Unique Meta Desc | Canonical Tag | Open Graph Tags | Structured Data (JSON-LD) | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ | Organized Org, Website, FAQ, Breadcrumb |
| `/about` | ✅ | ✅ | ❌ | ❌ | ❌ | Missing canonical, OG, and custom schema |
| `/become-mentor` | ✅ | ✅ | ❌ | ✅ | ✅ | JobPosting schema. Missing canonical |
| `/blogs` | ✅ | ✅ | ❌ | ❌ | ❌ | Missing canonical, OG, and custom schema |
| `/blogs/[slug]` | ✅ | ✅ | ✅ | ✅ | ✅ | Article / BlogPosting schema |
| `/challenges` | ❌ | ❌ | ❌ | ❌ | ❌ | Inherits site default layout metadata |
| `/challenges/[slug]` | ❌ | ❌ | ❌ | ❌ | ❌ | Inherits site default layout metadata |
| `/code-review` | ✅ | ❌ | ❌ | ❌ | ❌ | Title set in client component. Missing others |
| `/events` | ✅ | ✅ | ✅ | ✅ | ✅ | Event list schema |
| `/events/resume-optimization` | ❌ | ❌ | ❌ | ❌ | ❌ | Missing all tags; inherits defaults |
| `/events/[slug]` | ✅ | ✅ | ✅ | ✅ | ✅ | Dynamic Event schema |
| `/interview` | ✅ | ✅ | ❌ | ❌ | ❌ | Missing canonical, OG, schema |
| `/interview/angular` | ❌ | ❌ | ❌ | ✅ | ❌ | Client-only component; lacks server wrapping |
| `/interview/javascript` | ❌ | ❌ | ❌ | ✅ | ❌ | Client-only component; lacks server wrapping |
| `/interview/typescript` | ❌ | ❌ | ❌ | ✅ | ❌ | Client-only component; lacks server wrapping |
| `/interview/react` | ❌ | ❌ | ❌ | ✅ | ❌ | Client-only component; lacks server wrapping |
| `/interview/zustand` | ❌ | ❌ | ❌ | ✅ | ❌ | Client-only component; lacks server wrapping |
| `/jobs` | ❌ | ❌ | ❌ | ❌ | ❌ | Missing all tags; inherits defaults |
| `/mentors` | ✅ | ✅ | ❌ | ❌ | ❌ | Missing canonical, OG, schema |
| `/mentors/[slug]` | ✅ | ✅ | ✅ | ✅ | ✅ | Dynamic FAQPage / ProfessionalService |
| `/mentorship` | ✅ | ✅ | ✅ | ✅ | ✅ | EducationalOrganization / OfferCatalog schema |
| `/mock-interviews` | ✅ | ❌ | ❌ | ❌ | ❌ | Client component title only. Missing others |
| `/pricing` | ❌ | ✅ | ❌ | ❌ | ❌ | Missing unique title and canonical |
| `/privacy` | ✅ | ✅ | ❌ | ❌ | ❌ | Missing canonical |
| `/terms` | ✅ | ✅ | ❌ | ❌ | ❌ | Missing canonical |
| `/tutorials` | ✅ | ✅ | ❌ | ❌ | ❌ | Missing canonical |
| `/tutorials/[slug]` | ✅ | ✅ | ✅ | ✅ | ❌ | Missing structured data |
| `/u/[username]` | ✅ | ✅ | ✅ | ✅ | ❌ | User profile, no structured data |
| `/whiteboard` | ❌ | ❌ | ❌ | ❌ | ❌ | Missing all tags; inherits defaults |

---

## 2. Programmatic / Templated Pages Audit

The dynamic route `app/mentors/[slug]/page.js` parses parameters into local expert landing pages:
*   **Unique combinations generated in `sitemap.js`**: `342` Standard mentor landing pages (`[skill]-mentors-in-[location]`), `342` Tutor landing pages (`one-to-one-[skill]-tutors-in-[location]`), `152` Hiring variation landing pages, and `684` job support/interview help combinations. 
*   **Total sitemap combinations**: `1520` pages.
*   **Content Uniqueness**: The content is highly templated. While `getSkillContent` and `getLocationContent` dynamically output descriptive metadata sentences and custom local city coordinates, the structural sections of the page are identical.
*   **Risk**: Dynamic locations without real mentors in that location present "thin content" risks under Google's scaled-content-abuse guidelines.

---

## 3. Crawlers & robots.txt Policy

Both `app/robots.txt` and `public/robots.txt` exist.

### public/robots.txt Contents:
```txt
User-agent: *
Allow: /

# Block private/admin routes from indexing
Disallow: /api/
Disallow: /dashboard/
Disallow: /admin/

# Allow important crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Allow LLM crawlers to access llms.txt
User-agent: GPTBot
Allow: /llms.txt

User-agent: Claude-Web
Allow: /llms.txt

User-agent: anthropic-ai
Allow: /llms.txt

User-agent: PerplexityBot
Allow: /

# Sitemap
Sitemap: https://outlinedev.com/sitemap.xml
Sitemap: https://www.outlinedev.com/sitemap.xml
```

### AI Bots Evaluation:
*   **GPTBot**: Blocked from the main website; only allowed to read `/llms.txt`.
*   **ClaudeBot (Claude-Web / anthropic-ai)**: Blocked from the main website; only allowed to read `/llms.txt`.
*   **PerplexityBot**: Allowed completely.
*   **Google-Extended / Applebot-Extended**: Not explicitly disallowed, meaning they follow the default `User-agent: *` block which allows them.

---

## 4. Duplicate / Near-Duplicate Titles
*   `/challenges`, `/challenges/[slug]`, `/whiteboard`, `/jobs`, and `/events/resume-optimization` do not export metadata and inherit the default site layout title `"OutlineDev | Free Agentic Coding Bootcamp & Mentorship"`.
*   `/interview/[skill]` pages do not export static server metadata and display generic titles or rely on client fallback title rendering.

---

## 5. Missing Image Alt Text Audit
*   Standard images on key landing pages (homepage `Hero`, `EventsClient`, `MentorshipLanding`, `mock-interviews` testimonials) all have descriptive alt tags (`alt="Futuristic AI Coder..."`, `alt={mentor.name}`). No critical images are missing alt attributes.

---

## 6. Core Web Vitals Concerns
*   **Unoptimized Images**: Standard HTML `<img>` tag is used instead of optimized Next.js `<Image>` components on dynamic review elements, dynamic mentor cards (`MentorshipLanding.js`), event cards (`EventsClient.js`), and interview page testimonials (`mock-interviews`).
*   **Heavy Client Load**: The React Three Fiber (R3F) Neural Canvas inside the Hero element uses heavy computations. Although desktop loads it after a 1.5s delay and mobile disables it, it may still affect Interaction to Next Paint (INP) on mid-tier desktop setups.
