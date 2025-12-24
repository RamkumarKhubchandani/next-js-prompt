export const day09 = {
  day: 9,
  title: "Day 9: Component Thinking in HTML (BEM, Reusable Card/List Patterns)",
  intro:
    "Today you’ll learn the HTML side of component systems: predictable structure, BEM naming, and patterns you can reuse without rewriting CSS for every screen.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Problem framing</h3>
<p class="text-light-300 mb-6">
Most teams fail at “design systems” because their HTML is inconsistent. If every card has a different structure, your CSS becomes a patchwork.
We fix that by designing components as repeatable <span class="text-yellow-400 font-bold">structures</span>.
</p>

<h3 class="text-xl font-bold text-white mb-4">The BEM rules (simple version)</h3>
<div class="bg-dark-800 border border-dark-600 rounded-2xl p-5 mb-6">
  <ul class="list-disc list-inside space-y-2 text-light-300">
    <li><span class="text-yellow-400 font-bold">Block</span>: <code class="bg-dark-900 px-1 rounded">card</code></li>
    <li><span class="text-yellow-400 font-bold">Element</span>: <code class="bg-dark-900 px-1 rounded">card__title</code>, <code class="bg-dark-900 px-1 rounded">card__meta</code></li>
    <li><span class="text-yellow-400 font-bold">Modifier</span>: <code class="bg-dark-900 px-1 rounded">card--featured</code>, <code class="bg-dark-900 px-1 rounded">badge--pro</code></li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">Guided practice</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
  <li>Ensure every card uses the same DOM shape: header → body → actions.</li>
  <li>Convert “special” styling into modifiers (e.g. <code class="bg-dark-900 px-1 rounded">card--featured</code>).</li>
  <li>Make list items consistent: same order and same label/value pattern.</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">Junior vs Senior</h3>
<p class="text-light-300 mb-6">
Junior: copies HTML and tweaks it per page. Senior: designs a reusable component structure and composes it everywhere.
</p>

<h3 class="text-xl font-bold text-white mb-4">Common mistakes</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>BEM names that encode layout (e.g. <code class="bg-dark-900 px-1 rounded">card__left</code>) instead of meaning.</li>
  <li>Modifiers used as separate blocks (e.g. <code class="bg-dark-900 px-1 rounded">featured-card</code>).</li>
  <li>Inconsistent nesting: titles sometimes inside links, sometimes not.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Next steps</h3>
<p class="text-light-300">Tomorrow: internationalization basics—RTL and logical properties mindset (HTML layer).</p>
`,
  comparison: {
    junior: `<!-- ❌ Junior: inconsistent structure -->
<div class="card"><div class="t">Title</div><div>Body</div></div>
<div class="card"><h3>Title</h3><p>Body</p><div class="actions">...</div></div>`,
    senior: `<!-- ✅ Senior: consistent component -->
<article class="card card--featured">
  <header class="card__header">
    <h3 class="card__title">Title</h3>
    <span class="badge badge--pro">Pro</span>
  </header>
  <p class="card__body">Body text…</p>
  <div class="card__actions">
    <a class="btn" href="/path/react">Open</a>
  </div>
</article>`,
  },
  checkpoints: [
    {
      prompt: "In BEM, what does a modifier represent?",
      options: [
        "A child element inside the block",
        "A variant/state of a block or element (featured, disabled, compact)",
        "A separate component entirely",
        "A CSS variable name",
      ],
      correctIndex: 1,
      explanation:
        "Modifiers represent variants or states. Keep the base structure consistent.",
    },
    {
      prompt: "Which naming is most aligned with BEM meaning-first approach?",
      options: ["card__left", "card__title", "card__grid", "card__col2"],
      correctIndex: 1,
      explanation:
        "Element names should describe meaning/role in the component, not layout position.",
    },
    {
      prompt: "Why is consistent DOM structure important for components?",
      options: [
        "It reduces HTML file size only",
        "It makes CSS and testing predictable and reusable",
        "It increases specificity so rules always win",
        "It prevents the browser from rendering",
      ],
      correctIndex: 1,
      explanation:
        "Consistency enables reuse: same CSS, same behaviors, less debugging.",
    },
  ],
  recap: {
    takeaways: [
      "Design components as consistent structures, not copy/paste variations.",
      "Use BEM to name meaningfully and encode variants with modifiers.",
      "Predictable HTML makes predictable CSS.",
    ],
    commonMistakes: [
      "Layout-encoded class names.",
      "Inconsistent nesting and ordering within components.",
      "Variants implemented as separate unrelated blocks.",
    ],
    nextActions: [
      "Refactor 2 cards to share the same DOM shape.",
      "Convert one special-case style into a modifier class.",
      "Day 10: RTL + neutral content strategy (HTML layer).",
    ],
  },
  sandbox: {
    html: `<!-- Day 9 sandbox: component patterns -->
<main class="page">
  <h1 class="title">Component Patterns</h1>
  <p class="subtitle">Build reusable cards with BEM naming.</p>

  <section class="grid" aria-label="Course cards">
    <article class="card card--featured" aria-labelledby="c-react">
      <header class="card__header">
        <h2 id="c-react" class="card__title">React Mastery</h2>
        <span class="badge badge--pro">Pro</span>
      </header>
      <p class="card__body">React 19, Suspense, patterns, and real-world refactors.</p>
      <ul class="meta">
        <li class="meta__item"><span class="meta__k">Days</span><span class="meta__v">32</span></li>
        <li class="meta__item"><span class="meta__k">Level</span><span class="meta__v">Advanced</span></li>
      </ul>
      <div class="card__actions">
        <a class="btn" href="#open-react">Open course</a>
        <a class="btn btn--ghost" href="#details-react">Details</a>
      </div>
    </article>

    <article class="card" aria-labelledby="c-html">
      <header class="card__header">
        <h2 id="c-html" class="card__title">Semantic HTML Pro</h2>
        <span class="badge">Foundation</span>
      </header>
      <p class="card__body">Structure, forms, media, tables, and accessibility essentials.</p>
      <ul class="meta">
        <li class="meta__item"><span class="meta__k">Days</span><span class="meta__v">14</span></li>
        <li class="meta__item"><span class="meta__k">Level</span><span class="meta__v">Core</span></li>
      </ul>
      <div class="card__actions">
        <a class="btn" href="#open-html">Open course</a>
        <a class="btn btn--ghost" href="#details-html">Details</a>
      </div>
    </article>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:18px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
a{color:inherit}
.page{max-width:1100px;margin:0 auto;padding:26px 16px 48px}
.title{margin:0 0 6px}
.subtitle{margin:0 0 16px;color:var(--muted)}
.grid{display:grid;grid-template-columns:1fr;gap:16px}
.card{border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--r);padding:16px}
.card--featured{background:linear-gradient(135deg, rgba(0,255,150,.10), transparent 55%), rgba(0,0,0,.18);border-color:rgba(0,255,150,.30)}
.card__header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.card__title{margin:0;font-size:20px}
.badge{display:inline-flex;align-items:center;justify-content:center;padding:6px 10px;border-radius:999px;border:1px solid rgba(230,240,255,.16);background:rgba(255,255,255,.06);color:var(--muted);font-weight:900;font-size:12px}
.badge--pro{border-color:rgba(0,255,150,.35);background:rgba(0,255,150,.12);color:var(--brand)}
.card__body{margin:10px 0 12px;color:var(--muted)}
.meta{margin:0 0 14px;padding-left:0;list-style:none;display:grid;gap:8px}
.meta__item{display:flex;justify-content:space-between;gap:12px;border:1px solid rgba(230,240,255,.10);border-radius:14px;padding:10px 12px;background:rgba(0,0,0,.10)}
.meta__k{color:var(--muted);font-weight:800}
.meta__v{font-weight:900}
.card__actions{display:flex;gap:10px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:12px;background:var(--brand);color:#00120b;text-decoration:none;font-weight:900}
.btn--ghost{background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--text)}
.btn:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
@media (min-width: 900px){.grid{grid-template-columns:repeat(2, minmax(0, 1fr))}}`,
  },
};




