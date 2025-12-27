export const day12 = {
  day: 12,
  title: "Day 12: Capstone (Part 2) — Polish (Performance, Print, and Export-Ready HTML)",
  intro:
    "Today you’ll make the capstone production-ready: performance-safe media decisions, print/export support, and structure that survives copy/paste and rendering changes.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Why this matters</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Real users copy content, print invoices, and view pages on slow devices. If your HTML isn’t robust, it breaks in real life.
This day is about <span class="text-yellow-600 dark:text-yellow-400 font-bold">robustness</span>.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Performance checklist (HTML layer)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Hero image above-the-fold: eager, decoding async.</li>
  <li>Everything else: lazy.</li>
  <li>Don’t autoplay video with audio.</li>
  <li>Use meaningful headings and link text so content is portable.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Print/export mindset</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Even if your product is digital, users print receipts, share pages, and export to PDF.
Your HTML should be printable without rewriting structure.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided practice</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Add a “Print” button (semantic button).</li>
  <li>Use CSS print rules to hide navigation and keep the content readable.</li>
  <li>Ensure content reads well if CSS is stripped (headings + lists).</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
<p class="text-gray-600 dark:text-light-300">Tomorrow: final review + personal rubric—what “mastery” means for HTML.</p>
`,
  checkpoints: [
    {
      prompt: "Which is a correct performance strategy for images?",
      options: [
        "Eager-load all images",
        "Lazy-load everything including hero",
        "Eager-load the hero, lazy-load below-the-fold, use decoding='async'",
        "Never use decoding",
      ],
      correctIndex: 2,
      explanation:
        "Balance speed and UX: hero image is critical; other images can wait.",
    },
    {
      prompt: "Why does print/export support start with HTML structure?",
      options: [
        "Because CSS cannot style print",
        "Because content needs a semantic outline (headings/lists) to remain readable in different render contexts",
        "Because print ignores HTML",
        "Because only PDFs use HTML",
      ],
      correctIndex: 1,
      explanation:
        "If structure is clear, you can hide/show UI and the content still makes sense.",
    },
    {
      prompt: "What should you typically hide in print styles?",
      options: ["Main content", "Navigation and decorative UI", "All headings", "Tables"],
      correctIndex: 1,
      explanation:
        "Navigation and decorative UI often waste ink/space; keep content and key metadata.",
    },
  ],
  recap: {
    takeaways: [
      "Performance is a product feature: load critical media eagerly, everything else lazily.",
      "Print/export support depends on semantic structure and a clean outline.",
      "Robust HTML survives different contexts (slow devices, PDF, copy/paste).",
    ],
    commonMistakes: [
      "All images eager → slow first load.",
      "No headings → unreadable exports.",
      "Print output includes nav and UI clutter.",
    ],
    nextActions: [
      "Add a print button and hide the header/nav in print styles.",
      "Verify the page reads sensibly without CSS (outline test).",
      "Day 13: final review rubric + mastery checklist.",
    ],
  },
  sandbox: {
    html: `<!-- Day 12 sandbox: print/export friendly page -->
<header class="header" role="banner">
  <a class="skip" href="#main">Skip to content</a>
  <div class="header__inner">
    <a class="brand" href="#">ASIO</a>
    <nav class="nav" aria-label="Primary">
      <a class="nav__link" href="#content">Content</a>
      <a class="nav__link" href="#pricing">Pricing</a>
    </nav>
    <button class="btn btn--ghost" type="button" onclick="window.print()">Print</button>
  </div>
</header>

<main id="main" class="page">
  <h1 class="title">Export-Ready HTML</h1>
  <p class="subtitle">Try printing this page (browser print) and see what should be hidden.</p>

  <section id="content" class="section">
    <h2>Content</h2>
    <p>Readable structure matters: headings, lists, and meaningful text.</p>
    <ul>
      <li>One clear title</li>
      <li>Sections with headings</li>
      <li>Tables only for data</li>
    </ul>
  </section>

  <section id="pricing" class="section">
    <h2>Pricing</h2>
    <div class="table-wrap" role="region" aria-label="Pricing table" tabindex="0">
      <table class="table">
        <caption>Pricing</caption>
        <thead><tr><th scope="col">Plan</th><th scope="col">Price</th></tr></thead>
        <tbody><tr><th scope="row">Pro</th><td>$19</td></tr></tbody>
      </table>
    </div>
  </section>
</main>

<footer class="footer">
  <p>© 2025 ASIO</p>
</footer>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.skip{position:absolute;left:-999px;top:10px;background:#fff;color:#000;padding:8px 12px;border-radius:999px}
.skip:focus{left:12px;outline:3px solid var(--brand)}
.header{position:sticky;top:0;background:rgba(0,0,0,.25);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
.header__inner{max-width:980px;margin:0 auto;padding:14px 16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.brand{font-weight:900;color:var(--brand);text-decoration:none;letter-spacing:.08em}
.nav{display:flex;gap:8px;flex-wrap:wrap;margin-inline:auto}
.nav__link{text-decoration:none;color:var(--muted);padding:8px 10px;border-radius:10px}
.nav__link:hover{background:rgba(255,255,255,.06);color:var(--text)}
.btn{border:0;border-radius:12px;padding:10px 14px;font-weight:900;background:var(--brand);color:#00120b}
.btn--ghost{background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--text)}
.btn:focus-visible,.nav__link:focus-visible,.table-wrap:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
.page{max-width:980px;margin:0 auto;padding:22px 16px 48px}
.title{margin:0 0 6px}
.subtitle{margin:0 0 16px;color:var(--muted)}
.section{margin-top:14px;border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--r);padding:16px}
.table-wrap{border:1px solid rgba(230,240,255,.10);border-radius:16px;overflow:auto;background:rgba(0,0,0,.10)}
.table{width:100%;border-collapse:separate;border-spacing:0;min-width:380px}
th,td{padding:12px 14px;border-top:1px solid rgba(230,240,255,.10);text-align:left}
thead th{border-top:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase}
.footer{border-top:1px solid var(--border);color:var(--muted)}
.footer p{max-width:980px;margin:0 auto;padding:16px}

/* Print styles: keep content, remove UI chrome */
@media print{
  body{background:#fff;color:#000}
  .header,.footer{display:none!important}
  .section{border:1px solid #ddd;background:#fff}
  a{text-decoration:none;color:#000}
}`,
  },
};




