export const day03 = {
  day: 3,
  title: "Flexbox Layout",
  subtitle: "The 1D Layout Powerhouse",
  intro: "Master Flexbox - the most practical layout system for everyday UI. Learn every property with visual examples.",
  duration: "30 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Flexbox is **1-dimensional**—you control either a row **or** a column. Grid is 2D. When building a navbar, card row, or button group, Flexbox is your tool."
      },
      {
        type: "challenge",
        task: "Fix this navbar to be horizontal with 20px spacing using Flexbox.",
        buggyCode: `.nav {
  /* Items are stacked vertically */
}`,
        solutionCode: `.nav {
  display: flex;
  gap: 20px;
}`,
        verifyOutput: (code) => code.includes("display: flex") && code.includes("gap"),
        successMessage: "Perfect! `display: flex` creates a flex container. `gap` adds spacing between items without margin hacks.",
        hint: "Use `display: flex` and `gap: 20px`."
      }
    ]
  },

  content: `
<h2>Why Flexbox?</h2>
<p>Flexbox is the <strong>most practical layout system</strong> for everyday UI components like navbars, button groups, cards, and forms. It's 1-dimensional (controls either rows or columns) and excels at alignment and distribution.</p>

<h3>When to Use Flexbox vs Grid</h3>
<ul>
  <li><strong>Flexbox</strong>: Navigation bars, button groups, card rows, centering, 1D layouts</li>
  <li><strong>Grid</strong>: Page layouts, card grids, dashboards, complex 2D layouts</li>
</ul>

<h2>Core Concepts</h2>
<h3>1. Main Axis vs Cross Axis</h3>
<ul>
  <li><strong>Main Axis</strong>: The primary direction (horizontal for row, vertical for column)</li>
  <li><strong>Cross Axis</strong>: Perpendicular to main axis</li>
  <li><code>justify-content</code>: Aligns along main axis</li>
  <li><code>align-items</code>: Aligns along cross axis</li>
</ul>

<h3>2. Flex Container vs Flex Items</h3>
<pre><code>.container {
  display: flex; /* Creates flex container */
}
/* All direct children become flex items */</code></pre>

<h2>Essential Properties</h2>
<p>Below you'll find visual examples for every major Flexbox property. Each example is interactive!</p>
  `,

  checkpoints: [
    {
      question: "What's the difference between justify-content and align-items?",
      options: [
        "justify-content aligns along main axis, align-items aligns along cross axis",
        "They do the same thing",
        "justify-content is for Grid only",
        "align-items is deprecated"
      ],
      correct: 0,
      explanation: "justify-content controls alignment along the main axis (horizontal for row). align-items controls alignment along the cross axis (vertical for row)."
    },
    {
      question: "What does 'flex: 1' do?",
      options: [
        "Sets width to 1px",
        "Makes the item grow to fill available space",
        "Sets flex-direction to 1",
        "Creates 1 column"
      ],
      correct: 1,
      explanation: "`flex: 1` is shorthand for `flex-grow: 1; flex-shrink: 1; flex-basis: 0`. It makes items grow equally to fill available space."
    },
    {
      question: "How do you center an item both horizontally and vertically in Flexbox?",
      options: [
        "text-align: center",
        "justify-content: center; align-items: center;",
        "margin: auto",
        "position: absolute"
      ],
      correct: 1,
      explanation: "Use `justify-content: center` (main axis) and `align-items: center` (cross axis) on the flex container."
    }
  ],

  recap: {
    takeaways: [
      "Flexbox is 1-dimensional (row **or** column).",
      "`gap` replaces margin hacks for spacing.",
      "`justify-content` = main axis, `align-items` = cross axis.",
      "`flex: 1` makes items grow equally.",
      "`flex-wrap: wrap` enables responsive layouts."
    ],
    commonMistakes: [
      "Using margins instead of `gap`.",
      "Confusing `justify-content` and `align-items`.",
      "Forgetting `flex-wrap` for responsive layouts.",
      "Not using `min-width: 0` for text truncation."
    ],
    nextActions: [
      "Build a responsive navbar with logo, links, and button.",
      "Create a card grid that wraps nicely on mobile.",
      "Day 4: Typography systems."
    ]
  },

  propertyExamples: [
    {
      property: "display: flex",
      description: "Transforms an element into a flex container. All direct children become flex items arranged in a row by default.",
      html: `<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>`,
      css: `.container {
  display: flex;
  background: #1a1a2e;
  padding: 20px;
}
.item {
  background: #16213e;
  color: #00d4ff;
  padding: 20px;
  border: 2px solid #0f3460;
  border-radius: 8px;
  margin: 5px;
  font-weight: bold;
}`
    },
    {
      property: "flex-direction",
      description: "Defines the main axis direction. Values: row (default), row-reverse, column, column-reverse.",
      html: `<div class="flex-dir">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>`,
      css: `.flex-dir {
  display: flex;
  flex-direction: row; /* Try: column, row-reverse, column-reverse */
  gap: 10px;
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
      property: "justify-content",
      description: "Aligns items along the main axis. Values: flex-start, flex-end, center, space-between, space-around, space-evenly.",
      html: `<div class="justify">
  <div class="jbox">A</div>
  <div class="jbox">B</div>
  <div class="jbox">C</div>
</div>`,
      css: `.justify {
  display: flex;
  justify-content: space-between; /* Try: center, space-evenly, flex-end */
  gap: 10px;
  background: #1a1a2e;
  padding: 20px;
}
.jbox {
  background: #e94560;
  color: white;
  padding: 25px 35px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
}`
    },
    {
      property: "align-items",
      description: "Aligns items along the cross axis. Values: stretch (default), flex-start, flex-end, center, baseline.",
      html: `<div class="align">
  <div class="abox" style="height: 60px">Short</div>
  <div class="abox" style="height: 100px">Tall</div>
  <div class="abox" style="height: 80px">Medium</div>
</div>`,
      css: `.align {
  display: flex;
  align-items: center; /* Try: flex-start, flex-end, stretch */
  height: 200px;
  gap: 15px;
  background: #2d3561;
  padding: 20px;
}
.abox {
  background: #c94b4b;
  color: white;
  padding: 20px;
  border-radius: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}`
    },
    {
      property: "gap",
      description: "Sets spacing between flex items. Replaces margin hacks. Can use row-gap and column-gap separately.",
      html: `<div class="gap-demo">
  <div class="gbox">1</div>
  <div class="gbox">2</div>
  <div class="gbox">3</div>
  <div class="gbox">4</div>
</div>`,
      css: `.gap-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Spacing between all items */
  background: #0f0f23;
  padding: 20px;
}
.gbox {
  background: linear-gradient(to right, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 30px 40px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
}`
    },
    {
      property: "flex-wrap",
      description: "Controls whether items wrap to new lines. Values: nowrap (default), wrap, wrap-reverse.",
      html: `<div class="wrap">
  <div class="wbox">Item 1</div>
  <div class="wbox">Item 2</div>
  <div class="wbox">Item 3</div>
  <div class="wbox">Item 4</div>
  <div class="wbox">Item 5</div>
  <div class="wbox">Item 6</div>
</div>`,
      css: `.wrap {
  display: flex;
  flex-wrap: wrap; /* Try: nowrap to see overflow */
  gap: 15px;
  background: #1a1a2e;
  padding: 20px;
}
.wbox {
  background: #16213e;
  color: #00d4ff;
  padding: 20px 30px;
  border: 2px solid #0f3460;
  border-radius: 10px;
  font-weight: bold;
  min-width: 120px;
}`
    },
    {
      property: "flex-grow",
      description: "Controls how much an item grows relative to others. Default is 0 (don't grow). flex-grow: 1 means 'grow equally'.",
      html: `<div class="grow">
  <div class="grow-item" style="flex-grow: 1">flex-grow: 1</div>
  <div class="grow-item" style="flex-grow: 2">flex-grow: 2</div>
  <div class="grow-item" style="flex-grow: 1">flex-grow: 1</div>
</div>`,
      css: `.grow {
  display: flex;
  gap: 15px;
  background: #0f0f23;
  padding: 20px;
}
.grow-item {
  background: #48bb78;
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  /* flex-grow is set inline in HTML */
}`
    },
    {
      property: "flex-shrink",
      description: "Controls how much an item shrinks when space is limited. Default is 1 (can shrink). Set to 0 to prevent shrinking.",
      html: `<div class="shrink">
  <div class="shrink-item" style="flex-shrink: 0">No Shrink (flex-shrink: 0)</div>
  <div class="shrink-item" style="flex-shrink: 1">Can Shrink</div>
  <div class="shrink-item" style="flex-shrink: 1">Can Shrink</div>
</div>`,
      css: `.shrink {
  display: flex;
  gap: 10px;
  background: #2d3748;
  padding: 20px;
  width: 400px; /* Limited width to force shrinking */
}
.shrink-item {
  background: #ed8936;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
  white-space: nowrap;
}`
    },
    {
      property: "flex-basis",
      description: "Sets the initial size of a flex item before growing/shrinking. Like width, but respects flex-direction.",
      html: `<div class="basis">
  <div class="basis-item" style="flex-basis: 100px">100px</div>
  <div class="basis-item" style="flex-basis: 200px">200px</div>
  <div class="basis-item" style="flex-basis: auto">auto</div>
</div>`,
      css: `.basis {
  display: flex;
  gap: 15px;
  background: #1a202c;
  padding: 20px;
}
.basis-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  flex-grow: 0;
  flex-shrink: 0;
}`
    },
    {
      property: "flex (shorthand)",
      description: "Shorthand for flex-grow, flex-shrink, and flex-basis. 'flex: 1' = 'flex: 1 1 0' (grow, shrink, 0 basis).",
      html: `<div class="flex-short">
  <div class="fbox" style="flex: 1">flex: 1</div>
  <div class="fbox" style="flex: 2">flex: 2</div>
  <div class="fbox" style="flex: 1">flex: 1</div>
</div>`,
      css: `.flex-short {
  display: flex;
  gap: 15px;
  background: #0f0f23;
  padding: 20px;
}
.fbox {
  background: #e94560;
  color: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}`
    },
    {
      property: "align-self",
      description: "Overrides align-items for individual flex items. Values: auto, flex-start, flex-end, center, stretch.",
      html: `<div class="self">
  <div class="self-item">Normal</div>
  <div class="self-item" style="align-self: flex-start">flex-start</div>
  <div class="self-item" style="align-self: center">center</div>
  <div class="self-item" style="align-self: flex-end">flex-end</div>
</div>`,
      css: `.self {
  display: flex;
  align-items: stretch;
  height: 200px;
  gap: 15px;
  background: #1a1a2e;
  padding: 20px;
}
.self-item {
  background: #16213e;
  color: #00d4ff;
  padding: 20px;
  border: 2px solid #0f3460;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
}`
    },
    {
      property: "order",
      description: "Changes the visual order of flex items without changing HTML. Default is 0. Lower numbers appear first.",
      html: `<div class="order">
  <div class="order-item" style="order: 3">Third (order: 3)</div>
  <div class="order-item" style="order: 1">First (order: 1)</div>
  <div class="order-item" style="order: 2">Second (order: 2)</div>
</div>`,
      css: `.order {
  display: flex;
  gap: 15px;
  background: #2d3561;
  padding: 20px;
}
.order-item {
  background: #c94b4b;
  color: white;
  padding: 30px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
}`
    }
  ],

  sandbox: {
    html: `<nav class="navbar">
  <div class="logo">Logo</div>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  <button class="cta">Sign Up</button>
</nav>

<div class="cards">
  <div class="card">
    <h3>Card 1</h3>
    <p>Flexbox makes card layouts easy and responsive.</p>
  </div>
  <div class="card">
    <h3>Card 2</h3>
    <p>Items grow and shrink automatically.</p>
  </div>
  <div class="card">
    <h3>Card 3</h3>
    <p>No more float hacks or clearfix!</p>
  </div>
</div>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f0f23;
  color: white;
  padding: 20px;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  background: #1a1a2e;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #00d4ff;
}

.nav-links {
  display: flex;
  gap: 25px;
  list-style: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #00d4ff;
}

.cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 250px;
  background: #16213e;
  padding: 25px;
  border-radius: 12px;
  border: 2px solid #0f3460;
}

.card h3 {
  color: #00d4ff;
  margin-bottom: 10px;
}

.card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}`
  }
};

export default day03;
