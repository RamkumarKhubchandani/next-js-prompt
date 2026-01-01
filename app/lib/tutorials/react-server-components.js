export const reactServerComponents = {
    title: "React Server Components: The Definitive Guide for 2026 🤯",
    description: "The complete textbook on React's biggest paradigm shift. Mastering the Server/Client Boundary, Zero-Bundle Architecture, Server Actions, Streaming, and the 'Hole in the Donut' pattern.",
    slug: "react-server-components",
    type: "static",
    author: "Senior React Architect",
    createdAt: new Date().toISOString(),
    readTime: "55 min read",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1558494949-efdeb6bf80c1?q=80&w=2682&auto=format&fit=crop",
    tags: ["React", "RSC", "Next.js 15", "Architecture", "Performance", "Server Actions"],
    keywords: ["React Server Components Guide", "RSC Architecture", "Next.js App Router Deep Dive", "Server Actions Pattern", "Streaming SSR"],
    toc: [
        { id: "paradigm-shift", label: "01. The Paradigm Shift" },
        { id: "kitchen-analogy", label: "02. The Kitchen Mental Model" },
        { id: "zero-bundle", label: "03. Zero-Bundle Architecture" },
        { id: "server-actions", label: "04. Server Actions Mastery" },
        { id: "composition-patterns", label: "05. Composition & The Donut Hole" },
        { id: "caching-deep-dive", label: "06. Caching & Memoization" },
        { id: "streaming-suspense", label: "07. Streaming & Suspense" },
        { id: "security-best-practices", label: "08. Security Best Practices" },
        { id: "ecosystem-simulation", label: "09. The Ecosystem Simulation" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. The Paradigm Shift -->
        <section id="paradigm-shift" class="scroll-mt-32">
             <div class="border-l-8 border-blue-600 bg-blue-50 dark:bg-blue-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h2 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "We used to send the Chef to the customer's table to chop onions."
                </h2>
                <p class="text-xl md:text-2xl text-blue-900 dark:text-blue-100 font-light leading-relaxed">
                    That is essentially what Client-Side Rendering (CSR) was. We sent megabytes of JavaScript (the chef) to the user's browser (the table) just to render a simple list of products. 
                    <br/><br/>
                    <strong>React Server Components (RSC)</strong> restore sanity. They keep the chef in the kitchen.
                </p>
             </div>
             
             <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300">
                <p>
                    For a decade, React was purely a client-side view library. We built Single Page Apps (SPAs) where the browser did 99% of the work. But the browser is a hostile environment. It has slow 4G connections, weak mobile CPUs, and battery constraints.
                </p>
                <p>
                    <strong>The New Standard:</strong> Hybrid Applications. We are blurring the line between Backend and Frontend. Components are no longer just UI; they are infrastructure.
                </p>
             </div>
        </section>

        <!-- 02. The Kitchen Analogy -->
        <section id="kitchen-analogy" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">02.</span>
                The Kitchen Mental Model
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-8 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <div class="text-5xl mb-6">👨‍🍳</div>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Server (Kitchen)</h3>
                    <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                        This is a secure, high-power environment.
                        <br/>✅ Access to Database (The Fridge)
                        <br/>✅ Access to FS / API Keys (Secret Sauce)
                        <br/>✅ Zero Latency between components
                        <br/>❌ No Interactivity (onClick, useState)
                    </p>
                </div>
                <div class="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20">
                    <div class="text-5xl mb-6">🍽️</div>
                    <h3 class="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">The Client (Dining Table)</h3>
                    <p class="text-blue-800 dark:text-blue-200 leading-relaxed text-lg">
                        This is the user's device.
                        <br/>✅ Interactive (Clicks, Forms, Gestures)
                        <br/>✅ Browser APIs (Geolocation, LocalStorage)
                        <br/>❌ High Latency
                        <br/>❌ Insecure (Never expose secrets here)
                    </p>
                </div>
            </div>
             <p class="text-center font-bold text-slate-500 italic text-xl">
               Goal: Do as much prep in the Kitchen as possible. Only bring the finished plate to the Table.
            </p>
        </section>

        <!-- 03. Zero-Bundle -->
        <section id="zero-bundle" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">03.</span>
                Zero-Bundle Architecture
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                This is the killer feature. Libraries imported in Server Components are <strong>never downloaded</strong> by the user. 
                You can import a 5MB parser library, loop through a database, generated a static string, and send <i>only that string</i> to the client.
            </p>

            <div class="bg-gray-900 rounded-xl p-8 shadow-2xl relative overflow-hidden">
                 <div class="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                     <span class="text-xs font-mono text-gray-400">app/blog/[slug]/page.tsx (Server Component)</span>
                     <span class="text-xs font-bold text-green-400">Bundle Size: 0KB</span>
                 </div>
                <pre class="text-sm md:text-base font-mono text-gray-300 overflow-x-auto">
<span class="text-purple-400">import</span> { format } <span class="text-purple-400">from</span> <span class="text-green-400">'date-fns'</span>; <span class="text-gray-500">// 20KB (Stays on Server)</span>
<span class="text-purple-400">import</span> { remark } <span class="text-purple-400">from</span> <span class="text-green-400">'remark'</span>;     <span class="text-gray-500">// 50KB (Stays on Server)</span>
<span class="text-purple-400">import</span> db <span class="text-purple-400">from</span> <span class="text-green-400">'lib/db'</span>;         <span class="text-gray-500">// Database Driver (Stays on Server)</span>

<span class="text-purple-400">export default async function</span> <span class="text-yellow-400">BlogPost</span>({ params }) {
  <span class="text-gray-500">// 1. Direct DB Access (No API Route needed!)</span>
  <span class="text-purple-400">const</span> post = <span class="text-purple-400">await</span> db.post.findUnique({ where: { slug: params.slug } });

  <span class="text-gray-500">// 2. Heavy processing</span>
  <span class="text-purple-400">const</span> htmlContent = <span class="text-purple-400">await</span> remark().process(post.markdown);

  <span class="text-purple-400">return</span> (
    <span class="text-blue-400">&lt;article&gt;</span>
      <span class="text-blue-400">&lt;h1&gt;</span>{post.title}<span class="text-blue-400">&lt;/h1&gt;</span>
      <span class="text-blue-400">&lt;div&gt;</span>{format(post.date, 'yyyy-MM-dd')}<span class="text-blue-400">&lt;/div&gt;</span>
      <span class="text-blue-400">&lt;div</span> <span class="text-cyan-400">dangerouslySetInnerHTML</span>={{ __html: htmlContent }} <span class="text-blue-400">/&gt;</span>
    <span class="text-blue-400">&lt;/article&gt;</span>
  );
}</pre>
            </div>
            
            <div class="mt-8 p-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl">
                <h4 class="font-bold text-green-800 dark:text-green-200 mb-2">The Impact</h4>
                <p class="text-gray-700 dark:text-gray-300">
                    Without RSC, you would need to initialize an API route (\`/ api / post /: slug\`), fetch it from the browser (\`useEffect\`), show a loading spinner, and bundle \`date - fns\` to format the date. 
                    With RSC, the user receives fully formed HTML. Instant First Paint. High SEO score.
                </p>
            </div>
        </section>
        
        <!-- 04. Server Actions -->
        <section id="server-actions" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">04.</span>
                Server Actions Mastery
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                RSC handles <strong>Reading</strong> data. Server Actions handle <strong>Mutating</strong> data.
                They allow you to call a server-side function directly from a client-side button click. Think: Remote Procedure Call (RPC) built into React.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-4 font-mono">actions.ts (Server)</h4>
                    <pre class="text-xs font-mono text-gray-600 dark:text-gray-400 overflow-x-auto">
'use server' // 👈 Magic directive

export async function likePost(postId) {
  await db.likes.create({ 
     data: { postId, userId: currentUser.id } 
  });
  
  // Re-renders the path on the server!
  revalidatePath('/blog/[slug]'); 
}</pre>
                </div>
                 <div class="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-4 font-mono">LikeButton.tsx (Client)</h4>
                    <pre class="text-xs font-mono text-gray-600 dark:text-gray-400 overflow-x-auto">
'use client'
import { likePost } from './actions';

export function LikeButton({ id }) {
  return (
    &lt;button onClick={() => likePost(id)}&gt;
       Like &lt;Heart /&gt;
    &lt;/button&gt;
  )
}</pre>
                </div>
            </div>
             <p class="mt-6 text-gray-700 dark:text-gray-300">
                 Notice there is <strong>no manual fetch</strong>. No \`JSON.stringify\`. No headers configuration. React handles the network serialization for you.
             </p>
        </section>

        <!-- 05. Composition -->
        <section id="composition-patterns" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">05.</span>
                Composition (Hole in the Donut)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                <strong>Rule:</strong> You cannot import a Server Component into a Client Component. 
                <br/>
                <strong>Exception:</strong> You CAN may pass a Server Component as a child (prop) to a Client Component.
            </p>
             <div class="bg-gray-100 dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800">
                 <h3 class="text-2xl font-bold mb-4">The Context Provider Problem</h3>
                 <p class="mb-4 text-gray-700 dark:text-gray-300">
                     Context Providers must be Client Components. Does that mean your whole app must be client-side? No.
                 </p>
                 <pre class="text-sm font-mono bg-white dark:bg-black p-4 rounded-xl overflow-x-auto">
// ThemeProvider.tsx (Client)
'use client'
export function ThemeProvider({ children }) {
  return &lt;Context.Provider&gt;{children}&lt;/Context.Provider&gt;
}

// layout.tsx (Server - Default)
import { ThemeProvider } from './ThemeProvider';

export default function RootLayout({ children }) {
  return (
    &lt;html&gt;
      &lt;body&gt;
        &lt;ThemeProvider&gt;
           {/* This 'children' is Server Rendered! */}
           {children} 
        &lt;/ThemeProvider&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  )
}</pre>
                <div class="mt-4 p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-sm text-blue-800 dark:text-blue-200 inline-block">
                    🍩 The ThemeProvider is the donut. The {children} is the hole. The Server Component fits in the hole.
                </div>
             </div>
        </section>

        <!-- 06. Caching -->
        <section id="caching-deep-dive" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">06.</span>
                Caching & Memoization
            </h2>
             <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Next.js handles deduplication automatically. If you call \`getUser()\` in the Header, the Sidebar, and the Main Content, it is only executed <strong>once</strong> per request.
            </p>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div class="p-6 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-900/20">
                     <h4 class="font-bold text-yellow-900 dark:text-yellow-100 mb-2">1. Request Memoization</h4>
                     <p class="text-sm text-yellow-800 dark:text-yellow-200">Per-request lifecycle. Deduplicates fetches.</p>
                 </div>
                 <div class="p-6 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-200 dark:border-orange-900/20">
                     <h4 class="font-bold text-orange-900 dark:text-orange-100 mb-2">2. Data Cache</h4>
                     <p class="text-sm text-orange-800 dark:text-orange-200"><strong>Persistent</strong> across requests. Stores server responses.</p>
                 </div>
                 <div class="p-6 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/20">
                     <h4 class="font-bold text-red-900 dark:text-red-100 mb-2">3. Full Route Cache</h4>
                     <p class="text-sm text-red-800 dark:text-red-200">Build time. Stores the static HTML shell.</p>
                 </div>
             </div>
        </section>

        <!-- 07. Streaming -->
        <section id="streaming-suspense" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">07.</span>
                Streaming & Suspense
            </h2>
             <div class="flex flex-col md:flex-row gap-8 items-center">
                 <div class="flex-1 text-lg text-gray-700 dark:text-gray-300">
                     <p class="mb-4">
                        In the past, the page would not show until *everything* was ready (Waterfall). 
                     </p>
                     <p>
                        With RSC, we use <code>Suspense</code> to define boundaries. 
                        The server sends the generic layout immediately. Then, as the slow database queries finish, it streams chunks of HTML to fill in the gaps.
                     </p>
                 </div>
                 <div class="w-full md:w-1/2 bg-slate-900 p-6 rounded-2xl shadow-xl">
                     <div class="w-full h-4 bg-slate-800 rounded mb-4"></div>
                     <div class="flex gap-4 mb-4">
                         <div class="w-1/4 h-screen bg-slate-800 rounded"></div>
                         <div class="flex-1 space-y-4">
                             <div class="h-32 bg-slate-800 rounded animate-pulse opacity-50 flex items-center justify-center text-slate-500 font-bold">Loading...</div>
                             <div class="h-32 bg-slate-800 rounded animate-pulse opacity-30"></div>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        <!-- 08. Security -->
        <section id="security-best-practices" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">08.</span>
                Security Best Practices
            </h2>
            <div class="bg-gray-100 dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800">
                 <h4 class="text-xl font-bold mb-4 flex items-center gap-2">
                     <span class="text-red-500">🔒</span> The Poison Pill
                 </h4>
                 <p class="text-gray-700 dark:text-gray-300 mb-4">
                     You should create a file specifically to prevent sensitive modules from being bundled to the client.
                 </p>
                 <pre class="text-sm font-mono bg-white dark:bg-black p-4 rounded-xl">
// lib/db.ts
import 'server-only'; 

// Any attempt to import this file in a Client Component 
// will trigger a build error.
export const db = ...</pre>
            </div>
        </section>

        <!-- 09. Simulation -->
        <section id="ecosystem-simulation" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">09.</span>
                Simulation & Demo
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Below is a comprehensive visual simulator of the Next.js App Router architecture. Toggle between "Server View" and "Client View" to see where code executes.
            </p>
        </section>

    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';

// ==========================================
// 🏢 RSC Architecture Simulator (Enhanced)
// ==========================================

export default function RSCSimulator() {
    const [view, setView] = useState('server'); // 'server' | 'client'
    const [loading, setLoading] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [streamProgress, setStreamProgress] = useState(0);

    const performServerAction = () => {
        if (loading) return;
        setLoading(true);
        // Simulate Server Action delay
        setTimeout(() => {
            setLoading(false);
            setCartCount(c => c + 1);
        }, 1200);
    };

    // Simulate Streaming Process
    useEffect(() => {
        const interval = setInterval(() => {
            setStreamProgress(prev => (prev >= 100 ? 0 : prev + 10));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate-50 dark:bg-[#0f1115] p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-white/10 shadow-3xl font-sans min-h-[800px] flex flex-col">
             
             {/* HEADER */}
             <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6 bg-white/50 dark:bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-slate-200 dark:border-white/5">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <span className="text-blue-600 text-4xl">⚛️</span> 
                        <span>RSC Architecture <span className="text-slate-400 font-light text-xl">Inspector</span></span>
                    </h3>
                    <p className="text-slate-500 mt-2 font-medium">Visualizing the "Hole in the Donut" composition pattern.</p>
                </div>
                
                {/* View Switcher */}
                 <div className="flex bg-slate-200 dark:bg-[#1a1c20] p-1.5 rounded-xl self-stretch xl:self-auto">
                    <button 
                        onClick={() => setView('server')}
                        className={\`flex-1 xl:flex-none px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 \${view === 'server' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}\`}
                    >
                        <span>🖥️</span> Server View
                    </button>
                    <button 
                        onClick={() => setView('client')}
                        className={\`flex-1 xl:flex-none px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 \${view === 'client' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}\`}
                    >
                        <span>💻</span> Client View
                    </button>
                </div>
            </div>

            {/* CANVAS */}
            <div className="relative flex-1 bg-[#0b0c0f] rounded-3xl p-8 border border-slate-800 overflow-hidden flex flex-col xl:flex-row gap-8 shadow-inner">
                
                {/* 1. SERVER DOMAIN */}
                <div className={\`flex-1 transition-all duration-700 ease-out \${view === 'server' ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4 blur-[2px]'}\`}>
                     <div className="flex items-center gap-3 mb-6 text-blue-400 border-b border-blue-500/20 pb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg"><span>🖥️</span></div>
                        <div>
                            <span className="font-bold tracking-widest uppercase text-sm block leading-none">Server Runtime</span>
                            <span className="text-[10px] text-blue-400/50 font-mono">Node.js / Edge</span>
                        </div>
                     </div>

                     {/* Server Components Layout */}
                     <div className="space-y-6 relative">
                         <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500/10 z-0"></div>

                         <div className="bg-slate-800/50 p-6 rounded-2xl border border-blue-500/30 relative overflow-hidden group hover:border-blue-500/60 transition-colors z-10 ml-0 xl:ml-0">
                             <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase rounded-bl-lg font-mono">Page.tsx</div>
                             <div className="flex gap-4 items-start">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><span>🗄️</span></div>
                                <div className="flex-1">
                                    <div className="text-slate-200 font-bold mb-1">Direct DB Access</div>
                                    <code className="text-xs text-blue-300/70 bg-blue-900/20 p-1.5 rounded block w-full">const data = await db.products.findMany()</code>
                                    <div className="mt-4 flex gap-2">
                                        <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] rounded border border-green-500/20">Async Component</span>
                                        <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] rounded border border-purple-500/20">Zero Bundle</span>
                                    </div>
                                </div>
                             </div>
                             
                             {/* THE HOLE IN THE DONUT */}
                             <div className="mt-6 p-4 bg-[#0b0c0f] rounded-xl border border-dashed border-slate-600/50 relative">
                                <div className="absolute -top-3 left-4 px-2 bg-slate-800 text-[10px] text-slate-400 uppercase font-bold">Client Boundary</div>
                                <div className="flex items-center gap-3 text-green-400/80 mb-2">
                                    <span>💻</span>
                                    <span className="text-xs font-mono font-bold">&lt;InteractiveProductCard /&gt;</span>
                                </div>
                                <div className="text-[10px] text-slate-500 leading-relaxed">
                                    Server passes serialized props (JSON) to this client component.
                                </div>
                             </div>
                         </div>

                         <div className="bg-slate-800/50 p-6 rounded-2xl border border-blue-500/30 relative z-10 group hover:border-blue-500/60 transition-colors">
                            <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase rounded-bl-lg font-mono">Footer.tsx</div>
                             <div className="flex gap-4">
                                <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400"><span>📄</span></div>
                                <div>
                                    <div className="text-slate-200 font-bold mb-1">Static Content</div>
                                    <p className="text-xs text-slate-400">Rendered to HTML string. No JS needed.</p>
                                </div>
                             </div>
                         </div>
                     </div>
                </div>

                {/* SERIALIZATION BRIDGE */}
                <div className="hidden xl:flex flex-col justify-center items-center w-16 relative">
                     <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-slate-800 via-blue-500/50 to-slate-800"></div>
                     <div className="z-10 bg-black border border-slate-700 p-2 rounded-full shadow-xl shadow-blue-500/10">
                        <span className="text-white animate-pulse">➡️</span>
                     </div>
                     <div className="mt-4 bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[10px] font-mono text-slate-400 rotate-90 whitespace-nowrap">
                         JSON Serialization
                     </div>
                </div>

                {/* 2. CLIENT DOMAIN */}
                <div className={\`flex-1 transition-all duration-700 ease-out \${view === 'client' ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4 blur-[2px]'}\`}>
                     <div className="flex items-center gap-3 mb-6 text-green-400 border-b border-green-500/20 pb-4">
                        <div className="p-2 bg-green-500/10 rounded-lg"><span>💻</span></div>
                        <div>
                            <span className="font-bold tracking-widest uppercase text-sm block leading-none">Browser Runtime</span>
                            <span className="text-[10px] text-green-400/50 font-mono">DOM / Window</span>
                        </div>
                     </div>

                     {/* Interactive Island */}
                     <div className="h-full bg-slate-800/50 p-8 rounded-2xl border border-green-500/30 relative flex flex-col items-center text-center shadow-lg shadow-green-900/10 transition-all hover:border-green-500/60">
                         <div className="absolute top-0 right-0 px-3 py-1 bg-green-500/20 text-green-300 text-[10px] font-bold uppercase rounded-bl-lg font-mono">Hydrated Island</div>
                         
                         <div className="flex-1 flex flex-col justify-center items-center w-full max-w-sm">
                            <span className={\`text-5xl mb-6 transition-all duration-300 \${cartCount > 0 ? 'text-green-400 scale-110' : 'text-slate-600'}\`}>🛒</span>
                            
                            <h4 className="text-2xl font-black text-white mb-2">{cartCount} Items</h4>
                            <p className="text-xs text-slate-400 mb-8 uppercase tracking-wider font-bold">Shopping Cart State</p>

                            <button 
                                onClick={performServerAction}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-5 rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 transition-all active:scale-95 group"
                            >
                                {loading ? <span className="animate-spin text-yellow-300">⚡</span> : <span className="group-hover:text-yellow-300 transition-colors">⚡</span>}
                                {loading ? 'Running Server Action...' : 'Add to Cart'}
                            </button>
                            
                            <div className="mt-8 p-4 bg-black/40 rounded-xl w-full text-left">
                                <div className="text-[10px] text-slate-500 font-mono mb-2 uppercase font-bold border-b border-white/5 pb-1">Lifecycle</div>
                                <div className="space-y-1 text-xs font-mono text-green-300/80">
                                    <div>1. onClick triggers</div>
                                    <div>2. POST request (RPC)</div>
                                    <div>3. Server mutates DB</div>
                                    <div>4. Server re-renders UI</div>
                                    <div>5. Client merges HTML</div>
                                </div>
                            </div>
                         </div>
                     </div>
                </div>

            </div>
        </div>
    );
}
`};
