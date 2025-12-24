import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';

// Nodemailer requires the Node.js runtime (not Edge).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json().catch(() => ({}));

    const ownerEmail = 'ramkumarkhub@gmail.com';
    const emailFrom = requiredEnv('EMAIL_USER');
    const emailPass = requiredEnv('EMAIL_PASSWORD');

    const requesterEmail = (session?.user?.email || body.email || '').trim();
    const requesterName = (session?.user?.name || body.name || '').trim();

    const courseId = String(body.courseId || '').trim();
    const courseTitle = String(body.courseTitle || '').trim();
    const day = typeof body.day === 'number' ? body.day : Number(body.day);
    const lessonTitle = String(body.lessonTitle || '').trim();
    const sourceUrl = String(body.sourceUrl || '').trim();

    const preferredTime = String(body.preferredTime || '').trim(); // datetime-local ISO-ish string
    const timezone = String(body.timezone || '').trim();
    const notes = String(body.notes || '').trim();
    const phone = body.phone && typeof body.phone === 'object' ? body.phone : {};
    const profile = body.profile && typeof body.profile === 'object' ? body.profile : {};

    if (!requesterEmail) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }
    if (!preferredTime) {
      return NextResponse.json({ message: 'Preferred time is required' }, { status: 400 });
    }
    if (!String(phone.number || '').trim()) {
      return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailFrom, pass: emailPass },
    });

    const submittedAt = new Date().toLocaleString();
    const hasLessonContext = Boolean(courseId && lessonTitle && Number.isFinite(day));
    const subject = hasLessonContext
      ? `1:1 Connect Request — ${courseTitle || courseId} / Day ${day}: ${lessonTitle}`
      : `1:1 Connect Request — General`;

    const detailsHtml = `
      <h2>1:1 Connect Request</h2>
      <p><strong>Submitted at:</strong> ${submittedAt}</p>
      <hr/>
      <p><strong>Requester:</strong> ${requesterName || '—'}</p>
      <p><strong>Email:</strong> ${requesterEmail}</p>
      <p><strong>Preferred time:</strong> ${preferredTime} ${timezone ? `(${timezone})` : ''}</p>
      <p><strong>Phone:</strong> ${(phone.countryCode || '').trim()} ${(phone.number || '').trim()}</p>
      ${sourceUrl ? `<p><strong>Source page:</strong> ${sourceUrl}</p>` : ''}
      <hr/>
      ${hasLessonContext ? `
        <p><strong>Course:</strong> ${courseTitle || courseId}</p>
        <p><strong>Day:</strong> ${day}</p>
        <p><strong>Lesson:</strong> ${lessonTitle}</p>
      ` : `<p><strong>Lesson context:</strong> Not provided (general request)</p>`}
      <hr/>
      <p><strong>Notes:</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">${notes || '—'}</pre>
      <hr/>
      <p><strong>Profile (best-effort):</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">${JSON.stringify(profile, null, 2)}</pre>
    `;

    // Owner notification
    await transporter.sendMail({
      from: emailFrom,
      to: ownerEmail,
      subject,
      html: detailsHtml,
      replyTo: requesterEmail,
    });

    // User confirmation
    await transporter.sendMail({
      from: emailFrom,
      to: requesterEmail,
      subject: `✅ Received: ${subject}`,
      html: `
        <h2>We got your request!</h2>
        <p>Ram will reach out to you soon.</p>
        <hr/>
        ${detailsHtml}
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('connect request error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send request' }, { status: 500 });
  }
}


