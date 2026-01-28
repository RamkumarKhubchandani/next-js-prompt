"use client";

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900 text-white px-4 text-center">
            <h1 className="text-6xl font-black text-brand-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
            <p className="text-gray-400 max-w-md mb-8">
                We couldn't find a mentorship page for that specific combination.
                But don't worry, we have thousands of other experts available.
            </p>
            <Link
                href="/mentors"
                className="px-8 py-3 bg-brand-primary text-dark-900 font-bold rounded-full hover:bg-white transition-colors"
            >
                Browse All Mentors
            </Link>
        </div>
    );
}
