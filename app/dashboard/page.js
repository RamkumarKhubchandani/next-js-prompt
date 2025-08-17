"use client";
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const { data: session } = useSession();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dark-900 text-light-100">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8"
            >
                <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
                <p className="text-xl text-light-200 mb-8">
                    Hello, {session?.user?.name || 'Student'}!
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="rounded-full bg-brand-primary px-8 py-3 text-base font-semibold text-dark-900"
                >
                    Sign Out
                </motion.button>
            </motion.div>
        </div>
    );
}
