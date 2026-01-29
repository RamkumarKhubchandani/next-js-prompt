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

    const filteredRequests = filter === 'all'
        ? requests
        : requests.filter(r => r.status === filter);

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            contacted: 'bg-blue-100 text-blue-800 border-blue-300',
            matched: 'bg-green-100 text-green-800 border-green-300',
            completed: 'bg-gray-100 text-gray-800 border-gray-300',
            cancelled: 'bg-red-100 text-red-800 border-red-300'
        };
        return colors[status] || colors.pending;
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending: AlertCircle,
            contacted: Clock,
            matched: CheckCircle,
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
                    <h1 className="text-4xl font-black mb-2">Mentorship Requests</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage and track all mentorship requests</p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {['all', 'pending', 'contacted', 'matched', 'completed', 'cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === status
                                    ? 'bg-brand-primary text-white'
                                    : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                            {status !== 'all' && (
                                <span className="ml-2 text-xs opacity-75">
                                    ({requests.filter(r => r.status === status).length})
                                </span>
                            )}
                        </button>
                    ))}
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
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{request.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(request.createdAt).toLocaleString('en-IN', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short',
                                                timeZone: 'Asia/Kolkata'
                                            })}
                                        </p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-1 ${getStatusColor(request.status)}`}>
                                        {getStatusIcon(request.status)}
                                        {request.status}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail size={16} className="text-gray-400" />
                                        <a href={`mailto:${request.email}`} className="text-brand-primary hover:underline">
                                            {request.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone size={16} className="text-gray-400" />
                                        <a href={`https://wa.me/${request.phone?.replace(/\D/g, '')}`} className="text-green-600 hover:underline font-medium">
                                            {request.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Goal:</span>
                                        <p className="font-medium">{request.goal || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Urgency:</span>
                                        <p className="font-medium">{request.urgency || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Budget:</span>
                                        <p className="font-medium">{request.budget || 'Flexible'}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Tech Stack:</span>
                                        <p className="font-medium">{request.stack?.slice(0, 2).join(', ') || 'N/A'}</p>
                                    </div>
                                </div>

                                {request.description && (
                                    <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-900 rounded-lg">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{request.description}</p>
                                    </div>
                                )}

                                <div className="flex gap-2 flex-wrap">
                                    <button onClick={() => updateStatus(request._id, 'contacted')} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200">
                                        Mark Contacted
                                    </button>
                                    <button onClick={() => updateStatus(request._id, 'matched')} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200">
                                        Mark Matched
                                    </button>
                                    <button onClick={() => updateStatus(request._id, 'completed')} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                                        Mark Completed
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
