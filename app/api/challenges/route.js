import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Challenge from '../../models/Challenge';

export async function GET(req) {
    try {
        await connectDB();
        const challenges = await Challenge.find({}).select('slug title difficulty category dayNumber');
        return NextResponse.json(challenges);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
