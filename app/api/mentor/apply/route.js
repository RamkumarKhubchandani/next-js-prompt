import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import dbConnect from '../../../lib/mongodb';
import MentorApplication from '../../../models/MentorApplication';
import User from '../../../models/User';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await dbConnect();
        const application = await MentorApplication.findOne({ userId: session.user.id });

        return NextResponse.json({ application });
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await dbConnect();
        const body = await req.json();

        // Upsert: Update if exists, Create if new
        // We always reset status to 'pending' on new submission so it gets reviewed again.
        const application = await MentorApplication.findOneAndUpdate(
            { userId: session.user.id },
            {
                $set: {
                    ...body,
                    status: 'pending'
                }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, application });
    } catch (error) {
        console.error('Mentor Application Error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
