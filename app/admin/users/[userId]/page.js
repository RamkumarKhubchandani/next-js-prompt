import React from "react";
import Link from "next/link";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import QuizResult from "../../../models/QuizResult";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { ArrowLeft, ExternalLink, Trophy, Flame, BookOpen } from "lucide-react";

async function getUserAndResults(userId) {
  await connectDB();
  const user = await User.findById(userId).select("-password").lean();
  if (!user) return { user: null, results: [] };

  const or = [{ userId: String(user._id) }, { email: user.email }];
  if (user.username) or.push({ username: String(user.username).toLowerCase() });

  const results = await QuizResult.find({ $or: or })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return { user, results };
}

export default async function AdminUserDetailPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "admin" && session.user.email !== "admin@example.com")) {
    return (
      <div className="min-h-screen pt-24 px-6 bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Unauthorized</h1>
          <p className="text-dark-900/70 dark:text-light-200">You need an admin account to view this page.</p>
          <Link href="/admin" className="inline-block mt-6 text-brand-primary font-bold">Go to Admin</Link>
        </div>
      </div>
    );
  }

  const { userId } = await params;
  const { user, results } = await getUserAndResults(userId);

  if (!user) {
    return (
      <div className="min-h-screen pt-24 px-6 bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">User not found</h1>
          <Link href="/admin/users" className="inline-flex items-center gap-2 mt-6 text-brand-primary font-bold">
            <ArrowLeft size={16} /> Back to Users
          </Link>
        </div>
      </div>
    );
  }

  const proEnds = user.subscriptionEndDate ? new Date(user.subscriptionEndDate) : null;
  const proEndsStr = proEnds && !Number.isNaN(proEnds.getTime()) ? proEnds.toLocaleString() : "—";
  const attemptCount = results.length;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-light-100 text-dark-900 dark:bg-dark-900 dark:text-light-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link href="/admin/users" className="inline-flex items-center gap-2 text-brand-primary font-bold">
            <ArrowLeft size={16} /> Back to Users
          </Link>
          {user.username && (
            <Link
              href={`/u/${user.username}`}
              className="inline-flex items-center gap-2 text-dark-900/70 dark:text-light-200 hover:text-brand-primary"
            >
              View public profile <ExternalLink size={16} />
            </Link>
          )}
        </div>

        <div className="rounded-2xl border border-dark-700/10 dark:border-dark-700 bg-white/70 dark:bg-dark-800 backdrop-blur-lg p-6 mb-8">
          <h1 className="text-2xl font-extrabold">{user.name}</h1>
          <p className="text-dark-900/60 dark:text-light-300 mt-1">
            {user.email} {user.username ? `• @${user.username}` : ""} • role: {user.role} • plan: {user.plan}
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-dark-700/10 dark:border-dark-700 bg-white/60 dark:bg-dark-900/40 p-4">
              <p className="text-xs font-bold tracking-widest uppercase text-dark-900/50 dark:text-light-400">Pro ends</p>
              <p className="mt-1 font-bold">{proEndsStr}</p>
            </div>
            <div className="rounded-xl border border-dark-700/10 dark:border-dark-700 bg-white/60 dark:bg-dark-900/40 p-4 flex items-center gap-3">
              <Trophy className="text-yellow-500" />
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-dark-900/50 dark:text-light-400">XP</p>
                <p className="mt-1 font-bold">{Number(user.xp || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="rounded-xl border border-dark-700/10 dark:border-dark-700 bg-white/60 dark:bg-dark-900/40 p-4 flex items-center gap-3">
              <Flame className="text-orange-500" />
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-dark-900/50 dark:text-light-400">Streak</p>
                <p className="mt-1 font-bold">{user.streak?.count || 0} days</p>
              </div>
            </div>
            <div className="rounded-xl border border-dark-700/10 dark:border-dark-700 bg-white/60 dark:bg-dark-900/40 p-4 flex items-center gap-3">
              <BookOpen className="text-blue-500" />
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-dark-900/50 dark:text-light-400">Tutorials</p>
                <p className="mt-1 font-bold">{(user.completedTutorials || []).length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold">AI Quiz Attempts</h2>
            <p className="text-dark-900/60 dark:text-light-300">Total attempts found: {attemptCount}</p>
          </div>
          <Link href="/admin/quiz-results" className="text-brand-primary font-bold">All reports →</Link>
        </div>

        {attemptCount === 0 ? (
          <div className="rounded-2xl border border-dark-700/10 dark:border-dark-700 bg-white/70 dark:bg-dark-800 backdrop-blur-lg p-6">
            No AI quiz attempts found for this user yet.
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((r) => {
              const pct = Math.round((r.score / Math.max(1, r.total)) * 100);
              return (
                <details key={String(r._id)} className="rounded-2xl border border-dark-700/10 dark:border-dark-700 bg-white/70 dark:bg-dark-800 backdrop-blur-lg p-5">
                  <summary className="cursor-pointer list-none">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-bold text-lg truncate">
                          {Array.isArray(r.technologies) ? r.technologies.join(" • ") : "Assessment"}
                        </p>
                        <p className="text-sm text-dark-900/60 dark:text-light-300 truncate">
                          {new Date(r.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold">{pct}%</span>
                        <span className="text-sm text-dark-900/60 dark:text-light-300">({r.score}/{r.total})</span>
                      </div>
                    </div>
                  </summary>

                  <div className="mt-5 border-t border-dark-700/10 dark:border-dark-700 pt-5 space-y-3">
                    {(r.answers || []).map((a, idx) => (
                      <div key={idx} className="rounded-xl border border-dark-700/10 dark:border-dark-700 p-4 bg-white/60 dark:bg-dark-900/40">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="font-bold">
                              Q{idx + 1}{a.technology ? ` (${a.technology})` : ""}: {a.question}
                            </p>
                            <p className="mt-2 text-sm">
                              <span className="font-semibold">User answer:</span>{" "}
                              <span className={a.isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}>
                                {a.answer}
                              </span>
                            </p>
                            {a.correctAnswer && (
                              <p className="mt-1 text-sm text-dark-900/70 dark:text-light-200">
                                <span className="font-semibold">Correct:</span> {a.correctAnswer}
                              </p>
                            )}
                            {a.explanation && (
                              <p className="mt-2 text-sm text-dark-900/60 dark:text-light-300">
                                <span className="font-semibold">Explanation:</span> {a.explanation}
                              </p>
                            )}
                          </div>
                          <span
                            className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full border ${
                              a.isCorrect
                                ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300"
                                : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
                            }`}
                          >
                            {a.isCorrect ? "Correct" : "Wrong"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


