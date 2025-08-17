"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Award } from "lucide-react";

const steps = [
  {
    name: "Step 1: Consultation",
    description: "We start with a free consultation to understand your goals and assess your current skill level.",
    icon: <CheckCircle />,
  },
  {
    name: "Step 2: Personalized Plan",
    description: "We create a custom learning roadmap tailored specifically to you, focusing on the areas you need most.",
    icon: <Zap />,
  },
  {
    name: "Step 3: Master & Achieve",
    description: "Through 1-on-1 mentorship and interactive projects, you'll master the skills needed to achieve your career goals.",
    icon: <Award />,
  },
];

export const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-24 sm:py-32 bg-dark-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl lg:text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-brand-primary">
            Your Path to Mastery
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-light-100 sm:text-4xl">
            A proven process for success
          </p>
        </motion.div>
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-dark-700" />
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative mb-12 flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="w-1/2 px-4">
                  <div className={`text-${index % 2 === 0 ? 'right' : 'left'}`}>
                    <h3 className="text-xl font-bold text-light-100">{step.name}</h3>
                    <p className="mt-2 text-light-200">{step.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-dark-900 border-2 border-brand-primary rounded-full flex items-center justify-center text-brand-primary">
                  {step.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
