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

    // Use Groq API to optimize resume
    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API key is not configured in environment variables' }, { status: 500 });
    }

    const optimizationPrompt = `You are an expert resume writer and career coach. Optimize this resume to match the job description while keeping ALL the candidate's real information accurate.

ORIGINAL RESUME DATA:
${JSON.stringify(originalData, null, 2)}

JOB DESCRIPTION:
${jobDescription}

IMPORTANT RULES:
1. Keep the candidate's name, contact info, company names, and dates EXACTLY as provided
2. Rewrite experience bullets using the X-Y-Z formula: "Achieved [X] as measured by [Y], by doing [Z]"
3. Add quantifiable metrics where possible (percentages, numbers, time saved)
4. Incorporate missing keywords from job description naturally into bullets
5. Use strong action verbs (Architected, Led, Implemented, Optimized)
6. Ensure ATS compatibility (no tables, simple formatting)
7. Create an achievement-focused professional summary
8. Organize skills by category

Return ONLY valid JSON in this exact format:
{
  "score": 92,
  "personalInfo": {
    "name": "EXACT name from original",
    "email": "EXACT email from original",
    "phone": "EXACT phone from original",
    "linkedin": "EXACT linkedin from original",
    "title": "optimized job title based on job description"
  },
  "sections": {
    "summary": "achievement-focused professional summary with metrics",
    "experience": [
      {
        "title": "EXACT title from original or slightly optimized",
        "company": "EXACT company from original",
        "duration": "EXACT duration from original",
        "bullets": [
          "Optimized bullet with metrics and keywords",
          "Another optimized bullet"
        ]
      }
    ],
    "skills": {
      "languages": ["skill1", "skill2"],
      "frameworks": ["framework1", "framework2"],
      "tools": ["tool1", "tool2"],
      "practices": ["practice1", "practice2"]
    },
    "education": [
      {
        "degree": "EXACT degree from original",
        "school": "EXACT school from original",
        "year": "EXACT year from original"
      }
    ]
  },
  "improvements_made": [
    "Specific improvement 1",
    "Specific improvement 2"
  ]
}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: optimizationPrompt,
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2, // Slightly more creative for rewriting bullets
      response_format: { type: 'json_object' }
    });

    let optimizedText = chatCompletion.choices[0]?.message?.content || '{}';

    // Clean up response
    optimizedText = optimizedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const optimizedResume = JSON.parse(optimizedText);

    return NextResponse.json({
      success: true,
      data: optimizedResume
    });

  } catch (error) {
    console.error('Resume optimization error:', error);
    return NextResponse.json({
      error: 'Failed to optimize resume',
      details: error.message
    }, { status: 500 });
  }
}
