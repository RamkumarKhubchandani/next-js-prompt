export const day17 = {
  day: 17,
  title: "React 19: Ref Improvements & Cleanup",
  intro: "The end of `forwardRef`. React 19 simplifies refs significantly and adds cleanup functions to ref callbacks.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Why <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">forwardRef</code> is deprecated</li>
<li>Passing <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">ref</code> as a standard prop</li>
<li>Returning cleanup functions from ref callbacks</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🗑️ 1. The Death of forwardRef</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">In React 18, if you wanted to pass a ref to a child component, you had to wrap it in <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">forwardRef</code>. It was boilerplate-heavy and messed up type inference.</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-800 dark:text-red-200 text-sm">// ❌ React 18: The Old Way
const MyInput = forwardRef((props, ref) => {
return &lt;input ref={ref} {...props} /&gt;;
});</pre>
</div>

<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<pre class="text-green-800 dark:text-green-200 text-sm">// ✅ React 19: Just use props!
function MyInput({ ref, ...props }) {
return &lt;input ref={ref} {...props} /&gt;;
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧹 2. Ref Callback Cleanup</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Ref callbacks can now return a cleanup function, just like <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useEffect</code>. This is huge for managing DOM listeners or third-party libraries attached to nodes.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-700 dark:text-cyan-300">&lt;div ref={(node) => {
// Mount logic
const observer = new ResizeObserver(...);
observer.observe(node);

// Unmount logic (Cleanup)
return () => {
observer.disconnect();
};
}} /&gt;</pre>
</div>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ REACT 19 REF DEMO                              ║
║      No more forwardRef! Cleanup in callbacks!               ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   NEW FEATURES:                                              ║
║   ═════════════                                              ║
║   1. ref as a prop: <Child ref={myRef} /> works natively     ║
║                                                              ║
║   2. Callback Cleanup:                                       ║
║      ref={node => {                                          ║
║         // init                                              ║
║         return () => { // cleanup }                          ║
║      }}                                                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 👶 CHILD COMPONENT (No forwardRef!)
// ═══════════════════════════════════════════════════════════════
function CustomInput({ ref, placeholder }) {
return (
<input 
  ref={ref}
  placeholder={placeholder}
  style={{
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid #6366f1',
    width: '100%',
    marginBottom: '15px'
  }}
/>
);
}

function App() {
const inputRef = React.useRef(null);
const [width, setWidth] = React.useState(0);

// ═══════════════════════════════════════════════════════════
// 🧹 REF CALLBACK WITH CLEANUP
// ═══════════════════════════════════════════════════════════
// Instead of useEffect, we can manage the ResizeObserver
// directly on the element's ref callback!
const measureRef = (node) => {
if (!node) return;

const observer = new ResizeObserver((entries) => {
  setWidth(entries[0].contentRect.width);
});

observer.observe(node);

// Cleanup function (New in React 19)
return () => observer.disconnect();
};

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>⚛️ React 19 Ref Demo</h3>
  
  <div 
    ref={measureRef} 
    style={{ 
      background: '#e0e7ff', 
      padding: '20px', 
      borderRadius: '12px',
      resize: 'horizontal', 
      overflow: 'auto',
      border: '1px dashed #4338ca'
    }}
  >
    <p style={{ margin: '0 0 10px', color: '#3730a3' }}>
      <strong>Resize me!</strong> Width: {Math.round(width)}px
    </p>
    
    {/* Passing ref as a regular prop! */}
    <CustomInput ref={inputRef} placeholder="I accept refs natively..." />
    
    <button 
      onClick={() => inputRef.current.focus()}
      style={{
        background: '#4f46e5',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer'
      }}
    >
      Focus Input
    </button>
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ React 18: Boilerplate
const Input = forwardRef((props, ref) => (
<input ref={ref} {...props} />
));`,
    senior: `// ✅ React 19: Clean
function Input({ ref, ...props }) {
return <input ref={ref} {...props} />;
}`
  },
  interview: {
    questions: [
      {
        q: "Why is returning a cleanup function from a ref callback useful?",
        a: "It ensures that side effects attached to DOM nodes (like Event Listeners or Observers) are properly cleaned up when the element is removed from the DOM, preventing memory leaks without needing a separate `useEffect`."
      }
    ]
  }
};
