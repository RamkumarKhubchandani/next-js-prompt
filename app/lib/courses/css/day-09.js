export const day09 = {
  day: 9,
  title: "Modern Units + Container Queries",
  subtitle: "New CSS Units & Container Queries",
  intro: "Master modern CSS units (rem, em, vw, vh, svh) and container queries for truly responsive components.",
  duration: "30 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "**Container queries** are game-changing. Style components based on their container size, not viewport. Perfect for reusable components!"
      },
      {
        type: "challenge",
        task: "Use clamp() to create fluid spacing that scales between 1rem and 3rem.",
        buggyCode: `.box {
  padding: 2rem; /* Fixed */
}`,
        solutionCode: `.box {
  padding: clamp(1rem, 5vw, 3rem);
  /* min: 1rem, preferred: 5vw, max: 3rem */
}`,
        verifyOutput: (code) => code.includes("clamp"),
        successMessage: "Perfect! clamp() creates fluid values that scale smoothly between min and max.",
        hint: "Use clamp(1rem, 5vw, 3rem) for responsive padding."
      }
    ]
  },

  content: `
<h2>Modern CSS Units</h2>
<p>CSS has evolved beyond px and %. Modern units create truly responsive designs.</p>

<h3>Relative Units</h3>
<ul>
  <li><strong>rem</strong>: Relative to root font size (16px default)</li>
  <li><strong>em</strong>: Relative to parent font size</li>
  <li><strong>%</strong>: Relative to parent dimension</li>
</ul>

<h3>Viewport Units</h3>
<ul>
  <li><strong>vw/vh</strong>: Viewport width/height (includes scrollbar)</li>
  <li><strong>svw/svh</strong>: Small viewport (mobile with UI visible)</li>
  <li><strong>lvw/lvh</strong>: Large viewport (mobile with UI hidden)</li>
  <li><strong>dvw/dvh</strong>: Dynamic viewport (adapts to UI)</li>
</ul>

<h2>Container Queries</h2>
<p>Style elements based on container size, not viewport:</p>
<pre><code>.container {
  container-type: inline-size;
}
@container (min-width: 400px) {
  .card { grid-template-columns: repeat(2, 1fr); }
}</code></pre>
  `,

  checkpoints: [
    {
      question: "What's the difference between rem and em?",
      options: [
        "rem is relative to root, em is relative to parent",
        "They're the same",
        "rem is deprecated",
        "em is faster"
      ],
      correct: 0,
      explanation: "rem is relative to root font size (consistent). em is relative to parent font size (can compound)."
    },
    {
      question: "When should you use container queries instead of media queries?",
      options: [
        "Never",
        "When styling based on container size, not viewport",
        "Always",
        "Only for Grid"
      ],
      correct: 1,
      explanation: "Container queries style based on container size. Perfect for reusable components that work in different contexts."
    }
  ],

  recap: {
    takeaways: [
      "Use rem for font sizes and spacing.",
      "svh/lvh/dvh solve mobile viewport issues.",
      "clamp(), min(), max() create fluid values.",
      "Container queries enable truly reusable components.",
      "vw/vh are useful but watch for scrollbar issues."
    ],
    commonMistakes: [
      "Using px everywhere.",
      "Not understanding rem vs em.",
      "Forgetting about mobile viewport units.",
      "Overusing viewport units."
    ],
    nextActions: [
      "Convert px to rem in your project.",
      "Experiment with container queries.",
      "Day 10: Transitions & Animations."
    ]
  },

  propertyExamples: [
    {
      property: "rem vs em",
      description: "rem = root element font size (16px default). em = parent element font size. rem is more predictable!",
      html: `<div class="units-demo">
  <div class="rem-box">1.5rem (24px)</div>
  <div class="em-parent">
    Parent (20px)
    <div class="em-box">1.5em (30px = 1.5 × 20px)</div>
  </div>
</div>`,
      css: `.units-demo {
  background: #0f0f23;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rem-box {
  font-size: 1.5rem; /* 24px (1.5 × 16px root) */
  background: #667eea;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
}

.em-parent {
  font-size: 20px; /* Parent size */
  background: #1a1a2e;
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.em-box {
  font-size: 1.5em; /* 30px (1.5 × 20px parent) */
  background: #48bb78;
  padding: 20px;
  border-radius: 10px;
  margin-top: 15px;
  font-weight: bold;
}`
    },
    {
      property: "vw & vh (Viewport Units)",
      description: "vw = 1% of viewport width. vh = 1% of viewport height. 100vw = full width, 100vh = full height.",
      html: `<div class="viewport-units">
  <div class="vw-demo">50vw wide</div>
  <div class="vh-demo">30vh tall</div>
</div>`,
      css: `.viewport-units {
  background: #1a1a2e;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.vw-demo {
  width: 50vw; /* 50% of viewport width */
  background: #667eea;
  color: white;
  padding: 30px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
}

.vh-demo {
  height: 30vh; /* 30% of viewport height */
  background: #48bb78;
  color: white;
  padding: 30px;
  border-radius: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}`
    },
    {
      property: "svh, lvh, dvh (New Viewport Units)",
      description: "svh = small viewport (mobile UI visible). lvh = large viewport (UI hidden). dvh = dynamic (adapts).",
      html: `<div class="new-viewport">
  <div class="svh-box">100svh - Small Viewport</div>
  <div class="dvh-box">100dvh - Dynamic Viewport</div>
</div>`,
      css: `.new-viewport {
  background: #0f0f23;
  padding: 20px;
  display: flex;
  gap: 20px;
}

.svh-box {
  height: 100svh; /* Small viewport height */
  flex: 1;
  background: #e94560;
  color: white;
  padding: 30px;
  border-radius: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.dvh-box {
  height: 100dvh; /* Dynamic viewport height */
  flex: 1;
  background: #667eea;
  color: white;
  padding: 30px;
  border-radius: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* dvh adapts to mobile UI showing/hiding */`
    },
    {
      property: "clamp() Function",
      description: "clamp(min, preferred, max) creates fluid values. Perfect for responsive sizing without media queries!",
      html: `<div class="clamp-demo">
  <h2>Fluid Heading</h2>
  <p>This text scales smoothly between min and max values.</p>
</div>`,
      css: `.clamp-demo {
  background: #1a1a2e;
  padding: clamp(1rem, 5vw, 3rem);
  border-radius: 12px;
}

h2 {
  /* min: 1.5rem, preferred: 4vw, max: 3rem */
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: #00d4ff;
  margin-bottom: 1rem;
}

p {
  /* min: 1rem, preferred: 2vw, max: 1.3rem */
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: white;
  line-height: 1.6;
  margin: 0;
}

/* Resize browser to see smooth scaling! */`
    },
    {
      property: "min() & max() Functions",
      description: "min() picks smallest value. max() picks largest. Useful for constraints without media queries.",
      html: `<div class="minmax-demo">
  <div class="min-box">min(50%, 300px)</div>
  <div class="max-box">max(50%, 300px)</div>
</div>`,
      css: `.minmax-demo {
  background: #0f0f23;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.min-box {
  /* Width is smaller of 50% or 300px */
  width: min(50%, 300px);
  background: #667eea;
  color: white;
  padding: 30px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
}

.max-box {
  /* Width is larger of 50% or 300px */
  width: max(50%, 300px);
  background: #48bb78;
  color: white;
  padding: 30px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
}`
    },
    {
      property: "Container Queries (@container)",
      description: "Style based on container size, not viewport! Perfect for reusable components. Requires container-type.",
      html: `<div class="container-demo">
  <div class="sidebar">
    <div class="card">Narrow Card</div>
  </div>
  <div class="main">
    <div class="card">Wide Card (changes layout!)</div>
  </div>
</div>`,
      css: `.container-demo {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  background: #0f0f23;
  padding: 20px;
}

.sidebar, .main {
  container-type: inline-size; /* Enable container queries */
  background: #1a1a2e;
  padding: 20px;
  border-radius: 12px;
}

.card {
  background: #667eea;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
}

/* Styles based on container width, not viewport! */
@container (min-width: 400px) {
  .card {
    background: #48bb78;
    padding: 40px;
    font-size: 1.3rem;
  }
  
  .card::after {
    content: " - Wide Container!";
  }
}`
    },
    {
      property: "ch Unit (Character Width)",
      description: "1ch = width of '0' character. Perfect for limiting line length for readability (45-75ch is optimal).",
      html: `<div class="ch-demo">
  <p class="optimal">This paragraph has max-width: 65ch for optimal readability. Line length is based on character count, not pixels!</p>
</div>`,
      css: `.ch-demo {
  background: #1a1a2e;
  padding: 40px;
  border-radius: 12px;
}

.optimal {
  max-width: 65ch; /* 65 characters wide */
  background: #0f0f23;
  color: white;
  padding: 30px;
  border-radius: 10px;
  line-height: 1.8;
  font-size: 1.1rem;
  margin: 0;
  border-left: 4px solid #667eea;
}

/* 45-75ch is optimal for readability */`
    }
  ],

  sandbox: {
    html: `<div class="modern-units-demo">
  <header class="hero">
    <h1>Modern CSS Units</h1>
    <p>Responsive design with clamp(), container queries, and new viewport units</p>
  </header>
  
  <div class="layout">
    <aside class="sidebar">
      <div class="widget">
        <h3>Sidebar Widget</h3>
        <p>Container query adapts this!</p>
      </div>
    </aside>
    
    <main class="content">
      <div class="widget">
        <h3>Main Widget</h3>
        <p>Same component, different layout based on container size!</p>
      </div>
      
      <article class="article">
        <h2>Fluid Typography</h2>
        <p>This text uses clamp() to scale smoothly between screen sizes without media queries. The padding also uses clamp() for responsive spacing.</p>
      </article>
    </main>
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

.modern-units-demo {
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
}

.hero {
  text-align: center;
  padding: clamp(2rem, 8vw, 5rem) clamp(1rem, 5vw, 3rem);
  margin-bottom: clamp(2rem, 5vw, 4rem);
  background: linear-gradient(135deg, #1a1a2e, #0f0f23);
  border-radius: 16px;
}

.hero h1 {
  font-size: clamp(2rem, 6vw, 4rem);
  margin-bottom: 1rem;
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero p {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: rgba(255,255,255,0.8);
  max-width: 65ch;
  margin: 0 auto;
}

.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 3vw, 2rem);
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 300px 1fr;
  }
}

.sidebar, .content {
  container-type: inline-size;
}

.widget {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 12px;
  padding: clamp(1rem, 3vw, 2rem);
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
}

.widget h3 {
  color: #00d4ff;
  margin-bottom: 0.75rem;
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
}

.widget p {
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
}

/* Container Query: Changes layout based on container width */
@container (min-width: 500px) {
  .widget {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.5rem;
    align-items: center;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), transparent);
    border-color: #667eea;
  }
  
  .widget h3::before {
    content: "📊 ";
  }
}

.article {
  background: #1a1a2e;
  padding: clamp(1.5rem, 4vw, 3rem);
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.article h2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #667eea;
  margin-bottom: 1rem;
}

.article p {
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.8;
  max-width: 65ch;
  color: rgba(255,255,255,0.9);
}`
  }
};

export default day09;
