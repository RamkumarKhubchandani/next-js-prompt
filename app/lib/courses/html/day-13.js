export const day13 = {
  day: 13,
  title: "Day 13: Final Review — HTML Mastery Rubric (You Can Teach Yourself Now)",
  intro:
    "You’re not done when you “read the lesson”. You’re done when you can predict and explain outcomes. Today you’ll validate mastery with a rubric and fix your weak spots without a human.",
  aiSession: {
    enabled: true,
    steps: [
      {
        "type": "talk",
        "message": "Day 13. Mastery. HTML is not just tags. It's the contract between you, the user, and the machine."
      },
      {
        "type": "challenge",
        "instruction": "This is the final test. The image is decoration, the heading is missing, and the link is generic. Fix all three.",
        "buggyCode": "<div>\n  <img src=\"deco.png\" alt=\"blue line\" />\n  <p>Content</p>\n  <a href=\"/more\">Read</a>\n</div>",
        "solutionCode": "<section>\n  <img src=\"deco.png\" alt=\"\" />\n  <h2>Title</h2>\n  <p>Content</p>\n  <a href=\"/more\">Read article</a>\n</section>",
        "verifyOutput": "alt=\"\"",
        "successMessage": "Mastery. Semantic container, valid heading structure, empty alt for decoration, and descriptive link text.",
        "hint": "Use `<section>`, `<h2>`, `alt=''`, and 'Read article'."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Your mastery rubric (no human required)</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Use this rubric to evaluate any page you build. If you can do this consistently, you have professional HTML mastery.
</p>

<div class="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-2xl p-5 mb-6">
  <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">A) Structure (Semantics)</h4>
  <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300">
    <li>Landmarks exist: header/nav/main/footer (and aside when needed).</li>
    <li>One H1, nested H2/H3 outline.</li>
    <li>Articles used for standalone units; sections used with headings.</li>
  </ul>

  <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3 mt-5">B) Accessibility</h4>
  <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300">
    <li>Keyboard navigation works; focus is visible.</li>
    <li>Forms have real labels; groups use fieldset/legend.</li>
    <li>Alt text is meaningful (or empty for decorative).</li>
  </ul>

  <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3 mt-5">C) Robustness</h4>
  <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300">
    <li>Tables use caption + th scope + responsive scrolling container.</li>
    <li>Content still reads logically without CSS.</li>
    <li>Print/export has a clean output.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">How to self-debug (the 60-second loop)</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Inspect structure</span>: do I have the right tags?</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Inspect naming</span>: does it have a clear label and role?</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Test keyboard</span>: can I tab everything?</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Explain</span>: can I explain why this is correct?</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
<p class="text-gray-600 dark:text-light-300">
Move to CSS with the same mindset: build systems, not one-off styles.
</p>
`,
  checkpoints: [
    {
      prompt: "What does “mastery” mean in this curriculum?",
      options: [
        "You can memorize tags",
        "You can predict outcomes and explain why (and debug without a human)",
        "You watched videos",
        "You copied code once",
      ],
      correctIndex: 1,
      explanation:
        "Our bar is ability: predict + explain + debug independently.",
    },
    {
      prompt: "Which is the most correct approach to ARIA?",
      options: [
        "Add ARIA roles everywhere",
        "Use native HTML first; add ARIA only when required and correct",
        "Avoid accessibility entirely",
        "Use aria-label instead of visible labels",
      ],
      correctIndex: 1,
      explanation:
        "Native semantics first is the professional pattern. ARIA is supplemental.",
    },
    {
      prompt: "If a page looks fine visually but feels confusing, where do you start?",
      options: [
        "Add more CSS",
        "Check semantic structure: headings, landmarks, meaningful links",
        "Remove the main element",
        "Add random divs",
      ],
      correctIndex: 1,
      explanation:
        "Structural clarity fixes confusion. Styling should follow structure.",
    },
  ],
  recap: {
    takeaways: [
      "Mastery = predict + explain + debug without a teacher.",
      "Use a rubric: structure, accessibility, robustness.",
      "HTML is the contract that makes CSS/JS easier.",
    ],
    commonMistakes: [
      "Assuming visual correctness implies accessibility correctness.",
      "Fixing structural problems with ARIA soup.",
      "Skipping headings/landmarks and relying on CSS only.",
    ],
    nextActions: [
      "Rebuild one existing page using the rubric.",
      "Run a keyboard pass and fix focus/labels.",
      "Start CSS Day 0 and build a token system mindset.",
    ],
  },
  sandbox: {
    html: `<!-- Day 13 sandbox: mastery checklist page -->
<main class="page">
  <h1 class="title">HTML Mastery Checklist</h1>
  <p class="subtitle">If you can tick every item, you can teach yourself the rest.</p>

  <section class="card" aria-labelledby="h-a">
    <h2 id="h-a" class="card__title">Structure</h2>
    <ul class="list">
      <li>Landmarks exist and are meaningful</li>
      <li>Heading outline is logical</li>
      <li>Articles and sections used correctly</li>
    </ul>
  </section>

  <section class="card" aria-labelledby="h-b">
    <h2 id="h-b" class="card__title">Accessibility</h2>
    <ul class="list">
      <li>Keyboard navigation works</li>
      <li>Forms are labeled and grouped</li>
      <li>Alt text follows meaning rules</li>
    </ul>
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
.subtitle{margin:0 0 16px;color:var(--muted)}
.card{border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--r);padding:16px;margin-top:14px}
.card__title{margin:0 0 10px}
.list{margin:0;padding-left:18px}`,
  },
};




