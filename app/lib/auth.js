import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from './mongodb';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { getEffectivePlanAndRole } from './subscription';

export const authOptions = {
    providers: [
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
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user._id;
                token.username = user.username;
                token.plan = user.plan;
                token.learningPath = user.learningPath;
                token.role = user.role;
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
