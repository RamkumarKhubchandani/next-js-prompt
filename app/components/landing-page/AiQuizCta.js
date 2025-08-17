"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const AiQuizCta = () => {
    return (
        <div className="relative bg-dark-800 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-light-100 sm:text-4xl">
                        Test Your Skills.
                        <br />
                        Discover Your Potential.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-light-200">
                        Take our interactive AI-powered assessment to discover your strengths, identify weaknesses, and see where you stand against the world's top developers.
                    </p>
                    <div className="mt-10">
                        <Link href="/ai-quiz">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group inline-flex items-center justify-center rounded-full bg-brand-primary px-8 py-4 text-base font-semibold text-dark-900 shadow-[0_0_20px_#00f5a0] hover:shadow-[0_0_30px_#00f5a0] transition-shadow"
                            >
                                Start the Assessment
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
