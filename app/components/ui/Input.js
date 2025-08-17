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
                "w-full bg-dark-800 border border-dark-700 text-light-100 rounded-lg px-4 py-3 focus:outline-none transition-all",
                className
            )}
            {...props}
        />
    );
};
