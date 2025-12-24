import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Challenge from '../../models/Challenge';

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const limitRaw = searchParams.get('limit');
        const limit = limitRaw ? Math.max(0, Number(limitRaw) || 0) : 0;

        let query = Challenge.find({}).select('slug title difficulty category dayNumber').lean();
        if (limit > 0) query = query.limit(limit);

        const challenges = await query;
        return NextResponse.json(challenges);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
