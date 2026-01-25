// export const day04 = {
//   day: 4,
//   title: "Day 4: Images, Media, and Performance-Safe Markup (Alt, srcset, Loading)",
//   intro:
//     "Today you’ll learn to ship media that’s accessible and fast: meaningful alt text, responsive images, lazy loading, and the common mistakes that quietly ruin UX.",
//   content: `
// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Outcomes (What “Done” Looks Like)</h3>
// <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
//   <li>You can write <span class="text-yellow-600 dark:text-yellow-400 font-bold">correct alt text</span> (and know when alt should be empty).</li>
//   <li>You can build a <span class="text-yellow-600 dark:text-yellow-400 font-bold">responsive image</span> with <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">srcset</code>/<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">sizes</code>.</li>
//   <li>You can explain <span class="text-yellow-600 dark:text-yellow-400 font-bold">loading priority</span>: when to use eager vs lazy.</li>
//   <li>You can ship a video with accessible controls and motion-respecting defaults.</li>
// </ul>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
// <p class="text-gray-600 dark:text-light-300 mb-6">
// Media is where product quality becomes visible. But it’s also where teams accidentally ship slow pages and inaccessible content.
// Your job as an engineer is to make media <span class="text-yellow-600 dark:text-yellow-400 font-bold">useful</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">fast</span>, and <span class="text-yellow-600 dark:text-yellow-400 font-bold">understandable</span>.
// </p>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Alt text: the professional rules</h3>
// <div class="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-2xl p-5 mb-6">
//   <p class="text-gray-700 dark:text-light-200 mb-3">
//     Alt text is not “describe the pixels”. It’s “describe the meaning”.
//   </p>
//   <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300">
//     <li><span class="text-green-300 font-bold">Informative image</span>: alt explains the information.</li>
//     <li><span class="text-green-300 font-bold">Decorative image</span>: alt should be empty (<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">alt=""</code>) so it is skipped.</li>
//     <li><span class="text-green-300 font-bold">Functional image</span> (icon button): alt describes the action, or put text in the button and hide the icon.</li>
//   </ul>
// </div>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Responsive images (srcset + sizes)</h3>
// <p class="text-gray-600 dark:text-light-300 mb-4">
// The browser picks the best image based on viewport and density. You provide options; the browser chooses.
// </p>
// <div class="bg-gray-100 dark:bg-dark-900 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-6 font-mono text-xs md:text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
// <pre><code>&lt;img
//   src="hero-800.jpg"
//   srcset="hero-480.jpg 480w, hero-800.jpg 800w, hero-1200.jpg 1200w"
//   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 900px"
//   alt="A clean dashboard layout showing course progress"
//   loading="eager"
//   decoding="async"
// /&gt;</code></pre>
// </div>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Video (accessible + respectful)</h3>
// <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
//   <li>Provide controls (don’t trap users).</li>
//   <li>Don’t autoplay audio.</li>
//   <li>For motion sensitivity: default to muted and avoid aggressive animations around video.</li>
// </ul>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided practice (do this now)</h3>
// <ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
//   <li>Write alt text for each image in the sandbox. Decide: informative vs decorative.</li>
//   <li>Change the product screenshot to <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">loading="lazy"</code> and keep hero as eager.</li>
//   <li>Add a <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">figure</code> + <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">figcaption</code> for the screenshot.</li>
// </ol>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Junior vs Senior (same UI, different thinking)</h3>
// <p class="text-gray-600 dark:text-light-300 mb-4">
// Juniors often write “something that works”. Seniors write “something that works for everyone and scales”.
// </p>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Common mistakes (with fixes)</h3>
// <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
//   <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> alt="image". <span class="text-green-300 font-bold">Fix:</span> alt describes meaning or empty for decorative.</li>
//   <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> huge images always loaded eagerly. <span class="text-green-300 font-bold">Fix:</span> eager only for above-the-fold.</li>
//   <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> autoplay with audio. <span class="text-green-300 font-bold">Fix:</span> no autoplay audio; allow user control.</li>
// </ul>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
// <p class="text-gray-600 dark:text-light-300">
// Tomorrow: tables and structured data—how to mark up information so it’s readable and scannable.
// </p>
// `,
//   comparison: {
//     junior: `<!-- ❌ Junior: inaccessible + heavy -->
// <img src="screenshot.png" alt="image" />
// <img src="hero.png" alt="hero" />
// <video src="demo.mp4" autoplay></video>`,
//     senior: `<!-- ✅ Senior: meaningful + performant -->
// <!-- Decorative background -->
// <img src="bg-texture.png" alt="" aria-hidden="true" />

