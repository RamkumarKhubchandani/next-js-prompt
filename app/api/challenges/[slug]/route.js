import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Challenge from '../../../models/Challenge';

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { slug } = params;
        
        const challenge = await Challenge.findOne({ slug });
        
        if (!challenge) {
            return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
        }

        // Hide solution code initially? 
        // For now we send it, but in a real app we might validate on server.
        // But for this "client-side editor" experience, we'll send it 
        // and just not show it in the UI until they give up.

        return NextResponse.json(challenge);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
