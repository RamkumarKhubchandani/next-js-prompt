"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./Logo"; // Replaced JSPromptLogo
import ContactUsDialog from "./contactus";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils"; // We will create this utility file

const navigation = [
  { name: "Features", href: "/#features" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "AI Assessment", href: "/ai-quiz" },
  { name: "Tutorials", href: "/tutorials" },
];

export function Header({ showNav = true }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-800/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>
                    {showNav && (
                        <nav className="hidden md:flex md:gap-x-12">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-semibold leading-6 text-light-100 hover:text-brand-primary transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    )}
                    {showNav && (
                        <div className="hidden md:flex items-center gap-x-4">
                            <Link href="/login" className="text-sm font-semibold leading-6 text-light-100 hover:text-brand-primary">
                                Log in
                            </Link>
                            <Link href="/register" className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-dark-900">
                                Sign up
                            </Link>
                        </div>
                    )}
                    {showNav && (
                        <div className="md:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="inline-flex items-center justify-center rounded-md p-2.5 text-light-200"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {showNav && (
                <motion.div
                    initial={false}
                    animate={mobileMenuOpen ? "open" : "closed"}
                    variants={{
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: "-100%" },
                    }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden fixed inset-0 z-50 bg-dark-900"
                >
                    <div className="px-4 sm:px-6 lg:px-8 h-full">
                        <div className="flex h-20 items-center justify-between">
                            <Link href="/">
                                <Logo />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="inline-flex items-center justify-center rounded-md p-2.5 text-light-200"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-dark-700">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-light-100 hover:bg-dark-800"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-light-100 hover:bg-dark-800"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="mt-2 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-light-100 hover:bg-dark-800"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </header>
    );
};
