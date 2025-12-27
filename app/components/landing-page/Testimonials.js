"use client";
import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useSprings, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { cn } from "../../lib/utils";

const testimonials = [
    { name: "Sarah L.", role: "Frontend Dev @ Google", quote: "The 1-on-1 mentorship on React and TypeScript was a game-changer. I landed my dream job within 3 months." },
    { name: "Mike R.", role: "Full Stack Engineer", quote: "I thought I knew Node.js, but the agentic workflow module 10x'd my productivity. This is the future." },
    { name: "Jennifer Chen", role: "Career Changer", quote: "Coming from a non-tech background, I was intimidated. The personalized roadmap for the MERN stack made it all possible." },
    { name: "David K.", role: "Angular Specialist", quote: "The deep dive into advanced Angular concepts is unparalleled. This is the best course for senior devs looking to upskill." },
    { name: "Emily T.", role: "Python & AI Dev", quote: "The Python course was amazing. I'm now building AI applications I never thought I could." },
    { name: "Chris G.", role: "Vue.js Developer", quote: "The state management patterns I learned for Vue have made my applications so much more scalable." },
    { name: "Jessica P.", role: "MERN Stack Dev", quote: "From MongoDB to Express, React, and Node, this course covered everything. I feel like a true full-stack developer." },
    { name: "Tom H.", role: "Lead Developer", quote: "The section on Redux and advanced state management was worth the price of admission alone. Highly recommended." },
    { name: "Maria S.", role: "Software Engineer", quote: "The agentic workflow and AI integration modules are mind-blowing. This isn't just a course; it's a glimpse into the future of development." },
    { name: "Alex B.", role: "TypeScript Enthusiast", quote: "I finally understand TypeScript at a deep level. The practical examples and expert guidance were incredible." }
];

const TestimonialCard = React.forwardRef(({ name, role, quote }, ref) => (
    <div ref={ref} className="relative w-[380px] h-[200px] flex-shrink-0 rounded-2xl bg-white/70 dark:bg-dark-800 p-8 border border-dark-700/10 dark:border-dark-700 shadow-lg backdrop-blur-lg">
        <p className="text-lg font-bold text-dark-900 dark:text-light-100">{name}</p>
        <p className="text-sm text-brand-primary">{role}</p>
        <p className="mt-4 text-dark-900/70 dark:text-light-200 leading-relaxed">"{quote}"</p>
    </div>
));
TestimonialCard.displayName = "TestimonialCard";

const OrbitalField = () => {
    const targetRef = useRef(null);

    const springs = useSprings(
        testimonials.length,
        testimonials.map((_, i) => ({
            from: { x: 0, y: 0, scale: 1 },
            to: async (next) => {
                while (1) {
                    const angle = (i / testimonials.length) * 2 * Math.PI + Date.now() * 0.00015; // Increased speed
                    const x = Math.cos(angle) * 350; // Increased horizontal radius
                    const y = Math.sin(angle) * 180; // Increased vertical radius
                    const scale = (Math.sin(angle) + 2) / 3;
                    await next({ x, y, scale });
                }
            },
            config: { mass: 5, tension: 100, friction: 50 },
        }))
    );

    useGesture({
        onMove: ({ xy: [px, py] }) => {
            if (!targetRef.current) return;
            const { left, top, width, height } = targetRef.current.getBoundingClientRect();
            const x = px - (left + width / 2);
            const y = py - (top + height / 2);
            // This is where you could add interactive logic
        }
    }, { target: targetRef });

    return (
        <div ref={targetRef} className="relative w-full h-full flex items-center justify-center">
            {springs.map((props, i) => (
                <animated.div key={i} style={{...props, position: 'absolute' }}>
                    <TestimonialCard {...testimonials[i]} />
                </animated.div>
            ))}
        </div>
    );
};

export const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mx-auto max-w-2xl lg:text-center"
                >
                    <h2 className="text-base font-semibold leading-7 text-brand-primary">
                        Voices of Success
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-dark-900 dark:text-light-100 sm:text-4xl">
                        Hear from developers who transformed their careers with us.
                    </p>
                </motion.div>
            </div>
            <div className="relative z-0 mt-16 h-[700px] w-full overflow-hidden"> {/* clip cards so they never overlap header */}
                {/* Fade overlay should sit BEHIND the cards */}
                <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-light-100 via-transparent to-light-100 dark:from-dark-900 dark:via-transparent dark:to-dark-900" />
                <div className="relative z-10">
                    <OrbitalField />
                </div>
            </div>
        </section>
    );
};
