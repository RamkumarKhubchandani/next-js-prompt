export const angularMaterial3 = {
    title: "Angular Material 3: Theming with Tokens",
    description: "SCSS variables are out. CSS Custom Properties are in. Learn how Angular Material 3 uses Design Tokens to enable dynamic runtime theming and Dark Mode.",
    slug: "angular-material-3",
    category: "Angular",
    type: "static",
    author: "UI Engineer",
    createdAt: new Date().toISOString(),
    readTime: "15 min read",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    tags: ["Angular", "Material Design", "Theming", "CSS Variables", "Design Tokens"],
    keywords: ["Angular Material 3", "M3 Theming", "Design Tokens", "CSS Variables", "Dark Mode Angular"],
    toc: [
        { id: "scss-vs-css", label: "01. SCSS vs CSS" },
        { id: "tokens", label: "02. Design Tokens" },
        { id: "dynamic-theme", label: "03. Dynamic Theming" },
        { id: "senior-take", label: "04. Senior Engineer's Take" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. SCSS vs CSS -->
        <section id="scss-vs-css" class="scroll-mt-32">
             <div class="border-l-8 border-pink-600 bg-pink-50 dark:bg-pink-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    M3 is not just a redesign.
                </h1>
                <p class="text-xl md:text-2xl text-pink-800 dark:text-pink-200 font-light leading-relaxed">
                    Angular Material 2 relied on static SCSS compilation. If you wanted "Dark Mode", you had to generate a second CSS file or duplicate classes.
                    <br/><br/>
                    <strong>Material 3</strong> is built on <strong>CSS Custom Properties (Tokens)</strong>. You change one variable in JS, and the entire app updates instantly.
                </p>
             </div>
        </section>

        <!-- 02. Tokens -->
        <section id="tokens" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">02.</span>
                --md-sys-color-primary
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    The new system exposes semantic tokens. You don't use "Blue-500". You use "Primary", "On-Primary", "Surface-Container".
                </p>
            </div>
            <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 font-mono text-sm leading-relaxed overflow-x-auto">
                 <div class="text-gray-400 mb-2">// globals.css</div>
                 <div class="text-purple-400">:root</div> {'{'} <br/>
                 &nbsp;&nbsp;<span class="text-green-400">--md-sys-color-primary</span>: #6750A4; <br/>
                 &nbsp;&nbsp;<span class="text-green-400">--md-sys-color-on-primary</span>: #FFFFFF; <br/>
                 {'}'} <br/><br/>
                 <div class="text-gray-500">// Dark Mode Override</div>
                 <div class="text-purple-400">body.dark</div> {'{'} <br/>
                 &nbsp;&nbsp;<span class="text-green-400">--md-sys-color-primary</span>: #D0BCFF; <br/>
                 {'}'}
            </div>
            <div class="bg-pink-900/10 border-l-4 border-pink-500 p-6 mt-6">
                 <h4 class="font-bold text-pink-800 dark:text-pink-200 mb-2">Deep Dive: HCT Color Space</h4>
                 <p class="text-gray-700 dark:text-gray-300 text-sm">
                     Material 3 isn't just random hex codes. It uses the <strong>HCT (Hue Chroma Tone)</strong> color space.
                     <br/>
                     This mathematically guarantees contrast. "Tone 40" text on "Tone 90" background <em>always</em> meets WCAG AA standards, regardless of the Hue (Blue, Red, or Green).
                 </p>
            </div>
        </section>

        <!-- 04. Senior Take -->
        <section id="senior-take" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">04.</span>
                The Senior Engineer's Take
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-pink-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">White Labeling Dream</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    If you build B2B apps, M3 is a lifesaver. You can fetch a customer's specific brand color from the backend and set it via <code>document.body.style.setProperty()</code> on load. 
                    <br/><br/>
                    The entire Material library (Buttons, Inputs, Checkboxes) will respect that runtime value.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState } from 'react';

// 🎨 Theme Visualizer

export default function ThemeDemo() {
    const [isDark, setIsDark] = useState(false);
    const [primary, setPrimary] = useState('#6366f1'); // Default Indigo
    
    // Simulate runtime token application
    const style = {
        '--app-primary': primary,
        '--app-bg': isDark ? '#0f172a' : '#ffffff',
        '--app-text': isDark ? '#ffffff' : '#0f172a',
        '--app-surface': isDark ? '#1e293b' : '#f1f5f9',
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl" style={style}>
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="text-pink-500">🎨</span> Material 3 Tokens
                </h3>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Controls */}
                <div className="w-full md:w-1/3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="mb-6">
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-3">Mode</label>
                        <div className="flex gap-2">
                            <button onClick={() => setIsDark(false)} className={\`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 \${!isDark ? 'bg-gray-200 dark:bg-slate-700 font-bold' : 'border border-gray-200 dark:border-slate-700'}\`}>
                                <span>☀️</span> Light
                            </button>
                            <button onClick={() => setIsDark(true)} className={\`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 \${isDark ? 'bg-gray-200 dark:bg-slate-700 font-bold' : 'border border-gray-200 dark:border-slate-700'}\`}>
                                <span>🌙</span> Dark
                            </button>
                        </div>
                    </div>

                    <div>
                         <label className="text-xs font-bold text-gray-500 uppercase block mb-3">Brand Color (--primary)</label>
                         <div className="grid grid-cols-4 gap-2">
                             {['#6366f1', '#ec4899', '#22c55e', '#eab308'].map(c => (
                                 <button 
                                    key={c}
                                    onClick={() => setPrimary(c)}
                                    className="aspect-square rounded-full border-2 border-white dark:border-slate-800 shadow relative transition-transform active:scale-90"
                                    style={{ backgroundColor: c }}
                                 >
                                     {primary === c && <span className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">✓</span>}
                                 </button>
                             ))}
                         </div>
                    </div>
                </div>

                {/* Preview App */}
                <div className="flex-1 rounded-2xl shadow-2xl p-6 border transition-colors duration-300" 
                     style={{ backgroundColor: 'var(--app-bg)', color: 'var(--app-text)', borderColor: 'var(--app-surface)' }}>
                    
                    <div className="flex items-center justify-between mb-8">
                        <div className="font-bold text-xl">My App</div>
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--app-primary)' }}></div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-xl transition-colors duration-300" style={{ backgroundColor: 'var(--app-surface)' }}>
                            <div className="font-bold mb-2">Primary Button</div>
                            <button className="px-4 py-2 rounded-lg text-white font-bold shadow-lg transition-all active:scale-95" style={{ backgroundColor: 'var(--app-primary)' }}>
                                Save Changes
                            </button>
                        </div>

                        <div className="p-4 rounded-xl transition-colors duration-300" style={{ backgroundColor: 'var(--app-surface)' }}>
                             <div className="font-bold mb-2">Tonal Button</div>
                             <div className="flex items-center gap-4">
                                <button className="px-4 py-2 rounded-lg font-bold" style={{ backgroundColor: 'var(--app-primary)', opacity: 0.2, color: 'var(--app-primary)' }}>
                                    Cancel
                                </button>
                                <span className="text-xs opacity-50">Background follows Primary with opacity</span>
                             </div>
                        </div>
                        
                        <div className="p-4 rounded-xl transition-colors duration-300" style={{ backgroundColor: 'var(--app-surface)' }}>
                             <div className="font-bold mb-2">Checkbox</div>
                             <div className="flex items-center gap-2">
                                 <div className="w-6 h-6 rounded flex items-center justify-center text-white" style={{ backgroundColor: 'var(--app-primary)' }}>
                                     <span>✓</span>
                                 </div>
                                 <span className="opacity-80">Agree to Terms</span>
                             </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
`
};
