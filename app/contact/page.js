"use client";
import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Input } from "../components/ui/Input";

export default function ContactPage() {
    return (
        <div className="bg-dark-900 min-h-screen">
            <Header />
            <main className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <h1 className="text-4xl font-bold text-light-100 sm:text-5xl">Contact Us</h1>
                        <p className="mt-6 text-lg leading-8 text-light-200">
                            Have a question or want to get started? We'd love to hear from you.
                        </p>
                    </motion.div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
                                <Mail className="w-8 h-8 text-brand-primary" />
                                <div>
                                    <h3 className="text-xl font-semibold text-light-100">Email Us</h3>
                                    <a href="mailto:ramkumarkhub@gmail.com" className="text-light-200 hover:text-brand-primary">
                                        ramkumarkhub@gmail.com
                                    </a>
                                </div>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
                                <Phone className="w-8 h-8 text-brand-primary" />
                                <div>
                                    <h3 className="text-xl font-semibold text-light-100">WhatsApp Us</h3>
                                    <a href="https://wa.me/917709330265" target="_blank" rel="noopener noreferrer" className="text-light-200 hover:text-brand-primary">
                                        +91 77093 30265
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                        <form className="space-y-6">
                            <Input type="text" placeholder="Your Name" required />
                            <Input type="email" placeholder="Your Email" required />
                            <textarea
                                className="w-full bg-dark-800 border border-dark-700 text-light-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                placeholder="Your Message"
                                rows={5}
                                required
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full rounded-full bg-brand-primary px-8 py-3 text-base font-semibold text-dark-900"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
