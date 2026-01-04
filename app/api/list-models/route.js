import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        // List all available models
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({
                error: 'Failed to list models',
                status: response.status,
                details: data
            });
        }

        // Filter models that support generateContent
        const contentModels = data.models?.filter(model =>
            model.supportedGenerationMethods?.includes('generateContent')
        );

        return NextResponse.json({
            success: true,
            totalModels: data.models?.length || 0,
            contentGenerationModels: contentModels?.map(m => ({
                name: m.name,
                displayName: m.displayName,
                description: m.description
            })) || []
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
