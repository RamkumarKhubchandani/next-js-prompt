"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Check, X, Clock, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function MentorAdmin() {
    const { data: session } = useSession();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await fetch('/api/admin/mentors/list');
            if (res.ok) {
                const data = await res.json();
                setApplications(data.applications);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const res = await fetch('/api/admin/mentors/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            if (res.ok) {
                fetchApplications(); // Refresh
            }
        } catch (err) {
            alert("Failed to update status");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-24">
                <h1 className="text-3xl font-bold mb-8 dark:text-white">Mentor Applications</h1>

                <div className="grid gap-6">
                    {applications.map(app => (
                        <div key={app._id} className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                                        {app.userId?.name || 'Unknown User'}
                                        <span className={`text-xs px-2 py-1 rounded-full ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {app.status.toUpperCase()}
                                        </span>
                                    </h3>
                                    <p className="text-sm text-gray-500">{app.userId?.email}</p>
                                </div>
                                <div className="text-right text-sm text-gray-500">
                                    <p>{new Date(app.createdAt).toLocaleDateString()}</p>
                                    <p>{app.country}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">Expertise</p>
                                    <div className="flex flex-wrap gap-2">
                                        {app.skills?.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-dark-700 rounded text-xs font-medium dark:text-gray-300">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase mb-1">Details</p>
                                    <p className="text-sm dark:text-gray-300">Exp: {app.yearsExperience} years</p>
                                    <p className="text-sm dark:text-gray-300">Rate: ${app.hourlyRate}/hr</p>
                                    {app.linkedin && (
                                        <a href={app.linkedin} target="_blank" className="text-sm text-brand-primary flex items-center gap-1 mt-1 hover:underline">
                                            <Linkedin size={14} /> LinkedIn Profile
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-sm font-bold text-gray-500 uppercase mb-1">Bio</p>
                                <p className="text-sm dark:text-gray-300 bg-gray-50 dark:bg-dark-900 p-3 rounded-lg border border-gray-100 dark:border-dark-700">
                                    {app.bio}
                                </p>
                            </div>

                            {app.status === 'pending' && (
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-dark-700">
                                    <button
                                        onClick={() => handleUpdateStatus(app._id, 'rejected')}
                                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                                    >
                                        <X size={16} /> Reject
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(app._id, 'approved')}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center gap-2"
                                    >
                                        <Check size={16} /> Approve & Onboard
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    {applications.length === 0 && (
                        <div className="text-center py-20 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold dark:text-white">No Pending Applications</h3>
                            <p className="text-gray-500">Wait for new mentors to apply.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
