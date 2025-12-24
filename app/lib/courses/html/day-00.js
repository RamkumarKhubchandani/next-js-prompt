export const day00 = {
  day: 0,
  title: "Day 0: Pro Setup + How to Learn HTML Like an Engineer",
  intro:
    "You don’t need a human teacher—you need a system. Today you’ll build a repeatable workflow: inspect → change → verify → explain, using semantic HTML as your foundation.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 Outcomes (What “Done” Looks Like)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">A testing loop</span>: <code class="bg-dark-900 px-1 rounded">Inspect → Change → Verify → Explain</code>.</li>
  <li><span class="text-yellow-400 font-bold">A semantic baseline</span>: header / main / footer, headings in order, meaningful links.</li>
  <li><span class="text-yellow-400 font-bold">A11y instincts</span>: label the UI, don’t “div soup” it.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Why semantics matters (the professional reason)</h3>
<p class="text-light-300 mb-4">
Semantic HTML is not “nice to have”. It’s the contract for <span class="text-yellow-400 font-bold">accessibility</span>, <span class="text-yellow-400 font-bold">SEO</span>, and
future maintainability. When your HTML is right, your CSS becomes easier.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Micro-example: div soup vs. semantics</h3>
<div class="grid md:grid-cols-2 gap-6 mb-6">
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600">
    <p class="text-sm font-bold text-red-300 mb-2">❌ Div soup</p>
    <pre class="text-xs text-light-200 overflow-x-auto"><code>&lt;div class="top"&gt;
  &lt;div class="nav"&gt;...&lt;/div&gt;
&lt;/div&gt;
&lt;div class="content"&gt;...&lt;/div&gt;</code></pre>
  </div>
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600">
    <p class="text-sm font-bold text-green-300 mb-2">✅ Semantic layout</p>
    <pre class="text-xs text-light-200 overflow-x-auto"><code>&lt;header&gt;...&lt;/header&gt;
&lt;main&gt;...&lt;/main&gt;
&lt;footer&gt;...&lt;/footer&gt;</code></pre>
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Guided practice</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
  <li>Open DevTools → Elements → verify landmarks exist.</li>
  <li>Change the heading structure to be logical (H1 once, then H2/H3).</li>
  <li>Ensure links have meaningful text (no “click here”).</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">Common mistakes (and fixes)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Mistake:</span> multiple H1s. <span class="text-green-300 font-bold">Fix:</span> one H1 per page section; use H2/H3 for subsections.</li>
  <li><span class="text-yellow-400 font-bold">Mistake:</span> using <code class="bg-dark-900 px-1 rounded">div</code> for buttons. <span class="text-green-300 font-bold">Fix:</span> use <code class="bg-dark-900 px-1 rounded">button</code>.</li>
  <li><span class="text-yellow-400 font-bold">Mistake:</span> generic link text. <span class="text-green-300 font-bold">Fix:</span> descriptive link labels.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Checkpoints (auto-check)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-blue-300 font-bold">Visual:</span> Does the page have a clear header, main content, and footer?</li>
  <li><span class="text-blue-300 font-bold">DevTools:</span> Can you find <code class="bg-dark-900 px-1 rounded">&lt;header&gt;</code>, <code class="bg-dark-900 px-1 rounded">&lt;main&gt;</code>, <code class="bg-dark-900 px-1 rounded">&lt;footer&gt;</code>?</li>
  <li><span class="text-blue-300 font-bold">Keyboard:</span> Can you Tab to the CTA button and see a visible focus ring?</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Summary</h3>
<p class="text-light-300 mb-6">
You learned the professional learning loop and why semantic HTML is the base layer of every good UI system.
</p>

<h3 class="text-xl font-bold text-white mb-4">Next steps</h3>
<p class="text-light-300">
Tomorrow you’ll build a correct document skeleton and accessible navigation.
</p>
`,
  checkpoints: [
    {
      prompt: "Which statement is the most professional definition of semantic HTML?",
      options: [
        "It means using as many divs as possible with good class names",
        "It means choosing elements that describe meaning/role (header, nav, main, button) so browsers and assistive tech understand the UI",
        "It means adding ARIA roles everywhere",
        "It means using IDs instead of classes",
      ],
      correctIndex: 1,
      explanation:
        "Semantic HTML encodes meaning and roles using the correct elements. ARIA is a supplement, not a replacement.",
    },
    {
      prompt: "What is the correct purpose of a skip link?",
      options: [
        "To improve page speed",
        "To let keyboard users jump past repeated navigation directly to the main content",
        "To hide content from screen readers",
        "To make the header sticky",
      ],
      correctIndex: 1,
      explanation:
        "Skip links reduce keyboard fatigue and improve accessibility by jumping to the main landmark.",
    },
    {
      prompt: "Which is the correct choice for a UI element that triggers an action (not navigation)?",
      options: ["<a>", "<div>", "<button>", "<span>"],
      correctIndex: 2,
      explanation:
        "Buttons are for actions. Links are for navigation. Div/span are not interactive elements by default.",
    },
  ],
  recap: {
    takeaways: [
      "HTML is a structure contract: semantics unlock accessibility + maintainability.",
      "Use the loop: Inspect → Change → Verify → Explain.",
      "Start with correct elements first; style second.",
    ],
    commonMistakes: [
      "Using divs for interactive controls.",
      "Multiple H1s without a reasoned document outline.",
      "Removing focus outlines instead of styling focus.",
    ],
    nextActions: [
      "Open DevTools and identify header/nav/main/footer landmarks.",
      "Tab through the page and confirm visible focus states.",
      "Write one sentence explaining why semantic tags matter for a11y.",
    ],
  },
  sandbox: {
    html: `<!-- Day 0 starter: semantic layout skeleton -->
<header class="site-header" role="banner">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="site-header__inner">
    <a class="site-header__brand" href="/" aria-label="Home">
      ASIO
    </a>
    <nav class="site-nav" aria-label="Primary">
      <a class="site-nav__link" href="#features">Features</a>
      <a class="site-nav__link" href="#pricing">Pricing</a>
      <a class="site-nav__link" href="#contact">Contact</a>
    </nav>
  </div>
</header>

<main id="main" class="page" tabindex="-1">
  <h1 class="page__title">Semantic HTML Baseline</h1>
  <p class="page__subtitle">
    This page exists to practice the loop: Inspect → Change → Verify → Explain.
  </p>

  <section class="card" aria-labelledby="cta-title">
    <h2 id="cta-title" class="card__title">Your first professional habit</h2>
    <p class="card__body">Start with semantics. CSS is the second layer.</p>
    <button class="btn" type="button">Start practice</button>
  </section>
</main>

<footer class="site-footer">
  <p class="site-footer__text">© 2025 ASIO. All rights reserved.</p>
</footer>`,
    css: `/* Day 0: minimal accessible styling */
:root{
  --bg: #0b1220;
  --panel: #111a2c;
  --text: #e6f0ff;
  --muted: rgba(230,240,255,.72);
  --brand: #00ff96;
  --border: rgba(230,240,255,.14);
  --radius: 16px;
}

*{ box-sizing: border-box; }
body{ background: var(--bg); color: var(--text); }

.skip-link{
  position: absolute; left: -999px; top: 8px;
  background: #fff; color: #000; padding: 8px 12px; border-radius: 10px;
}
.skip-link:focus{ left: 12px; z-index: 10; outline: 3px solid var(--brand); }

.site-header{ position: sticky; top: 0; background: rgba(0,0,0,.25); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); }
.site-header__inner{ max-width: 980px; margin: 0 auto; padding: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.site-header__brand{ font-weight: 900; text-decoration: none; color: var(--brand); letter-spacing: .08em; }
.site-nav{ display: flex; gap: 12px; }
.site-nav__link{ color: var(--muted); text-decoration: none; padding: 8px 10px; border-radius: 10px; }
.site-nav__link:hover{ background: rgba(255,255,255,.06); color: var(--text); }

.page{ max-width: 980px; margin: 0 auto; padding: 28px 16px 48px; }
.page__title{ margin: 0 0 6px; }
.page__subtitle{ margin: 0 0 22px; color: var(--muted); }

.card{ border: 1px solid var(--border); background: var(--panel); padding: 18px; border-radius: var(--radius); }
.card__title{ margin: 0 0 8px; }
.card__body{ margin: 0 0 14px; color: var(--muted); }

.btn{
  background: var(--brand); color: #00120b;
  border: 0; border-radius: 12px; padding: 10px 14px; font-weight: 800;
}
.btn:focus-visible{ outline: 3px solid rgba(0,255,150,.5); outline-offset: 3px; }

.site-footer{ border-top: 1px solid var(--border); color: var(--muted); }
.site-footer__text{ max-width: 980px; margin: 0 auto; padding: 18px 16px; }`,
  },
};


