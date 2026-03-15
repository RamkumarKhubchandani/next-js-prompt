"use client";
import Link from 'next/link';
import { Users, FileText, PlusCircle, BarChart, Settings, Shield, ClipboardList, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
    const cards = [
        {
            title: "Upgrade Requests",
            desc: "Review and approve Free -> Pro upgrade requests.",
            icon: <Shield size={32} />,
            href: "/admin/upgrades",
            color: "bg-red-500"
        },
        {
            title: "Manage Users",
            desc: "View users, grant pro status, and manage roles.",
            icon: <Users size={32} />,
            href: "/admin/users",
            color: "bg-blue-500"
        },
        {
            title: "Create Tutorial",
            desc: "Write a new blog post or tutorial.",
            icon: <PlusCircle size={32} />,
            href: "/admin/posts/create",
            color: "bg-green-500"
        },
        {
            title: "Manage Content",
            desc: "Edit or delete existing tutorials.",
            icon: <FileText size={32} />,
            href: "/admin/posts", // Ensure this route exists or link to a listing
            color: "bg-purple-500"
        },
        {
            title: "AI Quiz Reports",
            desc: "See who attempted the AI quiz + full right/wrong answers.",
            icon: <ClipboardList size={32} />,
            href: "/admin/quiz-results",
            color: "bg-teal-500"
        },
        {
            title: "Manage Events",
            desc: "Schedule workshops and update availability.",
            icon: <Calendar size={32} />, // Make sure to import Calendar
            href: "/admin/events",
            color: "bg-pink-500"
        },
        {
            title: "Manage Mentors",
            desc: "Review and approve mentor applications.",
            icon: <CheckCircle size={32} />,
            href: "/admin/mentors",
            color: "bg-indigo-500"
        },
        {
            title: "Platform Settings",
            desc: "Configure site-wide settings (Coming Soon).",
            icon: <Settings size={32} />,
            href: "/admin/settings",
            color: "bg-orange-500"
        }
    ];

    return (
        <div className="min-h-screen bg-dark-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                        <Shield size={40} className="text-brand-primary" />
                        Admin Console
                    </h1>
                    <p className="text-light-400">Welcome back, Admin. What would you like to do today?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, idx) => (
                        <Link href={card.href} key={idx}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-dark-800 p-8 rounded-2xl border border-dark-700 hover:border-brand-primary/50 transition-all h-full group"
                            >
                                <div className={`w-14 h-14 rounded-xl ${card.color} bg-opacity-20 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                                    {card.icon}
                                </div>
                                <h2 className="text-2xl font-bold mb-3 text-white">{card.title}</h2>
                                <p className="text-light-400">{card.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Quick Stats (Mock for now, can be real) */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 flex items-center gap-4">
                        <BarChart className="text-gray-500" />
                        <div>
                            <p className="text-2xl font-bold">12.5k</p>
                            <p className="text-xs text-gray-500">Total Views</p>
                        </div>
                    </div>
                    <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 flex items-center gap-4">
                        <Users className="text-gray-500" />
                        <div>
                            <p className="text-2xl font-bold">1,204</p>
                            <p className="text-xs text-gray-500">Active Learners</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
