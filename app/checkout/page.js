'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ShieldCheck, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const planId = searchParams.get('plan');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/pricing');
        }
    }, [status, router]);

    const getPlanDetails = (id) => {
        switch(id) {
            case 'pro_weekly': return { name: 'Pro Weekly', price: 9, period: 'week' };
            case 'pro_monthly': return { name: 'Pro Monthly', price: 29, period: 'month' };
            case 'pro_yearly': return { name: 'Pro Yearly', price: 290, period: 'year' };
            default: return { name: 'Unknown Plan', price: 0, period: '' };
        }
    };

    const plan = getPlanDetails(planId);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const res = await fetch('/api/user/upgrade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId })
            });

            if (res.ok) {
                setSuccess(true);
                // Reload session handled by next-auth usually requires trickery or page reload
                // We'll redirect to onboarding
                setTimeout(() => {
                    // Force a hard reload to update session claims if needed, or just client-side update
                     window.location.href = '/dashboard'; 
                }, 2000);
            } else {
                setError('Payment failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') return <div className="min-h-screen flex items-center justify-center bg-dark-900 text-white">Loading...</div>;
    if (!planId) return <div className="min-h-screen flex items-center justify-center bg-dark-900 text-white">Invalid Plan</div>;

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-dark-800 p-8 rounded-2xl border border-green-500/30 text-center max-w-md w-full shadow-2xl"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
                    <p className="text-gray-400 mb-8">Welcome to NextApp Pro. Your journey starts now.</p>
                    <Link href="/dashboard">
                        <button className="w-full py-3 bg-brand-primary text-dark-900 font-bold rounded-xl hover:opacity-90 transition">
                            Go to Dashboard
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-900 text-light-100 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div>
                    <Link href="/pricing" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
                        <ArrowLeft size={18} /> Back to Plans
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">Checkout</h1>
                    <p className="text-gray-400 mb-8">Complete your purchase to unlock Pro features.</p>

                    <div className="bg-dark-800 p-6 rounded-xl border border-dark-700 mb-6">
                        <h3 className="font-bold text-white mb-4">Order Summary</h3>
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-dark-700">
                            <div>
                                <p className="font-medium text-white">{plan.name}</p>
                                <p className="text-sm text-gray-400">Billed every {plan.period}</p>
                            </div>
                            <span className="font-bold text-xl">${plan.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold text-white">
                            <span>Total</span>
                            <span>${plan.price}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-500 bg-dark-800/50 p-4 rounded-lg border border-dark-700">
                        <ShieldCheck className="text-green-500" size={20} />
                        <p>Secure SSL Encryption. 100% Safe Transaction.</p>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Payment Details</h3>
                        <div className="flex gap-2">
                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cardholder Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Number</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="0000 0000 0000 0000"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-blue-500 transition font-mono"
                                />
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry Date</label>
                                <input 
                                    type="text" 
                                    name="expiry"
                                    value={formData.expiry}
                                    onChange={handleInputChange}
                                    placeholder="MM/YY"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-center"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVC</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        name="cvc"
                                        value={formData.cvc}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-blue-500 transition text-center"
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : `Pay $${plan.price}`}
                        </button>
                        
                        <p className="text-xs text-gray-400 text-center mt-4">
                            By clicking Pay, you agree to our Terms of Service. 
                            (This is a demo, no actual charge will be made).
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

