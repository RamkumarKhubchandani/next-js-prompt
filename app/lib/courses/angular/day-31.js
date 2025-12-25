export const day31 = {
  day: 31,
  title: "Interview Mastery (Angular + RxJS + Architecture)",
  intro: "We’ll cover the most common high-signal interview topics with senior-level answers and pitfalls.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">High-Signal Topics</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Change detection + OnPush + immutability</li>
  <li>RxJS flattening operators</li>
  <li>DI scopes + tokens</li>
  <li>Routing + lazy loading</li>
  <li>Performance troubleshooting</li>
</ul>
            `,
  code: `// Interview tip:
// Always explain tradeoffs and show you can debug production issues.`,
  comparison: {
    junior: "// ❌ memorize answers",
    senior: "// ✅ explain tradeoffs + debugging approach"
  },
  interview: {
    questions: [
      {
        q: "How would you debug a slow Angular page?",
        a: "Measure first: bundle size, CD hot spots, list rendering, network waterfalls. Apply OnPush/trackBy, split bundles, cache data streams, and remove heavy dependencies."
      },
      {
        q: "How do you avoid memory leaks?",
        a: "Prefer async pipe, manage subscriptions with takeUntil, avoid long-lived subjects, and profile heap growth."
      },
      {
        q: "What makes a senior Angular engineer?",
        a: "Architecture boundaries, performance discipline, strong RxJS understanding, and production-grade debugging/observability habits."
      }
    ]
  }
};
