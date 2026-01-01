export const reactMicroFrontends = {
    slug: "react-micro-frontends",
    title: "The Rise of Micro-Frontends with Module Federation 2.0 and React",
    description: "Monoliths are dying. Learn how to architect enterprise-scale React applications using Module Federation 2.0. Share components across versions, deploy independently, and scale infinitely.",
    thumbnail: "/images/tutorials/micro-frontends-thumb.png",
    tags: ["Architecture", "Micro-Frontends", "Module Federation", "Webpack", "Vite"],
    keywords: ["Micro-Frontends", "Module Federation", "React Architecture", "Monorepo", "Enterprise React", "Vite Federation"],
    difficulty: "Expert",
    readTime: "35 min read",
    author: "Zack Jackson (Inspired)",
    createdAt: new Date().toISOString(),
    toc: [
        { id: "intro", label: "01. The Monolith Problem" },
        { id: "what-is-mf", label: "02. What is Module Federation?" },
        { id: "architecture", label: "03. The Architecture" },
        { id: "implementation", label: "04. Implementation Guide" },
        { id: "virality", label: "05. Share & Discuss" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
      
      <!-- 1. Intro -->
      <section id="intro" class="scroll-mt-32">
         <div class="border-l-8 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                Your team is too big for <br/><span class="text-indigo-600">one repo.</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                Google, Amazon, and Netflix didn't scale by building bigger monolithic apps. They scaled by breaking them apart. <br/>
                Micro-Frontends bring the "Microservices" revolution to the browser, allowing independent teams to deploy independent features to a single unified app.
            </p>
         </div>

         <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
            <p>
                <strong>The Problem:</strong> You change a button color in the checkout flow. You have to rebuild the entire application, run 4000 unit tests, and coordinate a release window with the "Search" team. This is "Deployment Hell".
            </p>
            <p>
                <strong>The Solution:</strong> Module Federation 2.0 allows you to import code from another build <em>at runtime</em>. Team Checkout deploys their JS bundle. Team Search deploys theirs. The user's browser stitches them together instantly.
            </p>
         </div>
      </section>

      <!-- 2. What is MF -->
      <section id="what-is-mf" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-indigo-600">02.</span>
            What is Module Federation?
        </h2>
        
        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p>
                It is a JavaScript architecture invented by Zack Jackson. Unlike simple npm packages (which happen at build time), Module Federation happens at <strong>runtime</strong>.
            </p>
            <p>
                It allows a JavaScript application to dynamically load code from another application—on a different URL. It handles shared dependencies (like React) automatically, ensuring you don't download React twice.
            </p>
        </div>

        <div class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-2xl my-6">
<pre><code>// Host App (Shell)
import React, { Suspense } from 'react';

// This import is loaded over the network at runtime!
const RemoteHeader = React.lazy(() => import('checkout/Header'));

export default function App() {
  return (
    &lt;div&gt;
      &lt;Suspense fallback="Loading Header..."&gt;
        &lt;RemoteHeader /&gt;
      &lt;/Suspense&gt;
      &lt;h1&gt;Welcome to the Super App&lt;/h1&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>
      </section>

      <!-- 6. Virality -->
      <section id="virality" class="scroll-mt-32">
         <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-indigo-600">05.</span>
            Share the Knowledge
         </h2>

         <!-- Did You Know -->
         <div class="bg-indigo-600 text-white p-8 rounded-2xl mb-12 shadow-xl transform hover:scale-[1.01] transition-transform">
             <div class="flex items-start gap-4">
                 <span class="text-4xl">🌍</span>
                 <div>
                     <h4 class="text-2xl font-bold mb-2 !text-white">Did You Know?</h4>
                     <p class="!text-white text-lg font-medium opacity-90">
                         Module Federation effectively makes the internet one giant JavaScript application. Any builds can consume any other build, anywhere, instantly.
                     </p>
                 </div>
             </div>
         </div>


      </section>
    </div>
  `,
    code: `import React, { useState } from 'react';

// 🏗️ Architecture Simulator
export default function MFEArchitecture() {
  const [apps, setApps] = useState([
     { name: 'Host App', type: 'shell', status: 'online' },
     { name: 'Checkout MFE', type: 'remote', status: 'online' },
     { name: 'Profile MFE', type: 'remote', status: 'offline' }
  ]);

  const toggleStatus = (index) => {
    setApps(prev => prev.map((app, i) => 
        i === index ? { ...app, status: app.status === 'online' ? 'offline' : 'online' } : app
    ));
  };

  return (
    <div className="bg-[#0f172a] text-white p-6 rounded-xl border border-indigo-900 min-h-[500px] font-sans">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">Micro-Frontend Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {apps.map((app, i) => (
             <div key={i} className={\`p-4 rounded-xl border-2 transition-all \${app.status === 'online' ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'}\`}>
                 <div className="flex justify-between items-start mb-4">
                     <span className="text-xs font-bold uppercase tracking-wider opacity-50">{app.type}</span>
                     <div className={\`w-3 h-3 rounded-full \${app.status === 'online' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500'}\`}></div>
                 </div>
                 <h3 className="text-xl font-bold mb-4">{app.name}</h3>
                 <button 
                    onClick={() => toggleStatus(i)}
                    className="text-xs bg-black/30 hover:bg-black/50 px-3 py-1 rounded transition-colors"
                 >
                    {app.status === 'online' ? 'Simulate Crash' : 'Deploy Fix'}
                 </button>
             </div>
          ))}
      </div>

      {/* The Unified View */}
      <div className="border border-gray-700 rounded-xl overflow-hidden bg-white text-black min-h-[300px] relative">
          <div className="bg-gray-100 p-2 border-b border-gray-300 flex items-center gap-2">
              <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="bg-white flex-1 px-2 rounded text-xs py-1 text-center text-gray-500">
                  https://super-app.com
              </div>
          </div>

          <div className="p-4 grid grid-cols-4 gap-4">
               {/* Header (Depends on Host) */}
               <div className="col-span-4 h-16 bg-blue-600 rounded flex items-center px-4 text-white font-bold opacity-50">
                   Host Header
               </div>

               {/* Checkout (Remote) */}
               <div className="col-span-3 bg-gray-50 border-2 border-dashed border-green-500 p-4 rounded min-h-[200px] flex items-center justify-center relative">
                   <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">Checkout MFE</span>
                   {apps[1].status === 'online' ? (
                       <div className="text-green-600 font-bold">🛒 Checkout Flow Loaded</div>
                   ) : (
                       <div className="text-red-500 font-bold flex flex-col items-center">
                           <span>⚠️ Remote Failed</span>
                           <span className="text-xs text-gray-400 font-normal mt-2">Fallback UI Rendered</span>
                       </div>
                   )}
               </div>

               {/* Profile (Remote) */}
               <div className="col-span-1 bg-gray-50 border-2 border-dashed border-purple-500 p-4 rounded min-h-[200px] flex items-center justify-center relative">
                   <span className="absolute top-2 right-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-bold">Profile MFE</span>
                   {apps[2].status === 'online' ? (
                       <div className="text-purple-600 font-bold">👤 User</div>
                   ) : (
                       <div className="text-gray-400 text-xs text-center">
                           Widget Unavailable
                       </div>
                   )}
               </div>
          </div>
      </div>
    </div>
  );
}`
};
