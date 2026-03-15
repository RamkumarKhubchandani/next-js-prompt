import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/mongodb';
import UpgradeRequest from '@/app/models/UpgradeRequest';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        // Ensure admin
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await connectDB();
        const requests = await UpgradeRequest.find().sort({ requestedAt: -1 });

        return NextResponse.json({ requests });
    } catch (error) {
        console.error('Fetch upgrade requests error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
