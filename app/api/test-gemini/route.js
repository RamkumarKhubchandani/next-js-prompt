import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET() {
    try {
        // Try different model names
        const modelsToTry = [
            'gemini-pro',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-1.0-pro',
            'text-bison-001'
        ];

        const results = [];

        for (const modelName of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent('Hello');
                results.push({ model: modelName, status: 'SUCCESS', response: result.response.text() });
            } catch (error) {
                results.push({ model: modelName, status: 'FAILED', error: error.message });
            }
        }

        return NextResponse.json({ results });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
