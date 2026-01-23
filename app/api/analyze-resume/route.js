import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with v1 API (FREE)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE');

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume'); // Expecting a file again
    const jobDescription = formData.get('jobDescription');

    if (!file && !formData.get('resumeText')) {
      return NextResponse.json({ error: 'No resume file uploaded' }, { status: 400 });
    }

    let resumeText = formData.get('resumeText') || '';

    // If file is provided, parsing it server-side
    if (file && typeof file !== 'string') {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileType = file.name.toLowerCase();

      if (fileType.endsWith('.pdf')) {
        // Use pdf2json which is more reliable for Node.js
        const PDFParser = (await import('pdf2json')).default;
        const pdfParser = new PDFParser(null, 1); // 1 = text only

        resumeText = await new Promise((resolve, reject) => {
          pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
          pdfParser.on("pdfParser_dataReady", pdfData => {
            const text = pdfParser.getRawTextContent();
            resolve(text);
          });
          pdfParser.parseBuffer(buffer);
        });
      } else if (fileType.endsWith('.docx') || fileType.endsWith('.doc')) {
        const mammoth = (await import('mammoth')).default;
        const result = await mammoth.extractRawText({ buffer });
        resumeText = result.value;
      }
    }

    console.log('Processed Text Length:', resumeText.length);

    // Use Gemini AI to analyze resume
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

    const analysisPrompt = `You are an expert ATS (Applicant Tracking System) and resume analyst. Analyze this resume and job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide a detailed JSON analysis with:
1. Extract the candidate's real information (name, email, phone, linkedin, current title)
2. Extract all experience entries (title, company, duration, responsibilities)
3. Extract all skills
4. Extract education
5. Compare resume with job description and identify:
   - Keywords found in resume that match job description
   - Missing keywords from job description
   - ATS compatibility score (0-100)
   - Specific formatting issues
   - Detailed improvement suggestions

Return ONLY valid JSON in this exact format:
{
  "personalInfo": {
    "name": "extracted name",
    "email": "extracted email",
    "phone": "extracted phone",
    "linkedin": "extracted linkedin",
    "currentTitle": "extracted current job title"
  },
  "experience": [
    {
      "title": "job title",
      "company": "company name",
      "duration": "dates",
      "bullets": ["responsibility 1", "responsibility 2"]
    }
  ],
  "skills": ["skill1", "skill2"],
  "education": [
    {
      "degree": "degree name",
      "school": "school name",
      "year": "graduation year"
    }
  ],
  "analysis": {
    "score": 75,
    "keywordsFound": ["keyword1", "keyword2"],
    "keywordsMissing": ["missing1", "missing2"],
    "formattingIssues": ["issue1", "issue2"],
    "improvements": [
      {"section": "Experience", "tip": "specific tip"}
    ]
  }
}`;

    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    let analysisText = response.text();

    // Clean up response to get only JSON
    analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const analysis = JSON.parse(analysisText);

    return NextResponse.json({
      success: true,
      data: analysis
    });

  } catch (error) {
    console.error('Resume analysis error:', error);
    return NextResponse.json({
      error: 'Failed to analyze resume',
      details: error.message
    }, { status: 500 });
  }
}
