import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/app/lib/mongodb';
import MentorshipRequest from '@/models/MentorshipRequest';

export async function GET(request) {
    try {
        // Check if user is authenticated (optional - remove if you want public access)
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Fetch all requests, sorted by newest first
        const requests = await MentorshipRequest.find({})
            .sort({ createdAt: -1 })
            .limit(100); // Limit to last 100 requests

        return NextResponse.json({
            success: true,
            requests,
            total: requests.length
        });

    } catch (error) {
        console.error('Error fetching mentorship requests:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

// Update request status
export async function PATCH(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id, status } = await request.json();

        await connectDB();

        const updated = await MentorshipRequest.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            request: updated
        });

    } catch (error) {
        console.error('Error updating request:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
