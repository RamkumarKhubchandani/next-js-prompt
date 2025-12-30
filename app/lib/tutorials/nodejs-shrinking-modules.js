export const nodejsShrinkingModules = {
    title: "The Shrinking node_modules: Why You Need Fewer Packages in 2026",
    description: "The 'heaviest object in the universe' is getting lighter. Node.js now natively supports many features we used to install npm packages for. Learn how to build lean, zero-dependency APIs.",
    slug: "nodejs-shrinking-modules",
    category: "Node.js",
    type: "static",
    author: "Backend Lead",
    createdAt: new Date().toISOString(),
    readTime: "18 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop",
    tags: ["Node.js", "Performance", "Dependencies", "Native Features", "Zero Dep"],
    keywords: ["node_modules", "Node.js Test Runner", "Node.js SQLite", "parseArgs", "Zero Dependency"],
    toc: [
        { id: "bloat", label: "01. The Dependency Hell" },
        { id: "test-runner", label: "02. Native Test Runner" },
        { id: "sqlite", label: "03. Native SQLite" },
        { id: "args", label: "04. Native Arg Parsing" },
        { id: "senior-view", label: "05. Senior Engineer's View" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Bloat -->
        <section id="bloat" class="scroll-mt-32">
             <div class="border-l-8 border-green-600 bg-green-50 dark:bg-green-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Uninstalling is the new Installing.
                </h1>
                <p class="text-xl md:text-2xl text-green-800 dark:text-green-200 font-light leading-relaxed">
                   We used to joke that <code>node_modules</code> was the heaviest object in the universe.
                    <br/><br/>
                    In 2026, Node.js has absorbed the most popular userland libraries into the core runtime. You no longer need <em>Jest, Mocha, Dotenv, Notebooks, or Nodemon</em>.
                </p>
             </div>
        </section>

        <!-- 02. Test Runner -->
        <section id="test-runner" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-green-600 dark:text-green-500">02.</span>
                Goodbye Jest. Hello node:test.
            </h2>
            <div class="bg-slate-900 p-6 rounded-xl mb-6 shadow-lg">
                <pre class="text-gray-300 text-sm font-mono overflow-x-auto">
import { test, describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('My API', () => {
  it('should return 200 OK', () => {
     const val = 1;
     assert.strictEqual(val, 1);
  });
});
                </pre>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
                Running tests is now as simple as <code>node --test</code>. No config files. No transpilers (if using native ESM). Instant startup.
            </p>
        </section>

        <!-- 03. SQLite -->
        <section id="sqlite" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-green-600 dark:text-green-500">03.</span>
                Database in the Core
            </h2>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                    <h3 class="text-xl font-bold text-red-700 dark:text-red-400 mb-4">Old Way (External)</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-2">npm install sqlite3 (C++ bindings...)</p>
                    <p class="text-gray-600 dark:text-gray-400 mb-2">npm install knex</p>
                    <p class="text-xs text-red-500 font-mono mt-4">Error: node-gyp rebuild failed...</p>
                </div>
                <div class="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                    <h3 class="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">New Way (Native)</h3>
                    <pre class="text-gray-700 dark:text-gray-300 font-mono text-sm leading-relaxed">
import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync(':memory:');
db.exec('CREATE TABLE users...');
                    </pre>
                </div>
            </div>
        </section>

        <!-- 05. Senior Engineer's View -->
        <section id="senior-view" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-green-600 dark:text-green-500">05.</span>
                The Senior Engineer's View
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-green-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Supply Chain Security</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    The biggest advantage of removing dependencies isn't just disk space—it's <strong>Security</strong>. 
                    <br/><br/>
                    Every package you add is a potential vector for a supply chain attack. Using native <code>node:</code> modules means you trust the Node.js signing key, not random maintainers on npm.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { Package, Trash2, ShieldCheck, Database, Terminal } from 'lucide-react';

// 📦 Node.js Core Visualizer

export default function NodeModulesDemo() {
    const [installed, setInstalled] = useState([
        { id: 'jest', name: 'jest', size: '25 MB', native: 'node:test', type: 'removed' },
        { id: 'dotenv', name: 'dotenv', size: '0.5 MB', native: 'node:env', type: 'removed' },
        { id: 'nodemon', name: 'nodemon', size: '3 MB', native: 'node --watch', type: 'removed' },
        { id: 'sqlite3', name: 'sqlite3', size: '12 MB', native: 'node:sqlite', type: 'removed' },
        { id: 'minimist', name: 'minimist', size: '0.2 MB', native: 'node:util', type: 'removed' },
        { id: 'axios', name: 'axios', size: '1.2 MB', native: 'fetch', type: 'removed' }
    ]);
    
    // Initial state: all present.
    // We want to animate their removal.
    
    const [projectSize, setProjectSize] = useState(42); // MB
    const [securityScore, setSecurityScore] = useState(60); // %

    const handleMigrate = (id) => {
        setInstalled(prev => prev.map(pkg => 
            pkg.id === id ? { ...pkg, type: 'migrated' } : pkg
        ));
        
        // Update stats
        const pkg = installed.find(p => p.id === id);
        const sizeVal = parseFloat(pkg.size);
        setProjectSize(s => Math.max(0, s - sizeVal));
        setSecurityScore(s => Math.min(100, s + 5));
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                     <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-green-600">🟢</span> Node.js Diet
                    </h3>
                    <p className="text-gray-500 mt-2">Replace userland bloat with Native Core modules.</p>
                </div>
                
                <div className="flex gap-6">
                    <div className="text-right">
                         <div className="text-xs font-bold text-gray-400 uppercase">Disk Usage</div>
                         <div className="text-3xl font-black text-gray-900 dark:text-white transition-all duration-500">
                             {projectSize.toFixed(1)} <span className="text-sm font-normal text-gray-500">MB</span>
                         </div>
                    </div>
                     <div className="text-right">
                         <div className="text-xs font-bold text-gray-400 uppercase">Trust Score</div>
                         <div className={\`text-3xl font-black transition-all duration-500 \${securityScore > 80 ? 'text-green-500' : 'text-orange-500'}\`}>
                             {securityScore}<span className="text-sm font-normal text-gray-500">%</span>
                         </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {installed.map((pkg) => {
                    const isMigrated = pkg.type === 'migrated';
                    return (
                        <div 
                            key={pkg.id} 
                            className={\`relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden \${
                                isMigrated 
                                ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30 opacity-80' 
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                            }\`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-100 dark:bg-black rounded-lg">
                                    <Package size={20} className={isMigrated ? 'text-green-500' : 'text-gray-500'} />
                                </div>
                                {!isMigrated && (
                                    <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full border border-red-200">
                                        Deprecated
                                    </span>
                                )}
                                {isMigrated && (
                                     <span className="text-xs font-bold bg-green-100 text-green-600 px-2 py-1 rounded-full border border-green-200 flex items-center gap-1">
                                        <ShieldCheck size={12} /> Native
                                    </span>
                                )}
                            </div>
                            
                            <h4 className="font-bold text-lg mb-1">{pkg.name}</h4>
                            <p className="text-xs text-gray-400 mb-6">{pkg.size}</p>
                            
                            {isMigrated ? (
                                <div className="text-sm text-green-700 dark:text-green-400 font-mono flex items-center gap-2">
                                    <Terminal size={14} /> {pkg.native}
                                </div>
                            ) : (
                                <button 
                                    onClick={() => handleMigrate(pkg.id)}
                                    className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                >
                                    <Trash2 size={14} /> Migrate to Native
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-900/30 text-center text-sm text-blue-800 dark:text-blue-300">
                💡 <strong className="font-bold">Did you know?</strong> Starting a Node.js process with zero external CJS dependencies can be up to 4x faster in cold start time.
            </div>
        </div>
    );
}
`
};
