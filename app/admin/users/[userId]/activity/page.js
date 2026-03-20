"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { use } from 'react';
import { ArrowLeft, History, MapPin, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

export default function UserActivityPage({ params }) {
    const { userId } = use(params);
    const [data, setData] = useState({ user: null, logs: [] });
    const [loading, setLoading] = useState(true);

    const fetchActivity = async () => {
        const res = await fetch(`/api/admin/users/${userId}/activity`);
        if (res.ok) {
            const json = await res.json();
            setData(json);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchActivity();
    }, [userId]);

    if (loading) return <div className="p-12 text-white">Loading Activity logs...</div>;
    if (!data.user) return <div className="p-12 text-white">User not found.</div>;

    return (
        <div className="min-h-screen bg-dark-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/users" className="p-2 hover:bg-dark-800 rounded-full transition-colors">
                            <ArrowLeft />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <History className="text-brand-primary" /> User Activity History
                            </h1>
                            <p className="text-light-400">Tracking every move of <strong>{data.user.name}</strong></p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-brand-primary">{data.user.email}</div>
                        <div className="text-xs text-light-500">User ID: {userId}</div>
                    </div>
                </div>

                <div className="space-y-4">
                    {data.logs.length === 0 ? (
                        <div className="bg-dark-800 p-12 text-center rounded-2xl border border-dark-700">
                            <p className="text-light-500 italic">No activity logs found for this user.</p>
                        </div>
                    ) : (
                        data.logs.map((log, index) => (
                            <motion.div
                                key={log._id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-dark-800 p-5 rounded-2xl border border-dark-700 flex items-start gap-4 hover:border-brand-primary/30 transition-all group"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${log.action === 'page_view' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                                    }`}>
                                    {log.action === 'page_view' ? <MapPin size={20} /> : <MousePointer2 size={20} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="font-bold text-light-100 uppercase text-xs tracking-wider flex items-center gap-2">
                                            {log.action.replace('_', ' ')}
                                            <span className="w-1 h-1 bg-dark-600 rounded-full"></span>
                                            <span className="text-light-500 lowercase font-normal">
                                                {new Date(log.timestamp).toLocaleTimeString('en-IN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                    timeZone: 'Asia/Kolkata'
                                                })}
                                            </span>
                                        </div>
                                        <div className="text-[10px] text-light-500 font-mono">
                                            {new Date(log.timestamp).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <span className="text-xs text-light-500 whitespace-nowrap font-medium">Moved to:</span>
                                            <code className="text-sm text-brand-primary font-bold bg-brand-primary/5 px-2 py-0.5 rounded truncate border border-brand-primary/20">
                                                {log.path}
                                            </code>
                                        </div>

                                        {log.fromPath && log.fromPath !== 'direct' && (
                                            <div className="flex items-center gap-2 opacity-50 overflow-hidden">
                                                <span className="text-xs text-light-500 whitespace-nowrap">Coming from:</span>
                                                <code className="text-[11px] text-light-400 bg-dark-700 px-2 py-0.5 rounded truncate italic border border-white/5">
                                                    {log.fromPath}
                                                </code>
                                            </div>
                                        )}
                                    </div>

                                    {log.metadata?.title && (
                                        <div className="mt-3 text-[10px] text-light-600 italic">
                                            Page Title: {log.metadata.title}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
