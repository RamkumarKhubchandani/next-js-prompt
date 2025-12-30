export const partialPrerendering = {
    slug: "partial-prerendering",
    title: "Partial Pre-rendering (PPR): The Secret to 0ms LCP in Modern React Apps",
    description: "Web performance is still king. Partial Pre-rendering (PPR) allows a single page to be both static (the shell) and dynamic (the data) simultaneously. Learn the secret to 0ms LCP.",
    thumbnail: "/images/tutorials/ppr-thumb.png",
    tags: ["Next.js", "Performance", "PPR", "React Server Components", "Architecture"],
    keywords: ["Partial Prerendering", "PPR", "Next.js 15", "Web Vitals", "LCP", "Suspense", "Streaming"],
    difficulty: "dvaAdvancednced",
    readTime: "20 min read",
    author: "Sebastian Markbåge (Inspired)",
    createdAt: new Date().toISOString(),
    toc: [
        { id: "intro", label: "01. The Static vs. Dynamic Dilemma" },
        { id: "what-is-ppr", label: "02. What is Partial Pre-rendering?" },
        { id: "lifecycle", label: "03. The Request-Response Lifecycle" },
        { id: "implementation", label: "04. Implementing PPR" },
        { id: "benchmark", label: "05. Performance Benchmarks" },
        { id: "virality", label: "06. Share & Discuss" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
      
      <!-- 1. Intro -->
      <section id="intro" class="scroll-mt-32">
         <div class="border-l-8 border-orange-500 bg-orange-50 dark:bg-orange-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                Static or Dynamic? <span class="text-orange-600">Why not both?</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                For a decade, we've had to choose. Static Site Generation (SSG) gave us speed but stale data. Server Side Rendering (SSR) gave us fresh data but slow TTFB. <br/>
                Partial Pre-rendering (PPR) breaks this binary. It is the quantum superposition of web architecture.
            </p>
         </div>

         <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
            <p>
                <strong>The Dilemma:</strong> You're building an E-commerce product page. The Navbar, Footer, and Product Description are static—they never change. The "Add to Cart" button and "Related Products" are dynamic—they depend on user cookies and inventory.
            </p>
            <p>
                Traditionally, if *one* part is dynamic, the *whole* page has to be SSR. You lose that instant "Edge" delivery. PPR allows the static shell to be served instantly from the edge (0ms LCP), while the dynamic holes are streamed in parallel.
            </p>
         </div>
      </section>

      <!-- 2. What is PPR -->
      <section id="what-is-ppr" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-orange-600">02.</span>
            What is Partial Pre-rendering?
        </h2>
        
        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p>
                PPR is a compiler optimization that treats your React tree as a static shell with dynamic "holes".
            </p>
            <p>
                It uses React <strong>Suspense</strong> boundaries to delimit these zones. Anything inside a Suspense boundary that reads dynamic data (cookies, headers, non-cached fetch) is considered dynamic. Everything else is pre-rendered at build time.
            </p>
        </div>

        <div class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-2xl my-6">
<pre><code>// app/product/[id]/page.js

// 🟢 STATIC SHELL (Pre-rendered)
export default function Page({ params }) {
  return (
    &lt;main&gt;
      &lt;Header /&gt;
      &lt;ProductDetails id={params.id} /&gt;
      
      {/* 🔴 DYNAMIC HOLE (Streamed) */}
      &lt;Suspense fallback={&lt;CartSkeleton /&gt;}&gt;
        &lt;UserCart /&gt;
      &lt;/Suspense&gt;
      
      {/* 🔴 DYNAMIC HOLE (Streamed) */}
      &lt;Suspense fallback={&lt;ReviewsSkeleton /&gt;}&gt;
        &lt;PersonalizedReviews /&gt;
      &lt;/Suspense&gt;
      
      &lt;Footer /&gt;
    &lt;/main&gt;
  );
}</code></pre>
        </div>
      </section>

      <!-- 3. Lifecycle Diagram -->
      <section id="lifecycle" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-orange-600">03.</span>
            The Request-Response Lifecycle
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <h3 class="font-bold text-xl text-blue-900 dark:text-blue-100 mb-4">1. The Immediate Response</h3>
                <p class="text-gray-600 dark:text-gray-400">
                    The Edge CDN instantly returns the pre-computed HTML shell. The user sees the header, footer, and loading skeletons immediately. TTFB is effectively ~10-20ms.
                </p>
            </div>
             <div class="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/30">
                <h3 class="font-bold text-xl text-purple-900 dark:text-purple-100 mb-4">2. The Dynamic Stream</h3>
                <p class="text-gray-600 dark:text-gray-400">
                    The server (or lambda) starts executing the dynamic parts. As they complete, chunks of HTML/Script are streamed into the existing response, replacing the skeletons.
                </p>
            </div>
        </div>
      </section>

      <!-- 6. Virality -->
      <section id="virality" class="scroll-mt-32">
         <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-orange-600">06.</span>
            Share the Knowledge
         </h2>

         <!-- Did You Know -->
         <div class="bg-orange-600 text-white p-8 rounded-2xl mb-12 shadow-xl transform hover:scale-[1.01] transition-transform">
             <div class="flex items-start gap-4">
                 <span class="text-4xl">⚡️</span>
                 <div>
                     <h4 class="text-2xl font-bold mb-2 !text-white">Did You Know?</h4>
                     <p class="!text-white text-lg font-medium opacity-90">
                         PPR is being adopted by major e-commerce giants because reducing LCP (Largest Contentful Paint) by 100ms has been shown to increase conversion rates by up to 1%.
                     </p>
                 </div>
             </div>
         </div>


         
         <div class="mt-8 flex flex-wrap gap-2 justify-center">
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#NextJS</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#PPR</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#WebVitals</span>
         </div>
      </section>
    </div>
  `,
    code: `import React, { useState, useEffect, Suspense } from 'react';

// 🧪 Simulation of PPR
// This component demonstrates how the UI shell appears instantly
// while "dynamic" parts load in.

function SlowComponent({ delay, name }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(\`Dynamic Data for \${name}\`);
    }, delay);
    return () => clearTimeout(t);
  }, []);

  if (!data) throw new Promise(() => {}); // Never settles in this dummy, handled by parent logic or just simulate loading
  return <div className="p-4 bg-green-500/20 text-green-400 border border-green-500 rounded animate-in fade-in">{data}</div>;
}

// Actual simulation for the demo UI
function SimulatedDynamicPart({ delay, name }) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
     setTimeout(() => setLoading(false), delay);
  }, []);

  if (loading) return (
    <div className="h-24 w-full bg-gray-800 rounded animate-pulse flex items-center justify-center">
        <span className="text-gray-600 text-sm">Loading {name} (Stream)...</span>
    </div>
  );

  return (
    <div className="h-24 w-full bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-700 rounded p-4 flex items-center gap-4 animate-in slide-in-from-bottom-2">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">✓</div>
        <div>
            <div className="font-bold text-green-400">Loaded: {name}</div>
            <div className="text-xs text-green-500/60">Streamed in {delay}ms</div>
        </div>
    </div>
  );
}

export default function PPRDemo() {
  const [mounted, setMounted] = useState(false);
  
  // Re-trigger demo
  const reload = () => {
    setMounted(false);
    setTimeout(() => setMounted(true), 100);
  };

  useEffect(() => {
      setMounted(true);
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto bg-black border border-gray-800 rounded-xl min-h-[600px] font-sans text-white">
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
         <div>
             <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">PPR Simulator</h1>
             <p className="text-gray-500 text-sm">Static Shell vs Dynamic Stream</p>
         </div>
         <button onClick={reload} className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200">
             Replay Request
         </button>
      </div>

      {/* STATIC SHELL (Instant) */}
      <nav className="flex gap-6 mb-8 text-gray-400 text-sm font-medium">
          <span className="text-white border-b-2 border-orange-500 pb-1">Products</span>
          <span>Solutions</span>
          <span>Pricing</span>
          <span>Docs</span>
      </nav>

      <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="col-span-2 space-y-4">
              <div className="h-64 bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="text-xs font-bold text-orange-500 mb-2">STATIC CONTENT</div>
                  <h2 className="text-3xl font-bold mb-4">The Future is Partial.</h2>
                  <p className="text-gray-400 leading-relaxed">
                      This entire block is pre-rendered at build time. It is served from the Edge. The user sees this instantly, achieving 0ms LCP perception.
                  </p>
              </div>

              {/* DYNAMIC HOLE 1 */}
              <div className="border border-dashed border-gray-700 p-4 rounded-lg relative">
                  <div className="absolute -top-3 left-4 bg-black px-2 text-xs text-blue-400">Dynamic Hole (Reviews)</div>
                  {mounted && <SimulatedDynamicPart delay={1200} name="User Reviews" />}
              </div>
          </div>

          <div className="space-y-4">
              {/* DYNAMIC HOLE 2 */}
              <div className="border border-dashed border-gray-700 p-4 rounded-lg relative h-full">
                  <div className="absolute -top-3 left-4 bg-black px-2 text-xs text-purple-400">Dynamic Hole (Cart)</div>
                  <div className="space-y-4 pt-2">
                       {mounted && <SimulatedDynamicPart delay={600} name="Cart Items" />}
                       {mounted && <SimulatedDynamicPart delay={800} name="Recs" />}
                  </div>
              </div>
          </div>
      </div>
      
      <footer className="text-center text-gray-600 text-xs mt-12 border-t border-gray-900 pt-8">
          © 2026 Asio Inc. All rights reserved. (Static Footer)
      </footer>
    </div>
  );
}`
};
