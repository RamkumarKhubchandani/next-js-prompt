import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

export async function POST(request) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await request.json();
    const planType = plan || 'pro_monthly';

    try {
        await connectDB();
        const user = await User.findById(session.user.id);

        user.role = 'pro';
        user.plan = planType;
        user.subscriptionStartDate = new Date();
        
        const expiry = new Date();
        if (planType === 'pro_weekly') expiry.setDate(expiry.getDate() + 7);
        if (planType === 'pro_monthly') expiry.setMonth(expiry.getMonth() + 1);
        if (planType === 'pro_yearly') expiry.setFullYear(expiry.getFullYear() + 1);
        user.subscriptionEndDate = expiry;

        await user.save();

        return NextResponse.json({ message: "Upgrade successful", user });
    } catch (error) {
        console.error("Upgrade error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
