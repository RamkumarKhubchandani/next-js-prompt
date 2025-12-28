'use client';
import { Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LockedFeature({ children, isLocked, title }) {
    if (!isLocked) return children;

    return (
        <div className="relative">
            <div className="filter blur-sm pointer-events-none select-none opacity-50 transition-all duration-300">
                {children}
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-xl p-8 rounded-3xl border border-brand-primary/20 shadow-2xl max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Crown className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Unlock {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Upgrade to Pro to access this feature and accelerate your learning journey.
                    </p>
                    <Link href="/pricing">
                        <button className="px-8 py-3 bg-brand-primary text-dark-900 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,245,160,0.4)] transition-all flex items-center gap-2 mx-auto">
                            Upgrade Now <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
