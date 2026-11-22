import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { requireAdmin, adminOnly } from '@/app/lib/requireAdmin';
import connectDB from '@/app/lib/mongodb';
import MentorshipRequest from '@/models/MentorshipRequest';
import OneToOneCall from '@/models/OneToOneCall';
import HireInquiry from '@/models/HireInquiry';
import { ALLOWED_REQUEST_STATUSES, isValidObjectId } from '@/app/lib/experts';

export async function GET(request) {
    try {
        // Check if user is authenticated
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const adminSession = await requireAdmin(session);
        const forbidden = adminOnly(adminSession);
        if (forbidden) {
            return forbidden;
        }

        await connectDB();

        // Fetch requests from MentorshipRequest, OneToOneCall (Book Free Session / 15-min calls), and HireInquiry
        const [mentorshipRequests, callRequests, hireInquiries] = await Promise.all([
            MentorshipRequest.find({}).sort({ createdAt: -1 }).limit(100).lean(),
            OneToOneCall.find({}).sort({ createdAt: -1 }).limit(100).lean(),
            HireInquiry.find({}).sort({ createdAt: -1 }).limit(100).lean()
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

        const normalizedHire = (hireInquiries || []).map(hire => {
            const roleName = hire.roleSlug
                ? hire.roleSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                : 'Project / Developer';

            const goal = `Hire: ${roleName}${hire.company ? ` (${hire.company})` : ''}`;
            const urgency = hire.startDate ? `Start: ${hire.startDate}` : 'Flexible timeline';
            const budget = hire.budget || 'Flexible';
            const stack = hire.roleSlug ? [hire.roleSlug] : ['Client Project'];

            const statusMap = {
                pending: 'pending',
                sent: 'contacted',
                contacted: 'contacted',
                matched: 'matched',
                closed: 'completed',
                completed: 'completed',
                cancelled: 'cancelled'
            };
            const mappedStatus = statusMap[hire.status] || hire.status || 'pending';

            const descriptionParts = [
                hire.company ? `Company: ${hire.company}` : '',
                hire.message,
                hire.sourceUrl ? `Source: ${hire.sourceUrl}` : ''
            ].filter(Boolean);

            return {
                _id: String(hire._id),
                name: hire.name || 'Anonymous Client',
                email: hire.email,
                phone: String(hire.phone || ''),
                budget,
                goal,
                urgency,
                stack,
                description: descriptionParts.join(' | '),
                status: mappedStatus,
                rawStatus: hire.status,
                company: hire.company || '',
                roleSlug: hire.roleSlug || '',
                sourceUrl: hire.sourceUrl || '',
                requestType: 'Hire Inquiry',
                createdAt: hire.createdAt
            };
        });

        // Merge all and sort newest first
        const allRequests = [...normalizedMentorship, ...normalizedCalls, ...normalizedHire].sort(
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

        const adminSession = await requireAdmin(session);
        const forbidden = adminOnly(adminSession);
        if (forbidden) {
            return forbidden;
        }

        const body = await request.json().catch(() => ({}));
        const { id, status } = body || {};

        if (!status || !ALLOWED_REQUEST_STATUSES.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
        }

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

        // If not found in OneToOneCall, update HireInquiry
        if (!updated) {
            updated = await HireInquiry.findByIdAndUpdate(
                id,
                { status },
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
