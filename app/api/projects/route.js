import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import connectDB from '../../lib/mongodb';
import Project from '../../models/Project';
import User from '../../models/User';

export async function GET(request) {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit')) || 10;

    try {
        let query = { isPublic: true };
        if (userId) {
            query.user = userId;
        }

        const projects = await Project.find(query)
            .populate('user', 'name username')
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching projects' }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    try {
        const { title, description, code, template } = await request.json();

        if (!title || !code) {
            return NextResponse.json({ message: 'Title and code are required' }, { status: 400 });
        }

        const project = await Project.create({
            title,
            description,
            code,
            template: template || 'react',
            user: session.user.id
        });

        // Award XP for creating a project (First time only? Or capped?)
        // Let's give a small XP boost for engagement
        await User.findByIdAndUpdate(session.user.id, { $inc: { xp: 20 } });

        return NextResponse.json({ message: 'Project deployed successfully', project });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error creating project' }, { status: 500 });
    }
}



