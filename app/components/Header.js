"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo"; 
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useSession, signOut } from "next-auth/react";

const navigation = [
  { name: "Features", href: "/#features" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Community", href: "/showcase" },
  { name: "Shop", href: "/shop" },
  { name: "DevRooms", href: "/pair" },
  { name: "Jobs", href: "/jobs" },
  { name: "AI Assessment", href: "/ai-quiz" },
  { name: "Tutorials", href: "/tutorials" },
];

export function Header({ showNav = true }) {
    const { data: session, status } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Loading state shell
    if (status === "loading") {
        return (
            <header className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-transparent"
            )}>
                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/">
                                <Logo />
                            </Link>
                        </div>
                    </div>
                 </div>
            </header>
        );
    }

    return (
        <header className={cn(
            "fixed inset-x-0 top-0 z-50 transition-all duration-300",
            isScrolled ? 'bg-light-100/80 dark:bg-dark-800/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        )}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>
                    
                    {/* Center Navigation - Only shown if showNav is true */}
                    {showNav && (
                        <nav className="hidden lg:flex lg:gap-x-6 xl:gap-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-semibold leading-6 text-light-100 hover:text-brand-primary transition-colors whitespace-nowrap"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    )}

                    {/* Right Side - Always shown */}
                    <div className="flex items-center gap-x-4">
                        <ThemeSwitcher />
                        <div className="hidden md:flex items-center gap-x-4">
                            {session ? (
                                <div className="relative" ref={menuRef}>
                                    <button 
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2 text-sm font-semibold leading-6 text-light-100 hover:text-brand-primary transition-colors group"
                                    >
                                        <span className="bg-dark-700 text-brand-primary w-8 h-8 rounded-full flex items-center justify-center font-bold border border-dark-600 group-hover:border-brand-primary transition-colors">
                                            {session.user.name?.charAt(0).toUpperCase()}
                                        </span>
                                        <span className="hidden lg:inline">{session.user.name}</span>
                                        <ChevronDown size={16} className={cn("transition-transform duration-200", userMenuOpen && "rotate-180")} />
                                    </button>

                                    <AnimatePresence>
                                        {userMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-dark-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-dark-700 overflow-hidden"
                                            >
                                                <div className="px-4 py-3 border-b border-dark-700">
                                                    <p className="text-xs text-light-300">Signed in as</p>
                                                    <p className="text-sm font-medium text-white truncate">{session.user.email}</p>
                                                </div>
                                                <div className="py-1">
                                                    <Link 
                                                        href="/dashboard" 
                                                        onClick={() => setUserMenuOpen(false)}
                                                        className="flex items-center px-4 py-3 text-sm text-light-200 hover:bg-dark-700 hover:text-white transition-colors"
                                                    >
                                                        <LayoutDashboard size={16} className="mr-3 text-brand-primary" />
                                                        Dashboard
                                                    </Link>
                                                    <Link 
                                                        href={session.user.username ? `/u/${session.user.username}` : '/dashboard/settings'} 
                                                        onClick={() => setUserMenuOpen(false)}
                                                        className="flex items-center px-4 py-3 text-sm text-light-200 hover:bg-dark-700 hover:text-white transition-colors"
                                                    >
                                                        <User size={16} className="mr-3 text-blue-400" />
                                                        Public Profile
                                                    </Link>
                                                    <button
                                                        onClick={() => signOut({ callbackUrl: '/' })}
                                                        className="flex w-full items-center px-4 py-3 text-sm text-light-200 hover:bg-dark-700 hover:text-white transition-colors text-left"
                                                    >
                                                        <LogOut size={16} className="mr-3 text-red-400" />
                                                        Sign out
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-semibold leading-6 text-light-100 hover:text-brand-primary">
                                        Log in
                                    </Link>
                                    <Link href="/register" className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-dark-900 hover:bg-brand-primary/90 transition-colors">
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Trigger - Always shown */}
                    <div className="lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="inline-flex items-center justify-center rounded-md p-2.5 text-light-200 hover:bg-dark-800 transition-colors"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed inset-0 z-50 bg-dark-900 lg:hidden"
                    >
                        <div className="px-4 sm:px-6 lg:px-8 h-full overflow-y-auto">
                            <div className="flex h-20 items-center justify-between">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    <Logo />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center rounded-md p-2.5 text-light-200 hover:bg-dark-800 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-dark-700">
                                    <div className="space-y-2 py-6">
                                        {showNav && navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-light-100 hover:bg-dark-800 hover:text-brand-primary transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        {session ? (
                                            <>
                                                <div className="flex items-center px-3 py-3 rounded-lg bg-dark-800 mb-4 border border-dark-700">
                                                    <div className="flex-shrink-0">
                                                        <span className="h-10 w-10 rounded-full bg-brand-primary flex items-center justify-center text-dark-900 font-bold text-lg">
                                                            {session.user.name?.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-base font-medium leading-none text-white">{session.user.name}</div>
                                                        <div className="text-sm font-medium leading-none text-light-400 mt-1">{session.user.email}</div>
                                                    </div>
                                                </div>
                                                <Link
                                                    href="/dashboard"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="-mx-3 flex items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-light-100 hover:bg-dark-800 hover:text-white"
                                                >
                                                    <LayoutDashboard size={20} className="mr-3 text-brand-primary" />
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    href={session.user.username ? `/u/${session.user.username}` : '/dashboard/settings'}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="-mx-3 flex items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-light-100 hover:bg-dark-800 hover:text-white"
                                                >
                                                    <User size={20} className="mr-3 text-blue-400" />
                                                    Public Profile
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setMobileMenuOpen(false);
                                                        signOut({ callbackUrl: '/' });
                                                    }}
                                                    className="-mx-3 flex w-full items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-light-100 hover:bg-dark-800 hover:text-white"
                                                >
                                                    <LogOut size={20} className="mr-3 text-red-400" />
                                                    Sign out
                                                </button>
                                            </>
                                        ) : (
                                            <>
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
                                                    className="mt-2 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-dark-900 bg-brand-primary hover:bg-brand-primary/90 text-center"
                                                >
                                                    Sign up
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
