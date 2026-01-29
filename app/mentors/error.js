"use client";

import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error('Mentors Page Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900 text-white px-4 text-center">
            <h1 className="text-4xl font-black text-red-500 mb-4">Something went wrong!</h1>
            <p className="text-gray-400 max-w-md mb-8">
                We encountered an error loading this mentorship page.
                Our team has been notified.
            </p>
            <button
                onClick={() => reset()}
                className="px-8 py-3 bg-white text-dark-900 font-bold rounded-full hover:bg-brand-primary transition-colors"
            >
                Try Again
            </button>
        </div>
    );
}
