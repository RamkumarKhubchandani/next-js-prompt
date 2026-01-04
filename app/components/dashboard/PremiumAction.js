'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const PremiumAction = ({ href, icon: Icon, label, gradient, shadow, onClick, delay }) => {
    const Component = href ? Link : 'div';
    const props = href ? { href } : { onClick, className: 'cursor-pointer' };

    return (
        <Component {...props}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative overflow-hidden rounded-xl px-4 py-3 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 ${shadow} shadow-lg transition-all duration-300 min-w-[140px] flex items-center justify-center`}
            >
                {/* Gradient Border via Pseudo-element or layered background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${gradient}`} />
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${gradient}`} />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />

                <div className="relative flex items-center gap-3">
                    <div className={`p-1.5 rounded-full ${gradient} text-white shadow-sm`}>
                        <Icon size={16} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                        {label}
                    </span>
                </div>
            </motion.div>
        </Component>
    );
};
