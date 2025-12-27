export const day22 = {
  day: 22,
  title: "PWA (Offline, Caching, Updates)",
  intro: "PWAs require careful caching strategy. Learn service workers, offline mode, and safe update flows.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">PWA Reality</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Caching is power and risk. If you cache the wrong assets you can ship broken apps until caches expire.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) What Should Be Cached</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">App shell</span>: JS/CSS assets with hashed filenames.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Static content</span>: icons, fonts (careful with cache headers).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">API responses</span>: only if you have a correctness strategy.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Update Strategy (The Hard Part)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Users can stay on old versions. You need an update UX: detect new version, prompt reload, and avoid “half-updated” apps.
</p>
            `,
  code: `// PWA checklist:
// - cache immutable assets
// - handle update prompts
// - test offline flows explicitly`,
  comparison: {
    junior: "// ❌ enable SW and forget",
    senior: "// ✅ caching strategy + update UX"
  },
  interview: {
    questions: [
      {
        q: "What’s the hardest part of PWAs?",
        a: "Update strategy and cache invalidation. Users can stay on old versions if you don’t manage updates."
      },
      {
        q: "When is PWA a bad idea?",
        a: "When data must always be real-time and offline caching would cause incorrect behavior, or when you can’t support update complexity."
      },
      {
        q: "What is a service worker?",
        a: "A background script that can intercept requests, cache assets, and enable offline behavior."
      }
    ]
  }
};
