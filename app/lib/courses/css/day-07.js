export default {
  day: 7,
  title: "CSS Grid Layout",
  subtitle: "The Modern 2D Layout System",
  intro: "Master CSS Grid, the most powerful layout system in CSS. Learn every property with visual examples.",
  duration: "35 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Grid is a **2D layout system**—you control rows **and** columns. Flexbox is 1D (row **or** column). When do you use Grid vs. Flexbox?"
      },
      {
        type: "challenge",
        task: "Fix this grid so the header and footer span all columns using `grid-column: span 3`.",
        buggyCode: `.grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.header { background: red; }`,
        solutionCode: `.grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.header { background: red; grid-column: span 3; }`,
        verifyOutput: (code) => code.includes("grid-column") && code.includes("span"),
        successMessage: "Perfect! `grid-column: span 3` makes an item span across 3 columns. This is how you create full-width headers/footers in a grid.",
        hint: "Use `grid-column: span 3` on the header class."
      }
    ]
  },

  content: `
<h2>Why Grid?</h2>
<p>CSS Grid is the <strong>most powerful layout system</strong> in CSS. Unlike Flexbox (which is 1-dimensional), Grid lets you control both rows and columns simultaneously.</p>

<h3>When to Use Grid vs Flexbox</h3>
<ul>
  <li><strong>Grid</strong>: Page layouts, card grids, dashboards, complex 2D layouts</li>
  <li><strong>Flexbox</strong>: Navigation bars, button groups, centering, 1D layouts</li>
</ul>

<h2>Core Concepts</h2>
<h3>1. Grid Container & Grid Items</h3>
<pre><code>.container {
  display: grid; /* Creates grid container */
}
/* All direct children become grid items */</code></pre>

<h3>2. The FR Unit</h3>
<p>The <code>fr</code> (fraction) unit represents a fraction of available space:</p>
<pre><code>grid-template-columns: 1fr 2fr 1fr;
/* Column 2 gets twice the space of columns 1 and 3 */</code></pre>

<h3>3. Grid Lines</h3>
<p>Grid creates numbered lines. A 3-column grid has 4 vertical lines (1, 2, 3, 4).</p>

<h2>Essential Properties</h2>
<p>Below you'll find visual examples for every major Grid property. Each example is interactive!</p>
  `,

  checkpoints: [
    {
      question: "What's the difference between Grid and Flexbox?",
      options: [
        "Grid is 2D (rows + columns), Flexbox is 1D (row or column)",
        "Grid is faster than Flexbox",
        "Flexbox is newer than Grid",
        "Grid doesn't work in older browsers"
      ],
      correct: 0,
      explanation: "Grid controls both rows and columns (2D). Flexbox controls either a row or a column (1D). Both have excellent browser support."
    },
    {
      question: "What does `1fr` mean?",
      options: [
        "1 pixel",
        "1 fraction of available space",
        "1 fixed ratio",
        "1 full row"
      ],
      correct: 1,
      explanation: "`fr` is the fraction unit. `1fr` means 'one fraction of the available space'. `1fr 2fr` means the second track gets twice the space."
    },
    {
      question: "How do you make an item span 3 columns?",
      options: [
        "width: 3;",
        "grid-column: span 3;",
        "columns: 3;",
        "grid-span: 3;"
      ],
      correct: 1,
      explanation: "`grid-column: span 3` makes an item span across 3 columns. You can also use `grid-row: span 2` for rows."
    }
  ],

  recap: {
    takeaways: [
      "Grid is a 2D layout system (controls rows **and** columns).",
      "`fr` unit = fraction of available space. Use it instead of percentages.",
      "`grid-template-areas` creates semantic, visual layouts.",
      "`auto-fit` + `minmax()` = responsive grids without media queries.",
      "`gap` replaces margin hacks for spacing."
    ],
    commonMistakes: [
      "Using `px` everywhere instead of `fr` units.",
      "Forgetting `gap` and using margins on grid items.",
      "Not using `grid-template-areas` for page layouts.",
      "Overcomplicating with too many explicit rows/columns."
    ],
    nextActions: [
      "Build a Holy Grail layout (Header, Footer, Sidebar, Main) using `grid-template-areas`.",
      "Create a responsive card grid with `auto-fit` and `minmax()`.",
      "Day 8: Responsive Design patterns."
    ]
  },

  // Multiple visual examples for each Grid property
  propertyExamples: [
    {
      property: "display: grid",
      description: "Transforms an element into a grid container. All direct children become grid items.",
      html: `<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
</div>`,
      css: `.container {
  display: grid;
  background: #1a1a2e;
  padding: 20px;
  gap: 10px;
}
.item {
  background: #16213e;
  color: #00d4ff;
  padding: 20px;
  border: 2px solid #0f3460;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}`
    },
    {
      property: "grid-template-columns",
      description: "Defines the number and size of columns. You can use px, %, fr units, or keywords like auto, min-content, max-content.",
      html: `<div class="grid-cols">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
  <div class="box">6</div>
</div>`,
      css: `.grid-cols {
  display: grid;
  /* 3 equal columns using fr (fraction) */
  grid-template-columns: 1fr 1fr 1fr;
  /* Or shorthand: repeat(3, 1fr) */
  gap: 15px;
  background: #0f0f23;
  padding: 20px;
}
.box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}`
    },
    {
      property: "grid-template-rows",
      description: "Defines the number and size of rows. Works exactly like grid-template-columns but for rows.",
      html: `<div class="grid-rows">
  <div class="row-item">Row 1 (100px)</div>
  <div class="row-item">Row 2 (auto)</div>
  <div class="row-item">Row 3 (2fr)</div>
</div>`,
      css: `.grid-rows {
  display: grid;
  grid-template-rows: 100px auto 2fr;
  height: 400px;
  gap: 10px;
  background: #1a1a2e;
  padding: 20px;
}
.row-item {
  background: #e94560;
  color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}`
    },
    {
      property: "gap (grid-gap)",
      description: "Sets the spacing between grid items. Can use 'gap' for both rows and columns, or 'row-gap' and 'column-gap' separately.",
      html: `<div class="grid-gap">
  <div class="gap-box">No Gap</div>
  <div class="gap-box">Between</div>
  <div class="gap-box">These</div>
  <div class="gap-box">Items</div>
</div>`,
      css: `.grid-gap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* row-gap and column-gap */
  gap: 20px 30px; /* row column */
  /* Or use: row-gap: 20px; column-gap: 30px; */
  background: #2d3561;
  padding: 25px;
}
.gap-box {
  background: #c94b4b;
  color: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}`
    },
    {
      property: "fr unit (fractional unit)",
      description: "The 'fr' unit represents a fraction of available space. 1fr 2fr means the second column gets twice the space of the first.",
      html: `<div class="grid-fr">
  <div class="fr-item">1fr</div>
  <div class="fr-item">2fr</div>
  <div class="fr-item">1fr</div>
</div>`,
      css: `.grid-fr {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 15px;
  background: #0f0f23;
  padding: 20px;
}
.fr-item {
  background: linear-gradient(to right, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}`
    },
    {
      property: "grid-template-areas",
      description: "Create named grid areas for a visual, semantic layout. Perfect for page layouts like header, sidebar, content, footer.",
      html: `<div class="grid-areas">
  <header class="area-header">Header</header>
  <aside class="area-sidebar">Sidebar</aside>
  <main class="area-content">Main Content</main>
  <footer class="area-footer">Footer</footer>
</div>`,
      css: `.grid-areas {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  gap: 15px;
  height: 400px;
  background: #1a1a2e;
  padding: 20px;
}
.area-header { grid-area: header; background: #e94560; }
.area-sidebar { grid-area: sidebar; background: #0f3460; }
.area-content { grid-area: content; background: #16213e; }
.area-footer { grid-area: footer; background: #533483; }
.grid-areas > * {
  color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}`
    },
    {
      property: "grid-column / grid-row",
      description: "Control how many columns or rows an item spans. Use 'span' keyword or start/end line numbers.",
      html: `<div class="grid-span">
  <div class="span-item span-wide">Spans 2 Columns</div>
  <div class="span-item">Normal</div>
  <div class="span-item">Normal</div>
  <div class="span-item span-tall">Spans 2 Rows</div>
  <div class="span-item">Normal</div>
</div>`,
      css: `.grid-span {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  background: #0f0f23;
  padding: 20px;
}
.span-item {
  background: #4a5568;
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.span-wide {
  grid-column: span 2; /* Spans 2 columns */
  background: #48bb78;
}
.span-tall {
  grid-row: span 2; /* Spans 2 rows */
  background: #ed8936;
}`
    },
    {
      property: "justify-items & align-items",
      description: "Align grid items within their cells. justify-items (horizontal), align-items (vertical). Values: start, end, center, stretch.",
      html: `<div class="grid-align">
  <div class="align-box">Center</div>
  <div class="align-box">Aligned</div>
  <div class="align-box">Items</div>
  <div class="align-box">Grid</div>
</div>`,
      css: `.grid-align {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  height: 300px;
  background: #2d3748;
  padding: 20px;
  /* Center items both horizontally and vertically */
  justify-items: center;
  align-items: center;
}
.align-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 40px;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}`
    },
    {
      property: "auto-fit & auto-fill",
      description: "Create responsive grids without media queries! auto-fit collapses empty tracks, auto-fill keeps them.",
      html: `<div class="grid-auto">
  <div class="auto-card">1</div>
  <div class="auto-card">2</div>
  <div class="auto-card">3</div>
  <div class="auto-card">4</div>
  <div class="auto-card">5</div>
</div>`,
      css: `.grid-auto {
  display: grid;
  /* Responsive: min 150px, max 1fr per column */
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  /* Try auto-fill to see the difference */
  gap: 20px;
  background: #1a202c;
  padding: 20px;
}
.auto-card {
  background: linear-gradient(to bottom right, #f093fb, #f5576c);
  color: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 10px 15px rgba(0,0,0,0.2);
}`
    },
    {
      property: "minmax()",
      description: "Define a size range for tracks. minmax(min, max) ensures tracks are at least 'min' and at most 'max'.",
      html: `<div class="grid-minmax">
  <div class="minmax-item">Min: 100px</div>
  <div class="minmax-item">Max: 1fr</div>
  <div class="minmax-item">Flexible</div>
</div>`,
      css: `.grid-minmax {
  display: grid;
  /* Each column: minimum 100px, maximum 1fr */
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  gap: 15px;
  background: #1a1a2e;
  padding: 20px;
}
.minmax-item {
  background: #e94560;
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}`
    }
  ],

  sandbox: {
    html: `<main class="page">
  <header class="topbar">Topbar</header>
  <aside class="sidebar">Sidebar</aside>
  <section class="content">
    <h2>Content Area</h2>
    <div class="cards">
      <div class="card">Card</div>
      <div class="card">Card</div>
      <div class="card">Card</div>
      <div class="card">Card</div>
    </div>
  </section>
  <footer class="footer">Footer</footer>
</main>`,
    css: `:root{
  --bg:#0b1220; --panel:#111a2c; --text:#e6f0ff; --muted:rgba(230,240,255,.72);
  --brand:#00ff96; --border:rgba(230,240,255,.14); --r:16px;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui}
.page{
  min-height:100vh;
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  gap:12px;
  padding:12px;
}
.topbar,.sidebar,.content,.footer{
  border:1px solid var(--border);
  background:rgba(0,0,0,.18);
  border-radius:14px;
  padding:14px;
}
.cards{display:grid;grid-template-columns:1fr;gap:12px}
.card{border:1px solid rgba(230,240,255,.12);border-radius:14px;padding:14px;background:rgba(255,255,255,.04);color:var(--muted)}
@media (min-width: 980px){
  .page{
    grid-template-columns: 280px minmax(0, 1fr);
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "topbar topbar"
      "sidebar content"
      "footer footer";
  }
  .topbar{grid-area:topbar}
  .sidebar{grid-area:sidebar;position:sticky;top:12px;height:fit-content}
  .content{grid-area:content}
  .footer{grid-area:footer}
  .cards{grid-template-columns:repeat(2, minmax(0, 1fr))}
}`
  }
};
