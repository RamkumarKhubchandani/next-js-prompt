export const animationsQuestions = [
    {
        id: 'css-anim-1',
        category: 'Visual & Animations',
        difficulty: 'Easy',
        question: 'Difference between transition and animation?',
        answer: `**Transition implies a change from State A to State B.**
- Requires a trigger (hover, focus, class change).
- Simple (start -> end).

**Animation implies complex, multi-step movement.**
- Can start automatically (no trigger).
- Can loop (\`infinite\`).
- Uses \`@keyframes\` for intermediate steps (0% -> 50% -> 100%).`,
        codeExample: `<style>
  .box { width: 50px; height: 50px; margin: 20px; text-align: center; }

  /* 1. Transition */
  .trans-box {
    background: blue;
    transition: width 1s ease;
  }
  .trans-box:hover { width: 150px; }

  /* 2. Animation */
  @keyframes slide {
    0% { transform: translateX(0); background: red; }
    50% { transform: translateX(50px); background: yellow; }
    100% { transform: translateX(0); background: red; }
  }
  
  .anim-box {
    background: red;
    animation: slide 2s infinite;
  }
</style>

<div class="box trans-box">Hover Me</div>
<div class="box anim-box">Auto</div>`
    },
    {
        id: 'css-anim-2',
        category: 'Visual & Animations',
        difficulty: 'Medium',
        question: 'How do you optimize animations for performance (60fps)?',
        answer: `**Stick to "Compositor-Only" properties.**

**Cheap Properties (GPU handled):**
- \`transform\` (translate, scale, rotate)
- \`opacity\`

**Expensive Properties (Trigger Layout/Paint):**
- \`width\`, \`height\`, \`margin\`, \`padding\` (Layout thrashing)
- \`background-color\`, \`box-shadow\` (Paint)

**Technique:**
- Instead of animating \`left: 100px\`, use \`transform: translateX(100px)\`.`,
        codeExample: `<style>
  .box { width: 50px; height: 50px; background: green; position: relative; margin-bottom: 10px; }
  
  /* BAD (Triggers Layout calculation every frame) */
  .bad {
    animation: moveLeft 2s infinite alternate;
  }
  @keyframes moveLeft {
    to { left: 100px; }
  }
  
  /* GOOD (Handled by GPU) */
  .good {
    animation: moveTransform 2s infinite alternate;
  }
  @keyframes moveTransform {
    to { transform: translateX(100px); }
  }
</style>

<div class="box bad">Bad</div>
<div class="box good">Good</div>`
    },
    {
        id: 'css-anim-3',
        category: 'Visual & Animations',
        difficulty: 'Medium',
        question: 'Overview of CSS 3D Transforms.',
        answer: `**Enabling 3D space requires a perspective.**

**Key Properties:**
1. **perspective:** Add to parent. Determines "how far" the 3D object is (depth).
2. **transform-style: preserve-3d:** Allows children to exist in 3D space.
3. **backface-visibility:** Hides the back side when rotated.`,
        codeExample: `<style>
  .scene {
    perspective: 400px;
    width: 100px; height: 100px;
    margin: 20px;
  }
  
  .card {
    width: 100%; height: 100%;
    position: relative;
    transition: transform 1s;
    transform-style: preserve-3d;
  }
  
  .scene:hover .card {
    transform: rotateY(180deg);
  }
  
  .face {
    position: absolute;
    width: 100%; height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  
  .front { background: blue; }
  .back { background: red; transform: rotateY(180deg); }
</style>

<div class="scene">
  <div class="card">
    <div class="face front">Front</div>
    <div class="face back">Back</div>
  </div>
</div>
<p>Hover to flip!</p>`
    },
    {
        id: 'css-anim-4',
        category: 'Visual & Animations',
        difficulty: 'Hard',
        question: 'How do you create a "Parallax" scrolling effect with CSS only?',
        answer: `**Using 3D usage of perspective and translateZ.**

**Concept:**
- Objects closer to the camera (\`translateZ(0)\`) move faster than background objects (\`translateZ(-10px)\`).
- Requires a wrapper with \`perspective\` and \`overflow-y: auto\` (height must be set).`,
        codeExample: `<style>
  .parallax-wrapper {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    perspective: 10px;
    border: 1px solid black;
  }
  
  header {
    position: relative;
    height: 100%;
    transform-style: preserve-3d;
    z-index: -1;
  }
  
  .background {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    /* Move back 10px, scale up to fill view */
    transform: translateZ(-10px) scale(2);
    background: url('https://picsum.photos/id/10/800/400');
    background-size: cover;
    opacity: 0.5;
  }
  
  .forecast {
    margin-top: -50px;
    background: white;
    padding: 20px;
    min-height: 500px; /* Scrolling content */
  }
  
  h1 { 
     text-align: center; 
     padding-top: 100px; 
     font-size: 3rem;
  }
</style>

<div class="parallax-wrapper">
  <header>
    <div class="background"></div>
    <h1>Parallax Header</h1>
  </header>
  <div class="forecast">
    <h2>Content Layer</h2>
    <p>Scroll down. Notice the background moves slower than this text.</p>
  </div>
</div>`
    },
    {
        id: 'css-anim-5',
        category: 'Visual & Animations',
        difficulty: 'Hard',
        question: 'Explain "animation-fill-mode".',
        answer: `**Controls the state of the element before and after the animation.**

**Values:**
- **none (default):** Reset to initial state after animation.
- **forwards:** Retain the LAST keyframe values (most common).
- **backwards:** Apply the FIRST keyframe value during \`animation-delay\`.
- **both:** Apply both forwards and backwards rules.`,
        codeExample: `<style>
  .box { 
    width: 50px; height: 50px; 
    background: grey; 
    margin: 20px; 
    opacity: 0; /* Initially hidden */
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* 1. None: Jumps back to opacity: 0 after 2s */
  .none { animation: fadeIn 2s; }

  /* 2. Forwards: Stays at opacity: 1 */
  .forwards { animation: fadeIn 2s forwards; }
</style>

<div class="box none">None (Disappears)</div>
<div class="box forwards">Forwards (Stays)</div>`
    }
];
