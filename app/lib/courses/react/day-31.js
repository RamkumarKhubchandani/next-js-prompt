export const day31 = {
  day: 31,
  title: "Streaming SSR & Asset Preloading",
  intro: "React 19's streaming server rendering and resource preloading APIs for instant page loads.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>renderToPipeableStream vs renderToString</li>
<li>Streaming HTML with Suspense boundaries</li>
<li>Asset preloading: preload(), preinit(), prefetchDNS()</li>
<li>Resource hints and priorities</li>
</ul>

<div class="bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 p-4 rounded-xl mb-6">
<h4 class="text-indigo-400 font-bold mb-2">🚀 Why Streaming SSR?</h4>
<p class="text-gray-600 dark:text-light-300">Traditional SSR: Server renders entire page → User sees nothing until complete.<br/>
Streaming SSR: Server sends shell immediately → Streams content as ready → Instant interactivity!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Streaming with renderToPipeableStream</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">import { renderToPipeableStream } from 'react-dom/server';

app.get('/', (req, res) => {
const { pipe } = renderToPipeableStream(&lt;App /&gt;, {
bootstrapScripts: ['/main.js'],
onShellReady() {
  res.setHeader('Content-Type', 'text/html');
  pipe(res); // Start streaming immediately!
}
});
});</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📦 Asset Preloading APIs</h3>
<table class="w-full text-left mb-6">
<tr class="border-b border-gray-200 dark:border-dark-600">
    <td class="py-2 text-cyan-400 font-mono">preload(href, options)</td>
    <td class="py-2 text-gray-600 dark:text-light-300">Preload a resource (font, image, script)</td>
</tr>
<tr class="border-b border-gray-200 dark:border-dark-600">
    <td class="py-2 text-cyan-400 font-mono">preinit(href, options)</td>
    <td class="py-2 text-gray-600 dark:text-light-300">Preload AND execute (for scripts/styles)</td>
</tr>
<tr class="border-b border-gray-200 dark:border-dark-600">
    <td class="py-2 text-cyan-400 font-mono">prefetchDNS(href)</td>
    <td class="py-2 text-gray-600 dark:text-light-300">Pre-resolve DNS for external domain</td>
</tr>
<tr>
    <td class="py-2 text-cyan-400 font-mono">preconnect(href)</td>
    <td class="py-2 text-gray-600 dark:text-light-300">Pre-establish connection (DNS + TCP + TLS)</td>
</tr>
</table>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🌊 STREAMING SSR & ASSET PRELOADING                                 ║
║  React 19's server rendering capabilities                            ║
╠══════════════════════════════════════════════════════════════════════╣
║  NOTE: This code demonstrates patterns for server environments.      ║
║  In this sandbox, we show the client-side preloading APIs.           ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📚 SERVER-SIDE CODE REFERENCE (Node.js/Express)
// ═══════════════════════════════════════════════════════════════════
/*
// server.js - Express example with streaming SSR

import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';

const app = express();

app.get('/', (req, res) => {
let didError = false;

const { pipe, abort } = renderToPipeableStream(
<App />,
{
  // Scripts to load for hydration
  bootstrapScripts: ['/static/js/main.js'],
  
  // ✅ onShellReady: Shell (non-Suspense content) is ready
  // Start streaming immediately for fast TTFB
  onShellReady() {
    res.statusCode = didError ? 500 : 200;
    res.setHeader('Content-Type', 'text/html');
    pipe(res);
  },
  
  // ⚠️ onShellError: Fatal error before shell
  onShellError(error) {
    res.statusCode = 500;
    res.send('<h1>Something went wrong</h1>');
  },
  
  // 📊 onAllReady: Everything including Suspense content
  // Use for crawlers/bots that need complete HTML
  onAllReady() {
    // Called when all content has been generated
  },
  
  // ❌ onError: Non-fatal errors during streaming
  onError(error) {
    didError = true;
    console.error(error);
  }
}
);

// Abort after timeout
setTimeout(() => abort(), 10000);
});
*/

// ═══════════════════════════════════════════════════════════════════
// 🎯 CLIENT-SIDE: Asset Preloading Demo
// ═══════════════════════════════════════════════════════════════════
function PreloadDemo() {
const [logs, setLogs] = React.useState([]);

const addLog = (message) => {
setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
};

const handlePreload = () => {
addLog('Calling preload() for image...');

// React 19's preload API
if (typeof React.preload === 'function') {
  React.preload('https://picsum.photos/800/600', { as: 'image' });
  addLog('✅ Image preload initiated');
} else {
  // Fallback for demo
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = 'https://picsum.photos/800/600';
  document.head.appendChild(link);
  addLog('✅ Image preload initiated (fallback)');
}
};

const handlePreconnect = () => {
addLog('Calling preconnect() for API domain...');

if (typeof React.preconnect === 'function') {
  React.preconnect('https://api.example.com');
  addLog('✅ Preconnect initiated');
} else {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://api.example.com';
  document.head.appendChild(link);
  addLog('✅ Preconnect initiated (fallback)');
}
};

const handlePrefetchDNS = () => {
addLog('Calling prefetchDNS() for CDN...');

if (typeof React.prefetchDNS === 'function') {
  React.prefetchDNS('https://cdn.example.com');
  addLog('✅ DNS prefetch initiated');
} else {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = 'https://cdn.example.com';
  document.head.appendChild(link);
  addLog('✅ DNS prefetch initiated (fallback)');
}
};

return (
<div>
  <h4>📦 Asset Preloading APIs</h4>
  
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
    <button onClick={handlePreload} style={btnStyle}>
      preload() Image
    </button>
    <button onClick={handlePreconnect} style={btnStyle}>
      preconnect() API
    </button>
    <button onClick={handlePrefetchDNS} style={btnStyle}>
      prefetchDNS() CDN
    </button>
  </div>
  
  <div style={{
    background: '#1e293b',
    padding: '15px',
    borderRadius: '8px',
    maxHeight: '150px',
    overflow: 'auto',
    fontFamily: 'monospace',
    fontSize: '12px'
  }}>
    {logs.length === 0 && (
      <span style={{ color: '#64748b' }}>Click buttons to see preload actions...</span>
    )}
    {logs.map((log, i) => (
      <div key={i} style={{ color: '#94a3b8', marginBottom: '4px' }}>
        <span style={{ color: '#64748b' }}>[{log.time}]</span> {log.message}
      </div>
    ))}
  </div>
</div>
);
}

const btnStyle = {
padding: '8px 16px',
background: '#6366f1',
color: 'white',
border: 'none',
borderRadius: '6px',
cursor: 'pointer'
};

// ═══════════════════════════════════════════════════════════════════
// 🌊 STREAMING SSR VISUALIZATION
// ═══════════════════════════════════════════════════════════════════
function StreamingVisualization() {
const [stage, setStage] = React.useState(0);

const stages = [
{ label: 'Initial Request', shell: false, content1: false, content2: false },
{ label: 'Shell Ready (TTFB)', shell: true, content1: false, content2: false },
{ label: 'Content 1 Streams', shell: true, content1: true, content2: false },
{ label: 'Content 2 Streams', shell: true, content1: true, content2: true }
];

const current = stages[stage];

React.useEffect(() => {
const timer = setInterval(() => {
  setStage(s => (s + 1) % stages.length);
}, 2000);
return () => clearInterval(timer);
}, []);

return (
<div>
  <h4>🌊 Streaming SSR Timeline</h4>
  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
    Stage: <strong>{current.label}</strong>
  </p>
  
  <div style={{
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden'
  }}>
    {/* Header/Shell */}
    <div style={{
      padding: '15px',
      background: current.shell ? '#dbeafe' : '#f1f5f9',
      borderBottom: '1px solid #e2e8f0',
      transition: 'background 0.5s'
    }}>
      {current.shell ? '🏠 Header & Navigation (Shell)' : '⏳ Waiting...'}
    </div>
    
    {/* Content Area 1 */}
    <div style={{
      padding: '15px',
      background: current.content1 ? '#dcfce7' : '#f1f5f9',
      borderBottom: '1px solid #e2e8f0',
      transition: 'background 0.5s'
    }}>
      {current.content1 ? '📄 Main Content (Suspense Resolved)' : 
       current.shell ? '⏳ Loading main content...' : '⏳ Waiting...'}
    </div>
    
    {/* Content Area 2 */}
    <div style={{
      padding: '15px',
      background: current.content2 ? '#fef9c3' : '#f1f5f9',
      transition: 'background 0.5s'
    }}>
      {current.content2 ? '📊 Data Section (Suspense Resolved)' : 
       current.shell ? '⏳ Loading data section...' : '⏳ Waiting...'}
    </div>
  </div>
  
  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '10px' }}>
    💡 User sees shell immediately, content streams in as ready
  </p>
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 MAIN APP
// ═══════════════════════════════════════════════════════════════════
function App() {
return (
<div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '600px' }}>
  <h3>🌊 Streaming SSR & Asset Preloading</h3>
  
  <div style={{ display: 'grid', gap: '20px' }}>
    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
      <StreamingVisualization />
    </div>
    
    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
      <PreloadDemo />
    </div>
  </div>
  
  <div style={{
    marginTop: '20px',
    padding: '15px',
    background: '#1e293b',
    borderRadius: '8px',
    color: '#94a3b8',
    fontSize: '13px'
  }}>
    <strong style={{ color: '#22d3ee' }}>📚 Key Takeaways:</strong>
    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
      <li><code>renderToPipeableStream</code>: Starts sending HTML immediately</li>
      <li><code>onShellReady</code>: Shell (non-Suspense content) is ready to stream</li>
      <li><code>onAllReady</code>: Use for crawlers that need complete HTML</li>
      <li><code>preload()</code>: Preload fonts, images, scripts</li>
      <li><code>preinit()</code>: Preload AND execute scripts/styles</li>
    </ul>
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ renderToString - Blocks until complete
const html = renderToString(<App />);
res.send(html); // User waits for entire page`,
    senior: `// ✅ renderToPipeableStream - Stream immediately
const { pipe } = renderToPipeableStream(<App />, {
onShellReady() {
pipe(res); // Start streaming shell NOW
}
});
// Content inside Suspense streams as ready`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between onShellReady and onAllReady?",
        a: "onShellReady fires when non-Suspense content is ready - use for humans (fast TTFB). onAllReady fires when ALL content including Suspense is ready - use for crawlers/bots that need complete HTML."
      },
      {
        q: "When would you use preload() vs preinit()?",
        a: "preload() fetches the resource and stores in cache. preinit() fetches AND executes immediately (for scripts) or applies immediately (for styles). Use preinit() for critical resources needed before hydration."
      },
      {
        q: "How does streaming SSR work with Suspense?",
        a: "React sends the shell (non-Suspense content) immediately. For Suspense boundaries, it sends a placeholder. When the suspended content resolves, React streams an inline script that replaces the placeholder with real content."
      }
    ]
  }
};
