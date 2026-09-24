import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
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

    const ownerEmail = process.env.ADMIN_EMAIL || 'infojsprompt@gmail.com';

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
        countryCode: phone.countryCode || '',
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
    const isLeadMagnet = notes.toLowerCase().includes('lead magnet') || preferredTime.toLowerCase().includes('toolkit') || preferredTime.toLowerCase().includes('audit');
    
    const subject = isLeadMagnet
      ? `🎁 [Lead Magnet] 2026 Developer Toolkit Claimed by ${requesterName || requesterEmail}`
      : hasLessonContext
        ? `🎯 1:1 Call Request — ${courseTitle || courseId} / Day ${day}: ${lessonTitle}`
        : `🎯 1:1 Call Request — General (${requesterName || requesterEmail})`;

    const fullPhone = `${phone.countryCode || ''} ${phone.number}`.trim();
    const whatsappLink = `https://wa.me/${fullPhone.replace(/\D/g, '')}`;
    const ramWhatsappLink = `https://wa.me/918237320942?text=Hi%20Ram%2C%20I%20have%20claimed%20the%202026%20Developer%20Toolkit%20and%20want%20to%20schedule%20my%20free%2015-minute%20code%20audit.`;

    // 1. Send Admin Notification Email
    try {
      if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')) {
        await resend.emails.send({
          from: 'OutlineDev Platform <onboarding@resend.dev>',
          to: ownerEmail,
          subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #047857 100%); padding: 25px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 22px;">🎯 New Lead / 1:1 Call Request</h1>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 0 0 10px 10px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Name:</td>
                    <td style="padding: 10px 0; color: #1f2937;">${requesterName || '—'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Email:</td>
                    <td style="padding: 10px 0; color: #1f2937;"><a href="mailto:${requesterEmail}" style="color: #10b981;">${requesterEmail}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">WhatsApp / Phone:</td>
                    <td style="padding: 10px 0; color: #1f2937;"><a href="${whatsappLink}" style="color: #25D366; font-weight: bold;">${fullPhone}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Type / Preferred Time:</td>
                    <td style="padding: 10px 0; color: #1f2937;">${preferredTime} ${timezone ? `(${timezone})` : ''}</td>
                  </tr>
                  ${notes ? `
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                      <td style="padding: 10px 0; font-weight: bold; color: #6b7280; vertical-align: top;">Notes:</td>
                      <td style="padding: 10px 0; color: #1f2937;"><pre style="white-space:pre-wrap;font-family:inherit;margin:0;">${notes}</pre></td>
                    </tr>
                  ` : ''}
                </table>

                <div style="margin-top: 25px; padding: 15px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 5px;">
                  <p style="margin: 0; color: #065f46; font-weight: bold;">⚡ Fast Action</p>
                  <p style="margin: 5px 0 0 0; color: #065f46;">Connect with ${requesterName || requesterEmail} on <a href="${whatsappLink}" style="color: #059669; font-weight: bold;">WhatsApp (${fullPhone})</a>.</p>
                </div>
              </div>
            </div>
          `,
          replyTo: requesterEmail,
        });
        console.log('✅ Admin notification email sent via Resend');
      } else if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });
        await transporter.sendMail({
          from: `"OutlineDev" <${process.env.EMAIL_USER}>`,
          to: ownerEmail,
          subject,
          html: `<p>New lead from ${requesterName} (${requesterEmail}, ${fullPhone}). Notes: ${notes}</p>`
        });
        console.log('✅ Admin notification email sent via Nodemailer');
      }
    } catch (adminMailErr) {
      console.warn('⚠️ Admin notification email could not be delivered:', adminMailErr?.message);
    }

    // 2. Send User Confirmation & 2026 Developer Toolkit Email
    try {
      const userEmailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; color: #f8fafc; border-radius: 16px;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #334155;">
            <div style="display: inline-block; background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); padding: 5px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">
              ✨ Official 2026 Developer Edition
            </div>
            <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 24px; font-weight: 800;">
              Your 2026 Senior Developer Toolkit is Here!
            </h1>
            <p style="color: #94a3b8; font-size: 14px; margin: 0;">
              Hi ${requesterName || 'Developer'}, welcome to OutlineDev.
            </p>
          </div>

          <div style="padding: 24px 0;">
            <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
              Thank you for claiming your <strong>2026 Senior Developer Cheatsheet & Code Audit</strong>. Here is your direct access to the full toolkit and guides:
            </p>

            <div style="background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 18px; margin: 18px 0;">
              <h3 style="color: #10b981; margin: 0 0 10px 0; font-size: 16px;">📚 What's Included:</h3>
              <ul style="margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 13px; line-height: 1.7;">
                <li><strong>React 19 & Next.js 15 App Router Architecture:</strong> RSC patterns, Server Actions, 'use cache' directives, and 0kb bundle optimization.</li>
                <li><strong>Top 50 FAANG Senior Frontend Interview Questions:</strong> Deep JS internals, event loop microtasks, and system design whiteboarding.</li>
                <li><strong>15-Minute Live Code Review Diagnostic:</strong> 1-on-1 sprint review with Staff Engineer Ramkumar.</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 24px 0;">
              <a href="https://www.outlinedev.com/developer-toolkit-2026" style="display: inline-block; background: #10b981; color: #0f172a; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 14px; margin-bottom: 10px;">
                📥 View & Read Complete Cheatsheet Online
              </a>
              <br/>
              <a href="${ramWhatsappLink}" style="display: inline-block; background: #25D366; color: #ffffff; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 13px;">
                💬 Schedule Free 15-Min Code Audit on WhatsApp
              </a>
            </div>

            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 10px; padding: 14px; margin-top: 20px;">
              <p style="margin: 0; color: #a7f3d0; font-size: 13px;">
                💡 <strong>Next Steps:</strong> Have your GitHub repository or technical questions ready, and reach out on WhatsApp to lock in your live 1:1 slot!
              </p>
            </div>
          </div>

          <div style="border-top: 1px solid #334155; padding-top: 16px; text-align: center; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">© 2026 OutlineDev Mentorship Platform</p>
            <p style="margin: 4px 0 0 0;"><a href="https://www.outlinedev.com" style="color: #10b981; text-decoration: none;">www.outlinedev.com</a></p>
          </div>
        </div>
      `;

      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });
        await transporter.sendMail({
          from: `"OutlineDev Mentorship" <${process.env.EMAIL_USER}>`,
          to: requesterEmail,
          subject: `🚀 Your 2026 Senior Developer Toolkit & Free Code Audit Access`,
          html: userEmailHtml
        });
        console.log('✅ Toolkit confirmation email sent to user via Nodemailer:', requesterEmail);
      } else if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')) {
        await resend.emails.send({
          from: 'OutlineDev <support@outlinedev.com>',
          to: requesterEmail,
          subject: `🚀 Your 2026 Senior Developer Toolkit & Free Code Audit Access`,
          html: userEmailHtml
        });
        console.log('✅ Toolkit confirmation email sent to user via Resend:', requesterEmail);
      } else {
        console.log('ℹ️ Email credentials not configured locally; user can access toolkit instantly via UI.');
      }
    } catch (userMailErr) {
      console.warn('⚠️ User email dispatch notice:', userMailErr?.message);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Request registered successfully',
      toolkitUrl: '/developer-toolkit-2026'
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Connect request error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send request' }, { status: 500 });
  }
}
