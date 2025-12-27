export const day00 = {
  day: 0,
  title: "Day 0: Pro CSS Setup + The Layering Mindset (Tokens → Layout → Components)",
  intro:
    "CSS becomes easy when you stop writing random styles and start building a system: tokens, layout rules, then components. Today you’ll set the foundation.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
CSS feels “hard” when everything is global and accidental. Professionals treat CSS like an architecture: predictable layers and reusable tokens.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Design tokens</span>: colors, spacing, radii, type scale via CSS variables.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mobile-first</span>: base styles for small screens, enhance for larger.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Focus</span>: never remove outlines; style <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">:focus-visible</code>.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Reduced motion</span>: respect user preference.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided steps</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Tweak the token <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">--brand</code> and watch UI update.</li>
  <li>Change the spacing token and verify consistent spacing changes.</li>
  <li>Enable <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">prefers-reduced-motion</code> (browser devtools) and confirm animations stop.</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Checkpoints</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>All colors/spacing come from tokens (no random hex in component rules).</li>
  <li>Focus styles are visible.</li>
  <li>Reduced motion is respected.</li>
</ul>
`,
  sandbox: {
    html: `<!-- Day 0 CSS system -->
<main class="page">
  <header class="hero">
    <p class="hero__tag">CSS System</p>
    <h1 class="hero__title">Tokens → Layout → Components</h1>
    <p class="hero__subtitle">Change tokens to theme the entire UI consistently.</p>
    <div class="hero__actions">
      <button class="btn" type="button">Primary</button>
      <button class="btn btn--ghost" type="button">Secondary</button>
    </div>
  </header>

  <section class="grid">
    <article class="card">
      <h2 class="card__title">Card component</h2>
      <p class="card__body">Uses tokens for spacing, radius, and border.</p>
      <a class="link" href="#learn">Learn more →</a>
    </article>
    <article class="card">
      <h2 class="card__title">Consistency</h2>
      <p class="card__body">Swap the brand token to reskin everything.</p>
      <a class="link" href="#tokens">View tokens →</a>
    </article>
  </section>
</main>`,
    css: `/* Day 0: tokens + minimal component system */
:root{
  --bg:#0b1220;
  --panel:#111a2c;
  --text:#e6f0ff;
  --muted:rgba(230,240,255,.72);
  --brand:#00ff96;
  --border:rgba(230,240,255,.14);
  --radius:16px;
  --space-2:8px;
  --space-3:12px;
  --space-4:16px;
  --space-6:24px;
  --shadow: 0 12px 40px rgba(0,0,0,.35);
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text)}
.page{max-width:1100px;margin:0 auto;padding:26px 16px 44px}
.hero{padding:18px;border:1px solid var(--border);background:linear-gradient(135deg, rgba(0,255,150,.10), transparent 40%), var(--panel);border-radius:var(--radius);box-shadow:var(--shadow)}
.hero__tag{display:inline-block;margin:0 0 var(--space-3);padding:6px 10px;border-radius:999px;border:1px solid rgba(0,255,150,.35);background:rgba(0,255,150,.12);color:var(--brand);font-weight:900;font-size:12px;letter-spacing:.14em;text-transform:uppercase}
.hero__title{margin:0 0 var(--space-2);font-size:34px}
.hero__subtitle{margin:0 0 var(--space-4);color:var(--muted)}
.hero__actions{display:flex;gap:var(--space-3);flex-wrap:wrap}
.btn{border:0;border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:#00120b}
.btn--ghost{background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--text)}
.btn:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
.grid{display:grid;grid-template-columns:1fr;gap:var(--space-4);margin-top:var(--space-6)}
.card{border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--radius);padding:var(--space-4)}
.card__title{margin:0 0 var(--space-2)}
.card__body{margin:0 0 var(--space-3);color:var(--muted)}
.link{color:var(--brand);text-decoration:none;font-weight:800}
.link:hover{text-decoration:underline}
@media (min-width: 900px){
  .grid{grid-template-columns:repeat(2, 1fr)}
}
@media (prefers-reduced-motion: no-preference){
  .card{transition: transform .18s ease, border-color .18s ease}
  .card:hover{transform: translateY(-2px);border-color: rgba(0,255,150,.35)}
}
@media (prefers-reduced-motion: reduce){
  *{transition:none!important;animation:none!important}
}`,
  },
};


