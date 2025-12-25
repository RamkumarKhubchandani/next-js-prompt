import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Challenge from '../../models/Challenge';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const limitRaw = searchParams.get('limit');
        const requestedLimit = limitRaw ? Math.max(0, Number(limitRaw) || 0) : 0;

        // Pro gating: non-pro users only get a small subset unless they request a smaller limit.
        // (Landing page uses /api/challenges/featured which is always public.)
        let effectiveLimit = requestedLimit;
        try {
            const session = await getServerSession(authOptions);
            const isPro = Boolean(session?.user?.activePro) || session?.user?.role === 'admin';
            if (!isPro) {
                effectiveLimit = requestedLimit > 0 ? Math.min(requestedLimit, 6) : 6;
            }
        } catch {
            // If auth/session fails, treat as non-pro
            effectiveLimit = requestedLimit > 0 ? Math.min(requestedLimit, 6) : 6;
        }

        let query = Challenge.find({}).select('slug title difficulty category dayNumber xpReward').lean();
        if (effectiveLimit > 0) query = query.limit(effectiveLimit);

        const challenges = await query;
        return NextResponse.json(challenges);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
