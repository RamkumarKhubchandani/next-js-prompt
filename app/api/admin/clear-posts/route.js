import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '../../../../lib/mongodb';
import Post from '../../../../models/Post';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function DELETE(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Optional: Add a check to ensure only a specific admin can do this
    // if (session.user.email !== 'your-super-admin-email@example.com') {
    //     return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    // }

    try {
        await connectDB();
        const deleteResult = await Post.deleteMany({});
        return NextResponse.json({ message: "All posts have been deleted.", count: deleteResult.deletedCount }, { status: 200 });
    } catch (error) {
        console.error("Error deleting posts:", error);
        return NextResponse.json(
            { message: "An error occurred while deleting posts." },
            { status: 500 }
        );
    }
}
