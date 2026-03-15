import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/mongodb';
import UpgradeRequest from '@/app/models/UpgradeRequest';
import User from '@/app/models/User';

export async function POST(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = params;
        await connectDB();

        const request = await UpgradeRequest.findById(id);
        if (!request) {
            return NextResponse.json({ error: 'Request not found' }, { status: 404 });
        }

        if (request.status !== 'pending') {
            return NextResponse.json({ error: 'Request already processed' }, { status: 400 });
        }

        // Upgrade user
        await User.findByIdAndUpdate(request.userId, {
            plan: 'pro_monthly', // Default to monthly or whatever logic
            role: 'pro'
        });

        // Update request status
        request.status = 'approved';
        await request.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Approve upgrade error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
