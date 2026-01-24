export const day06 = {
  day: 6,
  title: "Positioning + Stacking Context",
  subtitle: "Master Position & Z-Index",
  intro: "Learn how positioning works in CSS - from relative to sticky, and understand z-index and stacking contexts.",
  duration: "30 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Position is **context-dependent**. `absolute` positions relative to the nearest positioned ancestor. `fixed` positions relative to the viewport. `sticky` is a hybrid."
      },
      {
        type: "challenge",
        task: "Fix this modal overlay to cover the entire viewport using position: fixed.",
        buggyCode: `.overlay {
  position: absolute;
  top: 0;
  left: 0;
  /* Won't cover viewport if parent is scrolled */
}`,
        solutionCode: `.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}`,
        verifyOutput: (code) => code.includes("position: fixed"),
        successMessage: "Perfect! position: fixed positions relative to the viewport, not the parent. It stays in place when scrolling.",
        hint: "Use `position: fixed` instead of absolute."
      }
    ]
  },

  content: `
<h2>Understanding Position</h2>
<p>The <code>position</code> property determines how an element is positioned in the document. It's essential for overlays, tooltips, sticky headers, and complex layouts.</p>

<h3>Position Values</h3>
<ul>
  <li><strong>static</strong> (default): Normal document flow</li>
  <li><strong>relative</strong>: Positioned relative to its normal position</li>
  <li><strong>absolute</strong>: Positioned relative to nearest positioned ancestor</li>
  <li><strong>fixed</strong>: Positioned relative to viewport</li>
  <li><strong>sticky</strong>: Hybrid of relative and fixed</li>
</ul>

<h2>Stacking Context</h2>
<p>Z-index only works within the same stacking context. Creating a new stacking context isolates z-index values.</p>

<h3>What Creates a Stacking Context?</h3>
<ul>
  <li>position: absolute/relative/fixed/sticky with z-index</li>
  <li>opacity < 1</li>
  <li>transform, filter, perspective</li>
  <li>position: fixed (always)</li>
</ul>
  `,

  checkpoints: [
    {
      question: "What's the difference between position: absolute and position: fixed?",
      options: [
        "absolute positions relative to nearest positioned ancestor, fixed positions relative to viewport",
        "They're the same",
        "fixed is deprecated",
        "absolute is faster"
      ],
      correct: 0,
      explanation: "absolute positions relative to the nearest positioned (non-static) ancestor. fixed positions relative to the viewport and doesn't move when scrolling."
    },
    {
      question: "When does z-index work?",
      options: [
        "Always",
        "Only on positioned elements (not static)",
        "Only on divs",
        "Only with position: absolute"
      ],
      correct: 1,
      explanation: "z-index only works on positioned elements (relative, absolute, fixed, sticky). It has no effect on static elements."
    }
  ],

  recap: {
    takeaways: [
      "`position: relative` enables absolute positioning for children.",
      "`position: absolute` positions relative to nearest positioned ancestor.",
      "`position: fixed` positions relative to viewport (stays on scroll).",
      "`position: sticky` is relative until scroll threshold, then fixed.",
      "z-index only works on positioned elements."
    ],
    commonMistakes: [
      "Forgetting to set position on parent for absolute children.",
      "Using z-index on static elements.",
      "Not understanding stacking contexts.",
      "Using position: absolute for everything."
    ],
    nextActions: [
      "Create a modal with fixed overlay.",
      "Build a sticky header.",
      "Day 7: CSS Grid Layout."
    ]
  },

  propertyExamples: [
    {
      property: "position: static",
      description: "Default value. Element follows normal document flow. top, right, bottom, left, and z-index have no effect.",
      html: `<div class="static-demo">
  <div class="box static">Static (default)</div>
  <div class="box static">Static elements flow normally</div>
</div>`,
      css: `.static-demo {
  background: #0f0f23;
  padding: 20px;
}

.box {
  background: #667eea;
  color: white;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  font-weight: bold;
}

.static {
  position: static; /* Default - normal flow */
  /* top, left, etc. have no effect */
}`
    },
    {
      property: "position: relative",
      description: "Positioned relative to its normal position. Creates a positioning context for absolute children. Doesn't affect other elements.",
      html: `<div class="relative-demo">
  <div class="box normal">Normal</div>
  <div class="box relative">Relative (shifted right 30px, down 10px)</div>
  <div class="box normal">Normal (not affected)</div>
</div>`,
      css: `.relative-demo {
  background: #1a1a2e;
  padding: 20px;
}

.box {
  background: #16213e;
  color: white;
  padding: 20px;
  margin: 10px 0;
  border: 2px solid #0f3460;
  border-radius: 10px;
  font-weight: bold;
}

.relative {
  position: relative;
  left: 30px;  /* Shifted from normal position */
  top: 10px;
  background: #48bb78;
  border-color: #48bb78;
}`
    },
    {
      property: "position: absolute",
      description: "Removed from normal flow. Positioned relative to nearest positioned (non-static) ancestor. If none, uses document body.",
      html: `<div class="absolute-demo">
  <div class="parent">
    Parent (position: relative)
    <div class="child">Absolute Child (top: 10px, right: 10px)</div>
  </div>
</div>`,
      css: `.absolute-demo {
  background: #0f0f23;
  padding: 20px;
}

.parent {
  position: relative; /* Creates positioning context */
  background: #1a1a2e;
  border: 2px solid #0f3460;
  padding: 40px;
  border-radius: 12px;
  color: white;
  min-height: 150px;
}

.child {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e94560;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
}`
    },
    {
      property: "position: fixed",
      description: "Positioned relative to viewport. Stays in place when scrolling. Removed from normal document flow.",
      html: `<div class="fixed-demo">
  <div class="content">
    <p>Scroll this content...</p>
    <p>The fixed box stays in the top-right corner</p>
    <p>Even when you scroll!</p>
    <p>More content...</p>
    <p>Keep scrolling...</p>
  </div>
  <div class="fixed-box">Fixed (top-right)</div>
</div>`,
      css: `.fixed-demo {
  background: #1a1a2e;
  padding: 20px;
  height: 300px;
  overflow: auto;
  position: relative;
  border-radius: 12px;
}

.content {
  color: white;
  padding: 20px;
}

.content p {
  margin: 20px 0;
  padding: 15px;
  background: #16213e;
  border-radius: 8px;
}

.fixed-box {
  position: fixed;
  top: 10px;
  right: 10px;
  background: #667eea;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}`
    },
    {
      property: "position: sticky",
      description: "Hybrid of relative and fixed. Acts as relative until scroll threshold, then becomes fixed. Perfect for sticky headers.",
      html: `<div class="sticky-demo">
  <div class="sticky-header">Sticky Header (scroll down)</div>
  <div class="content">
    <p>Content 1</p>
    <p>Content 2</p>
    <p>Content 3</p>
    <p>Content 4</p>
    <p>Content 5</p>
    <p>The header sticks to the top!</p>
  </div>
</div>`,
      css: `.sticky-demo {
  background: #0f0f23;
  height: 300px;
  overflow: auto;
  border-radius: 12px;
}

.sticky-header {
  position: sticky;
  top: 0; /* Sticks when reaching top */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  font-weight: bold;
  font-size: 18px;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.content p {
  color: white;
  padding: 30px;
  margin: 10px;
  background: #1a1a2e;
  border-radius: 8px;
}`
    },
    {
      property: "top, right, bottom, left",
      description: "Offset properties for positioned elements. Work with relative, absolute, fixed, and sticky positions.",
      html: `<div class="offset-demo">
  <div class="offset-parent">
    <div class="offset-box tl">top: 0, left: 0</div>
    <div class="offset-box tr">top: 0, right: 0</div>
    <div class="offset-box bl">bottom: 0, left: 0</div>
    <div class="offset-box br">bottom: 0, right: 0</div>
    <div class="offset-box center">Centered</div>
  </div>
</div>`,
      css: `.offset-demo {
  background: #1a1a2e;
  padding: 20px;
}

.offset-parent {
  position: relative;
  background: #0f0f23;
  height: 300px;
  border: 2px dashed #0f3460;
  border-radius: 12px;
}

.offset-box {
  position: absolute;
  background: #667eea;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 13px;
}

.tl { top: 10px; left: 10px; }
.tr { top: 10px; right: 10px; }
.bl { bottom: 10px; left: 10px; }
.br { bottom: 10px; right: 10px; }
.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #e94560;
}`
    },
    {
      property: "z-index",
      description: "Controls stacking order of positioned elements. Higher values appear on top. Only works on positioned elements (not static).",
      html: `<div class="zindex-demo">
  <div class="z-box z1">z-index: 1</div>
  <div class="z-box z2">z-index: 2</div>
  <div class="z-box z3">z-index: 3</div>
</div>`,
      css: `.zindex-demo {
  background: #0f0f23;
  padding: 40px;
  position: relative;
  height: 250px;
}

.z-box {
  position: absolute;
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.z1 {
  background: #667eea;
  top: 20px;
  left: 20px;
  z-index: 1;
}

.z2 {
  background: #48bb78;
  top: 60px;
  left: 80px;
  z-index: 2;
}

.z3 {
  background: #e94560;
  top: 100px;
  left: 140px;
  z-index: 3;
}`
    },
    {
      property: "Stacking Context",
      description: "Elements with certain properties create new stacking contexts, isolating z-index values. Common triggers: position + z-index, opacity < 1, transform.",
      html: `<div class="context-demo">
  <div class="context-parent parent1">
    Parent 1 (z-index: 1)
    <div class="context-child">Child (z-index: 999)</div>
  </div>
  <div class="context-parent parent2">
    Parent 2 (z-index: 2)
    <div class="context-child">Child (z-index: 1)</div>
  </div>
</div>`,
      css: `.context-demo {
  background: #1a1a2e;
  padding: 20px;
  position: relative;
  height: 250px;
}

.context-parent {
  position: relative;
  width: 250px;
  height: 120px;
  padding: 20px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
}

.parent1 {
  background: rgba(102, 126, 234, 0.5);
  z-index: 1; /* Creates stacking context */
  position: absolute;
  top: 20px;
  left: 20px;
}

.parent2 {
  background: rgba(233, 69, 96, 0.5);
  z-index: 2; /* Higher than parent1 */
  position: absolute;
  top: 80px;
  left: 100px;
}

.context-child {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #16213e;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 12px;
}

/* Parent2's child appears on top even with lower z-index
   because parent2 has higher z-index */`
    },
    {
      property: "Centering with Position",
      description: "Use position: absolute with top: 50%, left: 50%, and transform: translate(-50%, -50%) to perfectly center an element.",
      html: `<div class="center-position">
  <div class="centered-box">
    Perfectly Centered!
  </div>
</div>`,
      css: `.center-position {
  background: #0f0f23;
  position: relative;
  height: 300px;
  border-radius: 12px;
}

.centered-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 60px;
  border-radius: 16px;
  font-weight: bold;
  font-size: 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}`
    }
  ],

  sandbox: {
    html: `<div class="demo-container">
  <!-- Sticky Header -->
  <header class="sticky-header">
    <h1>Sticky Header</h1>
    <p>Scroll down to see it stick!</p>
  </header>
  
  <!-- Content with Positioned Elements -->
  <div class="content">
    <div class="card">
      <span class="badge">New</span>
      <h3>Card with Absolute Badge</h3>
      <p>The badge is positioned absolutely in the top-right corner.</p>
    </div>
    
    <div class="card">
      <h3>Regular Card</h3>
      <p>This card has no positioned elements.</p>
    </div>
    
    <div class="card">
      <span class="badge">Hot</span>
      <h3>Another Badge</h3>
      <p>Position: relative on parent, absolute on badge.</p>
    </div>
  </div>
  
  <!-- Fixed Button -->
  <button class="fixed-btn">Fixed Button</button>
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

.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 150vh; /* For scrolling demo */
}

.sticky-header {
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  border-radius: 16px;
  margin-bottom: 30px;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}

.sticky-header h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

.sticky-header p {
  opacity: 0.9;
}

.content {
  display: grid;
  gap: 24px;
}

.card {
  position: relative; /* For absolute badge */
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.2s;
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
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #e94560;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
}

.fixed-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #48bb78;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
  transition: transform 0.2s;
}

.fixed-btn:hover {
  transform: scale(1.05);
}`
  }
};

export default day06;
