export const reactQueryMasterclass = {
    title: "React Query: Server State Solved 🛡️",
    description: "It's not just a data fetching library. It's an async state manager. Master caching, optimistic updates, and infinite scrolling to build rock-solid apps.",
    slug: "react-query-masterclass",
    type: "static",
    author: "Tanner Linsley",
    createdAt: new Date().toISOString(),
    readTime: "30 min read",
    difficulty: "Advanced",
    tags: ["React", "Data Fetching", "Caching", "UX", "State Management"],
    keywords: ["Optimistic UI", "Infinite Query", "Stale Time", "Invalidation", "Mutations", "TanStack Query"],
    toc: [
        { id: "server-vs-client", label: "01. Server vs Client State" },
        { id: "stale-time", label: "02. Stale Time vs Cache Time" },
        { id: "optimistic-updates", label: "03. Optimistic Updates" },
        { id: "infinite-queries", label: "04. Infinite Queries" },
        { id: "virality", label: "05. Share & Takeaways" },
        { id: "interactive-demo", label: "06. Fetch Visualizer" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 1. The Hook -->
        <section id="server-vs-client" class="scroll-mt-32">
             <div class="border-l-4 border-red-500 pl-6 py-2 mb-8">
                <p class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                    "Using useEffect for data fetching is the most common self-inflicted wound in React development. Stop it."
                </p>
             </div>
             <p class="text-xl md:text-2xl leading-relaxed font-light">
                Fetching data is easy. 
                Handling loading states, error states, caching, deduping, revalidation, focus-refetching, and pagination is hard.
                <br/><br/>
                React Query removes the need for <code>useEffect</code> entirely.
                <br/>
                <strong>Server State</strong> (remote, shared, async) is different from <strong>Client State</strong> (local, synchronous). Treat them differently.
            </p>
        </section>

        <!-- 2. Stale Time -->
        <section id="stale-time" class="scroll-mt-32">
            <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-red-600 dark:text-red-500">02.</span>
                Stale Time vs Cache Time
            </h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                This confuses 99% of developers. Here is the definitive explanation.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                 <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-900/30">
                     <h4 class="font-bold text-red-800 dark:text-red-200 mb-2">⏱️ Stale Time</h4>
                     <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">
                         "How long until I consider this data 'old' and should refetch?" 
                         <br/>
                         <strong>Default:</strong> 0 (Immediately refetch on mount).
                     </p>
                 </div>
                 <div class="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-200 dark:border-purple-900/30">
                     <h4 class="font-bold text-purple-800 dark:text-purple-200 mb-2">🗑️ Cache Time</h4>
                     <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">
                         "How long until I delete the data from memory entirely?" 
                         <br/>
                         <strong>Default:</strong> 5 minutes.
                     </p>
                 </div>
            </div>
            <p class="text-base text-gray-600 dark:text-gray-400">
                If <code>staleTime</code> is 5 minutes, React Query won't refetch even if you mount the component 100 times. It serves from cache instantly.
            </p>
        </section>

        <!-- 3. Optimistic Updates -->
        <section id="optimistic-updates" class="scroll-mt-32">
            <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-red-600 dark:text-red-500">03.</span>
                Optimistic Updates (The Magic)
            </h3>
             <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p class="text-lg leading-relaxed">
                    Update the UI <strong>immediately</strong> when the user clicks. Don't wait for the server. 
                    If it fails, rollback. This makes your app feel instant, like a native iOS app.
                </p>
            </div>
             <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800 my-6"><code>const mutation = useMutation({
  mutationFn: newTodo => axios.post('/todos', newTodo),
  // When mutate is called:
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries(['todos'])
    const previousTodos = queryClient.getQueryData(['todos'])
    // Optimistically update to the new value
    queryClient.setQueryData(['todos'], old => [...old, newTodo])
    return { previousTodos }
  },
  onError: (err, newTodo, context) => {
    // Rollback ONLY if error
    queryClient.setQueryData(['todos'], context.previousTodos)
  },
})</code></pre>
        </section>

        <!-- 4. Infinite Queries -->
        <section id="infinite-queries" class="scroll-mt-32">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-red-600 dark:text-red-500">04.</span>
                Infinite Queries
            </h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Pagination is boring. Infinite scroll is where it's at.
                <code>useInfiniteQuery</code> handles the complexity of \`nextPageParam\`, merging pages, and bidirectional fetching for you.
            </p>
        </section>

        <!-- 5. Shares -->
        <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                05. Share the Knowledge
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
                        "If you are putting API data into Redux/Context, you are doing it wrong. That's Server State. Use React Query and delete 50% of your code. #ReactJS #WebDev"
                     </p>
                     <div class="text-xs font-bold text-blue-500 uppercase tracking-wide">Twitter / X</div>
                </div>
            </div>
             <div class="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
                <h4 class="font-bold text-lg mb-2 text-red-900 dark:text-red-200">The Takeaway</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    Your app feels faster not because the server is faster, but because you are lying to the user (Optimistically). And that's okay.
                </p>
            </div>
        </section>

        <!-- Interactive Demo Section -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-red-600 dark:text-red-500">06.</span>
                Fetch Visualizer
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Simulate network latency and see how optimistic updates trick the user into thinking the app is instant.
            </p>
 
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <!-- Concept -->
                  <div class="space-y-4">
                      <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <span class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Concept</span>
                          Optimistic UI Mode
                      </h3>
                      <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          Toggle "Optimistic Mode" inside the demo. When ON, the list updates instantly. When OFF, it waits for the "Server" (1.5s delay).
                      </p>
                  </div>
             </div>
        </section>

    </div>
    `,
    code: `import React, { useState } from 'react';

// ----------------------------------------------------
// 🔴 REACT QUERY SIMULATOR
// ----------------------------------------------------

export default function QuerySimulator() {
  const [todos, setTodos] = useState([{ id: 1, text: 'Master React Query' }]);
  const [optimistic, setOptimistic] = useState(false);
  const [input, setInput] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleAdd = () => {
      if(!input) return;
      const newTodo = { id: Date.now(), text: input };
      setInput('');

      if(optimistic) {
          // 1. Optimistic Update (Immediate)
          setTodos(prev => [...prev, { ...newTodo, optimistic: true }]);
          
          // 2. Simulate Network Request
          setIsPending(true);
          setTimeout(() => {
              // 3. Server Confirms (Remove optimistic flag)
               setTodos(prev => prev.map(t => t.id === newTodo.id ? { ...t, optimistic: false } : t));
               setIsPending(false);
          }, 1500);
      } else {
          // 1. Standard Way (Wait for server)
          setIsPending(true);
          setTimeout(() => {
              setTodos(prev => [...prev, newTodo]);
              setIsPending(false);
          }, 1500);
      }
  };

  return (
    <div className="bg-white dark:bg-[#111] text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl p-8 flex flex-col md:flex-row gap-8 h-[500px]">
      
      {/* Controls */}
      <div className="w-full md:w-1/3 space-y-6">
          <div className="space-y-4">
               <h3 className="text-xl font-bold">1. Config</h3>
               <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                   <span className="font-bold text-sm">Optimistic Mode</span>
                   <button 
                     onClick={() => setOptimistic(!optimistic)}
                     className={\`w-12 h-6 rounded-full p-1 transition-colors \${optimistic ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}\`}
                   >
                       <div className={\`w-4 h-4 rounded-full bg-white shadow-sm transition-transform \${optimistic ? 'translate-x-6' : 'translate-x-0'}\`}></div>
                   </button>
               </div>
          </div>

          <div className="space-y-4">
               <h3 className="text-xl font-bold">2. Mutation</h3>
               <div className="flex gap-2">
                   <input 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     className="flex-1 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 ring-red-500 outline-none"
                     placeholder="New Todo..."
                   />
                   <button 
                     onClick={handleAdd}
                     className="bg-red-500 text-white px-4 rounded-lg font-bold hover:bg-red-600 transition-colors"
                   >
                       Add
                   </button>
               </div>
          </div>
      </div>

      {/* Visualization */}
      <div className="flex-1 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 relative overflow-hidden">
           <div className="text-xs text-gray-400 font-bold uppercase mb-4 tracking-widest">Server State</div>
           
           <div className="space-y-2">
               {todos.map(todo => (
                   <div 
                     key={todo.id} 
                     className={\`p-4 rounded-xl flex justify-between items-center transition-all bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 \${todo.optimistic ? 'opacity-50 ring-2 ring-red-500/50 grayscale' : ''}\`}
                   >
                       <span className="font-medium">{todo.text}</span>
                       {todo.optimistic && <span className="text-[10px] font-bold text-red-500 bg-red-100 dark:bg-red-900/40 px-2 py-0.5 rounded">SAVING...</span>}
                   </div>
               ))}
               
               {!optimistic && isPending && (
                   <div className="p-4 rounded-xl flex justify-center items-center bg-gray-100 dark:bg-gray-800 animate-pulse text-gray-400 font-mono text-sm">
                       Waiting for Server...
                   </div>
               )}
           </div>

           {/* Server Status */}
           <div className="absolute top-6 right-6">
                {isPending ? (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded border border-yellow-200 dark:border-yellow-900/50">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                        NETWORK REQ...
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded border border-green-200 dark:border-green-900/50">
                         <span className="w-2 h-2 rounded-full bg-green-500"></span>
                         IDLE
                    </div>
                )}
           </div>
      </div>

    </div>
  );
}
`
}
