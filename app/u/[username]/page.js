import { notFound } from 'next/navigation';
import connectDB from '../../lib/mongodb';
import User from '../../models/User';
import QuizResult from '../../models/QuizResult';
import { Trophy, Flame, BookOpen, Github, Twitter, Linkedin, Calendar, Award } from 'lucide-react';
import Link from 'next/link';

async function getUser(username) {
    await connectDB();
    const user = await User.findOne({ username: username.toLowerCase() })
        .select('name username bio links xp streak completedTutorials badges inventory createdAt')
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
        title: `${user.name} (@${user.username}) - JSPrompt Profile`,
        description: user.bio || `Check out ${user.name}'s learning progress on JSPrompt.`,
    };
}

export default async function PublicProfilePage({ params }) {
    const { username } = await params;
    const user = await getUser(username);
    const latestQuiz = await getLatestQuizResult(username);

    if (!user) {
        return notFound();
    }

    // Mock Heatmap Data (Last 365 days)
    // In a real app, we'd query an ActivityLog collection
    const days = Array.from({ length: 365 }, (_, i) => {
        // Randomly active to look nice
        const level = Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0;
        return level;
    });

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-dark-900 text-light-100">
            <div className="max-w-5xl mx-auto">
                
                {/* Profile Header */}
                <div className="bg-dark-800 rounded-3xl p-8 border border-dark-700 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-primary to-blue-600 flex items-center justify-center text-dark-900 text-5xl font-bold border-4 border-dark-900 shadow-2xl">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            {user.inventory?.themes?.includes('theme_gold') && (
                                <div className="absolute -top-2 -right-2 bg-yellow-500 text-dark-900 p-2 rounded-full border-4 border-dark-900">
                                    <Award size={24} fill="currentColor" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                                    <p className="text-light-400 font-mono text-lg">@{user.username}</p>
                                </div>
                                <div className="flex gap-3">
                                    {user.links?.github && (
                                        <a href={`https://github.com/${user.links.github}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-700 rounded-lg hover:bg-dark-600 hover:text-white transition-colors">
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {user.links?.twitter && (
                                        <a href={`https://twitter.com/${user.links.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-700 rounded-lg hover:bg-dark-600 hover:text-blue-400 transition-colors">
                                            <Twitter size={20} />
                                        </a>
                                    )}
                                    {user.links?.linkedin && (
                                        <a href={`https://linkedin.com/in/${user.links.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-700 rounded-lg hover:bg-dark-600 hover:text-blue-600 transition-colors">
                                            <Linkedin size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="mt-4 text-light-200 max-w-2xl text-lg leading-relaxed">
                                {user.bio || "This learner hasn't written a bio yet."}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-sm text-light-400">
                                <Calendar size={16} />
                                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700 flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-500">
                            <Trophy size={32} />
                        </div>
                        <div>
                            <p className="text-light-400 text-sm font-medium">Total XP</p>
                            <p className="text-3xl font-bold text-white">{user.xp.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700 flex items-center gap-4">
                        <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500">
                            <Flame size={32} fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-light-400 text-sm font-medium">Current Streak</p>
                            <p className="text-3xl font-bold text-white">{user.streak?.count || 0} Days</p>
                        </div>
                    </div>
                    <div className="bg-dark-800 p-6 rounded-2xl border border-dark-700 flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
                            <BookOpen size={32} />
                        </div>
                        <div>
                            <p className="text-light-400 text-sm font-medium">Tutorials Completed</p>
                            <p className="text-3xl font-bold text-white">{user.completedTutorials?.length || 0}</p>
                        </div>
                    </div>
                </div>

                {/* Latest AI Assessment */}
                {latestQuiz && (
                    <div className="bg-dark-800 rounded-2xl p-6 border border-dark-700 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-white">Latest AI Assessment</h2>
                                <p className="text-light-400 mt-1">
                                    {Array.isArray(latestQuiz.technologies) ? latestQuiz.technologies.join(' • ') : 'Assessment'} •{' '}
                                    {new Date(latestQuiz.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <p className="text-4xl font-extrabold text-white">
                                    {Math.round((latestQuiz.score / Math.max(1, latestQuiz.total)) * 100)}%
                                </p>
                                <p className="text-light-400">
                                    ({latestQuiz.score}/{latestQuiz.total})
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Badges & Heatmap */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Badges Section */}
                    <div className="lg:col-span-1 bg-dark-800 rounded-2xl p-6 border border-dark-700">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Award className="text-brand-primary" />
                            Badges ({user.badges?.length || 0})
                        </h2>
                        {(!user.badges || user.badges.length === 0) ? (
                            <div className="text-center py-8 text-light-400 bg-dark-900/50 rounded-xl border border-dark-700 border-dashed">
                                <p>No badges yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-4">
                                {user.badges.map((badge, idx) => (
                                    <div key={idx} className="aspect-square rounded-xl bg-dark-700 flex items-center justify-center border border-dark-600" title={badge.name}>
                                        {/* Determine Icon based on badge name or id */}
                                        <Trophy className="text-yellow-500" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Heatmap Section */}
                    <div className="lg:col-span-2 bg-dark-800 rounded-2xl p-6 border border-dark-700 overflow-hidden">
                        <h2 className="text-xl font-bold mb-6">Activity</h2>
                        <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                            {days.map((level, i) => (
                                <div 
                                    key={i} 
                                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${
                                        level === 0 ? 'bg-dark-700' :
                                        level === 1 ? 'bg-green-900' :
                                        level === 2 ? 'bg-green-700' :
                                        level === 3 ? 'bg-green-500' :
                                        'bg-brand-primary'
                                    }`}
                                    title={`${level} contributions`}
                                ></div>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-light-400 justify-end">
                            <span>Less</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 bg-dark-700 rounded-sm"></div>
                                <div className="w-3 h-3 bg-green-900 rounded-sm"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                                <div className="w-3 h-3 bg-brand-primary rounded-sm"></div>
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

