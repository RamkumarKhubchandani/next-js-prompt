import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Job from '../../../models/Job';

export async function GET() {
    try {
        await connectDB();
        // If no jobs exist, insert dummy data for demo
        const count = await Job.countDocuments();
        if (count === 0) {
            await Job.insertMany([
                {
                    title: "Senior React Engineer",
                    company: "TechFlow",
                    location: "Remote (US)",
                    salary: "$140k - $180k",
                    tags: ["React", "Next.js", "TypeScript"],
                    description: "We are looking for a senior engineer to lead our frontend team...",
                },
                {
                    title: "Fullstack Developer",
                    company: "StartupX",
                    location: "London / Remote",
                    salary: "£60k - £80k",
                    tags: ["Node.js", "MongoDB", "Vue"],
                    description: "Join our fast-paced startup building the future of fintech...",
                },
                {
                    title: "Frontend Architect",
                    company: "MegaCorp",
                    location: "Remote",
                    salary: "$160k+",
                    tags: ["React", "System Design", "AWS"],
                    description: "Architect scalable frontend systems for millions of users...",
                }
            ]);
        }

        const jobs = await Job.find({}).sort({ postedAt: -1 });
        return NextResponse.json(jobs);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

