"use client";
import React from 'react';

export default function TutorialGraphics({ slug, tags, image }) {
    if (image) {
        return (
            <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                <img
                    src={image}
                    alt={slug}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
        );
    }

    if (slug === 'react-server-components') {
        return <RscGraphic />;
    }
    if (slug === 'nextjs-15-app-router') {
        return <AppRouterGraphic />;
    }
    if (slug === 'zustand-state-management') {
        return <BearGraphic />;
    }
    if (slug === 'react-performance-optimization') {
        return <PerformanceGraphic />;
    }
    if (slug === 'typescript-advanced-patterns') {
        return <TSGraphic />;
    }
    if (slug === 'framer-motion-animations') {
        return <FramerGraphic />;
    }
    if (slug === 'react-query-masterclass') {
        return <QueryGraphic />;
    }
    if (slug === 'tailwind-architecture') {
        return <TailwindGraphic />;
    }
    if (slug === 'shadcn-ui-guide') {
        return <ShadcnGraphic />;
    }
    if (slug === 'ai-sdk-integration') {
        return <AiGraphic />;
    }
    if (slug === 'death-of-usememo') {
        return <DeathGraphic />;
    }
    if (slug === 'beyond-useeffect') {
        return <BeyondEffectGraphic />;
    }
    if (slug === 'activity-component') {
        return <ActivityGraphic />;
    }
    if (slug === 'ai-orchestrators') {
        return <AiOrchestratorGraphic />;
    }
    if (slug === 'partial-prerendering') {
        return <PPRGraphic />;
    }
    if (slug === 'react-vs-signals') {
        return <SignalGraphic />;
    }
    if (slug === 'mastering-useoptimistic') {
        return <OptimisticGraphic />;
    }
    if (slug === 'virtual-dom-dead') {
        return <VDomDeadGraphic />;
    }
    if (slug === 'react-micro-frontends') {
        return <MicroFrontendGraphic />;
    }
    if (slug === 'angular-ssr-nitro') {
        return <NitroGraphic />;
    }
    if (slug === 'temporal-api-js') {
        return <TemporalGraphic />;
    }



    // Generic/Tag based fallbacks AFTER specific slugs
    if (slug === 'mastering-useeffect' || tags?.includes('React')) {
        return <ReactUseEffectGraphic />;
    }

    return <GenericGraphic />;
}

// ... Keep existing graphics ...

function ReactUseEffectGraphic() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900 relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/30 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 flex items-center justify-center">
                <div className="absolute w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20"></div>
            </div>
            <div className="absolute w-36 h-12 border border-cyan-300/40 rounded-[50%] animate-[spin_4s_linear_infinite] group-hover:border-cyan-300/60 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]"><div className="absolute top-[3px] left-3 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_10px_#22d3ee]"></div></div>
            <div className="absolute w-36 h-12 border border-cyan-300/40 rounded-[50%] animate-[spin_4s_linear_infinite_reverse] rotate-60 group-hover:border-cyan-300/60 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]"><div className="absolute bottom-[3px] right-3 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_10px_#22d3ee]"></div></div>
            <div className="absolute w-36 h-12 border border-cyan-300/40 rounded-[50%] animate-[spin_5s_linear_infinite] -rotate-60 group-hover:border-cyan-300/60 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]"><div className="absolute top-[3px] right-5 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_10px_#22d3ee]"></div></div>
        </div>
    );
}

function RscGraphic() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-blue-900 relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px]"></div>
            <div className="relative z-10 flex flex-col gap-2 transform group-hover:-translate-y-2 transition-transform duration-500">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-20 h-4 bg-blue-500/20 border border-blue-400/50 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center px-2 gap-1.5 backdrop-blur-md">
                        <div className={`w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_#60a5fa] ${i === 1 ? 'animate-pulse' : ''}`}></div>
                        <div className="w-1 h-1 rounded-full bg-blue-400/50"></div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-6 w-full flex justify-center gap-8">
                <div className="w-0.5 h-12 bg-gradient-to-t from-transparent to-blue-400/50"></div>
                <div className="w-0.5 h-12 bg-gradient-to-t from-transparent to-blue-400/50 delay-75"></div>
            </div>
        </div>
    );
}

