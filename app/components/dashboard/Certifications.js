'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, ArrowRight, Lock, Crown } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export default function Certifications({ isPro }) {
    const certs = [
        {
            id: 'fullstack',
            title: 'Fullstack Architect',
            desc: 'Master Node.js, Databases, and System Design.',
            icon: 'FS',
            color: 'purple',
            link: '/course/fullstack/assessment'
        },
        {
            id: 'react',
            title: 'React.js Professional',
            desc: 'Validate your expertise in React hooks, patterns, and performance.',
            icon: '⚛️',
            color: 'blue',
            link: '/course/react/assessment'
        },
        {
            id: 'javascript',
            title: 'JavaScript Professional',
            desc: 'Prove your mastery of ES6+, closures, and async programming.',
            icon: 'JS',
            color: 'yellow',
            link: '/course/javascript/assessment'
        },
        {
            id: 'angular',
            title: 'Angular Professional',
            desc: 'Demonstrate your skills in components, services, and RxJS.',
            icon: 'NG',
            color: 'red',
            link: '/course/angular/assessment'
        },
        {
            id: 'html',
            title: 'HTML5 Professional',
            desc: 'Master semantic HTML, accessibility, and SEO.',
            icon: 'H5',
            color: 'orange',
            link: '/course/html/assessment'
        },
        {
            id: 'css',
            title: 'CSS3 Expert',
            desc: 'Master Flexbox, Grid, animations, and responsive design.',
            icon: 'CSS',
            color: 'sky',
            link: '/course/css/assessment'
        }
    ];

    // ...

    const getColorClasses = (color) => {
        const maps = {
            purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/50',
            blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/50',
            yellow: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20 group-hover:border-yellow-500/50',
            red: 'text-red-500 bg-red-500/10 border-red-500/20 group-hover:border-red-500/50',
            orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20 group-hover:border-orange-500/50',
            sky: 'text-sky-500 bg-sky-500/10 border-sky-500/20 group-hover:border-sky-500/50',
        };
        return maps[color] || maps.blue;
    };

    const getHexColor = (color) => {
        const colors = {
            purple: 'rgba(168, 85, 247, 0.2)',
            blue: 'rgba(59, 130, 246, 0.2)',
            yellow: 'rgba(234, 179, 8, 0.2)',
            red: 'rgba(239, 68, 68, 0.2)',
            orange: 'rgba(249, 115, 22, 0.2)',
            sky: 'rgba(14, 165, 233, 0.2)',
        };
        return colors[color] || colors.blue;
    };

    return (
        <section className="mb-12 relative">

            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Award className="text-brand-primary" fill="currentColor" />
                    Get Certified
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certs.map((cert, index) => {
                        const colorClass = getColorClasses(cert.color);
                        const spotlightColor = getHexColor(cert.color);
                        return (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.05 * index }}
                                className="h-full"
                            >
                                <SpotlightCard
                                    className={`h-full p-6 transition-all duration-300 ${colorClass.split(' ').slice(2).join(' ')}`}
                                    spotlightColor={spotlightColor}
                                >
                                    <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${colorClass.split(' ')[0]}`}>
                                        <Award size={100} />
                                    </div>

                                    <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClass.split(' ').slice(0, 2).join(' ')}`}>
                                            <span className="font-bold text-lg">{cert.icon}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {cert.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px]">
                                            {cert.desc}
                                        </p>

                                        <Link href={cert.link} className={`inline-flex items-center gap-2 font-bold hover:gap-3 transition-all ${colorClass.split(' ')[0]}`}>
                                            Take Assessment <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
