"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle, AlertCircle, Shield } from 'lucide-react';

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan') || 'pro_monthly';
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [card, setCard] = useState({ number: '', expiry: '', cvc: '', name: '' });

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate Stripe processing time
        setTimeout(async () => {
            try {
                const res = await fetch('/api/user/upgrade', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ plan }) // Send the selected plan
                });

                if (res.ok) {
                    setSuccess(true);
                    setTimeout(() => router.push('/dashboard?upgraded=true'), 2000);
                } else {
                    const data = await res.json();
                    setError(data.message || 'Payment failed');
                }
            } catch (err) {
                console.error(err);
                setError('Something went wrong');
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-900 text-white">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center p-8 bg-dark-800 rounded-2xl border border-green-500/50"
                >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                        <CheckCircle size={40} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Upgrade Successful!</h2>
                    <p className="text-light-300">Redirecting to your Pro Dashboard...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-dark-900 text-light-100 flex justify-center">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Order Summary */}
                <div className="bg-dark-800 p-8 rounded-2xl border border-dark-700 h-fit">
                    <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-dark-700">
                        <div>
                            <p className="font-bold text-white">Pro Plan ({plan.split('_')[1]})</p>
                            <p className="text-sm text-light-400">Unlimited Access</p>
                        </div>
                        <p className="text-xl font-bold text-white">
                            {plan === 'pro_monthly' ? '$29.00' : plan === 'pro_yearly' ? '$290.00' : '$9.00'}
                        </p>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold text-white">
                        <p>Total</p>
                        <p>{plan === 'pro_monthly' ? '$29.00' : plan === 'pro_yearly' ? '$290.00' : '$9.00'}</p>
                    </div>
                    <div className="mt-8 flex items-center gap-3 text-sm text-light-400 bg-dark-900 p-4 rounded-lg">
                        <Shield size={16} className="text-green-500" />
                        <span>30-Day Money-Back Guarantee</span>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-dark-800 p-8 rounded-2xl border border-dark-700">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Lock size={20} className="text-brand-primary" />
                        Secure Payment
                    </h3>

                    <form onSubmit={handlePayment} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200 text-sm">
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase text-light-400 mb-1">Card Number</label>
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-3.5 text-light-400" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full bg-dark-900 border border-dark-600 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
                                    value={card.number}
                                    onChange={e => setCard({...card, number: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-light-400 mb-1">Expiry</label>
                                <input 
                                    type="text" 
                                    placeholder="MM/YY"
                                    className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
                                    value={card.expiry}
                                    onChange={e => setCard({...card, expiry: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-light-400 mb-1">CVC</label>
                                <input 
                                    type="text" 
                                    placeholder="123"
                                    className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
                                    value={card.cvc}
                                    onChange={e => setCard({...card, cvc: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-light-400 mb-1">Cardholder Name</label>
                            <input 
                                type="text" 
                                placeholder="John Doe"
                                className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none"
                                value={card.name}
                                onChange={e => setCard({...card, name: e.target.value})}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full mt-4 py-4 bg-brand-primary text-dark-900 font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg flex justify-center items-center"
                        >
                            {loading ? <span className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></span> : 'Upgrade to Pro'}
                        </button>
                        
                        <p className="text-xs text-center text-light-500 mt-4">
                            By clicking Upgrade, you agree to our Terms of Service.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
