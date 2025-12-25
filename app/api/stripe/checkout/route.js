import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { plan } = await req.json();

        // Define prices (You should ideally fetch these from Stripe or config)
        // For now, we'll use dynamic price data for simplicity in testing
        // In production, use Price IDs (e.g., price_12345)
        let priceData = {};

        if (plan === 'pro_monthly') {
            priceData = {
                currency: 'usd',
                product_data: {
                    name: 'Pro Developer (Monthly)',
                    description: 'Full access to all courses and features.',
                },
                unit_amount: 2900, // $29.00
                recurring: {
                    interval: 'month',
                },
            };
        } else if (plan === 'pro_yearly') {
            priceData = {
                currency: 'usd',
                product_data: {
                    name: 'Career Master (Yearly)',
                    description: 'Full access + Priority Support.',
                },
                unit_amount: 29000, // $290.00
                recurring: {
                    interval: 'year',
                },
            };
        } else {
            return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: priceData,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/pricing?payment=cancelled`,
            customer_email: session.user.email,
            metadata: {
                userId: session.user.id,
                plan: plan,
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
