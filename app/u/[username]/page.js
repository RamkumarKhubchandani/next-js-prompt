import { notFound } from 'next/navigation';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';
import QuizResult from '../../models/QuizResult';
import { Trophy, Flame, BookOpen, Github, Twitter, Linkedin, Calendar, Award, CheckCircle2, Share2 } from 'lucide-react';
import Link from 'next/link';

async function getUser(username) {
    await connectDB();
    const user = await User.findOne({ username: username.toLowerCase() })
        .select('name username bio links xp streak completedTutorials badges inventory certificates createdAt')
        .lean();
    return user;
}

async function getLatestQuizResult(username) {
    await connectDB();
    const res = await QuizResult.findOne({ username: String(username).toLowerCase() })
        .sort({ createdAt: -1 })
        .select('technologies score total createdAt')
        .lean();
    return res;
}

export async function generateMetadata({ params }) {
    const { username } = await params;
    const user = await getUser(username);
    if (!user) return { title: 'User Not Found' };
    return {
        title: `${user.name} (@${user.username}) - OutlineDev Profile`,
        description: user.bio || `Check out ${user.name}'s learning progress on OutlineDev.`,
    };

    export default async function PublicProfilePage({ params }) {
        const { username } = await params;
        const user = await getUser(username);
        const latestQuiz = await getLatestQuizResult(username);

        if (!user) {
            return notFound();
        }

        // Mock Heatmap Data (Last 365 days)
        // Mock Heatmap Data (Last 365 days)
        // Use deterministic data to prevent hydration mismatches
        const days = Array.from({ length: 365 }, (_, i) => {
            // Simple pseudo-random based on index
            const x = Math.sin(i * 0.1) * 10000;
            const random = x - Math.floor(x);
            const level = random > 0.7 ? Math.floor(random * 4) : 0;
            return level;
        });

        return (
            <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#0B1120] text-white selection:bg-brand-primary/30">
                {/* Background Gradients */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">

                    {/* Profile Header Card */}
                    <div className="bg-dark-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl mb-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-brand-primary to-purple-600 p-[3px] shadow-2xl shadow-brand-primary/20">
                                    <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                {user.inventory?.themes?.includes('theme_gold') && (
                                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-dark-900 p-2.5 rounded-full border-4 border-dark-900 shadow-lg">
                                        <Award size={20} fill="currentColor" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 w-full">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                    <div>
                                        <h1 className="text-4xl font-bold text-white tracking-tight mb-1">{user.name}</h1>
                                        <p className="text-gray-400 font-mono text-lg flex items-center gap-2">
                                            @{user.username}
                                            {user.role === 'pro' && (
                                                <span className="px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 border border-yellow-400/20">PRO</span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        {user.links?.github && (
                                            <a href={`https://github.com/${user.links.github}`} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 hover:text-white transition-all hover:scale-105 border border-white/5">
                                                <Github size={20} />
                                            </a>
                                        )}
                                        {user.links?.twitter && (
                                            <a href={`https://twitter.com/${user.links.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-blue-500/20 hover:text-blue-400 transition-all hover:scale-105 border border-white/5">
                                                <Twitter size={20} />
                                            </a>
                                        )}
                                        {user.links?.linkedin && (
                                            <a href={`https://linkedin.com/in/${user.links.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-blue-600/20 hover:text-blue-500 transition-all hover:scale-105 border border-white/5">
                                                <Linkedin size={20} />
                                            </a>
                                        )}
                                        <button className="p-2.5 bg-brand-primary/10 rounded-xl hover:bg-brand-primary/20 text-brand-primary transition-all hover:scale-105 border border-brand-primary/20" title="Share Profile">
                                            <Share2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                <p className="mt-6 text-gray-300 max-w-2xl text-lg leading-relaxed font-light">
                                    {user.bio || "This learner hasn't written a bio yet."}
                                </p>

                                <div className="mt-6 flex items-center gap-6 text-sm text-gray-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-green-500" />
                                        <span>{user.completedTutorials?.length || 0} Lessons Completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left Column: Stats & Certs */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors">
                                    <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500 shadow-lg shadow-yellow-500/10">
                                        <Trophy size={28} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total XP</p>
                                        <p className="text-2xl font-bold text-white">{user.xp.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors">
                                    <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500 shadow-lg shadow-orange-500/10">
                                        <Flame size={28} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Streak</p>
                                        <p className="text-2xl font-bold text-white">{user.streak?.count || 0} Days</p>
                                    </div>
                                </div>
                                <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors">
                                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 shadow-lg shadow-blue-500/10">
                                        <BookOpen size={28} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Lessons</p>
                                        <p className="text-2xl font-bold text-white">{user.completedTutorials?.length || 0}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Certificates Section */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Award className="text-brand-primary" />
                                    Certificates
                                </h2>

                                {(!user.certificates || user.certificates.length === 0) ? (
                                    <div className="bg-dark-800/30 border border-dashed border-dark-700 rounded-2xl p-12 text-center">
                                        <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                                            <Award size={32} />
                                        </div>
                                        <h3 className="text-lg font-medium text-white mb-2">No Certificates Yet</h3>
                                        <p className="text-gray-400 max-w-md mx-auto">
                                            Complete courses and pass the final assessments to earn professional certificates.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {user.certificates.map((cert, idx) => (
                                            <div key={idx} className="bg-gradient-to-br from-dark-800 to-dark-900 p-6 rounded-2xl border border-white/5 relative group overflow-hidden hover:border-brand-primary/30 transition-all">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                    <Award size={100} />
                                                </div>
                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                                                            <Award size={24} />
                                                        </div>
                                                        <span className="text-xs font-mono text-gray-500">{new Date(cert.earnedAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-1 capitalize">{cert.courseId} Professional</h3>
                                                    <p className="text-sm text-gray-400 mb-4">Verified Certification</p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-mono text-gray-500">ID: {cert.certificateId.slice(0, 8)}...</span>
                                                        <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded border border-green-500/20">
                                                            Score: {cert.score}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Heatmap Section */}
                            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
                                <h2 className="text-xl font-bold mb-6">Contribution Activity</h2>
                                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                                    {days.map((level, i) => (
                                        <div
                                            key={i}
                                            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm transition-all hover:scale-125 ${level === 0 ? 'bg-dark-700/50' :
                                                level === 1 ? 'bg-brand-primary/30' :
                                                    level === 2 ? 'bg-brand-primary/60' :
                                                        level === 3 ? 'bg-brand-primary/80' :
                                                            'bg-brand-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                                }`}
                                            title={`${level} contributions`}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Badges & Latest Quiz */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Latest AI Assessment */}
                            {latestQuiz && (
                                <div className="bg-gradient-to-br from-purple-900/20 to-dark-800 rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden">
                                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                                    <h2 className="text-lg font-bold text-white mb-4 relative z-10">Latest Assessment</h2>
                                    <div className="flex items-baseline gap-2 mb-2 relative z-10">
                                        <span className="text-4xl font-extrabold text-white">
                                            {Math.round((latestQuiz.score / Math.max(1, latestQuiz.total)) * 100)}%
                                        </span>
                                        <span className="text-purple-300 text-sm">Score</span>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4 relative z-10">
                                        {Array.isArray(latestQuiz.technologies) ? latestQuiz.technologies.join(' • ') : 'Assessment'}
                                    </p>
                                    <div className="w-full bg-dark-900/50 rounded-full h-2 relative z-10">
                                        <div
                                            className="bg-purple-500 h-2 rounded-full"
                                            style={{ width: `${Math.round((latestQuiz.score / Math.max(1, latestQuiz.total)) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Badges Section */}
                            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    Badges
                                    <span className="text-xs font-normal text-gray-500 bg-dark-700 px-2 py-0.5 rounded-full">
                                        {user.badges?.length || 0}
                                    </span>
                                </h2>
                                {(!user.badges || user.badges.length === 0) ? (
                                    <div className="text-center py-8 text-gray-500 bg-dark-900/30 rounded-xl border border-dark-700/50 border-dashed">
                                        <p>No badges earned yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-3">
                                        {user.badges.map((badge, idx) => (
                                            <div key={idx} className="aspect-square rounded-xl bg-dark-700/50 flex flex-col items-center justify-center border border-white/5 hover:border-white/20 transition-all group cursor-pointer">
                                                <Trophy className="text-yellow-500 mb-1 group-hover:scale-110 transition-transform" size={24} />
                                                <span className="text-[10px] text-gray-400 text-center px-1 truncate w-full">{badge.name || 'Badge'}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
