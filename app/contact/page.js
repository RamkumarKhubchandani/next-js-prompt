"use client";
import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "../components/ui/Input";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        website: '' // honeypot
    });
    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '', website: '' });
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Failed to send your message. Please try again.');
            }
        } catch (err) {
            console.error('Contact submission error:', err);
            setStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-dark-900 min-h-screen transition-colors duration-300">
            <Header />
            <main className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-light-100 sm:text-5xl">Contact Us</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-light-200">
                            Have a question or want to get started? We'd love to hear from you.
                        </p>
                    </motion.div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-4">
                                <Mail className="w-8 h-8 text-brand-primary shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-light-100">Email Us</h3>
                                    <a href="mailto:hi@outlinedev.com" className="text-gray-600 dark:text-light-200 hover:text-brand-primary transition-colors">
                                        hi@outlinedev.com
                                    </a>
                                </div>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-4">
                                <Phone className="w-8 h-8 text-brand-primary shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-light-100">WhatsApp Us</h3>
                                    <a href="https://wa.me/918237320942" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-light-200 hover:text-brand-primary transition-colors">
                                        +91 82373 20942
                                    </a>
                                </div>
                            </motion.div>
                        </div>

                        <div>
                            {status === 'success' ? (
                                <div className="p-8 rounded-2xl bg-white dark:bg-dark-800 border border-green-500/30 text-center shadow-lg">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        Thank you for reaching out. We have received your message and will get back to you shortly at your email.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="px-6 py-2.5 rounded-full bg-brand-primary text-dark-900 font-bold hover:opacity-90 transition-opacity text-sm"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Honeypot field for bot protection */}
                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="hidden"
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />

                                    <div>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Your Email"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-gray-900 dark:text-light-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                                            placeholder="Your Message"
                                            rows={5}
                                            required
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium">
                                            <AlertCircle size={16} className="shrink-0" />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full rounded-full bg-brand-primary px-8 py-3 text-base font-semibold text-dark-900 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <span>Send Message</span>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
