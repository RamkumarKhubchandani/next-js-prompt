export const angularAdvancedDi = {
    title: "Angular DI: Advanced Patterns for Seniors",
    description: "Dependency Injection is more than just constructor(private http: HttpClient). Learn how to use InjectionTokens, Multi-Providers, and Factory Providers to build plugin architectures.",
    slug: "angular-advanced-di",
    category: "Angular",
    type: "static",
    author: "Angular Architect",
    createdAt: new Date().toISOString(),
    readTime: "18 min read",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?q=80&w=2564&auto=format&fit=crop",
    tags: ["Angular", "Dependency Injection", "Architecture", "Design Patterns", "Clean Code"],
    keywords: ["Angular DI", "InjectionToken", "Multi Provider", "FactoryProvider", "useClass vs useExisting"],
    toc: [
        { id: "beyond-services", label: "01. Beyond Services" },
        { id: "injection-tokens", label: "02. InjectionTokens" },
        { id: "plugin-architecture", label: "03. Plugin Architecture" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Beyond Services -->
        <section id="beyond-services" class="scroll-mt-32">
             <div class="border-l-8 border-red-600 bg-red-50 dark:bg-red-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Stop injecting classes everywhere.
                </h1>
                <p class="text-xl md:text-2xl text-red-800 dark:text-red-200 font-light leading-relaxed">
                    Most developers only use DI for singleton services. 
                    <br/><br/>
                    But Angular's DI system is a hierarchical, key-value store that can hold <em>configurations</em>, <em>functions</em>, and even <em>lists of plugins</em>.
                </p>
             </div>
        </section>

        <!-- 02. InjectionTokens -->
        <section id="injection-tokens" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">02.</span>
                Config Objects
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Don't hardcode API URLs. Use an <code>InjectionToken</code> to inject environment variables into your library.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// config.token.ts</div>
                 <div class="text-purple-400">export const</div> API_URL = <div class="text-purple-400">new</div> InjectionToken&lt;string&gt;(<span class="text-green-400">'API_URL'</span>); <br/><br/>
                 
                 <div class="text-gray-500">// Configure in main.ts</div>
                 providers: [ {'{'} provide: API_URL, useValue: <span class="text-green-400">'https://api.myapp.com'</span> {'}'} ]
            </div>
        </section>

        <!-- 03. Plugin Architecture -->
        <section id="plugin-architecture" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">03.</span>
                Multi Providers
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Want to build a pluggable validation system? Use <code>multi: true</code>. This allows you to provide <em>multiple</em> classes for the <em>same</em> token.
            </p>
            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <code class="text-indigo-700 dark:text-indigo-300 font-bold">
                     constructor(@Inject(VALIDATORS) private validators: Validator[])
                </code>
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-red-600 dark:text-red-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-red-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Tree Shaking</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Use <code>providedIn: 'root'</code> whenever possible. 
                    <br/><br/>
                    If you register providers in an <code>@NgModule</code> array, they cannot be tree-shaken if unused. 'root' providers are lazily instantiated and removed if not referenced.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { Box, Layers, Settings, Plug, Zap } from 'lucide-react';

// 🏗️ DI System Visualizer

export default function DiDemo() {
    const [plugins, setPlugins] = useState([
        { id: 1, name: 'LoggerPlugin', active: true },
        { id: 2, name: 'AuthPlugin', active: true },
        { id: 3, name: 'CachePlugin', active: false },
    ]);
    const [logs, setLogs] = useState([]);

    const togglePlugin = (id) => {
        setPlugins(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
        setLogs(prev => [...prev, \`DI Container: Re-calculating providers...\`]);
    };

    const runUse = async () => {
        setLogs([]);
        const activePlugins = plugins.filter(p => p.active);
        
        setLogs(prev => [...prev, \`System: Requesting InjectionToken<PLUGIN_List>\`]);
        await wait(500);
        
        if (activePlugins.length === 0) {
            setLogs(prev => [...prev, \`DI: Found 0 providers. Returning empty array.\`]);
        } else {
            setLogs(prev => [...prev, \`DI: Found \${activePlugins.length} providers (multi: true).\`]);
            for (const p of activePlugins) {
                await wait(400);
                setLogs(prev => [...prev, \`DI: Instantiating \${p.name}...\`]);
            }
            await wait(400);
            setLogs(prev => [...prev, \`System: Ready to use plugins.\`]);
        }
    };

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-red-500">🏗️</span> Dependency Injection
                </h3>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Configuration */}
                <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-gray-500 uppercase text-xs mb-4 flex items-center gap-2">
                        <Settings size={14} /> App Configuration (providers)
                    </div>
                    
                    <div className="space-y-2">
                        {plugins.map(p => (
                            <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                                <span className={p.active ? "font-bold text-gray-800 dark:text-white" : "text-gray-400 line-through"}>
                                    {p.name}
                                </span>
                                <button 
                                    onClick={() => togglePlugin(p.id)}
                                    className={\`w-10 h-6 rounded-full p-1 transition-colors \${p.active ? 'bg-green-500' : 'bg-gray-300 dark:bg-slate-600'}\`}
                                >
                                    <div className={\`w-4 h-4 bg-white rounded-full transition-transform \${p.active ? 'translate-x-4' : 'translate-x-0'}\`}></div>
                                </button>
                            </div>
                        ))}
                    </div>
                     
                    <div className="mt-6 text-xs text-gray-400 bg-gray-100 dark:bg-black p-4 rounded font-mono">
                        providers: [<br/>
                        {plugins.map(p => (
                            <div key={p.id} className={p.active ? 'text-green-600 dark:text-green-400' : 'opacity-20'}>
                                &nbsp;&nbsp;{'{'} provide: PLUGINS, useClass: {p.name}, multi: true {'}'},
                            </div>
                        ))}
                        ]
                    </div>
                </div>

                {/* Execution */}
                <div className="flex-1 flex flex-col gap-4">
                     <button 
                        onClick={runUse}
                        className="p-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                        <Zap size={20} /> Run Application
                    </button>

                    <div className="flex-1 bg-black rounded-xl p-6 font-mono text-xs overflow-y-auto h-[300px]">
                        <div className="text-gray-500 border-b border-gray-800 pb-2 mb-4 uppercase font-bold">Injector Logs</div>
                        <div className="space-y-2">
                            {logs.map((log, i) => (
                                <div key={i} className="animate-in slide-in-from-left-2 text-green-400">
                                    &gt; {log}
                                </div>
                            ))}
                            {logs.length === 0 && <span className="text-gray-600">Waiting for bootstrap...</span>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
`
};
