export const day08 = {
  day: 8,
  title: "Responsive Design (Mobile-First)",
  subtitle: "Build for All Screen Sizes",
  intro: "Master responsive design with mobile-first approach, media queries, and modern responsive patterns.",
  duration: "30 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "**Mobile-first** means starting with mobile styles, then adding complexity for larger screens using min-width media queries. It's easier and more performant."
      },
      {
        type: "challenge",
        task: "Convert this desktop-first media query to mobile-first.",
        buggyCode: `.grid {
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
}`,
        solutionCode: `.grid {
  grid-template-columns: 1fr; /* Mobile first */
}
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}`,
        verifyOutput: (code) => code.includes("min-width"),
        successMessage: "Perfect! Mobile-first uses min-width. Start simple (mobile), add complexity (desktop).",
        hint: "Start with 1fr (mobile), then use @media (min-width: 768px) for desktop."
      }
    ]
  },

  content: `
<h2>Mobile-First Approach</h2>
<p>Design for mobile first, then enhance for larger screens. Benefits:</p>
<ul>
  <li>Simpler base styles (mobile is simpler)</li>
  <li>Better performance (less CSS to override)</li>
  <li>Forces focus on content priority</li>
  <li>Progressive enhancement mindset</li>
</ul>

<h3>Common Breakpoints</h3>
<pre><code>/* Mobile: 0-639px (default) */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }</code></pre>

<h2>Responsive Units</h2>
<ul>
  <li><strong>%</strong>: Relative to parent</li>
  <li><strong>vw/vh</strong>: Viewport width/height</li>
  <li><strong>rem</strong>: Relative to root font size</li>
  <li><strong>em</strong>: Relative to parent font size</li>
</ul>
  `,

  checkpoints: [
    {
      question: "What's the difference between mobile-first and desktop-first?",
      options: [
        "Mobile-first uses min-width, desktop-first uses max-width",
        "They're the same",
        "Mobile-first is slower",
        "Desktop-first is better"
      ],
      correct: 0,
      explanation: "Mobile-first starts with mobile styles and uses min-width to add complexity. Desktop-first starts complex and uses max-width to simplify."
    },
    {
      question: "Which media query syntax is mobile-first?",
      options: [
        "@media (max-width: 768px)",
        "@media (min-width: 768px)",
        "@media (width: 768px)",
        "@media screen"
      ],
      correct: 1,
      explanation: "min-width is mobile-first: 'when screen is AT LEAST this wide'. max-width is desktop-first: 'when screen is AT MOST this wide'."
    }
  ],

  recap: {
    takeaways: [
      "Use mobile-first approach (min-width media queries).",
      "Common breakpoints: 640px, 768px, 1024px, 1280px.",
      "Use relative units (rem, %, vw) for responsiveness.",
      "Test on real devices, not just browser resize.",
      "Content should dictate breakpoints, not devices."
    ],
    commonMistakes: [
      "Using desktop-first (max-width).",
      "Too many breakpoints.",
      "Using px for everything.",
      "Not testing on real devices."
    ],
    nextActions: [
      "Convert a desktop layout to mobile-first.",
      "Test on multiple devices.",
      "Day 9: Modern Units + Container Queries."
    ]
  },

  propertyExamples: [
    {
      property: "@media (min-width) - Mobile First",
      description: "Mobile-first: Start with mobile styles, add complexity for larger screens using min-width.",
      html: `<div class="responsive-demo">
  <div class="box">Resize browser to see changes</div>
</div>`,
      css: `.responsive-demo {
  background: #0f0f23;
  padding: 20px;
}

.box {
  /* Mobile: Simple, stacked */
  background: #e94560;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
}

/* Tablet and up */
@media (min-width: 768px) {
  .box {
    background: #48bb78;
    padding: 40px;
    font-size: 1.3rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .box {
    background: #667eea;
    padding: 60px;
    font-size: 1.5rem;
  }
}`
    },
    {
      property: "Responsive Grid",
      description: "Grid that adapts from 1 column (mobile) to 2 (tablet) to 3 (desktop) using mobile-first media queries.",
      html: `<div class="grid-responsive">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
  <div class="card">Card 6</div>
</div>`,
      css: `.grid-responsive {
  display: grid;
  gap: 20px;
  background: #1a1a2e;
  padding: 20px;
  border-radius: 12px;
  
  /* Mobile: 1 column */
  grid-template-columns: 1fr;
}

/* Tablet: 2 columns */
@media (min-width: 640px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  background: #667eea;
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
}`
    },
    {
      property: "Responsive Typography",
      description: "Font sizes that scale with screen size. Mobile: smaller, Desktop: larger.",
      html: `<div class="typo-responsive">
  <h1>Responsive Heading</h1>
  <p>This text scales based on screen size using mobile-first media queries.</p>
</div>`,
      css: `.typo-responsive {
  background: #0f0f23;
  padding: 30px;
  color: white;
}

h1 {
  /* Mobile: 1.8rem */
  font-size: 1.8rem;
  color: #00d4ff;
  margin-bottom: 15px;
}

p {
  /* Mobile: 1rem */
  font-size: 1rem;
  line-height: 1.6;
}

/* Tablet */
@media (min-width: 768px) {
  h1 { font-size: 2.5rem; }
  p { font-size: 1.1rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  h1 { font-size: 3rem; }
  p { font-size: 1.2rem; }
}`
    },
    {
      property: "Viewport Units (vw, vh)",
      description: "vw = viewport width %, vh = viewport height %. 100vw = full width, 100vh = full height.",
      html: `<div class="viewport-demo">
  <div class="vw-box">50vw wide</div>
  <div class="vh-box">50vh tall</div>
</div>`,
      css: `.viewport-demo {
  background: #1a1a2e;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.vw-box {
  width: 50vw; /* 50% of viewport width */
  background: #667eea;
  color: white;
  padding: 30px;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
}

.vh-box {
  height: 50vh; /* 50% of viewport height */
  background: #48bb78;
  color: white;
  padding: 30px;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}`
    },
    {
      property: "Percentage Width",
      description: "Percentage is relative to parent width. Perfect for fluid layouts that adapt to container size.",
      html: `<div class="percent-demo">
  <div class="w50">50% width</div>
  <div class="w75">75% width</div>
  <div class="w100">100% width</div>
</div>`,
      css: `.percent-demo {
  background: #0f0f23;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.percent-demo > div {
  background: #1a1a2e;
  color: white;
  padding: 25px;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
  border: 2px solid;
}

.w50 {
  width: 50%;
  border-color: #667eea;
}

.w75 {
  width: 75%;
  border-color: #48bb78;
}

.w100 {
  width: 100%;
  border-color: #e94560;
}`
    },
    {
      property: "Responsive Navigation",
      description: "Navbar that stacks on mobile, goes horizontal on desktop. Classic mobile-first pattern.",
      html: `<nav class="nav-responsive">
  <div class="logo">Logo</div>
  <div class="links">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</nav>`,
      css: `.nav-responsive {
  background: #1a1a2e;
  padding: 20px;
  border-radius: 12px;
  
  /* Mobile: Stacked */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.logo {
  color: #00d4ff;
  font-size: 1.5rem;
  font-weight: bold;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 10px;
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
}

/* Desktop: Horizontal */
@media (min-width: 768px) {
  .nav-responsive {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  
  .links {
    flex-direction: row;
    gap: 25px;
  }
  
  .links a {
    background: none;
    padding: 0;
  }
}`
    },
    {
      property: "Hide/Show Elements",
      description: "Show different content on mobile vs desktop. Use display: none carefully (affects accessibility).",
      html: `<div class="hide-show-demo">
  <div class="mobile-only">📱 Mobile Only</div>
  <div class="desktop-only">🖥️ Desktop Only</div>
  <div class="always">✨ Always Visible</div>
</div>`,
      css: `.hide-show-demo {
  background: #0f0f23;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hide-show-demo > div {
  padding: 25px;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
}

.mobile-only {
  display: block; /* Show on mobile */
  background: #e94560;
  color: white;
}

.desktop-only {
  display: none; /* Hide on mobile */
  background: #667eea;
  color: white;
}

.always {
  background: #48bb78;
  color: white;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none; /* Hide on desktop */
  }
  
  .desktop-only {
    display: block; /* Show on desktop */
  }
}`
    }
  ],

  sandbox: {
    html: `<div class="responsive-page">
  <header class="header">
    <div class="logo">ResponsiveApp</div>
    <nav class="nav">
      <a href="#">Features</a>
      <a href="#">Pricing</a>
      <a href="#">About</a>
    </nav>
    <button class="cta">Sign Up</button>
  </header>
  
  <main class="content">
    <section class="hero">
      <h1>Mobile-First Design</h1>
      <p>This layout adapts beautifully from mobile to desktop using mobile-first media queries.</p>
    </section>
    
    <div class="cards">
      <div class="card">
        <h3>📱 Mobile</h3>
        <p>Starts simple and stacked</p>
      </div>
      <div class="card">
        <h3>💻 Desktop</h3>
        <p>Expands to multi-column</p>
      </div>
      <div class="card">
        <h3>🎨 Fluid</h3>
        <p>Scales smoothly between</p>
      </div>
    </div>
  </main>
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

.responsive-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header - Mobile First */
.header {
  background: #1a1a2e;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  
  /* Mobile: Stacked */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00d4ff;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav a {
  color: white;
  text-decoration: none;
  padding: 12px;
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
  font-weight: 500;
}

.cta {
  background: #667eea;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

/* Tablet: Horizontal nav */
@media (min-width: 768px) {
  .header {
    flex-direction: row;
    align-items: center;
  }
  
  .nav {
    flex-direction: row;
    gap: 25px;
    margin-left: auto;
  }
  
  .nav a {
    background: none;
    padding: 0;
  }
}

/* Hero */
.hero {
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 16px;
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero p {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: rgba(255,255,255,0.8);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Cards - Mobile First */
.cards {
  display: grid;
  gap: 20px;
  
  /* Mobile: 1 column */
  grid-template-columns: 1fr;
}

/* Tablet: 2 columns */
@media (min-width: 640px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  border-color: #667eea;
}

.card h3 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #00d4ff;
}

.card p {
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
}`
  }
};

export default day08;
