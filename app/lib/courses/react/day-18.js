export const day18 = {
  day: 18,
  title: "React 19: Metadata & Asset Loading",
  intro: "No more `react-helmet`. React 19 handles `<title>`, `<meta>`, and asset preloading natively.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 18. React 19 now understands metadata tags. You can render `<title>` anywhere!"
      },
      {
        type: "challenge",
        instruction: "This code uses a 3rd party library for SEO. Convert it to native React 19 metadata.",
        buggyCode: `// ❌ Extra dependency
import { Helmet } from 'react-helmet';

function Page() {
  return (
    <Helmet>
      <title>My Cool Page</title>
    </Helmet>
  );
}`,
        solutionCode: `// ✅ Native Support
function Page() {
  return (
    <>
      <title>My Cool Page</title>
      <meta name="description" content="My page description" />
    </>
  );
}`,
        verifyOutput: "<title>",
        successMessage: "Correct! React 19 automatically hoists `<title>`, `<meta>`, and `<link>` tags to the `<head>`.",
        hint: "Just write `<title>...</title>` directly in your component."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Hoisting metadata with native tags</li>
<li>Preloading styles and scripts</li>
<li>Resource loading priorities</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🏷️ 1. Native Metadata Support</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">You can now render <code>&lt;title&gt;</code> and <code>&lt;meta&gt;</code> tags <i>anywhere</i> in your component tree. React will automatically hoist them to the <code>&lt;head&gt;</code>.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">function BlogPost({ title }) {
return (
&lt;article&gt;
  {/* Automatically moved to &lt;head&gt;! */}
  &lt;title&gt;{title} | My Blog&lt;/title&gt;
  &lt;meta name="description" content="Great post" /&gt;
  
  &lt;h1&gt;{title}&lt;/h1&gt;
&lt;/article&gt;
);
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. Asset Preloading</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">React 19 introduces new APIs to hint the browser about resources.</p>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">preload('url', { as: 'style' })</code></li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">preinit('url', { as: 'script' })</code></li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ REACT 19 METADATA DEMO                         ║
║      Native <title> and <meta> support + Preloading          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   NEW CAPABILITIES:                                          ║
║   ═════════════════                                          ║
║   1. Hoisting: <title> inside a component <div> works!       ║
║      React moves it to <head>.                               ║
║                                                              ║
║   2. Deduplication: React avoids duplicate tags.             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function PageSEO({ title, description }) {
return (
// These tags effectively render in the <head>
<>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
</>
);
}

function App() {
const [page, setPage] = React.useState('home');

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>⚛️ Metadata Hoisting</h3>
  
  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
    <button onClick={() => setPage('home')}>Home</button>
    <button onClick={() => setPage('about')}>About</button>
  </div>

  <div style={{ 
    padding: '20px', 
    border: '1px solid #ccc', 
    borderRadius: '8px',
    background: '#f8fafc'
  }}>
    {page === 'home' ? (
      <>
        <PageSEO title="Home Page" description="Welcome to the home page" />
        <h1>🏠 Home</h1>
        <p>Check the document title!</p>
      </>
    ) : (
      <>
        <PageSEO title="About Us" description="Learn more about us" />
        <h1>ℹ️ About</h1>
        <p>Title changed automatically.</p>
      </>
    )}
  </div>
  
  <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
    Note: In this sandbox, you might not see the browser tab title change due to iframe restrictions, but in a real app, it works natively!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Third-party Library
import { Helmet } from "react-helmet";

<Helmet>
<title>My Page</title>
</Helmet>`,
    senior: `// ✅ Native React 19
<title>My Page</title>
<meta name="description" content="..." />
// React handles hoisting & deduplication`
  },
  interview: {
    questions: [
      {
        q: "How does React 19 handle metadata tags differently?",
        a: "It natively recognizes tags like `<title>`, `<meta>`, and `<link>` anywhere in the component tree and hoists them to the `<head>`, automatically handling deduplication."
      }
    ]
  }
};
