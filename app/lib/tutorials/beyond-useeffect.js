export const beyondUseEffect = {
  slug: "beyond-useeffect",
  title: "Beyond useEffect: Solving the 'Dependency Hell' with useEffectEvent",
  description: "Every React developer has struggled with dependency arrays. Discover the 'Holy Grail' hook that finally separates reactive code from non-reactive logic. No more lying to the linter.",
  thumbnail: "/images/tutorials/beyond-useeffect-thumb.png",
  tags: ["React 19", "Hooks", "useEffectEvent", "Architecture", "Best Practices"],
  keywords: ["useEffectEvent", "React Dependency Hell", "useEffect", "React 19", "Hooks Pattern", "Event Handlers"],
  difficulty: "Intermediate",
  readTime: "25 min read",
  author: "Dan Abramov (Inspired)",
  createdAt: new Date().toISOString(),
  toc: [
    { id: "intro", label: "01. The 'Dependency Hell' Problem" },
    { id: "solution", label: "02. Meet useEffectEvent" },
    { id: "deep-dive", label: "03. Logic vs. Reactivity" },
    { id: "real-world-analytics", label: "04. Real World: Analytics Logging" },
    { id: "real-world-sockets", label: "05. Real World: WebSockets" },
    { id: "best-practices", label: "06. Best Practices & Pitfalls" },
    { id: "virality", label: "07. Share & Discuss" }
  ],
  content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
      
      <!-- 1. Intro -->
      <section id="intro" class="scroll-mt-32">
         <div class="border-l-8 border-pink-500 bg-pink-50 dark:bg-pink-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                You've been lying to your <code class="text-pink-600">dependency array</code>. And it's time to stop.
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                We've all done it. You need to read a value inside <code>useEffect</code>, but you don't want the effect to re-run when that value changes. So you omit it. You suppress the lint warning. You feel dirty. <br/>
                <span class="font-bold text-pink-600">useEffectEvent</span> is the confession booth that absolves you of these sins.
            </p>
         </div>

         <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
            <p>
                <strong>The Problem:</strong> React's reactivity model is "all or nothing". If you use a variable, it's a dependency. If it changes, the effect runs. But often, we want to <em>read</em> state without <em>reacting</em> to it.
            </p>
            <p>
                Imagine a chat app. You want to show a notification when a message arrives. You need the current theme color to style the notification. <br/>
                If you add <code>theme</code> to the dependencies, the effect runs every time the user toggles Dark Mode, showing the notification again. That's a bug. <br/>
                If you remove <code>theme</code>, the linter yells at you, and you risk stale closures.
            </p>
         </div>
      </section>

      <!-- 2. Solution -->
      <section id="solution" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-pink-600">02.</span>
            Meet useEffectEvent
        </h2>
        
        <div class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-2xl my-6">
<pre><code>// The Old Way (Buggy or Hacky)
useEffect(() => {
  const connection = createConnection(roomId);
  connection.on('message', (msg) => {
    // 🔴 Re-runs connection if 'theme' changes!
    showNotification(msg, theme); 
  });
  connection.connect();
  return () => connection.disconnect();
}, [roomId, theme]); // 😖 We don't want 'theme' to restart the connection!

// The New Way (Clean & Correct)
const onMessage = useEffectEvent((msg) => {
  // ✅ Read latest 'theme' without becoming a dependency
  showNotification(msg, theme);
});

useEffect(() => {
  const connection = createConnection(roomId);
  connection.on('message', (msg) => {
    onMessage(msg);
  });
  connection.connect();
  return () => connection.disconnect();
}, [roomId]); // ✅ 'theme' is gone! No restarts.</code></pre>
        </div>
        
        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mt-6">
            <p>
                <code>useEffectEvent</code> creates a special function that is <strong>stable</strong> (it never changes identity, so you don't need to put it in dependencies) but always has access to the <strong>latest props and state</strong>.
            </p>
            <p>
                It essentially "extracts the non-reactive logic" out of your reactive Effect.
            </p>
        </div>
      </section>

      <!-- 3. Deep Dive -->
      <section id="deep-dive" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-pink-600">03.</span>
            Logic vs. Reactivity
        </h2>
        <div class="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl mb-8 border border-blue-200 dark:border-blue-900/30">
             <h3 class="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-4">The Mental Model Split</h3>
             <ul class="space-y-4 text-lg text-blue-800 dark:text-blue-300">
                <li class="flex items-start gap-3">
                    <span class="text-2xl">🔄</span>
                    <div>
                        <strong>Reactive Code (useEffect):</strong> "When <em>Room ID</em> changes, I must re-connect." <br/>
                        This code <em>must</em> run to keep the app synchronized with the world.
                    </div>
                </li>
                <li class="flex items-start gap-3">
                    <span class="text-2xl">🧠</span>
                    <div>
                        <strong>Non-Reactive Logic (useEffectEvent):</strong> "When a message arrives, I check the <em>Theme</em>." <br/>
                        This code only runs in response to an event, using whatever the state describes <em>at that moment</em>.
                    </div>
                </li>
             </ul>
        </div>
      </section>

      <!-- 4. Real World: Analytics -->
      <section id="real-world-analytics" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-pink-600">04.</span>
            Real World: Analytics Logging
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
            A classic scenario: You want to log "Page Visited" when the route changes. You also want to include the current \`user.id\` and \`cart.total\` in the log payload.
        </p>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6 font-bold text-red-500">
             If you put \`cart.total\` in the dependency array, you will log "Page Visited" every time the user adds an item to the cart!
        </p>

        <div class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm">
<pre><code>function PageLogger({ route, user, cart }) {
  // 1. Define the event handler with access to latest state
  const logVisit = useEffectEvent((currentRoute) => {
    analytics.logEvent('page_view', {
      route: currentRoute,
      userId: user.id,   // ⚡️ Access latest user
      cartVal: cart.total // ⚡️ Access latest cart
    });
  });

  // 2. Trigger it only when route changes
  useEffect(() => {
    logVisit(route);
  }, [route]); // ✅ Triggers ONLY on route change
}</code></pre>
        </div>
      </section>

      <!-- 6. Virality -->
      <section id="virality" class="scroll-mt-32">
         <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-pink-600">07.</span>
            Share the Knowledge
         </h2>

         <!-- Did You Know -->
         <div class="bg-pink-600 text-white p-8 rounded-2xl mb-12 shadow-xl transform hover:scale-[1.01] transition-transform">
             <div class="flex items-start gap-4">
                 <span class="text-4xl">💡</span>
                 <div>
                     <h4 class="text-2xl font-bold mb-2 !text-white">Did You Know?</h4>
                     <p class="!text-white text-lg font-medium opacity-90">
                         Before useEffectEvent, the "ref hack" (putting state in a useRef) was the only way to silence dependencies safely. useEffectEvent is essentially that pattern blessed by the React core team.
                     </p>
                 </div>
             </div>
         </div>


         
         <div class="mt-8 flex flex-wrap gap-2 justify-center">
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#React19</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#useEffectEvent</span>
             <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">#CleanCode</span>
         </div>
      </section>
    </div>
  `,
  code: `import React, { useState, useEffect, useEffectEvent } from 'react';

// 🧪 Simulation Helper
function createConnection(roomId) {
  return {
    connect: () => console.log('🟢 Connected to ' + roomId),
    disconnect: () => console.log('🔴 Disconnected from ' + roomId),
    on: (event, callback) => {
       // Simulate unexpected messages
       if(Math.random() > 0.5) setTimeout(() => callback("Hello from Server!"), 1000);
    }
  };
}

export default function ChatRoom() {
  const [roomId, setRoomId] = useState('general');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);

  // ✅ THE NEW HOOK
  // This function can read 'theme' but doesn't trigger effect re-runs
  const onNotification = useEffectEvent((msg) => {
    const newNote = {
      id: Date.now(),
      text: msg,
      color: theme === 'light' ? 'black' : 'white' // accessing reactive state!
    };
    setNotifications(prev => [...prev, newNote]);
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    
    connection.on('message', (msg) => {
      onNotification(msg);
    });

    return () => connection.disconnect();
  }, [roomId]); // ✅ 'theme' is NOT a dependency here!

  return (
    <div className={\`p-8 min-h-screen transition-colors \${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}\`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">useEffectEvent Demo</h1>
        <button 
           onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
           className="px-4 py-2 rounded bg-blue-500 text-white font-bold"
        >
           Toggle Theme ({theme})
        </button>
      </div>

      <div className="mb-8">
        <label className="mr-4 font-bold">Room:</label>
        <select 
          value={roomId} 
          onChange={e => setRoomId(e.target.value)}
          className="p-2 rounded text-black"
        >
           <option value="general">#general</option>
           <option value="random">#random</option>
           <option value="react">#react</option>
        </select>
      </div>

      <div className="border border-gray-400 p-4 rounded-lg min-h-[200px]">
         <h3 className="font-bold mb-4 opacity-50">Notifications Stream</h3>
         {notifications.map(n => (
            <div key={n.id} style={{ color: n.color }} className="mb-2 p-2 border-b border-gray-700/20">
               {n.text}
            </div>
         ))}
         {notifications.length === 0 && <span className="opacity-30">Waiting for messages...</span>}
      </div>
      
      <p className="mt-8 text-sm opacity-60 max-w-md">
        <strong>Try this:</strong> Toggle the theme. The component re-renders, but check your console. You won't see "Disconnected/Connected". The effect stays stable!
      </p>
    </div>
  );
}`
};
