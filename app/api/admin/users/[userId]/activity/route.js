import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import ActivityLog from '../../../../models/ActivityLog';
import User from '../../../../models/User';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/auth";

export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    const { userId } = await params;

    if (!session || (session.user.role !== 'admin' && session.user.email !== 'admin@example.com')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        await connectDB();

        const user = await User.findById(userId).select('name email').lean();
        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        const logs = await ActivityLog.find({ userId: userId })
            .sort({ timestamp: -1 })
            .limit(100)
            .lean();

        return NextResponse.json({ user, logs });
    } catch (error) {
        console.error('Activity fetch error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
