export const day15 = {
  day: 15,
  title: "React Server Components (RSC)",
  intro: "The future. Server Components run on the server, send zero JS to the client, and can access DB directly.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What are React Server Components (RSC)</li>
<li>The difference between Server and Client Components</li>
<li>The "use client" directive</li>
<li>When to use each type of component</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 The Problem: JavaScript Bloat</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Traditional React apps send ALL component JS to the browser:</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-red-800 dark:text-red-200 text-sm">// ❌ TRADITIONAL CLIENT COMPONENTS
// Every component = More JS to download

function BlogPost({ id }) {
const [post, setPost] = useState(null);

useEffect(() => {
fetch('/api/posts/' + id)    // 1. Browser loads page
  .then(r => r.json())       // 2. JS downloads
  .then(setPost);            // 3. JS fetches data
}, [id]);                      // 4. Finally renders!

return &lt;article&gt;{post?.content}&lt;/article&gt;;
}

// Problems:
// • User waits for JS to download
// • Then waits for API request
// • Component code shipped even if it never changes
// • Large bundle sizes</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ The Solution: Server Components</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Components that run on the server and send ONLY HTML to the client:</p>

<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-green-800 dark:text-green-200 text-sm">// ✅ SERVER COMPONENT (Default in Next.js App Router)
// Zero JavaScript sent to client!

async function BlogPost({ id }) {
// Direct database access - no API needed!
const post = await db.post.findUnique({ where: { id } });

return &lt;article&gt;{post.content}&lt;/article&gt;;
}

// Benefits:
// • No JS bundle for this component
// • Data fetched on server (fast!)
// • SEO friendly (HTML sent immediately)
// • Can access backend resources directly</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🌊 The Waterline: Server vs Client</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-gray-800 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
┌─────────────────────────────────────────────────────────┐
│                    🖥️ SERVER                           │
│  ───────────────────────────────────────────────────   │
│                                                         │
│   // Server Components (Default)                        │
│   • Run on server only                                 │
│   • Can be async                                       │
│   • Can access DB, file system, env secrets            │
│   • Send 0 KB JavaScript                               │
│   • ❌ No useState, useEffect, onClick                  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│            ↑ "use client" ↑  (The Waterline)           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    💻 CLIENT                           │
│  ───────────────────────────────────────────────────   │
│                                                         │
│   // Client Components ("use client")                   │
│   • Run on both server (SSR) and client                │
│   • JavaScript sent to browser                         │
│   • Can use hooks: useState, useEffect                 │
│   • Can have onClick, onChange, etc.                   │
│   • ❌ Cannot be async, no direct DB access             │
│                                                         │
└─────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📜 The "use client" Directive</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300"><span class="text-yellow-700 dark:text-yellow-300">"use client"</span>  // This MUST be the first line!

import { useState } from 'react';

export function LikeButton() {
const [liked, setLiked] = useState(false);

return (
&lt;button onClick={() => setLiked(!liked)}&gt;
  {liked ? '❤️' : '🤍'}
&lt;/button&gt;
);
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 When to Use Server vs Client</h3>
<div class="overflow-x-auto mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-light-200">
        <tr>
            <th class="p-3 rounded-tl-lg">Feature</th>
            <th class="p-3">Server Component</th>
            <th class="p-3 rounded-tr-lg">Client Component</th>
        </tr>
    </thead>
    <tbody class="text-gray-600 dark:text-light-300">
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Fetch data</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Direct DB/API</td>
            <td class="p-3 text-yellow-600 dark:text-yellow-400">useEffect + fetch</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">useState/useEffect</td>
            <td class="p-3 text-red-600 dark:text-red-400">❌ Not allowed</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Yes</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">onClick/onChange</td>
            <td class="p-3 text-red-600 dark:text-red-400">❌ Not allowed</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Yes</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Access secrets</td>
            <td class="p-3 text-green-600 dark:text-green-400">✅ Safe</td>
            <td class="p-3 text-red-600 dark:text-red-400">❌ Never expose!</td>
        </tr>
        <tr>
            <td class="p-3 rounded-bl-lg">Bundle size impact</td>
            <td class="p-3 text-green-600 dark:text-green-400">0 KB</td>
            <td class="p-3 rounded-br-lg text-yellow-600 dark:text-yellow-400">Adds to bundle</td>
        </tr>
    </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 The Import Rules</h3>
<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
<ul class="text-blue-800 dark:text-blue-200 space-y-2">
    <li>✅ <span class="font-bold">Server → Client:</span> Server Components CAN import Client Components</li>
    <li>❌ <span class="font-bold">Client → Server:</span> Client Components CANNOT import Server Components</li>
    <li>✅ <span class="font-bold">Workaround:</span> Pass Server Component as children prop to Client Component</li>
</ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Mistakes</h3>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<ul class="text-red-800 dark:text-red-200 text-sm space-y-1">
    <li>• <span class="font-bold">Adding "use client" everywhere</span> - defeats the purpose!</li>
    <li>• <span class="font-bold">Using hooks in Server Components</span> - will error</li>
    <li>• <span class="font-bold">Passing functions as props</span> from Server to Client - not serializable</li>
</ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Start with Server Components</span> - only add "use client" when needed</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Keep Client Components small</span> - extract interactive parts only</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Use composition</span> - pass Server Components as children to Client</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Next.js App Router</span> - built for Server Components from the ground up</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║       🎯 REACT SERVER COMPONENTS (RSC) - The Future          ║
║   Components that run on the server, send ZERO JS to client! ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   THE REVOLUTION:                                            ║
║   ═══════════════                                            ║
║                                                              ║
║   BEFORE RSC:                                                ║
║   ───────────                                                ║
║   Browser downloads JS → JS fetches data → Renders UI        ║
║   (Slow! Multiple round trips)                               ║
║                                                              ║
║   WITH RSC:                                                  ║
║   ─────────                                                  ║
║   Server renders HTML → Sends to browser → Done!             ║
║   (Fast! Data fetched on server)                             ║
║                                                              ║
║   THE WATERLINE:                                             ║
║   ══════════════                                             ║
║                                                              ║
║   ┌────────────────────────────────────┐                     ║
║   │         🖥️ SERVER                  │                     ║
║   │  ┌─────────────────────────────┐   │                     ║
║   │  │ Server Component            │   │  • Direct DB access ║
║   │  │ async function Posts() {    │   │  • No JS to client  ║
║   │  │   const data = await db()   │   │  • No hooks         ║
║   │  │   return <List data={data}> │   │                     ║
║   │  └─────────────────────────────┘   │                     ║
║   ├────────────────────────────────────┤ ← "use client"      ║
║   │         💻 CLIENT                  │                     ║
║   │  ┌─────────────────────────────┐   │                     ║
║   │  │ "use client"                │   │  • useState/Effect  ║
║   │  │ function Like() {           │   │  • onClick handlers ║
║   │  │   const [liked, setLiked]   │   │  • JS sent to       ║
║   │  │   return <button>Like       │   │    browser          ║
║   │  └─────────────────────────────┘   │                     ║
║   └────────────────────────────────────┘                     ║
║                                                              ║
║   RULES:                                                     ║
║   ══════                                                     ║
║   • Server can import Client ✅                              ║
║   • Client CANNOT import Server ❌                           ║
║   • "use client" at top marks boundary                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🖥️ SIMULATED SERVER COMPONENT
// ═══════════════════════════════════════════════════════════════
// In Next.js App Router, this would be a real async server component
// that fetches data directly from the database - NO API needed!
// ═══════════════════════════════════════════════════════════════
function ServerPostList() {
// Simulated server-side data (in real RSC: const posts = await db.post.findMany())
const posts = [
{ id: 1, title: 'Understanding RSC', author: 'React Team' },
{ id: 2, title: 'Zero JavaScript', author: 'Dan Abramov' },
{ id: 3, title: 'The Future of React', author: 'Vercel' }
];

return (
<div style={{
  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  borderRadius: '12px',
  padding: '20px',
  border: '2px solid #22c55e'
}}>
  <h4 style={{ color: '#166534', margin: '0 0 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
    🖥️ Server Component
    <span style={{ fontSize: '12px', background: '#22c55e', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>
      0 KB JS
    </span>
  </h4>
  
  {posts.map(post => (
    <div key={post.id} style={{
      background: 'white',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '8px',
      borderLeft: '3px solid #22c55e'
    }}>
      <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{post.title}</div>
      <div style={{ fontSize: '12px', color: '#64748b' }}>by {post.author}</div>
    </div>
  ))}
  
  <div style={{ fontSize: '11px', color: '#166534', marginTop: '10px' }}>
    ✅ Direct DB access • ✅ No JS bundle • ✅ SEO friendly
  </div>
</div>
);
}

// ═══════════════════════════════════════════════════════════════
// 💻 CLIENT COMPONENT (needs "use client" in Next.js)
// ═══════════════════════════════════════════════════════════════
// This component has interactivity (useState, onClick)
// It MUST be marked with "use client" in Next.js
// Its JS code is sent to the browser
// ═══════════════════════════════════════════════════════════════
function ClientLikeButton() {
const [liked, setLiked] = React.useState(false);
const [count, setCount] = React.useState(42);

const handleLike = () => {
setLiked(!liked);
setCount(c => liked ? c - 1 : c + 1);
};

return (
<div style={{
  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  borderRadius: '12px',
  padding: '20px',
  border: '2px solid #f59e0b'
}}>
  <h4 style={{ color: '#92400e', margin: '0 0 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
    💻 Client Component
    <span style={{ fontSize: '12px', background: '#f59e0b', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>
      ~2 KB JS
    </span>
  </h4>
  
  <button 
    onClick={handleLike}
    style={{
      padding: '12px 24px',
      background: liked ? '#ef4444' : '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s'
    }}
  >
    {liked ? '❤️' : '🤍'} {liked ? 'Liked' : 'Like'} ({count})
  </button>
  
  <div style={{ fontSize: '11px', color: '#92400e', marginTop: '10px' }}>
    ✅ useState • ✅ onClick • ✅ Interactive
  </div>
</div>
);
}

function App() {
return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>⚛️ React Server Components Demo</h3>
  
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
    {/* Server Component - No JS sent */}
    <ServerPostList />
    
    {/* Client Component - JS required for interactivity */}
    <ClientLikeButton />
  </div>
  
  <div style={{
    marginTop: '15px',
    padding: '15px',
    background: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  }}>
    <p style={{ color: '#64748b', margin: 0, fontSize: '13px' }}>
      💡 <strong>In Next.js App Router:</strong> Components are Server by default. 
      Add <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>"use client"</code> only 
      when you need hooks or event handlers!
    </p>
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Client Fetch (Waterfall)
function Page() {
const [data, setData] = useState(null);
useEffect(() => {
fetch('/api/data').then(setData);
}, []);

if (!data) return <Spinner />;
return <div>{data}</div>;
}`,
    senior: `// ✅ Async Server Component
async function Page() {
// Direct DB access. No API. No useEffect.
const data = await db.post.findMany();

return <div>{data.map(...)}</div>;
}`
  },
  interview: {
    questions: [
      {
        q: "Can you use hooks in Server Components?",
        a: "No. `useState` and `useEffect` are client-only concepts. RSCs run once on the server."
      }
    ]
  }
};
