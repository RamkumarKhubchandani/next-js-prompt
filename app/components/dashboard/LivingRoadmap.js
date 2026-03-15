'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Map } from 'lucide-react';
import LockedFeature from './LockedFeature';
import { SpotlightCard } from '../ui/SpotlightCard';

export default function LivingRoadmap({ isPro }) {
    // ...

    // ...

    return (
        <LockedFeature isLocked={false} title="Living Roadmap">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <SpotlightCard className="p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4" spotlightColor="rgba(0, 245, 160, 0.15)">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Map className="text-brand-primary" strokeWidth={2.5} />
                            Living Roadmap 2025 (Pro)
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                            A clickable visual learning path (HTML → CSS → JS → React → Next.js). Each node includes a guided explanation and a Cursor demo media slot.
                        </p>
                    </div>
                    <Link href="/roadmap">
                        <button className="px-6 py-3 bg-brand-primary text-dark-900 font-bold rounded-xl hover:opacity-90 transition whitespace-nowrap shadow-lg shadow-brand-primary/20">
                            Open Roadmap
                        </button>
                    </Link>
                </SpotlightCard>
            </motion.div>
        </LockedFeature>
    );
}
