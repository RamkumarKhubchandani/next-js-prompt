export const layoutQuestions = [
    {
        id: 'css-layout-1',
        category: 'Modern Layout',
        difficulty: 'Easy',
        question: 'How do you center a div horizontally and vertically?',
        answer: `**The modern "Holy Grail" solutions:**

1. **Flexbox:**
   - \`display: flex;\`
   - \`justify-content: center;\` (Main axis)
   - \`align-items: center;\` (Cross axis)

2. **Grid:**
   - \`display: grid;\`
   - \`place-items: center;\` (Short for justify/align items)

3. **Absolute Positioning (Legacy/Overlay):**
   - \`top: 50%; left: 50%; translate: -50% -50%;\`
   - Good for overlays/modals, bad for flow.`,
        codeExample: `<style>
  .container {
    height: 150px;
    background: #f0f0f0;
    margin-bottom: 20px;
  }
  
  .box {
    width: 50px; height: 50px;
    background: coral;
  }
  
  /* 1. Flex */
  .center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* 2. Grid */
  .center-grid {
    display: grid;
    place-items: center;
  }
</style>

<h3>Flexbox Center</h3>
<div class="container center-flex">
  <div class="box"></div>
</div>

<h3>Grid Center (Simplest)</h3>
<div class="container center-grid">
  <div class="box"></div>
</div>`
    },
    {
        id: 'css-layout-2',
        category: 'Modern Layout',
        difficulty: 'Medium',
        question: 'Difference between Grid and Flexbox?',
        answer: `**One-dimensional vs Two-dimensional.**

**Flexbox (1D):**
- Layout in a **single direction** (Row OR Column).
- Content-first (items push layout).
- Use for: Navbars, card grouping, alignments.

**CSS Grid (2D):**
- Layout in **two directions** (Rows AND Columns).
- Layout-first (define structure, place items).
- Use for: Entire page layouts, complex galleries.

**Overlap:**
- They work great together (Grid for shell, Flex for components inside).`,
        codeExample: `<style>
  .wrapper { display: grid; gap: 20px; }
  .item { background: lightblue; padding: 10px; border: 1px solid blue; }
  
  /* Grid: Explicit Matrix */
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 2fr; /* Col 2 is double width */
    grid-template-rows: 50px 100px;
  }
  
  /* Flex: Linear Flow */
  .flex-layout {
    display: flex;
    gap: 10px;
    flex-wrap: wrap; /*Wrap if needed, but still 1D flow*/
  }
  .flex-layout .item { flex: 1; }
</style>

<h3>Grid (Precise 2D Slots)</h3>
<div class="grid-layout">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>

<h3>Flex (Fluid Flow)</h3>
<div class="flex-layout">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>`
    },
    {
        id: 'css-layout-3',
        category: 'Modern Layout',
        difficulty: 'Medium',
        question: 'Explain the "flex-grow", "flex-shrink", and "flex-basis" properties.',
        answer: `**The shorthand \`flex: grow shrink basis\` controls sizing.**

1. **flex-grow:**
   - "How much extra space do I take?"
   - 0 = Don't grow. 1 = Share space equally.
2. **flex-shrink:**
   - "How much do I shrink if space is tight?"
   - 1 = Normal shrink. 0 = Don't shrink (rigid).
3. **flex-basis:**
   - "What is my ideal starting size?"
   - \`auto\` (content size) or \`200px\`.

**Common Shorthands:**
- \`flex: 1\` -> \`1 1 0%\` (Grow, Shrink, Start from 0)
- \`flex: initial\` -> \`0 1 auto\` (Don't grow, Shrink, Auto size)`,
        codeExample: `<style>
  .row { display: flex; gap: 10px; margin-bottom: 10px; border: 1px solid black; }
  .box { padding: 10px; text-align: center; }
  
  /* Will not grow, keeps natural size */
  .static { background: #ccc; flex: 0 0 auto; }
  
  /* Will grow to fill space */
  .grow { background: lightgreen; flex: 1; }
  
  /* Will grow twice as fast */
  .grow-2 { background: lightblue; flex: 2; }
</style>

<div class="row">
  <div class="box static">Nav</div>
  <div class="box grow">Main (flex: 1)</div>
  <div class="box static">Sidebar</div>
</div>

<div class="row">
  <div class="box grow">1 Part</div>
  <div class="box grow-2">2 Parts (Twice width)</div>
</div>`
    },
    {
        id: 'css-layout-4',
        category: 'Modern Layout',
        difficulty: 'Hard',
        question: 'What is "subgrid" and why is it useful?',
        answer: `**Subgrid allows child grids to inherit the track definition of their parent.**

**Problem:** Nested grids usually start a *new* grid context, misaligning with the outer layout.
**Solution:** \`grid-template-columns: subgrid;\` locks nested items to the parent's grid lines.

**Use Case:**
- Cards in a row where titles/footers need to align perfectly across different cards, regardless of content length.`,
        codeExample: `<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  .card {
    background: #eee;
    padding: 10px;
    display: grid;
    /* The Magic: Inherit parent's row sizing logic */
    grid-template-rows: subgrid; 
    grid-row: span 3; /* Title, Body, Footer */
  }
  
  /* Only Firefox supports subgrid fully in 2023, widely available in 2024+ */
</style>

<!-- Demonstration of concept (Might be limited in some legacy views) -->
<p>Note: Requires modern browser (Chrome 117+, Firefox).</p>
<div class="grid">
  <div class="card">
    <h3>Title</h3>
    <p>Short content.</p>
    <button>Buy</button>
  </div>
  <div class="card">
    <h3>Title</h3>
    <p>Very long content that pushes the footer down. In standard grid, this misaligns the buttons. With subgrid, all buttons align.</p>
    <button>Buy</button>
  </div>
</div>`
    },
    {
        id: 'css-layout-5',
        category: 'Modern Layout',
        difficulty: 'Medium',
        question: 'How does "minmax()" work in Grid?',
        answer: `**It defines a size range for a grid track.**

**Syntax:** \`minmax(minimum, maximum)\`

**Common Pattern:** Responsive auto-fill.
- \`grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\`
- creates as many columns as fit (minimum 200px).
- If space remains, they stretch to share it (\`1fr\`).`,
        codeExample: `<style>
  .responsive-grid {
    display: grid;
    /* The Classic Responsive Grid Trick */
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    background: #333;
    padding: 10px;
  }
  .item {
    background: cyan;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="responsive-grid">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>

<p>Resize window to see items wrap automatically without media queries!</p>`
    }
];
