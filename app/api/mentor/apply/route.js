import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import dbConnect from '../../../lib/dbConnect';
import MentorApplication from '../../../models/MentorApplication';
import User from '../../../models/User';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await dbConnect();
        const body = await req.json();

        // Check if user already applied
        const existing = await MentorApplication.findOne({ userId: session.user.id });
        if (existing) {
            return NextResponse.json({ error: 'Application already pending' }, { status: 400 });
        }

        // Create Application
        const application = await MentorApplication.create({
            userId: session.user.id,
            ...body,
            status: 'pending'
        });

        return NextResponse.json({ success: true, id: application._id });
    } catch (error) {
        console.error('Mentor Application Error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
