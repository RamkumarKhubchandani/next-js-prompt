"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Logo } from '../components/Logo';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError('Invalid credentials.');
                return;
            }

            router.replace('/dashboard'); // Redirect to a student dashboard
        } catch (error) {
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
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full rounded-full bg-brand-primary ...">
                        Log In
                    </motion.button>
                </form>
                <div className="text-center text-sm text-light-200">
                    Don't have an account? <Link href="/register" className="font-semibold text-brand-primary hover:underline">Register</Link>
                </div>
            </motion.div>
        </div>
    );
}
