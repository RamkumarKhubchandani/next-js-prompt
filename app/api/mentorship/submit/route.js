import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import connectDB from '@/app/lib/mongodb';
import MentorshipRequest from '@/models/MentorshipRequest';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build_safety');

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, budget, description, goal, stack, otherStack, urgency } = body;

        // Connect to database
        await connectDB();

        // Save to database
        const mentorshipRequest = await MentorshipRequest.create({
            name,
            email,
            phone,
            budget,
            description,
            goal,
            stack,
            otherStack,
            urgency,
            status: 'pending'
        });

        console.log('✅ Saved to database:', mentorshipRequest._id);

        // Format the tech stack
        const techList = [...(stack || []), otherStack].filter(Boolean).join(', ');

        // Email to Admin (Primary notification - this works on free tier)
        const adminEmail = await resend.emails.send({
            from: 'Mentorship Platform <onboarding@resend.dev>',
            to: 'infojsprompt@gmail.com',
            subject: `🚀 New Mentorship Request from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Mentorship Request</h1>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #1f2937; margin-top: 0;">Student Details</h2>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Name:</td>
                                <td style="padding: 12px 0; color: #1f2937;">${name}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Email:</td>
                                <td style="padding: 12px 0; color: #1f2937;"><a href="mailto:${email}" style="color: #667eea;">${email}</a></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">WhatsApp:</td>
                                <td style="padding: 12px 0; color: #1f2937;"><a href="https://wa.me/${phone?.replace(/\D/g, '')}" style="color: #25D366; font-weight: bold;">${phone}</a></td>
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
                                <td style="padding: 12px 0; color: #1f2937;">${urgency || 'Not specified'}</td>
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

                        <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
                            <p style="margin: 0; color: #92400e; font-weight: bold;">⚡ Action Required</p>
                            <p style="margin: 5px 0 0 0; color: #92400e;">Please respond to ${email} or WhatsApp ${phone} within 60 minutes to maintain our quality promise.</p>
                        </div>

                        <div style="margin-top: 20px; padding: 15px; background-color: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 5px;">
                            <p style="margin: 0; color: #075985; font-size: 13px;">
                                <strong>Database ID:</strong> ${mentorshipRequest._id}<br/>
                                <strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                            </p>
                        </div>
                    </div>
                </div>
            `
        });

        console.log('✅ Admin email sent successfully:', adminEmail.data?.id);

        return NextResponse.json({
            success: true,
            message: 'Admin notification sent successfully',
            adminEmailId: adminEmail.data?.id,
            note: 'User confirmation email skipped (Resend free tier limitation)'
        });

    } catch (error) {
        console.error('❌ Email sending error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
