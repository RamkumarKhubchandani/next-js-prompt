export const day07 = {
  day: 7,
  title: "Day 7: ARIA Essentials (Rules of Use, Landmarks, Focus, and Labels)",
  intro:
    "ARIA is powerful—and dangerous. Today you’ll learn the rules of ARIA, when to use it, and how to build accessible components without turning your HTML into an ARIA soup.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Problem framing</h3>
<p class="text-light-300 mb-6">
Most ARIA is added to fix problems caused by incorrect HTML. The professional move is to start with correct semantic elements.
ARIA is the supplement—not the base.
</p>

<h3 class="text-xl font-bold text-white mb-4">The 3 rules of ARIA (memorize these)</h3>
<div class="bg-dark-800 border border-dark-600 rounded-2xl p-5 mb-6">
  <ol class="list-decimal list-inside space-y-2 text-light-200">
    <li><span class="text-yellow-400 font-bold">Don’t use ARIA</span> if native HTML can do it.</li>
    <li><span class="text-yellow-400 font-bold">Don’t change native semantics</span> unless absolutely necessary.</li>
    <li><span class="text-yellow-400 font-bold">All ARIA must be correct</span> (wrong ARIA is worse than no ARIA).</li>
  </ol>
</div>

<h3 class="text-xl font-bold text-white mb-4">Accessible naming (what screen readers announce)</h3>
<p class="text-light-300 mb-4">
An element’s accessible name comes from labels, text content, aria-label, aria-labelledby (in that order of “preferability”).
</p>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Prefer visible label text over aria-label.</li>
  <li>Use <code class="bg-dark-900 px-1 rounded">aria-labelledby</code> when you have a visible heading.</li>
  <li>Use <code class="bg-dark-900 px-1 rounded">aria-describedby</code> for hints/errors.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Focus management (no human required)</h3>
<p class="text-light-300 mb-6">
If a UI opens/closes content (like a disclosure), keyboard users need a predictable focus path.
We’ll model a disclosure pattern using <code class="bg-dark-900 px-1 rounded">&lt;details&gt;</code> + <code class="bg-dark-900 px-1 rounded">&lt;summary&gt;</code> (native, accessible).
</p>

<h3 class="text-xl font-bold text-white mb-4">Junior vs Senior</h3>
<p class="text-light-300 mb-6">
Junior: adds roles everywhere. Senior: uses native elements and only adds ARIA when required.
</p>

<h3 class="text-xl font-bold text-white mb-4">Common mistakes</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>role="button" on a div instead of using a button.</li>
  <li>aria-label that contradicts visible text.</li>
  <li>Adding aria-hidden to focusable content (breaks keyboard).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Next steps</h3>
<p class="text-light-300">Tomorrow: SEO-ready HTML—metadata, titles, headings, and link strategy.</p>
`,
  comparison: {
    junior: `<!-- ❌ Junior: ARIA soup -->
<div role="navigation" aria-label="Nav">
  <div role="button" tabindex="0">Open menu</div>
</div>`,
    senior: `<!-- ✅ Senior: native first -->
<nav aria-label="Primary">
  <button type="button">Open menu</button>
</nav>

<!-- Native disclosure -->
<details>
  <summary>Read more</summary>
  <p>Details content…</p>
</details>`,
  },
  checkpoints: [
    {
      prompt: "What is the first rule of ARIA?",
      options: [
        "Always use ARIA for every element",
        "Don’t use ARIA if native HTML can do it",
        "ARIA replaces semantic HTML",
        "ARIA is only for styling",
      ],
      correctIndex: 1,
      explanation:
        "Native HTML provides built-in semantics and keyboard behavior. Prefer it whenever possible.",
    },
    {
      prompt: "Which is usually better: visible label text or aria-label?",
      options: ["aria-label is always better", "Visible labels are preferred", "They are the same", "Neither matters"],
      correctIndex: 1,
      explanation:
        "Visible labels help everyone and produce correct accessible names without hidden metadata drift.",
    },
    {
      prompt: "Which is a good native pattern for disclosure content?",
      options: ["div + role=button", "details/summary", "span + onclick", "table"],
      correctIndex: 1,
      explanation:
        "details/summary provides disclosure semantics and keyboard interaction built-in.",
    },
  ],
  recap: {
    takeaways: [
      "Native HTML first; ARIA is a supplement.",
      "Accessible naming is about real labels and correct associations.",
      "Focus paths must be predictable for keyboard users.",
    ],
    commonMistakes: [
      "ARIA soup to patch broken semantics.",
      "aria-label mismatch with visible text.",
      "Focusable content hidden via aria-hidden.",
    ],
    nextActions: [
      "Replace one div-button with a real button.",
      "Use details/summary for one disclosure UI.",
      "Day 8: SEO-ready HTML structure + metadata.",
    ],
  },
  sandbox: {
    html: `<!-- Day 7 sandbox: ARIA + native patterns -->
<main class="page">
  <h1 class="title">ARIA Essentials</h1>
  <p class="subtitle">Use native HTML first. Add ARIA only when required.</p>

  <nav class="nav" aria-label="Primary">
    <a class="nav__link" href="#a11y" aria-current="page">Accessibility</a>
    <a class="nav__link" href="#seo">SEO</a>
    <button class="btn" type="button" aria-describedby="menu-hint">Open menu</button>
  </nav>
  <p id="menu-hint" class="hint">Hint: in real apps this would open a dialog/menu.</p>

  <section class="panel" aria-labelledby="h-native">
    <h2 id="h-native">Native disclosure</h2>
    <details class="disclosure">
      <summary class="disclosure__summary">What is the #1 ARIA rule?</summary>
      <div class="disclosure__body">
        <p><strong>Don’t use ARIA</strong> if native HTML can do it.</p>
      </div>
    </details>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:980px;margin:0 auto;padding:26px 16px 48px}
.title{margin:0 0 6px}
.subtitle{margin:0 0 14px;color:var(--muted)}
.nav{display:flex;gap:10px;flex-wrap:wrap;align-items:center;border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--r);padding:12px}
.nav__link{text-decoration:none;color:var(--muted);padding:8px 10px;border-radius:10px}
.nav__link[aria-current="page"]{background:rgba(0,255,150,.14);border:1px solid rgba(0,255,150,.35);color:var(--text)}
.nav__link:hover{background:rgba(255,255,255,.06);color:var(--text)}
.btn{border:0;border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:#00120b}
.btn:focus-visible,.nav__link:focus-visible,summary:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
.hint{margin:10px 0 0;color:var(--muted);font-size:13px}
.panel{margin-top:16px;border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:14px}
.disclosure{border:1px solid rgba(230,240,255,.12);border-radius:14px;padding:12px;background:rgba(0,0,0,.12)}
.disclosure__summary{cursor:pointer;font-weight:900}
.disclosure__body{margin-top:10px;color:var(--muted)}
@media (prefers-reduced-motion: reduce){
  *{animation:none!important;transition:none!important}
}`,
  },
};




