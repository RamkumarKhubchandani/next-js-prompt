"use client";

import React, { useState } from 'react';
import { trackEvent } from '@/app/components/GoogleAnalytics';

export default function HireInquiryForm({ skill = 'React', bookingUrl = '' }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: skill === 'Full Stack' ? 'Full stack' : skill,
        budget: '$1,000 - $3,000',
        message: '',
        consent: false,
        website: '' // honeypot
    });

    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('/api/hire-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                trackEvent('hire_inquiry_submit', {
                    skill,
                    project_type: formData.projectType
                });
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Unable to send inquiry. Please check your connection or reach out on WhatsApp.');
        }
    };

    const whatsappUrl = `https://wa.me/918237320942?text=${encodeURIComponent(
        `Hi Ramkumar, I'm interested in hiring you for a ${skill || 'web development'} project.`
    )}`;

    return (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {status === 'success' ? (
                <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl">
                        ✓
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        Inquiry Received
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                        Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setStatus('idle');
                            setFormData(prev => ({ ...prev, message: '', consent: false }));
                        }}
                        className="text-xs font-semibold text-slate-500 dark:text-slate-400 underline"
                    >
                        Send another note
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot field (hidden from real users) */}
                    <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Jane Doe"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="jane@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Project Type
                            </label>
                            <select
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            >
                                <option value="React">React</option>
                                <option value="Next.js">Next.js</option>
                                <option value="Full stack">Full stack</option>
                                <option value="TypeScript">TypeScript</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                                Budget Range
                            </label>
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            >
                                <option value="Under $1,000">Under $1,000</option>
                                <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                                <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                                <option value="$5,000+">$5,000+</option>
                                <option value="Hourly ($30/hr)">Hourly ($30/hr)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                            Project Description & Goals *
                        </label>
                        <textarea
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about what you are building, timeline, and any specific requirements..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>

                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="consent"
                            name="consent"
                            required
                            checked={formData.consent}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                        />
                        <label htmlFor="consent" className="text-xs text-slate-600 dark:text-slate-400">
                            I agree to be contacted about my inquiry.
                        </label>
                    </div>

                    {status === 'error' && (
                        <p className="text-xs font-medium text-red-500">
                            {errorMessage}
                        </p>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-brand-primary hover:bg-emerald-400 disabled:opacity-50 transition-colors"
                        >
                            {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                        </button>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('hire_whatsapp_click', { skill })}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center"
                        >
                            Chat on WhatsApp
                        </a>

                        {bookingUrl && (
                            <a
                                href={bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackEvent('hire_book_call_click', { skill })}
                                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors underline"
                            >
                                Or book a 20-min call
                            </a>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
}
