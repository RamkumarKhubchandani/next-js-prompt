import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import Post from '../../../models/Post';

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { postId } = await request.json();

        if (!postId) {
            return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Check if already completed
        const isCompleted = user.completedTutorials.includes(postId);
        
        if (isCompleted) {
            return NextResponse.json({ message: 'Tutorial already completed', xp: user.xp, completed: true });
        }

        // Add to completed and add XP
        user.completedTutorials.push(postId);
        user.xp += 50; // Award 50 XP per tutorial
        await user.save();

        return NextResponse.json({ 
            message: 'Tutorial marked as complete', 
            xp: user.xp, 
            completed: true,
            awardedXp: 50
        });

    } catch (error) {
        console.error('Error updating progress:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectDB();
        const user = await User.findOne({ email: session.user.email })
            .select('completedTutorials xp streak learningPath plan subscriptionEndDate')
            .lean();

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);

    } catch (error) {
        console.error('Error fetching progress:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

