// export const day05 = {
//   day: 5,
//   title: "Day 5: Tables (When to Use Them, How to Make Them Readable + Accessible)",
//   intro:
//     "Tables are not for layout—they’re for data. Today you’ll build accessible, scannable tables using the correct semantics (caption, thead/tbody, th scope).",
//   content: `
// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Outcomes</h3>
// <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
//   <li>You can tell when a table is appropriate vs when it’s not.</li>
//   <li>You can build tables with <span class="text-yellow-600 dark:text-yellow-400 font-bold">caption</span>, <span class="text-yellow-600 dark:text-yellow-400 font-bold">thead/tbody</span>, and proper headers.</li>
//   <li>You can make tables usable on small screens without breaking semantics.</li>
// </ul>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
// <p class="text-gray-600 dark:text-light-300 mb-6">
// In real products, tables appear everywhere (pricing, admin panels, analytics). If the markup is wrong, screen readers announce nonsense
// and users can’t understand relationships between cells.
// </p>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The non-negotiable semantics</h3>
// <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
//   <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">&lt;caption&gt;</code>: what this table represents.</li>
//   <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">&lt;th scope="col"&gt;</code> for column headers, <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">scope="row"</code> for row headers.</li>
//   <li>Use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">thead</code>/<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">tbody</code> for structure.</li>
// </ul>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Responsive approach</h3>
// <p class="text-gray-600 dark:text-light-300 mb-6">
// Don’t destroy tables into divs on mobile. A safe baseline is horizontal scrolling (with a clear container) so semantics remain intact.
// </p>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided practice</h3>
// <ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
//   <li>Add a <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">caption</code> describing the table.</li>
//   <li>Make the first column a row header (<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">th scope="row"</code>).</li>
//   <li>Wrap the table in a scroll container for small screens.</li>
// </ol>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Junior vs Senior</h3>
// <p class="text-gray-600 dark:text-light-300 mb-6">
// Junior tables “look right” visually. Senior tables are readable in every mode: zoomed, keyboard, screen reader, small screens.
// </p>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Common mistakes</h3>
// <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
//   <li>Using tables for layout (use CSS Grid/Flexbox instead).</li>
//   <li>Missing caption and headers.</li>
//   <li>Using <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">td</code> for header cells.</li>
// </ul>

// <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Next steps</h3>
// <p class="text-gray-600 dark:text-light-300">
// Tomorrow: semantic composition—article/section/aside, and how to design page structure that scales.
// </p>
// `,
//   comparison: {
//     junior: `<!-- ❌ Junior: no structure -->
// <table>
//   <tr><td>Plan</td><td>Price</td></tr>
//   <tr><td>Pro</td><td>$19</td></tr>
// </table>`,
//     senior: `<!-- ✅ Senior: accessible data table -->
// <div class="table-wrap" role="region" aria-label="Pricing comparison" tabindex="0">
//   <table>
//     <caption>Pricing comparison by plan</caption>
//     <thead>
//       <tr>
//         <th scope="col">Plan</th>
//         <th scope="col">Price</th>
//         <th scope="col">Includes</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <th scope="row">Pro</th>
//         <td>$19</td>
//         <td>Roadmap + projects</td>
//       </tr>
//     </tbody>
//   </table>
// </div>`,
//   },
//   checkpoints: [
//     {
//       prompt: "What is the correct purpose of <caption>?",
//       options: [
//         "To style table borders",
//         "To describe the table’s meaning to users (including screen readers)",
//         "To create a table header row automatically",
//         "To increase SEO ranking directly",
//       ],
//       correctIndex: 1,
//       explanation:
//         "Caption provides a description/context for the table so users understand what it represents.",
//     },
//     {
//       prompt: "Which is the correct way to mark column headers?",
//       options: ["<td>", "<th scope='col'>", "<th scope='row'>", "<header>"],
//       correctIndex: 1,
//       explanation:
//         "Column headers should be <th scope='col'>. Row headers use scope='row'.",
//     },
//     {
//       prompt: "What is a safe mobile strategy for tables without breaking semantics?",
//       options: [
//         "Convert the table to divs",
//         "Remove the table and show nothing",
//         "Wrap it in a horizontally scrollable container with clear affordance",
//         "Use position: absolute everywhere",
//       ],
//       correctIndex: 2,
//       explanation:
//         "Scrolling containers preserve table semantics and keep data relationships intact.",
//     },
//   ],
//   recap: {
//     takeaways: [
//       "Tables are for data relationships, not layout.",
//       "Use caption + thead/tbody + th scope for accessible structure.",
//       "Make tables responsive via scroll containers, not div conversions.",
//     ],
//     commonMistakes: [
//       "Tables used as layout grids.",
//       "Missing headers/caption.",
//       "Unreadable tables on mobile due to no overflow strategy.",
//     ],
//     nextActions: [
//       "Add a caption that explains the dataset in one sentence.",
//       "Convert first column to row headers with th scope='row'.",
//       "Day 6: semantic composition for scalable page structure.",
//     ],
//   },
//   sandbox: {
//     html: `<!-- Day 5 sandbox: pricing table -->
// <main class="page">
//   <h1 class="title">Pricing Table</h1>
//   <p class="subtitle">Accessible structure + scannable design.</p>

