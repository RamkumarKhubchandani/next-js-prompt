export const day08 = {
  day: 8,
  title: "Day 8: SEO-Ready HTML (Metadata, Headings, Link Strategy, and Crawlable Structure)",
  intro:
    "SEO isn’t magic—it’s structure. Today you’ll learn the HTML signals that make pages understandable to crawlers and humans: metadata, headings, link text, and content hierarchy.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Search engines reward clarity. If your page is semantically correct and readable, you get SEO benefits as a side effect.
If your page is confusing, no “SEO trick” will save it.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Core SEO signals (HTML layer)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">&lt;title&gt;</span>: the most important on-page metadata.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Meta description</span>: influences click-through, not ranking directly.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Heading outline</span>: helps crawlers infer structure.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Meaningful links</span>: descriptive anchor text and internal linking.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Images</span>: alt text for meaning and accessibility.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Micro-example: bad vs good link strategy</h3>
<div class="grid md:grid-cols-2 gap-6 mb-6">
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600">
    <p class="text-sm font-bold text-red-300 mb-2">❌ Bad</p>
    <pre class="text-xs text-gray-700 dark:text-light-200 overflow-x-auto"><code>&lt;a href="/pricing"&gt;Click here&lt;/a&gt;</code></pre>
  </div>
  <div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600">
    <p class="text-sm font-bold text-green-300 mb-2">✅ Good</p>
    <pre class="text-xs text-gray-700 dark:text-light-200 overflow-x-auto"><code>&lt;a href="/pricing"&gt;View pricing plans&lt;/a&gt;</code></pre>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Junior vs Senior</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Junior: keyword-stuffing. Senior: clear headings, clear links, clear structure, clear intent.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided practice</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Write a title that reads like a product page headline.</li>
  <li>Write a meta description that explains value in one sentence.</li>
  <li>Replace every “Learn more” link with descriptive link text.</li>
  <li>Ensure headings reflect structure (H1 once, then H2/H3).</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
<p class="text-gray-600 dark:text-light-300">Tomorrow: components in HTML—cards, lists, and reusable patterns with BEM naming.</p>
`,
  comparison: {
    junior: `<!-- ❌ Junior SEO -->
<title>Home</title>
<a href="/pricing">Click here</a>
<h1>Welcome</h1>
<h1>More</h1>`,
    senior: `<!-- ✅ Senior SEO -->
<title>React Learning Path — Master React 19 in 30 Days</title>
<meta name="description" content="A structured, day-by-day roadmap with guided labs and checkpoints to master React professionally." />
<h1>React Learning Path</h1>
<h2>What you'll build</h2>
<a href="/pricing">View pricing plans</a>`,
  },
  checkpoints: [
    {
      prompt: "Which metadata element is most important for on-page SEO?",
      options: ["meta keywords", "title", "random div text", "script tag"],
      correctIndex: 1,
      explanation:
        "The title is the strongest on-page metadata signal and also drives search snippet titles often.",
    },
    {
      prompt: "What is the best practice for link text?",
      options: [
        "Use 'click here' everywhere",
        "Use descriptive link text that communicates destination/value",
        "Use emojis only",
        "Hide link text and use aria-label only",
      ],
      correctIndex: 1,
      explanation:
        "Meaningful links help users and crawlers understand relationship and intent.",
    },
    {
      prompt: "What is the correct heading strategy?",
      options: ["H1 everywhere", "No headings", "One H1 then H2/H3 outline", "Only H3 for style"],
      correctIndex: 2,
      explanation:
        "Headings are an outline. Use one H1 for the page topic and nest sections with H2/H3.",
    },
  ],
  recap: {
    takeaways: [
      "SEO is clarity: metadata + structure + meaningful links.",
      "A good heading outline helps humans and crawlers.",
      "Avoid keyword tricks; optimize understanding.",
    ],
    commonMistakes: [
      "Generic titles like 'Home'.",
      "Repeated 'Learn more' links with no meaning.",
      "Multiple H1s without a structure reason.",
    ],
    nextActions: [
      "Rewrite 3 links to be descriptive and specific.",
      "Write one title/meta pair for a real page.",
      "Day 9: build reusable HTML components with BEM naming.",
    ],
  },
  sandbox: {
    html: `<!-- Day 8 sandbox: SEO-ready content structure -->
<main class="page">
  <header class="hero">
    <h1 class="hero__title">Frontend Roadmap: From Zero to Architect</h1>
    <p class="hero__subtitle">A structured learning path with demos, labs, and checkpoints.</p>
    <nav class="hero__links" aria-label="Primary actions">
      <a class="btn" href="#pricing">View pricing plans</a>
      <a class="btn btn--ghost" href="#curriculum">Explore curriculum</a>
    </nav>
  </header>

  <section id="curriculum" class="section" aria-labelledby="h-cur">
    <h2 id="h-cur" class="section__title">Curriculum</h2>
    <p class="section__body">Learn by building: semantic HTML → modern CSS → JavaScript → frameworks.</p>
    <ul class="list">
      <li class="list__item"><a href="#html">Semantic HTML foundations</a></li>
      <li class="list__item"><a href="#css">Modern CSS systems</a></li>
      <li class="list__item"><a href="#js">JavaScript mastery</a></li>
    </ul>
  </section>

  <section id="pricing" class="section" aria-labelledby="h-pr">
    <h2 id="h-pr" class="section__title">Pricing</h2>
    <p class="section__body">Choose a plan that matches your learning speed.</p>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:18px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
a{color:inherit}
.page{max-width:980px;margin:0 auto;padding:26px 16px 48px}
.hero{border:1px solid var(--border);background:linear-gradient(135deg, rgba(0,255,150,.10), transparent 45%), var(--panel);border-radius:var(--r);padding:16px}
.hero__title{margin:0 0 8px;font-size:34px}
.hero__subtitle{margin:0 0 12px;color:var(--muted)}
.hero__links{display:flex;gap:10px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:12px;background:var(--brand);color:#00120b;text-decoration:none;font-weight:900}
.btn--ghost{background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--text)}
.btn:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
.section{margin-top:16px;border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--r);padding:16px}
.section__title{margin:0 0 8px}
.section__body{margin:0 0 12px;color:var(--muted)}
.list{margin:0;padding-left:18px;color:var(--text)}
.list__item{margin:8px 0}
.list__item a{text-decoration:none;color:var(--brand);font-weight:900}
.list__item a:hover{text-decoration:underline}`,
  },
};




