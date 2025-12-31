"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Trophy, Brain, Rocket, Code2, Cpu, GitBranch } from "lucide-react";

const steps = [
  {
    name: "01. Neural Assessment",
    title: "Deep Dive Consultation",
    description: "We don't guess. We analyze. Start with a comprehensive skills gap analysis using our proprietary AI assessment engine. We map your current capabilities against Top 1% Engineering standards at companies like Google, Netflix, and OpenAI.",
    icon: <Brain className="text-purple-400" />,
    tags: ["Skill Gap Analysis", "AI Profiling", "Career Mapping"]
  },
  {
    name: "02. The Architecture",
    title: "Hyper-Personalized Roadmap",
    description: "Forget generic video playlists. We architect a bespoke curriculum for you. Whether you need to master Rust for Systems Programming, Next.js 15 for Full Stack, or Agentic AI patterns, your path is unique, dynamic, and adapts in real-time.",
    icon: <GitBranch className="text-blue-400" />,
    tags: ["Custom Curriculum", "Dynamic Adaptation", "Tech Stack Selection"]
  },
  {
    name: "03. Immersion & Build",
    title: "Production-Grade Labs",
    description: "Theory is for academics. Here, you build. Deploy scalable microservices, implement distributed systems, and fine-tune LLMs in our proprietary cloud-based IDE. Receive instant, line-by-line feedback from our AI Neural Tutor.",
    icon: <Code2 className="text-brand-primary" />,
    tags: ["Live Coding", "Microservices", "Instant Feedback"]
  },
  {
    name: "04. Agentic Evolution",
    title: "The Agentic Workflow",
    description: "The final frontier. Learn to transcend coding. We train you to build, orchestrate, and deploy autonomous AI agents. You won't just write software; you'll design the systems that write software. Become an AI-Augmented Architect.",
    icon: <Cpu className="text-rose-400" />,
    tags: ["AI Orchestration", "AutoGPT Patterns", "System Design"]
  },
  {
    name: "05. Global Dominance",
    title: "Deploy & Dominate",
    description: "Launch your career into the stratosphere. Armed with a portfolio of complex, high-performance applications and elite interview prep (LeetCode Hard + System Design), you are ready to command top-tier compensation globally.",
    icon: <Rocket className="text-amber-400" />,
    tags: ["Career Strategy", "Salary Negotiation", "Elite Portfolio"]
  },
];

export const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-24 bg-white dark:bg-[#0A0A0C] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-[0.03] invert dark:invert-0" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center mb-20"
        >
          <h2 className="text-brand-primary font-bold tracking-widest uppercase mb-4">
            The Methodology
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            A Proven Protocol for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600 dark:to-blue-500">Engineering Ascension</span>
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We’ve deconstructed the learning paths of Principal Engineers and distilled them into a 5-step rigorous protocol.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary via-purple-500 to-transparent opacity-20 md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`relative flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Side */}
                <div className="flex-1 ml-12 md:ml-0 md:w-1/2">
                  <div className={`p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`mb-4 flex items-center md:hidden gap-3`}>
                      <span className="text-sm font-bold text-brand-primary tracking-widest">{step.name}</span>
                    </div>
                    <h4 className="text-base font-bold text-brand-primary tracking-widest mb-2 hidden md:block">
                      {step.name}
                    </h4>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                      {step.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#0A0A0C] border-2 border-brand-primary shadow-[0_0_15px_rgba(0,245,160,0.3)] z-10">
                  <div className="scale-75">
                    {step.icon}
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
