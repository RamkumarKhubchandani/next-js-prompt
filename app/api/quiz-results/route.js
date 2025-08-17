import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import QuizResult from '../../models/QuizResult';

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();

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
