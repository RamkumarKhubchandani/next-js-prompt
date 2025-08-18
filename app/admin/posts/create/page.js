"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const SafeTiptapEditor = dynamic(() => import('../../../components/admin/SafeTiptapEditor'), { ssr: false });

const categories = ["JavaScript", "React", "Angular", "Vue", "Node.js", "MongoDB", "Python", "TypeScript", "HTML", "CSS", "Redux"];

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [error, setError] = useState('');
    const [isSeoOpen, setIsSeoOpen] = useState(false);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [isPremium, setIsPremium] = useState(false);
    const [content, setContent] = useState('');
    const editorRef = useRef(null); // Ref to access editor instance

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || !category) {
            setError('Title and category are required.');
            return;
        }

        if (editorRef.current) {
            const content = editorRef.current.getJSON();
            const seo = {
                metaTitle,
                metaDescription,
                keywords: keywords.split(',').map(k => k.trim()),
            };

            try {
                const res = await fetch('/api/admin/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content, category, seo, isPremium }),
                });

                if (res.ok) {
                    router.push('/admin');
                } else {
                    const data = await res.json();
                    setError(data.message || 'Failed to create post.');
                }
            } catch (err) {
                setError('An unexpected error occurred.');
            }
        }
    };


    return (
        <div className="min-h-screen bg-dark-900 text-light-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Create New Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-light-200 mb-2">
                                Post Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-dark-800 border-dark-700 text-light-100 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary"
                                placeholder="Enter a captivating title..."
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-light-200 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-dark-800 border-dark-700 text-light-100 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-light-200 mb-2">
                            Content
                        </label>
                        <div className="bg-dark-800 p-4 rounded-lg">
                            <SafeTiptapEditor
                                onEditorReady={(instance) => editorRef.current = instance}
                            />
                        </div>
                    </div>

                    <div className="bg-dark-800 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setIsSeoOpen(!isSeoOpen)}
                            className="w-full flex justify-between items-center p-4"
                        >
                            <span className="text-lg font-semibold">SEO Settings</span>
                            <motion.div animate={{ rotate: isSeoOpen ? 180 : 0 }}>
                                <ChevronDown />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {isSeoOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 border-t border-dark-700 space-y-4">
                                        {/* Meta Title */}
                                        <div>
                                            <label htmlFor="metaTitle" className="block text-sm font-medium text-light-200 mb-2">Meta Title</label>
                                            <input type="text" id="metaTitle" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full bg-dark-700 border-dark-600 text-light-100 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary" placeholder="Enter meta title..."/>
                                        </div>
                                        {/* Meta Description */}
                                        <div>
                                            <label htmlFor="metaDescription" className="block text-sm font-medium text-light-200 mb-2">Meta Description</label>
                                            <textarea id="metaDescription" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows="3" className="w-full bg-dark-700 border-dark-600 text-light-100 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary" placeholder="Enter meta description..."></textarea>
                                        </div>
                                        {/* Keywords */}
                                        <div>
                                            <label htmlFor="keywords" className="block text-sm font-medium text-light-200 mb-2">Keywords</label>
                                            <input type="text" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full bg-dark-700 border-dark-600 text-light-100 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary" placeholder="Separate keywords with commas..." />
                                            <p className="text-xs text-light-300 mt-1">Separate keywords with commas.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="flex items-center justify-between bg-dark-800 p-4 rounded-lg">
                        <label htmlFor="isPremium" className="text-lg font-semibold">
                            Premium Post
                        </label>
                        <button
                            type="button"
                            onClick={() => setIsPremium(!isPremium)}
                            className={`${isPremium ? 'bg-brand-primary' : 'bg-dark-700'} relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span className={`${isPremium ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="rounded-full bg-brand-primary px-8 py-3 text-base font-semibold text-dark-900"
                    >
                        Publish Post
                    </button>
                </form>
            </div>
        </div>
    );
}