function AppRouterGraphic() {
    return (
        <div className="w-full h-full bg-[#111] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10 flex flex-col gap-4 transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500">
                <div className="w-48 bg-[#222] border border-slate-700 rounded-lg p-3 shadow-2xl flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono border-b border-slate-700 pb-2"><span>📁</span> app</div>
                    <div className="flex items-center gap-2 bg-[#000] p-1.5 rounded border border-yellow-500/30 text-yellow-500/80 text-xs font-mono shadow-lg"><span>📄</span> page.js</div>
                </div>
                <div className="w-40 ml-12 -mt-4 bg-[#222] border border-slate-700 rounded-lg p-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-2 backdrop-blur-xl animate-bounce-slow">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono border-b border-slate-700 pb-2"><span>📁</span> dashboard</div>
                    <div className="flex items-center gap-2 bg-[#000] p-1.5 rounded border border-cyan-500/30 text-cyan-500/80 text-xs font-mono"><span>📄</span> page.js</div>
                </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-yellow-500/10 rounded-full blur-[60px]"></div>
        </div>
    );
}

function BearGraphic() {
    return (
        <div className="w-full h-full bg-[#2a1b0a] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-yellow-900/40 to-transparent"></div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 w-44 h-40 transform group-hover:scale-110 transition-transform duration-500">
                <div className="absolute -top-4 -left-2 w-16 h-16 bg-yellow-600 rounded-full"></div>
                <div className="absolute -top-4 -right-2 w-16 h-16 bg-yellow-600 rounded-full"></div>
                <div className="absolute inset-0 bg-yellow-500 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center border-4 border-yellow-600/30">
                    <div className="flex gap-12 mb-4">
                        <div className="w-4 h-4 bg-black rounded-full animate-blink"></div>
                        <div className="w-4 h-4 bg-black rounded-full animate-blink"></div>
                    </div>
                    <div className="w-16 h-12 bg-yellow-200 rounded-full flex items-center justify-center"><div className="w-6 h-4 bg-black rounded-full mt-[-8px]"></div></div>
                </div>
            </div>
        </div>
    );
}

function PerformanceGraphic() {
    return (
        <div className="w-full h-full bg-[#0f172a] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent to-[#0f172a]"></div>
            <div className="relative z-10 w-48 h-24 overflow-hidden">
                <div className="w-48 h-48 rounded-full border-[12px] border-slate-700 border-t-emerald-500 border-r-emerald-400 rotate-[-45deg] shadow-[0_0_30px_rgba(16,185,129,0.4)]"></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-24 bg-red-500 origin-bottom shadow-lg rotate-[45deg] group-hover:rotate-[80deg] transition-transform duration-1000 ease-out z-20 rounded-full"></div>
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-200 rounded-full z-30 shadow-xl border-4 border-slate-700"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
        </div>
    );
}

function TSGraphic() {
    return (
        <div className="w-full h-full bg-[#1e3a8a] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="relative w-32 h-32 perspective-[1000px]">
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-400 rounded-full animate-[bounce_3s_infinite] shadow-[0_0_15px_#60a5fa]"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-4 border-blue-300 rotate-45 animate-[bounce_4s_infinite] delay-75 shadow-[0_0_15px_#93c5fd]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-black text-white/20 select-none">&lt;T&gt;</div>
            </div>
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
        </div>
    );
}

function FramerGraphic() {
    return (
        <div className="w-full h-full bg-[#27004d] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#a855f7_0,transparent_100%)] opacity-20"></div>
            <svg className="absolute w-full h-full text-purple-500/30" viewBox="0 0 100 100"><path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
            <div className="relative z-10 w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.5)] transform group-hover:rotate-12 transition-transform duration-500">
                <div className="w-0 h-0 border-l-[15px] border-l-purple-600 border-y-[10px] border-y-transparent ml-2"></div>
            </div>
            <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-pink-500 rounded-full blur-sm animate-[ping_2s_infinite]"></div>
            <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full blur-sm animate-[ping_3s_infinite] delay-300"></div>
        </div>
    );
}

function QueryGraphic() {
    return (
        <div className="w-full h-full bg-[#ff4154] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffde59_0,transparent_100%)] opacity-20"></div>
            <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white/30 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <div className="w-20 h-2 bg-white rounded-full absolute rotate-45"></div>
                <div className="w-2 h-20 bg-white rounded-full absolute rotate-45"></div>
                <div className="absolute inset-0 rounded-full border-t-4 border-yellow-300 animate-spin"></div>
            </div>
            <div className="absolute bottom-4 text-white/50 font-black text-6xl opacity-20 select-none">CACHE</div>
        </div>
    );
}

function TailwindGraphic() {
    return (
        <div className="w-full h-full bg-[#06b6d4] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="grid grid-cols-3 gap-2 transform rotate-12 opacity-80">
                <div className="w-16 h-16 bg-white/20 rounded-xl backdrop-blur-md border border-white/30"></div>
                <div className="w-16 h-16 bg-white/40 rounded-xl backdrop-blur-md border border-white/30 animate-pulse"></div>
                <div className="w-16 h-16 bg-white/20 rounded-xl backdrop-blur-md border border-white/30"></div>
                <div className="w-16 h-16 bg-white/60 rounded-xl backdrop-blur-md border border-white/30 shadow-2xl"></div>
                <div className="w-16 h-16 bg-white/20 rounded-xl backdrop-blur-md border border-white/30"></div>
                <div className="w-16 h-16 bg-white/10 rounded-xl backdrop-blur-md border border-white/30"></div>
            </div>
        </div>
    );
}

function ShadcnGraphic() {
    return (
        <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            {/* Blueprint Grid */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative z-10 flex flex-col gap-4 transform -skew-y-6 -skew-x-6 hover:skew-0 transition-transform duration-500">
                <div className="w-48 h-12 bg-white rounded-md shadow-[4px_4px_0_#333] border border-slate-700 flex items-center px-4 font-mono text-xs text-slate-800 font-bold">Button</div>
                <div className="w-48 h-32 bg-white rounded-md shadow-[4px_4px_0_#333] border border-slate-700 p-3">
                    <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="w-2/3 h-4 bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
    );
}

function AiGraphic() {
    return (
        <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-black"></div>

            {/* Neural Network Nodes */}
            <div className="relative z-10 w-48 h-48">
                <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-white/20 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_40px_white] animate-pulse"></div>

                {/* Rays */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                    <div key={deg} className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-gradient-to-r from-white to-transparent origin-left" style={{ transform: `rotate(${deg}deg)` }}></div>
                ))}
            </div>
        </div>
    );
}


