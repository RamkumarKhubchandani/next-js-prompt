"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Tag, Lock } from 'lucide-react';

const TiptapView = dynamic(() => import('../components/public/TiptapView'), { ssr: false });

const categories = ["All", "JavaScript", "React", "Angular", "Vue", "Node.js", "MongoDB", "Python", "TypeScript", "HTML", "CSS", "Redux"];

function PremiumContentOverlay() {
    return (
        <div className="relative text-center flex flex-col items-center justify-center h-full">
            <div className="absolute inset-0 bg-dark-800/50 backdrop-blur-sm rounded-2xl"></div>
            <div className="relative z-10 p-8">
                <Lock className="mx-auto h-16 w-16 text-brand-primary mb-6" />
                <h2 className="text-3xl font-bold text-light-100 mb-4">Premium Content</h2>
                <p className="text-light-200 mb-8 max-w-sm">
                    This article is exclusive for our registered students. Please log in or create an account to unlock this post and many others.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/login">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full bg-brand-primary px-8 py-3 text-base font-semibold text-dark-900">
                            Log In
                        </motion.button>
                    </Link>
                    <Link href="/register">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full bg-dark-700 px-8 py-3 text-base font-semibold text-light-100">
                            Register
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default function TutorialsPage() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/posts');
                const data = await res.json();
                // Filter out posts that are missing required data for links
                const validPosts = data.filter(p => p.category && p.slug);
                setPosts(validPosts);
                setSelectedPost(data[0]);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = selectedCategory === 'All'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    const isPremiumAndLocked = selectedPost?.isPremium && !session;

    return (
        <div className="min-h-screen bg-dark-900 text-light-100">
            <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
                <aside className="col-span-1 bg-dark-800 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-6 text-light-100">Categories</h2>
                    <div className="space-y-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-brand-primary text-dark-900' : 'hover:bg-dark-700'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </aside>

                <nav className="col-span-3 border-l border-dark-700 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-6 text-light-100 flex items-center">
                        <BookOpen className="mr-3" />
                        Posts
                    </h2>
                    <div className="space-y-4">
                        {filteredPosts.map(post => (
                            <Link key={post._id} href={`/tutorials/${post.category}/${post.slug}`}>
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => setSelectedPost(post)}
                                    className="p-4 rounded-lg cursor-pointer border border-transparent hover:bg-dark-700"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-light-100">{post.title}</h3>
                                        {post.isPremium && <Lock size={14} className="text-brand-primary flex-shrink-0" />}
                                    </div>
                                    <div className="flex items-center text-xs text-light-300 mt-2">
                                        <Tag size={14} className="mr-2" />
                                        <span>{post.category}</span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
}