import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/mongodb';
import UpgradeRequest from '@/app/models/UpgradeRequest';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Check if pending request exists
        const existing = await UpgradeRequest.findOne({
            userId: session.user.id,
            status: 'pending'
        });

        if (existing) {
            return NextResponse.json({ message: 'Request already pending' }, { status: 200 });
        }

        await UpgradeRequest.create({
            userId: session.user.id,
            email: session.user.email,
            username: session.user.username,
            status: 'pending'
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Upgrade request error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
