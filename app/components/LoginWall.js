"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Zap, Code, Brain, Rocket, Users, Trophy, Lock, CheckCircle } from 'lucide-react';

export default function LoginWall({ onClose }) {
    const features = [
        {
            icon: Brain,
            title: "AI-Powered Learning",
            description: "Get instant answers with our advanced AI assistant",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: Code,
            title: "Interactive Coding",
            description: "Practice with real-time code execution and feedback",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: Rocket,
            title: "Personalized Paths",
            description: "Custom learning roadmaps tailored to your goals",
            gradient: "from-orange-500 to-red-500"
        },
        {
            icon: Users,
            title: "1:1 Mentorship",
            description: "Connect with expert mentors from top companies",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: Trophy,
            title: "Certificates & Projects",
            description: "Build portfolio projects and earn certificates",
            gradient: "from-yellow-500 to-orange-500"
        },
        {
            icon: Zap,
            title: "Unlimited Access",
            description: "All courses, all features, no limits",
            gradient: "from-indigo-500 to-purple-500"
        }
    ];

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-5xl bg-white dark:bg-dark-900 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Floating Close Button - Fixed position relative to modal */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/30 transition-all dark:bg-black/20 dark:text-white dark:hover:bg-black/40 mix-blend-difference"
                    title="Close"
                >
                    <X size={20} />
                </button>

                {/* Scrollable Content Container */}
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {/* Premium Gradient Header */}
                    <div className="relative bg-gradient-to-br from-brand-primary via-purple-600 to-pink-600 p-6 md:p-12 text-white overflow-hidden">
                        {/* Animated background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-700"></div>

                        <div className="relative z-10 text-center pt-4 md:pt-0">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6"
                            >
                                <Sparkles className="animate-pulse" size={16} />
                                <span className="font-bold text-sm md:text-base">Join 50,000+ Learners</span>
                            </motion.div>

                            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                                Unlock Your Full Potential
                            </h1>
                            <p className="text-base md:text-xl opacity-90 max-w-2xl mx-auto">
                                Sign in to access premium courses, AI-powered learning, and personalized mentorship
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="p-6 md:p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                What You'll Get Access To
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                                Everything you need to master coding and land your dream job
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="group relative p-5 md:p-6 rounded-2xl bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:border-brand-primary/50 transition-all hover:shadow-lg"
                                >
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                                        <feature.icon size={20} className="md:w-6 md:h-6" />
                                    </div>
                                    <h3 className="font-bold text-base md:text-lg mb-2 text-gray-900 dark:text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <CheckCircle className="text-green-500" size={16} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Proof */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 md:p-6 mb-8 border border-green-200 dark:border-green-800">
                            <div className="grid grid-cols-2 md:flex items-center justify-center gap-6 md:gap-8">
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400">50K+</div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Active Learners</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400">100+</div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Expert Mentors</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400">4.9/5</div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400">FREE</div>
                                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">To Get Started</div>
                                </div>
                            </div>
                        </div>

                        {/* Login Button */}
                        <div className="space-y-4">
                            <a
                                href="/login"
                                className="block w-full py-4 md:py-5 px-6 bg-gradient-to-r from-brand-primary to-purple-600 text-white rounded-2xl font-bold hover:from-brand-primary/90 hover:to-purple-600/90 transition-all text-center text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <Sparkles className="animate-pulse" size={20} />
                                    <span className="text-base md:text-lg">Sign In to Get Started</span>
                                    <Sparkles className="animate-pulse" size={20} />
                                </div>
                            </a>

                            <p className="text-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
                                Free forever • No credit card required
                            </p>
                        </div>

                        <p className="text-center text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-6 md:mt-6">
                            By signing in, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
