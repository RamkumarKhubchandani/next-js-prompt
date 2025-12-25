import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Job from '../../models/Job';
import JobFetchCache from '../../models/JobFetchCache';
import { fetchFromAdzuna, fetchFromRemotive, filterJobs, resolveCountry } from '../../lib/jobs/providers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getUtcDateKey(d = new Date()) {
    return d.toISOString().slice(0, 10);
}

function getCountryFromRequest(req) {
    const hdr =
        req.headers.get('x-vercel-ip-country') ||
        req.headers.get('cf-ipcountry') ||
        req.headers.get('x-country') ||
        '';
    return resolveCountry(hdr);
}

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const role = (searchParams.get('role') || 'all').toLowerCase(); // frontend|backend|fullstack|all
        const workplace = (searchParams.get('workplace') || 'all').toLowerCase(); // remote|hybrid|onsite|all
        const q = searchParams.get('q') || '';
        const limitRaw = searchParams.get('limit');
        const limit = limitRaw ? Math.max(1, Math.min(50, Number(limitRaw) || 30)) : 30;

        const forcedCountry = searchParams.get('country');
        const country = resolveCountry(forcedCountry || getCountryFromRequest(req) || 'US');
        const dateKey = getUtcDateKey();

        // Check daily cache marker
        const existingCache = await JobFetchCache.findOne({ dateKey, country }).lean();
        const now = new Date();

        if (!existingCache) {
            // Fetch new data. Prefer Adzuna when keys exist (supports country).
            let fetched = await fetchFromAdzuna({ country, role, limit: 40 });
            let adzunaFailed = false;
            if (!fetched.jobs?.length) {
                // If Adzuna is enabled but failed (common: corporate TLS inspection), fall back.
                if (fetched?.meta?.enabled && fetched?.meta?.fetchError) adzunaFailed = true;
                fetched = await fetchFromRemotive({ country, role, limit: 40 });
            }

            // Keep at least some results; if API fails, fall back to existing (yesterday) jobs in DB if present.
            if (fetched.jobs?.length) {
                // Replace today's bucket for this country
                await Job.deleteMany({ dateKey, country });
                await Job.insertMany(fetched.jobs, { ordered: false });

                await JobFetchCache.updateOne(
                    { dateKey, country },
                    {
                        $set: {
                            dateKey,
                            country,
                            source: fetched.source,
                            fetchedAt: now,
                            // expire in ~24h (daily cache). TTL index cleans up.
                            expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
                            meta: { ...(fetched.meta || {}), adzunaFailed },
                        },
                    },
                    { upsert: true }
                );
            } else {
                // No fresh jobs: mark cache briefly to avoid hot-looping the provider
                await JobFetchCache.updateOne(
                    { dateKey, country },
                    {
                        $set: {
                            dateKey,
                            country,
                            source: 'none',
                            fetchedAt: now,
                            expiresAt: new Date(now.getTime() + 60 * 60 * 1000),
                            meta: { reason: 'no-results' },
                        },
                    },
                    { upsert: true }
                );
            }
        }

        const bucketJobs = await Job.find({ dateKey, country }).sort({ postedAt: -1 }).lean();
        const filtered = filterJobs(bucketJobs, { workplace, role, q }).slice(0, limit);
        const cache = await JobFetchCache.findOne({ dateKey, country }).lean();

        return NextResponse.json({
            dateKey,
            country,
            count: filtered.length,
            jobs: filtered,
            source: (cache?.source) || (existingCache?.source) || 'fresh',
            note:
                cache?.meta?.adzunaFailed
                    ? 'Adzuna fetch failed due to TLS/certificate chain on this environment; using remote fallback. (Fix by trusting your proxy certificate via NODE_EXTRA_CA_CERTS.)'
                    : (process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY
                        ? undefined
                        : 'Remote-only fallback in use (set ADZUNA_APP_ID/ADZUNA_APP_KEY for country-specific onsite/hybrid listings).'),
        });
    } catch (error) {
        console.error('GET /api/jobs failed:', error);
        return NextResponse.json(
            {
                message: 'Server error',
                error: process.env.NODE_ENV === 'development' ? String(error?.message || error) : undefined,
            },
            { status: 500 }
        );
    }
}

