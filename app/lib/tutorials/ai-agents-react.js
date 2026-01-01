export const aiAgentsReact = {
    title: "Building Autonomous Agents with React 🤖",
    description: "The next generation of apps aren't just UIs—they are Agentic Workflows. Learn to build standard ReAct Agents, integrate Tool Calling with Zod, manage Long-Term Memory (RAG), and handle Streaming UI.",
    slug: "ai-agents-react",
    category: "AI Engineering",
    type: "static",
    author: "AI Systems Architect",
    createdAt: new Date().toISOString(),
    readTime: "40 min read",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    tags: ["AI Engineering", "Agents", "React", "LangChain", "Vercel AI SDK"],
    keywords: ["Agentic Workflow", "React Agents", "Autonomous AI", "Tool Calling", "ReAct Pattern", "Generative UI"],
    toc: [
        { id: "beyond-chatbots", label: "01. Beyond Chatbots" },
        { id: "agent-architecture", label: "02. Agent Architecture (ReAct)" },
        { id: "tool-protocol", label: "03. The Tool Protocol (Zod)" },
        { id: "memory-systems", label: "04. Memory Systems (Short vs Long)" },
        { id: "streaming-ui", label: "05. Streaming Generative UI" },
        { id: "safety-limits", label: "06. Safety & Limits" },
        { id: "senior-take", label: "07. Senior Engineer's Take" },
        { id: "interactive-demo", label: "08. Agent Simulator" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Beyond Chatbots -->
        <section id="beyond-chatbots" class="scroll-mt-32">
             <div class="border-l-8 border-violet-600 bg-violet-50 dark:bg-violet-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Stop building dumb Chatbots.
                </h1>
                <p class="text-xl md:text-2xl text-violet-800 dark:text-violet-200 font-light leading-relaxed">
                    A Chatbot waits for a user to type. An <strong>Agent</strong> runs in a loop, observing the world, planning actions, and using tools to achieve a goal.
                    <br/><br/>
                    In 2026, software doesn't just display data. It performs labor.
                </p>
             </div>
        </section>

        <!-- 02. Agent Architecture -->
        <section id="agent-architecture" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">02.</span>
                The ReAct Loop (Reason + Act)
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Most agents follow the <strong>ReAct</strong> pattern:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                     <h3 class="font-bold text-blue-800 dark:text-blue-300 mb-2">1. Thought</h3>
                     <p class="text-sm text-gray-600 dark:text-gray-400">The LLM analyzes the request and its current context. "I need to check the weather."</p>
                 </div>
                 <div class="bg-pink-50 dark:bg-pink-900/10 p-6 rounded-2xl border border-pink-100 dark:border-pink-800">
                     <h3 class="font-bold text-pink-800 dark:text-pink-300 mb-2">2. Action</h3>
                     <p class="text-sm text-gray-600 dark:text-gray-400">The LLM selects a tool and generates JSON arguments. \`weatherTool({ city: "Tokyo" })\`</p>
                 </div>
                 <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-800">
                     <h3 class="font-bold text-green-800 dark:text-green-300 mb-2">3. Observation</h3>
                     <p class="text-sm text-gray-600 dark:text-gray-400">The system executes the tool and feeds the result back to the LLM. "It is raining."</p>
                 </div>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto shadow-2xl">
                 <div class="text-gray-500 mb-2">// Pseudo-code for an Agent Loop</div>
                 <span class="text-purple-400">while</span> (task !== done) {'{'} <br/>
                 &nbsp;&nbsp;<span class="text-gray-500">// 1. Ask LLM what to do next</span> <br/>
                 &nbsp;&nbsp;<span class="text-purple-400">const</span> nextStep = <span class="text-purple-400">await</span> llm.predict(history); <br/><br/>
                 &nbsp;&nbsp;<span class="text-purple-400">if</span> (nextStep.isFinalAnswer) <span class="text-purple-400">return</span> nextStep.answer; <br/><br/>
                 &nbsp;&nbsp;<span class="text-gray-500">// 2. Execute Tool (e.g. valid Zod schema)</span> <br/>
                 &nbsp;&nbsp;<span class="text-purple-400">const</span> observation = <span class="text-purple-400">await</span> tools[nextStep.tool](nextStep.args); <br/><br/>
                 &nbsp;&nbsp;<span class="text-gray-500">// 3. Update Memory</span> <br/>
                 &nbsp;&nbsp;history.push({'{'} role: 'tool', content: observation {'}'}); <br/>
                 {'}'}
            </div>
        </section>

        <!-- 03. Tool Protocol -->
        <section id="tool-protocol" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">03.</span>
                Defining Tools with Zod
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Tools are the hands of the AI. But LLMs are notoriously bad at outputting perfect JSON. They miss commas, hallucinate fields, or use the wrong types.
                <br/><br/>
                We use <strong>Zod</strong> to strictly type the inputs. This acts as a "Runtime Guard" — if the LLM generates invalid arguments, validation fails <em>before</em> the tool executes, and we can feed the error back to the LLM to self-correct.
            </p>
             <pre class="bg-gray-100 dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-sm overflow-x-auto">
import { z } from "zod";

const tools = {
  // ✈️ Tool Definition
  bookFlight: tool({
    description: "Book a flight for the user",
    parameters: z.object({
        destination: z.string().length(3).describe("3-letter IATA code"),
        date: z.string().date(),
        maxPrice: z.number().max(5000),
        seatPreference: z.enum(["window", "aisle"])
    }),
    execute: async ({ destination, date }) => {
        // Real API call here
        return await api.flights.book(destination, date);
    }
  })
};</pre>

            <div class="bg-indigo-900/10 border-l-4 border-indigo-500 p-6 mt-8">
                 <h4 class="font-bold text-indigo-800 dark:text-indigo-200 mb-2">Deep Dive: Structured Output vs JSON Mode</h4>
                 <p class="text-gray-700 dark:text-gray-300">
                     <strong>JSON Mode</strong> just guarantees braces <code>{}</code> match. <br/>
                     <strong>Structured Outputs</strong> (OpenAI's latest feature) guarantees the schema matches exactly. It actually constrains the sampling tokens to the schema. Always use Structured Outputs/Tool Calling for reliability.
                 </p>
            </div>
        </section>

        <!-- 04. Memory Systems -->
        <section id="memory-systems" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">04.</span>
                Memory Systems
            </h2>
             <div class="space-y-6">
                 <div>
                     <h3 class="text-xl font-bold">Short-Term Memory (Context Window)</h3>
                     <p class="text-gray-600 dark:text-gray-400">Everything in the current chat array. Limited by token cost and window size (e.g. 128k tokens).</p>
                 </div>
                 <div>
                     <h3 class="text-xl font-bold">Long-Term Memory (RAG / Vector DB)</h3>
                     <p class="text-gray-600 dark:text-gray-400">Stores millions of documents (PDFs, Logs, Past Chats). The Agent queries this database semantically to recall facts from months ago.</p>
                 </div>
             </div>
        </section>

        <!-- 05. Streaming UI -->
        <section id="streaming-ui" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-teal-600 dark:text-teal-500">05.</span>
                Streaming Generative UI
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Text is boring. Modern Agents stream <strong>React Components</strong>.
                Based on the tool result, the agent can decide to render a chart, a map, or a flight ticket widget, streamed instantly to the client using RSC.
            </p>
        </section>

        <!-- 06. Safety -->
        <section id="safety-limits" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">06.</span>
                Safety & Limits (The Kill Switch)
            </h2>
            <div class="p-6 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-xl">
                <h4 class="font-bold text-red-900 dark:text-red-200">⚠️ Danger: Infinite Loops</h4>
                <p class="text-red-800 dark:text-red-300 mt-2">
                    An agent that gets stuck trying to "fix" an error can burn $100 in 5 minutes.
                    <br/>
                    <strong>Always</strong> implement:
                </p>
                <ul class="list-disc pl-5 mt-2 text-red-800 dark:text-red-300">
                    <li>Max Steps (e.g. stop after 10 loops)</li>
                    <li>Human Confirmation for Side Effects (POST/DELETE/PUT)</li>
                    <li>Timeouts</li>
                </ul>
            </div>
        </section>

        <!-- 07. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">07.</span>
                Senior Engineer's Take
            </h2>
            <ul class="space-y-4 text-gray-700 dark:text-gray-300">
                <li><strong>Determinism is gone.</strong> You cannot write unit tests for "Reasoning". You must use "Evals" (Evaluation datasets) to score your agent's success rate.</li>
                <li><strong>Latency is high.</strong> Agents take time to think. Good UX requires "Skeletal Loading" or "Thought Streaming" to keep the user engaged while the agent works.</li>
                <li><strong>The Context Window Bottleneck.</strong> You cannot shove 100 files into the prompt. You must implement a "Summarization Step" or "Knowledge Graph" to compress information as the conversation grows.</li>
            </ul>
        </section>

        <!-- 08. Simulator -->
        <section id="interactive-demo" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-blue-600 dark:text-blue-500">08.</span>
                Agent Simulator
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Watch an agent reason through a multi-step problem, utilizing tools and memory to find the best flight deal.
            </p>
        </section>

    </div>
    `,
    code: `import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 🤖 AUTONOMOUS AGENT SIMULATOR
// ==========================================

export default function AgentSimulator() {
    const [goal, setGoal] = useState("Find cheapest flight to Tokyo");
    const [logs, setLogs] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [memory, setMemory] = useState([]);
    const logsEndRef = useRef(null);

    // Initial Empty State
    const clear = () => {
        setLogs([]);
        setMemory([]);
        setIsRunning(false);
    }

    const scrollToBottom = () => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [logs]);

    // PRE-DEFINED SCENARIO with Branches
    // In a real app, this would be computed by an LLM
    const scenario = [
        { type: 'think', content: 'User wants flights to Tokyo. I need to check flight prices from NYC.' },
        { type: 'tool_call', name: 'search_flights', args: '{ from: "NYC", to: "TYO", date: "next_friday" }' },
        { type: 'tool_result', content: 'Found 3 flights: ANA ($1200), DELTA ($800), JAL ($1400)' },
        { type: 'think', content: 'Delta is significantly cheaper ($800). I should check if baggage is included, as that often hides cost.' },
        { type: 'tool_call', name: 'check_baggage_policy', args: '{ airline: "DELTA", class: "economy" }' },
        { type: 'tool_result', content: 'Delta Economy Basic: No checked bags. +$100 per bag.' },
        { type: 'think', content: 'Total Delta cost is $900. ANA ($1200) includes bags. Delta is still cheaper. I will recommend Delta but warn about the bag fee.' },
        { type: 'final_answer', content: 'I found the best deal on Delta for $800. Note: This does not include bags (+$100). ANA is $1200 all-inclusive.', ui: 'flight_card' }
    ];

    const runAgent = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setLogs([]);
        setMemory([]);

        for (const step of scenario) {
            // Artificial "Thinking" Delay
            await new Promise(r => setTimeout(r, 1200));

            setLogs(prev => [...prev, step]);

            if (step.type === 'tool_result') {
                 setMemory(prev => [...prev, { role: 'obs', content: step.content }]);
            }
        }
        setIsRunning(false);
    };

    return (
        <div className="bg-slate-50 dark:bg-[#0f1115] p-6 lg:p-10 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl font-sans min-h-[850px] flex flex-col">
             
             {/* HEADER */}
             <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <span className="text-violet-500"><span className="text-3xl">🤖</span></span> Agent Inspector
                    </h3>
                    <p className="text-slate-500 mt-2 font-medium">Visualizing ReAct Loops & Tool Usage</p>
                </div>
                <div className="flex gap-2">
                    <button 
                         onClick={clear}
                         disabled={isRunning}
                         className="px-4 py-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold transition-colors"
                     >
                         Reset
                     </button>
                    <button 
                        onClick={runAgent}
                        disabled={isRunning}
                        className={\`bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-violet-500/20 \${isRunning ? 'animate-pulse' : ''}\`}
                    >
                        {isRunning ? <span className="animate-spin">⏳</span> : <span>▶️</span>}
                        {isRunning ? 'Agent Running...' : 'Execute Goal'}
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
                
                {/* LEFT: Context & Goal */}
                <div className="space-y-6 flex flex-col">
                    {/* Goal Input */}
                     <div className="bg-white dark:bg-[#1a1c20] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Current Objective</label>
                        <div className="font-mono text-sm bg-slate-50 dark:bg-black/50 p-3 rounded-xl border border-slate-100 dark:border-white/10 text-slate-800 dark:text-slate-200">
                            {goal}
                        </div>
                    </div>

                    {/* Agent Memory Viewer */}
                    <div className="flex-1 bg-white dark:bg-[#1a1c20] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col">
                         <div className="flex items-center justify-between mb-4">
                             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Agent Memory</label>
                             <span className="text-slate-400">💾</span>
                         </div>
                         <div className="flex-1 bg-slate-50 dark:bg-black/50 rounded-xl p-3 overflow-y-auto border border-slate-100 dark:border-white/10 text-xs font-mono space-y-2">
                             {memory.length === 0 && <span className="text-slate-400 italic">Memory empty...</span>}
                             {memory.map((m, i) => (
                                 <div key={i} className="bg-white dark:bg-[#222] p-2 rounded border border-slate-200 dark:border-black">
                                     <span className="text-blue-500 font-bold">OBS:</span> {m.content}
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>

                {/* MIDDLE: Execution Log (Stream) */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner flex flex-col relative overflow-hidden">
                    <div className="bg-slate-800 px-4 py-3 flex justify-between items-center border-b border-slate-700">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                            <span className="text-green-400">💻</span> Live Execution Stream
                        </span>
                        {isRunning && <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>}
                    </div>

                    <div className="flex-1 p-6 space-y-6 overflow-y-auto scroll-smooth">
                        {logs.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50 space-y-4">
                                <span className="text-6xl">🤖</span>
                                <div className="text-sm">Waiting to start agent loop...</div>
                            </div>
                        )}

                        {logs.map((step, i) => (
                            <div key={i} className="animate-in slide-in-from-bottom-2 fade-in duration-500">
                                
                                {/* 1. THINKING */}
                                {step.type === 'think' && (
                                    <div className="flex gap-4 opacity-80">
                                        <div className="mt-1"><span className="text-purple-400 text-lg">🤖</span></div>
                                        <div className="bg-slate-800/50 p-3 rounded-lg rounded-tl-none border border-slate-700/50 text-slate-300 text-sm italic">
                                            {step.content}
                                        </div>
                                    </div>
                                )}

                                {/* 2. TOOL CALL */}
                                {step.type === 'tool_call' && (
                                    <div className="flex gap-4">
                                        <div className="mt-1"><span className="text-blue-400 animate-spin text-lg">🌐</span></div>
                                        <div className="bg-blue-900/10 p-3 rounded-lg rounded-tl-none border border-blue-500/20 text-blue-300 text-sm font-mono w-full">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-xs uppercase opacity-70">Calling Tool</span>
                                            </div>
                                            <div className="font-bold">{step.name}<span className="text-blue-200/50">{step.args}</span></div>
                                        </div>
                                    </div>
                                )}

                                {/* 3. TOOL RESULT */}
                                {step.type === 'tool_result' && (
                                    <div className="flex gap-4">
                                        <div className="mt-1"><span className="text-orange-400 text-lg">💾</span></div>
                                        <div className="bg-orange-900/10 p-3 rounded-lg rounded-tl-none border border-orange-500/20 text-orange-300 text-sm font-mono opacity-80">
                                            -> {step.content}
                                        </div>
                                    </div>
                                )}

                                {/* 4. FINAL ANSWER (Generative UI) */}
                                {step.type === 'final_answer' && (
                                    <div className="flex gap-4">
                                        <div className="mt-1"><span className="text-green-400 text-lg">✅</span></div>
                                        <div className="bg-green-900/10 p-4 rounded-xl rounded-tl-none border border-green-500/20 text-green-100 text-sm w-full shadow-lg shadow-green-900/20">
                                            <div className="font-bold text-green-400 mb-2 uppercase text-xs tracking-widest">Final Response</div>
                                            <div className="mb-4">{step.content}</div>
                                            
                                            {/* GENERATIVE UI COMPONENT */}
                                            {step.ui === 'flight_card' && (
                                                <div className="bg-white text-black p-4 rounded-lg flex items-center justify-between shadow-lg">
                                                    <div className="flex items-center gap-4">
                                                        <div className="bg-red-600 text-white p-2 rounded font-bold text-xs">DELTA</div>
                                                        <div>
                                                            <div className="font-bold text-lg">NYC ➔ TYO</div>
                                                            <div className="text-xs text-slate-500">Duration: 14h 30m</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-black text-green-600">$800</div>
                                                        <div className="text-[10px] text-slate-400 uppercase font-bold">Economy Basic</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))}
                        <div ref={logsEndRef} />
                    </div>
                </div>

            </div>
        </div>
    );
}
`};
