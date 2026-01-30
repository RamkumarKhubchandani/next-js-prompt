import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import dbConnect from '../../../../lib/mongodb';
import MentorApplication from '../../../../models/MentorApplication';
import User from '../../../../models/User';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await dbConnect();
        const { id, status } = await req.json();

        const application = await MentorApplication.findById(id);
        if (!application) return NextResponse.json({ error: 'Not Found' }, { status: 404 });

        // Update Application Status
        application.status = status;
        application.reviewedBy = session.user.id;
        application.reviewedAt = new Date();
        await application.save();

        // If Approved, Upgrade User Role
        if (status === 'approved') {
            const user = await User.findById(application.userId);
            if (user) {
                // We adding a specialized role or creating a Mentor Profile object
                // For MVP: Let's assume we might have a 'mentor' role in future. 
                // For now, we mainly rely on the Application status "approved" to grant access.
                // Or we can just set a flag if your User model supported it.
                // Let's assume we rely on the application status for now, or send email.
            }

            // MOCK EMAIL SENDING
            console.log(`[EMAIL SYSTEM] Sending 'You are Approved!' email to User ${application.userId}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Update Status Error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
