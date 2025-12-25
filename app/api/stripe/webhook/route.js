import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import User from '../../../models/User';
import dbConnect from '../../../lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    try {
        await dbConnect();

        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                const userId = session.metadata.userId;
                const plan = session.metadata.plan;

                if (userId && plan) {
                    await User.findByIdAndUpdate(userId, {
                        plan: plan,
                        subscriptionStartDate: new Date(),
                        // Set end date based on plan (approximate)
                        subscriptionEndDate: new Date(Date.now() + (plan === 'pro_yearly' ? 365 : 30) * 24 * 60 * 60 * 1000)
                    });
                    console.log(`User ${userId} upgraded to ${plan}`);
                }
                break;

            // Handle other events like invoice.payment_failed for recurring subscriptions
            case 'invoice.payment_failed':
                // Logic to downgrade user or notify them
                break;

            default:
            // console.log(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error('Webhook handler failed:', err);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
}
