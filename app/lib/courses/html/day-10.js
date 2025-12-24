export const day10 = {
  day: 10,
  title: "Day 10: Internationalization Mindset (RTL, Neutral Copy, Logical Order)",
  intro:
    "Great frontends work globally by default. Today you’ll learn RTL basics, neutral content patterns, and how HTML structure supports internationalization without extra humans.",
  content: `
<h3 class="text-xl font-bold text-white mb-4">Problem framing</h3>
<p class="text-light-300 mb-6">
Internationalization isn’t a later feature. It’s a structural choice. If you design layout and content assuming only LTR and English, you will pay later.
</p>

<h3 class="text-xl font-bold text-white mb-4">Core ideas</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Neutral copy</span>: avoid culturally specific metaphors; write clear actions.</li>
  <li><span class="text-yellow-400 font-bold">Direction</span>: HTML supports direction via <code class="bg-dark-900 px-1 rounded">dir="rtl"</code>.</li>
  <li><span class="text-yellow-400 font-bold">DOM order</span>: keep logical reading order; don’t depend on visual-only position.</li>
  <li><span class="text-yellow-400 font-bold">Icons</span>: arrows may need mirroring in RTL (design consideration).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Guided practice</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
  <li>Switch the page direction to RTL by adding <code class="bg-dark-900 px-1 rounded">dir="rtl"</code> on the root container.</li>
  <li>Ensure navigation and content still make sense in reading order.</li>
  <li>Replace any direction-specific words (“left/right”) with neutral language (“start/end”).</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">Junior vs Senior</h3>
<p class="text-light-300 mb-6">
Junior: hardcodes left/right. Senior: designs in terms of start/end and lets direction flow naturally.
</p>

<h3 class="text-xl font-bold text-white mb-4">Next steps</h3>
<p class="text-light-300">Tomorrow: capstone—build a complete, accessible landing page skeleton using everything so far.</p>
`,
  comparison: {
    junior: `<!-- ❌ Junior: direction-coupled -->
<div class="left-col">...</div>
<div class="right-col">...</div>
<p>Click the button on the right</p>`,
    senior: `<!-- ✅ Senior: direction-agnostic -->
<div class="layout">
  <aside class="sidebar">...</aside>
  <main class="content">...</main>
</div>
<p>Select the action in the primary toolbar</p>

<!-- Switch direction -->
<html dir="rtl">...</html>`,
  },
  checkpoints: [
    {
      prompt: "What does dir='rtl' do?",
      options: [
        "Translates the page automatically",
        "Switches document text direction so reading order is right-to-left",
        "Makes fonts bigger",
        "Improves SEO ranking",
      ],
      correctIndex: 1,
      explanation:
        "dir controls text direction and affects layout flow for bidirectional scripts.",
    },
    {
      prompt: "Which wording is more i18n-friendly?",
      options: ["Click the button on the right", "Click the primary action", "Click here", "Push the right-side thing"],
      correctIndex: 1,
      explanation:
        "Avoid direction-dependent references. Use neutral labels like primary/secondary or start/end.",
    },
    {
      prompt: "What should remain stable across languages and directions?",
      options: [
        "Hard-coded pixel widths",
        "DOM order / logical reading order",
        "Only LTR layouts",
        "English-only headings",
      ],
      correctIndex: 1,
      explanation:
        "Reading order is fundamental. Visual layout can adapt, but the DOM should remain logical.",
    },
  ],
  recap: {
    takeaways: [
      "Design in start/end and primary/secondary, not left/right.",
      "dir='rtl' is a structural toggle for direction.",
      "Logical DOM order matters more than visual tricks.",
    ],
    commonMistakes: [
      "Left/right language in UI copy.",
      "Layout assumptions that break in RTL.",
      "Meaning encoded only in icons without labels.",
    ],
    nextActions: [
      "Toggle RTL and verify nav still reads logically.",
      "Replace direction-specific copy with neutral language.",
      "Day 11: capstone landing page skeleton (semantic + accessible).",
    ],
  },
  sandbox: {
    html: `<!-- Day 10 sandbox: RTL toggle via dir -->
<main class="page" dir="ltr">
  <header class="top">
    <a class="brand" href="#">ASIO</a>
    <nav class="nav" aria-label="Primary">
      <a class="nav__link" href="#features" aria-current="page">Features</a>
      <a class="nav__link" href="#pricing">Pricing</a>
      <a class="nav__link" href="#support">Support</a>
    </nav>
    <a class="btn" href="#start">Primary action</a>
  </header>

  <section class="panel" aria-labelledby="h">
    <h1 id="h" class="title">Internationalization mindset</h1>
    <p class="subtitle">Change <code>dir</code> to <strong>rtl</strong> and confirm the UI still makes sense.</p>
    <ul class="list">
      <li>Use neutral copy (no “left/right”).</li>
      <li>Use logical order (DOM order).</li>
      <li>Design primary/secondary actions.</li>
    </ul>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
a{color:inherit}
.page{max-width:1100px;margin:0 auto;padding:26px 16px 48px}
.top{
  display:flex;align-items:center;gap:12px;flex-wrap:wrap;
  border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--r);padding:12px;
}
.brand{font-weight:900;color:var(--brand);text-decoration:none;letter-spacing:.08em}
.nav{display:flex;gap:8px;flex-wrap:wrap;margin-inline:auto}
.nav__link{text-decoration:none;color:var(--muted);padding:8px 10px;border-radius:10px}
.nav__link[aria-current="page"]{background:rgba(0,255,150,.14);border:1px solid rgba(0,255,150,.35);color:var(--text)}
.nav__link:hover{background:rgba(255,255,255,.06);color:var(--text)}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:12px;background:var(--brand);color:#00120b;text-decoration:none;font-weight:900}
.btn:focus-visible,.nav__link:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
.panel{margin-top:14px;border:1px solid var(--border);background:linear-gradient(135deg, rgba(0,255,150,.10), transparent 50%), var(--panel);border-radius:var(--r);padding:16px}
.title{margin:0 0 6px}
.subtitle{margin:0 0 14px;color:var(--muted)}
.list{margin:0;padding-left:18px;color:var(--text)}`,
  },
};
