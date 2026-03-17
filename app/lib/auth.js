import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from './mongodb';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { getEffectivePlanAndRole } from './subscription';

export const authOptions = {
    providers: [
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
            ? [
                GoogleProvider({
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                }),
            ]
            : []),
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    // OAuth-only users won't have a password set.
                    if (!user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user, account, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user._id;
                token.username = user.username;
                token.plan = user.plan;
                token.learningPath = user.learningPath;
                token.role = user.role;
            }

            // OAuth sign-in (Google): map to our Mongo user record
            if (account?.provider === 'google') {
                try {
                    await connectDB();
                    const dbUser = await User.findOne({ email: token.email }).select('_id username plan learningPath role').lean();
                    if (dbUser) {
                        token.id = dbUser._id;
                        token.username = dbUser.username;
                        token.plan = dbUser.plan;
                        token.learningPath = dbUser.learningPath;
                        token.role = dbUser.role;
                    }
                } catch (e) {
                    console.log('jwt google mapping failed:', e);
                }
            }
            // Handle session update (when client calls update())
            if (trigger === "update" && session) {
                token.name = session.name;
                // If we passed username in update, update it
                if (session.username) token.username = session.username;
                if (session.plan) token.plan = session.plan;
                if (session.learningPath) token.learningPath = session.learningPath;
                if (session.role) token.role = session.role;
            }
            return token;
        },
        async signIn({ user, account }) {
            // Ensure Google users exist in our DB so we can attach plan/xp/etc.
            if (account?.provider === 'google') {
                try {
                    await connectDB();
                    const email = user?.email;
                    if (!email) return false;

                    const existing = await User.findOne({ email }).select('_id').lean();
                    if (existing) {
                        // Update last login timestamp
                        await User.updateOne({ _id: existing._id }, { $set: { lastLoginAt: new Date() } });
                        return true;
                    }

                    const base = String(email).split('@')[0] || 'user';
                    const safeBase = base.toLowerCase().replace(/[^a-z0-9_]+/g, '').slice(0, 16) || 'user';
                    let username = safeBase;

                    // Ensure username uniqueness
                    for (let i = 0; i < 5; i++) {
                        // eslint-disable-next-line no-await-in-loop
                        const taken = await User.findOne({ username }).select('_id').lean();
                        if (!taken) break;
                        username = `${safeBase}${Math.floor(1000 + Math.random() * 9000)}`;
                    }

                    await User.create({
                        name: user?.name || safeBase,
                        email,
                        username,
                        plan: 'free',
                        role: 'user',
                        learningPath: 'none',
                        password: undefined,
                        lastLoginAt: new Date(),
                    });
                    return true;
                } catch (e) {
                    console.log('signIn google create user failed:', e);
                    return false;
                }
            }

            // Credentials login — stamp lastLoginAt
            try {
                await connectDB();
                const email = user?.email;
                if (email) {
                    await User.updateOne({ email }, { $set: { lastLoginAt: new Date() } });
                }
            } catch (e) {
                console.log('lastLoginAt update failed:', e);
            }

            return true;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.plan = token.plan;
                session.user.learningPath = token.learningPath;
                session.user.role = token.role;
            }

            // Server-side source of truth: enforce subscription expiry on every session fetch.
            // This ensures Pro access is automatically revoked after the configured duration,
            // even if the user never logs out/in.
            try {
                if (token?.id) {
                    await connectDB();
                    const dbUser = await User.findById(token.id).select('plan role learningPath subscriptionEndDate').lean();
                    if (dbUser) {
                        const effective = getEffectivePlanAndRole(dbUser);

                        // Persist automatic downgrade if expired (keep subscriptionEndDate for auditing/display)
                        if (effective.expired) {
                            await User.updateOne(
                                { _id: token.id, role: { $ne: 'admin' } },
                                { $set: { plan: 'free', role: 'user' } }
                            );
                        }

                        if (session?.user) {
                            session.user.plan = effective.plan;
                            session.user.role = effective.role;
                            session.user.learningPath = dbUser.learningPath;
                            session.user.subscriptionEndDate = dbUser.subscriptionEndDate || null;
                            session.user.activePro = effective.activePro;
                        }
                    }
                }
            } catch (e) {
                // Don't break auth if DB is temporarily unavailable
                console.log('session callback subscription check failed:', e);
            }

            return session;
        }
    }
};
