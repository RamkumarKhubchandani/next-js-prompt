import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { requireAdmin, adminOnly } from '@/app/lib/requireAdmin';
import dbConnect from '@/app/lib/mongodb';
import MentorApplication from '@/app/models/MentorApplication';
import User from '@/app/models/User';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const adminSession = await requireAdmin(session);
    if (!adminSession) return adminOnly();

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const filter = status && status !== 'all' ? { status } : {};

    const applications = await MentorApplication.find(filter)
      .populate('userId', 'name email username image')
      .sort({ createdAt: -1 });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Fetch Applications Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
