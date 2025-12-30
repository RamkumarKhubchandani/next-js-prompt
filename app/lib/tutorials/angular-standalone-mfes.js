export const angularStandaloneMfes = {
    title: "Architecting Micro-Frontends with Angular Standalone Components",
    description: "NgModules are gone. Learn how to architect a scalable Module Federation setup using pure Standalone Components. The enterprise pattern for 2026.",
    slug: "angular-standalone-mfes",
    category: "Angular",
    type: "static",
    author: "Enterprise Architect",
    createdAt: new Date().toISOString(),
    readTime: "28 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
    tags: ["Angular", "Micro-Frontends", "Module Federation", "Standalone Components", "Architecture"],
    keywords: ["Module Federation", "Angular Standalone", "Enterprise Angular", "Microfrontends", "Nx"],
    toc: [
        { id: "legacy-vs-standalone", label: "01. Legacy vs Standalone" },
        { id: "federation-setup", label: "02. Federation Config" },
        { id: "communication", label: "03. Cross-MF Communication" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Legacy vs Standalone -->
        <section id="legacy-vs-standalone" class="scroll-mt-32">
             <div class="border-l-8 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Death to the NgModule.
                </h1>
                <p class="text-xl md:text-2xl text-indigo-800 dark:text-indigo-200 font-light leading-relaxed">
                    Micro-frontends used to be a nightmare of shared modules, scope collisions, and "entry components." 
                    <br/><br/>
                    With <strong>Standalone Components</strong>, a micro-frontend is just a URL that exports a single Component class. No modules. No boilerplate.
                </p>
             </div>
        </section>

        <!-- 02. Federation Config -->
        <section id="federation-setup" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">02.</span>
                Simplified Config
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Using modern builders (like native federation or Nx), exposing a standalone component is trivial.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// payment-mfe/federation.config.js</div>
                 <div class="text-blue-400">export default</div> {'{'} <br/>
                 &nbsp;&nbsp;name: <span class="text-green-400">'payment'</span>,<br/>
                 &nbsp;&nbsp;exposes: {'{'} <br/>
                 &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-green-400">'./Component'</span>: <span class="text-green-400">'./src/app/payment/payment.component.ts'</span> <br/>
                 &nbsp;&nbsp;{'}'} <br/>
                 {'}'}
            </div>
        </section>

        <!-- 03. Communication -->
        <section id="communication" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">03.</span>
                Communication Strategy
            </h2>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                    <h3 class="text-xl font-bold text-red-700 dark:text-red-400 mb-4">Don't: Shared Service</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Sharing a singleton state service between MFEs couples them during build time and can lead to version mismatches.
                    </p>
                </div>
                <div class="p-6 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
                    <h3 class="text-xl font-bold text-green-700 dark:text-green-400 mb-4">Do: Custom Events / Signals</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Use DOM Custom Events or a lightweight PubSub (window Signal) to dispatch actions like "PAYMENT_SUCCESS" that the Host listens to.
                    </p>
                </div>
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-indigo-600 dark:text-indigo-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-indigo-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">You probably don't need MFEs.</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Micro-frontends introduce massive operational complexity (deployment coordination, versioning). 
                    <br/><br/>
                    <strong>Only use this pattern if:</strong> You have multiple autonomous teams (20+ devs) effectively deploying to the same page separately. If you are one team, use a Modulith (Monorepo).
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { LayoutGrid, Box, ArrowLeftRight, Settings, CreditCard, ShoppingBag } from 'lucide-react';

// 🧊 Micro-Frontend Architect

export default function StandaloneMFEDemo() {
    const [selectedApp, setSelectedApp] = useState('host');

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="text-indigo-500">🧊</span> Federation Dashboard
            </h3>

            <div className="flex flex-col lg:flex-row gap-8">
            
                {/* Visual Architecture */}
                <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 relative">
                     <div className="text-xs font-bold text-gray-400 uppercase mb-4 text-center">Browser Window</div>
                     
                     <div className="border-4 border-dashed border-gray-300 dark:border-slate-700 rounded-xl p-8 min-h-[400px] relative">
                         <div className="absolute top-0 left-0 bg-gray-200 dark:bg-slate-800 px-4 py-1 text-xs font-bold rounded-br-xl text-gray-600 dark:text-gray-300">
                             HOST APP (Shell)
                         </div>
                         
                         <div className="mt-8 grid grid-cols-2 gap-8 h-full">
                             <div className="col-span-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-center justify-center h-24">
                                 <span className="font-bold text-blue-600 dark:text-blue-400">Host Navigation</span>
                             </div>

                             <div 
                                className="group relative bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900/50 min-h-[200px] flex items-center justify-center cursor-pointer hover:shadow-lg transition-all"
                                onClick={() => setSelectedApp('products')}
                             >
                                 <div className="text-center">
                                     <ShoppingBag size={32} className="mx-auto text-green-600 mb-2" />
                                     <div className="font-bold text-green-700 dark:text-green-400">Product MFE</div>
                                     <div className="text-xs text-green-600/60 mt-2">localhost:4201</div>
                                 </div>
                                 {selectedApp === 'products' && <div className="absolute inset-0 border-2 border-green-500 rounded-xl pointer-events-none"></div>}
                             </div>

                             <div 
                                className="group relative bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900/50 min-h-[200px] flex items-center justify-center cursor-pointer hover:shadow-lg transition-all"
                                onClick={() => setSelectedApp('payment')}
                             >
                                 <div className="text-center">
                                     <CreditCard size={32} className="mx-auto text-purple-600 mb-2" />
                                     <div className="font-bold text-purple-700 dark:text-purple-400">Payment MFE</div>
                                     <div className="text-xs text-purple-600/60 mt-2">localhost:4202</div>
                                 </div>
                                 {selectedApp === 'payment' && <div className="absolute inset-0 border-2 border-purple-500 rounded-xl pointer-events-none"></div>}
                             </div>
                         </div>
                     </div>
                </div>

                {/* Config Panel */}
                <div className="w-full lg:w-1/3 bg-slate-900 rounded-2xl p-6 text-slate-300 font-mono text-sm border border-slate-800 flex flex-col">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
                        <Settings size={18} />
                        <span className="font-bold">App Config</span>
                    </div>
                    
                    {selectedApp === 'host' && (
                        <div>
                            <div className="text-gray-500 mb-2">// Select a Micro-Frontend to view its Standalone Config</div>
                            <div className="text-center mt-10 opacity-50">Click blocks on left</div>
                        </div>
                    )}

                    {selectedApp === 'products' && (
                        <div className="animate-in fade-in slide-in-from-right-4">
                            <div className="text-green-400 mb-4 font-bold">Product MFE Config</div>
                            <span className="text-purple-400">@Component</span>({'{'} <br/>
                            &nbsp;&nbsp;standalone: <span className="text-yellow-400">true</span>,<br/>
                            &nbsp;&nbsp;selector: <span className="text-green-400">'product-list'</span>,<br/>
                            &nbsp;&nbsp;imports: [CommonModule] <br/>
                            {'}'}) <br/>
                            <span className="text-blue-400">export class</span> ProductListComponent {'{}'}
                            
                            <div className="mt-8 pt-4 border-t border-slate-800">
                                <span className="text-gray-500">// Exposed as remote</span><br/>
                                exposedModule: <span className="text-green-400">'./Component'</span>
                            </div>
                        </div>
                    )}
                    
                    {selectedApp === 'payment' && (
                        <div className="animate-in fade-in slide-in-from-right-4">
                            <div className="text-purple-400 mb-4 font-bold">Payment MFE Config</div>
                            <span className="text-purple-400">@Component</span>({'{'} <br/>
                            &nbsp;&nbsp;standalone: <span className="text-yellow-400">true</span>,<br/>
                            &nbsp;&nbsp;selector: <span className="text-green-400">'payment-widget'</span>,<br/>
                            &nbsp;&nbsp;imports: [StripeModule] <br/>
                            {'}'}) <br/>
                            <span className="text-blue-400">export class</span> PaymentComponent {'{}'}

                             <div className="mt-8 pt-4 border-t border-slate-800">
                                <span className="text-gray-500">// Exposed as remote</span><br/>
                                exposedModule: <span className="text-green-400">'./Widget'</span>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
`
};
