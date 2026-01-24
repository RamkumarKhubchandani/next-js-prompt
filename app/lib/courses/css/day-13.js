export const day13 = {
  day: 13,
  title: "Layout Patterns (Holy Grail, Sidebar, Stack)",
  subtitle: "Common CSS Layout Patterns",
  intro: "Master essential layout patterns: Holy Grail, Sidebar, Stack, Pancake, and more. Build real-world layouts with Grid and Flexbox.",
  duration: "30 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "**Layout patterns are reusable solutions** to common problems. Learn the patterns, not just the code. Holy Grail, Sidebar, Stack—these solve 90% of layouts."
      },
      {
        type: "challenge",
        task: "Create a sticky footer using Grid with grid-template-rows: auto 1fr auto.",
        buggyCode: `.page {
  display: grid;
  min-height: 100vh;
}`,
        solutionCode: `.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}`,
        verifyOutput: (code) => code.includes("grid-template-rows") && code.includes("1fr"),
        successMessage: "Perfect! auto 1fr auto creates header, flexible content, footer. Content grows, footer sticks to bottom!",
        hint: "Use grid-template-rows: auto 1fr auto"
      }
    ]
  },

  content: `
<h2>Common Layout Patterns</h2>
<p>These patterns solve recurring layout problems. Learn them once, use them everywhere.</p>

<h3>Essential Patterns</h3>
<ul>
  <li><strong>Holy Grail</strong>: Header, 3 columns, footer</li>
  <li><strong>Sidebar</strong>: Sidebar + main content</li>
  <li><strong>Stack</strong>: Vertical spacing system</li>
  <li><strong>Pancake Stack</strong>: Header, flexible content, footer</li>
  <li><strong>12-Column Grid</strong>: Classic grid system</li>
</ul>

<h2>When to Use What</h2>
<ul>
  <li><strong>Grid</strong>: Page layouts, 2D layouts</li>
  <li><strong>Flexbox</strong>: Components, 1D layouts</li>
  <li><strong>Both</strong>: Nest them for complex layouts</li>
</ul>
  `,

  checkpoints: [
    {
      question: "What's the Holy Grail layout?",
      options: [
        "Header, 3 columns (sidebar, content, aside), footer",
        "Just a header and footer",
        "A single column",
        "A grid of cards"
      ],
      correct: 0,
      explanation: "Holy Grail is a classic layout: header at top, 3 columns in middle (left sidebar, main content, right aside), footer at bottom."
    },
    {
      question: "How do you create a sticky footer with Grid?",
      options: [
        "position: fixed",
        "grid-template-rows: auto 1fr auto",
        "margin-top: auto",
        "flex-direction: column"
      ],
      correct: 1,
      explanation: "grid-template-rows: auto 1fr auto creates header (auto), flexible content (1fr), footer (auto). Footer sticks to bottom!"
    }
  ],

  recap: {
    takeaways: [
      "Layout patterns are reusable solutions.",
      "Holy Grail: header, 3 columns, footer.",
      "Sticky footer: grid-template-rows: auto 1fr auto.",
      "Sidebar: Grid or Flexbox with flex: 1.",
      "Stack: Flexbox column with gap for spacing."
    ],
    commonMistakes: [
      "Reinventing layouts instead of using patterns.",
      "Not using Grid for page layouts.",
      "Forgetting min-height: 100vh for full-height layouts.",
      "Overcomplicating simple layouts."
    ],
    nextActions: [
      "Build a Holy Grail layout.",
      "Create a sidebar layout.",
      "Day 14: Accessibility."
    ]
  },

  propertyExamples: [
    {
      property: "Holy Grail Layout",
      description: "Classic layout: header, 3 columns (sidebar, content, aside), footer. Uses Grid with grid-template-areas.",
      html: `<div class="holy-grail">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Main Content</main>
  <aside class="aside">Aside</aside>
  <footer class="footer">Footer</footer>
</div>`,
      css: `.holy-grail {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 200px 1fr 150px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar content aside"
    "footer footer footer";
  gap: 10px;
  background: #0f0f23;
  padding: 10px;
}

.header { grid-area: header; background: #667eea; }
.sidebar { grid-area: sidebar; background: #48bb78; }
.content { grid-area: content; background: #1a1a2e; }
.aside { grid-area: aside; background: #e94560; }
.footer { grid-area: footer; background: #764ba2; }

.holy-grail > * {
  padding: 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}`
    },
    {
      property: "Sticky Footer (Pancake Stack)",
      description: "Header, flexible content, footer. Footer sticks to bottom even with little content. Uses grid-template-rows: auto 1fr auto.",
      html: `<div class="pancake">
  <header class="pan-header">Header</header>
  <main class="pan-content">Content (grows to fill space)</main>
  <footer class="pan-footer">Footer (always at bottom)</footer>
</div>`,
      css: `.pancake {
  display: grid;
  grid-template-rows: auto 1fr auto; /* Key pattern! */
  min-height: 100vh;
  gap: 10px;
  background: #0f0f23;
  padding: 10px;
}

.pan-header {
  background: #667eea;
  padding: 30px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  text-align: center;
}

.pan-content {
  background: #1a1a2e;
  padding: 30px;
  border-radius: 8px;
  color: white;
  /* This grows to fill available space (1fr) */
}

.pan-footer {
  background: #48bb78;
  padding: 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  text-align: center;
}`
    },
    {
      property: "Sidebar Layout",
      description: "Sidebar + main content. Sidebar has fixed width, content fills remaining space. Perfect for dashboards.",
      html: `<div class="sidebar-layout">
  <aside class="side">Sidebar (250px)</aside>
  <main class="main">Main Content (fills space)</main>
</div>`,
      css: `.sidebar-layout {
  display: grid;
  grid-template-columns: 250px 1fr; /* Fixed sidebar, flexible content */
  gap: 20px;
  min-height: 100vh;
  background: #0f0f23;
  padding: 20px;
}

.side {
  background: #1a1a2e;
  padding: 30px;
  border-radius: 12px;
  color: white;
  border: 2px solid #0f3460;
}

.main {
  background: #1a1a2e;
  padding: 30px;
  border-radius: 12px;
  color: white;
  border: 2px solid #0f3460;
}`
    },
    {
      property: "Stack Layout (Vertical Spacing)",
      description: "Consistent vertical spacing between elements. Use Flexbox column with gap. Perfect for content sections.",
      html: `<div class="stack">
  <div class="stack-item">Item 1</div>
  <div class="stack-item">Item 2</div>
  <div class="stack-item">Item 3</div>
  <div class="stack-item">Item 4</div>
</div>`,
      css: `.stack {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Consistent spacing */
  background: #0f0f23;
  padding: 20px;
}

.stack-item {
  background: #1a1a2e;
  border: 2px solid #667eea;
  padding: 30px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  text-align: center;
}`
    },
    {
      property: "12-Column Grid",
      description: "Classic grid system. Divide page into 12 columns, span elements across them. Flexible and familiar.",
      html: `<div class="grid-12">
  <div class="col-12">Full Width (12 columns)</div>
  <div class="col-6">Half (6 columns)</div>
  <div class="col-6">Half (6 columns)</div>
  <div class="col-4">Third (4 columns)</div>
  <div class="col-4">Third (4 columns)</div>
  <div class="col-4">Third (4 columns)</div>
</div>`,
      css: `.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  background: #0f0f23;
  padding: 20px;
}

.grid-12 > div {
  background: #667eea;
  padding: 30px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  text-align: center;
}

.col-12 { grid-column: span 12; }
.col-6 { grid-column: span 6; }
.col-4 { grid-column: span 4; }
.col-3 { grid-column: span 3; }`
    },
    {
      property: "Media Object Pattern",
      description: "Image/icon on left, content on right. Classic pattern for comments, notifications, etc. Uses Flexbox.",
      html: `<div class="media">
  <div class="media__image">📷</div>
  <div class="media__content">
    <h4>Media Object</h4>
    <p>Image on left, content on right. Perfect for comments, notifications, user profiles.</p>
  </div>
</div>`,
      css: `.media {
  display: flex;
  gap: 20px;
  background: #1a1a2e;
  padding: 24px;
  border-radius: 12px;
  border: 2px solid #0f3460;
}

.media__image {
  flex-shrink: 0; /* Don't shrink */
  width: 60px;
  height: 60px;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.media__content {
  flex: 1; /* Fill remaining space */
  color: white;
}

.media__content h4 {
  color: #00d4ff;
  margin: 0 0 8px 0;
}

.media__content p {
  margin: 0;
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
}`
    }
  ],

  sandbox: {
    html: `<div class="layout-patterns">
      <h1 class="title">CSS Layout Patterns</h1>
      
      <!-- Holy Grail -->
      <section class="pattern">
        <h2>Holy Grail Layout</h2>
        <div class="holy-grail-demo">
          <header class="hg-header">Header</header>
          <aside class="hg-sidebar">Left Sidebar</aside>
          <main class="hg-content">Main Content Area</main>
          <aside class="hg-aside">Right Aside</aside>
          <footer class="hg-footer">Footer</footer>
        </div>
      </section>
      
      <!-- Sidebar -->
      <section class="pattern">
        <h2>Sidebar Layout</h2>
        <div class="sidebar-demo">
          <aside class="sb-sidebar">
            <h3>Sidebar</h3>
            <ul>
              <li>Dashboard</li>
              <li>Settings</li>
              <li>Profile</li>
            </ul>
          </aside>
          <main class="sb-content">
            <h3>Main Content</h3>
            <p>Content fills remaining space</p>
          </main>
        </div>
      </section>
      
      <!-- Media Object -->
      <section class="pattern">
        <h2>Media Object</h2>
        <div class="media-demo">
          <div class="media-img">👤</div>
          <div class="media-body">
            <h4>John Doe</h4>
            <p>This is a classic media object pattern. Perfect for comments, notifications, and user profiles.</p>
          </div>
        </div>
      </section>
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

.layout-patterns {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.title {
  text-align: center;
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 50px;
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pattern {
  margin-bottom: 60px;
}

.pattern > h2 {
  color: #00d4ff;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

/* Holy Grail */
.holy-grail-demo {
  display: grid;
  grid-template-columns: 200px 1fr 150px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar content aside"
    "footer footer footer";
  gap: 12px;
  min-height: 400px;
}

.hg-header { grid-area: header; background: #667eea; }
.hg-sidebar { grid-area: sidebar; background: #48bb78; }
.hg-content { grid-area: content; background: #1a1a2e; }
.hg-aside { grid-area: aside; background: #e94560; }
.hg-footer { grid-area: footer; background: #764ba2; }

.holy-grail-demo > * {
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Sidebar Layout */
.sidebar-demo {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  min-height: 300px;
}

.sb-sidebar {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  padding: 24px;
  border-radius: 12px;
}

.sb-sidebar h3 {
  color: #00d4ff;
  margin-bottom: 16px;
}

.sb-sidebar ul {
  list-style: none;
}

.sb-sidebar li {
  padding: 12px;
  margin-bottom: 8px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.sb-sidebar li:hover {
  background: rgba(102, 126, 234, 0.2);
}

.sb-content {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  padding: 24px;
  border-radius: 12px;
}

.sb-content h3 {
  color: #667eea;
  margin-bottom: 12px;
}

.sb-content p {
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
}

/* Media Object */
.media-demo {
  display: flex;
  gap: 20px;
  background: #1a1a2e;
  border: 2px solid #0f3460;
  padding: 24px;
  border-radius: 12px;
}

.media-img {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.media-body {
  flex: 1;
}

.media-body h4 {
  color: #00d4ff;
  margin-bottom: 8px;
}

.media-body p {
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .holy-grail-demo {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "sidebar"
      "content"
      "aside"
      "footer";
  }
  
  .sidebar-demo {
    grid-template-columns: 1fr;
  }
}`
  }
};

export default day13;