function DeathGraphic() {
    return (
        <div className="w-full h-full bg-[#000000] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* The Compiler Core */}
            <div className="relative z-10 w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl animate-pulse"></div>
                {/* Spinning Rings */}
                <div className="absolute w-full h-full border-2 border-purple-500/30 rounded-full animate-[spin_8s_linear_infinite]"></div>
                <div className="absolute w-3/4 h-3/4 border-2 border-pink-500/30 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>

                {/* The Core */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.6)] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    {/* Trash icon representing useMemo's death */}
                    <div className="text-white/80 font-black text-xl z-20">🗑️</div>
                </div>
            </div>

            {/* Particles being sucked in */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-600 rounded-full animate-ping opacity-50"></div>
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-gray-600 rounded-full animate-ping delay-300 opacity-50"></div>

            {/* Ambient Glow */}
            <div className="absolute -bottom-10 w-full h-32 bg-purple-900/40 blur-[60px]"></div>
        </div>
    );
}


function BeyondEffectGraphic() {
    return (
        <div className="w-full h-full bg-[#18181b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/30 to-purple-900/30"></div>
            {/* Broken Chain / Logic Separation */}
            <div className="relative z-10 flex gap-4 items-center">
                <div className="w-20 h-20 bg-pink-500/20 rounded-2xl border border-pink-500/50 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                    <div className="text-3xl animate-pulse">⚡️</div>
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-pink-500/50 to-blue-500/50 rounded-full"></div>
                <div className="w-20 h-20 bg-blue-500/20 rounded-2xl border border-blue-500/50 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    <div className="text-3xl">🧠</div>
                </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-zinc-500 tracking-widest uppercase">Decoupled</div>
        </div>
    );
}

