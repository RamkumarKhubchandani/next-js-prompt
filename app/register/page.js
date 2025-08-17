"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Logo } from '../components/Logo';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('All fields are necessary.');
            return;
        }

        try {
            const res = await fetch('/api/student/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                router.push('/login');
            } else {
                const data = await res.json();
                setError(data.message || 'Registration failed.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-dark-900">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 space-y-8 bg-dark-800 rounded-2xl shadow-lg"
            >
                <div className="flex justify-center">
                    <Logo />
                </div>
                <h2 className="text-2xl font-bold text-center text-light-100">
                    Create Your Student Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full rounded-full bg-brand-primary ...">
                        Register
                    </motion.button>
                </form>
                <div className="text-center text-sm text-light-200">
                    Already have an account? <Link href="/login" className="font-semibold text-brand-primary hover:underline">Log in</Link>
                </div>
            </motion.div>
        </div>
    );
}
