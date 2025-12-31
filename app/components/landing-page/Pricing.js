"use client";
import React, { useState } from "react";
import { Check, Sparkles, Gem, Crown, Rocket } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Switch } from "@headlessui/react";

const tiers = [
    {
        name: "Starter",
        id: "tier-free",
        href: "/contact-us",
        price: { monthly: "$0", yearly: "$0" },
        icon: <Rocket className="text-gray-400" />,
        description: "For curious minds starting their journey.",
        features: ["Access to 3 fundamental courses", "Community forum access", "Basic AI Chat (50 msgs/day)", "Weekly challenges"],
        featured: false,
        gradient: "from-gray-700 to-gray-600",
    },
    {
        name: "Pro Engineer",
        id: "tier-silver",
        href: "/contact-us",
        price: { monthly: "$49", yearly: "$490" },
        icon: <Gem className="text-blue-400" />,
        description: "Serious about mastering the full stack.",
        features: [
            "Access to ALL 50+ tutorials",
            "Unlimited AI Neural Tutor",
            "Interactive Live Labs (React/Node)",
            "Project Code Reviews (AI)",
            "Certificate of Completion",
        ],
        featured: false,
        gradient: "from-blue-600 to-cyan-500",
    },
    {
        name: "Elite Agentic",
        id: "tier-premium",
        href: "/contact-us",
        price: { monthly: "$99", yearly: "$990" },
        icon: <Sparkles className="text-purple-400" />,
        description: "For those aiming for Senior/Lead roles.",
        features: [
            "Everything in Pro",
            "2x Monthly 1:1 Expert Mentorship",
            "System Design Mock Interviews",
            "Agentic AI Architecture Course",
            "Priority Support (1hr response)",
        ],
        featured: true,
        gradient: "from-purple-600 to-indigo-500",
    },
    {
        name: "Lifetime Founder",
        id: "tier-lifetime",
        href: "/contact-us",
        price: { monthly: "$2499", yearly: "$2499" },
        oneTime: true,
        icon: <Crown className="text-amber-400" />,
        description: "Own the platform. Build your legacy.",
        features: [
            "Lifetime Access to EVERYTHING",
            "Unlimited 1:1 Mentorship (Fair use)",
            "Direct Access to Founders",
            "Private Mastermind Group",
            "Early Access to Beta Tools",
        ],
        featured: false,
        gradient: "from-amber-500 to-orange-500",
    },
];

export const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div id="pricing" className="py-24 bg-white dark:bg-[#050505] relative overflow-hidden">
            {/* Background decorative blobs */}
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-4xl text-center mb-16"
                >
                    <h2 className="text-base font-bold text-brand-primary tracking-widest uppercase mb-3">
                        Invest in Your Future
                    </h2>
                    <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Plans that scale with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-400">Ambition</span>
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        From hobbyist to CTO. Choose the trajectory that fits your career goals.
                    </p>
                </motion.div>

                <div className="flex items-center justify-center space-x-4 mb-16">
                    <span className={cn("text-sm font-bold uppercase tracking-wider", !isYearly ? "text-gray-900 dark:text-white" : "text-gray-500")}>Monthly</span>
                    <Switch
                        checked={isYearly}
                        onChange={setIsYearly}
                        className={cn(
                            isYearly ? "bg-brand-primary" : "bg-gray-200 dark:bg-gray-700",
                            "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        )}
                    >
                        <span className="sr-only">Toggle billing</span>
                        <span
                            aria-hidden="true"
                            className={cn(
                                isYearly ? "translate-x-5" : "translate-x-0",
                                "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                        />
                    </Switch>
                    <span className={cn("text-sm font-bold uppercase tracking-wider", isYearly ? "text-gray-900 dark:text-white" : "text-gray-500")}>Yearly</span>
                    {isYearly && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-brand-primary/20 border border-brand-primary/30 px-2 py-0.5 text-xs font-bold text-brand-primary">
                            -20% OFF
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tiers.map((tier) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className={cn(
                                "relative flex flex-col rounded-3xl p-8 bg-gray-50 dark:bg-[#0A0A0C] border border-gray-200 dark:border-white/5 shadow-2xl overflow-hidden group",
                                tier.featured && "ring-2 ring-brand-primary shadow-[0_0_40px_rgba(0,245,160,0.15)]"
                            )}
                        >
                            {/* Gradient Header */}
                            <div className={cn("absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r", tier.gradient)} />

                            <div className="flex items-center gap-3 mb-6">
                                <div className={cn("p-2 rounded-lg bg-white dark:bg-white/5 ring-1 ring-gray-200 dark:ring-white/10")}>
                                    {tier.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                            </div>

                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                    {tier.oneTime ? tier.price.monthly : (isYearly ? tier.price.yearly : tier.price.monthly)}
                                </span>
                                {!tier.oneTime && (
                                    <span className="text-sm font-medium text-gray-500">
                                        /{isYearly ? 'year' : 'mo'}
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 min-h-[40px]">
                                {tier.description}
                            </p>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300">
                                        <Check className="h-5 w-5 flex-none text-brand-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href={tier.href} className="mt-auto">
                                <button className={cn(
                                    "w-full rounded-xl py-3 text-sm font-bold transition-all shadow-lg",
                                    tier.featured
                                        ? "bg-brand-primary text-black hover:bg-brand-secondary hover:shadow-brand-primary/25"
                                        : "bg-white dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
                                )}>
                                    {tier.buttonText || "Get Started"}
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
