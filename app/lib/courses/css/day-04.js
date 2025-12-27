export const day04 = {
  day: 4,
  title: "Day 4: Typography Systems (Scale, Line Length, font-display)",
  intro:
    "You’ll build readable UI: a type scale, comfortable line length, and safe font loading patterns (with `font-display: swap`).",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">Typography is UI. If text is hard to read, everything feels low quality—even with perfect layout.</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Use a consistent <span class="text-yellow-600 dark:text-yellow-400 font-bold">type scale</span> (base + headings).</li>
  <li>Keep line length ~<span class="text-yellow-600 dark:text-yellow-400 font-bold">45–75 characters</span>.</li>
  <li>Use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">clamp()</code> for responsive font sizes.</li>
  <li>Font loading: in real apps use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">font-display: swap</code>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Adjust the base size and verify headings scale consistently.</li>
  <li>Change max line length and feel the readability difference.</li>
  <li>Add a “muted” text style that still passes contrast.</li>
</ul>
`,
  sandbox: {
    html: `<!-- Day 4: typography system -->
<main class="page">
  <article class="article">
    <header class="article__header">
      <p class="eyebrow">Typography System</p>
      <h1 class="h1">Readable UI by Design</h1>
      <p class="lead">A type scale, line length, and spacing rhythm make everything feel premium.</p>
    </header>

    <h2 class="h2">Section heading</h2>
    <p class="body">
      This paragraph demonstrates a comfortable reading width. Your goal is to make text effortless to scan and read.
    </p>
    <h3 class="h3">Subheading</h3>
    <p class="body muted">
      Muted text should still be readable (contrast). Use tokens instead of random opacity.
    </p>
  </article>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
  --measure: 68ch; /* ideal line length */
  --step--1: clamp(0.92rem, 0.86rem + 0.3vw, 1.00rem);
  --step-0:  clamp(1.00rem, 0.92rem + 0.4vw, 1.12rem);
  --step-1:  clamp(1.20rem, 1.02rem + 0.9vw, 1.50rem);
  --step-2:  clamp(1.55rem, 1.18rem + 1.6vw, 2.05rem);
  --step-3:  clamp(2.00rem, 1.35rem + 2.6vw, 2.70rem);
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui;line-height:1.5}
.page{max-width:1100px;margin:0 auto;padding:26px 16px 48px}
.article{max-width:var(--measure);border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:18px}
.eyebrow{margin:0 0 10px;color:var(--brand);font-weight:900;letter-spacing:.14em;text-transform:uppercase;font-size:var(--step--1)}
.h1{margin:0 0 10px;font-size:var(--step-3);line-height:1.1}
.lead{margin:0 0 16px;color:var(--muted);font-size:var(--step-1)}
.h2{margin:18px 0 8px;font-size:var(--step-2)}
.h3{margin:14px 0 6px;font-size:var(--step-1)}
.body{margin:0 0 10px;font-size:var(--step-0);color:var(--text)}
.muted{color:var(--muted)}
`,
  },
};


