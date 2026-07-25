import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build_safety');

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        // Check if user is admin
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { userId, userName, userEmail } = await req.json();

        if (!userEmail || !userName) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Create a unique link for the user to update their phone number
        const updateLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/settings?tab=profile`;

        // Send email using Resend
        await resend.emails.send({
            from: 'Mentorship Platform <onboarding@resend.dev>',
            to: userEmail,
            subject: '📱 Please Add Your Phone Number',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📱 Update Your Profile</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">Hi ${userName}!</h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              We noticed that your profile doesn't have a phone number yet. Having your phone number helps us:
            </p>

            <ul style="color: #4b5563; font-size: 16px; line-height: 1.8;">
              <li>📞 Contact you for 1:1 mentorship sessions</li>
              <li>💬 Send important course updates via WhatsApp</li>
              <li>🎯 Provide better support when you need help</li>
              <li>🔔 Send you timely reminders and notifications</li>
            </ul>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              It only takes a minute to add your phone number!
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${updateLink}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                Update My Profile
              </a>
            </div>

            <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>⚡ Quick & Easy:</strong> Just click the button above, go to your profile settings, and add your phone number. We'll keep it secure and only use it to enhance your learning experience!
              </p>
            </div>

            <div style="margin-top: 30px; padding: 20px; background-color: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 5px;">
              <p style="margin: 0; color: #075985; font-size: 13px;">
                <strong>Privacy First:</strong> Your phone number is stored securely and will never be shared with third parties. We respect your privacy!
              </p>
            </div>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px; text-align: center;">
              If you have any questions, feel free to reply to this email.
            </p>

            <p style="color: #6b7280; font-size: 14px; margin-top: 20px; text-align: center;">
              Best regards,<br/>
              <strong>The Mentorship Team</strong>
            </p>
          </div>
        </div>
      `,
        });

        return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('❌ Error sending phone request email:', error);
        return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
    }
}
