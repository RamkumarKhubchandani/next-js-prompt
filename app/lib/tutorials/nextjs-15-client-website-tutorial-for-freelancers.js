export const nextjs15ClientWebsiteTutorialForFreelancers = {
    title: "Next.js 15 Client Website Tutorial for Freelancers",
    description: "Build a high-performance service website with Next.js 15 App Router: metadata API, JSON-LD, server action forms, revalidation, and Core Web Vitals.",
    slug: "nextjs-15-client-website-tutorial-for-freelancers",
    publishedAt: "2026-11-10T11:15:00+05:30",
    type: "static",
    author: "Ramkumar Khubchandani",
    createdAt: "2026-11-10T11:15:00+05:30",
    readTime: "17 min read",
    difficulty: "Intermediate to Advanced",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2560&auto=format&fit=crop",
    tags: ["Next.js", "Next.js 15", "App Router", "React 19", "Freelancing", "SEO", "Server Actions"],
    keywords: [
        "nextjs 15 client website tutorial for freelancers",
        "nextjs 15 tutorial for freelancers",
        "nextjs 15 server action contact form",
        "nextjs 15 metadata api json ld",
        "freelance client website nextjs",
        "nextjs 15 on demand revalidation",
        "core web vitals nextjs 15"
    ],
    primaryCta: {
        label: "Hire Next.js Developer",
        href: "/hire/nextjs-developer"
    },
    relatedPosts: [
        "nextjs-15-app-router",
        "nextjs-15-production-setup-guide",
        "how-to-hire-a-javascript-developer"
    ],
    toc: [
        { id: "project-architecture-scoping", label: "01. Architecture & Client Scoping for Next.js 15 App Router" },
        { id: "metadata-and-jsonld", label: "02. Dynamic Metadata API & Safe JSON-LD Structured Data" },
        { id: "server-action-contact-form", label: "03. Contact & Booking Form with Server Action Validation" },
        { id: "caching-and-revalidation", label: "04. Caching Strategies & On-Demand Path Revalidation" },
        { id: "core-web-vitals", label: "05. Core Web Vitals Optimization Checklist (LCP, INP, CLS)" },
        { id: "client-handover-runbook", label: "06. Client Delivery Runbook & Hosting Handoff" },
        { id: "nextjs-freelance-support", label: "07. Senior Next.js Freelance Engineering" }
    ],
    content: `
    <div class="space-y-12 font-sans text-gray-800 dark:text-gray-200">
        
        <header class="border-l-8 border-cyan-500 bg-cyan-50 dark:bg-cyan-950/20 pl-8 py-6 mb-8 rounded-r-2xl shadow-sm">
            <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-3">
                Next.js 15 Client Website Tutorial: Fast, SEO-Engineered Service Sites
            </h1>
            <p class="text-base text-cyan-900 dark:text-cyan-200 font-light leading-relaxed">
                Small business owners and service companies no longer tolerate slow WordPress themes or bloated website builders. They want lightning-fast page transitions, perfect Core Web Vitals scores, automated local SEO via JSON-LD schemas, and secure contact forms that never drop leads. In this complete project tutorial, we will build an end-to-end service website using Next.js 15 App Router, React 19 Server Actions, dynamic Metadata APIs, safe schema rendering, and on-demand cache revalidation. Explore our vetted <a href="/hire/nextjs-developer" class="text-cyan-700 dark:text-cyan-400 font-semibold hover:underline">freelance Next.js developers</a> and 1-on-1 <a href="/mentors/nextjs-mentors-in-online" class="text-cyan-700 dark:text-cyan-400 font-semibold hover:underline">online Next.js mentors</a>.
            </p>
        </header>

        <!-- 01. Architecture & Scoping -->
        <section id="project-architecture-scoping" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                01. Architecture & Client Scoping for Next.js 15 App Router
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    When selling a custom web build to a local business client—such as an accounting firm, medical practice, or creative agency—your technical architecture must deliver measurable business outcomes: high Google search rankings, instant mobile load times, and effortless client inquiries.
                </p>

                <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm my-4">
                    <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Example Client Scenario: Meridian Legal Advisory (fictional example for illustration)</h3>
                    <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                        The client runs a corporate legal consultancy in London. They require a marketing and intake site featuring practice area landing pages, lawyer bios, a free consultation intake form, and instant SEO metadata generation across 15 practice specialties.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
                        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <span class="font-bold text-cyan-600 dark:text-cyan-400 block mb-1">Server Components (RSC)</span>
                            <p class="text-slate-600 dark:text-slate-400 text-xs">Page shells, practice area lists, and static copy render on the server with zero client-side JavaScript overhead.</p>
                        </div>
                        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <span class="font-bold text-cyan-600 dark:text-cyan-400 block mb-1">Server Actions</span>
                            <p class="text-slate-600 dark:text-slate-400 text-xs">Form submissions execute on the server via <code>'use server'</code> functions, eliminating separate REST API controller endpoints.</p>
                        </div>
                        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <span class="font-bold text-cyan-600 dark:text-cyan-400 block mb-1">Static Generation (SSG)</span>
                            <p class="text-slate-600 dark:text-slate-400 text-xs">All marketing pages pre-render at build time with on-demand tag revalidation when practice rates update.</p>
                        </div>
                    </div>
                </div>

                <div class="my-6">
                    <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Freelance Proposal Milestone & Deliverables Matrix</h3>
                    <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Presenting a structured phase breakdown prevents non-technical clients from questioning development time and builds instant professional authority:
                    </p>
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                            <thead class="bg-slate-100 dark:bg-slate-900 font-bold text-slate-900 dark:text-white">
                                <tr>
                                    <th class="p-3 border border-slate-200 dark:border-slate-800">Phase</th>
                                    <th class="p-3 border border-slate-200 dark:border-slate-800">Architecture & Deliverables</th>
                                    <th class="p-3 border border-slate-200 dark:border-slate-800">Target Duration</th>
                                    <th class="p-3 border border-slate-200 dark:border-slate-800">Verification Benchmark</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                <tr>
                                    <td class="p-3 font-semibold">1. Discovery & Design System</td>
                                    <td class="p-3">Tailwind typography, color palette, mobile nav shell, Server Component layouts</td>
                                    <td class="p-3">5–7 business days</td>
                                    <td class="p-3">Responsive staging URL approved by client stakeholders</td>
                                </tr>
                                <tr>
                                    <td class="p-3 font-semibold">2. Dynamic SEO & JSON-LD</td>
                                    <td class="p-3">15 practice area routes, dynamic metadata generation, schema validation</td>
                                    <td class="p-3">6–8 business days</td>
                                    <td class="p-3">Google Rich Results Test passes with zero schema errors or warnings</td>
                                </tr>
                                <tr>
                                    <td class="p-3 font-semibold">3. Intake Server Actions</td>
                                    <td class="p-3">Inquiry form, server-side validation, email dispatch via Resend webhook</td>
                                    <td class="p-3">4–6 business days</td>
                                    <td class="p-3">Form end-to-end testing with spam defense and CRM webhook delivery</td>
                                </tr>
                                <tr>
                                    <td class="p-3 font-semibold">4. Core Web Vitals & Launch</td>
                                    <td class="p-3">Font optimization, image compression, DNS pointing, client handover</td>
                                    <td class="p-3">3–5 business days</td>
                                    <td class="p-3">Lighthouse scores &gt; 95 across Performance, Accessibility, and SEO</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <p>
                    Review our comprehensive architecture guide on <a href="/blogs/nextjs-15-app-router" class="text-cyan-600 dark:text-cyan-400 font-semibold underline">Next.js 15 App Router</a> and production configurations in <a href="/blogs/nextjs-15-production-setup-guide" class="text-cyan-600 dark:text-cyan-400 font-semibold underline">Next.js 15 production setup</a>.
                </p>
            </div>
        </section>

        <!-- 02. Metadata & JSON-LD -->
        <section id="metadata-and-jsonld" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                02. Dynamic Metadata API & Safe JSON-LD Structured Data
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Local business clients rely heavily on Google search discovery. Next.js 15 provides first-class support for the <a href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata" target="_blank" rel="noopener noreferrer" class="text-cyan-600 dark:text-cyan-400 font-semibold underline">Metadata API</a>. To ensure structured data never breaks your build or creates XSS vulnerabilities, always escape raw JSON strings using safe serialization. When implementing structured data, only mark up reviews that are real and visible on the page, avoiding synthetic aggregate rating schemas on static marketing pages.
                </p>

                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-javascript">// app/practice-areas/[slug]/page.js - SEO Metadata & Schema
import { notFound } from 'next/navigation';

const PRACTICE_AREAS = {
  'corporate-governance': {
    title: 'Corporate Governance & Compliance Advisory',
    description: 'Expert corporate governance and legal compliance advisory for UK enterprise businesses and growing startups.',
    practiceCity: 'London'
  },
  'mergers-acquisitions': {
    title: 'Mergers & Acquisitions Legal Advisory',
    description: 'Specialized M&A transaction support, due diligence audits, and contract negotiation for mid-market acquisitions.',
    practiceCity: 'London'
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = PRACTICE_AREAS[slug];
  if (!area) return {};

  return {
    title: \`\${area.title} | Meridian Legal London\`,
    description: area.description,
    alternates: {
      canonical: \`https://www.meridianlegal.example/practice-areas/\${slug}\`
    },
    openGraph: {
      title: area.title,
      description: area.description,
      type: 'article',
      url: \`https://www.meridianlegal.example/practice-areas/\${slug}\`
    }
  };
}

// XSS-Safe JSON-LD Serializer
function safeJsonLd(obj) {
  return JSON.stringify(obj).replace(/&lt;/g, '\\\\u003c');
}

export default async function PracticeAreaPage({ params }) {
  const { slug } = await params;
  const area = PRACTICE_AREAS[slug];
  if (!area) notFound();

  const structuredSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: area.title,
    description: area.description,
    url: \`https://www.meridianlegal.example/practice-areas/\${slug}\`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.practiceCity,
      addressCountry: 'GB'
    }
  };

  return (
    &lt;main className="max-w-4xl mx-auto px-4 py-12"&gt;
      &lt;script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredSchema) }}
      /&gt;
      &lt;h1 className="text-3xl font-black text-slate-900 dark:text-white"&gt;{area.title}&lt;/h1&gt;
      &lt;p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed"&gt;{area.description}&lt;/p&gt;
    &lt;/main&gt;
  );
}</code></pre>
            </div>
        </section>

        <!-- 03. Server Action Contact Form -->
        <section id="server-action-contact-form" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                03. Contact & Booking Form with Server Action Validation
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    In Next.js 15, <a href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations" target="_blank" rel="noopener noreferrer" class="text-cyan-600 dark:text-cyan-400 font-semibold underline">Server Actions</a> eliminate the need for separate API route files. The form submission logic executes entirely on the server, ensuring private webhook URLs and API keys remain safe from browser inspection.
                </p>

                <h3 class="text-base font-bold text-gray-900 dark:text-white">Server Action Handler: app/actions/consultation.js</h3>
                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-javascript">// app/actions/consultation.js
'use server';

import { revalidatePath } from 'next/cache';

export async function submitConsultationRequest(prevState, formData) {
  // Defensive field extraction
  const fullName = String(formData.get('fullName') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const practiceArea = String(formData.get('practiceArea') || '').trim();
  const summary = String(formData.get('summary') || '').trim();

  const errors = {};

  // Server-side validation rules
  if (fullName.length &lt; 2 || fullName.length &gt; 60) {
    errors.fullName = 'Please enter your full name (2 to 60 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (!practiceArea) {
    errors.practiceArea = 'Please select a practice specialty.';
  }

  if (summary.length &lt; 10 || summary.length &gt; 1000) {
    errors.summary = 'Please provide a brief case summary (10 to 1,000 characters).';
  }

  // Return validation feedback if errors exist
  if (Object.keys(errors).length &gt; 0) {
    return { success: false, errors };
  }

  try {
    // In production: send email via Resend / SendGrid or push to CRM webhook
    const submissionId = 'MER-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    // Trigger on-demand cache revalidation for the lead dashboard
    revalidatePath('/admin/leads');

    return {
      success: true,
      submissionId,
      message: 'Thank you. A senior legal advisor will review your request within 24 hours.'
    };
  } catch (err) {
    return {
      success: false,
      errors: { general: 'Service temporarily unavailable. Please email us directly.' }
    };
  }
}</code></pre>

                <h3 class="text-base font-bold text-gray-900 dark:text-white mt-6">Client Form Component: components/ConsultationForm.jsx</h3>
                <p>
                    Next, we pair the server action with React 19's <code>useActionState</code> hook to manage loading spinners, inline errors, and success confirmation without client-side page refreshes:
                </p>
                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-javascript">// components/ConsultationForm.jsx
'use client';

import { useActionState } from 'react';
import { submitConsultationRequest } from '@/app/actions/consultation';

export function ConsultationForm() {
  const [state, formAction, isPending] = useActionState(submitConsultationRequest, {
    success: false,
    errors: {}
  });

  if (state.success) {
    return (
      &lt;div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-center space-y-2"&gt;
        &lt;h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300"&gt;Inquiry Received&lt;/h3&gt;
        &lt;p className="text-xs md:text-sm text-slate-600 dark:text-slate-400"&gt;Reference ID: &lt;strong className="font-mono text-emerald-700 dark:text-emerald-400"&gt;{state.submissionId}&lt;/strong&gt;&lt;/p&gt;
        &lt;p className="text-xs md:text-sm text-slate-600 dark:text-slate-400"&gt;{state.message}&lt;/p&gt;
      &lt;/div&gt;
    );
  }

  return (
    &lt;form action={formAction} className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"&gt;
      &lt;div&gt;
        &lt;label htmlFor="fullName" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1"&gt;Full Name&lt;/label&gt;
        &lt;input id="fullName" name="fullName" type="text" className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm" placeholder="Johnathan Davis" /&gt;
        {state.errors?.fullName && &lt;p className="text-xs text-rose-600 mt-1"&gt;{state.errors.fullName}&lt;/p&gt;}
      &lt;/div&gt;

      &lt;div&gt;
        &lt;label htmlFor="email" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1"&gt;Corporate Email&lt;/label&gt;
        &lt;input id="email" name="email" type="email" className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm" placeholder="j.davis@company.example" /&gt;
        {state.errors?.email && &lt;p className="text-xs text-rose-600 mt-1"&gt;{state.errors.email}&lt;/p&gt;}
      &lt;/div&gt;

      &lt;div&gt;
        &lt;label htmlFor="practiceArea" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1"&gt;Practice Specialty&lt;/label&gt;
        &lt;select id="practiceArea" name="practiceArea" className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm"&gt;
          &lt;option value=""&gt;Select specialty...&lt;/option&gt;
          &lt;option value="corporate-governance"&gt;Corporate Governance&lt;/option&gt;
          &lt;option value="mergers-acquisitions"&gt;Mergers & Acquisitions&lt;/option&gt;
        &lt;/select&gt;
        {state.errors?.practiceArea && &lt;p className="text-xs text-rose-600 mt-1"&gt;{state.errors.practiceArea}&lt;/p&gt;}
      &lt;/div&gt;

      &lt;div&gt;
        &lt;label htmlFor="summary" className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1"&gt;Brief Summary of Inquiry&lt;/label&gt;
        &lt;textarea id="summary" name="summary" rows="3" className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm" placeholder="Describe your advisory requirements..." /&gt;
        {state.errors?.summary && &lt;p className="text-xs text-rose-600 mt-1"&gt;{state.errors.summary}&lt;/p&gt;}
      &lt;/div&gt;

      &lt;button type="submit" disabled={isPending} className="w-full py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-400 text-white font-bold text-sm shadow-md transition-colors"&gt;
        {isPending ? 'Sending Inquiry...' : 'Submit Confidential Inquiry'}
      &lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
            </div>
        </section>

        <!-- 04. Caching & Revalidation -->
        <section id="caching-and-revalidation" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                04. Caching Strategies & On-Demand Path Revalidation
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    One of the major architectural improvements in Next.js 15 is that <code>fetch</code> requests and route handlers are un-cached by default unless explicitly configured. For client marketing sites, you should configure explicit cache policies to maximize edge server performance:
                </p>

                <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 my-4 space-y-3">
                    <h3 class="text-base font-bold text-gray-900 dark:text-white">Three Caching Models for Client Sites</h3>
                    <ul class="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                        <li><strong>Static Content (High Cache):</strong> Marketing homepages, about pages, and practice area guides. Set <code>export const revalidate = 86400;</code> (24-hour cache with stale-while-revalidate).</li>
                        <li><strong>On-Demand Revalidation:</strong> When the client edits a lawyer biography or changes service fees in their headless CMS, trigger <code>revalidateTag('practice-areas')</code> via a secure webhook endpoint.</li>
                        <li><strong>Dynamic Content (Zero Cache):</strong> Lead inquiry review dashboards or user session screens. Configure with <code>export const dynamic = 'force-dynamic';</code>.</li>
                    </ul>
                </div>

                <h3 class="text-lg font-bold text-gray-900 dark:text-white mt-6">On-Demand Webhook Handler: app/api/revalidate/route.js</h3>
                <p>
                    When a client updates their pricing or team bios in a CMS (such as Sanity, Strapi, or Contentful), configure this secure webhook route to invalidate cached pages immediately without triggering a full site rebuild:
                </p>
                <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono my-3 border border-slate-800 leading-relaxed"><code class="language-javascript">// app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  const secretToken = process.env.REVALIDATION_SECRET_TOKEN;

  // Protect the webhook endpoint with bearer token authentication
  if (!secretToken || authHeader !== \`Bearer \${secretToken}\`) {
    return NextResponse.json({ error: 'Unauthorized webhook request' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const { path, tag } = payload;

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag, timestamp: Date.now() });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path, timestamp: Date.now() });
    }

    return NextResponse.json({ error: 'Missing path or tag payload' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process revalidation' }, { status: 500 });
  }
}</code></pre>
            </div>
        </section>

        <!-- 05. Core Web Vitals -->
        <section id="core-web-vitals" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                05. Core Web Vitals Optimization Checklist (LCP, INP, CLS)
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Google actively down-ranks sites that fail Core Web Vitals thresholds. Use this checklist during staging to ensure 100/100 Lighthouse performance:
                </p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span class="font-bold text-cyan-600 dark:text-cyan-400 block mb-1">Largest Contentful Paint (LCP) &lt; 2.5s</span>
                        <p class="text-xs text-slate-600 dark:text-slate-400">Use <code>next/image</code> with <code>priority</code> on hero banners, serve WebP/AVIF formats, and eliminate render-blocking custom web fonts using <code>next/font</code>.</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span class="font-bold text-cyan-600 dark:text-cyan-400 block mb-1">Interaction to Next Paint (INP) &lt; 200ms</span>
                        <p class="text-xs text-slate-600 dark:text-slate-400">Keep React client components small. Defer non-critical analytics scripts using <code>next/script</code> with <code>strategy="afterInteractive"</code>.</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span class="font-bold text-cyan-600 dark:text-cyan-400 block mb-1">Cumulative Layout Shift (CLS) &lt; 0.1</span>
                        <p class="text-xs text-slate-600 dark:text-slate-400">Always set explicit <code>width</code> and <code>height</code> aspects on images and reserve space for dynamic form error containers to prevent content jumping.</p>
                    </div>
                </div>

                <div class="my-6">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Font & Image Optimization in Root Layout: app/layout.js</h3>
                    <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Using Google Fonts via external <code>&lt;link&gt;</code> tags triggers costly network handshakes and layout shifts. Modern Next.js 15 projects self-host fonts automatically at build time using <code>next/font/google</code>:
                    </p>
                    <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-slate-800 leading-relaxed"><code class="language-javascript">// app/layout.js - Zero-CLS Font Preloading
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Meridian Legal Advisory | London Corporate Law',
  description: 'Premier London legal advisory providing expert corporate governance, M&A due diligence, and regulatory compliance.',
};

export default function RootLayout({ children }) {
  return (
    &lt;html lang="en" className={\`\${inter.variable} \${playfair.variable}\`}&gt;
      &lt;body className="font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"&gt;
        {children}
      &lt;/body&gt;
    &lt;/html&gt;
  );
}</code></pre>
                </div>
            </div>
        </section>

        <!-- 06. Client Handover Runbook -->
        <section id="client-handover-runbook" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                06. Client Delivery Runbook & Hosting Handoff
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    When delivering a Next.js 15 site to a paying client, compile a professional handover package containing these 4 essential documents:
                </p>
                <ul class="list-disc pl-5 space-y-2 text-xs md:text-sm">
                    <li><strong>Hosting Transfer Protocol:</strong> Set up the production project under the client's own Vercel or AWS Amplify team account so you are not stuck paying for their hosting bills.</li>
                    <li><strong>DNS Records Guide:</strong> Provide an explicit table listing CNAME and A records required at their domain registrar (GoDaddy, Cloudflare, or Namecheap).</li>
                    <li><strong>Environment Variables Vault:</strong> Document every production environment variable (database strings, Resend API keys) in a secure password manager rather than plaintext email.</li>
                    <li><strong>Automated Lighthouse CI Gate:</strong> Configure GitHub Actions with Lighthouse CI to automatically test pull requests, guaranteeing that future edits by other contributors never degrade mobile Core Web Vitals below 95.</li>
                    <li><strong>Post-Launch SLA:</strong> Establish whether you offer an ongoing retainer for monthly updates, security patching, and content additions.</li>
                </ul>
            </div>
        </section>

        <!-- 07. Author Support & Consulting CTA -->
        <section id="nextjs-freelance-support" class="scroll-mt-32">
            <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-3 dark:border-gray-800">
                07. Senior Next.js Freelance Engineering
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Building client websites with Next.js 15 gives your freelance business an undeniable competitive advantage. By delivering instantaneous page transitions, automated local SEO, and zero-maintenance server actions, you provide clients with an enterprise-grade digital storefront that drives business growth.
                </p>
                <p>
                    Clients who experience sub-second page loads and zero server crashes become your strongest referral engines. Adopting disciplined React Server Component boundaries, typed server actions, and structured schema verification positions your freelance agency far above generic low-code builders.
                </p>
                <p class="italic text-xs md:text-sm text-slate-600 dark:text-slate-400 border-l-4 border-cyan-500 pl-4 py-1">
                    Disclosure: I build production Next.js 15 websites and web applications for clients at OutlineDev, but the patterns and code in this guide apply universally to any freelance client build.
                </p>
            </div>
        </section>

        <!-- Footer Call-to-Action -->
        <footer class="border-t pt-8 mt-12 dark:border-gray-800">
            <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 md:p-8 rounded-2xl border border-cyan-200 dark:border-cyan-900/30">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Need an Experienced Next.js Developer for Your Web Project?</h3>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Ready to build your next client website or SaaS portal with Next.js 15 App Router? Schedule a 20-minute consultation call to review your architecture, SEO requirements, and delivery milestones.
                </p>
                <div class="flex flex-wrap items-center gap-4">
                    <a href="/hire/nextjs-developer" class="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-md transition-colors">
                        Hire an Experienced Next.js Developer
                    </a>
                    <a href="/mentors/nextjs-mentors-in-online" class="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400">
                        Explore 1-on-1 Next.js Mentorship &rarr;
                    </a>
                </div>
            </div>
        </footer>

    </div>
`
};
