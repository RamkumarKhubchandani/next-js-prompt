"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink, MessageSquare, Mic, X, Send, Filter, Search } from 'lucide-react';
import { Header } from '../components/Header';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [meta, setMeta] = useState({ country: '', dateKey: '', source: '', note: '' });
    const [loading, setLoading] = useState(true);
    const [workplace, setWorkplace] = useState('all');
    const [role, setRole] = useState('all');
    const [q, setQ] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [expandedJobId, setExpandedJobId] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null); // For Interview Modal
    const [chatMessages, setChatMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        const params = new URLSearchParams();
        if (workplace && workplace !== 'all') params.set('workplace', workplace);
        if (role && role !== 'all') params.set('role', role);
        if (q?.trim()) params.set('q', q.trim());
        fetch(`/api/jobs?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                if (!mounted) return;
                setJobs(Array.isArray(data?.jobs) ? data.jobs : []);
                setMeta({
                    country: data?.country || '',
                    dateKey: data?.dateKey || '',
                    source: data?.source || '',
                    note: data?.note || '',
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
        return () => { mounted = false; };
    }, [workplace, role, q]);

    const startInterview = (job) => {
        setSelectedJob(job);
        setChatMessages([{
            role: 'ai',
            text: `Hi! I'm the AI Recruiter for ${job.company}. I see you're interested in the ${job.title} role. Can you tell me a bit about your experience with ${job.tags[0] || 'frontend technologies'}?`
        }]);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        const text = inputRef.current.value;
        if (!text.trim()) return;

        // User Message
        setChatMessages(prev => [...prev, { role: 'user', text }]);
        inputRef.current.value = '';
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            const responses = [
                "That's interesting! Can you elaborate on a challenging problem you solved using that stack?",
                "Great. How do you handle state management in large applications?",
                "Impressive. We value that kind of mindset at our company.",
                "Okay, let's switch gears. How do you approach testing your code?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            setChatMessages(prev => [...prev, { role: 'ai', text: randomResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    // Client-side Sorting
    const sortedJobs = [...jobs].sort((a, b) => {
        if (sortBy === 'latest') {
            return new Date(b.postedAt) - new Date(a.postedAt);
        }
        if (sortBy === 'oldest') {
            return new Date(a.postedAt) - new Date(b.postedAt);
        }
        if (sortBy === 'company') {
            return a.company.localeCompare(b.company);
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
            <Header showNav={true} />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Career Center
                    </h1>
                    <p className="text-xl text-dark-900/60 dark:text-light-100/70">Find your dream job and practice the interview before you apply.</p>
                    <p className="mt-2 text-sm text-dark-900/50 dark:text-light-100/50">
                        {meta.dateKey ? `Updated: ${meta.dateKey}` : ''}{meta.country ? ` • Country: ${meta.country}` : ''}{meta.source ? ` • Source: ${meta.source}` : ''}
                    </p>
                    {meta.note ? (
                        <p className="mt-2 text-xs text-yellow-700 dark:text-yellow-300/90">{meta.note}</p>
                    ) : null}
                </div>

                {/* Filters */}
                <div className="bg-white/70 dark:bg-dark-800/60 border border-dark-700/10 dark:border-dark-700 rounded-2xl p-4 mb-8 backdrop-blur-lg">
                    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                        <div className="flex items-center gap-2 text-dark-900/70 dark:text-light-100/70 font-extrabold">
                            <Filter size={16} /> Filters
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-2 bg-light-100 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-700 rounded-xl px-3 py-2">
                                <Search size={16} className="text-dark-900/40 dark:text-light-100/50" />
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Search (company, title, stack)…"
                                    className="bg-transparent outline-none text-sm text-dark-900 dark:text-white w-full sm:w-64 placeholder:text-dark-900/40 dark:placeholder:text-light-100/40"
                                />
                            </div>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="bg-light-100 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-700 rounded-xl px-3 py-2 text-sm text-dark-900 dark:text-white"
                            >
                                <option value="all">All roles</option>
                                <option value="frontend">Front End</option>
                                <option value="fullstack">Full Stack</option>
                                <option value="backend">Back End</option>
                            </select>
                            <select
                                value={workplace}
                                onChange={(e) => setWorkplace(e.target.value)}
                                className="bg-light-100 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-700 rounded-xl px-3 py-2 text-sm text-dark-900 dark:text-white"
                            >
                                <option value="all">All locations</option>
                                <option value="remote">Remote</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="onsite">Onsite</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-light-100 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-700 rounded-xl px-3 py-2 text-sm text-dark-900 dark:text-white font-semibold"
                            >
                                <option value="latest">Sort: Latest</option>
                                <option value="oldest">Sort: Oldest</option>
                                <option value="company">Sort: Company</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {loading ? (
                        <div className="text-center py-12 text-dark-900/60 dark:text-light-100/70">Loading jobs…</div>
                    ) : sortedJobs.length === 0 ? (
                        <div className="text-center py-12 text-dark-900/60 dark:text-light-100/70">No jobs found for these filters.</div>
                    ) : sortedJobs.map((job) => (
                        <motion.div 
                            key={job._id || job.sourceId || `${job.company}-${job.title}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/70 dark:bg-dark-800 rounded-2xl p-6 border border-dark-700/10 dark:border-dark-700 hover:border-brand-primary/50 transition-all group backdrop-blur-lg shadow-lg"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-light-100 dark:bg-dark-900 border border-dark-700/10 dark:border-dark-700 flex items-center justify-center text-2xl font-extrabold shrink-0">
                                        {job.company.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-xl font-extrabold text-dark-900 dark:text-white group-hover:text-brand-primary transition-colors truncate">{job.title}</h3>
                                            {job.source === 'internal' && (
                                                <span className="px-1.5 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] font-bold rounded">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-dark-900/60 dark:text-light-100/70 font-semibold">{job.company}</p>
                                        
                                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-dark-900/50 dark:text-light-100/50">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={12} /> {job.location} ({job.workplace})
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign size={12} /> {job.salary || 'Competitive'}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={12} /> {job.type}
                                            </div>
                                            <div className="flex items-center gap-1 font-semibold text-brand-primary">
                                                <Clock size={12} /> Posted: {new Date(job.postedAt).toLocaleDateString()} {new Date(job.postedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {(job.tags || []).map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-light-100 dark:bg-dark-900 rounded-lg text-xs font-mono text-brand-primary border border-dark-700/10 dark:border-dark-700">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setExpandedJobId(expandedJobId === job._id ? null : job._id)}
                                            className="text-xs font-bold text-brand-primary mt-4 hover:underline flex items-center gap-1"
                                        >
                                            {expandedJobId === job._id ? 'Hide details ↑' : 'Show job details ↓'}
                                        </button>

                                        {expandedJobId === job._id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-4 p-4 bg-light-200 dark:bg-dark-900/40 rounded-xl text-sm leading-relaxed text-dark-900/80 dark:text-light-100/80 whitespace-pre-wrap border border-dark-700/10 dark:border-dark-700 font-medium"
                                            >
                                                {job.description || "No job description specified."}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 justify-center min-w-[180px]">
                                    {job.applyLink ? (
                                        <a
                                            href={job.applyLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full px-4 py-2 bg-dark-900 text-white dark:bg-white dark:text-dark-900 font-extrabold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                        >
                                            Apply Now <ExternalLink size={16} />
                                        </a>
                                    ) : (
                                        <button disabled className="w-full px-4 py-2 bg-dark-900/10 dark:bg-dark-700 text-dark-900/40 dark:text-light-100/40 font-extrabold rounded-xl cursor-not-allowed">
                                            No link
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => startInterview(job)}
                                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                    >
                                        Practice Interview <MessageSquare size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* AI INTERVIEW MODAL */}
                <AnimatePresence>
                    {selectedJob && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        >
                            <motion.div 
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-white dark:bg-dark-800 w-full max-w-2xl rounded-2xl border border-dark-700/10 dark:border-dark-600 shadow-2xl overflow-hidden flex flex-col h-[600px]"
                            >
                                {/* Header */}
                                <div className="p-6 border-b border-dark-700/10 dark:border-dark-700 flex justify-between items-center bg-light-100 dark:bg-dark-900">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                                            <Mic size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-dark-900 dark:text-white">AI Interviewer</h3>
                                            <p className="text-xs text-purple-600 dark:text-purple-400">Interviewing for {selectedJob.company}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedJob(null)} className="text-dark-900/50 dark:text-light-100/60 hover:text-dark-900 dark:hover:text-white">
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Chat Area */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-light-100/60 dark:bg-dark-800/50">
                                    {chatMessages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-4 rounded-2xl ${
                                                msg.role === 'user' 
                                                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                                                    : 'bg-white dark:bg-dark-700 text-dark-900 dark:text-light-100 rounded-tl-sm border border-dark-700/10 dark:border-dark-600'
                                            }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white dark:bg-dark-700 p-4 rounded-2xl rounded-tl-sm border border-dark-700/10 dark:border-dark-600 flex gap-2">
                                                <span className="w-2 h-2 bg-dark-900/40 dark:bg-light-400 rounded-full animate-bounce"></span>
                                                <span className="w-2 h-2 bg-dark-900/40 dark:bg-light-400 rounded-full animate-bounce delay-100"></span>
                                                <span className="w-2 h-2 bg-dark-900/40 dark:bg-light-400 rounded-full animate-bounce delay-200"></span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-light-100 dark:bg-dark-900 border-t border-dark-700/10 dark:border-dark-700">
                                    <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <input 
                                            ref={inputRef}
                                            type="text" 
                                            placeholder="Type your answer..." 
                                            className="flex-1 bg-white dark:bg-dark-800 border border-dark-700/10 dark:border-dark-600 rounded-xl px-4 py-3 text-dark-900 dark:text-white placeholder:text-dark-900/40 dark:placeholder:text-light-100/40 focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                        <button type="submit" className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors">
                                            <Send size={20} />
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
            </div>
        </div>
    );
}

