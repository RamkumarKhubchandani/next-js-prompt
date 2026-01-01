export const nextjsAppRouter = {
    title: "Next.js 15: The New Architecture 🏗️",
    description: "The App Router isn't just a router; it's a full-stack framework. Master RSC, Async Request APIs, and the new caching model of Next.js 15.",
    slug: "nextjs-15-app-router",
    type: "static",
    author: "Vercel Engineering",
    createdAt: new Date().toISOString(),
    readTime: "45 min read",
    difficulty: "Advanced",
    tags: ["Next.js", "Server Components", "Full Stack", "React 19"],
    keywords: ["Next.js 15", "RSC", "Server Actions", "Streaming", "Async Params", "Caching"],
    toc: [
        { id: "mental-model", label: "01. Mental Model" },
        { id: "server-components", label: "02. Server Components" },
        { id: "async-breaking-change", label: "03. Async Request APIs" },
        { id: "caching-reset", label: "04. The Caching Reset" },
        { id: "server-actions", label: "05. Server Actions" },
        { id: "layouts-navigation", label: "06. Layouts & Navigation" },
        { id: "route-handlers", label: "07. Route Handlers" },
        { id: "virality", label: "08. Share & Takeaways" },
        { id: "interactive-demo", label: "09. Interactive Demo" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- Introduction -->
        <section class="scroll-mt-32">
             <div class="border-l-4 border-black dark:border-white pl-6 py-2 mb-8">
                <p class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                    "Next.js 15 isn't just an update. It's a reset."
                </p>
             </div>
             <p class="text-xl md:text-2xl leading-relaxed font-light">
                If you are coming from the Pages Router (\`pages/\`), the App Router (\`app/\`) will feel like learning a new framework. 
                It shifts React from a client-side library to a <strong>Framework Architecture</strong> that spans the server and client.
                <br/><br/>
                Next.js 15 solidifies this by introducing stricter patterns (Async APIs) and smarter defaults (Uncached by default).
            </p>
        </section>

        <!-- Section 1: Mental Model -->
        <section id="mental-model" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-blue-600 dark:text-blue-400">01.</span>
                The Mental Model Shift
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p>
                    In the past, your React components ran in the browser. You had to wait for the JavaScript to download, parse, and execute before seeing anything. 
                    Then, you fetched data.
                </p>
                <p>
                    <strong>The App Router flips this.</strong> Your logic runs on the server first. It sends fully formed HTML to the browser. 
                    Think of your components as "Backend Functions" that return HTML strings, which then "Hydrate" into interactive apps on the client.
                </p>
            </div>
            
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div class="bg-gray-50 dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800">
                    <h3 class="font-bold text-gray-900 dark:text-white mb-2">Old World (Pages)</h3>
                    <ul class="space-y-2 text-base text-gray-600 dark:text-slate-400">
                        <li>❌ Client fetches data (Waterfalls)</li>
                        <li>❌ Big JS Bundles</li>
                        <li>❌ <code class="text-sm bg-gray-200 dark:bg-slate-800 px-1 rounded">getServerSideProps</code> boilerplate</li>
                    </ul>
                </div>
                <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-200 dark:border-blue-800/30">
                    <h3 class="font-bold text-blue-900 dark:text-blue-100 mb-2">New World (App)</h3>
                    <ul class="space-y-2 text-base text-blue-800 dark:text-blue-200">
                         <li>✅ Server fetches data directly</li>
                         <li>✅ Zero Bundle Size for RSC</li>
                         <li>✅ <code class="text-sm bg-blue-100 dark:bg-blue-800 px-1 rounded">async/await</code> in components</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Section 2: Server Components -->
        <section id="server-components" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-blue-600 dark:text-blue-400">02.</span>
                React Server Components (RSC)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                By default, <strong>every file</strong> in \`app/\` is a Server Component. 
                This means you can connect to your database directly inside your JSX.
            </p>

            <div class="bg-gray-900 dark:bg-black rounded-2xl border border-gray-800 p-6 relative group overflow-hidden">
                <div class="absolute top-4 right-4 text-xs font-mono text-gray-500">app/page.tsx</div>
                <pre class="font-mono text-base text-gray-300 overflow-x-auto"><code>import { db } from "@/lib/db";

// 1. It's ASYNC
export default async function Page() {
  
  // 2. Direct Database Access (Secure!)
  const users = await db.user.findMany();

  return (
    &lt;main&gt;
      {users.map(user => (
        &lt;div key={user.id}&gt;{user.name}&lt;/div&gt;
      ))}
    &lt;/main&gt;
  );
}</code></pre>
                <div class="absolute bottom-4 right-4 text-sm text-green-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Server Only. 0kb JS sent to client.
                </div>
            </div>
        </section>

        <!-- Section 3: Async Request APIs (Breaking Change) -->
        <section id="async-breaking-change" class="scroll-mt-32">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-yellow-600 dark:text-yellow-400">03.</span>
                Async Request APIs ⚠️
            </h2>
            <div class="p-6 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 rounded-r-xl mb-6">
                <h4 class="text-xl font-bold text-yellow-800 dark:text-yellow-100 mb-2">Next.js 15 Breaking Change</h4>
                <p class="text-lg text-yellow-900 dark:text-yellow-200">
                    APIs that rely on <strong>Request Time</strong> information are now asynchronous Promises. 
                    You must \`await\` them. This allows Next.js to defer rendering until the last possible millisecond.
                </p>
            </div>

            <div class="space-y-6">
                 <div>
                     <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Params & SearchParams</h4>
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg border border-red-200 dark:border-red-900/30">
                             <div class="text-sm font-bold text-red-600 uppercase mb-2">Next.js 14</div>
                             <code class="text-base font-mono">const id = params.id; // ❌ Crash in v15</code>
                         </div>
                         <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg border border-green-200 dark:border-green-900/30">
                              <div class="text-sm font-bold text-green-600 uppercase mb-2">Next.js 15</div>
                             <code class="text-base font-mono">const { id } = <strong>await</strong> params; // ✅ Correct</code>
                         </div>
                     </div>
                 </div>

                 <div>
                     <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Headers & Cookies</h4>
                     <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-lg text-base font-mono text-gray-800 dark:text-gray-300"><code>import { headers, cookies } from "next/headers";

export async function GET() {
  const headerList = <strong>await</strong> headers();
  const cookieStore = <strong>await</strong> cookies();
  // ...
}</code></pre>
                 </div>
            </div>
        </section>

        <!-- Section 4: The Caching Reset -->
        <section id="caching-reset" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-purple-600 dark:text-purple-400">04.</span>
                The Caching Reset
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Next.js 14 cached <strong>everything aggressively</strong>. It was like a freezer that froze your water bottle when you just wanted cold water.
                <br/>
                Next.js 15 moves to <strong>Uncached by Default</strong> for \`fetch\`.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Cached -->
                 <div class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                    <div class="text-xl font-bold text-gray-900 dark:text-white mb-2">"I want cache"</div>
                    <p class="text-base text-gray-500 mb-4">Use this for static content (Blog posts, Marketing copy).</p>
                    <code class="block bg-gray-100 dark:bg-black p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200">fetch(url, { cache: 'force-cache' })</code>
                </div>
                <!-- Dynamic -->
                 <div class="bg-white dark:bg-slate-900 border border-purple-500 dark:border-purple-500/50 p-6 rounded-2xl shadow-md">
                    <div class="text-xl font-bold text-purple-700 dark:text-purple-400 mb-2">Next.js 15 Default</div>
                    <p class="text-base text-gray-500 mb-4">Always fresh data. No stale surprises.</p>
                    <code class="block bg-purple-50 dark:bg-purple-900/20 p-3 rounded text-sm font-mono text-purple-700 dark:text-purple-300">fetch(url) // defaults to no-store</code>
                </div>
            </div>
        </section>

         <!-- Section 5: Server Actions -->
        <section id="server-actions" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-pink-600 dark:text-pink-400">05.</span>
                Server Actions
            </h2>
             <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Think of Server Actions as <strong>Remote Procedure Calls (RPC)</strong> integrated into React.
                You write a function, and Next.js automatically creates a hidden API endpoint for it.
            </p>
             <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800">
                <h4 class="font-bold text-sm uppercase text-gray-500 mb-4">actions.ts</h4>
                <pre class="font-mono text-base text-gray-800 dark:text-gray-200 overflow-x-auto"><code>"use server"; // 👈 This magic line makes it backend-only

export async function subscribe(formData: FormData) {
  const email = formData.get("email");
  
  // 1. Mutate DB
  await db.subscribers.create({ email });
  
  // 2. Revalidate Cache (Update UI)
  revalidatePath("/");
}</code></pre>
            </div>
            <div class="mt-4 flex gap-4 text-base text-gray-600 dark:text-gray-400">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Secure IDs</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Type Safe</span>
                </div>
                 <div class="flex items-center gap-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>No API Routes</span>
                </div>
            </div>
        </section>

        <!-- Section 6: Layouts & Navigation -->
        <section id="layouts-navigation" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-indigo-600 dark:text-indigo-400">06.</span>
                Layouts & Navigation
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Layouts are the secret weapon of the App Router. They persist across navigation. 
                When a user clicks a link, only the parts of the page that change are updated. 
                The Sidebar and Navbar stay mounted (keeping their state!).
            </p>
             <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto shadow-sm border border-gray-200 dark:border-slate-800"><code>// app/dashboard/layout.tsx
export default function DashLayout({ children }) {
  return (
    &lt;section className="flex"&gt;
      &lt;Sidebar /&gt; {/* 👈 Persists on nav! */}
      {children}
    &lt;/section&gt;
  )
}</code></pre>
        </section>

         <!-- Section 7: Shares -->
        <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                08. Share the Knowledge
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
                        "Just migrated to Next.js 15. The 'await params' change is huge, but the uncached-by-default model is what we always needed. It's finally mature. #Nextjs15 #React #WebDev"
                     </p>
                     <div class="text-xs font-bold text-blue-500 uppercase tracking-wide">Twitter / X</div>
                </div>
            </div>
             <div class="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                <h4 class="font-bold text-lg mb-2 text-purple-900 dark:text-purple-200">The Takeaway</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    Next.js 15 is not just better; it's correct. It forces you to handle async boundaries properly and gives you control over caching.
                </p>
            </div>
        </section>


        <!-- Interactive Demo Section -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-teal-600 dark:text-teal-400">09.</span>
                Visualize the Router
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                The core of the App Router is the <strong>File-System based API</strong>. 
                Folders define routes. Special files define behavior.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <!-- Concept: Nested Layouts -->
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Concept</span>
                        Nested Layouts
                    </h3>
                    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Layouts wrap pages. When you nest files, you nest layouts. 
                        The \`RootLayout\` wraps the \`DashboardLayout\`, which wraps the Page. 
                        State is preserved in layouts when you navigate between pages.
                    </p>
                </div>

                <!-- Concept: Dynamic Segments -->
                <div class="space-y-4">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                         <span class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Concept</span>
                         Dynamic Segments
                    </h3>
                    <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Create dynamic routes by wrapping folder names in square brackets \`[folder]\`.
                        These become params passed to your page (now async!).
                    </p>
                </div>
            </div>

            <p class="text-base text-gray-500 italic mb-6">
                👇 Interact with the simulator below to see how \`layout.tsx\` nesting works in practice.
            </p>
        </section>

    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';

// ----------------------------------------------------
// 🌐 NEXT.JS ROUTER SIMULATOR
// ----------------------------------------------------

export default function NextRouterSimulator() {
  const [url, setUrl] = useState('/dashboard');
  const [loading, setLoading] = useState(false);
  const [segments, setSegments] = useState(['dashboard']);

  // Simulate navigation
  const navigate = (path) => {
      setLoading(true);
      setUrl(path);
      
      // Simulate "Server Payload" download time
      setTimeout(() => {
          setLoading(false);
          setSegments(path.split('/').filter(Boolean));
      }, 800);
  };

  return (
    <div className="bg-white dark:bg-[#000] text-gray-900 dark:text-white font-sans border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden h-[650px] flex flex-col md:flex-row shadow-2xl">
      
      {/* 📁 LEFT: File System (Source) */}
      <div className="w-full md:w-64 bg-gray-50 dark:bg-[#111] border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
            <span>app/ Directory</span>
            <span className="text-[10px] bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded text-blue-700 dark:text-blue-300">v15</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
           <FileTree 
              navigate={navigate} 
              activeUrl={url} 
              structure={{
                  'layout.tsx': { type: 'layout', desc: 'Root Layout' },
                  'page.tsx': { type: 'page', path: '/', desc: 'Home' },
                  'loading.tsx': { type: 'loading', desc: 'Suspense' },
                  dashboard: {
                      'layout.tsx': { type: 'layout', desc: 'Dash Layout' },
                      'page.tsx': { type: 'page', path: '/dashboard', desc: 'Analytics' },
                      settings: {
                          'page.tsx': { type: 'page', path: '/dashboard/settings', desc: 'Settings' }
                      },
                      '[slug]': {
                          'page.tsx': { type: 'page', path: '/dashboard/123', desc: 'Dynamic ID' }
                      }
                  }
              }}
           />
        </div>
        
        <div className="p-4 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="text-[10px] text-gray-500 uppercase mb-2">Legend</div>
            <div className="flex flex-wrap gap-2 text-xs">
                <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400"><span className="w-2 h-2 rounded-full bg-purple-500"></span>Layout</span>
                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Page</span>
            </div>
        </div>
      </div>

      {/* 🖥️ RIGHT: Browser Output (Result) */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#000] relative">
        
        {/* Browser Bar */}
        <div className="bg-gray-100 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 p-3 flex items-center gap-4">
            <div className="flex gap-1.5 opacity-50">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            <div className="bg-white dark:bg-[#000] border border-gray-200 dark:border-gray-800 flex-1 rounded-lg px-4 py-1.5 text-xs font-mono text-gray-500 flex justify-between items-center group focus-within:border-blue-500/50 transition-colors">
                <span>localhost:3000<span className="text-gray-900 dark:text-white">{url}</span></span>
                {loading && <span className="text-blue-500 animate-spin">⟳</span>}
            </div>
        </div>

        {/* Viewport */}
        <div className="p-8 flex-1 overflow-y-auto relative bg-grid-slate-100 dark:bg-grid-slate-900/50">
            <RootLayout loading={loading} segments={segments}>
                 {segments[0] === 'dashboard' ? (
                     <DashboardLayout loading={loading} segments={segments}>
                         {loading ? <LoadingSkeleton /> : <PageContent url={url} />}
                     </DashboardLayout>
                 ) : (
                     <HomePage />
                 )}
            </RootLayout>
            
            {/* RENDER VISUALIZER */}
            {loading && (
                <div className="absolute inset-x-8 bottom-8 bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/50 text-blue-700 dark:text-blue-300 p-4 rounded-xl flex items-center gap-4 animate-in slide-in-from-bottom-5 shadow-lg backdrop-blur-md">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div>
                        <div className="font-bold text-sm">Streaming Server Response...</div>
                        <div className="text-xs opacity-70">RSC Payload downloading. Partial Hydration active.</div>
                    </div>
                </div>
            )}
        </div>
      </div>

    </div>
  );
}

// --- LAYOUTS ---

function RootLayout({ children }) {
    return (
        <div className="border-2 border-dashed border-purple-300 dark:border-purple-500/30 p-4 rounded-xl h-full relative flex flex-col bg-white dark:bg-[#0a0a0a]">
             <div className="absolute -top-3 left-4 bg-purple-100 dark:bg-purple-900/80 text-[10px] px-2 rounded text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-purple-500/30 font-bold tracking-wide shadow-sm">
                Root Layout
             </div>
             
             {/* Sticky Nav */}
             <div className="bg-gray-50 dark:bg-[#111] border-b border-gray-100 dark:border-[#222] p-3 mb-6 rounded-lg flex justify-between items-center shadow-sm">
                 <div className="flex items-center gap-2 font-bold text-sm">
                    <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                    NextCorp
                 </div>
                 <div className="flex gap-4 text-xs font-medium text-gray-500">
                     <span>Docs</span>
                     <span>Pricing</span>
                     <span className="bg-black text-white px-2 py-0.5 rounded">Login</span>
                 </div>
             </div>
             
             <div className="flex-1 relative">
                {children}
             </div>
        </div>
    )
}

function DashboardLayout({ children }) {
     return (
        <div className="border-2 border-dashed border-blue-300 dark:border-blue-500/30 p-4 rounded-xl h-full relative flex gap-6 bg-gray-50/50 dark:bg-blue-900/5">
             <div className="absolute -top-3 right-4 bg-blue-100 dark:bg-blue-900/80 text-[10px] px-2 rounded text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-500/30 font-bold tracking-wide shadow-sm">
                Dashboard Layout
             </div>
             
             {/* Sidebar */}
             <div className="w-40 bg-white dark:bg-[#111] rounded-xl border border-gray-100 dark:border-[#222] p-4 hidden md:block shadow-sm h-full">
                 <div className="text-[10px] uppercase font-bold text-gray-400 mb-3">Menu</div>
                 <div className="space-y-2">
                     <div className="h-8 w-full bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30"></div>
                     <div className="h-8 w-full bg-gray-100 dark:bg-[#222] rounded-lg"></div>
                     <div className="h-8 w-full bg-gray-100 dark:bg-[#222] rounded-lg"></div>
                 </div>
             </div>
             
             <div className="flex-1 bg-white dark:bg-[#000] rounded-xl border border-gray-100 dark:border-[#222] p-6 shadow-sm overflow-hidden relative">
                 {children}
             </div>
        </div>
    )
}

// --- PAGES ---

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-400 dark:from-white dark:to-gray-600 mb-4">
                Ship Faster.
            </h1>
            <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
                The full-stack React framework for the web. Now with simplified data fetching.
            </p>
            <div className="mt-8 flex gap-3">
                 <div className="w-24 h-8 rounded-full bg-black dark:bg-white"></div>
                 <div className="w-24 h-8 rounded-full border border-gray-200 dark:border-gray-800"></div>
            </div>
        </div>
    )
}

function PageContent({ url }) {
    if (url === '/dashboard') return (
        <div className="animate-in fade-in zoom-in-95 duration-500">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span>📊</span> Analytics
            </h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl relative overflow-hidden">
                     <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-900 dark:text-white opacity-50">24k</div>
                </div>
                <div className="h-32 bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-xl"></div>
                <div className="h-40 bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-xl col-span-2"></div>
            </div>
        </div>
    )
     if (url.includes('settings')) return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span>⚙️</span> Settings
            </h1>
            <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#111] rounded-xl border border-gray-100 dark:border-[#222]">
                    <span className="font-bold text-sm">Dark Mode</span>
                    <div className="w-10 h-6 bg-green-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                    </div>
                </div>
                 <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#111] rounded-xl border border-gray-100 dark:border-[#222]">
                    <span className="font-bold text-sm">Notifications</span>
                    <div className="w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                    </div>
                </div>
            </div>
        </div>
    )
    // Dynamic
     if (url.includes('123')) return (
        <div className="animate-in fade-in zoom-in-95 duration-500">
            <h1 className="text-2xl font-bold mb-2">Item Details</h1>
            <div className="flex items-center gap-2 text-xs text-blue-500 font-mono mb-6 bg-blue-50 dark:bg-blue-900/20 w-fit px-2 py-1 rounded">
                params: { id: '123' }
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-[#111] rounded-xl border border-gray-100 dark:border-[#222]">
                <div className="flex gap-4">
                     <div className="w-16 h-16 bg-gray-200 dark:bg-[#222] rounded-lg"></div>
                     <div className="space-y-2 flex-1">
                         <div className="h-4 w-3/4 bg-gray-200 dark:bg-[#222] rounded"></div>
                         <div className="h-4 w-1/2 bg-gray-200 dark:bg-[#222] rounded"></div>
                     </div>
                </div>
            </div>
        </div>
    )
    return null;
}

function LoadingSkeleton() {
    return (
         <div className="space-y-4 animate-pulse opacity-50">
             <div className="h-8 bg-gray-200 dark:bg-[#222] rounded w-1/3 mb-8"></div>
             <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-gray-200 dark:bg-[#222] rounded-xl"></div>
                <div className="h-32 bg-gray-200 dark:bg-[#222] rounded-xl"></div>
             </div>
             <div className="h-40 bg-gray-200 dark:bg-[#222] rounded-xl w-full"></div>
         </div>
    )
}

// --- FILE TREE RECURSIVE ---
function FileTree({ structure, navigate, activeUrl }) {
    return (
        <div>
            {Object.entries(structure).map(([key, value]) => {
                 if (value.type) {
                     // It's a file
                    const isActive = value.path && activeUrl === value.path;
                    let color = 'text-gray-500 dark:text-gray-500';
                    let icon = '📄';
                    
                    if(value.type === 'layout') { color = 'text-purple-600 dark:text-purple-400'; icon = '🍱'; }
                    if(value.type === 'page') { color = 'text-blue-600 dark:text-blue-400'; icon = '📟'; }
                    if(value.type === 'loading') { color = 'text-yellow-600 dark:text-yellow-400'; icon = '⏳'; }

                    return (
                        <div 
                            key={key} 
                            onClick={() => value.path && navigate(value.path)}
                            className={\`pl-4 py-1.5 text-xs flex items-center gap-2 cursor-pointer transition-all rounded-md mb-0.5 \${isActive ? 'bg-blue-50 dark:bg-white/10 font-bold' : 'hover:bg-gray-100 dark:hover:bg-white/5'}\`}
                        >
                            <span className="opacity-80">{icon}</span>
                            <span className={\`\${isActive ? 'text-gray-900 dark:text-white' : color}\`}>
                                {key} 
                            </span>
                            {value.desc && <span className="ml-auto text-[10px] opacity-40 uppercase tracking-widest">{value.desc}</span>}
                        </div>
                    )
                 } else {
                     // Folder
                     return (
                         <div key={key} className="pl-2 mt-2">
                             <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                 <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path></svg>
                                 {key}
                             </div>
                             <div className="border-l border-gray-200 dark:border-gray-800 ml-1.5 pl-1">
                                 <FileTree structure={value} navigate={navigate} activeUrl={activeUrl} />
                             </div>
                         </div>
                     )
                 }
            })}
        </div>
    )
}
`
}
