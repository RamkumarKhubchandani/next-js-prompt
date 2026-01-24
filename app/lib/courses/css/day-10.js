export const day10 = {
  day: 10,
  title: "Transitions & Animations",
  subtitle: "Bring Your UI to Life",
  intro: "Master CSS transitions and animations to create smooth, performant motion. Learn keyframes, transforms, and animation best practices.",
  duration: "35 min",

  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "For performance, **only animate transform and opacity**. Animating width, height, or top/left triggers layout recalculation (slow). Use transform: translateX() instead of left."
      },
      {
        type: "challenge",
        task: "Make this button smoothly scale up on hover using a transition.",
        buggyCode: `.button:hover {
  transform: scale(1.1);
  /* No transition - instant change */
}`,
        solutionCode: `.button {
  transition: transform 0.2s ease;
}
.button:hover {
  transform: scale(1.1);
}`,
        verifyOutput: (code) => code.includes("transition"),
        successMessage: "Perfect! Transitions create smooth changes between states. Always put transition on the base element, not :hover.",
        hint: "Add `transition: transform 0.2s ease` to the base .button class."
      }
    ]
  },

  content: `
<h2>Transitions vs Animations</h2>
<ul>
  <li><strong>Transitions</strong>: Smooth changes between two states (hover, focus, etc.)</li>
  <li><strong>Animations</strong>: Complex, multi-step sequences with @keyframes</li>
</ul>

<h3>Performance Rules</h3>
<p>For 60fps animations:</p>
<ul>
  <li>✅ Animate <code>transform</code> and <code>opacity</code> only</li>
  <li>❌ Avoid animating <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code></li>
  <li>Use <code>transform: translateX()</code> instead of <code>left</code></li>
  <li>Use <code>transform: scale()</code> instead of <code>width/height</code></li>
</ul>

<h2>Transform Functions</h2>
<ul>
  <li><code>translate(x, y)</code>: Move element</li>
  <li><code>scale(x, y)</code>: Resize element</li>
  <li><code>rotate(deg)</code>: Rotate element</li>
  <li><code>skew(x, y)</code>: Skew element</li>
</ul>
  `,

  checkpoints: [
    {
      question: "Which properties should you animate for best performance?",
      options: [
        "transform and opacity",
        "width and height",
        "top and left",
        "margin and padding"
      ],
      correct: 0,
      explanation: "transform and opacity are GPU-accelerated and don't trigger layout recalculation. They're the most performant properties to animate."
    },
    {
      question: "Where should you put the transition property?",
      options: [
        "On the :hover state",
        "On the base element",
        "On both",
        "Doesn't matter"
      ],
      correct: 1,
      explanation: "Put transition on the base element so it applies both when entering and leaving the state."
    },
    {
      question: "What's the difference between transition and animation?",
      options: [
        "Transition is for state changes, animation uses @keyframes for complex sequences",
        "They're the same",
        "Animation is deprecated",
        "Transition is faster"
      ],
      correct: 0,
      explanation: "Transitions smooth changes between states. Animations use @keyframes for multi-step, complex sequences."
    }
  ],

  recap: {
    takeaways: [
      "Only animate transform and opacity for 60fps performance.",
      "Put transition on base element, not :hover.",
      "Use @keyframes for complex, multi-step animations.",
      "transform: translateX() is faster than left.",
      "animation-fill-mode controls state before/after animation."
    ],
    commonMistakes: [
      "Animating width, height, top, left (slow).",
      "Putting transition on :hover instead of base.",
      "Not using will-change for heavy animations.",
      "Forgetting animation-fill-mode: forwards."
    ],
    nextActions: [
      "Create a loading spinner with @keyframes.",
      "Build a smooth page transition.",
      "Day 11: CSS Architecture."
    ]
  },

  propertyExamples: [
    {
      property: "transition (basic)",
      description: "Smoothly animates property changes. Syntax: transition: property duration timing-function delay. Put on base element, not :hover.",
      html: `<div class="transition-demo">
  <button class="btn">Hover Me</button>
</div>`,
      css: `.transition-demo {
  background: #0f0f23;
  padding: 40px;
  text-align: center;
}

.btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  
  /* Transition on base element */
  transition: transform 0.3s ease, background 0.3s ease;
}

.btn:hover {
  transform: scale(1.1);
  background: #764ba2;
}

.btn:active {
  transform: scale(0.95);
}`
    },
    {
      property: "transform: translate",
      description: "Moves an element without affecting layout. Use translateX/Y instead of top/left for better performance.",
      html: `<div class="translate-demo">
  <div class="box">Hover to Move</div>
</div>`,
      css: `.translate-demo {
  background: #1a1a2e;
  padding: 60px;
  text-align: center;
}

.box {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 50px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.box:hover {
  /* Move right 20px, down 10px */
  transform: translate(20px, 10px);
}`
    },
    {
      property: "transform: scale",
      description: "Resizes an element. Use instead of width/height for better performance. Values: 1 = normal, >1 = larger, <1 = smaller.",
      html: `<div class="scale-demo">
  <div class="scale-box">Hover to Grow</div>
</div>`,
      css: `.scale-demo {
  background: #0f0f23;
  padding: 60px;
  text-align: center;
}

.scale-box {
  display: inline-block;
  background: #48bb78;
  color: white;
  padding: 30px 50px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}

.scale-box:hover {
  transform: scale(1.2); /* 20% larger */
}

.scale-box:active {
  transform: scale(0.9); /* 10% smaller */
}`
    },
    {
      property: "transform: rotate",
      description: "Rotates an element. Use degrees (deg) or turns (turn). Positive = clockwise, negative = counter-clockwise.",
      html: `<div class="rotate-demo">
  <div class="rotate-box">🔄 Hover</div>
</div>`,
      css: `.rotate-demo {
  background: #1a1a2e;
  padding: 60px;
  text-align: center;
}

.rotate-box {
  display: inline-block;
  background: #e94560;
  color: white;
  padding: 30px 50px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 24px;
  transition: transform 0.5s ease;
  cursor: pointer;
}

.rotate-box:hover {
  transform: rotate(360deg); /* Full rotation */
}`
    },
    {
      property: "Multiple Transforms",
      description: "Combine multiple transform functions in one property. Order matters! Read right-to-left in execution.",
      html: `<div class="multi-demo">
  <div class="multi-box">Hover for Combo</div>
</div>`,
      css: `.multi-demo {
  background: #0f0f23;
  padding: 60px;
  text-align: center;
}

.multi-box {
  display: inline-block;
  background: linear-gradient(to right, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 30px 50px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  transition: transform 0.4s ease;
  cursor: pointer;
}

.multi-box:hover {
  /* Combines: scale, rotate, translate */
  transform: scale(1.1) rotate(5deg) translateY(-10px);
}`
    },
    {
      property: "transition-timing-function",
      description: "Controls the speed curve. Values: ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier(). Affects animation feel.",
      html: `<div class="timing-demo">
  <div class="timing-box ease">ease</div>
  <div class="timing-box linear">linear</div>
  <div class="timing-box ease-in-out">ease-in-out</div>
  <div class="timing-box bounce">bounce</div>
</div>`,
      css: `.timing-demo {
  background: #1a1a2e;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.timing-box {
  background: #667eea;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  width: 150px;
}

.ease {
  transition: transform 0.5s ease;
}

.linear {
  transition: transform 0.5s linear;
}

.ease-in-out {
  transition: transform 0.5s ease-in-out;
}

.bounce {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.timing-box:hover {
  transform: translateX(200px);
}`
    },
    {
      property: "@keyframes (basic)",
      description: "Defines multi-step animations. Use percentages (0%, 50%, 100%) or keywords (from, to) to define animation steps.",
      html: `<div class="keyframes-demo">
  <div class="pulse-box">Pulsing</div>
</div>`,
      css: `@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.keyframes-demo {
  background: #0f0f23;
  padding: 60px;
  text-align: center;
}

.pulse-box {
  display: inline-block;
  background: #48bb78;
  color: white;
  padding: 30px 50px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  animation: pulse 2s ease-in-out infinite;
}`
    },
    {
      property: "animation (full syntax)",
      description: "Syntax: animation: name duration timing-function delay iteration-count direction fill-mode play-state. Shorthand for all animation properties.",
      html: `<div class="animation-demo">
  <div class="slide-box">Sliding Loop</div>
</div>`,
      css: `@keyframes slide {
  0% { transform: translateX(-100px); }
  50% { transform: translateX(100px); }
  100% { transform: translateX(-100px); }
}

.animation-demo {
  background: #1a1a2e;
  padding: 60px;
  text-align: center;
}

.slide-box {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 50px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  
  /* name duration timing delay iteration direction fill-mode */
  animation: slide 3s ease-in-out 0s infinite alternate both;
}`
    },
    {
      property: "animation-fill-mode",
      description: "Controls styles before/after animation. forwards = keep end state, backwards = apply start state, both = both.",
      html: `<div class="fillmode-demo">
  <div class="fill-box">Fades In (stays visible)</div>
</div>`,
      css: `@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fillmode-demo {
  background: #0f0f23;
  padding: 60px;
  text-align: center;
}

.fill-box {
  display: inline-block;
  background: #e94560;
  color: white;
  padding: 30px 50px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  
  animation: fadeIn 1s ease;
  animation-fill-mode: forwards; /* Keeps end state */
}`
    },
    {
      property: "Loading Spinner",
      description: "Classic loading spinner using @keyframes rotate. Infinite animation with linear timing for smooth rotation.",
      html: `<div class="spinner-demo">
  <div class="spinner"></div>
</div>`,
      css: `@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner-demo {
  background: #1a1a2e;
  padding: 60px;
  text-align: center;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 6px solid rgba(255, 255, 255, 0.1);
  border-top-color: #667eea;
  border-radius: 50%;
  display: inline-block;
  animation: spin 1s linear infinite;
}`
    }
  ],

  sandbox: {
    html: `<div class="animation-showcase">
  <h1 class="fade-in">CSS Animations Showcase</h1>
  
  <div class="cards">
    <div class="card hover-lift">
      <div class="icon">🚀</div>
      <h3>Hover Lift</h3>
      <p>Smooth scale and translate on hover</p>
    </div>
    
    <div class="card hover-lift">
      <div class="icon">⚡</div>
      <h3>Transform</h3>
      <p>GPU-accelerated animations</p>
    </div>
    
    <div class="card hover-lift">
      <div class="icon">✨</div>
      <h3>Smooth</h3>
      <p>60fps performance</p>
    </div>
  </div>
  
  <div class="loading-section">
    <div class="spinner"></div>
    <p class="pulse-text">Loading...</p>
  </div>
  
  <button class="animated-button">
    Click Me
  </button>
</div>`,
    css: `@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f0f23;
  color: white;
}

.animation-showcase {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
}

h1 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 60px;
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeIn 1s ease;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.card {
  background: #1a1a2e;
  border: 2px solid #0f3460;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
}

.hover-lift {
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: #667eea;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}

.icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.card h3 {
  color: #00d4ff;
  margin-bottom: 12px;
  font-size: 1.5rem;
}

.card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.loading-section {
  text-align: center;
  padding: 60px 0;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 6px solid rgba(255, 255, 255, 0.1);
  border-top-color: #667eea;
  border-radius: 50%;
  display: inline-block;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.pulse-text {
  font-size: 1.2rem;
  color: #667eea;
  font-weight: bold;
  animation: pulse 2s ease-in-out infinite;
}

.animated-button {
  display: block;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 20px 60px;
  border-radius: 50px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.animated-button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.animated-button:active {
  transform: scale(0.95);
}`
  }
};

export default day10;
