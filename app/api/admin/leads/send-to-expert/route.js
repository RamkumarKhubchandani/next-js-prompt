import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { requireAdmin, adminOnly } from '@/app/lib/requireAdmin';
import dbConnect from '@/app/lib/mongodb';
import MentorshipRequest from '@/models/MentorshipRequest';
import HireInquiry from '@/app/models/HireInquiry';
import MentorApplication from '@/app/models/MentorApplication';
import User from '@/app/models/User';
import nodemailer from 'nodemailer';

async function sendLeadEmailToExpert({ expertEmail, expertName, clientName, clientEmail, clientPhone, leadType, details, replyToEmail }) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASSWORD;
  const fromEmail = process.env.EMAIL_FROM || emailUser || 'no-reply@outlinedev.com';

  const subject = `🎯 New OutlineDev Lead: ${leadType === 'mentorship' ? '1-on-1 Mentorship' : 'Client Engineering Inquiry'} from ${clientName}`;

  const textBody = `Hi ${expertName},

You have been selected by OutlineDev to receive a client lead!

Client Name: ${clientName}
Client Email: ${clientEmail}
Client Phone: ${clientPhone || 'Not provided'}
Inquiry Type: ${leadType === 'mentorship' ? '1-on-1 Mentorship Request' : 'Hire Developer Inquiry'}

Details:
${details}

Reply to this email directly to reach ${clientName} (${clientEmail}).

Best regards,
OutlineDev Dispatch Team`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px; color: #1e293b;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #047857 100%); padding: 20px; border-radius: 8px 8px 0 0; color: white;">
        <h2 style="margin: 0; font-size: 20px;">🎯 New OutlineDev Client Lead</h2>
        <p style="margin: 5px 0 0; font-size: 13px; opacity: 0.9;">Matched to you based on your verified expert profile.</p>
      </div>

      <div style="background: white; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
        <p>Hi <strong>${expertName}</strong>,</p>
        <p>Our admin team has matched you to the following incoming client request:</p>

        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0; font-size: 13px;">
          <p style="margin: 4px 0;"><strong>Client Name:</strong> ${clientName}</p>
          <p style="margin: 4px 0;"><strong>Client Email:</strong> <a href="mailto:${clientEmail}">${clientEmail}</a></p>
          <p style="margin: 4px 0;"><strong>Client Phone:</strong> ${clientPhone || 'Not provided'}</p>
          <p style="margin: 4px 0;"><strong>Inquiry Type:</strong> ${leadType === 'mentorship' ? '1-on-1 Mentorship' : 'Contract Engineering'}</p>
        </div>

        <div style="background: #ffffff; padding: 15px; border-left: 4px solid #10b981; border-radius: 4px; margin: 15px 0; font-size: 13px; white-space: pre-wrap;">
