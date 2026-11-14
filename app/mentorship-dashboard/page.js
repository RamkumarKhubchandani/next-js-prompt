"use client";
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function MentorshipDashboard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('/api/mentorship/requests');
            const data = await response.json();
            if (data.success) {
                setRequests(data.requests);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch('/api/mentorship/requests', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            if (response.ok) {
                fetchRequests(); // Refresh list
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredRequests = requests.filter(r => {
        const matchesStatus = filter === 'all' || r.status === filter;
        const matchesType = typeFilter === 'all' || r.requestType === typeFilter;
        return matchesStatus && matchesType;
    });

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
            contacted: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
            matched: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
            scheduled: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
            completed: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
            cancelled: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
        };
        return colors[status] || colors.pending;
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending: AlertCircle,
            contacted: Clock,
            matched: CheckCircle,
            scheduled: CheckCircle,
            completed: CheckCircle,
            cancelled: XCircle
        };
        const Icon = icons[status] || AlertCircle;
        return <Icon size={16} />;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
            <Header />

            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-black mb-2">Inquiries &amp; Mentorship Requests</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage and track client hire inquiries, 1-on-1 consultations, and mentorship requests</p>
                </div>

                {/* Type Filter */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-gray-500 mr-1">Type:</span>
                    {[
                        { id: 'all', label: 'All Types' },
                        { id: 'Hire Inquiry', label: '💼 Hire Inquiries' },
                        { id: 'Mentorship', label: '🎓 Mentorship' },
                        { id: '1-on-1 Call', label: '📞 1-on-1 Calls' },
                    ].map((t) => {
                        const count = t.id === 'all'
                            ? requests.length
                            : requests.filter(r => r.requestType === t.id).length;
                        const isActive = typeFilter === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTypeFilter(t.id)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                                    isActive
                                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm'
                                        : 'bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-700 hover:bg-gray-100 dark:hover:bg-dark-700'
                                }`}
                            >
                                {t.label}
                                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                                    isActive ? 'bg-white/20 text-white dark:bg-gray-900/20 dark:text-gray-900' : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
                                }`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-xs uppercase tracking-wider font-bold text-gray-500 mr-1">Status:</span>
                    {['all', 'pending', 'contacted', 'matched', 'completed', 'cancelled'].map((status) => {
                        const count = typeFilter === 'all'
                            ? requests.filter(r => r.status === status).length
                            : requests.filter(r => r.status === status && r.requestType === typeFilter).length;
                        const isActive = filter === status;
                        return (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-700 hover:bg-gray-100 dark:hover:bg-dark-700'
                                }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                <span className="ml-1.5 text-xs opacity-75">
                                    ({count})
                                </span>
                            </button>
                        );
                    })}
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full mx-auto"></div>
                        <p className="mt-4 text-gray-500">Loading requests...</p>
                    </div>
                ) : filteredRequests.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-dark-800 rounded-2xl">
                        <p className="text-gray-500">No requests found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredRequests.map((request, index) => (
                            <motion.div
                                key={request._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-700 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <h3 className="text-xl font-bold">{request.name}</h3>
                                            {request.company && (
                                                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-600">
                                                    🏢 {request.company}
                                                </span>
                                            )}
                                            {request.requestType && (
                                                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                                                    request.requestType === '1-on-1 Call'
                                                        ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800'
                                                        : request.requestType === 'Hire Inquiry'
                                                        ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800'
                                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800'
                                                }`}>
                                                    {request.requestType === 'Hire Inquiry' ? '💼 Hire Inquiry' : request.requestType}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(request.createdAt).toLocaleString('en-IN', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short',
                                                timeZone: 'Asia/Kolkata'
                                            })}
                                        </p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-1.5 ${getStatusColor(request.status)}`}>
                                        {getStatusIcon(request.status)}
                                        <span className="capitalize">{request.status}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail size={16} className="text-gray-400" />
                                        <a href={`mailto:${request.email}`} className="text-brand-primary hover:underline font-medium">
                                            {request.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone size={16} className="text-gray-400" />
                                        {request.phone && request.phone !== 'N/A' ? (
                                            <a
                                                href={`https://wa.me/${String(request.phone).replace(/\D/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:underline font-medium"
                                            >
                                                {request.phone}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">Not provided</span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm bg-gray-50/50 dark:bg-dark-900/50 p-3 rounded-xl border border-gray-100 dark:border-dark-700">
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">Goal / Role</span>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{request.goal || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">Timeline / Urgency</span>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{request.urgency || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">Budget</span>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{request.budget || 'Flexible'}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">Tech Stack / Scope</span>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
                                            {Array.isArray(request.stack) ? request.stack.slice(0, 3).join(', ') : (request.stack || 'N/A')}
                                        </p>
                                    </div>
                                </div>

                                {request.description && (
                                    <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-900 rounded-lg border border-gray-100 dark:border-dark-700">
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Details &amp; Message</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{request.description}</p>
                                    </div>
                                )}

                                <div className="flex gap-2 flex-wrap items-center">
                                    <span className="text-xs font-semibold text-gray-400 mr-1">Update Status:</span>
                                    <button onClick={() => updateStatus(request._id, 'contacted')} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                                        Mark Contacted
                                    </button>
                                    <button onClick={() => updateStatus(request._id, 'matched')} className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-medium hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
                                        Mark Matched
                                    </button>
                                    <button onClick={() => updateStatus(request._id, 'completed')} className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                                        Mark Completed
                                    </button>
                                    <button onClick={() => updateStatus(request._id, 'cancelled')} className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
                                        Mark Cancelled
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
