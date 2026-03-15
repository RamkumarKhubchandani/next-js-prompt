'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Crown, ArrowRight } from 'lucide-react';

import { MovingBorderBtn } from '../ui/MovingBorderBtn';
import UpgradeToProModal from '../UpgradeToProModal';

export default function UpgradeBanner({ isPro, isTrial, planResolved }) {
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    if (!planResolved || isPro || isTrial) return null;

    return (
        <>
            <UpgradeToProModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 to-blue-900 p-8 border border-white/10 shadow-2xl"
            >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <Crown className="text-yellow-400" fill="currentColor" />
                            Unlock Your Full Potential
                        </h2>
                        <p className="text-blue-100 max-w-xl">
                            Get structured day-by-day learning, verified certificates, and AI interview prep with Pro.
                        </p>
                    </div>
                    <div onClick={() => setShowUpgradeModal(true)} className="cursor-pointer">
                        <MovingBorderBtn
                            borderRadius="0.75rem"
                            className="bg-white text-purple-900 font-bold dark:bg-white dark:text-purple-900 p-0"
                            containerClassName="h-12 w-48 bg-transparent"
                        >
                            <span className="flex items-center gap-2 px-6 py-3">
                                Upgrade to Pro <ArrowRight size={18} />
                            </span>
                        </MovingBorderBtn>
                    </div>
                </div>
                {/* Background pattern */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-primary opacity-20 blur-3xl rounded-full pointer-events-none"></div>
            </motion.div>
        </>
    );
}
