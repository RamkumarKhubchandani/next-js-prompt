export const day22 = {
  day: 22,
  title: "Advanced Patterns: Headless UI & Slots",
  intro: "Build reusable, accessible component libraries. Separate logic from UI using Headless Hooks and Composition.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What is "Headless UI"?</li>
<li>Building a <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useToggle</code> hook with accessibility props</li>
<li>The "Slots" pattern for flexible layouts</li>
<li>Inversion of Control</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💀 1. Headless UI Concept</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">A "Headless" component provides <strong>logic and accessibility</strong> but <strong>no styles</strong>. It gives you full control over the look and feel.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">// 1. Headless Hook (Logic + A11y)
function useSwitch() {
const [on, setOn] = useState(false);
const toggle = () => setOn(!on);

return {
isOn: on,
switchProps: {
  role: 'switch',
  'aria-checked': on,
  onClick: toggle,
}
};
}

// 2. UI Component (Styles)
function MySwitch() {
const { isOn, switchProps } = useSwitch();
return <button className={isOn ? 'bg-green' : 'bg-gray'} {...switchProps} />;
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎰 2. The Slots Pattern</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Instead of <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">children</code>, allow users to inject content into specific "slots" of your layout.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-gray-800 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
// Flexible Layout
function PageLayout({ header, sidebar, content }) {
return (
&lt;div className="grid"&gt;
  &lt;div className="head"&gt;{header}&lt;/div&gt;
  &lt;div className="side"&gt;{sidebar}&lt;/div&gt;
  &lt;div className="main"&gt;{content}&lt;/div&gt;
&lt;/div&gt;
);
}

// Usage
&lt;PageLayout 
header={&lt;Nav /&gt;} 
sidebar={&lt;Menu /&gt;} 
content={&lt;Feed /&gt;} 
/&gt;
</pre>
</div>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ HEADLESS UI PATTERN DEMO                        ║
║      Separate Logic (Hook) from UI (Component)               ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   GOAL: Build a "Toggle" logic that can power ANY UI.        ║
║                                                              ║
║   1. useToggle() -> Returns state + accessibility props      ║
║   2. IOSSwitch   -> Looks like iOS                           ║
║   3. ButtonSwitch -> Looks like a button                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🧠 HEADLESS LOGIC HOOK
// ═══════════════════════════════════════════════════════════════
function useToggle({ initial = false } = {}) {
const [on, setOn] = React.useState(initial);

const toggle = () => setOn(!on);

// Return "Prop Getters" or plain props object
return {
on,
toggle,
// Accessibility props pre-wired!
getTogglerProps: ({ onClick, ...props } = {}) => ({
  'aria-pressed': on,
  onClick: (e) => {
    toggle();
    if (onClick) onClick(e);
  },
  ...props
})
};
}

// ═══════════════════════════════════════════════════════════════
// 🎨 UI 1: iOS STYLE SWITCH
// ═══════════════════════════════════════════════════════════════
function IOSSwitch() {
const { on, getTogglerProps } = useToggle();

return (
<div style={{ marginBottom: '20px' }}>
  <p>iOS Style:</p>
  <button 
    {...getTogglerProps()}
    style={{
      width: '50px',
      height: '30px',
      borderRadius: '30px',
      background: on ? '#34c759' : '#e2e8f0',
      border: 'none',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.3s'
    }}
  >
    <div style={{
      width: '26px',
      height: '26px',
      background: 'white',
      borderRadius: '50%',
      position: 'absolute',
      top: '2px',
      left: on ? '22px' : '2px',
      transition: 'left 0.3s',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }} />
  </button>
</div>
);
}

// ═══════════════════════════════════════════════════════════════
// 🎨 UI 2: SIMPLE BUTTON
// ═══════════════════════════════════════════════════════════════
function ButtonSwitch() {
// We reuse the EXACT same logic!
const { on, getTogglerProps } = useToggle({ initial: true });

return (
<div>
  <p>Button Style:</p>
  <button
    {...getTogglerProps()}
    style={{
      padding: '10px 20px',
      background: on ? '#3b82f6' : '#cbd5e1',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}
  >
    {on ? 'ON' : 'OFF'}
  </button>
</div>
);
}

function App() {
return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>💀 Headless UI Demo</h3>
  <p style={{ color: '#64748b', fontSize: '14px' }}>
    Two very different UIs powered by the same <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useToggle</code> hook.
  </p>
  
  <div style={{ 
    padding: '20px', 
    border: '1px solid #e2e8f0', 
    borderRadius: '12px',
    background: '#f8fafc'
  }}>
    <IOSSwitch />
    <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />
    <ButtonSwitch />
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Hardcoded UI Logic
function Switch({ on, setOn }) {
return <div className={on ? 'on' : 'off'} onClick={() => setOn(!on)} />;
}
// Hard to reuse for a Button or Checkbox`,
    senior: `// ✅ Headless Hook
const { props } = useSwitch();
// Apply to ANY element:
<div {...props} /> 
<button {...props} />
<CustomElement {...props} />`
  },
  interview: {
    questions: [
      {
        q: "What is Inversion of Control in React?",
        a: "Giving the user of your component control over rendering. Examples include Render Props, Compound Components, and Headless UI hooks."
      },
      {
        q: "Why return 'prop getters' from a hook?",
        a: "Prop getters (like `getTogglerProps`) allow the user to compose their own event handlers with the hook's internal handlers safely."
      }
    ]
  }
};