//   <div class="table-wrap" role="region" aria-label="Pricing comparison table" tabindex="0">
//     <table class="table">
//       <caption class="table__caption">Pricing comparison by plan (monthly)</caption>
//       <thead>
//         <tr>
//           <th scope="col">Plan</th>
//           <th scope="col">Price</th>
//           <th scope="col">Best for</th>
//           <th scope="col">Includes</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th scope="row">Free</th>
//           <td>$0</td>
//           <td>Trying the platform</td>
//           <td>Basic tutorials</td>
//         </tr>
//         <tr class="table__row--highlight">
//           <th scope="row">Pro</th>
//           <td>$19</td>
//           <td>Career switching</td>
//           <td>Roadmap + projects</td>
//         </tr>
//         <tr>
//           <th scope="row">Team</th>
//           <td>$49</td>
//           <td>Teams</td>
//           <td>Dashboards + reporting</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// </main>`,
//     css: `:root{
//   --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
//   --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
// }
// *{box-sizing:border-box}
// body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
// .page{max-width:1100px;margin:0 auto;padding:26px 16px 48px}
// .title{margin:0 0 6px}
// .subtitle{margin:0 0 16px;color:var(--muted)}

// .table-wrap{
//   border:1px solid var(--border);
//   background:rgba(0,0,0,.18);
//   border-radius:var(--r);
//   overflow:auto;
//   box-shadow: 0 18px 50px rgba(0,0,0,.35);
// }
// .table-wrap:focus-visible{outline:3px solid rgba(0,255,150,.5);outline-offset:3px}

// .table{width:100%;border-collapse:separate;border-spacing:0;min-width:720px}
// .table__caption{
//   text-align:left;
//   padding:14px 14px;
//   color:var(--muted);
//   font-weight:800;
// }
// th,td{padding:12px 14px;border-top:1px solid rgba(230,240,255,.10);text-align:left;vertical-align:top}
// thead th{border-top:0;color:var(--text);font-size:13px;letter-spacing:.12em;text-transform:uppercase}
// tbody th{font-weight:900}
// .table__row--highlight{background:rgba(0,255,150,.06)}
// @media (prefers-reduced-motion: no-preference){
//   tbody tr{transition:background .15s ease}
//   tbody tr:hover{background:rgba(255,255,255,.04)}
// }`,
//   },
// };