// <!-- Informative hero (above fold): eager -->
// <img
//   src="hero-800.jpg"
//   srcset="hero-480.jpg 480w, hero-800.jpg 800w, hero-1200.jpg 1200w"
//   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 900px"
//   alt="A dashboard showing learning progress across tracks"
//   loading="eager"
//   decoding="async"
// />

// <figure>
//   <img src="report.png" alt="A weekly progress report with XP and streak" loading="lazy" decoding="async" />
//   <figcaption>Weekly progress report (example).</figcaption>
// </figure>

// <video src="demo.mp4" controls muted playsinline></video>`,
//   },
//   checkpoints: [
//     {
//       prompt: "When should an image use empty alt (alt=\"\")?",
//       options: [
//         "When you don't know what to write",
//         "When the image is decorative and adds no meaning",
//         "When the image is important",
//         "Never; alt must always be text",
//       ],
//       correctIndex: 1,
//       explanation:
//         "Decorative images should be skipped by assistive tech. Empty alt is the correct way (not removing alt).",
//     },
//     {
//       prompt: "Which is the best rule for loading=\"lazy\"?",
//       options: [
//         "Use lazy for every image",
//         "Use eager for everything",
//         "Lazy-load below-the-fold images; keep key hero images eager",
//         "Never use lazy; it breaks SEO",
//       ],
//       correctIndex: 2,
//       explanation:
//         "Lazy loading reduces initial network/CPU work. Keep above-the-fold critical images eager.",
//     },
//     {
//       prompt: "What does srcset primarily enable?",
//       options: [
//         "Image cropping in HTML",
//         "Responsive image selection based on viewport and device density",
//         "Replacing CSS background images",
//         "Adding blur effects",
//       ],
//       correctIndex: 1,
//       explanation:
//         "srcset provides candidate images; the browser selects the best one for the current context.",
//     },
//   ],
//   recap: {
//     takeaways: [
//       "Alt text communicates meaning; empty alt is correct for decorative images.",
//       "Use srcset/sizes for responsive images; eager only for above-the-fold.",
//       "Video should be user-controlled; avoid autoplay audio.",
//     ],
//     commonMistakes: [
//       "Generic alt text like 'image'.",
//       "Loading all images eagerly.",
//       "Autoplaying media with sound.",
//     ],
//     nextActions: [
//       "Rewrite alt text for 3 images using the meaning-based rule.",
//       "Convert one screenshot to figure/figcaption.",
//       "Day 5: Tables—learn to mark up data with real structure.",
//     ],
//   },
//   sandbox: {
//     html: `<!-- Day 4 sandbox: media in a realistic UI -->
// <main class="page">
//   <header class="hero">
//     <div class="hero__copy">
//       <h1 class="hero__title">Media that’s fast and accessible</h1>
//       <p class="hero__subtitle">Alt text, responsive images, and respectful video.</p>
//       <a class="btn" href="#learn">Learn the rules</a>
//     </div>

//     <!-- Hero image (above fold): eager -->
//     <img
//       class="hero__img"
//       src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=70"
//       srcset="
//         https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=480&q=70 480w,
//         https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=70 900w,
//         https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70 1200w"
//       sizes="(max-width: 900px) 100vw, 520px"
//       alt="A laptop screen showing code and a developer workspace"
//       loading="eager"
//       decoding="async"
//     />
//   </header>

//   <section id="learn" class="grid" aria-label="Media examples">
//     <figure class="card">
//       <img
//         class="card__img"
//         src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1000&q=70"
//         alt="A dashboard screen with charts and progress indicators"
//         loading="lazy"
//         decoding="async"
//       />
//       <figcaption class="card__cap">
//         Product screenshot (informative): caption explains what user sees.
//       </figcaption>
//     </figure>

