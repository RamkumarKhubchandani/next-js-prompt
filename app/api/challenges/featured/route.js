import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Challenge from '../../../models/Challenge';
import { getUtcDateKey, hash32, pickBySeed, normalizeCategoryGroup } from '../../../lib/featuredChallenges';

function uniqueBySlug(items) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    if (!it?.slug) continue;
    if (seen.has(it.slug)) continue;
    seen.add(it.slug);
    out.push(it);
  }
  return out;
}

export async function GET() {
  try {
    await connectDB();

    const dateKey = getUtcDateKey();
    const projection = 'slug title difficulty category dayNumber xpReward';

    // Fetch stable ordered lists per group
    const all = await Challenge.find({})
      .select(projection)
      .sort({ dayNumber: 1, createdAt: 1 })
      .lean();

    const groups = {
      javascript: all.filter((c) => normalizeCategoryGroup(c.category) === 'javascript'),
      react: all.filter((c) => normalizeCategoryGroup(c.category) === 'react'),
      typescript: all.filter((c) => normalizeCategoryGroup(c.category) === 'typescript'),
    };

    // Pick 1 per group; if group missing, fallback from all
    const picks = [
      pickBySeed(groups.javascript.length ? groups.javascript : all, hash32(`${dateKey}:javascript`)),
      pickBySeed(groups.react.length ? groups.react : all, hash32(`${dateKey}:react`)),
      pickBySeed(groups.typescript.length ? groups.typescript : all, hash32(`${dateKey}:typescript`)),
    ].filter(Boolean);

    const featured = uniqueBySlug(picks).slice(0, 3);

    return NextResponse.json(
      { dateKey, featured },
      {
        headers: {
          // Cache on CDN for a day; allow SWR
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