export const day05 = {
  day: 5,
  title: "Day 5: Lists + Tables (Data UI With Correct Semantics)",
  intro:
    "You’ll build data UI the right way: lists for collections, tables for relationships—plus captions, scopes, and accessible patterns.",
  aiSession: {
    enabled: true,
    steps: [
      {
        "type": "talk",
        "message": "Day 5. Tables. Tables are not for layout. They are for *data*. And data needs headers."
      },
      {
        "type": "challenge",
        "instruction": "This table is inaccessible because it uses `td` for headers. Change the header cells to `th` and add `scope`.",
        "buggyCode": "<!-- ❌ No semantics -->\n<tr><td>Name</td><td>Age</td></tr>",
        "solutionCode": "<!-- ✅ Scoped headers -->\n<tr><th scope=\"col\">Name</th><th scope=\"col\">Age</th></tr>",
        "verifyOutput": "scope=\"col\"",
        "successMessage": "Correct. `th` with `scope` tells screen readers exactly how to read the data cell by cell.",
        "hint": "Change `<td>` to `<th scope='col'>`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Problem framing</h3>
<p class="text-gray-600 dark:text-light-300 mb-6">
Developers often misuse tables for layout or avoid tables entirely. The rule: use tables only when data is relational (rows/columns).
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Lists</span>: navigation menus, feature sets, steps, tags.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Tables</span>: comparisons, pricing matrices, schedules, stats.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Caption</span>: describe what the table represents.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Headers</span>: <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">&lt;th scope="col|row"&gt;</code> enables correct reading.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guided steps</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Confirm the table has a caption and column headers.</li>
  <li>Ensure the comparison is not built with divs; use table semantics.</li>
  <li>Make the table horizontally scrollable on small screens (CSS).</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Practice tasks</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Add a row header (<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">scope="row"</code>) for each feature.</li>
  <li>Add a summary paragraph above the table explaining how to read it.</li>
  <li>Add zebra striping using CSS (no extra markup).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Common mistakes</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Using tables for layout.</li>
  <li>Missing <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">&lt;caption&gt;</code> and header scopes.</li>
  <li>Tables that overflow mobile without scroll.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Checkpoints</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Table has caption + th scope.</li>
  <li>Mobile view: table can scroll horizontally without breaking layout.</li>
  <li>Lists are used for collections/menus.</li>
</ul>
`,
  sandbox: {
    html: `<!-- Day 5: lists + tables -->
<main class="page">
  <header class="header">
    <h1 class="title">Plans & Features</h1>
    <p class="subtitle">Lists for collections. Tables for relational comparisons.</p>
  </header>

  <section class="panel">
    <h2 class="panel__title">What you get</h2>
    <ul class="feature-list">
      <li class="feature-list__item">Semantic components</li>
      <li class="feature-list__item">Accessible patterns</li>
      <li class="feature-list__item">Performance-aware UI</li>
    </ul>
  </section>

  <section class="panel">
    <h2 class="panel__title">Comparison</h2>
    <p class="hint">Tip: This is relational data (features × plans), so a table is correct.</p>

    <div class="table-wrap">
      <table class="table">
        <caption class="table__caption">
          Plan comparison: which features are included in each plan.
        </caption>
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">Free</th>
            <th scope="col">Pro</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Daily challenges</th>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <th scope="row">Skill tree roadmap</th>
            <td>—</td>
            <td>✓</td>
          </tr>
          <tr>
            <th scope="row">Certificates</th>
            <td>—</td>
            <td>✓</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{max-width:980px;margin:0 auto;padding:26px 16px 48px}
.title{margin:0 0 6px}
.subtitle{margin:0 0 18px;color:var(--muted)}
.panel{border:1px solid var(--border);background:var(--panel);border-radius:var(--r);padding:16px;margin-top:14px}
.panel__title{margin:0 0 10px}
.hint{margin:0 0 10px;color:var(--muted)}

.feature-list{margin:0;padding-left:18px;color:var(--text)}
.feature-list__item{margin:6px 0;color:var(--muted)}

.table-wrap{
  overflow-x:auto;
  border-radius:14px;
  border:1px solid rgba(230,240,255,.12);
  background: rgba(0,0,0,.18);
}
.table{width:100%;border-collapse:collapse;min-width:560px}
.table__caption{caption-side:top;text-align:left;padding:12px 12px;color:var(--muted)}
.table th,.table td{padding:12px;border-top:1px solid rgba(230,240,255,.10);text-align:left}
.table thead th{border-top:0;color:var(--text)}
.table tbody tr:nth-child(odd){background:rgba(255,255,255,.03)}
.table td{color:var(--muted)}
`,
  },
};