//     <div class="card">
//       <p class="card__title">Video demo</p>
//       <p class="card__body">In a real product, you’d host this yourself. Here we show correct markup.</p>
//       <video class="card__video" controls muted playsinline>
//         <source src="/roadmap-demos/css-grid-cursor.mp4" type="video/mp4" />
//         Sorry—your browser can’t play this video.
//       </video>
//     </div>
//   </section>
// </main>`,
//     css: `:root{
//   --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
//   --brand:#00ff96; --border:rgba(230,240,255,.14); --r:18px;
// }
// *{box-sizing:border-box}
// body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
// .page{max-width:1100px;margin:0 auto;padding:26px 16px 48px}
// .hero{
//   display:grid;gap:16px;
//   grid-template-columns:1fr;
//   border:1px solid var(--border);
//   background:linear-gradient(135deg, rgba(0,255,150,.10), transparent 50%), var(--panel);
//   border-radius:var(--r);
//   padding:16px;
// }
// .hero__title{margin:0 0 6px;font-size:34px}
// .hero__subtitle{margin:0 0 12px;color:var(--muted)}
// .btn{
//   display:inline-flex;align-items:center;justify-content:center;
//   padding:10px 14px;border-radius:12px;font-weight:900;
//   background:var(--brand);color:#00120b;text-decoration:none;
// }
// .btn:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}
// .hero__img{
//   width:100%;height:260px;object-fit:cover;border-radius:14px;border:1px solid rgba(230,240,255,.12);
// }
// .grid{margin-top:18px;display:grid;grid-template-columns:1fr;gap:16px}
// .card{border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--r);overflow:hidden}
// .card__img{width:100%;height:220px;object-fit:cover;display:block}
// .card__cap{padding:12px 14px;color:var(--muted);font-size:13px}
// .card__title{margin:0;padding:14px 14px 0;font-weight:900}
// .card__body{margin:0;padding:6px 14px 12px;color:var(--muted)}
// .card__video{width:100%;display:block;border-top:1px solid rgba(230,240,255,.10)}
// @media (min-width: 900px){
//   .hero{grid-template-columns:1.1fr .9fr;align-items:center}
//   .hero__img{height:320px}
//   .grid{grid-template-columns:1fr 1fr}
// }
// @media (prefers-reduced-motion: reduce){
//   *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
// }`,
//   },
// };

