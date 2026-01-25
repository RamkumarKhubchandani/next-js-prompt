export const day06 = {
  day: 6,
  title: "Day 6: Semantic Composition (article/section/aside) + Content Strategy",
  intro:
    "Today you’ll learn how to structure real pages: when to use section vs article, how to design scalable content blocks, and how semantics reduces CSS complexity.",
  aiSession: {
    enabled: true,
    steps: [
      {
        "type": "talk",
        "message": "Day 6. Composition. `div` is the last resort. Use `section` for thematic groups and `article` for standalone content."
      },
      {
        "type": "challenge",
        "instruction": "This `section` is missing a heading, which makes it semantically meaningless (it's just a div). Add an `h2`.",
        "buggyCode": "<!-- ❌ Section without heading -->\n<section>\n  <p>Content</p>\n</section>",
        "solutionCode": "<!-- ✅ Labeled section -->\n<section>\n  <h2>About</h2>\n  <p>Content</p>\n</section>",
        "verifyOutput": "<h2>",
        "successMessage": "Rule of thumb: Every `<section>` needs a heading. If it doesn't have a heading, it's probably just a `<div>`.",
        "hint": "Add an `<h2>` inside the section."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Most apps fail structurally because they don’t have a consistent content model.
If your page is a pile of divs, your CSS becomes a pile of exceptions.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Core mental model</h3>
<div class="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-2xl p-5 mb-6">
  <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300">
    <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">article</code> is a standalone unit (a post, a card, a result, a comment).</li>
    <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">section</code> groups related content with a heading (a page section).</li>
    <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">aside</code> is complementary content (sidebar, tips, TOC).</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided practice</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Convert “feature cards” into <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">article</code> elements.</li>
  <li>Ensure each <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">section</code> has a heading (H2).</li>
  <li>Add an <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">aside</code> that contains “tips” and is still readable in DOM order.</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Junior vs Senior</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Juniors use semantics after styling. Seniors start with a content model (semantics), then style becomes straightforward.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Common mistakes</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Using section without a heading (it becomes meaningless).</li>
  <li>Using article for everything (loses meaning).</li>
  <li>Putting aside first visually but last in DOM without thinking about reading order.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
<p class="text-gray-600 dark:text-light-300">Tomorrow: accessibility essentials (landmarks, ARIA rules of use, and focus).</p>
`,
  comparison: {
    junior: `<!-- ❌ Junior: no content model -->
<div class="page">
  <div class="block">Feature</div>
  <div class="block">Feature</div>
  <div class="side">Tips</div>
</div>`,
    senior: `<!-- ✅ Senior: structured page -->
<main>
  <section aria-labelledby="h-features">
    <h2 id="h-features">Features</h2>
    <article>...</article>
    <article>...</article>
  </section>
  <aside aria-label="Tips">...</aside>
</main>`,
  },
  checkpoints: [
    {
      prompt: "What is the best definition of <article>?",
      options: [
        "A container for any content",
        "A standalone unit that could be distributed/reused independently",
        "A layout column",
        "A semantic replacement for <div>",
      ],
      correctIndex: 1,
      explanation:
        "Articles are self-contained units: posts, cards, results, comments, etc.",
    },
    {
      prompt: "When should you use <section>?",
      options: [
        "Always, for every div",
        "When grouping related content under a heading",
        "Only for navigation",
        "Only inside articles",
      ],
      correctIndex: 1,
      explanation:
        "Sections are meaningful when they represent a thematic group with a heading.",
    },
    {
      prompt: "What is <aside> primarily for?",
      options: [
        "Critical page content",
        "Complementary or supporting content",
        "Replacing footer content",
        "Creating buttons",
      ],
      correctIndex: 1,
      explanation:
        "Aside is for complementary content like sidebars, tips, references, and TOCs.",
    },
  ],
  recap: {
    takeaways: [
      "Build a content model: sections with headings, articles for standalone units, asides for complementary content.",
      "Semantics reduces CSS complexity by making structure predictable.",
      "DOM order matters for reading order and accessibility.",
    ],
    commonMistakes: [
      "Section without heading.",
      "Article used as a generic container.",
      "Aside placed with visual order but ignored reading order.",
    ],
    nextActions: [
      "Refactor a card list into articles.",
      "Ensure all sections have headings.",
      "Day 7: ARIA essentials and accessibility rules of use.",
    ],
  },
  sandbox: {
    html: `<!-- Day 6 sandbox: content composition -->
<main class="page">
  <header class="page__header">
    <h1 class="page__title">Frontend Track</h1>
    <p class="page__subtitle">Structure first. Styling becomes easier.</p>
  </header>

  <div class="layout">
    <section class="section" aria-labelledby="h-features">
      <h2 id="h-features" class="section__title">Features</h2>
      <div class="cards">
        <article class="card" aria-labelledby="c1">
          <h3 id="c1" class="card__title">Semantic structure</h3>
          <p class="card__body">Learn the tags that communicate meaning.</p>
          <a class="card__link" href="#learn">Learn →</a>
        </article>
        <article class="card" aria-labelledby="c2">
          <h3 id="c2" class="card__title">Accessible UI</h3>
          <p class="card__body">Keyboard-first patterns and correct labels.</p>
          <a class="card__link" href="#a11y">Learn →</a>
        </article>
      </div>
    </section>

    <aside class="aside" aria-label="Tips">
      <p class="aside__title">Tips</p>
      <ul class="aside__list">
        <li>Use <strong>article</strong> for standalone units.</li>
        <li>Use <strong>section</strong> for thematic grouping with headings.</li>
        <li>Use <strong>aside</strong> for supporting content.</li>
      </ul>
    </aside>
  </div>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:18px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:1100px;margin:0 auto;padding:26px 16px 48px}
.page__title{margin:0 0 6px}
.page__subtitle{margin:0 0 18px;color:var(--muted)}
.layout{display:grid;grid-template-columns:1fr;gap:16px}
.section{border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--r);padding:16px}
.section__title{margin:0 0 12px}
.cards{display:grid;grid-template-columns:1fr;gap:12px}
.card{border:1px solid rgba(230,240,255,.10);background:rgba(0,0,0,.12);border-radius:16px;padding:14px}
.card__title{margin:0 0 6px}
.card__body{margin:0 0 10px;color:var(--muted)}
.card__link{color:var(--brand);text-decoration:none;font-weight:900}
.card__link:hover{text-decoration:underline}
.aside{border:1px solid var(--border);background:linear-gradient(135deg, rgba(0,255,150,.10), transparent 45%), rgba(0,0,0,.18);border-radius:var(--r);padding:16px}
.aside__title{margin:0 0 8px;font-weight:900;color:var(--muted);text-transform:uppercase;letter-spacing:.14em;font-size:12px}
.aside__list{margin:0;padding-left:18px;color:var(--text)}
@media (min-width: 900px){
  .layout{grid-template-columns:1fr 320px;align-items:start}
  .cards{grid-template-columns:repeat(2, minmax(0, 1fr))}
}`,
  },
};
