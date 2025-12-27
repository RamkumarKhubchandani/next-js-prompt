export const day20 = {
  day: 20,
  title: "Day 20: Print Styles (Export-Friendly Pages)",
  intro:
    "You’ll add print CSS so pages export cleanly: remove nav, expand content, and improve readability on paper/PDF.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Hide non-essential UI for print.</li>
  <li>Ensure links show their URL in print.</li>
</ul>

<div class="mb-8 p-5 rounded-xl border border-blue-500/30 bg-blue-500/5">
  <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note: The CSS Wars
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    How do you scale CSS to 100 developers?
  </p>
  <ul class="list-disc list-inside text-sm text-gray-700 dark:text-light-200 space-y-2">
    <li><span class="font-bold">BEM (Block Element Modifier):</span> The old king. Great for strict naming conventions.</li>
    <li><span class="font-bold">CSS-in-JS (Styled Components):</span> Great for component isolation, but adds runtime cost.</li>
    <li><span class="font-bold">Utility-First (Tailwind):</span> The modern winner. Fast dev speed, small bundle size, but "ugly" HTML.</li>
  </ul>
  <p class="mt-4 text-xs text-blue-800 dark:text-blue-200 font-bold">
    Verdict: Most new startups choose Tailwind. Most legacy enterprises use BEM/SASS.
  </p>
</div>
`,
  sandbox: {
    html: `<header class="nav">Navbar</header><main class="page"><h1>Printable Article</h1><p>Try printing in your browser: nav should disappear.</p><a href="https://example.com">Reference link</a></main>`,
    css: `:root{--bg:#0b1220;--text:#e6f0ff}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.nav{padding:14px;border-bottom:1px solid rgba(255,255,255,.14)}
.page{max-width:70ch;margin:0 auto;padding:22px 16px 48px}
@media print{
  body{background:#fff;color:#000}
  .nav{display:none}
  a::after{content:" (" attr(href) ")";font-size:11px;color:#333}
}`
  }
};


