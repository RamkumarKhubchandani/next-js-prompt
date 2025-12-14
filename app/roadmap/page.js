import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../lib/auth';
import connectDB from '../lib/mongodb';
import User from '../models/User';
import FrontendRoadmap from '../components/roadmap/FrontendRoadmap';
import { FRONTEND_ROADMAP_2025 } from '../lib/roadmap/frontend-roadmap';

function isProPlan(plan) {
  return typeof plan === 'string' && plan.startsWith('pro_');
}

export default async function RoadmapPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/roadmap');
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email }).select('plan').lean();
  if (!user) redirect('/dashboard');
  if (!isProPlan(user.plan)) redirect('/pricing');

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-900 text-light-100">
      <div className="max-w-6xl mx-auto">
        <FrontendRoadmap roadmap={FRONTEND_ROADMAP_2025} />
      </div>
    </div>
  );
}



