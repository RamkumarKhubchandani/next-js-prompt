export const masteringUseOptimistic = {
  slug: "mastering-useoptimistic",
  title: "Mastering useOptimistic: Creating 'Lag-Free' UX for Global Applications",
  description: "Users hate loading spinners. Optimistic UI is the mark of a high-quality app. Learn how to use React 19's useOptimistic hook to make your detailed interactions instantaneous.",
  thumbnail: "/images/tutorials/optimistic-thumb.png",
  tags: ["React 19", "UX", "useOptimistic", "Server Actions", "Forms"],
  keywords: ["useOptimistic", "Optimistic UI", "React 19", "Lag-Free", "Server Actions", "UX Pattern"],
  difficulty: "Intermediate",
  readTime: "25 min read",
  author: "Josh W. Comeau (Inspired)",
  createdAt: new Date().toISOString(),
  toc: [
    { id: "intro", label: "01. The Perception of Speed" },
    { id: "the-hook", label: "02. Understanding useOptimistic" },
    { id: "implementation", label: "03. Implementing a 'Like' Button" },
    { id: "rollbacks", label: "04. Handling Errors (The Rollback)" },
    { id: "virality", label: "05. Share & Discuss" }
  ],
  content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
      
      <!-- 1. Intro -->
      <section id="intro" class="scroll-mt-32">
         <div class="border-l-8 border-green-500 bg-green-50 dark:bg-green-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                Click. <span class="text-green-600">Done.</span> (Then Network)
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                When you like a tweet, does it wait for the server? No. The heart turns red instantly. <br/>
                If your app shows a spinner for a boolean toggle, you are failing your users. React 19 gives us a primitive to fix this.
            </p>
         </div>

         <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
            <p>
                <strong>The Old Way:</strong> You have local state <code>isLiked</code>. When clicked, you set it to true. Then you fire the API. If it fails, you set it back to false. Managing three states (true, false, loading) manually is pain.
            </p>
            <p>
                <strong>The New Way:</strong> <code>useOptimistic</code> lets you declare what the UI <em>should</em> look like while an async action is pending. It handles the switch, the display, and the rollback automatically.
            </p>
         </div>
      </section>

      <!-- 2. The Hook -->
      <section id="the-hook" class="scroll-mt-32">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-green-600">02.</span>
            Understanding useOptimistic
        </h2>
        
        <div class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-2xl my-6">
<pre><code>const [optimisticState, addOptimistic] = useOptimistic(
  state, // Source of Truth (Server Data)
  // Reducer: How to merge optimistic updates
  (currentState, optimisticValue) => {
     return [...currentState, optimisticValue];
  }
);</code></pre>
        </div>
        
        <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
             <p>
                 It takes two main arguments: the current <strong>real state</strong> (usually from props/server) and a <strong>reducer</strong> function.
             </p>
             <p>
                 When you call <code>addOptimistic</code>, React immediately re-renders with the result of your reducer. Once the async action finishes (and the new real state arrives via props), React automatically discards the optimistic state and uses the real one.
             </p>
        </div>
      </section>

      <!-- 6. Virality -->
      <section id="virality" class="scroll-mt-32">
         <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
            <span class="text-green-600">05.</span>
            Share the Knowledge
         </h2>

         <!-- Did You Know -->
         <div class="bg-green-600 text-white p-8 rounded-2xl mb-12 shadow-xl transform hover:scale-[1.01] transition-transform">
             <div class="flex items-start gap-4">
                 <span class="text-4xl">🚀</span>
                 <div>
                     <h4 class="text-2xl font-bold mb-2 !text-white">Did You Know?</h4>
                     <p class="!text-white text-lg font-medium opacity-90">
                         Instagram was one of the first apps to popularize "Optimistic UI" at scale. They upload photos in the background while showing them in your feed immediately, making the app feel "impossibly fast."
                     </p>
                 </div>
             </div>
         </div>


      </section>
    </div>
  `,
  code: `import React, { useOptimistic, useState, useRef } from 'react';

// 🧪 Message Component
export default function ChatOptimistic() {
  const [messages, setMessages] = useState([
     { id: 1, text: 'Hello!', sending: false },
     { id: 2, text: 'How are you?', sending: false }
  ]);
  
  // 1. Setup Optimistic State
  // When we add a message optimistically, we flag it sending: true
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
       ...state,
       { ...newMessage, sending: true, id: Math.random() } 
    ]
  );

  async function sendMessage(formData) {
    const text = formData.get('message');
    
    // 2. Trigger Optimistic Update immediately
    addOptimisticMessage({ text });
    
    // 3. Simulate Server Action Delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 4. Update Real State (Server Response)
    setMessages(prev => [...prev, { id: Date.now(), text, sending: false }]);
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-[500px] border border-gray-800 rounded-xl flex flex-col font-sans">
      <h2 className="text-2xl font-bold mb-6 text-green-400">Live Chat (Optimistic)</h2>
      
      <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
         {optimisticMessages.map((msg, i) => (
             <div 
               key={i} 
               className={\`p-3 rounded-lg max-w-[80%] \${
                 msg.sending 
                   ? 'bg-green-900/30 border border-green-500/50 text-green-200 ml-auto opacity-70 italic' 
                   : 'bg-gray-800 text-white ml-auto'
               }\`}
             >
                {msg.text}
                {msg.sending && <span className="ml-2 text-xs"> (Sending...)</span>}
             </div>
         ))}
      </div>

      <form action={sendMessage} className="flex gap-2 border-t border-gray-800 pt-4">
         <input 
            name="message" 
            placeholder="Type a message..."
            className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-green-500"
            required
            autoComplete="off"
            // Reset form hack for demo
            ref={e => e && e.form.reset}
         />
         <button className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 rounded-lg transition-colors">
            Send
         </button>
      </form>
      
      <p className="mt-4 text-xs text-gray-500 text-center">
         Note: When you hit Send, the message appears INSTANTLY. The "Sending..." label simulates waiting for server confirmation (1.5s delay).
      </p>
    </div>
  );
}`
};
