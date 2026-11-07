import { NextResponse } from 'next/server';
import { requireAdmin, adminOnly } from '@/app/lib/requireAdmin';
import connectDB from '@/app/lib/mongodb';
import UpgradeRequest from '@/app/models/UpgradeRequest';

export async function GET(req) {
    try {
        const session = await requireAdmin();
        if (!session) {
            return adminOnly();
        }

        await connectDB();
        const requests = await UpgradeRequest.find().sort({ requestedAt: -1 });

        return NextResponse.json({ requests });
    } catch (error) {
        console.error('Fetch upgrade requests error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
