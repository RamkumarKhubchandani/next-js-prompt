export const reactServerComponents = {
    title: "React Server Components: The Definitive Guide 🤯",
    description: "RSC is not just a feature; it's a new framework architecture. Learn how to build hybrid apps with zero-bundle-size data fetching components, streaming, and the future of React.",
    slug: "react-server-components",
    type: "static",
    author: "React Core Team",
    createdAt: new Date().toISOString(),
    readTime: "40 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1558494949-efdeb6bf80c1?q=80&w=2682&auto=format&fit=crop",
    tags: ["React", "RSC", "Next.js", "Server", "Architecture"],
    keywords: ["React Server Components", "RSC", "Next.js 15", "Streaming", "Hydration", "Server Actions", "Zero Bundle Size", "Island Architecture"],
    toc: [
        { id: "paradigm-shift", label: "01. The Paradigm Shift" },
        { id: "kitchen-analogy", label: "02. The Kitchen Analogy" },
        { id: "zero-bundle-components", label: "03. Zero-Bundle Components" },
        { id: "security-patterns", label: "04. Security Patterns" },
        { id: "interleaving", label: "05. Interleaving Server/Client" },
        { id: "streaming-suspense", label: "06. Streaming & Suspense" },
        { id: "virality", label: "07. Share & Takeaways" },
        { id: "interactive-demo", label: "08. Kitchen Simulator" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 1. The Hook -->
        <section id="paradigm-shift" class="scroll-mt-32">
             <div class="border-l-8 border-blue-600 bg-blue-50 dark:bg-blue-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                <p class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "We used to send 200KB of JavaScript to the browser just to tell it to fetch a JSON file. That era is over."
                </p>
                <p class="text-xl md:text-2xl text-blue-800 dark:text-blue-200 font-light leading-relaxed">
                    React was purely client-side for a decade. Now, it's full-stack. React Server Components (RSC) aren't just an optimization; they are a <strong>rewrite</strong> of how we build the web.
                </p>
             </div>
             
             <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
                <p>
                    <strong>Why this is trending:</strong> Next.js App Router is now the default. If you don't understand RSC, you don't understand modern React. It's that simple. 
                    <br/><br/>
                    We are moving from "Client Side Rendering" (CSR) to a hybrid model where the Server does the heavy lifting, accessing the database directly, and the Client only handles interactivity.
                </p>
             </div>
        </section>

        <!-- 2. The Kitchen Analogy -->
        <section id="kitchen-analogy" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">02.</span>
                The Kitchen Analogy
            </h2>
            
            <div class="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h4 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">👨‍🍳 The Kitchen (Server)</h4>
                        <p class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                            This is where the resources are. The Fridge (Database), the Oven (Node.js), and the Secret Sauce (API Keys).
                            <br/><br/>
                            <strong>Server Components</strong> are the Chefs. They function ONLY in the kitchen. They cook the food (HTML) and plate it. They never leave the kitchen.
                        </p>
                    </div>
                    <div>
                        <h4 class="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-4">🍽️ The Dining Table (Client)</h4>
                        <p class="text-lg text-blue-800 dark:text-blue-200 leading-relaxed">
                            This is where the user sits. It's a mile away from the kitchen.
                            <br/><br/>
                            <strong>Client Components</strong> are the Customers. They can add Salt (State), ask for the check (Interactions), and complain (Events).
                        </p>
                    </div>
                 </div>
                 <div class="mt-8 p-6 bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-slate-700 text-center font-bold text-xl text-slate-700 dark:text-slate-300 shadow-sm">
                     Waiters (The Network) used to carry raw ingredients (JSON) to the table. Now they carry finished meals (HTML).
                 </div>
            </div>
        </section>

        <!-- 3. Zero Bundle -->
        <section id="zero-bundle-components" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">03.</span>
                Zero-Bundle Components
            </h2>
            <p class="text-xl text-gray-700 dark:text-gray-300 mb-8 font-light">
                This is the killer feature. Libraries imported in Server Components are <strong>never sent to the client</strong>.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
                    <h4 class="font-bold text-2xl text-red-700 dark:text-red-300 mb-4">Before RSC</h4>
                    <p class="text-gray-600 dark:text-gray-400">
                        Import \`moment.js\` or \`marked\`? The user downloads 50KB of JS just to format a date or render markdown. Slow load times on mobile.
                    </p>
                </div>
                 <div class="p-8 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30">
                    <h4 class="font-bold text-2xl text-green-700 dark:text-green-300 mb-4">with RSC</h4>
                    <p class="text-gray-600 dark:text-gray-400">
                        Import \`moment.js\`? It runs on the server. The user downloads <strong>0KB</strong>. They just see the formatted date string. Instant load.
                    </p>
                </div>
            </div>
             <div class="mockup-code bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-2xl">
<pre><code>import { format } from 'date-fns'; // 20KB library
import db from './db'; // Database access (impossible on client)

// This is a Server Component by default in Next.js App Router
export default async function BlogPost({ id }) {
  // Direct DB access! No API routes needed.
  const post = await db.post.findUnique({ where: { id } });

  return (
    &lt;article&gt;
      &lt;h1&gt;{post.title}&lt;/h1&gt;
      {/* Date-fns runs here, output is static HTML string */}
      &lt;time&gt;{format(post.createdAt, 'PP')}&lt;/time&gt;
      &lt;p&gt;{post.content}&lt;/p&gt;
    &lt;/article&gt;
  );
}</code></pre>
            </div>
        </section>

        <!-- 4. Security Patterns -->
        <section id="security-patterns" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">04.</span>
                Security Patterns
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                With great power comes great responsibility. Since Server Components run on the server, you must ensure you don't accidentally leak sensitive data to the Client Components.
            </p>
            <div class="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
                <p class="text-yellow-800 dark:text-yellow-200 font-medium text-lg">
                    <strong>Rule:</strong> Use the "server-only" package to prevent accidental imports of server code (like API keys) into Client Components.
                </p>
            </div>
             <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800">
<pre><code>import 'server-only'; 
// If you try to import this file into a "use client" component,
// the build will FAIL. This protects your API keys.

export async function getData() {
  const result = await db.query('SELECT * FROM secrets');
  return result;
}</code></pre>
            </div>
        </section>

        <!-- 5. Interleaving -->
        <section id="interleaving" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">05.</span>
                Interleaving Server & Client
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                You can't import a Server Component into a Client Component. But you <strong>CAN</strong> pass a Server Component as a child (prop) to a Client Component. This is the "Hole in the Donut" pattern.
            </p>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <!-- Left -->
                 <div class="p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
                     <div class="font-mono text-xs text-red-500 mb-2 font-bold uppercase">ClientComponent.tsx</div>
                     <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
import ServerComp from './ServerComp'; // ❌ ERROR
// You cannot import server logic here
// The bundler would try to send it to the browser.

export default function ClientComp() {
  return &lt;ServerComp /&gt;; 
}
                     </pre>
                 </div>
                 <!-- Right -->
                 <div class="p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30">
                     <div class="font-mono text-xs text-green-500 mb-2 font-bold uppercase">Page.tsx (Server Parent)</div>
                     <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
import ClientComp from './ClientComp';
import ServerComp from './ServerComp';

// ✅ Pass Server Component as children (Slot)
return (
  &lt;ClientComp&gt;
    &lt;ServerComp /&gt; {/* Rendered on server, passed as HTML */}
  &lt;/ClientComp&gt;
);
                     </pre>
                 </div>
             </div>
        </section>

        <!-- 6. Streaming -->
        <section id="streaming-suspense" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">06.</span>
                Streaming & Suspense
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                RSC enables <strong>HTML Streaming</strong>. React can send the "Shell" (Navbar, Sidebar) immediately, and leave "holes" for the slow content (Data charts). 
                Once the data is ready on the server, React pushes a script tag to fill the hole.
            </p>
             <div class="bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-700 relative overflow-hidden">
                <div class="space-y-4 font-mono text-sm text-slate-200 relative z-10">
                    <div class="p-4 bg-slate-800 rounded-xl border border-slate-700 animate-pulse">
                        &lt;Suspense fallback={&lt;Spinner /&gt;}&gt;
                    </div>
                    <div class="ml-8 p-4 bg-blue-900/30 rounded-xl border border-blue-800 text-blue-300">
                        &lt;AsyncReadyIn5Seconds /&gt;
                    </div>
                    <div class="p-4 bg-slate-800 rounded-xl border border-slate-700 animate-pulse">
                        &lt;/Suspense&gt;
                    </div>
                </div>
                 <p class="mt-6 text-slate-400 text-sm italic">
                    The user sees the spinner instantly. They don't wait for your 5-second query to finish to see the nav bar.
                </p>
             </div>
        </section>

        <!-- 7. Shares -->
        <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
                07. Share the Future
            </h2>

             <!-- Did You Know -->
             <div class="bg-indigo-600 text-white p-8 rounded-2xl mb-12 shadow-xl transform hover:scale-[1.01] transition-transform">
                 <div class="flex items-start gap-4">
                     <span class="text-4xl">💡</span>
                     <div>
                         <h4 class="text-2xl font-bold mb-2 !text-white">Did You Know?</h4>
                         <p class="!text-white text-lg font-medium opacity-90">
                             Server Components don't have hydration mismatches because... they don't hydrate! They just render HTM. Only Client Components hydrate.
                         </p>
                     </div>
                 </div>
             </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <h4 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Twitter / X Caption</h4>
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 italic">
                        "React Server Components are not just an upgrade; they are a revolution. The era of client-side waterfalls is over. Welcome to the Hybrid Web. #ReactJS #Nextjs #RSC"
                     </p>
                     <button class="text-blue-500 text-sm font-bold hover:underline">Copy Caption</button>
                </div>
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <h4 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">LinkedIn Post</h4>
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 italic">
                        "We just reduced our bundle size by 40% by moving Moment.js to the Server. React Server Components + Next.js App Router is a game changer for performance. #WebDev #Performance #React"
                     </p>
                     <button class="text-blue-500 text-sm font-bold hover:underline">Copy Caption</button>
                </div>
            </div>

             <div class="mt-8 flex flex-wrap gap-2 justify-center">
                 <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#ReactJS</span>
                 <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#NextJS</span>
                 <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#ServerComponents</span>
                 <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#Performance</span>
             </div>

             <div class="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center max-w-2xl mx-auto">
                <h4 class="font-bold text-lg mb-2 text-blue-900 dark:text-blue-200">The Takeaway</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    Move your logic to the server. Keep your interactivity on the client. Win.
                </p>
                 <button class="mt-6 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                     Subscribe for More Architecture Guides
                 </button>
            </div>
        </section>

        <!-- 8. Interactive Demo -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">08.</span>
                Kitchen Simulator
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                This demo visualizes the Server/Client boundary. The "Product Page" is cooked on the Server. The "Cart Button" is interactive on the Client.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <!-- Concept -->
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Pattern</span>
                        The Island Architecture
                    </h3>
                    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Notice how the static content (Price, Title, Specs) is rendered by the Server. Only the small "Buy" button hydrates. This minimizes the JavaScript payload.
                    </p>
                </div>
            </div>
        </section>

    </div>
    `,
    code: `import React, { useState, Suspense } from 'react';

// 🔮 Concepts Simulation
// This playground simulates the Server/Client boundary in a simplified way.

// 🏢 SERVER COMPONENT (Simulated)
// In a real app, this runs ON THE SERVER.
function ProductPage() {
  const product = {
    name: "Quantum Processor X",
    price: 4999,
    specs: ["128 Qubits", "Zero Latency", "AI Core"]
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen font-sans text-white">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
            
            {/* Header (Server Rendered) */}
            <div className="mb-8">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-mono mb-4 inline-block">
                    SERVER RENDERED
                </span>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {product.name}
                </h1>
                <p className="text-slate-400 mt-2 text-lg">The future of computing is here.</p>
            </div>

            {/* Specs List (Server Rendered) */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {product.specs.map(spec => (
                    <div key={spec} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 text-center">
                        <div className="text-purple-400 font-bold mb-1">⚡</div>
                        <div className="text-sm text-slate-300">{spec}</div>
                    </div>
                ))}
            </div>

             {/* 🚧 BOUNDARY 🚧 */}
             {/* We flip to Client Component here for interactivity */}
             <div className="border-t border-slate-700 pt-8 flex justify-between items-center">
                <div className="text-3xl font-bold">\${product.price}</div>
                <AddToCartButton />
             </div>

        </div>
      </div>
    </div>
  );
}

// 📱 CLIENT COMPONENT
// This creates the interaction
function AddToCartButton() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleBuy = () => {
    setStatus('loading');
    // Simulate network request
    setTimeout(() => {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 2000); // Reset
    }, 1500);
  };

  if (status === 'success') {
      return (
          <button className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-500/20 animate-bounce">
            Added to Cart! ✅
          </button>
      );
  }

  return (
    <button 
      onClick={handleBuy}
      disabled={status === 'loading'}
      className="bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2"
    >
      {status === 'loading' ? 'Processing...' : 'Buy Now 🛒'}
    </button>
  );
}

export default ProductPage;
`
}
