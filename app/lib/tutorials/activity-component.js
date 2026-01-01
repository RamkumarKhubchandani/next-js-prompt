export const activityComponent = {
  slug: "activity-component",
  title: "The <Activity /> Component: How to Build OS-Level Multitasking in React",
  description: "Imagine switching tabs without losing your scroll position or input state. React's new <Activity> component (formerly Offscreen) brings OS-level multitasking to the web.",
  thumbnail: "/images/tutorials/activity-component-thumb.png",
  tags: ["React 19", "Performance", "UX", "Concurrent React", "Architecture"],
  keywords: ["React Activity Component", "Offscreen", "React 19", "Multitasking", "Tab Switching", "KeepAlive", "State Preservation"],
  difficulty: "Advanced",
  readTime: "30 min read",
  author: "Andrew Clark (Inspired)",
  createdAt: new Date().toISOString(),
  toc: [
    { id: "intro", label: "01. The 'Lost State' Frustration" },
    { id: "meet-activity", label: "02. Meet <Activity />" },
    { id: "how-it-works", label: "03. How It Works: Deprioritization" },
    { id: "demo", label: "04. State Preservation Demo" },
    { id: "comparison", label: "05. vs. Conditional Rendering" },
    { id: "virality", label: "06. Share & Discuss" }
  ],
  content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
      
      <!-- 1. Intro -->
      <section id="intro" class="scroll-mt-32">
         <div class="border-l-8 border-cyan-500 bg-cyan-50 dark:bg-cyan-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                Why does the web have <span class="text-cyan-600">amnesia</span>?
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                You scroll down a Twitter feed. You click a profile. You click "Back". The feed reloads. You lose your spot. You scream. <br/>
                Native apps don't do this. React apps shouldn't either.
            </p>
         </div>

         <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
            <p>
                <strong>The Problem:</strong> In React, when you unmount a component (like when switching tabs), its state is destroyed. To keep it, you have to lift state up, use global stores, or hidden CSS tricks. It's tedious.
            </p>
            <p>
                <strong>The Solution:</strong> The <code>&lt;Activity&gt;</code> component (previously known as Offscreen) allows you to "deactivate" a part of the tree without unmounting it. It's like minimizing a window instead of closing it.
            </p>
         </div>
      </section>

      <!-- 2. Meet Activity -->
      <section id="meet-activity" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-cyan-600">02.</span>
            Meet &lt;Activity /&gt;
        </h2>
        
        <div class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-2xl my-6">
<pre><code>import { Activity } from 'react';

function App() {
  const [mode, setMode] = useState('feed');

  return (
    &lt;div&gt;
      {/* 
         Instead of {mode === 'feed' && <Feed />}, which destroys state,
         we use Activity to keep it alive in the background.
      */}
      &lt;Activity mode={mode === 'feed' ? 'visible' : 'hidden'}&gt;
         &lt;Feed /&gt; 
      &lt;/Activity&gt;

      &lt;Activity mode={mode === 'profile' ? 'visible' : 'hidden'}&gt;
         &lt;Profile /&gt;
      &lt;/Activity&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>
      </section>

      <!-- 3. How It Works -->
      <section id="how-it-works" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-cyan-600">03.</span>
            How It Works: Deprioritization
        </h2>
        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
             <p>
                 When an <code>Activity</code> is hidden:
             </p>
             <ul class="list-disc pl-6 space-y-2">
                 <li><strong>State is preserved:</strong> <code>useState</code>, <code>useReducer</code>, and DOM state (mostly) stick around.</li>
                 <li><strong>Rendering stops:</strong> It stops receiving updates. It goes dormant.</li>
                 <li><strong>Low Priority:</strong> React treats it as low priority. CPU cycles aren't wasted on it until it becomes visible again.</li>
             </ul>
             <p>
                 It's the mechanism that powers <strong>Concurrent Mode</strong>'s ability to "yield" to more important tasks.
             </p>
        </div>
      </section>

      <!-- 5. Comparison -->
      <section id="comparison" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-cyan-600">05.</span>
            Conditional vs. Hidden vs. Activity
        </h2>
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-gray-700">
                        <th class="p-4">Method</th>
                        <th class="p-4">State</th>
                        <th class="p-4">Performance</th>
                    </tr>
                </thead>
                <tbody class="text-gray-300">
                    <tr class="border-b border-gray-800 bg-red-900/10">
                        <td class="p-4 font-bold">Conditional <code>{show && <Comp/>}</code></td>
                        <td class="p-4 text-red-400">Destroyed (Unmount)</td>
                        <td class="p-4">Good (DOM removed)</td>
                    </tr>
                    <tr class="border-b border-gray-800 bg-yellow-900/10">
                        <td class="p-4 font-bold">CSS <code>display: none</code></td>
                        <td class="p-4 text-green-400">Preserved</td>
                        <td class="p-4 text-red-400">Bad (Still re-renders invisibly)</td>
                    </tr>
                    <tr class="bg-green-900/20">
                        <td class="p-4 font-bold text-cyan-400">&lt;Activity /&gt;</td>
                        <td class="p-4 text-green-400">Preserved</td>
                        <td class="p-4 text-green-400">Perfect (No re-renders while hidden)</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </section>

      <!-- 6. Virality -->
      <section id="virality" class="scroll-mt-32">
         <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-cyan-600">06.</span>
            Share the Knowledge
         </h2>

         <!-- Did You Know -->
         <div class="bg-cyan-600 text-white p-8 rounded-2xl mb-12 shadow-xl transform hover:scale-[1.01] transition-transform">
             <div class="flex items-start gap-4">
                 <span class="text-4xl">💡</span>
                 <div>
                     <h4 class="text-2xl font-bold mb-2 !text-white">Did You Know?</h4>
                     <p class="!text-white text-lg font-medium opacity-90">
                         The Activity component was originally named &lt;Offscreen&gt;, a term borrowed from browser engine terminology (like OffscreenCanvas), but was renamed to Activity to better reflect its "active/inactive" behavior.
                     </p>
                 </div>
             </div>
         </div>


      </section>
    </div>
  `,
  code: `import React, { useState, Activity } from 'react';

// 🧪 Simulated "Activity" Polyfill for React 18
// In React 19, this would be imported from 'react' directly
const MockActivity = ({ mode, children }) => {
  // Simple CSS toggle for demo purposes
  // Real <Activity> does much more under the hood!
  return (
    <div style={{ display: mode === 'visible' ? 'block' : 'none' }}>
      {children}
    </div>
  );
};

function Feed() {
  const [scroll, setScroll] = useState(0);
  return (
    <div className="p-4 bg-gray-800 rounded h-64 overflow-auto border border-gray-700"
         onScroll={(e) => setScroll(e.target.scrollTop)}>
      <h3 className="font-bold text-cyan-400 sticky top-0 bg-gray-800 pb-2">Your Feed</h3>
      <div className="text-xs text-gray-500 mb-2">Scroll Position: {Math.floor(scroll)}px</div>
      {Array.from({length: 20}).map((_, i) => (
        <div key={i} className="p-3 mb-2 bg-gray-700 rounded hover:bg-gray-600">
           Post #{i + 1}
        </div>
      ))}
    </div>
  );
}

function Profile() {
  const [name, setName] = useState('');
  return (
    <div className="p-4 bg-gray-800 rounded h-64 border border-gray-700">
      <h3 className="font-bold text-pink-400 mb-4">Edit Profile</h3>
      <input 
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Type your name..."
        className="w-full p-2 rounded bg-gray-900 border border-gray-600 text-white mb-4"
      />
      <p className="text-gray-400 text-sm">
        Switch tabs. I will remember what you typed!
      </p>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('feed');

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-900 border border-gray-700 rounded-xl min-h-[400px]">
      <div className="flex gap-2 mb-6 p-1 bg-black/40 rounded-lg">
        <button 
           onClick={() => setTab('feed')}
           className={\`flex-1 py-2 rounded-md font-bold transition-all \${tab === 'feed' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}\`}
        >
           Feed
        </button>
        <button 
           onClick={() => setTab('profile')}
           className={\`flex-1 py-2 rounded-md font-bold transition-all \${tab === 'profile' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}\`}
        >
           Profile
        </button>
      </div>

      <div className="relative">
         {/* 
            In React 19, we would use <Activity mode={...}> 
            Here we use our mock to simulate the UX.
         */}
         <MockActivity mode={tab === 'feed' ? 'visible' : 'hidden'}>
            <Feed />
         </MockActivity>

         <MockActivity mode={tab === 'profile' ? 'visible' : 'hidden'}>
            <Profile />
         </MockActivity>
      </div>
    </div>
  );
}`
};
