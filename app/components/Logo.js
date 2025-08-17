"use client";
import React from "react";
import { cn } from "../lib/utils";

export const Logo = ({ className }) => (
  <div className={cn("flex items-center", className)}>
    <svg
      width="48"
      height="48"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f5a0">
            <animate attributeName="stop-color" values="#00f5a0; #00b8d4; #00f5a0" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#00b8d4">
            <animate attributeName="stop-color" values="#00b8d4; #00f5a0; #00b8d4" dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <g transform="rotate(15 50 50)">
        {/* Stylized 'S' curve */}
        <path
          d="M 30,70 C 10,70 10,30 30,30 L 70,30"
          stroke="url(#logoGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        >
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
        </path>
        {/* Stylized 'J' curve forming the '>' prompt */}
        <path
          d="M 70,30 C 90,30 90,70 70,70 L 30,70 L 50,50"
          stroke="url(#logoGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
            <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="10s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
    <span className="ml-2 text-2xl font-bold text-light-100 tracking-wider">
      JSPrompt
    </span>
  </div>
);
