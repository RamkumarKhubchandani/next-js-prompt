import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import dbConnect from '@/app/lib/mongodb';
import HireInquiry from '@/app/models/HireInquiry';

// Rate limiting: IP -> [timestamp]
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many inquiries sent. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, projectType, roleSlug, budget, message, consent, website, phone, company, startDate, sourceUrl } = body;

    // 1. Honeypot check: reject bots silently
    if (website) {
      return NextResponse.json({ success: true, message: 'Inquiry received' }, { status: 200 });
    }

    // 2. Validate required fields
    if (!name || !email || !message || !consent) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields and accept the consent declaration.' },
        { status: 400 }
      );
    }

    // 3. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 4. Save to MongoDB in HireInquiry collection
    await dbConnect();
    const targetRole = roleSlug || projectType || 'General Developer';
    const savedInquiry = await HireInquiry.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      company: company ? String(company).trim() : '',
      roleSlug: String(targetRole).trim(),
      budget: budget ? String(budget).trim() : 'Flexible',
      startDate: startDate ? String(startDate).trim() : '',
      message: String(message).trim(),
      sourceUrl: sourceUrl ? String(sourceUrl).trim() : '',
      status: 'pending',
    });

    console.log('✅ Saved HireInquiry record to MongoDB:', savedInquiry._id);

    // 5. Construct HTML notification email with strict escaping
    const recipient = process.env.HIRE_INQUIRY_TO || 'hi@outlinedev.com';
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@outlinedev.com';
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Not provided');
    const safeCompany = escapeHtml(company || 'Not provided');
    const safeRole = escapeHtml(targetRole);
    const safeBudget = escapeHtml(budget || 'Flexible');
    const safeStartDate = escapeHtml(startDate || 'Immediate');
    const safeMessage = escapeHtml(message);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
          💼 New Freelance / Project Inquiry
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 140px;">Client Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
            <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
            <td style="padding: 8px 0; color: #0f172a;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Company:</td>
            <td style="padding: 8px 0; color: #0f172a;">${safeCompany}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Project / Role:</td>
            <td style="padding: 8px 0; color: #0f172a;">${safeRole}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Budget Range:</td>
            <td style="padding: 8px 0; color: #0f172a;">${safeBudget}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Target Start:</td>
            <td style="padding: 8px 0; color: #0f172a;">${safeStartDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; vertical-align: top;">Message:</td>
            <td style="padding: 8px 0; color: #0f172a; white-space: pre-wrap;">${safeMessage}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Submitted At:</td>
            <td style="padding: 8px 0; color: #64748b;">${submittedAt}</td>
          </tr>
        </table>
        <p style="font-size: 11px; color: #94a3b8; margin-top: 15px;">Inquiry Record ID: ${savedInquiry._id}</p>
      </div>
    `;

    // 6. Send email notification
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `OutlineDev Inquiries <${fromEmail}>`,
        to: recipient,
        reply_to: email,
        subject: `💼 New Project Inquiry from ${name} (${targetRole})`,
        html: htmlContent,
      });
    } else if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"OutlineDev Inquiries" <${fromEmail}>`,
        to: recipient,
        replyTo: email,
        subject: `💼 New Project Inquiry from ${name} (${targetRole})`,
        html: htmlContent,
      });
    } else {
      console.log('ℹ️ [Hire Inquiry Received - Logged to DB & Console]:', {
        name,
        email,
        targetRole,
        budget,
      });
    }

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully', inquiryId: savedInquiry._id }, { status: 200 });
  } catch (error) {
    console.error('Error handling hire inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing your inquiry.' },
      { status: 500 }
    );
  }
}
