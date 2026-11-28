import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { requireAdmin, adminOnly } from '@/app/lib/requireAdmin';
import dbConnect from '@/app/lib/mongodb';
import MentorApplication from '@/app/models/MentorApplication';
import { generateUniqueSlug, validateApprovableApplication, escapeHtml, revalidateExpertSkillTags } from '@/app/lib/experts';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const ALLOWED_ACTIONS = ['approve', 'reject', 'hide', 'unhide', 'markInterviewed', 'setInterviewed', 'delete'];

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
        application.slug = await generateUniqueSlug(application.displayName, application._id, MentorApplication);
      }

      await application.save();

      // Revalidate cache tag for this person's skills
      const approvedSkillIds = application.published?.skillIds || [];
      await revalidateExpertSkillTags(approvedSkillIds);

      if (applicantEmail) {
        const safeApplicantName = escapeHtml(applicantName);
        const safeSlug = escapeHtml(application.slug);
        const profileUrl = `https://www.outlinedev.com/experts/${safeSlug}`;
        const loginUrl = 'https://www.outlinedev.com/login';
        const dashboardUrl = 'https://www.outlinedev.com/expert-dashboard';

        await sendApplicantNotification({
          to: applicantEmail,
          subject: '🎉 Your OutlineDev Expert Profile is Approved!',
          text: `Hi ${applicantName},\n\nCongratulations! Your expert profile on OutlineDev has been approved.\n\nYour profile slug: ${application.slug}\nLive Profile: ${profileUrl}\nExpert Dashboard: ${dashboardUrl}\nLog In: ${loginUrl}\n\nBest regards,\nThe OutlineDev Team`,
          html: `
            <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; padding: 20px;">
              <h2 style="color: #059669;">Congratulations, ${safeApplicantName}! 🎉</h2>
              <p>Your expert profile on <strong>OutlineDev</strong> has been approved by our review team.</p>
              <p>Your unique profile slug has been assigned: <code>${safeSlug}</code></p>
              <p>Your published profile is now live at <a href="${profileUrl}">${profileUrl}</a>.</p>
              <div style="margin: 20px 0; padding: 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; font-weight: bold;">Quick Links:</p>
                <ul style="margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 6px;"><a href="${dashboardUrl}" style="color: #059669; font-weight: bold;">Expert Dashboard</a> - View client requests assigned to you & edit your profile</li>
                  <li style="margin-bottom: 6px;"><a href="${profileUrl}">Public Profile</a> - View your live public listing</li>
                  <li><a href="${loginUrl}">Log In</a> - Access your OutlineDev account</li>
                </ul>
              </div>
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

      const rejectSkillIds = [...(application.published?.skillIds || []), ...(application.draft?.skillIds || [])];
      await revalidateExpertSkillTags(rejectSkillIds);

      if (applicantEmail) {
        const safeApplicantName = escapeHtml(applicantName);
        const safeNote = escapeHtml(note || application.adminNotes || '');
        const loginUrl = 'https://www.outlinedev.com/login';
        const dashboardUrl = 'https://www.outlinedev.com/expert-dashboard';

        await sendApplicantNotification({
          to: applicantEmail,
          subject: 'Update on your OutlineDev Expert Application',
          text: `Hi ${applicantName},\n\nThank you for applying to OutlineDev. After reviewing your application, we are unable to approve your listing at this time.\n\nNotes: ${application.adminNotes}\n\nYou can review your application and make updates via your Expert Dashboard: ${dashboardUrl}\nLog In: ${loginUrl}\n\nBest regards,\nThe OutlineDev Team`,
          html: `
            <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; padding: 20px;">
              <h2 style="color: #334155;">Application Status Update</h2>
              <p>Hi ${safeApplicantName},</p>
              <p>Thank you for your interest in joining OutlineDev. After reviewing your application, we are unable to approve your listing at this time.</p>
              ${
                safeNote
                  ? `<div style="background: #f1f5f9; padding: 12px 16px; border-left: 4px solid #94a3b8; margin: 16px 0;">
                      <strong>Review Note:</strong> ${safeNote}
                     </div>`
                  : ''
              }
              <p>You can update your profile details and resubmit for review at any time through your <a href="${dashboardUrl}">Expert Dashboard</a>.</p>
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
      if (note) application.adminNotes = note;
      await application.save();

      const hideSkillIds = [...(application.published?.skillIds || []), ...(application.draft?.skillIds || [])];
      await revalidateExpertSkillTags(hideSkillIds);

      if (applicantEmail && note) {
        const safeApplicantName = escapeHtml(applicantName);
        const safeNote = escapeHtml(note);
        const dashboardUrl = 'https://www.outlinedev.com/expert-dashboard';
        await sendApplicantNotification({
          to: applicantEmail,
          subject: 'Notice regarding your OutlineDev Expert Profile',
          text: `Hi ${applicantName},\n\nYour expert profile on OutlineDev has been set to hidden.\n\nNotes: ${note}\n\nBest regards,\nThe OutlineDev Team`,
          html: `
            <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; padding: 20px;">
              <h2 style="color: #334155;">Profile Status Update</h2>
              <p>Hi ${safeApplicantName},</p>
              <p>Your expert profile on OutlineDev has been hidden from public search.</p>
              <div style="background: #f1f5f9; padding: 12px 16px; border-left: 4px solid #94a3b8; margin: 16px 0;">
                <strong>Admin Note:</strong> ${safeNote}
              </div>
              <p>You can manage and update your profile from your <a href="${dashboardUrl}">Expert Dashboard</a>.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="font-size: 12px; color: #64748b;">OutlineDev Mentorship & Engineering Network</p>
            </div>
          `,
        });
      }

      return NextResponse.json({ success: true, application });
    }

    if (action === 'unhide') {
      application.status = 'approved';
      application.hiddenByAdmin = false;
      await application.save();
      const unhideSkillIds = [...(application.published?.skillIds || []), ...(application.draft?.skillIds || [])];
      await revalidateExpertSkillTags(unhideSkillIds);
      return NextResponse.json({ success: true, application });
    }

    if (action === 'markInterviewed' || action === 'setInterviewed') {
      application.interviewedAt = new Date();
      await application.save();
      const interviewedSkillIds = [...(application.published?.skillIds || []), ...(application.draft?.skillIds || [])];
      await revalidateExpertSkillTags(interviewedSkillIds);
      return NextResponse.json({ success: true, application });
    }

    if (action === 'delete') {
      const deleteSkillIds = [
        ...(application.published?.skillIds || []),
        ...(application.draft?.skillIds || []),
      ];
      await MentorApplication.findByIdAndDelete(id);
      await revalidateExpertSkillTags(deleteSkillIds);
      return NextResponse.json({ success: true, message: 'Expert profile deleted permanently' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Update Status Error:', error);
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}
