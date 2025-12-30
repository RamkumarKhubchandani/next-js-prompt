export const aiSelfHealing = {
    title: "Self-Healing Code: Auto-Fixing Pipelines",
    description: "Why just report an error? Learn how to build a CI/CD pipeline that detects failure, feeds the stack trace to an Agent, and commits a fix automatically.",
    slug: "ai-self-healing-code",
    category: "AI Engineering",
    type: "static",
    author: "DevOps Engineer",
    createdAt: new Date().toISOString(),
    readTime: "18 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop",
    tags: ["AI Engineering", "DevOps", "CI/CD", "Testing", "Automation"],
    keywords: ["Self Healing Code", "AI Debugging", "Automated Bug Fix", "CI/CD AI", "GitHub Actions AI"],
    toc: [
        { id: "ci-failure", label: "01. The CI Failure" },
        { id: "agent-debug", label: "02. Agentic Debugging" },
        { id: "human-review", label: "03. Human Review" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. CI Failure -->
        <section id="ci-failure" class="scroll-mt-32">
             <div class="border-l-8 border-red-600 bg-red-50 dark:bg-red-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Red builds are opportunities.
                </h1>
                <p class="text-xl md:text-2xl text-red-800 dark:text-red-200 font-light leading-relaxed">
                    Traditionally, a failed test meant a Developer context-switch. They have to pull the branch, run the test, finding the typo.
                    <br/><br/>
                    <strong>Self-Healing Pipelines</strong> intercept the error output, specificially the Stack Trace, and ask an LLM: "Given this code and this error, what is the fix?"
                </p>
             </div>
        </section>

        <!-- 02. Agent Debug -->
        <section id="agent-debug" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">02.</span>
                Authentication Loop
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    The keys is to pass the <em>file content</em> and the <em>error message</em>. The LLM returns a git-patch.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// ci-healer.ts</div>
                 <div class="text-purple-400">if</div> (exitCode !== 0) {'{'} <br/>
                 &nbsp;&nbsp;<div class="text-purple-400">const</div> patch = <div class="text-purple-400">await</div> agent.fix({'{'} <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;code: readFileSync(<span class="text-green-400">'app.ts'</span>),<br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;error: stderr <br/>
                 &nbsp;&nbsp;{'}'}); <br/><br/>
                 &nbsp;&nbsp;applyPatch(patch); <br/>
                 &nbsp;&nbsp;rerunTests(); <br/>
                 {'}'}
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-red-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Don't Auto-Merge</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    AI fixes are often correct in syntax but wrong in logic (e.g., deleting the test to make it pass). 
                    <br/><br/>
                    <strong>Rule:</strong> The AI commits the fix as a "Suggestion" commit. A human must still press the "Merge" button.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { AlertCircle, CheckCircle, GitCommit, Play, RefreshCw, Terminal } from 'lucide-react';

// 🩹 Self-Healing Viz

export default function HealerDemo() {
    const [step, setStep] = useState(0); // 0: Idle, 1: Run Test (Fail), 2: Analyze, 3: Patch, 4: Re-Run (Pass)

    const runPipeline = async () => {
        setStep(1);
        await wait(1500); // Fail
        setStep(2);
        await wait(1500); // Analysis
        setStep(3);
        await wait(1500); // Patch
        setStep(4);
        await wait(1500); // Pass
        setStep(5);
    };
    
    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-red-500">🩹</span> Self-Healing CI
                </h3>
                <button 
                    onClick={runPipeline}
                    disabled={step > 0 && step < 5}
                    className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-xl transition-all flex items-center gap-2"
                >
                    {step > 0 && step < 5 ? <RefreshCw className="animate-spin"/> : <Play />}
                    {step > 0 && step < 5 ? 'Running...' : 'Break Build'}
                </button>
            </div>

            <div className="flex gap-6">
                
                {/* Timeline */}
                <div className="w-1/3 space-y-4">
                     <StepItem active={step === 1} done={step > 1} label="Running Unit Tests" error={step === 1} />
                     <StepItem active={step === 2} done={step > 2} label="AI Analysis (Stack Trace)" />
                     <StepItem active={step === 3} done={step > 3} label="Applying Code Patch" />
                     <StepItem active={step === 4} done={step > 4} label="Re-Running Tests" success={step === 4 || step === 5} />
                </div>

                {/* Console Output */}
                <div className="flex-1 bg-black rounded-xl p-6 font-mono text-xs overflow-hidden flex flex-col">
                    <div className="flex items-center gap-2 text-gray-500 border-b border-gray-800 pb-2 mb-4">
                        <Terminal size={14} /> /bin/zsh
                    </div>
                    
                    <div className="space-y-2 text-gray-300">
                        {step >= 1 && (
                            <div className="animate-in fade-in">
                                $ npm test <br/>
                                > Tests started... <br/>
                                <span className="text-red-500">x Failed: Expected 200, got 500</span> <br/>
                                <span className="text-gray-500">  at calculateTotal (app.ts:45:10)</span>
                            </div>
                        )}

                        {step >= 2 && (
                            <div className="animate-in fade-in mt-4 border-t border-gray-800 pt-2 text-blue-400">
                                [AI Agent] Detecting failure... Reading context... <br/>
                                [AI Agent] Bug found: Division by zero in discount logic.
                            </div>
                        )}

                        {step >= 3 && (
                            <div className="animate-in fade-in mt-4 text-yellow-400">
                                [Git] Creating branch 'fix/auto-patch-001'... <br/>
                                [Git] Applying patch... <br/>
                                + if (count === 0) return 0;
                            </div>
                        )}
                        
                        {step >= 4 && (
                            <div className="animate-in fade-in mt-4 border-t border-gray-800 pt-2">
                                $ npm test --retry <br/>
                                > Tests started... <br/>
                                <span className="text-green-500">✓ calculateTotal passed</span> <br/>
                                <span className="text-green-500">✓ All tests passed (14ms)</span>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}

function StepItem({ active, done, label, error, success }) {
    return (
        <div className={\`p-4 rounded-xl border transition-all \${
            active 
            ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-lg scale-105' 
            : done 
                ? 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-800 opacity-50'
                : 'bg-transparent border-transparent opacity-30'
        }\`}>
            <div className="flex items-center gap-3">
                {done ? (
                     <CheckCircle size={20} className="text-green-500" />
                ) : active ? (
                    error ? <AlertCircle size={20} className="text-red-500" /> : <RefreshCw size={20} className="animate-spin text-blue-500" />
                ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                )}
                
                <span className={\`font-bold \${error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-700 dark:text-gray-200'}\`}>{label}</span>
            </div>
        </div>
    );
}
`
};
