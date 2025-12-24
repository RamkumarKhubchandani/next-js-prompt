'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CompleteButton({
    postId,
    initialCompleted = false,
    variant = 'default', // 'default' | 'compact'
    className = '',
    containerClassName = ''
}) {
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

    const isCompact = variant === 'compact';

    const containerCls = isCompact
        ? `flex ${containerClassName}`
        : `my-8 flex justify-center ${containerClassName}`;

    const buttonBase = isCompact
        ? 'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all'
        : 'flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all';

    const iconCls = isCompact ? 'w-5 h-5' : 'w-6 h-6';

    return (
        <div className={containerCls}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                disabled={loading || completed}
                className={`
                    ${buttonBase}
                    ${completed 
                        ? 'bg-green-500 text-white cursor-default' 
                        : 'bg-brand-primary text-dark-900 hover:bg-brand-primary/90'
                    }
                    ${loading ? 'opacity-70 cursor-wait' : ''}
                    ${className}
                `}
            >
                {completed ? (
                    <>
                        <CheckCircle className={iconCls} />
                        <span>{isCompact ? 'Completed' : 'Completed (+50 XP)'}</span>
                    </>
                ) : (
                    <>
                        <Circle className={iconCls} />
                        <span>{isCompact ? 'Mark complete' : 'Mark as Complete'}</span>
                    </>
                )}
            </motion.button>
        </div>
    );
}



