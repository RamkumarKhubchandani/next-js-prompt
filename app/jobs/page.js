"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink, MessageSquare, Mic, X, Send } from 'lucide-react';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null); // For Interview Modal
    const [chatMessages, setChatMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => setJobs(data));
    }, []);

    const startInterview = (job) => {
        setSelectedJob(job);
        setChatMessages([{
            role: 'ai',
            text: `Hi! I'm the AI Recruiter for ${job.company}. I see you're interested in the ${job.title} role. Can you tell me a bit about your experience with ${job.tags[0]}?`
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

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-900 text-light-100">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Career Center
                    </h1>
                    <p className="text-xl text-light-300">Find your dream job and practice the interview before you apply.</p>
                </div>

                <div className="space-y-6">
                    {jobs.map((job) => (
                        <motion.div 
                            key={job._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-dark-800 rounded-xl p-6 border border-dark-700 hover:border-brand-primary/50 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-dark-700 flex items-center justify-center text-2xl font-bold">
                                        {job.company.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{job.title}</h3>
                                        <p className="text-light-300 font-medium">{job.company}</p>
                                        
                                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-light-400">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} /> {job.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign size={14} /> {job.salary}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} /> {job.type}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            {job.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-dark-900 rounded text-xs font-mono text-brand-primary border border-dark-700">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 justify-center min-w-[180px]">
                                    <button className="w-full px-4 py-2 bg-white text-dark-900 font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                        Apply Now <ExternalLink size={16} />
                                    </button>
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
                                className="bg-dark-800 w-full max-w-2xl rounded-2xl border border-dark-600 shadow-2xl overflow-hidden flex flex-col h-[600px]"
                            >
                                {/* Header */}
                                <div className="p-6 border-b border-dark-700 flex justify-between items-center bg-dark-900">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                                            <Mic size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">AI Interviewer</h3>
                                            <p className="text-xs text-purple-400">Interviewing for {selectedJob.company}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedJob(null)} className="text-light-400 hover:text-white">
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Chat Area */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-dark-800/50">
                                    {chatMessages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-4 rounded-2xl ${
                                                msg.role === 'user' 
                                                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                                                    : 'bg-dark-700 text-light-100 rounded-tl-sm border border-dark-600'
                                            }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-dark-700 p-4 rounded-2xl rounded-tl-sm border border-dark-600 flex gap-2">
                                                <span className="w-2 h-2 bg-light-400 rounded-full animate-bounce"></span>
                                                <span className="w-2 h-2 bg-light-400 rounded-full animate-bounce delay-100"></span>
                                                <span className="w-2 h-2 bg-light-400 rounded-full animate-bounce delay-200"></span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-dark-900 border-t border-dark-700">
                                    <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <input 
                                            ref={inputRef}
                                            type="text" 
                                            placeholder="Type your answer..." 
                                            className="flex-1 bg-dark-800 border border-dark-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
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
    );
}

