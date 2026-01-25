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
    <footer className="bg-light-100 dark:bg-dark-900 border-t border-dark-700/10 dark:border-dark-700 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-bold text-dark-900 dark:text-white uppercase tracking-wider mb-4">Training For</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Coding for Kids (Age 10+)</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Junior Developers</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Senior Architects</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Career Switchers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-dark-900 dark:text-white uppercase tracking-wider mb-4">Learning Modes</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">1-on-1 Mentorship</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">5-Person Squads</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Corporate Group Training</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Weekend Workshops</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-dark-900 dark:text-white uppercase tracking-wider mb-4">Top Skills</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">React & Next.js</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Node.js Microservices</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Playwright Automation</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Generative AI Engineering</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-dark-900 dark:text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-brand-primary">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-1 mb-4 md:mb-0">
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
              &copy; {new Date().getFullYear()} JSPrompt. Rated 4.9/5 by 2,000+ Students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
