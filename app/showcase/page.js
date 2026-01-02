'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    User, Calendar, Code, Heart, Eye, Search,
    MessageCircle, Github, Sparkles, ExternalLink, ArrowRight,
    Users
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// Mock Data for initial empty state visualization
const MOCK_PROJECTS = [
    {
        _id: '1',
        title: 'E-Commerce Dashboard',
        description: 'A fully responsive admin dashboard with charts and dark mode.',
        template: 'react',
        user: { name: 'Sarah Chen' },
        likes: Array(124).fill(0),
        views: 1042,
        createdAt: new Date().toISOString()
    },
    {
        _id: '2',
        title: 'AI Chat Interface',
        description: 'ChatGPT clone using Vercel AI SDK and refined streaming UI.',
        template: 'nextjs',
        user: { name: 'Alex Rivera' },
        likes: Array(89).fill(0),
        views: 856,
        createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        _id: '3',
        title: '3D Portfolio Website',
        description: 'Personal site using Three.js and React Fiber. Highly interactive.',
        template: 'threejs',
        user: { name: 'Jordan Lee' },
        likes: Array(256).fill(0),
        views: 2300,
        createdAt: new Date(Date.now() - 172800000).toISOString()
    }
];

export default function ShowcasePage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                // If DB is empty, use mock data for showcase purposes
                if ((!data || data.length === 0)) {
                    setProjects(MOCK_PROJECTS);
                } else {
                    setProjects(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setProjects(MOCK_PROJECTS); // Fallback to mock on error
                setLoading(false);
            });
    }, []);

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(filter.toLowerCase()) ||
        p.user?.name?.toLowerCase().includes(filter.toLowerCase())
    );

    const ProjectCard = ({ project, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white dark:bg-[#18181b] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-1"
        >
            <div className="h-48 bg-gray-100 dark:bg-[#202023] flex items-center justify-center relative overflow-hidden">
                {/* Abstract Preview */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-dark-800 dark:to-black opacity-50" />

                <Code size={48} className="text-gray-400 dark:text-dark-600 group-hover:scale-110 transition-transform duration-500 relative z-10" />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-20">
                    <button className="px-6 py-2.5 bg-brand-primary text-white rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                        View Details <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                            {project.template || 'Web App'}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-brand-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {project.description || "A fantastic project built by one of our community members."}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-primary to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                            {project.user?.name?.charAt(0) || 'U'}
                        </div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {project.user?.name || 'Community Dev'}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1 text-xs hover:text-red-500 transition-colors cursor-pointer">
                            <Heart size={14} />
                            <span>{project.likes?.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                            <Eye size={14} />
                            <span>{project.views || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-light-100 font-sans">
            <Header />

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                    >
                        <Users size={16} className="text-brand-primary" />
                        <span className="text-gray-600 dark:text-gray-300">Join 10,000+ Developers</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight mb-6"
                    >
                        Built by the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-500 to-pink-500">
                            Community
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
                    >
                        Explore open-source projects, clone templates, and share your journey.
                        The best way to learn is to build together.
                    </motion.p>

                    {/* Community Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <a href="#" className="flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-[#5865F2]/30 hover:-translate-y-1">
                            <MessageCircle size={20} />
                            Join Discord
                        </a>
                        <a href="https://github.com" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1">
                            <Github size={20} />
                            Star on GitHub
                        </a>
                    </motion.div>
                </div>

                {/* Search & Filter Bar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center shadow-sm">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects by name, tag, or author..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-primary/50 outline-none"
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                            {['All', 'React', 'Next.js', 'Vue', 'Python'].map((tag) => (
                                <button key={tag} className="px-4 py-2 bg-gray-100 dark:bg-white/5 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl text-sm font-medium transition-colors whitespace-nowrap text-gray-600 dark:text-gray-300">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-[400px] bg-gray-100 dark:bg-[#121212] rounded-2xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredProjects.length > 0 ? (
                                    filteredProjects.map((project, index) => (
                                        <ProjectCard key={project._id} project={project} index={index} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center">
                                        <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Search size={32} className="text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
                                        <p className="text-gray-500 mb-6">Try adjusting your search terms or filters.</p>
                                        <button onClick={() => setFilter('')} className="px-6 py-2 bg-brand-primary text-white rounded-full font-bold">
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
