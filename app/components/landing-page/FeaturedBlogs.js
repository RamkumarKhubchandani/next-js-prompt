'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Code2, Zap } from 'lucide-react';
import { useState } from 'react';

const featuredBlogs = [
    {
        slug: 'javascript-pipeline-operator',
        title: 'JavaScript Pipeline Operator',
        description: 'The |> operator that will change how you write JavaScript forever',
        category: 'JavaScript',
        gradient: 'from-yellow-400 via-orange-500 to-red-500',
        icon: '⚡',
        readTime: '8 min'
    },
    {
        slug: 'pattern-matching-js',
        title: 'Pattern Matching in JavaScript',
        description: 'Goodbye switch, hello clean code with the new pattern matching syntax',
        category: 'JavaScript',
        gradient: 'from-purple-400 via-pink-500 to-red-500',
        icon: '🎯',
        readTime: '15 min'
    },
    {
        slug: 'js-const-is-king',
        title: 'The Death of var and let',
        description: 'Why senior engineers use const for 99% of their declarations',
        category: 'JavaScript',
        gradient: 'from-indigo-400 via-purple-500 to-pink-600',
        icon: '👑',
        readTime: '10 min'
    }
];

export function FeaturedBlogs() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]" />

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
                        <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">Featured Content</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                        Level Up Your
                        <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                            JavaScript Skills
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Dive into cutting-edge tutorials that will transform the way you code
                    </p>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {featuredBlogs.map((blog, index) => (
                        <Link
                            key={blog.slug}
                            href={`/blogs/${blog.slug}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative"
                        >
                            {/* Glow Effect */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${blog.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500`} />

                            {/* Card */}
                            <div className="relative h-full bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                                {/* Icon */}
                                <div className="mb-6">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${blog.gradient} shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                        <span className="text-3xl">{blog.icon}</span>
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                                    <Code2 className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{blog.category}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                                    {blog.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                                    {blog.description}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 dark:text-gray-500">{blog.readTime} read</span>

                                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm group-hover:gap-4 transition-all duration-300">
                                        Read More
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>

                                {/* Hover Indicator */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${blog.gradient} opacity-0 group-hover:opacity-20 rounded-bl-full transition-opacity duration-500`} />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link
                        href="/blogs"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105"
                    >
                        <Zap className="w-5 h-5" />
                        Explore All Blogs
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Stats Bar */}
                <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            50+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Expert Tutorials
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                            10k+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Developers Learning
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                            100%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Free Forever
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
