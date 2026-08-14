import Link from 'next/link';
import { SKILLS, LOCATIONS } from '../lib/seo-data';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata = {
    title: 'Browse High-Quality Coding Mentors by Skill & Location',
    description: 'Find expert developers for 1:1 mentorship in JavaScript, React, Python and more across London, New York, Bangalore and global remote hubs.',
    alternates: {
        canonical: 'https://www.outlinedev.com/mentors',
    }
};

export default function MentorsIndexPage() {
    return (
        <div className="min-h-screen bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
            <Header />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-black mb-8 text-center">
                    Find Your Perfect Coding Mentor
                </h1>
                <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
                    Browse our directory of expert developers by technology and location.
                    Connect with top-tier talent for 1:1 guidance.
                </p>

                <div className="grid md:grid-cols-2 gap-16">
                    {/* Skills Column */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-sm">
                                JS
                            </span>
                            Browse by Technology
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {SKILLS.map(skill => (
                                <Link
                                    key={skill.id}
                                    href={`/mentors/${skill.id}-mentors-in-remote`}
                                    className="p-3 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:border-brand-primary transition-colors text-sm font-medium"
                                >
                                    {skill.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Locations Column */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white text-sm">
                                📍
                            </span>
                            Browse by Location
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {LOCATIONS.map(loc => (
                                <Link
                                    key={loc.id}
                                    href={`/mentors/javascript-mentors-in-${loc.id}`}
                                    className="p-3 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:border-brand-primary transition-colors text-sm font-medium"
                                >
                                    {loc.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Big Combinations Grid (SEO Juice) */}
                <div className="mt-20">
                    <h2 className="text-2xl font-bold mb-8">Popular Mentorship Requests</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {SKILLS.slice(0, 8).map(skill => (
                            LOCATIONS.slice(0, 5).map(loc => (
                                <Link
                                    key={`${skill.id}-${loc.id}`}
                                    href={`/mentors/${skill.id}-mentors-in-${loc.id}`}
                                    className="text-sm text-gray-500 hover:text-brand-primary hover:underline"
                                >
                                    {skill.name} Mentors in {loc.name}
                                </Link>
                            ))
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
