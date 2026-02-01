"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown, Loader2, GraduationCap } from "lucide-react";
import { cn } from "../lib/utils";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useSession, signOut } from "next-auth/react";
import ConnectOneToOneModal from "./public/ConnectOneToOneModal";

const navigation = [
    { name: "Events", href: "/events", isNew: true },
    { name: "Find Mentor", href: "/mentorship", isNew: true },
    { name: "Become Mentor", href: "/become-mentor" },
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Community", href: "/showcase" },
    { name: "Jobs", href: "/jobs" },
    { name: "AI Assessment", href: "/ai-quiz" },
    { name: "Tutorials", href: "/blogs" },
];

export function Header({ showNav = true }) {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [navLoading, setNavLoading] = useState(false);
    const [navTarget, setNavTarget] = useState(null);
    const [connectOpen, setConnectOpen] = useState(false);
    const [connectConfig, setConnectConfig] = useState({ headline: '', subhead: '', defaultNotes: '', ctaLabel: '' });
    const menuRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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

    function startNavigate(href) {
        if (!href) return;
        const targetPath = String(href).split("?")[0].split("#")[0];
        // Ignore same-page anchors like "/#features"
        if (String(href).includes("#") && (targetPath === "" || targetPath === pathname)) return;
        // If we're already there, don't show a loading indicator.
        if (pathname === targetPath) {
            setUserMenuOpen(false);
            setMobileMenuOpen(false);
            return;
        }
        setNavTarget(targetPath);
        setNavLoading(true);
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
    }

    // Clear nav loading once the route changes to the expected destination.
    useEffect(() => {
        if (!navLoading || !navTarget) return;
        if (pathname === navTarget) {
            setNavLoading(false);
            setNavTarget(null);
        }
    }, [pathname, navLoading, navTarget]);

    // Allow other pages to open the global connect modal with custom messaging.
    useEffect(() => {
        const handler = (e) => {
            const detail = e?.detail && typeof e.detail === 'object' ? e.detail : {};
            setConnectConfig({
                headline: detail.headline || '',
                subhead: detail.subhead || '',
                defaultNotes: detail.defaultNotes || '',
                ctaLabel: detail.ctaLabel || '',
            });
            setConnectOpen(true);
        };
        window.addEventListener('open-connect-modal-global', handler);
        return () => window.removeEventListener('open-connect-modal-global', handler);
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
            // Always keep header readable in both themes; use a glass look.
            "fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-lg border-b",
            isScrolled
                ? "bg-light-100/80 dark:bg-dark-800/80 shadow-lg border-dark-700/20 dark:border-dark-700/60"
                : "bg-light-100/60 dark:bg-dark-800/40 border-dark-700/10 dark:border-dark-700/40"
        )}>
            {/* Route-loading indicator (helps users understand navigation is happening) */}
            <AnimatePresence>
                {navLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-x-0 top-0 h-1 bg-dark-700/60 overflow-hidden"
                    >
                        <motion.div
                            className="h-full w-1/3 bg-gradient-to-r from-transparent via-brand-primary to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "300%" }}
                            transition={{ duration: 1.1, ease: "linear", repeat: Infinity }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Full-width header so logo can sit further left */}
            <div className="w-full px-3 sm:px-4 lg:px-6">
                <div className="grid grid-cols-[auto,1fr,auto] items-center h-20 gap-3 relative">
                    <div className="flex items-center pr-1">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>

                    {/* Center Navigation - Only shown if showNav is true */}
                    {showNav && (
                        <nav className="hidden lg:flex min-w-0 justify-center gap-x-5 xl:gap-x-7">
                            {navigation.map((item) => {
                                if (item.authOnly && !session) return null;

                                // On dashboard, ONLY show "Become Mentor" in the center nav
                                if (pathname === '/dashboard' && item.href !== '/become-mentor') {
                                    return null;
                                }

                                return (
                                    <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                                        <Link
                                            href={item.href}
                                            onClick={() => {
                                                if (String(item.href).startsWith("/#")) return;
                                                startNavigate(item.href);
                                            }}
                                            className="relative text-sm font-semibold leading-6 text-dark-900 dark:text-light-100 hover:text-brand-primary transition-colors whitespace-nowrap flex items-center gap-2"
                                        >
                                            {item.name}
                                            {item.isNew && (
                                                <span className="absolute -top-1.5 -right-6 z-20 inline-flex items-center justify-center rounded-full bg-brand-primary px-1.5 py-0.5 text-[9px] font-extrabold text-dark-900 shadow-sm border border-brand-primary/50 leading-none">
                                                    NEW
                                                </span>
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>
                    )}

                    {/* Right Side - Always shown */}
                    <div className="flex items-center gap-x-3 justify-end">
                        {/* 1:1 Connect CTA in the top header (all pages) */}
                        <button
                            type="button"
                            onClick={() => {
                                // On lesson pages, let the page-specific modal open (it has course/day context).
                                if (pathname?.startsWith('/path/')) {
                                    try { window.dispatchEvent(new CustomEvent('open-connect-modal')); } catch { }
                                    return;
                                }
                                setConnectConfig({
                                    headline: 'Book a 1:1 call',
                                    subhead: 'Get live debugging, project help, and a clear next-step roadmap.',
                                    defaultNotes: '',
                                    ctaLabel: 'Send request',
                                });
                                setConnectOpen(true);
                            }}
                            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-full font-extrabold text-xs tracking-wider text-dark-900 bg-gradient-to-r from-brand-primary via-emerald-300 to-brand-primary shadow-lg shadow-brand-primary/25 border border-brand-primary/30 hover:shadow-brand-primary/40 hover:opacity-95 transition-all active:scale-[0.98]"
                        >
                            1:1 CONNECT
                        </button>
                        <ThemeSwitcher />
                        {navLoading && (
                            <div className="hidden sm:flex items-center gap-2 text-xs text-light-300">
                                <Loader2 size={14} className="animate-spin text-light-300" />
                                Loading…
                            </div>
                        )}
                        <div className="hidden md:flex items-center gap-x-4">
                            {session ? (
                                <div className="relative" ref={menuRef}>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2 text-sm font-semibold leading-6 text-dark-900 dark:text-light-100 hover:text-brand-primary transition-colors group"
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
                                                        onClick={() => startNavigate("/dashboard")}
                                                        className={cn(
                                                            "flex items-center px-4 py-3 text-sm transition-colors",
                                                            navLoading && navTarget === "/dashboard"
                                                                ? "text-light-100 bg-dark-700/60 cursor-wait"
                                                                : "text-light-200 hover:bg-dark-700 hover:text-white"
                                                        )}
                                                    >
                                                        <LayoutDashboard size={16} className="mr-3 text-brand-primary" />
                                                        Dashboard
                                                        {navLoading && navTarget === "/dashboard" && (
                                                            <Loader2 size={16} className="ml-auto animate-spin text-light-300" />
                                                        )}
                                                    </Link>
                                                    <Link
                                                        href="/become-mentor"
                                                        onClick={() => startNavigate("/become-mentor")}
                                                        className="flex items-center px-4 py-3 text-sm text-light-200 hover:bg-dark-700 hover:text-white transition-colors"
                                                    >
                                                        <GraduationCap size={16} className="mr-3 text-purple-400" />
                                                        Become Mentor
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
                                    <Link href="/login" className="text-sm font-semibold leading-6 text-dark-900 dark:text-light-100 hover:text-brand-primary">
                                        Log in
                                    </Link>
                                    <Link href="/register" className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-dark-900 hover:bg-brand-primary/90 transition-colors">
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Trigger - Always shown */}
                        <div className="lg:hidden ml-2">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="inline-flex items-center justify-center rounded-md p-2.5 text-dark-900 dark:text-light-200 hover:bg-dark-800/10 dark:hover:bg-dark-800 transition-colors"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {/* Mobile menu - Portalled to body to avoid z-index/transform clipping */}
            {
                mounted && createPortal(
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: "100%" }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: "100%" }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="fixed inset-0 z-[99999] bg-dark-900 lg:hidden"
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
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (pathname?.startsWith('/path/')) {
                                                            try { window.dispatchEvent(new CustomEvent('open-connect-modal')); } catch { }
                                                            setMobileMenuOpen(false);
                                                            return;
                                                        }
                                                        setMobileMenuOpen(false);
                                                        setConnectConfig({
                                                            headline: 'Book a 1:1 call',
                                                            subhead: 'Get live debugging, project help, and a clear next-step roadmap.',
                                                            defaultNotes: '',
                                                            ctaLabel: 'Send request',
                                                        });
                                                        setConnectOpen(true);
                                                    }}
                                                    className="w-full text-left -mx-3 block rounded-lg px-3 py-3 text-base font-extrabold leading-7 text-dark-900 bg-gradient-to-r from-brand-primary via-emerald-300 to-brand-primary shadow-lg shadow-brand-primary/20 border border-brand-primary/30"
                                                >
                                                    1:1 Connect (Expert Help)
                                                    <span className="block mt-1 text-xs font-semibold text-dark-900/80">
                                                        Live debugging • Project help • Career guidance
                                                    </span>
                                                </button>
                                                {showNav && navigation.map((item) => {
                                                    if (item.authOnly && !session) return null;
                                                    return (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            onClick={() => {
                                                                if (String(item.href).startsWith("/#")) {
                                                                    setMobileMenuOpen(false);
                                                                    return;
                                                                }
                                                                startNavigate(item.href);
                                                            }}
                                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-light-100 hover:bg-dark-800 hover:text-brand-primary transition-colors"
                                                        >
                                                            {item.name}
                                                            {item.isNew && (
                                                                <span className="ml-2 inline-flex items-center rounded-md bg-brand-primary/10 px-2 py-0.5 text-xs font-medium text-brand-primary ring-1 ring-inset ring-brand-primary/20">
                                                                    New
                                                                </span>
                                                            )}
                                                        </Link>
                                                    );
                                                })}
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
                                                            onClick={() => startNavigate("/dashboard")}
                                                            className="-mx-3 flex items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-light-100 hover:bg-dark-800 hover:text-white"
                                                        >
                                                            <LayoutDashboard size={20} className="mr-3 text-brand-primary" />
                                                            Dashboard
                                                            {navLoading && navTarget === "/dashboard" && (
                                                                <Loader2 size={18} className="ml-auto animate-spin text-light-300" />
                                                            )}
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
                    </AnimatePresence>,
                    document.body
                )
            }

            {/* Global connect modal for non-lesson pages */}
            <ConnectOneToOneModal
                open={connectOpen}
                onClose={() => setConnectOpen(false)}
                sessionUser={session?.user}
                headline={connectConfig.headline}
                subhead={connectConfig.subhead}
                defaultNotes={connectConfig.defaultNotes}
                ctaLabel={connectConfig.ctaLabel}
            />
        </header >
    );
};
