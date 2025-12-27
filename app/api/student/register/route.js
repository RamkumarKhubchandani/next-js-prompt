import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User with this email already exists." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Set 7-day trial
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 7);

        await User.create({
            name,
            email,
            password: hashedPassword,
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
