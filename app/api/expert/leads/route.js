import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import dbConnect from '@/app/lib/mongodb';
import MentorApplication from '@/app/models/MentorApplication';
import MentorshipRequest from '@/models/MentorshipRequest';
import HireInquiry from '@/app/models/HireInquiry';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Find the caller's MentorApplication to scope leads strictly to them
    const expertApp = await MentorApplication.findOne({ userId: session.user.id });
    if (!expertApp) {
      return NextResponse.json({ leads: [] });
    }

    const expertAppId = expertApp._id;

    // Fetch only leads where assignedExpertIds explicitly contains caller's application ID
    const [mentorLeads, hireLeads] = await Promise.all([
      MentorshipRequest.find({ assignedExpertIds: expertAppId }).sort({ createdAt: -1 }).lean(),
      HireInquiry.find({ assignedExpertIds: expertAppId }).sort({ createdAt: -1 }).lean(),
    ]);

    // Normalize results to return date, type, skill, client name, message, and client reply-to email
    const normalizedMentor = (mentorLeads || []).map((lead) => ({
      id: String(lead._id),
      date: lead.createdAt,
      type: '1-on-1 Mentorship',
      skill: Array.isArray(lead.stack) && lead.stack.length > 0 ? lead.stack.join(', ') : (lead.goal || 'General Mentorship'),
      clientName: lead.name || 'Anonymous',
      clientEmail: lead.email,
      message: lead.description || lead.goal || '',
      phone: lead.phone || '',
      status: lead.status || 'sent',
    }));

    const normalizedHire = (hireLeads || []).map((lead) => ({
      id: String(lead._id),
      date: lead.createdAt,
      type: 'Hire Developer',
      skill: lead.roleSlug ? lead.roleSlug.replace(/-/g, ' ') : 'Contract Engineering',
      clientName: lead.name || 'Anonymous Client',
      clientEmail: lead.email,
      message: lead.message || '',
      phone: lead.phone || '',
      company: lead.company || '',
      budget: lead.budget || '',
      status: lead.status || 'sent',
    }));

    const allLeads = [...normalizedMentor, ...normalizedHire].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return NextResponse.json({ leads: allLeads });
  } catch (error) {
    console.error('Expert Leads Fetch Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
