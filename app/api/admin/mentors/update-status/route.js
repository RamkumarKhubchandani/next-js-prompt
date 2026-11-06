import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { requireAdmin, adminOnly } from '@/app/lib/requireAdmin';
import dbConnect from '@/app/lib/mongodb';
import MentorApplication from '@/app/models/MentorApplication';
import { generateUniqueSlug, validateApprovableApplication, escapeHtml } from '@/app/lib/experts';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const ALLOWED_ACTIONS = ['approve', 'reject', 'hide', 'unhide', 'markInterviewed', 'setInterviewed'];

async function sendApplicantNotification({ to, subject, html, text }) {
  const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@outlinedev.com';

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      let resendFrom = 'onboarding@resend.dev';
      if (process.env.EMAIL_FROM && !process.env.EMAIL_FROM.includes('@gmail.com') && !process.env.EMAIL_FROM.includes('@example.com')) {
        resendFrom = process.env.EMAIL_FROM;
      }
      await resend.emails.send({
        from: `OutlineDev <${resendFrom}>`,
        to,
        subject,
        html,
        text,
      });
      return;
    } catch (err) {
      console.warn('Resend notification error:', err.message);
    }
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASSWORD;
  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: emailUser, pass: emailPass },
      });
      await transporter.sendMail({
        from: `"OutlineDev" <${fromEmail}>`,
        to,
        subject,
        html,
        text,
      });
      return;
    } catch (err) {
      console.warn('Nodemailer notification error:', err.message);
    }
  }

  console.log(`[APPLICANT NOTIFICATION] To: ${to} | Subject: ${subject}`);
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const adminSession = await requireAdmin(session);
    if (!adminSession) return adminOnly();

    await dbConnect();
    const body = await req.json().catch(() => ({}));
    const { id, action, note } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing application id' }, { status: 400 });
    }

    if (!action || !ALLOWED_ACTIONS.includes(action)) {
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    const application = await MentorApplication.findById(id).populate('userId', 'email name');
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const applicantEmail = application.userId?.email || application.email;
    const applicantName = application.displayName || application.userId?.name || 'Developer';

    if (action === 'approve') {
      const approvableErr = validateApprovableApplication(application);
      if (approvableErr) {
        return NextResponse.json({ error: approvableErr }, { status: 400 });
      }

      application.published = application.draft;
      if (application.draft?.displayName) application.displayName = application.draft.displayName;
      if (application.draft?.photoUrl) application.photoUrl = application.draft.photoUrl;
      if (Array.isArray(application.draft?.roles) && application.draft.roles.length > 0) {
        application.roles = application.draft.roles;
      }
      application.approvedAt = new Date();
      application.status = 'approved';
      application.hiddenByAdmin = false;
      application.reviewedBy = session.user.id;
      application.reviewedAt = new Date();

      if (!application.slug) {
        application.slug = await generateUniqueSlug(application.displayName, application._id);
      }

      await application.save();

      // Revalidate cache tag for only this person's skills
      const approvedSkillIds = application.published?.skillIds || [];
      for (const skillId of approvedSkillIds) {
        try {
          const nextCache = await import('next/cache');
          if (nextCache && typeof nextCache.revalidateTag === 'function') {
            nextCache.revalidateTag(`experts:skill:${skillId}`);
          }
        } catch (tagErr) {
          console.warn(`revalidateTag failed for experts:skill:${skillId}:`, tagErr?.message || tagErr);
        }
      }

      if (applicantEmail) {
        const safeApplicantName = escapeHtml(applicantName);
        const profileUrl = `https://www.outlinedev.com/experts/${application.slug}`;
        await sendApplicantNotification({
          to: applicantEmail,
          subject: '🎉 Your OutlineDev Expert Profile is Approved!',
          text: `Hi ${applicantName},\n\nCongratulations! Your expert profile on OutlineDev has been approved.\n\nYour profile slug: ${application.slug}\n\nView your profile: ${profileUrl}\n\nBest regards,\nThe OutlineDev Team`,
          html: `
            <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; padding: 20px;">
              <h2 style="color: #059669;">Congratulations, ${safeApplicantName}! 🎉</h2>
              <p>Your expert profile on <strong>OutlineDev</strong> has been approved by our review team.</p>
              <p>Your unique profile slug has been assigned: <code>${application.slug}</code></p>
              <p>Your published profile is now live at <a href="${profileUrl}">www.outlinedev.com/experts/${application.slug}</a>.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="font-size: 12px; color: #64748b;">OutlineDev Mentorship & Engineering Network</p>
            </div>
          `,
        });
      }

      return NextResponse.json({ success: true, application });
    }

    if (action === 'reject') {
      application.status = 'rejected';
      application.adminNotes = note || '';
      application.rejectedAt = new Date();
      application.reviewedBy = session.user.id;
      application.reviewedAt = new Date();

      await application.save();

      if (applicantEmail) {
        const safeApplicantName = escapeHtml(applicantName);
        const safeNote = escapeHtml(note);
        await sendApplicantNotification({
          to: applicantEmail,
          subject: 'Update on your OutlineDev Expert Application',
          text: `Hi ${applicantName},\n\nThank you for applying to OutlineDev. After reviewing your application, we are unable to approve your listing at this time.\n\nNotes: ${application.adminNotes}\n\nBest regards,\nThe OutlineDev Team`,
          html: `
            <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; padding: 20px;">
              <h2 style="color: #334155;">Application Status Update</h2>
              <p>Hi ${safeApplicantName},</p>
              <p>Thank you for your interest in joining OutlineDev. After reviewing your application, we are unable to approve your listing at this time.</p>
              ${
                note
                  ? `<div style="background: #f1f5f9; padding: 12px 16px; border-left: 4px solid #94a3b8; margin: 16px 0;">
                      <strong>Review Note:</strong> ${safeNote}
                     </div>`
                  : ''
              }
              <p>You can update your profile details and resubmit for review at any time through your dashboard.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="font-size: 12px; color: #64748b;">OutlineDev Mentorship & Engineering Network</p>
            </div>
          `,
        });
      }

      return NextResponse.json({ success: true, application });
    }

    if (action === 'hide') {
      application.status = 'hidden';
      application.hiddenByAdmin = true;
      await application.save();
      return NextResponse.json({ success: true, application });
    }

    if (action === 'unhide') {
      application.status = 'approved';
      application.hiddenByAdmin = false;
      await application.save();
      return NextResponse.json({ success: true, application });
    }

    if (action === 'markInterviewed' || action === 'setInterviewed') {
      application.interviewedAt = new Date();
      await application.save();
      return NextResponse.json({ success: true, application });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Update Status Error:', error);
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}
