export const aiAgentsReact = {
    title: "From Chatbots to Agents: Building Autonomous Loops in React",
    description: "The era of 'User types, AI answers' is over. Learn how to build Agentic Workflows (Plan -> Act -> Reflect) that can browse the web, write code, and fix their own mistakes.",
    slug: "ai-agents-react",
    category: "AI Engineering",
    type: "static",
    author: "AI Engineer",
    createdAt: new Date().toISOString(),
    readTime: "25 min read",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    tags: ["AI Engineering", "Agents", "React", "LangChain", "Vercel AI SDK"],
    keywords: ["Agentic Workflow", "React Agents", "Autonomous AI", "Tool Calling", "ReAct Pattern"],
    toc: [
        { id: "chatbot-vs-agent", label: "01. Chatbot vs Agent" },
        { id: "the-loop", label: "02. The Architecture Loop" },
        { id: "tool-calling", label: "03. Tool Calling" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Chatbot vs Agent -->
        <section id="chatbot-vs-agent" class="scroll-mt-32">
             <div class="border-l-8 border-violet-600 bg-violet-50 dark:bg-violet-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Stop building Chatbots.
                </h1>
                <p class="text-xl md:text-2xl text-violet-800 dark:text-violet-200 font-light leading-relaxed">
                    A chatbot waits for you. An <strong>Agent</strong> has a goal and works until it's done.
                    <br/><br/>
                    In 2026, we don't just "chat" with LLMs. We give them tools (API access, database read/write) and a "System Loop" to iterate on problems autonomously.
                </p>
             </div>
        </section>

        <!-- 02. The Loop -->
        <section id="the-loop" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">02.</span>
                Plan -> Act -> Reflect
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    The core of any agent is the <strong>Reasoning Loop</strong> (often called ReAct). 
                    The AI thinks: "I need to check the weather. I have a weather tool. I will call it." -> "I have the result. Now I will answer the user."
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// agent-loop.ts</div>
                 <div class="text-purple-400">while</div> (goalNotMet) {'{'} <br/>
                 &nbsp;&nbsp;<div class="text-gray-500">// 1. Think</div> <br/>
                 &nbsp;&nbsp;<div class="text-purple-400">const</div> plan = <div class="text-purple-400">await</div> llm.generatePlan(); <br/><br/>
                 &nbsp;&nbsp;<div class="text-gray-500">// 2. Act</div> <br/>
                 &nbsp;&nbsp;<div class="text-purple-400">const</div> result = <div class="text-purple-400">await</div> tools[plan.action](plan.args); <br/><br/>
                 &nbsp;&nbsp;<div class="text-gray-500">// 3. Reflect</div> <br/>
                 &nbsp;&nbsp;<div class="text-purple-400">if</div> (result.error) llm.memory.add(<span class="text-green-400">"That failed, try another way."</span>); <br/>
                 {'}'}
            </div>
        </section>

        <!-- 03. Tool Calling -->
        <section id="tool-calling" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">03.</span>
                Give it Hands
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Using the Vercel AI SDK or LangChain, we define tools as simple TypeScript functions with Zod schemas. The LLM decides <em>when</em> to call them.
            </p>
            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <code class="text-indigo-700 dark:text-indigo-300 font-bold">
                    tools: {'{'} calculatePrice: tool({'{'}<br/>
                    &nbsp;&nbsp;description: 'Calculate total cost',<br/>
                    &nbsp;&nbsp;parameters: z.object({'{'})...<br/>
                    {'}'}) {'}'}
                </code>
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-violet-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Guardrails are Mandatory.</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    An agent in an infinite loop will bankrupt you (API costs).
                    <br/><br/>
                    Always implement <strong>run limits</strong> (max 5 steps) and <strong>human-in-the-loop</strong> approval for sensitive actions (like deleting DB records or sending emails).
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';
import { Bot, User, Terminal, Database, Globe, Play, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

// 🤖 Agent Loop Visualizer

export default function AgentDemo() {
    const [goal, setGoal] = useState("Find the cheapest flight to Tokyo");
    const [logs, setLogs] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [step, setStep] = useState(0);

    const steps = [
        { action: 'THINK', msg: 'User wants flights to Tokyo. I need to search current prices.' },
        { action: 'TOOL', tool: 'search_flights', params: '{ dest: "HND", date: "next_week" }', result: 'Found: ANA ($1200), JAL ($1400), UA ($900)' },
        { action: 'THINK', msg: 'UA is cheapest ($900). I should check if it has baggage included.' },
        { action: 'TOOL', tool: 'check_baggage', params: '{ flight: "UA_123" }', result: 'No baggage included (+$100)' },
        { action: 'THINK', msg: 'Total is $1000. ANA is $1200 w/ bag. UA is better deal. I will recommend UA.' },
        { action: 'FINAL', msg: 'Recommendation: United Airlines ($1000 total w/ bags).' }
    ];

    const runAgent = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setLogs([]);
        setStep(0);

        for (let i = 0; i < steps.length; i++) {
            setStep(i + 1);
            const currentStep = steps[i];
            
            // Artificial delay for "processing"
            await new Promise(r => setTimeout(r, 1500));
            
            setLogs(prev => [...prev, currentStep]);
        }
        setIsRunning(false);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-violet-500">🤖</span> Autonomous Agent
                </h3>
                <button 
                    onClick={runAgent}
                    disabled={isRunning}
                    className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-xl transition-all flex items-center gap-2"
                >
                    {isRunning ? <Loader2 className="animate-spin" /> : <Play />}
                    {isRunning ? 'Thinking...' : 'Start Goal'}
                </button>
            </div>

            <div className="flex flex-col gap-6">
                
                {/* Input Goal */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <User className="text-gray-400" />
                    <div className="flex-1 font-mono text-sm">
                        <span className="text-gray-500 select-none">Goal: &gt; </span>
                        <span className="font-bold text-gray-800 dark:text-white">{goal}</span>
                    </div>
                </div>

                {/* Workflow Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Log Stream */}
                    <div className="bg-black rounded-xl p-6 font-mono text-xs overflow-y-auto h-[400px] border border-gray-800 shadow-inner">
                        <div className="text-gray-500 border-b border-gray-800 pb-2 mb-4 uppercase font-bold flex justify-between">
                            <span>Execution Log</span>
                            {isRunning && <span className="text-green-500 animate-pulse">● LIVE</span>}
                        </div>
                        <div className="space-y-4">
                            {logs.map((log, i) => (
                                <div key={i} className="animate-in slide-in-from-left-2 fade-in duration-300">
                                    <div className="flex items-center gap-2 mb-1">
                                        {log.action === 'THINK' && <span className="text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded text-[10px] font-bold">THINKING</span>}
                                        {log.action === 'TOOL' && <span className="text-pink-400 bg-pink-900/30 px-2 py-0.5 rounded text-[10px] font-bold">CALLING TOOL</span>}
                                        {log.action === 'FINAL' && <span className="text-green-400 bg-green-900/30 px-2 py-0.5 rounded text-[10px] font-bold">ANSWER</span>}
                                    </div>
                                    
                                    <div className="pl-2 border-l-2 border-gray-800">
                                        {log.action === 'TOOL' ? (
                                            <>
                                                <div className="text-pink-300 mb-1">{log.tool}({log.params})</div>
                                                <div className="text-gray-500">→ {log.result}</div>
                                            </>
                                        ) : (
                                            <div className="text-gray-300">{log.msg}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {logs.length === 0 && <div className="text-gray-600 italic">Waiting for start command...</div>}
                        </div>
                    </div>

                    {/* State Visualization */}
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                        
                        {/* Background Pulse */}
                        {isRunning && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[300px] h-[300px] bg-violet-500/10 rounded-full animate-ping"></div>
                            </div>
                        )}

                        <div className="relative z-10 text-center space-y-8">
                            
                            {/* The Brain */}
                            <div className={\`w-24 h-24 mx-auto bg-white dark:bg-black rounded-full flex items-center justify-center border-4 shadow-xl transition-all duration-300 \${
                                isRunning ? 'border-violet-500 scale-110 shadow-violet-500/30' : 'border-gray-200 dark:border-gray-700 grayscale'
                            }\`}>
                                <Bot size={48} className={isRunning ? 'text-violet-600' : 'text-gray-400'} />
                            </div>

                            {/* Active Tool Indicator */}
                            {logs.length > 0 && logs[logs.length - 1].action === 'TOOL' && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 rounded-full font-bold text-sm animate-bounce">
                                    <Globe size={16} /> Using {logs[logs.length - 1].tool}...
                                </div>
                            )}

                             {/* Final Thoughts */}
                             {logs.length > 0 && logs[logs.length - 1].action === 'THINK' && (
                                <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto italic">
                                    "{logs[logs.length - 1].msg}"
                                </div>
                            )}

                             {/* Success State */}
                             {logs.length > 0 && logs[logs.length - 1].action === 'FINAL' && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-full font-bold text-sm">
                                    <CheckCircle2 size={16} /> Task Complete
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
`
};
