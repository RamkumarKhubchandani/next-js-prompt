import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

function isProPlan(plan) {
  return typeof plan === 'string' && plan.startsWith('pro_');
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const roadmapId = searchParams.get('roadmapId') || 'frontend-roadmap-2025';

  await connectDB();
  const user = await User.findOne({ email: session.user.email })
    .select('plan roadmapProgress learningPath')
    .lean();
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  if (!isProPlan(user.plan)) return NextResponse.json({ message: 'Pro required' }, { status: 403 });

  const progress = (user.roadmapProgress && user.roadmapProgress[roadmapId]) ? user.roadmapProgress[roadmapId] : {};

  return NextResponse.json({
    roadmapId,
    progress,
    learningPath: user.learningPath || 'none'
  });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const roadmapId = body.roadmapId || 'frontend-roadmap-2025';
  const nodeId = body.nodeId;
  const status = body.status; // 'todo' | 'doing' | 'done'

  if (!nodeId || !['todo', 'doing', 'done'].includes(status)) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email }).select('plan roadmapProgress');
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  if (!isProPlan(user.plan)) return NextResponse.json({ message: 'Pro required' }, { status: 403 });

  const next = user.roadmapProgress || {};
  next[roadmapId] = next[roadmapId] || {};
  next[roadmapId][nodeId] = { status, updatedAt: new Date().toISOString() };

  user.roadmapProgress = next;
  await user.save();

  return NextResponse.json({ roadmapId, nodeId, status, updatedAt: next[roadmapId][nodeId].updatedAt });
}



