export const animationQuestions = [
    {
        id: 'react-anim-1',
        category: 'Animation',
        difficulty: 'Hard',
        question: 'CSS-in-JS Performance - Styled Components vs Emotion',
        answer: `Performance consideration asked at **design-focused companies**.

### CSS-in-JS Libraries:
1. **Styled Components** - Template literals, runtime
2. **Emotion** - Object/string styles, faster
3. **Vanilla Extract** - Zero-runtime, build-time
4. **Tailwind CSS** - Utility-first, no runtime

### Performance Impact:
- Runtime CSS-in-JS adds overhead
- Dynamic styles cause re-renders
- Build-time solutions are faster

### Best Practices:
- Extract static styles
- Use css prop for dynamic styles
- Consider zero-runtime solutions
- Measure performance impact`,
        codeExample: `// CSS-in-JS Performance
console.log('=== Styled Components (Runtime) ===');

console.log('import styled from "styled-components";');
console.log('');
console.log('const Button = styled.button\`');
console.log('  background: \${props => props.primary ? "blue" : "gray"};');
console.log('  padding: 10px 20px;');
console.log('  border-radius: 4px;');
console.log('\`;');
console.log('');
console.log('// Runtime: Styles generated on every render');
console.log('// Performance: ~2-3ms per component');

console.log('\\n=== Emotion (Faster Runtime) ===');

console.log('\\nimport { css } from "@emotion/react";');
console.log('');
console.log('const buttonStyle = css\`');
console.log('  padding: 10px 20px;');
console.log('  border-radius: 4px;');
console.log('\`;');
console.log('');
console.log('<button css={buttonStyle}>Click</button>');
console.log('');
console.log('// Runtime: Optimized, faster than styled-components');
console.log('// Performance: ~1-2ms per component');

console.log('\\n=== Vanilla Extract (Zero Runtime) ===');

console.log('\\n// button.css.ts');
console.log('import { style } from "@vanilla-extract/css";');
console.log('');
console.log('export const button = style({');
console.log('  padding: "10px 20px",');
console.log('  borderRadius: 4');
console.log('});');
console.log('');
console.log('// Compiled to static CSS at build time');
console.log('// Performance: 0ms runtime overhead!');

console.log('\\n=== Performance Comparison ===');

const perf = {
  'Styled Components': { runtime: '2-3ms', bundle: '+14KB' },
  'Emotion': { runtime: '1-2ms', bundle: '+7KB' },
  'Vanilla Extract': { runtime: '0ms', bundle: '+2KB' },
  'Tailwind CSS': { runtime: '0ms', bundle: '+3KB' }
};

Object.entries(perf).forEach(([lib, metrics]) => {
  console.log('\\n' + lib + ':');
  console.log('  Runtime:', metrics.runtime);
  console.log('  Bundle:', metrics.bundle);
});

console.log('\\n✓ Zero-runtime for best performance');
console.log('✓ Use runtime CSS-in-JS sparingly');`
    },
    {
        id: 'react-anim-2',
        category: 'Animation',
        difficulty: 'Hard',
        question: 'Framer Motion - Declarative Animations',
        answer: `Popular animation library asked at **product companies**.

### Key Features:
- Declarative API
- Gesture support
- Layout animations
- Variants for orchestration

### Core Concepts:
1. **motion components** - Animated versions of HTML elements
2. **animate prop** - Target state
3. **variants** - Named animation states
4. **AnimatePresence** - Exit animations

### Use Cases:
- Page transitions
- List animations
- Gesture-based interactions
- Layout shifts`,
        codeExample: `// Framer Motion Basics
console.log('=== Basic Animation ===');

console.log('import { motion } from "framer-motion";');
console.log('');
console.log('<motion.div');
console.log('  initial={{ opacity: 0, y: 20 }}');
console.log('  animate={{ opacity: 1, y: 0 }}');
console.log('  transition={{ duration: 0.5 }}');
console.log('>');
console.log('  Fade in from below');
console.log('</motion.div>');

console.log('\\n=== Variants for Orchestration ===');

console.log('\\nconst container = {');
console.log('  hidden: { opacity: 0 },');
console.log('  show: {');
console.log('    opacity: 1,');
console.log('    transition: { staggerChildren: 0.1 }');
console.log('  }');
console.log('};');
console.log('');
console.log('const item = {');
console.log('  hidden: { opacity: 0, y: 20 },');
console.log('  show: { opacity: 1, y: 0 }');
console.log('};');
console.log('');
console.log('<motion.ul variants={container} initial="hidden" animate="show">');
console.log('  <motion.li variants={item}>Item 1</motion.li>');
console.log('  <motion.li variants={item}>Item 2</motion.li>');
console.log('  <motion.li variants={item}>Item 3</motion.li>');
console.log('</motion.ul>');
console.log('');
console.log('// Children animate with stagger delay');

console.log('\\n=== Exit Animations ===');

console.log('\\nimport { AnimatePresence } from "framer-motion";');
console.log('');
console.log('<AnimatePresence>');
console.log('  {isVisible && (');
console.log('    <motion.div');
console.log('      initial={{ opacity: 0 }}');
console.log('      animate={{ opacity: 1 }}');
console.log('      exit={{ opacity: 0 }}');
console.log('    >');
console.log('      Content');
console.log('    </motion.div>');
console.log('  )}');
console.log('</AnimatePresence>');

console.log('\\n=== Gestures ===');

console.log('\\n<motion.button');
console.log('  whileHover={{ scale: 1.1 }}');
console.log('  whileTap={{ scale: 0.95 }}');
console.log('  drag');
console.log('  dragConstraints={{ left: 0, right: 300 }}');
console.log('>');
console.log('  Drag me');
console.log('</motion.button>');

console.log('\\n✓ Framer Motion: powerful, declarative');
console.log('✓ Great for complex animations');`
    },
    {
        id: 'react-anim-3',
        category: 'Animation',
        difficulty: 'Medium',
        question: 'React Spring - Physics-Based Animations',
        answer: `Spring-physics library for **natural animations**.

### Key Concept:
Animations based on spring physics, not duration/easing.

### Core Hooks:
1. **useSpring** - Single animated value
2. **useSprings** - Multiple values
3. **useTrail** - Staggered animations
4. **useTransition** - Mount/unmount animations

### Benefits:
- Natural, realistic motion
- Interruptible animations
- Better UX than linear animations

### When to Use:
- Drag and drop
- Smooth transitions
- Interactive animations`,
        codeExample: `// React Spring
console.log('=== useSpring Hook ===');

console.log('import { useSpring, animated } from "react-spring";');
console.log('');
console.log('function FadeIn() {');
console.log('  const styles = useSpring({');
console.log('    from: { opacity: 0, transform: "translateY(20px)" },');
console.log('    to: { opacity: 1, transform: "translateY(0px)" }');
console.log('  });');
console.log('  ');
console.log('  return <animated.div style={styles}>Content</animated.div>;');
console.log('}');

console.log('\\n=== Interactive Animation ===');

console.log('\\nfunction Toggle() {');
console.log('  const [isOpen, setIsOpen] = useState(false);');
console.log('  ');
console.log('  const styles = useSpring({');
console.log('    height: isOpen ? 200 : 0,');
console.log('    opacity: isOpen ? 1 : 0,');
console.log('    config: { tension: 300, friction: 30 }');
console.log('  });');
console.log('  ');
console.log('  return (');
console.log('    <>');
console.log('      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>');
console.log('      <animated.div style={styles}>Content</animated.div>');
console.log('    </>');
console.log('  );');
console.log('}');

console.log('\\n=== useTrail (Stagger) ===');

console.log('\\nconst items = ["A", "B", "C"];');
console.log('const trail = useTrail(items.length, {');
console.log('  from: { opacity: 0, x: -20 },');
console.log('  to: { opacity: 1, x: 0 }');
console.log('});');
console.log('');
console.log('trail.map((style, index) => (');
console.log('  <animated.div key={index} style={style}>');
console.log('    {items[index]}');
console.log('  </animated.div>');
console.log('));');

console.log('\\n=== Spring Config ===');

console.log('\\nconfig: {');
console.log('  tension: 170,  // Spring strength');
console.log('  friction: 26,  // Resistance');
console.log('  mass: 1        // Weight');
console.log('}');
console.log('');
console.log('// Presets: default, gentle, wobbly, stiff, slow, molasses');

console.log('\\n✓ React Spring: physics-based, natural');
console.log('✓ Great for interactive UIs');`
    },
    {
        id: 'react-anim-4',
        category: 'Animation',
        difficulty: 'Expert',
        question: 'FLIP Animations - High-Performance Layout Animations',
        answer: `Advanced technique asked at **performance-focused companies**.

### FLIP Stands For:
- **F**irst - Capture initial position
- **L**ast - Capture final position
- **I**nvert - Calculate difference
- **P**lay - Animate with transform

### Why FLIP?
- Animating layout (width, height, top, left) is slow
- Transform (translate, scale) is fast (GPU-accelerated)
- FLIP makes layout changes look smooth

### Use Cases:
- Shared element transitions
- List reordering
- Grid layout changes
- Card expansions

### Libraries:
- Framer Motion (layoutId)
- React Flip Toolkit
- Auto Animate`,
        codeExample: `// FLIP Animation Technique
console.log('=== FLIP Concept ===');

console.log('Problem: Animating layout is slow');
console.log('  • width, height, top, left trigger layout');
console.log('  • Causes reflow, slow performance');
console.log('');
console.log('Solution: FLIP technique');
console.log('  • Use fast transform instead');
console.log('  • 60fps smooth animations');

console.log('\\n=== Manual FLIP Implementation ===');

console.log('\\nfunction flipAnimation(element, newPosition) {');
console.log('  // F - First: Get initial position');
console.log('  const first = element.getBoundingClientRect();');
console.log('  ');
console.log('  // L - Last: Move to final position (instant)');
console.log('  element.style.left = newPosition.x + "px";');
console.log('  element.style.top = newPosition.y + "px";');
console.log('  const last = element.getBoundingClientRect();');
console.log('  ');
console.log('  // I - Invert: Calculate difference');
console.log('  const deltaX = first.left - last.left;');
console.log('  const deltaY = first.top - last.top;');
console.log('  ');
console.log('  // P - Play: Animate with transform');
console.log('  element.style.transform = \`translate(\${deltaX}px, \${deltaY}px)\`;');
console.log('  element.style.transition = "transform 0s";');
console.log('  ');
console.log('  requestAnimationFrame(() => {');
console.log('    element.style.transition = "transform 0.3s ease-out";');
console.log('    element.style.transform = "translate(0, 0)";');
console.log('  });');
console.log('}');

console.log('\\n=== Framer Motion layoutId ===');

console.log('\\n// Automatic FLIP with layoutId');
console.log('<motion.div layoutId="card">');
console.log('  {isExpanded ? <ExpandedCard /> : <CollapsedCard />}');
console.log('</motion.div>');
console.log('');
console.log('// Framer Motion handles FLIP automatically!');

console.log('\\n=== List Reordering Example ===');

console.log('\\nconst [items, setItems] = useState(["A", "B", "C"]);');
console.log('');
console.log('items.map(item => (');
console.log('  <motion.div');
console.log('    key={item}');
console.log('    layout // Enable FLIP');
console.log('    transition={{ duration: 0.3 }}');
console.log('  >');
console.log('    {item}');
console.log('  </motion.div>');
console.log('));');
console.log('');
console.log('// Reordering animates smoothly');

console.log('\\n=== Performance Comparison ===');

const perfComparison = {
  'Layout Animation': { fps: '15-30', method: 'width/height/top/left' },
  'FLIP Animation': { fps: '60', method: 'transform (GPU)' }
};

Object.entries(perfComparison).forEach(([type, metrics]) => {
  console.log('\\n' + type + ':');
  console.log('  FPS:', metrics.fps);
  console.log('  Method:', metrics.method);
});

console.log('\\n✓ FLIP: smooth 60fps layout animations');
console.log('✓ Use transform, not layout properties');
console.log('✓ Framer Motion handles it automatically');`
    }
];
