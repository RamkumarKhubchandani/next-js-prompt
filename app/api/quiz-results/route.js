import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import QuizResult from '../../models/QuizResult';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();

        // Best-effort attach authenticated identity (so profile pages can show results reliably)
        const session = await getServerSession(authOptions);
        if (session?.user) {
            data.userId = data.userId || session.user.id;
            data.username = data.username || session.user.username;
            // keep the submitted email/name if they typed it, otherwise fall back to session
            data.email = data.email || session.user.email;
            data.name = data.name || session.user.name || session.user.username;
        }

        const newResult = new QuizResult(data);
        await newResult.save();

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
