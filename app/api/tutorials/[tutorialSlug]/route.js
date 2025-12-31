import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Tutorial from '../../../models/Tutorial';
import { getTutorialBySlug } from '../../../lib/tutorials';

// GET Request
export async function GET(request, { params }) {
    try {
        const { tutorialSlug } = params;
        const tutorial = await getTutorialBySlug(tutorialSlug);

        if (!tutorial) {
            return NextResponse.json(
                { error: 'Tutorial not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(tutorial);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { tutorialSlug } = params;
        const slug = tutorialSlug; // Use alias for logic
        const data = await request.json();

        await connectDB();

        // Cannot update static files via API
        const existing = await Tutorial.findOne({ slug });
        if (!existing) {
            return NextResponse.json(
                { error: 'Tutorial not found or is static (cannot edit static files via API)' },
                { status: 404 }
            );
        }

        const updated = await Tutorial.findOneAndUpdate(
            { slug },
            data,
            { new: true, runValidators: true }
        );

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { tutorialSlug } = params;
        const slug = tutorialSlug; // Use alias

        await connectDB();

        const deleted = await Tutorial.findOneAndDelete({ slug });

        if (!deleted) {
            return NextResponse.json(
                { error: 'Tutorial not found or is static' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Tutorial deleted' });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