export const day04 = {
  day: 4,
  title: "Day 4: Images + Media That Don’t Break (Alt Text, Responsive, Video)",
  intro:
    "You’ll ship media like a pro: meaningful alt text, responsive images, safe aspect ratios, and accessible video/audio patterns—without layout jumps.",
  aiSession: {
    enabled: true,
    steps: [
      {
        "type": "talk",
        "message": "Day 4. Media. Images convey meaning. If you don't describe that meaning in `alt` text, you are hiding content."
      },
      {
        "type": "challenge",
        "instruction": "This image is informative (a chart) but has generic alt text. Fix it to describe the content.",
        "buggyCode": "<!-- ❌ Useless alt -->\n<img src=\"chart.png\" alt=\"image\" />",
        "solutionCode": "<!-- ✅ Descriptive -->\n<img src=\"chart.png\" alt=\"Sales chart showing 20% growth in Q4\" />",
        "verifyOutput": "Sales chart",
        "successMessage": "Much better. Use empty alt (`alt=''`) for decoration, but descriptive text for data/content.",
        "hint": "Change `alt='image'` to something descriptive."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Media is a UX trap: broken layouts, missing alt text, autoplay chaos. Professionals treat media as content + performance + accessibility.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Alt text</span>: describe purpose, not pixels. Decorative images use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">alt=""</code>.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Aspect ratio</span>: prevent layout shift with CSS <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">aspect-ratio</code>.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Responsive images</span>: use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">srcset</code> and <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">sizes</code> when you have multiple assets.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Video</span>: avoid autoplay; include controls; consider captions (outside this sandbox).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Small demo (working first)</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
You’ll build a responsive “project card” grid with images that never stretch and a video section with safe defaults.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided steps</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Resize the viewport: images must crop nicely, not distort.</li>
  <li>Confirm decorative icon uses empty alt, while content image has meaningful alt.</li>
  <li>Ensure video has controls and doesn’t autoplay.</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Add a “hero image” with <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">loading="lazy"</code> for below-the-fold media.</li>
  <li>Add a figure caption using <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">&lt;figure&gt;</code> / <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">&lt;figcaption&gt;</code>.</li>
  <li>Add a placeholder background for missing images (graceful failure).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Common mistakes (and fixes)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> alt text like “image1”. <span class="text-green-300 font-bold">Fix:</span> describe what the image adds to the page.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> stretched images. <span class="text-green-300 font-bold">Fix:</span> <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">object-fit: cover</code>.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mistake:</span> layout shift from unknown sizes. <span class="text-green-300 font-bold">Fix:</span> reserve space with aspect ratio.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Checkpoints (auto-check)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Images never look squished at any width.</li>
  <li>Every meaningful image has meaningful alt; decorative images have <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">alt=""</code>.</li>
  <li>Video does not autoplay and has controls.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
<p class="text-gray-600 dark:text-light-300">Tomorrow: lists, tables, and “data UI” semantics.</p>
`,
  sandbox: {
    html: `<!-- Day 4: media patterns -->
<main class="page">
  <header class="hero">
    <div class="hero__badge">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18'%3E%3Ccircle cx='9' cy='9' r='8' fill='%2300ff96'/%3E%3C/svg%3E" alt="" />
      Media module
    </div>
    <h1 class="hero__title">Responsive Media</h1>
    <p class="hero__subtitle">Alt text + aspect ratio + safe video defaults.</p>
  </header>

  <section class="grid" aria-label="Project cards">
    <article class="card">
      <figure class="media">
        <img
          class="media__img"
          alt="A dark dashboard UI with green accents and a progress chart"
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=60"
          loading="lazy"
        />
        <figcaption class="media__caption">Project dashboard</figcaption>
      </figure>
      <h2 class="card__title">Dashboard UI</h2>
      <p class="card__body">Images crop, never stretch. Space is reserved to avoid layout shift.</p>
    </article>

    <article class="card">
      <figure class="media">
        <img
          class="media__img"
          alt="A laptop on a desk showing code on screen"
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60"
          loading="lazy"
        />
        <figcaption class="media__caption">Coding setup</figcaption>
      </figure>
      <h2 class="card__title">Developer workflow</h2>
      <p class="card__body">Use meaningful alt text. Decorative icons get empty alt.</p>
    </article>
  </section>

  <section class="video" aria-labelledby="vid-title">
    <h2 id="vid-title" class="video__title">Video (safe defaults)</h2>
    <p class="video__hint">In production: add captions; avoid autoplay.</p>
    <div class="video__frame">
      <video controls playsinline muted preload="metadata">
        <source src="/roadmap-demos/css-grid-cursor.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>
    </div>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:1100px;margin:0 auto;padding:26px 16px 48px}
.hero{border:1px solid var(--border);background:linear-gradient(135deg, rgba(0,255,150,.10), transparent 45%), var(--panel);border-radius:var(--r);padding:18px}
.hero__badge{display:inline-flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;border:1px solid rgba(0,255,150,.35);background:rgba(0,255,150,.12);color:var(--brand);font-weight:900;font-size:12px;letter-spacing:.12em;text-transform:uppercase}
.hero__title{margin:12px 0 6px;font-size:34px}
.hero__subtitle{margin:0;color:var(--muted)}

.grid{display:grid;grid-template-columns:1fr;gap:16px;margin-top:18px}
.card{border:1px solid var(--border);background:rgba(0,0,0,.18);border-radius:var(--r);padding:14px}
.card__title{margin:12px 0 6px}
.card__body{margin:0;color:var(--muted)}

.media{margin:0;border-radius:14px;overflow:hidden;border:1px solid rgba(230,240,255,.12)}
.media__img{
  width:100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display:block;
  background: rgba(255,255,255,.06);
}
.media__caption{padding:10px 10px;color:var(--muted);font-size:13px;background:rgba(0,0,0,.25)}

.video{margin-top:18px;border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:14px}
.video__title{margin:0 0 6px}
.video__hint{margin:0 0 12px;color:var(--muted)}
.video__frame{border-radius:14px;overflow:hidden;border:1px solid rgba(230,240,255,.12);background:#000}
.video__frame video{width:100%;height:auto;display:block}

@media (min-width: 900px){
  .grid{grid-template-columns:repeat(2, minmax(0, 1fr))}
}
@media (prefers-reduced-motion: reduce){
  *{transition:none!important;animation:none!important}
}`,
  },
};
