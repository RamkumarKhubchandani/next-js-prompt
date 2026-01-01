export const vibeCoding = {
    title: "Vibe Coding vs. Engineering: A Survival Guide 🧠",
    description: "'Vibe Coding' (using AI to code by prompts) is fun, but true Architecture is how you stay employed. A definitive guide to being a 'System Architect' who commands the AI, instead of being replaced by it.",
    slug: "vibe-coding",
    type: "static",
    author: "Principal Architect",
    createdAt: new Date().toISOString(),
    readTime: "30 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    tags: ["Career", "AI Engineering", "Architecture", "Future of Work"],
    keywords: ["Vibe Coding", "AI Orchestration", "Cursor Pro", "System Architect", "Prompt Engineering", "Senior Developer", "Software Architecture"],
    toc: [
        { id: "vibe-vs-engineering", label: "01. Vibe Coding vs Engineering" },
        { id: "ai-orchestrator", label: "02. The AI Orchestrator" },
        { id: "security-guarding", label: "03. The Security Guard" },
        { id: "architectural-patterns", label: "04. Architectural Patterns" },
        { id: "future-role", label: "05. The Product Engineer" },
        { id: "demo", label: "06. AI Configurator" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Vibe vs Engineering -->
        <section id="vibe-vs-engineering" class="scroll-mt-32">
             <div class="border-l-8 border-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Don't just generate code. Own it.
                </h1>
                <p class="text-xl md:text-2xl text-fuchsia-800 dark:text-fuchsia-200 font-light leading-relaxed">
                    It's 2026. A junior developer can generate a React App in 30 seconds using "Vibe Coding"—just prompting until it looks right.
                    <br/><br/>
                    But when the app crashes in production because of a race condition the AI missed? That's when they call you.
                    <strong>Survival in 2026 isn't about writing syntax; it's about verifying architecture.</strong>
                </p>
             </div>
             <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8">
                 <p>
                     <strong>Vibe Coding</strong> is the practice of iteratively prompting an LLM until the visual result matches your mental model. It's fast, euphoric, and dangerous.
                 </p>
                 <p>
                     <strong>Engineering</strong> is the practice of understanding <em>why</em> the code works, ensuring it is secure, performant, and maintainable.
                 </p>
             </div>
        </section>

        <!-- 02. AI Orchestrator -->
        <section id="ai-orchestrator" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-fuchsia-600 dark:text-fuchsia-500">02.</span>
                The Rise of the AI Orchestrator
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                You are no longer a "Typist." You are a "Conductor."
                <br/>
                Your job is to guide the AI agents (like Cursor, Windsurf, or GitHub Copilot) to adhere to strict engineering standards.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800">
                    <h4 class="font-bold text-lg mb-2">The Vibe Coder (Junior)</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Prompts: "Make it pop." Accepts first output. Doesn't read the code. Creates tech debt.</p>
                     <ul class="text-xs text-red-500 space-y-1 list-disc pl-4">
                         <li>Hardcoded strings</li>
                         <li>No Error Handling</li>
                         <li>Accessibility violations</li>
                     </ul>
                </div>
                 <div class="bg-fuchsia-50 dark:bg-fuchsia-900/10 p-6 rounded-xl border border-fuchsia-100 dark:border-fuchsia-900/30">
                    <h4 class="font-bold text-fuchsia-700 dark:text-fuchsia-300 mb-2">The Architect (Senior)</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Prompts: "Refactor this using the Adapter Pattern." Verifies inputs. Audits the logic.</p>
                     <ul class="text-xs text-green-600 space-y-1 list-disc pl-4">
                         <li>Type Safety (Strict)</li>
                         <li>Design Patterns</li>
                         <li>Performance Constraints</li>
                     </ul>
                </div>
            </div>
        </section>

         <!-- 03. Security Guarding -->
        <section id="security-guarding" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-fuchsia-600 dark:text-fuchsia-500">03.</span>
                The "Security Guard" Role
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                AI loves to please. It will happily generate code that is functional but insecure.
            </p>
            <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border-l-4 border-red-500 mb-8">
                <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Common AI Security Failures</h4>
                <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>SQL Injection:</strong> Concatenating strings instead of using parameterized queries.</li>
                    <li><strong>XSS (Cross-Site Scripting):</strong> Using <code>dangerouslySetInnerHTML</code> just to make a layout work.</li>
                    <li><strong>Auth Bypass:</strong> Checking permissions on the client-side only.</li>
                </ul>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
                Your role shifts to <strong>Auditor</strong>. You must assume every line of AI-generated code is guilty until proven innocent.
            </p>
        </section>

         <!-- 06. Demo -->
        <section id="demo" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-fuchsia-600 dark:text-fuchsia-500">06.</span>
                Agent Configuration Lab
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Configure your AI Assistant's "Personality" to switch between "Vibe Mode" (Creative, fast, loose) and "Engineering Mode" (Strict, typed, secure).
            </p>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { Bot, ShieldCheck, Sparkles, AlertTriangle, Code2 } from 'lucide-react';

// 🤖 AI Strategy Configurator

export default function AIConfigurator() {
    const [mode, setMode] = useState('vibe'); // 'vibe' | 'engineer'

    return (
        <div className="bg-slate-950 p-8 rounded-3xl text-white border border-slate-800 shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col items-center">
            
            {/* Background Effects */}
            <div className={\`absolute inset-0 transition-opacity duration-1000 \${mode === 'vibe' ? 'opacity-100' : 'opacity-0'}\`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/20 via-purple-600/20 to-blue-600/20"></div>
                <div className="absolute top-10 left-10 w-64 h-64 bg-fuchsia-500/30 rounded-full blur-[100px]"></div>
            </div>
            
             <div className={\`absolute inset-0 transition-opacity duration-1000 \${mode === 'engineer' ? 'opacity-100' : 'opacity-0'}\`}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                 <div className="absolute inset-0 bg-slate-950/80"></div>
            </div>

            <div className="z-10 w-full max-w-3xl relative">
                
                <h3 className="text-3xl font-black text-center mb-8 flex items-center justify-center gap-3">
                    <Bot className={mode === 'vibe' ? 'text-fuchsia-400' : 'text-blue-400'} size={32} />
                    AI Agent Config
                </h3>

                {/* Toggle */}
                <div className="flex bg-slate-900 p-1.5 rounded-2xl mb-12 shadow-inner border border-slate-800 relative overflow-hidden">
                    <div className={\`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/10 rounded-xl transition-all duration-300 \${mode === 'vibe' ? 'left-1.5 bg-fuchsia-600' : 'left-[calc(50%+4.5px)] bg-blue-600'}\`}></div>
                    <button
                        onClick={() => setMode('vibe')}
                        className="flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 relative z-10 transition-colors"
                    >
                        <Sparkles size={18} /> Vibe Coding
                    </button>
                     <button
                        onClick={() => setMode('engineer')}
                        className="flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 relative z-10 transition-colors"
                    >
                        <ShieldCheck size={18} /> Engineering
                    </button>
                </div>

                {/* Output Visualizer */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative group">
                     <div className="bg-slate-800 px-4 py-3 text-xs font-mono text-slate-400 flex justify-between items-center border-b border-slate-700">
                         <div className="flex items-center gap-2">
                             <Code2 size={14} />
                             <span>agent_response.ts</span>
                         </div>
                         <span className={\`uppercase px-2 py-0.5 rounded text-[10px] font-bold \${mode === 'vibe' ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-blue-500/20 text-blue-400'}\`}>
                             {mode} MODE
                         </span>
                     </div>
                     <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                         {mode === 'vibe' ? (
                             <div className="animate-in fade-in slide-in-from-bottom-2 text-fuchsia-200">
                                 <span className="text-fuchsia-500">// ✨ Here is that cool button you asked for!</span><br/>
                                 <span className="text-blue-400">const</span> Button = () => (<br/>
                                 &nbsp;&nbsp;&lt;<span className="text-yellow-400">button</span> style={{\{ background: 'linear-gradient(to right, #ec4899, #8b5cf6)', padding: '10px 20px', borderRadius: '99px', border: 'none', color: 'white', fontWeight: 'bold' \}}}&gt;<br/>
                                 &nbsp;&nbsp;&nbsp;&nbsp;Click Me!! 🚀<br/>
                                 &nbsp;&nbsp;&lt;/<span className="text-yellow-400">button</span>&gt;<br/>
                                 );<br/>
                                 <br/>
                                 <div className="bg-red-500/10 text-red-400 p-2 mt-4 rounded border border-red-500/20 flex gap-2 items-start text-xs">
                                     <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                                     <div>
                                         <strong>Audit Log:</strong><br/>
                                         • No accessibility (aria-label)<br/>
                                         • Hardcoded styles (Not responsive)<br/>
                                         • No onClick handler defined
                                     </div>
                                 </div>
                             </div>
                         ) : (
                             <div className="animate-in fade-in slide-in-from-bottom-2 text-blue-100">
                                 <span className="text-slate-500">/** Implements Design System Button Interface */</span><br/>
                                 <span className="text-purple-400">interface</span> ButtonProps <span className="text-purple-400">extends</span> React.ButtonHTMLAttributes&lt;HTMLButtonElement&gt; {'\{'} <br/>
                                 &nbsp;&nbsp;variant: <span className="text-green-400">'primary'</span> | <span className="text-green-400">'secondary'</span>;<br/>
                                 &nbsp;&nbsp;isLoading?: <span className="text-purple-400">boolean</span>;<br/>
                                 {'\}'}<br/>
                                 <br/>
                                 <span className="text-purple-400">export const</span> Button = ({'{'} variant, isLoading, ...props {'}'}: ButtonProps) => (<br/>
                                 &nbsp;&nbsp;&lt;<span className="text-yellow-400">button</span> <br/>
                                 &nbsp;&nbsp;&nbsp;&nbsp;className={'{'}clsx(styles.base, styles[variant]){'}'}<br/>
                                 &nbsp;&nbsp;&nbsp;&nbsp;disabled={'{'}isLoading || props.disabled{'}'}<br/>
                                 &nbsp;&nbsp;&nbsp;&nbsp;{'{'}...props{'}'}<br/>
                                 &nbsp;&nbsp;&gt;<br/>
                                 &nbsp;&nbsp;&nbsp;&nbsp;{'{'}isLoading ? &lt;Spinner /&gt; : props.children{'}'}<br/>
                                 &nbsp;&nbsp;&lt;/<span className="text-yellow-400">button</span>&gt;<br/>
                                 );
                                  <div className="bg-green-500/10 text-green-400 p-2 mt-4 rounded border border-green-500/20 flex gap-2 items-start text-xs">
                                     <ShieldCheck size={14} className="mt-0.5 shrink-0" />
                                     <div>
                                         <strong>Audit Log:</strong><br/>
                                         • Type Safe (TypeScript)<br/>
                                         • Follows Design System tokens<br/>
                                         • Handles Loading/Disabled states
                                     </div>
                                 </div>
                             </div>
                         )}
                     </div>
                </div>
            </div>
        </div>
    );
}
`
};
