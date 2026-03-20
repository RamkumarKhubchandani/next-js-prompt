import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import ActivityLog from '../../../models/ActivityLog';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Auth required' }, { status: 401 });
        }

        const { action, path, fromPath, metadata } = await request.json();

        await dbConnect();

        const timestamp = new Date();

        // 1. Log the activity
        const activity = await ActivityLog.create({
            userId: session.user.id,
            action: action || 'page_view',
            path,
            fromPath,
            timestamp,
            userAgent: request.headers.get('user-agent'),
            metadata
        });

        // 2. Update user's lastActivityAt
        // We'll update the user model to have a general activity field too
        await User.findByIdAndUpdate(session.user.id, {
            $set: { lastVisitAt: timestamp }
        });

        return NextResponse.json({ success: true, activityId: activity._id });
    } catch (error) {
        console.error('Tracking error:', error);
        return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
    }
}
