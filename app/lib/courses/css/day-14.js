export const day14 = {
  day: 14,
  title: "Accessibility (Focus, Skip Links, Screen Readers)",
  subtitle: "Building Inclusive Interfaces",
  intro: "Master CSS accessibility: focus states, skip links, screen reader patterns, and reduced motion. Build for everyone.",
  duration: "30 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "**Accessibility is not optional**. 15% of the world has disabilities. :focus-visible shows focus for keyboard users only, not mouse clicks. Use it!"
      },
      {
        type: "challenge",
        task: "Add a visible focus state using :focus-visible instead of :focus.",
        buggyCode: `.button:focus {
  outline: 2px solid blue;
  /* Shows on mouse click too (annoying) */
}`,
        solutionCode: `.button:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
  /* Only shows for keyboard focus */
}`,
        verifyOutput: (code) => code.includes("focus-visible"),
        successMessage: "Perfect! :focus-visible only shows focus for keyboard users, not mouse clicks. Much better UX!",
        hint: "Use :focus-visible instead of :focus"
      }
    ]
  },

  content: `
<h2>Why Accessibility Matters</h2>
<ul>
  <li>15% of people have disabilities</li>
  <li>Keyboard-only users exist</li>
  <li>Screen readers need semantic HTML + CSS</li>
  <li>It's the law in many countries</li>
  <li>Better UX for everyone</li>
</ul>

<h3>CSS Accessibility Essentials</h3>
<ul>
  <li><strong>:focus-visible</strong>: Keyboard focus only</li>
  <li><strong>:focus-within</strong>: Parent has focused child</li>
  <li><strong>outline</strong>: Never remove without replacement</li>
  <li><strong>sr-only</strong>: Visually hidden, screen reader visible</li>
  <li><strong>prefers-reduced-motion</strong>: Respect user preferences</li>
</ul>

<h2>Skip Links</h2>
<p>Let keyboard users skip to main content:</p>
<pre><code>.skip-link {
  position: absolute;
  top: -40px; /* Hidden by default */
}
.skip-link:focus {
  top: 0; /* Visible on focus */
}</code></pre>
  `,

  checkpoints: [
    {
      question: "What's the difference between :focus and :focus-visible?",
      options: [
        ":focus-visible only shows for keyboard focus, not mouse clicks",
        "They're the same",
        ":focus-visible is deprecated",
        ":focus is better"
      ],
      correct: 0,
      explanation: ":focus-visible only shows focus indicators for keyboard users. :focus shows for both keyboard and mouse, which can be visually annoying."
    },
    {
      question: "What does the sr-only class do?",
      options: [
        "Hides content visually but keeps it for screen readers",
        "Deletes content",
        "Makes text smaller",
        "Changes color"
      ],
      correct: 0,
      explanation: "sr-only (screen reader only) hides content visually but keeps it accessible to screen readers. Essential for accessibility."
    }
  ],

  recap: {
    takeaways: [
      "Use :focus-visible for keyboard-only focus states.",
      "Never remove outline without a visible replacement.",
      "sr-only pattern hides visually, keeps for screen readers.",
      "Skip links help keyboard users navigate.",
      "Respect prefers-reduced-motion for animations."
    ],
    commonMistakes: [
      "Removing outline without replacement.",
      "Using :focus instead of :focus-visible.",
      "Not testing with keyboard navigation.",
      "Ignoring color contrast ratios.",
      "Not respecting reduced motion preferences."
    ],
    nextActions: [
      "Audit your site with keyboard-only navigation.",
      "Test with a screen reader.",
      "Congratulations! You've completed the CSS Masterclass! 🎉"
    ]
  },

  propertyExamples: [
    {
      property: ":focus-visible",
      description: "Shows focus only for keyboard users, not mouse clicks. Much better UX than :focus. Use this instead of :focus!",
      html: `<div class="focus-demo">
  <button class="btn-old">:focus (shows on click)</button>
  <button class="btn-new">:focus-visible (keyboard only)</button>
</div>`,
      css: `.focus-demo {
  background: #0f0f23;
  padding: 30px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-old, .btn-new {
  background: #667eea;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.btn-old:focus {
  /* Shows on mouse click (annoying!) */
  outline: 3px solid #00d4ff;
  outline-offset: 3px;
}

.btn-new:focus-visible {
  /* Only shows for keyboard focus */
  outline: 3px solid #48bb78;
  outline-offset: 3px;
}

/* Try clicking vs tabbing to see difference */`
    },
    {
      property: ":focus-within",
      description: "Styles parent when any child has focus. Perfect for highlighting form sections when user is filling them out.",
      html: `<form class="form-demo">
  <div class="form-group">
    <label>Name:</label>
    <input type="text" placeholder="Click or tab here">
  </div>
  <div class="form-group">
    <label>Email:</label>
    <input type="email" placeholder="Click or tab here">
  </div>
</form>`,
      css: `.form-demo {
  background: #1a1a2e;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #0f3460;
  transition: all 0.3s;
}

.form-group:focus-within {
  /* Highlights when any child has focus */
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.form-group label {
  display: block;
  color: #00d4ff;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #0f0f23;
  color: white;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
}`
    },
    {
      property: "sr-only (Screen Reader Only)",
      description: "Hides content visually but keeps it accessible to screen readers. Essential for icons, buttons without text, etc.",
      html: `<div class="sr-demo">
  <button class="icon-btn">
    <span class="sr-only">Close dialog</span>
    <span aria-hidden="true">✕</span>
  </button>
  <button class="icon-btn">
    <span class="sr-only">Search</span>
    <span aria-hidden="true">🔍</span>
  </button>
</div>`,
      css: `.sr-demo {
  background: #0f0f23;
  padding: 30px;
  display: flex;
  gap: 15px;
}

/* Screen Reader Only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.icon-btn {
  background: #667eea;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.icon-btn:focus-visible {
  outline: 3px solid #00d4ff;
  outline-offset: 3px;
}`
    },
    {
      property: "Skip Links",
      description: "Let keyboard users skip to main content. Hidden by default, visible on focus. Essential for accessibility!",
      html: `<div class="skip-demo">
  <a href="#main" class="skip-link">Skip to main content</a>
  <nav class="nav">Navigation (Tab to skip link above)</nav>
  <main id="main" class="main">Main Content</main>
</div>`,
      css: `.skip-demo {
  background: #0f0f23;
  padding: 20px;
  position: relative;
}

.skip-link {
  position: absolute;
  top: -40px; /* Hidden by default */
  left: 0;
  background: #667eea;
  color: white;
  padding: 12px 24px;
  border-radius: 0 0 8px 0;
  font-weight: bold;
  text-decoration: none;
  z-index: 100;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0; /* Visible on keyboard focus */
  outline: 3px solid #00d4ff;
  outline-offset: 3px;
}

.nav {
  background: #1a1a2e;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 20px;
  color: white;
  text-align: center;
}

.main {
  background: #1a1a2e;
  padding: 30px;
  border-radius: 10px;
  color: white;
  min-height: 200px;
}`
    },
    {
      property: "prefers-reduced-motion",
      description: "Respects user's motion preferences. Disable animations for users who prefer reduced motion. Accessibility + UX!",
      html: `<div class="motion-demo">
  <div class="animated-box">I animate (unless you prefer reduced motion)</div>
</div>`,
      css: `.motion-demo {
  background: #0f0f23;
  padding: 60px;
  text-align: center;
}

.animated-box {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 50px;
  border-radius: 12px;
  font-weight: bold;
  
  /* Animations by default */
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animated-box {
    animation: none; /* Disable animation */
  }
}`
    },
    {
      property: "High Contrast Mode",
      description: "Respects user's high contrast preference. Ensure borders/outlines are visible in high contrast mode.",
      html: `<div class="contrast-demo">
  <button class="contrast-btn">High Contrast Friendly</button>
</div>`,
      css: `.contrast-demo {
  background: #0f0f23;
  padding: 40px;
  text-align: center;
}

.contrast-btn {
  background: #667eea;
  color: white;
  border: 2px solid transparent;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .contrast-btn {
    border-color: currentColor;
    outline: 2px solid;
  }
}

.contrast-btn:focus-visible {
  outline: 3px solid #00d4ff;
  outline-offset: 3px;
}`
    },
    {
      property: "Visible Focus Indicators",
      description: "Always provide visible focus indicators. Use outline or box-shadow. Never just outline: none without replacement!",
      html: `<div class="indicator-demo">
  <button class="btn-bad">Bad (no focus)</button>
  <button class="btn-good">Good (visible focus)</button>
</div>`,
      css: `.indicator-demo {
  background: #1a1a2e;
  padding: 30px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-bad {
  background: #e94560;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  outline: none; /* ❌ BAD! Never do this */
}

.btn-good {
  background: #48bb78;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.btn-good:focus-visible {
  /* ✅ GOOD! Visible focus indicator */
  outline: 3px solid #00d4ff;
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(0, 212, 255, 0.2);
}`
    }
  ],

  sandbox: {
    html: `<div class="a11y-demo">
      <!-- Skip Link -->
      <a href="#main-content" class="skip-link">Skip to main content</a>
      
      <header class="header">
        <h1>Accessible Design</h1>
        <p>Built with accessibility in mind</p>
      </header>
      
      <nav class="nav">
        <a href="#" class="nav-link">Home</a>
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Services</a>
        <a href="#" class="nav-link">Contact</a>
      </nav>
      
      <main id="main-content" class="main">
        <section class="section">
          <h2>Focus States</h2>
          <p>Try tabbing through these buttons to see keyboard focus indicators:</p>
          <div class="button-group">
            <button class="btn">Primary Action</button>
            <button class="btn btn--secondary">Secondary</button>
            <button class="icon-btn" aria-label="Close">
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </section>
        
        <section class="section">
          <h2>Form with :focus-within</h2>
          <form class="form">
            <div class="form-field">
              <label for="name">Name</label>
              <input type="text" id="name" placeholder="Your name">
            </div>
            <div class="form-field">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="your@email.com">
            </div>
          </form>
        </section>
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

.a11y-demo {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #667eea;
  color: white;
  padding: 12px 24px;
  border-radius: 0 0 8px 0;
  font-weight: bold;
  text-decoration: none;
  z-index: 1000;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid #00d4ff;
  outline-offset: 3px;
}

/* Header */
.header {
  text-align: center;
  padding: 60px 20px 40px;
}

.header h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 12px;
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header p {
  color: rgba(255,255,255,0.7);
  font-size: 1.2rem;
}

/* Navigation */
.nav {
  display: flex;
  gap: 8px;
  background: #1a1a2e;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s;
}

.nav-link:hover {
  background: rgba(255,255,255,0.1);
}

.nav-link:focus-visible {
  outline: 3px solid #00d4ff;
  outline-offset: 2px;
  background: rgba(102, 126, 234, 0.2);
}

/* Main Content */
.main {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section h2 {
  color: #00d4ff;
  margin-bottom: 16px;
  font-size: 1.8rem;
}

.section p {
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Buttons */
.button-group {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn:focus-visible {
  outline: 3px solid #00d4ff;
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(0, 212, 255, 0.2);
}

.btn--secondary {
  background: rgba(255,255,255,0.1);
  border: 2px solid rgba(255,255,255,0.2);
}

.icon-btn {
  background: #e94560;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:focus-visible {
  outline: 3px solid #00d4ff;
  outline-offset: 3px;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-field {
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #0f3460;
  background: #1a1a2e;
  transition: all 0.3s;
}

.form-field:focus-within {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.form-field label {
  display: block;
  color: #00d4ff;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-field input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #0f0f23;
  color: white;
  font-size: 1rem;
}

.form-field input:focus {
  outline: none;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`
  }
};

export default day14;
