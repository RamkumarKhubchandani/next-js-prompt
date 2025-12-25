import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { courseId, score } = await req.json();

        if (!courseId || score === undefined) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        await connectDB();

        // Find user
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if already has certificate for this course
        const existingCert = user.certificates?.find(c => c.courseId === courseId);

        if (existingCert) {
            // Optional: Update score if better? For now, just return success if already exists
            return NextResponse.json({ message: 'Certificate already exists', certificate: existingCert });
        }

        // Add new certificate
        const newCert = {
            courseId,
            certificateId: uuidv4(),
            score,
            earnedAt: new Date()
        };

        user.certificates.push(newCert);

        // Also award some XP for passing!
        user.xp += 500;

        await user.save();

        return NextResponse.json({ message: 'Certificate awarded', certificate: newCert });

    } catch (error) {
        console.error('Certificate API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
