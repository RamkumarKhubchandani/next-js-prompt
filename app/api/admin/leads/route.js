import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { requireAdmin, adminOnly } from '@/app/lib/requireAdmin';
import dbConnect from '@/app/lib/mongodb';
import MentorshipRequest from '@/models/MentorshipRequest';
import HireInquiry from '@/app/models/HireInquiry';
import MentorApplication from '@/app/models/MentorApplication';
import User from '@/app/models/User';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const adminSession = await requireAdmin(session);
    if (!adminSession) return adminOnly();

    await dbConnect();

    // 1. Fetch Mentorship Requests
    const mentorshipRequests = await MentorshipRequest.find({})
      .populate('assignedExpertIds', 'displayName slug photoUrl roles')
      .sort({ createdAt: -1 })
      .lean();

    // 2. Fetch Hire Inquiries
    const hireInquiries = await HireInquiry.find({})
      .populate('assignedExpertIds', 'displayName slug photoUrl roles')
      .sort({ createdAt: -1 })
      .lean();

    // 3. Fetch approved experts who consented to receive leads
    const approvedExperts = await MentorApplication.find({
      status: 'approved',
      'consents.receiveLeads': { $ne: null },
    })
      .populate('userId', 'name email image')
      .select('displayName slug photoUrl roles hourlyRate draft published consents assignedLeadsCount userId')
      .sort({ assignedLeadsCount: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      mentorshipRequests,
      hireInquiries,
      approvedExperts,
    });
  } catch (error) {
    console.error('Fetch Leads Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
