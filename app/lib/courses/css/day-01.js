export const day01 = {
  day: 1,
  title: "Day 1: Cascade, Specificity, and Inheritance (Stop Fighting CSS)",
  intro:
    "If CSS feels random, it’s because you don’t control the cascade. Today you’ll learn the real rules that decide which styles win—and how to debug them fast.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Problem framing</h3>
<p class="text-light-300 mb-6">
“Why didn’t my style apply?” is the most common CSS question. The answer is always one of:
<span class="text-yellow-400 font-bold">specificity</span>, <span class="text-yellow-400 font-bold">order</span>, or <span class="text-yellow-400 font-bold">inheritance</span>.
</p>

<h3 class="text-xl font-bold text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Order matters</span>: later rules can win when specificity is equal.</li>
  <li><span class="text-yellow-400 font-bold">Specificity</span>: ID &gt; class/attr/pseudo-class &gt; element/pseudo-element.</li>
  <li><span class="text-yellow-400 font-bold">Inheritance</span>: some properties inherit (color, font), some don’t (margin, padding).</li>
  <li><span class="text-yellow-400 font-bold">Avoid</span> <code class="bg-dark-900 px-1 rounded">!important</code> unless you’re overriding third-party CSS.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Guided practice</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
  <li>In DevTools, inspect the “Primary” button and look at “Styles”.</li>
  <li>Notice which selector wins and why.</li>
  <li>Fix the bug by changing the selector strategy (not by adding <code class="bg-dark-900 px-1 rounded">!important</code>).</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">Common mistakes</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Over-specific selectors like <code class="bg-dark-900 px-1 rounded">.page .header .nav a</code>.</li>
  <li>Styling by tag names only (too global).</li>
  <li>Using <code class="bg-dark-900 px-1 rounded">!important</code> to “win” instead of designing selectors.</li>
</ul>
`,
  sandbox: {
    html: `<!-- Day 1: cascade playground -->
<main class="page">
  <h1 class="title">Cascade Lab</h1>
  <p class="subtitle">Inspect the buttons and understand why styles win.</p>

  <section class="panel">
    <h2 class="panel__title">Buttons</h2>
    <div class="row">
      <button class="btn btn--primary" type="button">Primary</button>
      <button class="btn btn--ghost" type="button">Ghost</button>
      <a class="btn btn--link" href="#nowhere">Link styled as button</a>
    </div>
    <p class="hint">
      Task: Make “Primary” actually use the brand background by fixing the selector strategy.
    </p>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:980px;margin:0 auto;padding:26px 16px}
.title{margin:0 0 6px}
.subtitle{margin:0 0 16px;color:var(--muted)}
.panel{border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:16px}
.panel__title{margin:0 0 10px}
.row{display:flex;gap:12px;flex-wrap:wrap}

/* Base button styles */
.btn{
  display:inline-flex;align-items:center;justify-content:center;
  padding:10px 14px;border-radius:12px;border:1px solid var(--border);
  background:rgba(255,255,255,.06);color:var(--text);
  font-weight:900;text-decoration:none;
}
.btn:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}

/* Intent variants */
.btn--primary{ background: rgba(0,255,150,.14); border-color: rgba(0,255,150,.35); }
.btn--ghost{ background: rgba(0,0,0,.20); }
.btn--link{ background: transparent; border-color: transparent; color: var(--brand); }

/* BUGGY RULE: higher specificity overrides .btn--primary by accident */
.panel .btn{ background: rgba(59,130,246,.14); border-color: rgba(59,130,246,.35); }

/* Fix idea: don't style .panel .btn globally; style the panel itself or use a lower-specificity token */
.hint{margin:12px 0 0;color:var(--muted)}`,
  },
};


