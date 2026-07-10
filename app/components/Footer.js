"use client";
import React from "react";
import { Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

const social = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/outlinedev",
    icon: (props) => <Linkedin {...props} />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/outlinedev.io/",
    icon: (props) => <Instagram {...props} />,
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[#050510] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* GLOW EFFECTS & TEXTURE */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent shadow-[0_0_20px_2px_rgba(0,245,160,0.3)]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px]" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Expertise</h3>
            <ul className="space-y-4">
              <li><Link href="/mentors/react-mentors-in-online" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">React Mentors</Link></li>
              <li><Link href="/mentors/node-mentors-in-online" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">Node.js Experts</Link></li>
              <li><Link href="/mentors/playwright-mentors-in-online" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">Playwright Helpers</Link></li>
              <li><Link href="/mentors/aws-mentors-in-online" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">AWS Consultants</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Services</h3>
            <ul className="space-y-4">
              <li><Link href="/mentorship" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">1-on-1 Mentorship</Link></li>
              <li><Link href="/code-review" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">Code Review</Link></li>
              <li><Link href="/mock-interviews" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">Mock Interviews</Link></li>
              <li><Link href="/team-training" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">Team Training</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">About Us</Link></li>
              <li><Link href="/career" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">Careers @ OutlineDev</Link></li>
              <li><Link href="/blogs" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">Tech Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">Contact Support</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-brand-primary hover:pl-2 transition-all duration-300 block text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Programmatic SEO Link Farm */}
        <div className="border-t border-white/5 pt-10 pb-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-4">Popular Technologies</h4>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {[
                  { name: "React Tutors", href: "/mentors/react-mentors-in-online" },
                  { name: "Redux State", href: "/mentors/redux-mentors-in-online" },
                  { name: "Node.js Mentors", href: "/mentors/node-mentors-in-online" },
                  { name: "JavaScript Mentoring", href: "/mentors/javascript-mentors-in-online" },
                  { name: "TypeScript Experts", href: "/mentors/typescript-mentors-in-online" },
                  { name: "Angular Teachers", href: "/mentors/angular-mentors-in-online" },
                  { name: "Vue Coaches", href: "/mentors/vue-mentors-in-online" },
                  { name: "Playwright Automation", href: "/mentors/playwright-mentors-in-online" },
                  { name: "Python Instructors", href: "/mentors/python-mentors-in-online" },
                  { name: "Micro Frontends (MFE)", href: "/mentors/mfe-mentors-in-online" },
                  { name: "AI Front End", href: "/mentors/aifrontend-mentors-in-online" },
                  { name: "HTML & CSS Layouts", href: "/mentors/html-mentors-in-online" }
                ].map(item => (
                  <Link key={item.name} href={item.href} className="text-gray-500 hover:text-brand-primary transition-colors">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-4">Top Tech Hubs</h4>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {[
                  { name: "London", href: "/mentors/react-mentors-in-london" },
                  { name: "San Francisco", href: "/mentors/react-mentors-in-san-francisco" },
                  { name: "New York", href: "/mentors/react-mentors-in-new-york" },
                  { name: "Berlin", href: "/mentors/react-mentors-in-berlin" },
                  { name: "Toronto", href: "/mentors/react-mentors-in-toronto" },
                  { name: "Singapore", href: "/mentors/react-mentors-in-singapore" },
                  { name: "Sydney", href: "/mentors/react-mentors-in-sydney" },
                  { name: "Dubai", href: "/mentors/react-mentors-in-dubai" },
                  { name: "Bangalore", href: "/mentors/react-mentors-in-bangalore" },
                  { name: "Mumbai", href: "/mentors/react-mentors-in-mumbai" },
                  { name: "Pune", href: "/mentors/react-mentors-in-pune" },
                  { name: "Hyderabad", href: "/mentors/react-mentors-in-hyderabad" },
                  { name: "Austin", href: "/mentors/react-mentors-in-austin" },
                  { name: "Seattle", href: "/mentors/react-mentors-in-seattle" },
                  { name: "Boston", href: "/mentors/react-mentors-in-boston" },
                  { name: "Dublin", href: "/mentors/react-mentors-in-dublin" },
                  { name: "Tokyo", href: "/mentors/react-mentors-in-tokyo" }
                ].map(item => (
                  <Link key={item.name} href={item.href} className="text-gray-500 hover:text-brand-primary transition-colors">
                    Tutors in {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-green-600 flex items-center justify-center font-black text-dark-900 shadow-lg shadow-brand-primary/20 text-lg">OD</div>
            <div>
              <span className="block text-xl font-bold text-white tracking-tight">OutlineDev</span>
              <span className="block text-xs text-gray-500 uppercase tracking-widest">Premium Mentorship</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 font-medium">
            &copy; {new Date().getFullYear()} OutlineDev Inc. <span className="hidden sm:inline">|</span> Designed for Excellence.
          </p>

          {/* Socials - Glass Effect */}
          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-full border border-white/5">
            {social.map((item) => (
              <a key={item.name} href={item.href} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
