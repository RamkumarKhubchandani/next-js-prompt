"use client";
import React from "react";
import { Bot, Code2, Users, Cpu, FileJson2, Briefcase, Rocket, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const features = [
  {
    title: "Proprietary AI Neural Tutor",
    description: "Our in-house LLM doesn't just answer; it mentors. Trained on top 1% codebases for React, Node.js, and System Design.",
    icon: <Bot className="h-6 w-6 text-white" />,
    color: "bg-purple-500",
    gradient: "from-purple-500 to-indigo-500",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Global 1:1 Expert Connect",
    description: "Instant access to Senior Engineers from FAANG. Get unblocked on complex Full Stack issues in minutes, not days.",
    icon: <Globe className="h-6 w-6 text-white" />,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-400",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Production-Grade Labs",
    description: "Write code in live, pre-configured instances of Next.js 15, Rust, and Python. No setup hell.",
    icon: <Code2 className="h-6 w-6 text-white" />,
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-400",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Elite Interview Prep",
    description: "Crush the LeetCode grind with visual mental models. Mock specialized interviews for Frontend, Backend, and AI roles.",
    icon: <Briefcase className="h-6 w-6 text-white" />,
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-400",
    className: "md:col-span-2",
  },
  {
    title: "Full Stack Ecosystem",
    description: "One subscription, every stack: React, Angular, Vue, Node.js, Go, Rust, and Agentic AI Architecture.",
    icon: <Cpu className="h-6 w-6 text-white" />,
    color: "bg-rose-500",
    gradient: "from-rose-500 to-pink-500",
    className: "md:col-span-1",
  },
  {
    title: "Agentic Certification",
    description: "Prove your ability to build autonomous software systems. The only certification that matters in the AI era.",
    icon: <AwardBadge />,
    color: "bg-brand-primary",
    gradient: "from-brand-primary to-emerald-300",
    className: "md:col-span-1",
  },
];

function AwardBadge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
  )
}

const FeatureCard = ({ title, description, icon, className, gradient, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      "relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#0A0A0C] p-8 shadow-xl dark:shadow-2xl transition-colors hover:bg-gray-100 dark:hover:bg-white/[0.02]",
      className
    )}
  >
    <div className={`absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full opacity-20 blur-3xl bg-gradient-to-br ${gradient}`} />

    <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-gray-200/50 dark:shadow-white/5`}>
      {icon}
    </div>

    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">{description}</p>
  </motion.div>
);

export const Features = () => {
  return (
    <div id="features" className="py-24 bg-white dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:text-center max-w-3xl mx-auto"
        >
          <h2 className="text-base font-bold uppercase tracking-wider text-brand-primary mb-3">
            Premium Engineering Suite
          </h2>
          <p className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            Stop Learning Syntax. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-brand-primary dark:from-purple-400">
              Start Building Intelligence.
            </span>
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-400 font-medium">
            We’ve bundled the world’s most advanced 1:1 Mentorship network with next-gen AI tooling.
            Covering <span className="text-black dark:text-gray-200 font-bold">TypeScript, Microservices, and Large Language Models</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};
