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

        // Whitelist allowed fields only; never accept userId, status, adminNotes, reviewedBy, or reviewedAt from client
        const {
            roles,
            photoUrl,
            phone,
            country,
            state,
            city,
            linkedin,
            skills,
            yearsExperience,
            hourlyRate,
            education,
            bio
        } = body;

        const updateData = {
            roles,
            photoUrl,
            phone,
            country,
            state,
            city,
            linkedin,
            skills,
            yearsExperience,
            hourlyRate,
            education,
            bio,
            status: 'pending'
        };

        const cleanSet = Object.fromEntries(
            Object.entries(updateData).filter(([_, v]) => v !== undefined)
        );

        // Upsert: Update if exists, Create if new
        // We always reset status to 'pending' on new submission so it gets reviewed again.
        const application = await MentorApplication.findOneAndUpdate(
            { userId: session.user.id },
            {
                $set: cleanSet,
                $setOnInsert: { userId: session.user.id }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, application });
    } catch (error) {
        console.error('Mentor Application Error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
