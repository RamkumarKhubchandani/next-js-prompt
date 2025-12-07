"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, UserCheck, UserX, Crown, Search } from 'lucide-react';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, proUsers: 0, freeUsers: 0 });
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

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

    const handleTogglePro = async (userId, currentPlan) => {
        const action = currentPlan === 'free' ? 'grant_pro' : 'revoke_pro';
        const planType = 'pro_monthly'; // Default for admin grant

        await fetch('/api/admin/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, action, planType })
        });
        fetchUsers(); // Refresh
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase()) || 
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="p-12 text-white">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-dark-900 text-white p-8">
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
                <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-dark-900 text-light-400 text-sm uppercase tracking-wider">
                                <th className="p-4">User</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Plan</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-700">
                            {filteredUsers.map(user => (
                                <tr key={user._id} className="hover:bg-dark-700/50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold">{user.name}</div>
                                        <div className="text-sm text-light-400">{user.email}</div>
                                    </td>
                                    <td className="p-4">
                                        {user.role === 'admin' ? (
                                            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold border border-red-500/20">ADMIN</span>
                                        ) : (user.plan && user.plan !== 'free') ? (
                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold border border-green-500/20">PRO</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-bold">FREE</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-sm capitalize text-light-300">
                                        {user.plan ? user.plan.replace('_', ' ') : 'Free'}
                                    </td>
                                    <td className="p-4 text-sm text-light-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        {user.role !== 'admin' && (
                                            <button 
                                                onClick={() => handleTogglePro(user._id, user.plan)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                                    user.plan !== 'free' 
                                                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                                                        : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
                                                }`}
                                            >
                                                {user.plan !== 'free' ? 'Revoke Pro' : 'Grant Pro'}
                                            </button>
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

