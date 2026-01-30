"use client";
import React from "react";
import { cn } from "../lib/utils";

export const Logo = ({ className }) => (
  <div className={cn("flex items-center gap-2", className)}>
    {/* Clean Transparent SVG Logo */}
    <div className="relative w-10 h-10 shrink-0">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(0,245,160,0.6)]"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#05c285" />
            <stop offset="100%" stopColor="#0099cc" />
          </linearGradient>
        </defs>

        {/* Outer Ring - Increased Opacity for Visibility */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#logo-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          className="opacity-40"
        />

        {/* Dynamic Arc */}
        <path
          d="M50 8 A 42 42 0 0 1 92 50"
          stroke="url(#logo-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Inner Bracket "Dev" Symbol */}
        <path
          d="M35 35 L65 50 L35 65"
          stroke="url(#logo-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>

    {/* Text Logo */}
    <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
      Outline<span className="text-teal-600 dark:text-brand-primary">Dev</span>
    </span>
  </div>
);