function ActivityGraphic() {
    return (
        <div className="w-full h-full bg-[#0c4a6e] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/50 to-transparent"></div>

            {/* Stacked Cards */}
            <div className="relative z-10 w-40 h-48 perspective-[1000px]">
                <div className="absolute top-0 right-0 w-32 h-40 bg-cyan-700/40 rounded-xl border border-cyan-400/20 transform rotate-12 translate-x-8 -translate-y-4 backdrop-blur-sm"></div>
                <div className="absolute top-0 right-0 w-32 h-40 bg-cyan-600/60 rounded-xl border border-cyan-400/30 transform rotate-6 translate-x-4 -translate-y-2 backdrop-blur-md"></div>
                <div className="absolute top-0 right-0 w-32 h-40 bg-cyan-500/80 rounded-xl border border-cyan-400/50 shadow-2xl flex flex-col p-2 space-y-2 backdrop-blur-xl transform transition-transform group-hover:-translate-y-2">
                    <div className="w-20 h-2 bg-white/50 rounded-full"></div>
                    <div className="w-full h-24 bg-gradient-to-br from-white/10 to-transparent rounded-lg border border-white/10"></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full absolute -bottom-4 -right-4 shadow-[0_0_20px_#4ade80] flex items-center justify-center text-black font-bold text-xs">ON</div>
                </div>
            </div>
        </div>
    );
}

function AiOrchestratorGraphic() {
    return (
        <div className="w-full h-full bg-[#2e1065] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#a78bfa_0,transparent_70%)] opacity-20"></div>

            {/* Neural Connection */}
            <div className="relative z-10 w-64 h-32 flex items-center justify-center">
                {/* Central Brain/Model */}
                <div className="w-16 h-16 bg-violet-600 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.6)] flex items-center justify-center z-20 relative">
                    <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping"></div>
                    <span className="text-2xl">🤖</span>
                </div>

                {/* Nodes */}
                <div className="absolute top-0 left-10 w-12 h-8 bg-zinc-800 rounded border border-zinc-600 p-1 flex gap-1 items-center shadow-xl animate-[float_4s_infinite]">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="h-1 w-6 bg-zinc-600 rounded"></div>
                </div>
                <div className="absolute bottom-0 right-10 w-12 h-16 bg-zinc-800 rounded border border-zinc-600 p-1 shadow-xl animate-[float_5s_infinite_reverse]">
                    <div className="w-full h-full bg-zinc-700/50 rounded"></div>
                </div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-violet-400/50" fill="none">
                    <path d="M128,64 L50,20" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                    <path d="M128,64 L200,100" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_15s_linear_infinite]" />
                </svg>
            </div>
        </div>
    );
}


function PPRGraphic() {
    return (
        <div className="w-full h-full bg-[#0f172a] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f97316_0,transparent_50%)] opacity-20"></div>

            {/* Split Screen */}
            <div className="relative z-10 w-48 h-32 flex gap-2">
                {/* Static Part (Instantly Loaded) */}
                <div className="w-1/2 h-full bg-slate-800 rounded border border-slate-600 p-2 flex flex-col gap-2">
                    <div className="w-full h-2 bg-slate-600 rounded"></div>
                    <div className="w-3/4 h-2 bg-slate-600 rounded"></div>
                    <div className="mt-auto w-full h-8 bg-green-500/20 border border-green-500/50 rounded flex items-center justify-center text-[10px] text-green-400 font-mono">STATIC</div>
                </div>

                {/* Dynamic Part (Streaming) */}
                <div className="w-1/2 h-full bg-slate-900 rounded border border-dashed border-orange-500/50 p-2 flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/10 animate-pulse"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mx-auto mt-4"></div>
                    <div className="mt-auto w-full h-8 bg-orange-500/20 border border-orange-500/50 rounded flex items-center justify-center text-[10px] text-orange-400 font-mono">DYNAMIC</div>
                </div>
            </div>
        </div>
    );
}

