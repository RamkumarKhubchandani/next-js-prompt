import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectDB();
        const user = await User.findOne({ email: session.user.email })
            .select('username bio links name phone')
            .lean();

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);

    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { username, bio, links, name, phone } = await request.json();

        await connectDB();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Username validation
        if (username && username !== user.username) {
            const existing = await User.findOne({ username: username.toLowerCase() });
            if (existing) {
                return NextResponse.json({ message: 'Username is already taken' }, { status: 400 });
            }
            user.username = username.toLowerCase();
        }

        if (name) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (links) user.links = links;
        if (phone && typeof phone === 'object') {
            user.phone = {
                countryCode: phone.countryCode || user.phone?.countryCode || '',
                number: phone.number || user.phone?.number || ''
            };
        }

        await user.save();

        return NextResponse.json({
            message: 'Profile updated successfully',
            user: { username: user.username, name: user.name, phone: user.phone }
        });

    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
