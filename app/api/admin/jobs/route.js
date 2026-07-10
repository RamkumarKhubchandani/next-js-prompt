import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Job from '../../../models/Job';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.email !== 'admin@example.com')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        await connectDB();
        const jobs = await Job.find({ source: 'internal' }).sort({ postedAt: -1 }).lean();
        return NextResponse.json({ jobs });
    } catch (error) {
        console.error('GET /api/admin/jobs error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.email !== 'admin@example.com')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        await connectDB();
        const body = await request.json();
        
        const { title, company, location, workplace, role, type, salary, tags, description, applyLink } = body;
        
        if (!title || !company || !applyLink) {
            return NextResponse.json({ message: 'Title, Company, and Apply Link are required' }, { status: 400 });
        }

        const newJob = new Job({
            source: 'internal',
            title,
            company,
            location: location || 'Remote',
            workplace: workplace || 'unknown',
            role: role || 'unknown',
            type: type || 'Full-time',
            salary: salary || '',
            tags: Array.isArray(tags) ? tags : [],
            description: description || '',
            applyLink,
            postedAt: new Date()
        });

        await newJob.save();
        return NextResponse.json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        console.error('POST /api/admin/jobs error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.email !== 'admin@example.com')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get('jobId');
        
        if (!jobId) {
            return NextResponse.json({ message: 'Missing jobId' }, { status: 400 });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        await Job.deleteOne({ _id: jobId });
        return NextResponse.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('DELETE /api/admin/jobs error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
