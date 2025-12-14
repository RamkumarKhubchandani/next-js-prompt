import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { FRONTEND_ROADMAP_2025 } from '../../../lib/roadmap/frontend-roadmap';

function isProPlan(plan) {
  return typeof plan === 'string' && plan.startsWith('pro_');
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ message: 'Missing id' }, { status: 400 });

  await connectDB();
  const user = await User.findOne({ email: session.user.email }).select('plan').lean();
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  if (!isProPlan(user.plan)) return NextResponse.json({ message: 'Pro required' }, { status: 403 });

  const node = FRONTEND_ROADMAP_2025.nodes[id];
  if (!node) return NextResponse.json({ message: 'Node not found' }, { status: 404 });

  // This is the hook point where you can later generate/enrich with real AI.
  // For now, we return the curated content plus a timestamp to keep it "living".
  return NextResponse.json({
    roadmapId: FRONTEND_ROADMAP_2025.id,
    roadmapUpdatedAt: FRONTEND_ROADMAP_2025.updatedAt,
    aiUpdatedAt: new Date().toISOString(),
    node,
  });
}



