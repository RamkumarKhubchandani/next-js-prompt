import React from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
    GraduationCap, 
    CheckCircle2, 
    ArrowRight, 
    Sparkles, 
    MapPin, 
    Laptop, 
    Clock, 
    MessageSquare, 
    ShieldCheck, 
    Star 
} from 'lucide-react';

export const metadata = {
    title: 'BCA & MCA Training in Jamnagar | 1-on-1 Coding Mentorship | OutlineDev',
    description: 'Personalized 1-on-1 online programming and development mentorship for BCA and MCA students in Jamnagar and Gujarat. Learn modern web development and build real projects.',
    keywords: [
        'bca training jamnagar',
        'mca training jamnagar',
        'coding classes jamnagar',
        'programming classes in jamnagar',
        'web development classes jamnagar',
        'react training gujarat',
        'bca project support jamnagar',
        'mca live project guidance'
    ],
    alternates: {
        canonical: 'https://www.outlinedev.com/bca-mca-training-jamnagar',
    },
    openGraph: {
        title: 'BCA & MCA Training in Jamnagar | OutlineDev',
        description: 'Personalized 1-on-1 online coding mentorship for BCA and MCA students across Jamnagar and Gujarat. Learn industry-standard frontend and full-stack development.',
        url: 'https://www.outlinedev.com/bca-mca-training-jamnagar',
        images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'],
    }
};

export default function BcaMcaTrainingJamnagarPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white selection:bg-brand-primary selection:text-slate-900">
            <Header />

            <main className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Ambience */}
                <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/10 blur-[140px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Hero Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <MapPin size={14} />
                            Jamnagar & Gujarat Online Mentorship
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                            BCA & MCA Training <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-emerald-300 to-teal-400">
                                in Jamnagar, Gujarat
                            </span>
                        </h1>

                        <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
                            Upgrade beyond textbook theory. Get 1-on-1 live screen-sharing mentorship from senior engineers with 12+ years of industry experience. Build real-world web applications and master in-demand tech stacks.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/mentorship"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-slate-900 bg-brand-primary hover:bg-emerald-400 shadow-xl shadow-brand-primary/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                            >
                                <span>Book 1:1 Counseling Session</span>
                                <ArrowRight size={18} />
                            </Link>

                            <a
                                href="https://wa.me/918237320942?text=Hi%20Ramkumar%2C%20I%20am%20a%20BCA%2FMCA%20student%20in%20Jamnagar%20looking%20for%20training."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-xl shadow-green-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                            >
                                <MessageSquare size={18} />
                                Chat on WhatsApp
                            </a>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-400 border-t border-slate-800/80 pt-6">
                            <div className="flex items-center justify-center gap-2">
                                <GraduationCap size={16} className="text-brand-primary" />
                                <span>BCA & MCA Students</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Laptop size={16} className="text-brand-primary" />
                                <span>100% Live Remote Sessions</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <ShieldCheck size={16} className="text-brand-primary" />
                                <span>12+ Years Industry Mentor</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Star size={16} className="text-brand-primary" />
                                <span>4.9/5 Rating (Google Reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="my-20">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Jamnagar Students Choose OutlineDev</h2>
                            <p className="mt-3 text-sm text-slate-400">Industry-aligned training without the need to relocate to metro tech hubs.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4 font-bold">1</div>
                                <h3 className="text-lg font-bold text-white mb-2">1-on-1 Dedicated Guidance</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Direct personalized sessions with Ramkumar Khubchandani. Clear your doubts without hesitation in English or Hindi.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4 font-bold">2</div>
                                <h3 className="text-lg font-bold text-white mb-2">Industry-Standard Stacks</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Bridge academic theory with modern web tools: JavaScript (ES6+), React, Node.js, Next.js, and MongoDB.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4 font-bold">3</div>
                                <h3 className="text-lg font-bold text-white mb-2">Career & Placement Prep</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Get resume teardowns, GitHub portfolio reviews, and mock technical interview preparation for IT hiring.</p>
                            </div>
                        </div>
                    </div>

                    {/* TODO: insert real BCA/MCA support details once provided */}

                    {/* Final CTA Card */}
                    <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-center relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                                Ready to accelerate your software engineering skills?
                            </h2>
                            <p className="text-slate-300 text-sm sm:text-base mb-8">
                                Schedule a 1-on-1 counseling session to discuss your academic and career goals.
                            </p>
                            <Link
                                href="/mentorship"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-extrabold text-slate-900 bg-brand-primary hover:bg-emerald-400 shadow-xl shadow-brand-primary/25 transition-all text-sm"
                            >
                                <span>Connect with Lead Mentor</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
