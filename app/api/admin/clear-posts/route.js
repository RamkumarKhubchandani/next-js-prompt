import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { requireAdmin, adminOnly } from '../../../lib/requireAdmin';
import connectDB from '../../../lib/mongodb';
import Post from '../../../models/Post';

export async function DELETE(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminSession = await requireAdmin(session);
    if (!adminSession) {
        return adminOnly();
    }

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
