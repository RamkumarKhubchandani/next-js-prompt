import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Room from '../../models/Room';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId');

    if (!roomId) {
        return NextResponse.json({ message: 'Room ID required' }, { status: 400 });
    }

    try {
        await connectDB();
        const room = await Room.findOne({ roomId });
        
        if (!room) {
            return NextResponse.json({ message: 'Room not found' }, { status: 404 });
        }

        return NextResponse.json(room);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request) {
    const { roomId, code } = await request.json();

    try {
        await connectDB();
        
        // Upsert: Update if exists, Create if not
        const room = await Room.findOneAndUpdate(
            { roomId },
            { 
                roomId, 
                code,
                lastUpdated: new Date()
            },
            { upsert: true, new: true }
        );

        return NextResponse.json(room);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
