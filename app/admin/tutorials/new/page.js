"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Dynamically import Editor to avoid SSR issues with TipTap
const TutorialEditor = dynamic(() => import('../../../../components/admin/TutorialEditor'), {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
});

export default function NewTutorialPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        difficulty: 'Intermediate',
        tags: '',
        content: '<h2>Start writing...</h2>',
        readTime: '5 min read'
    });

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'title' && !prev.slug) {
                newData.slug = generateSlug(value);
            }
            return newData;
        });
    };

    const handleEditorChange = (html) => {
        setFormData(prev => ({ ...prev, content: html }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            };

            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error((await res.json()).error);
            }

            const data = await res.json();
            router.push(`/blogs/${data.slug}`);
            router.refresh();

        } catch (error) {
            alert('Error creating tutorial: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light-50 dark:bg-dark-900 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-brand-primary mb-6">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Create New Tutorial</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:ring-2 focus:ring-brand-primary"
                                placeholder="e.g. Master React Hooks"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:ring-2 focus:ring-brand-primary"
                                placeholder="e.g. master-react-hooks"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description (SEO)</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={2}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:ring-2 focus:ring-brand-primary"
                                placeholder="Brief summary used for SEO and cards..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:ring-2 focus:ring-brand-primary"
                                placeholder="React, Hooks, Frontend"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                                >
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Read Time</label>
                                <input
                                    type="text"
                                    name="readTime"
                                    value={formData.readTime}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                                    placeholder="5 min read"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                        <TutorialEditor content={formData.content} onChange={handleEditorChange} />
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-dark-900 font-bold py-3 px-8 rounded-full transition-colors disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                            Publish Tutorial
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
