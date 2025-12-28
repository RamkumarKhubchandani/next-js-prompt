import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await connectDB();
    try {
        const { path } = await request.json();
        await User.findOneAndUpdate(
            { email: session.user.email },
            { learningPath: path }
        );
        return NextResponse.json({ message: 'Path updated', path });
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}



