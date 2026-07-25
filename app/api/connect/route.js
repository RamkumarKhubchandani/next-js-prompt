import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import connectDB from '@/app/lib/mongodb';
import OneToOneCall from '@/models/OneToOneCall';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build_safety');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json().catch(() => ({}));

    const ownerEmail = 'infojsprompt@gmail.com';

    const requesterEmail = (session?.user?.email || body.email || '').trim();
    const requesterName = (session?.user?.name || body.name || '').trim();

    const courseId = String(body.courseId || '').trim();
    const courseTitle = String(body.courseTitle || '').trim();
    const day = typeof body.day === 'number' ? body.day : Number(body.day);
    const lessonTitle = String(body.lessonTitle || '').trim();
    const sourceUrl = String(body.sourceUrl || '').trim();

    const preferredTime = String(body.preferredTime || '').trim();
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

    // Connect to database and save
    await connectDB();

    const callRequest = await OneToOneCall.create({
      name: requesterName,
      email: requesterEmail,
      phone: {
        countryCode: phone.countryCode,
        number: phone.number
      },
      preferredTime,
      timezone,
      notes,
      courseId,
      courseTitle,
      day: Number.isFinite(day) ? day : null,
      lessonTitle,
      sourceUrl,
      profile,
      status: 'pending'
    });

    console.log('✅ Saved 1:1 call request to database:', callRequest._id);

    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const hasLessonContext = Boolean(courseId && lessonTitle && Number.isFinite(day));
    const subject = hasLessonContext
      ? `🎯 1:1 Call Request — ${courseTitle || courseId} / Day ${day}: ${lessonTitle}`
      : `🎯 1:1 Call Request — General`;

    const fullPhone = `${phone.countryCode} ${phone.number}`;
    const whatsappLink = `https://wa.me/${fullPhone.replace(/\D/g, '')}`;

    // Owner notification (Admin)
    const adminEmail = await resend.emails.send({
      from: 'Mentorship Platform <onboarding@resend.dev>',
      to: ownerEmail,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New 1:1 Call Request</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">Request Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Name:</td>
                <td style="padding: 12px 0; color: #1f2937;">${requesterName || '—'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Email:</td>
                <td style="padding: 12px 0; color: #1f2937;"><a href="mailto:${requesterEmail}" style="color: #667eea;">${requesterEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">WhatsApp:</td>
                <td style="padding: 12px 0; color: #1f2937;"><a href="${whatsappLink}" style="color: #25D366; font-weight: bold;">${fullPhone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Preferred Time:</td>
                <td style="padding: 12px 0; color: #1f2937;">${preferredTime} ${timezone ? `(${timezone})` : ''}</td>
              </tr>
              ${hasLessonContext ? `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Course:</td>
                  <td style="padding: 12px 0; color: #1f2937;">${courseTitle || courseId}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Day:</td>
                  <td style="padding: 12px 0; color: #1f2937;">${day}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Lesson:</td>
                  <td style="padding: 12px 0; color: #1f2937;">${lessonTitle}</td>
                </tr>
              ` : ''}
              ${sourceUrl ? `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Source Page:</td>
                  <td style="padding: 12px 0; color: #1f2937;"><a href="${sourceUrl}" style="color: #667eea;">View Page</a></td>
                </tr>
              ` : ''}
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #6b7280; vertical-align: top;">Notes:</td>
                <td style="padding: 12px 0; color: #1f2937;"><pre style="white-space:pre-wrap;font-family:inherit;margin:0;">${notes || '—'}</pre></td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
              <p style="margin: 0; color: #92400e; font-weight: bold;">⚡ Action Required</p>
              <p style="margin: 5px 0 0 0; color: #92400e;">Please respond to ${requesterEmail} or <a href="${whatsappLink}" style="color: #25D366;">WhatsApp ${fullPhone}</a> to schedule the call.</p>
            </div>

            <div style="margin-top: 20px; padding: 15px; background-color: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 5px;">
              <p style="margin: 0; color: #075985; font-size: 13px;">
                <strong>Database ID:</strong> ${callRequest._id}<br/>
                <strong>Submitted:</strong> ${submittedAt}
              </p>
            </div>

            ${profile.id ? `
              <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 5px;">
                <p style="margin: 0; color: #6b7280; font-size: 13px;">
                  <strong>User Profile:</strong><br/>
                  ID: ${profile.id || '—'}<br/>
                  Username: ${profile.username || '—'}<br/>
                  Plan: ${profile.plan || '—'}<br/>
                  Role: ${profile.role || '—'}
                </p>
              </div>
            ` : ''}
          </div>
        </div>
      `,
      replyTo: requesterEmail,
    });

    console.log('✅ Admin email sent:', adminEmail.data?.id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('❌ Connect request error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send request' }, { status: 500 });
  }
}
