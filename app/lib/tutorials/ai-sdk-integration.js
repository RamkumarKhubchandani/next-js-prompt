export const aiSdkIntegration = {
    title: "Vercel AI SDK: Text is Dead 🤖",
    description: "Don't just stream text. Stream React Components. Learn how to build 'Generative UI' where the LLM paints your interface with React Server Components.",
    slug: "ai-sdk-integration",
    type: "static",
    author: "Jared Palmer",
    createdAt: new Date().toISOString(),
    readTime: "30 min read",
    difficulty: "Advanced",
    tags: ["AI", "React", "Streaming", "RSC", "Generative UI"],
    keywords: ["Generative UI", "Stream Text", "Tool Calling", "RSC", "Vercel AI SDK", "useChat", "Structured Output"],
    toc: [
        { id: "generative-ui-concept", label: "01. What is Generative UI?" },
        { id: "streaming-rsc", label: "02. Streaming RSCs" },
        { id: "tool-calling", label: "03. Tool Calling (The Magic)" },
        { id: "structured-output", label: "04. Structured Outputs" },
        { id: "virality", label: "05. Share & Takeaways" },
        { id: "interactive-demo", label: "06. AI Chat Simulator" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 1. The Hook -->
        <section id="generative-ui-concept" class="scroll-mt-32">
             <div class="border-l-4 border-indigo-600 pl-6 py-2 mb-8">
                <p class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                    "Chatbots that reply with Markdown are so 2023. The future is Generative UI."
                </p>
             </div>
             <p class="text-xl md:text-2xl leading-relaxed font-light">
                Why return markdown text when you can return <strong>interactive React Components</strong>?
                <br/><br/>
                The <strong>Vercel AI SDK</strong> allows the LLM to call functions that return Server Components, which are then streamed to the client via a readable stream.
                <br/>
                We call this <strong>Generative UI</strong>. The AI doesn't just talk; it paints the screen.
            </p>
        </section>

        <!-- 2. Concept -->
        <section id="streaming-rsc" class="scroll-mt-32">
            <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-indigo-600 dark:text-indigo-500">02.</span>
                Generative UI
            </h3>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p class="text-lg leading-relaxed">
                    Standard AI: User asks "Stock price of AAPL". AI replies "It is $150".
                    <br/>
                    Generative UI: User asks "Stock price of AAPL". AI replies with a stream that hydrates into a <strong>&lt;StockChart ticker="AAPL" /&gt;</strong> component.
                </p>
            </div>
            
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                 <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl">
                     <h3 class="font-bold mb-2 text-xl">💬 Text Stream</h3>
                     <p class="text-base text-gray-500">"Sure, I can help with that. Here is the data..."</p>
                 </div>
                 <div class="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-200 dark:border-indigo-900/30">
                     <h3 class="font-bold mb-2 text-xl text-indigo-700 dark:text-indigo-300">⚛️ Component Stream</h3>
                     <code class="text-sm bg-indigo-100 dark:bg-indigo-900 px-1 rounded text-indigo-800 dark:text-indigo-200">&lt;Suspense&gt;&lt;FlightCard /&gt;&lt;/Suspense&gt;</code>
                 </div>
             </div>
        </section>

        <!-- 3. Tool Calling -->
        <section id="tool-calling" class="scroll-mt-32">
            <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-indigo-600 dark:text-indigo-500">03.</span>
                Tool Calling (The Magic)
            </h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                The secret sauce is <strong>Tool Calling</strong>. You define tools (functions) that the AI can "call".
                Next.js intercepts these calls on the server and renders the corresponding component.
            </p>
             <pre class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-sm md:text-base font-mono text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-slate-800 my-6"><code>// Server Action (actions.tsx)
export async function submitUserMessage(input: string) {
  const ui = await render({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: input }],
    tools: {
      get_weather: {
        description: 'Get the weather',
        parameters: z.object({ location: z.string() }),
        render: async function* ({ location }) {
          yield &lt;Spinner /&gt; // 1. Show loading state
          const weather = await fetchWeather(location)
          return &lt;WeatherCard data={weather} /&gt; // 2. Stream final UI
        }
      }
    }
  })
  return { ui }
}</code></pre>
        </section>

         <!-- 4. Structured Output -->
        <section id="structured-output" class="scroll-mt-32">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-indigo-600 dark:text-indigo-500">04.</span>
                Structured Outputs (JSON)
            </h3>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Sometimes you don't need UI; you need data. The SDK ensures strict JSON output using Zod schemas.
                No more "I'm sorry but as an AI..." prefixes ruining your \`JSON.parse()\`.
            </p>
            <div class="bg-gray-950 p-6 rounded-xl font-mono text-sm text-gray-300">
                <div class="mb-4 text-green-400">// generateObject</div>
                const { object } = await generateObject({ <br/>
                &nbsp;&nbsp;model: openai('gpt-4-json'), <br/>
                &nbsp;&nbsp;schema: z.object({ <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;recipe: z.object({ <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: z.string(), <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ingredients: z.array(z.string()) <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;}) <br/>
                &nbsp;&nbsp;}), <br/>
                &nbsp;&nbsp;prompt: 'Generate a lasagna recipe' <br/>
                }) <br/>
                <br/>
                // Result is fully typed: <br/>
                console.log(object.recipe.name); // 'Classic Lasagna'
            </div>
        </section>

        <!-- 5. Shares -->
        <section id="virality" class="scroll-mt-32 pt-12 border-t border-gray-200 dark:border-gray-800">
             <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                05. Share the Future
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                     <p class="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
                        "Text is the bottleneck of AI. The future is Generative UI. Let the LLM build your interface on the fly with Vercel AI SDK. #AI #React #Nextjs"
                     </p>
                     <div class="text-xs font-bold text-blue-500 uppercase tracking-wide">Twitter / X</div>
                </div>
            </div>
             <div class="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-center">
                <h4 class="font-bold text-lg mb-2 text-indigo-900 dark:text-indigo-200">The Takeaway</h4>
                <p class="text-gray-600 dark:text-gray-400">
                    The interface is no longer static. It is fluid. It is generated <strong>for you, right now</strong>.
                </p>
            </div>
        </section>

        <!-- Interactive Demo Section -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span class="text-indigo-600 dark:text-indigo-500">06.</span>
                AI Chat Simulator
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Type "Show me AAPL stock" to see the AI generate a UI component instead of text.
            </p>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <!-- Concept -->
                  <div class="space-y-4">
                      <h3 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <span class="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded text-sm uppercase tracking-wide">Concept</span>
                          Component Streaming
                      </h3>
                      <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          The simulator below mocks the server response delay. Notice the "IsTyping" indicator vs the final UI render.
                      </p>
                  </div>
             </div>
        </section>

    </div>
    `,
    code: `import React, { useState } from 'react';

// ----------------------------------------------------
// 🤖 GENERATIVE UI SIMULATOR
// ----------------------------------------------------

export default function GenerativeChat() {
  const [messages, setMessages] = useState([
      { id: 1, role: 'assistant', content: 'Hello! I can render UI. Ask me for a stock price or flight info.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!input) return;
    
    // Optimistic Update
    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Logic & Tool Calling
    setTimeout(() => {
        setIsTyping(false);
        let aiMsg;

        if (userMsg.content.toLowerCase().includes('stock')) {
             aiMsg = { 
                 id: Date.now() + 1, 
                 role: 'assistant', 
                 component: <StockCard /> // 👈 Generative UI
             };
        } else if (userMsg.content.toLowerCase().includes('flight')) {
             aiMsg = { 
                 id: Date.now() + 1, 
                 role: 'assistant', 
                 component: <FlightCard /> // 👈 Generative UI
             };
        } else {
             aiMsg = { 
                 id: Date.now() + 1, 
                 role: 'assistant', 
                 content: "I didn't catch that. Try asking for 'stock' or 'flight' to trigger the component generator." 
             };
        }
        setMessages(prev => [...prev, aiMsg]);

    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-[#111] text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-black/50">
           {messages.map(m => (
               <div key={m.id} className={\`flex \${m.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
                   
                   {m.role === 'assistant' ? (
                       <div className="max-w-[80%]">
                           <div className="text-xs font-bold text-indigo-500 mb-1">AI</div>
                           {m.component ? (
                               // RENDER GENERATIVE UI
                               <div className="animate-in zoom-in-95 duration-500">
                                   {m.component}
                               </div>
                           ) : (
                               <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm border border-gray-100 dark:border-gray-700">
                                   {m.content}
                               </div>
                           )}
                       </div>
                   ) : (
                       <div className="max-w-[80%]">
                           <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-md">
                               {m.content}
                           </div>
                       </div>
                   )}
               </div>
           ))}
           
           {isTyping && (
               <div className="flex justify-start">
                   <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                       <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                       <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                       <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                   </div>
               </div>
           )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-[#111] border-t border-gray-200 dark:border-gray-800 flex gap-2">
          <input 
             className="flex-1 bg-gray-100 dark:bg-zinc-900 border-0 rounded-xl px-4 py-3 focus:ring-2 ring-indigo-500 outline-none"
             placeholder="Ask for stock or flight info..."
             value={input}
             onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
      </form>
    </div>
  );
}

// --- DUMMY GENERATIVE COMPONENTS ---

function StockCard() {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg w-64">
             <div className="flex justify-between items-start mb-4">
                 <div>
                     <h3 className="font-bold text-lg">AAPL</h3>
                     <p className="text-gray-500 text-xs">Apple Inc.</p>
                 </div>
                 <div className="text-green-500 font-bold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded text-xs">+1.24%</div>
             </div>
             <div className="text-3xl font-bold mb-4">$184.22</div>
             {/* Fake Chart */}
             <div className="h-16 flex items-end justify-between gap-1">
                 {[40, 60, 45, 70, 65, 85, 80].map((h, i) => (
                     <div key={i} className="w-full bg-green-500/20 rounded-sm" style={{ height: \`\${h}%\` }}></div>
                 ))}
             </div>
             <button className="w-full mt-4 bg-gray-900 dark:bg-white text-white dark:text-black py-2 rounded-lg text-xs font-bold hover:opacity-90">Buy Stock</button>
        </div>
    )
}

function FlightCard() {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-xl p-0 shadow-lg w-72 overflow-hidden">
             <div className="bg-indigo-600 p-4 text-white">
                 <div className="flex justify-between text-xs font-bold opacity-80 mb-1">
                     <span>SFO</span>
                     <span>JFK</span>
                 </div>
                 <div className="flex justify-between text-2xl font-bold">
                     <span>10:30</span>
                     <span>18:45</span>
                 </div>
             </div>
             <div className="p-4 space-y-3">
                 <div className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-800 pb-2">
                     <span className="text-gray-500">Date</span>
                     <span className="font-bold">May 24</span>
                 </div>
                 <div className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-800 pb-2">
                     <span className="text-gray-500">Flight</span>
                     <span className="font-bold">UA 421</span>
                 </div>
                 <button className="w-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 py-2 rounded-lg text-xs font-bold hover:bg-indigo-200 transition-colors">Select Flight</button>
             </div>
        </div>
    )
}
`
}
