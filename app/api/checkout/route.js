import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { plan, paymentMethod } = await request.json();

    // Simulate Payment Processing Delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock Validation (Accept anything except '4000 0000 0000 0000')
    if (paymentMethod.cardNumber === '4000 0000 0000 0000') {
        return NextResponse.json({ message: 'Card declined' }, { status: 400 });
    }

    try {
        await connectDB();
        
        // Calculate expiry based on plan
        const now = new Date();
        let expiry = new Date();
        if (plan === 'pro_monthly') expiry.setMonth(now.getMonth() + 1);
        else if (plan === 'pro_yearly') expiry.setFullYear(now.getFullYear() + 1);
        else expiry.setDate(now.getDate() + 7); // Weekly

        await User.findByIdAndUpdate(session.user.id, {
            plan: plan,
            subscriptionExpiry: expiry,
            // Add some free inventory items as a bonus
            $addToSet: { 
                'inventory.themes': 'theme_pro_dark',
                badges: { name: 'Pro Member', date: new Date() } 
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

