export const day03 = {
  day: 3,
  title: "Day 3: Flexbox Layout (Navbars, Cards, and Real UI Alignment)",
  intro:
    "Flexbox is your daily driver for UI alignment. Today you’ll build a responsive navbar + card row with correct wrapping, spacing, and alignment.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Problem framing</h3>
<p class="text-light-300 mb-6">
Most “layout bugs” come from misusing width/margins instead of using flex rules. Flexbox solves alignment and spacing—when you use it intentionally.
</p>

<h3 class="text-xl font-bold text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><code class="bg-dark-900 px-1 rounded">display: flex</code>: one-dimensional layout.</li>
  <li><code class="bg-dark-900 px-1 rounded">gap</code>: spacing between items (prefer over margins).</li>
  <li><code class="bg-dark-900 px-1 rounded">justify-content</code> vs <code class="bg-dark-900 px-1 rounded">align-items</code>.</li>
  <li><code class="bg-dark-900 px-1 rounded">flex: 1</code> and <code class="bg-dark-900 px-1 rounded">min-width: 0</code> for truncation.</li>
  <li>Wrapping: <code class="bg-dark-900 px-1 rounded">flex-wrap</code> + responsive patterns.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Make the navbar wrap nicely on small screens.</li>
  <li>Ensure cards are equal height and don’t overflow.</li>
  <li>Add an RTL demo: set <code class="bg-dark-900 px-1 rounded">dir="rtl"</code> on <code class="bg-dark-900 px-1 rounded">&lt;html&gt;</code> and verify layout still works.</li>
</ul>
`,
  sandbox: {
    html: `<!-- Day 3: Flexbox UI -->
<header class="topbar">
  <div class="topbar__inner">
    <a class="brand" href="#">ASIO</a>
    <nav class="nav" aria-label="Primary">
      <a class="nav__link" href="#features">Features</a>
      <a class="nav__link" href="#pricing">Pricing</a>
      <a class="nav__link" href="#docs">Docs</a>
      <a class="nav__link" href="#support">Support</a>
    </nav>
    <div class="actions">
      <button class="btn btn--ghost" type="button">Sign in</button>
      <button class="btn" type="button">Start</button>
    </div>
  </div>
</header>

<main class="page">
  <h1 class="title">Flexbox Layout</h1>
  <p class="subtitle">Build navbars + card rows with predictable alignment.</p>

  <section class="cards" aria-label="Feature cards">
    <article class="card">
      <h2 class="card__title">Alignment</h2>
      <p class="card__body">Use flex + gap for spacing, not random margins.</p>
      <a class="link" href="#learn">Learn →</a>
    </article>
    <article class="card">
      <h2 class="card__title">Wrapping</h2>
      <p class="card__body">Make layouts adapt without breaking the UI.</p>
      <a class="link" href="#wrap">Learn →</a>
    </article>
    <article class="card">
      <h2 class="card__title">Real UI</h2>
      <p class="card__body">Nav + cards are 80% of product screens.</p>
      <a class="link" href="#ui">Learn →</a>
    </article>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
a{color:inherit}

.topbar{position:sticky;top:0;background:rgba(0,0,0,.25);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
.topbar__inner{
  max-width:1100px;margin:0 auto;padding:14px 16px;
  display:flex;align-items:center;gap:12px;
}
.brand{font-weight:900;color:var(--brand);text-decoration:none;letter-spacing:.08em}
.nav{
  display:flex;gap:8px;flex-wrap:wrap;
  margin-inline: auto; /* logical: center nav between brand and actions (works in RTL) */
}
.nav__link{
  text-decoration:none;color:var(--muted);
  padding:8px 10px;border-radius:10px;
}
.nav__link:hover{background:rgba(255,255,255,.06);color:var(--text)}
.actions{display:flex;gap:10px;flex-wrap:wrap}
.btn{border:0;border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:#00120b}
.btn--ghost{background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--text)}
.btn:focus-visible,.nav__link:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}

.page{max-width:1100px;margin:0 auto;padding:22px 16px 48px}
.title{margin:0 0 6px}
.subtitle{margin:0 0 16px;color:var(--muted)}

.cards{
  display:flex;
  gap:16px;
  flex-wrap:wrap;
  align-items:stretch;
}
.card{
  flex: 1 1 260px; /* grow + wrap */
  min-width: 0; /* allow text truncation if needed */
  border:1px solid var(--border);
  background:rgba(0,0,0,.18);
  border-radius:var(--r);
  padding:16px;
  display:flex;
  flex-direction:column;
}
.card__title{margin:0 0 8px}
.card__body{margin:0 0 14px;color:var(--muted);flex:1}
.link{color:var(--brand);text-decoration:none;font-weight:900}
.link:hover{text-decoration:underline}
`,
  },
};


