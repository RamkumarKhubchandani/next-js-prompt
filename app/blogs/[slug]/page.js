import { notFound } from 'next/navigation';
import { getTutorialBySlug, getAllTutorials } from '../../lib/tutorials';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Share2, Tag, BookOpen } from 'lucide-react';
import SafeTiptapView from '../../components/public/SafeTiptapView'; // Reusing your existing component
import StaticHtmlContent from '../../components/public/StaticHtmlContent';
import { Sandpack } from "@codesandbox/sandpack-react";
import { dracula } from "@codesandbox/sandpack-themes";

// Update Metadata logic
export async function generateMetadata({ params }) {
    const { slug } = params;
    const tutorial = await getTutorialBySlug(slug);
    if (!tutorial) return { title: 'Not Found' };

    return {
        title: tutorial.title,
        description: tutorial.description,
        keywords: tutorial.keywords || tutorial.tags,
        openGraph: {
            title: tutorial.title,
            description: tutorial.description,
            type: 'article',
            publishedTime: tutorial.createdAt,
            authors: [tutorial.author],
            tags: tutorial.tags,
            images: [
                {
                    url: `https://asiofication.com/og/${tutorial.slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: tutorial.title,
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: tutorial.title,
            description: tutorial.description,
            creator: '@asiofication',
        }
    };
}

// Update Static Params Logic
export async function generateStaticParams() {
    const tutorials = await getAllTutorials();
    return tutorials
        .filter(t => t.type === 'static')
        .map((t) => ({
            slug: t.slug,
        }));
}

// Update Page Logic
export default async function TutorialPage({ params }) {
    const { slug } = params;
    const tutorial = await getTutorialBySlug(slug);

    if (!tutorial) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030303] selection:bg-brand-primary selection:text-white overflow-x-hidden relative">
            {tutorial.schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(tutorial.schema) }}
                />
            )}
            {/* ... backgrounds ... */}

            <div className="fixed inset-0 z-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px'
                }}>
            </div>

            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] hidden dark:block"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px'
                }}>
            </div>

            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[180px] opacity-40"></div>
            </div>

            <main className="relative z-10 w-full px-4 md:px-6 pb-12 md:pb-16 pt-24 md:pt-32">

                {/* Back Link Updated */}
                <div className="absolute top-24 left-4 md:left-8 z-20">
                    <Link href="/blogs" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-brand-primary hover:border-brand-primary/30 transition-all shadow-sm backdrop-blur-sm group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Guides
                    </Link>
                </div>

                {/* ... Header and Content ... */}

                <header className="w-full max-w-7xl mx-auto text-center mb-6">
                    {/* ... Same Header Content ... */}
                    <div className="flex justify-center gap-3 mb-4 flex-wrap">
                        {tutorial.tags.map((tag, index) => {
                            const colors = [
                                'bg-blue-600 text-white border-blue-400/20',
                                'bg-purple-600 text-white border-purple-400/20',
                                'bg-pink-600 text-white border-pink-400/20',
                                'bg-emerald-500 text-white border-emerald-400/20',
                                'bg-orange-500 text-white border-orange-400/20',
                                'bg-cyan-600 text-white border-cyan-400/20',
                                'bg-indigo-600 text-white border-indigo-400/20',
                            ];
                            const colorClass = colors[index % colors.length];

                            return (
                                <span key={tag} className={`px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest shadow-lg border transform hover:scale-105 transition-transform ${colorClass}`}>
                                    {tag}
                                </span>
                            );
                        })}
                    </div>

                    <div className="relative mb-4 flex justify-center items-center gap-4 overflow-visible px-4">
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight drop-shadow-2xl text-center">
                            <span className="text-slate-900 dark:text-white filter-none inline-block transform hover:scale-110 transition-transform">
                                {tutorial.title.split(' ')[0]}
                            </span>
                            {' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 pb-2">
                                {tutorial.title.split(' ').slice(1, -1).join(' ')}
                            </span>
                            {' '}
                            <span className="text-slate-900 dark:text-white filter-none inline-block transform hover:scale-110 transition-transform">
                                {tutorial.title.split(' ').slice(-1)}
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-12 text-base md:text-lg font-medium text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-primary to-cyan-400 p-[2px] shadow-lg shadow-brand-primary/30">
                                <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center font-bold text-slate-700 dark:text-white">
                                    {tutorial.author?.[0] || 'A'}
                                </div>
                            </div>
                            <span className="text-slate-900 dark:text-white font-bold tracking-tight">{tutorial.author}</span>
                        </div>
                        <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-brand-primary" /> {tutorial.formattedDate}</span>
                        <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-brand-primary" /> {tutorial.readTime}</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-8 w-full">
                    <article className="min-w-0 w-full">
                        <div className="bg-white/90 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-16 border border-white/20 dark:border-white/5 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                            <div className="prose dark:prose-invert prose-lg md:prose-2xl max-w-none 
                                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
                                prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:font-medium
                                prose-strong:font-black prose-strong:text-transparent prose-strong:bg-clip-text prose-strong:bg-gradient-to-r prose-strong:from-blue-600 prose-strong:to-purple-600 dark:prose-strong:from-cyan-400 dark:prose-strong:to-purple-400
                                prose-a:text-brand-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-brand-primary/80 
                                prose-a:text-brand-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-brand-primary/80 
                                prose-pre:bg-[#282a36] prose-pre:border prose-pre:border-white/10 prose-pre:shadow-2xl prose-pre:rounded-2xl
                                prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-slate-200 dark:prose-img:border-white/5
                                prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:font-medium
                                [&>*:first-child]:mt-0
                                ">
                                {tutorial.type === 'static' ? (
                                    <StaticHtmlContent content={tutorial.content} />
                                ) : (
                                    <SafeTiptapView content={tutorial.content} />
                                )}
                            </div>
                        </div>

                        {tutorial.code && (
                            <div className="mt-24 relative group" id="interactive-playground">
                                {/* ... Sandpack ... */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-purple-600 to-pink-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className="relative bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5">
                                    <div className="bg-white/5 p-6 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                            <span className="text-brand-primary text-2xl">⚡</span> Interactive Playground
                                        </h3>
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                        </div>
                                    </div>
                                    <Sandpack
                                        template="react"
                                        theme={dracula}
                                        files={{ "/App.js": tutorial.code }}
                                        options={{
                                            showNavigator: false,
                                            showLineNumbers: true,
                                            showTabs: false,
                                            editorHeight: 600,
                                            editorWidthPercentage: 55,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </article>

                    <aside className="hidden lg:block relative">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-white/80 dark:bg-dark-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-xl">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" /> On this page
                                </h4>
                                <nav className="flex flex-col gap-4 text-sm font-medium">
                                    {tutorial.toc ? (
                                        tutorial.toc.map((item) => (
                                            <a key={item.id} href={`#${item.id}`} className="text-slate-600 dark:text-slate-400 hover:text-brand-primary pl-3 border-l-2 border-transparent hover:border-brand-primary/30 transition-all block">
                                                {item.label}
                                            </a>
                                        ))
                                    ) : (
                                        <div className="text-slate-400 italic text-xs">No table of contents</div>
                                    )}
                                    {tutorial.code && (
                                        <a href="#interactive-playground" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary pl-3 border-l-2 border-transparent hover:border-brand-primary/30 transition-all block">
                                            Interactive Playground
                                        </a>
                                    )}
                                </nav>
                            </div>

                            <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/10 backdrop-blur-xl rounded-2xl p-6 border border-teal-100 dark:border-teal-800 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                                <h3 className="font-black text-teal-900 dark:text-teal-100 mb-4 flex items-center gap-2 text-sm uppercase tracking-widest relative z-10">
                                    <Share2 className="w-4 h-4" /> Share Guide
                                </h3>

                                <div className="grid grid-cols-2 gap-3 relative z-10">
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=Reading%20${encodeURIComponent(tutorial.title)}&url=https://asiofication.com/blogs/${tutorial.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/80 dark:bg-[#0a0a0a]/50 hover:bg-white dark:hover:bg-teal-900/30 text-slate-700 dark:text-teal-100 text-xs font-black py-3 rounded-xl transition-all border border-teal-200/50 dark:border-teal-700/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/10 flex items-center justify-center gap-2"
                                    >
                                        Twitter
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=https://asiofication.com/blogs/${tutorial.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/80 dark:bg-[#0a0a0a]/50 hover:bg-white dark:hover:bg-blue-900/30 text-slate-700 dark:text-blue-100 text-xs font-black py-3 rounded-xl transition-all border border-blue-200/50 dark:border-blue-700/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 flex items-center justify-center gap-2"
                                    >
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
