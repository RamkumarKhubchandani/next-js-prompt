import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { isSubscriptionActive, isProPlan } from '../../../lib/subscription';

export async function GET(request) {
    const session = await getServerSession(authOptions);

    // Security: Ensure only admins can access
    // For now, we will allow 'user' role if email is admin@example.com (or you can manually set role: 'admin' in DB)
    if (!session || (session.user.role !== 'admin' && session.user.email !== 'admin@example.com')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        await connectDB();

        // Auto-downgrade any expired Pro users (keep subscriptionEndDate for visibility/auditing)
        const now = new Date();
        await User.updateMany(
            {
                role: { $ne: 'admin' },
                plan: { $ne: 'free' },
                subscriptionEndDate: { $exists: true, $ne: null, $lte: now }
            },
            { $set: { plan: 'free', role: 'user' } }
        );

        const users = await User.find({})
            .select('-password') // Exclude password
            .sort({ createdAt: -1 })
            .lean();

        // Calculate Stats
        const totalUsers = users.length;
        const proUsers = users.filter(u => isSubscriptionActive({ plan: u.plan, subscriptionEndDate: u.subscriptionEndDate })).length;
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
    if (!session || (session.user.role !== 'admin' && session.user.email !== 'admin@example.com')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

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
            if (user.plan === 'pro_1_day') expiry.setDate(expiry.getDate() + 1);
            if (user.plan === 'pro_2_days') expiry.setDate(expiry.getDate() + 2);
            if (user.plan === 'pro_weekly') expiry.setDate(expiry.getDate() + 7);
            if (user.plan === 'pro_monthly') expiry.setMonth(expiry.getMonth() + 1);
            if (user.plan === 'pro_yearly') expiry.setFullYear(expiry.getFullYear() + 1);
            user.subscriptionEndDate = expiry;

        } else if (action === 'revoke_pro') {
            user.plan = 'free';
            user.role = 'user';
            // keep subscriptionEndDate so admin can still see when it would have ended
            // user.subscriptionEndDate = null;
        } else if (action === 'delete_user') {
            if (user.role === 'admin') {
                return NextResponse.json({ message: 'Cannot delete admin user' }, { status: 400 });
            }
            await User.deleteOne({ _id: userId });
            return NextResponse.json({ message: 'User deleted' });
        }

        await user.save();
        return NextResponse.json({ message: 'User updated', user });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.email !== 'admin@example.com')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ message: 'Missing userId' }, { status: 400 });

    try {
        await connectDB();
        const user = await User.findById(userId).select('role').lean();
        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
        if (user.role === 'admin') return NextResponse.json({ message: 'Cannot delete admin user' }, { status: 400 });

        await User.deleteOne({ _id: userId });
        return NextResponse.json({ message: 'User deleted' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

