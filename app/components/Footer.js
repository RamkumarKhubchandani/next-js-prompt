"use client";
import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

const social = [
  {
    name: "Twitter",
    href: "#",
    icon: (props) => <Twitter {...props} />,
  },
  {
    name: "GitHub",
    href: "#",
    icon: (props) => <Github {...props} />,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (props) => <Linkedin {...props} />,
  },
];

export function Footer() {
  return (
    <footer className="bg-light-100 dark:bg-dark-900 border-t border-dark-700/10 dark:border-dark-700">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center md:order-1">
          <Logo />
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          {social.map((item) => (
            <a key={item.name} href={item.href} className="text-dark-900/60 dark:text-light-200 hover:text-brand-primary transition-colors">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-3 md:mt-0">
          <p className="text-center text-xs leading-5 text-dark-900/60 dark:text-light-200">
            &copy; {new Date().getFullYear()} JSPrompt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
