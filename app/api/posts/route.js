import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Post from '../../models/Post';

export async function GET(request) {
    try {
        await connectDB();
        const posts = await Post.find({})
            .select('-content') // Exclude content to reduce payload size
            .populate('author', 'name')
            .sort({ createdAt: -1 })
            .lean(); // Return plain JavaScript objects

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { message: "An error occurred while fetching posts." },
            { status: 500 }
        );
    }
}
