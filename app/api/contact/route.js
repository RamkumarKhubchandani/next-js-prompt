// app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Named export for POST method
export async function POST(req) {
  if (req.method === 'OPTIONS') {
    return new NextResponse('ok', { status: 200 });
  }
  
  try {
    const { email, phoneNumber, countryCode } = await req.json();

    // Validate required fields
    if (!email || !phoneNumber || !countryCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ramkumarkhub@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${countryCode.dialCode} ${phoneNumber}</p>
        <p><strong>Country:</strong> ${countryCode.name}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// If you need other HTTP methods, export them like this:
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}