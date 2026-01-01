'use client';

import { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import TutorialCard from './TutorialCard';
import { AnimatePresence, motion } from 'framer-motion';

export default function TutorialsBrowser({ tutorials }) {
    const [activeFilter, setActiveFilter] = useState('all');

    // Define categories
    const SECTIONS = [
        {
            id: 'javascript',
            title: 'Modern JavaScript',
            gradient: 'from-yellow-400 to-orange-500',
            description: 'Deep dives into ES2026, Patterns, and the Web Platform.',
            filter: (t) => t.category === 'JavaScript' || t.tags.includes('JavaScript')
        },
        {
            id: 'angular',
            title: 'Angular Renaissance',
            gradient: 'from-red-600 to-pink-600',
            description: 'Signals, Hydration, and the new Zoneless era.',
            filter: (t) => t.category === 'Angular' || t.tags.includes('Angular')
        },
        {
            id: 'nodejs',
            title: 'Node.js & Backend',
            gradient: 'from-green-600 to-emerald-400',
            description: 'Server-side runtimes, APIs, and Scaling.',
            filter: (t) => t.category === 'Node.js' || t.tags.includes('Node.js')
        },
        {
            id: 'react',
            title: 'React & Next.js',
            gradient: 'from-blue-500 to-cyan-400',
            description: 'Server Components, Hooks, and Advanced React Patterns.',
            filter: (t) => (t.category === 'React' || t.tags.some(tag => ['React', 'Next.js', 'React 19'].includes(tag))) && t.category !== 'JavaScript'
        },
        {
            id: 'ai',
            title: 'AI Engineering',
            gradient: 'from-violet-600 to-indigo-600',
            description: 'The new frontier. Generative UI, Agents, and Orchestration.',
            filter: (t) => t.tags.includes('AI Engineering') || t.tags.includes('Vercel AI SDK')
        },
        {
            id: 'architecture',
            title: 'Software Architecture',
            gradient: 'from-slate-600 to-gray-500',
            description: 'Design Patterns, Micro-Frontends, and System Design.',
            filter: (t) => t.tags.some(tag => ['Architecture', 'Micro-Frontends'].includes(tag))
        }
    ];

    // Distribute tutorials manually to prevent duplication across categories for the "All" view
    // AND to allow specific filtering when a category is selected.
    const categorizedData = useMemo(() => {
        // Tracker for unique IDs when viewing 'all'
        const assignedIds = new Set();

        const sectionsWithItems = SECTIONS.map(section => {
            // For the specific category view, we want ALL items that match the filter, 
            // even if they appear in other categories (though our filters are mutally exclusive-ish, it's safer).
            // BUT for the "All" view, we want to dedupe.
            // Let's create two lists: one for "All View" (deduped) and one for "Filtered View" (raw).

            const rawItems = tutorials.filter(section.filter);

            // For the 'All' view layout, we only take items not yet assigned
            const dedupedItems = rawItems.filter(t => !assignedIds.has(t._id));
            dedupedItems.forEach(t => assignedIds.add(t._id));

            return {
                ...section,
                rawItems,
                dedupedItems
            };
        });

        // Catch-all for 'misc'
        const remainingRaw = tutorials.filter(t => !SECTIONS.some(s => s.filter(t)));
        const remainingDeduped = tutorials.filter(t => !assignedIds.has(t._id));

        if (remainingRaw.length > 0) {
            sectionsWithItems.push({
                id: 'misc',
                title: 'More Guides',
                gradient: 'from-gray-500 to-slate-500',
                description: 'Additional resources and deep dives.',
                rawItems: remainingRaw,
                dedupedItems: remainingDeduped
            });
        }

        return sectionsWithItems;
    }, [tutorials]);

    return (
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 pb-24">

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
                <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${activeFilter === 'all'
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white shadow-lg scale-105'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-black/40 dark:text-slate-400 dark:border-white/10 dark:hover:border-white/20'
                        }`}
                >
                    All Guides
                </button>
                {categorizedData.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveFilter(section.id)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border relative overflow-hidden group ${activeFilter === section.id
                            ? 'text-white shadow-lg scale-105 border-transparent'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-black/40 dark:text-slate-400 dark:border-white/10 dark:hover:border-white/20'
                            }`}
                    >
                        {/* Interactive Gradient Background for Active State */}
                        {activeFilter === section.id && (
                            <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} -z-10`} />
                        )}
                        {section.title}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeFilter === 'all' ? (
                        // Render ALL Sections (Deduped)
                        categorizedData.map((section) => (
                            section.dedupedItems.length > 0 && (
                                <div key={section.id} className="mb-20">
                                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                                        <div>
                                            <h2 className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${section.gradient} mb-2 inline-block`}>
                                                {section.title}
                                            </h2>
                                            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                                                {section.description}
                                            </p>
                                        </div>
                                        <div className="hidden md:block text-sm font-bold text-gray-400 uppercase tracking-widest">
                                            {section.dedupedItems.length} {section.dedupedItems.length === 1 ? 'Guide' : 'Guides'}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
                                        {section.dedupedItems.map((tutorial, idx) => (
                                            <TutorialCard key={tutorial._id} tutorial={tutorial} index={idx} />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))
                    ) : (
                        // Render Single Section (Raw Items)
                        (() => {
                            const section = categorizedData.find(s => s.id === activeFilter);
                            if (!section || section.rawItems.length === 0) return (
                                <div className="text-center py-32 opacity-50">
                                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">No guides found in this category yet.</h3>
                                </div>
                            );

                            return (
                                <div>
                                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                                        <div>
                                            <h2 className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${section.gradient} mb-4 inline-block`}>
                                                {section.title}
                                            </h2>
                                            <p className="text-gray-500 dark:text-gray-400 text-xl font-medium max-w-2xl">
                                                {section.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
                                        {section.rawItems.map((tutorial, idx) => (
                                            <TutorialCard key={tutorial._id} tutorial={tutorial} index={idx} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })()
                    )}

                    {tutorials.length === 0 && (
                        <div className="text-center py-32 opacity-50">
                            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Coming Soon</h3>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
