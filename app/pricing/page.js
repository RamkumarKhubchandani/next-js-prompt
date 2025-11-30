'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield, Briefcase, Bot, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'weekly', 'monthly', 'yearly'
    const [loading, setLoading] = useState(false);

    const plans = [
        {
            id: 'free',
            name: 'Starter',
            price: 0,
            period: 'forever',
            description: 'Perfect for hobbyists and beginners.',
            features: [
                'Access to 50+ Basic Tutorials',
                'Progress Tracking',
                'Public Profile',
                'Community Showcase Access'
            ],
            cta: 'Current Plan',
            active: session && session.user.plan === 'free',
            highlight: false
        },
        {
            id: 'pro_monthly',
            name: 'Pro Developer',
            price: 29,
            period: 'month',
            description: 'Everything you need to get hired.',
            features: [
                'All Free Features',
                'Day-by-Day Structured Learning Paths',
                'Interactive Code Environments (Pro)',
                'Career Center & Job Board',
                'AI Interview Simulator',
                'Verified Certificates'
            ],
            cta: 'Upgrade to Pro',
            active: session && session.user.plan === 'pro_monthly',
            highlight: true
        },
        {
            id: 'pro_yearly',
            name: 'Career Master',
            price: 290,
            period: 'year',
            description: 'Commit to your career and save.',
            features: [
                'Everything in Pro Developer',
                '2 Months Free',
                'Priority Support',
                '1-on-1 Resume Review (AI)',
                'Early Access to New Features'
            ],
            cta: 'Get Yearly Access',
            active: session && session.user.plan === 'pro_yearly',
            highlight: false
        }
    ];

    const handleSubscribe = (planId) => {
        if (!session) {
            router.push('/login?callbackUrl=/pricing');
            return;
        }
        if (planId === 'free') return;
        
        // Navigate to Checkout
        router.push(`/checkout?plan=${planId}`);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-900 text-light-100">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Invest in your <span className="text-brand-primary">Future</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-light-300 max-w-2xl mx-auto"
                    >
                        Unlock the tools, curriculum, and support you need to land a high-paying developer job.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-2xl border ${
                                plan.highlight 
                                    ? 'bg-dark-800 border-brand-primary ring-1 ring-brand-primary shadow-2xl shadow-brand-primary/20' 
                                    : 'bg-dark-800 border-dark-700 hover:border-dark-600'
                            } flex flex-col`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-dark-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
                            
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-white">${plan.price}</span>
                                <span className="text-gray-400">/{plan.period}</span>
                            </div>

                            <button
                                onClick={() => handleSubscribe(plan.id)}
                                disabled={plan.active || (plan.id === 'free' && session?.user?.plan !== 'free')}
                                className={`w-full py-3 rounded-xl font-bold mb-8 transition-all flex items-center justify-center gap-2 ${
                                    plan.active 
                                        ? 'bg-green-600/20 text-green-500 cursor-default'
                                        : plan.highlight 
                                            ? 'bg-brand-primary text-dark-900 hover:opacity-90 shadow-lg hover:shadow-brand-primary/30'
                                            : 'bg-dark-700 text-white hover:bg-dark-600'
                                }`}
                            >
                                {plan.active ? (
                                    <><Check size={18} /> Current Plan</>
                                ) : (
                                    <>{plan.cta} <ArrowRight size={18} /></>
                                )}
                            </button>

                            <div className="space-y-4 flex-1">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <div className={`mt-0.5 ${plan.highlight ? 'text-brand-primary' : 'text-gray-500'}`}>
                                            <Check size={16} />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold text-white mb-8">Why Upgrade?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 bg-dark-800 rounded-xl border border-dark-700">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-400">
                                <Briefcase />
                            </div>
                            <h3 className="font-bold text-white mb-2">Career Focused</h3>
                            <p className="text-sm text-gray-400">Curriculum designed by senior engineers to get you hired.</p>
                        </div>
                        <div className="p-6 bg-dark-800 rounded-xl border border-dark-700">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-purple-400">
                                <Bot />
                            </div>
                            <h3 className="font-bold text-white mb-2">AI Mentor</h3>
                            <p className="text-sm text-gray-400">Get instant feedback on your code and mock interview practice.</p>
                        </div>
                        <div className="p-6 bg-dark-800 rounded-xl border border-dark-700">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-yellow-400">
                                <Star />
                            </div>
                            <h3 className="font-bold text-white mb-2">Certificates</h3>
                            <p className="text-sm text-gray-400">Prove your skills with verified certificates upon completion.</p>
                        </div>
                        <div className="p-6 bg-dark-800 rounded-xl border border-dark-700">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-green-400">
                                <Shield />
                            </div>
                            <h3 className="font-bold text-white mb-2">Money Back</h3>
                            <p className="text-sm text-gray-400">14-day money back guarantee. No questions asked.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

