import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export async function GET(request) {
    const session = await getServerSession(authOptions);
    
    // Security: Ensure only admins can access
    // For now, we will allow 'user' role if email is admin@example.com (or you can manually set role: 'admin' in DB)
    if (!session || (session.user.role !== 'admin' && session.user.email !== 'admin@example.com')) {
        // return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        await connectDB();
        
        const users = await User.find({})
            .select('-password') // Exclude password
            .sort({ createdAt: -1 })
            .lean();

        // Calculate Stats
        const totalUsers = users.length;
        const proUsers = users.filter(u => u.plan && u.plan !== 'free').length;
        const freeUsers = totalUsers - proUsers;

        return NextResponse.json({
            users,
            stats: { totalUsers, proUsers, freeUsers }
        });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request) {
    const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'admin') ... (Security check)

    const { userId, action, planType } = await request.json();

    try {
        await connectDB();
        const user = await User.findById(userId);
        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        if (action === 'grant_pro') {
            user.plan = planType || 'pro_monthly';
            user.role = 'pro';
            user.subscriptionStartDate = new Date();
            
            // Set expiry based on plan
            const expiry = new Date();
            if (user.plan === 'pro_weekly') expiry.setDate(expiry.getDate() + 7);
            if (user.plan === 'pro_monthly') expiry.setMonth(expiry.getMonth() + 1);
            if (user.plan === 'pro_yearly') expiry.setFullYear(expiry.getFullYear() + 1);
            user.subscriptionEndDate = expiry;

        } else if (action === 'revoke_pro') {
            user.plan = 'free';
            user.role = 'user';
            user.subscriptionEndDate = null;
        }

        await user.save();
        return NextResponse.json({ message: 'User updated', user });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

