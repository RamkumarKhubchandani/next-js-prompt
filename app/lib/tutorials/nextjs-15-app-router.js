export const nextjsAppRouter = {
    title: "Next.js 15: The Framework Architecture Guide 🏗️",
    description: "The App Router isn't just a router; it's a full-stack mental model. Master Async Request APIs, the Caching Reset (no-store), Server Actions validation, and Parallel Routes.",
    slug: "nextjs-15-app-router",
    type: "static",
    author: "Vercel Architect",
    createdAt: new Date().toISOString(),
    readTime: "55 min read",
    difficulty: "Expert",
    tags: ["Next.js", "Server Components", "Full Stack", "React 19", "Performance"],
    keywords: ["Next.js 15 Async Params", "React Server Components", "Next.js Caching", "Server Actions Zod", "Parallel Routes"],
    toc: [
        { id: "mental-model", label: "01. The Mental Model Shift" },
        { id: "async-request-api", label: "02. Async Request APIs ⚠️" },
        { id: "caching-architecture", label: "03. The Caching Architecture" },
        { id: "server-actions", label: "04. Server Actions (RPC)" },
        { id: "advanced-routing", label: "05. Advanced Routing Patterns" },
        { id: "streaming-suspense", label: "06. Streaming & Suspense" },
        { id: "middleware-auth", label: "07. Middleware & Auth" },
        { id: "senior-takeaways", label: "08. Senior Takeaways" },
        { id: "interactive-demo", label: "09. Router Simulator" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Mental Model -->
        <section id="mental-model" class="scroll-mt-32">
             <div class="border-l-8 border-black dark:border-white bg-gray-50 dark:bg-zinc-900/50 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h2 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "It's not just a Router. It's a Hybrid Graph."
                </h2>
                <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-6">
                    The biggest mistake developers make is treating the App Router like the Pages Router. 
                    Next.js 15 is a compiler that stitches together a <strong>Server Component Graph</strong> and a <strong>Client Component Graph</strong> into a single HTML stream.
                </p>
             </div>
             <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                 You are no longer writing "Frontend Code" that fetches from a "Backend". 
                 You are writing <strong>Backend Code</strong> (RSC) that occasionally yields to the Frontend (Client Components) for interactivity.
             </p>
        </section>

        <!-- 02. Async Request APIs -->
        <section id="async-request-api" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-yellow-500">02.</span>
                Async Request APIs ⚠️
            </h2>
            <div class="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
                <p class="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                    This is the #1 Breaking Change in Next.js 15.
                </p>
                <p class="text-yellow-700 dark:text-yellow-300 mt-2">
                    In Next.js 14, accessing \`params\` or \`headers()\` was synchronous. 
                    In Next.js 15, these are <strong>Promises</strong>. Accessing them synchronously will throw an error or warning.
                </p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="p-6 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/20">
                     <h3 class="font-bold text-red-700 dark:text-red-400 mb-4">❌ The Old Way (Next.js 14)</h3>
                     <pre class="text-xs font-mono text-gray-700 dark:text-gray-300">
// app/blog/[slug]/page.tsx
export default function Page({ params }) {
  // CRASH IN V15
  const slug = params.slug; 
  return &lt;div&gt;{slug}&lt;/div&gt;;
}</pre>
                </div>
                <div class="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-900/20">
                     <h3 class="font-bold text-green-700 dark:text-green-400 mb-4">✅ The New Way (Next.js 15)</h3>
                     <pre class="text-xs font-mono text-gray-700 dark:text-gray-300">
// app/blog/[slug]/page.tsx
export default async function Page({ params }) {
  // Await the promise!
  const { slug } = await params;
  return &lt;div&gt;{slug}&lt;/div&gt;;
}</pre>
                </div>
            </div>
        </section>

        <!-- 03. Caching Architecture -->
        <section id="caching-architecture" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">03.</span>
                The Caching Architecture (Reset)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Next.js 15 flips the default. <strong>Fetch requests are no longer cached by default ("no-store").</strong>
                This eliminates the "Stale Data" confusion that plagued Next.js 14 developers.
            </p>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm text-gray-700 dark:text-gray-300 border-collapse">
                    <thead>
                        <tr class="border-b border-gray-200 dark:border-gray-700">
                            <th class="py-4 font-bold">API</th>
                            <th class="py-4 font-bold">Next.js 14</th>
                            <th class="py-4 font-bold text-blue-600 dark:text-blue-400">Next.js 15</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                        <tr>
                            <td class="py-4 font-mono">fetch('...')</td>
                            <td class="py-4"><span class="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-xs">force-cache</span></td>
                            <td class="py-4"><span class="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-xs font-bold text-blue-700 dark:text-blue-300">no-store</span> (Dynamic)</td>
                        </tr>
                        <tr>
                            <td class="py-4 font-mono">GET Route Handler</td>
                            <td class="py-4"><span class="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-xs">static</span></td>
                            <td class="py-4"><span class="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-xs font-bold text-blue-700 dark:text-blue-300">dynamic</span> (if headers used)</td>
                        </tr>
                        <tr>
                            <td class="py-4 font-mono">layout.tsx</td>
                            <td class="py-4">Static</td>
                            <td class="py-4">Static (unless dynamic children)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="mt-6 p-4 bg-gray-100 dark:bg-slate-900 rounded-lg">
                <h4 class="font-bold mb-2">How to Cache in v15?</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    fetch(url, { cache: 'force-cache' }) <br/>
                    // OR <br/>
                    import { unstable_cache } from 'next/cache';
                </p>
            </div>
        </section>

        <!-- 04. Server Actions -->
        <section id="server-actions" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">04.</span>
                Server Actions (RPC) & Validation
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Server Actions are not just for forms. They are typed API endpoints that you can call from <code>useEffect</code>, event handlers, or forms.
                Always validate arguments with Zod, because Server Actions <strong>are public API endpoints</strong> (yes, really).
            </p>
             <div class="bg-gray-900 p-8 rounded-xl relative group">
                 <div class="absolute top-0 right-0 px-4 py-2 bg-slate-800 text-xs font-mono text-gray-400 rounded-bl-xl border-l border-b border-gray-700">actions.ts</div>
                 <pre class="font-mono text-sm text-gray-300 overflow-x-auto">
<span class="text-purple-400">"use server"</span>;

<span class="text-purple-400">import</span> { z } <span class="text-purple-400">from</span> "zod";
<span class="text-purple-400">import</span> { revalidatePath } <span class="text-purple-400">from</span> "next/cache";

<span class="text-gray-500">// 1. Define Schema</span>
const schema = z.object({
  email: z.string().email(),
});

<span class="text-purple-400">export async function</span> <span class="text-blue-400">subscribe</span>(prevState: any, formData: FormData) {
  
  <span class="text-gray-500">// 2. Validate Input (CRITICAL SECURITY STEP)</span>
  const parse = schema.safeParse({ 
    email: formData.get("email") 
  });

  if (!parse.success) return { error: "Invalid Email" };

  <span class="text-gray-500">// 3. Mutate DB (Directly!)</span>
  await db.user.create({ data: parse.data });

  <span class="text-gray-500">// 4. Revalidate to update UI</span>
  revalidatePath("/");
  return { success: true };
}</pre>
            </div>
        </section>

        <!-- 05. Advanced Routing -->
        <section id="advanced-routing" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">05.</span>
                Advanced Routing Patterns
            </h2>
            <div class="space-y-8">
                 <div class="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                     <h3 class="text-lg font-bold mb-2 flex items-center gap-2">
                         <span class="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs uppercase">Parallel Routes</span>
                         <code>@slot</code>
                     </h3>
                     <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                         Render multiple pages in the same layout simultaneously. Great for Dashboards or Modals.
                         <br/>
                         Structure: <code>app/@analytics/page.tsx</code> and <code>app/@team/page.tsx</code> -> Layout receives <code>props.analytics</code> and <code>props.team</code>.
                     </p>
                 </div>
                 <div class="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                     <h3 class="text-lg font-bold mb-2 flex items-center gap-2">
                         <span class="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs uppercase">Intercepting Routes</span>
                         <code>(..)photo/[id]</code>
                     </h3>
                     <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                         Load a route within the current layout (like a modal) when navigating sequentially, but load the full page when refreshed or shared.
                     </p>
                 </div>
            </div>
        </section>

        <!-- 06. Streaming & Suspense -->
         <section id="streaming-suspense" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">06.</span>
                Streaming & Suspense
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                <code>loading.tsx</code> wraps your page in a Suspense boundary automatically. But "Granular Suspense" is better.
                Wrap individual components that fetch slow data in <code>&lt;Suspense&gt;</code> to prevent the whole page from blocking.
            </p>
        </section>

        <!-- 07. Middleware -->
         <section id="middleware-auth" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-orange-600 dark:text-orange-500">07.</span>
                Middleware & Auth
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                 Middleware runs on the Edge. It is fast but limited (no Node.js APIs usually).
                 Use it for: <strong>Path Rewrites, Redirects, and Basic Auth Checks (JWT)</strong>.
                 Do NOT fetch your database in Middleware (it's too slow for the edge).
            </p>
        </section>
        
        <!-- 08. Senior Takeaways -->
        <section id="senior-takeaways" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-green-600 dark:text-green-500">08.</span>
                Senior Takeaways
            </h2>
             <div class="bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                 <ul class="space-y-4">
                     <li class="flex items-start gap-3">
                         <span class="text-green-500 font-bold">✅ Use Composition:</span>
                         <span class="text-gray-600 dark:text-gray-400">Don't make your Root Layout a Client Component (\`use client\`). Push the "Client Boundary" down to the leaves (buttons, inputs).</span>
                     </li>
                      <li class="flex items-start gap-3">
                         <span class="text-green-500 font-bold">✅ URL as State:</span>
                         <span class="text-gray-600 dark:text-gray-400">Use \`searchParams\` for filter state instead of \`useState\`. This makes your app shareable and reload-proof.</span>
                     </li>
                      <li class="flex items-start gap-3">
                         <span class="text-green-500 font-bold">✅ Embrace the Server:</span>
                         <span class="text-gray-600 dark:text-gray-400">If it doesn't need interactivity (onClick, useEffect), it belongs on the Server.</span>
                     </li>
                 </ul>
            </div>
        </section>

        <!-- 09. Simulator -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">09.</span>
                Router Simulator
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Explore how the File System maps to the URL, and how Layouts persist while Pages swap.
            </p>
        </section>

    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';

// ==========================================
// 🌐 NEXT.JS 15 ROUTER ARCHITECTURE SIMULATOR
// ==========================================

export default function RouterSimulator() {
  const [url, setUrl] = useState('/dashboard');
  const [loading, setLoading] = useState(false);
  const [activeSegment, setActiveSegment] = useState('dashboard');
  
  // Simulation State
  const [rscPayload, setRscPayload] = useState(null);
  const [requestLog, setRequestLog] = useState([]);

  const addLog = (msg) => setRequestLog(p => [msg, ...p].slice(0, 5));

  const navigate = (path) => {
      if (path === url) return;
      setLoading(true);
      addLog(\`GET \${path}\`);
      
      // Simulate Network Delay & RSC Streaming
      setTimeout(() => {
          setUrl(path);
          setActiveSegment(path.split('/').pop() || 'home');
          setLoading(false);
          setRscPayload(\`RSC Payload for \${path} received (2kb)\`);
          addLog(\`✅ 200 OK \${path}\`);
      }, 600);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0f1115] p-6 lg:p-10 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl font-sans min-h-[800px] flex flex-col">
       
        {/* Browser Header */}
        <div className="bg-white dark:bg-[#1a1c20] p-4 rounded-t-2xl border-b border-gray-200 dark:border-white/5 flex items-center gap-4 shadow-sm">
             <div className="flex gap-1.5 opacity-50">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
             <div className="flex-1 bg-gray-100 dark:bg-black/50 rounded-lg px-4 py-2 flex items-center justify-between font-mono text-sm text-gray-500 overflow-hidden">
                 <div className="flex items-center gap-2">
                     <span className="text-green-500">🔒</span>
                     <span>localhost:3000<span className="text-gray-900 dark:text-white font-bold">{url}</span></span>
                 </div>
                 {loading && <div className="flex items-center gap-2 text-blue-500 text-xs font-bold animate-pulse"><span>⏳</span> WRAPPING...</div>}
             </div>
             <button onClick={() => setRequestLog([])} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg text-gray-500"><span>📟</span></button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row border-x border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] rounded-b-2xl overflow-hidden">
            
            {/* LEFT: File System */}
            <div className="w-full md:w-72 bg-gray-50 dark:bg-[#111] border-r border-gray-200 dark:border-white/5 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-white/5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                         <span className="text-blue-500">📁</span> app/
                    </h4>
                </div>
                <div className="flex-1 p-3 space-y-1 overflow-y-auto font-mono text-xs">
                    <FileNode name="layout.tsx" type="layout" isActive={true} />
                    <FileNode name="page.tsx" type="page" isActive={url === '/'} onClick={() => navigate('/')} />
                    <FileNode name="loading.tsx" type="loading" />
                    
                    <FolderNode name="dashboard" isOpen={true}>
                        <FileNode name="layout.tsx" type="layout" isActive={url.includes('/dashboard')} />
                        <FileNode name="page.tsx" type="page" isActive={url === '/dashboard'} onClick={() => navigate('/dashboard')} />
                        <FolderNode name="settings" isOpen={true}>
                             <FileNode name="page.tsx" type="page" isActive={url === '/dashboard/settings'} onClick={() => navigate('/dashboard/settings')} />
                        </FolderNode>
                         <FolderNode name="[slug] (dynamic)" isOpen={true}>
                             <FileNode name="page.tsx" type="page" isActive={url === '/dashboard/123'} onClick={() => navigate('/dashboard/123')} />
                        </FolderNode>
                    </FolderNode>

                     <FolderNode name="(marketing)" isOpen={false} isGroup={true}>
                        <FileNode name="page.tsx" type="page" isActive={false} />
                    </FolderNode>
                </div>

                {/* Network Log */}
                <div className="h-40 bg-black text-green-400 font-mono text-[10px] p-4 overflow-y-auto border-t border-gray-200 dark:border-white/5">
                    <div className="text-gray-500 font-bold mb-2">SERVER LOGS</div>
                    {requestLog.map((l, i) => (
                        <div key={i} className="mb-1 opacity-80">> {l}</div>
                    ))}
                </div>
            </div>

            {/* RIGHT: Visual Render */}
            <div className="flex-1 relative bg-grid-slate-100 dark:bg-grid-white/5 flex flex-col">
                
                {/* 1. Root Layout (Persists) */}
                <div className="flex-1 p-8 flex flex-col">
                    <div className="border-2 border-dashed border-purple-500/30 p-1 rounded-xl flex-1 flex flex-col relative bg-white dark:bg-[#0f1115] shadow-xl transition-all duration-500">
                        <div className="absolute -top-3 left-4 px-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-[10px] font-bold rounded uppercase border border-purple-200 dark:border-purple-500/50 flex items-center gap-1 z-20">
                             <span>🖼️</span> Root Layout
                        </div>

                        {/* Nav (Part of Root Layout) */}
                        <div className="h-14 border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 mb-4">
                             <div className="h-4 w-24 bg-gray-200 dark:bg-white/10 rounded"></div>
                             <div className="flex gap-2">
                                 <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-white/5"></div>
                             </div>
                        </div>

                         {/* 2. Dashboard Layout (Optional) */}
                         <div className="flex-1 flex gap-6 px-6 pb-6 relative">
                             {url.includes('/dashboard') && (
                                 <div className="w-16 md:w-48 border-2 border-dashed border-blue-500/30 rounded-lg p-3 hidden md:block relative animate-in slide-in-from-left-4 duration-500">
                                      <div className="absolute -top-3 left-4 px-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-[10px] font-bold rounded uppercase border border-blue-200 dark:border-blue-500/50 z-20">
                                         Dash Layout
                                     </div>
                                     <div className="space-y-3 mt-4">
                                         <div className="h-2 w-12 bg-gray-200 dark:bg-white/10 rounded mb-4"></div>
                                         <div className="h-8 w-full bg-blue-50 dark:bg-blue-900/20 rounded"></div>
                                         <div className="h-8 w-full bg-gray-50 dark:bg-white/5 rounded"></div>
                                     </div>
                                 </div>
                             )}

                             {/* 3. Page Content */}
                             <div className="flex-1 border-2 border-green-500/30 rounded-lg p-6 relative bg-gray-50 dark:bg-black/20 overflow-hidden">
                                  <div className="absolute -top-3 right-4 px-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-[10px] font-bold rounded uppercase border border-green-200 dark:border-green-500/50 z-20 flex items-center gap-1">
                                      <span>📄</span> Page
                                 </div>
                                 
                                 {loading ? (
                                     <div className="flex items-center justify-center h-full flex-col gap-4">
                                         <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                         <div className="text-xs text-green-500 font-bold animate-pulse">Streaming HTML...</div>
                                     </div>
                                 ) : (
                                     <div className="animate-in fade-in zoom-in-95 duration-300 h-full">
                                         <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-4 capitalize">
                                             {url.split('/').pop() === '' ? 'Home' : url.split('/').pop()}
                                         </h1>
                                         {url.includes('123') && (
                                              <div className="mb-4 inline-block px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs font-mono rounded">
                                                  await params: {'{'} slug: '123' {'}'}
                                              </div>
                                         )}
                                         <div className="grid grid-cols-2 gap-4">
                                             <div className="h-32 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5"></div>
                                             <div className="h-32 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5"></div>
                                             <div className="col-span-2 h-24 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5"></div>
                                         </div>
                                     </div>
                                 )}
                             </div>
                         </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
  );
}

// Subcomponents for File Tree
const FileNode = ({ name, type, isActive, onClick }) => {
    let icon = <span>📄</span>;
    let color = "text-gray-500";
    if (type === 'layout') { icon = <span>🖼️</span>; color = "text-purple-500"; }
    if (type === 'page') { icon = <span>🌐</span>; color = "text-green-500"; }
    if (type === 'loading') { icon = <span>⏳</span>; color = "text-yellow-500"; }

    return (
        <div 
            onClick={onClick}
            className={\`flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer transition-all \${isActive ? 'bg-blue-50 dark:bg-blue-900/20 font-bold' : 'hover:bg-gray-100 dark:hover:bg-white/5'}\`}
        >
            <span className={color}>{icon}</span>
            <span className={\`\${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500'}\`}>{name}</span>
            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
        </div>
    )
}

const FolderNode = ({ name, isOpen, children, isGroup }) => (
    <div className="pl-2">
        <div className={\`flex items-center gap-1.5 py-1 text-[10px] font-bold uppercase tracking-wider mb-1 \${isGroup ? 'text-gray-400' : 'text-gray-600 dark:text-gray-300'}\`}>
             <span className={isGroup ? 'opacity-50' : 'text-blue-400'}>📁</span>
             {name}
        </div>
        <div className="border-l border-gray-200 dark:border-white/10 ml-1 pl-1 space-y-0.5">
            {children}
        </div>
    </div>
)
`};
