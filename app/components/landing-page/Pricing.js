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
    priceMonthly: "$0",
    description: "Get a taste of what we offer with access to basic tutorials.",
    features: ["Access to introductory tutorials", "Community forum access"],
    featured: false,
  },
  {
    name: "Silver",
    id: "tier-silver",
    href: "/contact-us",
    priceMonthly: "$49",
    description: "Perfect for individuals looking to build a solid foundation.",
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
    priceMonthly: "$99",
    description: "For those who want to accelerate their learning journey.",
    features: [
      "All silver features",
      "Priority support",
      "Personalized feedback on projects",
      "AI-powered quizzes and assessments",
      "Two 1-on-1 sessions per month",
    ],
    featured: true,
  },
  {
    name: "Super Gold",
    id: "tier-super-gold",
    href: "/contact-us",
    priceMonthly: "$199",
    description: "The ultimate package for career-focused developers.",
    features: [
      "All premium features",
      "Unlimited 1-on-1 sessions",
      "Direct mentorship and career guidance",
      "Resume and portfolio review",
    ],
    featured: false,
  },
];

export const Pricing = () => {
    const [enabled, setEnabled] = useState(false)
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
        <div className="mt-16 flex justify-center">
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={cn(
                    enabled ? "bg-teal-600" : "bg-gray-200",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                )}
            >
                <span className="sr-only">Use monthly billing</span>
                <span
                    className={cn(
                        enabled ? "translate-x-6" : "translate-x-1",
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                />
            </Switch>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "rounded-3xl p-8 ring-1 xl:p-10",
                tier.featured
                  ? "ring-2 ring-teal-600"
                  : "ring-gray-200",
                "relative overflow-hidden"
              )}
            >
              <h3
                id={tier.id}
                className={cn(
                  "text-lg font-semibold leading-8",
                  tier.featured ? "text-teal-600" : "text-gray-900"
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {tier.priceMonthly}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  /month
                </span>
              </p>
              <Link href={tier.href}>
                <button
                  className={cn(
                    "mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 shadow-sm",
                    tier.featured
                      ? "bg-teal-600 text-white hover:bg-teal-500"
                      : "text-teal-600 ring-1 ring-inset ring-teal-200 hover:ring-teal-300"
                  )}
                >
                  Get started
                </button>
              </Link>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className="h-6 w-5 flex-none text-teal-600"
                      aria-hidden="true"
                    />
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
