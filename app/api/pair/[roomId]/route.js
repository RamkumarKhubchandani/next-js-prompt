import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Room from '../../../models/Room';

// Handle GET (Fetch Code) and POST (Save Code)
export async function GET(request, { params }) {
    try {
        await connectDB();
        // Await params for Next.js 15+
        const { roomId } = await params;

        // Find room or return default
        let room = await Room.findOne({ roomId });

        if (!room) {
            return NextResponse.json({ code: null, lastUpdated: new Date(0) });
        }

        return NextResponse.json({
            code: room.code,
            lastUpdated: room.lastUpdated
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        await connectDB();
        // Await params for Next.js 15+
        const { roomId } = await params;
        const { code } = await request.json();

        // Upsert room
        const room = await Room.findOneAndUpdate(
            { roomId },
            {
                code,
                lastUpdated: new Date()
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true, lastUpdated: room.lastUpdated });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
