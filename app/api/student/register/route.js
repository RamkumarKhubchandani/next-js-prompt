import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User with this email already exists." }, { status: 400 });
        }

        // Set 7-day trial
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 7);

        // Pass plain password; User model pre-save hook handles hashing
        await User.create({
            name,
            email,
            password,
            plan: 'pro_trial',
            trialEndsAt
        });

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}
