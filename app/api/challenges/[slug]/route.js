import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Challenge from '../../../models/Challenge';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { getUtcDateKey, hash32, pickBySeed, normalizeCategoryGroup } from '../../../lib/featuredChallenges';

async function getFeaturedSlugsForToday() {
    const dateKey = getUtcDateKey();
    const projection = 'slug category dayNumber';

    const all = await Challenge.find({})
        .select(projection)
        .sort({ dayNumber: 1, createdAt: 1 })
        .lean();

    const groups = {
        javascript: all.filter((c) => normalizeCategoryGroup(c.category) === 'javascript'),
        react: all.filter((c) => normalizeCategoryGroup(c.category) === 'react'),
        typescript: all.filter((c) => normalizeCategoryGroup(c.category) === 'typescript'),
    };

    const picks = [
        pickBySeed(groups.javascript.length ? groups.javascript : all, hash32(`${dateKey}:javascript`)),
        pickBySeed(groups.react.length ? groups.react : all, hash32(`${dateKey}:react`)),
        pickBySeed(groups.typescript.length ? groups.typescript : all, hash32(`${dateKey}:typescript`)),
    ].filter(Boolean);

    return new Set(picks.map((p) => p.slug));
}

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { slug } = params;

        // Pro gating: only "daily featured" challenges are public.
        // Pro users (and admins) can access all challenge details.
        try {
            const session = await getServerSession(authOptions);
            const isPro = Boolean(session?.user?.activePro) || session?.user?.role === 'admin';
            if (!isPro) {
                const featuredSlugs = await getFeaturedSlugsForToday();
                if (!featuredSlugs.has(slug)) {
                    return NextResponse.json(
                        { error: 'This challenge is available for Pro users. Try today’s featured challenges on the home page.' },
                        { status: 403 }
                    );
                }
            }
        } catch {
            const featuredSlugs = await getFeaturedSlugsForToday();
            if (!featuredSlugs.has(slug)) {
                return NextResponse.json(
                    { error: 'This challenge is available for Pro users. Try today’s featured challenges on the home page.' },
                    { status: 403 }
                );
            }
        }
        
        const challenge = await Challenge.findOne({ slug });
        
        if (!challenge) {
            return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
        }

        // Hide solution code initially? 
        // For now we send it, but in a real app we might validate on server.
        // But for this "client-side editor" experience, we'll send it 
        // and just not show it in the UI until they give up.

        return NextResponse.json(challenge);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
