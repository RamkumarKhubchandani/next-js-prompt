export const aiGenerativeUi = {
    title: "Generative UI: Interfaces that Design Themselves",
    description: "Static dashboards are dead. Learn how to use Vercel AI SDK to stream React Components directly from an LLM, creating bespoke interfaces for every user interaction.",
    slug: "ai-generative-ui",
    category: "AI Engineering",
    type: "static",
    author: "UX Engineer",
    createdAt: new Date().toISOString(),
    readTime: "20 min read",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    tags: ["AI Engineering", "Generative UI", "React", "Streaming", "Vercel AI SDK"],
    keywords: ["Generative UI", "RSC Streaming", "AI Components", "Dynamic UX", "Personalized Interface"],
    toc: [
        { id: "death-of-static", label: "01. Death of Static UI" },
        { id: "stream-component", label: "02. Streaming Components" },
        { id: "implementation", label: "03. Implementation Code" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Death of Static UI -->
        <section id="death-of-static" class="scroll-mt-32">
             <div class="border-l-8 border-pink-600 bg-pink-50 dark:bg-pink-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Hardcoded Forms are Legacy.
                </h1>
                <p class="text-xl md:text-2xl text-pink-800 dark:text-pink-200 font-light leading-relaxed">
                    Why show a "Credit Card" form if the user wants to pay with Crypto? Why show a generic dashboard if the user asks "How are my sales in Japan?"
                    <br/><br/>
                    <strong>Generative UI</strong> means the LLM decides <em>which</em> components to render and <em>how</em> to configure them, in real-time.
                </p>
             </div>
        </section>

        <!-- 02. Streaming Components -->
        <section id="stream-component" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">02.</span>
                It's Not Just Text
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Using React Server Components (RSC), we can stream a serialized React Component tree from the server to the client. The LLM acts as the router and the prop-builder.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// actions.tsx</div>
                 <div class="text-purple-400">export async function</div> getResponse(input: string) {'{'} <br/>
                 &nbsp;&nbsp;<div class="text-purple-400">const</div> ui = <div class="text-purple-400">await</div> streamUI(model, {'{'} <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;message: input,<br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;tools: {'{'} <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;showStockPrice: {'{'} <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;generate: (symbol) => &lt;StockCard symbol={symbol} /&gt; <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'} <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;{'}'} <br/>
                 &nbsp;&nbsp;{'}'}); <br/>
                 &nbsp;&nbsp;<div class="text-purple-400">return</div> ui; <br/>
                 {'}'}
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-pink-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Design Systems are Key.</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    You cannot let the AI generate raw HTML. It will look terrible and break accessibility.
                    <br/><br/>
                    Instead, feed the AI a strict library of your own high-quality components (Cards, Tables, Charts). The AI becomes the <strong>Assembler</strong>, not the Designer.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { Send, Sparkles, Loader, BarChart, PieChart, CreditCard, Calendar } from 'lucide-react';

// ✨ Generative UI Visualizer

export default function GenUIDemo() {
    const [prompt, setPrompt] = useState("");
    const [uiState, setUiState] = useState({ type: 'empty', data: null });
    const [isGenerating, setIsGenerating] = useState(false);

    const prompts = [
        "Show me sales for Q1 2026",
        "I need to schedule a meeting with potential investors",
        "My credit card expired, update it"
    ];

    const handleSubmit = async (text) => {
        setIsGenerating(true);
        setPrompt(text);
        
        // Simulate LLM latency
        await new Promise(r => setTimeout(r, 1200));

        // Logic (Simulated LLM Decision)
        if (text.toLowerCase().includes("sales")) {
            setUiState({ type: 'chart', data: 'Sales Data' });
        } else if (text.toLowerCase().includes("schedule")) {
            setUiState({ type: 'calendar', data: 'Calendar' });
        } else if (text.toLowerCase().includes("credit")) {
            setUiState({ type: 'payment', data: 'Payment Form' });
        } else {
            setUiState({ type: 'text', data: "I didn't understand that context, but here is a generic response." });
        }
        
        setIsGenerating(false);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl h-[600px] flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-pink-500">✨</span> Generative Interface
                </h3>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-inner overflow-hidden relative flex flex-col items-center justify-center">
                
                {isGenerating ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <Sparkles className="text-pink-500 mb-4 animate-spin-slow" size={48} />
                        <div className="text-gray-400 font-mono text-sm">Generating Component Tree...</div>
                    </div>
                ) : (
                    <div className="w-full max-w-md animate-in zoom-in fade-in duration-500">
                        {uiState.type === 'empty' && (
                            <div className="text-center text-gray-400">
                                <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Ask for a UI and I will build it.</p>
                            </div>
                        )}

                        {uiState.type === 'chart' && (
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                                <h4 className="font-bold mb-4 flex items-center gap-2"><BarChart className="text-blue-500"/> Q1 Sales Performance</h4>
                                <div className="h-32 flex items-end gap-2">
                                    <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 h-[60%] rounded-t"></div>
                                    <div className="flex-1 bg-blue-500 h-[80%] rounded-t shadow-lg shadow-blue-500/50"></div>
                                    <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 h-[40%] rounded-t"></div>
                                </div>
                                <div className="mt-4 text-xs text-gray-500 text-center">Generated via \`&lt;SalesChart /&gt;\` tool</div>
                            </div>
                        )}

                        {uiState.type === 'calendar' && (
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                                <h4 className="font-bold mb-4 flex items-center gap-2"><Calendar className="text-purple-500"/> Schedule Meeting</h4>
                                <div className="grid grid-cols-7 gap-2 mb-4">
                                    {[...Array(7)].map((_, i) => <div key={i} className="text-center text-xs text-gray-400">D</div>)}
                                    {[...Array(7)].map((_, i) => (
                                        <div key={i} className={\`aspect-square rounded flex items-center justify-center text-xs \${i === 3 ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-slate-800'}\`}>
                                            {i+10}
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-2 bg-purple-100 text-purple-600 rounded-lg font-bold text-sm">Confirm Slot</button>
                                <div className="mt-4 text-xs text-gray-500 text-center">Generated via \`&lt;SchedulePicker /&gt;\` tool</div>
                            </div>
                        )}

                        {uiState.type === 'payment' && (
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                                <h4 className="font-bold mb-4 flex items-center gap-2"><CreditCard className="text-green-500"/> Update Method</h4>
                                <div className="space-y-3">
                                    <input disabled placeholder="**** **** **** 4242" className="w-full p-2 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 text-sm" />
                                    <div className="flex gap-2">
                                        <input disabled placeholder="MM/YY" className="w-1/2 p-2 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 text-sm" />
                                        <input disabled placeholder="CVC" className="w-1/2 p-2 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 text-sm" />
                                    </div>
                                </div>
                                <button className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-green-500/30">Save Card</button>
                                <div className="mt-4 text-xs text-gray-500 text-center">Generated via \`&lt;StripeForm /&gt;\` tool</div>
                            </div>
                        )}
                        
                        {uiState.type === 'text' && (
                             <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-xl text-sm">
                                {uiState.data}
                             </div>
                        )}
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="mt-6 flex flex-col gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {prompts.map((p, i) => (
                        <button 
                            key={i}
                            onClick={() => handleSubmit(p)}
                            disabled={isGenerating}
                            className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                        >
                            {p}
                        </button>
                    ))}
                </div>
                
                <div className="relative">
                    <input 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the UI you need..."
                        className="w-full p-4 pr-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-pink-500 outline-none transition"
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(prompt)}
                    />
                    <button 
                        onClick={() => handleSubmit(prompt)}
                        disabled={!prompt.trim() || isGenerating}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 transition"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>

        </div>
    );
}
`
};
