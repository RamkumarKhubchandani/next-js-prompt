export const day19 = {
  day: 19,
  title: "React 19: Web Components & Error Reporting",
  intro: "First-class support for Custom Elements and better error handling hooks.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Using Web Components (Custom Elements) in React</li>
<li>Handling properties vs attributes</li>
<li>New Error Reporting hooks: <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">onCaughtError</code></li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧩 1. Web Components Finally Work</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">React 19 passes data to custom elements as properties if they exist, and attributes if they don't. It also handles events correctly.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">// React 19 passes complex data correctly!
&lt;my-calendar
date={new Date()}
events={eventList} 
/&gt;</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🚨 2. Better Error Reporting</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">New options for <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">createRoot</code> and <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">hydrateRoot</code> to handle errors globally.</p>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">onCaughtError</code>: Triggered when an Error Boundary catches an error.</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">onUncaughtError</code>: Triggered when an error bubbles to the top.</li>
</ul>
            `,
  code: `// Conceptual Demo for Web Components
// Assuming <fancy-button> is defined in the browser

function App() {
return (
<div>
  <h3>🧩 Web Component Support</h3>
  <p>React 19 allows passing objects and functions to Custom Elements.</p>
  
  {/* 
    In React 18, 'user' would be stringified to "[object Object]"
    In React 19, it is passed as a DOM property!
  */}
  {/* <user-card user={{ name: 'John', id: 1 }} /> */}
  
  <div style={{ padding: '10px', background: '#eee' }}>
    <em>(Requires a Custom Element registry to demonstrate visually)</em>
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ React 18 Hack
const ref = useRef();
useEffect(() => {
ref.current.data = complexData; // Manual assignment
}, [complexData]);

return <my-element ref={ref} />;`,
    senior: `// ✅ React 19 Native
<my-element data={complexData} />;`
  },
  interview: {
    questions: [
      {
        q: "What changed regarding Custom Elements in React 19?",
        a: "React 19 checks if a prop exists as a property on the DOM instance. If so, it assigns it as a property (allowing objects/arrays). If not, it sets it as an attribute (string)."
      }
    ]
  }
};
