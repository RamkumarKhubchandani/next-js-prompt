"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Calendar, CheckCircle2, Video, Clock } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function MentorDashboard() {
    const { data: session } = useSession();
    // Mock Data for MVP - In real app, fetch from /api/mentor/requests
    const requests = [
        { id: 1, student: "Alice Johnson", topic: "React Hooks Deep Dive", date: "2025-02-15T10:00:00", status: "assigned", message: "I'm struggling with useEffect dependencies." },
        { id: 2, student: "Bob Smith", topic: "System Design Mock Interview", date: "2025-02-16T14:00:00", status: "assigned", message: "Need help preparing for Google L4 interview." }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white">Mentor Dashboard</h1>
                        <p className="text-gray-500">Manage your sessions and students</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        <CheckCircle2 size={18} /> Profile Active
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Stats */}
                    <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-700">
                        <p className="text-gray-500 text-sm font-bold uppercase mb-1">Total Earnings</p>
                        <p className="text-4xl font-black text-dark-900 dark:text-white">$1,250</p>
                    </div>
                    <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-700">
                        <p className="text-gray-500 text-sm font-bold uppercase mb-1">Upcoming Sessions</p>
                        <p className="text-4xl font-black text-brand-primary">2</p>
                    </div>
                    <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-700">
                        <p className="text-gray-500 text-sm font-bold uppercase mb-1">Student Rating</p>
                        <p className="text-4xl font-black text-yellow-500">5.0</p>
                    </div>
                </div>

                <h2 className="text-xl font-bold mt-12 mb-6 dark:text-white">Assigned Sessions</h2>
                <div className="space-y-4">
                    {requests.map(req => (
                        <div key={req.id} className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                                    <Video size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg dark:text-white">{req.topic}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">Student: {req.student}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(req.date).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {new Date(req.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500 italic">"{req.message}"</p>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none px-6 py-3 bg-brand-primary text-dark-900 font-bold rounded-xl hover:opacity-90 transition-opacity">
                                    Join Meeting
                                </button>
                                <button className="flex-1 md:flex-none px-6 py-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                                    Reschedule
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <Footer />
        </div>
    );
}
