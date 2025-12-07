"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function XPNotification() {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const handleXPUpdate = (event) => {
            // event.detail contains { amount: 50, message: "Tutorial Completed" }
            const { amount, message } = event.detail || { amount: 0, message: "XP Earned" };
            setNotification({ amount, message });

            // Hide after 3 seconds
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        };

        window.addEventListener('xp-updated', handleXPUpdate);
        return () => window.removeEventListener('xp-updated', handleXPUpdate);
    }, []);

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-dark-800 border border-brand-primary/50 p-4 rounded-xl shadow-2xl shadow-brand-primary/20 backdrop-blur-lg"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-primary blur-lg opacity-50 animate-pulse"></div>
                        <div className="relative bg-brand-primary text-dark-900 p-2 rounded-lg">
                            <Zap size={24} fill="currentColor" />
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-brand-primary text-lg">+{notification.amount} XP</p>
                        <p className="text-light-300 text-sm">{notification.message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

