export const day04 = {
  day: 4,
  title: "State Management & Batching",
  intro: "React 18 batches state updates automatically to prevent unnecessary renders.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Automatic Batching</h3>
<p>Multiple <code class="bg-dark-700 text-brand-primary px-1 rounded">setState</code> calls are grouped into one render.</p>
            `,
  code: `function App() {
const [count, setCount] = React.useState(0);
const [flag, setFlag] = React.useState(false);
const [renders, setRenders] = React.useState(0);

React.useEffect(() => {
setRenders(r => r + 1);
});

const handleClick = () => {
// React 18 batches these into ONE render!
setCount(c => c + 1);
setFlag(f => !f);
};

return (
<div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
  <h3>State Batching Demo</h3>
  <p>Count: {count}</p>
  <p>Flag: {flag ? 'ON' : 'OFF'}</p>
  <p style={{ color: '#666' }}>Render count: {renders}</p>
  <button onClick={handleClick}>
    Update Both (Batched!)
  </button>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Stale State
const inc = () => {
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
};
// Result: count + 1 (Not +3)`,
    senior: `// ✅ Functional Updates
const inc = () => {
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);
};
// Result: count + 3`
  },
  interview: {
    questions: [
      {
        q: "Is setState synchronous?",
        a: "No. It is asynchronous to allow batching."
      }
    ]
  }
};
