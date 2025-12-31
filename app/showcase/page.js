'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Calendar, Code2, Heart, Eye, Search } from 'lucide-react';

export default function ShowcasePage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
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
            transition={{ delay: index * 0.05 }}
            className="bg-dark-800 rounded-2xl overflow-hidden border border-dark-700 hover:border-brand-primary/50 transition-all hover:-translate-y-1 shadow-lg"
        >
            <div className="h-40 bg-[#1e1e1e] flex items-center justify-center relative group">
                <Code2 size={40} className="text-dark-600 group-hover:text-brand-primary transition-colors" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {/* Future: Link to full project view */}
                    <button className="px-4 py-2 bg-brand-primary text-dark-900 rounded-full font-bold text-sm">
                        View Code
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{project.title}</h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                            by <span className="text-brand-primary">{project.user?.name || 'Anonymous'}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-dark-900 px-2 py-1 rounded-lg">
                        <Calendar size={12} />
                        {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 mt-4 pt-4 border-t border-dark-700">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 hover:text-pink-500 transition cursor-pointer">
                            <Heart size={16} />
                            <span>{project.likes?.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye size={16} />
                            <span>{project.views || 0}</span>
                        </div>
                    </div>
                    <div className="text-xs uppercase font-bold text-blue-400">
                        {project.template}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-900 text-light-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-blue-500"
                    >
                        Community Showcase
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-light-300 max-w-2xl mx-auto mb-8"
                    >
                        Discover amazing projects built by developers just like you. Clone, learn, and share your own creations.
                    </motion.p>

                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full bg-dark-800 border border-dark-700 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary transition shadow-lg"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-80 bg-dark-800 rounded-2xl animate-pulse border border-dark-700"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <ProjectCard key={project._id} project={project} index={index} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-500 text-xl">No projects found yet. Be the first to deploy!</p>
                                <Link href="/blogs">
                                    <button className="mt-4 px-6 py-2 bg-brand-primary text-dark-900 rounded-full font-bold">
                                        Start Building
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}