<strong>Request Details:</strong>
${details}
        </div>

        <p style="font-size: 13px; color: #475569;">
          <strong>Next Step:</strong> Simply hit <em>Reply</em> in your email client to reach the client directly at <strong>${clientEmail}</strong>.
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 11px; color: #94a3b8;">
          OutlineDev Lead Routing System. Note: Your private email address is kept confidential until you choose to reply.
        </p>
      </div>
    </div>
  `;

  if (!emailUser || !emailPass) {
    console.log(`[EMAIL NOTICE - No Mail Credentials Configured]`);
    console.log(`From: ${fromEmail} | To (Expert): ${expertEmail} | Reply-To: ${replyToEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${textBody}`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: `"OutlineDev Dispatch" <${fromEmail}>`,
      to: expertEmail,
      replyTo: replyToEmail, // Reply goes to client!
      subject,
      text: textBody,
      html: htmlBody,
    });
    console.log(`[LEAD DISPATCHED] Expert: ${expertEmail} | Client: ${clientEmail}`);
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to dispatch lead email to ${expertEmail}:`, err.message);
    console.log(`Fallback Log - Lead for ${clientName} to ${expertEmail}`);
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const adminSession = await requireAdmin(session);
    if (!adminSession) return adminOnly();

    await dbConnect();
    const body = await req.json();
    const { leadType, leadId, expertIds } = body;

    if (!leadType || !leadId || !Array.isArray(expertIds)) {
      return NextResponse.json({ error: 'leadType, leadId, and expertIds are required.' }, { status: 400 });
    }

    // Must be between 1 and 3 approved experts
    if (expertIds.length < 1 || expertIds.length > 3) {
      return NextResponse.json({ error: 'You must select between 1 and 3 experts.' }, { status: 400 });
    }

    // 1. Fetch Lead
    let lead = null;
    let clientName = '';
    let clientEmail = '';
    let clientPhone = '';
    let detailsText = '';

    if (leadType === 'mentorship') {
      lead = await MentorshipRequest.findById(leadId);
      if (!lead) return NextResponse.json({ error: 'Mentorship request not found.' }, { status: 404 });

      clientName = lead.name;
      clientEmail = lead.email;
      clientPhone = lead.phone;
      detailsText = `Goal: ${lead.goal || 'General Mentorship'}\nSkills: ${(lead.stack || []).join(', ')}${lead.otherStack ? ` (${lead.otherStack})` : ''}\nBudget: ${lead.budget || 'Flexible'}\nTimeline: ${lead.urgency || 'Flexible'}\nNotes: ${lead.description || 'None'}`;
    } else if (leadType === 'hire') {
      lead = await HireInquiry.findById(leadId);
      if (!lead) return NextResponse.json({ error: 'Hire inquiry not found.' }, { status: 404 });

      clientName = lead.name;
      clientEmail = lead.email;
      clientPhone = lead.phone;
      detailsText = `Role / Project: ${lead.roleSlug || 'Software Engineering'}\nCompany: ${lead.company || 'Not provided'}\nBudget: ${lead.budget || 'Flexible'}\nStart Date: ${lead.startDate || 'Immediate'}\nMessage:\n${lead.message}`;
    } else {
      return NextResponse.json({ error: 'Invalid leadType. Must be "mentorship" or "hire".' }, { status: 400 });
    }

    // 2. Fetch and Validate Selected Experts (Must be approved & consented to receive leads)
    const experts = await MentorApplication.find({
      _id: { $in: expertIds },
      status: 'approved',
      'consents.receiveLeads': { $ne: null },
    }).populate('userId', 'email name');

    if (experts.length === 0) {
      return NextResponse.json(
        { error: 'None of the selected experts are approved or have consented to receive leads.' },
        { status: 400 }
      );
    }

    // 3. Dispatch Email to Each Expert (Never reveal expert email to client)
    for (const expert of experts) {
      const expertEmail = expert.userId?.email;
      const expertName = expert.displayName || expert.userId?.name || 'Developer';

      if (expertEmail) {
        await sendLeadEmailToExpert({
          expertEmail,
          expertName,
          clientName,
          clientEmail,
          clientPhone,
          leadType,
          details: detailsText,
          replyToEmail: clientEmail, // Expert replies directly to client
        });
      }

      // Increment expert lead count
      expert.assignedLeadsCount = (expert.assignedLeadsCount || 0) + 1;
      await expert.save();
    }

    // 4. Update Lead Record with assignedExpertIds and sentAt
    const existingExpertIds = Array.isArray(lead.assignedExpertIds)
      ? lead.assignedExpertIds.map((id) => id.toString())
      : [];
    const mergedExpertIds = Array.from(new Set([...existingExpertIds, ...experts.map((e) => e._id.toString())]));

    lead.assignedExpertIds = mergedExpertIds;
    lead.sentAt = new Date();
    lead.status = 'sent';
    await lead.save();

    return NextResponse.json({
      success: true,
      sentCount: experts.length,
      assignedExpertIds: mergedExpertIds,
      sentAt: lead.sentAt,
    });
  } catch (error) {
    console.error('Send to Expert Error:', error);
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}
