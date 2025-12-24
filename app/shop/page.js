"use client";
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Trophy, Snowflake, Crown, Zap, ShoppingBag, Loader2, Check, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ShopPage() {
    const { data: session } = useSession();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(null); // Item ID being purchased
    const router = useRouter();

    const fetchShop = async () => {
        try {
            const res = await fetch('/api/shop');
            const json = await res.json();
            if (res.ok) {
                setData(json);
            }
        } catch (error) {
            console.error("Failed to fetch shop:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session) {
            fetchShop();
        }
    }, [session]);

    const handleBuy = async (item) => {
        if (purchasing) return;
        setPurchasing(item.id);

        try {
            const res = await fetch('/api/shop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: item.id }),
            });

            const json = await res.json();

            if (res.ok) {
                setData(prev => ({
                    ...prev,
                    xp: json.xp,
                    inventory: json.inventory
                }));
                // Trigger XP update event for Header/Dashboard
                window.dispatchEvent(new Event('xp-updated'));
            } else {
                alert(json.message || "Purchase failed");
            }
        } catch (error) {
            console.error("Purchase error:", error);
        } finally {
            setPurchasing(null);
        }
    };

    if (!session) {
        return (
            <div className="min-h-screen pt-32 flex justify-center">
                <p className="text-light-200">Please log in to access the shop.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center">
                <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-900 text-light-100">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-start mb-8">
                    <Link href="/dashboard" className="text-light-300 hover:text-white flex items-center gap-2 transition-colors font-medium">
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <ShoppingBag className="text-brand-primary w-10 h-10" />
                        XP Shop
                    </h1>
                    <p className="text-xl text-light-200 mb-8">Spend your hard-earned XP on rewards and power-ups.</p>
                    
                    <div className="inline-flex items-center bg-dark-800 px-6 py-3 rounded-full border border-dark-700 shadow-lg">
                        <Trophy className="text-yellow-500 w-6 h-6 mr-3" />
                        <span className="text-2xl font-bold text-white">{data?.xp} XP</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.items.map((item) => {
                        const Icon = item.icon === 'Snowflake' ? Snowflake : item.icon === 'Crown' ? Crown : Zap;
                        const isOwned = item.type === 'cosmetic' && data.inventory.themes.includes(item.id);
                        const isFull = item.id === 'streak_freeze' && data.inventory.streakFreezes >= item.max;
                        const canAfford = data.xp >= item.cost;
                        const isDisabled = isOwned || isFull || !canAfford || purchasing;

                        return (
                            <motion.div
                                key={item.id}
                                whileHover={{ y: -5 }}
                                className={`bg-dark-800 rounded-2xl p-6 border transition-all ${
                                    isOwned || isFull ? 'border-green-500/30 bg-green-900/10' : 'border-dark-700 hover:border-brand-primary/50'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl ${
                                        item.id === 'streak_freeze' ? 'bg-blue-500/20 text-blue-400' : 
                                        item.id === 'theme_gold' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400'
                                    }`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div className="text-sm font-bold text-light-300 bg-dark-900 px-3 py-1 rounded-full border border-dark-700">
                                        {item.cost} XP
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                <p className="text-sm text-light-300 mb-6 min-h-[40px]">{item.description}</p>

                                <button
                                    onClick={() => handleBuy(item)}
                                    disabled={isDisabled}
                                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                        purchasing === item.id ? 'bg-dark-700 cursor-wait' :
                                        isOwned || isFull ? 'bg-green-600 text-white cursor-default' :
                                        canAfford ? 'bg-brand-primary text-dark-900 hover:bg-brand-primary/90' :
                                        'bg-dark-700 text-light-400 cursor-not-allowed'
                                    }`}
                                >
                                    {purchasing === item.id ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : isOwned ? (
                                        <> <Check className="w-5 h-5" /> Owned </>
                                    ) : isFull ? (
                                        <> <Check className="w-5 h-5" /> Full ({data.inventory.streakFreezes}/{item.max}) </>
                                    ) : (
                                        'Buy Now'
                                    )}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

