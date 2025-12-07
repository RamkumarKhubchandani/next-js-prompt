'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CompleteButton({ postId, initialCompleted = false }) {
    const [completed, setCompleted] = useState(initialCompleted);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleComplete = async () => {
        if (!session) {
            router.push(`/login?callbackUrl=${window.location.pathname}`);
            return;
        }

        if (completed) return;

        setLoading(true);
        try {
            const res = await fetch('/api/user/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId }),
            });

            if (res.ok) {
                setCompleted(true);
                // Dispatch a custom event so the navbar/dashboard can update XP immediately if they are listening
                window.dispatchEvent(new CustomEvent('xp-updated', { detail: { amount: 50, message: 'Tutorial Completed' } }));
            }
        } catch (error) {
            console.error('Failed to complete tutorial:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-8 flex justify-center">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                disabled={loading || completed}
                className={`
                    flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all
                    ${completed 
                        ? 'bg-green-500 text-white cursor-default' 
                        : 'bg-brand-primary text-dark-900 hover:bg-brand-primary/90'
                    }
                    ${loading ? 'opacity-70 cursor-wait' : ''}
                `}
            >
                {completed ? (
                    <>
                        <CheckCircle className="w-6 h-6" />
                        <span>Completed (+50 XP)</span>
                    </>
                ) : (
                    <>
                        <Circle className="w-6 h-6" />
                        <span>Mark as Complete</span>
                    </>
                )}
            </motion.button>
        </div>
    );
}



