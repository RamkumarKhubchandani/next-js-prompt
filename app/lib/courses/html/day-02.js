export const day02 = {
  day: 2,
  title: "Day 2: Links, Buttons, and Navigation That Works (Keyboard + Screen Reader)",
  intro:
    "Today you’ll stop guessing semantics: when it’s a link vs a button, how to build nav that’s tabbable, and how to avoid the classic accessibility traps.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Users get stuck when interactive elements are built with the wrong tags. The rule is simple:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">links navigate</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">buttons act</span>.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">&lt;a&gt;</code> changes URL / location (including in-page anchors).</li>
  <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">&lt;button&gt;</code> performs an action (submit, open menu, toggle theme).</li>
  <li>Use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">aria-current="page"</code> for the active nav item.</li>
  <li>Don’t remove outlines; use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">:focus-visible</code>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Small demo</h3>
<p class="text-gray-600 dark:text-light-300 mb-4">Build a header with navigation and a “toggle theme” button (visual-only in this sandbox).</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided steps</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Tab through the header: focus ring must always be visible.</li>
  <li>Ensure active nav item uses <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">aria-current</code>.</li>
  <li>Confirm the “Toggle theme” is a button, not a link.</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Add a “Skip to main” link that appears on focus.</li>
  <li>Add a secondary nav (footer) with meaningful link text.</li>
  <li>Create a disabled button state that is still readable (contrast).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Common mistakes (with fixes)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> clickable divs. <span class="text-green-300 font-bold">Fix:</span> use real buttons/links.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> removing focus outlines. <span class="text-green-300 font-bold">Fix:</span> style focus, don’t remove it.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> link that submits forms. <span class="text-green-300 font-bold">Fix:</span> use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">button type="submit"</code>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Checkpoints</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-blue-700 dark:text-blue-300 font-bold">Keyboard:</span> Can you navigate all interactive items in order?</li>
  <li><span class="text-blue-700 dark:text-blue-300 font-bold">Semantics:</span> Links navigate; buttons act.</li>
  <li><span class="text-blue-700 dark:text-blue-300 font-bold">A11y:</span> Focus is visible with <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">:focus-visible</code>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
<p class="text-gray-600 dark:text-light-300">Tomorrow: forms that are actually usable (labels, errors, and field grouping).</p>
`,
  checkpoints: [
    {
      prompt: "Which rule is correct?",
      options: [
        "Buttons navigate and links submit forms",
        "Links navigate; buttons perform actions",
        "Divs are best for interactivity because they’re flexible",
        "ARIA roles replace the need for semantic tags",
      ],
      correctIndex: 1,
      explanation:
        "This is the core interaction rule: links change location; buttons trigger actions.",
    },
    {
      prompt: "How do you mark the current page link in navigation?",
      options: [
        "Add a random class name",
        "Use aria-current='page' on the active link",
        "Use inline styles only",
        "Use role='active'",
      ],
      correctIndex: 1,
      explanation:
        "`aria-current='page'` communicates the active state to assistive tech consistently.",
    },
    {
      prompt: "What is the best practice for focus styling?",
      options: [
        "Remove all outlines",
        "Use :focus-visible to show a strong focus ring for keyboard users",
        "Only show focus on inputs, not links",
        "Focus rings are optional",
      ],
      correctIndex: 1,
      explanation:
        "Focus visibility is required for keyboard navigation; :focus-visible avoids visual noise for mouse users.",
    },
  ],
  recap: {
    takeaways: [
      "Links navigate; buttons act.",
      "Use aria-current for active navigation state.",
      "Never remove focus—style it.",
    ],
    commonMistakes: [
      "Clickable divs/spans.",
      "Using placeholders as labels in forms (tomorrow).",
      "Removing focus outlines to ‘look clean’.",
    ],
    nextActions: [
      "Audit one existing UI: replace div-buttons with real buttons.",
      "Add a skip link to a header layout and test with Tab.",
      "Confirm nav items remain readable at WCAG AA contrast.",
    ],
  },
  sandbox: {
    html: `<!-- Day 2: links vs buttons -->
<header class="header">
  <a class="skip" href="#main">Skip to content</a>
  <div class="header__inner">
    <a class="brand" href="/" aria-label="Home">ASIO</a>

    <nav class="nav" aria-label="Primary">
      <a class="nav__link" href="#home" aria-current="page">Home</a>
      <a class="nav__link" href="#docs">Docs</a>
      <a class="nav__link" href="#pricing">Pricing</a>
    </nav>

    <button class="btn btn--ghost" type="button" aria-label="Toggle theme">
      Toggle theme
    </button>
  </div>
</header>

<main id="main" class="main" tabindex="-1">
  <h1>Links vs Buttons</h1>
  <p>Try tabbing through the header. Focus must always be visible.</p>

  <section class="panel">
    <h2>Example actions</h2>
    <div class="actions">
      <a class="btn" href="#docs">Go to Docs (link)</a>
      <button class="btn" type="button">Save changes (button)</button>
      <button class="btn btn--disabled" type="button" disabled>Disabled</button>
    </div>
  </section>
</main>

<footer class="footer">
  <nav aria-label="Footer">
    <a href="#privacy">Privacy policy</a>
    <a href="#terms">Terms of service</a>
  </nav>
</footer>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
a{color:inherit}
.skip{position:absolute;left:-999px;top:10px;background:#fff;color:#000;padding:8px 12px;border-radius:999px}
.skip:focus{left:12px;outline:3px solid var(--brand)}
.header{position:sticky;top:0;background:rgba(0,0,0,.25);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
.header__inner{max-width:1100px;margin:0 auto;padding:14px 16px;display:flex;align-items:center;gap:12px;justify-content:space-between}
.brand{font-weight:900;text-decoration:none;color:var(--brand);letter-spacing:.08em}
.nav{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.nav__link{text-decoration:none;color:var(--muted);padding:8px 10px;border-radius:10px}
.nav__link[aria-current="page"]{background:rgba(0,255,150,.14);color:var(--text);border:1px solid rgba(0,255,150,.35)}
.nav__link:hover{background:rgba(255,255,255,.06);color:var(--text)}
.main{max-width:1100px;margin:0 auto;padding:22px 16px 48px}
.panel{border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:16px}
.actions{display:flex;gap:10px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 14px;border-radius:12px;border:1px solid rgba(0,255,150,.35);background:rgba(0,255,150,.12);color:var(--text);text-decoration:none;font-weight:800}
.btn:hover{background:rgba(0,255,150,.18)}
.btn--ghost{background:rgba(255,255,255,.06);border:1px solid var(--border)}
.btn--ghost:hover{background:rgba(255,255,255,.10)}
.btn--disabled{border-color:rgba(230,240,255,.18);background:rgba(255,255,255,.04);color:rgba(230,240,255,.45);cursor:not-allowed}
.btn:focus-visible,.nav__link:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
.footer{border-top:1px solid var(--border);color:var(--muted)}
.footer nav{max-width:1100px;margin:0 auto;padding:16px;display:flex;gap:12px;flex-wrap:wrap}
.footer a{text-decoration:none;padding:6px 8px;border-radius:10px}
.footer a:hover{background:rgba(255,255,255,.06);color:var(--text)}`,
  },
};


