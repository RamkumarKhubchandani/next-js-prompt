"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils"; // Corrected path

export const Input = ({ className, ...props }) => {
    return (
        <motion.input
            whileFocus={{
                borderColor: "rgba(0, 245, 160, 1)",
                boxShadow: "0 0 15px rgba(0, 245, 160, 0.5)",
            }}
            className={cn(
                "w-full bg-white/80 dark:bg-dark-800 border border-dark-700/10 dark:border-dark-700 text-dark-900 dark:text-light-100 placeholder:text-dark-900/40 dark:placeholder:text-light-100/40 rounded-lg px-4 py-3 focus:outline-none transition-all",
                className
            )}
            {...props}
        />
    );
};
