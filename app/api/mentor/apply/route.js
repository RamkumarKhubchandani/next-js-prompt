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
  hasUrls,
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
    const body = await req.json().catch(() => ({}));

    const existingApp = await MentorApplication.findOne({ userId: session.user.id });

    // Handle "Hide my profile" action
    if (body.action === 'hide') {
      if (!existingApp) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      existingApp.status = 'hidden';
      await existingApp.save();
      return NextResponse.json({ success: true, status: 'hidden' });
    }

    // Handle "Unhide" action (restore live approved profile; refused if hiddenByAdmin)
    if (body.action === 'unhide') {
      if (!existingApp) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      if (existingApp.hiddenByAdmin) {
        return NextResponse.json(
          { error: 'Your profile was hidden by an administrator. Please contact OutlineDev support.' },
          { status: 403 }
        );
      }
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

    // 1. Roles validation: must be a non-empty subset of ['mentor', 'hire']
    const validRoleSet = new Set(['mentor', 'hire']);
    if (
      !Array.isArray(roles) ||
      roles.length === 0 ||
      roles.length > 2 ||
      !roles.every((r) => validRoleSet.has(r))
    ) {
      return NextResponse.json(
        { error: "Roles must be a non-empty subset of ['mentor', 'hire']." },
        { status: 400 }
      );
    }

    // 2. Display Name validation: 2-60 chars, no < >, no URLs
    const cleanName = displayName ? String(displayName).trim() : '';
    if (cleanName.length < 2 || cleanName.length > 60) {
      return NextResponse.json(
        { error: 'Display name must be between 2 and 60 characters.' },
        { status: 400 }
      );
    }
    if (/[<>]/.test(cleanName)) {
      return NextResponse.json(
        { error: 'Display name cannot contain angle brackets (< or >).' },
        { status: 400 }
      );
    }
    if (hasUrls(cleanName)) {
      return NextResponse.json(
        { error: 'Display name cannot contain website URLs.' },
        { status: 400 }
      );
    }

    // 3. photoUrl validation: must start with https://res.cloudinary.com/<CLOUDINARY_CLOUD_NAME>/
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const expectedCloudinaryPrefix = cloudName
      ? `https://res.cloudinary.com/${cloudName}/`
      : 'https://res.cloudinary.com/';
    if (!photoUrl || typeof photoUrl !== 'string' || !photoUrl.startsWith(expectedCloudinaryPrefix)) {
      return NextResponse.json(
        { error: `Photo URL must start with ${expectedCloudinaryPrefix}` },
        { status: 400 }
      );
    }

    // 4. github, linkedin and project urls validation
    function validateHttpsHost(urlStr, requiredHost, fieldName) {
      if (!urlStr) return null;
      try {
        const u = new URL(urlStr);
        if (u.protocol !== 'https:') {
          return `${fieldName} must use HTTPS.`;
        }
        if (requiredHost) {
          const host = u.hostname.toLowerCase();
          if (host !== requiredHost && !host.endsWith('.' + requiredHost)) {
            return `${fieldName} must be on ${requiredHost}.`;
          }
        }
        return null;
      } catch {
        return `${fieldName} must be a valid URL.`;
      }
    }

    const githubErr = validateHttpsHost(draft?.links?.github, 'github.com', 'GitHub URL');
    if (githubErr) return NextResponse.json({ error: githubErr }, { status: 400 });

    const linkedinErr = validateHttpsHost(draft?.links?.linkedin, 'linkedin.com', 'LinkedIn URL');
    if (linkedinErr) return NextResponse.json({ error: linkedinErr }, { status: 400 });

    if (Array.isArray(draft?.projects)) {
      for (let i = 0; i < draft.projects.length; i++) {
        const p = draft.projects[i];
        if (p?.url) {
          const projUrlErr = validateHttpsHost(p.url, null, `Project #${i + 1} URL`);
          if (projUrlErr) return NextResponse.json({ error: projUrlErr }, { status: 400 });
        }
      }
    }

    // Strict validation for full submission (when not just saving work-in-progress draft)
    if (!isDraftSave) {
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
    }

    // 5. Merge consents instead of overwriting; never wipe existing consent timestamps
    const existingConsents = existingApp?.consents
      ? typeof existingApp.consents.toObject === 'function'
        ? existingApp.consents.toObject()
        : existingApp.consents
      : {};
    const updatedConsents = { ...existingConsents };
    const now = new Date();
    if (consents && typeof consents === 'object') {
      for (const key of REQUIRED_CONSENTS) {
        if (consents[key]) {
          updatedConsents[key] = updatedConsents[key] || now;
        }
      }
    }

    if (!isDraftSave) {
      const consentErr = validateConsents(updatedConsents);
      if (consentErr) return NextResponse.json({ error: consentErr }, { status: 400 });
    }

    // 6. Cap array lengths and string lengths
    const cleanTopics = Array.isArray(draft?.mentor?.topics)
      ? draft.mentor.topics.slice(0, 10).map((t) => String(t || '').trim().slice(0, 60)).filter(Boolean)
      : [];
    const cleanFormats = Array.isArray(draft?.mentor?.formats)
      ? draft.mentor.formats.slice(0, 5).map((f) => String(f || '').trim().slice(0, 60)).filter(Boolean)
      : [];
    const cleanLanguages = Array.isArray(draft?.languages) && draft.languages.length > 0
      ? draft.languages.slice(0, 10).map((l) => String(l || '').trim().slice(0, 40)).filter(Boolean)
      : ['English'];
    const cleanEngagementTypes = Array.isArray(draft?.hire?.engagementTypes)
      ? draft.hire.engagementTypes.slice(0, 5).map((e) => String(e || '').trim().slice(0, 60)).filter(Boolean)
      : [];
    const cleanAvailability = String(draft?.hire?.availability || 'Part-time (10-20 hrs/week)').trim().slice(0, 100);
    const cleanTimezone = String(draft?.timezone || 'UTC').trim().slice(0, 60);
    const cleanLocationOther = {
      country: String(draft?.locationOther?.country || '').trim().slice(0, 60),
      city: String(draft?.locationOther?.city || '').trim().slice(0, 60),
    };

    // Sanitize draft payload
    const cleanDraft = {
      mentor: {
        headline: draft?.mentor?.headline ? String(draft.mentor.headline).trim() : '',
        summary: draft?.mentor?.summary ? String(draft.mentor.summary).trim() : '',
        rate: Number(draft?.mentor?.rate) || 0,
        topics: cleanTopics,
        formats: cleanFormats,
      },
      hire: {
        headline: draft?.hire?.headline ? String(draft.hire.headline).trim() : '',
        summary: draft?.hire?.summary ? String(draft.hire.summary).trim() : '',
        rate: Number(draft?.hire?.rate) || 0,
        availability: cleanAvailability,
        engagementTypes: cleanEngagementTypes,
      },
      skillIds: Array.isArray(draft?.skillIds) ? draft.skillIds : [],
      locationId: draft?.locationId || 'online',
      locationOther: cleanLocationOther,
      timezone: cleanTimezone,
      yearsExperience: Number(draft?.yearsExperience) || 0,
      languages: cleanLanguages,
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
        displayName: cleanName,
        ...(photoUrl && { photoUrl }),
        ...(photoPublicId && { photoPublicId }),
        roles,
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
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}
