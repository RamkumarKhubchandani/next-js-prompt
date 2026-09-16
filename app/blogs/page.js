import Link from 'next/link';
import { getAllTutorials } from '../lib/tutorials';
import { Search, BookOpen, Sparkles } from 'lucide-react';
import TutorialCard from '../components/public/TutorialCard';
import TutorialsBrowser from '../components/public/TutorialsBrowser';
import { BlogBottomCTA } from '../components/public/BlogMentorshipCTA';

export const metadata = {
    title: 'Tutorials & Guides | Master Modern Development',
    description: 'Deep dive tutorials, interactive guides, and expert articles on React, Next.js, and Modern Web Development.',
    alternates: {
        canonical: 'https://www.outlinedev.com/blogs',
    }
};

export default async function TutorialsPage() {
    const tutorials = await getAllTutorials();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030303] selection:bg-brand-primary selection:text-white pb-20 overflow-x-hidden relative">

            {/* Premium Background Pattern - Dot Grid (High Contrast) */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px'
                }}>
            </div>
            {/* Dark Mode Dot Grid Override */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] hidden dark:block"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px'
                }}>
            </div>

            {/* Background Ambient Glows */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]"></div>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 pt-24 pb-12 px-4 md:px-12 w-full">
                <div className="w-full max-w-7xl mx-auto text-center flex flex-col items-center">

                    {/* Badge - Larger & Vibrant "Wow" */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-brand-primary/10 border border-purple-200 dark:border-purple-500/30 mb-8 shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-md hover:scale-105 transition-transform duration-300 cursor-default">
                        <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
                        <span className="text-sm font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                            Premium Engineering Guides
                        </span>
                    </div>

                    {/* Title - Single Line & Vibrant */}
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-tight drop-shadow-sm whitespace-nowrap">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">Craftsmanship</span>
                        <span className="text-slate-800 dark:text-slate-200 mx-4">in</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">Code.</span>
                    </h1>

                    {/* Description - Single Line */}
                    <p className="w-full max-w-none text-xl text-slate-600 dark:text-slate-400 mb-12 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                        Master modern web development. No fluff, just <span className="text-slate-900 dark:text-slate-100 font-bold">production-grade mental models</span>.
                    </p>

                    {/* Search Bar - Tighter fit */}
                    <div className="w-full max-w-2xl relative group z-20">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary via-purple-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative flex items-center bg-white dark:bg-[#0a0a0a] rounded-lg shadow-xl border border-slate-200 dark:border-white/10">
                            <Search className="ml-5 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search 'React Server Components'..."
                                className="w-full bg-transparent border-none focus:ring-0 p-4 text-base text-slate-900 dark:text-white placeholder-slate-400 font-medium"
                            />
                            <div className="mr-3 hidden sm:block">
                                <kbd className="px-2 py-1 bg-slate-100 dark:bg-[#1a1a1a] rounded text-[10px] text-slate-500 font-bold font-sans border border-slate-200 dark:border-white/5">CMD+K</kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Client Browser with Filtering */}
            <div className="relative z-10 w-full">
                <TutorialsBrowser tutorials={tutorials} />
            </div>

            {/* Bottom 1:1 Mentorship & Job Support Banner */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 mt-12">
                <BlogBottomCTA tutorialTitle="Full Stack & Modern Frontend Engineering" tags={["Full Stack", "React", "Node.js", "TypeScript"]} />
            </div>
        </div>
    );
}