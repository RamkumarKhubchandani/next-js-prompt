"use client";
import React from "react";
import { Bot, BrainCircuit, Code, Users } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const features = [
  {
    title: "AI-Powered Quizzes",
    description: "Personalized quizzes that adapt to your skill level.",
    icon: <Bot className="h-8 w-8 text-brand-primary" />,
    className: "md:col-span-2",
  },
  {
    title: "Interactive Learning",
    description: "Learn by doing with live coding environments.",
    icon: <Code className="h-8 w-8 text-brand-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Expert Mentorship",
    description: "One-on-one guidance from industry veterans.",
    icon: <Users className="h-8 w-8 text-brand-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Advanced Curriculum",
    description: "Master the latest technologies and best practices.",
    icon: <BrainCircuit className="h-8 w-8 text-brand-primary" />,
    className: "md:col-span-2",
  },
];

const FeatureCard = ({ title, description, icon, className }) => (
  <motion.div
    whileHover={{
      scale: 1.03,
      boxShadow: "0 0 40px rgba(0, 245, 160, 0.2)",
    }}
    transition={{ type: "spring", stiffness: 300 }}
    className={cn(
      "p-8 rounded-2xl bg-white/70 dark:bg-dark-800 border border-dark-700/10 dark:border-dark-700 backdrop-blur-lg",
      className
    )}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-dark-900 dark:text-light-100">{title}</h3>
    <p className="mt-2 text-dark-900/70 dark:text-light-200">{description}</p>
  </motion.div>
);

export const Features = () => {
  return (
    <div id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl lg:text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-brand-primary">
            The Ultimate Learning Experience
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-dark-900 dark:text-light-100 sm:text-4xl">
            Everything you need to become a top 1% developer
          </p>
        </motion.div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
