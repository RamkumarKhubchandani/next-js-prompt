"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, Trash2, Briefcase, MapPin, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form states
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [workplace, setWorkplace] = useState('onsite');
    const [role, setRole] = useState('frontend');
    const [type, setType] = useState('Full-time');
    const [salary, setSalary] = useState('Competitive');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [applyLink, setApplyLink] = useState('');

    const fetchJobs = async () => {
        try {
            const res = await fetch('/api/admin/jobs');
            if (res.ok) {
                const data = await res.json();
                setJobs(data.jobs || []);
            }
        } catch (err) {
            console.error('Failed to fetch jobs', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handlePreFillSample = () => {
        setTitle('Frontend Engineer (6yrs+)');
        setCompany('Emergent');
        setLocation('Bangalore');
        setWorkplace('onsite');
        setRole('frontend');
        setType('Full-time');
        setSalary('Competitive');
        setTags('React, TypeScript, Frontend, Web development');
        setApplyLink('mailto:udeshna@emergent.sh');
        setDescription("We're looking for a Frontend Engineer who doesn't just build features—but takes ownership of products, drives technical direction, and raises the engineering bar. If you have 6+ years of experience building complex, scalable web applications with React, TypeScript, and modern frontend technologies, and enjoy mentoring engineers while solving challenging product problems, we'd love to talk. At Emergent, you'll work on AI-native products used by 10M+ users, collaborate with exceptional engineers, and have the opportunity to shape the future of software development.\n\n📍 Bangalore (5 days/week, in-office)");
        setSuccess('Loaded Emergent Frontend job template!');
        setTimeout(() => setSuccess(''), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!title || !company || !applyLink) {
            setError('Title, Company, and Apply Link/Email are required.');
            return;
        }

        setSubmitting(true);
        try {
            const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
            const res = await fetch('/api/admin/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    company,
                    location,
                    workplace,
                    role,
                    type,
                    salary,
                    tags: tagsArray,
                    description,
                    applyLink
                })
            });

            if (res.ok) {
                setSuccess('Job posting created successfully!');
                // Reset form
                setTitle('');
                setCompany('');
                setLocation('');
                setWorkplace('onsite');
                setRole('frontend');
                setType('Full-time');
                setSalary('Competitive');
                setTags('');
                setDescription('');
                setApplyLink('');
                fetchJobs(); // Refresh job listing
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to create job.');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (jobId) => {
        if (!confirm('Are you sure you want to delete this job?')) return;
        setError('');
        setSuccess('');

        try {
            const res = await fetch(`/api/admin/jobs?jobId=${jobId}`, { method: 'DELETE' });
            if (res.ok) {
                setSuccess('Job posting deleted.');
                fetchJobs();
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to delete job.');
            }
        } catch (err) {
            setError('Server error.');
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link href="/admin" className="text-light-400 hover:text-brand-primary flex items-center gap-2 mb-4 text-sm font-semibold transition-colors">
                            <ArrowLeft size={16} /> Back to Admin
                        </Link>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Shield className="text-brand-primary" /> Manage Job Board
                        </h1>
                        <p className="text-light-400 text-sm mt-1">Post, review, and delete active job listings on your platform.</p>
                    </div>
                    <button
                        onClick={handlePreFillSample}
                        className="px-4 py-2 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 border border-yellow-500/20 rounded-xl text-sm font-extrabold transition-colors flex items-center gap-2"
                    >
                        ⚡ Load Emergent Sample
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/15 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-500/15 border border-green-500/30 text-green-400 p-4 rounded-xl mb-6 text-sm">
                        {success}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Job Form */}
                    <div className="bg-dark-800 border border-dark-700 p-6 rounded-2xl h-fit lg:col-span-1">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-brand-primary" /> Post a New Job
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-light-400 mb-2">Job Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Frontend Engineer"
                                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-light-400 mb-2">Company *</label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="e.g. Emergent"
                                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-light-400 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="e.g. Bangalore"
                                        className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-light-400 mb-2">Workplace</label>
                                    <select
                                        value={workplace}
                                        onChange={(e) => setWorkplace(e.target.value)}
                                        className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary outline-none"
                                    >
                                        <option value="onsite">Onsite</option>
                                        <option value="remote">Remote</option>
                                        <option value="hybrid">Hybrid</option>
                                        <option value="unknown">Unknown</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-light-400 mb-2">Category</label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary outline-none"
                                    >
                                        <option value="frontend">Frontend</option>
                                        <option value="fullstack">Fullstack</option>
                                        <option value="backend">Backend</option>
                                        <option value="unknown">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-light-400 mb-2">Type</label>
                                    <input
                                        type="text"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        placeholder="e.g. Full-time"
                                        className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-light-400 mb-2">Salary</label>
                                    <input
                                        type="text"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        placeholder="Competitive"
                                        className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-light-400 mb-2">Apply URL / Email *</label>
                                    <input
                                        type="text"
                                        value={applyLink}
                                        onChange={(e) => setApplyLink(e.target.value)}
                                        placeholder="mailto:jobs@co.com or URL"
                                        className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-light-400 mb-2">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="React, TypeScript, Node.js"
                                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-light-400 mb-2">Job Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe responsibilities, expectations..."
                                    rows={5}
                                    className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary outline-none resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3 bg-brand-primary text-dark-900 font-extrabold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {submitting ? 'Creating Posting...' : 'Publish Job'}
                            </button>
                        </form>
                    </div>

                    {/* Jobs List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Briefcase size={20} className="text-brand-primary" /> Active Manually Posted Jobs
                        </h2>

                        {loading ? (
                            <div className="p-12 text-center text-light-400">Loading jobs...</div>
                        ) : jobs.length === 0 ? (
                            <div className="p-12 border border-dark-700 bg-dark-800/40 rounded-2xl text-center text-light-400 text-sm">
                                No active internal job postings. Use the form on the left to add one!
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {jobs.map((job) => (
                                    <div key={job._id} className="bg-dark-800 border border-dark-700 p-6 rounded-2xl flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-white">{job.title}</h3>
                                                <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-mono rounded">
                                                    {job.source}
                                                </span>
                                            </div>
                                            <p className="text-brand-primary text-sm font-semibold">{job.company}</p>

                                            <div className="flex items-center gap-4 mt-3 text-xs text-light-400">
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={12} /> {job.location} ({job.workplace})
                                                </div>
                                                <div>•</div>
                                                <div>{job.type}</div>
                                                <div>•</div>
                                                <div>Posted: {new Date(job.postedAt).toLocaleDateString()}</div>
                                            </div>

                                            {job.tags && job.tags.length > 0 && (
                                                <div className="flex gap-2 mt-4">
                                                    {job.tags.map((tag) => (
                                                        <span key={tag} className="px-2 py-0.5 bg-dark-900 border border-dark-700 text-xs rounded font-mono text-light-300">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col items-end gap-3">
                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                                title="Delete Job"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            {job.applyLink && (
                                                <a
                                                    href={job.applyLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors flex items-center gap-1 text-xs"
                                                >
                                                    View Link <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
