export const day11 = {
  day: 11,
  title: "Day 11: Capstone (Part 1) — Build a Semantic Landing Page Skeleton",
  intro:
    "Today you’ll assemble everything into a real page: header/nav, hero, sections, cards, pricing, FAQ, and footer—using semantic structure that makes styling easy.",
  aiSession: {
    enabled: true,
    steps: [
      {
        "type": "talk",
        "message": "Day 11. Capstone Part 1. Structure first. If you write CSS before your HTML structure is solid, you are wasting time."
      },
      {
        "type": "challenge",
        "instruction": "This FAQ section uses `div`s. Convert it to the native `details` and `summary` elements for free accordion behavior.",
        "buggyCode": "<!-- ❌ Custom JS needed -->\n<div>\n  <button>Question?</button>\n  <div>Answer</div>\n</div>",
        "solutionCode": "<!-- ✅ Native behavior -->\n<details>\n  <summary>Question?</summary>\n  <p>Answer</p>\n</details>",
        "verifyOutput": "<details>",
        "successMessage": "Native wins again. No JavaScript needed for open/close state, and it's fully accessible.",
        "hint": "Use `<details>` wrapper and `<summary>` for the question."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">The goal</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Build a complete landing page skeleton that is:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">semantic</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">accessible</span>, and
<span class="text-yellow-600 dark:text-yellow-400 font-bold">ready for CSS</span>.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Required sections (minimum)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Header with nav + skip link</li>
  <li>Hero section with primary/secondary actions</li>
  <li>Features as cards (articles)</li>
  <li>Pricing table (data table)</li>
  <li>FAQ as native disclosure (details/summary)</li>
  <li>Footer with secondary navigation</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided steps</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Verify one H1 and logical H2 sections.</li>
  <li>Verify landmarks: header/nav/main/footer.</li>
  <li>Tab through: focus visible everywhere, skip link works.</li>
  <li>Make sure every section has a heading and meaningful link text.</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Junior vs Senior</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Junior builds a page that looks right. Senior builds a page that can be styled, tested, navigated, and extended without breaking.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
<p class="text-gray-600 dark:text-light-300">
Tomorrow we’ll add polish: meta strategy, performance-safe media, and export/print readiness.
</p>
`,
  checkpoints: [
    {
      prompt: "What is the best structure for feature cards?",
      options: [
        "Random divs with no headings",
        "Articles with consistent DOM structure and headings",
        "Tables",
        "Only spans",
      ],
      correctIndex: 1,
      explanation:
        "Feature cards are standalone units → article + consistent structure + heading.",
    },
    {
      prompt: "What is the best FAQ disclosure pattern in pure HTML?",
      options: ["div role=button", "details/summary", "table", "img"],
      correctIndex: 1,
      explanation:
        "details/summary provides accessible disclosure interaction without custom JS.",
    },
    {
      prompt: "What is the correct way to support keyboard users on long pages?",
      options: ["Remove focus rings", "Skip link to main + clear headings/landmarks", "Only mouse support", "Hide navigation"],
      correctIndex: 1,
      explanation:
        "Skip links and landmarks prevent keyboard fatigue and improve navigation.",
    },
  ],
  recap: {
    takeaways: [
      "A complete page is a predictable system: landmarks, headings, sections, and reusable components.",
      "Use native patterns (details/summary) and data tables for data.",
      "Your HTML should make CSS easy, not harder.",
    ],
    commonMistakes: [
      "Missing headings in sections.",
      "Generic link text across the page.",
      "Inconsistent card structure that breaks styling reuse.",
    ],
    nextActions: [
      "Run a keyboard pass: Tab through and verify focus.",
      "Check outline: H1 once, then H2 sections.",
      "Day 12: finalize with performance + print/export + polish.",
    ],
  },
  sandbox: {
    html: `<!-- Day 11 sandbox: full semantic landing skeleton -->
<header class="header" role="banner">
  <a class="skip" href="#main">Skip to content</a>
  <div class="header__inner">
    <a class="brand" href="#" aria-label="Home">ASIO</a>
    <nav class="nav" aria-label="Primary">
      <a class="nav__link" href="#features">Features</a>
      <a class="nav__link" href="#pricing">Pricing</a>
      <a class="nav__link" href="#faq">FAQ</a>
    </nav>
    <a class="btn" href="#pricing">View pricing</a>
  </div>
</header>

<main id="main" class="page" tabindex="-1">
  <section class="hero" aria-labelledby="h-hero">
    <h1 id="h-hero" class="hero__title">Frontend learning without a human instructor</h1>
    <p class="hero__subtitle">Structured days, guided labs, checkpoints, and professional UI projects.</p>
    <div class="hero__actions" aria-label="Primary actions">
      <a class="btn" href="#pricing">Start now</a>
      <a class="btn btn--ghost" href="#features">See features</a>
    </div>
  </section>

  <section id="features" class="section" aria-labelledby="h-features">
    <h2 id="h-features" class="section__title">Features</h2>
    <div class="cards">
      <article class="card" aria-labelledby="c1">
        <h3 id="c1" class="card__title">Guided labs</h3>
        <p class="card__body">Bug → observe → fix, like a human tutor.</p>
        <a class="card__link" href="#faq">How it works →</a>
      </article>
      <article class="card" aria-labelledby="c2">
        <h3 id="c2" class="card__title">Checkpoints</h3>
        <p class="card__body">Prove understanding with explanations and rubrics.</p>
        <a class="card__link" href="#pricing">Plans →</a>
      </article>
      <article class="card" aria-labelledby="c3">
        <h3 id="c3" class="card__title">Skill tree</h3>
        <p class="card__body">Track progress across the roadmap.</p>
        <a class="card__link" href="#features">Explore →</a>
      </article>
    </div>
  </section>

  <section id="pricing" class="section" aria-labelledby="h-pricing">
    <h2 id="h-pricing" class="section__title">Pricing</h2>
    <div class="table-wrap" role="region" aria-label="Pricing table" tabindex="0">
      <table class="table">
        <caption class="table__caption">Pricing by plan (monthly)</caption>
        <thead>
          <tr>
            <th scope="col">Plan</th>
            <th scope="col">Price</th>
            <th scope="col">Includes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Free</th>
            <td>$0</td>
            <td>Basic tutorials</td>
          </tr>
          <tr class="row--pro">
            <th scope="row">Pro</th>
            <td>$19</td>
            <td>Roadmap + projects</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section id="faq" class="section" aria-labelledby="h-faq">
    <h2 id="h-faq" class="section__title">FAQ</h2>
    <details class="faq">
      <summary class="faq__q">Do I need a teacher?</summary>
      <div class="faq__a"><p>No. The lessons are built to be self-guided with checkpoints and labs.</p></div>
    </details>
    <details class="faq">
      <summary class="faq__q">How do I know I understood?</summary>
      <div class="faq__a"><p>You can predict outcomes and explain “why”, not just repeat steps.</p></div>
    </details>
  </section>
</main>

<footer class="footer">
  <nav class="footer__nav" aria-label="Footer">
    <a class="footer__link" href="#features">View features</a>
    <a class="footer__link" href="#pricing">View pricing</a>
    <a class="footer__link" href="#faq">Read FAQ</a>
  </nav>
  <p class="footer__text">© 2025 ASIO</p>
</footer>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:18px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
a{color:inherit}
.skip{position:absolute;left:-999px;top:10px;background:#fff;color:#000;padding:8px 12px;border-radius:999px}
.skip:focus{left:12px;outline:3px solid var(--brand)}
.header{position:sticky;top:0;background:rgba(0,0,0,.25);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)}
.header__inner{max-width:1100px;margin:0 auto;padding:14px 16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.brand{font-weight:900;color:var(--brand);text-decoration:none;letter-spacing:.08em}
.nav{display:flex;gap:8px;flex-wrap:wrap;margin-inline:auto}
.nav__link{text-decoration:none;color:var(--muted);padding:8px 10px;border-radius:10px}
.nav__link:hover{background:rgba(255,255,255,.06);color:var(--text)}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:12px;background:var(--brand);color:#00120b;text-decoration:none;font-weight:900}
.btn--ghost{background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--text)}
.btn:focus-visible,.nav__link:focus-visible,.table-wrap:focus-visible,summary:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
.page{max-width:1100px;margin:0 auto;padding:22px 16px 48px}
.hero{border:1px solid var(--border);background:linear-gradient(135deg, rgba(0,255,150,.10), transparent 55%), var(--panel);border-radius:var(--r);padding:16px}
.hero__title{margin:0 0 8px;font-size:34px}
.hero__subtitle{margin:0 0 12px;color:var(--muted)}
.hero__actions{display:flex;gap:10px;flex-wrap:wrap}
.section{margin-top:16px;border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--r);padding:16px}
.section__title{margin:0 0 12px}
.cards{display:grid;grid-template-columns:1fr;gap:12px}
.card{border:1px solid rgba(230,240,255,.10);background:rgba(0,0,0,.12);border-radius:16px;padding:14px}
.card__title{margin:0 0 6px}
.card__body{margin:0 0 10px;color:var(--muted)}
.card__link{color:var(--brand);text-decoration:none;font-weight:900}
.card__link:hover{text-decoration:underline}
.table-wrap{border:1px solid rgba(230,240,255,.10);border-radius:16px;overflow:auto;background:rgba(0,0,0,.10)}
.table{width:100%;border-collapse:separate;border-spacing:0;min-width:520px}
.table__caption{text-align:left;padding:12px 14px;color:var(--muted);font-weight:900}
th,td{padding:12px 14px;border-top:1px solid rgba(230,240,255,.10);text-align:left}
thead th{border-top:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase}
.row--pro{background:rgba(0,255,150,.06)}
.faq{border:1px solid rgba(230,240,255,.10);border-radius:16px;padding:12px;background:rgba(0,0,0,.10);margin-top:10px}
.faq__q{cursor:pointer;font-weight:900}
.faq__a{margin-top:8px;color:var(--muted)}
.footer{border-top:1px solid var(--border);color:var(--muted)}
.footer__nav{max-width:1100px;margin:0 auto;padding:16px;display:flex;gap:12px;flex-wrap:wrap}
.footer__link{text-decoration:none;padding:6px 8px;border-radius:10px}
.footer__link:hover{background:rgba(255,255,255,.06);color:var(--text)}
.footer__text{max-width:1100px;margin:0 auto;padding:0 16px 18px}
@media (min-width: 900px){.cards{grid-template-columns:repeat(3, minmax(0,1fr))}}`,
  },
};




