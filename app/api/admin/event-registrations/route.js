import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import EventRegistration from '../../../models/EventRegistration';
import { requireAdmin, adminOnly } from '../../../lib/requireAdmin';

export async function GET(request) {
    const session = await requireAdmin();
    if (!session) {
        return adminOnly();
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
