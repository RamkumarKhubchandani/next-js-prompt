import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Extend Vercel serverless function timeout (Hobby: 60s, Pro: 300s)
export const maxDuration = 60;

// Initialize Groq AI
const apiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: apiKey || '' });

export async function POST(request) {
    try {
        const { originalData, jobDescription } = await request.json();

        if (!originalData || !jobDescription) {
            return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
        }

        if (!apiKey) {
            return NextResponse.json({ error: 'Groq API key is not configured' }, { status: 500 });
        }

        const coverLetterPrompt = `You are an expert career coach. Write a highly tailored, impact-driven cover letter for the following candidate and job description. 
    
    CANDIDATE INFO:
    ${JSON.stringify(originalData, null, 2)}
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    GUIDELINES:
    1. Hook the reader immediately – mention the specific role and company.
    2. Focus on "What I can do for you" rather than "What this job gives me".
    3. Quantify achievements (metrics, time saved, revenue generated).
    4. Match the professional tone of the job description.
    5. Mention why this candidate is uniquely qualified.
    6. Include a clear call to action (interviews, follow-ups).
    7. Length: 250-400 words.
    8. FORMATTING: Use clear paragraphs with double newlines (\n\n) between them. Do NOT return a single block of text.

    Return the cover letter text in valid JSON format:
    {
      "coverLetter": "The cover letter text here with proper \n\n breaks...",
      "keyTailoredPoints": ["Point 1", "Point 2"]
    }`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: coverLetterPrompt,
                }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.3,
            response_format: { type: 'json_object' }
        });

        let responseContent = chatCompletion.choices[0]?.message?.content || '{}';
        const result = JSON.parse(responseContent);

        return NextResponse.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('Cover letter generation error:', error);
        return NextResponse.json({
            error: 'Failed to generate cover letter',
            details: error.message
        }, { status: 500 });
    }
}
