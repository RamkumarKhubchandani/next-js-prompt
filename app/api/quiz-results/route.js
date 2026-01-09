import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import QuizResult from '../../models/QuizResult';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();

        // Best-effort attach authenticated identity
        const session = await getServerSession(authOptions);
        if (session?.user) {
            data.userId = data.userId || session.user.id;
            data.username = data.username || session.user.username;
            data.email = data.email || session.user.email;
            data.name = data.name || session.user.name || session.user.username;
        }

        const newResult = new QuizResult(data);
        await newResult.save();

        // --- Send Admin Notification ---
        if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_FROM) {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_SERVER_HOST,
                    port: process.env.EMAIL_SERVER_PORT,
                    auth: {
                        user: process.env.EMAIL_SERVER_USER,
                        pass: process.env.EMAIL_SERVER_PASSWORD,
                    },
                });

                const techString = Array.isArray(data.technologies) ? data.technologies.join(', ') : 'Unknown Tech';
                const percentage = Math.round((data.score / data.total) * 100);

                await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: process.env.ADMIN_EMAIL || process.env.EMAIL_FROM, // Fallback to sender if no admin email
                    subject: `[New Lead] AI Quiz: ${data.name || 'Visitor'} scored ${percentage}% in ${techString}`,
                    html: `
                        <h2>New Assessment Completed</h2>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                        <hr/>
                        <h3>Results</h3>
                        <p><strong>Score:</strong> ${data.score}/${data.total} (${percentage}%)</p>
                        <p><strong>Technologies:</strong> ${techString}</p>
                        <p><strong>Detailed Answers:</strong></p>
                        <pre style="background: #f4f4f4; padding: 10px;">${JSON.stringify(data.answers, null, 2)}</pre>
                        <br/>
                        <a href="${process.env.NEXTAUTH_URL}/admin/leads">View in Dashboard</a>
                    `,
                });
            } catch (mailError) {
                console.error("Failed to send admin email:", mailError);
                // Don't fail the request, just log it
            }
        }

        return NextResponse.json({
            message: "Quiz result saved successfully",
            data: newResult,
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            error: "Failed to save quiz result",
            details: error.message,
        }, { status: 500 });
    }
}
