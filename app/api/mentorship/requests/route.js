import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/mongodb';
import MentorshipRequest from '@/models/MentorshipRequest';
import OneToOneCall from '@/models/OneToOneCall';

export async function GET(request) {
    try {
        // Check if user is authenticated
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Fetch requests from both MentorshipRequest and OneToOneCall (Book Free Session / 15-min calls)
        const [mentorshipRequests, callRequests] = await Promise.all([
            MentorshipRequest.find({}).sort({ createdAt: -1 }).limit(100).lean(),
            OneToOneCall.find({}).sort({ createdAt: -1 }).limit(100).lean()
        ]);

        const normalizedCalls = (callRequests || []).map(call => {
            const phoneStr = typeof call.phone === 'object' && call.phone
                ? `${call.phone.countryCode || ''} ${call.phone.number || ''}`.trim()
                : String(call.phone || '');

            const goal = call.courseTitle || call.lessonTitle
                ? `${call.courseTitle || ''}${call.lessonTitle ? ` (Day ${call.day || ''}: ${call.lessonTitle})` : ''}`
                : (call.preferredTime ? `1:1 Session (${call.preferredTime})` : '1:1 Free Call');

            const urgency = call.preferredTime
                ? `${call.preferredTime}${call.timezone ? ` [${call.timezone}]` : ''}`
                : '15-Min Strategy Call';

            const stack = call.courseId ? [call.courseId] : ['1:1 Call'];

            const statusMap = {
                scheduled: 'matched',
                pending: 'pending',
                completed: 'completed',
                cancelled: 'cancelled',
                contacted: 'contacted'
            };
            const mappedStatus = statusMap[call.status] || call.status || 'pending';

            return {
                _id: String(call._id),
                name: call.name || 'Anonymous',
                email: call.email,
                phone: phoneStr,
                budget: 'Free (15-min Call)',
                goal,
                urgency,
                stack,
                description: [call.notes, call.sourceUrl ? `Source: ${call.sourceUrl}` : ''].filter(Boolean).join(' | '),
                status: mappedStatus,
                requestType: '1-on-1 Call',
                createdAt: call.createdAt
            };
        });

        const normalizedMentorship = (mentorshipRequests || []).map(req => ({
            ...req,
            _id: String(req._id),
            phone: String(req.phone || ''),
            requestType: 'Mentorship'
        }));

        // Merge both and sort newest first
        const allRequests = [...normalizedMentorship, ...normalizedCalls].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        return NextResponse.json({
            success: true,
            requests: allRequests,
            total: allRequests.length
        });

    } catch (error) {
        console.error('Error fetching mentorship requests:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

// Update request status
export async function PATCH(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id, status } = await request.json();

        await connectDB();

        // Try updating MentorshipRequest first
        let updated = await MentorshipRequest.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        // If not found in MentorshipRequest, update OneToOneCall
        if (!updated) {
            const callStatus = status === 'matched' ? 'scheduled' : status;
            updated = await OneToOneCall.findByIdAndUpdate(
                id,
                { status: callStatus },
                { new: true }
            );
        }

        return NextResponse.json({
            success: true,
            request: updated
        });

    } catch (error) {
        console.error('Error updating request:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
