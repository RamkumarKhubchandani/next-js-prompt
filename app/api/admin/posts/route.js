import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '../../../lib/mongodb';
import Post from '../../../models/Post';
import User from '../../../models/User';
import { authOptions } from '../../auth/[...nextauth]/route';

// Function to generate a URL-friendly slug
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};


export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, content, category, seo, isPremium } = await request.json();

        if (!title || !content || !category) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ message: "Admin user not found" }, { status: 404 });
        }

        let slug = generateSlug(title);
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
        }

        const newPostData = {
            postID: `post-${Date.now()}`,
            title,
            content,
            category,
            slug,
            author: user._id,
            isPremium,
            metaTitle: seo?.metaTitle,
            metaDescription: seo?.metaDescription,
            keywords: seo?.keywords,
        };

        const newPost = await Post.create(newPostData);

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { message: "An error occurred while creating the post." },
            { status: 500 }
        );
    }
}
