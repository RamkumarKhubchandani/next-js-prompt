import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(request) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    try {
        const { planId } = await request.json();
        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Calculate Expiry
        const startDate = new Date();
        let endDate = new Date();

        if (planId === 'pro_weekly') {
            endDate.setDate(startDate.getDate() + 7);
        } else if (planId === 'pro_monthly') {
            endDate.setMonth(startDate.getMonth() + 1);
        } else if (planId === 'pro_yearly') {
            endDate.setFullYear(startDate.getFullYear() + 1);
        }

        user.plan = planId;
        user.role = 'pro'; // Upgrade role
        user.subscriptionStartDate = startDate;
        user.subscriptionEndDate = endDate;

        await user.save();

        return NextResponse.json({ 
            message: 'Upgrade successful', 
            plan: user.plan,
            expiry: user.subscriptionEndDate
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

