export const aiPromptsFe = {
    title: "AI Prompts Every Frontend Developer Should Know 🤖",
    description: "Iterating with AI can yield messy, insecure code if prompted incorrectly. A masterclass in transitioning from simple 'Junior' prompts to strict, structured 'Pro' prompts for production-ready frontend code.",
    slug: "ai-prompts-every-frontend-developer-should-know",
    type: "static",
    author: "Full Stack Lead",
    createdAt: new Date().toISOString(),
    readTime: "25 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    tags: ["AI Prompting", "React", "Frontend Architecture", "Best Practices"],
    keywords: ["AI Prompts", "Prompt Engineering", "Frontend developer AI", "Copilot React prompts", "Cursor AI setup", "System prompting", "UI Architecture"],
    toc: [
        { id: "introduction", label: "01. Introduction: Prompts as Code" },
        { id: "junior-prompts", label: "02. The Junior Prompt Trap" },
        { id: "pro-prompts", label: "03. The Pro Prompt Framework" },
        { id: "react-examples", label: "04. Real-world Code Comparison" },
        { id: "prompts-list", label: "05. Ultimate FE Prompt Library" },
        { id: "sandbox-config", label: "06. Interactive Prompt Studio" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Introduction -->
        <section id="introduction" class="scroll-mt-32">
             <div class="border-l-8 border-cyan-500 bg-cyan-50 dark:bg-cyan-950/20 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Better prompts build better code.
                </h1>
                <p class="text-xl md:text-2xl text-cyan-800 dark:text-cyan-200 font-light leading-relaxed">
                    AI models are only as good as the context and constraints you provide. In frontend development, naive prompts lead to accessibility violations, state sync bugs, performance bloat, and poor design system alignment.
                    <br/><br/>
                    <strong>Learn how to write structured prompts that act as specifications, ensuring your AI assistants produce clean, production-ready code on the first try.</strong>
                </p>
             </div>
        </section>

        <!-- 02. The Junior Prompt Trap -->
        <section id="junior-prompts" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">02.</span>
                The Junior Prompt Trap
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Most junior developers treat AI like a search engine or a conversational buddy. They write simple, conversational prompts and blindly accept the result.
            </p>
            
            <div class="bg-red-50 dark:bg-red-950/20 p-6 rounded-xl border border-red-200 dark:border-red-900/30 mb-8">
                <h4 class="font-bold text-red-700 dark:text-red-400 mb-4">Example of a Naive "Junior" Prompt:</h4>
                <div class="bg-gray-900 text-red-300 font-mono p-4 rounded-lg text-sm mb-4">
                    "Build a React dropdown component."
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Why this fails in production:</strong>
                    <br/>
                    • The AI will generate a simple select dropdown or a custom list using standard div tags that are invisible to screen readers (lack of ARIA support).
                    <br/>
                    • It will lack keyboard navigation (arrow keys, Escape to close).
                    <br/>
                    • Styles will be hardcoded, bypassing your Tailwind or CSS variable tokens.
                </p>
            </div>
        </section>

        <!-- 03. The Pro Prompt Framework -->
        <section id="pro-prompts" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">03.</span>
                The Pro Prompt Framework
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Seniors and architects write prompts like **technical specifications**. They define Roles, Context, Rules, and Output Formats to restrict the search space of the LLM.
            </p>
            
            <div class="bg-cyan-50 dark:bg-cyan-950/20 p-6 rounded-xl border border-cyan-100 dark:border-cyan-900/30 mb-8">
                <h4 class="font-bold text-cyan-800 dark:text-cyan-300 mb-4">The CRFC Prompting Formula:</h4>
                <ul class="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                    <li><strong>1. Context (C):</strong> Who are you? (e.g. *"You are a Staff Frontend Engineer specializing in accessible React components."*)</li>
                    <li><strong>2. Rules & Constraints (R):</strong> What are the hard boundaries? (e.g. *"No inline styles. Use Tailwind CSS. Code must comply with WCAG 2.1 AA standards. Ensure keyboard support."*)</li>
                    <li><strong>3. Format Spec (F):</strong> What should the response look like? (e.g. *"Return only the TypeScript component and its corresponding interface. No explanations."*)</li>
                    <li><strong>4. Case Handling (C):</strong> How do we handle states? (e.g. *"Include Loading, Empty, and Error UI states. Prevent double clicks on request triggers."*)</li>
                </ul>
            </div>
        </section>

        <!-- 04. Real-world Code Comparison -->
        <section id="react-examples" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">04.</span>
                Real-world Code Comparison
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Let's observe the huge difference in output between a naive prompt and an architectural prompt for a search card:
            </p>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="border border-red-200 dark:border-red-950 rounded-xl p-6 bg-red-50/5">
                    <h4 class="font-bold text-red-600 mb-4">Code from Naive Prompt</h4>
                    <p class="text-xs text-gray-500 mb-4">Simple, unoptimized click handlers, hardcoded values, and missing hooks dependencies.</p>
                    <div class="bg-slate-950 p-4 rounded-lg font-mono text-xs text-red-300 overflow-x-auto">
                        <code>
                            function Search() {<br/>
                            &nbsp;&nbsp;const [q, setQ] = useState('');<br/>
                            &nbsp;&nbsp;return (<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;input onChange={e =&gt; fetch('/api?q=' + e.target.value)} /&gt;<br/>
                            &nbsp;&nbsp;);<br/>
                            }
                        </code>
                    </div>
                    <span class="block mt-4 text-xs text-red-500">⚠️ Issues: Fires API requests on every keystroke (No debouncing). Causes server crash under load.</span>
                </div>
                
                <div class="border border-green-200 dark:border-green-950 rounded-xl p-6 bg-green-50/5">
                    <h4 class="font-bold text-green-600 mb-4">Code from Pro Prompt</h4>
                    <p class="text-xs text-gray-500 mb-4">Debounced callbacks, clean custom hooks, loading states, error boundaries, and input sanitization.</p>
                    <div class="bg-slate-950 p-4 rounded-lg font-mono text-xs text-green-300 overflow-x-auto">
                        <code>
                            export function SearchInput({ onSearch }) {<br/>
                            &nbsp;&nbsp;const [val, setVal] = useState('');<br/>
                            &nbsp;&nbsp;const debouncedSearch = useDebounce(val, 300);<br/>
                            &nbsp;&nbsp;useEffect(() =&gt; {<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;onSearch(debouncedSearch);<br/>
                            &nbsp;&nbsp;}, [debouncedSearch, onSearch]);<br/>
                            &nbsp;&nbsp;return &lt;input value={val} onChange={e =&gt; setVal(e.target.value)} /&gt;;<br/>
                            }
                        </code>
                    </div>
                    <span class="block mt-4 text-xs text-green-500">🛡️ Benefits: Network requests are optimized, component is completely reusable, clean separation of concerns.</span>
                </div>
            </div>
        </section>

        <!-- 05. Ultimate FE Prompt Library -->
        <section id="prompts-list" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">05.</span>
                Ultimate FE Prompt Library
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Copy and paste these pre-engineered prompt skeletons for your daily developer tasks:
            </p>
            
            <div class="space-y-6">
                <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800">
                     <h4 class="font-bold text-lg mb-2">Prompt 1: Strict Accessibility Audit</h4>
                     <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Use this prompt to rewrite any React layout so it is fully accessible to assistive tools.</p>
                     <div class="bg-slate-950 text-slate-300 font-mono p-4 rounded-lg text-xs select-all">
                         "Audit this component for accessibility (a11y). Rewrite it using standard semantic HTML elements, add appropriate aria labels/roles, support full keyboard focus/navigation, and ensure screen readers are notified of state changes."
                     </div>
                </div>
                
                <div class="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800">
                     <h4 class="font-bold text-lg mb-2">Prompt 2: React Performance Refactoring</h4>
                     <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Inject this prompt when refactoring massive list renderers or expensive components.</p>
                     <div class="bg-slate-950 text-slate-300 font-mono p-4 rounded-lg text-xs select-all">
                         "Refactor the following React component to optimize rendering performance. Identify unnecessary re-renders, isolate state boundaries, memoize complex calculations using useMemo/useCallback where appropriate, and ensure list keys are stable."
                     </div>
                </div>
            </div>
        </section>

        <!-- 06. Interactive Prompt Studio -->
        <section id="sandbox-config" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">06.</span>
                Interactive Prompt Studio
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Explore scenarios below. Toggle between Junior and Senior prompt definitions to see how the prompt affects generated code, network performance, and accessibility checklist ratings.
            </p>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';

// 🤖 Interactive Prompting Studio

const SCENARIOS = {
    dropdown: {
        title: "Custom UI Select Dropdown",
        juniorPrompt: "Build a custom React dropdown select component.",
        juniorCode: \`import React, { useState } from 'react';

// ⚠️ Basic custom dropdown
export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Select Option');
  const options = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div className="relative">
      <div 
        onClick={() => setOpen(!open)}
        className="p-3 bg-slate-800 border rounded cursor-pointer"
      >
        {selected}
      </div>
      {open && (
        <div className="absolute top-12 left-0 w-full bg-slate-800 border rounded">
          {options.map(opt => (
            <div 
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className="p-3 hover:bg-slate-700 cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}\`,
        seniorPrompt: "Write an accessible, keyboard-navigable custom dropdown component. Use native button and list elements, implement role='listbox', and support arrow key selection and Escape to close.",
        seniorCode: \`import React, { useState, useRef, useEffect } from 'react';

// 🛡️ Accessible keyboard-navigable dropdown
export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Option 1');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const options = ['Option 1', 'Option 2', 'Option 3'];
  
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev + 1) % options.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
    }
    if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      setSelected(options[focusedIndex]);
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} onKeyDown={handleKeyDown} className="relative w-64">
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-left flex justify-between items-center focus:ring-2 focus:ring-cyan-500 outline-none"
      >
        <span>{selected}</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Options list"
          className="absolute top-14 left-0 w-full bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl z-10"
        >
          {options.map((opt, idx) => (
            <li
              key={opt}
              role="option"
              aria-selected={selected === opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className={\`p-3 cursor-pointer text-sm transition-colors \${
                selected === opt ? 'bg-cyan-600/30 text-cyan-400 font-bold' : ''
              } \${focusedIndex === idx ? 'bg-slate-700 text-white font-bold' : 'text-slate-300 hover:bg-slate-700/50'}\`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}\`,
        metrics: {
            junior: { a11y: "15%", perf: "60%", security: "90%" },
            senior: { a11y: "100%", perf: "95%", security: "98%" }
        }
    },
    debounce: {
        title: "Search Auto-complete Field",
        juniorPrompt: "Create a React search input that queries an API on change.",
        juniorCode: \`import React, { useState } from 'react';

// ⚠️ No debouncing search input
export default function Search() {
  const [val, setVal] = useState('');

  const handleChange = (e) => {
    setVal(e.target.value);
    // Fires API on every single keystroke!
    fetch(\`/api/search?q=\${e.target.value}\`);
  };

  return (
    <input 
      type="text" 
      value={val} 
      onChange={handleChange}
      placeholder="Type to search..." 
      className="p-3 bg-slate-800 border rounded"
    />
  );
}\`,
        seniorPrompt: "Implement a debounced React search input. Only fire the API request 300ms after the user stops typing, sanitize the search queries, and handle race conditions.",
        seniorCode: \`import React, { useState, useEffect } from 'react';

// 🛡️ Debounced and clean search input
export default function Search() {
  const [val, setVal] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(val.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [val]);

  useEffect(() => {
    if (!debouncedValue) return;

    let active = true;
    
    // Sanitize query parameters
    const query = encodeURIComponent(debouncedValue);
    
    fetch(\`/api/search?q=\${query}\`)
      .then(res => res.json())
      .then(data => {
        // Prevent race condition (discard results if user typed more)
        if (active) {
          console.log('Results loaded:', data);
        }
      });

    return () => {
      active = false;
    };
  }, [debouncedValue]);

  return (
    <input 
      type="text" 
      value={val} 
      onChange={(e) => setVal(e.target.value)}
      placeholder="Type to search (debounced)..." 
      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder:text-slate-500"
    />
  );
}\`,
        metrics: {
            junior: { a11y: "80%", perf: "10%", security: "40%" },
            senior: { a11y: "95%", perf: "98%", security: "95%" }
        }
    }
};

export default function PromptStudio() {
    const [scenario, setScenario] = useState('dropdown');
    const [promptType, setPromptType] = useState('senior'); // 'junior' | 'senior'

    const active = SCENARIOS[scenario];
    const code = promptType === 'junior' ? active.juniorCode : active.seniorCode;
    const prompt = promptType === 'junior' ? active.juniorPrompt : active.seniorPrompt;
    const metrics = promptType === 'junior' ? active.metrics.junior : active.metrics.senior;

    return (
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl text-white border border-slate-800 shadow-2xl min-h-[600px] flex flex-col justify-between">
            <div className="w-full">
                
                {/* Scenario selector */}
                <div className="flex gap-2 mb-6">
                    {Object.entries(SCENARIOS).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setScenario(key)}
                            className={\`px-4 py-2 text-xs font-black rounded-lg border transition-all \${
                                scenario === key 
                                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20' 
                                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                            }\`}
                        >
                            {data.title}
                        </button>
                    ))}
                </div>

                {/* Prompt Type selector */}
                <div className="flex bg-slate-900 p-1 rounded-2xl mb-8 border border-slate-800 relative overflow-hidden">
                    <button
                        onClick={() => setPromptType('junior')}
                        className={\`flex-1 py-3 rounded-xl text-sm font-extrabold transition-all relative z-10 \${
                            promptType === 'junior' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-slate-400 hover:text-slate-200'
                        }\`}
                    >
                        Junior Prompt
                    </button>
                    <button
                        onClick={() => setPromptType('senior')}
                        className={\`flex-1 py-3 rounded-xl text-sm font-extrabold transition-all relative z-10 \${
                            promptType === 'senior' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'text-slate-400 hover:text-slate-200'
                        }\`}
                    >
                        Senior (Pro) Prompt
                    </button>
                </div>

                {/* Prompt display */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl mb-6 flex flex-col gap-2">
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">PROMPT GIVEN:</span>
                    <p className="text-sm font-medium italic text-slate-200">"{prompt}"</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl text-center">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1">A11y (ARIA)</span>
                        <span className={\`text-lg font-black \${promptType === 'junior' ? 'text-red-400' : 'text-green-400'}\`}>
                            {metrics.a11y}
                        </span>
                    </div>
                     <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl text-center">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Performance</span>
                        <span className={\`text-lg font-black \${promptType === 'junior' ? 'text-red-400' : 'text-green-400'}\`}>
                            {metrics.perf}
                        </span>
                    </div>
                     <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl text-center">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Clean/Security</span>
                        <span className={\`text-lg font-black \${promptType === 'junior' ? 'text-red-400' : 'text-green-400'}\`}>
                            {metrics.security}
                        </span>
                    </div>
                </div>

                {/* Live Sandbox Example */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[150px] mb-4">
                    <span className="text-[10px] text-slate-500 font-bold uppercase mb-4">Live Rendered Interactive Output:</span>
                    
                    {scenario === 'dropdown' ? (
                        /* Dropdown demo */
                        <div className="relative w-64 h-36">
                            {promptType === 'junior' ? (
                                <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-left cursor-pointer" onClick={() => alert('Basic dropdown rendered. Lacks focus accessibility!')}>
                                    Select Option
                                </div>
                            ) : (
                                <div className="w-full">
                                    <button className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-left flex justify-between items-center focus:ring-2 focus:ring-cyan-500 outline-none">
                                        <span>Option 1</span>
                                        <span>▼</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Debounce search demo */
                        <div className="w-full max-w-sm h-36">
                            <input 
                                type="text" 
                                placeholder={promptType === 'junior' ? "Fires API query on every key..." : "Only queries 300ms after you stop typing..."}
                                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-sm"
                            />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
`
};
