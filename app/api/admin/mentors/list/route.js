import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { requireAdmin, adminOnly } from '../../../../lib/requireAdmin';
import dbConnect from '../../../../lib/mongodb';
import MentorApplication from '../../../../models/MentorApplication';
import User from '../../../../models/User';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const adminSession = await requireAdmin(session);
        if (!adminSession) return adminOnly();

        await dbConnect();

        const applications = await MentorApplication.find({})
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        return NextResponse.json({ applications });
    } catch (error) {
        console.error('Fetch Applications Error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
