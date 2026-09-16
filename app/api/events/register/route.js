import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import EventRegistration from '../../../models/EventRegistration';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, whatsapp, eventSlug, eventTitle, city, country } = body;

        if (!email || !whatsapp || !eventSlug || !eventTitle) {
            return NextResponse.json({ success: false, message: 'Email, WhatsApp, and workshop are required.' }, { status: 400 });
        }

        await connectDB();

        const registration = await EventRegistration.create({
            name: name?.trim() || email.split('@')[0],
            email: email.trim().toLowerCase(),
            whatsapp: whatsapp.trim(),
            eventSlug,
            eventTitle,
            city: city?.trim() || '',
            country: country?.trim() || '',
        });

        return NextResponse.json({ success: true, data: registration, message: 'Successfully registered!' });
    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json({ success: false, message: 'Registration failed. Please try again.' }, { status: 500 });
    }
}
