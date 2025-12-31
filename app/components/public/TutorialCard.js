"use client";
import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import TutorialGraphics from './TutorialGraphics';

export default function TutorialCard({ tutorial, index }) {
    return (
        <Link
            href={`/blogs/${tutorial.slug}`}
            className="group relative flex flex-col h-full bg-white dark:bg-[#0a0a0a] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2"
        >
            {/* Image / Thumbnail Container */}
            <div className="relative h-64 overflow-hidden">
                <TutorialGraphics slug={tutorial.slug} tags={tutorial.tags} image={tutorial.image} />

                {/* Categories Badge */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                        {tutorial.tags?.[0] || 'Guide'}
                    </span>
                    {tutorial.type === 'static' && (
                        <span className="backdrop-blur-md bg-brand-primary/80 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                            Premium
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 flex flex-col">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5 text-brand-primary" />
                        <span>{tutorial.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <span className={`w-2 h-2 rounded-full ${tutorial.difficulty === 'Expert' ? 'bg-red-500' : tutorial.difficulty === 'Advanced' ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                        <span>{tutorial.difficulty || 'Intermediate'}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span>{tutorial.formattedDate}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                    {tutorial.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {tutorial.description}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-dark-700 dark:to-dark-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                {tutorial.author?.[0] || 'A'}
                            </div>
                        </div>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{tutorial.author}</span>
                    </div>

                    <span className="flex items-center gap-2 text-brand-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                        Read Now <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
