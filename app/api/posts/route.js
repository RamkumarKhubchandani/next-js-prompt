import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Post from '../../models/Post';

export async function GET(request) {
    try {
        await connectDB();
        const posts = await Post.find({})
            .populate('author', 'name')
            .sort({ createdAt: -1 }); // Sort by newest first

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { message: "An error occurred while fetching posts." },
            { status: 500 }
        );
    }
}
