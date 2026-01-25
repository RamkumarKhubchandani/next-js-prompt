export const day02 = {
  day: 2,
  title: "Box Model + Sizing",
  subtitle: "Understanding Margin, Padding, Border & Box-Sizing",
  intro: "Master the CSS Box Model - the foundation of all layout. Learn how margin, padding, border, and box-sizing work together.",
  duration: "30 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "The Box Model is **everything**. Every element is a box with content, padding, border, and margin. Understanding this prevents 99% of layout bugs."
      },
      {
        type: "challenge",
        task: "Fix this box so padding and border don't add to the width. Use box-sizing: border-box.",
        buggyCode: `.box {
  width: 200px;
  padding: 20px;
  border: 2px solid;
  /* Total width = 244px (200 + 40 + 4) */
}`,
        solutionCode: `.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 2px solid;
  /* Total width = 200px */
}`,
        verifyOutput: (code) => code.includes("box-sizing: border-box"),
        successMessage: "Perfect! box-sizing: border-box includes padding and border in the width. This is the modern standard.",
        hint: "Add `box-sizing: border-box` to the box."
      }
    ]
  },

  content: `
<h2>The Box Model</h2>
<p>Every HTML element is a rectangular box with four areas:</p>
<ol>
  <li><strong>Content</strong>: The actual content (text, images)</li>
  <li><strong>Padding</strong>: Space between content and border</li>
  <li><strong>Border</strong>: The border around padding</li>
  <li><strong>Margin</strong>: Space outside the border</li>
</ol>

<h3>Box-Sizing: The Game Changer</h3>
<ul>
  <li><code>content-box</code> (default): width/height applies to content only</li>
  <li><code>border-box</code> (recommended): width/height includes padding and border</li>
</ul>

<h2>The Universal Box-Sizing Fix</h2>
<pre><code>*, *::before, *::after {
  box-sizing: border-box;
}
/* Now width means total width! */</code></pre>

<h2>Margin Collapse</h2>
<p>Vertical margins between adjacent elements collapse to the larger value. This is intentional for typography spacing.</p>
  `,

  checkpoints: [
    {
      question: "What's the difference between padding and margin?",
      options: [
        "Padding is inside the border, margin is outside",
        "They're the same thing",
        "Padding is for text, margin is for boxes",
        "Margin is deprecated"
      ],
      correct: 0,
      explanation: "Padding is space between content and border (inside). Margin is space outside the border."
    },
    {
      question: "What does box-sizing: border-box do?",
      options: [
        "Removes borders",
        "Makes width/height include padding and border",
        "Makes boxes square",
        "Adds a border automatically"
      ],
      correct: 1,
      explanation: "border-box makes width/height include padding and border, making sizing predictable."
    },
    {
      question: "What is margin collapse?",
      options: [
        "Margins break the layout",
        "Vertical margins between elements merge to the larger value",
        "Margins don't work",
        "Margins become padding"
      ],
      correct: 1,
      explanation: "When two vertical margins touch, they collapse to the larger of the two values."
    }
  ],

  recap: {
    takeaways: [
      "Every element is a box: content + padding + border + margin.",
      "Always use `box-sizing: border-box` globally.",
      "Padding is inside, margin is outside the border.",
      "Vertical margins collapse between adjacent elements.",
      "`margin: auto` centers block elements horizontally."
    ],
    commonMistakes: [
      "Not using `box-sizing: border-box`.",
      "Confusing padding and margin.",
      "Not understanding margin collapse.",
      "Using negative margins without understanding them."
    ],
    nextActions: [
      "Set up box-sizing: border-box globally.",
      "Practice margin vs padding decisions.",
      "Day 3: Flexbox Layout."
    ]
  },

  propertyExamples: [
    {
      property: "box-sizing",
      description: "Controls how width and height are calculated. border-box (recommended) includes padding and border in the width.",
      html: `<div class="comparison">
  <div class="box content-box">
    <h4>content-box</h4>
    <p>width: 200px<br>padding: 20px<br>border: 5px<br><strong>Total: 250px</strong></p>
  </div>
  <div class="box border-box">
    <h4>border-box</h4>
    <p>width: 200px<br>padding: 20px<br>border: 5px<br><strong>Total: 200px</strong></p>
  </div>
</div>`,
      css: `.comparison {
  display: flex;
  gap: 20px;
  background: #0f0f23;
  padding: 20px;
  flex-wrap: wrap;
}

.box {
  width: 200px;
  padding: 20px;
  border: 5px solid #00d4ff;
  background: #1a1a2e;
  color: white;
}

.content-box {
  box-sizing: content-box; /* Default */
  /* Total width = 200 + 40 + 10 = 250px */
}

.border-box {
  box-sizing: border-box; /* Recommended */
  /* Total width = 200px (includes padding + border) */
}

.box h4 {
  margin: 0 0 10px 0;
  color: #00d4ff;
  font-size: 18px;
}

.box p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}`
    },
    {
      property: "margin",
      description: "Space outside the border. Can be set for all sides or individually (top, right, bottom, left). Supports 'auto' for centering.",
      html: `<div class="margin-demo">
  <div class="m-box m-all">margin: 20px</div>
  <div class="m-box m-sides">margin: 10px 30px</div>
  <div class="m-box m-auto">margin: 0 auto (centered)</div>
</div>`,
      css: `.margin-demo {
  background: #0f0f23;
  padding: 20px;
}

.m-box {
  background: #667eea;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
}

.m-all {
  margin: 20px; /* All sides */
}

.m-sides {
  margin: 10px 30px; /* Vertical | Horizontal */
}

.m-auto {
  margin: 0 auto; /* Centers horizontally */
  max-width: 300px;
}`
    },
    {
      property: "padding",
      description: "Space between content and border. Always positive (no negative padding). Can be set for all sides or individually.",
      html: `<div class="padding-demo">
  <div class="p-box p-all">padding: 30px</div>
  <div class="p-box p-sides">padding: 10px 40px</div>
  <div class="p-box p-individual">padding: 10px 20px 30px 40px</div>
</div>`,
      css: `.padding-demo {
  display: flex;
  gap: 15px;
  background: #1a1a2e;
  padding: 20px;
  flex-wrap: wrap;
}

.p-box {
  background: #16213e;
  border: 2px solid #00d4ff;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
}

.p-all {
  padding: 30px; /* All sides equal */
}

.p-sides {
  padding: 10px 40px; /* Vertical | Horizontal */
}

.p-individual {
  padding: 10px 20px 30px 40px; /* Top Right Bottom Left (clockwise) */
}`
    },
    {
      property: "border",
      description: "The border around padding. Defined by width, style, and color. Can be set for all sides or individually.",
      html: `<div class="border-demo">
  <div class="b-box solid">solid</div>
  <div class="b-box dashed">dashed</div>
  <div class="b-box dotted">dotted</div>
  <div class="b-box double">double</div>
</div>`,
      css: `.border-demo {
  display: flex;
  gap: 20px;
  background: #0f0f23;
  padding: 20px;
  flex-wrap: wrap;
}

.b-box {
  background: #1a1a2e;
  color: white;
  padding: 25px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  min-width: 120px;
}

.solid {
  border: 4px solid #667eea;
}

.dashed {
  border: 4px dashed #48bb78;
}

.dotted {
  border: 4px dotted #ed8936;
}

.double {
  border: 6px double #e94560;
}`
    },
    {
      property: "border-radius",
      description: "Rounds the corners of an element. Can be a single value or different for each corner.",
      html: `<div class="radius-demo">
  <div class="r-box r1">4px</div>
  <div class="r-box r2">12px</div>
  <div class="r-box r3">50%</div>
  <div class="r-box r4">20px 50px</div>
</div>`,
      css: `.radius-demo {
  display: flex;
  gap: 20px;
  background: #1a1a2e;
  padding: 20px;
  flex-wrap: wrap;
}

.r-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  font-weight: bold;
  text-align: center;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.r1 { border-radius: 4px; }
.r2 { border-radius: 12px; }
.r3 { border-radius: 50%; } /* Circle */
.r4 { border-radius: 20px 50px; } /* Ellipse */`
    },
    {
      property: "width & height",
      description: "Sets the size of the content area (or total size with border-box). Can use px, %, rem, or auto.",
      html: `<div class="size-demo">
  <div class="size-box w1">200px</div>
  <div class="size-box w2">50%</div>
  <div class="size-box w3">auto</div>
</div>`,
      css: `.size-demo {
  background: #0f0f23;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.size-box {
  background: #e94560;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
}

.w1 {
  width: 200px;
}

.w2 {
  width: 50%;
}

.w3 {
  width: auto; /* Default - fits content */
}`
    },
    {
      property: "max-width & min-width",
      description: "Sets maximum and minimum width constraints. Perfect for responsive design and preventing text overflow.",
      html: `<div class="maxmin-demo">
  <div class="maxmin-box max">
    <p>max-width: 300px</p>
    <p>This box won't grow beyond 300px even if there's space.</p>
  </div>
  <div class="maxmin-box min">
    <p>min-width: 200px</p>
    <p>This box won't shrink below 200px.</p>
  </div>
</div>`,
      css: `.maxmin-demo {
  background: #1a1a2e;
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.maxmin-box {
  background: #16213e;
  color: white;
  padding: 20px;
  border: 2px solid #0f3460;
  border-radius: 10px;
  flex: 1;
}

.max {
  max-width: 300px;
  border-color: #667eea;
}

.min {
  min-width: 200px;
  border-color: #48bb78;
}

.maxmin-box p {
  margin: 0 0 10px 0;
}

.maxmin-box p:last-child {
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
}`
    },
    {
      property: "overflow",
      description: "Controls what happens when content is too large for its container. Values: visible, hidden, scroll, auto.",
      html: `<div class="overflow-demo">
  <div class="o-box visible">
    <h4>visible (default)</h4>
    <p>Content overflows and is visible outside the box. This is a lot of text that will overflow the container.</p>
  </div>
  <div class="o-box hidden">
    <h4>hidden</h4>
    <p>Content is clipped and hidden. This is a lot of text that will be cut off.</p>
  </div>
  <div class="o-box scroll">
    <h4>scroll</h4>
    <p>Scrollbars appear. This is a lot of text that you can scroll to read all of it.</p>
  </div>
  <div class="o-box auto">
    <h4>auto</h4>
    <p>Scrollbars appear only when needed. This is a lot of text.</p>
  </div>
</div>`,
      css: `.overflow-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  background: #0f0f23;
  padding: 20px;
}

.o-box {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 10px;
  padding: 15px;
  height: 150px;
  color: white;
}

.visible { overflow: visible; border-color: #667eea; }
.hidden { overflow: hidden; border-color: #e94560; }
.scroll { overflow: scroll; border-color: #48bb78; }
.auto { overflow: auto; border-color: #ed8936; }

.o-box h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #00d4ff;
}

.o-box p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}`
    },
    {
      property: "margin: auto (centering)",
      description: "Using 'auto' for left and right margins centers a block element horizontally. Requires a defined width.",
      html: `<div class="center-demo">
  <div class="center-box">
    Centered with margin: 0 auto
  </div>
</div>`,
      css: `.center-demo {
  background: #0f0f23;
  padding: 40px;
}

.center-box {
  /* Must have a width for margin: auto to work */
  width: 300px;
  max-width: 100%;
  
  /* Centers horizontally */
  margin: 0 auto;
  
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}`
    },
    {
      property: "Negative Margins",
      description: "Margins can be negative to pull elements closer or overlap them. Use carefully!",
      html: `<div class="negative-demo">
  <div class="neg-box box1">Box 1</div>
  <div class="neg-box box2">Box 2 (margin-top: -20px)</div>
  <div class="neg-box box3">Box 3</div>
</div>`,
      css: `.negative-demo {
  background: #1a1a2e;
  padding: 40px;
}

.neg-box {
  background: #16213e;
  color: white;
  padding: 25px;
  border: 2px solid #0f3460;
  border-radius: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

.box1 {
  background: #667eea;
  border-color: #667eea;
}

.box2 {
  background: #48bb78;
  border-color: #48bb78;
  /* Negative margin pulls it up, overlapping box1 */
  margin-top: -20px;
  position: relative;
  z-index: 1;
}

.box3 {
  background: #ed8936;
  border-color: #ed8936;
}`
    }
  ],

  sandbox: {
    html: `<div class="container">
  <header class="header">
    <h1>Box Model Demo</h1>
    <p>Understanding margin, padding, and border</p>
  </header>
  
  <div class="cards">
    <div class="card">
      <h3>Card 1</h3>
      <p>This card has padding inside and margin outside.</p>
    </div>
    <div class="card">
      <h3>Card 2</h3>
      <p>All cards use box-sizing: border-box for predictable sizing.</p>
    </div>
    <div class="card">
      <h3>Card 3</h3>
      <p>Border and border-radius create the visual style.</p>
    </div>
  </div>
</div>`,
    css: `*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f0f23;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  border-radius: 16px;
  margin-bottom: 40px;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.card {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: #00d4ff;
}

.card h3 {
  color: #00d4ff;
  margin-bottom: 12px;
  font-size: 1.5rem;
}

.card p {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}`
  }
};

export default day02;
