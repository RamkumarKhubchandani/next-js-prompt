export const nodeSecurityFirst = {
    title: "Zero-Trust Node.js: Securing the Runtime",
    description: "By default, Node.js allows everything: network access, file system reads, process spawning. Learn how to use the new Permission Model to lock down your production apps.",
    slug: "node-security-first",
    category: "Node.js",
    type: "static",
    author: "Security Engineer",
    createdAt: new Date().toISOString(),
    readTime: "20 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2670&auto=format&fit=crop",
    tags: ["Node.js", "Security", "Zero Trust", "Permissions", "Hardening"],
    keywords: ["Node.js Permissions", "--allow-fs-read", "Zero Trust Architecture", "Secure Node.js", "Supply Chain Attacks"],
    toc: [
        { id: "default-insecure", label: "01. Default Insecure" },
        { id: "permission-model", label: "02. The Permission Model" },
        { id: "supply-chain", label: "03. Supply Chain Defense" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Default Insecure -->
        <section id="default-insecure" class="scroll-mt-32">
             <div class="border-l-8 border-green-600 bg-green-50 dark:bg-green-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "npm install malware"
                </h1>
                <p class="text-xl md:text-2xl text-green-800 dark:text-green-200 font-light leading-relaxed">
                    Historically, if you installed a package, it had the same rights as you. It could read your SSH keys, upload your <code>.env</code> file, and mine crypto.
                    <br/><br/>
                    Deno pioneered default security. Now, Node.js has caught up with the <strong>Permission Model</strong>.
                </p>
             </div>
        </section>

        <!-- 02. Permission Model -->
        <section id="permission-model" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-green-600 dark:text-green-500">02.</span>
                Locking it Down
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    You can now start Node with an "Allow List". Any action not explicitly allowed will throw a fatal error.
                </p>
            </div>
             <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2"># Run production with Least Privilege</div>
                 <span class="text-white">node</span> <br/>
                 &nbsp;&nbsp;<span class="text-yellow-400">--permission</span> <br/>
                 &nbsp;&nbsp;<span class="text-green-400">--allow-fs-read</span>="./config/*" <br/>
                 &nbsp;&nbsp;<span class="text-green-400">--allow-net</span>="api.stripe.com" <br/>
                 &nbsp;&nbsp;index.js
            </div>
             <div class="mt-4 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm border-l-4 border-red-500">
                ⚠️ If <code>index.js</code> tries to read <code>/etc/passwd</code>, it crashes immediately.
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-green-600 dark:text-green-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-green-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Defense in Depth</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Permissions aren't a silver bullet, but they drastically increase the cost of an attack. 
                    <br/><br/>
                    In 2026, running Node.js without permission flags in a banking or healthcare app is considered negligence.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';
import { Shield, ShieldAlert, FileText, Globe, Key, Lock } from 'lucide-react';

// 🔒 Security Simulator

export default function SecurityDemo() {
    const [policy, setPolicy] = useState('none'); // none | strict
    const [logs, setLogs] = useState([]);
    
    const addLog = (msg, success) => {
        setLogs(prev => [...prev.slice(-4), { msg, success, id: Math.random() }]);
    };
    
    const attemptAction = (action, scope) => {
        if (policy === 'none') {
            addLog(\`Allowed: \${action} to \${scope}\`, true);
        } else {
            // Strict Policy Rules
            let allowed = false;
            if (action === 'READ_FILE' && scope.includes('/app/config')) allowed = true;
            if (action === 'NET_REQ' && scope.includes('stripe.com')) allowed = true;
            
            if (allowed) {
                addLog(\`Allowed: \${action} to \${scope}\`, true);
            } else {
                addLog(\`BLOCKED: \${action} \${scope}\`, false);
            }
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="text-green-500">🔒</span> Zero-Trust Runtime
            </h3>

            <div className="flex flex-col md:flex-row gap-8">
            
                {/* Policy Toggle */}
                <div className="w-full md:w-1/3 space-y-4">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <label className="flex items-center justify-between cursor-pointer">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Strict Permissions</span>
                            <div 
                                onClick={() => { setPolicy(p => p === 'none' ? 'strict' : 'none'); setLogs([]); }}
                                className={\`w-14 h-8 rounded-full flex items-center p-1 transition-colors \${policy === 'strict' ? 'bg-green-500' : 'bg-gray-300'}\`}
                            >
                                <div className={\`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform \${policy === 'strict' ? 'translate-x-6' : 'translate-x-0'}\`}></div>
                            </div>
                        </label>
                        <div className="text-xs text-gray-500 mt-2">
                            {policy === 'strict' 
                                ? 'Flags: --allow-fs-read="./config" --allow-net="stripe.com"' 
                                : 'Flags: (None) - Full Access Granted'}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <button 
                            onClick={() => attemptAction('READ_FILE', '/app/config/settings.json')}
                            className="w-full text-left p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 transition flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-400"
                        >
                            <FileText size={16} /> Read Config (Valid)
                        </button>
                        <button 
                            onClick={() => attemptAction('NET_REQ', 'https://api.stripe.com/v1')}
                            className="w-full text-left p-3 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 transition flex items-center gap-2 text-sm font-bold text-green-700 dark:text-green-400"
                        >
                            <Globe size={16} /> Stripe API (Valid)
                        </button>
                         <button 
                            onClick={() => attemptAction('READ_FILE', '/etc/shadow')}
                            className="w-full text-left p-3 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 transition flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-400"
                        >
                            <Key size={16} /> Read /etc/shadow (Malware)
                        </button>
                         <button 
                            onClick={() => attemptAction('NET_REQ', 'http://hackerserver.com/leak')}
                            className="w-full text-left p-3 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 transition flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-400"
                        >
                            <Globe size={16} /> Exfiltrate Data (Malware)
                        </button>
                    </div>
                </div>

                {/* Simulated Runtime Console */}
                <div className="flex-1 bg-black rounded-xl p-6 font-mono text-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        {policy === 'strict' ? <Lock size={48} className="text-green-500" /> : <ShieldAlert size={48} className="text-red-500" />}
                    </div>
                    
                    <div className="text-gray-500 border-b border-gray-800 pb-2 mb-4">
                        root@node-server:~# node server.js {policy === 'strict' ? '--permission --allow...' : ''}
                    </div>

                    <div className="space-y-3">
                        {logs.map(log => (
                            <div key={log.id} className={log.success ? 'text-green-400' : 'text-red-500 bg-red-900/20 p-1 border-l-2 border-red-500'}>
                                {log.success ? '✓' : '✗'} [RUNTIME] {log.msg}
                                {!log.success && <div className="text-red-300 text-xs pl-4 mt-1">ERR_ACCESS_DENIED: Permission required but not granted.</div>}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
`
};
