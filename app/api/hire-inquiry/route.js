import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiting: IP -> [timestamp]
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);
    return false;
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
        const { name, email, projectType, budget, message, consent, website } = body;

        // 1. Honeypot check: reject bots silently
        if (website) {
            return NextResponse.json({ success: true, message: 'Inquiry received' }, { status: 200 });
        }

        // 2. Validate required fields
        if (!name || !email || !message || !consent) {
            return NextResponse.json(
                { success: false, error: 'Please fill in all required fields and accept the contact consent.' },
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

        const recipient = process.env.HIRE_INQUIRY_TO || 'hi@outlinedev.com';
        const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
                <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                    💼 New Freelance / Project Inquiry
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 140px;">Client Name:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                        <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">Project Type:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${projectType || 'General'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">Budget Range:</td>
                        <td style="padding: 8px 0; color: #0f172a;">${budget || 'Flexible'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569; vertical-align: top;">Message:</td>
                        <td style="padding: 8px 0; color: #0f172a; white-space: pre-wrap;">${message}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #475569;">Submitted At:</td>
                        <td style="padding: 8px 0; color: #64748b;">${submittedAt}</td>
                    </tr>
                </table>
            </div>
        `;

        // 4. Send email using Resend or Nodemailer based on configured environment variables
        if (process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
                from: 'OutlineDev Inquiries <onboarding@resend.dev>',
                to: recipient,
                reply_to: email,
                subject: `💼 New Project Inquiry from ${name} (${projectType || 'Developer'})`,
                html: htmlContent
            });
        } else if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: recipient,
                replyTo: email,
                subject: `💼 New Project Inquiry from ${name} (${projectType || 'Developer'})`,
                html: htmlContent
            });
        } else {
            console.log('ℹ️ [Hire Inquiry Received - No mail env vars set]:', { name, email, projectType, budget, message });
        }

        return NextResponse.json({ success: true, message: 'Inquiry sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error handling hire inquiry:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error while processing your inquiry.' },
            { status: 500 }
        );
    }
}
