"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, proUsers: 0, freeUsers: 0 });
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null); // For dropdown menu

    const isActivePro = (user) => {
        if (!user?.plan || user.plan === 'free') return false;
        if (!user.subscriptionEndDate) return true; // legacy
        const end = new Date(user.subscriptionEndDate);
        return !Number.isNaN(end.getTime()) && end.getTime() > Date.now();
    };

    const formatDate = (value) => {
        if (!value) return '—';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return '—';
        return d.toLocaleDateString();
    };

    const fetchUsers = async () => {
        const res = await fetch('/api/admin/users');
        if (res.ok) {
            const data = await res.json();
            setUsers(data.users);
            setStats(data.stats);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleGrantPro = async (userId, planType) => {
        await fetch('/api/admin/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, action: 'grant_pro', planType })
        });
        setSelectedUser(null); // Close dropdown
        fetchUsers(); // Refresh
    };

    const handleRevokePro = async (userId) => {
        await fetch('/api/admin/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, action: 'revoke_pro' })
        });
        fetchUsers();
    };

    const handleDeleteUser = async (userId, email) => {
        const ok = confirm(`Delete this user?\n\n${email || userId}\n\nThis cannot be undone.`);
        if (!ok) return;
        await fetch(`/api/admin/users?userId=${encodeURIComponent(userId)}`, { method: 'DELETE' });
        fetchUsers();
    };

    const handleEmailPhoneRequest = async (userId, userName, userEmail) => {
        const ok = confirm(`Send email to ${userName} (${userEmail}) requesting their phone number?`);
        if (!ok) return;

        try {
            const res = await fetch('/api/admin/request-phone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, userName, userEmail })
            });

            if (res.ok) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email');
            }
        } catch (error) {
            alert('Error sending email');
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="p-12 text-white">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-dark-900 text-white p-8" onClick={() => setSelectedUser(null)}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Shield className="text-brand-primary" /> Admin Dashboard
                </h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                        <p className="text-light-400 text-sm">Total Users</p>
                        <p className="text-3xl font-bold">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                        <p className="text-light-400 text-sm">Active Pro Members</p>
                        <p className="text-3xl font-bold text-yellow-500">{stats.proUsers}</p>
                    </div>
                    <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                        <p className="text-light-400 text-sm">Free Users</p>
                        <p className="text-3xl font-bold text-blue-400">{stats.freeUsers}</p>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-6 relative">
                    <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl focus:border-brand-primary focus:outline-none text-white"
                    />
                </div>

                {/* Users Table */}
                <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-visible"> {/* Overflow visible for dropdowns */}
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-dark-900 text-light-400 text-sm uppercase tracking-wider">
                                <th className="p-4">User</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Plan</th>
                                <th className="p-4">Pro Ends</th>
                                <th className="p-4">Last Visit</th>
                                <th className="p-4">Last Login</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-700">
                            {filteredUsers.map(user => (
                                <tr key={user._id} className="hover:bg-dark-700/50 transition-colors relative">
                                    <td className="p-4">
                                        <Link
                                            href={`/admin/users/${user._id}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="font-bold hover:text-brand-primary transition-colors"
                                            title="Open user details"
                                        >
                                            {user.name}
                                        </Link>
                                        <div className="text-sm text-light-400">{user.email}</div>
                                    </td>
                                    <td className="p-4">
                                        {user.role === 'admin' ? (
                                            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold border border-red-500/20">ADMIN</span>
                                        ) : isActivePro(user) ? (
                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold border border-green-500/20">PRO</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-bold">FREE</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {user.phone?.number ? (
                                            <div className="text-sm text-light-300">
                                                {user.phone.countryCode} {user.phone.number}
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleEmailPhoneRequest(user._id, user.name, user.email); }}
                                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                            >
                                                📧 Email Request
                                            </button>
                                        )}
                                    </td>
                                    <td className="p-4 text-sm capitalize text-light-300">
                                        {user.plan ? user.plan.replace('pro_', '').replace('_', ' ') : 'Free'}
                                    </td>
                                    <td className="p-4 text-sm text-light-400">
                                        {isActivePro(user) ? formatDate(user.subscriptionEndDate) : (user.subscriptionEndDate ? `Expired ${formatDate(user.subscriptionEndDate)}` : '—')}
                                    </td>
                                    <td className="p-4 text-sm text-light-400 font-bold text-brand-primary">
                                        {user.lastVisitAt ? (
                                            <span title={new Date(user.lastVisitAt).toLocaleString() + " (Indian Standard Time)"}>
                                                {new Date(user.lastVisitAt).toLocaleString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        ) : '—'}
                                    </td>
                                    <td className="p-4 text-sm text-light-400">
                                        {user.lastLoginAt ? (
                                            <span title={new Date(user.lastLoginAt).toLocaleString()}>
                                                {formatDate(user.lastLoginAt)}
                                            </span>
                                        ) : '—'}
                                    </td>
                                    <td className="p-4 text-sm text-light-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right relative">
                                        {user.role !== 'admin' && (
                                            <div className="flex justify-end gap-2">
                                                {isActivePro(user) ? (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleRevokePro(user._id); }}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                                    >
                                                        Revoke Pro
                                                    </button>
                                                ) : (
                                                    <div className="relative inline-block">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedUser(selectedUser === user._id ? null : user._id);
                                                            }}
                                                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors flex items-center gap-1"
                                                        >
                                                            Grant Pro <ChevronDown size={14} />
                                                        </button>

                                                        <AnimatePresence>
                                                            {selectedUser === user._id && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                                    className="absolute right-0 mt-2 w-40 bg-dark-800 border border-dark-600 rounded-lg shadow-2xl z-50 overflow-hidden"
                                                                >
                                                                    <button
                                                                        onClick={() => handleGrantPro(user._id, 'pro_1_day')}
                                                                        className="w-full text-left px-4 py-2 text-sm text-light-200 hover:bg-dark-700 hover:text-white transition-colors"
                                                                    >
                                                                        1 Day
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleGrantPro(user._id, 'pro_2_days')}
                                                                        className="w-full text-left px-4 py-2 text-sm text-light-200 hover:bg-dark-700 hover:text-white transition-colors"
                                                                    >
                                                                        2 Days
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleGrantPro(user._id, 'pro_weekly')}
                                                                        className="w-full text-left px-4 py-2 text-sm text-light-200 hover:bg-dark-700 hover:text-white transition-colors"
                                                                    >
                                                                        1 Week
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleGrantPro(user._id, 'pro_monthly')}
                                                                        className="w-full text-left px-4 py-2 text-sm text-light-200 hover:bg-dark-700 hover:text-white transition-colors"
                                                                    >
                                                                        1 Month
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleGrantPro(user._id, 'pro_yearly')}
                                                                        className="w-full text-left px-4 py-2 text-sm text-light-200 hover:bg-dark-700 hover:text-white transition-colors"
                                                                    >
                                                                        1 Year
                                                                    </button>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                )}

                                                <Link
                                                    href={`/admin/users/${user._id}/activity`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors"
                                                >
                                                    View Activity
                                                </Link>

                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteUser(user._id, user.email); }}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
