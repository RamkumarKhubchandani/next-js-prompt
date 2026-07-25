import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import EventRegistration from '../../../models/EventRegistration';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'admin' && session.user.email !== 'admin@example.com')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        await connectDB();
        const registrations = await EventRegistration.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(registrations);
    } catch (error) {
        console.error('Failed to get registrations:', error);
        return NextResponse.json({ message: 'Failed to fetch registrations' }, { status: 500 });
    }
}
