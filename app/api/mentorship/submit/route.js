import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import connectDB from '@/app/lib/mongodb';
import MentorshipRequest from '@/models/MentorshipRequest';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build_safety');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json().catch(() => ({}));
        const { name, email, phone, budget, description, goal, stack, otherStack, urgency } = body;

        if (!email || !email.trim()) {
            return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
        }

        // Connect to database
        await connectDB();

        // Save to database
        const mentorshipRequest = await MentorshipRequest.create({
            name: (name || '').trim(),
            email: email.trim(),
            phone: (phone || '').trim(),
            budget: budget || 'Flexible',
            description: (description || '').trim(),
            goal: (goal || '').trim(),
            stack: Array.isArray(stack) ? stack : [],
            otherStack: (otherStack || '').trim(),
            urgency: urgency || 'Flexible',
            status: 'pending'
        });

        console.log('✅ Saved mentorship request to database:', mentorshipRequest._id);

        // Format the tech stack
        const techList = [...(Array.isArray(stack) ? stack : []), otherStack].filter(Boolean).join(', ');
        const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const cleanPhone = String(phone || '').replace(/\D/g, '');
        const phoneFormatted = phone || 'Not provided';
        const ownerEmail = process.env.ADMIN_EMAIL || process.env.HIRE_INQUIRY_TO || 'infojsprompt@gmail.com';

        const adminEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
                <div style="background: linear-gradient(135deg, #10b981 0%, #047857 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Mentorship Request</h1>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1f2937; margin-top: 0;">Student Details</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Name:</td>
                            <td style="padding: 12px 0; color: #1f2937;">${name || 'Student'}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Email:</td>
                            <td style="padding: 12px 0; color: #1f2937;"><a href="mailto:${email}" style="color: #10b981;">${email}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">WhatsApp / Phone:</td>
                            <td style="padding: 12px 0; color: #1f2937;">
                                ${cleanPhone ? `<a href="https://wa.me/${cleanPhone}" style="color: #25D366; font-weight: bold;">${phoneFormatted}</a>` : phoneFormatted}
                            </td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Goal:</td>
                            <td style="padding: 12px 0; color: #1f2937;">${goal || 'Not specified'}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Tech Stack:</td>
                            <td style="padding: 12px 0; color: #1f2937;">${techList || 'Not specified'}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Urgency:</td>
                            <td style="padding: 12px 0; color: #1f2937;">${urgency || 'Standard'}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Budget:</td>
                            <td style="padding: 12px 0; color: #1f2937;">${budget || 'Flexible'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; font-weight: bold; color: #6b7280; vertical-align: top;">Description:</td>
                            <td style="padding: 12px 0; color: #1f2937;">${description || 'No additional details'}</td>
                        </tr>
                    </table>

                    <div style="margin-top: 30px; padding: 20px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 5px;">
                        <p style="margin: 0; color: #065f46; font-weight: bold;">⚡ Action Required</p>
                        <p style="margin: 5px 0 0 0; color: #065f46;">Please respond to ${email} or WhatsApp ${phoneFormatted} within 30 minutes.</p>
                    </div>

                    <div style="margin-top: 20px; padding: 15px; background-color: #f1f5f9; border-left: 4px solid #64748b; border-radius: 5px;">
                        <p style="margin: 0; color: #334155; font-size: 13px;">
                            <strong>Database ID:</strong> ${mentorshipRequest._id}<br/>
                            <strong>Submitted:</strong> ${submittedAt}
                        </p>
                    </div>
                </div>
            </div>
        `;

        const studentEmailHtml = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; color: #f8fafc; border-radius: 16px;">
                <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #334155;">
                    <div style="display: inline-block; background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); padding: 5px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px;">
                        ✨ Mentorship Request Confirmed
                    </div>
                    <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 24px; font-weight: 800;">
                        We've Received Your Mentorship Request!
                    </h1>
                    <p style="color: #94a3b8; font-size: 14px; margin: 0;">
                        Hi ${name || 'Developer'}, welcome to OutlineDev.
                    </p>
                </div>

                <div style="padding: 24px 0;">
                    <div style="background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                        <h3 style="color: #10b981; margin: 0 0 12px 0; font-size: 15px;">📋 Your Request Summary:</h3>
                        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #cbd5e1;">
                            <tr style="border-bottom: 1px solid #334155;">
                                <td style="padding: 8px 0; font-weight: bold; color: #94a3b8; width: 140px;">Goal:</td>
                                <td style="padding: 8px 0; color: #f8fafc;">${goal || 'Mentorship & Guidance'}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #334155;">
                                <td style="padding: 8px 0; font-weight: bold; color: #94a3b8;">Tech Stack:</td>
                                <td style="padding: 8px 0; color: #f8fafc;">${techList || 'Coding'}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #334155;">
                                <td style="padding: 8px 0; font-weight: bold; color: #94a3b8;">Budget:</td>
                                <td style="padding: 8px 0; color: #f8fafc;">${budget || 'Flexible'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #94a3b8;">Timeline:</td>
                                <td style="padding: 8px 0; color: #f8fafc;">${urgency || 'Standard'}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                        <h4 style="margin: 0 0 8px 0; color: #10b981; font-size: 14px;">⚡ What Happens Next?</h4>
                        <p style="margin: 0; color: #cbd5e1; font-size: 13px; line-height: 1.6;">
                            Our top mentors are reviewing your requirements. You will receive an intro / meeting link within <strong>15–30 minutes</strong> via WhatsApp or Email.
                        </p>
                    </div>

                    <div style="text-align: center; margin: 24px 0;">
                        <p style="color: #94a3b8; font-size: 13px; margin-bottom: 12px;">Want an immediate response?</p>
                        <a href="https://wa.me/918237320942?text=Hi%20Ram%2C%20I%20just%20submitted%20a%20mentorship%20request%20on%20OutlineDev%20for%20${encodeURIComponent(techList || 'coding')}.%20Please%20connect%20me!" style="display: inline-block; background: #25D366; color: #ffffff; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 13px; margin-bottom: 10px;">
                            💬 Connect Directly on WhatsApp (+918237320942)
                        </a>
                        <br/>
                        <a href="mailto:hi@outlinedev.com" style="display: inline-block; background: #334155; color: #ffffff; font-weight: 600; text-decoration: none; padding: 10px 20px; border-radius: 10px; font-size: 12px;">
                            ✉️ hi@outlinedev.com
                        </a>
                    </div>
                </div>

                <div style="border-top: 1px solid #334155; padding-top: 16px; text-align: center; font-size: 12px; color: #64748b;">
                    <p style="margin: 0;">© 2026 OutlineDev Mentorship Platform</p>
                    <p style="margin: 4px 0 0 0;"><a href="https://www.outlinedev.com" style="color: #10b981; text-decoration: none;">www.outlinedev.com</a></p>
                </div>
            </div>
        `;

        // 1. Send Admin Notification Email
        let adminSent = false;
        if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')) {
            try {
                const resendAdmin = await resend.emails.send({
                    from: 'Mentorship Platform <onboarding@resend.dev>',
                    to: ownerEmail,
                    replyTo: email,
                    subject: `🚀 New Mentorship Request from ${name || email}`,
                    html: adminEmailHtml
                });
                if (!resendAdmin.error) {
                    adminSent = true;
                    console.log('✅ Admin notification sent via Resend:', resendAdmin.data?.id);
                } else {
                    console.warn('⚠️ Resend admin notification error:', resendAdmin.error);
                }
            } catch (err) {
                console.warn('⚠️ Resend admin notification exception:', err?.message);
            }
        }

        if (!adminSent && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });
                await transporter.sendMail({
                    from: `"OutlineDev Mentorship" <${process.env.EMAIL_USER}>`,
                    to: ownerEmail,
                    replyTo: email,
                    subject: `🚀 New Mentorship Request from ${name || email}`,
                    html: adminEmailHtml
                });
                adminSent = true;
                console.log('✅ Admin notification sent via Nodemailer to:', ownerEmail);
            } catch (err) {
                console.warn('⚠️ Nodemailer admin notification exception:', err?.message);
            }
        }

        // 2. Send Student Confirmation Email
        let studentSent = false;
        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });
                await transporter.sendMail({
                    from: `"OutlineDev Mentorship" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: `🎯 Mentorship Request Received — OutlineDev`,
                    html: studentEmailHtml
                });
                studentSent = true;
                console.log('✅ Student confirmation sent via Nodemailer to:', email);
            } catch (err) {
                console.warn('⚠️ Nodemailer student confirmation exception:', err?.message);
            }
        }

        if (!studentSent && process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')) {
            try {
                const resendStudent = await resend.emails.send({
                    from: 'OutlineDev <support@outlinedev.com>',
                    to: email,
                    subject: `🎯 Mentorship Request Received — OutlineDev`,
                    html: studentEmailHtml
                });
                if (!resendStudent.error) {
                    studentSent = true;
                    console.log('✅ Student confirmation sent via Resend:', resendStudent.data?.id);
                } else {
                    console.warn('⚠️ Resend student confirmation notice:', resendStudent.error?.message);
                }
            } catch (err) {
                console.warn('⚠️ Resend student confirmation exception:', err?.message);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Mentorship request submitted successfully',
            adminSent,
            studentSent
        });

    } catch (error) {
        console.error('❌ Mentorship submission error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
