export const day05 = {
  day: 5,
  title: "Advanced Flexbox (Alignment Masterclass)",
  subtitle: "Master Complex Flexbox Patterns",
  intro: "Deep dive into advanced Flexbox techniques: flex-grow/shrink patterns, margin auto tricks, and multi-line alignment.",
  duration: "30 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "**margin: auto** in Flexbox is magical. It pushes items to opposite sides. Use it instead of justify-content for selective spacing."
      },
      {
        type: "challenge",
        task: "Push the last button to the right using margin-left: auto.",
        buggyCode: `.nav {
  display: flex;
  gap: 20px;
}
/* All buttons are left-aligned */`,
        solutionCode: `.nav {
  display: flex;
  gap: 20px;
}
.nav button:last-child {
  margin-left: auto; /* Pushes to right */
}`,
        verifyOutput: (code) => code.includes("margin-left: auto") || code.includes("margin-inline-start: auto"),
        successMessage: "Perfect! margin: auto in Flexbox consumes all available space, pushing items apart.",
        hint: "Add margin-left: auto to the last button."
      }
    ]
  },

  content: `
<h2>Advanced Flexbox Techniques</h2>
<p>Beyond the basics, Flexbox has powerful features for complex layouts.</p>

<h3>The Magic of margin: auto</h3>
<p>In Flexbox, <code>margin: auto</code> consumes all available space in that direction:</p>
<ul>
  <li><code>margin-left: auto</code> - Push to right</li>
  <li><code>margin-right: auto</code> - Push to left</li>
  <li><code>margin: auto</code> - Center in both directions</li>
</ul>

<h2>Multi-line Flex (align-content)</h2>
<p>When using <code>flex-wrap: wrap</code>, use <code>align-content</code> to control spacing between rows.</p>

<h3>flex-basis vs width</h3>
<ul>
  <li><code>flex-basis</code>: Respects flex-direction (main axis)</li>
  <li><code>width</code>: Always horizontal</li>
  <li>Use <code>flex-basis</code> in Flexbox for consistency</li>
</ul>
  `,

  checkpoints: [
    {
      question: "What does margin-left: auto do in a flex container?",
      options: [
        "Pushes the element to the right",
        "Centers the element",
        "Does nothing",
        "Breaks the layout"
      ],
      correct: 0,
      explanation: "margin-left: auto consumes all available space on the left, pushing the element to the right."
    },
    {
      question: "When should you use align-content?",
      options: [
        "Single-line flex containers",
        "Multi-line flex containers (flex-wrap: wrap)",
        "Never",
        "Only with Grid"
      ],
      correct: 1,
      explanation: "align-content controls spacing between rows in multi-line flex containers. It has no effect on single-line containers."
    }
  ],

  recap: {
    takeaways: [
      "margin: auto in Flexbox pushes items apart.",
      "align-content works on multi-line flex containers.",
      "flex-basis respects flex-direction, width doesn't.",
      "Use flex: 1 for equal-width items.",
      "Nested flexbox creates powerful layouts."
    ],
    commonMistakes: [
      "Using justify-content when margin: auto is better.",
      "Confusing align-items and align-content.",
      "Using width instead of flex-basis.",
      "Not understanding flex-grow/shrink behavior."
    ],
    nextActions: [
      "Build a navbar with logo left, links center, button right.",
      "Create a card grid with equal heights.",
      "Day 6: Positioning + Stacking Context."
    ]
  },

  propertyExamples: [
    {
      property: "margin: auto (Push Apart)",
      description: "margin-left: auto pushes element to right. margin-right: auto pushes to left. Perfect for navbars!",
      html: `<nav class="navbar">
  <div class="logo">Logo</div>
  <button class="login">Login</button>
</nav>`,
      css: `.navbar {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #1a1a2e;
  padding: 20px;
  border-radius: 12px;
}

.logo {
  color: #00d4ff;
  font-size: 1.5rem;
  font-weight: bold;
}

.login {
  /* Pushes button to the right */
  margin-left: auto;
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}`
    },
    {
      property: "margin: auto (Center)",
      description: "margin: auto in both directions centers an item perfectly. Works in flex containers!",
      html: `<div class="center-demo">
  <div class="centered">Perfectly Centered</div>
</div>`,
      css: `.center-demo {
  display: flex;
  background: #0f0f23;
  height: 300px;
  border-radius: 12px;
}

.centered {
  /* Centers in both directions */
  margin: auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 50px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.3rem;
}`
    },
    {
      property: "flex-grow (Advanced)",
      description: "flex-grow determines how much an item grows relative to siblings. 2 means twice as much growth.",
      html: `<div class="grow-demo">
  <div class="box g1">flex-grow: 1</div>
  <div class="box g2">flex-grow: 2</div>
  <div class="box g1">flex-grow: 1</div>
</div>`,
      css: `.grow-demo {
  display: flex;
  gap: 15px;
  background: #1a1a2e;
  padding: 20px;
  border-radius: 12px;
}

.box {
  background: #16213e;
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  border: 2px solid #0f3460;
}

.g1 {
  flex-grow: 1; /* Gets 1 part of space */
  border-color: #667eea;
}

.g2 {
  flex-grow: 2; /* Gets 2 parts of space */
  border-color: #48bb78;
}`
    },
    {
      property: "flex-shrink (Advanced)",
      description: "Controls how items shrink when space is limited. 0 = don't shrink, higher = shrink more.",
      html: `<div class="shrink-demo">
  <div class="item no-shrink">No Shrink (flex-shrink: 0)</div>
  <div class="item shrink">Can Shrink (flex-shrink: 1)</div>
  <div class="item shrink">Can Shrink (flex-shrink: 1)</div>
</div>`,
      css: `.shrink-demo {
  display: flex;
  gap: 10px;
  background: #0f0f23;
  padding: 20px;
  border-radius: 12px;
  width: 500px; /* Limited width forces shrinking */
}

.item {
  background: #1a1a2e;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
  white-space: nowrap;
  border: 2px solid;
}

.no-shrink {
  flex-shrink: 0; /* Won't shrink */
  border-color: #e94560;
}

.shrink {
  flex-shrink: 1; /* Can shrink */
  border-color: #667eea;
}`
    },
    {
      property: "flex-basis vs width",
      description: "flex-basis respects flex-direction (main axis). width is always horizontal. Use flex-basis in Flexbox!",
      html: `<div class="basis-demo">
  <div class="row">
    <div class="item">flex-basis: 200px</div>
    <div class="item">flex-basis: 200px</div>
  </div>
  <div class="column">
    <div class="item">flex-basis: 100px</div>
    <div class="item">flex-basis: 100px</div>
  </div>
</div>`,
      css: `.basis-demo {
  background: #1a1a2e;
  padding: 20px;
  display: flex;
  gap: 20px;
}

.row, .column {
  flex: 1;
  display: flex;
  gap: 10px;
  background: #0f0f23;
  padding: 15px;
  border-radius: 10px;
}

.row {
  flex-direction: row;
}

.column {
  flex-direction: column;
}

.item {
  flex-basis: 100px; /* Respects flex-direction */
  background: #667eea;
  color: white;
  padding: 20px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  font-size: 0.9rem;
}`
    },
    {
      property: "align-content (Multi-line)",
      description: "Controls spacing between rows in multi-line flex containers. Only works with flex-wrap: wrap.",
      html: `<div class="content-demo">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
  <div class="box">6</div>
</div>`,
      css: `.content-demo {
  display: flex;
  flex-wrap: wrap; /* Multi-line */
  align-content: space-between; /* Space between rows */
  gap: 15px;
  background: #0f0f23;
  padding: 20px;
  border-radius: 12px;
  height: 300px;
}

.box {
  width: calc(33.333% - 10px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}`
    },
    {
      property: "Nested Flexbox",
      description: "Flexbox inside Flexbox creates powerful layouts. Each flex container is independent.",
      html: `<div class="nested-demo">
  <div class="header">
    <div class="logo">Logo</div>
    <nav class="nav">
      <a href="#">Home</a>
      <a href="#">About</a>
    </nav>
    <button>Login</button>
  </div>
</div>`,
      css: `.nested-demo {
  background: #0f0f23;
  padding: 20px;
}

.header {
  display: flex; /* Outer flex */
  align-items: center;
  gap: 20px;
  background: #1a1a2e;
  padding: 20px;
  border-radius: 12px;
}

.logo {
  color: #00d4ff;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav {
  display: flex; /* Inner flex */
  gap: 20px;
  margin-left: auto; /* Push to right */
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav a:hover {
  color: #00d4ff;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}`
    },
    {
      property: "Equal Height Cards",
      description: "Flex items in a row automatically have equal height. Perfect for card layouts!",
      html: `<div class="cards">
  <div class="card">
    <h3>Short</h3>
    <p>Small content</p>
  </div>
  <div class="card">
    <h3>Medium</h3>
    <p>This card has more content than the others, but all cards maintain equal height.</p>
  </div>
  <div class="card">
    <h3>Tall</h3>
    <p>This card has even more content to demonstrate how flexbox automatically creates equal-height columns without any extra CSS tricks.</p>
  </div>
</div>`,
      css: `.cards {
  display: flex;
  gap: 20px;
  background: #0f0f23;
  padding: 20px;
  border-radius: 12px;
}

.card {
  flex: 1; /* Equal width */
  /* Height automatically matches tallest card */
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.card h3 {
  color: #00d4ff;
  margin: 0 0 12px 0;
  font-size: 1.3rem;
}

.card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}`
    }
  ],

  sandbox: {
    html: `<div class="advanced-flex-demo">
  <!-- Navbar with margin: auto -->
  <nav class="navbar">
    <div class="logo">FlexMaster</div>
    <div class="nav-links">
      <a href="#">Features</a>
      <a href="#">Pricing</a>
      <a href="#">Docs</a>
    </div>
    <button class="cta">Get Started</button>
  </nav>
  
  <!-- Equal Height Cards -->
  <div class="cards">
    <div class="card">
      <div class="icon">🚀</div>
      <h3>Fast</h3>
      <p>Lightning-fast performance with modern CSS.</p>
      <button class="card-btn">Learn More</button>
    </div>
    <div class="card">
      <div class="icon">💎</div>
      <h3>Beautiful</h3>
      <p>Stunning designs that work everywhere. Responsive by default with flexible layouts that adapt to any screen size.</p>
      <button class="card-btn">Learn More</button>
    </div>
    <div class="card">
      <div class="icon">⚡</div>
      <h3>Powerful</h3>
      <p>Advanced features for complex layouts.</p>
      <button class="card-btn">Learn More</button>
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

.advanced-flex-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Navbar with margin: auto trick */
.navbar {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #1a1a2e;
  padding: 20px 30px;
  border-radius: 16px;
  margin-bottom: 40px;
  border: 2px solid #0f3460;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00d4ff;
}

.nav-links {
  display: flex;
  gap: 30px;
  margin-left: auto; /* Push to right */
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
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.cta:hover {
  transform: scale(1.05);
}

/* Equal Height Cards */
.cards {
  display: flex;
  gap: 24px;
}

.card {
  flex: 1;
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-8px);
  border-color: #667eea;
}

.icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.card h3 {
  color: #00d4ff;
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1; /* Push button to bottom */
}

.card-btn {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  border: 2px solid #667eea;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-start;
}

.card-btn:hover {
  background: #667eea;
  color: white;
}`
  }
};

export default day05;
