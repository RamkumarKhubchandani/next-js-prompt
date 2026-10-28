import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import ActivityLog from '../../../../../models/ActivityLog';
import User from '../../../../../models/User';
import { requireAdmin, adminOnly } from '../../../../../lib/requireAdmin';

export async function GET(request, { params }) {
    const session = await requireAdmin();
    if (!session) {
        return adminOnly();
    }

    const { userId } = await params;

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
