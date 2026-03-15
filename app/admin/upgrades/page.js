"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Check, X, Shield, Clock, Search, Loader2 } from 'lucide-react';

export default function UpgradeRequestsPage() {
    const { data: session } = useSession();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await fetch('/api/admin/upgrades');
            if (res.ok) {
                const data = await res.json();
                setRequests(data.requests || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        setProcessing(id);
        try {
            const res = await fetch(`/api/admin/upgrades/${id}/approve`, { method: 'POST' });
            if (res.ok) {
                // Remove from list or mark as approved
                setRequests(prev => prev.map(r => r._id === id ? { ...r, status: 'approved' } : r));
            } else {
                alert("Failed to approve");
            }
        } catch (e) {
            console.error(e);
            alert("Error approving");
        } finally {
            setProcessing(null);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-dark-900 text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Shield className="text-brand-primary" size={32} />
                    Pro Access Requests
                </h1>

                <div className="bg-dark-800 rounded-2xl border border-dark-700 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-dark-700/50 text-light-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4">User</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Requested At</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-700">
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No pending requests found.
                                    </td>
                                </tr>
                            ) : (
                                requests.map(req => (
                                    <tr key={req._id} className="hover:bg-dark-700/30 transition-colors">
                                        <td className="p-4 font-medium">{req.username || 'N/A'}</td>
                                        <td className="p-4 font-mono text-sm text-gray-400">{req.email}</td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {new Date(req.requestedAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${req.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                                    req.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                                        'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            {req.status === 'pending' && (
                                                <button
                                                    onClick={() => handleApprove(req._id)}
                                                    disabled={processing === req._id}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-dark-900 font-bold rounded-lg text-sm transition-colors disabled:opacity-50"
                                                >
                                                    {processing === req._id ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                                                    Approve
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
