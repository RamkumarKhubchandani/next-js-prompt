export const day11 = {
  day: 11,
  title: "Portals & Error Boundaries",
  intro: "Render outside the parent hierarchy (Modals) and catch crashes gracefully.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 11. Sometimes you need to break out of the DOM tree (Portals) or catch errors (Boundaries)."
      },
      {
        type: "challenge",
        instruction: "This modal is being clipped by a parent with `overflow: hidden`. Use a Portal to fix it.",
        buggyCode: `// ❌ Clipped by parent
return (
  <div className="modal">I am a modal</div>
);`,
        solutionCode: `// ✅ Escapes parent
return createPortal(
  <div className="modal">I am a modal</div>,
  document.body
);`,
        verifyOutput: "createPortal",
        successMessage: "Correct! `createPortal` renders the element into `document.body`, visually breaking out of the parent container while keeping React events intact.",
        hint: "Use `createPortal(JSX, document.body)`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What are Portals and why you need them</li>
<li>How to render modals, tooltips outside parent</li>
<li>What are Error Boundaries</li>
<li>How to catch and handle component crashes gracefully</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🚪 Portals: Escape the DOM Hierarchy</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Normally, a child renders inside its parent's DOM node. But sometimes you need to break free:</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<p class="text-red-700 dark:text-red-300 font-bold mb-2">❌ The Problem: CSS Inheritance & Overflow</p>
<pre class="text-red-800 dark:text-red-200 text-sm mt-2">&lt;div style={{ overflow: 'hidden' }}&gt;
&lt;Modal /&gt;  {/* Modal gets clipped! Can't escape parent's overflow */}
&lt;/div&gt;

&lt;div style={{ zIndex: 1 }}&gt;
&lt;Tooltip /&gt;  {/* z-index wars! Can't go above other elements */}
&lt;/div&gt;</pre>
</div>

<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<p class="text-green-700 dark:text-green-300 font-bold mb-2">✅ The Solution: Portal</p>
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-green-800 dark:text-green-200 text-sm mt-2">import { createPortal } from 'react-dom';

function Modal({ children }) {
// Render directly into document.body, not parent!
return <span class="text-yellow-700 dark:text-yellow-300">createPortal</span>(
&lt;div className="modal"&gt;{children}&lt;/div&gt;,
<span class="text-yellow-700 dark:text-yellow-300">document.body</span>  // Target DOM node
);
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Portal Behavior</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-gray-800 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
DOM Tree (Visual):              React Tree (Logical):
═══════════════════════         ═════════════════════════

document.body                   &lt;App&gt;
├── #root                         └── &lt;Parent&gt;
│   └── &lt;App&gt;                          └── &lt;Modal&gt;  ← Events still bubble up!
│       └── &lt;Parent&gt;                   
│                               
└── &lt;Modal /&gt; ← Portal renders here!

🎯 KEY INSIGHT: 
Events bubble through the REACT tree, not the DOM tree!
A click in the Modal still bubbles to Parent in React.
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Common Portal Use Cases</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">🗔 Modals/Dialogs</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Render above everything</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">💬 Tooltips</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Escape overflow: hidden</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">📋 Dropdown menus</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Position anywhere on screen</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">🔔 Notifications</p>
    <p class="text-gray-600 dark:text-light-300 text-sm">Toast messages at screen edge</p>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🛡️ Error Boundaries: Catch Component Crashes</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Without Error Boundaries, one component crash = entire app white screen!</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-gray-800 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Without Error Boundary:         With Error Boundary:
════════════════════════        ═══════════════════════════

&lt;App&gt;                           &lt;App&gt;
└── &lt;Dashboard&gt;                 └── &lt;Dashboard&gt;
    └── &lt;Widget&gt; 💥 ERROR           └── &lt;ErrorBoundary&gt;
                                          └── &lt;Widget&gt; 💥 ERROR
    ↓                                     ↓
┌─────────────────────┐         ┌─────────────────────────┐
│                     │         │   Widget crashed!       │
│   WHITE SCREEN      │         │   [Retry] [Report Bug]  │
│   💀 App is dead    │         │                         │
│                     │         │   Rest of app works! ✅ │
└─────────────────────┘         └─────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚙️ Error Boundary Implementation</h3>
<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/30 p-4 rounded-xl mb-6">
<p class="text-yellow-700 dark:text-yellow-300 font-bold mb-2">⚠️ Error Boundaries MUST be class components!</p>
<p class="text-yellow-800 dark:text-yellow-200 text-sm">There's no hook equivalent for getDerivedStateFromError or componentDidCatch (yet).</p>
</div>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">class ErrorBoundary extends React.Component {
state = { hasError: false, error: null };

// Called when child throws - update state to show fallback
static <span class="text-yellow-700 dark:text-yellow-300">getDerivedStateFromError</span>(error) {
return { hasError: true, error };
}

// Called after error - log to error service
<span class="text-yellow-700 dark:text-yellow-300">componentDidCatch</span>(error, errorInfo) {
logErrorToService(error, errorInfo);
}

render() {
if (this.state.hasError) {
  return &lt;FallbackUI error={this.state.error} /&gt;;
}
return this.props.children;
}
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🚫 What Error Boundaries DON'T Catch</h3>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<ul class="text-red-800 dark:text-red-200 text-sm space-y-1">
    <li>• <span class="font-bold">Event handlers</span> - use try/catch inside handlers</li>
    <li>• <span class="font-bold">Async code</span> - setTimeout, Promises need their own handling</li>
    <li>• <span class="font-bold">Server-side rendering</span> - only works on client</li>
    <li>• <span class="font-bold">Errors in the boundary itself</span> - boundaries can't catch their own errors</li>
</ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Portal target should exist</span> - create a div in index.html for modals</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Multiple error boundaries</span> - wrap different sections independently</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Error boundaries for routes</span> - each page can have its own boundary</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Libraries like react-error-boundary</span> - adds hooks and more features</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║          🎯 ERROR BOUNDARIES - Graceful Crash Handling       ║
║      Catch JavaScript errors anywhere in child component     ║
║                tree and display a fallback UI!               ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   WITHOUT ERROR BOUNDARY:                                    ║
║   ══════════════════════                                     ║
║                                                              ║
║   Component throws error → Entire app crashes → White screen ║
║                                                              ║
║   WITH ERROR BOUNDARY:                                       ║
║   ════════════════════                                       ║
║                                                              ║
║   Component throws error → Boundary catches → Fallback UI    ║
║                                                              ║
║   LIFECYCLE METHODS:                                         ║
║   ══════════════════                                         ║
║                                                              ║
║   static getDerivedStateFromError(error)                     ║
║     → Called during "render" phase                           ║
║     → Returns new state to trigger fallback UI               ║
║                                                              ║
║   componentDidCatch(error, errorInfo)                        ║
║     → Called during "commit" phase                           ║
║     → Perfect for logging errors to a service                ║
║                                                              ║
║   ⚠️ NOTE: Error Boundaries MUST be class components!        ║
║            (There's no hook equivalent yet)                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🛡️ ERROR BOUNDARY (Class Component - Required!)
// ═══════════════════════════════════════════════════════════════
// Error Boundaries MUST be class components because they need:
//   - getDerivedStateFromError (no hook equivalent)
//   - componentDidCatch (no hook equivalent)
//
// Wrap risky components in an ErrorBoundary to prevent crashes!
// ═══════════════════════════════════════════════════════════════
class ErrorBoundary extends React.Component {
// State to track if an error occurred
state = { hasError: false, error: null, errorInfo: null };

// Called when a child throws an error
// Returns object to update state (triggers re-render with fallback)
static getDerivedStateFromError(error) {
return { hasError: true, error };
}

// Called after error is caught - perfect for logging!
componentDidCatch(error, errorInfo) {
console.error('ErrorBoundary caught:', error, errorInfo);
// In production: Send to error tracking service
// logErrorToService(error, errorInfo);
}

render() {
if (this.state.hasError) {
  // 🎨 FALLBACK UI - Show this instead of white screen
  return (
    <div style={{ 
      padding: '20px', 
      background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      border: '2px solid #ef4444',
      borderRadius: '12px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>💥</div>
      <h3 style={{ color: '#dc2626', margin: '0 0 10px' }}>Oops! Something Crashed</h3>
      <p style={{ color: '#7f1d1d', margin: '0 0 15px' }}>
        {this.state.error?.message || 'Unknown error'}
      </p>
      <button 
        onClick={() => this.setState({ hasError: false, error: null })}
        style={{
          padding: '10px 20px',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        🔄 Try Again
      </button>
    </div>
  );
}

// No error - render children normally
return this.props.children;
}
}

// ═══════════════════════════════════════════════════════════════
// 💣 BUGGY COMPONENT (Will crash on purpose!)
// ═══════════════════════════════════════════════════════════════
function BuggyComponent({ shouldCrash }) {
// This simulates a runtime error (like undefined.map())
if (shouldCrash) {
throw new Error('Component crashed! (Simulated error)');
}

return (
<div style={{
  padding: '20px',
  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  border: '2px solid #22c55e',
  borderRadius: '12px',
  textAlign: 'center'
}}>
  <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
  <p style={{ color: '#166534', margin: 0, fontWeight: 'bold' }}>
    Component is working perfectly!
  </p>
</div>
);
}

function App() {
const [crash, setCrash] = React.useState(false);

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>🛡️ Error Boundary Demo</h3>
  
  {/* Wrap potentially buggy components */}
  <ErrorBoundary>
    <BuggyComponent shouldCrash={crash} />
  </ErrorBoundary>
  
  <div style={{ marginTop: '15px' }}>
    <button 
      onClick={() => setCrash(true)}
      style={{
        padding: '12px 24px',
        background: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      💥 Trigger Error
    </button>
  </div>
  
  <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
    💡 Click the button - the boundary catches the crash!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Z-Index Wars
<div style={{ zIndex: 9999, position: 'fixed' }}>
Modal (Might be clipped by parent overflow: hidden)
</div>`,
    senior: `// ✅ Portal
createPortal(
<div className="modal">Modal (True Top Layer)</div>,
document.body
);`
  },
  interview: {
    questions: [
      {
        q: "Can Error Boundaries catch errors in Event Handlers?",
        a: "No. They only catch errors during rendering, lifecycle methods, and constructors. Use `try/catch` for handlers."
      }
    ]
  }
};
