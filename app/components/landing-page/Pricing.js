"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Switch } from "@headlessui/react";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    href: "/contact-us",
    price: { monthly: "$0", yearly: "$0" },
    description: "Get a taste of our platform with access to basic tutorials and community.",
    features: ["Access to introductory tutorials", "Community forum access"],
    featured: false,
  },
  {
    name: "Silver",
    id: "tier-silver",
    href: "/contact-us",
    price: { monthly: "$49", yearly: "$490" },
    description: "Perfect for individuals looking to build a solid, foundational skillset.",
    features: [
      "All free features",
      "Access to all tutorials",
      "Source code for projects",
      "Monthly group Q&A sessions",
    ],
    featured: false,
  },
  {
    name: "Premium",
    id: "tier-premium",
    href: "/contact-us",
    price: { monthly: "$99", yearly: "$990" },
    description: "The ideal package to accelerate your learning and career trajectory.",
    features: [
      "All silver features",
      "AI-powered quizzes & assessments",
      "Personalized project feedback",
      "Two 1-on-1 sessions per month",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Super Gold",
    id: "tier-super-gold",
    href: "/contact-us",
    price: { monthly: "$199", yearly: "$1990" },
    description: "The ultimate investment for career-focused, ambitious developers.",
    features: [
      "All premium features",
      "Unlimited 1-on-1 sessions",
      "Direct mentorship & career guidance",
      "Resume and portfolio review",
    ],
    featured: false,
  },
];

export const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div id="pricing" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <h2 className="text-base font-semibold leading-7 text-brand-primary">
                        Pricing
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-light-100 sm:text-5xl">
                        Plans that scale with your ambition
                    </p>
                </motion.div>
                <div className="mt-16 flex items-center justify-center space-x-4">
                    <span className={cn("text-lg font-medium", !isYearly ? "text-brand-primary" : "text-light-200")}>Monthly</span>
                    <Switch
                        checked={isYearly}
                        onChange={setIsYearly}
                        className={cn(
                            isYearly ? "bg-teal-600" : "bg-gray-200",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        )}
                    >
                        <span className="sr-only">Use monthly billing</span>
                        <span
                            className={cn(
                                isYearly ? "translate-x-6" : "translate-x-1",
                                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                        />
                    </Switch>
                    <span className={cn("text-lg font-medium", isYearly ? "text-brand-primary" : "text-light-200")}>Yearly</span>
                    {isYearly && (
                        <span className="ml-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                            Save 20%
                        </span>
                    )}
                </div>
                <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {tiers.map((tier) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, zIndex: 20 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            className={cn(
                                "relative rounded-2xl bg-dark-800 p-8 shadow-lg",
                                tier.featured 
                                    ? "border-2 border-brand-primary shadow-[0_0_30px_rgba(0,245,160,0.3)]" 
                                    : "border border-dark-700"
                            )}
                        >
                            <h3 className="text-lg font-semibold leading-8 text-light-100">{tier.name}</h3>
                            <p className="mt-4 text-sm leading-6 text-light-200">{tier.description}</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-light-100">
                                    {isYearly ? tier.price.yearly : tier.price.monthly}
                                </span>
                                <span className="text-sm font-semibold leading-6 text-light-200">
                                    /{isYearly ? 'year' : 'month'}
                                </span>
                            </p>
                            <Link href={tier.href}>
                                <button className={cn(
                                    "mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 shadow-sm transition-all duration-300",
                                    tier.featured 
                                        ? "bg-brand-primary text-dark-900 hover:bg-brand-secondary" 
                                        : "bg-dark-700 text-brand-primary hover:bg-dark-600"
                                )}>
                                    Get started
                                </button>
                            </Link>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-light-200 xl:mt-10">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <Check className="h-6 w-5 flex-none text-brand-primary" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
