export const day01 = {
  day: 1,
  title: "Day 1: Document Structure, Headings, and Landmarks (A11y + SEO)",
  intro:
    "Today you’ll learn how browsers, screen readers, and search engines understand your page: correct document structure, headings hierarchy, and landmarks that make navigation effortless.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Most “broken” UIs aren’t broken visually — they’re broken structurally. When headings and landmarks are wrong, users using assistive tech get lost,
and SEO signals become noisy.
</p>

<div class="mb-8 p-5 rounded-xl border border-blue-500/30 bg-blue-500/5">
  <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note: Semantics = Revenue
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    Why do we care about <code>&lt;h1&gt;</code> vs <code>&lt;div&gt;</code>?
  </p>
  <ul class="list-disc list-inside text-sm text-gray-700 dark:text-light-200 space-y-2">
    <li><span class="font-bold">SEO:</span> Google ranks pages higher when they understand the structure. Higher rank = more traffic = more money.</li>
    <li><span class="font-bold">Accessibility (A11y):</span> If your site isn't accessible, you can be sued (ADA compliance). Domino's Pizza lost a lawsuit because their website wasn't accessible.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">One H1</span>: the page topic.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">H2/H3</span>: sections/subsections (in order).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Landmarks</span>: header, nav, main, footer (and optional aside).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Skip link</span>: keyboard users jump past navigation.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Small demo</h3>
<p class="text-gray-600 dark:text-light-300 mb-4">
You’ll build a mini “documentation” page with correct headings and landmarks.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided steps</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Tab from the top: skip link should appear and move focus into main.</li>
  <li>Inspect headings in DevTools: verify order is H1 → H2 → H3.</li>
  <li>Confirm only one <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">&lt;main&gt;</code> exists.</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Add an <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">&lt;aside&gt;</code> with “On this page” links (use meaningful link text).</li>
  <li>Add a second section and keep the heading order correct.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Common mistakes (with fixes)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> skipping levels (H1 → H3). <span class="text-green-300 font-bold">Fix:</span> don’t jump levels.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> multiple mains. <span class="text-green-300 font-bold">Fix:</span> exactly one main landmark.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> “Read more” links everywhere. <span class="text-green-300 font-bold">Fix:</span> descriptive link text.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Checkpoints</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-blue-700 dark:text-blue-300 font-bold">Keyboard:</span> skip link appears on focus and works.</li>
  <li><span class="text-blue-700 dark:text-blue-300 font-bold">Structure:</span> one H1, headings in order, one main.</li>
  <li><span class="text-blue-700 dark:text-blue-300 font-bold">SEO-ready:</span> title/meta description present in head (see code).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Summary + next steps</h3>
<p class="text-gray-600 dark:text-light-300">
You built a structurally correct page. Tomorrow: links, buttons, and accessible navigation patterns.
</p>
`,
  checkpoints: [
    {
      prompt: "Which heading pattern is the most correct for a typical page?",
      options: [
        "H1 everywhere because it's bigger",
        "Multiple H1s for each section because sections are important",
        "One H1 for the page topic, then H2 for sections, H3 for subsections",
        "Skip headings and use divs with bold text",
      ],
      correctIndex: 2,
      explanation:
        "Headings are a document outline. One H1 for the page, then nested H2/H3 for structure.",
    },
    {
      prompt: "How many <main> landmarks should a page have?",
      options: ["0", "1", "2", "As many as needed"],
      correctIndex: 1,
      explanation:
        "A page should have exactly one main landmark for the primary content.",
    },
    {
      prompt: "What is the primary value of semantic landmarks for users?",
      options: [
        "They make CSS easier to write",
        "They let assistive tech provide fast navigation by regions",
        "They reduce JavaScript bundle size",
        "They make fonts load faster",
      ],
      correctIndex: 1,
      explanation:
        "Screen readers can jump by landmarks (header/nav/main/footer), improving usability dramatically.",
    },
  ],
  recap: {
    takeaways: [
      "Landmarks create navigable regions; headings create a readable outline.",
      "SEO and accessibility often align when structure is correct.",
      "Use skip links + one main landmark for keyboard users.",
    ],
    commonMistakes: [
      "Skipping heading levels (H1 → H3).",
      "Multiple main elements.",
      "Generic link text like “Read more”.",
    ],
    nextActions: [
      "Add a new section and keep heading order correct.",
      "Add an aside table of contents and test with keyboard.",
      "Verify landmarks in DevTools Elements panel.",
    ],
  },
  sandbox: {
    html: `<!doctype html>
<!-- Day 1: a clean document structure -->
<header class="doc-header" role="banner">
  <a class="skip" href="#main">Skip to content</a>
  <div class="doc-header__inner">
    <a class="doc-header__brand" href="/">Docs</a>
    <nav class="doc-nav" aria-label="Primary">
      <a class="doc-nav__link" href="#overview">Overview</a>
      <a class="doc-nav__link" href="#api">API</a>
      <a class="doc-nav__link" href="#faq">FAQ</a>
    </nav>
  </div>
</header>

<div class="layout">
  <aside class="toc" aria-label="On this page">
    <p class="toc__title">On this page</p>
    <a class="toc__link" href="#overview">Overview</a>
    <a class="toc__link" href="#api">API</a>
    <a class="toc__link" href="#faq">FAQ</a>
  </aside>

  <main id="main" class="doc" tabindex="-1">
    <h1 class="doc__title">Document Structure</h1>
    <p class="doc__lead">Headings + landmarks make navigation predictable.</p>

    <section id="overview" class="doc__section" aria-labelledby="h-overview">
      <h2 id="h-overview">Overview</h2>
      <p>One H1 for the page, then H2/H3 for sections and subsections.</p>
      <h3>Key idea</h3>
      <p>Semantics are the base layer. Styling comes second.</p>
    </section>

    <section id="api" class="doc__section" aria-labelledby="h-api">
      <h2 id="h-api">API</h2>
      <p>Use a single main landmark. Use nav for navigation blocks.</p>
    </section>

    <section id="faq" class="doc__section" aria-labelledby="h-faq">
      <h2 id="h-faq">FAQ</h2>
      <p>Write meaningful links and keep headings ordered.</p>
    </section>
  </main>
</div>

<footer class="doc-footer">
  <p class="doc-footer__text">Made to be navigable without a mouse.</p>
</footer>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text)}
a{color:inherit}
.skip{position:absolute;left:-999px;top:10px;background:#fff;color:#000;padding:8px 12px;border-radius:999px}
.skip:focus{left:12px;outline:3px solid var(--brand)}
.doc-header{position:sticky;top:0;background:rgba(0,0,0,.25);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
.doc-header__inner{max-width:1100px;margin:0 auto;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.doc-header__brand{font-weight:900;text-decoration:none;color:var(--brand);letter-spacing:.06em}
.doc-nav{display:flex;gap:10px}
.doc-nav__link{text-decoration:none;color:var(--muted);padding:8px 10px;border-radius:10px}
.doc-nav__link:hover{background:rgba(255,255,255,.06);color:var(--text)}
.layout{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:240px 1fr;gap:14px;padding:18px 16px 44px}
.toc{border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:14px;position:sticky;top:90px;height:fit-content}
.toc__title{margin:0 0 10px;font-weight:800;color:var(--muted);font-size:12px;letter-spacing:.16em;text-transform:uppercase}
.toc__link{display:block;text-decoration:none;color:var(--muted);padding:8px 10px;border-radius:10px}
.toc__link:hover{background:rgba(255,255,255,.06);color:var(--text)}
.doc{border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:18px}
.doc__title{margin:0 0 6px}
.doc__lead{margin:0 0 18px;color:var(--muted)}
.doc__section{padding:14px 0;border-top:1px solid rgba(230,240,255,.10)}
.doc__section:first-of-type{border-top:0}
.doc-footer{border-top:1px solid var(--border);color:var(--muted)}
.doc-footer__text{max-width:1100px;margin:0 auto;padding:16px}
@media (max-width: 900px){
  .layout{grid-template-columns:1fr}
  .toc{position:static}
}`,
  },
};


