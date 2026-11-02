import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import dbConnect from '@/app/lib/mongodb';
import MentorApplication from '@/app/models/MentorApplication';
import { v2 as cloudinary } from 'cloudinary';
import {
  validateHeadline,
  validateSummary,
  validateSkillIds,
  validateLocation,
  validateProjects,
  validateConsents,
  REQUIRED_CONSENTS,
} from '@/app/lib/experts';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const application = await MentorApplication.findOne({ userId: session.user.id });

    return NextResponse.json({ application });
  } catch (error) {
    console.error('Fetch Application Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const body = await req.json();

    const existingApp = await MentorApplication.findOne({ userId: session.user.id });

    // Handle "Hide my profile" action
    if (body.action === 'hide') {
      if (!existingApp) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      existingApp.status = 'hidden';
      await existingApp.save();
      return NextResponse.json({ success: true, status: 'hidden' });
    }

    // Handle "Unhide" action (restore live approved profile)
    if (body.action === 'unhide') {
      if (!existingApp) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      if (existingApp.published) {
        existingApp.status = 'approved';
        await existingApp.save();
        return NextResponse.json({ success: true, status: 'approved' });
      }
      return NextResponse.json({ error: 'Cannot unhide without an approved published profile' }, { status: 400 });
    }

    // Handle "Request deletion" action
    if (body.action === 'delete') {
      if (!existingApp) return NextResponse.json({ error: 'Not found' }, { status: 404 });

      // Remove photo from Cloudinary if public ID is known
      if (existingApp.photoPublicId && process.env.CLOUDINARY_CLOUD_NAME) {
        try {
          cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
          });
          await cloudinary.uploader.destroy(existingApp.photoPublicId);
        } catch (cErr) {
          console.error('Cloudinary deletion error:', cErr);
        }
      }

      await MentorApplication.deleteOne({ _id: existingApp._id });
      return NextResponse.json({ success: true, message: 'Profile deleted successfully.' });
    }

    // Whitelist and sanitize submitted data
    const {
      displayName,
      photoUrl,
      photoPublicId,
      roles,
      draft,
      consents,
      isDraftSave,
    } = body;

    // Strict validation for full submission (when not just saving work-in-progress draft)
    if (!isDraftSave) {
      if (!displayName || !displayName.trim()) {
        return NextResponse.json({ error: 'Real full name is required.' }, { status: 400 });
      }

      if (!Array.isArray(roles) || roles.length === 0) {
        return NextResponse.json({ error: 'Please choose at least one role (Mentor or Hire Developer).' }, { status: 400 });
      }

      if (!photoUrl) {
        return NextResponse.json({ error: 'A professional profile photo is required.' }, { status: 400 });
      }

      // Role specific headline and summary validation
      if (roles.includes('mentor')) {
        const headlineErr = validateHeadline(draft?.mentor?.headline);
        if (headlineErr) return NextResponse.json({ error: `Mentor Headline: ${headlineErr}` }, { status: 400 });

        const summaryErr = validateSummary(draft?.mentor?.summary, 'Mentor');
        if (summaryErr) return NextResponse.json({ error: summaryErr }, { status: 400 });
      }

      if (roles.includes('hire')) {
        const headlineErr = validateHeadline(draft?.hire?.headline);
        if (headlineErr) return NextResponse.json({ error: `Hire Headline: ${headlineErr}` }, { status: 400 });

        const summaryErr = validateSummary(draft?.hire?.summary, 'Hire Developer');
        if (summaryErr) return NextResponse.json({ error: summaryErr }, { status: 400 });
      }

      // Skills validation (max 8, must exist in SKILLS)
      const skillsErr = validateSkillIds(draft?.skillIds);
      if (skillsErr) return NextResponse.json({ error: skillsErr }, { status: 400 });

      // Location validation
      const locErr = validateLocation(draft?.locationId, draft?.locationOther);
      if (locErr) return NextResponse.json({ error: locErr }, { status: 400 });

      // Projects validation (max 3)
      const projErr = validateProjects(draft?.projects);
      if (projErr) return NextResponse.json({ error: projErr }, { status: 400 });

      // Consents validation: all 6 required to submit
      const consentErr = validateConsents(consents);
      if (consentErr) return NextResponse.json({ error: consentErr }, { status: 400 });
    }

    // Build timestamped consents object
    const now = new Date();
    const updatedConsents = {};
    for (const key of REQUIRED_CONSENTS) {
      if (consents && consents[key]) {
        updatedConsents[key] = existingApp?.consents?.[key] || now;
      }
    }

    // Sanitize draft payload
    const cleanDraft = {
      mentor: {
        headline: draft?.mentor?.headline ? String(draft.mentor.headline).trim() : '',
        summary: draft?.mentor?.summary ? String(draft.mentor.summary).trim() : '',
        rate: Number(draft?.mentor?.rate) || 0,
        topics: Array.isArray(draft?.mentor?.topics) ? draft.mentor.topics : [],
        formats: Array.isArray(draft?.mentor?.formats) ? draft.mentor.formats : [],
      },
      hire: {
        headline: draft?.hire?.headline ? String(draft.hire.headline).trim() : '',
        summary: draft?.hire?.summary ? String(draft.hire.summary).trim() : '',
        rate: Number(draft?.hire?.rate) || 0,
        availability: draft?.hire?.availability || 'Part-time (10-20 hrs/week)',
        engagementTypes: Array.isArray(draft?.hire?.engagementTypes) ? draft.hire.engagementTypes : [],
      },
      skillIds: Array.isArray(draft?.skillIds) ? draft.skillIds : [],
      locationId: draft?.locationId || 'online',
      locationOther: {
        country: draft?.locationOther?.country ? String(draft.locationOther.country).trim() : '',
        city: draft?.locationOther?.city ? String(draft.locationOther.city).trim() : '',
      },
      timezone: draft?.timezone || 'UTC',
      yearsExperience: Number(draft?.yearsExperience) || 0,
      languages: Array.isArray(draft?.languages) && draft.languages.length > 0 ? draft.languages : ['English'],
      links: {
        github: draft?.links?.github ? String(draft.links.github).trim() : '',
        linkedin: draft?.links?.linkedin ? String(draft.links.linkedin).trim() : '',
      },
      projects: Array.isArray(draft?.projects)
        ? draft.projects.slice(0, 3).map((p) => ({
            title: String(p.title || '').trim(),
            description: String(p.description || '').trim(),
            url: String(p.url || '').trim(),
          }))
        : [],
    };

    // Determine target status:
    // If saving draft, status is 'draft'.
    // If submitting for review: status is 'pending' (published stays live until re-approved).
    const newStatus = isDraftSave ? 'draft' : 'pending';

    const updateDoc = {
      $set: {
        displayName: displayName ? String(displayName).trim() : existingApp?.displayName || 'Developer',
        ...(photoUrl && { photoUrl }),
        ...(photoPublicId && { photoPublicId }),
        roles: Array.isArray(roles) && roles.length > 0 ? roles : ['mentor'],
        draft: cleanDraft,
        consents: updatedConsents,
        status: newStatus,

        // Sync legacy fields for backwards compatibility
        skills: cleanDraft.skillIds,
        yearsExperience: cleanDraft.yearsExperience,
        hourlyRate: cleanDraft.mentor.rate || cleanDraft.hire.rate || 0,
        bio: cleanDraft.mentor.summary || cleanDraft.hire.summary || '',
        linkedin: cleanDraft.links.linkedin,
        github: cleanDraft.links.github,
        availability: cleanDraft.hire.availability,
        mentorHeadline: cleanDraft.mentor.headline,
        mentorBio: cleanDraft.mentor.summary,
        hireHeadline: cleanDraft.hire.headline,
        hireBio: cleanDraft.hire.summary,
      },
      $setOnInsert: {
        userId: session.user.id,
      },
    };

    const application = await MentorApplication.findOneAndUpdate(
      { userId: session.user.id },
      updateDoc,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Mentor Application Error:', error);
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const existingApp = await MentorApplication.findOne({ userId: session.user.id });
    if (!existingApp) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (existingApp.photoPublicId && process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        await cloudinary.uploader.destroy(existingApp.photoPublicId);
      } catch (cErr) {
        console.error('Cloudinary photo delete error:', cErr);
      }
    }

    await MentorApplication.deleteOne({ _id: existingApp._id });
    return NextResponse.json({ success: true, message: 'Profile deleted successfully.' });
  } catch (error) {
    console.error('Delete Application Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