function SignalGraphic() {
    return (
        <div className="w-full h-full bg-[#1c1917] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[60px]"></div>

            <div className="relative z-10 flex gap-8 items-center">
                {/* React Node */}
                <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center relative">
                    <div className="w-2 h-2 bg-blue-500 rounded-full absolute -top-1 left-1/2 -translate-x-1/2"></div>
                    <span className="text-blue-500 font-bold">R</span>
                </div>

                <div className="text-2xl font-black text-white/20">VS</div>

                {/* Signal Node */}
                <div className="w-16 h-16 rounded-md border-2 border-yellow-500 flex items-center justify-center relative bg-yellow-500/10">
                    <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full animate-bounce shadow-[0_0_15px_#facc15]"></div>
                    <span className="text-yellow-500 font-bold">S</span>
                    <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 100 100"><path d="M50,50 L100,0" stroke="#facc15" strokeWidth="2" strokeDasharray="4 4" /></svg>
                </div>
            </div>
        </div>
    );
}

function OptimisticGraphic() {
    return (
        <div className="w-full h-full bg-[#052e16] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#22c55e_0,transparent_60%)] opacity-20"></div>

            {/* The Magic Button */}
            <div className="relative z-10">
                <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_#22c55e] transform active:scale-95 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
                {/* Speed Lines */}
                <div className="absolute top-1/2 left-full w-20 h-1 bg-white/50 rounded-full blur-[1px]"></div>
                <div className="absolute top-1/4 left-full w-12 h-1 bg-white/30 rounded-full blur-[1px] ml-4"></div>
                <div className="absolute bottom-1/4 left-full w-16 h-1 bg-white/40 rounded-full blur-[1px] ml-2"></div>
            </div>
        </div>
    );
}

function VDomDeadGraphic() {
    return (
        <div className="w-full h-full bg-[#3f0c15] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/50 to-black"></div>

            {/* Tombstone */}
            <div className="relative z-10 w-40 h-56 bg-zinc-800 rounded-t-full border-4 border-zinc-700 flex flex-col items-center pt-8 shadow-2xl">
                <div className="text-zinc-500 font-serif text-3xl font-bold mb-2">RIP</div>
                <div className="text-zinc-600 font-mono text-sm mb-4">Virtual DOM</div>
                <div className="text-zinc-700 text-xs">2013 - 2026</div>

                <div className="mt-auto w-full h-1 bg-zinc-900"></div>
            </div>

            {/* Ghost Rising (The Compiler) */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-12 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-0 opacity-50 text-6xl animate-[float_6s_infinite]">👻</div>
        </div>
    );
}

function MicroFrontendGraphic() {
    return (
        <div className="w-full h-full bg-[#1e1b4b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4f46e5_0,transparent_70%)] opacity-20"></div>

            {/* Puzzle Pieces */}
            <div className="relative z-10 w-64 h-64 flex flex-wrap justify-center items-center gap-1 scale-75">
                <div className="w-20 h-20 bg-indigo-500 rounded-tl-2xl flex items-center justify-center shadow-lg transform hover:-translate-x-2 hover:-translate-y-2 transition-transform">
                    <span className="text-2xl">🛍️</span>
                </div>
                <div className="w-20 h-20 bg-blue-500 rounded-tr-2xl flex items-center justify-center shadow-lg transform hover:translate-x-2 hover:-translate-y-2 transition-transform">
                    <span className="text-2xl">👤</span>
                </div>
                <div className="w-20 h-20 bg-purple-500 rounded-bl-2xl flex items-center justify-center shadow-lg transform hover:-translate-x-2 hover:translate-y-2 transition-transform">
                    <span className="text-2xl">🔎</span>
                </div>
                <div className="w-20 h-20 bg-pink-500 rounded-br-2xl flex items-center justify-center shadow-lg transform hover:translate-x-2 hover:translate-y-2 transition-transform">
                    <span className="text-2xl">⚙️</span>
                </div>

                {/* Connection Lines (Federation) */}
                <div className="absolute inset-0 border-4 border-white/10 rounded-3xl animate-pulse pointer-events-none"></div>
            </div>
        </div>
    );
}

function GenericGraphic() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-violet-600 to-indigo-900 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/30 rounded-full blur-[60px]"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-[60px]"></div>
            <div className="relative w-24 h-24 border-2 border-white/20 rounded-2xl transform rotate-12 group-hover:rotate-45 transition-transform duration-700 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <div className="w-12 h-1.5 bg-white/40 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
            </div>
        </div>
    );
}

function NitroGraphic() {
    return (
        <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-black"></div>
            {/* Speed lines */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, #f97316 50px)' }}></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-orange-500 to-red-600 rounded-xl rotate-45 flex items-center justify-center shadow-[0_0_50px_#ea580c] animate-pulse">
                    <span className="text-4xl -rotate-45">🔥</span>
                </div>
                <div className="mt-8 text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 uppercase tracking-tighter">
                    NITRO
                </div>
            </div>
        </div>
    );
}

function TemporalGraphic() {
    return (
        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-slate-900"></div>

            {/* Clock Face Abstract */}
            <div className="relative z-10 w-40 h-40 rounded-full border-4 border-violet-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                {/* Hands */}
                <div className="w-16 h-1.5 bg-violet-400 rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 origin-left animate-[spin_10s_linear_infinite] shadow-[0_0_10px_#a78bfa]"></div>
                <div className="w-12 h-1.5 bg-purple-300 rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 origin-left rotate-90 animate-[spin_60s_linear_infinite]"></div>

                {/* Markers */}
                {[0, 90, 180, 270].map(d => (
                    <div key={d} className="absolute w-2 h-2 bg-white/50 rounded-full top-2 left-1/2 -translate-x-1/2 origin-[0_72px]" style={{ transform: `rotate(${d}deg)` }}></div>
                ))}

                {/* Center */}
                <div className="w-4 h-4 bg-white rounded-full z-20 shadow-lg relative">
                    <div className="absolute inset-0 bg-violet-500 rounded-full animate-ping opacity-75"></div>
                </div>
            </div>

            {/* Time Stream */}
            <div className="absolute bottom-4 left-0 w-full overflow-hidden whitespace-nowrap opacity-20 font-mono text-xs text-violet-300">
                <div className="animate-marquee">
                    2026-10-24T14:30:00+05:30 • 2026-10-24T14:30:01+05:30 • 2026-10-24T14:30:02+05:30
                </div>
            </div>
        </div>
    );
}
