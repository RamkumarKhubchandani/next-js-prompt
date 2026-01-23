import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'No API key found in .env.local' });
        }

        // Test with direct fetch to v1 API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: 'Hello, test' }]
                    }]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({
                error: 'API call failed',
                status: response.status,
                details: data,
                apiKeyPrefix: apiKey.substring(0, 10) + '...'
            });
        }

        return NextResponse.json({
            success: true,
            response: data,
            message: 'API key works with v1 API!'
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
