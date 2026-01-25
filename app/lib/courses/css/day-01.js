export const day01 = {
  day: 1,
  title: "Cascade, Specificity, and Inheritance",
  subtitle: "Understanding CSS Priority Rules",
  intro: "Master how CSS determines which styles apply when multiple rules target the same element. Learn specificity, cascade, and inheritance.",
  duration: "25 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Specificity wars are the #1 cause of CSS bugs. **Avoid IDs and !important**. Use classes everywhere (BEM pattern). Keep specificity flat and predictable."
      },
      {
        type: "challenge",
        task: "This button has conflicting styles. Remove the ID selector and use a class instead.",
        buggyCode: `#button { color: red; }
.button { color: blue; }
/* ID wins (specificity 100 > 10) */`,
        solutionCode: `.button { color: blue; }
.button-primary { color: red; }
/* Same specificity, last one wins */`,
        verifyOutput: (code) => !code.includes("#") && code.includes(".button"),
        successMessage: "Perfect! Using only classes keeps specificity flat. No more specificity wars!",
        hint: "Replace #button with a class like .button-primary"
      }
    ]
  },

  content: `
<h2>The Cascade</h2>
<p>When multiple rules apply to an element, CSS uses these rules in order:</p>
<ol>
  <li><strong>Importance</strong>: !important declarations win (avoid!)</li>
  <li><strong>Specificity</strong>: More specific selectors win</li>
  <li><strong>Source Order</strong>: Last rule wins if specificity is equal</li>
</ol>

<h2>Specificity Calculation</h2>
<p>Specificity is calculated as (inline, IDs, classes/attributes/pseudo-classes, elements):</p>
<ul>
  <li>Inline styles: (1,0,0,0) = 1000</li>
  <li>IDs: (0,1,0,0) = 100</li>
  <li>Classes, attributes, pseudo-classes: (0,0,1,0) = 10</li>
  <li>Elements, pseudo-elements: (0,0,0,1) = 1</li>
</ul>

<h2>Inheritance</h2>
<p>Some properties inherit from parent to child (color, font-family). Others don't (margin, padding, border).</p>

<h3>Control Inheritance</h3>
<ul>
  <li><code>inherit</code>: Force inheritance</li>
  <li><code>initial</code>: Reset to default value</li>
  <li><code>unset</code>: Inherit if inheritable, otherwise initial</li>
  <li><code>revert</code>: Reset to browser default</li>
</ul>
  `,

  checkpoints: [
    {
      question: "Which selector has the highest specificity?",
      options: [
        "#id",
        ".class",
        "element",
        "[attribute]"
      ],
      correct: 0,
      explanation: "IDs have specificity 100, classes/attributes have 10, elements have 1. IDs win, but avoid them!"
    },
    {
      question: "What should you use instead of IDs for styling?",
      options: [
        "!important",
        "Classes",
        "Inline styles",
        "Elements"
      ],
      correct: 1,
      explanation: "Use classes for styling. They keep specificity flat and predictable. Save IDs for JavaScript."
    },
    {
      question: "Which properties inherit by default?",
      options: [
        "color, font-family, line-height",
        "margin, padding, border",
        "width, height, display",
        "position, top, left"
      ],
      correct: 0,
      explanation: "Typography properties (color, font-family, line-height) inherit. Layout properties (margin, padding) don't."
    }
  ],

  recap: {
    takeaways: [
      "Avoid IDs and !important for styling.",
      "Use classes everywhere (BEM pattern).",
      "Specificity: inline (1000) > ID (100) > class (10) > element (1).",
      "Typography properties inherit, layout properties don't.",
      "Use inherit, initial, unset, revert to control inheritance."
    ],
    commonMistakes: [
      "Using IDs for styling (specificity wars).",
      "Overusing !important.",
      "Not understanding inheritance.",
      "Mixing specificity levels."
    ],
    nextActions: [
      "Refactor IDs to classes.",
      "Remove all !important declarations.",
      "Day 2: Box Model + Sizing."
    ]
  },

  propertyExamples: [
    {
      property: "Specificity: Element Selector",
      description: "Element selectors (div, p, h1) have the lowest specificity (0,0,0,1 = 1). Use for base styles only.",
      html: `<div class="spec-demo">
  <p>Element selector (specificity: 1)</p>
</div>`,
      css: `p {
  /* Specificity: 0,0,0,1 = 1 */
  color: #667eea;
  padding: 20px;
  background: #1a1a2e;
  border-radius: 8px;
  font-weight: bold;
}

.spec-demo {
  background: #0f0f23;
  padding: 20px;
}`
    },
    {
      property: "Specificity: Class Selector",
      description: "Class selectors have specificity (0,0,1,0 = 10). Use classes for all component styling. This is the sweet spot!",
      html: `<div class="spec-demo">
  <p class="highlight">Class selector (specificity: 10)</p>
</div>`,
      css: `p {
  color: gray; /* Specificity: 1 */
}

.highlight {
  /* Specificity: 0,0,1,0 = 10 */
  /* Wins over element selector */
  color: #48bb78;
  padding: 20px;
  background: #1a1a2e;
  border-radius: 8px;
  font-weight: bold;
}

.spec-demo {
  background: #0f0f23;
  padding: 20px;
}`
    },
    {
      property: "Specificity: ID Selector (Avoid!)",
      description: "ID selectors have specificity (0,1,0,0 = 100). Too high! Causes specificity wars. Use classes instead.",
      html: `<div class="spec-demo">
  <p id="unique" class="highlight">ID wins (specificity: 100) - Don't use!</p>
</div>`,
      css: `.highlight {
  color: #48bb78; /* Specificity: 10 */
}

#unique {
  /* Specificity: 0,1,0,0 = 100 */
  /* Wins, but creates specificity problems */
  color: #e94560;
  padding: 20px;
  background: #1a1a2e;
  border-radius: 8px;
  font-weight: bold;
}

.spec-demo {
  background: #0f0f23;
  padding: 20px;
}

/* Avoid IDs for styling! Use classes. */`
    },
    {
      property: "Specificity: Combined Selectors",
      description: "Combining selectors adds their specificity. .card.featured = 20, div.card = 11. Keep it simple!",
      html: `<div class="combined-demo">
  <div class="card">Card (specificity: 10)</div>
  <div class="card featured">Featured (specificity: 20)</div>
</div>`,
      css: `.combined-demo {
  background: #0f0f23;
  padding: 20px;
  display: flex;
  gap: 15px;
}

.card {
  /* Specificity: 10 */
  background: #1a1a2e;
  color: white;
  padding: 25px;
  border-radius: 10px;
  flex: 1;
}

.card.featured {
  /* Specificity: 0,0,2,0 = 20 */
  /* Wins over .card */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid #00d4ff;
}`
    },
    {
      property: "!important (Avoid!)",
      description: "!important overrides everything. Creates maintenance nightmares. Only use for utility classes or overriding third-party CSS.",
      html: `<div class="important-demo">
  <p class="text">!important overrides everything (bad practice!)</p>
</div>`,
      css: `.important-demo {
  background: #1a1a2e;
  padding: 20px;
}

.text {
  color: #48bb78;
  padding: 20px;
  background: #0f0f23;
  border-radius: 8px;
}

#unique-id {
  color: #667eea; /* Specificity: 100 */
}

.text {
  /* !important beats everything */
  color: #e94560 !important;
  font-weight: bold;
}

/* Avoid !important! Refactor your CSS instead. */`
    },
    {
      property: "inherit",
      description: "Forces a property to inherit from its parent, even if it normally wouldn't. Useful for resetting styles.",
      html: `<div class="inherit-demo">
  <div class="parent">
    Parent (color: blue)
    <div class="child">Child inherits color</div>
    <div class="child no-inherit">Child with border: inherit</div>
  </div>
</div>`,
      css: `.inherit-demo {
  background: #0f0f23;
  padding: 20px;
}

.parent {
  color: #667eea;
  border: 3px solid #48bb78;
  padding: 25px;
  background: #1a1a2e;
  border-radius: 12px;
}

.child {
  /* color inherits automatically */
  padding: 15px;
  background: #16213e;
  border-radius: 8px;
  margin: 10px 0;
}

.no-inherit {
  /* Force border to inherit (normally doesn't) */
  border: inherit;
}`
    },
    {
      property: "initial",
      description: "Resets a property to its default CSS value (not browser default). Useful for resetting inherited properties.",
      html: `<div class="initial-demo">
  <div class="parent">
    Parent (color: blue, font-size: 20px)
    <div class="child">Inherits color and font-size</div>
    <div class="child reset">color: initial (resets to black)</div>
  </div>
</div>`,
      css: `.initial-demo {
  background: #0f0f23;
  padding: 20px;
}

.parent {
  color: #667eea;
  font-size: 20px;
  padding: 25px;
  background: #1a1a2e;
  border-radius: 12px;
}

.child {
  padding: 15px;
  background: #16213e;
  border-radius: 8px;
  margin: 10px 0;
}

.reset {
  /* Resets color to default (black) */
  color: initial;
  font-weight: bold;
}`
    },
    {
      property: "unset",
      description: "If property inherits, acts like 'inherit'. If not, acts like 'initial'. Smart reset!",
      html: `<div class="unset-demo">
  <div class="parent">
    Parent (color: blue, padding: 20px)
    <div class="child unset-all">All properties: unset</div>
  </div>
</div>`,
      css: `.unset-demo {
  background: #0f0f23;
  padding: 20px;
}

.parent {
  color: #667eea;
  padding: 25px;
  background: #1a1a2e;
  border-radius: 12px;
}

.child {
  padding: 15px;
  background: #16213e;
  border-radius: 8px;
  margin: 10px 0;
}

.unset-all {
  /* color: inherit (inheritable property) */
  /* padding: initial (non-inheritable) */
  all: unset;
  /* Need to re-add styles */
  display: block;
  padding: 15px;
  background: #e94560;
  border-radius: 8px;
  color: white;
  font-weight: bold;
}`
    }
  ],

  sandbox: {
    html: `<div class="cascade-demo">
  <h1>Cascade & Specificity Demo</h1>
  
  <div class="specificity-examples">
    <div class="box element-only">
      <h3>Element Selector</h3>
      <p>Specificity: 1</p>
    </div>
    
    <div class="box class-selector">
      <h3>Class Selector</h3>
      <p>Specificity: 10 (Recommended!)</p>
    </div>
    
    <div class="box combined-selectors">
      <h3>Combined Classes</h3>
      <p>Specificity: 20</p>
    </div>
  </div>
  
  <div class="inheritance-demo">
    <h2>Inheritance Example</h2>
    <p>This paragraph inherits color and font-family from parent.</p>
    <div class="child">
      <p>Nested elements also inherit!</p>
    </div>
  </div>
</div>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f0f23;
  color: white;
}

.cascade-demo {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.specificity-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
}

/* Element selector - Specificity: 1 */
div {
  /* Base styles */
}

/* Class selector - Specificity: 10 */
.box {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  transition: transform 0.2s, border-color 0.2s;
}

.box:hover {
  transform: translateY(-5px);
  border-color: #667eea;
}

.box h3 {
  color: #00d4ff;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.box p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* Combined selectors - Specificity: 20 */
.box.element-only {
  border-color: #48bb78;
}

.box.class-selector {
  border-color: #667eea;
}

.box.combined-selectors {
  border-color: #e94560;
  background: linear-gradient(135deg, rgba(233, 69, 96, 0.1), rgba(233, 69, 96, 0.05));
}

.inheritance-demo {
  background: #1a1a2e;
  padding: 40px;
  border-radius: 16px;
  border: 2px solid #0f3460;
  
  /* These properties inherit to children */
  color: #667eea;
  font-size: 1.1rem;
  line-height: 1.8;
}

.inheritance-demo h2 {
  margin-bottom: 20px;
  color: #00d4ff;
}

.inheritance-demo .child {
  margin-top: 20px;
  padding: 20px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  border-left: 4px solid #667eea;
}`
  }
};

export default day01;
